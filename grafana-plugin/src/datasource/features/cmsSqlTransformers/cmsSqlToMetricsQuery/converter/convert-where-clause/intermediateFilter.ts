import type { Expression } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';
import type { TokenOfGenericKind } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

export type IntermediateFilterConnection = {
  filterType: 'connection';
  connector: TokenOfGenericKind<'condition_connector'>['kind'];
  items: IntermediateFilter[];
};

export type IntermediateFilterExpression = {
  filterType: 'expression';
  expression: Expression;
};

export type IntermediateFilter = IntermediateFilterConnection | IntermediateFilterExpression;

export function collectAllExpressions(parent: IntermediateFilterConnection): Expression[] {
  return parent.items.reduce((acc, item) => {
    if (item.filterType === 'expression') {
      acc.push(item.expression);
    } else {
      acc.push(...collectAllExpressions(item));
    }
    return acc;
  }, [] as Expression[]);
}
