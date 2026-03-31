import { combineWithAnd } from 'public-common';
import type { TableMetadata } from 'public-domain';

import type { MetricsQueryFilter, ComparisonOperator, MetricsQueryFilterClause } from 'datasource/domain';
import { type AdHocVariableFilter, CMS_SQL_OPERATOR_MAP } from 'datasource/grafana';

export function generateFilterFromAdHocs(
  adHocVariableFilters: AdHocVariableFilter[],
  tableMd: TableMetadata
): MetricsQueryFilter | undefined {
  const metricsQueryFilters = adHocVariableFilters.reduce((acc, { key, value, operator }) => {
    const columnMetadata = Object.values(tableMd.columns).find(({ name }) => name === key);
    if (!columnMetadata) {
      return acc;
    }

    const sqlOperator = CMS_SQL_OPERATOR_MAP[operator] as ComparisonOperator;

    acc.push({
      clause: { columnId: columnMetadata.id, operator: sqlOperator, userDefinedValue: value },
    });

    return acc;
  }, [] as MetricsQueryFilter[]);

  const combined = combineWithAnd<MetricsQueryFilterClause>(...metricsQueryFilters);

  if (combined === 'no_filter') {
    return undefined;
  }

  return combined;
}
