import { jsx as e } from "react/jsx-runtime";
import { ConnectionLine as i } from "./ConnectionLine.js";
function f({ currItemIdx: o, totalItemCount: n, lineDefinition: t }) {
  return /* @__PURE__ */ e(
    i,
    {
      shouldStretch: !1,
      connectWithTop: o !== 0,
      connectWithBottom: o !== n - 1,
      lineDefinition: t
    }
  );
}
export {
  f as InterRowConnectionLine
};
