import { jsx as S } from "react/jsx-runtime";
import { l as U } from "../../lodash-CYNxjS-I.js";
import { useRef as b, useState as d } from "react";
import { FUIComboboxContext as F } from "./FUIContext.js";
import { H as T } from "../../combobox-BXFJAuVG.js";
function g({
  options: p,
  generateOptions: f,
  preprocessOnChangeValues: h,
  allowCustomValues: C,
  externalOnChange: i,
  ...r
}) {
  const o = b(null), n = b(null), [m, l] = d({
    startIdx: 0,
    endIdx: 0
  }), [x, a] = d(""), [s, I] = d(r.value || []), E = () => {
    var t, e;
    return l({
      startIdx: ((t = n.current) == null ? void 0 : t.selectionStart) || 0,
      endIdx: ((e = n.current) == null ? void 0 : e.selectionEnd) || 0
    });
  }, v = (t) => {
    var c, R;
    const e = h(t, x, {
      startIdx: ((c = n.current) == null ? void 0 : c.selectionStart) || 0,
      endIdx: ((R = n.current) == null ? void 0 : R.selectionEnd) || 0
    });
    e.options && (I(e.options), a(""), n.current && (n.current.value = ""), i && i(e.options)), e.input && n.current && (n.current.value = e.input, a(e.input));
  }, u = (t) => {
    const e = s.filter((c) => !U.isEqual(t, c));
    v(e);
  };
  return /* @__PURE__ */ S(
    F.Provider,
    {
      value: {
        options: p,
        selectedOptions: s,
        generateOptions: f,
        comboboxRef: o,
        input: x,
        textSelection: m,
        handleCaretChange: E,
        handleSetInput: a,
        inputRef: n,
        handleOnRemove: u,
        allowCustomValues: C,
        isMulti: !0
      },
      children: /* @__PURE__ */ S(
        T,
        {
          ...r,
          multiple: !0,
          immediate: !0,
          value: s,
          onChange: v,
          ref: o,
          as: r.as || "div"
        }
      )
    }
  );
}
const O = {
  id: -1,
  value: "",
  apply(p, f) {
    return "";
  }
};
function j({
  options: p,
  generateOptions: f,
  preprocessOnChangeValues: h,
  allowCustomValues: C,
  externalOnChange: i,
  ...r
}) {
  const o = b(null), n = b(null), [m, l] = d(""), [x, a] = d({
    startIdx: 0,
    endIdx: 0
  }), [s, I] = d(r.value || O), E = () => {
    var u, t;
    return a({
      startIdx: ((u = o.current) == null ? void 0 : u.selectionStart) || 0,
      endIdx: ((t = o.current) == null ? void 0 : t.selectionEnd) || 0
    });
  }, v = (u) => {
    var e, c;
    if (!u) {
      l(""), I(O), i && i(null);
      return;
    }
    const t = h([u], m, {
      startIdx: ((e = o.current) == null ? void 0 : e.selectionStart) || 0,
      endIdx: ((c = o.current) == null ? void 0 : c.selectionEnd) || 0
    });
    t.input && o.current && (l(t.input), o.current.value = t.input), t.options && (I(t.options[0]), l(""), i && i(t.options[0]));
  };
  return /* @__PURE__ */ S(
    F.Provider,
    {
      value: {
        options: p,
        selectedOptions: s ? [s] : [],
        generateOptions: f,
        handleSetInput: l,
        inputRef: o,
        comboboxRef: n,
        input: m,
        handleCaretChange: E,
        textSelection: x,
        allowCustomValues: C
      },
      children: /* @__PURE__ */ S(
        T,
        {
          ...r,
          ref: n,
          immediate: !0,
          value: s,
          onChange: v,
          as: r.as || "div"
        }
      )
    }
  );
}
export {
  g as FUIMultipleCombobox,
  j as FUISingleCombobox
};
