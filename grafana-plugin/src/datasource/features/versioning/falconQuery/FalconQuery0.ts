import { DataQuery } from '@grafana/data';
import { SingleFieldOf } from 'public-common';
import { AffinityId } from 'public-domain';

import { WithOptionalVersion } from 'datasource/features/versioning/common';

export type FalconQuery0 = FalconMetricsQuery0 | FalconSituationsQuery0;

// At first we did not assign any version, later we began using this semantic versioning before changing it to simple numeric versions
type WithStringVersion = {
  version?: '0.1.0';
};

export interface FalconSituationsQuery0 extends DataQuery, WithStringVersion, WithOptionalVersion<0> {
  queryType: 'situations';
}

export interface FalconMetricsQuery0 extends DataQuery, WithStringVersion, WithOptionalVersion<0> {
  queryType: 'regular';
  params: MetricsQueryParams;
}

type MetricsQueryParams = {
  affinityId: AffinityId;
  applicationCode: string;
  tableId: string;
  columns: MetricsQueryColumn[];
  originnodesAndGroups: string[];
  history: boolean;
  filter: MetricsQueryFilters;
  orderBy: MetricsQueryOrderByItem[];
  groupBy: string[];
  params: MetricsQueryParma[]; // for SYSTEM.PARMA
  first: number;
};

type MetricsQueryParma = {
  name: string; // For example 'CURRENTATTR' 'NODELIST' and 'TIMEOUT'
  value?: string;
  length?: number;
};

type MetricsQueryColumn = {
  id: string;
  aggregationFunction?: AggregationFuncName;
};

type MetricsQueryOrderByItem = {
  columnId: string;
  type: 'ASC' | 'DESC';
};

type MetricsQueryFilterFields = {
  or: MetricsQueryFilter[];
  and: MetricsQueryFilter[];
  clause: MetricsQueryFilterClause;
};

type MetricsQueryFilter = SingleFieldOf<MetricsQueryFilterFields>;

type MetricsQueryFilterClause = {
  columnId: string;
  operator: ComparisonOperator;
  userDefinedValue: CmsSqlExpression;
};

type MetricsQueryFilters = {
  aggregated?: MetricsQueryFilter;
  nonAggregated?: MetricsQueryFilter; // TODO think about name
};

// For now it's just value. In future we should support expressions
type CmsSqlExpression = string | number;

type AggregationFuncName = (typeof ALLOWED_AGGREGATION_FUNCS)[number];
type ComparisonOperator = (typeof ALLOWED_COMPARISON_OPERATORS)[number];
const ALLOWED_COMPARISON_OPERATORS = ['=', '<>', '<', '<=', '>', '>=', 'LIKE'] as const;
const ALLOWED_AGGREGATION_FUNCS = ['AVG', 'COUNT', 'MAX', 'MIN', 'SUM'] as const;
