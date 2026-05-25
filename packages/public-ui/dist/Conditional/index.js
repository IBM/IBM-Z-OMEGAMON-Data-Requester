//#region src/Conditional/index.tsx
function e({ children: e, enabled: t, fallback: n = null }) {
	return t ? e : n;
}
//#endregion
export { e as Conditional };
