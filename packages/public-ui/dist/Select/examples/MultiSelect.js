import { FUIComboboxBadge as e } from "../components/FUIBadge.js";
import { i as t, o as n, r, t as i } from "../../Select-BYAFeCtv.js";
import { FUIComboboxFields as a } from "../components/FUIFields.js";
import { FUIComboboxOption as o } from "../components/FUIOption.js";
import { FUIComboboxButton as s } from "../components/FUIButton.js";
import { onChangePreprocessor as c } from "../preset/OnChangePreprocessor.js";
import { generateOptions as l } from "../preset/OptionsGenerator.js";
import { a as u, i as d, n as f, o as p, r as m, s as h, t as g } from "../../data-SzAgacYd.js";
import "react";
import { jsx as _, jsxs as v } from "react/jsx-runtime";
//#region src/Select/examples/MultiSelect.tsx
function y({ options: y, allowCustomValues: b, value: x }) {
	return /* @__PURE__ */ v(t, {
		value: x,
		generateOptions: l,
		preprocessOnChangeValues: c,
		options: y,
		allowCustomValues: b,
		as: m,
		children: [
			/* @__PURE__ */ v(a, {
				as: d,
				children: [/* @__PURE__ */ _(n, { children: (t, n) => /* @__PURE__ */ _(e, {
					option: t,
					onRemove: n,
					as: g
				}, t.id) }), /* @__PURE__ */ _(r, { as: u })]
			}),
			/* @__PURE__ */ _(s, { as: f }),
			/* @__PURE__ */ _(i, {
				as: h,
				children: (e) => /* @__PURE__ */ _(o, {
					value: e,
					disabled: e.disabled,
					as: p,
					children: e.isNewCustom ? `Create "${e.label || e.value}"` : e.label || e.value
				}, e.id)
			})
		]
	});
}
//#endregion
export { y as default };
