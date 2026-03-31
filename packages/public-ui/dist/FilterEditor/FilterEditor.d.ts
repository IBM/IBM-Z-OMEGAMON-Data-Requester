import { CompositeFilter, ClauseFilter, Filter } from 'public-common';
import { default as React } from 'react';
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
export declare function FilterEditor<CLAUSE>({ filter, changeFilter, ClauseEditor, NoFiltersMessage, ConnectorLabel, styles, }: FilterEditorProps<CLAUSE>): React.JSX.Element | null;
