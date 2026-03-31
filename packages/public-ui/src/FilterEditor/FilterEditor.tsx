import { type CompositeFilter, type ClauseFilter, type Filter, addTouchedFalse } from 'public-common';
import React, { useCallback } from 'react';

import { FilterInstanceEditor } from './FilterInstanceEditor';
import { useEditorReducer } from './useEditorReducer';

export type ClauseEditorProps<CLAUSE> = {
  clause: CLAUSE;
  addClauseWithOr: (clause: CLAUSE) => void;
  addClauseWithAnd: (clause: CLAUSE) => void;
  removeClause: () => void;
  isClauseEditMode: boolean;
  enterClauseEditMode: () => void;
  cancelClauseEdit: () => void;
  submitClauseEdit: () => void;
  editClausePartially: (editedClauseFields: Partial<CLAUSE>) => void;
  editClauseFully: (editedClause: CLAUSE) => void;
};

export type ConnectorLabelProps<CLAUSE> = {
  compositeFilter: CompositeFilter<CLAUSE>;
  isRoot: boolean;
  addClause: (clauseFilter: ClauseFilter<CLAUSE>, connector: 'or' | 'and') => void;
  connectorButtonStyle: React.CSSProperties;
};

export type NoFiltersMessageProps<CLAUSE> = {
  addNewRootClause: (clause: CLAUSE) => void;
};

export type FilterEditorStyles = {
  lineDefinition: string;
  grayoutPanelClassName: string;
};

export type FilterEditorProps<CLAUSE> = {
  filter: Filter<CLAUSE> | undefined;
  changeFilter: (changedFilter: Filter<CLAUSE> | undefined) => void;
  ClauseEditor: React.ComponentType<ClauseEditorProps<CLAUSE>>;
  ConnectorLabel: React.ComponentType<ConnectorLabelProps<CLAUSE>>;
  NoFiltersMessage?: React.ComponentType<NoFiltersMessageProps<CLAUSE>>;
  styles: FilterEditorStyles;
};

export function FilterEditor<CLAUSE>({
  filter,
  changeFilter,
  ClauseEditor,
  NoFiltersMessage,
  ConnectorLabel,
  styles,
}: FilterEditorProps<CLAUSE>) {
  const [editorState, dispatchEdit] = useEditorReducer(filter, changeFilter);

  const addNewRootClause = useCallback(
    (clause: CLAUSE) => {
      dispatchEdit({
        type: 'new_clause_added',
        newClauseFilter: { clause: addTouchedFalse(clause) },
        sourceFilter: null,
        connector: null,
      });
    },
    [dispatchEdit]
  );

  if (!filter && NoFiltersMessage) {
    return <NoFiltersMessage addNewRootClause={addNewRootClause} />;
  }

  if (!filter) {
    return null;
  }

  return (
    <FilterInstanceEditor
      filter={filter}
      isRoot={true}
      dispatchEdit={dispatchEdit}
      editorState={editorState}
      ClauseEditor={ClauseEditor}
      ConnectorLabel={ConnectorLabel}
      styles={styles}
    >
      {(main) => <>{main}</>}
    </FilterInstanceEditor>
  );
}
