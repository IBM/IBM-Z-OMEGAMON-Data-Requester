const o = Symbol.for("touched");
function u(e) {
  return { ...e, [o]: !1 };
}
function t(e) {
  return { ...e, [o]: !0 };
}
export {
  u as a,
  t as b
};
