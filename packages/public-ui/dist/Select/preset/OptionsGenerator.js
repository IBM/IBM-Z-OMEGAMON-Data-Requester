import { isInsideVariable as f, extractVarValue as v } from "../VariableUtils.js";
const b = (o, e, r, w, C) => {
  const u = f(r, w || 0);
  if (u.insideVariable) {
    const a = v(r, u).toLowerCase();
    return o.filter(
      (l) => l.value.startsWith("${") && l.value.toLowerCase().includes(a)
    );
  }
  const s = o.filter((a) => {
    var l;
    return (((l = a.label) == null ? void 0 : l.toLowerCase().includes(r.toLowerCase())) || a.value.toLowerCase().includes(r.toLowerCase())) && !(e != null && e.includes(a));
  });
  return r.length > 0 && C && !(e != null && e.some((a) => a.value === r)) && s.push({
    id: r,
    value: r,
    label: r,
    isNewCustom: !0,
    apply: (a, l) => a
  }), s;
};
export {
  b as generateOptions
};
