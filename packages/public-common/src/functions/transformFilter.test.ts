// eslint-disable-next-line no-restricted-imports
import type { Filter } from '../types';

import { replaceFiltersWith } from './transformFilter';

type SomeClause = {
  columnId: string;
  operator: string;
  userDefinedValue: string;
};

const clause1: Filter<SomeClause> = {
  clause: {
    columnId: 'Column1',
    operator: '<',
    userDefinedValue: 'test',
  },
};

const clause2: Filter<SomeClause> = {
  clause: {
    columnId: 'Column2',
    operator: '>',
    userDefinedValue: 'test2',
  },
};

const clause3: Filter<SomeClause> = {
  clause: {
    columnId: 'Column3',
    operator: '=',
    userDefinedValue: 'test3',
  },
};

describe('replaceFilterWith', () => {
  test('should return new but equal filter if replaced with itself', () => {
    const orFilter: Filter<SomeClause> = {
      or: [clause1, clause2],
    };
    const result = replaceFiltersWith(orFilter, new Map([[orFilter, orFilter]]));
    expect(result).not.toBe(orFilter);
    expect(result).toEqual(orFilter);
  });

  test('should not go into endless loop if replacement contains node it replaces replace', () => {
    const orFilter: Filter<SomeClause> = {
      or: [clause1, clause2],
    };
    expect(replaceFiltersWith(orFilter, new Map([[orFilter, { and: [orFilter, clause3] }]]))).toBeTruthy();
  });

  test('should be able to replace one clause with another one', () => {
    const orFilter: Filter<SomeClause> = {
      or: [clause1, clause2],
    };
    const result = replaceFiltersWith(orFilter, new Map([[clause1, clause3]]));
    expect(result).toEqual({ or: [clause3, clause2] });
  });

  test('should be able to replace one clause with connector', () => {
    const orFilter: Filter<SomeClause> = {
      or: [clause1, clause2],
    };
    const result = replaceFiltersWith(orFilter, new Map([[clause1, { or: [clause1, clause3] }]]));
    expect(result).toEqual({ or: [clause1, clause3, clause2] });
  });

  test('should be able to replace a non-root connector with a clause', () => {
    const orFilter: Filter<SomeClause> = {
      or: [clause1, clause2],
    };
    const andFilter: Filter<SomeClause> = {
      and: [orFilter, clause3],
    };
    const result = replaceFiltersWith(andFilter, new Map([[orFilter, clause1]]));
    expect(result).toEqual({ and: [clause1, clause3] });
  });

  test('should be able to replace a root connector with a clause', () => {
    const orFilter: Filter<SomeClause> = {
      or: [clause1, clause2],
    };
    const result = replaceFiltersWith(orFilter, new Map([[orFilter, clause1]]));
    expect(result).toEqual(clause1);
  });
});
