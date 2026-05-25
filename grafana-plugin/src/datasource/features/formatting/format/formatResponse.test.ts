import { DataFrame, DataQueryResponse, FieldType } from '@grafana/data';
import { ColumnMetadata, TableMetadata } from 'public-domain';

import { FalconMetricsQuery } from 'datasource/domain';

import { formatMetricsInResponse } from './formatResponse';

const createColumnMetadata = (id: string, name: string, type: ColumnMetadata['type']): ColumnMetadata => ({
  id,
  name,
  attributeName: id,
  description: '',
  type,
  maxLength: 1,
  atomize: false,
  version: 1,
  sortType: 'lexical',
  defaultSortDirection: 'A',
  extensions: {},
});

const createTableMetadata = (): TableMetadata =>
  ({
    productCode: 'PROD',
    applicationCode: 'APP',
    applicationName: 'App',
    id: 'TABLE_1',
    name: 'Table 1',
    columns: {
      CPU: createColumnMetadata('CPU', 'CPU', 'number'),
      HOST: createColumnMetadata('HOST', 'Host', 'string'),
    },
    affinityEntity: {
      id: 'AFF',
      name: 'Affinity',
      description: '',
      displayText: 'Affinity',
      productCode: 'PROD',
      symbol: 'SYM',
    },
    version: 1,
    sampleType: 'pure',
    isMultiRow: false,
  }) as unknown as TableMetadata;

const createMetricsQuery = (refId: string, history: boolean): FalconMetricsQuery =>
  ({
    queryType: 'metrics',
    refId,
    hide: false,
    falconVersion: 11,
    falconParams: {
      affinityId: 'AFF' as never,
      agentsAndGroups: [],
      columns: [{ id: 'CPU' }],
      filter: {},
      groupBy: [],
      history,
      orderBy: [],
      parmas: [],
      tableId: 'TABLE_1',
    },
  }) as FalconMetricsQuery;

const getFirstFieldDisplayNameFromDS = (frame: DataFrame): string | undefined => {
  const [firstField] = frame.fields;
  return firstField?.config.displayNameFromDS;
};

describe(formatMetricsInResponse.name, () => {
  it('does not append labels for metrics queries regardless of history flag', () => {
    const response: DataQueryResponse = {
      data: [
        {
          name: 'TABLE_1',
          refId: 'A',
          fields: [
            {
              name: 'CPU',
              type: FieldType.number,
              values: [10],
              labels: { HOST: 'LPAR_A' },
              config: {},
            },
          ],
          length: 1,
        } as DataFrame,
        {
          name: 'TABLE_1',
          refId: 'B',
          fields: [
            {
              name: 'CPU',
              type: FieldType.number,
              values: [20],
              labels: { HOST: 'LPAR_B' },
              config: {},
            },
          ],
          length: 1,
        } as DataFrame,
      ],
    };

    const metricsQueries = [createMetricsQuery('A', false), createMetricsQuery('B', true)];

    formatMetricsInResponse(response, [createTableMetadata()], metricsQueries);

    expect(getFirstFieldDisplayNameFromDS(response.data[0] as DataFrame)).toBe('CPU');
    expect(getFirstFieldDisplayNameFromDS(response.data[1] as DataFrame)).toBe('CPU');
  });

  it('defaults to non-historical formatting when frame refId is missing', () => {
    const response: DataQueryResponse = {
      data: [
        {
          name: 'TABLE_1',
          fields: [
            {
              name: 'CPU',
              type: FieldType.number,
              values: [10],
              labels: { HOST: 'LPAR_A' },
              config: {},
            },
          ],
          length: 1,
        } as DataFrame,
      ],
    };

    const metricsQueries = [createMetricsQuery('A', true)];

    formatMetricsInResponse(response, [createTableMetadata()], metricsQueries);

    expect(getFirstFieldDisplayNameFromDS(response.data[0] as DataFrame)).toBe('CPU');
  });

  it('does not append labels for metrics queries with mixed history flags', () => {
    const response: DataQueryResponse = {
      data: [
        {
          name: 'TABLE_1',
          refId: 'B',
          fields: [
            {
              name: 'CPU',
              type: FieldType.number,
              values: [10],
              labels: { HOST: 'LPAR_B' },
              config: {},
            },
          ],
          length: 1,
        } as DataFrame,
        {
          name: 'TABLE_1',
          refId: 'C',
          fields: [
            {
              name: 'CPU',
              type: FieldType.number,
              values: [20],
              labels: { HOST: 'LPAR_C' },
              config: {},
            },
          ],
          length: 1,
        } as DataFrame,
        {
          name: 'TABLE_1',
          refId: 'D',
          fields: [
            {
              name: 'CPU',
              type: FieldType.number,
              values: [30],
              labels: { HOST: 'LPAR_D' },
              config: {},
            },
          ],
          length: 1,
        } as DataFrame,
        {
          name: 'TABLE_1',
          refId: 'F',
          fields: [
            {
              name: 'CPU',
              type: FieldType.number,
              values: [40],
              labels: { HOST: 'LPAR_F' },
              config: {},
            },
          ],
          length: 1,
        } as DataFrame,
        {
          name: 'TABLE_1',
          refId: 'G',
          fields: [
            {
              name: 'CPU',
              type: FieldType.number,
              values: [50],
              labels: { HOST: 'LPAR_G' },
              config: {},
            },
          ],
          length: 1,
        } as DataFrame,
        {
          name: 'TABLE_1',
          refId: 'H',
          fields: [
            {
              name: 'CPU',
              type: FieldType.number,
              values: [60],
              labels: { HOST: 'LPAR_H' },
              config: {},
            },
          ],
          length: 1,
        } as DataFrame,
      ],
    };

    const metricsQueries = [
      createMetricsQuery('B', true),
      createMetricsQuery('C', false),
      createMetricsQuery('D', true),
      createMetricsQuery('F', false),
      createMetricsQuery('G', true),
      createMetricsQuery('H', false),
    ];

    formatMetricsInResponse(response, [createTableMetadata()], metricsQueries);

    expect(getFirstFieldDisplayNameFromDS(response.data[0] as DataFrame)).toBe('CPU');
    expect(getFirstFieldDisplayNameFromDS(response.data[1] as DataFrame)).toBe('CPU');
    expect(getFirstFieldDisplayNameFromDS(response.data[2] as DataFrame)).toBe('CPU');
    expect(getFirstFieldDisplayNameFromDS(response.data[3] as DataFrame)).toBe('CPU');
    expect(getFirstFieldDisplayNameFromDS(response.data[4] as DataFrame)).toBe('CPU');
    expect(getFirstFieldDisplayNameFromDS(response.data[5] as DataFrame)).toBe('CPU');
  });
});
