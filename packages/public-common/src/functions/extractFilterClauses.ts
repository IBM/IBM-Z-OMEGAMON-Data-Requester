// eslint-disable-next-line no-restricted-imports
import type { Filter } from '../types';

import { isTouched } from './Touched';

export function extractFilterClauses<CLAUSE>(filter: Filter<CLAUSE>): CLAUSE[] {
  if (filter.clause) {
    return [filter.clause];
  }
  /** Valid filter should always have either clause / or / and. But if it's invalid, it may not have any */
  const nestedFilters = filter.and || filter.or;
  const clauses = nestedFilters?.flatMap((f) => extractFilterClauses(f));
  return clauses || [];
}

// TODO OMUI5-1643 this fn should be removed
export function extractTouchedFilterClauses<CLAUSE>(filter: Filter<CLAUSE>): CLAUSE[] {
  const clauses = extractFilterClauses(filter);
  const touchedClauses = clauses.filter((cl) => isTouched(cl) ?? true);
  return touchedClauses;
}
