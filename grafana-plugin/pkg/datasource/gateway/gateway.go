package gateway

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/url"
	"strconv"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"

	"itm-datasource-plugin/pkg/datasource/domain"
)

func Get[T any](ctx context.Context, config domain.Configuration, apiPath string, query url.Values) (data T, httpStatusCode int, err error) {
	logger := backend.Logger.FromContext(ctx)
	var zero T
	targetUrl, err := url.JoinPath(config.GatewayBaseUrl, "/api", apiPath)
	if err != nil {
		logger.Error("failed to build request url", "error", err)
		return zero, 0, err
	}

	if len(query) != 0 {
		targetUrl = targetUrl + "?" + query.Encode()
	}

	req, err := http.NewRequestWithContext(ctx, "GET", targetUrl, nil)
	if err != nil {
		logger.Error("failed to create request", "error", err)
		return zero, 0, err
	}

	resp, err := config.HttpClient.Do(req)
	if err != nil {
		statusCodeStr := "<not received>"
		if resp != nil {
			statusCodeStr = strconv.FormatInt(int64(resp.StatusCode), 10)
		}
		logger.Error("failed GET response from Gateway", "HTTP code", statusCodeStr, "URL", targetUrl, "error", err)
		return zero, 0, err
	}

	result, err := parseHttpResponse[T](resp, logger)

	logger.Info("successful GET response from Gateway", "HTTP code", resp.StatusCode, "URL", targetUrl, "parsed", err == nil)
	return result, resp.StatusCode, err
}

func Post[T any](ctx context.Context, config domain.Configuration, apiPath string, payload any) (data T, httpStatusCode int, err error) {
	logger := backend.Logger.FromContext(ctx)
	var zero T

	targetUrl, err := url.JoinPath(config.GatewayBaseUrl, "/api", apiPath)
	if err != nil {
		logger.Error("failed to build request url", "error", err)
		return zero, 0, err
	}

	jsonParams, err := json.Marshal(payload)
	if err != nil {
		return zero, 0, err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", targetUrl, bytes.NewBuffer(jsonParams))
	if err != nil {
		logger.Error("failed to create request", "error", err)
		return zero, 0, err
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := config.HttpClient.Do(req)
	if err != nil {
		logger.Error("failed POST response from Gateway", "HTTP code", resp.StatusCode, "URL", targetUrl, "error", err)
		return zero, 0, err
	}

	result, err := parseHttpResponse[T](resp, logger)

	logger.Info("POST response from Gateway", "HTTP code", resp.StatusCode, "URL", targetUrl, "parsed", err == nil)
	return result, resp.StatusCode, err
}

func parseHttpResponse[T any](resp *http.Response, logger log.Logger) (T, error) {
	var zero T
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return zero, err
	}

	var unmarshalledBody T
	if err := json.Unmarshal(body, &unmarshalledBody); err != nil {
		// If not JSON, return the raw response as error
		// This is the case if we made an http request to gateway that is runnning in https mode
		logger.Error(
			"failed to parse gateway response",
			"URL", resp.Request.URL.String(),
			"http code", resp.StatusCode,
			"body", string(body),
		)
		return zero, errors.New(string(body))
	}

	return unmarshalledBody, nil
}
