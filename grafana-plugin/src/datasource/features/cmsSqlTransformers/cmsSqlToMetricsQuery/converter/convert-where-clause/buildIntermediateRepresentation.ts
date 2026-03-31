import { Expression } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';

import { IntermediateFilter } from './intermediateFilter';

export function buildIntermediateRepresentation(clause: Expression): IntermediateFilter {
  if (clause.nodeType !== 'binary' || clause.operator.genericKind !== 'condition_connector') {
    return {
      filterType: 'expression',
      expression: clause,
    };
  }

  const connector = clause.operator.kind;
  const left = buildIntermediateRepresentation(clause.left);
  const right = buildIntermediateRepresentation(clause.right);

  const items: IntermediateFilter[] = [];

  if (left.filterType === 'connection' && left.connector === connector) {
    items.push(...left.items);
  } else {
    items.push(left);
  }

  if (right.filterType === 'connection' && right.connector === connector) {
    items.push(...right.items);
  } else {
    items.push(right);
  }

  return {
    filterType: 'connection',
    connector,
    items,
  };
}
