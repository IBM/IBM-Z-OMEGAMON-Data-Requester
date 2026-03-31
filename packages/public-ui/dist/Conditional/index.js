function i({ children: n, enabled: r, fallback: t = null }) {
  return r ? n : t;
}
export {
  i as Conditional
};
