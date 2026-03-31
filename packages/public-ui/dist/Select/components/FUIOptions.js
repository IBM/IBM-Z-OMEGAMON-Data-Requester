import { jsx as x } from "react/jsx-runtime";
import * as c from "react";
import { useComboboxSize as d } from "./useComboboxSize.js";
import "../../lodash-CYNxjS-I.js";
import { FUIComboboxContext as C } from "./FUIContext.js";
import { K as O } from "../../combobox-BXFJAuVG.js";
function F({ children: t, ...s }) {
  const {
    generateOptions: i,
    input: n,
    options: r,
    selectedOptions: p,
    allowCustomValues: a = !1,
    isMulti: l = !1,
    textSelection: m
  } = c.useContext(C), e = i(
    r,
    l ? p : [],
    n,
    m.startIdx,
    a
  ), { top: u, left: b, width: f } = d();
  return /* @__PURE__ */ x(
    O,
    {
      ...s,
      style: {
        top: u,
        left: b,
        width: f,
        position: "absolute"
      },
      children: e.length ? e.map((o) => t(o)) : t({
        id: -2,
        value: "No options available",
        disabled: !0,
        apply(o, h) {
          return o;
        }
      })
    }
  );
}
export {
  F as FUIComboboxOptions
};
