//#region src/Select/VariableUtils.ts
var e = (e, t) => {
	if (t < 0) return { insideVariable: !1 };
	let n = e.lastIndexOf("${", t), r = e.lastIndexOf("}", t), i = e.indexOf("}", t + 1), a = e.indexOf("${", t + 1);
	return n === -1 && r === -1 && a === -1 && i === -1 ? { insideVariable: !1 } : n >= 0 && n < t && (r === -1 || r < n) && a === -1 && i === -1 || n >= 0 && n < r && r === t || n >= 0 && r < 0 && a < 0 && i > t || n >= 0 && r >= 0 && r > n && r < t && a < 0 && i > t ? {
		insideVariable: !0,
		varStart: n,
		varEnd: i >= 0 ? i : r
	} : { insideVariable: !1 };
}, t = /\$\{([^}]*)\}|\$\{([^}]*)$/, n = (e, n) => {
	if (!n.insideVariable) return "";
	let r = n.varEnd > 0 ? e.substring(n.varStart, n.varEnd) : e.substring(n.varStart), i = t.exec(r);
	return i ? [...i].at(-1) ?? "" : "";
};
function r(e) {
	let t = e.search(/\${(.*?)}/);
	if (t === -1) return [e];
	let n = e.indexOf("}", t), i = [e.substring(0, t), e.substring(t, n + 1)];
	return n + 1 < e.length && i.push(...r(e.substring(n + 1))), i;
}
//#endregion
export { n as extractVarValue, e as isInsideVariable, r as splitByPossibleVariables };
