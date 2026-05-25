import { Liner as e } from "./Liner.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/FilterEditor/ConnectionLine/Spacer.tsx
function n({ lineDefinition: n }) {
	return /* @__PURE__ */ t(e, {
		showBorder: !0,
		lineDefinition: n,
		children: /* @__PURE__ */ t("div", { className: "fui:h-[1em]" })
	});
}
//#endregion
export { n as Spacer };
