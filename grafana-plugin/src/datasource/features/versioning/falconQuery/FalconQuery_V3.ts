/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { FalconQuery2 } from './FalconQuery2';

export function updateTo_V3(v2: FalconQuery2): FalconQuery_V3 {
  if (v2.queryType === 'situations') {
    const v2SituationsQuery: FalconSituationsQuery_V3 = { ...v2, falconVersion: FALCON_QUERY_VERSION_V3 };
    return v2SituationsQuery;
  }

  const { params, falconVersion, ...otherV2Properties } = v2;

  const v3MetricsQuery: FalconMetricsQuery_V3 = {
    ...otherV2Properties,
    falconVersion: FALCON_QUERY_VERSION_V3,
    falconParams: v2.params,
  };

  return v3MetricsQuery;
}

const FALCON_QUERY_VERSION_V3 = 3;

export type FalconQuery_V3 = FalconMetricsQuery_V3 | FalconSituationsQuery_V3;

interface FalconSituationsQuery_V3 extends DEP_V3.DataQuery, DEP_V3.WithVersion<typeof FALCON_QUERY_VERSION_V3> {
  queryType: 'situations';
}

interface FalconMetricsQuery_V3 extends DEP_V3.DataQuery, DEP_V3.WithVersion<typeof FALCON_QUERY_VERSION_V3> {
  queryType: 'regular';
  falconParams: MetricsQueryParams_V3;
}

type MetricsQueryParams_V3 = {
  affinityId: DEP_V3.AffinityId;
  applicationCode: string;
  tableId: string;
  columns: RegularQueryColumn_V3[];
  agentsAndGroups: string[];
  history: boolean;
  filter: MetricsQueryFilters_V3;
  orderBy: RegularQueryOrderByItem_V3[];
  groupBy: string[];
  parmas: RegularQueryParma_V3[]; // for SYSTEM.PARMA
  first: number;
};

type RegularQueryParma_V3 = {
  name: string; // For example 'CURRENTATTR' 'NODELIST' and 'TIMEOUT'
  value?: string;
  length?: number;
};

type RegularQueryColumn_V3 = {
  id: string;
  aggregationFunction?: AggregationFuncName_V3;
};

type RegularQueryOrderByItem_V3 = {
  columnId: string;
  type: 'ASC' | 'DESC';
};

type RegularFilterFields_V3 = {
  or: RegularQueryFilter_V3[];
  and: RegularQueryFilter_V3[];
  clause: RegularQueryFilterClause_V3;
};

type RegularQueryFilter_V3 = DEP_V3.SingleFieldOf<RegularFilterFields_V3>;

type RegularQueryFilterClause_V3 = {
  columnId: string;
  operator: ComparisonOperator_V3;
  userDefinedValue: CmsSqlExpression_V3;
};

type MetricsQueryFilters_V3 = {
  aggregated?: RegularQueryFilter_V3;
  nonAggregated?: RegularQueryFilter_V3; // TODO think about name
};

// For now it's just value. In future we should support expressions
type CmsSqlExpression_V3 = string | number;

type AggregationFuncName_V3 = (typeof ALLOWED_AGGREGATION_FUNCS_V3)[number];
type ComparisonOperator_V3 = (typeof ALLOWED_COMPARISON_OPERATORS_V3)[number];
const ALLOWED_COMPARISON_OPERATORS_V3 = ['=', '<>', '<', '<=', '>', '>=', 'LIKE'] as const;
const ALLOWED_AGGREGATION_FUNCS_V3 = ['AVG', 'COUNT', 'MAX', 'MIN', 'SUM'] as const;

/* Module without 'declare' keyword cannot have export declarations */
declare module DEP_V3 {
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
