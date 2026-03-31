import { AggregationFuncName } from 'datasource/domain';

export const countColumnDisplayName = 'Count of group members';

export const allowedAggrFnNameToDisplayName: Record<AggregationFuncName, string> = {
  AVG: 'Average',
  COUNT: 'Count',
  MAX: 'Max',
  MIN: 'Min',
  SUM: 'Sum',
};

export function getAggregationFunctionDisplayName(aggregationFunction: AggregationFuncName): string {
  return allowedAggrFnNameToDisplayName[aggregationFunction];
}
