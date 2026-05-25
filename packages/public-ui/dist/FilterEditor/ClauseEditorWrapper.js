import { n as e, t } from "../Touched-0GoKkw98.js";
import { useCallback as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/FilterEditor/ClauseEditorWrapper.tsx
function i({ clauseFilter: i, dispatchEdit: a, originalAndEditedClause: o, ClauseEditor: s }) {
	let c = n((e) => {
		a({
			type: "new_clause_added",
			connector: "or",
			newClauseFilter: { clause: t(e) },
			sourceFilter: i
		});
	}, [a, i]), l = n((e) => {
		a({
			type: "new_clause_added",
			connector: "and",
			newClauseFilter: { clause: t(e) },
			sourceFilter: i
		});
	}, [a, i]), u = n(() => {
		a({
			type: "clause_removed",
			clauseFilter: i
		});
	}, [a, i]), d = i === o.originalClauseFilter, f = d && o.editOrigin === "new";
	return /* @__PURE__ */ r(s, {
		clause: d ? o.editedClause : i.clause,
		addClauseWithOr: c,
		addClauseWithAnd: l,
		removeClause: u,
		isClauseEditMode: d,
		enterClauseEditMode: n(() => {
			a({
				type: "editing_started",
				clauseFilter: i
			});
		}, [a, i]),
		cancelClauseEdit: n(() => {
			a({
				type: "editing_canceled",
				clauseFilter: { clause: e(i.clause) }
			});
		}, [a, i]),
		submitClauseEdit: n(() => {
			a({
				type: "editing_applied",
				clauseFilter: i
			});
		}, [i, a]),
		isNewClauseInSession: f,
		editClausePartially: n((e) => {
			a({
				type: "clause_edited_partially",
				clauseFields: e
			});
		}, [a]),
		editClauseFully: n((e) => {
			a({
				type: "clause_edited_fully",
				clause: e
			});
		}, [a])
	});
}
//#endregion
export { i as ClauseEditorWrapper };
