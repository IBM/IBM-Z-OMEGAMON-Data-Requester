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
export const FALCON_QUERY_VERSION = 11;

const NON_ITM_HISTORY_TABLE_IDS = [
  'HISTTHRD',
  'ZCDETL',
  'ZCSUMM',
  'ZCOUTBSUM',
  'ZCOUBDET',
  'ZCCLUSTER',
  'ZCCLDETL',
  'ATFSUMS',
  'CICSODV',
];

export const NON_ITM_HISTORY_TABLES: ReadonlySet<string> = new Set(NON_ITM_HISTORY_TABLE_IDS);

export type FalconQuery =
  | FalconMetricsQuery
  | FalconTimeSeriesQuery
  | FalconSituationsQuery
  | FalconManagedSystemsQuery;

export type FalconQueryType = FalconQuery['queryType'];

// TODO OMUI5-561 Is there any ticket to rename situations to events?
export interface FalconSituationsQuery extends DataQuery, WithVersion<typeof FALCON_QUERY_VERSION> {
  queryType: 'situations';
}

export interface FalconMetricsQuery extends DataQuery, WithVersion<typeof FALCON_QUERY_VERSION> {
  queryType: 'metrics';
  falconParams: MetricsQueryParams;
}

export interface FalconManagedSystemsQuery extends DataQuery, WithVersion<typeof FALCON_QUERY_VERSION> {
  queryType: 'managedSystems';
  managedSystemsParams: ManagedSystemsQueryParams;
}

export interface FalconTimeSeriesQuery extends DataQuery, WithVersion<typeof FALCON_QUERY_VERSION> {
  queryType: 'time-series';
  falconParams: TimeSeriesQueryParams;
}

/** Aggregation interval options for time-series queries */
export const TIME_BUCKET_AGGREGATION_OPTIONS = ['none', 'automatic', 'hourly', 'daily', 'custom'] as const;

export type TimeBucketAggregation = (typeof TIME_BUCKET_AGGREGATION_OPTIONS)[number];

/** Well-known aggregation interval values in milliseconds */
export const AGGREGATION_INTERVAL = {
  NONE: 0,
  AUTOMATIC: -1,
  /** Sentinel: Custom option selected but no value entered yet */
  CUSTOM_UNSET: -2,
  HOURLY: 3_600_000,
  DAILY: 86_400_000,
} as const;

/** Allowed aggregation functions for time-series queries */
export const TIME_SERIES_AGGREGATION_FUNCS = ['AVG', 'MIN', 'MAX', 'SUM'] as const;
export type TimeSeriesAggregationFuncName = (typeof TIME_SERIES_AGGREGATION_FUNCS)[number];

export type TimeSeriesQueryParams = {
  affinityId: AffinityId;
  tableId: string;
  labels: string[];
  columns: string[];
  aggregationFunctions: TimeSeriesAggregationFuncName[];
  agentsAndGroups: SourceDef[];
  aggregationIntervalMs: number;
  filter?: MetricsQueryFilter;
  orderBy: MetricsQueryOrderByItem[];
  limit?: number;
};

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

export type ManagedSystemsQueryParams = {
  affinityId: AffinityId;
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
  aggregationFunction?: AggregationFuncName;
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
