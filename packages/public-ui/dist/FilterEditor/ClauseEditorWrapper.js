import { jsx as b } from "react/jsx-runtime";
import { a as s, b as g } from "../Touched-B_NvPUG5.js";
import { useCallback as n } from "react";
function p({
  clauseFilter: o,
  dispatchEdit: e,
  originalAndEditedClause: a,
  ClauseEditor: r
}) {
  const C = n(
    (u) => {
      e({
        type: "new_clause_added",
        connector: "or",
        newClauseFilter: { clause: s(u) },
        sourceFilter: o
      });
    },
    [e, o]
  ), y = n(
    (u) => {
      e({
        type: "new_clause_added",
        connector: "and",
        newClauseFilter: { clause: s(u) },
        sourceFilter: o
      });
    },
    [e, o]
  ), _ = n(() => {
    e({ type: "clause_removed", clauseFilter: o });
  }, [e, o]), l = o === a.originalClauseFilter, c = l ? a.editedClause : o.clause, t = n(() => {
    e({ type: "editing_started", clauseFilter: o });
  }, [e, o]), d = n(() => {
    e({ type: "editing_canceled", clauseFilter: { clause: g(o.clause) } });
  }, [e, o]), m = n(() => {
    e({ type: "editing_applied", clauseFilter: o });
  }, [o, e]), f = n(
    (u) => {
      e({ type: "clause_edited_partially", clauseFields: u });
    },
    [e]
  ), w = n(
    (u) => {
      e({ type: "clause_edited_fully", clause: u });
    },
    [e]
  );
  return /* @__PURE__ */ b(
    r,
    {
      clause: c,
      addClauseWithOr: C,
      addClauseWithAnd: y,
      removeClause: _,
      isClauseEditMode: l,
      enterClauseEditMode: t,
      cancelClauseEdit: d,
      submitClauseEdit: m,
      editClausePartially: f,
      editClauseFully: w
    }
  );
}
export {
  p as ClauseEditorWrapper
};
