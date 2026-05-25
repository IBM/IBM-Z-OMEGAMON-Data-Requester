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

var _ DataQueryEndpointHandler = (*MetricsQueryEndpoint)(nil)

type MetricsQueryEndpoint struct {
	configuration domain.Configuration
	rootPath      string
}

func NewMetricsQueryEndpoint(rootPath string, configuration domain.Configuration) *MetricsQueryEndpoint {
	return &MetricsQueryEndpoint{
		rootPath:      rootPath,
		configuration: configuration,
	}
}

func (e *MetricsQueryEndpoint) HandleQuery(ctx context.Context, query backend.DataQuery, user *backend.User) (*QueryResponse, error) {
	type ClientQuery struct {
		Params domain.ClientMetricsParams `json:"falconParams"`
	}

	logger := backend.Logger.FromContext(ctx)
	logger.Debug("Metrics endpoint. Start getting metrics", "query", query)

	var parsedQuery ClientQuery
	err := json.Unmarshal(query.JSON, &parsedQuery)
	if err != nil {
		logger.Warn("Could not parse Metrics query", "query", query, "error", err)
		return nil, fmt.Errorf("could not parse Metrics query: %s", err.Error())
	}
	// Default to "metrics" if not provided by the client.
	if parsedQuery.Params.QueryType == "" {
		parsedQuery.Params.QueryType = "metrics"
	}

	gatewayParams := parsedQuery.Params.ToGatewayMetricsParams(query.TimeRange)

	var resp pb.MetricsResponse
	_, err = gateway.PostProto[*pb.MetricsResponse](ctx, e.configuration, "/metrics", &gatewayParams, &resp)
	if err != nil {
		logger.Error("Metrics endpoint: Failed to get metrics from endpoint", "error", err)
		return nil, err
	}

	rows, perSourceErrors, gatewayErr := dec.MetricsRowsFromProto(&resp)
	if gatewayErr != "" {
		return nil, fmt.Errorf("gateway error: %s", gatewayErr)
	}

	logger.Debug("Metrics endpoint. Received metrics", "metrics length", len(rows))

	columnIds := make([]string, 0)
	for _, column := range parsedQuery.Params.Columns {
		if column.AggregationFunction == nil {
			columnIds = append(columnIds, column.Id)
		} else {
			columnIds = append(columnIds, fmt.Sprintf("%s(%s)", *column.AggregationFunction, column.Id))
		}
	}
	queryResponse := newQueryResponse(
		parsedQuery.Params.TableId,
		&rows,
		nil,
		columnIds,
		nil,
		perSourceErrors,
		parsedQuery.Params.History,
		false,
	)
	logger.Debug("Metrics endpoint. Converted metrics to query response")
	return queryResponse, nil
}

func (e *MetricsQueryEndpoint) GetRootPath() string {
	return e.rootPath
}
