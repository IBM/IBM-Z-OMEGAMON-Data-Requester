import { writetimeColumnMetadata } from 'public-domain';

import { ConverterError } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter/internals';
import {
  exprIsIdentifier,
  identifierIsColumnId,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';

import { findExpressions } from './findExpressions';
import { IntermediateFilter, IntermediateFilterExpression } from './intermediateFilter';

export function findWritetimeFilters(root: IntermediateFilter): IntermediateFilterExpression[] {
  const paths = findExpressions(
    root,
    (expr) =>
      expr.nodeType === 'binary' &&
      exprIsIdentifier(expr.left) &&
      identifierIsColumnId(expr.left, writetimeColumnMetadata.id)
  );

  return paths.map(([writetime, parentIfAny]) => {
    if (parentIfAny && parentIfAny.connector !== 'and_condition_connector') {
      throw new ConverterError('WRITETIME filter should be placed on top level of WHERE clause', [
        writetime.expression,
      ]);
    }
    return writetime;
  });
}
