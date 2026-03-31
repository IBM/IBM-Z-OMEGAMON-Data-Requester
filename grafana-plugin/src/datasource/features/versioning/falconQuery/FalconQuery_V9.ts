/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
import { FalconQuery_V8 } from './FalconQuery_V8';

const NON_ITM_HISTORY_TABLES: Record<string, Set<string>> = {
  HISTTHRD: new Set(['NTHSTIME', 'NTHETIME']),
  ZCDETL: new Set(['STIME', 'ETIME']),
  ATFSUMS: new Set(['SDATE', 'STIME', 'EDATE', 'ETIME']),
  CICSODV: new Set(['HTOKEN']),
};

export function updateTo_V9(current: FalconQuery_V8): FalconQuery_V9 {
  if (current.queryType === 'situations') {
    return { ...current, falconVersion: 9 };
  }

  const parmaNames = NON_ITM_HISTORY_TABLES[current.falconParams.tableId];
  if (!parmaNames) {
    return { ...current, falconVersion: 9 };
  }

  const newParmas = current.falconParams.parmas.filter((parma) => !parmaNames.has(parma.name));
  return {
    ...current,
    falconParams: {
      ...current.falconParams,
      parmas: newParmas,
      history: true,
    },
    falconVersion: 9,
  };
}

/* Do you want to bump a version?
 * 1. Modify FalconQuery structure(s)
 * 2. Increase version in definition (FALCON_QUERY_VERSION)
 * 3. Run yarn bump:FalconQuery
 * 4. Implement updater function in generated dump file
 */
const FALCON_QUERY_VERSION_V9 = 9;

export type FalconQuery_V9 = FalconMetricsQuery_V9 | FalconSituationsQuery_V9;

interface FalconSituationsQuery_V9 extends DEP_V9.DataQuery, DEP_V9.WithVersion<typeof FALCON_QUERY_VERSION_V9> {
  queryType: 'situations';
}

interface FalconMetricsQuery_V9 extends DEP_V9.DataQuery, DEP_V9.WithVersion<typeof FALCON_QUERY_VERSION_V9> {
  queryType: 'metrics';
  falconParams: MetricsQueryParams_V9;
}

type MetricsQueryParams_V9 = {
  affinityId: DEP_V9.AffinityId;
  tableId: string;
  columns: MetricsQueryColumn_V9[];
  agentsAndGroups: SourceDef_V9[];
  history: boolean;
  filter: MetricsQueryFilters_V9;
  orderBy: MetricsQueryOrderByItem_V9[];
  groupBy: string[];
  parmas: MetricsQueryParma_V9[]; // for SYSTEM.PARMA
  first?: number;
};

/** Structures that define agent or set of agents to get the data from. */
type SourceDef_V9 = AgentOrGroupName_V9 | AtLparDef_V9;

type AgentOrGroupName_V9 = {
  id: 'agentOrGroupName';
  /** Originnode or group name. Ex.: IB1C:RSD1:DB2 or *MVS_DB2 */
  name: string;
};

/** Represented by @Lpar() and is only used for MVS Systems */
type AtLparDef_V9 = {
  id: 'atLpar';
  lpars: string[];
};

type MetricsQueryParma_V9 = {
  name: string; // For example 'CURRENTATTR' 'NODELIST' and 'TIMEOUT'
  value?: string;
  length?: number;
};

type MetricsQueryColumn_V9 = {
  id: string;
  aggregationFunction?: DEP_V9.AggregationFuncName;
};

type MetricsQueryOrderByItem_V9 = {
  columnId: string;
  type: 'ASC' | 'DESC';
};

type MetricsFilterFields_V9<TClause> = {
  or: Array<BaseQueryFilter_V9<TClause>>;
  and: Array<BaseQueryFilter_V9<TClause>>;
  clause: TClause;
};

type BaseQueryFilter_V9<TClause> = DEP_V9.SingleFieldOf<MetricsFilterFields_V9<TClause>>;

type MetricsQueryFilter_V9 = BaseQueryFilter_V9<MetricsQueryFilterClause_V9>;

type MetricsQueryFilterClause_V9 = {
  columnId: string;
  operator: ComparisonOperator_V9;
  userDefinedValue: sqlExpression_V9;
};

type MetricsQueryFilters_V9 = BaseQueryFilters_V9<MetricsQueryFilter_V9>;

type BaseQueryFilters_V9<TFilter> = {
  aggregated?: TFilter;
  nonAggregated?: TFilter; // TODO think about name
};

// For now it's just value. In future we should support expressions
type sqlExpression_V9 = string;

type ComparisonOperator_V9 = (typeof ALLOWED_COMPARISON_OPERATORS_V9)[number];
const ALLOWED_COMPARISON_OPERATORS_V9 = ['=', '<>', '<', '<=', '>', '>=', 'LIKE'] as const;

const ALLOWED_AGGREGATION_FUNCS = ['AVG', 'COUNT', 'MAX', 'MIN', 'SUM'] as const;

/* Module without 'declare' keyword cannot have export declarations */
declare module DEP_V9 {
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
     * If hide is set to true, Grafana will filter out the response(s) associated with this query before returning it to the panel.
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
     *  Datasource API version
     */
    apiVersion?: string;
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
  type Branded<T, B> = T & { __brand: B };
  type AffinityId = Branded<string, 'AffinityId'>;
  type WithVersion<TVersion extends number = number> = { falconVersion: TVersion };

  type AggregationFuncName = (typeof ALLOWED_AGGREGATION_FUNCS)[number];

  /* Imports of original file */
  export { DataQuery, SingleFieldOf, AffinityId, WithVersion, AggregationFuncName };
}
