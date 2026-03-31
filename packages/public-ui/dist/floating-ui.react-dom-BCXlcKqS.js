import * as S from "react";
import { useLayoutEffect as jt, useEffect as It } from "react";
import * as Yt from "react-dom";
function at() {
  return typeof window < "u";
}
function tt(t) {
  return Mt(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function $(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function z(t) {
  var e;
  return (e = (Mt(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Mt(t) {
  return at() ? t instanceof Node || t instanceof $(t).Node : !1;
}
function H(t) {
  return at() ? t instanceof Element || t instanceof $(t).Element : !1;
}
function _(t) {
  return at() ? t instanceof HTMLElement || t instanceof $(t).HTMLElement : !1;
}
function At(t) {
  return !at() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof $(t).ShadowRoot;
}
function ot(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = N(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && !["inline", "contents"].includes(i);
}
function qt(t) {
  return ["table", "td", "th"].includes(tt(t));
}
function ut(t) {
  return [":popover-open", ":modal"].some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
function xt(t) {
  const e = yt(), n = H(t) ? N(t) : t;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((o) => (n.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (n.contain || "").includes(o));
}
function Xt(t) {
  let e = Y(t);
  for (; _(e) && !Q(e); ) {
    if (xt(e))
      return e;
    if (ut(e))
      return null;
    e = Y(e);
  }
  return null;
}
function yt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Q(t) {
  return ["html", "body", "#document"].includes(tt(t));
}
function N(t) {
  return $(t).getComputedStyle(t);
}
function dt(t) {
  return H(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Y(t) {
  if (tt(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    At(t) && t.host || // Fallback.
    z(t)
  );
  return At(e) ? e.host : e;
}
function kt(t) {
  const e = Y(t);
  return Q(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : _(e) && ot(e) ? e : kt(e);
}
function nt(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = kt(t), s = i === ((o = t.ownerDocument) == null ? void 0 : o.body), r = $(i);
  if (s) {
    const c = ht(r);
    return e.concat(r, r.visualViewport || [], ot(i) ? i : [], c && n ? nt(c) : []);
  }
  return e.concat(i, nt(i, [], n));
}
function ht(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
const Ut = ["top", "right", "bottom", "left"], q = Math.min, F = Math.max, st = Math.round, it = Math.floor, V = (t) => ({
  x: t,
  y: t
}), Kt = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Gt = {
  start: "end",
  end: "start"
};
function pt(t, e, n) {
  return F(t, q(e, n));
}
function G(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function X(t) {
  return t.split("-")[0];
}
function et(t) {
  return t.split("-")[1];
}
function Ft(t) {
  return t === "x" ? "y" : "x";
}
function bt(t) {
  return t === "y" ? "height" : "width";
}
function U(t) {
  return ["top", "bottom"].includes(X(t)) ? "y" : "x";
}
function Rt(t) {
  return Ft(U(t));
}
function Jt(t, e, n) {
  n === void 0 && (n = !1);
  const o = et(t), i = Rt(t), s = bt(i);
  let r = i === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (r = ct(r)), [r, ct(r)];
}
function Qt(t) {
  const e = ct(t);
  return [wt(t), e, wt(e)];
}
function wt(t) {
  return t.replace(/start|end/g, (e) => Gt[e]);
}
function Zt(t, e, n) {
  const o = ["left", "right"], i = ["right", "left"], s = ["top", "bottom"], r = ["bottom", "top"];
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? i : o : e ? o : i;
    case "left":
    case "right":
      return e ? s : r;
    default:
      return [];
  }
}
function te(t, e, n, o) {
  const i = et(t);
  let s = Zt(X(t), n === "start", o);
  return i && (s = s.map((r) => r + "-" + i), e && (s = s.concat(s.map(wt)))), s;
}
function ct(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Kt[e]);
}
function ee(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function $t(t) {
  return typeof t != "number" ? ee(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function lt(t) {
  const {
    x: e,
    y: n,
    width: o,
    height: i
  } = t;
  return {
    width: o,
    height: i,
    top: n,
    left: e,
    right: e + o,
    bottom: n + i,
    x: e,
    y: n
  };
}
function Ct(t, e, n) {
  let {
    reference: o,
    floating: i
  } = t;
  const s = U(e), r = Rt(e), c = bt(r), f = X(e), l = s === "y", a = o.x + o.width / 2 - i.width / 2, d = o.y + o.height / 2 - i.height / 2, m = o[c] / 2 - i[c] / 2;
  let u;
  switch (f) {
    case "top":
      u = {
        x: a,
        y: o.y - i.height
      };
      break;
    case "bottom":
      u = {
        x: a,
        y: o.y + o.height
      };
      break;
    case "right":
      u = {
        x: o.x + o.width,
        y: d
      };
      break;
    case "left":
      u = {
        x: o.x - i.width,
        y: d
      };
      break;
    default:
      u = {
        x: o.x,
        y: o.y
      };
  }
  switch (et(e)) {
    case "start":
      u[r] -= m * (n && l ? -1 : 1);
      break;
    case "end":
      u[r] += m * (n && l ? -1 : 1);
      break;
  }
  return u;
}
const ne = async (t, e, n) => {
  const {
    placement: o = "bottom",
    strategy: i = "absolute",
    middleware: s = [],
    platform: r
  } = n, c = s.filter(Boolean), f = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let l = await r.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: a,
    y: d
  } = Ct(l, o, f), m = o, u = {}, g = 0;
  for (let h = 0; h < c.length; h++) {
    const {
      name: w,
      fn: p
    } = c[h], {
      x,
      y: b,
      data: R,
      reset: y
    } = await p({
      x: a,
      y: d,
      initialPlacement: o,
      placement: m,
      strategy: i,
      middlewareData: u,
      rects: l,
      platform: r,
      elements: {
        reference: t,
        floating: e
      }
    });
    a = x ?? a, d = b ?? d, u = {
      ...u,
      [w]: {
        ...u[w],
        ...R
      }
    }, y && g <= 50 && (g++, typeof y == "object" && (y.placement && (m = y.placement), y.rects && (l = y.rects === !0 ? await r.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : y.rects), {
      x: a,
      y: d
    } = Ct(l, m, f)), h = -1);
  }
  return {
    x: a,
    y: d,
    placement: m,
    strategy: i,
    middlewareData: u
  };
};
async function Z(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: o,
    y: i,
    platform: s,
    rects: r,
    elements: c,
    strategy: f
  } = t, {
    boundary: l = "clippingAncestors",
    rootBoundary: a = "viewport",
    elementContext: d = "floating",
    altBoundary: m = !1,
    padding: u = 0
  } = G(e, t), g = $t(u), w = c[m ? d === "floating" ? "reference" : "floating" : d], p = lt(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(w))) == null || n ? w : w.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(c.floating)),
    boundary: l,
    rootBoundary: a,
    strategy: f
  })), x = d === "floating" ? {
    x: o,
    y: i,
    width: r.floating.width,
    height: r.floating.height
  } : r.reference, b = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(c.floating)), R = await (s.isElement == null ? void 0 : s.isElement(b)) ? await (s.getScale == null ? void 0 : s.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, y = lt(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: x,
    offsetParent: b,
    strategy: f
  }) : x);
  return {
    top: (p.top - y.top + g.top) / R.y,
    bottom: (y.bottom - p.bottom + g.bottom) / R.y,
    left: (p.left - y.left + g.left) / R.x,
    right: (y.right - p.right + g.right) / R.x
  };
}
const oe = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: o,
      placement: i,
      rects: s,
      platform: r,
      elements: c,
      middlewareData: f
    } = e, {
      element: l,
      padding: a = 0
    } = G(t, e) || {};
    if (l == null)
      return {};
    const d = $t(a), m = {
      x: n,
      y: o
    }, u = Rt(i), g = bt(u), h = await r.getDimensions(l), w = u === "y", p = w ? "top" : "left", x = w ? "bottom" : "right", b = w ? "clientHeight" : "clientWidth", R = s.reference[g] + s.reference[u] - m[u] - s.floating[g], y = m[u] - s.reference[u], C = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(l));
    let O = C ? C[b] : 0;
    (!O || !await (r.isElement == null ? void 0 : r.isElement(C))) && (O = c.floating[b] || s.floating[g]);
    const L = R / 2 - y / 2, W = O / 2 - h[g] / 2 - 1, D = q(d[p], W), B = q(d[x], W), T = D, P = O - h[g] - B, A = O / 2 - h[g] / 2 + L, j = pt(T, A, P), E = !f.arrow && et(i) != null && A !== j && s.reference[g] / 2 - (A < T ? D : B) - h[g] / 2 < 0, M = E ? A < T ? A - T : A - P : 0;
    return {
      [u]: m[u] + M,
      data: {
        [u]: j,
        centerOffset: A - j - M,
        ...E && {
          alignmentOffset: M
        }
      },
      reset: E
    };
  }
}), ie = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: i,
        middlewareData: s,
        rects: r,
        initialPlacement: c,
        platform: f,
        elements: l
      } = e, {
        mainAxis: a = !0,
        crossAxis: d = !0,
        fallbackPlacements: m,
        fallbackStrategy: u = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: h = !0,
        ...w
      } = G(t, e);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const p = X(i), x = U(c), b = X(c) === c, R = await (f.isRTL == null ? void 0 : f.isRTL(l.floating)), y = m || (b || !h ? [ct(c)] : Qt(c)), C = g !== "none";
      !m && C && y.push(...te(c, h, g, R));
      const O = [c, ...y], L = await Z(e, w), W = [];
      let D = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (a && W.push(L[p]), d) {
        const A = Jt(i, r, R);
        W.push(L[A[0]], L[A[1]]);
      }
      if (D = [...D, {
        placement: i,
        overflows: W
      }], !W.every((A) => A <= 0)) {
        var B, T;
        const A = (((B = s.flip) == null ? void 0 : B.index) || 0) + 1, j = O[A];
        if (j)
          return {
            data: {
              index: A,
              overflows: D
            },
            reset: {
              placement: j
            }
          };
        let E = (T = D.filter((M) => M.overflows[0] <= 0).sort((M, v) => M.overflows[1] - v.overflows[1])[0]) == null ? void 0 : T.placement;
        if (!E)
          switch (u) {
            case "bestFit": {
              var P;
              const M = (P = D.filter((v) => {
                if (C) {
                  const k = U(v.placement);
                  return k === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  k === "y";
                }
                return !0;
              }).map((v) => [v.placement, v.overflows.filter((k) => k > 0).reduce((k, I) => k + I, 0)]).sort((v, k) => v[1] - k[1])[0]) == null ? void 0 : P[0];
              M && (E = M);
              break;
            }
            case "initialPlacement":
              E = c;
              break;
          }
        if (i !== E)
          return {
            reset: {
              placement: E
            }
          };
      }
      return {};
    }
  };
};
function Et(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function St(t) {
  return Ut.some((e) => t[e] >= 0);
}
const re = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: o = "referenceHidden",
        ...i
      } = G(t, e);
      switch (o) {
        case "referenceHidden": {
          const s = await Z(e, {
            ...i,
            elementContext: "reference"
          }), r = Et(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: r,
              referenceHidden: St(r)
            }
          };
        }
        case "escaped": {
          const s = await Z(e, {
            ...i,
            altBoundary: !0
          }), r = Et(s, n.floating);
          return {
            data: {
              escapedOffsets: r,
              escaped: St(r)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function se(t, e) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = t, s = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), r = X(n), c = et(n), f = U(n) === "y", l = ["left", "top"].includes(r) ? -1 : 1, a = s && f ? -1 : 1, d = G(e, t);
  let {
    mainAxis: m,
    crossAxis: u,
    alignmentAxis: g
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return c && typeof g == "number" && (u = c === "end" ? g * -1 : g), f ? {
    x: u * a,
    y: m * l
  } : {
    x: m * l,
    y: u * a
  };
}
const ce = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, o;
      const {
        x: i,
        y: s,
        placement: r,
        middlewareData: c
      } = e, f = await se(e, t);
      return r === ((n = c.offset) == null ? void 0 : n.placement) && (o = c.arrow) != null && o.alignmentOffset ? {} : {
        x: i + f.x,
        y: s + f.y,
        data: {
          ...f,
          placement: r
        }
      };
    }
  };
}, le = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: o,
        placement: i
      } = e, {
        mainAxis: s = !0,
        crossAxis: r = !1,
        limiter: c = {
          fn: (w) => {
            let {
              x: p,
              y: x
            } = w;
            return {
              x: p,
              y: x
            };
          }
        },
        ...f
      } = G(t, e), l = {
        x: n,
        y: o
      }, a = await Z(e, f), d = U(X(i)), m = Ft(d);
      let u = l[m], g = l[d];
      if (s) {
        const w = m === "y" ? "top" : "left", p = m === "y" ? "bottom" : "right", x = u + a[w], b = u - a[p];
        u = pt(x, u, b);
      }
      if (r) {
        const w = d === "y" ? "top" : "left", p = d === "y" ? "bottom" : "right", x = g + a[w], b = g - a[p];
        g = pt(x, g, b);
      }
      const h = c.fn({
        ...e,
        [m]: u,
        [d]: g
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - o,
          enabled: {
            [m]: s,
            [d]: r
          }
        }
      };
    }
  };
}, fe = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: i,
        rects: s,
        platform: r,
        elements: c
      } = e, {
        apply: f = () => {
        },
        ...l
      } = G(t, e), a = await Z(e, l), d = X(i), m = et(i), u = U(i) === "y", {
        width: g,
        height: h
      } = s.floating;
      let w, p;
      d === "top" || d === "bottom" ? (w = d, p = m === (await (r.isRTL == null ? void 0 : r.isRTL(c.floating)) ? "start" : "end") ? "left" : "right") : (p = d, w = m === "end" ? "top" : "bottom");
      const x = h - a.top - a.bottom, b = g - a.left - a.right, R = q(h - a[w], x), y = q(g - a[p], b), C = !e.middlewareData.shift;
      let O = R, L = y;
      if ((n = e.middlewareData.shift) != null && n.enabled.x && (L = b), (o = e.middlewareData.shift) != null && o.enabled.y && (O = x), C && !m) {
        const D = F(a.left, 0), B = F(a.right, 0), T = F(a.top, 0), P = F(a.bottom, 0);
        u ? L = g - 2 * (D !== 0 || B !== 0 ? D + B : F(a.left, a.right)) : O = h - 2 * (T !== 0 || P !== 0 ? T + P : F(a.top, a.bottom));
      }
      await f({
        ...e,
        availableWidth: L,
        availableHeight: O
      });
      const W = await r.getDimensions(c.floating);
      return g !== W.width || h !== W.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Wt(t) {
  const e = N(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const i = _(t), s = i ? t.offsetWidth : n, r = i ? t.offsetHeight : o, c = st(n) !== s || st(o) !== r;
  return c && (n = s, o = r), {
    width: n,
    height: o,
    $: c
  };
}
function vt(t) {
  return H(t) ? t : t.contextElement;
}
function J(t) {
  const e = vt(t);
  if (!_(e))
    return V(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: i,
    $: s
  } = Wt(e);
  let r = (s ? st(n.width) : n.width) / o, c = (s ? st(n.height) : n.height) / i;
  return (!r || !Number.isFinite(r)) && (r = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: r,
    y: c
  };
}
const ae = /* @__PURE__ */ V(0);
function Bt(t) {
  const e = $(t);
  return !yt() || !e.visualViewport ? ae : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function ue(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== $(t) ? !1 : e;
}
function K(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), s = vt(t);
  let r = V(1);
  e && (o ? H(o) && (r = J(o)) : r = J(t));
  const c = ue(s, n, o) ? Bt(s) : V(0);
  let f = (i.left + c.x) / r.x, l = (i.top + c.y) / r.y, a = i.width / r.x, d = i.height / r.y;
  if (s) {
    const m = $(s), u = o && H(o) ? $(o) : o;
    let g = m, h = ht(g);
    for (; h && o && u !== g; ) {
      const w = J(h), p = h.getBoundingClientRect(), x = N(h), b = p.left + (h.clientLeft + parseFloat(x.paddingLeft)) * w.x, R = p.top + (h.clientTop + parseFloat(x.paddingTop)) * w.y;
      f *= w.x, l *= w.y, a *= w.x, d *= w.y, f += b, l += R, g = $(h), h = ht(g);
    }
  }
  return lt({
    width: a,
    height: d,
    x: f,
    y: l
  });
}
function Ot(t, e) {
  const n = dt(t).scrollLeft;
  return e ? e.left + n : K(z(t)).left + n;
}
function Ht(t, e, n) {
  n === void 0 && (n = !1);
  const o = t.getBoundingClientRect(), i = o.left + e.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    Ot(t, o)
  )), s = o.top + e.scrollTop;
  return {
    x: i,
    y: s
  };
}
function de(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: i
  } = t;
  const s = i === "fixed", r = z(o), c = e ? ut(e.floating) : !1;
  if (o === r || c && s)
    return n;
  let f = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = V(1);
  const a = V(0), d = _(o);
  if ((d || !d && !s) && ((tt(o) !== "body" || ot(r)) && (f = dt(o)), _(o))) {
    const u = K(o);
    l = J(o), a.x = u.x + o.clientLeft, a.y = u.y + o.clientTop;
  }
  const m = r && !d && !s ? Ht(r, f, !0) : V(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - f.scrollLeft * l.x + a.x + m.x,
    y: n.y * l.y - f.scrollTop * l.y + a.y + m.y
  };
}
function me(t) {
  return Array.from(t.getClientRects());
}
function ge(t) {
  const e = z(t), n = dt(t), o = t.ownerDocument.body, i = F(e.scrollWidth, e.clientWidth, o.scrollWidth, o.clientWidth), s = F(e.scrollHeight, e.clientHeight, o.scrollHeight, o.clientHeight);
  let r = -n.scrollLeft + Ot(t);
  const c = -n.scrollTop;
  return N(o).direction === "rtl" && (r += F(e.clientWidth, o.clientWidth) - i), {
    width: i,
    height: s,
    x: r,
    y: c
  };
}
function he(t, e) {
  const n = $(t), o = z(t), i = n.visualViewport;
  let s = o.clientWidth, r = o.clientHeight, c = 0, f = 0;
  if (i) {
    s = i.width, r = i.height;
    const l = yt();
    (!l || l && e === "fixed") && (c = i.offsetLeft, f = i.offsetTop);
  }
  return {
    width: s,
    height: r,
    x: c,
    y: f
  };
}
function pe(t, e) {
  const n = K(t, !0, e === "fixed"), o = n.top + t.clientTop, i = n.left + t.clientLeft, s = _(t) ? J(t) : V(1), r = t.clientWidth * s.x, c = t.clientHeight * s.y, f = i * s.x, l = o * s.y;
  return {
    width: r,
    height: c,
    x: f,
    y: l
  };
}
function Dt(t, e, n) {
  let o;
  if (e === "viewport")
    o = he(t, n);
  else if (e === "document")
    o = ge(z(t));
  else if (H(e))
    o = pe(e, n);
  else {
    const i = Bt(t);
    o = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return lt(o);
}
function Nt(t, e) {
  const n = Y(t);
  return n === e || !H(n) || Q(n) ? !1 : N(n).position === "fixed" || Nt(n, e);
}
function we(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = nt(t, [], !1).filter((c) => H(c) && tt(c) !== "body"), i = null;
  const s = N(t).position === "fixed";
  let r = s ? Y(t) : t;
  for (; H(r) && !Q(r); ) {
    const c = N(r), f = xt(r);
    !f && c.position === "fixed" && (i = null), (s ? !f && !i : !f && c.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || ot(r) && !f && Nt(t, r)) ? o = o.filter((a) => a !== r) : i = c, r = Y(r);
  }
  return e.set(t, o), o;
}
function xe(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: i
  } = t;
  const r = [...n === "clippingAncestors" ? ut(e) ? [] : we(e, this._c) : [].concat(n), o], c = r[0], f = r.reduce((l, a) => {
    const d = Dt(e, a, i);
    return l.top = F(d.top, l.top), l.right = q(d.right, l.right), l.bottom = q(d.bottom, l.bottom), l.left = F(d.left, l.left), l;
  }, Dt(e, c, i));
  return {
    width: f.right - f.left,
    height: f.bottom - f.top,
    x: f.left,
    y: f.top
  };
}
function ye(t) {
  const {
    width: e,
    height: n
  } = Wt(t);
  return {
    width: e,
    height: n
  };
}
function be(t, e, n) {
  const o = _(e), i = z(e), s = n === "fixed", r = K(t, !0, s, e);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const f = V(0);
  if (o || !o && !s)
    if ((tt(e) !== "body" || ot(i)) && (c = dt(e)), o) {
      const m = K(e, !0, s, e);
      f.x = m.x + e.clientLeft, f.y = m.y + e.clientTop;
    } else i && (f.x = Ot(i));
  const l = i && !o && !s ? Ht(i, c) : V(0), a = r.left + c.scrollLeft - f.x - l.x, d = r.top + c.scrollTop - f.y - l.y;
  return {
    x: a,
    y: d,
    width: r.width,
    height: r.height
  };
}
function mt(t) {
  return N(t).position === "static";
}
function Lt(t, e) {
  if (!_(t) || N(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return z(t) === n && (n = n.ownerDocument.body), n;
}
function Vt(t, e) {
  const n = $(t);
  if (ut(t))
    return n;
  if (!_(t)) {
    let i = Y(t);
    for (; i && !Q(i); ) {
      if (H(i) && !mt(i))
        return i;
      i = Y(i);
    }
    return n;
  }
  let o = Lt(t, e);
  for (; o && qt(o) && mt(o); )
    o = Lt(o, e);
  return o && Q(o) && mt(o) && !xt(o) ? n : o || Xt(t) || n;
}
const Re = async function(t) {
  const e = this.getOffsetParent || Vt, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: be(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function ve(t) {
  return N(t).direction === "rtl";
}
const Oe = {
  convertOffsetParentRelativeRectToViewportRelativeRect: de,
  getDocumentElement: z,
  getClippingRect: xe,
  getOffsetParent: Vt,
  getElementRects: Re,
  getClientRects: me,
  getDimensions: ye,
  getScale: J,
  isElement: H,
  isRTL: ve
};
function _t(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Ae(t, e) {
  let n = null, o;
  const i = z(t);
  function s() {
    var c;
    clearTimeout(o), (c = n) == null || c.disconnect(), n = null;
  }
  function r(c, f) {
    c === void 0 && (c = !1), f === void 0 && (f = 1), s();
    const l = t.getBoundingClientRect(), {
      left: a,
      top: d,
      width: m,
      height: u
    } = l;
    if (c || e(), !m || !u)
      return;
    const g = it(d), h = it(i.clientWidth - (a + m)), w = it(i.clientHeight - (d + u)), p = it(a), b = {
      rootMargin: -g + "px " + -h + "px " + -w + "px " + -p + "px",
      threshold: F(0, q(1, f)) || 1
    };
    let R = !0;
    function y(C) {
      const O = C[0].intersectionRatio;
      if (O !== f) {
        if (!R)
          return r();
        O ? r(!1, O) : o = setTimeout(() => {
          r(!1, 1e-7);
        }, 1e3);
      }
      O === 1 && !_t(l, t.getBoundingClientRect()) && r(), R = !1;
    }
    try {
      n = new IntersectionObserver(y, {
        ...b,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(y, b);
    }
    n.observe(t);
  }
  return r(!0), s;
}
function ke(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: s = !0,
    elementResize: r = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: f = !1
  } = o, l = vt(t), a = i || s ? [...l ? nt(l) : [], ...nt(e)] : [];
  a.forEach((p) => {
    i && p.addEventListener("scroll", n, {
      passive: !0
    }), s && p.addEventListener("resize", n);
  });
  const d = l && c ? Ae(l, n) : null;
  let m = -1, u = null;
  r && (u = new ResizeObserver((p) => {
    let [x] = p;
    x && x.target === l && u && (u.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var b;
      (b = u) == null || b.observe(e);
    })), n();
  }), l && !f && u.observe(l), u.observe(e));
  let g, h = f ? K(t) : null;
  f && w();
  function w() {
    const p = K(t);
    h && !_t(h, p) && n(), h = p, g = requestAnimationFrame(w);
  }
  return n(), () => {
    var p;
    a.forEach((x) => {
      i && x.removeEventListener("scroll", n), s && x.removeEventListener("resize", n);
    }), d == null || d(), (p = u) == null || p.disconnect(), u = null, f && cancelAnimationFrame(g);
  };
}
const Fe = Z, Ce = ce, Ee = le, Se = ie, De = fe, Le = re, Pt = oe, Pe = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = {
    platform: Oe,
    ...n
  }, s = {
    ...i.platform,
    _c: o
  };
  return ne(t, e, {
    ...i,
    platform: s
  });
};
var rt = typeof document < "u" ? jt : It;
function ft(t, e) {
  if (t === e)
    return !0;
  if (typeof t != typeof e)
    return !1;
  if (typeof t == "function" && t.toString() === e.toString())
    return !0;
  let n, o, i;
  if (t && e && typeof t == "object") {
    if (Array.isArray(t)) {
      if (n = t.length, n !== e.length) return !1;
      for (o = n; o-- !== 0; )
        if (!ft(t[o], e[o]))
          return !1;
      return !0;
    }
    if (i = Object.keys(t), n = i.length, n !== Object.keys(e).length)
      return !1;
    for (o = n; o-- !== 0; )
      if (!{}.hasOwnProperty.call(e, i[o]))
        return !1;
    for (o = n; o-- !== 0; ) {
      const s = i[o];
      if (!(s === "_owner" && t.$$typeof) && !ft(t[s], e[s]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}
function zt(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Tt(t, e) {
  const n = zt(t);
  return Math.round(e * n) / n;
}
function gt(t) {
  const e = S.useRef(t);
  return rt(() => {
    e.current = t;
  }), e;
}
function $e(t) {
  t === void 0 && (t = {});
  const {
    placement: e = "bottom",
    strategy: n = "absolute",
    middleware: o = [],
    platform: i,
    elements: {
      reference: s,
      floating: r
    } = {},
    transform: c = !0,
    whileElementsMounted: f,
    open: l
  } = t, [a, d] = S.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: e,
    middlewareData: {},
    isPositioned: !1
  }), [m, u] = S.useState(o);
  ft(m, o) || u(o);
  const [g, h] = S.useState(null), [w, p] = S.useState(null), x = S.useCallback((v) => {
    v !== C.current && (C.current = v, h(v));
  }, []), b = S.useCallback((v) => {
    v !== O.current && (O.current = v, p(v));
  }, []), R = s || g, y = r || w, C = S.useRef(null), O = S.useRef(null), L = S.useRef(a), W = f != null, D = gt(f), B = gt(i), T = gt(l), P = S.useCallback(() => {
    if (!C.current || !O.current)
      return;
    const v = {
      placement: e,
      strategy: n,
      middleware: m
    };
    B.current && (v.platform = B.current), Pe(C.current, O.current, v).then((k) => {
      const I = {
        ...k,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: T.current !== !1
      };
      A.current && !ft(L.current, I) && (L.current = I, Yt.flushSync(() => {
        d(I);
      }));
    });
  }, [m, e, n, B, T]);
  rt(() => {
    l === !1 && L.current.isPositioned && (L.current.isPositioned = !1, d((v) => ({
      ...v,
      isPositioned: !1
    })));
  }, [l]);
  const A = S.useRef(!1);
  rt(() => (A.current = !0, () => {
    A.current = !1;
  }), []), rt(() => {
    if (R && (C.current = R), y && (O.current = y), R && y) {
      if (D.current)
        return D.current(R, y, P);
      P();
    }
  }, [R, y, P, D, W]);
  const j = S.useMemo(() => ({
    reference: C,
    floating: O,
    setReference: x,
    setFloating: b
  }), [x, b]), E = S.useMemo(() => ({
    reference: R,
    floating: y
  }), [R, y]), M = S.useMemo(() => {
    const v = {
      position: n,
      left: 0,
      top: 0
    };
    if (!E.floating)
      return v;
    const k = Tt(E.floating, a.x), I = Tt(E.floating, a.y);
    return c ? {
      ...v,
      transform: "translate(" + k + "px, " + I + "px)",
      ...zt(E.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: k,
      top: I
    };
  }, [n, c, E.floating, a.x, a.y]);
  return S.useMemo(() => ({
    ...a,
    update: P,
    refs: j,
    elements: E,
    floatingStyles: M
  }), [a, P, j, E, M]);
}
const Te = (t) => {
  function e(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: t,
    fn(n) {
      const {
        element: o,
        padding: i
      } = typeof t == "function" ? t(n) : t;
      return o && e(o) ? o.current != null ? Pt({
        element: o.current,
        padding: i
      }).fn(n) : {} : o ? Pt({
        element: o,
        padding: i
      }).fn(n) : {};
    }
  };
}, We = (t, e) => ({
  ...Ce(t),
  options: [t, e]
}), Be = (t, e) => ({
  ...Ee(t),
  options: [t, e]
}), He = (t, e) => ({
  ...Se(t),
  options: [t, e]
}), Ne = (t, e) => ({
  ...De(t),
  options: [t, e]
}), Ve = (t, e) => ({
  ...Le(t),
  options: [t, e]
}), _e = (t, e) => ({
  ...Te(t),
  options: [t, e]
});
export {
  _e as a,
  ke as b,
  q as c,
  Fe as d,
  G as e,
  He as f,
  Ne as g,
  Ve as h,
  H as i,
  F as m,
  We as o,
  st as r,
  Be as s,
  $e as u
};
