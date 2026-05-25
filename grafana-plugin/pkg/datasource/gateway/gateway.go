package gateway

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"google.golang.org/protobuf/proto"

	"itm-datasource-plugin/pkg/datasource/domain"
)

const protoAccept = "application/x-protobuf"

type jsonErrorResponse struct {
	GatewayError string `json:"gatewayError"`
	Reason       string `json:"reason"`
}

// parseJSONGatewayError extracts a human-readable error from a JSON gateway
// error body. Falls back to the standard HTTP status text if parsing fails.
func parseJSONGatewayError(body []byte, statusCode int) error {
	var e jsonErrorResponse
	if jsonErr := json.Unmarshal(body, &e); jsonErr == nil && e.GatewayError != "" {
		if e.Reason != "" {
			return fmt.Errorf("%s: %s", e.GatewayError, e.Reason)
		}
		return errors.New(e.GatewayError)
	}
	return errors.New(http.StatusText(statusCode))
}

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

	logger.Debug("successful GET response from Gateway", "HTTP code", resp.StatusCode, "URL", targetUrl, "parsed", err == nil)
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

	logger.Debug("POST response from Gateway", "HTTP code", resp.StatusCode, "URL", targetUrl, "parsed", err == nil)
	return result, resp.StatusCode, err
}

// GetProto performs a GET request and decodes the binary protobuf response
// directly into msg.  msg must be a non-nil proto.Message.
func GetProto[MSG proto.Message](ctx context.Context, config domain.Configuration, apiPath string, query url.Values, msg MSG) (int, error) {
	logger := backend.Logger.FromContext(ctx)
	targetUrl, err := url.JoinPath(config.GatewayBaseUrl, "/api", apiPath)
	if err != nil {
		return 0, err
	}
	if len(query) != 0 {
		targetUrl = targetUrl + "?" + query.Encode()
	}
	req, err := http.NewRequestWithContext(ctx, "GET", targetUrl, nil)
	if err != nil {
		return 0, err
	}
	req.Header.Set("Accept", protoAccept)

	resp, err := config.HttpClient.Do(req)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, err
	}
	if resp.StatusCode == http.StatusUnauthorized {
		return resp.StatusCode, parseJSONGatewayError(body, resp.StatusCode)
	}
	if err := proto.Unmarshal(body, msg); err != nil {
		logger.Error("failed to decode protobuf GET response", "URL", targetUrl, "error", err)
		return resp.StatusCode, err
	}
	return resp.StatusCode, nil
}

// PostProto performs a POST request with a JSON body and decodes the binary
// protobuf response directly into msg.
func PostProto[MSG proto.Message](ctx context.Context, config domain.Configuration, apiPath string, payload any, msg MSG) (int, error) {
	logger := backend.Logger.FromContext(ctx)
	jsonParams, err := json.Marshal(payload)
	if err != nil {
		return 0, err
	}
	targetUrl, err := url.JoinPath(config.GatewayBaseUrl, "/api", apiPath)
	if err != nil {
		return 0, err
	}
	req, err := http.NewRequestWithContext(ctx, "POST", targetUrl, bytes.NewBuffer(jsonParams))
	if err != nil {
		return 0, err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", protoAccept)

	resp, err := config.HttpClient.Do(req)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, err
	}
	if resp.StatusCode == http.StatusUnauthorized {
		return resp.StatusCode, parseJSONGatewayError(body, resp.StatusCode)
	}
	if err := proto.Unmarshal(body, msg); err != nil {
		logger.Error("failed to decode protobuf POST response", "URL", targetUrl, "error", err)
		return resp.StatusCode, err
	}
	return resp.StatusCode, nil
}

// parseHttpResponse decodes a gateway response.  When the server returns
// Content-Type: application/x-protobuf the body is a serialised
// google.protobuf.Struct; otherwise it falls back to JSON.
func parseHttpResponse[T any](resp *http.Response, logger log.Logger) (T, error) {
	var zero T
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return zero, err
	}

	jsonBytes := body

	var unmarshalledBody T
	if err := json.Unmarshal(jsonBytes, &unmarshalledBody); err != nil {
		logger.Error(
			"failed to parse gateway response",
			"URL", resp.Request.URL.String(),
			"http code", resp.StatusCode,
			"body", string(jsonBytes),
		)
		return zero, errors.New(string(jsonBytes))
	}

	return unmarshalledBody, nil
}
