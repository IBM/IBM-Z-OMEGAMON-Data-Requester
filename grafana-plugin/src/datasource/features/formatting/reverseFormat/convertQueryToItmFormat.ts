import { TableMetadata } from 'public-domain';

import {
  MetricsQueryFilterClause,
  MetricsQueryParams,
  MetricsQueryFilter,
  BaseQueryFilter,
  BaseQueryFilters,
  FalconMetricsQuery,
} from 'datasource/domain';

import { reverseFormatAndApplyEnums } from './reverseFormat';

type ItmMetricsQueryFilterClause = Omit<MetricsQueryFilterClause, 'userDefinedValue'> & {
  userDefinedValue: string | number;
};
type ItmMetricsQueryFilter = BaseQueryFilter<ItmMetricsQueryFilterClause>;

/**
 * Same as MetricsQueryParams, but with `userDefinedValue`s in filters converted back to raw format
 */
export type ItmMetricsQueryParams = Omit<MetricsQueryParams, 'filter'> & {
  filter: BaseQueryFilters<ItmMetricsQueryFilter>;
};

/**
 * Same as FalconMetricsQuery, but with `userDefinedValue`s in filters converted back to raw format
 */
export type ItmFalconMetricsQuery = Omit<FalconMetricsQuery, 'falconParams'> & {
  falconParams: ItmMetricsQueryParams;
};

export function convertQueryToItmFormat(query: MetricsQueryParams, tableMd: TableMetadata): ItmMetricsQueryParams {
  const { aggregated, nonAggregated } = query.filter;
  return {
    ...query,
    filter: {
      aggregated: aggregated && convertFilterToItmFormat(aggregated, tableMd),
      nonAggregated: nonAggregated && convertFilterToItmFormat(nonAggregated, tableMd),
    },
  };
}

function convertFilterToItmFormat(filter: MetricsQueryFilter, tableMd: TableMetadata): ItmMetricsQueryFilter {
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
