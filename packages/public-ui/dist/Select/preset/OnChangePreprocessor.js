import { isInsideVariable as i } from "../VariableUtils.js";
const s = (t, a, n) => {
  const e = [...t].pop(), r = i(a, n.startIdx);
  return r.insideVariable && e ? {
    input: e.apply(a, { startIdx: r.varStart, endIdx: r.varEnd })
  } : {
    options: t,
    input: ""
  };
};
export {
  s as onChangePreprocessor
};
