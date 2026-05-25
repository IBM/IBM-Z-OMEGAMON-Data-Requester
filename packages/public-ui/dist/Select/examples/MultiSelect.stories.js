import { c as e, l as t } from "../../data-SzAgacYd.js";
import n from "./MultiSelect.js";
//#region src/Select/examples/MultiSelect.stories.tsx
var r = {
	title: "Example/Multi Select",
	component: n,
	parameters: { layout: "centered" },
	argTypes: {},
	args: {}
}, i = { args: { options: [] } }, a = { args: { options: [...t, ...e] } }, o = { args: {
	options: [...t, ...e],
	value: [...e]
} }, s = { args: {
	options: [...t, ...e],
	allowCustomValues: !0
} };
//#endregion
export { s as AllowCustomValues, a as Default, i as NoOptions, o as WithSelectedItems, r as default };
