import { ClauseFilter } from 'public-common';
import { default as React } from 'react';
import { ClauseEditorProps } from './FilterEditor';
import { DispatchEdit, OriginalAndEditedClause } from './types';
type ClauseEditorWrapperProps<CLAUSE> = {
    clauseFilter: ClauseFilter<CLAUSE>;
    dispatchEdit: DispatchEdit<CLAUSE>;
    originalAndEditedClause: OriginalAndEditedClause<CLAUSE>;
    ClauseEditor: React.ComponentType<ClauseEditorProps<CLAUSE>>;
};
export declare function ClauseEditorWrapper<CLAUSE>({ clauseFilter, dispatchEdit, originalAndEditedClause, ClauseEditor, }: ClauseEditorWrapperProps<CLAUSE>): React.JSX.Element;
export {};
