import type { ClauseEditorProps } from 'public-ui';
import React, { useCallback } from 'react';

import { MetricsQueryFilterClause } from 'datasource/domain';

import { EditMode } from './EditMode';
import { ViewMode } from './ViewMode';

export function ClauseEditor({
  clause,
  addClauseWithOr: addClauseWithOrFromProps,
  addClauseWithAnd: addClauseWithAndFromProps,
  removeClause,
  isClauseEditMode,
  enterClauseEditMode,
  cancelClauseEdit,
  submitClauseEdit,
  editClausePartially,
}: ClauseEditorProps<MetricsQueryFilterClause>) {
  const addClauseWithOr = useCallback(() => {
    addClauseWithOrFromProps({ ...clause, userDefinedValue: '' });
  }, [clause, addClauseWithOrFromProps]);
  const addClauseWithAnd = useCallback(() => {
    addClauseWithAndFromProps({ ...clause, userDefinedValue: '' });
  }, [clause, addClauseWithAndFromProps]);

  if (isClauseEditMode) {
    return (
      <EditMode
        clause={clause}
        addClauseWithOr={addClauseWithOr}
        addClauseWithAnd={addClauseWithAnd}
        removeClause={removeClause}
        cancelClauseEdit={cancelClauseEdit}
        submitClauseEdit={submitClauseEdit}
        editClausePartially={editClausePartially}
      />
    );
  }
  return (
    <ViewMode
      clause={clause}
      addClauseWithOr={addClauseWithOr}
      addClauseWithAnd={addClauseWithAnd}
      removeClause={removeClause}
      enterClauseEditMode={enterClauseEditMode}
    />
  );
}
