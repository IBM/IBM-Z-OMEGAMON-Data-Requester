package gateway

import (
	"context"
	"errors"
	"fmt"
	"net/url"

	"itm-datasource-plugin/pkg/datasource/domain"
)

type aggregatedGatewayResponse[T any] struct {
	DebugData     map[string]any    `json:"__debug"`
	Status        string            `json:"status"`
	Data          *T                `json:"data"`
	PerTemsErrors map[string]string `json:"perItmRecErrors"`
	GatewayError  string            `json:"gatewayError"`
}

func GetAggregated[T any](ctx context.Context, config domain.Configuration, apiPath string, query url.Values) (data T, perSourceErrors map[string]string, err error, debugMessages any) {
	resp, httpStatusCode, err := Get[aggregatedGatewayResponse[T]](ctx, config, apiPath, query)

	if err != nil {
		var zero T
		return zero, nil, err, nil
	}

	return processAggregatedResponse(&resp, httpStatusCode)
}

func PostAggregated[T any](ctx context.Context, config domain.Configuration, apiPath string, payload any) (data T, perSourceErrors map[string]string, err error, debugMessages any) {
	resp, httpStatusCode, err := Post[aggregatedGatewayResponse[T]](ctx, config, apiPath, payload)

	if err != nil {
		var zero T
		return zero, nil, err, nil
	}

	return processAggregatedResponse(&resp, httpStatusCode)
}

func processAggregatedResponse[T any](resp *aggregatedGatewayResponse[T], httpStatusCode int) (data T, perTemsErrors map[string]string, err error, debugMessages any) {
	debugMsgs := resp.DebugData

	var zero T
	if resp.GatewayError != "" {
		return zero, nil, fmt.Errorf("gateway error: '%s'", resp.GatewayError), debugMsgs
	}

	switch resp.Status {
	case "success", "partial":
		break
	case "error":
		// In this case we expect GatewayError to not be empty. It is handled earlier
		return zero, nil, errors.New("gateway sent error with no message"), debugMsgs
	default:
		return zero, nil, errors.New("unexpected gateway response"), debugMsgs
	}

	if httpStatusCode != 200 {
		return zero, nil, fmt.Errorf("gateway sent response with HTTP status code %d but no error message provided", httpStatusCode), debugMsgs
	}

	if resp.Data == nil {
		return zero, nil, errors.New("aggregated response has no data field"), debugMsgs
	}

	return *resp.Data, resp.PerTemsErrors, nil, debugMsgs
}
