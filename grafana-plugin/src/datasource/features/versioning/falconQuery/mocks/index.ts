import { AffinityId } from 'public-domain';

import type {
  FalconMetricsQuery0,
  FalconQuery0,
  FalconSituationsQuery0,
  FalconMetricsQuery1,
  FalconSituationsQuery1,
  FalconMetricsQuery2,
  FalconSituationsQuery2,
  FalconQuery_V3,
  FalconQuery_V4,
  FalconQuery_V5,
  FalconQuery_V6,
  FalconQuery_V7,
  FalconQuery_V8,
  FalconQuery_V9,
} from 'datasource/features/versioning/falconQuery';

const commonQueryProperties: Pick<FalconQuery0, 'refId' | 'datasource' | 'hide'> = {
  refId: 'A',
  datasource: {
    type: 'rocketsoftware-omegamon-datasource',
    uid: 'd1317b9c-2ba0-4292-863b-c9c4ae8d2556',
  },
  hide: false,
};

const falconMetricsQuery0: FalconMetricsQuery0 = {
  ...commonQueryProperties,
  queryType: 'regular',
  params: {
    affinityId: '%IBM.STATIC007' as AffinityId,
    applicationCode: 'KM5',
    columns: [
      {
        id: 'ASID',
      },
      {
        id: 'ASTYPE',
      },
    ],
    filter: {},
    first: 0,
    groupBy: [],
    history: false,
    orderBy: [],
    originnodesAndGroups: ['*MVS_SYSTEM'],
    params: [],
    tableId: 'ASCPUUTIL',
  },
};

const falconSituationsQuery0: FalconSituationsQuery0 = {
  ...commonQueryProperties,
  queryType: 'situations',
};

const falconMetricsQuery1: FalconMetricsQuery1 = {
  ...falconMetricsQuery0,
  falconVersion: 1,
};

const falconSituationsQuery1: FalconSituationsQuery1 = {
  ...falconSituationsQuery0,
  falconVersion: 1,
};

const falconMetricsQuery2: FalconMetricsQuery2 = {
  ...falconMetricsQuery0,
  falconVersion: 2,
  queryType: 'regular',
  params: {
    affinityId: '%IBM.STATIC007' as AffinityId,
    applicationCode: 'KM5',
    columns: [
      {
        id: 'ASID',
      },
      {
        id: 'ASTYPE',
      },
    ],
    filter: {},
    first: 0,
    groupBy: [],
    history: false,
    orderBy: [],
    agentsAndGroups: ['*MVS_SYSTEM'],
    parmas: [],
    tableId: 'ASCPUUTIL',
  },
};

const falconSituationsQuery2: FalconSituationsQuery2 = {
  ...falconSituationsQuery0,
  falconVersion: 2,
};

const falconMetricsQuery3: FalconQuery_V3 = {
  ...commonQueryProperties,
  falconVersion: 3,
  queryType: 'regular',
  falconParams: {
    affinityId: '%IBM.STATIC007' as AffinityId,
    applicationCode: 'KM5',
    columns: [
      {
        id: 'ASID',
      },
      {
        id: 'ASTYPE',
      },
    ],
    filter: {},
    first: 0,
    groupBy: [],
    history: false,
    orderBy: [],
    agentsAndGroups: ['*MVS_SYSTEM'],
    parmas: [],
    tableId: 'ASCPUUTIL',
  },
};

const falconSituationsQuery3: FalconQuery_V3 = {
  ...falconSituationsQuery0,
  falconVersion: 3,
};

const falconMetricsQuery4: FalconQuery_V4 = {
  ...commonQueryProperties,
  falconVersion: 4,
  queryType: 'metrics',
  falconParams: {
    affinityId: '%IBM.STATIC007' as AffinityId,
    applicationCode: 'KM5',
    columns: [
      {
        id: 'ASID',
      },
      {
        id: 'ASTYPE',
      },
    ],
    filter: {},
    first: 0,
    groupBy: [],
    history: false,
    orderBy: [],
    agentsAndGroups: ['*MVS_SYSTEM'],
    parmas: [],
    tableId: 'ASCPUUTIL',
  },
};

const falconSituationsQuery4: FalconQuery_V4 = {
  ...falconSituationsQuery0,
  falconVersion: 4,
};

const falconMetricsQuery5: FalconQuery_V5 = {
  ...commonQueryProperties,
  falconVersion: 5,
  queryType: 'metrics',
  falconParams: {
    affinityId: '%IBM.STATIC007' as AffinityId,
    applicationCode: 'KM5',
    columns: [
      {
        id: 'ASID',
      },
      {
        id: 'ASTYPE',
      },
    ],
    filter: {},
    first: 0,
    groupBy: [],
    history: false,
    orderBy: [],
    agentsAndGroups: ['*MVS_SYSTEM'],
    parmas: [],
    tableId: 'ASCPUUTIL',
  },
};

const falconSituationsQuery5: FalconQuery_V5 = {
  ...falconSituationsQuery0,
  falconVersion: 5,
};

const falconMetricsQuery6: FalconQuery_V6 = {
  ...commonQueryProperties,
  falconVersion: 6,
  queryType: 'metrics',
  falconParams: {
    affinityId: '%IBM.STATIC007' as AffinityId,
    applicationCode: 'KM5',
    columns: [
      {
        id: 'ASID',
      },
      {
        id: 'ASTYPE',
      },
    ],
    filter: {},
    first: 0,
    groupBy: [],
    history: false,
    orderBy: [],
    agentsAndGroups: [{ id: 'agentOrGroupName', name: '*MVS_SYSTEM' }],
    parmas: [],
    tableId: 'ASCPUUTIL',
  },
};

const falconSituationsQuery6: FalconQuery_V6 = {
  ...falconSituationsQuery0,
  falconVersion: 6,
};

const falconMetricsQuery7: FalconQuery_V7 = {
  ...commonQueryProperties,
  falconVersion: 7,
  queryType: 'metrics',
  falconParams: {
    affinityId: '%IBM.STATIC007' as AffinityId,
    applicationCode: 'KM5',
    columns: [
      {
        id: 'ASID',
      },
      {
        id: 'ASTYPE',
      },
    ],
    filter: {},
    first: 0,
    groupBy: [],
    history: false,
    orderBy: [],
    agentsAndGroups: [{ id: 'agentOrGroupName', name: '*MVS_SYSTEM' }],
    parmas: [],
    tableId: 'ASCPUUTIL',
  },
};

const falconSituationsQuery7: FalconQuery_V7 = {
  ...falconSituationsQuery0,
  falconVersion: 7,
};

const falconMetricsQuery8: FalconQuery_V8 = {
  ...commonQueryProperties,
  falconVersion: 8,
  queryType: 'metrics',
  falconParams: {
    affinityId: '%IBM.STATIC007' as AffinityId,
    columns: [
      {
        id: 'ASID',
      },
      {
        id: 'ASTYPE',
      },
    ],
    filter: {},
    first: 0,
    groupBy: [],
    history: false,
    orderBy: [],
    agentsAndGroups: [{ id: 'agentOrGroupName', name: '*MVS_SYSTEM' }],
    parmas: [],
    tableId: 'ASCPUUTIL',
  },
};

export const falconSituationsQuery8: FalconQuery_V8 = {
  ...falconSituationsQuery0,
  falconVersion: 8,
};

const falconMetricsQuery9: FalconQuery_V9 = {
  ...commonQueryProperties,
  falconVersion: 9,
  queryType: 'metrics',
  falconParams: {
    affinityId: '%IBM.STATIC007' as AffinityId,
    columns: [
      {
        id: 'ASID',
      },
      {
        id: 'ASTYPE',
      },
    ],
    filter: {},
    first: 0,
    groupBy: [],
    history: false,
    orderBy: [],
    agentsAndGroups: [{ id: 'agentOrGroupName', name: '*MVS_SYSTEM' }],
    parmas: [],
    tableId: 'ASCPUUTIL',
  },
};

export const falconSituationsQuery9: FalconQuery_V9 = {
  ...falconSituationsQuery0,
  falconVersion: 9,
};

type FalconQueryMocks = Array<{ metrics: object; situations: object }>;

export const falconQueryMocks: FalconQueryMocks = [
  { metrics: falconMetricsQuery0, situations: falconSituationsQuery0 },
  { metrics: falconMetricsQuery1, situations: falconSituationsQuery1 },
  { metrics: falconMetricsQuery2, situations: falconSituationsQuery2 },
  { metrics: falconMetricsQuery3, situations: falconSituationsQuery3 },
  { metrics: falconMetricsQuery4, situations: falconSituationsQuery4 },
  { metrics: falconMetricsQuery5, situations: falconSituationsQuery5 },
  { metrics: falconMetricsQuery6, situations: falconSituationsQuery6 },
  { metrics: falconMetricsQuery7, situations: falconSituationsQuery7 },
  { metrics: falconMetricsQuery8, situations: falconSituationsQuery8 },
  { metrics: falconMetricsQuery9, situations: falconSituationsQuery9 },
];
