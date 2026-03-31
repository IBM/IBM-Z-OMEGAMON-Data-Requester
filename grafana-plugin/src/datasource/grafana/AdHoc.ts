import { BaseVariableModel } from '@grafana/data';

import { FilterOperator } from './FilterOperator';

/**
 * FYI this is fixed Grafana type,
 * cause Grafana's own AdHocVariableFilter['operator']
 * is of too wide type `string`.
 */
export interface AdHocVariableFilter {
  condition: string; // it's always empty string?
  operator: FilterOperator;
  key: string;
  value: string;
}

/**
 * FYI this is fixed Grafana type,
 * cause Grafana's own AdHocVariableFilter['operator']
 * is of too wide type `string`.
 */
export interface AdHocVariableModel extends BaseVariableModel {
  type: 'adhoc';
  filters: AdHocVariableFilter[];
  datasource?: {
    type: string;
    uid: string;
  };
}
