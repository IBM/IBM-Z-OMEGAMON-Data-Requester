import { DataQuery } from '@grafana/schema';
import { DiscriminatedUnionMap } from 'public-common';
import { AffinityId } from 'public-domain';

import {
  FalconQuery,
  FALCON_QUERY_VERSION,
  MetricsQueryParams,
  FalconMetricsQuery,
  FalconSituationsQuery,
  FalconQueryType,
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

const defaultMetricsQuery: FalconMetricsQuery = {
  queryType: 'metrics',
  ...defaultCommonQueryParams,
  falconParams: defaultMetricsQueryParams,
};

const defaultSituationsQuery: FalconSituationsQuery = { queryType: 'situations', ...defaultCommonQueryParams };

const defaultQueryMap: DiscriminatedUnionMap<FalconQuery, 'queryType'> = {
  metrics: defaultMetricsQuery,
  situations: defaultSituationsQuery,
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
