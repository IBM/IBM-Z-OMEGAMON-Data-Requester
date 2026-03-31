import { convertMetricsQueryToCmsSql } from './convertMetricsQueryToCmsSql';
import mocks from './mocks';

describe(convertMetricsQueryToCmsSql.name, () => {
  describe('Valid Queries', () => {
    it.each(mocks.validMetricsQueries)(
      'should correctly convert query with $name',
      ({ queryParams, applications, metadata, expectedOutput }) => {
        const result = convertMetricsQueryToCmsSql(queryParams, metadata, applications);
        expect(result).toBe(expectedOutput);
      }
    );
  });

  describe('Invalid Queries', () => {
    it.each(mocks.invalidMetricsQueries)(
      'should correctly convert query when $name',
      ({ queryParams, applications, metadata, expectedOutput }) => {
        const result = convertMetricsQueryToCmsSql(queryParams, metadata, applications);
        expect(result).toBe(expectedOutput);
      }
    );
  });
});
