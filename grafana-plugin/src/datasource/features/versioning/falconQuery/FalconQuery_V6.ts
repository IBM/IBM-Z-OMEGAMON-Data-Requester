/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */

import { FalconQuery_V5 } from './FalconQuery_V5';

export function updateTo_V6(current: FalconQuery_V5): FalconQuery_V6 {
  if (current.queryType !== 'metrics') {
    return {
      ...current,
      falconVersion: 6,
    };
  }
  const { agentsAndGroups } = current.falconParams;
  const newAgentsAndGroups = agentsAndGroups.map((agent) => ({ id: 'agentOrGroupName' as const, name: agent }));

  return {
    ...current,
    falconVersion: 6,
    falconParams: {
      ...current.falconParams,
      agentsAndGroups: newAgentsAndGroups,
    },
  };
}

/* Do you want to bump a version?
 * 1. Modify FalconQuery structure(s)
 * 2. Increase version in definition (FALCON_QUERY_VERSION)
 * 3. Run yarn bump:FalconQuery
 * 4. Implement updater function in generated dump file
 */
const FALCON_QUERY_VERSION_V6 = 6;

export type FalconQuery_V6 = FalconMetricsQuery_V6 | FalconSituationsQuery_V6;

interface FalconSituationsQuery_V6 extends DEP_V6.DataQuery, DEP_V6.WithVersion<typeof FALCON_QUERY_VERSION_V6> {
  queryType: 'situations';
}

interface FalconMetricsQuery_V6 extends DEP_V6.DataQuery, DEP_V6.WithVersion<typeof FALCON_QUERY_VERSION_V6> {
  queryType: 'metrics';
  falconParams: MetricsQueryParams_V6;
}

type MetricsQueryParams_V6 = {
  affinityId: DEP_V6.AffinityId;
  applicationCode: string;
  tableId: string;
  columns: MetricsQueryColumn_V6[];
  agentsAndGroups: SourceDef_V6[];
  history: boolean;
  filter: MetricsQueryFilters_V6;
  orderBy: MetricsQueryOrderByItem_V6[];
  groupBy: string[];
  parmas: MetricsQueryParma_V6[]; // for SYSTEM.PARMA
  first: number;
};

/** Structures that define agent or set of agents to get the data from. */
type SourceDef_V6 = AgentOrGroupName_V6 | AtLparDef_V6;

type AgentOrGroupName_V6 = {
  id: 'agentOrGroupName';
  /** Originnode or group name. Ex.: IB1C:RSD1:DB2 or *MVS_DB2 */
  name: string;
};

/** Represented by @Lpar() and is only used for MVS Systems */
type AtLparDef_V6 = {
  id: 'atLpar';
  lpars: string[];
};

type MetricsQueryParma_V6 = {
  name: string; // For example 'CURRENTATTR' 'NODELIST' and 'TIMEOUT'
  value?: string;
  length?: number;
};

type MetricsQueryColumn_V6 = {
  id: string;
  aggregationFunction?: AggregationFuncName_V6;
};

type MetricsQueryOrderByItem_V6 = {
  columnId: string;
  type: 'ASC' | 'DESC';
};

type MetricsFilterFields_V6<TClause> = {
  or: Array<BaseQueryFilter_V6<TClause>>;
  and: Array<BaseQueryFilter_V6<TClause>>;
  clause: TClause;
};

type BaseQueryFilter_V6<TClause> = DEP_V6.SingleFieldOf<MetricsFilterFields_V6<TClause>>;

type MetricsQueryFilter_V6 = BaseQueryFilter_V6<MetricsQueryFilterClause_V6>;

type MetricsQueryFilterClause_V6 = {
  columnId: string;
  operator: ComparisonOperator_V6;
  userDefinedValue: sqlExpression_V6;
};

type MetricsQueryFilters_V6 = BaseQueryFilters_V6<MetricsQueryFilter_V6>;

type BaseQueryFilters_V6<TFilter> = {
  aggregated?: TFilter;
  nonAggregated?: TFilter; // TODO think about name
};

// For now it's just value. In future we should support expressions
type sqlExpression_V6 = string;

type AggregationFuncName_V6 = (typeof ALLOWED_AGGREGATION_FUNCS_V6)[number];
type ComparisonOperator_V6 = (typeof ALLOWED_COMPARISON_OPERATORS_V6)[number];
const ALLOWED_COMPARISON_OPERATORS_V6 = ['=', '<>', '<', '<=', '>', '>=', 'LIKE'] as const;
const ALLOWED_AGGREGATION_FUNCS_V6 = ['AVG', 'COUNT', 'MAX', 'MIN', 'SUM'] as const;

/* Module without 'declare' keyword cannot have export declarations */
declare module DEP_V6 {
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

  type Branded<T, B> = T & { __brand: B };
  type AffinityId = Branded<string, 'AffinityId'>;
  type WithVersion<TVersion extends number = number> = { falconVersion: TVersion };
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

  /* Imports of original file */
  export { DataQuery, AffinityId, WithVersion, SingleFieldOf };
}
