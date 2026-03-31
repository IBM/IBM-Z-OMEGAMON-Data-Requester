import { Filter } from 'public-common';
import { ReplaceClauseFunction } from './types';
export declare function useReplaceClauseWith<CLAUSE>(filter: Filter<CLAUSE> | undefined, changeFilter: (changedFilter: Filter<CLAUSE> | undefined) => void): ReplaceClauseFunction<CLAUSE>;
