import { AffinityId } from 'public-domain';

import { AGGREGATION_INTERVAL, TimeSeriesQueryParams } from 'datasource/domain';
import { mockedMetadataLoader } from 'datasource/features/metadata/mocks';

import { validateMetrics, validateTimeSeriesQuery } from './validateTimeSeriesQuery';

jest.mock('@grafana/runtime', () => ({
  getTemplateSrv: () => ({
    getVariables: () => [],
  }),
}));

const VALID_AFFINITY_ID = '%IBM.STATIC017' as AffinityId;
const VALID_TABLE_ID = 'REALTHDA';

const validQuery: TimeSeriesQueryParams = {
  affinityId: VALID_AFFINITY_ID,
  tableId: VALID_TABLE_ID,
  labels: [],
  columns: ['ENCLCPUT'],
  aggregationFunctions: ['AVG'],
  agentsAndGroups: [{ id: 'agentOrGroupName', name: 'IB1C:RSD1:DB2' }],
  aggregationIntervalMinutes: AGGREGATION_INTERVAL.HOURLY,
  orderBy: [],
};

describe('validateMetrics', () => {
  test('returns error when no columns selected', () => {
    expect(validateMetrics({ ...validQuery, columns: [] })).toEqual([
      { severity: 'error', message: 'At least one metric must be selected' },
    ]);
  });

  test('returns no errors when columns are selected', () => {
    expect(validateMetrics(validQuery)).toEqual([]);
  });
});

describe('validateTimeSeriesQuery', () => {
  describe('affinityId validation (early return)', () => {
    test('returns affinityId error when affinityId is missing', async () => {
      const result = await validateTimeSeriesQuery(
        { ...validQuery, affinityId: '' as AffinityId },
        mockedMetadataLoader
      );
      expect(result).toEqual([expect.objectContaining({ message: 'Application is not selected' })]);
    });

    test('returns affinityId error when affinityId is unknown', async () => {
      const result = await validateTimeSeriesQuery(
        { ...validQuery, affinityId: 'UNKNOWN' as AffinityId },
        mockedMetadataLoader
      );
      expect(result).toEqual([
        expect.objectContaining({ message: 'Application with affinityId "UNKNOWN" is unknown' }),
      ]);
    });
  });

  describe('tableId validation (early return)', () => {
    test('returns tableId error when tableId is unknown', async () => {
      const result = await validateTimeSeriesQuery({ ...validQuery, tableId: 'UNKNOWN_TABLE' }, mockedMetadataLoader);
      expect(result).toEqual([
        expect.objectContaining({ severity: 'error', message: expect.stringMatching(/UNKNOWN_TABLE/) }),
      ]);
    });
  });

  describe('agents validation', () => {
    test('returns error when agentsAndGroups is empty', async () => {
      const result = await validateTimeSeriesQuery({ ...validQuery, agentsAndGroups: [] }, mockedMetadataLoader);
      expect(result).toContainEqual({ severity: 'error', message: 'Query has no agents or groups selected' });
    });
  });

  describe('aggregation interval validation', () => {
    test('returns error when aggregation interval is CUSTOM_UNSET', async () => {
      const result = await validateTimeSeriesQuery(
        { ...validQuery, aggregationIntervalMinutes: AGGREGATION_INTERVAL.CUSTOM_UNSET },
        mockedMetadataLoader
      );
      expect(result).toContainEqual({
        severity: 'error',
        message: 'Custom aggregation interval value is required',
      });
    });

    test('returns no error for standard interval values', async () => {
      for (const interval of [AGGREGATION_INTERVAL.HOURLY, AGGREGATION_INTERVAL.DAILY, AGGREGATION_INTERVAL.NONE]) {
        const result = await validateTimeSeriesQuery(
          { ...validQuery, aggregationIntervalMinutes: interval },
          mockedMetadataLoader
        );
        expect(result.some((p) => p.message === 'Custom aggregation interval value is required')).toBe(false);
      }
    });
  });

  describe('metrics validation', () => {
    test('returns error when no columns are selected', async () => {
      const result = await validateTimeSeriesQuery({ ...validQuery, columns: [] }, mockedMetadataLoader);
      expect(result).toContainEqual({ severity: 'error', message: 'At least one metric must be selected' });
    });
  });

  describe('limit/rank by cross-validation', () => {
    test('returns error when orderBy is set but limit is undefined', async () => {
      const result = await validateTimeSeriesQuery(
        { ...validQuery, orderBy: [{ columnId: 'ENCLCPUT', type: 'DESC' }], limit: undefined },
        mockedMetadataLoader
      );
      expect(result).toContainEqual({ severity: 'error', message: 'Limit is required when Rank by is set' });
    });

    test('returns error when orderBy is set but limit is less than 1', async () => {
      const result = await validateTimeSeriesQuery(
        { ...validQuery, orderBy: [{ columnId: 'ENCLCPUT', type: 'DESC' }], limit: 0 },
        mockedMetadataLoader
      );
      expect(result).toContainEqual({ severity: 'error', message: 'Limit is required when Rank by is set' });
    });

    test('returns no limit error when orderBy is set and limit is valid', async () => {
      const result = await validateTimeSeriesQuery(
        { ...validQuery, orderBy: [{ columnId: 'ENCLCPUT', type: 'DESC' }], limit: 10 },
        mockedMetadataLoader
      );
      expect(result.some((p) => p.message === 'Limit is required when Rank by is set')).toBe(false);
    });

    test('returns error when limit is set but orderBy is empty', async () => {
      const result = await validateTimeSeriesQuery({ ...validQuery, orderBy: [], limit: 10 }, mockedMetadataLoader);
      expect(result).toContainEqual({ severity: 'error', message: 'Rank by is required when Limit is set' });
    });

    test('returns no rank by error when limit is set and orderBy is also set', async () => {
      const result = await validateTimeSeriesQuery(
        { ...validQuery, orderBy: [{ columnId: 'ENCLCPUT', type: 'DESC' }], limit: 10 },
        mockedMetadataLoader
      );
      expect(result.some((p) => p.message === 'Rank by is required when Limit is set')).toBe(false);
    });

    test('returns no errors when both limit and orderBy are unset', async () => {
      const result = await validateTimeSeriesQuery(
        { ...validQuery, orderBy: [], limit: undefined },
        mockedMetadataLoader
      );
      expect(result.some((p) => p.message.includes('Rank by') || p.message.includes('Limit'))).toBe(false);
    });
  });

  describe('valid query', () => {
    test('returns no errors for a fully valid query', async () => {
      const result = await validateTimeSeriesQuery(validQuery, mockedMetadataLoader);
      expect(result).toEqual([]);
    });
  });
});
