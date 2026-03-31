/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { FalconQuery_V3 } from './FalconQuery_V3';

export function updateTo_V4(v3: FalconQuery_V3): FalconQuery_V4 {
  if (v3.queryType === 'situations') {
    const newSituationsQuery: FalconSituationsQuery_V4 = { ...v3, falconVersion: FALCON_QUERY_VERSION_V4 };
    return newSituationsQuery;
  }

  const { queryType, falconVersion, ...otherProperties } = v3;

  const newMetricsQuery: FalconMetricsQuery_V4 = {
    ...otherProperties,
    falconVersion: 4,
    queryType: 'metrics',
  };

  return newMetricsQuery;
}

/* Do you want to bump a version?
 * 1. Modify FalconQuery structure(s)
 * 2. Increase version in definition (FALCON_QUERY_VERSION)
 * 3. Run yarn bump:FalconQuery
 * 4. Implement updater function in generated dump file
 */
const FALCON_QUERY_VERSION_V4 = 4;

export type FalconQuery_V4 = FalconMetricsQuery_V4 | FalconSituationsQuery_V4;

interface FalconSituationsQuery_V4 extends DEP_V4.DataQuery, DEP_V4.WithVersion<typeof FALCON_QUERY_VERSION_V4> {
  queryType: 'situations';
}

interface FalconMetricsQuery_V4 extends DEP_V4.DataQuery, DEP_V4.WithVersion<typeof FALCON_QUERY_VERSION_V4> {
  queryType: 'metrics';
  falconParams: MetricsQueryParams_V4;
}

export type MetricsQueryParams_V4 = {
  affinityId: DEP_V4.AffinityId;
  applicationCode: string;
  tableId: string;
  columns: MetricsQueryColumn_V4[];
  agentsAndGroups: string[];
  history: boolean;
  filter: MetricsQueryFilters_V4;
  orderBy: MetricsQueryOrderByItem_V4[];
  groupBy: string[];
  parmas: MetricsQueryParma_V4[]; // for SYSTEM.PARMA
  first: number;
};

type MetricsQueryParma_V4 = {
  name: string; // For example 'CURRENTATTR' 'NODELIST' and 'TIMEOUT'
  value?: string;
  length?: number;
};

type MetricsQueryColumn_V4 = {
  id: string;
  aggregationFunction?: AggregationFuncName_V4;
};

type MetricsQueryOrderByItem_V4 = {
  columnId: string;
  type: 'ASC' | 'DESC';
};

export type MetricsFilterFields_V4 = {
  or: MetricsQueryFilter_V4[];
  and: MetricsQueryFilter_V4[];
  clause: MetricsQueryFilterClause_V4;
};

export type MetricsQueryFilter_V4 = DEP_V4.SingleFieldOf<MetricsFilterFields_V4>;

export type MetricsQueryFilterClause_V4 = {
  columnId: string;
  operator: ComparisonOperator_V4;
  userDefinedValue: CmsSqlExpression_V4;
};

export type MetricsQueryFilters_V4 = {
  aggregated?: MetricsQueryFilter_V4;
  nonAggregated?: MetricsQueryFilter_V4; // TODO think about name
};

// For now it's just value. In future we should support expressions
type CmsSqlExpression_V4 = string | number;

type AggregationFuncName_V4 = (typeof ALLOWED_AGGREGATION_FUNCS_V4)[number];
type ComparisonOperator_V4 = (typeof ALLOWED_COMPARISON_OPERATORS_V4)[number];
const ALLOWED_COMPARISON_OPERATORS_V4 = ['=', '<>', '<', '<=', '>', '>=', 'LIKE'] as const;
const ALLOWED_AGGREGATION_FUNCS_V4 = ['AVG', 'COUNT', 'MAX', 'MIN', 'SUM'] as const;

/* Module without 'declare' keyword cannot have export declarations */
declare module DEP_V4 {
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

  /* Imported from './AffinityEntity' and it's dependencies */
  type Branded<K, T> = K & { __brand: T };
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
  type SingleFieldOf<T extends object> = _SingleFieldOf<T, keyof T>;

  /* Imports of original file */
  export { DataQuery, AffinityId, WithVersion, SingleFieldOf };
}
