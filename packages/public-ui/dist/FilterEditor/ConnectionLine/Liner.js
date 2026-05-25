import { FilterZIndex as e } from "./FilterZIndex.js";
import "./ConnectionLine.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/FilterEditor/ConnectionLine/Liner.tsx
function r({ showBorder: r, children: i, lineDefinition: a }) {
	return /* @__PURE__ */ n("div", {
		className: "fui:flex fui:flex-[1_0_auto] fui:flex-row",
		style: {
			marginLeft: "2em",
			zIndex: e.ConnectionLine
		},
		children: [/* @__PURE__ */ t("div", {
			className: "fui:w-[3em] fui:flex-none",
			style: { borderLeft: r ? a : "none" }
		}), /* @__PURE__ */ t("div", {
			className: "fui:flex-[1_0_auto]",
			children: i
		})]
	});
}
//#endregion
export { r as Liner };
