import { isInsideVariable as e } from "../VariableUtils.js";
//#region src/Select/preset/OnChangePreprocessor.ts
var t = (t, n, r) => {
	let i = [...t].pop(), a = e(n, r.startIdx);
	return a.insideVariable && i ? { input: i.apply(n, {
		startIdx: a.varStart,
		endIdx: a.varEnd
	}) } : {
		options: t,
		input: ""
	};
};
//#endregion
export { t as onChangePreprocessor };
