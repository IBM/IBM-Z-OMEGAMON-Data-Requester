//#region src/Select/preset/onApply.ts
function e(e, t) {
	return e.substring(0, t.startIdx) + this.value + (t.endIdx > 0 ? e.substring(t.endIdx + 1) : "");
}
//#endregion
export { e as sharedApply };
