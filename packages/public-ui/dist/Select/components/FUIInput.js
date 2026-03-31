import { jsx as l } from "react/jsx-runtime";
import { useContext as p } from "react";
import "../../lodash-CYNxjS-I.js";
import { FUIComboboxContext as s } from "./FUIContext.js";
import { G as m } from "../../combobox-BXFJAuVG.js";
function h({ ...n }) {
  const { handleSetInput: r, inputRef: a, input: e, isMulti: i, handleCaretChange: u } = p(s);
  return /* @__PURE__ */ l(
    m,
    {
      ...n,
      ...i ? {} : {
        displayValue: (o) => {
          if (!o)
            return e || "";
          const t = o;
          return t.id === -1 ? e : t.label || t.value;
        }
      },
      ref: a,
      onSelect: u,
      onChange: (o) => r(o.target.value),
      style: {
        outline: "none",
        boxShadow: "none",
        border: "none"
      }
    }
  );
}
export {
  h as FUIComboboxInput
};
