import {
  type Filter,
  type FilterReplacementMap,
  filterCombinationResultToFilter,
  replaceFiltersWith,
} from 'public-common';
import { useCallback } from 'react';

import { ReplaceClauseFunction, ReplacementDefinition } from './types';

export function useReplaceClauseWith<CLAUSE>(
  filter: Filter<CLAUSE> | undefined,
  changeFilter: (changedFilter: Filter<CLAUSE> | undefined) => void
): ReplaceClauseFunction<CLAUSE> {
  return useCallback(
    (...replacements: Array<ReplacementDefinition<CLAUSE>>) => {
      const rootReplacement = replacements.find(([filterToReplace]) => filterToReplace === 'root');
      if (rootReplacement) {
        if (replacements.length > 1) {
          throw new Error('Invalid argument: Replacements containing root node replacement has more than 1 element');
        }
        const newFilterValue = rootReplacement[1];
        if (typeof newFilterValue === 'string') {
          throw new Error('Invalid argument: Root replacement should be a filter');
        }
        changeFilter(newFilterValue);
        return;
      }
      const replacementMap: FilterReplacementMap<CLAUSE> = new Map();
      (replacements as Array<[Filter<CLAUSE>, Filter<CLAUSE>]>).forEach(([filterToReplace, replacement]) => {
        replacementMap.set(filterToReplace, replacement);
      });
      const filterCombinationResult = filter && replaceFiltersWith(filter, replacementMap);
      const modifiedFilter = filterCombinationResultToFilter(filterCombinationResult);
      changeFilter(modifiedFilter as Filter<CLAUSE> | undefined);
    },
    [filter, changeFilter]
  );
}
