function t(d, r) {
  return d.substring(0, r.startIdx) + this.value + (r.endIdx > 0 ? d.substring(r.endIdx + 1) : "");
}
export {
  t as sharedApply
};
