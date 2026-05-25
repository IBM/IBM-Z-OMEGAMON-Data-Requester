package domain

import (
	"encoding/json"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

// ClientTimeSeriesParams mirrors the TypeScript TimeSeriesQueryParams sent from the frontend.
// Field names match the renamed TS fields: labels, agentsAndGroups (formerly agents),
// columns (formerly metrics).
type ClientTimeSeriesParams struct {
	QueryType             string              `json:"queryType"` // always "time-series"
	AffinityId            AffinityId          `json:"affinityId"`
	TableId               string              `json:"tableId"`
	Columns               []string            `json:"columns"`
	AggregationFunctions  []string            `json:"aggregationFunctions"`
	AggregationIntervalMs int                 `json:"aggregationIntervalMs"`
	AgentsAndGroups       []json.RawMessage   `json:"agentsAndGroups"`
	Filter                *MetricsQueryFilter `json:"filter"`
	Labels                []string            `json:"labels"`
	OrderBy               []OrderBy           `json:"orderBy"`
	Limit                 int64               `json:"limit"`
}

func (p *ClientTimeSeriesParams) ToGatewayTimeSeriesParams(timeRange backend.TimeRange) GatewayTimeSeriesParams {
	return GatewayTimeSeriesParams{
		ClientTimeSeriesParams: *p,
		TimeRange: StringifiedTimeRange{
			From: timeRange.From.Format(time.RFC3339Nano),
			To:   timeRange.To.Format(time.RFC3339Nano),
		},
	}
}

type GatewayTimeSeriesParams struct {
	ClientTimeSeriesParams
	TimeRange StringifiedTimeRange `json:"timeRange"`
}
