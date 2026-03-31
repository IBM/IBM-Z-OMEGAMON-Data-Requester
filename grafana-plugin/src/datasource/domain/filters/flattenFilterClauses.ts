import { MetricsQueryFilter, MetricsQueryFilters, MetricsQueryFilterClause } from 'datasource/domain';

export function flattenFilterClauses(
  filter: MetricsQueryFilter | MetricsQueryFilters | null
): MetricsQueryFilterClause[] {
  if (!filter) {
    return [];
  }

  const asFilter = filter as MetricsQueryFilter;
  if (asFilter.clause) {
    return [asFilter.clause];
  }
  if (asFilter.and) {
    return asFilter.and.flatMap(flattenFilterClauses);
  }
  if (asFilter.or) {
    return asFilter.or.flatMap(flattenFilterClauses);
  }

  const asRoot = filter as MetricsQueryFilters;
  return [...flattenFilterClauses(asRoot.aggregated ?? null), ...flattenFilterClauses(asRoot.nonAggregated ?? null)];
}
