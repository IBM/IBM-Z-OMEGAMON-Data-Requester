import { MetricsQueryFilterClause, MetricsQueryFilter } from 'datasource/domain';

import { flattenFilterClauses } from './flattenFilterClauses';

const clause1: MetricsQueryFilterClause = {
  columnId: 'test',
  operator: '<',
  userDefinedValue: '42',
};

const clause2: MetricsQueryFilterClause = {
  columnId: 'test',
  operator: '>',
  userDefinedValue: '0',
};

const clause3: MetricsQueryFilterClause = {
  columnId: 'test',
  operator: '>',
  userDefinedValue: '77',
};

test('should return input if input filter is clause', () => {
  const filter: MetricsQueryFilter = {
    clause: clause1,
  };

  expect(flattenFilterClauses(filter)).toEqual([filter.clause]);
});

test('should return input if input filter is already flattened', () => {
  const filter: MetricsQueryFilter = {
    and: [
      {
        clause: clause1,
      },
      {
        clause: clause2,
      },
    ],
  };

  expect(flattenFilterClauses(filter)).toEqual(filter.and.map((f) => f.clause));
});

test('should flatten unflattened filters', () => {
  const filter: MetricsQueryFilter = {
    and: [
      {
        clause: clause1,
      },
      {
        or: [
          {
            clause: clause2,
          },
          {
            clause: clause3,
          },
        ],
      },
    ],
  };

  expect(flattenFilterClauses(filter)).toEqual([clause1, clause2, clause3]);
});

test('should return empty array if input is null', () => {
  expect(flattenFilterClauses(null)).toEqual([]);
});

test('should return empty array if input connector has no children', () => {
  const filter: MetricsQueryFilter = {
    and: [],
  };

  expect(flattenFilterClauses(filter)).toEqual([]);
});

test('should return empty array if input is empty MetricsQueryFilters', () => {
  expect(flattenFilterClauses({})).toEqual([]);
});
