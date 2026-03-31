import { Filter } from 'public-common';
import { OriginalAndEditedClause, EditorAction } from './types';
export declare function useEditorReducer<CLAUSE>(filter: Filter<CLAUSE> | undefined, changeFilter: (changedFilter: Filter<CLAUSE> | undefined) => void): [OriginalAndEditedClause<CLAUSE>, import('react').Dispatch<EditorAction<CLAUSE>>];
