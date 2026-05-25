import { extractVarValue as e, isInsideVariable as t } from "../VariableUtils.js";
//#region src/Select/preset/OptionsGenerator.ts
var n = (n, r, i, a, o) => {
	let s = t(i, a || 0);
	if (s.insideVariable) {
		let t = e(i, s).toLowerCase();
		return n.filter((e) => e.value.startsWith("${") && e.value.toLowerCase().includes(t));
	}
	let c = n.filter((e) => (e.label?.toLowerCase().includes(i.toLowerCase()) || e.value.toLowerCase().includes(i.toLowerCase())) && !r?.includes(e));
	return i.length > 0 && o && !r?.some((e) => e.value === i) && c.push({
		id: i,
		value: i,
		label: i,
		isNewCustom: !0,
		apply: (e, t) => e
	}), c;
};
//#endregion
export { n as generateOptions };
