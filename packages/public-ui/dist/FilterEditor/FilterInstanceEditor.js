import { t as e } from "../Touched-0GoKkw98.js";
import { ClauseEditorWrapper as t } from "./ClauseEditorWrapper.js";
import { FilterZIndex as n } from "./ConnectionLine/FilterZIndex.js";
import "./ConnectionLine/ConnectionLine.js";
import { InputExtensionConnectionLine as r } from "./ConnectionLine/InputExtensionConnectionLine.js";
import { InterRowConnectionLine as i } from "./ConnectionLine/InterRowConnectionLine.js";
import { Spacer as a } from "./ConnectionLine/Spacer.js";
import "./ConnectionLine/index.js";
import { Fragment as o, memo as s, useCallback as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/FilterEditor/FilterInstanceEditor.tsx
function d({ filter: e, children: n, isRoot: r, dispatchEdit: i, editorState: a, ClauseEditor: o, ConnectorLabel: s, styles: c }) {
	return e.clause ? n(/* @__PURE__ */ l(t, {
		clauseFilter: e,
		dispatchEdit: i,
		originalAndEditedClause: a,
		ClauseEditor: o
	})) : n(/* @__PURE__ */ l(p, {
		compositeFilter: e,
		isRoot: r,
		dispatchEdit: i,
		editorState: a,
		ClauseEditor: o,
		ConnectorLabel: s,
		styles: c
	}));
}
var f = s(d);
function p({ compositeFilter: t, isRoot: s, dispatchEdit: d, editorState: p, ClauseEditor: m, ConnectorLabel: h, styles: g }) {
	let _ = t.and || t.or, v = _.some((e) => e.and || e.or), y = v && !s, b = !v && !s, x = c((n, r) => {
		d({
			type: "new_clause_added",
			newClauseFilter: {
				...n,
				clause: e(n.clause)
			},
			connector: r,
			sourceFilter: t
		});
	}, [t, d]);
	return /* @__PURE__ */ u("div", {
		className: "fui:relative fui:flex fui:flex-col",
		children: [
			y ? /* @__PURE__ */ l("div", {
				className: `fui:absolute fui:top-[0] fui:bottom-[0] fui:left-[0] ${g.grayoutPanelClassName}`,
				style: {
					width: "calc(2em * 2)",
					zIndex: n.Grayout
				}
			}) : null,
			b ? /* @__PURE__ */ l(r, { lineDefinition: g.lineDefinition }) : null,
			/* @__PURE__ */ l(h, {
				compositeFilter: t,
				addClause: x,
				isRoot: s,
				connectorButtonStyle: {
					position: "absolute",
					left: "2em",
					top: "50%",
					transform: "translate(-50%, -50%)",
					zIndex: n.ConnectorLabel
				}
			}),
			_.map((e, t) => /* @__PURE__ */ u(o, { children: [t === 0 ? null : /* @__PURE__ */ l(a, { lineDefinition: g.lineDefinition }), /* @__PURE__ */ l(f, {
				filter: e,
				isRoot: !1,
				dispatchEdit: d,
				editorState: p,
				ClauseEditor: m,
				ConnectorLabel: h,
				styles: g,
				children: (e) => /* @__PURE__ */ l("div", {
					className: "fui:flex fui:flex-col fui:items-stretch",
					children: /* @__PURE__ */ u("div", {
						className: "fui:flex fui:flex-[1_0_auto] fui:flex-row fui:items-stretch",
						children: [/* @__PURE__ */ l(i, {
							currItemIdx: t,
							totalItemCount: _.length,
							lineDefinition: g.lineDefinition
						}), /* @__PURE__ */ l("div", {
							className: "fui:flex-[1_0_0]",
							children: e
						})]
					})
				})
			})] }, t))
		]
	});
}
//#endregion
export { f as FilterInstanceEditor };
