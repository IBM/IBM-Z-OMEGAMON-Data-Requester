import { MetricsQueryParams, MetricsQueryParma } from 'datasource/domain';

import { updateTo_V10 } from './FalconQuery_V10';
import { falconSituationsQuery9 } from './mocks';

describe('FalconQuery update from v9 to v10', () => {
  test('Situation query', () => {
    expect(updateTo_V10(falconSituationsQuery9)).toEqual({ ...falconSituationsQuery9, falconVersion: 10 });
  });

  test('Non-target table', () => {
    expect(
      updateTo_V10({
        refId: '1',
        queryType: 'metrics',
        falconVersion: 9,
        falconParams: {
          tableId: 'ASCPUUTIL',
        } as MetricsQueryParams,
      })
    ).toStrictEqual({
      refId: '1',
      queryType: 'metrics',
      falconVersion: 10,
      falconParams: {
        tableId: 'ASCPUUTIL',
      } as MetricsQueryParams,
    });
  });

  test('ZCSUMM table with history parmas', () => {
    expect(
      updateTo_V10({
        refId: '1',
        queryType: 'metrics',
        falconVersion: 9,
        falconParams: {
          tableId: 'ZCSUMM',
          parmas: [
            {
              name: 'STIME',
              value: '1250314091805654',
              length: 16,
            },
            {
              name: 'random',
              value: 'random',
              length: 6,
            },
          ],
        } as MetricsQueryParams,
      })
    ).toStrictEqual({
      refId: '1',
      queryType: 'metrics',
      falconVersion: 10,
      falconParams: {
        tableId: 'ZCSUMM',
        history: true,
        parmas: [
          {
            name: 'random',
            value: 'random',
            length: 6,
          },
        ] as MetricsQueryParma[],
      } as MetricsQueryParams,
    });
  });
});
