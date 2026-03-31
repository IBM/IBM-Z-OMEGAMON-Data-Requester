import { jsxs as r, jsx as a } from "react/jsx-runtime";
import { FilterZIndex as d } from "./FilterZIndex.js";
const o = "2em";
function l({
  shouldStretch: e,
  connectWithTop: s,
  connectWithBottom: u,
  lineDefinition: t
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: "fui:flex fui:w-[3em] fui:flex-none fui:flex-col fui:items-stretch fui:data-[should-stretch=true]:absolute fui:data-[should-stretch=true]:top-[0] fui:data-[should-stretch=true]:bottom-[0] fui:data-[should-stretch=true]:left-[0] fui:data-[should-stretch=true]:ml-[0]",
      style: Object.assign(
        { zIndex: d.ConnectionLine },
        e ? null : { marginLeft: o }
      ),
      "data-should-stretch": e,
      "data-connect-with-top": s,
      "data-connect-with-bottom": u,
      children: [
        /* @__PURE__ */ a("div", { className: "fui:flex-[1_1_auto]", style: s ? { borderLeft: t } : void 0 }),
        /* @__PURE__ */ a(
          "div",
          {
            className: "fui:flex-[1_1_auto]",
            style: Object.assign(
              { borderTop: t },
              u ? { borderLeft: t } : void 0
            )
          }
        )
      ]
    }
  );
}
export {
  l as ConnectionLine,
  o as lineLeftMargin
};
