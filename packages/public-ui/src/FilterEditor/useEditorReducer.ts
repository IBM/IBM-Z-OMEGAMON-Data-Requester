import { addTouchedTrue, type ClauseFilter, combineWith, type Filter } from 'public-common';
import { useCallback, useReducer } from 'react';

import {
  BaseEditorAction,
  OriginalAndEditedClause,
  ReplaceClauseFunction,
  ReplacementDefinition,
  EditorAction,
  AddClauseAction,
  CancelClauseEditAction,
} from './types';
import { useReplaceClauseWith } from './useReplaceClauseWith';

type MiddlewareAddClauseAction<CLAUSE> = {
  type: 'new_clause_added';
  newClauseFilter: ClauseFilter<CLAUSE>;
};

type MiddlewareCancelClauseEditAction = {
  type: 'editing_canceled';
};

type MiddlewareAction<CLAUSE> =
  | BaseEditorAction<CLAUSE>
  | MiddlewareAddClauseAction<CLAUSE>
  | MiddlewareCancelClauseEditAction;

function addNewClause<CLAUSE>(
  state: OriginalAndEditedClause<CLAUSE>,
  action: AddClauseAction<CLAUSE>,
  replaceClauseWith: ReplaceClauseFunction<CLAUSE>
): MiddlewareAction<CLAUSE> {
  if (action.sourceFilter == null) {
    // There was no filter defined yet and user clicked to add first clause (root clause)
    replaceClauseWith(['root', action.newClauseFilter]);
    return {
      type: 'new_clause_added',
      newClauseFilter: action.newClauseFilter,
    };
  }

  const { newClauseFilter, connector, sourceFilter } = action;

  const replacements: Array<ReplacementDefinition<CLAUSE>> = [];

  if (state.originalClauseFilter === sourceFilter) {
    // User clicked "Add new clause" on a clause it currently edits
    // So, we have to replace source with the version containing all the changes
    replacements.push([sourceFilter, combineWith(connector, { clause: state.editedClause }, newClauseFilter)]);
  } else {
    replacements.push([sourceFilter, combineWith(connector, sourceFilter, newClauseFilter)]);
    if (state.originalClauseFilter) {
      replacements.push([state.originalClauseFilter, { clause: state.editedClause }]);
    }
  }

  replaceClauseWith(...replacements);
  return {
    type: 'new_clause_added',
    newClauseFilter: newClauseFilter,
  };
}

function saveCurrentClauseModifications<CLAUSE>(
  state: OriginalAndEditedClause<CLAUSE>,
  action: BaseEditorAction<CLAUSE>,
  replaceClauseWith: ReplaceClauseFunction<CLAUSE>
): BaseEditorAction<CLAUSE> {
  if (!state.originalClauseFilter) {
    return action;
  }
  replaceClauseWith([state.originalClauseFilter, { clause: { ...addTouchedTrue(state.editedClause) } }]);
  return action;
}

function cancelCurrentClauseModification<CLAUSE>(
  state: OriginalAndEditedClause<CLAUSE>,
  action: CancelClauseEditAction<CLAUSE>,
  replaceClauseWith: ReplaceClauseFunction<CLAUSE>
): MiddlewareAction<CLAUSE> {
  if (state.originalClauseFilter) {
    replaceClauseWith([state.originalClauseFilter, action.clauseFilter]);
  }

  return {
    type: 'editing_canceled',
  };
}

function sideEffectMiddleware<CLAUSE>(
  state: OriginalAndEditedClause<CLAUSE>,
  action: EditorAction<CLAUSE>,
  replaceClauseWith: ReplaceClauseFunction<CLAUSE>
): MiddlewareAction<CLAUSE> {
  switch (action.type) {
    case 'editing_started':
      if (action.clauseFilter === state.originalClauseFilter) {
        return action;
      }
      return saveCurrentClauseModifications(state, action, replaceClauseWith);
    case 'editing_canceled':
      return cancelCurrentClauseModification(state, action, replaceClauseWith);
    case 'editing_applied':
      if (action.clauseFilter !== state.originalClauseFilter) {
        // This should never happen unless we have some nasty bug.
        // Just log it and return the same action so reducer will drop current editing.
        // This behavior is safe enough
        console.warn(
          `Filter Editor: got an 'editing_applied' action with source not matching the clause currently in editing mode. Filter from action: ${JSON.stringify(
            action.clauseFilter
          )}, current editable filter: ${JSON.stringify(state.originalClauseFilter)}`
        );
        return action;
      }
      return saveCurrentClauseModifications(state, action, replaceClauseWith);
    case 'new_clause_added': {
      return addNewClause(state, action, replaceClauseWith);
    }
    case 'clause_removed': {
      replaceClauseWith([action.clauseFilter, 'no_filter']);
      return action;
    }
  }
  return action;
}

function reduce<CLAUSE>(
  state: OriginalAndEditedClause<CLAUSE>,
  action: MiddlewareAction<CLAUSE>
): OriginalAndEditedClause<CLAUSE> {
  switch (action.type) {
    case 'clause_edited_partially':
      if (!state.editedClause || !state.originalClauseFilter) {
        return state;
      }
      return { ...state, editedClause: { ...state.editedClause, ...action.clauseFields } };
    case 'clause_edited_fully':
      if (!state.editedClause || !state.originalClauseFilter) {
        return state;
      }
      return { ...state, editedClause: { ...action.clause } };
    case 'editing_started':
      return {
        originalClauseFilter: action.clauseFilter,
        editedClause: action.clauseFilter.clause,
      };
    case 'editing_canceled': {
      return {
        originalClauseFilter: null,
        editedClause: null,
      };
    }
    case 'editing_applied': {
      if (!state.originalClauseFilter) {
        return state;
      }
      return {
        originalClauseFilter: null,
        editedClause: null,
      };
    }
    case 'new_clause_added': {
      return {
        originalClauseFilter: action.newClauseFilter,
        editedClause: action.newClauseFilter.clause,
      };
    }
    case 'clause_removed': {
      if (state.originalClauseFilter === action.clauseFilter) {
        return {
          originalClauseFilter: null,
          editedClause: null,
        };
      }
      return state;
    }
  }
}

export function useEditorReducer<CLAUSE>(
  filter: Filter<CLAUSE> | undefined,
  changeFilter: (changedFilter: Filter<CLAUSE> | undefined) => void
) {
  const replaceClauseWith = useReplaceClauseWith(filter, changeFilter);
  /* Yes, this reducer is NOT pure.
   * All the side effects are encapsulated into a "middleware" */
  const reducer = useCallback(
    (state: OriginalAndEditedClause<CLAUSE>, action: EditorAction<CLAUSE>) => {
      const augmentedAction = sideEffectMiddleware(state, action, replaceClauseWith);
      return reduce(state, augmentedAction);
    },
    [replaceClauseWith]
  );
  return useReducer(reducer, { originalClauseFilter: null, editedClause: null });
}
