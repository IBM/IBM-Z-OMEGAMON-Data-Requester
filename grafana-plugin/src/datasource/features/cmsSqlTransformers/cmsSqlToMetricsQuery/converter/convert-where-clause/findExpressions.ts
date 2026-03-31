import { Expression } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';

import { IntermediateFilterExpression, IntermediateFilterConnection, IntermediateFilter } from './intermediateFilter';

type ExtractionPredicate = (expression: Expression) => boolean;

// Leaf-first\Root-last
type FilterExpressionPath = [IntermediateFilterExpression, ...IntermediateFilterConnection[]];

function visitFilter(
  path: [IntermediateFilter, ...IntermediateFilterConnection[]],
  predicate: ExtractionPredicate
): FilterExpressionPath[] {
  const [currFilter] = path;
  if (currFilter.filterType === 'connection') {
    return currFilter.items.reduce(
      (acc, item) => [...acc, ...visitFilter([item, ...(path as IntermediateFilterConnection[])], predicate)],
      [] as FilterExpressionPath[]
    );
  }

  const currMatched = predicate(currFilter.expression);
  return currMatched ? [path as FilterExpressionPath] : [];
}

export function findExpressions(root: IntermediateFilter, predicate: ExtractionPredicate) {
  return visitFilter([root], predicate);
}
