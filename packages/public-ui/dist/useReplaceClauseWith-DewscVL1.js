import { useCallback as f } from "react";
function c(...n) {
  return n.reduce(d, "no_filter");
}
function d(n, e) {
  if (n === "always_true" || e === "always_true")
    return "always_true";
  if (n === "no_filter")
    return e;
  if (e === "no_filter")
    return n;
  if (n === "always_false")
    return e;
  if (e === "always_false")
    return n;
  const r = n.or ?? [n], o = e.or ?? [e];
  return {
    or: [...r, ...o]
  };
}
function l(...n) {
  return n.reduce(w, "no_filter");
}
function w(n, e) {
  if (n === "always_false" || e === "always_false")
    return "always_false";
  if (n === "no_filter")
    return e;
  if (e === "no_filter")
    return n;
  if (n === "always_true")
    return e;
  if (e === "always_true")
    return n;
  const r = n.and ?? [n], o = e.and ?? [e];
  return {
    and: [...r, ...o]
  };
}
function y(n, ...e) {
  return n === "or" ? c(...e) : l(...e);
}
function _(n, e) {
  const r = /* @__PURE__ */ new Set(), o = (t, a) => {
    if (!t || r.has(t))
      return a;
    const i = e.get(t);
    return i ? (r.add(t), i) : null;
  };
  return s(n, (t) => o(t, t) ?? o(t.clause, t) ?? t);
}
function s(n, e) {
  const r = e(n);
  return typeof r == "string" ? r : r.or ? r.or.reduce((o, t) => {
    const a = s(t, e);
    return c(o, a);
  }, "no_filter") : r.and ? r.and.reduce((o, t) => {
    const a = s(t, e);
    return l(o, a);
  }, "no_filter") : r;
}
function p(n) {
  if (n === "always_false")
    throw new Error("Filter is always FALSE");
  if (!(n === "always_true" || n === "no_filter"))
    return n;
}
function F(n, e) {
  return f(
    (...r) => {
      const o = r.find(([u]) => u === "root");
      if (o) {
        if (r.length > 1)
          throw new Error("Invalid argument: Replacements containing root node replacement has more than 1 element");
        const u = o[1];
        if (typeof u == "string")
          throw new Error("Invalid argument: Root replacement should be a filter");
        e(u);
        return;
      }
      const t = /* @__PURE__ */ new Map();
      r.forEach(([u, m]) => {
        t.set(u, m);
      });
      const a = n && _(n, t), i = p(a);
      e(i);
    },
    [n, e]
  );
}
export {
  y as c,
  F as u
};
