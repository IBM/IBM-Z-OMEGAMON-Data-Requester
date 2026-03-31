// eslint-disable-next-line no-restricted-imports
import type { Filter } from '../types';

export type FilterCombinationResult<CLAUSE> = Filter<CLAUSE> | 'always_true' | 'always_false' | 'no_filter';

export function combineWithOr<CLAUSE>(filter1: Filter<CLAUSE>, ...rest: Array<Filter<CLAUSE>>): Filter<CLAUSE>;
export function combineWithOr<CLAUSE>(...filters: Array<Filter<CLAUSE>>): Filter<CLAUSE> | 'no_filter';
export function combineWithOr<CLAUSE>(
  ...filters: Array<FilterCombinationResult<CLAUSE>>
): FilterCombinationResult<CLAUSE>;
export function combineWithOr<CLAUSE>(
  ...filters: Array<FilterCombinationResult<CLAUSE>>
): FilterCombinationResult<CLAUSE> {
  return filters.reduce(combineWithOrImpl, 'no_filter');
}
export function combineWithOrImpl<CLAUSE>(
  filterA: FilterCombinationResult<CLAUSE>,
  filterB: FilterCombinationResult<CLAUSE>
): FilterCombinationResult<CLAUSE> {
  if (filterA === 'always_true' || filterB === 'always_true') {
    return 'always_true';
  }
  if (filterA === 'no_filter') {
    return filterB;
  }
  if (filterB === 'no_filter') {
    return filterA;
  }
  if (filterA === 'always_false') {
    return filterB;
  }
  if (filterB === 'always_false') {
    return filterA;
  }

  const elementsFromFilterA = filterA.or ?? [filterA];
  const elementsFromFilterB = filterB.or ?? [filterB];

  return {
    or: [...elementsFromFilterA, ...elementsFromFilterB],
  };
}

export function combineWithAnd<CLAUSE>(filter1: Filter<CLAUSE>, ...rest: Array<Filter<CLAUSE>>): Filter<CLAUSE>;
export function combineWithAnd<CLAUSE>(...filters: Array<Filter<CLAUSE>>): Filter<CLAUSE> | 'no_filter';
export function combineWithAnd<CLAUSE>(
  ...filters: Array<FilterCombinationResult<CLAUSE>>
): FilterCombinationResult<CLAUSE>;
export function combineWithAnd<CLAUSE>(
  ...filters: Array<FilterCombinationResult<CLAUSE>>
): FilterCombinationResult<CLAUSE> {
  return filters.reduce(combineWithAndImpl, 'no_filter');
}

function combineWithAndImpl<CLAUSE>(
  filterA: FilterCombinationResult<CLAUSE>,
  filterB: FilterCombinationResult<CLAUSE>
): FilterCombinationResult<CLAUSE> {
  if (filterA === 'always_false' || filterB === 'always_false') {
    return 'always_false';
  }
  if (filterA === 'no_filter') {
    return filterB;
  }
  if (filterB === 'no_filter') {
    return filterA;
  }
  if (filterA === 'always_true') {
    return filterB;
  }
  if (filterB === 'always_true') {
    return filterA;
  }

  const elementsFromFilterA = filterA.and ?? [filterA];
  const elementsFromFilterB = filterB.and ?? [filterB];

  return {
    and: [...elementsFromFilterA, ...elementsFromFilterB],
  };
}

export function combineWith<CLAUSE>(
  connector: 'or' | 'and',
  filter1: Filter<CLAUSE>,
  ...rest: Array<Filter<CLAUSE>>
): Filter<CLAUSE>;
export function combineWith<CLAUSE>(
  connector: 'or' | 'and',
  ...filters: Array<Filter<CLAUSE>>
): Filter<CLAUSE> | 'no_filter';
export function combineWith<CLAUSE>(
  connector: 'or' | 'and',
  ...filters: Array<FilterCombinationResult<CLAUSE>>
): FilterCombinationResult<CLAUSE>;
export function combineWith<CLAUSE>(
  connector: 'or' | 'and',
  ...filters: Array<FilterCombinationResult<CLAUSE>>
): FilterCombinationResult<CLAUSE> {
  return connector === 'or' ? combineWithOr(...filters) : combineWithAnd(...filters);
}
