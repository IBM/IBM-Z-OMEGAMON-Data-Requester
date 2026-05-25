package domain

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

type ClientMetricsParams struct {
	QueryType       string               `json:"queryType"` // always "metrics"
	ApplicationCode string               `json:"applicationCode"`
	AffinityId      AffinityId           `json:"affinityId"`
	TableId         string               `json:"tableId"`
	Columns         []MetricsQueryColumn `json:"columns"`
	AgentsAndGroups []json.RawMessage    `json:"agentsAndGroups"`
	History         bool                 `json:"history"`
	Filter          struct {
		Aggregated    *MetricsQueryFilter `json:"aggregated"`
		NonAggregated *MetricsQueryFilter `json:"nonAggregated"`
	} `json:"filter"`
	OrderBy []OrderBy    `json:"orderBy"`
	GroupBy []string     `json:"groupBy"`
	Parmas  []QueryParma `json:"parmas"` // for additional request parameters like SYSTEM.PARMA, etc
}

func (p *ClientMetricsParams) ToGatewayMetricsParams(timeRange backend.TimeRange) GatewayMetricsParams {
	return GatewayMetricsParams{
		ClientMetricsParams: *p,
		TimeRange: StringifiedTimeRange{
			From: timeRange.From.Format(time.RFC3339Nano),
			To:   timeRange.To.Format(time.RFC3339Nano),
		},
	}
}

type GatewayMetricsParams struct {
	ClientMetricsParams
	TimeRange StringifiedTimeRange `json:"timeRange"`
}

type StringifiedTimeRange struct {
	From string `json:"from"`
	To   string `json:"to"`
}

type MetricsQueryColumn struct {
	Id                  string  `json:"id"`
	AggregationFunction *string `json:"aggregationFunction"` // 'AVG' | 'COUNT' | 'MAX' | 'MIN' | 'SUM'
}

// Returns metric query column as a string like "SUM(MAXPCT)"
// This is the way ITM returns the column name
func (mqc *MetricsQueryColumn) AsPrintableName() string {
	if mqc.AggregationFunction == nil {
		return mqc.Id
	}
	return fmt.Sprintf("%s(%s)", *mqc.AggregationFunction, mqc.Id)
}

type OrderBy struct {
	ColumnId            string  `json:"columnId"`
	AggregationFunction *string `json:"aggregationFunction"`
	Type                string  `json:"type"`
}

type MetricsQueryFilter struct {
	Or     *[]MetricsQueryFilter `json:"or"`
	And    *[]MetricsQueryFilter `json:"and"`
	Clause *MetricsFilterClause  `json:"clause"`
}

type MetricsFilterClause struct {
	ColumnId         string      `json:"columnId"`
	Operator         string      `json:"operator"`         // '=' | '<>' | '<' | '<=' | '>' | '>=' | 'LIKE';
	UserDefinedValue interface{} `json:"userDefinedValue"` // CmsSqlExpression string | number
}

type QueryParma struct {
	Name   string  `json:"name"`
	Value  *string `json:"value"`
	Length *int    `json:"length"`
}

type GenericRow = map[string]any
