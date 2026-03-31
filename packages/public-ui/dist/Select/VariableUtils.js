const f = (s, n) => {
  if (n < 0)
    return {
      insideVariable: !1
    };
  const r = s.lastIndexOf("${", n), e = s.lastIndexOf("}", n), a = s.indexOf("}", n + 1), i = s.indexOf("${", n + 1);
  return r === -1 && e === -1 && i === -1 && a === -1 ? {
    insideVariable: !1
  } : (
    // ......${| || ....${....| || ...... ${....|..... || ......${.}..${
    r >= 0 && r < n && (e === -1 || e < r) && i === -1 && a === -1 || // ........${...|}....
    r >= 0 && r < e && e === n || // ......${....|...}...
    r >= 0 && e < 0 && i < 0 && a > n || // ..${...}....${....|...}...
    r >= 0 && e >= 0 && e > r && e < n && i < 0 && a > n ? {
      insideVariable: !0,
      varStart: r,
      varEnd: a >= 0 ? a : e
    } : {
      insideVariable: !1
    }
  );
}, d = /\$\{([^}]*)\}|\$\{([^}]*)$/, g = (s, n) => {
  if (!n.insideVariable)
    return "";
  const r = n.varEnd > 0 ? s.substring(n.varStart, n.varEnd) : s.substring(n.varStart), e = d.exec(r);
  return e ? [...e].at(-1) ?? "" : "";
};
function l(s) {
  const n = s.search(/\${(.*?)}/);
  if (n === -1)
    return [s];
  const r = s.indexOf("}", n), e = [s.substring(0, n), s.substring(n, r + 1)];
  return r + 1 < s.length && e.push(...l(s.substring(r + 1))), e;
}
export {
  g as extractVarValue,
  f as isInsideVariable,
  l as splitByPossibleVariables
};
