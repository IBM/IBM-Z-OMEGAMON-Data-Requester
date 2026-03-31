package domain

import "fmt"

type MetricsQuery struct {
	AffinityId AffinityId           `json:"affinityId"`
	TableId    string               `json:"tableId"`
	Columns    []MetricsQueryColumn `json:"columns"`
	Agents     []string             `json:"agents"`
	Groups     []string             `json:"groups"`
	History    bool                 `json:"history"`
	Filter     struct {
		Aggregated    *MetricsQueryFilter `json:"aggregated"`
		NonAggregated *MetricsQueryFilter `json:"nonAggregated"`
	} `json:"filter"`
	OrderBy []OrderBy    `json:"orderBy"`
	GroupBy []string     `json:"groupBy"`
	Parmas  []QueryParma `json:"parmas"` // for additional request parameters like SYSTEM.PARMA, etc
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
	ColumnId string `json:"columnId"`
	Type     string `json:"type"` // 'ASC' | 'DESC'
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

func ValidateMetricsQuery (metricsQuery MetricsQuery) error {
	if (metricsQuery.AffinityId == "") {
		return fmt.Errorf("no application specified in the query")
	}
	if (metricsQuery.TableId == "") {
		return fmt.Errorf("no table specified in the query")
	}
	if (len(metricsQuery.Columns) == 0) {
		return fmt.Errorf("no columns specified in the query")
	}
	return nil
}