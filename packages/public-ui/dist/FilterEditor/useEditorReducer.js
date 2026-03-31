import { u as t, c as s } from "../useReplaceClauseWith-DewscVL1.js";
import { b as c } from "../Touched-B_NvPUG5.js";
import { useCallback as C, useReducer as o } from "react";
function F(e, l, r) {
  if (l.sourceFilter == null)
    return r(["root", l.newClauseFilter]), {
      type: "new_clause_added",
      newClauseFilter: l.newClauseFilter
    };
  const { newClauseFilter: n, connector: d, sourceFilter: i } = l, u = [];
  return e.originalClauseFilter === i ? u.push([i, s(d, { clause: e.editedClause }, n)]) : (u.push([i, s(d, i, n)]), e.originalClauseFilter && u.push([e.originalClauseFilter, { clause: e.editedClause }])), r(...u), {
    type: "new_clause_added",
    newClauseFilter: n
  };
}
function a(e, l, r) {
  return e.originalClauseFilter && r([e.originalClauseFilter, { clause: { ...c(e.editedClause) } }]), l;
}
function g(e, l, r) {
  return e.originalClauseFilter && r([e.originalClauseFilter, l.clauseFilter]), {
    type: "editing_canceled"
  };
}
function f(e, l, r) {
  switch (l.type) {
    case "editing_started":
      return l.clauseFilter === e.originalClauseFilter ? l : a(e, l, r);
    case "editing_canceled":
      return g(e, l, r);
    case "editing_applied":
      return l.clauseFilter !== e.originalClauseFilter ? (console.warn(
        `Filter Editor: got an 'editing_applied' action with source not matching the clause currently in editing mode. Filter from action: ${JSON.stringify(
          l.clauseFilter
        )}, current editable filter: ${JSON.stringify(e.originalClauseFilter)}`
      ), l) : a(e, l, r);
    case "new_clause_added":
      return F(e, l, r);
    case "clause_removed":
      return r([l.clauseFilter, "no_filter"]), l;
  }
  return l;
}
function _(e, l) {
  switch (l.type) {
    case "clause_edited_partially":
      return !e.editedClause || !e.originalClauseFilter ? e : { ...e, editedClause: { ...e.editedClause, ...l.clauseFields } };
    case "clause_edited_fully":
      return !e.editedClause || !e.originalClauseFilter ? e : { ...e, editedClause: { ...l.clause } };
    case "editing_started":
      return {
        originalClauseFilter: l.clauseFilter,
        editedClause: l.clauseFilter.clause
      };
    case "editing_canceled":
      return {
        originalClauseFilter: null,
        editedClause: null
      };
    case "editing_applied":
      return e.originalClauseFilter ? {
        originalClauseFilter: null,
        editedClause: null
      } : e;
    case "new_clause_added":
      return {
        originalClauseFilter: l.newClauseFilter,
        editedClause: l.newClauseFilter.clause
      };
    case "clause_removed":
      return e.originalClauseFilter === l.clauseFilter ? {
        originalClauseFilter: null,
        editedClause: null
      } : e;
  }
}
function y(e, l) {
  const r = t(e, l), n = C(
    (d, i) => {
      const u = f(d, i, r);
      return _(d, u);
    },
    [r]
  );
  return o(n, { originalClauseFilter: null, editedClause: null });
}
export {
  y as useEditorReducer
};
