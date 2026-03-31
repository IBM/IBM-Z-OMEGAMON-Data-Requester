import { DataQuery } from '@grafana/data';
import { SingleFieldOf } from 'public-common';
import { AffinityId } from 'public-domain';

import { WithVersion } from 'datasource/features/versioning/common';

import { FalconQuery0 } from './FalconQuery0';

const FALCON_QUERY_VERSION_1 = 1;

export function updateToV1(query: FalconQuery0): FalconQuery1 {
  const { version, ...otherProperties } = query;
  return {
    ...otherProperties,
    falconVersion: FALCON_QUERY_VERSION_1,
  };
}

export type FalconQuery1 = FalconMetricsQuery1 | FalconSituationsQuery1;

export interface FalconSituationsQuery1 extends DataQuery, WithVersion<typeof FALCON_QUERY_VERSION_1> {
  queryType: 'situations';
}

export interface FalconMetricsQuery1 extends DataQuery, WithVersion<typeof FALCON_QUERY_VERSION_1> {
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
