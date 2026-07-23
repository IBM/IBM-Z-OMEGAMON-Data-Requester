// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

import { ComparisonOperator } from 'datasource/domain';

export type FilterOperator = '=' | '!=' | '>' | '<' | '=~' | '!~';

export const CMS_SQL_OPERATOR_MAP: Record<FilterOperator, ComparisonOperator | ''> = {
  '=': '=',
  '!=': '<>',
  '>': '>',
  '<': '<',
  '!~': '',
  '=~': 'LIKE',
};
