/* eslint-disable @typescript-eslint/no-namespace */
import { FalconQuery_V10 } from './FalconQuery_V10';

const FALCON_QUERY_VERSION_V11 = 11;

/**
 * V11 introduces the 'time-series' query type for the first time.
 *
 * V10 (the current client version) only contains 'metrics', 'situations', and
 * 'managedSystems' queries — no 'time-series' queries exist in V10 dashboards.
 * Therefore all V10 queries just need a version bump; no structural migration is required.
 */
export function updateTo_V11(current: FalconQuery_V10): FalconQuery_V11 {
  return { ...current, falconVersion: 11 } as FalconQuery_V11;
}

export type FalconQuery_V11 =
  | FalconMetricsQuery_V11
  | FalconTimeSeriesQuery_V11
  | FalconSituationsQuery_V11
  | FalconManagedSystemsQuery_V11;

interface FalconSituationsQuery_V11 extends DEP_V11.DataQuery, DEP_V11.WithVersion<typeof FALCON_QUERY_VERSION_V11> {
  queryType: 'situations';
}

interface FalconMetricsQuery_V11 extends DEP_V11.DataQuery, DEP_V11.WithVersion<typeof FALCON_QUERY_VERSION_V11> {
  queryType: 'metrics';
  falconParams: MetricsQueryParams_V11;
}

interface FalconManagedSystemsQuery_V11
  extends DEP_V11.DataQuery, DEP_V11.WithVersion<typeof FALCON_QUERY_VERSION_V11> {
  queryType: 'managedSystems';
  managedSystemsParams: ManagedSystemsQueryParams_V11;
}

interface FalconTimeSeriesQuery_V11 extends DEP_V11.DataQuery, DEP_V11.WithVersion<typeof FALCON_QUERY_VERSION_V11> {
  queryType: 'time-series';
  falconParams: TimeSeriesQueryParams_V11;
}

type MetricsQueryParams_V11 = {
  affinityId: DEP_V11.AffinityId;
  tableId: string;
  columns: MetricsQueryColumn_V11[];
  agentsAndGroups: SourceDef_V11[];
  history: boolean;
  filter: MetricsQueryFilters_V11;
  orderBy: MetricsQueryOrderByItem_V11[];
  groupBy: string[];
  parmas: MetricsQueryParma_V11[]; // for SYSTEM.PARMA
  first?: number;
};

type ManagedSystemsQueryParams_V11 = {
  affinityId: DEP_V11.AffinityId;
};

type TimeSeriesQueryParams_V11 = {
  affinityId: DEP_V11.AffinityId;
  tableId: string;
  labels: string[];
  columns: string[];
  aggregationFunctions: TimeSeriesAggregationFuncName_V11[];
  agentsAndGroups: SourceDef_V11[];
  aggregationIntervalMs: number;
  filter?: MetricsQueryFilter_V11;
  orderBy: MetricsQueryOrderByItem_V11[];
  limit?: number;
};

const ALLOWED_TIME_SERIES_AGGREGATION_FUNCS_V11 = ['AVG', 'MIN', 'MAX', 'SUM'] as const;

type TimeSeriesAggregationFuncName_V11 = (typeof ALLOWED_TIME_SERIES_AGGREGATION_FUNCS_V11)[number];

/** Structures that define agent or set of agents to get the data from. */
type SourceDef_V11 = AgentOrGroupName_V11 | AtLparDef_V11;

type AgentOrGroupName_V11 = {
  id: 'agentOrGroupName';
  /** Originnode or group name. Ex.: IB1C:RSD1:DB2 or *MVS_DB2 */
  name: string;
};

/** Represented by @Lpar() and is only used for MVS Systems */
type AtLparDef_V11 = {
  id: 'atLpar';
  lpars: string[];
};

type MetricsQueryParma_V11 = {
  name: string; // For example 'CURRENTATTR' 'NODELIST' and 'TIMEOUT'
  value?: string;
  length?: number;
};

type MetricsQueryColumn_V11 = {
  id: string;
  aggregationFunction?: DEP_V11.AggregationFuncName;
};

type MetricsQueryOrderByItem_V11 = {
  columnId: string;
  aggregationFunction?: DEP_V11.AggregationFuncName;
  type: 'ASC' | 'DESC';
};

type MetricsFilterFields_V11<TClause> = {
  or: Array<BaseQueryFilter_V11<TClause>>;
  and: Array<BaseQueryFilter_V11<TClause>>;
  clause: TClause;
};

type BaseQueryFilter_V11<TClause> = DEP_V11.SingleFieldOf<MetricsFilterFields_V11<TClause>>;

type MetricsQueryFilter_V11 = BaseQueryFilter_V11<MetricsQueryFilterClause_V11>;

type MetricsQueryFilterClause_V11 = {
  columnId: string;
  operator: ComparisonOperator_V11;
  userDefinedValue: sqlExpression_V11;
};

type MetricsQueryFilters_V11 = BaseQueryFilters_V11<MetricsQueryFilter_V11>;

type BaseQueryFilters_V11<TFilter> = {
  aggregated?: TFilter;
  nonAggregated?: TFilter; // TODO think about name
};

// For now it's just value. In future we should support expressions
type sqlExpression_V11 = string;

type ComparisonOperator_V11 = (typeof ALLOWED_COMPARISON_OPERATORS_V11)[number];
const ALLOWED_COMPARISON_OPERATORS_V11 = ['=', '<>', '<', '<=', '>', '>=', 'LIKE'] as const;

const ALLOWED_AGGREGATION_FUNCS_V11 = ['AVG', 'COUNT', 'MAX', 'MIN', 'SUM'] as const;

/* Module without 'declare' keyword cannot have export declarations */
declare namespace DEP_V11 {
  interface DataQuery$1 {
    datasource?: unknown;
    hide?: boolean;
    queryType?: string;
    refId: string;
  }

  interface DataSourceRef$1 {
    apiVersion?: string;
    type?: string;
    uid?: string;
  }

  interface DataQuery extends DataQuery$1 {
    key?: string;
    datasource?: DataSourceRef$1 | null;
  }

  type Exclude<T, U> = T extends U ? never : T;
  type _SingleFieldOf<T extends object, K extends keyof T> = K extends string
    ? { [KK in Exclude<keyof T, K>]?: never } & { [P in K]: T[P] }
    : never;
  type SingleFieldOf<T extends object, AVAILABLE_PROPS extends keyof T = keyof T> = _SingleFieldOf<T, AVAILABLE_PROPS>;
  type Branded<T, B> = T & { __brand: B };
  type AffinityId = Branded<string, 'AffinityId'>;
  type WithVersion<TVersion extends number = number> = { falconVersion: TVersion };

  type AggregationFuncName = (typeof ALLOWED_AGGREGATION_FUNCS_V11)[number];

  /* Imports of original file */
  export { DataQuery, SingleFieldOf, AffinityId, WithVersion, AggregationFuncName };
}
