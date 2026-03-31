import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { lineLeftMargin as o } from "./ConnectionLine.js";
import { FilterZIndex as t } from "./FilterZIndex.js";
function a({ showBorder: i, children: f, lineDefinition: n }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: "fui:flex fui:flex-[1_0_auto] fui:flex-row",
      style: {
        marginLeft: o,
        zIndex: t.ConnectionLine
      },
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: "fui:w-[3em] fui:flex-none",
            style: {
              borderLeft: i ? n : "none"
            }
          }
        ),
        /* @__PURE__ */ e("div", { className: "fui:flex-[1_0_auto]", children: f })
      ]
    }
  );
}
export {
  a as Liner
};
