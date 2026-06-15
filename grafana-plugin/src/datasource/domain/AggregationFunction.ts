import { includes } from 'public-common';

export const ALLOWED_AGGREGATION_FUNCS = ['AVG', 'COUNT', 'MAX', 'MIN', 'SUM'] as const;

export type AggregationFuncName = (typeof ALLOWED_AGGREGATION_FUNCS)[number];

/** Allowed aggregation functions for time-series queries */
export const TIME_SERIES_AGGREGATION_FUNCS = ['AVG', 'LAST', 'MAX', 'MIN', 'SUM'] as const;

export type TimeSeriesAggregationFuncName = (typeof TIME_SERIES_AGGREGATION_FUNCS)[number];

/** Union of all aggregation functions across all query types. Used when parsing backend response field names. */
export const ALL_AGG_FUNCS = [...new Set([...ALLOWED_AGGREGATION_FUNCS, ...TIME_SERIES_AGGREGATION_FUNCS])] as const;

export type AllAggFuncName = (typeof ALL_AGG_FUNCS)[number];

const columnWithAggregationFunctionRegex = /^[^()]+\([^()]+\)$/;

export function fieldNameContainsAggFunc(fieldName: string): boolean {
  return columnWithAggregationFunctionRegex.test(fieldName);
}

export function extractAggFuncFromFieldName(fieldName: string): AllAggFuncName | null {
  if (!fieldNameContainsAggFunc(fieldName)) {
    return null;
  }
  const possibleAggFunc = fieldName.slice(0, fieldName.indexOf('('));
  if (includes(ALL_AGG_FUNCS, possibleAggFunc)) {
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
