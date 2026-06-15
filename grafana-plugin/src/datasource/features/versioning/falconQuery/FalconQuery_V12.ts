/* eslint-disable @typescript-eslint/no-namespace */
import { FalconQuery_V11 } from './FalconQuery_V11';

const FALCON_QUERY_VERSION_V12 = 12;

/**
 * V12 renames `aggregationIntervalMs` to `aggregationIntervalMinutes` in
 * time-series queries. Positive ms values are converted to minutes; sentinel
 * values (NONE=0, AUTOMATIC=-1, CUSTOM_UNSET=-2) are preserved as-is since
 * they share the same numeric identity in both units.
 */
export function updateTo_V12(current: FalconQuery_V11): FalconQuery_V12 {
  if (current.queryType !== 'time-series') {
    return { ...current, falconVersion: 12 } as FalconQuery_V12;
  }

  const { aggregationIntervalMs, ...rest } = current.falconParams;
  const aggregationIntervalMinutes =
    aggregationIntervalMs > 0 ? Math.max(1, Math.round(aggregationIntervalMs / 60_000)) : aggregationIntervalMs;

  return {
    ...current,
    falconVersion: 12,
    falconParams: { ...rest, aggregationIntervalMinutes },
  } as FalconQuery_V12;
}

export type FalconQuery_V12 =
  | FalconMetricsQuery_V12
  | FalconTimeSeriesQuery_V12
  | FalconSituationsQuery_V12
  | FalconManagedSystemsQuery_V12;

interface FalconSituationsQuery_V12 extends DEP_V12.DataQuery, DEP_V12.WithVersion<typeof FALCON_QUERY_VERSION_V12> {
  queryType: 'situations';
}

interface FalconMetricsQuery_V12 extends DEP_V12.DataQuery, DEP_V12.WithVersion<typeof FALCON_QUERY_VERSION_V12> {
  queryType: 'metrics';
  falconParams: MetricsQueryParams_V12;
}

interface FalconManagedSystemsQuery_V12
  extends DEP_V12.DataQuery, DEP_V12.WithVersion<typeof FALCON_QUERY_VERSION_V12> {
  queryType: 'managedSystems';
  managedSystemsParams: ManagedSystemsQueryParams_V12;
}

interface FalconTimeSeriesQuery_V12 extends DEP_V12.DataQuery, DEP_V12.WithVersion<typeof FALCON_QUERY_VERSION_V12> {
  queryType: 'time-series';
  falconParams: TimeSeriesQueryParams_V12;
}

type MetricsQueryParams_V12 = {
  affinityId: DEP_V12.AffinityId;
  tableId: string;
  columns: MetricsQueryColumn_V12[];
  agentsAndGroups: SourceDef_V12[];
  history: boolean;
  filter: MetricsQueryFilters_V12;
  orderBy: MetricsQueryOrderByItem_V12[];
  groupBy: string[];
  parmas: MetricsQueryParma_V12[]; // for SYSTEM.PARMA
  first?: number;
};

type ManagedSystemsQueryParams_V12 = {
  affinityId: DEP_V12.AffinityId;
};

type TimeSeriesQueryParams_V12 = {
  affinityId: DEP_V12.AffinityId;
  tableId: string;
  labels: string[];
  columns: string[];
  aggregationFunctions: TimeSeriesAggregationFuncName_V12[];
  agentsAndGroups: SourceDef_V12[];
  aggregationIntervalMinutes: number;
  filter?: MetricsQueryFilter_V12;
  orderBy: TimeSeriesOrderByItem_V12[];
  limit?: number;
};

const ALLOWED_TIME_SERIES_AGGREGATION_FUNCS_V12 = ['AVG', 'LAST', 'MAX', 'MIN', 'SUM'] as const;

type TimeSeriesAggregationFuncName_V12 = (typeof ALLOWED_TIME_SERIES_AGGREGATION_FUNCS_V12)[number];

/** Structures that define agent or set of agents to get the data from. */
type SourceDef_V12 = AgentOrGroupName_V12 | AtLparDef_V12;

type AgentOrGroupName_V12 = {
  id: 'agentOrGroupName';
  /** Originnode or group name. Ex.: IB1C:RSD1:DB2 or *MVS_DB2 */
  name: string;
};

/** Represented by @Lpar() and is only used for MVS Systems */
type AtLparDef_V12 = {
  id: 'atLpar';
  lpars: string[];
};

type MetricsQueryParma_V12 = {
  name: string; // For example 'CURRENTATTR' 'NODELIST' and 'TIMEOUT'
  value?: string;
  length?: number;
};

type MetricsQueryColumn_V12 = {
  id: string;
  aggregationFunction?: DEP_V12.AggregationFuncName;
};

type MetricsQueryOrderByItem_V12 = {
  columnId: string;
  aggregationFunction?: DEP_V12.AggregationFuncName;
  type: 'ASC' | 'DESC';
};

type TimeSeriesOrderByItem_V12 = {
  columnId: string;
  aggregationFunction?: TimeSeriesAggregationFuncName_V12;
  type: 'ASC' | 'DESC';
};

type MetricsFilterFields_V12<TClause> = {
  or: Array<BaseQueryFilter_V12<TClause>>;
  and: Array<BaseQueryFilter_V12<TClause>>;
  clause: TClause;
};

type BaseQueryFilter_V12<TClause> = DEP_V12.SingleFieldOf<MetricsFilterFields_V12<TClause>>;

type MetricsQueryFilter_V12 = BaseQueryFilter_V12<MetricsQueryFilterClause_V12>;

type MetricsQueryFilterClause_V12 = {
  columnId: string;
  operator: ComparisonOperator_V12;
  userDefinedValue: sqlExpression_V12;
};

type MetricsQueryFilters_V12 = BaseQueryFilters_V12<MetricsQueryFilter_V12>;

type BaseQueryFilters_V12<TFilter> = {
  aggregated?: TFilter;
  nonAggregated?: TFilter; // TODO think about name
};

// For now it's just value. In future we should support expressions
type sqlExpression_V12 = string;

type ComparisonOperator_V12 = (typeof ALLOWED_COMPARISON_OPERATORS_V12)[number];
const ALLOWED_COMPARISON_OPERATORS_V12 = ['=', '<>', '<', '<=', '>', '>=', 'LIKE'] as const;

const ALLOWED_AGGREGATION_FUNCS_V12 = ['AVG', 'COUNT', 'MAX', 'MIN', 'SUM'] as const;

/* Module without 'declare' keyword cannot have export declarations */
declare namespace DEP_V12 {
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

  type AggregationFuncName = (typeof ALLOWED_AGGREGATION_FUNCS_V12)[number];

  /* Imports of original file */
  export { DataQuery, SingleFieldOf, AffinityId, WithVersion, AggregationFuncName };
}
