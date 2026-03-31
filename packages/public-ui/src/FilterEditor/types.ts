import type { Filter, FilterCombinationResult, ClauseFilter, WithTouched } from 'public-common';

export type ReplacementDefinition<CLAUSE> = [Filter<CLAUSE> | 'root', FilterCombinationResult<CLAUSE>];

export type ReplaceClauseFunction<CLAUSE> = (...replacements: Array<ReplacementDefinition<CLAUSE>>) => void;

export type OriginalAndEditedClause<CLAUSE> =
  | {
      /** Original clause user currently edits */
      originalClauseFilter: ClauseFilter<CLAUSE>;
      /** Current state of editing form(s). Once user applies the changes, it will be
       * converted to a MetricsQueryFilterClause and replace the original clause in
       * the whole filter
       */
      editedClause: CLAUSE;
    }
  | {
      originalClauseFilter: null;
      editedClause: null;
    };

export type BaseEditorAction<CLAUSE> =
  | {
      type: 'editing_started';
      clauseFilter: ClauseFilter<CLAUSE>;
    }
  | {
      type: 'editing_applied';
      clauseFilter: ClauseFilter<CLAUSE>;
    }
  | {
      type: 'clause_edited_partially';
      clauseFields: Partial<CLAUSE>;
    }
  | {
      type: 'clause_edited_fully';
      clause: CLAUSE;
    }
  | {
      type: 'clause_removed';
      clauseFilter: ClauseFilter<CLAUSE>;
    };

export type AddClauseAction<CLAUSE> =
  | {
      // For the case when there are no filters defined yet and user adds the first clause (root clause)
      type: 'new_clause_added';
      sourceFilter: null;
      connector: null;
      newClauseFilter: ClauseFilter<CLAUSE & WithTouched>;
    }
  | {
      /**
       * For the case when there is already at least one clause
       * and user clicks "Add new clause" button on a clause editor or a line connector.
       */
      type: 'new_clause_added';
      /**
       * If user clicked "Add new clause" button on:
       * - clause editor, then `sourceFilter` is that clause filter.
       * - line connector, then `sourceFilter` is that compound filter (filter containing property `and` / `or`).
       */
      sourceFilter: Filter<CLAUSE>;
      connector: 'or' | 'and';
      newClauseFilter: ClauseFilter<CLAUSE & WithTouched>;
    };

export type CancelClauseEditAction<CLAUSE> = {
  type: 'editing_canceled';
  clauseFilter: ClauseFilter<CLAUSE & WithTouched>;
};

export type EditorAction<CLAUSE> = BaseEditorAction<CLAUSE> | AddClauseAction<CLAUSE> | CancelClauseEditAction<CLAUSE>;

export type DispatchEdit<CLAUSE> = React.Dispatch<EditorAction<CLAUSE>>;
