import { FilterZIndex as e } from "./FilterZIndex.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/FilterEditor/ConnectionLine/ConnectionLine.tsx
var r = "2em";
function i({ shouldStretch: r, connectWithTop: i, connectWithBottom: a, lineDefinition: o }) {
	return /* @__PURE__ */ n("div", {
		className: "fui:flex fui:w-[3em] fui:flex-none fui:flex-col fui:items-stretch fui:data-[should-stretch=true]:absolute fui:data-[should-stretch=true]:top-[0] fui:data-[should-stretch=true]:bottom-[0] fui:data-[should-stretch=true]:left-[0] fui:data-[should-stretch=true]:ml-[0]",
		style: Object.assign({ zIndex: e.ConnectionLine }, r ? null : { marginLeft: "2em" }),
		"data-should-stretch": r,
		"data-connect-with-top": i,
		"data-connect-with-bottom": a,
		children: [/* @__PURE__ */ t("div", {
			className: "fui:flex-[1_1_auto]",
			style: i ? { borderLeft: o } : void 0
		}), /* @__PURE__ */ t("div", {
			className: "fui:flex-[1_1_auto]",
			style: Object.assign({ borderTop: o }, a ? { borderLeft: o } : void 0)
		})]
	});
}
//#endregion
export { i as ConnectionLine, r as lineLeftMargin };
