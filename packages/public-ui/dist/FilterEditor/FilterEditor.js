import { jsx as o, Fragment as s } from "react/jsx-runtime";
import { a as m } from "../Touched-B_NvPUG5.js";
import { useCallback as p } from "react";
import { FilterInstanceEditor as f } from "./FilterInstanceEditor.js";
import { useEditorReducer as F } from "./useEditorReducer.js";
function x({
  filter: r,
  changeFilter: d,
  ClauseEditor: i,
  NoFiltersMessage: n,
  ConnectorLabel: u,
  styles: a
}) {
  const [c, t] = F(r, d), l = p(
    (e) => {
      t({
        type: "new_clause_added",
        newClauseFilter: { clause: m(e) },
        sourceFilter: null,
        connector: null
      });
    },
    [t]
  );
  return !r && n ? /* @__PURE__ */ o(n, { addNewRootClause: l }) : r ? /* @__PURE__ */ o(
    f,
    {
      filter: r,
      isRoot: !0,
      dispatchEdit: t,
      editorState: c,
      ClauseEditor: i,
      ConnectorLabel: u,
      styles: a,
      children: (e) => /* @__PURE__ */ o(s, { children: e })
    }
  ) : null;
}
export {
  x as FilterEditor
};
