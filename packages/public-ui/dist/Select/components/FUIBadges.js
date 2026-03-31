import * as r from "react";
import "react/jsx-runtime";
import "../../lodash-CYNxjS-I.js";
import { FUIComboboxContext as m } from "./FUIContext.js";
function c({ children: e }) {
  const {
    selectedOptions: t,
    handleOnRemove: n = (o) => {
      console.log("FUI, WARNING! No remove option function is provided");
    }
  } = r.useContext(m);
  return t.map((o) => e(o, n));
}
export {
  c as FUIComboboxBadges
};
