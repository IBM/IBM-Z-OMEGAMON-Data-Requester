import { includes } from 'public-common';

export const ALLOWED_AGGREGATION_FUNCS = ['AVG', 'COUNT', 'MAX', 'MIN', 'SUM'] as const;

export type AggregationFuncName = (typeof ALLOWED_AGGREGATION_FUNCS)[number];

const columnWithAggregationFunctionRegex = /^[^()]+\([^()]+\)$/;

export function fieldNameContainsAggFunc(fieldName: string): boolean {
  return columnWithAggregationFunctionRegex.test(fieldName);
}

export function extractAggFuncFromFieldName(fieldName: string): AggregationFuncName | null {
  if (!fieldNameContainsAggFunc(fieldName)) {
    return null;
  }
  const possibleAggFunc = fieldName.slice(0, fieldName.indexOf('('));
  if (includes(ALLOWED_AGGREGATION_FUNCS, possibleAggFunc)) {
    return possibleAggFunc;
  }
  throw new Error(`Unknown aggregation function ${possibleAggFunc}`);
}

export function extractColumnIdFromFieldName(fieldName: string): string {
  if (!fieldNameContainsAggFunc(fieldName)) {
    return fieldName;
  }
  return fieldName.slice(fieldName.indexOf('(') + 1, fieldName.indexOf(')'));
}
