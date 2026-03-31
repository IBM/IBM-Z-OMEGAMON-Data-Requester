import { type Filter, type ClauseFilter, type CompositeFilter, addTouchedFalse } from 'public-common';
import React, { ReactNode, ReactElement, useCallback, memo, Fragment } from 'react';

import { ClauseEditorWrapper } from './ClauseEditorWrapper';
import {
  lineLeftMargin,
  InputExtensionConnectionLine,
  Spacer,
  InterRowConnectionLine,
  FilterZIndex,
} from './ConnectionLine';
import type { ClauseEditorProps, ConnectorLabelProps, FilterEditorStyles } from './FilterEditor';
import { DispatchEdit, OriginalAndEditedClause } from './types';

type FilterInstanceEditorProps<CLAUSE> = {
  filter: Filter<CLAUSE>;
  children: (main: ReactNode) => ReactElement;
  isRoot: boolean;
  dispatchEdit: DispatchEdit<CLAUSE>;
  editorState: OriginalAndEditedClause<CLAUSE>;
  ClauseEditor: React.ComponentType<ClauseEditorProps<CLAUSE>>;
  ConnectorLabel: React.ComponentType<ConnectorLabelProps<CLAUSE>>;
  styles: FilterEditorStyles;
};

// Use only the memoized version of this component (see below)
function FilterInstanceEditorImpl<CLAUSE>({
  filter,
  children: render,
  isRoot,
  dispatchEdit,
  editorState,
  ClauseEditor,
  ConnectorLabel,
  styles,
}: FilterInstanceEditorProps<CLAUSE>) {
  if (filter.clause) {
    return render(
      <ClauseEditorWrapper
        clauseFilter={filter as ClauseFilter<CLAUSE>}
        dispatchEdit={dispatchEdit}
        originalAndEditedClause={editorState}
        ClauseEditor={ClauseEditor}
      />
    );
  }

  return render(
    <FilterConnectionEditor
      compositeFilter={filter as CompositeFilter<CLAUSE>}
      isRoot={isRoot}
      dispatchEdit={dispatchEdit}
      editorState={editorState}
      ClauseEditor={ClauseEditor}
      ConnectorLabel={ConnectorLabel}
      styles={styles}
    />
  );
}

export const FilterInstanceEditor = memo(FilterInstanceEditorImpl) as typeof FilterInstanceEditorImpl;

type FilterConnectionEditorProps<CLAUSE> = {
  compositeFilter: CompositeFilter<CLAUSE>;
  isRoot: boolean;
  dispatchEdit: DispatchEdit<CLAUSE>;
  editorState: OriginalAndEditedClause<CLAUSE>;
  ClauseEditor: React.ComponentType<ClauseEditorProps<CLAUSE>>;
  ConnectorLabel: React.ComponentType<ConnectorLabelProps<CLAUSE>>;
  styles: FilterEditorStyles;
};

// It's not moved into a separate file because of circular dependencies
function FilterConnectionEditor<CLAUSE>({
  compositeFilter,
  isRoot,
  dispatchEdit,
  editorState,
  ClauseEditor,
  ConnectorLabel,
  styles,
}: FilterConnectionEditorProps<CLAUSE>) {
  const subFilters = compositeFilter.and || compositeFilter.or;

  const hasComplexChild = subFilters.some((s) => s.and || s.or);
  const shouldDisplayGrayout = hasComplexChild && !isRoot;
  // In case if we don't display grayout, we need to increase the length of
  // incoming connection line so it will connect with 'AND'|'OR' label
  const shouldExtendInputLine = !hasComplexChild && !isRoot;

  const addClause = useCallback(
    (newClauseFilter: ClauseFilter<CLAUSE>, connector: 'or' | 'and') => {
      dispatchEdit({
        type: 'new_clause_added',
        newClauseFilter: { ...newClauseFilter, clause: addTouchedFalse(newClauseFilter.clause) },
        connector,
        sourceFilter: compositeFilter,
      });
    },
    [compositeFilter, dispatchEdit]
  );

  return (
    <div className="fui:relative fui:flex fui:flex-col">
      {shouldDisplayGrayout ? (
        <div
          className={`fui:absolute fui:top-[0] fui:bottom-[0] fui:left-[0] ${styles.grayoutPanelClassName}`}
          style={{
            width: `calc(${lineLeftMargin} * 2)`,
            zIndex: FilterZIndex.Grayout,
          }}
        />
      ) : null}
      {shouldExtendInputLine ? <InputExtensionConnectionLine lineDefinition={styles.lineDefinition} /> : null}
      <ConnectorLabel
        compositeFilter={compositeFilter}
        addClause={addClause}
        isRoot={isRoot}
        connectorButtonStyle={{
          position: 'absolute',
          left: lineLeftMargin,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: FilterZIndex.ConnectorLabel,
        }}
      />
      {subFilters.map((subfilter, idx) => (
        <Fragment key={idx}>
          {idx === 0 ? null : <Spacer lineDefinition={styles.lineDefinition} />}
          <FilterInstanceEditor
            filter={subfilter}
            isRoot={false}
            dispatchEdit={dispatchEdit}
            editorState={editorState}
            ClauseEditor={ClauseEditor}
            ConnectorLabel={ConnectorLabel}
            styles={styles}
          >
            {(main) => (
              <div className="fui:flex fui:flex-col fui:items-stretch">
                <div className="fui:flex fui:flex-[1_0_auto] fui:flex-row fui:items-stretch">
                  <InterRowConnectionLine
                    currItemIdx={idx}
                    totalItemCount={subFilters.length}
                    lineDefinition={styles.lineDefinition}
                  />
                  <div className="fui:flex-[1_0_0]">{main}</div>
                </div>
              </div>
            )}
          </FilterInstanceEditor>
        </Fragment>
      ))}
    </div>
  );
}
