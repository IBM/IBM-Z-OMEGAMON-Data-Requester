import { r as e } from "./es-D3LE5GjK.js";
import { Component as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/InlineNotificationErrorBoundary.tsx
var r = class extends t {
	state = { error: null };
	static getDerivedStateFromError(e) {
		return { error: e };
	}
	render() {
		return this.state.error ? /* @__PURE__ */ n("div", {
			className: "w-full",
			children: /* @__PURE__ */ n(e, {
				kind: "error",
				title: this.props.fallbackTitle ?? "Unexpected error occurred",
				subtitle: this.state.error.message ?? this.props.fallbackSubtitle,
				hideCloseButton: !0,
				className: "w-full"
			})
		}) : this.props.children;
	}
};
//#endregion
export { r as InlineNotificationErrorBoundary };
