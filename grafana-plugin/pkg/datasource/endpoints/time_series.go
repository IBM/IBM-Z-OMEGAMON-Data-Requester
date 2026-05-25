package endpoints

import (
	"context"
	"encoding/json"
	"fmt"
	"itm-datasource-plugin/pkg/datasource/domain"
	"itm-datasource-plugin/pkg/datasource/gateway"
	dec "itm-datasource-plugin/pkg/datasource/gateway/proto_decoders"

	pb "falcon_proto.local/v1"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

var _ DataQueryEndpointHandler = (*TimeSeriesQueryEndpoint)(nil)

type TimeSeriesQueryEndpoint struct {
	configuration domain.Configuration
	rootPath      string
}

func NewTimeSeriesQueryEndpoint(rootPath string, configuration domain.Configuration) *TimeSeriesQueryEndpoint {
	return &TimeSeriesQueryEndpoint{
		rootPath:      rootPath,
		configuration: configuration,
	}
}

func (e *TimeSeriesQueryEndpoint) HandleQuery(ctx context.Context, query backend.DataQuery, user *backend.User) (*QueryResponse, error) {
	type ClientQuery struct {
		Params domain.ClientTimeSeriesParams `json:"falconParams"`
	}

	logger := backend.Logger.FromContext(ctx)
	logger.Debug("Time series endpoint. Start getting metrics", "query", query)

	var parsedQuery ClientQuery
	err := json.Unmarshal(query.JSON, &parsedQuery)
	if err != nil {
		logger.Warn("Could not parse TimeSeries query", "query", query, "error", err)
		return nil, fmt.Errorf("could not parse TimeSeries query: %s", err.Error())
	}
	// Default to "time-series" if not provided by the client.
	if parsedQuery.Params.QueryType == "" {
		parsedQuery.Params.QueryType = "time-series"
	}

	gatewayParams := parsedQuery.Params.ToGatewayTimeSeriesParams(query.TimeRange)

	var resp pb.MetricsResponse
	_, err = gateway.PostProto[*pb.MetricsResponse](ctx, e.configuration, "/metrics", &gatewayParams, &resp)
	if err != nil {
		logger.Error("Time series endpoint: Failed to get metrics from endpoint", "error", err)
		return nil, err
	}

	rows, perSourceErrors, gatewayErr := dec.MetricsRowsFromProto(&resp)
	if gatewayErr != "" {
		return nil, fmt.Errorf("gateway error: %s", gatewayErr)
	}

	logger.Debug("Time series endpoint. Received metrics", "metrics length", len(rows))

	// This is kind of hack.
	requestedColumns := make([]string, 0)
	requestedColumns = append(requestedColumns, "time_bucket")

	for _, label := range parsedQuery.Params.Labels {
		if label == "ORIGINNODE" {
			requestedColumns = append(requestedColumns, "originnode")
		} else {
			requestedColumns = append(requestedColumns, label)
		}
	}

	if len(parsedQuery.Params.AggregationFunctions) == 0 {
		requestedColumns = append(requestedColumns, parsedQuery.Params.Columns...)
	} else {
		for _, aggrFunc := range parsedQuery.Params.AggregationFunctions {
			for _, metric := range parsedQuery.Params.Columns {
				requestedColumns = append(requestedColumns, fmt.Sprintf("%s(%s)", aggrFunc, metric))
			}
		}
	}

	queryResponse := newQueryResponse(
		parsedQuery.Params.TableId,
		&rows,
		nil,
		requestedColumns,
		nil,
		perSourceErrors,
		false,
		true,
	)
	logger.Debug("Time series endpoint. Converted metrics to query response")
	return queryResponse, nil
}

func (e *TimeSeriesQueryEndpoint) GetRootPath() string {
	return e.rootPath
}
