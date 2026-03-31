import { SingleFieldOf } from './SingleFieldOf';

type FilterFields<CLAUSE> = {
  or: Array<Filter<CLAUSE>>;
  and: Array<Filter<CLAUSE>>;
  clause: CLAUSE;
};

export type Filter<CLAUSE> = SingleFieldOf<FilterFields<CLAUSE>>;

type FilterOf<CLAUSE, FILTER_TYPE extends keyof FilterFields<CLAUSE>> = SingleFieldOf<
  FilterFields<CLAUSE>,
  FILTER_TYPE
>;

/**
 * Filter of structure `{ clause: {...} }`
 */
export type ClauseFilter<CLAUSE> = FilterOf<CLAUSE, 'clause'>;

/**
 * Filter of structure `{ or: [...] }`
 */
export type OrFilter<CLAUSE> = FilterOf<CLAUSE, 'or'>;

/**
 * Filter of structure `{ and: [...] }`
 */
export type AndFilter<CLAUSE> = FilterOf<CLAUSE, 'and'>;

/**
 * Filter of structure of either `{ or: [...] }` or `{ and: [...] }`
 */
export type CompositeFilter<CLAUSE> = FilterOf<CLAUSE, 'or' | 'and'>;
