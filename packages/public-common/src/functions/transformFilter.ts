// eslint-disable-next-line no-restricted-imports
import type { Filter } from '../types';

import { FilterCombinationResult, combineWithOr, combineWithAnd } from './combineFilters';

type FilterTransformer<CLAUSE> = (filter: Filter<CLAUSE>) => FilterCombinationResult<CLAUSE>;

export type FilterReplacementMap<CLAUSE> = Map<Filter<CLAUSE> | CLAUSE, FilterCombinationResult<CLAUSE>>;

export function replaceFiltersWith<CLAUSE>(
  rootFilter: Filter<CLAUSE>,
  replacements: FilterReplacementMap<CLAUSE>
): FilterCombinationResult<CLAUSE> {
  const replacedKeys = new Set<Filter<CLAUSE> | CLAUSE>();
  const tryToGetReplacement = (key: Filter<CLAUSE> | CLAUSE | undefined, defaultValue: Filter<CLAUSE>) => {
    if (!key) {
      return defaultValue;
    }
    if (replacedKeys.has(key)) {
      return defaultValue;
    }
    const replacement = replacements.get(key);
    if (replacement) {
      replacedKeys.add(key);
      return replacement;
    }
    return null;
  };

  return transformFilter(rootFilter, (subFilter) => {
    return tryToGetReplacement(subFilter, subFilter) ?? tryToGetReplacement(subFilter.clause, subFilter) ?? subFilter;
  });
}

export function transformFilter<CLAUSE>(
  rootFilter: Filter<CLAUSE>,
  transformer: FilterTransformer<CLAUSE>
): FilterCombinationResult<CLAUSE> {
  const transformedFilter = transformer(rootFilter);

  if (typeof transformedFilter === 'string') {
    return transformedFilter;
  }

  if (transformedFilter.or) {
    return transformedFilter.or.reduce((acc: FilterCombinationResult<CLAUSE>, subFilter: Filter<CLAUSE>) => {
      const transformedSubFilter = transformFilter(subFilter, transformer);
      return combineWithOr(acc, transformedSubFilter);
    }, 'no_filter');
  }

  if (transformedFilter.and) {
    return transformedFilter.and.reduce((acc: FilterCombinationResult<CLAUSE>, subFilter: Filter<CLAUSE>) => {
      const transformedSubFilter = transformFilter(subFilter, transformer);
      return combineWithAnd(acc, transformedSubFilter);
    }, 'no_filter');
  }

  return transformedFilter;
}

export function filterCombinationResultToFilter<CLAUSE>(
  result: FilterCombinationResult<CLAUSE> | undefined
): Filter<CLAUSE> | undefined {
  if (result === 'always_false') {
    throw new Error('Filter is always FALSE');
  }

  if (result === 'always_true' || result === 'no_filter') {
    return undefined;
  }

  return result;
}
