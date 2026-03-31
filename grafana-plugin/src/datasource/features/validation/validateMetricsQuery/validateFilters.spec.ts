import { TableMetadata } from 'public-domain';

import { MetricsQueryFilter, MetricsQueryFilterClause } from 'datasource/domain';
import { mockedTableMetadatas } from 'datasource/features/metadata/mocks';

import { validateFilters } from './validateFilters';

const filter = {
  clause: {
    columnId: 'MVSID',
    userDefinedValue: 'hyfg',
  },
} as MetricsQueryFilter;
const incorrectFilter = {
  clause: {
    columnId: 'TESTABCD',
  },
} as MetricsQueryFilter;
const metadata = mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata;

test('Validate correct filters', () => {
  expect(validateFilters({ aggregated: filter }, metadata)).toHaveLength(0);
});

test('Validate filter columns not in metadata', () => {
  const incorrectFilterProblems = validateFilters({ aggregated: incorrectFilter }, metadata);
  expect(
    incorrectFilterProblems.filter(
      ({ message }) =>
        message ===
        'Attribute "TESTABCD" in attribute group "KDP.REALTHDA" isn\'t supported by any existing agents and cannot be used in filters.'
    )
  ).toHaveLength(1);
});

test('Validate filter typing', () => {
  const validateWrongType = validateFilters(
    {
      aggregated: { clause: { columnId: 'QWHSLUUV2', userDefinedValue: 'a' } as MetricsQueryFilterClause },
    },
    metadata
  );
  expect(
    validateWrongType.filter(
      ({ message }) => message === `Literal "a" does not match required type "number" for column "QWHSLUUV2"`
    )
  ).toHaveLength(1);
});

test('Validate filter value typing with enums', () => {
  const validationResult = validateFilters(
    {
      // Number column
      aggregated: { clause: { columnId: 'ENCLPIDX', userDefinedValue: 'N/A' } as MetricsQueryFilterClause },
    },
    metadata
  );
  expect(validationResult).toHaveLength(0);
});
