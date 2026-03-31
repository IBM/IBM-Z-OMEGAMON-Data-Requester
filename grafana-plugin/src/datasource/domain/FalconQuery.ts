import { DataQuery } from '@grafana/data';
import { SingleFieldOf } from 'public-common';
import { AffinityId } from 'public-domain';

import { WithVersion } from 'datasource/features/versioning/common';

import { AggregationFuncName } from './AggregationFunction';

/* Do you want to bump a version?
 * 1. Modify FalconQuery structure(s)
 * 2. Increase version in definition (FALCON_QUERY_VERSION)
 * 3. Run yarn bump:FalconQuery
 * 4. Implement updater function in generated dump file
 */
export const FALCON_QUERY_VERSION = 9;

export type FalconQuery = FalconMetricsQuery | FalconSituationsQuery;

export type FalconQueryType = FalconQuery['queryType'];

export interface FalconSituationsQuery extends DataQuery, WithVersion<typeof FALCON_QUERY_VERSION> {
  queryType: 'situations';
}

export interface FalconMetricsQuery extends DataQuery, WithVersion<typeof FALCON_QUERY_VERSION> {
  queryType: 'metrics';
  falconParams: MetricsQueryParams;
}

export type MetricsQueryParams = {
  affinityId: AffinityId;
  tableId: string;
  columns: MetricsQueryColumn[];
  agentsAndGroups: SourceDef[];
  history: boolean;
  filter: MetricsQueryFilters;
  orderBy: MetricsQueryOrderByItem[];
  groupBy: string[];
  parmas: MetricsQueryParma[]; // for SYSTEM.PARMA
  first?: number;
};

/** Structures that define agent or set of agents to get the data from. */
export type SourceDef = AgentOrGroupName | AtLparDef;

export type AgentOrGroupName = {
  id: 'agentOrGroupName';
  /** Originnode or group name. Ex.: IB1C:RSD1:DB2 or *MVS_DB2 */
  name: string;
};

/** Represented by @Lpar() and is only used for MVS Systems */
export type AtLparDef = {
  id: 'atLpar';
  lpars: string[];
};

export type MetricsQueryParma = {
  name: string; // For example 'CURRENTATTR' 'NODELIST' and 'TIMEOUT'
  value?: string;
  length?: number;
};

export const EMPTY_PARMA: MetricsQueryParma = { name: '', value: '', length: 0 };

export type MetricsQueryColumn = {
  id: string;
  aggregationFunction?: AggregationFuncName;
};

export type MetricsQueryOrderByItem = {
  columnId: string;
  type: 'ASC' | 'DESC';
};

type MetricsFilterFields<TClause> = {
  or: Array<BaseQueryFilter<TClause>>;
  and: Array<BaseQueryFilter<TClause>>;
  clause: TClause;
};

export type BaseQueryFilter<TClause> = SingleFieldOf<MetricsFilterFields<TClause>>;

export type MetricsQueryFilter = BaseQueryFilter<MetricsQueryFilterClause>;

export type MetricsQueryFilterOf<
  FILTER_TYPE extends keyof MetricsFilterFields<TClause>,
  TClause = MetricsQueryFilterClause,
> = SingleFieldOf<MetricsFilterFields<TClause>, FILTER_TYPE>;

export type MetricsQueryFilterClause = {
  columnId: string;
  operator: ComparisonOperator;
  userDefinedValue: sqlExpression;
};

export type MetricsQueryFilters = BaseQueryFilters<MetricsQueryFilter>;

export type BaseQueryFilters<TFilter> = {
  aggregated?: TFilter;
  nonAggregated?: TFilter; // TODO think about name
};

// For now it's just value. In future we should support expressions
type sqlExpression = string;

export type ComparisonOperator = (typeof ALLOWED_COMPARISON_OPERATORS)[number];
export const ALLOWED_COMPARISON_OPERATORS = ['=', '<>', '<', '<=', '>', '>=', 'LIKE'] as const;
