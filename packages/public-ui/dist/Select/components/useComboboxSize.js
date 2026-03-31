import { useContext as p, useState as n, useEffect as b } from "react";
import "react/jsx-runtime";
import "../../lodash-CYNxjS-I.js";
import { FUIComboboxContext as w } from "./FUIContext.js";
function z() {
  const { comboboxRef: t, input: r, selectedOptions: i } = p(w), [s, c] = n(0), [f, m] = n(0), [u, d] = n(0);
  return b(() => {
    const e = () => {
      if (t && t.current) {
        const o = t.current.getBoundingClientRect();
        c(o.bottom), m(o.width), d(o.left);
      }
    };
    return e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
  }, [i, r, t]), {
    top: s,
    width: f,
    left: u
  };
}
export {
  z as useComboboxSize
};
