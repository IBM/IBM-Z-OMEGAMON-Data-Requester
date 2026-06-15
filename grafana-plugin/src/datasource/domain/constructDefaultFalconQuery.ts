import { DataQuery } from '@grafana/schema';
import { DiscriminatedUnionMap } from 'public-common';
import { AffinityId } from 'public-domain';

import {
  FalconQuery,
  FALCON_QUERY_VERSION,
  MetricsQueryParams,
  FalconMetricsQuery,
  FalconTimeSeriesQuery,
  FalconSituationsQuery,
  FalconManagedSystemsQuery,
  FalconQueryType,
  ManagedSystemsQueryParams,
  TimeSeriesQueryParams,
} from './FalconQuery';

const defaultCommonQueryParams: Pick<FalconQuery, 'falconVersion' | 'hide' | 'refId'> = {
  falconVersion: FALCON_QUERY_VERSION,
  refId: 'A',
  hide: false,
};

export const defaultMetricsQueryParams: MetricsQueryParams = {
  affinityId: '' as AffinityId,
  tableId: '',
  columns: [],
  agentsAndGroups: [],
  history: false,
  filter: {},
  orderBy: [],
  groupBy: [],
  parmas: [],
};

export const defaultManagedSystemsQueryParams: ManagedSystemsQueryParams = {
  affinityId: '' as AffinityId,
};

export const defaultTimeSeriesQueryParams: TimeSeriesQueryParams = {
  affinityId: '' as AffinityId,
  tableId: '',
  labels: [],
  columns: [],
  aggregationFunctions: [],
  agentsAndGroups: [],
  aggregationIntervalMinutes: -1,
  orderBy: [],
};

const defaultMetricsQuery: FalconMetricsQuery = {
  queryType: 'metrics',
  ...defaultCommonQueryParams,
  falconParams: defaultMetricsQueryParams,
};

const defaultTimeSeriesQuery: FalconTimeSeriesQuery = {
  queryType: 'time-series',
  ...defaultCommonQueryParams,
  falconParams: defaultTimeSeriesQueryParams,
};

const defaultSituationsQuery: FalconSituationsQuery = { queryType: 'situations', ...defaultCommonQueryParams };
const defaultManagedSystemsQuery: FalconManagedSystemsQuery = {
  queryType: 'managedSystems',
  ...defaultCommonQueryParams,
  managedSystemsParams: defaultManagedSystemsQueryParams,
};

const defaultQueryMap: DiscriminatedUnionMap<FalconQuery, 'queryType'> = {
  metrics: defaultMetricsQuery,
  'time-series': defaultTimeSeriesQuery,
  situations: defaultSituationsQuery,
  managedSystems: defaultManagedSystemsQuery,
};

export function constructDefaultFalconQuery(queryType: FalconQueryType, previousQuery?: DataQuery): FalconQuery {
  return {
    ...defaultQueryMap[queryType],
    refId: previousQuery?.refId ?? defaultQueryMap[queryType].refId,
    hide: previousQuery?.hide ?? defaultQueryMap[queryType].hide,
    key: previousQuery?.key,
    datasource: previousQuery?.datasource,
  };
}
