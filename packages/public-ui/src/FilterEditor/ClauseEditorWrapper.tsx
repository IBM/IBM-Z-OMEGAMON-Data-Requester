import { addTouchedFalse, addTouchedTrue, ClauseFilter } from 'public-common';
import React, { useCallback } from 'react';

import type { ClauseEditorProps } from './FilterEditor';
import { DispatchEdit, OriginalAndEditedClause } from './types';

type ClauseEditorWrapperProps<CLAUSE> = {
  clauseFilter: ClauseFilter<CLAUSE>;
  dispatchEdit: DispatchEdit<CLAUSE>;
  originalAndEditedClause: OriginalAndEditedClause<CLAUSE>;
  ClauseEditor: React.ComponentType<ClauseEditorProps<CLAUSE>>;
};

export function ClauseEditorWrapper<CLAUSE>({
  clauseFilter,
  dispatchEdit,
  originalAndEditedClause,
  ClauseEditor,
}: ClauseEditorWrapperProps<CLAUSE>) {
  const addClauseWithOr = useCallback(
    (clause: CLAUSE) => {
      dispatchEdit({
        type: 'new_clause_added',
        connector: 'or',
        newClauseFilter: { clause: addTouchedFalse(clause) },
        sourceFilter: clauseFilter,
      });
    },
    [dispatchEdit, clauseFilter]
  );

  const addClauseWithAnd = useCallback(
    (clause: CLAUSE) => {
      dispatchEdit({
        type: 'new_clause_added',
        connector: 'and',
        newClauseFilter: { clause: addTouchedFalse(clause) },
        sourceFilter: clauseFilter,
      });
    },
    [dispatchEdit, clauseFilter]
  );

  const removeClause = useCallback(() => {
    dispatchEdit({ type: 'clause_removed', clauseFilter });
  }, [dispatchEdit, clauseFilter]);

  const isClauseEditMode = clauseFilter === originalAndEditedClause.originalClauseFilter;

  const clause = isClauseEditMode ? originalAndEditedClause.editedClause : clauseFilter.clause;

  const enterClauseEditMode = useCallback(() => {
    dispatchEdit({ type: 'editing_started', clauseFilter });
  }, [dispatchEdit, clauseFilter]);

  const cancelClauseEdit = useCallback(() => {
    dispatchEdit({ type: 'editing_canceled', clauseFilter: { clause: addTouchedTrue(clauseFilter.clause) } });
  }, [dispatchEdit, clauseFilter]);

  const saveClauseEdit = useCallback(() => {
    dispatchEdit({ type: 'editing_applied', clauseFilter });
  }, [clauseFilter, dispatchEdit]);

  const editClausePartially = useCallback(
    (editedClauseFields: Partial<CLAUSE>) => {
      dispatchEdit({ type: 'clause_edited_partially', clauseFields: editedClauseFields });
    },
    [dispatchEdit]
  );

  const editClauseFully = useCallback(
    (editedClause: CLAUSE) => {
      dispatchEdit({ type: 'clause_edited_fully', clause: editedClause });
    },
    [dispatchEdit]
  );

  return (
    <ClauseEditor
      clause={clause}
      addClauseWithOr={addClauseWithOr}
      addClauseWithAnd={addClauseWithAnd}
      removeClause={removeClause}
      isClauseEditMode={isClauseEditMode}
      enterClauseEditMode={enterClauseEditMode}
      cancelClauseEdit={cancelClauseEdit}
      submitClauseEdit={saveClauseEdit}
      editClausePartially={editClausePartially}
      editClauseFully={editClauseFully}
    />
  );
}
