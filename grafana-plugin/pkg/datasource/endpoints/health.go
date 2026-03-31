package endpoints

import (
	"context"
	"fmt"
	"itm-datasource-plugin/pkg/datasource/domain"
	"itm-datasource-plugin/pkg/datasource/gateway"
	"net/http"
	"strings"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

type itmStatus struct {
	Id     int    `json:"id"`
	Status string `json:"status"`
	Url    string `json:"url"`
}

type checkHealthResponse struct {
	ItmStatuses map[int]itmStatus `json:"itmStatuses"`
	Debug       map[string]any    `json:"__debug"`
}

func CheckHealth(
	ctx context.Context,
	configuration domain.Configuration,
) (*backend.CheckHealthResult, error) {
	logger := backend.Logger.FromContext(ctx)

	logger.Debug("Health endpoint. Start checking health")

	resp, statusCode, err := gateway.Get[checkHealthResponse](ctx, configuration, "/health", nil)
	if err != nil {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: fmt.Sprintf("Failed communication with gateway, error: %s", err.Error()),
		}, nil
	}

	if statusCode != 200 {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: fmt.Sprintf("Failed communication with gateway, HTTP %d %s", statusCode, http.StatusText(statusCode)),
		}, nil
	}

	itmStatuses := resp.ItmStatuses

	if len(itmStatuses) == 0 {
		logger.Debug("Health endpoint. Finish checking health", "no TEMSes configured")
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: "Gateway connection is OK, no TEMSes configured",
		}, nil
	}

	errorStrings := make([]string, 0, len(itmStatuses))
	for _, statusObj := range itmStatuses {
		if statusObj.Status != "success" {
			errorStrings = append(errorStrings, fmt.Sprintf("%s:%s", statusObj.Url, statusObj.Status))
		}
	}

	errString := strings.Join(errorStrings, ";")
	if errString != "" {
		logger.Debug("Health endpoint. Finish checking health", "temses have errors")

		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: fmt.Sprintf("Gateway connection is OK, %d out of %d TEMSes have errors: %s", len(errorStrings), len(itmStatuses), errString),
		}, nil
	}

	return &backend.CheckHealthResult{
		Status:  backend.HealthStatusOk,
		Message: fmt.Sprintf("Gateway connection is OK, %d TEMSes works well", len(itmStatuses)),
	}, nil
}
