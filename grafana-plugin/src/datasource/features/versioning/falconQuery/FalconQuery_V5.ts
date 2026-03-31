/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { MetadataLoader } from 'datasource/features/metadata';

import { FalconQuery_V4 } from './FalconQuery_V4';
import { prepareQueryParams_V5 } from './FalconQuery_V5_updateUtils';

// Current updater will update all the values in filter clauses
// So now userDefinedValue variables will store formatted values (with metadata enums, scaleFactor etc. been applied)
export async function updateTo_V5(v4: FalconQuery_V4, metadataLoader: MetadataLoader): Promise<FalconQuery_V5> {
  if (v4.queryType === 'situations') {
    const newSituationsQuery: FalconSituationsQuery_V5 = { ...v4, falconVersion: FALCON_QUERY_VERSION_V5 };
    return newSituationsQuery;
  }

  const { falconVersion, falconParams, ...otherProperties } = v4;

  const tableMetadata = await metadataLoader.getTableMetadata(falconParams.tableId);
  const formatedParams = prepareQueryParams_V5(falconParams, tableMetadata);

  const newMetricsQuery: FalconMetricsQuery_V5 = {
    ...otherProperties,
    falconVersion: FALCON_QUERY_VERSION_V5,
    falconParams: formatedParams,
  };

  return newMetricsQuery;
}

/* Do you want to bump a version?
 * 1. Modify FalconQuery structure(s)
 * 2. Increase version in definition (FALCON_QUERY_VERSION)
 * 3. Run yarn bump:FalconQuery
 * 4. Implement updater function in generated dump file
 */
const FALCON_QUERY_VERSION_V5 = 5;

export type FalconQuery_V5 = FalconMetricsQuery_V5 | FalconSituationsQuery_V5;

interface FalconSituationsQuery_V5 extends DEP_V5.DataQuery, DEP_V5.WithVersion<typeof FALCON_QUERY_VERSION_V5> {
  queryType: 'situations';
}

interface FalconMetricsQuery_V5 extends DEP_V5.DataQuery, DEP_V5.WithVersion<typeof FALCON_QUERY_VERSION_V5> {
  queryType: 'metrics';
  falconParams: MetricsQueryParams_V5;
}

export type MetricsQueryParams_V5 = {
  affinityId: DEP_V5.AffinityId;
  applicationCode: string;
  tableId: string;
  columns: MetricsQueryColumn_V5[];
  agentsAndGroups: string[];
  history: boolean;
  filter: MetricsQueryFilters_V5;
  orderBy: MetricsQueryOrderByItem_V5[];
  groupBy: string[];
  parmas: MetricsQueryParma_V5[]; // for SYSTEM.PARMA
  first: number;
};

type MetricsQueryParma_V5 = {
  name: string; // For example 'CURRENTATTR' 'NODELIST' and 'TIMEOUT'
  value?: string;
  length?: number;
};

type MetricsQueryColumn_V5 = {
  id: string;
  aggregationFunction?: AggregationFuncName_V5;
};

type MetricsQueryOrderByItem_V5 = {
  columnId: string;
  type: 'ASC' | 'DESC';
};

type MetricsFilterFields_V5 = {
  or: MetricsQueryFilter_V5[];
  and: MetricsQueryFilter_V5[];
  clause: MetricsQueryFilterClause_V5;
};

export type MetricsQueryFilter_V5 = DEP_V5.SingleFieldOf<MetricsFilterFields_V5>;

// With current version in userDefined value we store values with metadata been applied
export type MetricsQueryFilterClause_V5 = {
  columnId: string;
  operator: ComparisonOperator_V5;
  userDefinedValue: sqlExpression;
};

export type ItmQueryFilterClause = {
  columnId: string;
  operator: ComparisonOperator_V5;
  userDefinedValue: cmsExpression;
};

export type MetricsQueryFilters_V5 = {
  aggregated?: MetricsQueryFilter_V5;
  nonAggregated?: MetricsQueryFilter_V5; // TODO think about name
};

export type ItmQueryFilters_V5 = {
  aggregated?: MetricsQueryFilter_V5;
  nonAggregated?: MetricsQueryFilter_V5; // TODO think about name
};

// For now it's just value. In future we should support expressions
type sqlExpression = string;
type cmsExpression = string;

type AggregationFuncName_V5 = (typeof ALLOWED_AGGREGATION_FUNCS_V5)[number];
type ComparisonOperator_V5 = (typeof ALLOWED_COMPARISON_OPERATORS_V5)[number];
const ALLOWED_COMPARISON_OPERATORS_V5 = ['=', '<>', '<', '<=', '>', '>=', 'LIKE'] as const;
const ALLOWED_AGGREGATION_FUNCS_V5 = ['AVG', 'COUNT', 'MAX', 'MIN', 'SUM'] as const;

/* Module without 'declare' keyword cannot have export declarations */
declare module DEP_V5 {
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
  type SingleFieldOf<T extends object, AVAILABLE_PROPS extends keyof T = keyof T> = _SingleFieldOf<T, AVAILABLE_PROPS>;

  /* Imports of original file */
  export { DataQuery, AffinityId, WithVersion, SingleFieldOf };
}
