import { AllAggFuncName } from 'datasource/domain';

export const countColumnDisplayName = 'Count of group members';

export const allowedAggrFnNameToDisplayName: Record<AllAggFuncName, string> = {
  AVG: 'Average',
  COUNT: 'Count',
  LAST: 'Last',
  MAX: 'Max',
  MIN: 'Min',
  SUM: 'Sum',
};

export function getAggregationFunctionDisplayName(aggregationFunction: AllAggFuncName): string {
  return allowedAggrFnNameToDisplayName[aggregationFunction];
}
