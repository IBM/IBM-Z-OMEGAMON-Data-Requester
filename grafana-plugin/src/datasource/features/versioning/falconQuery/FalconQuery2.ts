import { DataQuery } from '@grafana/data';
import { SingleFieldOf } from 'public-common';
import { AffinityId } from 'public-domain';

import { WithVersion } from 'datasource/features/versioning/common';

import { FalconQuery1 } from './FalconQuery1';

const FALCON_QUERY_VERSION_2 = 2;

export function updateToV2(v1: FalconQuery1): FalconQuery2 {
  if (v1.queryType === 'situations') {
    const v2SituationsQuery: FalconSituationsQuery2 = { ...v1, falconVersion: FALCON_QUERY_VERSION_2 };
    return v2SituationsQuery;
  }

  const { originnodesAndGroups, params, ...otherParams } = v1.params;

  const v2MetricsQuery: FalconMetricsQuery2 = {
    ...v1,
    falconVersion: FALCON_QUERY_VERSION_2,
    params: {
      ...otherParams,
      agentsAndGroups: originnodesAndGroups,
      parmas: params,
    },
  };

  return v2MetricsQuery;
}

export type FalconQuery2 = FalconMetricsQuery2 | FalconSituationsQuery2;

export interface FalconSituationsQuery2 extends DataQuery, WithVersion<typeof FALCON_QUERY_VERSION_2> {
  queryType: 'situations';
}

export interface FalconMetricsQuery2 extends DataQuery, WithVersion<typeof FALCON_QUERY_VERSION_2> {
  queryType: 'regular';
  params: MetricsQueryParams;
}

type MetricsQueryParams = {
  affinityId: AffinityId;
  applicationCode: string;
  tableId: string;
  columns: MetricsQueryColumn[];
  agentsAndGroups: string[];
  history: boolean;
  filter: MetricsQueryFilters;
  orderBy: MetricsQueryOrderByItem[];
  groupBy: string[];
  parmas: MetricsQueryParma[]; // for SYSTEM.PARMA
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

type MetricsFilterFields = {
  or: MetricsQueryFilter[];
  and: MetricsQueryFilter[];
  clause: MetricsQueryFilterClause;
};

type MetricsQueryFilter = SingleFieldOf<MetricsFilterFields>;

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
