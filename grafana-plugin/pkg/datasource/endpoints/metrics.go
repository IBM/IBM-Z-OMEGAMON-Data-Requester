package endpoints

import (
	"context"
	"encoding/json"
	"fmt"
	"itm-datasource-plugin/pkg/datasource/domain"
	"itm-datasource-plugin/pkg/datasource/gateway"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

var _ DataQueryEndpointHandler = (*MetricsQueryEndpoint)(nil)

type clientQueryParams struct {
	ApplicationCode string                      `json:"applicationCode"`
	AffinityId      domain.AffinityId           `json:"affinityId"`
	TableId         string                      `json:"tableId"`
	Columns         []domain.MetricsQueryColumn `json:"columns"`
	AgentsAndGroups []json.RawMessage           `json:"agentsAndGroups"`
	History         bool                        `json:"history"`
	Filter          struct {
		Aggregated    *domain.MetricsQueryFilter `json:"aggregated"`
		NonAggregated *domain.MetricsQueryFilter `json:"nonAggregated"`
	} `json:"filter"`
	OrderBy []domain.OrderBy    `json:"orderBy"`
	GroupBy []string            `json:"groupBy"`
	Parmas  []domain.QueryParma `json:"parmas"` // for additional request parameters like SYSTEM.PARMA, etc
}

func (p *clientQueryParams) toGatewayMetricsParams(timeRange backend.TimeRange) gatewayMetricsParams {
	return gatewayMetricsParams{
		clientQueryParams: *p,
		TimeRange: stringifiedTimeRange{
			From: timeRange.From.Format(time.RFC3339Nano),
			To:   timeRange.To.Format(time.RFC3339Nano),
		},
	}
}

type gatewayMetricsParams struct {
	clientQueryParams
	TimeRange stringifiedTimeRange `json:"timeRange"`
}

type stringifiedTimeRange struct {
	From string `json:"from"`
	To   string `json:"to"`
}

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
		Params clientQueryParams `json:"falconParams"`
	}

	logger := backend.Logger.FromContext(ctx)
	logger.Debug("Metrics endpoint. Start getting metrics", "query", query)

	var parsedQuery ClientQuery
	err := json.Unmarshal(query.JSON, &parsedQuery)
	if err != nil {
		logger.Warn("Could not parse Metrics query", "query", query, "error", err)
		return nil, fmt.Errorf("could not parse Metrics query: %s", err.Error())
	}

	gatewayParams := parsedQuery.Params.toGatewayMetricsParams(query.TimeRange)

	resp, perSourceErrros, err, gatewayDbgMsgs := gateway.PostAggregated[[]domain.GenericRow](ctx, e.configuration, "/metrics", &gatewayParams)
	if err != nil {
		logger.Error("Metrics endpoint: Failed to get metrics from endpoint", "error", err)
		return nil, err
	}

	logger.Debug("Metrics endpoint. Received metrics", "metrics length", len(resp))

	columnIds := make([]string, 0)
	for _, column := range parsedQuery.Params.Columns {
		if column.AggregationFunction == nil {
			columnIds = append(columnIds, column.Id)
		} else {
			columnIds = append(columnIds, fmt.Sprintf("%s(%s)", *column.AggregationFunction, column.Id))
		}
	}
	queryResponse := newQueryResponse(parsedQuery.Params.TableId, &resp, nil, columnIds, gatewayDbgMsgs, perSourceErrros)
	logger.Debug("Metrics endpoint. Converted metrics to query response")
	return queryResponse, nil
}

func (e *MetricsQueryEndpoint) GetRootPath() string {
	return e.rootPath
}
