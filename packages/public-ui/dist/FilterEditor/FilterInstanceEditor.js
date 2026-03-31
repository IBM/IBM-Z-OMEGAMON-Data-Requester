import { jsx as e, jsxs as s } from "react/jsx-runtime";
import { a as D } from "../Touched-B_NvPUG5.js";
import { memo as v, useCallback as F, Fragment as N } from "react";
import { ClauseEditorWrapper as _ } from "./ClauseEditorWrapper.js";
import { lineLeftMargin as d } from "./ConnectionLine/ConnectionLine.js";
import { InputExtensionConnectionLine as b } from "./ConnectionLine/InputExtensionConnectionLine.js";
import { InterRowConnectionLine as g } from "./ConnectionLine/InterRowConnectionLine.js";
import { Spacer as w } from "./ConnectionLine/Spacer.js";
import { FilterZIndex as p } from "./ConnectionLine/FilterZIndex.js";
function L({
  filter: n,
  children: l,
  isRoot: t,
  dispatchEdit: f,
  editorState: c,
  ClauseEditor: r,
  ConnectorLabel: i,
  styles: a
}) {
  return n.clause ? l(
    /* @__PURE__ */ e(
      _,
      {
        clauseFilter: n,
        dispatchEdit: f,
        originalAndEditedClause: c,
        ClauseEditor: r
      }
    )
  ) : l(
    /* @__PURE__ */ e(
      E,
      {
        compositeFilter: n,
        isRoot: t,
        dispatchEdit: f,
        editorState: c,
        ClauseEditor: r,
        ConnectorLabel: i,
        styles: a
      }
    )
  );
}
const y = v(L);
function E({
  compositeFilter: n,
  isRoot: l,
  dispatchEdit: t,
  editorState: f,
  ClauseEditor: c,
  ConnectorLabel: r,
  styles: i
}) {
  const a = n.and || n.or, m = a.some((o) => o.and || o.or), x = m && !l, h = !m && !l, I = F(
    (o, u) => {
      t({
        type: "new_clause_added",
        newClauseFilter: { ...o, clause: D(o.clause) },
        connector: u,
        sourceFilter: n
      });
    },
    [n, t]
  );
  return /* @__PURE__ */ s("div", { className: "fui:relative fui:flex fui:flex-col", children: [
    x ? /* @__PURE__ */ e(
      "div",
      {
        className: `fui:absolute fui:top-[0] fui:bottom-[0] fui:left-[0] ${i.grayoutPanelClassName}`,
        style: {
          width: `calc(${d} * 2)`,
          zIndex: p.Grayout
        }
      }
    ) : null,
    h ? /* @__PURE__ */ e(b, { lineDefinition: i.lineDefinition }) : null,
    /* @__PURE__ */ e(
      r,
      {
        compositeFilter: n,
        addClause: I,
        isRoot: l,
        connectorButtonStyle: {
          position: "absolute",
          left: d,
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: p.ConnectorLabel
        }
      }
    ),
    a.map((o, u) => /* @__PURE__ */ s(N, { children: [
      u === 0 ? null : /* @__PURE__ */ e(w, { lineDefinition: i.lineDefinition }),
      /* @__PURE__ */ e(
        y,
        {
          filter: o,
          isRoot: !1,
          dispatchEdit: t,
          editorState: f,
          ClauseEditor: c,
          ConnectorLabel: r,
          styles: i,
          children: (C) => /* @__PURE__ */ e("div", { className: "fui:flex fui:flex-col fui:items-stretch", children: /* @__PURE__ */ s("div", { className: "fui:flex fui:flex-[1_0_auto] fui:flex-row fui:items-stretch", children: [
            /* @__PURE__ */ e(
              g,
              {
                currItemIdx: u,
                totalItemCount: a.length,
                lineDefinition: i.lineDefinition
              }
            ),
            /* @__PURE__ */ e("div", { className: "fui:flex-[1_0_0]", children: C })
          ] }) })
        }
      )
    ] }, u))
  ] });
}
export {
  y as FilterInstanceEditor
};
