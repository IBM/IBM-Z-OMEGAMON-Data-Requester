import { MetricsQueryParams, MetricsQueryParma } from 'datasource/domain';

import { updateTo_V9 } from './FalconQuery_V9';
import { falconSituationsQuery8, falconSituationsQuery9 } from './mocks';

describe('FalconQuery update from v8 to v9', () => {
  test('Situation query', () => {
    expect(updateTo_V9(falconSituationsQuery8)).toEqual(falconSituationsQuery9);
  });

  describe('MetricsQuery', () => {
    test('Non HISTTHRD table', () => {
      expect(
        updateTo_V9({
          refId: '1',
          queryType: 'metrics',
          falconVersion: 8,
          falconParams: {
            tableId: 'ASCPUUTIL',
          } as MetricsQueryParams,
        })
      ).toStrictEqual({
        refId: '1',
        queryType: 'metrics',
        falconVersion: 9,
        falconParams: {
          tableId: 'ASCPUUTIL',
        } as MetricsQueryParams,
      });
    });

    test('HISTTHRD table without history parma', () => {
      expect(
        updateTo_V9({
          refId: '1',
          queryType: 'metrics',
          falconVersion: 8,
          falconParams: {
            tableId: 'HISTTHRD',
            parmas: [] as MetricsQueryParma[],
          } as MetricsQueryParams,
        })
      ).toStrictEqual({
        refId: '1',
        queryType: 'metrics',
        falconVersion: 9,
        falconParams: {
          tableId: 'HISTTHRD',
          history: true,
          parmas: [] as MetricsQueryParma[],
        } as MetricsQueryParams,
      });
    });

    test('HISTTHRD table with history parmas', () => {
      expect(
        updateTo_V9({
          refId: '1',
          queryType: 'metrics',
          falconVersion: 8,
          falconParams: {
            tableId: 'HISTTHRD',
            parmas: [
              {
                name: 'random',
                value: 'random',
                length: 6,
              },
              {
                name: 'NTHSTIME',
                value: '${__from:date:YYYYMMDDHHmmss}000000',
                length: 20,
              },
              {
                name: 'NTHETIME',
                value: '${__to:date:YYYYMMDDHHmmss}000000',
                length: 20,
              },
            ],
          } as MetricsQueryParams,
        })
      ).toStrictEqual({
        refId: '1',
        queryType: 'metrics',
        falconVersion: 9,
        falconParams: {
          tableId: 'HISTTHRD',
          history: true,
          parmas: [
            {
              name: 'random',
              value: 'random',
              length: 6,
            },
          ],
        } as MetricsQueryParams,
      });
    });

    test('HISTTHRD table with history parmas', () => {
      expect(
        updateTo_V9({
          refId: '1',
          queryType: 'metrics',
          falconVersion: 8,
          falconParams: {
            tableId: 'HISTTHRD',
            parmas: [
              {
                name: 'random',
                value: 'random',
                length: 6,
              },
              {
                name: 'NTHSTIME',
                value: '${__from:date:YYYYMMDDHHmmss}000000',
                length: 20,
              },
              {
                name: 'NTHETIME',
                value: '${__to:date:YYYYMMDDHHmmss}000000',
                length: 20,
              },
            ],
          } as MetricsQueryParams,
        })
      ).toStrictEqual({
        refId: '1',
        queryType: 'metrics',
        falconVersion: 9,
        falconParams: {
          tableId: 'HISTTHRD',
          history: true,
          parmas: [
            {
              name: 'random',
              value: 'random',
              length: 6,
            },
          ],
        } as MetricsQueryParams,
      });
    });

    test('ATFSUMS table with history parmas', () => {
      expect(
        updateTo_V9({
          refId: '1',
          queryType: 'metrics',
          falconVersion: 8,
          falconParams: {
            tableId: 'ATFSUMS',
            parmas: [
              {
                name: 'EDATE',
                value: '20250317',
                length: 20,
              },
              {
                name: 'random',
                value: 'random',
                length: 6,
              },
              {
                name: 'ETIME',
                value: '193000',
                length: 20,
              },
            ],
          } as MetricsQueryParams,
        })
      ).toStrictEqual({
        refId: '1',
        queryType: 'metrics',
        falconVersion: 9,
        falconParams: {
          tableId: 'ATFSUMS',
          history: true,
          parmas: [
            {
              name: 'random',
              value: 'random',
              length: 6,
            },
          ],
        } as MetricsQueryParams,
      });
    });
  });
});
