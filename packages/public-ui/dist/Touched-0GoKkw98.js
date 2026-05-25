//#region ../public-common/src/functions/assert.ts
function e(e, t) {
	if (!e) throw Error(t);
}
//#endregion
//#region ../public-common/src/functions/Touched.ts
var t = Symbol.for("touched");
function n(n) {
	return e(typeof n == "object" && !!n, "wasTouched can only be used with objects"), n[t];
}
function r(e) {
	return {
		...e,
		[t]: !1
	};
}
function i(e) {
	return {
		...e,
		[t]: !0
	};
}
//#endregion
export { i as n, n as r, r as t };
