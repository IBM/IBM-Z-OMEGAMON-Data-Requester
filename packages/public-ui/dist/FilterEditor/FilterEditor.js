import { t as e } from "../Touched-0GoKkw98.js";
import { FilterInstanceEditor as t } from "./FilterInstanceEditor.js";
import { useEditorReducer as n } from "./useEditorReducer.js";
import { useCallback as r } from "react";
import { Fragment as i, jsx as a } from "react/jsx-runtime";
//#region src/FilterEditor/FilterEditor.tsx
function o({ filter: o, changeFilter: s, ClauseEditor: c, NoFiltersMessage: l, ConnectorLabel: u, styles: d }) {
	let [f, p] = n(o, s), m = r((t) => {
		p({
			type: "new_clause_added",
			newClauseFilter: { clause: e(t) },
			sourceFilter: null,
			connector: null
		});
	}, [p]);
	return !o && l ? /* @__PURE__ */ a(l, { addNewRootClause: m }) : o ? /* @__PURE__ */ a(t, {
		filter: o,
		isRoot: !0,
		dispatchEdit: p,
		editorState: f,
		ClauseEditor: c,
		ConnectorLabel: u,
		styles: d,
		children: (e) => /* @__PURE__ */ a(i, { children: e })
	}) : null;
}
//#endregion
export { o as FilterEditor };
