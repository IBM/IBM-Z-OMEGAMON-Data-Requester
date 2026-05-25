import { n as e, r as t } from "../Touched-0GoKkw98.js";
import { n, t as r } from "../useReplaceClauseWith-Czh9O6QD.js";
import { useCallback as i, useReducer as a } from "react";
//#region src/FilterEditor/useEditorReducer.ts
function o(e, t, r) {
	if (t.sourceFilter == null) return r(["root", t.newClauseFilter]), {
		type: "new_clause_added",
		newClauseFilter: t.newClauseFilter
	};
	let { newClauseFilter: i, connector: a, sourceFilter: o } = t, s = [];
	return e.originalClauseFilter === o ? s.push([o, n(a, { clause: e.editedClause }, i)]) : (s.push([o, n(a, o, i)]), e.originalClauseFilter && s.push([e.originalClauseFilter, { clause: e.editedClause }])), r(...s), {
		type: "new_clause_added",
		newClauseFilter: i
	};
}
function s(t, n, r) {
	return t.originalClauseFilter && r([t.originalClauseFilter, { clause: { ...e(t.editedClause) } }]), n;
}
function c(e, t, n) {
	return e.originalClauseFilter && n([e.originalClauseFilter, t.clauseFilter]), { type: "editing_canceled" };
}
function l(e, t, n) {
	switch (t.type) {
		case "editing_started": return t.clauseFilter === e.originalClauseFilter ? t : s(e, t, n);
		case "editing_canceled": return c(e, t, n);
		case "editing_applied": return t.clauseFilter === e.originalClauseFilter ? s(e, t, n) : (console.warn(`Filter Editor: got an 'editing_applied' action with source not matching the clause currently in editing mode. Filter from action: ${JSON.stringify(t.clauseFilter)}, current editable filter: ${JSON.stringify(e.originalClauseFilter)}`), t);
		case "new_clause_added": return o(e, t, n);
		case "clause_removed": return n([t.clauseFilter, "no_filter"]), t;
	}
	return t;
}
function u(e, t) {
	switch (t.type) {
		case "clause_edited_partially": return !e.editedClause || !e.originalClauseFilter ? e : {
			...e,
			editedClause: {
				...e.editedClause,
				...t.clauseFields
			}
		};
		case "clause_edited_fully": return !e.editedClause || !e.originalClauseFilter ? e : {
			...e,
			editedClause: { ...t.clause }
		};
		case "editing_started": return {
			originalClauseFilter: t.clauseFilter,
			editedClause: t.clauseFilter.clause,
			editOrigin: "existing"
		};
		case "editing_canceled": return {
			originalClauseFilter: null,
			editedClause: null,
			editOrigin: null
		};
		case "editing_applied": return e.originalClauseFilter ? {
			originalClauseFilter: null,
			editedClause: null,
			editOrigin: null
		} : e;
		case "new_clause_added": return {
			originalClauseFilter: t.newClauseFilter,
			editedClause: t.newClauseFilter.clause,
			editOrigin: "new"
		};
		case "clause_removed": return e.originalClauseFilter === t.clauseFilter ? {
			originalClauseFilter: null,
			editedClause: null,
			editOrigin: null
		} : e;
	}
}
function d() {
	return {
		originalClauseFilter: null,
		editedClause: null,
		editOrigin: null
	};
}
function f(e) {
	if (e && e.clause != null && t(e.clause) === !1) {
		let t = e;
		return {
			originalClauseFilter: t,
			editedClause: t.clause,
			editOrigin: "existing"
		};
	}
	return d();
}
function p(e, t) {
	let n = r(e, t);
	return a(i((e, t) => u(e, l(e, t, n)), [n]), e, f);
}
//#endregion
export { p as useEditorReducer };
