import { mockedTablesResponse } from 'datasource/features/metadata/mocks';

import { generateFilterFromAdHocs } from './generateFilterFromAdHocs';

const mockedTableMetadata = mockedTablesResponse('DB2LKCONF');

test('can apply single-filter adhoc', () => {
  const result = generateFilterFromAdHocs(
    [{ condition: '', key: 'Lock Elapsed Time', operator: '=', value: '1' }],
    mockedTableMetadata
  );

  expect(result).toEqual({ clause: { columnId: 'LK_ET', operator: '=', userDefinedValue: '1' } });
});

test('can apply multi-filter adhoc', () => {
  const result = generateFilterFromAdHocs(
    [
      { condition: '', key: 'Lock Elapsed Time', operator: '=', value: '1' },
      { condition: '', key: 'Plan Name', operator: '!=', value: 'STRING_VALUE' },
    ],
    mockedTableMetadata
  );
  expect(result).toEqual({
    and: [
      { clause: { columnId: 'LK_ET', operator: '=', userDefinedValue: '1' } },
      { clause: { columnId: 'PLAN_NAME', operator: '<>', userDefinedValue: 'STRING_VALUE' } },
    ],
  });
});

test('Ignores filter for column that does not exist on given table', () => {
  const result = generateFilterFromAdHocs(
    [
      { condition: '', key: 'Lock Elapsed Time', operator: '=', value: '1' },
      { condition: '', key: 'some column that doesnt exist', operator: '=', value: '5' },
    ],
    mockedTableMetadata
  );
  expect(result).toEqual({ clause: { columnId: 'LK_ET', operator: '=', userDefinedValue: '1' } });
});

test('handles enum with string key', () => {
  const result = generateFilterFromAdHocs(
    [{ condition: '', key: 'Thread Status', operator: '=', value: 'Processing_an_Autonomous_Procedure' }],
    mockedTableMetadata
  );

  expect(result).toEqual({
    clause: { columnId: 'TH_STATUS', operator: '=', userDefinedValue: 'Processing_an_Autonomous_Procedure' },
  });
});

test('handles enum with numeric key', () => {
  const result = generateFilterFromAdHocs(
    [{ condition: '', key: 'Time Zone Displacement', operator: '=', value: '0hr0mn' }],
    mockedTablesResponse('DB2CONN')
  );

  expect(result).toEqual({ clause: { columnId: 'EESGD006', operator: '=', userDefinedValue: '0hr0mn' } });
});

test("doesn't wrap numeric values in quotes", () => {
  const result = generateFilterFromAdHocs(
    [{ condition: '', key: 'Lock Elapsed Time', operator: '=', value: '42' }],
    mockedTableMetadata
  );
  expect(result).toEqual({ clause: { columnId: 'LK_ET', operator: '=', userDefinedValue: '42' } });
});

test('handles non-decimal numbers', () => {
  const result = generateFilterFromAdHocs(
    [{ condition: '', key: 'Lock Elapsed Time', operator: '=', value: '0x2A' }],
    mockedTableMetadata
  );
  expect(result).toEqual({ clause: { columnId: 'LK_ET', operator: '=', userDefinedValue: '0x2A' } });
});
