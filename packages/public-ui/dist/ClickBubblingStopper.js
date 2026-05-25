import { stopPropagation as e } from "./functions/stopPropagation.js";
import "./functions/index.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/ClickBubblingStopper.tsx
function n({ children: n }) {
	return /* @__PURE__ */ t("div", {
		className: "fui:flex",
		onClick: e,
		children: n
	});
}
//#endregion
export { n as ClickBubblingStopper };
