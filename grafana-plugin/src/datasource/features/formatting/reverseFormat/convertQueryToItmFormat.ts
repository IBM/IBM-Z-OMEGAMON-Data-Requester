import { TableMetadata } from 'public-domain';

import {
  MetricsQueryFilterClause,
  MetricsQueryParams,
  MetricsQueryFilter,
  BaseQueryFilter,
  BaseQueryFilters,
} from 'datasource/domain';

import { reverseFormatAndApplyEnums } from './reverseFormat';

type ItmQueryFilterClause = Omit<MetricsQueryFilterClause, 'userDefinedValue'> & { userDefinedValue: string | number };
type ItmQueryFilter = BaseQueryFilter<ItmQueryFilterClause>;

export type ItmQueryParams = Omit<MetricsQueryParams, 'filter'> & { filter: BaseQueryFilters<ItmQueryFilter> };

export function convertQueryToItmFormat(query: MetricsQueryParams, tableMd: TableMetadata): ItmQueryParams {
  const { aggregated, nonAggregated } = query.filter;
  return {
    ...query,
    filter: {
      aggregated: aggregated && convertFilterToItmFormat(aggregated, tableMd),
      nonAggregated: nonAggregated && convertFilterToItmFormat(nonAggregated, tableMd),
    },
  };
}

function convertFilterToItmFormat(filter: MetricsQueryFilter, tableMd: TableMetadata): ItmQueryFilter {
  if (filter.and) {
    return {
      and: filter.and.map((subFilter) => convertFilterToItmFormat(subFilter, tableMd)),
    };
  }

  if (filter.or) {
    return {
      or: filter.or.map((subFilter) => convertFilterToItmFormat(subFilter, tableMd)),
    };
  }

  const columnMd = tableMd.columns[filter.clause.columnId];
  if (!columnMd) {
    throw new Error(`No "${filter.clause.columnId}" column found in table metadata`);
  }

  const formattedValue = filter.clause.userDefinedValue;
  const value = reverseFormatAndApplyEnums(formattedValue, columnMd);
  return {
    clause: { ...filter.clause, userDefinedValue: value },
  };
}
