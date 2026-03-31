import { jsx as i } from "react/jsx-runtime";
import { stopPropagation as r } from "./functions/stopPropagation.js";
import "react";
function n({ children: o }) {
  return /* @__PURE__ */ i("div", { className: "fui:flex", onClick: r, children: o });
}
export {
  n as ClickBubblingStopper
};
