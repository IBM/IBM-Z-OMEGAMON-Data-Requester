import { ConnectionLine as e } from "./ConnectionLine.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/FilterEditor/ConnectionLine/InterRowConnectionLine.tsx
function n({ currItemIdx: n, totalItemCount: r, lineDefinition: i }) {
	return /* @__PURE__ */ t(e, {
		shouldStretch: !1,
		connectWithTop: n !== 0,
		connectWithBottom: n !== r - 1,
		lineDefinition: i
	});
}
//#endregion
export { n as InterRowConnectionLine };
