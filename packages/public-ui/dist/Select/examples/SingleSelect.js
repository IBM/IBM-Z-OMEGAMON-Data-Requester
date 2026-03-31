import { jsxs as t, jsx as r } from "react/jsx-runtime";
import { AsCombobox as a, AsInput as i, AsButton as l, AsOptions as b, AsOption as n } from "./data.js";
import "react";
import { FUISingleCombobox as p } from "../components/FUICombobox.js";
import "../components/FUIContext.js";
import { FUIComboboxInput as u } from "../components/FUIInput.js";
import { FUIComboboxOption as f } from "../components/FUIOption.js";
import { FUIComboboxOptions as C } from "../components/FUIOptions.js";
import { FUIComboboxButton as d } from "../components/FUIButton.js";
import { onChangePreprocessor as x } from "../preset/OnChangePreprocessor.js";
import { generateOptions as c } from "../preset/OptionsGenerator.js";
function w({ options: e, allowCustomValues: m, value: s }) {
  return /* @__PURE__ */ t(
    p,
    {
      generateOptions: c,
      preprocessOnChangeValues: x,
      options: e,
      value: s,
      allowCustomValues: m,
      as: a,
      children: [
        /* @__PURE__ */ r(u, { as: i }),
        /* @__PURE__ */ r(d, { as: l }),
        /* @__PURE__ */ r(C, { as: b, children: (o) => /* @__PURE__ */ r(f, { value: o, disabled: o.disabled, as: n, children: o.isNewCustom ? `Create "${o.label || o.value}"` : o.label || o.value }, o.id) })
      ]
    }
  );
}
export {
  w as default
};
