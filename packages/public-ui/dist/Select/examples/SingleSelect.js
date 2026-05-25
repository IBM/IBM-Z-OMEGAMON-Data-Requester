import { a as e, r as t, t as n } from "../../Select-BYAFeCtv.js";
import { FUIComboboxOption as r } from "../components/FUIOption.js";
import { FUIComboboxButton as i } from "../components/FUIButton.js";
import { onChangePreprocessor as a } from "../preset/OnChangePreprocessor.js";
import { generateOptions as o } from "../preset/OptionsGenerator.js";
import { a as s, n as c, o as l, r as u, s as d } from "../../data-SzAgacYd.js";
import "react";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/Select/examples/SingleSelect.tsx
function m({ options: m, allowCustomValues: h, value: g }) {
	return /* @__PURE__ */ p(e, {
		generateOptions: o,
		preprocessOnChangeValues: a,
		options: m,
		value: g,
		allowCustomValues: h,
		as: u,
		children: [
			/* @__PURE__ */ f(t, { as: s }),
			/* @__PURE__ */ f(i, { as: c }),
			/* @__PURE__ */ f(n, {
				as: d,
				children: (e) => /* @__PURE__ */ f(r, {
					value: e,
					disabled: e.disabled,
					as: l,
					children: e.isNewCustom ? `Create "${e.label || e.value}"` : e.label || e.value
				}, e.id)
			})
		]
	});
}
//#endregion
export { m as default };
