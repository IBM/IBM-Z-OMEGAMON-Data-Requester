// eslint-disable-next-line no-restricted-imports
import type { Filter } from '../types';

import { combineWithOr, FilterCombinationResult, combineWithAnd } from './combineFilters';

type SomeClause = {
  columnId: string;
  operator: string;
  userDefinedValue: string;
};

const clauseA = {
  clause: {
    columnId: 'AFFINITIES',
    operator: '=',
    userDefinedValue: 'A',
  },
} satisfies Filter<SomeClause>;
const clauseB = {
  clause: {
    columnId: 'AFFINITIES',
    operator: '=',
    userDefinedValue: 'B',
  },
} satisfies Filter<SomeClause>;
const clauseC = {
  clause: {
    columnId: 'AFFINITIES',
    operator: '=',
    userDefinedValue: 'C',
  },
} satisfies Filter<SomeClause>;

const clauseD = {
  clause: {
    columnId: 'AFFINITIES',
    operator: '=',
    userDefinedValue: 'D',
  },
} satisfies Filter<SomeClause>;

describe('combineWithOr', () => {
  it('should return "no_filter" when empty array of MetricQueryFilters is passed', () => {
    expect(combineWithOr(...[])).toEqual('no_filter');
  });
  it('should return single "OR" filter when "clause" and "OR" filter is passed ((A, B OR C) -> (A OR B OR C))', () => {
    const filters: Array<Filter<SomeClause>> = [clauseA, { or: [clauseB, clauseC] }];
    expect(combineWithOr(...filters)).toEqual({ or: [clauseA, clauseB, clauseC] });
  });
  it('should return single "OR" filter when two "OR" filters are passed ((A OR B, C OR D) -> (A OR B OR C OR D))', () => {
    const filters: Array<Filter<SomeClause>> = [{ or: [clauseA, clauseB] }, { or: [clauseC, clauseD] }];
    expect(combineWithOr(...filters)).toEqual({ or: [clauseA, clauseB, clauseC, clauseD] });
  });
  it('should return "OR" filter with "clause" and "AND" filter, when "clause" and "AND" filters are passed ((A, B AND C) -> (A OR (B AND C)))', () => {
    const filters: Array<Filter<SomeClause>> = [clauseA, { and: [clauseB, clauseC] }];
    expect(combineWithOr(...filters)).toEqual({ or: [clauseA, { and: [clauseB, clauseC] }] });
  });
  it('should return "OR" with two "AND" filters when two "AND" filters are passed ((A AND B, C AND D) -> ((A AND B) OR (C AND D)))', () => {
    const filters: Array<Filter<SomeClause>> = [{ and: [clauseA, clauseB] }, { and: [clauseC, clauseD] }];
    expect(combineWithOr(...filters)).toEqual({ or: [{ and: [clauseA, clauseB] }, { and: [clauseC, clauseD] }] });
  });
  it('should return "OR" with two clauses and "AND" filter when "OR" and "AND" filters are passed ((A OR B, C AND D) -> (A OR B OR (C AND D)))', () => {
    const filters: Array<Filter<SomeClause>> = [{ or: [clauseA, clauseB] }, { and: [clauseC, clauseD] }];
    expect(combineWithOr(...filters)).toEqual({ or: [clauseA, clauseB, { and: [clauseC, clauseD] }] });
  });
  it('should return "always_true" when "always_true" and "OR" filter is passed ((always_true, A OR B OR C) -> always_true)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_true', { or: [clauseA, clauseB, clauseC] }];
    expect(combineWithOr(...filters)).toEqual('always_true');
  });
  it('should return "always_true" when "always_true" and "AND" filter is passed ((always_true, A AND B AND C) -> always_true)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_true', { and: [clauseA, clauseB, clauseC] }];
    expect(combineWithOr(...filters)).toEqual('always_true');
  });
  it('should return "always_true" when "always_true" and nested filter is passed ((always_true, ((A AND B) OR (C AND D))) -> always_true)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = [
      'always_true',
      { or: [{ and: [clauseA, clauseB] }, { and: [clauseC, clauseD] }] },
    ];
    expect(combineWithOr(...filters)).toEqual('always_true');
  });
  it('should return "always_true" when clause and "always_true" is passed ((clause, always_true) -> always_true)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = [clauseA, 'always_true'];
    expect(combineWithOr(...filters)).toEqual('always_true');
  });
  it('should return "always_true" when "always_true" and "always_true" is passed ((always_true, always_true) -> always_true)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_true', 'always_true'];
    expect(combineWithOr(...filters)).toEqual('always_true');
  });
  it('should return "always_true" when "always_true" and "no_filter" is passed ((always_true, no_filter) -> always_true)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_true', 'no_filter'];
    expect(combineWithOr(...filters)).toEqual('always_true');
  });
  it('should return "always_true" when "always_true" and "always_false" is passed ((always_true, always_false) -> always_true)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_true', 'always_false'];
    expect(combineWithOr(...filters)).toEqual('always_true');
  });
  it('should return single "OR" filter when "no_filter" and "OR" filter is passed ((no_filter, A OR B OR C) -> (A OR B OR C))', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['no_filter', { or: [clauseA, clauseB, clauseC] }];
    expect(combineWithOr(...filters)).toEqual({ or: [clauseA, clauseB, clauseC] });
  });
  it('should return "AND" filter when "no_filter" and "AND" filter is passed ((no_filter, A AND B AND C) -> A AND B AND C)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['no_filter', { and: [clauseA, clauseB, clauseC] }];
    expect(combineWithOr(...filters)).toEqual({ and: [clauseA, clauseB, clauseC] });
  });
  it('should return "no_filter" when two "no_filter" are passed ((no_filter, no_filter) -> no_filter)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['no_filter', 'no_filter'];
    expect(combineWithOr(...filters)).toEqual('no_filter');
  });
  it('should return "OR" filter when "always_false" and "OR" filter is passed ((always_false, A OR B OR C) -> (A OR B OR C))', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_false', { or: [clauseA, clauseB, clauseC] }];
    expect(combineWithOr(...filters)).toEqual({ or: [clauseA, clauseB, clauseC] });
  });
  it('should return "AND" filter when "always_false" and "AND" filter is passed ((always_false, A AND B AND C) -> A AND B AND C)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_false', { and: [clauseA, clauseB, clauseC] }];
    expect(combineWithOr(...filters)).toEqual({ and: [clauseA, clauseB, clauseC] });
  });
  it('should return "always_false" when two "always_false" are passed ((always_false, always_false) -> always_false)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_false', 'always_false'];
    expect(combineWithOr(...filters)).toEqual('always_false');
  });
  it('should return "always_false" when "always_false" and "no_filter" are passed ((always_false, no_filter) -> always_false)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_false', 'no_filter'];
    expect(combineWithOr(...filters)).toEqual('always_false');
  });
});

describe('combineWithAnd', () => {
  it('should return "no_filter" when empty array of MetricQueryFilters is passed', () => {
    expect(combineWithAnd(...[])).toEqual('no_filter');
  });
  it('should return "AND" filter when "clause" and "OR" filter is passed ((A, B OR C) -> (A AND (B OR C)))', () => {
    const filters: Array<Filter<SomeClause>> = [clauseA, { or: [clauseB, clauseC] }];
    expect(combineWithAnd(...filters)).toEqual({ and: [clauseA, { or: [clauseB, clauseC] }] });
  });
  it('should return "AND" filter when two "OR" filters are passed ((A OR B, C OR D) -> ((A OR B) AND (C OR D)))', () => {
    const filters: Array<Filter<SomeClause>> = [{ or: [clauseA, clauseB] }, { or: [clauseC, clauseD] }];
    expect(combineWithAnd(...filters)).toEqual({ and: [{ or: [clauseA, clauseB] }, { or: [clauseC, clauseD] }] });
  });
  it('should return single "AND" filter when "clause" and "AND" filters are passed ((A, B AND C) -> (A AND B AND C))', () => {
    const filters: Array<Filter<SomeClause>> = [clauseA, { and: [clauseB, clauseC] }];
    expect(combineWithAnd(...filters)).toEqual({ and: [clauseA, clauseB, clauseC] });
  });
  it('should return single "AND" filter when two "AND" filters are passed ((A AND B, C AND D) -> (A AND B AND C AND D))', () => {
    const filters: Array<Filter<SomeClause>> = [{ and: [clauseA, clauseB] }, { and: [clauseC, clauseD] }];
    expect(combineWithAnd(...filters)).toEqual({ and: [clauseA, clauseB, clauseC, clauseD] });
  });
  it('should return single "AND" with two clauses and "OR" filter when "OR" and "AND" filters are passed ((A AND B, C OR D) -> (A AND B AND (C OR D)))', () => {
    const filters: Array<Filter<SomeClause>> = [{ and: [clauseA, clauseB] }, { or: [clauseC, clauseD] }];
    expect(combineWithAnd(...filters)).toEqual({ and: [clauseA, clauseB, { or: [clauseC, clauseD] }] });
  });
  it('should return "OR" filter when "always_true" and "OR" filter is passed ((always_true, A OR B OR C) -> (A OR B OR C))', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_true', { or: [clauseA, clauseB, clauseC] }];
    expect(combineWithAnd(...filters)).toEqual({ or: [clauseA, clauseB, clauseC] });
  });
  it('should return "AND" filter when "always_true" and "AND" filter is passed ((always_true, A AND B AND C) -> (A AND B AND C))', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_true', { and: [clauseA, clauseB, clauseC] }];
    expect(combineWithAnd(...filters)).toEqual({ and: [clauseA, clauseB, clauseC] });
  });
  it('should return "OR" when "always_true" and nested OR filter is passed ((always_true, (A AND B) OR (C AND D)) -> ((A AND B) OR (C AND D)))', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = [
      'always_true',
      { or: [{ and: [clauseA, clauseB] }, { and: [clauseC, clauseD] }] },
    ];
    expect(combineWithAnd(...filters)).toEqual({ or: [{ and: [clauseA, clauseB] }, { and: [clauseC, clauseD] }] });
  });
  it('should return clause when clause and "always_true" is passed ((A, always_true) -> A)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = [clauseA, 'always_true'];
    expect(combineWithAnd(...filters)).toEqual(clauseA);
  });
  it('should return "always_false" when "always_true" and "always_false" is passed ((always_true, always_false) -> always_false)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_true', 'always_false'];
    expect(combineWithAnd(...filters)).toEqual('always_false');
  });
  it('should return "OR" filter when "no_filter" and "OR" filter is passed ((no_filter, A OR B OR C) -> (A OR B OR C))', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['no_filter', { or: [clauseA, clauseB, clauseC] }];
    expect(combineWithAnd(...filters)).toEqual({ or: [clauseA, clauseB, clauseC] });
  });
  it('should return "AND" filter when "no_filter" and "AND" filter is passed ((no_filter, A AND B AND C) -> A AND B AND C)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['no_filter', { and: [clauseA, clauseB, clauseC] }];
    expect(combineWithAnd(...filters)).toEqual({ and: [clauseA, clauseB, clauseC] });
  });
  it('should return "no_filter" when two "no_filter" are passed ((no_filter, no_filter) -> no_filter)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['no_filter', 'no_filter'];
    expect(combineWithAnd(...filters)).toEqual('no_filter');
  });
  it('should return "always_false" when "always_false" and "OR" filter is passed ((always_false, A OR B OR C) -> always_false)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_false', { or: [clauseA, clauseB, clauseC] }];
    expect(combineWithAnd(...filters)).toEqual('always_false');
  });
  it('should return "always_false" when "always_false" and "AND" filter is passed ((always_false, A AND B AND C) -> always_false)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_false', { and: [clauseA, clauseB, clauseC] }];
    expect(combineWithAnd(...filters)).toEqual('always_false');
  });
  it('should return "always_false" when two "always_false" are passed ((always_false, always_false) -> always_false)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_false', 'always_false'];
    expect(combineWithAnd(...filters)).toEqual('always_false');
  });
  it('should return "always_false" when "always_false" and "no_filter" are passed ((always_false, no_filter) -> always_false)', () => {
    const filters: Array<FilterCombinationResult<SomeClause>> = ['always_false', 'no_filter'];
    expect(combineWithAnd(...filters)).toEqual('always_false');
  });
});

describe('commutative properties of combineWithOr and combineWithAnd', () => {
  const possibleFilterCombinationValues: Array<FilterCombinationResult<SomeClause>> = [
    clauseA,
    'always_true',
    'always_false',
    'no_filter',
  ];
  for (const filterA of possibleFilterCombinationValues) {
    for (const filterB of possibleFilterCombinationValues) {
      it(`should be commutative for '${JSON.stringify(filterA)} OR ${JSON.stringify(filterB)}'`, () => {
        expect(combineWithOr(...[filterA, filterB])).toEqual(combineWithOr(filterB, filterA));
      });
      it(`should be commutative for '${JSON.stringify(filterA)} AND ${JSON.stringify(filterB)}'`, () => {
        expect(combineWithAnd(...[filterA, filterB])).toEqual(combineWithAnd(...[filterB, filterA]));
      });
    }
  }
});
