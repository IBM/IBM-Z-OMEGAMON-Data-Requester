/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
import { FalconQuery_V7 } from './FalconQuery_V7';

export function updateTo_V8(current: FalconQuery_V7): FalconQuery_V8 {
  if (current.queryType === 'situations') {
    return { ...current, falconVersion: 8 };
  }

  const { applicationCode, ...falconParamsV8 } = current.falconParams;
  return {
    ...current,
    falconParams: falconParamsV8,
    falconVersion: 8,
  };
}

/* Do you want to bump a version?
 * 1. Modify FalconQuery structure(s)
 * 2. Increase version in definition (FALCON_QUERY_VERSION)
 * 3. Run yarn bump:FalconQuery
 * 4. Implement updater function in generated dump file
 */
const FALCON_QUERY_VERSION_V8 = 8;

export type FalconQuery_V8 = FalconMetricsQuery_V8 | FalconSituationsQuery_V8;

interface FalconSituationsQuery_V8 extends DEP_V8.DataQuery, DEP_V8.WithVersion<typeof FALCON_QUERY_VERSION_V8> {
  queryType: 'situations';
}

interface FalconMetricsQuery_V8 extends DEP_V8.DataQuery, DEP_V8.WithVersion<typeof FALCON_QUERY_VERSION_V8> {
  queryType: 'metrics';
  falconParams: MetricsQueryParams_V8;
}

type MetricsQueryParams_V8 = {
  affinityId: DEP_V8.AffinityId;
  tableId: string;
  columns: MetricsQueryColumn_V8[];
  agentsAndGroups: SourceDef_V8[];
  history: boolean;
  filter: MetricsQueryFilters_V8;
  orderBy: MetricsQueryOrderByItem_V8[];
  groupBy: string[];
  parmas: MetricsQueryParma_V8[]; // for SYSTEM.PARMA
  first?: number;
};

/** Structures that define agent or set of agents to get the data from. */
type SourceDef_V8 = AgentOrGroupName_V8 | AtLparDef_V8;

type AgentOrGroupName_V8 = {
  id: 'agentOrGroupName';
  /** Originnode or group name. Ex.: IB1C:RSD1:DB2 or *MVS_DB2 */
  name: string;
};

/** Represented by @Lpar() and is only used for MVS Systems */
type AtLparDef_V8 = {
  id: 'atLpar';
  lpars: string[];
};

type MetricsQueryParma_V8 = {
  name: string; // For example 'CURRENTATTR' 'NODELIST' and 'TIMEOUT'
  value?: string;
  length?: number;
};

type MetricsQueryColumn_V8 = {
  id: string;
  aggregationFunction?: AggregationFuncName_V8;
};

type MetricsQueryOrderByItem_V8 = {
  columnId: string;
  type: 'ASC' | 'DESC';
};

type MetricsFilterFields_V8<TClause> = {
  or: Array<BaseQueryFilter_V8<TClause>>;
  and: Array<BaseQueryFilter_V8<TClause>>;
  clause: TClause;
};

type BaseQueryFilter_V8<TClause> = DEP_V8.SingleFieldOf<MetricsFilterFields_V8<TClause>>;

type MetricsQueryFilter_V8 = BaseQueryFilter_V8<MetricsQueryFilterClause_V8>;

type MetricsQueryFilterClause_V8 = {
  columnId: string;
  operator: ComparisonOperator_V8;
  userDefinedValue: sqlExpression_V8;
};

type MetricsQueryFilters_V8 = BaseQueryFilters_V8<MetricsQueryFilter_V8>;

type BaseQueryFilters_V8<TFilter> = {
  aggregated?: TFilter;
  nonAggregated?: TFilter; // TODO think about name
};

// For now it's just value. In future we should support expressions
type sqlExpression_V8 = string;

type ComparisonOperator_V8 = (typeof ALLOWED_COMPARISON_OPERATORS_V8)[number];
type AggregationFuncName_V8 = (typeof ALLOWED_AGGREGATION_FUNCS_V8)[number];
const ALLOWED_COMPARISON_OPERATORS_V8 = ['=', '<>', '<', '<=', '>', '>=', 'LIKE'] as const;
const ALLOWED_AGGREGATION_FUNCS_V8 = ['AVG', 'COUNT', 'MAX', 'MIN', 'SUM'] as const;

/* Module without 'declare' keyword cannot have export declarations */
declare module DEP_V8 {
  /**
   * These are the common properties available to all queries in all datasources.
   * Specific implementations will *extend* this interface, adding the required
   * properties for the given context.
   */
  interface DataQuery$1 {
    /**
     * For mixed data sources the selected datasource is on the query level.
     * For non mixed scenarios this is undefined.
     * TODO find a better way to do this ^ that's friendly to schema
     * TODO this shouldn't be unknown but DataSourceRef | null
     */
    datasource?: unknown;
    /**
     * true if query is disabled (ie should not be returned to the dashboard)
     * Note this does not always imply that the query should not be executed since
     * the results from a hidden query may be used as the input to other queries (SSE etc)
     */
    hide?: boolean;
    /**
     * Specify the query flavor
     * TODO make this required and give it a default
     */
    queryType?: string;
    /**
     * A unique identifier for the query within the list of targets.
     * In server side expressions, the refId is used as a variable name to identify results.
     * By default, the UI will assign A->Z; however setting meaningful names may be useful.
     */
    refId: string;
  }

  interface DataSourceRef$1 {
    /**
     * The plugin type-id
     */
    type?: string;
    /**
     * Specific datasource instance
     */
    uid?: string;
  }

  interface DataQuery extends DataQuery$1 {
    /**
     * Unique, guid like, string (used only in explore mode)
     */
    key?: string;
    datasource?: DataSourceRef$1 | null;
  }

  type Exclude<T, U> = T extends U ? never : T;
  /**
   * type AB = SingleFieldOf<{a: string; b: string;}>
   * const a: AB = {a: 'test'} // OK
   * const b: AB = {b: 'test'} // OK
   * const ab: AB = {a: 'test', b: 'test' } // NOT OK
   */
  type _SingleFieldOf<T extends object, K extends keyof T> = K extends string
    ? { [KK in Exclude<keyof T, K>]?: never } & { [P in K]: T[P] }
    : never;
  type SingleFieldOf<T extends object, AVAILABLE_PROPS extends keyof T = keyof T> = _SingleFieldOf<T, AVAILABLE_PROPS>;
  type WithVersion<TVersion extends number = number> = { falconVersion: TVersion };
  type Branded<T, B> = T & { __brand: B };
  type AffinityId = Branded<string, 'AffinityId'>;

  /* Imports of original file */
  export { DataQuery, SingleFieldOf, WithVersion, AffinityId, AggregationFuncName_V8 };
}
