import { Filter } from 'public-common';
import { default as React, ReactNode, ReactElement } from 'react';
import { ClauseEditorProps, ConnectorLabelProps, FilterEditorStyles } from './FilterEditor';
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
declare function FilterInstanceEditorImpl<CLAUSE>({ filter, children: render, isRoot, dispatchEdit, editorState, ClauseEditor, ConnectorLabel, styles, }: FilterInstanceEditorProps<CLAUSE>): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export declare const FilterInstanceEditor: typeof FilterInstanceEditorImpl;
export {};
