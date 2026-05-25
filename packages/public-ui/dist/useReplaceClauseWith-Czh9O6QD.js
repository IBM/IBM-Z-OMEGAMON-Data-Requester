import { useCallback as e } from "react";
//#region ../public-common/src/functions/combineFilters.ts
function t(...e) {
	return e.reduce(n, "no_filter");
}
function n(e, t) {
	if (e === "always_true" || t === "always_true") return "always_true";
	if (e === "no_filter") return t;
	if (t === "no_filter") return e;
	if (e === "always_false") return t;
	if (t === "always_false") return e;
	let n = e.or ?? [e], r = t.or ?? [t];
	return { or: [...n, ...r] };
}
function r(...e) {
	return e.reduce(i, "no_filter");
}
function i(e, t) {
	if (e === "always_false" || t === "always_false") return "always_false";
	if (e === "no_filter") return t;
	if (t === "no_filter") return e;
	if (e === "always_true") return t;
	if (t === "always_true") return e;
	let n = e.and ?? [e], r = t.and ?? [t];
	return { and: [...n, ...r] };
}
function a(e, ...n) {
	return e === "or" ? t(...n) : r(...n);
}
//#endregion
//#region ../public-common/src/functions/transformFilter.ts
function o(e, t) {
	let n = /* @__PURE__ */ new Set(), r = (e, r) => {
		if (!e || n.has(e)) return r;
		let i = t.get(e);
		return i ? (n.add(e), i) : null;
	};
	return s(e, (e) => r(e, e) ?? r(e.clause, e) ?? e);
}
function s(e, n) {
	let i = n(e);
	return typeof i == "string" ? i : i.or ? i.or.reduce((e, r) => t(e, s(r, n)), "no_filter") : i.and ? i.and.reduce((e, t) => r(e, s(t, n)), "no_filter") : i;
}
function c(e) {
	if (e === "always_false") throw Error("Filter is always FALSE");
	if (!(e === "always_true" || e === "no_filter")) return e;
}
//#endregion
//#region src/FilterEditor/useReplaceClauseWith.ts
function l(t, n) {
	return e((...e) => {
		let r = e.find(([e]) => e === "root");
		if (r) {
			if (e.length > 1) throw Error("Invalid argument: Replacements containing root node replacement has more than 1 element");
			let t = r[1];
			if (typeof t == "string") throw Error("Invalid argument: Root replacement should be a filter");
			n(t);
			return;
		}
		let i = /* @__PURE__ */ new Map();
		e.forEach(([e, t]) => {
			i.set(e, t);
		}), n(c(t && o(t, i)));
	}, [t, n]);
}
//#endregion
export { a as n, l as t };
