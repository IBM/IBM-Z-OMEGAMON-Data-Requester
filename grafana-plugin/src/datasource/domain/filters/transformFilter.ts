import { type FilterCombinationResult, transformFilter } from 'public-common';

import type { MetricsQueryFilterClause, MetricsQueryFilter, MetricsQueryFilters } from 'datasource/domain';

export type ClauseTransformer = (clause: MetricsQueryFilterClause) => FilterCombinationResult<MetricsQueryFilterClause>;

export function transformClauses(
  rootFilter: MetricsQueryFilter,
  transformer: ClauseTransformer
): FilterCombinationResult<MetricsQueryFilterClause> {
  return transformFilter(rootFilter, (subFilter) => {
    if (subFilter.clause) {
      return transformer(subFilter.clause);
    }
    return subFilter;
  });
}

function filterCombinationResultToMetricFilter(
  filter: FilterCombinationResult<MetricsQueryFilterClause> | undefined
): MetricsQueryFilter | undefined {
  if (filter === 'always_false') {
    throw new Error('Filter is always FALSE');
  }

  if (filter === 'always_true' || filter === 'no_filter') {
    return undefined;
  }

  return filter;
}

export function transformMetricsQueryFilters(
  { aggregated, nonAggregated }: MetricsQueryFilters,
  transformer: ClauseTransformer
): MetricsQueryFilters {
  const processFilter = (filter: MetricsQueryFilter | undefined) => {
    const processedFilter = filter && transformClauses(filter, transformer);
    return filterCombinationResultToMetricFilter(processedFilter);
  };

  return { aggregated: processFilter(aggregated), nonAggregated: processFilter(nonAggregated) };
}
