import { jsxs as e, jsx as r } from "react/jsx-runtime";
import { AsCombobox as a, AsFields as b, AsBadge as l, AsInput as d, AsButton as p, AsOptions as f, AsOption as n } from "./data.js";
import { FUIComboboxBadge as u } from "../components/FUIBadge.js";
import { FUIComboboxBadges as C } from "../components/FUIBadges.js";
import { FUIMultipleCombobox as x } from "../components/FUICombobox.js";
import "../components/FUIContext.js";
import { FUIComboboxFields as F } from "../components/FUIFields.js";
import { FUIComboboxInput as I } from "../components/FUIInput.js";
import { FUIComboboxOption as c } from "../components/FUIOption.js";
import { FUIComboboxOptions as U } from "../components/FUIOptions.js";
import { FUIComboboxButton as h } from "../components/FUIButton.js";
import { onChangePreprocessor as A } from "../preset/OnChangePreprocessor.js";
import { generateOptions as g } from "../preset/OptionsGenerator.js";
function y({
  options: m,
  allowCustomValues: s,
  value: t
}) {
  return /* @__PURE__ */ e(
    x,
    {
      value: t,
      generateOptions: g,
      preprocessOnChangeValues: A,
      options: m,
      allowCustomValues: s,
      as: a,
      children: [
        /* @__PURE__ */ e(F, { as: b, children: [
          /* @__PURE__ */ r(C, { children: (o, i) => /* @__PURE__ */ r(u, { option: o, onRemove: i, as: l }, o.id) }),
          /* @__PURE__ */ r(I, { as: d })
        ] }),
        /* @__PURE__ */ r(h, { as: p }),
        /* @__PURE__ */ r(U, { as: f, children: (o) => /* @__PURE__ */ r(c, { value: o, disabled: o.disabled, as: n, children: o.isNewCustom ? `Create "${o.label || o.value}"` : o.label || o.value }, o.id) })
      ]
    }
  );
}
export {
  y as default
};
