import { jsx as s1 } from "react/jsx-runtime";
import { i as c, I as l, P as i, d as Y, F as a4, u as I, c as b, _ as U, b as z1, a as l4, W as c4, T as o1, f as i4, C as Zo } from "../../useNoInteractiveChildren-BuG1gwU7.js";
import * as D from "react";
import e, { useState as J, useEffect as Q, useLayoutEffect as u1, useCallback as H1, useRef as K, useContext as Z1, createContext as Ro, useMemo as s4, isValidElement as h4, cloneElement as R1, forwardRef as l1 } from "react";
import { u as p4, i as w1, o as f4, f as d4, a as w4, h as u4, b as m4 } from "../../floating-ui.react-dom-BCXlcKqS.js";
import "react-dom";
import "../../lodash-CYNxjS-I.js";
import "../components/FUIContext.js";
import { sharedApply as V1 } from "../preset/onApply.js";
var G1, K1, Q1, q1, X1, Y1, J1, e0, t0, r0, n0, o0, a0, l0, c0, i0, s0, h0, p0, f0, d0, w0, u0, m0, v0, g0, E0, V0, H0, M0, A0, _0, x0, N0, C0, y0, T0, b0, L0, z0, Z0, R0, $0, D0, B0, O0, I0, S0, W0, U0, k0, F0, P0, j0, G0, K0, Q0, q0, X0, Y0, J0, e2, t2, r2, n2, o2, a2, l2, c2, i2, s2, h2, p2, f2, d2, w2, u2, m2, v2, g2, E2, V2, H2, M2, A2, _2, x2, N2, C2, y2, T2, b2, L2, z2, Z2, R2, $2, D2, B2, O2, I2, S2, W2, U2, k2, F2, P2, j2, G2, K2, Q2, q2, X2, Y2, J2, ee, te, re, ne, oe, ae, le, ce, ie, se, he, pe, fe, de, we, ue, me, ve, ge, Ee, Ve, He, Me, Ae, _e, xe, Ne, Ce, ye, Te, be, Le, ze, Ze, Re, $e, De, Be, Oe, Ie, Se, We, Ue, ke, Fe, Pe, je, Ge, Ke, Qe, qe, Xe, Ye, Je, et, tt, rt, nt, ot, at, lt, ct, it, st, ht, pt, ft, dt, wt, ut, mt, vt, gt, Et, Vt, Ht, Mt, At, _t, xt, Nt, Ct, yt, Tt, bt, Lt, zt, Zt, Rt, $t, Dt, Bt, Ot;
const Z = {}, v4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, G1 || (G1 = /* @__PURE__ */ e.createElement("path", {
    d: "M13 4L4 4 4 13.01 6 13.01 6 6 13 6 13 4zM29.49 13.12l-9-5a1 1 0 00-1 0l-9 5A1 1 0 0010 14V24a1 1 0 00.52.87l9 5A1 1 0 0020 30a1.05 1.05 0 00.49-.13l9-5A1 1 0 0030 24V14A1 1 0 0029.49 13.12zM19 27.3l-7-3.89V15.69l7 3.89zm1-9.45L13.06 14 20 10.14 26.94 14zm8 5.56L21 27.3V19.58l7-3.89z"
  })), r);
});
process.env.NODE_ENV !== "production" && (v4.propTypes = c);
const g4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, K1 || (K1 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"
  })), Q1 || (Q1 = /* @__PURE__ */ e.createElement("path", {
    d: "M15 7H17V14H15zM7 15H14V17H7zM15 18H17V25H15zM18 15H25V17H18z"
  })), r);
});
process.env.NODE_ENV !== "production" && (g4.propTypes = c);
const E4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, q1 || (q1 = /* @__PURE__ */ e.createElement("path", {
    d: "M9.5,8H20.1a5,5,0,1,0,0-2H9.5a5.5,5.5,0,0,0,0,11h11a3.5,3.5,0,0,1,0,7H11.9a5,5,0,1,0,0,2h8.6a5.5,5.5,0,0,0,0-11H9.5a3.5,3.5,0,0,1,0-7ZM25,4a3,3,0,1,1-3,3A3,3,0,0,1,25,4ZM7,28a3,3,0,1,1,3-3A3,3,0,0,1,7,28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (E4.propTypes = c);
const V4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, X1 || (X1 = /* @__PURE__ */ e.createElement("path", {
    d: "M17,11a3,3,0,0,1,3-3h.1a5,5,0,1,0,0-2H20a5,5,0,0,0-5,5v1H13a3,3,0,0,1-3-3V7A5,5,0,0,0,5,2H4V4H5A3,3,0,0,1,8,7V9a5,5,0,0,0,5,5h2v7a3,3,0,0,1-3,3h-.1a5,5,0,1,0,0,2H12a5,5,0,0,0,5-5h2.5A2.5,2.5,0,0,1,22,23.5,4.51,4.51,0,0,0,26.5,28H28V26H26.5A2.5,2.5,0,0,1,24,23.5,4.51,4.51,0,0,0,19.5,19H17Zm8-7a3,3,0,1,1-3,3A3,3,0,0,1,25,4ZM7,28a3,3,0,1,1,3-3A3,3,0,0,1,7,28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (V4.propTypes = c);
const H4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Y1 || (Y1 = /* @__PURE__ */ e.createElement("path", {
    d: "M15 21a3 3 0 01-3 3h-.1a5 5 0 100 2H12a5 5 0 005-5zM7 28a3 3 0 113-3A3 3 0 017 28zM15 13H17V19H15zM25 2a5 5 0 00-4.9 4H20a5 5 0 00-5 5h2a3 3 0 013-3h.1A5 5 0 1025 2zm0 8a3 3 0 113-3A3 3 0 0125 10z"
  })), r);
});
process.env.NODE_ENV !== "production" && (H4.propTypes = c);
const M4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, J1 || (J1 = /* @__PURE__ */ e.createElement("path", {
    d: "M15 14H10a2 2 0 01-2-2V4a2 2 0 01.59-1.42A3.57 3.57 0 0110 2h5V4H10v8h5zM4 6H6V14H4zM4 2H6V4H4zM27.45 19.11l-6-3a1 1 0 00-.9 0l-6 3A1 1 0 0014 20v7a1 1 0 00.55.89l6 3a1 1 0 00.9 0l6-3A1 1 0 0028 27V20A1 1 0 0027.45 19.11zm-6.45-1L24.76 20 21 21.88 17.24 20zm-5 3.5l4 2v4.76l-4-2zm6 6.76V23.62l4-2v4.76zM23 2H19a2 2 0 00-2 2V14h2V10h4v4h2V4A2 2 0 0023 2zM19 8V4h4V8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (M4.propTypes = c);
const A4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, e0 || (e0 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 2L2 2 2 11 4 11 4 4 11 4 11 2zM2 21L2 30 11 30 11 28 4 28 4 21 2 21zM30 11L30 2 21 2 21 4 28 4 28 11 30 11zM21 30L30 30 30 21 28 21 28 28 21 28 21 30zM25.49 10.13l-9-5a1 1 0 00-1 0l-9 5A1 1 0 006 11V21a1 1 0 00.51.87l9 5a1 1 0 001 0l9-5A1 1 0 0026 21V11A1 1 0 0025.49 10.13zM16 7.14L22.94 11 16 14.86 9.06 11zM8 12.7l7 3.89V24.3L8 20.41zm9 11.6V16.59l7-3.89v7.71z"
  })), r);
});
process.env.NODE_ENV !== "production" && (A4.propTypes = c);
const _4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, t0 || (t0 = /* @__PURE__ */ e.createElement("path", {
    d: "M29.9761,15.7832l-2-9a.9992.9992,0,0,0-.4214-.6152l-6-4A1.0008,1.0008,0,0,0,21,2H11a1.0008,1.0008,0,0,0-.5547.168l-6,4a.9992.9992,0,0,0-.4214.6152l-2,9a1.0019,1.0019,0,0,0,.0181.5039l3,10a1,1,0,0,0,.6709.6709l10,3,.0051.0005a.9789.9789,0,0,0,.564,0l.0051-.0005,10-3a1,1,0,0,0,.6709-.6709l3-10A1.0019,1.0019,0,0,0,29.9761,15.7832Zm-19.05.833L7.0168,8.7974l7.2815,2.6479ZM16,12.4971,19.5889,18H12.4111ZM19.3818,20,16,26.7637,12.6182,20Zm-1.68-8.5547,7.2815-2.6479-3.91,7.8188ZM18.19,9.14l3.0961-4.747,3.5152,2.3432ZM16,8.8364,12.8459,4h6.3082Zm-2.19.3032L7.1992,6.7358l3.5152-2.3432Zm-4.8439,8.03-4.802-1.8007L5.3652,9.9668ZM14.07,27.377,7.5679,25.4263l3.1284-4.7969Zm7.2334-6.7476,3.1284,4.7969L17.93,27.377ZM26.6348,9.9668l1.2006,5.4019-4.802,1.8007ZM4.5374,17.6445l4.5944,1.7227L6.3391,23.65ZM25.6609,23.65l-2.7927-4.2827,4.5944-1.7227Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (_4.propTypes = c);
const x4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, r0 || (r0 = /* @__PURE__ */ e.createElement("path", {
    d: "M21.49 13.1151l-9-5a1 1 0 00-1 0l-9 5A1.0078 1.0078 0 002 14v9.9951a1 1 0 00.52.87l9 5A1.0045 1.0045 0 0012 30a1.0559 1.0559 0 00.49-.1349l9-5A.9923.9923 0 0022 24V14A1.0079 1.0079 0 0021.49 13.1151zM11 27.2951l-7-3.89v-7.72l7 3.89zm1-9.45L5.06 14 12 10.1351l6.94 3.86zm8 5.56l-7 3.89v-7.72l7-3.89zM30 6L26 6 26 2 24 2 24 6 20 6 20 8 24 8 24 12 26 12 26 8 30 8 30 6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (x4.propTypes = c);
const N4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, n0 || (n0 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,22a3.86,3.86,0,0,0-2,.57l-3.09-3.1a6,6,0,0,0,0-6.94L24,9.43A3.86,3.86,0,0,0,26,10a4,4,0,1,0-4-4,3.86,3.86,0,0,0,.57,2l-3.1,3.09a6,6,0,0,0-6.94,0L9.43,8A3.86,3.86,0,0,0,10,6a4,4,0,1,0-4,4,3.86,3.86,0,0,0,2-.57l3.09,3.1a6,6,0,0,0,0,6.94L8,22.57A3.86,3.86,0,0,0,6,22a4,4,0,1,0,4,4,3.86,3.86,0,0,0-.57-2l3.1-3.09a6,6,0,0,0,6.94,0L22.57,24A3.86,3.86,0,0,0,22,26a4,4,0,1,0,4-4ZM16,20a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (N4.propTypes = c);
const C4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, o0 || (o0 = /* @__PURE__ */ e.createElement("path", {
    d: "M12 11.03L12 15.03 10 15.03 10 11.03 8 11.03 8 17.03 12 17.03 12 21.03 14 21.03 14 11.03 12 11.03zM24.19 11.03L22 11.03 19 15.42 19 11.03 17 11.03 17 21.03 19 21.03 19 18.3 19.91 16.97 22 21.03 24.19 21.03 21.2 15.41 24.19 11.03z"
  })), a0 || (a0 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,26H4a2,2,0,0,1-2-2V8A2,2,0,0,1,4,6H28a2,2,0,0,1,2,2V24A2,2,0,0,1,28,26ZM4,8V24H28V8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (C4.propTypes = c);
const y4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, l0 || (l0 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6ZM14,21H12V17H8V11h2v4h2V11h2Zm10.19,0H22l-2.09-4.06L19,18.27V21H17V11h2v4.39L22,11h2.19l-3,4.38Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (y4.propTypes = c);
const T4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, c0 || (c0 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m23.0022,11.0323l-15.0022-.0323,6.9985,5-6.9956,5h14.9971c.5523,0,1-.4477,1-1v-7.9677c0-.5514-.4464-.9988-.9978-1Z"
  })), i0 || (i0 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m21,30h-10c-4.9626,0-9-4.0374-9-9v-10C2,6.0374,6.0374,2,11,2h10c4.9626,0,9,4.0374,9,9v10c0,4.9626-4.0374,9-9,9ZM11,4c-3.8599,0-7,3.1401-7,7v10c0,3.8599,3.1401,7,7,7h10c3.8599,0,7-3.1401,7-7v-10c0-3.8599-3.1401-7-7-7h-10Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (T4.propTypes = c);
const b4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, s0 || (s0 = /* @__PURE__ */ e.createElement("path", {
    d: "M29.55 26.11L26.5 27.63 23.66 21H15a2 2 0 01-2-2V13a2 2 0 014 0v4h7V15H19V13a4 4 0 00-8 0v1a9 9 0 108.77 11H17.71A7 7 0 1111 16v3a4 4 0 004 4h7.34l3.16 7.37 4.95-2.48zM15.5 8A3.5 3.5 0 1119 4.5 3.5 3.5 0 0115.5 8zm0-5A1.5 1.5 0 1017 4.5 1.5 1.5 0 0015.5 3z"
  })), r);
});
process.env.NODE_ENV !== "production" && (b4.propTypes = c);
const L4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, h0 || (h0 = /* @__PURE__ */ e.createElement("path", {
    d: "M23 14L23 12 9 12 9 14 14 14 14 16.734 10.132 23.504 11.868 24.496 15.58 18 16.42 18 20.132 24.496 21.868 23.504 18 16.734 18 14 23 14z"
  })), p0 || (p0 = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "9",
    r: "2"
  })), f0 || (f0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (L4.propTypes = c);
const z4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, d0 || (d0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,20a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,16,20Zm0-6a2,2,0,1,0,2,2A2.0021,2.0021,0,0,0,16,14Z"
  })), w0 || (w0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,24a10.6547,10.6547,0,0,1-9.97-7.7576L5.9692,16l.0606-.2424A10.6547,10.6547,0,0,1,16,8a10.6547,10.6547,0,0,1,9.97,7.7576L26.0308,16l-.0606.2424A10.6547,10.6547,0,0,1,16,24ZM8.0352,16A8.5975,8.5975,0,0,0,16,22a8.5975,8.5975,0,0,0,7.9648-6A8.5975,8.5975,0,0,0,16,10,8.5975,8.5975,0,0,0,8.0352,16Z"
  })), u0 || (u0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (z4.propTypes = c);
const Z4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, m0 || (m0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,10a8.5975,8.5975,0,0,0-7.9648,6A8.5975,8.5975,0,0,0,16,22a8.5975,8.5975,0,0,0,7.9648-6A8.5975,8.5975,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,16,20Z"
  })), v0 || (v0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,22a10.6543,10.6543,0,0,1-9.97-7.7578L5.9692,16l.0606-.2422A10.6543,10.6543,0,0,1,16,8a10.6543,10.6543,0,0,1,9.97,7.7578L26.0308,16l-.0606.2422A10.6543,10.6543,0,0,1,16,24Z"
  })), g0 || (g0 = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "2"
  })), E0 || (E0 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M16,20a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,16,20Zm0-6a2,2,0,1,0,2,2A2.0021,2.0021,0,0,0,16,14Z"
  })), V0 || (V0 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M16,24a10.6547,10.6547,0,0,1-9.97-7.7576L5.9692,16l.0606-.2424A10.6547,10.6547,0,0,1,16,8a10.6547,10.6547,0,0,1,9.97,7.7576L26.0308,16l-.0606.2424A10.6547,10.6547,0,0,1,16,24ZM8.0352,16A8.5975,8.5975,0,0,0,16,22a8.5975,8.5975,0,0,0,7.9648-6A8.5975,8.5975,0,0,0,16,10,8.5975,8.5975,0,0,0,8.0352,16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Z4.propTypes = c);
const R4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, H0 || (H0 = /* @__PURE__ */ e.createElement("path", {
    d: "M8,14H19v2H8Zm0,5H21v2H8Z"
  })), M0 || (M0 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,4H4A2,2,0,0,0,2,6V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V6A2,2,0,0,0,28,4Zm0,2V8H4V6ZM4,26V10H28V26Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (R4.propTypes = c);
const $4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, A0 || (A0 = /* @__PURE__ */ e.createElement("path", {
    d: "M22 8L22 16 23 18 24 16 24 8 22 8zM18 8L18 18 19 20 20 18 20 8 18 8z"
  })), _0 || (_0 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,4a2.0023,2.0023,0,0,0-2,2V26H6V22h4V20H6V16h4V14H6V10h8v4l1,2,1-2V8H6V6A2.0023,2.0023,0,0,0,4,4H2V6H4V26a2.0023,2.0023,0,0,0,2,2H26a2.0023,2.0023,0,0,0,2-2V6h2V4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && ($4.propTypes = c);
const D4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, x0 || (x0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 16H18V18H16zM18 18H20V20H18zM20 20H22V22H20zM20 16H22V18H20zM16 20H18V22H16zM20 12a3.8978 3.8978 0 01-4-3.777 3.9017 3.9017 0 01.6533-2.0639L19.17 2.4141a1.0381 1.0381 0 011.6592 0L23.3154 6.11A3.9693 3.9693 0 0124 8.223 3.8978 3.8978 0 0120 12zm0-7.2368L18.3438 7.2257A1.89 1.89 0 0018 8.223 1.9 1.9 0 0020 10a1.9 1.9 0 002-1.777 1.98 1.98 0 00-.375-1.0466z"
  })), N0 || (N0 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,4a2.0023,2.0023,0,0,0-2,2V26H6V10H8v8l1,2,1-2V10h2v4l1,2,1-2V8H6V6A2.0023,2.0023,0,0,0,4,4H2V6H4V26a2.0023,2.0023,0,0,0,2,2H26a2.0023,2.0023,0,0,0,2-2V6h2V4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (D4.propTypes = c);
const B4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, C0 || (C0 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,4a2.0023,2.0023,0,0,0-2,2V8H24a3.4376,3.4376,0,0,1-3.0513-2.3164A1.007,1.007,0,0,0,20,5a.9894.9894,0,0,0-.9468.6787A3.44,3.44,0,0,1,16,8a3.4376,3.4376,0,0,1-3.0513-2.3164A1.007,1.007,0,0,0,12,5a.971.971,0,0,0-.9468.6787A3.44,3.44,0,0,1,8,8H6V6A2.0023,2.0023,0,0,0,4,4H2V6H4V26a2.0023,2.0023,0,0,0,2,2H26a2.0023,2.0023,0,0,0,2-2V6h2V4ZM6,26V22h4V20H6V16h4V14H6V10H8a4.9316,4.9316,0,0,0,4-1.9873,5.0192,5.0192,0,0,0,8,0A4.9316,4.9316,0,0,0,24,10h2V26Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (B4.propTypes = c);
const O4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, y0 || (y0 = /* @__PURE__ */ e.createElement("path", {
    d: "M12 2H14V4H12zM14 4H16V6H14zM16 6H18V8H16zM16 2H18V4H16zM12 6H14V8H12zM14 18H16V20H14zM16 20H18V22H16zM18 22H20V24H18zM18 18H20V20H18zM14 22H16V24H14zM18 10H20V12H18zM20 12H22V14H20zM22 14H24V16H22zM22 10H24V12H22zM18 14H20V16H18z"
  })), T0 || (T0 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,4a2.0023,2.0023,0,0,0-2,2V26H6V22h4V20H6V16h4V14H6V10h4V8H6V6A2.0023,2.0023,0,0,0,4,4H2V6H4V26a2.0023,2.0023,0,0,0,2,2H26a2.0023,2.0023,0,0,0,2-2V6h2V4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (O4.propTypes = c);
const I4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, b0 || (b0 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M17.98 17.4922c0-2.8734 1.4971-4.68 4.1466-4.68 1.8067 0 2.9939.8603 3.5272 2.2712l-1.8067.8087c-.2065-.7571-.7743-1.3076-1.7206-1.3076-1.2215 0-1.841.8602-1.841 2.1162v1.6345c0 1.2561.6194 2.0992 1.841 2.0992 1.0496 0 1.5657-.6023 1.8927-1.411l1.686.8087c-.5849 1.5829-1.841 2.3744-3.5788 2.3744-2.6496 0-4.1466-1.8238-4.1466-4.7144zM14.623 22.0001l-.9635-3.0626h-4.267l-.9465 3.0626h-2.3055l4.026-12.0096h2.8217l3.9917 12.0096h-2.357zm-3.0627-9.9449h-.0861l-1.5311 4.9381h3.1659l-1.5486-4.9381z"
  })), L0 || (L0 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m28,30H4c-1.1046,0-2-.8954-2-2V4c0-1.1046.8954-2,2-2h24c1.1046,0,2,.8954,2,2v24c0,1.1046-.8954,2-2,2Zm-24-2h24V4H4v24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (I4.propTypes = c);
const S4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, z0 || (z0 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M17.98 17.4921c0-2.8734 1.4971-4.68 4.1466-4.68 1.8067 0 2.9939.8603 3.5272 2.2712l-1.8067.8087c-.2065-.7571-.7743-1.3076-1.7206-1.3076-1.2215 0-1.841.8602-1.841 2.1162v1.6345c0 1.2561.6194 2.0992 1.841 2.0992 1.0496 0 1.5657-.6023 1.8927-1.411l1.686.8087c-.5849 1.5829-1.841 2.3744-3.5788 2.3744-2.6496 0-4.1466-1.8238-4.1466-4.7144zM14.623 22l-.9635-3.0626h-4.267l-.9465 3.0626h-2.3055l4.026-12.0096h2.8217l3.9917 12.0096h-2.357zm-3.0627-9.9449h-.0861l-1.5311 4.9381h3.1659l-1.5486-4.9381z"
  })), Z0 || (Z0 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m21,30h-10c-4.9626,0-9-4.0374-9-9v-10C2,6.0374,6.0374,2,11,2h10c4.9626,0,9,4.0374,9,9v10c0,4.9626-4.0374,9-9,9ZM11,4c-3.8599,0-7,3.1401-7,7v10c0,3.8599,3.1401,7,7,7h10c3.8599,0,7-3.1401,7-7v-10c0-3.8599-3.1401-7-7-7h-10Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (S4.propTypes = c);
const W4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, R0 || (R0 = /* @__PURE__ */ e.createElement("path", {
    d: "M12,29a1,1,0,0,1-.92-.62L6.33,17H2V15H7a1,1,0,0,1,.92.62L12,25.28,20.06,3.65A1,1,0,0,1,21,3a1,1,0,0,1,.93.68L25.72,15H30v2H25a1,1,0,0,1-.95-.68L21,7,12.94,28.35A1,1,0,0,1,12,29Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (W4.propTypes = c);
const U4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, $0 || ($0 = /* @__PURE__ */ e.createElement("path", {
    d: "M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"
  })), r);
});
process.env.NODE_ENV !== "production" && (U4.propTypes = c);
const k4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, D0 || (D0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,4c6.6,0,12,5.4,12,12s-5.4,12-12,12S4,22.6,4,16S9.4,4,16,4 M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14 S23.7,2,16,2z"
  })), B0 || (B0 = /* @__PURE__ */ e.createElement("path", {
    d: "M24 15L17 15 17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17z"
  })), r);
});
process.env.NODE_ENV !== "production" && (k4.propTypes = c);
const F4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, O0 || (O0 = /* @__PURE__ */ e.createElement("path", {
    d: "M10,20v-8.1c2.28-.46,4-2.48,4-4.9,0-2.76-2.24-5-5-5s-5,2.24-5,5c0,2.41,1.72,4.43,4,4.9v8.1c0,3.31,2.69,6,6,6h1v-2h-1c-2.21,0-4-1.79-4-4ZM6,7c0-1.65,1.35-3,3-3s3,1.35,3,3-1.35,3-3,3-3-1.35-3-3ZM28,24v2h-4v4h-2v-4h-4v-2h4v-4h2v4h4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (F4.propTypes = c);
const P4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, I0 || (I0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2A14.1725,14.1725,0,0,0,2,16,14.1725,14.1725,0,0,0,16,30,14.1725,14.1725,0,0,0,30,16,14.1725,14.1725,0,0,0,16,2Zm8,15H17v7H15V17H8V15h7V8h2v7h7Z"
  })), S0 || (S0 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M24 17L17 17 17 24 15 24 15 17 8 17 8 15 15 15 15 8 17 8 17 15 24 15 24 17z",
    "data-icon-path": "inner-path"
  })), r);
});
process.env.NODE_ENV !== "production" && (P4.propTypes = c);
const j4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, W0 || (W0 = /* @__PURE__ */ e.createElement("path", {
    d: "M17 15L17 5 15 5 15 15 5 15 5 17 15 17 15 27 17 27 17 17 27 17 27 15 17 15z"
  })), r);
});
process.env.NODE_ENV !== "production" && (j4.propTypes = c);
const G4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, U0 || (U0 = /* @__PURE__ */ e.createElement("path", {
    d: "M8,8h-4v-2h4V2h2v4h4v2h-4v4h-2v-4ZM28,25c0,2.76-2.24,5-5,5-2.42,0-4.44-1.72-4.9-4h-4.1c-3.31,0-6-2.69-6-6v-5h2v5c0,2.21,1.79,4,4,4h4.1c.47-2.28,2.49-4,4.9-4,2.76,0,5,2.24,5,5ZM26,25c0-1.65-1.35-3-3-3s-3,1.35-3,3,1.35,3,3,3,3-1.35,3-3Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (G4.propTypes = c);
const K4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, k0 || (k0 = /* @__PURE__ */ e.createElement("path", {
    d: "M17.74,30,16,29l4-7h6a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2H6A2,2,0,0,0,4,8V20a2,2,0,0,0,2,2h9v2H6a4,4,0,0,1-4-4V8A4,4,0,0,1,6,4H26a4,4,0,0,1,4,4V20a4,4,0,0,1-4,4H21.16Z"
  })), F0 || (F0 = /* @__PURE__ */ e.createElement("path", {
    d: "M17 9L15 9 15 13 11 13 11 15 15 15 15 19 17 19 17 15 21 15 21 13 17 13 17 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (K4.propTypes = c);
const Q4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, P0 || (P0 = /* @__PURE__ */ e.createElement("path", {
    d: "M13,28h2v2h-6v-2h2v-5h-2v-2h2v-1h2v8ZM21,20h-4v2h4v2h-2c-1.1,0-2,.9-2,2v4h6v-2h-4v-2h2c1.1,0,2-.9,2-2v-2c0-1.1-.9-2-2-2ZM29,20h-4v2h4v2h-3v2h3v2h-4v2h4c1.1,0,2-.9,2-2v-6c0-1.1-.9-2-2-2ZM12.4,13L3.4,4h14.6v-2H1v2.4l8.6,8.6L1,21.6v2.4h6v-2h-3.6l9-9Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Q4.propTypes = c);
const q4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, j0 || (j0 = /* @__PURE__ */ e.createElement("path", {
    d: "M3.4,22h10.6v2H1v-2.4l8.6-8.6L1,4.4v-2.4h17v2H3.4l9,9L3.4,22ZM29,24h-9.2l2.6-2.6-1.4-1.4-5,5,5,5,1.4-1.4-2.6-2.6h9.2s0-2,0-2ZM16,14v2h9.2l-2.6,2.6,1.4,1.4,5-5-5-5-1.4,1.4,2.6,2.6s-9.2,0-9.2,0Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (q4.propTypes = c);
const X4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, G0 || (G0 = /* @__PURE__ */ e.createElement("path", {
    d: "M24.251 21.3691l2.1943 1.4629A1 1 0 0027.8 22.6l3-4-1.6-1.2-2.4326 3.2437L24.5547 19.168a1 1 0 00-1.3687.2509L20 23.8789V16H18V26a2.0023 2.0023 0 002 2H30V26H20.9434zM2 21H16V23H2zM2 26H16V28H2zM11 16V11h1a4.0046 4.0046 0 004-4V4H13a3.9782 3.9782 0 00-2.7468 1.1066A6.0033 6.0033 0 005 2H2V5a6.0066 6.0066 0 006 6H9v5H2v2H16V16zM13 6h1V7a2.002 2.002 0 01-2 2H11V8A2.0019 2.0019 0 0113 6zM8 9A4.0046 4.0046 0 014 5V4H5A4.0045 4.0045 0 019 8V9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (X4.propTypes = c);
const Y4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.Ai || (Z.Ai = !0, console.warn("Icon should not be used. Teams should use the Carbon AILabel component.. As a result, the Ai component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, K0 || (K0 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M17 11L20 11 20 21 17 21 17 23 25 23 25 21 22 21 22 11 25 11 25 9 17 9 17 11zM13 9h-4c-1.103 0-2 .897-2 2v12h2v-5h4v5h2v-12c0-1.103-.897-2-2-2zm-4 7v-5h4v5h-4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Y4.propTypes = c);
const J4 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Q0 || (Q0 = /* @__PURE__ */ e.createElement("path", {
    d: "M24 23H26V31H24zM28 21H30V31H28zM20 27H22V31H20zM18 20v-2h1v-7h-1v-2h4v2h-1v7h1v2h-4zM14.5005 20h2l-3.5005-11h-3l-3.4966 11h1.9988l.6018-2h4.7781l.6184 2zM9.7058 16l1.6284-5.4111.2559-.0024 1.6736 5.4136h-3.5579z"
  })), q0 || (q0 = /* @__PURE__ */ e.createElement("path", {
    d: "M17 30L0 30 0 0 30 0 30 17 28 17 28 2 2 2 2 28 17 28 17 30z"
  })), r);
});
process.env.NODE_ENV !== "production" && (J4.propTypes = c);
const e5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, X0 || (X0 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M16 23.4142L11.293 18.7072 12.707 17.2928 16 20.5858 27.293 9.2928 28.707 10.7072 16 23.4142zM12.707 8.7073l-1.4141-1.4141-4.2928 4.2928-2.5861-2.5863 4.293-4.2925-1.4141-1.4141-5 4.9995c-.1875.1875-.293.4419-.293.707s.1055.5195.293.707l7 7.0005 1.4141-1.4141-2.2929-2.293 4.2929-4.2929z"
  })), Y0 || (Y0 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M16 30c-7.7197 0-14-6.2804-14-14h2c0 6.6168 5.3833 12 12 12s12-5.3832 12-12h2c0 7.7196-6.2803 14-14 14zM24.3076 7.3407c-2.2446-2.1543-5.1948-3.3407-8.3076-3.3407-.9365 0-1.8682.108-2.77.321l-.46-1.9463c1.0522-.2487 2.1387-.3748 3.23-.3748 3.6313 0 7.0737 1.3843 9.6924 3.8978l-1.3848 1.4429z"
  })), r);
});
process.env.NODE_ENV !== "production" && (e5.propTypes = c);
const t5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, J0 || (J0 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M19 22v-2h1v-7h-1v-2h4v2h-1v7h1v2h-4zM15.5005 22h2l-3.5005-11h-3l-3.4966 11h1.9988l.6018-2h4.7781l.6184 2zm-4.7947-4l1.6284-5.4111.2559-.0024 1.6736 5.4136h-3.5579zM32 4L28 4 28 0 26 0 26 4 22 4 22 6 26 6 26 10 28 10 28 6 32 6 32 4zM30 12H32V14H30zM18 0H20V2H18z"
  })), e2 || (e2 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M32 32L0 32 0 0 14 0 14 2 2 2 2 30 30 30 30 18 32 18 32 32z"
  })), r);
});
process.env.NODE_ENV !== "production" && (t5.propTypes = c);
const r5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, t2 || (t2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 23l-2.1387-1.0127c-1.7383-.8223-2.8613-2.5967-2.8613-4.5195v-6.4678h10v6.4678c0 1.9229-1.123 3.6973-2.8613 4.5195l-2.1387 1.0127zm-3-10v4.4678c0 1.1533.6738 2.2178 1.7168 2.7109l1.2832.6074 1.2832-.6074c1.043-.4932 1.7168-1.5576 1.7168-2.7109v-4.4678h-6zM4.1208 17.6562c.5305-.3594.8792-.9673.8792-1.6562 0-1.1045-.8955-2-2-2s-2 .8955-2 2c0 .7886.4607 1.4644 1.124 1.79.6792 5.334 4.3472 9.8477 9.5686 11.5347l.6147-1.9033c-4.4355-1.4326-7.5642-5.2461-8.1865-9.7651zM29.3247 20.3076l-1.9033-.6152c-1.4329 4.4355-5.2461 7.5645-9.7651 8.1865-.3596-.5303-.967-.8789-1.6562-.8789-1.1045 0-2 .8955-2 2s.8955 2 2 2c.7888 0 1.4644-.4604 1.7898-1.124 5.334-.6792 9.8479-4.3472 11.5349-9.5684zM29.876 14.21c-.6792-5.334-4.3472-9.8477-9.5686-11.5347l-.6147 1.9033c4.4355 1.4326 7.5642 5.2461 8.1865 9.7651-.5305.3594-.8792.9673-.8792 1.6562 0 1.1045.8955 2 2 2s2-.8955 2-2c0-.7886-.4604-1.4644-1.124-1.79zM16 1c-.7888 0-1.4644.4604-1.7898 1.124-5.334.6792-9.8479 4.3472-11.5349 9.5684l1.9033.6152c1.4329-4.4355 5.2461-7.5645 9.7651-8.1865.3596.5303.967.8789 1.6562.8789 1.1045 0 2-.8955 2-2s-.8955-2-2-2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (r5.propTypes = c);
const n5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, r2 || (r2 = /* @__PURE__ */ e.createElement("path", {
    d: "M23 27.5898L20.41 24.9999 19 26.41 23 30.41 31 22.41 29.5899 21 23 27.5898zM16 23l-2.1387-1.0127c-1.7383-.8223-2.8613-2.5967-2.8613-4.5195v-6.4678h10v6.4678c0 1.9229-1.123 3.6973-2.8613 4.5195l-2.1387 1.0127zm-3-10v4.4678c0 1.1533.6738 2.2178 1.7168 2.7109l1.2832.6074 1.2832-.6074c1.043-.4932 1.7168-1.5576 1.7168-2.7109v-4.4678h-6zM4.1208 17.6562c.5305-.3594.8792-.9673.8792-1.6562 0-1.1045-.8955-2-2-2s-2 .8955-2 2c0 .7886.4607 1.4644 1.124 1.79.6792 5.334 4.3472 9.8477 9.5686 11.5347l.6147-1.9033c-4.4355-1.4326-7.5642-5.2461-8.1865-9.7651zM29.876 14.21c-.6792-5.334-4.3472-9.8477-9.5686-11.5347l-.6147 1.9033c4.4355 1.4326 7.5642 5.2461 8.1865 9.7651-.5305.3594-.8792.9673-.8792 1.6562 0 1.1045.8955 2 2 2s2-.8955 2-2c0-.7886-.4604-1.4644-1.124-1.79zM16 1c-.7888 0-1.4644.4604-1.7898 1.124-5.334.6792-9.8479 4.3472-11.5349 9.5684l1.9033.6152c1.4329-4.4355 5.2461-7.5645 9.7651-8.1865.3596.5303.967.8789 1.6562.8789 1.1045 0 2-.8955 2-2s-.8955-2-2-2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (n5.propTypes = c);
const o5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, n2 || (n2 = /* @__PURE__ */ e.createElement("path", {
    d: "M27.4102 26L31 22.4102 29.5901 21 26 24.5898 22.4102 21 21 22.4102 24.5901 26 21 29.5898 22.4102 31 26 27.4102 29.5901 31 31 29.5898 27.4102 26zM16 23l-2.1387-1.0127c-1.7383-.8223-2.8613-2.5967-2.8613-4.5195v-6.4678h10v6.4678c0 1.9229-1.123 3.6973-2.8613 4.5195l-2.1387 1.0127zm-3-10v4.4678c0 1.1533.6738 2.2178 1.7168 2.7109l1.2832.6074 1.2832-.6074c1.043-.4932 1.7168-1.5576 1.7168-2.7109v-4.4678h-6zM4.1208 17.6562c.5305-.3594.8792-.9673.8792-1.6562 0-1.1045-.8955-2-2-2s-2 .8955-2 2c0 .7886.4607 1.4644 1.124 1.79.6792 5.334 4.3472 9.8477 9.5686 11.5347l.6147-1.9033c-4.4355-1.4326-7.5642-5.2461-8.1865-9.7651zM29.876 14.21c-.6792-5.334-4.3472-9.8477-9.5686-11.5347l-.6147 1.9033c4.4355 1.4326 7.5642 5.2461 8.1865 9.7651-.5305.3594-.8792.9673-.8792 1.6562 0 1.1045.8955 2 2 2s2-.8955 2-2c0-.7886-.4604-1.4644-1.124-1.79zM16 1c-.7888 0-1.4644.4604-1.7898 1.124-5.334.6792-9.8479 4.3472-11.5349 9.5684l1.9033.6152c1.4329-4.4355 5.2461-7.5645 9.7651-8.1865.3596.5303.967.8789 1.6562.8789 1.1045 0 2-.8955 2-2s-.8955-2-2-2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (o5.propTypes = c);
const a5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, o2 || (o2 = /* @__PURE__ */ e.createElement("path", {
    d: "M19 21v-2h1v-7h-1v-2h4v2h-1v7h1v2h-4zM15.5005 21h2l-3.5005-11h-3l-3.4966 11h1.9988l.6018-2h4.7781l.6184 2zM10.7058 17l1.6284-5.4111.2559-.0024 1.6736 5.4136h-3.5579z"
  })), a2 || (a2 = /* @__PURE__ */ e.createElement("path", {
    d: "M32,32H0V0h32v32ZM2,30h28V2H2v28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (a5.propTypes = c);
const l5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, l2 || (l2 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M15 19l-1.4141 1.4141 3.5859 3.5859H4v-13h-2v13c0 1.1046.8954 2 2 2h13.1719l-3.5859 3.5859 1.4141 1.4141 6-6-6-6zM24 18v-2h2V4h-2v-2h6v2h-2v12h2v2h-6z"
  })), c2 || (c2 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m21,18h2l-5.5-16-3,.0088-5.5,15.9912h2l1.3333-4h7.3335l1.3333,4Zm-8-6l3-9,3,9h-6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (l5.propTypes = c);
const c5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, i2 || (i2 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M18 20v-2h1v-7h-1v-2h4v2h-1v7h1v2h-4zM14.5005 20h2l-3.5005-11h-3l-3.4966 11h1.9988l.6018-2h4.7781l.6184 2zm-4.7947-4l1.6284-5.4111.2559-.0024 1.6736 5.4136h-3.5579zM26.2171 21l-1.7871 3.621-3.9958.5806 2.8914 2.8188-.6827 3.9796 3.5741-1.879 3.5741 1.879-.6827-3.9796 2.8914-2.8186-3.9958-.5808-1.7871-3.621z"
  })), s2 || (s2 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M17 30L0 30 0 0 30 0 30 17 28 17 28 2 2 2 2 28 17 28 17 30z"
  })), r);
});
process.env.NODE_ENV !== "production" && (c5.propTypes = c);
const i5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiResults || (Z.WatsonHealthAiResults = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiResults component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, h2 || (h2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 8a5.9908 5.9908 0 009.4712 4.8853L28.586 16 30 14.586l-3.115-3.1148A5.997 5.997 0 1016 8zm2 0a4 4 0 114 4A4.0045 4.0045 0 0118 8zM11 24H21V26H11zM13 28H19V30H13zM10.8145 18.1406A7.1851 7.1851 0 018 12a8.0055 8.0055 0 016-7.7373L13.6138 2.3A10.0088 10.0088 0 006 12a9.1793 9.1793 0 003.46 7.6162C10.4717 20.5508 11 21.0815 11 22h2C13 20.16 11.8892 19.1338 10.8145 18.1406zM23.0493 16a9.5991 9.5991 0 01-1.8716 2.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857a10.9664 10.9664 0 002.3686-2.8331z"
  })), r);
});
process.env.NODE_ENV !== "production" && (i5.propTypes = c);
const s5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiResultsHigh || (Z.WatsonHealthAiResultsHigh = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiResultsHigh component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, p2 || (p2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 24H21V26H11zM13 28H19V30H13zM23.0488 16a9.6136 9.6136 0 01-1.8711 2.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857A9.9886 9.9886 0 0025.2815 16zM16 4a7.9279 7.9279 0 013.69.9106l.8958-1.791A9.99 9.99 0 006 12a9.1793 9.1793 0 003.46 7.6162C10.4717 20.5508 11 21.0815 11 22h2c0-1.84-1.1108-2.8662-2.1855-3.8594A7.1851 7.1851 0 018 12 8.0092 8.0092 0 0116 4zM29 14H19a1 1 0 01-.8945-1.4473l5-10a1 1 0 011.7888 0l5 10A1 1 0 0129 14zm-8.3818-2h6.7636L24 5.2361z"
  })), r);
});
process.env.NODE_ENV !== "production" && (s5.propTypes = c);
const h5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiResultsLow || (Z.WatsonHealthAiResultsLow = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiResultsLow component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, f2 || (f2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 24H21V26H11zM13 28H19V30H13zM10.8145 18.1406A7.1851 7.1851 0 018 12a8.0092 8.0092 0 018-8V2A10.0111 10.0111 0 006 12a9.1793 9.1793 0 003.46 7.6162C10.4717 20.5508 11 21.0815 11 22h2C13 20.16 11.8892 19.1338 10.8145 18.1406zM24 14a6 6 0 116-6A6.0067 6.0067 0 0124 14zM24 4a4 4 0 104 4A4.0045 4.0045 0 0024 4zM23.04 16a9.4858 9.4858 0 01-1.8623 2.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857A9.9838 9.9838 0 0025.2756 16z"
  })), r);
});
process.env.NODE_ENV !== "production" && (h5.propTypes = c);
const p5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiResultsMedium || (Z.WatsonHealthAiResultsMedium = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiResultsMedium component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, d2 || (d2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 24H21V26H11zM13 28H19V30H13zM10.8145 18.1406A7.1851 7.1851 0 018 12a8.0092 8.0092 0 018-8V2A10.0111 10.0111 0 006 12a9.1793 9.1793 0 003.46 7.6162C10.4717 20.5508 11 21.0815 11 22h2C13 20.16 11.8892 19.1338 10.8145 18.1406zM28 14H20a2.0021 2.0021 0 01-2-2V4a2.0021 2.0021 0 012-2h8a2.0021 2.0021 0 012 2v8A2.0021 2.0021 0 0128 14zM20 4v8h8V4zM23.04 16a9.4858 9.4858 0 01-1.8623 2.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857A9.9838 9.9838 0 0025.2756 16z"
  })), r);
});
process.env.NODE_ENV !== "production" && (p5.propTypes = c);
const f5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiResultsUrgent || (Z.WatsonHealthAiResultsUrgent = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiResultsUrgent component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, w2 || (w2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 24H21V26H11zM13 28H19V30H13zM10.8145 18.1406A7.1851 7.1851 0 018 12a8.0092 8.0092 0 018-8V2A10.0111 10.0111 0 006 12a9.1793 9.1793 0 003.46 7.6162C10.4717 20.5508 11 21.0815 11 22h2C13 20.16 11.8892 19.1338 10.8145 18.1406zM20 2H22V9H20zM21 11a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0021 11zM26 2H28V9H26zM27 11a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0027 11zM23.04 16a9.4858 9.4858 0 01-1.8623 2.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857A9.9838 9.9838 0 0025.2756 16z"
  })), r);
});
process.env.NODE_ENV !== "production" && (f5.propTypes = c);
const d5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiResultsVeryHigh || (Z.WatsonHealthAiResultsVeryHigh = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiResultsVeryHigh component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, u2 || (u2 = /* @__PURE__ */ e.createElement("path", {
    d: "M24 2H26V9H24zM25 11a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0025 11zM11 24H21V26H11zM13 28H19V30H13zM23.0488 16a9.6136 9.6136 0 01-1.8711 2.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857A9.9886 9.9886 0 0025.2815 16zM16 4a7.94 7.94 0 014 1.0825V2.8408A9.9887 9.9887 0 006 12a9.1793 9.1793 0 003.46 7.6162C10.4717 20.5508 11 21.0815 11 22h2c0-1.84-1.1108-2.8662-2.1855-3.8594A7.1851 7.1851 0 018 12 8.0092 8.0092 0 0116 4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (d5.propTypes = c);
const w5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiStatus || (Z.WatsonHealthAiStatus = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiStatus component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, m2 || (m2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 24H21V26H11zM13 28H19V30H13zM23.04 16a9.4858 9.4858 0 01-1.8623 2.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857A9.9838 9.9838 0 0025.2756 16zM20 14a1 1 0 01-.8945-.5527L17.3818 10H14V8h4a1 1 0 01.8945.5527L20 10.7639l3.1055-6.2112a1.0416 1.0416 0 011.789 0L26.6182 8H30v2H26a1 1 0 01-.8945-.5527L24 7.2361l-3.1055 6.2112A1 1 0 0120 14z"
  })), v2 || (v2 = /* @__PURE__ */ e.createElement("path", {
    d: "M10.8145,18.1406A7.1851,7.1851,0,0,1,8,12a8.0092,8.0092,0,0,1,8-8V2A10.0111,10.0111,0,0,0,6,12a9.1793,9.1793,0,0,0,3.46,7.6162C10.4717,20.5508,11,21.0815,11,22h2C13,20.16,11.8892,19.1338,10.8145,18.1406Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (w5.propTypes = c);
const u5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiStatusComplete || (Z.WatsonHealthAiStatusComplete = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiStatusComplete component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, g2 || (g2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 24H21V26H11zM13 28H19V30H13zM10.8145 18.1406A7.1851 7.1851 0 018 12a8.0092 8.0092 0 018-8V2A10.0111 10.0111 0 006 12a9.1793 9.1793 0 003.46 7.6162C10.4717 20.5508 11 21.0815 11 22h2C13 20.16 11.8892 19.1338 10.8145 18.1406zM21 9.59L17.41 6 16 7.41 21 12.41 30 3.41 28.59 2 21 9.59zM23.8 14a7.28 7.28 0 01-2.6219 4.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857A9.1426 9.1426 0 0025.8389 14z"
  })), r);
});
process.env.NODE_ENV !== "production" && (u5.propTypes = c);
const m5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiStatusFailed || (Z.WatsonHealthAiStatusFailed = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiStatusFailed component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, E2 || (E2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 24H21V26H11zM13 28H19V30H13zM10.8145 18.1406A7.1851 7.1851 0 018 12a8.0092 8.0092 0 018-8V2A10.0111 10.0111 0 006 12a9.1793 9.1793 0 003.46 7.6162C10.4717 20.5508 11 21.0815 11 22h2C13 20.16 11.8892 19.1338 10.8145 18.1406zM23.8 14a7.28 7.28 0 01-2.6219 4.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857A9.1426 9.1426 0 0025.8389 14zM30 3.41L28.59 2 25 5.59 21.41 2 20 3.41 23.59 7 20 10.59 21.41 12 25 8.41 28.59 12 30 10.59 26.41 7 30 3.41z"
  })), r);
});
process.env.NODE_ENV !== "production" && (m5.propTypes = c);
const v5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiStatusInProgress || (Z.WatsonHealthAiStatusInProgress = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiStatusInProgress component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, V2 || (V2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 24H21V26H11zM13 28H19V30H13zM10.8145 18.1406A7.1851 7.1851 0 018 12a8.0092 8.0092 0 018-8V2A10.0111 10.0111 0 006 12a9.1793 9.1793 0 003.46 7.6162C10.4717 20.5508 11 21.0815 11 22h2C13 20.16 11.8892 19.1338 10.8145 18.1406zM21.1777 18.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857A9.193 9.193 0 0026 12H24A7.2032 7.2032 0 0121.1777 18.1426z"
  })), H2 || (H2 = /* @__PURE__ */ e.createElement("circle", {
    cx: "18.5",
    cy: "7.5",
    r: "1.5"
  })), M2 || (M2 = /* @__PURE__ */ e.createElement("circle", {
    cx: "28.5",
    cy: "7.5",
    r: "1.5"
  })), A2 || (A2 = /* @__PURE__ */ e.createElement("circle", {
    cx: "23.5",
    cy: "7.5",
    r: "1.5"
  })), r);
});
process.env.NODE_ENV !== "production" && (v5.propTypes = c);
const g5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiStatusQueued || (Z.WatsonHealthAiStatusQueued = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiStatusQueued component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, _2 || (_2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 24H21V26H11zM13 28H19V30H13zM10.8145 18.1406A7.1851 7.1851 0 018 12a8.0092 8.0092 0 018-8V2A10.0111 10.0111 0 006 12a9.1793 9.1793 0 003.46 7.6162C10.4717 20.5508 11 21.0815 11 22h2C13 20.16 11.8892 19.1338 10.8145 18.1406zM21.1777 18.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857A9.193 9.193 0 0026 12H24A7.2032 7.2032 0 0121.1777 18.1426zM18 6H28V8H18z"
  })), r);
});
process.env.NODE_ENV !== "production" && (g5.propTypes = c);
const E5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (Z.WatsonHealthAiStatusRejected || (Z.WatsonHealthAiStatusRejected = !0, console.warn("Icon no longer relevant to how we represent AI moments. As a result, the WatsonHealthAiStatusRejected component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, x2 || (x2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 24H21V26H11zM13 28H19V30H13zM10.8145 18.1406A7.1851 7.1851 0 018 12a8.0092 8.0092 0 018-8V2A10.0111 10.0111 0 006 12a9.1793 9.1793 0 003.46 7.6162C10.4717 20.5508 11 21.0815 11 22h2C13 20.16 11.8892 19.1338 10.8145 18.1406zM23.04 16a9.4858 9.4858 0 01-1.8623 2.1426C20.1069 19.1348 19 20.1611 19 22h2c0-.9194.5264-1.45 1.5352-2.3857A9.9838 9.9838 0 0025.2756 16zM30 8a6 6 0 10-6 6A6.0066 6.0066 0 0030 8zM28 8a3.9521 3.9521 0 01-.5669 2.019L21.981 4.5669A3.9529 3.9529 0 0124 4 4.0045 4.0045 0 0128 8zM20 8a3.9521 3.9521 0 01.5669-2.019l5.4521 5.4521A3.9529 3.9529 0 0124 12 4.0045 4.0045 0 0120 8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (E5.propTypes = c);
const V5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, N2 || (N2 = /* @__PURE__ */ e.createElement("path", {
    d: "M18 23H16V21a3.0033 3.0033 0 00-3-3H9a3.0033 3.0033 0 00-3 3v2H4V21a5.0058 5.0058 0 015-5h4a5.0059 5.0059 0 015 5zM11 6A3 3 0 118 9a3 3 0 013-3m0-2a5 5 0 105 5A5 5 0 0011 4zM2 26H30V28H2zM31.9658 11.7413a1.0007 1.0007 0 00-1.2246-.707l-3.0861.826L24 7l-1 .2676 1.4584 5.4483-2.7663.7405L20 11.2066l-1 .2676.9337 3.4883a.9993.9993 0 001.2246.707l10.1005-2.7036A1 1 0 0031.9658 11.7413z"
  })), r);
});
process.env.NODE_ENV !== "production" && (V5.propTypes = c);
const H5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, C2 || (C2 = /* @__PURE__ */ e.createElement("path", {
    d: "M18 23H16V21a3.0033 3.0033 0 00-3-3H9a3.0033 3.0033 0 00-3 3v2H4V21a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM11 6A3 3 0 118 9a3 3 0 013-3m0-2a5 5 0 105 5A5 5 0 0011 4zM2 26H30V28H2zM22 4L22 6 26.586 6 20 12.586 21.414 14 28 7.414 28 12 30 12 30 4 22 4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (H5.propTypes = c);
const M5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, y2 || (y2 = /* @__PURE__ */ e.createElement("path", {
    d: "M18 23H16V21a3.0033 3.0033 0 00-3-3H9a3.0033 3.0033 0 00-3 3v2H4V21a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM11 6A3 3 0 118 9a3 3 0 013-3m0-2a5 5 0 105 5A5 5 0 0011 4zM2 26H30V28H2zM27.303 8a2.6616 2.6616 0 00-1.9079.8058L25 9.2112l-.3951-.4054a2.6615 2.6615 0 00-3.8157 0 2.7992 2.7992 0 000 3.8964L25 17l4.2108-4.2978a2.7992 2.7992 0 000-3.8964A2.6616 2.6616 0 0027.303 8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (M5.propTypes = c);
const A5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, T2 || (T2 = /* @__PURE__ */ e.createElement("path", {
    d: "M18 23H16V21a3.0033 3.0033 0 00-3-3H9a3.0033 3.0033 0 00-3 3v2H4V21a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM11 6A3 3 0 118 9a3 3 0 013-3m0-2a5 5 0 105 5A5 5 0 0011 4zM2 26H30V28H2zM30 8L28 8 28 6 26 6 26 4 30 4 30 8zM19 4L23 4 23 6 21 6 21 8 19 8 19 4zM28 13H30V15H28zM26 11H28V13H26zM19 11L21 11 21 13 23 13 23 15 19 15 19 11z"
  })), r);
});
process.env.NODE_ENV !== "production" && (A5.propTypes = c);
const _5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, b2 || (b2 = /* @__PURE__ */ e.createElement("path", {
    d: "M22.9961,30H9.0039a1.0022,1.0022,0,0,1-.821-1.5769l6.9977-9.9965a1,1,0,0,1,1.6388,0l6.9977,9.9965A1.0022,1.0022,0,0,1,22.9961,30ZM10.92,28H21.08L16,20.7439Z"
  })), L2 || (L2 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,24H24V22h4V6H4V22H8v2H4a2.0021,2.0021,0,0,1-2-2V6A2.0021,2.0021,0,0,1,4,4H28a2.0021,2.0021,0,0,1,2,2V22A2.0021,2.0021,0,0,1,28,24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (_5.propTypes = c);
const x5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, z2 || (z2 = /* @__PURE__ */ e.createElement("path", {
    d: "M22.9961,30H9.0039a1.0022,1.0022,0,0,1-.821-1.5769l6.9977-9.9965a1,1,0,0,1,1.6388,0l6.9977,9.9965A1.0022,1.0022,0,0,1,22.9961,30Z"
  })), Z2 || (Z2 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,24H24V22h4V6H4V22H8v2H4a2.0021,2.0021,0,0,1-2-2V6A2.0021,2.0021,0,0,1,4,4H28a2.0021,2.0021,0,0,1,2,2V22A2.0021,2.0021,0,0,1,28,24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (x5.propTypes = c);
const N5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, R2 || (R2 = /* @__PURE__ */ e.createElement("path", {
    fillRule: "evenodd",
    d: "M17,14.5,23,17V15l-6-3V9a1,1,0,0,0-2,0v3L9,15v2l6-2.5V20l-3,2v1l4-1,4,1V22l-3-2Z"
  })), $2 || ($2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (N5.propTypes = c);
const C5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, D2 || (D2 = /* @__PURE__ */ e.createElement("path", {
    d: "M23,17H19.4141L16,13H14l2.5859,4H10.7207L9.5,15H8l1.0569,3.3046A1,1,0,0,0,10.0094,19H23a1,1,0,0,0,0-2Z"
  })), B2 || (B2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (C5.propTypes = c);
const y5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, O2 || (O2 = /* @__PURE__ */ e.createElement("path", {
    d: "M30,15h-6.07A8.0076,8.0076,0,0,0,17,8.0693V2H15V8.0693A8.0076,8.0076,0,0,0,8.07,15H2v2H8.07A8.0076,8.0076,0,0,0,15,23.9307V30h2V23.9307A8.0076,8.0076,0,0,0,23.9305,17H30ZM16,22a6,6,0,1,1,6-6A6.0066,6.0066,0,0,1,16,22Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (y5.propTypes = c);
const T5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, I2 || (I2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,28A11,11,0,1,1,27,17,11,11,0,0,1,16,28ZM16,8a9,9,0,1,0,9,9A9,9,0,0,0,16,8Z"
  })), S2 || (S2 = /* @__PURE__ */ e.createElement("path", {
    d: "M18.59 21L15 17.41 15 11 17 11 17 16.58 20 19.59 18.59 21z"
  })), W2 || (W2 = /* @__PURE__ */ e.createElement("path", {
    d: "M3.96 5.5H9.030000000000001V7.5H3.96z",
    transform: "rotate(-45.06 6.502 6.497)"
  })), U2 || (U2 = /* @__PURE__ */ e.createElement("path", {
    d: "M24.5 3.96H26.5V9.030000000000001H24.5z",
    transform: "rotate(-44.94 25.5 6.498)"
  })), r);
});
process.env.NODE_ENV !== "production" && (T5.propTypes = c);
const b5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, k2 || (k2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,28A11,11,0,1,1,27,17,11,11,0,0,1,16,28ZM16,8a9,9,0,1,0,9,9A9,9,0,0,0,16,8Z"
  })), F2 || (F2 = /* @__PURE__ */ e.createElement("path", {
    d: "M3.96 5.5H9.030000000000001V7.5H3.96z",
    transform: "rotate(-45.06 6.502 6.497)"
  })), P2 || (P2 = /* @__PURE__ */ e.createElement("path", {
    d: "M24.5 3.96H26.5V9.030000000000001H24.5z",
    transform: "rotate(-44.94 25.5 6.498)"
  })), j2 || (j2 = /* @__PURE__ */ e.createElement("path", {
    d: "M21 16L17 16 17 12 15 12 15 16 11 16 11 18 15 18 15 22 17 22 17 18 21 18 21 16z"
  })), r);
});
process.env.NODE_ENV !== "production" && (b5.propTypes = c);
const L5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, G2 || (G2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,28A11,11,0,1,1,27,17,11,11,0,0,1,16,28ZM16,8a9,9,0,1,0,9,9A9,9,0,0,0,16,8Z"
  })), K2 || (K2 = /* @__PURE__ */ e.createElement("path", {
    d: "M3.96 5.5H9.030000000000001V7.5H3.96z",
    transform: "rotate(-45.06 6.502 6.497)"
  })), Q2 || (Q2 = /* @__PURE__ */ e.createElement("path", {
    d: "M24.5 3.96H26.5V9.030000000000001H24.5z",
    transform: "rotate(-44.94 25.5 6.498)"
  })), q2 || (q2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 16H21V18H11z"
  })), r);
});
process.env.NODE_ENV !== "production" && (L5.propTypes = c);
const z5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, X2 || (X2 = /* @__PURE__ */ e.createElement("path", {
    d: "M24,18H17V14h3a2.0025,2.0025,0,0,0,2-2V8a2.0025,2.0025,0,0,0-2-2H17V2H15V6H12a2.0025,2.0025,0,0,0-2,2v4a2.0025,2.0025,0,0,0,2,2h3v4H8a2.0025,2.0025,0,0,0-2,2v4a2.0025,2.0025,0,0,0,2,2h7v4h2V26h7a2.0025,2.0025,0,0,0,2-2V20A2.0025,2.0025,0,0,0,24,18ZM12,8h8v4H12ZM24,24H8V20H24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (z5.propTypes = c);
const Z5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Y2 || (Y2 = /* @__PURE__ */ e.createElement("path", {
    d: "M26 26H11a2.0023 2.0023 0 01-2-2V20a2.0023 2.0023 0 012-2H26a2.0023 2.0023 0 012 2v4A2.0023 2.0023 0 0126 26zm0-6.0012L11 20v4H26zM18 14H11a2.0023 2.0023 0 01-2-2V8a2.0023 2.0023 0 012-2h7a2.0023 2.0023 0 012 2v4A2.0023 2.0023 0 0118 14zm0-6.0012L11 8v4h7zM4 2H6V30H4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Z5.propTypes = c);
const R5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, J2 || (J2 = /* @__PURE__ */ e.createElement("path", {
    d: "M4 24V20a2.0023 2.0023 0 012-2H21a2.0023 2.0023 0 012 2v4a2.0023 2.0023 0 01-2 2H6A2.0023 2.0023 0 014 24zm2 0H21V20L6 19.9988zM12 12V8a2.0023 2.0023 0 012-2h7a2.0023 2.0023 0 012 2v4a2.0023 2.0023 0 01-2 2H14A2.0023 2.0023 0 0112 12zm2 0h7V8l-7-.0012z"
  })), ee || (ee = /* @__PURE__ */ e.createElement("path", {
    d: "M26 2H28V30H26z",
    transform: "rotate(-180 27 16)"
  })), r);
});
process.env.NODE_ENV !== "production" && (R5.propTypes = c);
const $5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, te || (te = /* @__PURE__ */ e.createElement("path", {
    d: "M2 26H30V28H2zM24 23H20a2.0023 2.0023 0 01-2-2V14a2.0023 2.0023 0 012-2h4a2.0023 2.0023 0 012 2v7A2.0023 2.0023 0 0124 23zm-4-9v7h4.0012L24 14zM12 23H8a2.0023 2.0023 0 01-2-2V6A2.0023 2.0023 0 018 4h4a2.0023 2.0023 0 012 2V21A2.0023 2.0023 0 0112 23zM8 6V21h4.0012L12 6z"
  })), r);
});
process.env.NODE_ENV !== "production" && ($5.propTypes = c);
const D5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, re || (re = /* @__PURE__ */ e.createElement("path", {
    d: "M30,15H26V12a2.0025,2.0025,0,0,0-2-2H20a2.0025,2.0025,0,0,0-2,2v3H14V8a2.0025,2.0025,0,0,0-2-2H8A2.0025,2.0025,0,0,0,6,8v7H2v2H6v7a2.0025,2.0025,0,0,0,2,2h4a2.0025,2.0025,0,0,0,2-2V17h4v3a2.0025,2.0025,0,0,0,2,2h4a2.0025,2.0025,0,0,0,2-2V17h4ZM8,24V8h4l.0012,16Zm12-4V12h4l.0012,8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (D5.propTypes = c);
const B5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ne || (ne = /* @__PURE__ */ e.createElement("path", {
    d: "M24 20H20a2.0023 2.0023 0 01-2-2V11a2.0023 2.0023 0 012-2h4a2.0023 2.0023 0 012 2v7A2.0023 2.0023 0 0124 20zm-4-9v7h4.0012L24 11zM12 28H8a2.0023 2.0023 0 01-2-2V11A2.0023 2.0023 0 018 9h4a2.0023 2.0023 0 012 2V26A2.0023 2.0023 0 0112 28zM8 11V26h4.0012L12 11zM2 4H30V6H2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (B5.propTypes = c);
const O5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, oe || (oe = /* @__PURE__ */ e.createElement("path", {
    d: "M26,30H6a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,6,2H26a2.0023,2.0023,0,0,1,2,2V28A2.0023,2.0023,0,0,1,26,30ZM6,4V28H26V4Z"
  })), ae || (ae = /* @__PURE__ */ e.createElement("path", {
    d: "M10 18H22V20H10z",
    transform: "rotate(-180 16 19)"
  })), le || (le = /* @__PURE__ */ e.createElement("path", {
    d: "M12 23H20V25H12z",
    transform: "rotate(-180 16 24)"
  })), r);
});
process.env.NODE_ENV !== "production" && (O5.propTypes = c);
const I5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ce || (ce = /* @__PURE__ */ e.createElement("path", {
    d: "M26,30H6a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,6,2H26a2.0023,2.0023,0,0,1,2,2V28A2.0023,2.0023,0,0,1,26,30ZM6,4V28H26V4Z"
  })), ie || (ie = /* @__PURE__ */ e.createElement("path", {
    d: "M9 18H20V20H9zM9 23H16V25H9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (I5.propTypes = c);
const S5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, se || (se = /* @__PURE__ */ e.createElement("path", {
    d: "M26,30H6a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,6,2H26a2.0023,2.0023,0,0,1,2,2V28A2.0023,2.0023,0,0,1,26,30ZM6,4V28H26V4Z"
  })), he || (he = /* @__PURE__ */ e.createElement("path", {
    d: "M12 18H23V20H12z",
    transform: "rotate(-180 17.5 19)"
  })), pe || (pe = /* @__PURE__ */ e.createElement("path", {
    d: "M16 23H23V25H16z",
    transform: "rotate(-180 19.5 24)"
  })), r);
});
process.env.NODE_ENV !== "production" && (S5.propTypes = c);
const W5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, fe || (fe = /* @__PURE__ */ e.createElement("path", {
    d: "M26,30H6a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,6,2H26a2.0023,2.0023,0,0,1,2,2V28A2.0023,2.0023,0,0,1,26,30ZM6,4V28H26V4Z"
  })), de || (de = /* @__PURE__ */ e.createElement("path", {
    d: "M10 13H22V15H10z",
    transform: "rotate(-180 16 14)"
  })), we || (we = /* @__PURE__ */ e.createElement("path", {
    d: "M12 18H20V20H12z",
    transform: "rotate(-180 16 19)"
  })), r);
});
process.env.NODE_ENV !== "production" && (W5.propTypes = c);
const U5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ue || (ue = /* @__PURE__ */ e.createElement("path", {
    d: "M26,30H6a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,6,2H26a2.0023,2.0023,0,0,1,2,2V28A2.0023,2.0023,0,0,1,26,30ZM6,4V28H26V4Z"
  })), me || (me = /* @__PURE__ */ e.createElement("path", {
    d: "M9 13H20V15H9zM9 18H16V20H9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (U5.propTypes = c);
const k5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ve || (ve = /* @__PURE__ */ e.createElement("path", {
    d: "M26,30H6a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,6,2H26a2.0023,2.0023,0,0,1,2,2V28A2.0023,2.0023,0,0,1,26,30ZM6,4V28H26V4Z"
  })), ge || (ge = /* @__PURE__ */ e.createElement("path", {
    d: "M12 13H23V15H12z",
    transform: "rotate(-180 17.5 14)"
  })), Ee || (Ee = /* @__PURE__ */ e.createElement("path", {
    d: "M16 18H23V20H16z",
    transform: "rotate(-180 19.5 19)"
  })), r);
});
process.env.NODE_ENV !== "production" && (k5.propTypes = c);
const F5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ve || (Ve = /* @__PURE__ */ e.createElement("path", {
    d: "M26,30H6a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,6,2H26a2.0023,2.0023,0,0,1,2,2V28A2.0023,2.0023,0,0,1,26,30ZM6,4V28H26V4Z"
  })), He || (He = /* @__PURE__ */ e.createElement("path", {
    d: "M10 7H22V9H10z",
    transform: "rotate(-180 16 8)"
  })), Me || (Me = /* @__PURE__ */ e.createElement("path", {
    d: "M12 12H20V14H12z",
    transform: "rotate(-180 16 13)"
  })), r);
});
process.env.NODE_ENV !== "production" && (F5.propTypes = c);
const P5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ae || (Ae = /* @__PURE__ */ e.createElement("path", {
    d: "M26,30H6a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,6,2H26a2.0023,2.0023,0,0,1,2,2V28A2.0023,2.0023,0,0,1,26,30ZM6,4V28H26V4Z"
  })), _e || (_e = /* @__PURE__ */ e.createElement("path", {
    d: "M9 7H20V9H9zM9 12H16V14H9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (P5.propTypes = c);
const j5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, xe || (xe = /* @__PURE__ */ e.createElement("path", {
    d: "M26,30H6a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,6,2H26a2.0023,2.0023,0,0,1,2,2V28A2.0023,2.0023,0,0,1,26,30ZM6,4V28H26V4Z"
  })), Ne || (Ne = /* @__PURE__ */ e.createElement("path", {
    d: "M12 7H23V9H12z",
    transform: "rotate(-180 17.5 8)"
  })), Ce || (Ce = /* @__PURE__ */ e.createElement("path", {
    d: "M16 12H23V14H16z",
    transform: "rotate(-180 19.5 13)"
  })), r);
});
process.env.NODE_ENV !== "production" && (j5.propTypes = c);
const G5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ye || (ye = /* @__PURE__ */ e.createElement("path", {
    d: "M4,2H2V28a2,2,0,0,0,2,2H30V28H4Z"
  })), Te || (Te = /* @__PURE__ */ e.createElement("path", {
    d: "M30,9H23v2h3.59L19,18.59l-4.29-4.3a1,1,0,0,0-1.42,0L6,21.59,7.41,23,14,16.41l4.29,4.3a1,1,0,0,0,1.42,0L28,12.41V16h2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (G5.propTypes = c);
const K5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, be || (be = /* @__PURE__ */ e.createElement("path", {
    d: "M29.707 19.293l-3-3a.9994.9994 0 00-1.414 0L16 25.5859V30h4.4141l9.2929-9.293A.9994.9994 0 0029.707 19.293zM19.5859 28H18V26.4141l5-5L24.5859 23zM26 21.5859L24.4141 20 26 18.4141 27.5859 20zM30 4H23V6h3.5859L19 13.5859 14.707 9.293a1 1 0 00-1.414 0L6 16.5859 7.4141 18 14 11.4141l4.293 4.2929a1 1 0 001.414 0L28 7.4141V11h2z"
  })), Le || (Le = /* @__PURE__ */ e.createElement("path", {
    d: "M4,2H2V28a2,2,0,0,0,2,2h8V28H4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (K5.propTypes = c);
const Q5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ze || (ze = /* @__PURE__ */ e.createElement("path", {
    d: "M4 20L4 22 8.586 22 2 28.586 3.414 30 10 23.414 10 28 12 28 12 20 4 20zM30 4H23V6h3.5859L19 13.5859 14.707 9.293a1 1 0 00-1.414 0L8 14.5858 9.4142 16 14 11.4141l4.293 4.2929a1 1 0 001.414 0L28 7.4141V11h2zM16 28H30V30H16zM2 2H4V16H2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Q5.propTypes = c);
const q5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ze || (Ze = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M2.257 25.5H8.742V27.5H2.257z",
    transform: "rotate(-45 5.5 26.5)"
  })), Re || (Re = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M9.257 18.5H15.742V20.5H9.257z",
    transform: "rotate(-45 12.5 19.5)"
  })), $e || ($e = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M16.257 11.5H22.742V13.5H16.257z",
    transform: "rotate(-45 19.5 12.5)"
  })), De || (De = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M23.257 4.5H29.742V6.5H23.257z",
    transform: "rotate(-45 26.5 5.5)"
  })), r);
});
process.env.NODE_ENV !== "production" && (q5.propTypes = c);
const X5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Be || (Be = /* @__PURE__ */ e.createElement("path", {
    d: "M9,24a3.51,3.51,0,0,0-.88-1.86L17.65,5.56l-1.73-1L6.35,21.12A3.06,3.06,0,0,0,5.5,21a3.5,3.5,0,1,0,3.15,5H28V24ZM5.5,26A1.5,1.5,0,1,1,7,24.5,1.5,1.5,0,0,1,5.5,26Z"
  })), Oe || (Oe = /* @__PURE__ */ e.createElement("path", {
    d: "M22,21h2a13,13,0,0,0-5.42-10.56l-1.16,1.62A11,11,0,0,1,22,21Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (X5.propTypes = c);
const Y5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ie || (Ie = /* @__PURE__ */ e.createElement("path", {
    d: "M28,4H4A2,2,0,0,0,2,6V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V6A2,2,0,0,0,28,4Zm0,22H4V6H28Z"
  })), Se || (Se = /* @__PURE__ */ e.createElement("path", {
    d: "M21 20H13a3.51 3.51 0 00-.88-1.86l3.8-6.64-1.74-1-3.78 6.62A3.35 3.35 0 009.5 17a3.5 3.5 0 103.15 5H21zM9.5 22A1.5 1.5 0 1111 20.5 1.5 1.5 0 019.5 22zM19 8H26V10H19zM19 12H23V14H19z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Y5.propTypes = c);
const J5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, We || (We = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM27.84,14.14,22,17.52V5.62A12,12,0,0,1,27.84,14.14ZM12,18.68V13.32L16,11l4,2.31v5.36L16,21Zm8-14V11L10.34,5.42A11.9,11.9,0,0,1,20,4.7Zm-11.52,2L14,9.85,4,15.62A12,12,0,0,1,8.48,6.66ZM4.16,17.85,10,14.47V26.38A12,12,0,0,1,4.16,17.85ZM12,27.3V21l9.67,5.58A11.92,11.92,0,0,1,16,28,12.05,12.05,0,0,1,12,27.3Zm11.52-2L18,22.14l10-5.77A12,12,0,0,1,23.52,25.34Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (J5.propTypes = c);
const ea = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ue || (Ue = /* @__PURE__ */ e.createElement("path", {
    d: "M26,22a3.86,3.86,0,0,0-2,.57l-3.09-3.1a6,6,0,0,0,0-6.94L24,9.43A3.86,3.86,0,0,0,26,10a4,4,0,1,0-4-4,3.86,3.86,0,0,0,.57,2l-3.1,3.09a6,6,0,0,0-6.94,0L9.43,8A3.86,3.86,0,0,0,10,6a4,4,0,1,0-4,4,3.86,3.86,0,0,0,2-.57l3.09,3.1a6,6,0,0,0,0,6.94L8,22.57A3.86,3.86,0,0,0,6,22a4,4,0,1,0,4,4,3.86,3.86,0,0,0-.57-2l3.1-3.09a6,6,0,0,0,6.94,0L22.57,24A3.86,3.86,0,0,0,22,26a4,4,0,1,0,4-4ZM26,4a2,2,0,1,1-2,2A2,2,0,0,1,26,4ZM4,6A2,2,0,1,1,6,8,2,2,0,0,1,4,6ZM6,28a2,2,0,1,1,2-2A2,2,0,0,1,6,28Zm10-8a4,4,0,1,1,4-4A4,4,0,0,1,16,20Zm10,8a2,2,0,1,1,2-2A2,2,0,0,1,26,28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ea.propTypes = c);
const ta = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ke || (ke = /* @__PURE__ */ e.createElement("path", {
    d: "M8 9H4a2 2 0 00-2 2V23H4V18H8v5h2V11A2 2 0 008 9zM4 16V11H8v5zM22 11L25 11 25 21 22 21 22 23 30 23 30 21 27 21 27 11 30 11 30 9 22 9 22 11zM14 23H12V9h6a2 2 0 012 2v5a2 2 0 01-2 2H14zm0-7h4V11H14z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ta.propTypes = c);
const ra = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Fe || (Fe = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m28,26c-.178,0-.3472.0308-.5115.0742l-1.0554-1.0552c.3516-.5947.5669-1.2798.5669-2.019s-.2153-1.4243-.5669-2.019l1.0554-1.0552c.1643.0435.3335.0742.5115.0742,1.1045,0,2-.8955,2-2s-.8955-2-2-2-2,.8955-2,2c0,.1777.0308.3472.0742.5117l-1.0552,1.0552c-.595-.3516-1.2795-.5669-2.019-.5669s-1.4241.2153-2.019.5669l-1.0552-1.0552c.0435-.1646.0742-.334.0742-.5117,0-1.1045-.8955-2-2-2s-2,.8955-2,2,.8955,2,2,2c.178,0,.3472-.0308.5115-.0742l1.0554,1.0552c-.3516.5947-.5669,1.2798-.5669,2.019s.2153,1.4243.5669,2.019l-1.0554,1.0552c-.1643-.0435-.3335-.0742-.5115-.0742-1.1045,0-2,.8955-2,2s.8955,2,2,2,2-.8955,2-2c0-.1777-.0308-.3472-.0742-.5117l1.0552-1.0552c.595.3516,1.2795.5669,2.019.5669s1.4241-.2153,2.019-.5669l1.0552,1.0552c-.0435.1646-.0742.334-.0742.5117,0,1.1045.8955,2,2,2s2-.8955,2-2-.8955-2-2-2Zm-7-3c0-1.1025.8972-2,2-2s2,.8975,2,2-.8972,2-2,2-2-.8975-2-2Z"
  })), Pe || (Pe = /* @__PURE__ */ e.createElement("circle", {
    cx: "22",
    cy: "10",
    r: "2",
    strokeWidth: "0"
  })), je || (je = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m21,2c-4.9626,0-9,4.0371-9,9,0,.7788.0989,1.5469.2944,2.291L2,23.5859v6.4141h6.4143l7-7-2.7073-2.707-1.4141,1.4141,1.2927,1.293-1.5896,1.5898-1.2869-1.2949-1.4185,1.4102,1.2913,1.2988-1.9963,1.9961h-3.5857v-3.5859l9.7122-9.7119.8555-.8677-.1982-.5845c-.2451-.7217-.3694-1.4785-.3694-2.25,0-3.8599,3.1401-7,7-7s7,3.1401,7,7h2c0-4.9629-4.0374-9-9-9Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ra.propTypes = c);
const na = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ge || (Ge = /* @__PURE__ */ e.createElement("path", {
    d: "M28 10H22V24h2V20h4a2.0027 2.0027 0 002-2V12A2.0023 2.0023 0 0028 10zm-4 8V12h4v6zM18 10H12V24h2V20h4a2.0027 2.0027 0 002-2V12A2.0023 2.0023 0 0018 10zm-4 8V12h4v6zM8 10H3v2H8v2H4a2 2 0 00-2 2v2a2 2 0 002 2h6V12A2.0023 2.0023 0 008 10zm0 8H4V16H8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (na.propTypes = c);
const oa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ke || (Ke = /* @__PURE__ */ e.createElement("path", {
    d: "M20,14h8a2.0023,2.0023,0,0,0,2-2V4a2.0023,2.0023,0,0,0-2-2H20a2.0023,2.0023,0,0,0-2,2H9A2.0023,2.0023,0,0,0,7,6v4H4a2.0023,2.0023,0,0,0-2,2v8a2.0023,2.0023,0,0,0,2,2H6v4a2.0023,2.0023,0,0,0,2,2H18a2.0023,2.0023,0,0,0,2,2h8a2.0023,2.0023,0,0,0,2-2V20a2.0023,2.0023,0,0,0-2-2H20a2.0023,2.0023,0,0,0-2,2v6H8V22h4a2.0023,2.0023,0,0,0,2-2V12a2.0023,2.0023,0,0,0-2-2H9V6h9v6A2.0023,2.0023,0,0,0,20,14Zm0,14V24h8v4Zm8-8,0,2H20V20ZM4,20V16h8v4Zm8.0005-6H4V12h8ZM20,12V8h8v4Zm8-8,0,2H20V4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (oa.propTypes = c);
const aa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Qe || (Qe = /* @__PURE__ */ e.createElement("path", {
    d: "M21.7788,8a11.4843,11.4843,0,0,0-3.0547.5342,14.5665,14.5665,0,0,1-1.8225.4126A6.0054,6.0054,0,0,0,11,4V6a3.9933,3.9933,0,0,1,3.8267,2.9c-.5181-.0879-1.0569-.2207-1.6172-.3648A12.89,12.89,0,0,0,10.0317,8C6.311,8,4,11.0652,4,16c0,7.51,4.0679,11.999,8.0005,12h.0015a7.1576,7.1576,0,0,0,2.49-.59A5.0128,5.0128,0,0,1,16,27a5.0266,5.0266,0,0,1,1.5112.41A7.15,7.15,0,0,0,20,28h0c3.9307-.001,8-4.49,8-12C28,12.3094,26.3706,8,21.7788,8ZM20,26h0a5.5038,5.5038,0,0,1-1.7905-.4639A6.4168,6.4168,0,0,0,16,25a6.4043,6.4043,0,0,0-2.2061.5361A5.5343,5.5343,0,0,1,12,26h.0015C9.0513,25.9988,6,22.2586,6,16c0-1.8037.3931-6,4.0317-6a11.2363,11.2363,0,0,1,2.6807.4726A12.9819,12.9819,0,0,0,15.7612,11h.4922a11.7955,11.7955,0,0,0,2.9956-.5361A9.8483,9.8483,0,0,1,21.7788,10C25.7964,10,26,14.9978,26,16,26,22.2586,22.9482,25.9988,20,26Z"
  })), qe || (qe = /* @__PURE__ */ e.createElement("path", {
    d: "M18,7H17V6a2.0021,2.0021,0,0,1,2-2h1V5A2.0021,2.0021,0,0,1,18,7Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (aa.propTypes = c);
const la = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Xe || (Xe = /* @__PURE__ */ e.createElement("path", {
    d: "M7.0825 11.6714l-1.6748-1.0928c-.9062 1.3887-1.3928 3.2305-1.4072 5.3267l2 .0137c.0117-1.7119.3857-3.1807 1.082-4.2476zM6.0852 17.8164l-1.9907.1934c.1887 1.938.6592 3.6738 1.3982 5.1592l1.7905-.8911c-.6301-1.2661-1.0332-2.7676-1.198-4.4614zM8.2378 23.7964l-1.5688 1.2402c1.333 1.6865 3.0972 2.7573 4.8396 2.9375l.2061-1.9893c-1.1912-.1235-2.491-.9414-3.4768-2.1885zM16 25c-.7334 0-1.4783.271-2.1987.5332-.1809.0654-.3635.1318-.5469.1943l.6426 1.894c.197-.0669.3936-.1382.5879-.209.5576-.2026 1.134-.4126 1.5151-.4126.3809 0 .9575.21 1.5149.4121.1809.0659.3635.1323.5466.1953l.6479-1.8926c-.1711-.0586-.3418-.1206-.511-.1821-.7205-.2617-1.4653-.5327-2.1985-.5327zM20.2546 25.9878l.1855 1.9917c1.7456-.1631 3.5178-1.2227 4.8621-2.9072l-1.5632-1.2476c-.9924 1.2437-2.2949 2.0522-3.4844 2.1631zM24.7004 22.3115l1.7871.8975c.7449-1.4834 1.2205-3.2178 1.4138-5.1558l-1.9902-.1987c-.1689 1.6938-.5762 3.1934-1.2107 4.457zM28 15.9492c-.0076-2.0938-.4854-3.9365-1.3818-5.3311l-1.6821 1.082c.6897 1.0728 1.0576 2.5444 1.064 4.2559l2-.0068zM20 4h-1c-1.1046 0-2 .8954-2 2v1h1c1.1046 0 2-.8954 2-2v-1z"
  })), Ye || (Ye = /* @__PURE__ */ e.createElement("path", {
    d: "M23.8125,10.5308l1.1035-1.668c-.8655-.5728-1.8467-.8628-2.916-.8628-1.4155,0-2.4175,.2881-3.3013,.542-.5764,.1655-1.1362,.3203-1.7979,.4004-.502-2.8047-2.9541-4.9424-5.9009-4.9424v2c1.8223,0,3.3464,1.2319,3.8274,2.9014-.5442-.0864-1.031-.2173-1.5261-.3594-.8838-.2539-1.8857-.542-3.3013-.542-1.0693,0-2.0505,.29-2.916,.8628l1.1035,1.668c.5325-.3521,1.1423-.5308,1.8125-.5308,1.134,0,1.9185,.2256,2.7488,.4639,.917,.2637,1.8652,.5361,3.2512,.5361s2.3342-.2725,3.2512-.5361c.8303-.2383,1.6147-.4639,2.7488-.4639,.6702,0,1.28,.1787,1.8125,.5308Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (la.propTypes = c);
const ca = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Je || (Je = /* @__PURE__ */ e.createElement("path", {
    d: "M16 18H6a2 2 0 01-2-2V6A2 2 0 016 4H16a2 2 0 012 2V16A2 2 0 0116 18zM6 6V16H16V6zM26 12v4H22V12h4m0-2H22a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V12a2 2 0 00-2-2zM26 22v4H22V22h4m0-2H22a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V22a2 2 0 00-2-2zM16 22v4H12V22h4m0-2H12a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V22a2 2 0 00-2-2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ca.propTypes = c);
const ia = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, et || (et = /* @__PURE__ */ e.createElement("path", {
    d: "M23 7H27V11H23zM23 13H27V17H23zM17 7H21V11H17zM17 13H21V17H17z"
  })), tt || (tt = /* @__PURE__ */ e.createElement("circle", {
    cx: "14.5",
    cy: "24.5",
    r: "1.5"
  })), rt || (rt = /* @__PURE__ */ e.createElement("path", {
    d: "M21,30H8a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,8,2H21V4H8V28H21V20h2v8A2.0023,2.0023,0,0,1,21,30Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ia.propTypes = c);
const sa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, nt || (nt = /* @__PURE__ */ e.createElement("path", {
    d: "M17 19H21V23H17zM11 19H15V23H11zM17 25H21V29H17zM11 25H15V29H11z"
  })), ot || (ot = /* @__PURE__ */ e.createElement("path", {
    d: "M24.5,25H24V23h.5a5.4961,5.4961,0,0,0,.377-10.9795l-.8365-.0566-.09-.834a7.9979,7.9979,0,0,0-15.9014,0l-.09.834-.8365.0566A5.4961,5.4961,0,0,0,7.5,23H8v2H7.5A7.4964,7.4964,0,0,1,6.1782,10.124a9.9992,9.9992,0,0,1,19.6436,0A7.4964,7.4964,0,0,1,24.5,25Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (sa.propTypes = c);
const ha = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, at || (at = /* @__PURE__ */ e.createElement("path", {
    d: "M26 2H30V6H26zM26 8H30V12H26zM20 2H24V6H20zM20 8H24V12H20z"
  })), lt || (lt = /* @__PURE__ */ e.createElement("path", {
    d: "M28,16v6H4V6H16V4H4A2,2,0,0,0,2,6V22a2,2,0,0,0,2,2h8v4H8v2H24V28H20V24h8a2,2,0,0,0,2-2V16ZM18,28H14V24h4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ha.propTypes = c);
const pa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, ct || (ct = /* @__PURE__ */ e.createElement("path", {
    d: "M4 2v2H2V2h2zm1-1H1v4h4V1zM9 2v2H7V2h2zm1-1H6v4h4V1zM14 2v2h-2V2h2zm1-1h-4v4h4V1zM4 7v2H2V7h2zm1-1H1v4h4V6zM9 7v2H7V7h2zm1-1H6v4h4V6zM14 7v2h-2V7h2zm1-1h-4v4h4V6zM4 12v2H2v-2h2zm1-1H1v4h4v-4zM9 12v2H7v-2h2zm1-1H6v4h4v-4zM14 12v2h-2v-2h2zm1-1h-4v4h4v-4z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, it || (it = /* @__PURE__ */ e.createElement("path", {
    d: "M8,4V8H4V4Zm2-2H2v8h8Zm8,2V8H14V4Zm2-2H12v8h8Zm8,2V8H24V4Zm2-2H22v8h8ZM8,14v4H4V14Zm2-2H2v8h8Zm8,2v4H14V14Zm2-2H12v8h8Zm8,2v4H24V14Zm2-2H22v8h8ZM8,24v4H4V24Zm2-2H2v8h8Zm8,2v4H14V24Zm2-2H12v8h8Zm8,2v4H24V24Zm2-2H22v8h8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (pa.propTypes = c);
const fa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, st || (st = /* @__PURE__ */ e.createElement("path", {
    d: "M14 19H18V21H14z"
  })), ht || (ht = /* @__PURE__ */ e.createElement("path", {
    d: "M6,2V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V2ZM24,28H8V16H24Zm0-14H8V10H24ZM8,8V4H24V8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (fa.propTypes = c);
const da = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, pt || (pt = /* @__PURE__ */ e.createElement("path", {
    d: "M27,22.142V9.858A3.9916,3.9916,0,1,0,22.142,5H9.858A3.9916,3.9916,0,1,0,5,9.858V22.142A3.9916,3.9916,0,1,0,9.858,27H22.142A3.9916,3.9916,0,1,0,27,22.142ZM26,4a2,2,0,1,1-2,2A2.0023,2.0023,0,0,1,26,4ZM4,6A2,2,0,1,1,6,8,2.002,2.002,0,0,1,4,6ZM6,28a2,2,0,1,1,2-2A2.0023,2.0023,0,0,1,6,28Zm16.142-3H9.858A3.9937,3.9937,0,0,0,7,22.142V9.858A3.9947,3.9947,0,0,0,9.858,7H22.142A3.9937,3.9937,0,0,0,25,9.858V22.142A3.9931,3.9931,0,0,0,22.142,25ZM26,28a2,2,0,1,1,2-2A2.0027,2.0027,0,0,1,26,28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (da.propTypes = c);
const wa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ft || (ft = /* @__PURE__ */ e.createElement("path", {
    d: "M30,6a3.9916,3.9916,0,0,0-7.9773-.2241L9.5864,8.2627A3.99,3.99,0,1,0,5,13.8579v8.2842A3.9915,3.9915,0,1,0,9.8579,27h8.2842a3.9912,3.9912,0,1,0,5.595-4.5864l2.487-12.4361A3.9945,3.9945,0,0,0,30,6ZM26,4a2,2,0,1,1-2,2A2.0023,2.0023,0,0,1,26,4ZM4,10a2,2,0,1,1,2,2A2.0023,2.0023,0,0,1,4,10ZM6,28a2,2,0,1,1,2-2A2.0023,2.0023,0,0,1,6,28Zm12.1421-3H9.8579A3.9942,3.9942,0,0,0,7,22.1421V13.8579a3.9871,3.9871,0,0,0,2.9773-3.6338L22.4136,7.7373a4.0053,4.0053,0,0,0,1.8493,1.8491l-2.487,12.4361A3.9874,3.9874,0,0,0,18.1421,25ZM22,28a2,2,0,1,1,2-2A2.0023,2.0023,0,0,1,22,28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (wa.propTypes = c);
const ua = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, dt || (dt = /* @__PURE__ */ e.createElement("path", {
    d: "M24 9L22 9 16 17.5713 10 9 8 9 15 19 8 29 10 29 16 20.4287 22 29 24 29 17 19 24 9zM8 3H24V5H8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ua.propTypes = c);
const ma = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, wt || (wt = /* @__PURE__ */ e.createElement("path", {
    d: "M24 9L22 9 16 17.5713 10 9 8 9 15 19 8 29 10 29 16 20.4287 22 29 24 29 17 19 24 9zM20 7c-1.7771 0-3.2314-.8726-4.5144-1.6425-1.1636-.6981-2.2627-1.3575-3.4856-1.3575-1.3977 0-2.449.8629-3.2927 1.707l-1.4146-1.4141c1.0674-1.0675 2.5669-2.293 4.7073-2.293 1.7771 0 3.2314.8726 4.5144 1.6425 1.1636.6981 2.2627 1.3575 3.4856 1.3575 1.3975 0 2.4487-.8629 3.293-1.7072l1.4141 1.4143c-1.0674 1.0675-2.5671 2.2928-4.707 2.2928z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ma.propTypes = c);
const va = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ut || (ut = /* @__PURE__ */ e.createElement("path", {
    d: "M30,29H2v-2h28v2ZM27,19H5v2h22v-2ZM24,11H8v2h16v-2ZM21,3h-10v2h10v-2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (va.propTypes = c);
const ga = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, mt || (mt = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M2 3H30V5H2zM13 21H5c-1.1028 0-2-.8972-2-2v-6c0-1.1028.8972-2 2-2h8c1.1028 0 2 .8972 2 2v6c0 1.1028-.8972 2-2 2zM5 13v6h8v-6H5zM27 21h-8c-1.1028 0-2-.8972-2-2v-6c0-1.1028.8972-2 2-2h8c1.1028 0 2 .8972 2 2v6c0 1.1028-.8972 2-2 2zm-8-8v6h8v-6h-8zM2 27H30V29H2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ga.propTypes = c);
const Ea = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, vt || (vt = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M27 2H29V30H27zM20 15h-8c-1.1028 0-2-.8972-2-2v-6c0-1.1028.8972-2 2-2h8c1.1028 0 2 .8972 2 2v6c0 1.1028-.8972 2-2 2zM12 7v6h8v-6h-8zM12 17h8c1.1028 0 2 .8972 2 2v6c0 1.1028-.8972 2-2 2h-8c-1.1028 0-2-.8972-2-2v-6c0-1.1028.8972-2 2-2zm8 8v-6h-8v6h8zM3 2H5V30H3z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ea.propTypes = c);
const Va = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, gt || (gt = /* @__PURE__ */ e.createElement("path", {
    d: "M4,5v22c0,1.1.9,2,2,2h4v-2h-4V5h4v-2h-4c-1.1,0-2,.9-2,2ZM26,3h-4v2h4v22h-4v2h4c1.1,0,2-.9,2-2V5c0-1.1-.9-2-2-2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Va.propTypes = c);
const Ha = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Et || (Et = /* @__PURE__ */ e.createElement("path", {
    d: "M4,2h4v2h-4v4h-2v-4c0-1.1046.8954-2,2-2ZM28,2h-4v2h4v4h2v-4c0-1.1046-.8954-2-2-2ZM4,28v-4h-2v4c0,1.1046.8954,2,2,2h4v-2h-4ZM28,24v4h-4v2h4c1.1046,0,2-.8954,2-2v-4h-2ZM16,16c0-3.3137-2.6863-6-6-6s-6,2.6863-6,6,2.6863,6,6,6,6-2.6863,6-6ZM22,12c-2.2056,0-4,1.7944-4,4s1.7944,4,4,4,4-1.7944,4-4-1.7944-4-4-4M22,10c3.3137,0,6,2.6863,6,6s-2.6863,6-6,6-6-2.6863-6-6,2.6863-6,6-6h0Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ha.propTypes = c);
const Ma = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Vt || (Vt = /* @__PURE__ */ e.createElement("path", {
    d: "M23,8h-2v-2h-2v2h-6v-2h-2v2h-2c-1.1047,0-2,.8953-2,2v12c0,1.1047.8953,2,2,2h14c1.1047,0,2-.8953,2-2v-12c0-1.1047-.8953-2-2-2ZM9,22v-7h14v7h-14ZM22.9999,13h-13.9999v-3h2v1h2v-1h6v1h2v-1h2v3ZM4,2h4v2h-4v4h-2v-4c0-1.1046.8954-2,2-2ZM30,4v4h-2v-4h-4v-2h4c1.1046,0,2,.8954,2,2ZM8,28v2h-4c-1.1046,0-2-.8954-2-2v-4h2v4h4ZM30,24v4c0,1.1046-.8954,2-2,2h-4v-2h4v-4h2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ma.propTypes = c);
const Aa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ht || (Ht = /* @__PURE__ */ e.createElement("path", {
    d: "M11,19v2h-6v-2h2v-5h-2v-2h2v-1h2v8h2ZM19,19h-4v-2h2c1.1025,0,2-.897,2-2v-2c0-1.103-.8975-2-2-2h-4v2h4v2h-2c-1.103,0-2,.897-2,2v4h6v-2ZM25,11h-4v2h4v2h-3v2h3v2h-4v2h4c1.1025,0,2-.8975,2-2v-6c0-1.103-.8975-2-2-2ZM2,4v4h2v-4h4v-2h-4c-1.1046,0-2,.8954-2,2ZM28,2h-4v2h4v4h2v-4c0-1.1046-.8954-2-2-2ZM4,28v-4h-2v4c0,1.1046.8954,2,2,2h4v-2h-4ZM28,24v4h-4v2h4c1.1046,0,2-.8954,2-2v-4h-2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Aa.propTypes = c);
const _a = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Mt || (Mt = /* @__PURE__ */ e.createElement("path", {
    d: "M10,7h3v2h-3v4c0,1.2002-.5425,2.2661-1.3823,3,.8398.7339,1.3823,1.7998,1.3823,3v4h3v2h-3c-1.103,0-2-.8975-2-2v-4c0-1.1025-.897-2-2-2v-2c1.103,0,2-.8975,2-2v-4c0-1.1025.897-2,2-2ZM24,13v-4c0-1.1025-.897-2-2-2h-3v2h3v4c0,1.2002.5425,2.2661,1.3823,3-.8398.7339-1.3823,1.7998-1.3823,3v4h-3v2h3c1.103,0,2-.8975,2-2v-4c0-1.1025.897-2,2-2v-2c-1.103,0-2-.8975-2-2ZM2,4v4h2v-4h4v-2h-4c-1.1046,0-2,.8954-2,2ZM28,2h-4v2h4v4h2v-4c0-1.1046-.8954-2-2-2ZM4,28v-4h-2v4c0,1.1046.8954,2,2,2h4v-2h-4ZM28,24v4h-4v2h4c1.1046,0,2-.8954,2-2v-4h-2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (_a.propTypes = c);
const xa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, At || (At = /* @__PURE__ */ e.createElement("path", {
    d: "M4,28h4v2h-4c-1.1046,0-2-.8954-2-2v-4h2v4ZM11,13v8h-5c-1.1046,0-2-.8954-2-2v-2c0-1.1046.8954-2,2-2h3v-2h-4v-2h4c1.1025,0,2,.897,2,2ZM9,17h-3v2h3v-2ZM4,4h4v-2h-4c-1.1046,0-2,.8954-2,2v4h2v-4ZM28,2h-4v2h4v4h2v-4c0-1.1046-.8954-2-2-2ZM28,28h-4v2h4c1.1046,0,2-.8954,2-2v-4h-2v4ZM28,21v-2h-4v-6h4v-2h-4c-1.1025,0-2,.897-2,2v6c0,1.1025.8975,2,2,2h4ZM20,13v6c0,1.1025-.8975,2-2,2h-5v-13h2v3h3c1.1025,0,2,.897,2,2ZM18,13h-3v6h3v-6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (xa.propTypes = c);
const Na = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, _t || (_t = /* @__PURE__ */ e.createElement("path", {
    d: "M2 28H30V30H2zM17.21 5.23l1.39.38 1 11.29 5.87 1.57A2 2 0 0127 20.62a1.88 1.88 0 01-1.37 1.52 2 2 0 01-1 0l-18.7-5a1.89 1.89 0 01-1.33-2.3L6.35 8.34l1.44.38L8.4 13.9l6 1.62L17.21 5.23m-1-2.2a1 1 0 00-.68.69L13 13.07l-2.81-.75L9.69 7.79A1 1 0 009 7L5.87 6.14a.94.94 0 00-.5 0 1 1 0 00-.68.68l-2 7.49a3.87 3.87 0 002.74 4.74l18.71 5A3.87 3.87 0 0029 21a4 4 0 00-3-4.42l-4.52-1.21L20.53 4.71a1 1 0 00-.72-.85L16.73 3a1.06 1.06 0 00-.5 0z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Na.propTypes = c);
const Ca = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, xt || (xt = /* @__PURE__ */ e.createElement("path", {
    d: "M13.71 12.29L7.42 6 14 6 14 4 4 4 4 13.99 6 14.01 6 7.41 12.29 13.7 13.71 12.29zM28 10H18v2H28V28H12V18H10V28a2 2 0 002 2H28a2 2 0 002-2V12A2 2 0 0028 10z"
  })), Nt || (Nt = /* @__PURE__ */ e.createElement("path", {
    d: "M19 25L21 25 21 18 24 18 24 16 16 16 16 18 19 18 19 25z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ca.propTypes = c);
const $o = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, Ct || (Ct = /* @__PURE__ */ e.createElement("path", {
    d: "M12.3 9.3L8.5 13.1 8.5 1 7.5 1 7.5 13.1 3.7 9.3 3 10 8 15 13 10z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, yt || (yt = /* @__PURE__ */ e.createElement("path", {
    d: "M24.59 16.59L17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z"
  })), r);
});
process.env.NODE_ENV !== "production" && ($o.propTypes = c);
const ya = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Tt || (Tt = /* @__PURE__ */ e.createElement("path", {
    d: "M22 26L22 24 9.41 24 26 7.41 24.59 6 8 22.59 8 10 6 10 6 26 22 26z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ya.propTypes = c);
const Ta = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, bt || (bt = /* @__PURE__ */ e.createElement("path", {
    d: "M10 26L10 24 22.59 24 6 7.41 7.41 6 24 22.59 24 10 26 10 26 26 10 26z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ta.propTypes = c);
const ba = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, Lt || (Lt = /* @__PURE__ */ e.createElement("path", {
    d: "M6.7 12.3L2.9 8.5 15 8.5 15 7.5 2.9 7.5 6.7 3.7 6 3 1 8 6 13z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, zt || (zt = /* @__PURE__ */ e.createElement("path", {
    d: "M14 26L15.41 24.59 7.83 17 28 17 28 15 7.83 15 15.41 7.41 14 6 4 16 14 26z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ba.propTypes = c);
const La = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, Zt || (Zt = /* @__PURE__ */ e.createElement("path", {
    d: "M9.3 3.7L13.1 7.5 1 7.5 1 8.5 13.1 8.5 9.3 12.3 10 13 15 8 10 3z"
  })), r) : t === 20 || t === "20" || t === "20px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    ...n
  }, Rt || (Rt = /* @__PURE__ */ e.createElement("path", {
    d: "M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"
  })), r) : t === 24 || t === "24" || t === "24px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    ...n
  }, $t || ($t = /* @__PURE__ */ e.createElement("path", {
    d: "M14 4L12.9 5.1 18.9 11.2 2 11.2 2 12.8 18.9 12.8 12.9 18.9 14 20 22 12z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Dt || (Dt = /* @__PURE__ */ e.createElement("path", {
    d: "M18 6L16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (La.propTypes = c);
const za = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, Bt || (Bt = /* @__PURE__ */ e.createElement("path", {
    d: "M3.7 6.7L7.5 2.9 7.5 15 8.5 15 8.5 2.9 12.3 6.7 13 6 8 1 3 6z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ot || (Ot = /* @__PURE__ */ e.createElement("path", {
    d: "M16 4L6 14 7.41 15.41 15 7.83 15 28 17 28 17 7.83 24.59 15.41 26 14 16 4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (za.propTypes = c);
var It, St, Wt, Ut, kt, Ft, Pt, jt, Gt, Kt, Qt, qt, Xt, Yt, Jt, er, tr, rr, nr, or, ar, lr, cr, ir, sr, hr, pr, fr, dr, wr, ur, mr, vr, gr, Er, Vr, Hr, Mr, Ar, _r, xr, Nr, Cr, yr, Tr, br, Lr, zr, Zr, Rr, $r, Dr, Br, Or, Ir, Sr, Wr, Ur, kr, Fr, Pr, jr, Gr, Kr, Qr, qr, Xr, Yr, Jr, e3, t3, r3, n3, o3, a3, l3, c3, i3, s3, h3, p3, f3, d3, w3, u3, m3, v3, g3, E3, V3, H3, M3, A3, _3, x3, N3, C3, y3, T3, b3, L3, z3, Z3, R3, $3, D3, B3, O3, I3, S3, W3, U3, k3, F3, P3, j3, G3, K3, Q3, q3, X3, Y3, J3, en, tn, rn, nn, on, an, ln, cn, sn, hn, pn, fn, dn, wn, un, mn, vn, gn, En, Vn, Hn, Mn, An, _n, xn, Nn, Cn, yn, Tn, bn, Ln, zn, Zn, Rn, $n, Dn, Bn, On, In, Sn, Wn, Un, kn, Fn, Pn, jn, Gn, Kn, Qn, qn, Xn, Yn, Jn, eo, to, ro, no, oo, ao, lo, co, io, so, ho, po, fo, wo, uo, mo, vo, go, Eo, Vo, Ho, Mo, Ao, _o, xo, No;
const Za = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, It || (It = /* @__PURE__ */ e.createElement("path", {
    d: "M26,21V20a1,1,0,0,1,2,0V30h2V20a3.0033,3.0033,0,0,0-3-3,2.964,2.964,0,0,0-1.4708.4014,2.9541,2.9541,0,0,0-4-1A2.9934,2.9934,0,0,0,19,15a2.96,2.96,0,0,0-1,.1846L18,10h0a3,3,0,0,0-6,0V21.1045L9.7651,19.5752l-.0008.001a2.999,2.999,0,0,0-3.881,4.55L12.3223,30l1.3479-1.478L7.2915,22.7036A.9908.9908,0,0,1,7,22a1.0005,1.0005,0,0,1,1.6-.8008L14,24.8955V10a1,1,0,0,1,2,0h0V21h2V18a1,1,0,0,1,2,0v3h2V19a1,1,0,0,1,2,0v2Z"
  })), St || (St = /* @__PURE__ */ e.createElement("path", {
    d: "M28,12H22V10h6V4H4v6H8v2H4a2.0021,2.0021,0,0,1-2-2V4A2.0021,2.0021,0,0,1,4,2H28a2.0021,2.0021,0,0,1,2,2v6A2.0021,2.0021,0,0,1,28,12Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Za.propTypes = c);
const Ra = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Wt || (Wt = /* @__PURE__ */ e.createElement("path", {
    d: "m24,18l-4.7788-6.4019c-.7979-1.0562-1.2212-2.302-1.2212-3.5981,0-3.3083,2.6914-6,6-6s6,2.6917,6,6c0,1.2961-.4233,2.542-1.2246,3.6028l-4.7754,6.3972Zm0-14c-2.2056,0-4,1.7944-4,4,0,.8577.2837,1.6865.8203,2.3972l3.1797,4.2595,3.1763-4.2549c.54-.7153.8237-1.5442.8237-2.4019,0-2.2056-1.7944-4-4-4Z"
  })), Ut || (Ut = /* @__PURE__ */ e.createElement("circle", {
    cx: "24",
    cy: "8",
    r: "2"
  })), kt || (kt = /* @__PURE__ */ e.createElement("path", {
    d: "m28,18v4H4V6h10v-2H4c-1.1045,0-2,.8955-2,2v16c0,1.1045.8955,2,2,2h8v4h-4v2h16v-2h-4v-4h8c1.1046,0,2-.8955,2-2v-4h-2Zm-10,10h-4v-4h4v4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ra.propTypes = c);
const $a = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ft || (Ft = /* @__PURE__ */ e.createElement("path", {
    d: "M11 21H17V23H11z"
  })), Pt || (Pt = /* @__PURE__ */ e.createElement("path", {
    d: "M24.2456,8,25.96,14H30V12H27.4688l-1.3-4.5488A2.0077,2.0077,0,0,0,24.2456,6H22.8972l-.7287-2.5488A2.0077,2.0077,0,0,0,20.2456,2H7.7544A2.0078,2.0078,0,0,0,5.8315,3.4507L4.5312,8H2v2H6.04L7.7544,4H20.2456l.5715,2H11.7544A2.008,2.008,0,0,0,9.8315,7.45L8.8171,11H7.7144a1.9981,1.9981,0,0,0-1.8916,1.3516L4.5715,16H2v2H4v7a2.0025,2.0025,0,0,0,2,2v3H8V27H20v3h2V27a2.0025,2.0025,0,0,0,2-2V18h2V16H23.4287l-1.251-3.6475A1.9988,1.9988,0,0,0,20.2856,11H10.897l.8574-3ZM22,19v2H20v2h2v2H6V23H8V21H6V19Zm-.3429-2H6.3428l1.3716-4H20.2856Z"
  })), r);
});
process.env.NODE_ENV !== "production" && ($a.propTypes = c);
const Da = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, jt || (jt = /* @__PURE__ */ e.createElement("path", {
    d: "M26 8L22 4 18 8 19.41 9.42 21 7.83 21 18 23 18 23 7.83 24.58 9.41 26 8zM12.59 22.58L11 24.17 11 14 9 14 9 24.17 7.42 22.59 6 24 10 28 14 24 12.59 22.58zM2 2H4V30H2zM28 2H30V30H28zM15 2H17V6H15zM15 10H17V14H15zM15 18H17V22H15zM15 26H17V30H15z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Da.propTypes = c);
const Ba = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Gt || (Gt = /* @__PURE__ */ e.createElement("path", {
    d: "M26 9.42L24.59 8 22.005 10.585 22 10.58 21.995 10.585 19.42 8.01 18 9.42 20.58 12 18 14.58 19.41 16 21.995 13.415 22 13.42 22.005 13.415 24.58 15.99 26 14.58 23.42 12 26 9.42zM14 17.42L12.59 16 10.005 18.585 10 18.58 9.995 18.585 7.42 16.01 6 17.42 8.58 20 6 22.58 7.41 24 9.995 21.415 10 21.42 10.005 21.415 12.58 23.99 14 22.58 11.42 20 14 17.42zM2 2H4V30H2zM28 2H30V30H28zM15 2H17V6H15zM15 10H17V14H15zM15 18H17V22H15zM15 26H17V30H15z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ba.propTypes = c);
const Oa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Kt || (Kt = /* @__PURE__ */ e.createElement("path", {
    d: "M2 28H30V30H2z"
  })), Qt || (Qt = /* @__PURE__ */ e.createElement("path", {
    d: "M11.314 11.514H17.314V13.514H11.314z",
    transform: "rotate(-45 14.314 12.514)"
  })), qt || (qt = /* @__PURE__ */ e.createElement("path", {
    d: "M12.0815,23.4329l4.1168,2.3176a2.009,2.009,0,0,0,2.3853-.3344l8.8326-8.8326a2.0088,2.0088,0,0,0,.334-2.3856l-2.2977-4.136,1.79-1.79L25.8283,6.8577,24.4141,8.2719l-4.95-4.95a2.0026,2.0026,0,0,0-2.8285,0L14.5146,1.2008,13.1,2.615l2.1213,2.1214L6.7364,13.2216,4.6151,11.1,3.2009,12.5145l2.1213,2.1213a2.0025,2.0025,0,0,0,0,2.8285l4.95,4.95L8.8577,23.8282l1.4143,1.4142Zm13.92-8.2636-8.8328,8.8328-4.5456-2.5255L23.4767,10.6235ZM9.5649,18.8785l1.4142-1.4142L9.5649,16.05,8.1506,17.4643,6.7364,16.05,18.05,4.7364l1.4143,1.4142L18.05,7.5648,19.4644,8.979l1.4142-1.4142L22.2928,8.979,10.9791,20.2927Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Oa.propTypes = c);
const Ia = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Xt || (Xt = /* @__PURE__ */ e.createElement("path", {
    d: "M2 24H4V30H2zM28 2H30V30H28zM15 2H17V6H15zM15 10H17V14H15zM15 18H17V22H15zM15 26H17V30H15zM6 12A3.8978 3.8978 0 012 8.223a3.9017 3.9017 0 01.6533-2.0639L5.17 2.4141a1.0381 1.0381 0 011.6592 0L9.3154 6.11A3.9693 3.9693 0 0110 8.223 3.8978 3.8978 0 016 12zm0-7.2368L4.3438 7.2257A1.89 1.89 0 004 8.223a1.9007 1.9007 0 002 1.7775A1.9007 1.9007 0 008 8.223a1.98 1.98 0 00-.375-1.0466zM11 11.7627L9.3438 14.2253A1.89 1.89 0 009 15.2226 1.9007 1.9007 0 0011 17a1.9007 1.9007 0 002-1.7774 1.98 1.98 0 00-.375-1.0467zM6 15.7627L4.3438 18.2253A1.89 1.89 0 004 19.2226 1.9007 1.9007 0 006 21a1.9007 1.9007 0 002-1.7774 1.98 1.98 0 00-.375-1.0467z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ia.propTypes = c);
const Sa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Yt || (Yt = /* @__PURE__ */ e.createElement("path", {
    d: "M24.7957,28,18.9746,2.7754A1,1,0,0,0,18,2H14a1,1,0,0,0-.9746.7754L7.2043,28H4v2H28V28ZM19.9736,16H12.0264l.9229-4h6.1014Zm.4616,2,.923,4H10.6418l.923-4Zm-5.64-14h2.4092l1.3845,6H13.4109ZM10.18,24H21.82l.923,4H9.2573Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Sa.propTypes = c);
const Wa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Jt || (Jt = /* @__PURE__ */ e.createElement("path", {
    d: "M21,3H11A5.0057,5.0057,0,0,0,6,8V20a4.99,4.99,0,0,0,3.582,4.77L7.7693,29H9.9451l1.7143-4h8.6812l1.7143,4h2.1758L22.418,24.77A4.99,4.99,0,0,0,26,20V8A5.0057,5.0057,0,0,0,21,3ZM11,5H21a2.9948,2.9948,0,0,1,2.8157,2H8.1843A2.9948,2.9948,0,0,1,11,5ZM24,19H21v2h2.8157A2.9948,2.9948,0,0,1,21,23H11a2.9948,2.9948,0,0,1-2.8157-2H11V19H8V17H24Zm0-4H8V9H24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Wa.propTypes = c);
const Ua = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, er || (er = /* @__PURE__ */ e.createElement("path", {
    d: "M27.303 2a2.6613 2.6613 0 00-1.9079.8059l-.3932.4053-.397-.4053a2.6612 2.6612 0 00-3.8157 0 2.7991 2.7991 0 000 3.8963L25.0019 11l4.2089-4.2978a2.7991 2.7991 0 000-3.8963A2.6613 2.6613 0 0027.303 2zM22 13v3H6V10h9V8H6.1843A2.9948 2.9948 0 019 6h6V4H9A5.0057 5.0057 0 004 9V21a4.99 4.99 0 003.582 4.77L5.7693 30H7.9451l1.7143-4h8.6812l1.7143 4h2.1758L20.418 25.77A4.99 4.99 0 0024 21V13zm0 7H19v2h2.8157A2.9948 2.9948 0 0119 24H9a2.9948 2.9948 0 01-2.8157-2H9V20H6V18H22z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ua.propTypes = c);
const ka = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, tr || (tr = /* @__PURE__ */ e.createElement("path", {
    d: "M30 25L2 25 2 27 4 27 4 29 6 29 6 27 11 27 11 29 13 29 13 27 18 27 18 29 20 29 20 27 25 27 25 29 27 29 27 27 30 27 30 25zM8 16H2V14H8V12H2V10H8a2.0021 2.0021 0 012 2v2A2.0021 2.0021 0 018 16z"
  })), rr || (rr = /* @__PURE__ */ e.createElement("path", {
    d: "M28.55,14.2305,19.97,6.3657A8.9775,8.9775,0,0,0,13.8882,4H2V6H12v4a2.0023,2.0023,0,0,0,2,2h9.1565l4.0417,3.7051A2.4723,2.4723,0,0,1,25.5273,20H2v2H25.5273a4.4726,4.4726,0,0,0,3.0225-7.77ZM14,10V6.0054A6.9774,6.9774,0,0,1,18.6182,7.84L20.9746,10Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ka.propTypes = c);
const Fa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, nr || (nr = /* @__PURE__ */ e.createElement("path", {
    d: "M30 25L2 25 2 27 4 27 4 29 6 29 6 27 11 27 11 29 13 29 13 27 18 27 18 29 20 29 20 27 25 27 25 29 27 29 27 27 30 27 30 25zM29.7144 16.59L18.1494 8.64A14.9327 14.9327 0 009.6519 6H2V8H9.6519a12.9459 12.9459 0 017.3647 2.2871L18.0532 11H9v2H20.9624l7.6187 5.2378A.966.966 0 0128.0342 20H2v2H28.0342a2.9661 2.9661 0 001.68-5.41z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Fa.propTypes = c);
const Pa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, or || (or = /* @__PURE__ */ e.createElement("path", {
    d: "M29.1257,7.125a1.125,1.125,0,1,1,0-2.25h.875V2h-12V4.875h.875a1.125,1.125,0,0,1,0,2.25h-.875V10h12V7.125Z"
  })), ar || (ar = /* @__PURE__ */ e.createElement("path", {
    d: "M22.0007,13v3h-16V10h9V8H6.185A2.9948,2.9948,0,0,1,9.0007,6h6V4h-6a5.0057,5.0057,0,0,0-5,5V21a4.99,4.99,0,0,0,3.582,4.77L5.77,30H7.9458L9.66,26h8.6812l1.7143,4h2.1758l-1.8127-4.23A4.99,4.99,0,0,0,24.0007,21V13Zm0,7h-3v2h2.8157a2.9948,2.9948,0,0,1-2.8157,2h-10A2.9948,2.9948,0,0,1,6.185,22H9.0007V20h-3V18h16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Pa.propTypes = c);
const ja = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, lr || (lr = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M25.496 10.088L22.874 7.466 22.874 3 25.124 3 25.124 6.534 27.088 8.498 25.496 10.088z"
  })), cr || (cr = /* @__PURE__ */ e.createElement("path", {
    d: "M24,1a6,6,0,1,0,6,6A6.0066,6.0066,0,0,0,24,1Zm1.4971,9.0884L22.875,7.4658V3h2.25V6.5342l1.9639,1.9634Z"
  })), ir || (ir = /* @__PURE__ */ e.createElement("path", {
    d: "M6,16V10h9V8H6.1843A2.9948,2.9948,0,0,1,9,6h6V4H9A5.0057,5.0057,0,0,0,4,9V21a4.99,4.99,0,0,0,3.582,4.77L5.7693,30H7.9451l1.7143-4h8.6812l1.7143,4h2.1758L20.418,25.77A4.99,4.99,0,0,0,24,21V16Zm16,4H19v2h2.8157A2.9948,2.9948,0,0,1,19,24H9a2.9948,2.9948,0,0,1-2.8157-2H9V20H6V18H22Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ja.propTypes = c);
const Ga = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, sr || (sr = /* @__PURE__ */ e.createElement("path", {
    d: "M21,6H17V4h6V2H9V4h6V6H11a5.0057,5.0057,0,0,0-5,5V22a4.99,4.99,0,0,0,3.582,4.77L8.1978,30h2.1757l1.2859-3h8.6812l1.2859,3h2.1757L22.418,26.77A4.99,4.99,0,0,0,26,22V11A5.0057,5.0057,0,0,0,21,6ZM11,8H21a2.9948,2.9948,0,0,1,2.8157,2H8.1843A2.9948,2.9948,0,0,1,11,8ZM24,21H21v2h2.8157A2.9948,2.9948,0,0,1,21,25H11a2.9948,2.9948,0,0,1-2.8157-2H11V21H8V19H24Zm0-4H8V12H24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ga.propTypes = c);
const Ka = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, hr || (hr = /* @__PURE__ */ e.createElement("path", {
    d: "M23 20h-2c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v4C25 19.1 24.1 20 23 20zM21 14v4h2v-4H21zM15 12H17V20H15z"
  })), pr || (pr = /* @__PURE__ */ e.createElement("path", {
    d: "M11 20H9c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v4C13 19.1 12.1 20 11 20zM9 14v4h2v-4H9zM16 2v2c6.6 0 12 5.4 12 12s-5.4 12-12 12v2c7.7 0 14-6.3 14-14S23.7 2 16 2zM8.2 25.1L7 26.7c1.2 1 2.6 1.9 4.2 2.4l.7-1.9C10.5 26.7 9.3 26 8.2 25.1zM4.2 18l-2 .4C2.5 20 3.1 21.6 3.9 23l1.7-1C4.9 20.8 4.4 19.4 4.2 18zM5.6 10L3.9 9c-.8 1.4-1.4 3-1.6 4.6l2 .3C4.4 12.5 4.9 11.2 5.6 10zM11.8 4.8l-.7-1.9C9.6 3.5 8.2 4.3 7 5.3l1.3 1.5C9.3 6 10.5 5.3 11.8 4.8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ka.propTypes = c);
const Qa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, fr || (fr = /* @__PURE__ */ e.createElement("path", {
    d: "M11.9005,4.7366c-1.325.4839-2.5369,1.2001-3.5983,2.0895l-1.2829-1.5289c1.2383-1.0377,2.6521-1.8732,4.1979-2.4378l.6832,1.8772ZM3.9009,9.0146c-.8087,1.3865-1.3839,2.9225-1.6776,4.5562l1.9838.3498c.2518-1.3993.7294-2.7205,1.4221-3.9081l-1.7283-.9979ZM4.1932,18.0818l-1.9678.347c.2878,1.6357.8603,3.1745,1.6635,4.5635l1.7302-.9989c-.6884-1.1906-1.1791-2.5095-1.4258-3.9116ZM8.3065,25.1687l-1.293,1.541c1.2365,1.042,2.6556,1.8721,4.2007,2.4393l.6859-1.8845c-1.3211-.489-2.5342-1.203-3.5936-2.0958ZM29.7747,13.5712c-.2878-1.6357-.8603-3.1745-1.6635-4.5635-.8185-1.4156-1.8817-2.67-3.1246-3.7173-1.2365-1.042-2.6557-1.872-4.2007-2.4392-1.493-.5482-3.1035-.8511-4.7858-.8511v2c1.4429,0,2.8219.2625,4.0999.7355,1.321.489,2.5342,1.2031,3.5934,2.0958.4588.3867.8842.8102,1.2835,1.2573.5247.5933.9986,1.2321,1.3982,1.9213.6902,1.1904,1.1827,2.5085,1.4306,3.9084.12.6777.1943,1.3708.1943,2.0817,0,.7123-.0859,1.4019-.2086,2.0792-.2529,1.397-.7322,2.7173-1.4267,3.9049-.7058,1.2069-1.6058,2.2883-2.6725,3.1831-1.061.8899-2.2716,1.6071-3.5941,2.0923-1.2819.4703-2.6584.7405-4.0981.7405v2c1.6817,0,3.2878-.3134,4.7828-.8594,1.5458-.5646,2.9597-1.4001,4.1979-2.4378,1.2458-1.044,2.2957-2.3068,3.1183-3.7174.8087-1.3865,1.3839-2.9225,1.6776-4.5562.1418-.7889.2234-1.5988.2234-2.4292,0-.8298-.0862-1.6384-.2253-2.4288ZM12.7233,14.1082l.9186-.9185.7781-.778-1.4195-1.4117-.6503.6503-1.4218,1.4217-1.729,1.7289-1.1994,1.1993,1.1991,1.1989,1.7292,1.729,1.4218,1.4216.6504.6503,1.4195-1.4118-.7781-.7779-.9186-.9185-1.1173-1.1171-.7748-.7745.7751-.775,1.1171-1.1171ZM19.2768,17.8918l-.9186.9185-.7781.7779,1.4195,1.4118.6504-.6503,1.4218-1.4216,1.7292-1.729,1.1991-1.1989-1.1994-1.1993-1.7291-1.7289-1.4217-1.4217-.6503-.6503-1.4195,1.4117.7781.778.9186.9185,1.1171,1.1171.7751.775-.7748.7745-1.1173,1.1171Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Qa.propTypes = c);
const qa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, dr || (dr = /* @__PURE__ */ e.createElement("path", {
    d: "M23,17v-2h-2.1c-0.1-0.6-0.4-1.2-0.7-1.8l1.5-1.5l-1.4-1.4l-1.5,1.5c-0.5-0.3-1.1-0.6-1.8-0.7V9h-2v2.1 c-0.6,0.1-1.2,0.4-1.8,0.7l-1.5-1.5l-1.4,1.4l1.5,1.5c-0.3,0.5-0.6,1.1-0.7,1.8H9v2h2.1c0.1,0.6,0.4,1.2,0.7,1.8l-1.5,1.5l1.4,1.4 l1.5-1.5c0.5,0.3,1.1,0.6,1.8,0.7V23h2v-2.1c0.6-0.1,1.2-0.4,1.8-0.7l1.5,1.5l1.4-1.4l-1.5-1.5c0.3-0.5,0.6-1.1,0.7-1.8H23z M16,19 c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S17.7,19,16,19z"
  })), wr || (wr = /* @__PURE__ */ e.createElement("path", {
    d: "M16 2v2c6.6 0 12 5.4 12 12s-5.4 12-12 12v2c7.7 0 14-6.3 14-14S23.7 2 16 2zM8.2 25.1L7 26.7c1.2 1 2.6 1.9 4.2 2.4l.7-1.9C10.5 26.7 9.3 26 8.2 25.1zM4.2 18l-2 .4C2.5 20 3.1 21.6 3.9 23l1.7-1C4.9 20.8 4.4 19.4 4.2 18zM5.6 10L3.9 9c-.8 1.4-1.4 3-1.6 4.6l2 .3C4.4 12.5 4.9 11.2 5.6 10zM11.8 4.8l-.7-1.9C9.6 3.5 8.2 4.3 7 5.3l1.3 1.5C9.3 6 10.5 5.3 11.8 4.8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (qa.propTypes = c);
const Xa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ur || (ur = /* @__PURE__ */ e.createElement("path", {
    d: "M10 19H18V21H10zM10 15H22V17H10zM10 11H22V13H10z"
  })), mr || (mr = /* @__PURE__ */ e.createElement("path", {
    d: "M16 2v2c6.6 0 12 5.4 12 12s-5.4 12-12 12v2c7.7 0 14-6.3 14-14S23.7 2 16 2zM8.2 25.1L7 26.7c1.2 1 2.6 1.9 4.2 2.4l.7-1.9C10.5 26.7 9.3 26 8.2 25.1zM4.2 18l-2 .4C2.5 20 3.1 21.6 3.9 23l1.7-1C4.9 20.8 4.4 19.4 4.2 18zM5.6 10L3.9 9c-.8 1.4-1.4 3-1.6 4.6l2 .3C4.4 12.5 4.9 11.2 5.6 10zM11.8 4.8l-.7-1.9C9.6 3.5 8.2 4.3 7 5.3l1.3 1.5C9.3 6 10.5 5.3 11.8 4.8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Xa.propTypes = c);
const Ya = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, vr || (vr = /* @__PURE__ */ e.createElement("path", {
    d: "M22,2V4h4.5859l-6.4016,6.4014a6.9474,6.9474,0,0,0-8.3686,0L10.4143,9,13,6.4141,11.5857,5,9,7.5859,5.4141,4H10V2H2v8H4V5.4141L7.5859,9,5,11.5854,6.4143,13,9,10.4141l1.4014,1.4013A6.9785,6.9785,0,0,0,15,22.92V25H11v2h4v3h2V27h4V25H17V22.92a6.9785,6.9785,0,0,0,4.5984-11.1045L28,5.4141V10h2V2ZM16,21a5,5,0,1,1,5-5A5.0059,5.0059,0,0,1,16,21Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ya.propTypes = c);
const Ja = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, gr || (gr = /* @__PURE__ */ e.createElement("path", {
    d: "M27.85 29H30L24 14H21.65l-6 15H17.8l1.6-4h6.85zM20.2 23l2.62-6.56L25.45 23zM18 7V5H11V2H9V5H2V7H12.74a14.71 14.71 0 01-3.19 6.18A13.5 13.5 0 017.26 9H5.16a16.47 16.47 0 003 5.58A16.84 16.84 0 013 18l.75 1.86A18.47 18.47 0 009.53 16a16.92 16.92 0 005.76 3.84L16 18a14.48 14.48 0 01-5.12-3.37A17.64 17.64 0 0014.8 7z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ja.propTypes = c);
const e6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Er || (Er = /* @__PURE__ */ e.createElement("path", {
    d: "M10.57 30l.9333-2h8.9928l.9333 2h2.2072L17 15.7778V11H15v4.7778L8.3631 30zM16 18.3647L17.6965 22h-3.393zM13.37 24h5.26l.9333 2H12.4369zM10.7832 9.3325a7.0007 7.0007 0 0110.4341 0l-1.49 1.334a5 5 0 00-7.4537 0z"
  })), Vr || (Vr = /* @__PURE__ */ e.createElement("path", {
    d: "M7.1992,6.3994a11.0019,11.0019,0,0,1,17.6006,0L23.2,7.6a9.0009,9.0009,0,0,0-14.4014,0Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (e6.propTypes = c);
const t6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Hr || (Hr = /* @__PURE__ */ e.createElement("path", {
    d: "M19 26H14V24h5a5.0055 5.0055 0 005-5V14h2v5A7.0078 7.0078 0 0119 26zM8 30H4a2.0023 2.0023 0 01-2-2V14a2.0023 2.0023 0 012-2H8a2.0023 2.0023 0 012 2V28A2.0023 2.0023 0 018 30zM4 14V28H8V14zM28 10H14a2.0023 2.0023 0 01-2-2V4a2.0023 2.0023 0 012-2H28a2.0023 2.0023 0 012 2V8A2.0023 2.0023 0 0128 10zM14 4V8H28V4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (t6.propTypes = c);
const r6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Mr || (Mr = /* @__PURE__ */ e.createElement("path", {
    d: "M12 12H14V24H12zM18 12H20V24H18z"
  })), Ar || (Ar = /* @__PURE__ */ e.createElement("path", {
    d: "M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"
  })), r);
});
process.env.NODE_ENV !== "production" && (r6.propTypes = c);
const n6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, _r || (_r = /* @__PURE__ */ e.createElement("path", {
    d: "M12,30H9V28h3V15.5664L8.4854,13.4575l1.0292-1.7148,3.5147,2.1084A2.0115,2.0115,0,0,1,14,15.5664V28A2.0023,2.0023,0,0,1,12,30Z"
  })), xr || (xr = /* @__PURE__ */ e.createElement("path", {
    d: "M22,30H19a2.0024,2.0024,0,0,1-2-2V17h6a4.0008,4.0008,0,0,0,3.981-4.396A4.1489,4.1489,0,0,0,22.7853,9H21.2016L21.025,8.221C20.452,5.6961,18.0308,4,15,4A6.02,6.02,0,0,0,9.5585,7.4859L9.25,8.1531l-.863-.1143A2.771,2.771,0,0,0,8,8a4,4,0,1,0,0,8v2A6,6,0,1,1,8,6c.0264,0,.0525,0,.0786.001A8.0271,8.0271,0,0,1,15,2c3.6788,0,6.6923,1.9776,7.7516,5h.0337a6.1641,6.1641,0,0,1,6.1872,5.4141A6.0011,6.0011,0,0,1,23,19l-4,0v9h3Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (n6.propTypes = c);
const o6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Nr || (Nr = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M23.75,10h-1.5V6h1.5ZM23,11a1,1,0,1,0,1,1A1,1,0,0,0,23,11Z",
    "data-icon-path": "inner-path"
  })), Cr || (Cr = /* @__PURE__ */ e.createElement("path", {
    d: "M29.9115 13.9355L23.6284 2.3706a.7181.7181 0 00-1.2568 0L16.0885 13.9355A.72.72 0 0016.72 15H29.28A.72.72 0 0029.9115 13.9355zM22.25 6h1.5v4h-1.5zM23 13a1 1 0 111-1A1 1 0 0123 13zM26 19V17H17V28a2.0027 2.0027 0 002 2h3V28H19V19zM12 30H9V28h3V15.5664L8.4854 13.4575l1.0292-1.7148 3.5147 2.1084A2.0115 2.0115 0 0114 15.5664V28A2.0024 2.0024 0 0112 30z"
  })), yr || (yr = /* @__PURE__ */ e.createElement("path", {
    d: "M18.6638,5.0059l.96-1.7671A8.9324,8.9324,0,0,0,15,2,8.0275,8.0275,0,0,0,8.0786,6.001C8.0525,6,8.0264,6,8,6A6,6,0,0,0,8,18V16A4,4,0,0,1,8,8a2.7009,2.7009,0,0,1,.387.0391l.863.1142.3086-.6675A6.0192,6.0192,0,0,1,15,4,6.8916,6.8916,0,0,1,18.6638,5.0059Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (o6.propTypes = c);
const a6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Tr || (Tr = /* @__PURE__ */ e.createElement("path", {
    d: "M30,20V12H22v3H17V7a2,2,0,0,0-2-2H10V2H2v8h8V7h5V25a2,2,0,0,0,2,2h5v3h8V22H22v3H17V17h5v3ZM8,8H4V4H8ZM24,24h4v4H24Zm0-10h4v4H24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (a6.propTypes = c);
const l6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, br || (br = /* @__PURE__ */ e.createElement("path", {
    d: "M23,9h6a2,2,0,0,0,2-2V3a2,2,0,0,0-2-2H23a2,2,0,0,0-2,2V4H11V3A2,2,0,0,0,9,1H3A2,2,0,0,0,1,3V7A2,2,0,0,0,3,9H9a2,2,0,0,0,2-2V6h4V26a2.0023,2.0023,0,0,0,2,2h4v1a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V25a2,2,0,0,0-2-2H23a2,2,0,0,0-2,2v1H17V17h4v1a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2H23a2,2,0,0,0-2,2v1H17V6h4V7A2,2,0,0,0,23,9Zm0-6h6V7H23ZM9,7H3V3H9ZM23,25h6v4H23Zm0-11h6v4H23Z",
    transform: "translate(0 .005)"
  })), r);
});
process.env.NODE_ENV !== "production" && (l6.propTypes = c);
const c6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Lr || (Lr = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m2.1245,4.4883l13.0195,23.9868c.1865.3438.5212.5249.856.5249.3345,0,.6689-.1812.8555-.5249L29.875,4.4883c.0862-.1582.1255-.3257.125-.4883-.0017-.5229-.4114-1-.9805-1H2.9802c-.5691,0-.9788.4771-.9802,1-.0005.1626.0386.3301.1245.4883Zm25.1985.5117l-11.323,20.8677L4.677,5h22.646Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (c6.propTypes = c);
const i6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, zr || (zr = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m29.0194,3c.5692,0,.979.4772.9806,1,.0005.1628-.0388.3299-.1249.4885l-13.0196,23.9867c-.1865.3435-.521.5248-.8555.5248s-.6694-.1812-.8559-.5248L2.1246,4.4885c-.0861-.1586-.1251-.3257-.1246-.4885.0016-.5228.4111-1,.9803-1h26.0391Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (i6.propTypes = c);
const s6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Zr || (Zr = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m27.5117,2.1245L3.5249,15.144c-.3438.1865-.5249.5212-.5249.856,0,.3345.1812.6689.5249.8555l23.9868,13.0195c.1582.0862.3257.1255.4883.125.5229-.0017,1-.4114,1-.9805V2.9802c0-.5691-.4771-.9788-1-.9802-.1626-.0005-.3301.0386-.4883.1245Zm-.5117,25.1985L6.1323,16,27,4.677v22.646Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (s6.propTypes = c);
const h6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Rr || (Rr = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m29,29.0194c0,.5692-.4772.979-1,.9806-.1628.0005-.3299-.0388-.4885-.1249L3.5248,16.8556c-.3435-.1865-.5248-.521-.5248-.8555s.1812-.6694.5248-.8559L27.5115,2.1246c.1586-.0861.3257-.1251.4885-.1246.5228.0016,1,.4111,1,.9803v26.0391Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (h6.propTypes = c);
const p6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, $r || ($r = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m29.8755,27.5117L16.856,3.5249c-.1865-.3438-.5212-.5249-.856-.5249-.3345,0-.6689.1812-.8555.5249L2.125,27.5117c-.0862.1582-.1255.3257-.125.4883.0017.5229.4114,1,.9805,1h26.0393c.5691,0,.9788-.4771.9802-1,.0005-.1626-.0386-.3301-.1245-.4883Zm-25.1985-.5117L16,6.1323l11.323,20.8677H4.677Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (p6.propTypes = c);
const f6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Dr || (Dr = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m4.4883,29.8755l23.9868-13.0195c.3438-.1865.5249-.5212.5249-.856,0-.3345-.1812-.6689-.5249-.8555L4.4883,2.125c-.1582-.0862-.3257-.1255-.4883-.125-.5229.0017-1,.4114-1,.9805v26.0393c0,.5691.4771.9788,1,.9802.1626.0005.3301-.0386.4883-.1245Zm.5117-25.1985l20.8677,11.323L5,27.323V4.677Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (f6.propTypes = c);
const d6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Br || (Br = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m3,2.9806c0-.5692.4772-.979,1-.9806.1628-.0005.3299.0388.4885.1249l23.9867,13.0196c.3435.1865.5248.521.5248.8555s-.1812.6694-.5248.8559L4.4885,29.8754c-.1586.0861-.3257.1251-.4885.1246-.5228-.0016-1-.4111-1-.9803V2.9806Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (d6.propTypes = c);
const w6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Or || (Or = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m2.9806,29c-.5692,0-.979-.4772-.9806-1-.0005-.1628.0388-.3299.1249-.4885L15.1444,3.5248c.1865-.3435.521-.5248.8555-.5248s.6694.1812.8559.5248l13.0195,23.9867c.0861.1586.1251.3257.1246.4885-.0016.5228-.4111,1-.9803,1H2.9806Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (w6.propTypes = c);
const u6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ir || (Ir = /* @__PURE__ */ e.createElement("path", {
    d: "M2,19l1.4,1.4,5.6-5.6,5.6,5.6,1.4-1.4-7-7-7,7ZM28.6,11.6l-5.6,5.6-5.6-5.6-1.4,1.4,7,7,7-7-1.4-1.4ZM9,22c-1.1046,0-2,.8954-2,2s.8954,2,2,2,2-.8954,2-2-.8954-2-2-2ZM23,10c1.1046,0,2-.8954,2-2s-.8954-2-2-2-2,.8954-2,2,.8954,2,2,2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (u6.propTypes = c);
const m6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Sr || (Sr = /* @__PURE__ */ e.createElement("path", {
    d: "M26,7H24V6a2.0023,2.0023,0,0,0-2-2H10A2.0023,2.0023,0,0,0,8,6V7H6A2.0023,2.0023,0,0,0,4,9v3a4.0045,4.0045,0,0,0,4,4h.322A8.1689,8.1689,0,0,0,15,21.9341V26H10v2H22V26H17V21.9311A7.9661,7.9661,0,0,0,23.74,16H24a4.0045,4.0045,0,0,0,4-4V9A2.0023,2.0023,0,0,0,26,7ZM8,14a2.0023,2.0023,0,0,1-2-2V9H8Zm14,0a6,6,0,0,1-6.1855,5.9971A6.1991,6.1991,0,0,1,10,13.7065V6H22Zm4-2a2.0023,2.0023,0,0,1-2,2V9h2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (m6.propTypes = c);
const v6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Wr || (Wr = /* @__PURE__ */ e.createElement("path", {
    d: "M26,7H24V6a2.0023,2.0023,0,0,0-2-2H10A2.0023,2.0023,0,0,0,8,6V7H6A2.0023,2.0023,0,0,0,4,9v3a4.0045,4.0045,0,0,0,4,4h.322A8.1689,8.1689,0,0,0,15,21.9341V26H10v2H22V26H17V21.9311A7.9661,7.9661,0,0,0,23.74,16H24a4.0045,4.0045,0,0,0,4-4V9A2.0023,2.0023,0,0,0,26,7ZM8,14a2.0023,2.0023,0,0,1-2-2V9H8Zm18-2a2.0023,2.0023,0,0,1-2,2V9h2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (v6.propTypes = c);
const g6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ur || (Ur = /* @__PURE__ */ e.createElement("path", {
    d: "M16,21a5,5,0,1,1,5-5A5.0057,5.0057,0,0,1,16,21Zm0-8a3,3,0,1,0,3,3A3.0033,3.0033,0,0,0,16,13Z"
  })), kr || (kr = /* @__PURE__ */ e.createElement("path", {
    d: "M22.6521,4.1821l-2.177,2.5142L19.0713,8.3174,20.7864,9.605A7.9361,7.9361,0,0,1,23.9963,16l.0008.0576.0017.0415c.018.4317.2412,10.1113-14.6538,11.7222l2.18-2.5176,1.4039-1.6211L11.2139,22.395A7.9361,7.9361,0,0,1,8.0037,16l-.0008-.0576-.0017-.0415C7.9832,15.47,7.7605,5.8071,22.6521,4.1821M24.9978,2c-.0164,0-.0327,0-.0493.001C5.2532,2.9146,6.0037,16,6.0037,16a9.975,9.975,0,0,0,4.0095,7.9946L6.2368,28.3555A1.0044,1.0044,0,0,0,7.0022,30c.0164,0,.0327,0,.0493-.001C26.7468,29.0854,25.9963,16,25.9963,16a9.9756,9.9756,0,0,0-4.0092-7.9946l3.7761-4.3609A1.0044,1.0044,0,0,0,24.9978,2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (g6.propTypes = c);
const E6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Fr || (Fr = /* @__PURE__ */ e.createElement("path", {
    d: "M10,17a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,10,17Zm0-6a2,2,0,1,0,2,2A2.0021,2.0021,0,0,0,10,11Z"
  })), Pr || (Pr = /* @__PURE__ */ e.createElement("path", {
    d: "M14.8188 6.65c.1163-.1211 1.8643-1.919 2.8882-2.9434A1 1 0 0017 2C11.812 2 2 4.2988 2 13a7.8938 7.8938 0 003.1812 6.35c-.1612.1675-1.9507 2.0054-2.8882 2.9429A1 1 0 003 24c5.188 0 15-2.2988 15-11A7.8927 7.8927 0 0014.8188 6.65zM9.7065 20.793a20.94 20.94 0 01-4.0932.9853c.1621-.166 2.7685-2.9053 2.7685-2.9053l-1.1743-.6074A5.9064 5.9064 0 014 13c0-3.667 2.1177-6.2886 6.2935-7.793a20.94 20.94 0 014.0932-.9853c-.227.2324-2.769 2.9057-2.769 2.9057l1.1748.607A5.9075 5.9075 0 0116 13C16 16.667 13.8823 19.2886 9.7065 20.793zM30 17l-5-5-5 5 1.4126 1.4155L24 15.8325V19a9.01 9.01 0 01-9 9H12v2h3A11.0125 11.0125 0 0026 19V15.8325l2.5859 2.5816z"
  })), r);
});
process.env.NODE_ENV !== "production" && (E6.propTypes = c);
const V6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, jr || (jr = /* @__PURE__ */ e.createElement("path", {
    d: "M16,21a5,5,0,1,1,5-5A5.0057,5.0057,0,0,1,16,21Zm0-8a3,3,0,1,0,3,3A3.0033,3.0033,0,0,0,16,13Z"
  })), Gr || (Gr = /* @__PURE__ */ e.createElement("path", {
    d: "M26.86,12.4805h0a12.9277,12.9277,0,0,0-4.8575-4.9991q.2044-.213.4424-.4589h0c.82-.8482,1.93-1.9825,3.2622-3.3155A1,1,0,0,0,25,2c-.354,0-8.7363.0488-14.269,4.3018h0A12.15,12.15,0,0,0,7.481,9.998c-.1416-.1367-.295-.2841-.4585-.4423C6.1743,8.7349,5.04,7.6255,3.707,6.293A1,1,0,0,0,2,7c0,.3594.05,8.874,4.4058,14.4023a12.1023,12.1023,0,0,0,3.5918,3.1163c-.21.2177-.4346.4516-.6563.68h0c-.7954.8208-1.8286,1.8745-3.0483,3.0943A1,1,0,0,0,7,30c.2856,0,7.061-.0352,12.459-3.1055a12.9618,12.9618,0,0,0,5.06-4.8925q.3062.2937.68.6567c.82.7954,1.8745,1.8286,3.0943,3.0483A1,1,0,0,0,30,25C30,24.7119,29.9644,17.8877,26.86,12.4805Zm-3.03,6.1074-.5469,1.3672A10.5415,10.5415,0,0,1,18.47,25.1562,24.3514,24.3514,0,0,1,9.584,27.8135c.4409-.4492,3.8281-3.9824,3.8281-3.9824l-1.3682-.5474a9.8021,9.8021,0,0,1-4.0668-3.1191c-2.5406-3.2242-3.4585-7.7623-3.79-10.58.5435.5337,3.9815,3.8266,3.9815,3.8266l.5468-1.3672A9.8569,9.8569,0,0,1,11.95,7.8877h0C15.1665,5.415,19.6309,4.5146,22.4155,4.187c-.5332.5435-3.8276,3.9819-3.8276,3.9819l1.3677.5469a10.52,10.52,0,0,1,5.17,4.7608v0a24.29,24.29,0,0,1,2.688,8.94C27.3643,21.9751,23.83,18.5879,23.83,18.5879Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (V6.propTypes = c);
const H6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Kr || (Kr = /* @__PURE__ */ e.createElement("path", {
    d: "M27.9487,25.6836a1,1,0,0,0-1.8955-.0049A3.44,3.44,0,0,1,23,28a3.44,3.44,0,0,1-3.0532-2.3213,1,1,0,0,0-1.8955.0049A3.4376,3.4376,0,0,1,15,28h-.4336C13.9241,26.7939,12,22.312,12,12v-.1313l1.1169.7446A6.46,6.46,0,0,1,14.4346,13.79l1.0007-1.8418a8.4469,8.4469,0,0,0-1.209-.9986L12.8025,10h1.5308a6.9861,6.9861,0,0,1,1.9934.3071l.9755-1.7954A9.0059,9.0059,0,0,0,14.3333,8H13.1169A7.0329,7.0329,0,0,1,18,6h.6669l1.0867-2H18a9.0361,9.0361,0,0,0-7,3.3638A9.0362,9.0362,0,0,0,4,4H2V6H4A7.0308,7.0308,0,0,1,8.8828,8H7.6665a9.06,9.06,0,0,0-5.4,1.8L.4,11.2l1.2,1.6L3.4668,11.4a7.04,7.04,0,0,1,4.2-1.4H9.1973l-1.4239.9492A8.457,8.457,0,0,0,4,18H6a6.46,6.46,0,0,1,2.8828-5.3867L10,11.8687V12c0,8.9365,1.3994,13.7539,2.355,16H2v2H15a4.9316,4.9316,0,0,0,4-1.9873,5.0192,5.0192,0,0,0,8,0,4.9955,4.9955,0,0,0,3,1.8833V27.8125A3.7616,3.7616,0,0,1,27.9487,25.6836Z"
  })), Qr || (Qr = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M23.75,10h-1.5V6h1.5ZM23,11a1,1,0,1,0,1,1A1,1,0,0,0,23,11Z"
  })), qr || (qr = /* @__PURE__ */ e.createElement("path", {
    d: "M29.9115,13.9355,23.6284,2.3706a.7181.7181,0,0,0-1.2568,0L16.0885,13.9355A.72.72,0,0,0,16.72,15H29.28A.72.72,0,0,0,29.9115,13.9355ZM22.25,6h1.5v4h-1.5ZM23,13a1,1,0,1,1,1-1A1,1,0,0,1,23,13Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (H6.propTypes = c);
const M6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Xr || (Xr = /* @__PURE__ */ e.createElement("path", {
    d: "M19 26H30V28H19zM19 22H30V24H19zM30 20h-11V12h11v8zm-9-2h7v-4h-7v4zM19 8H30V10H19zM19 4H30V6H19zM10.293 18.707L8 16.4143 8 12 10 12 10 15.5857 11.707 17.293 10.293 18.707z"
  })), Yr || (Yr = /* @__PURE__ */ e.createElement("path", {
    d: "M9,24c-4.4111,0-8-3.5889-8-8s3.5889-8,8-8,8,3.5889,8,8-3.5889,8-8,8Zm0-14c-3.3083,0-6,2.6917-6,6s2.6917,6,6,6,6-2.6917,6-6-2.6917-6-6-6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (M6.propTypes = c);
const A6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Jr || (Jr = /* @__PURE__ */ e.createElement("path", {
    d: "M30,26H24A10.0349,10.0349,0,0,1,17.0732,8.7378,11.9629,11.9629,0,0,0,12.9937,8a6.9027,6.9027,0,0,0-6.0308,3.42C4.9966,14.4348,4,19.34,4,26H2c0-7.0542,1.106-12.3274,3.2871-15.6726A8.906,8.906,0,0,1,12.9937,6h.0068a14.762,14.762,0,0,1,6.4619,1.592,1,1,0,0,1,.0869,1.7222A8.0249,8.0249,0,0,0,24,24h6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (A6.propTypes = c);
const _6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, e3 || (e3 = /* @__PURE__ */ e.createElement("path", {
    d: "M28 9L26 22 24 9 22 9 24.516 23 27.484 23 30 9 28 9zM18 23H12V21h6V17H14a2.002 2.002 0 01-2-2V11a2.002 2.002 0 012-2h6v2H14v4h4a2.002 2.002 0 012 2v4A2.002 2.002 0 0118 23zM2 11L5 11 5 23 7 23 7 11 10 11 10 9 2 9 2 11z"
  })), r);
});
process.env.NODE_ENV !== "production" && (_6.propTypes = c);
const x6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, t3 || (t3 = /* @__PURE__ */ e.createElement("path", {
    d: "M24 30v-4.1c2.3-.5 4-2.5 4-4.9 0-2.4-1.7-4.4-4-4.9V2s-2 0-2 0v14.1c-2.3.5-4 2.5-4 4.9 0 2.4 1.7 4.4 4 4.9v4.1s2 0 2 0zm-4-9c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.7-1.3 3-3 3s-3-1.3-3-3zM8 2v4.1c-2.3.5-4 2.5-4 4.9 0 2.4 1.7 4.4 4 4.9v14.1s2 0 2 0v-14.1c2.3-.5 4-2.5 4-4.9 0-2.4-1.7-4.4-4-4.9V2s-2 0-2 0zm4 9c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3 3 1.3 3 3z"
  })), r);
});
process.env.NODE_ENV !== "production" && (x6.propTypes = c);
const N6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, r3 || (r3 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 23.18L9 21.179 7.589 22.589 11 26 17 20 15.59 18.59 11 23.18zM28 30H24V28h4V16H24V8a4.0045 4.0045 0 00-4-4V2a6.0067 6.0067 0 016 6v6h2a2.0021 2.0021 0 012 2V28A2.0021 2.0021 0 0128 30z"
  })), n3 || (n3 = /* @__PURE__ */ e.createElement("path", {
    d: "M20,14H18V8A6,6,0,0,0,6,8v6H4a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V16A2,2,0,0,0,20,14ZM8,8a4,4,0,0,1,8,0v6H8ZM20,28H4V16H20Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (N6.propTypes = c);
const C6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, o3 || (o3 = /* @__PURE__ */ e.createElement("path", {
    d: "M26.96 30l-1.9215-6.7253a1.0008 1.0008 0 01.3369-1.0554L29.874 18.62 28.52 13.2014l-2.7382 3.4234A1.0026 1.0026 0 0125 17H20V15h4.52l3.6993-4.6248a1 1 0 011.7509.3824l2 8a.9989.9989 0 01-.3447 1.0232l-4.48 3.5845 1.7389 6.0854zM23 5.5A3.5 3.5 0 1126.5 9 3.5042 3.5042 0 0123 5.5zm2 0A1.5 1.5 0 1026.5 4 1.5017 1.5017 0 0025 5.5z"
  })), a3 || (a3 = /* @__PURE__ */ e.createElement("path", {
    d: "M20.0039,19A2.0039,2.0039,0,0,1,18,16.9961V15.0039A2.0039,2.0039,0,0,1,20.0039,13H22V10H10v3h1.9961A2.0039,2.0039,0,0,1,14,15.0039v1.9922A2.0039,2.0039,0,0,1,11.9961,19H10v3H22V19Z"
  })), l3 || (l3 = /* @__PURE__ */ e.createElement("path", {
    d: "M5.04 30l1.9215-6.7253a1.0013 1.0013 0 00-.3369-1.0555L2.126 18.62l1.3545-5.4185 2.7382 3.4234A1.0026 1.0026 0 007 17h5V15H7.4805L3.7812 10.3752a1 1 0 00-1.7509.3824l-2 8A.9989.9989 0 00.375 19.7808l4.4805 3.5844-1.739 6.0855zM5.5 9A3.5 3.5 0 119 5.5 3.5042 3.5042 0 015.5 9zm0-5A1.5 1.5 0 107 5.5 1.5017 1.5017 0 005.5 4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (C6.propTypes = c);
const y6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, c3 || (c3 = /* @__PURE__ */ e.createElement("path", {
    d: "M21 11L24 11 24 23 26 23 26 11 29 11 29 9 21 9 21 11zM20 9L18 9 16 15 14 9 12 9 14.75 16 12 23 14 23 16 17 18 23 20 23 17.25 16 20 9zM3 11L6 11 6 23 8 23 8 11 11 11 11 9 3 9 3 11z"
  })), r);
});
process.env.NODE_ENV !== "production" && (y6.propTypes = c);
const T6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, i3 || (i3 = /* @__PURE__ */ e.createElement("path", {
    d: "M4 20L4 22 8.586 22 2 28.586 3.414 30 10 23.414 10 28 12 28 12 20 4 20zM21 4L24 4 24 16 26 16 26 4 29 4 29 2 21 2 21 4zM20 2L18 2 16 8 14 2 12 2 14.752 9 12 16 14 16 16 10 18 16 20 16 17.245 9 20 2zM3 4L6 4 6 16 8 16 8 4 11 4 11 2 3 2 3 4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (T6.propTypes = c);
const b6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, s3 || (s3 = /* @__PURE__ */ e.createElement("path", {
    d: "M30 15L17 15 17 2 15 2 15 15 2 15 2 17 15 17 15 30 17 30 17 17 30 17 30 15z"
  })), h3 || (h3 = /* @__PURE__ */ e.createElement("path", {
    d: "M25.586 20L27 21.414 23.414 25 27 28.586 25.586 30 20.586 25 25.586 20zM11 30H3a1 1 0 01-.8945-1.4473l4-8a1.0412 1.0412 0 011.789 0l4 8A1 1 0 0111 30zM4.6182 28H9.3818L7 23.2363zM28 12H22a2.0023 2.0023 0 01-2-2V4a2.0023 2.0023 0 012-2h6a2.0023 2.0023 0 012 2v6A2.0023 2.0023 0 0128 12zM22 4v6h6.001L28 4zM7 12a5 5 0 115-5A5.0059 5.0059 0 017 12zM7 4a3 3 0 103 3A3.0033 3.0033 0 007 4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (b6.propTypes = c);
const L6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, p3 || (p3 = /* @__PURE__ */ e.createElement("path", {
    d: "M30 16L22 24 20.586 22.586 27.172 16 20.586 9.414 22 8 30 16z"
  })), f3 || (f3 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,22a.9967.9967,0,0,1-.707-.293l-5-5a.9994.9994,0,0,1,0-1.414l5-5a.9994.9994,0,0,1,1.414,0l5,5a.9994.9994,0,0,1,0,1.414l-5,5A.9967.9967,0,0,1,16,22Zm-3.5859-6L16,19.5859,19.5859,16,16,12.4141Z"
  })), d3 || (d3 = /* @__PURE__ */ e.createElement("path", {
    d: "M2 16L10 8 11.414 9.414 4.828 16 11.414 22.586 10 24 2 16z"
  })), r);
});
process.env.NODE_ENV !== "production" && (L6.propTypes = c);
const z6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, w3 || (w3 = /* @__PURE__ */ e.createElement("path", {
    d: "M13 23H9a2 2 0 01-2-2V9H9V21h4V9h2V21A2 2 0 0113 23zM22 21L22 9 17 9 17 11 20 11 20 21 17 21 17 23 25 23 25 21 22 21z"
  })), r);
});
process.env.NODE_ENV !== "production" && (z6.propTypes = c);
const Z6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, u3 || (u3 = /* @__PURE__ */ e.createElement("path", {
    d: "M13 23H9a2 2 0 01-2-2V9H9V21h4V9h2V21A2 2 0 0113 23zM25 23H17V17a2 2 0 012-2h4V11H17V9h6a2 2 0 012 2v4a2 2 0 01-2 2H19v4h6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Z6.propTypes = c);
const R6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, m3 || (m3 = /* @__PURE__ */ e.createElement("path", {
    d: "M13 23H9a2 2 0 01-2-2V9H9V21h4V9h2V21A2 2 0 0113 23zM23 9H17v2h6v4H18v2h5v4H17v2h6a2 2 0 002-2V11A2 2 0 0023 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (R6.propTypes = c);
const $6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, v3 || (v3 = /* @__PURE__ */ e.createElement("path", {
    d: "M29.9854,15.83A14.3808,14.3808,0,0,0,17,4.0464V2H15V4.0464A14.3808,14.3808,0,0,0,2.0146,15.83,1,1,0,0,0,3.51,16.86,4.8551,4.8551,0,0,1,6,16a4.8653,4.8653,0,0,1,4.1406,2.5107,1.0393,1.0393,0,0,0,1.7188,0A5.02,5.02,0,0,1,15,16.1255V25.5a2.5,2.5,0,0,1-5,0V25H8v.5a4.5,4.5,0,0,0,9,0V16.1255a5.02,5.02,0,0,1,3.1406,2.3852.9994.9994,0,0,0,1.7188,0A4.8653,4.8653,0,0,1,26,16a4.8551,4.8551,0,0,1,2.49.86,1,1,0,0,0,1.4957-1.03ZM6,14a5.4079,5.4079,0,0,0-1.5034.2134,12.4411,12.4411,0,0,1,8.488-7.8145A14.5157,14.5157,0,0,0,9.939,15.333,6.5439,6.5439,0,0,0,6,14Zm10,0a6.5528,6.5528,0,0,0-4.0564,1.4307c.0378-2.22.6089-6.49,4.0563-9.1763,3.4308,2.6768,4.0091,6.9487,4.0525,9.1728A6.553,6.553,0,0,0,16,14Zm10,0a6.5439,6.5439,0,0,0-3.939,1.333,14.5164,14.5164,0,0,0-3.0456-8.9341,12.4411,12.4411,0,0,1,8.488,7.8145A5.4079,5.4079,0,0,0,26,14Z"
  })), r);
});
process.env.NODE_ENV !== "production" && ($6.propTypes = c);
const D6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, g3 || (g3 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 14H21V18H11z"
  })), E3 || (E3 = /* @__PURE__ */ e.createElement("path", {
    d: "M29.391,14.527L17.473,2.609C17.067,2.203,16.533,2,16,2c-0.533,0-1.067,0.203-1.473,0.609L2.609,14.527 C2.203,14.933,2,15.466,2,16s0.203,1.067,0.609,1.473l11.917,11.917C14.933,29.797,15.467,30,16,30c0.533,0,1.067-0.203,1.473-0.609 l11.917-11.917C29.797,17.067,30,16.534,30,16S29.797,14.933,29.391,14.527z M16,28.036L3.965,16L16,3.964L28.036,16L16,28.036z"
  })), r);
});
process.env.NODE_ENV !== "production" && (D6.propTypes = c);
const B6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, V3 || (V3 = /* @__PURE__ */ e.createElement("path", {
    d: "M29.391,14.527L17.473,2.609C17.067,2.203,16.533,2,16,2s-1.067,0.203-1.473,0.609L2.609,14.527C2.203,14.933,2,15.466,2,16 s0.203,1.067,0.609,1.473l11.917,11.917C14.933,29.797,15.467,30,16,30s1.067-0.203,1.473-0.609l11.917-11.917 C29.797,17.067,30,16.534,30,16S29.797,14.933,29.391,14.527z M21,18H11v-4h10V18z"
  })), H3 || (H3 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M11 14H21V18H11z",
    "data-icon-path": "inner-path"
  })), r);
});
process.env.NODE_ENV !== "production" && (B6.propTypes = c);
const Do = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, M3 || (M3 = /* @__PURE__ */ e.createElement("path", {
    d: "M20,10H7.8149l3.5874-3.5859L10,5,4,11,10,17l1.4023-1.4146L7.8179,12H20a6,6,0,0,1,0,12H12v2h8a8,8,0,0,0,0-16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Do.propTypes = c);
const O6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, A3 || (A3 = /* @__PURE__ */ e.createElement("path", {
    d: "M30,14V10H26v2H20V6h2V2H18V4H6V2H2V6H4V18H2v4H6V20h6v6H10v4h4V28H26v2h4V26H28V14ZM6,6H18V18H6ZM26,26H14V20h4v2h4V18H20V14h6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (O6.propTypes = c);
const I6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, _3 || (_3 = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "22.5",
    r: "1.5"
  })), x3 || (x3 = /* @__PURE__ */ e.createElement("path", {
    d: "M17,19h-2v-4h2c1.103,0,2-0.897,2-2s-0.897-2-2-2h-2c-1.103,0-2,0.897-2,2v0.5h-2V13c0-2.206,1.794-4,4-4h2 c2.206,0,4,1.794,4,4s-1.794,4-4,4V19z"
  })), N3 || (N3 = /* @__PURE__ */ e.createElement("path", {
    d: "M29.391,14.527L17.473,2.609C17.067,2.203,16.533,2,16,2c-0.533,0-1.067,0.203-1.473,0.609L2.609,14.527 C2.203,14.933,2,15.466,2,16s0.203,1.067,0.609,1.473l11.917,11.917C14.933,29.797,15.467,30,16,30c0.533,0,1.067-0.203,1.473-0.609 l11.917-11.917C29.797,17.067,30,16.534,30,16S29.797,14.933,29.391,14.527z M16,28.036L3.965,16L16,3.964L28.036,16L16,28.036z"
  })), r);
});
process.env.NODE_ENV !== "production" && (I6.propTypes = c);
const S6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, C3 || (C3 = /* @__PURE__ */ e.createElement("path", {
    d: "M29.391,14.527L17.473,2.609C17.067,2.203,16.533,2,16,2s-1.067,0.203-1.473,0.609L2.609,14.527C2.203,14.933,2,15.466,2,16 s0.203,1.067,0.609,1.473l11.917,11.917C14.933,29.797,15.467,30,16,30s1.067-0.203,1.473-0.609l11.917-11.917 C29.797,17.067,30,16.534,30,16S29.797,14.933,29.391,14.527z M16,24c-0.828,0-1.5-0.671-1.5-1.5S15.172,21,16,21s1.5,0.671,1.5,1.5 S16.828,24,16,24z M17.125,17.248v1.877h-2.25V15H17c1.034,0,1.875-0.841,1.875-1.875S18.034,11.25,17,11.25h-2 c-1.034,0-1.875,0.841-1.875,1.875v0.5h-2.25v-0.5C10.875,10.851,12.726,9,15,9h2c2.274,0,4.125,1.851,4.125,4.125 C21.125,15.358,19.342,17.182,17.125,17.248z"
  })), y3 || (y3 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M16,21c0.828,0,1.5,0.672,1.5,1.5S16.828,24,16,24c-0.828,0-1.5-0.672-1.5-1.5S15.172,21,16,21 z M17.125,17.248c2.217-0.066,4-1.89,4-4.123C21.125,10.851,19.274,9,17,9h-2c-2.274,0-4.125,1.851-4.125,4.125v0.5h2.25v-0.5 c0-1.034,0.841-1.875,1.875-1.875h2c1.034,0,1.875,0.841,1.875,1.875S18.034,15,17,15h-2.125v4.125h2.25V17.248z",
    "data-icon-path": "inner-path"
  })), r);
});
process.env.NODE_ENV !== "production" && (S6.propTypes = c);
const W6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, T3 || (T3 = /* @__PURE__ */ e.createElement("path", {
    d: "M5 3.59H7V8.42H5z",
    transform: "rotate(-45.01 5.996 6.005)"
  })), b3 || (b3 = /* @__PURE__ */ e.createElement("path", {
    d: "M25 23.58H27V28.409999999999997H25z",
    transform: "rotate(-44.99 25.995 25.999)"
  })), L3 || (L3 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 2H13V6H11zM2 11H6V13H2zM26 19H30V21H26zM19 26H21V30H19zM16.58 21.07l-3.71 3.72a4 4 0 11-5.66-5.66l3.72-3.72L9.51 14 5.8 17.72a6 6 0 00-.06 8.54A6 6 0 0010 28a6.07 6.07 0 004.32-1.8L18 22.49zM15.41 10.93l3.72-3.72a4 4 0 115.66 5.66l-3.72 3.72L22.49 18l3.71-3.72a6 6 0 00.06-8.54A6 6 0 0022 4a6.07 6.07 0 00-4.32 1.8L14 9.51z"
  })), r);
});
process.env.NODE_ENV !== "production" && (W6.propTypes = c);
const U6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, z3 || (z3 = /* @__PURE__ */ e.createElement("path", {
    d: "M12,7H6V4c0-1.1,0.9-2,2-2s2,0.9,2,2h1c0-1.7-1.3-3-3-3S5,2.3,5,4v3H4C3.4,7,3,7.4,3,8v6c0,0.6,0.4,1,1,1h8c0.6,0,1-0.4,1-1 V8C13,7.4,12.6,7,12,7z M12,14H4V8h8V14z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Z3 || (Z3 = /* @__PURE__ */ e.createElement("path", {
    d: "M24,14H12V8a4,4,0,0,1,8,0h2A6,6,0,0,0,10,8v6H8a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V16A2,2,0,0,0,24,14Zm0,14H8V16H24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (U6.propTypes = c);
const k6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, R3 || (R3 = /* @__PURE__ */ e.createElement("path", {
    d: "M30 19.4L28.6 18 25 21.6 21.4 18 20 19.4 23.6 23 20 26.6 21.4 28 25 24.4 28.6 28 30 26.6 26.4 23z"
  })), $3 || ($3 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,26l-4,0v-8l4,0v-2l-4,0c-1.1,0-2,0.9-2,2v8H6V6h4v4c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V6.4l4,4l0,5.6h2l0-6 c0-0.3-0.1-0.5-0.3-0.7l-5-5C22.5,4.1,22.3,4,22,4H6C4.9,4,4,4.9,4,6v20c0,1.1,0.9,2,2,2l10,0V26z M12,6h8v4h-8V6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (k6.propTypes = c);
const F6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, D3 || (D3 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 14L6 24 7.4 25.4 16 16.8 24.6 25.4 26 24zM4 8H28V10H4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (F6.propTypes = c);
const P6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, B3 || (B3 = /* @__PURE__ */ e.createElement("path", {
    d: "M27 25.586L25 23.586 25 21 23 21 23 24.414 25.586 27 27 25.586z"
  })), O3 || (O3 = /* @__PURE__ */ e.createElement("path", {
    d: "M24 31a7 7 0 117-7A7.0078 7.0078 0 0124 31zm0-12a5 5 0 105 5A5.0055 5.0055 0 0024 19zM16 28A12.0134 12.0134 0 014 16H2A14.0158 14.0158 0 0016 30zM12 8H7.0784A11.9843 11.9843 0 0128 16h2A13.9778 13.9778 0 006 6.2344V2H4v8h8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (P6.propTypes = c);
const j6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, I3 || (I3 = /* @__PURE__ */ e.createElement("path", {
    d: "M21 24H11a2 2 0 00-2 2v2a2 2 0 002 2H21a2 2 0 002-2V26A2 2 0 0021 24zm0 4H11V26H21zM28.707 14.293l-12-12a.9994.9994 0 00-1.414 0l-12 12A1 1 0 004 16H9v4a2.0023 2.0023 0 002 2H21a2.0027 2.0027 0 002-2V16h5a1 1 0 00.707-1.707zM21 14v6H11V14H6.4141L16 4.4141 25.5859 14z"
  })), r);
});
process.env.NODE_ENV !== "production" && (j6.propTypes = c);
const G6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, S3 || (S3 = /* @__PURE__ */ e.createElement("path", {
    d: "M3 9L3.7 9.7 7.5 5.9 7.5 15 8.5 15 8.5 5.9 12.3 9.7 13 9 8 4zM3 4V2h10v2h1V2c0-.6-.4-1-1-1H3C2.4 1 2 1.4 2 2v2H3z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, W3 || (W3 = /* @__PURE__ */ e.createElement("path", {
    d: "M6 18L7.41 19.41 15 11.83 15 30 17 30 17 11.83 24.59 19.41 26 18 16 8 6 18zM6 8V4H26V8h2V4a2 2 0 00-2-2H6A2 2 0 004 4V8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (G6.propTypes = c);
const K6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, U3 || (U3 = /* @__PURE__ */ e.createElement("path", {
    d: "M10 24c0 3.3137 2.6863 6 6 6s6-2.6863 6-6-2.6863-6-6-6-6 2.6863-6 6zm2 0c0-2.2056 1.7944-4 4-4s4 1.7944 4 4-1.7944 4-4 4-4-1.7944-4-4zM30 5c0-1.6567-1.3433-3-3-3s-3 1.3433-3 3c0 1.3042.8374 2.4028 2 2.8164v5.1836c0 1.7217-.752 3.3438-2 4.4673v-2.4673h-2v6h6v-2h-2.7168c1.6938-1.4995 2.7168-3.6816 2.7168-6v-5.1836c1.1626-.4136 2-1.5122 2-2.8164zm-3 1c-.5522 0-1-.4478-1-1s.4478-1 1-1 1 .4478 1 1-.4478 1-1 1zM18.586 11.5859l-1.5859 1.5859v-5.3555c1.1626-.4136 2-1.5122 2-2.8164 0-1.6567-1.3433-3-3-3s-3 1.3433-3 3c0 1.3042.8374 2.4028 2 2.8164v5.3555l-1.5859-1.5859-1.4141 1.4141 4 4 4-4-1.4141-1.4141zm-2.5859-7.5859c.5522 0 1 .4478 1 1s-.4478 1-1 1-1-.4478-1-1 .4478-1 1-1zM8 15v2.4673c-1.248-1.1235-2-2.7456-2-4.4673v-5.1836c1.1626-.4136 2-1.5122 2-2.8164 0-1.6567-1.3433-3-3-3s-3 1.3433-3 3c0 1.3042.8374 2.4028 2 2.8164v5.1836c0 2.3184 1.0229 4.5005 2.7168 6h-2.7168v2h6v-6h-2zm-3-11c.5522 0 1 .4478 1 1s-.4478 1-1 1-1-.4478-1-1 .4478-1 1-1z"
  })), r);
});
process.env.NODE_ENV !== "production" && (K6.propTypes = c);
const Q6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, k3 || (k3 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M24 21L24 9 22 9 22 23 30 23 30 21 24 21zM20 15v-4c0-1.103-.8975-2-2-2h-6v14h2v-6h1.4807l2.3345 6h2.1453l-2.3331-6h.3726c1.1025 0 2-.8975 2-2zm-6-4h4v4h-4v-4zM8 23h-4c-1.103 0-2-.8975-2-2v-12h2v12h4v-12h2v12c0 1.1025-.897 2-2 2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Q6.propTypes = c);
const q6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, F3 || (F3 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m13,28V5.8281l7.5859,7.5859,1.4141-1.4141L12,2,2,12l1.4143,1.4141,7.5857-7.5854v22.1714c0,1.1045.8955,2,2,2h15v-2h-15Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (q6.propTypes = c);
const X6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, P3 || (P3 = /* @__PURE__ */ e.createElement("path", {
    d: "M24,15V6a2,2,0,0,0-2-2H10A2,2,0,0,0,8,6v9a2,2,0,0,0-2,2V28H8V17H24V28h2V17A2,2,0,0,0,24,15ZM10,6H22v9H10Z"
  })), j3 || (j3 = /* @__PURE__ */ e.createElement("path", {
    d: "M12 10H15V12H12zM17 10H20V12H17z"
  })), r);
});
process.env.NODE_ENV !== "production" && (X6.propTypes = c);
const Y6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, G3 || (G3 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M22.0735 21.9922c1.7068 0 2.9407-.7773 3.5151-2.3325l-1.6561-.7942c-.3212.7942-.828 1.386-1.859 1.386-1.2002 0-1.8086-.8284-1.8086-2.062v-1.6057c0-1.2341.6084-2.0787 1.8086-2.0787.9294 0 1.4871.5409 1.6899 1.2845l1.7748-.7947c-.524-1.386-1.6903-2.2307-3.4647-2.2307-2.603 0-4.0735 1.7744-4.0735 4.5969 0 2.8394 1.4705 4.6311 4.0735 4.6311zM11.5126 21.9922c3.3129 0 4.5468-1.572 4.5468-5.0369v-6.9631h-2.1973v7.2507c0 1.8422-.6423 2.772-2.3324 2.772s-2.3324-.9298-2.3324-2.772v-7.2507h-2.1973v6.9631c0 3.4648 1.2 5.0369 4.5126 5.0369z"
  })), K3 || (K3 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m2,4v24c0,1.1046.8954,2,2,2h24c1.1046,0,2-.8954,2-2V4c0-1.1046-.8954-2-2-2H4c-1.1046,0-2,.8954-2,2Zm26,24H4V4h24v24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Y6.propTypes = c);
const J6 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Q3 || (Q3 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M22.0735 21.9922c1.7068 0 2.9407-.7773 3.5151-2.3325l-1.6561-.7942c-.3212.7942-.828 1.386-1.859 1.386-1.2002 0-1.8086-.8284-1.8086-2.062v-1.6057c0-1.2341.6084-2.0787 1.8086-2.0787.9294 0 1.4871.5409 1.6899 1.2845l1.7748-.7947c-.524-1.386-1.6903-2.2307-3.4647-2.2307-2.603 0-4.0735 1.7744-4.0735 4.5969 0 2.8394 1.4705 4.6311 4.0735 4.6311zM11.5126 21.9922c3.3129 0 4.5468-1.572 4.5468-5.0369v-6.9631h-2.1973v7.2507c0 1.8422-.6423 2.772-2.3324 2.772s-2.3324-.9298-2.3324-2.772v-7.2507h-2.1973v6.9631c0 3.4648 1.2 5.0369 4.5126 5.0369z"
  })), q3 || (q3 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m21,30h-10c-4.9626,0-9-4.0374-9-9v-10C2,6.0374,6.0374,2,11,2h10c4.9626,0,9,4.0374,9,9v10c0,4.9626-4.0374,9-9,9ZM11,4c-3.8599,0-7,3.1401-7,7v10c0,3.8599,3.1401,7,7,7h10c3.8599,0,7-3.1401,7-7v-10c0-3.8599-3.1401-7-7-7h-10Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (J6.propTypes = c);
const e8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, X3 || (X3 = /* @__PURE__ */ e.createElement("path", {
    d: "M8 2c1.4 0 2.5 1.1 2.5 2.5S9.4 7 8 7 5.5 5.9 5.5 4.5 6.6 2 8 2M8 1C6.1 1 4.5 2.6 4.5 4.5S6.1 8 8 8s3.5-1.6 3.5-3.5S9.9 1 8 1zM13 15h-1v-2.5c0-1.4-1.1-2.5-2.5-2.5h-3C5.1 10 4 11.1 4 12.5V15H3v-2.5C3 10.6 4.6 9 6.5 9h3c1.9 0 3.5 1.6 3.5 3.5V15z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Y3 || (Y3 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 4a5 5 0 11-5 5 5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0016 2zM26 30H24V25a5 5 0 00-5-5H13a5 5 0 00-5 5v5H6V25a7 7 0 017-7h6a7 7 0 017 7z"
  })), r);
});
process.env.NODE_ENV !== "production" && (e8.propTypes = c);
const t8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, J3 || (J3 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 30H14V25a3.0033 3.0033 0 00-3-3H7a3.0033 3.0033 0 00-3 3v5H2V25a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM9 10a3 3 0 11-3 3 3 3 0 013-3M9 8a5 5 0 105 5A5 5 0 009 8zM30 12a1.9922 1.9922 0 00-.5117.0742L28.4331 11.019a3.8788 3.8788 0 000-4.038l1.0552-1.0552a2.0339 2.0339 0 10-1.4141-1.4141L27.019 5.5669a3.8788 3.8788 0 00-4.038 0L21.9258 4.5117a2.0339 2.0339 0 10-1.4141 1.4141L21.5669 6.981a3.8788 3.8788 0 000 4.038l-1.0552 1.0552a2.0339 2.0339 0 101.4141 1.4141l1.0552-1.0552a3.8788 3.8788 0 004.038 0l1.0552 1.0552A1.9957 1.9957 0 1030 12zM23 9a2 2 0 112 2A2.0025 2.0025 0 0123 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (t8.propTypes = c);
const r8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, en || (en = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M28 8v-3c0-2.2056-1.7944-4-4-4s-4 1.7944-4 4v3c-1.1028 0-2 .8975-2 2v6c0 1.1025.8972 2 2 2h8c1.1028 0 2-.8975 2-2v-6c0-1.1025-.8972-2-2-2zm-6-3c0-1.1025.8972-2 2-2s2 .8975 2 2v3h-4v-3zm-2 11v-6h8v6h-8zM16 30h-2v-5c-.0018-1.6561-1.3439-2.9982-3-3h-4c-1.6561.0018-2.9982 1.3439-3 3v5h-2v-5c.0033-2.7601 2.2399-4.9967 5-5h4c2.7601.0033 4.9967 2.2399 5 5v5zM9 10c1.6569 0 3 1.3431 3 3s-1.3431 3-3 3-3-1.3431-3-3 1.3431-3 3-3m0-2c-2.7614 0-5 2.2386-5 5s2.2386 5 5 5 5-2.2386 5-5-2.2386-5-5-5z"
  })), r);
});
process.env.NODE_ENV !== "production" && (r8.propTypes = c);
const n8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, tn || (tn = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M16 30h-2v-5c-.0018-1.6561-1.3439-2.9982-3-3h-4c-1.6561.0018-2.9982 1.3439-3 3v5h-2v-5c.0033-2.7601 2.2399-4.9967 5-5h4c2.7601.0033 4.9967 2.2399 5 5v5zM9 10c1.6569 0 3 1.3431 3 3s-1.3431 3-3 3-3-1.3431-3-3 1.3431-3 3-3m0-2c-2.7614 0-5 2.2386-5 5s2.2386 5 5 5 5-2.2386 5-5-2.2386-5-5-5zM28 8h-6v-3c0-1.1025.8972-2 2-2s2 .8975 2 2h2c0-2.2056-1.7944-4-4-4s-4 1.7944-4 4v3c-1.1028 0-2 .8975-2 2v6c0 1.1025.8972 2 2 2h8c1.1028 0 2-.8975 2-2v-6c0-1.1025-.8972-2-2-2zm0 8h-8v-6h8v6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (n8.propTypes = c);
const o8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, rn || (rn = /* @__PURE__ */ e.createElement("path", {
    d: "M25 23h-.0215a1.0016 1.0016 0 01-.94-.7256L20.8711 11.19l-1.9346 5.1607A1.0005 1.0005 0 0118 17H14V15h3.3066l2.7569-7.3511a1.0005 1.0005 0 011.8984.0762l3.1113 10.8921 1.9786-5.9336A.9988.9988 0 0128 12h4v2H28.7207l-2.7725 8.3164A.9984.9984 0 0125 23zM15 30H13V23a3.0033 3.0033 0 00-3-3H6a3.0033 3.0033 0 00-3 3v7H1V23a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM8 8a3 3 0 11-3 3A3 3 0 018 8M8 6a5 5 0 105 5A5 5 0 008 6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (o8.propTypes = c);
const a8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, nn || (nn = /* @__PURE__ */ e.createElement("path", {
    d: "M12 4A5 5 0 117 9a5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0012 2zM22 30H20V25a5 5 0 00-5-5H9a5 5 0 00-5 5v5H2V25a7 7 0 017-7h6a7 7 0 017 7zM25 16.18L22.41 13.59 21 15 25 19 32 12 30.59 10.59 25 16.18z"
  })), r);
});
process.env.NODE_ENV !== "production" && (a8.propTypes = c);
const l8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, on || (on = /* @__PURE__ */ e.createElement("path", {
    d: "M8,1C4.1,1,1,4.1,1,8s3.1,7,7,7s7-3.1,7-7S11.9,1,8,1z M5,13.2v-1.5c0-0.9,0.6-1.6,1.5-1.7h3c0.9,0.1,1.5,0.8,1.5,1.7v1.5 C9.1,14.3,6.9,14.3,5,13.2L5,13.2z M12,12l0-0.8c0-0.9-1.1-2.1-2.5-2.2h-3C5.1,9.1,4,10.3,4,11.7l0,0.5v0.3c-2.5-2.2-2.7-6-0.5-8.5 s6-2.7,8.5-0.5s2.7,6,0.5,8.5c-0.1,0.2-0.3,0.3-0.5,0.5V12z"
  })), an || (an = /* @__PURE__ */ e.createElement("path", {
    d: "M8,3C6.6,3,5.5,4.1,5.5,5.5S6.6,8,8,8s2.5-1.1,2.5-2.5S9.4,3,8,3z M8,7C7.2,7,6.5,6.3,6.5,5.5S7.2,4,8,4s1.5,0.7,1.5,1.5 S8.8,7,8,7z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ln || (ln = /* @__PURE__ */ e.createElement("path", {
    d: "M16,8a5,5,0,1,0,5,5A5,5,0,0,0,16,8Zm0,8a3,3,0,1,1,3-3A3.0034,3.0034,0,0,1,16,16Z"
  })), cn || (cn = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2ZM10,26.3765V25a3.0033,3.0033,0,0,1,3-3h6a3.0033,3.0033,0,0,1,3,3v1.3765a11.8989,11.8989,0,0,1-12,0Zm13.9925-1.4507A5.0016,5.0016,0,0,0,19,20H13a5.0016,5.0016,0,0,0-4.9925,4.9258,12,12,0,1,1,15.985,0Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (l8.propTypes = c);
const c8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, sn || (sn = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M8.0071,24.93A4.9958,4.9958,0,0,1,13,20h6a4.9959,4.9959,0,0,1,4.9929,4.93,11.94,11.94,0,0,1-15.9858,0ZM20.5,12.5A4.5,4.5,0,1,1,16,8,4.5,4.5,0,0,1,20.5,12.5Z"
  })), hn || (hn = /* @__PURE__ */ e.createElement("path", {
    d: "M26.7489,24.93A13.9893,13.9893,0,1,0,2,16a13.899,13.899,0,0,0,3.2511,8.93l-.02.0166c.07.0845.15.1567.2222.2392.09.1036.1864.2.28.3008.28.3033.5674.5952.87.87.0915.0831.1864.1612.28.2417.32.2759.6484.5372.99.7813.0441.0312.0832.0693.1276.1006v-.0127a13.9011,13.9011,0,0,0,16,0V27.48c.0444-.0313.0835-.0694.1276-.1006.3412-.2441.67-.5054.99-.7813.0936-.08.1885-.1586.28-.2417.3025-.2749.59-.5668.87-.87.0933-.1006.1894-.1972.28-.3008.0719-.0825.1522-.1547.2222-.2392ZM16,8a4.5,4.5,0,1,1-4.5,4.5A4.5,4.5,0,0,1,16,8ZM8.0071,24.93A4.9957,4.9957,0,0,1,13,20h6a4.9958,4.9958,0,0,1,4.9929,4.93,11.94,11.94,0,0,1-15.9858,0Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (c8.propTypes = c);
const i8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, pn || (pn = /* @__PURE__ */ e.createElement("path", {
    d: "M16,8a5,5,0,1,0,5,5A5,5,0,0,0,16,8Z"
  })), fn || (fn = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm7.9925,22.9258A5.0016,5.0016,0,0,0,19,20H13a5.0016,5.0016,0,0,0-4.9925,4.9258,12,12,0,1,1,15.985,0Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (i8.propTypes = c);
const s8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, dn || (dn = /* @__PURE__ */ e.createElement("path", {
    d: "M25 10L26.593 13 30 13.414 27.5 15.667 28 19 25 17.125 22 19 22.5 15.667 20 13.414 23.5 13 25 10zM22 30H20V25a5.0059 5.0059 0 00-5-5H9a5.0059 5.0059 0 00-5 5v5H2V25a7.0082 7.0082 0 017-7h6a7.0082 7.0082 0 017 7zM12 4A5 5 0 117 9a5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0012 2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (s8.propTypes = c);
const h8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, wn || (wn = /* @__PURE__ */ e.createElement("path", {
    d: "M28 8H30V16H28zM23 5H25V16H23zM18 10H20V16H18zM16 30H14V24a3.0033 3.0033 0 00-3-3H7a3.0033 3.0033 0 00-3 3v6H2V24a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM9 9a3 3 0 11-3 3A3 3 0 019 9M9 7a5 5 0 105 5A5 5 0 009 7z"
  })), r);
});
process.env.NODE_ENV !== "production" && (h8.propTypes = c);
const p8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, un || (un = /* @__PURE__ */ e.createElement("path", {
    d: "M27.303 12a2.6616 2.6616 0 00-1.9079.8058l-.3932.4054-.397-.4054a2.6615 2.6615 0 00-3.8157 0 2.7992 2.7992 0 000 3.8964L25.0019 21l4.2089-4.2978a2.7992 2.7992 0 000-3.8964A2.6616 2.6616 0 0027.303 12zM2 30H4V25a5.0059 5.0059 0 015-5h6a5.0059 5.0059 0 015 5v5h2V25a7.0082 7.0082 0 00-7-7H9a7.0082 7.0082 0 00-7 7zM12 4A5 5 0 117 9a5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0012 2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (p8.propTypes = c);
const f8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, mn || (mn = /* @__PURE__ */ e.createElement("path", {
    d: "M28.7663 4.2558A4.2121 4.2121 0 0023 4.0321a4.2121 4.2121 0 00-5.7663.2237 4.319 4.319 0 000 6.0447L22.998 16.14 23 16.1376l.002.0019 5.7643-5.839A4.319 4.319 0 0028.7663 4.2558zM27.342 8.8948l-4.34 4.3973L23 13.29l-.002.002-4.34-4.3973a2.3085 2.3085 0 010-3.2338 2.2639 2.2639 0 013.1561 0l1.181 1.2074L23 6.8634l.0049.005 1.181-1.2074a2.2639 2.2639 0 013.1561 0A2.3085 2.3085 0 0127.342 8.8948zM16 30H14V25a3.0033 3.0033 0 00-3-3H7a3.0033 3.0033 0 00-3 3v5H2V25a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM9 10a3 3 0 11-3 3 3 3 0 013-3M9 8a5 5 0 105 5A5 5 0 009 8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (f8.propTypes = c);
const d8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, vn || (vn = /* @__PURE__ */ e.createElement("path", {
    d: "M26.4938 3a3.4735 3.4735 0 00-2.48 1.0393l-.5111.5228-.5161-.5228a3.4792 3.4792 0 00-4.96 0 3.59 3.59 0 000 5.0251l5.4766 5.5427 5.4716-5.5427a3.59 3.59 0 000-5.0251A3.4738 3.4738 0 0026.4938 3zM16 30H14V25a3.0033 3.0033 0 00-3-3H7a3.0033 3.0033 0 00-3 3v5H2V25a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM9 10a3 3 0 11-3 3 3 3 0 013-3M9 8a5 5 0 105 5A5 5 0 009 8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (d8.propTypes = c);
const w8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, gn || (gn = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M19 3h10c1.1035 0 2 .8965 2 2v6c0 1.1035-.8965 2-2 2h-2.4229s-1.7314 3-1.7314 3l-1.7324-1 2.3096-4h3.5771s0-6 0-6h-10s0 6 0 6h3v2h-3c-1.1035 0-2-.8965-2-2v-6c0-1.1035.8965-2 2-2zM15 30h-2v-5c-.0018-1.6561-1.3439-2.9982-3-3h-4c-1.6561.0018-2.9982 1.3439-3 3v5H1v-5c.0033-2.7601 2.2399-4.9967 5-5h4c2.7601.0033 4.9967 2.2399 5 5v5zM8 10c1.6569 0 3 1.3431 3 3s-1.3431 3-3 3-3-1.3431-3-3c.0019-1.6561 1.3439-2.9981 3-3m0-2c-2.7614 0-5 2.2386-5 5s2.2386 5 5 5 5-2.2386 5-5-2.2386-5-5-5z"
  })), r);
});
process.env.NODE_ENV !== "production" && (w8.propTypes = c);
const u8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, En || (En = /* @__PURE__ */ e.createElement("path", {
    d: "M6 30H26V25a7.0082 7.0082 0 00-7-7H13a7.0082 7.0082 0 00-7 7zM9 9a7 7 0 107-7A7 7 0 009 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (u8.propTypes = c);
const m8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Vn || (Vn = /* @__PURE__ */ e.createElement("path", {
    d: "M32 14L28 14 28 10 26 10 26 14 22 14 22 16 26 16 26 20 28 20 28 16 32 16 32 14zM12 4A5 5 0 117 9a5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0012 2zM22 30H20V25a5 5 0 00-5-5H9a5 5 0 00-5 5v5H2V25a7 7 0 017-7h6a7 7 0 017 7z"
  })), r);
});
process.env.NODE_ENV !== "production" && (m8.propTypes = c);
const v8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Hn || (Hn = /* @__PURE__ */ e.createElement("path", {
    d: "M22,11h4a1,1,0,0,1,1,1v2a0,0,0,0,1,0,0H21a0,0,0,0,1,0,0V12A1,1,0,0,1,22,11Z"
  })), Mn || (Mn = /* @__PURE__ */ e.createElement("circle", {
    cx: "24",
    cy: "8",
    r: "2"
  })), An || (An = /* @__PURE__ */ e.createElement("path", {
    d: "M30 18H18a2.0023 2.0023 0 01-2-2V4a2.002 2.002 0 012-2H30a2.0023 2.0023 0 012 2V16A2.0027 2.0027 0 0130 18zM18 4V16H30.001L30 4zM15 30H13V26a2.9465 2.9465 0 00-3-3H6a2.9465 2.9465 0 00-3 3v4H1V26a4.9514 4.9514 0 015-5h4a4.9514 4.9514 0 015 5zM8 11a3 3 0 010 6 3 3 0 010-6M8 9A5 5 0 008 19 5 5 0 008 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (v8.propTypes = c);
const g8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, _n || (_n = /* @__PURE__ */ e.createElement("path", {
    d: "M25 13L23.407 16 20 16.414 22.5 18.667 22 22 25 20.125 28 22 27.5 18.667 30 16.414 26.5 16 25 13z"
  })), xn || (xn = /* @__PURE__ */ e.createElement("path", {
    d: "M21.414 13.414L25 9.834 25 9.834 28.587 13.416 30 12 25 7 20 12 21.414 13.414z"
  })), Nn || (Nn = /* @__PURE__ */ e.createElement("path", {
    d: "M21.414 8.414L25 4.834 25 4.834 28.587 8.416 30 7 25 2 20 7 21.414 8.414zM16 30H14V25a3.0033 3.0033 0 00-3-3H7a3.0033 3.0033 0 00-3 3v5H2V25a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM9 10a3 3 0 11-3 3 3 3 0 013-3M9 8a5 5 0 105 5A5 5 0 009 8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (g8.propTypes = c);
const E8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Cn || (Cn = /* @__PURE__ */ e.createElement("path", {
    d: "M30 30H28V25a5.0057 5.0057 0 00-5-5V18a7.0078 7.0078 0 017 7zM22 30H20V25a5.0059 5.0059 0 00-5-5H9a5.0059 5.0059 0 00-5 5v5H2V25a7.0082 7.0082 0 017-7h6a7.0082 7.0082 0 017 7zM20 2V4a5 5 0 010 10v2A7 7 0 0020 2zM12 4A5 5 0 117 9a5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0012 2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (E8.propTypes = c);
const V8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, yn || (yn = /* @__PURE__ */ e.createElement("circle", {
    cx: "26",
    cy: "16",
    r: "4"
  })), Tn || (Tn = /* @__PURE__ */ e.createElement("path", {
    d: "M22 30H20V25a5 5 0 00-5-5H9a5 5 0 00-5 5v5H2V25a7 7 0 017-7h6a7 7 0 017 7zM12 4A5 5 0 117 9a5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0012 2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (V8.propTypes = c);
const H8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, bn || (bn = /* @__PURE__ */ e.createElement("path", {
    d: "M12 4A5 5 0 117 9a5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0012 2zM22 30H20V25a5 5 0 00-5-5H9a5 5 0 00-5 5v5H2V25a7 7 0 017-7h6a7 7 0 017 7zM22 4H32V6H22zM22 9H32V11H22zM22 14H29V16H22z"
  })), r);
});
process.env.NODE_ENV !== "production" && (H8.propTypes = c);
const M8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ln || (Ln = /* @__PURE__ */ e.createElement("path", {
    d: "M28.07 21L22 15 28.07 9 29.5 10.41 24.86 15 29.5 19.59 28.07 21zM22 30H20V25a5 5 0 00-5-5H9a5 5 0 00-5 5v5H2V25a7 7 0 017-7h6a7 7 0 017 7zM12 4A5 5 0 117 9a5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0012 2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (M8.propTypes = c);
const A8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, zn || (zn = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M23.019 10.4332c-.595.3514-1.2795.5668-2.019.5668-2.2056 0-4-1.7944-4-4 0-.3557.0615-.6943.1492-1.0228l2.4368 2.4368.0005-.0004c.3621.3621.8621.5864 1.4136.5864 1.103 0 2-.897 2-2 0-.5515-.2242-1.0515-.5864-1.4136l.0005-.0004-2.4368-2.4368c.3284-.0875.667-.1491 1.0227-.1491 2.2056 0 4 1.7944 4 4 0 .7396-.2155 1.4241-.5669 2.0191l5.5669 5.5668-1.4141 1.4141-5.5669-5.5668zM16 30h-2v-5c-.0018-1.6561-1.3439-2.9982-3-3h-4c-1.6561.0018-2.9982 1.3439-3 3v5h-2v-5c.0033-2.7601 2.2399-4.9967 5-5h4c2.7601.0033 4.9967 2.2399 5 5v5zM9 10c1.6569 0 3 1.3431 3 3s-1.3431 3-3 3-3-1.3431-3-3c.0019-1.6561 1.3439-2.9981 3-3m0-2c-2.7614 0-5 2.2386-5 5s2.2386 5 5 5 5-2.2386 5-5-2.2386-5-5-5z"
  })), r);
});
process.env.NODE_ENV !== "production" && (A8.propTypes = c);
const _8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Zn || (Zn = /* @__PURE__ */ e.createElement("path", {
    d: "M25.334 11.95l1.2055-1.206a1.178 1.178 0 011.2593-.2584l1.4693.5868A1.1736 1.1736 0 0130 12.1489v2.692A1.1681 1.1681 0 0128.8229 16l-.05-.0015C18.4775 15.3578 16.4 6.6357 16.0073 3.2976a1.1681 1.1681 0 011.0315-1.29A1.1492 1.1492 0 0117.1751 2h2.5994a1.1626 1.1626 0 011.0764.7322l.5866 1.47a1.1635 1.1635 0 01-.2529 1.26L19.9791 6.668S20.6733 11.3682 25.334 11.95zM16 30H14V25a3.0033 3.0033 0 00-3-3H7a3.0033 3.0033 0 00-3 3v5H2V25a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM9 10a3 3 0 11-3 3 3 3 0 013-3M9 8a5 5 0 105 5A5 5 0 009 8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (_8.propTypes = c);
const x8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Rn || (Rn = /* @__PURE__ */ e.createElement("path", {
    d: "M30 10V8H27.8989a4.9678 4.9678 0 00-.7319-1.7529l1.49-1.49-1.414-1.414-1.49 1.49A4.9678 4.9678 0 0024 4.1011V2H22V4.1011a4.9678 4.9678 0 00-1.7529.7319l-1.49-1.49-1.414 1.414 1.49 1.49A4.9678 4.9678 0 0018.1011 8H16v2h2.1011a4.9678 4.9678 0 00.7319 1.7529l-1.49 1.49 1.414 1.414 1.49-1.49A4.9678 4.9678 0 0022 13.8989V16h2V13.8989a4.9678 4.9678 0 001.7529-.7319l1.49 1.49 1.414-1.414-1.49-1.49A4.9678 4.9678 0 0027.8989 10zm-7 2a3 3 0 113-3A3.0033 3.0033 0 0123 12zM16 30H14V25a3.0033 3.0033 0 00-3-3H7a3.0033 3.0033 0 00-3 3v5H2V25a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM9 10a3 3 0 11-3 3 3 3 0 013-3M9 8a5 5 0 105 5A5 5 0 009 8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (x8.propTypes = c);
const N8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, $n || ($n = /* @__PURE__ */ e.createElement("path", {
    d: "M25.232 12.866H29.232V14.866H25.232z",
    transform: "rotate(30 27.232 13.866)"
  })), Dn || (Dn = /* @__PURE__ */ e.createElement("path", {
    d: "M26 8H30V10H26z"
  })), Bn || (Bn = /* @__PURE__ */ e.createElement("path", {
    d: "M2.768 12.866H6.768V14.866H2.768z",
    transform: "rotate(150 4.768 13.866)"
  })), On || (On = /* @__PURE__ */ e.createElement("path", {
    d: "M26 30H24V25a5.0059 5.0059 0 00-5-5H13a5.0059 5.0059 0 00-5 5v5H6V25a7.0082 7.0082 0 017-7h6a7.0082 7.0082 0 017 7zM16 4a5 5 0 11-5 5 5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0016 2z"
  })), In || (In = /* @__PURE__ */ e.createElement("path", {
    d: "M25.232 3.134H29.232V5.134H25.232z",
    transform: "rotate(-30 27.232 4.134)"
  })), Sn || (Sn = /* @__PURE__ */ e.createElement("path", {
    d: "M2 8H6V10H2z"
  })), Wn || (Wn = /* @__PURE__ */ e.createElement("path", {
    d: "M2.768 3.134H6.768V5.134H2.768z",
    transform: "rotate(-150 4.768 4.134)"
  })), r);
});
process.env.NODE_ENV !== "production" && (N8.propTypes = c);
const C8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Un || (Un = /* @__PURE__ */ e.createElement("path", {
    d: "M29.4146,19,27.7,17.2852A2.97,2.97,0,0,0,28,16a3,3,0,1,0-3,3,2.97,2.97,0,0,0,1.2864-.3L28,20.4141V28H22V25a7.0078,7.0078,0,0,0-7-7H9a7.008,7.008,0,0,0-7,7v5H30V20.4141A1.988,1.988,0,0,0,29.4146,19ZM4,25a5.006,5.006,0,0,1,5-5h6a5.0059,5.0059,0,0,1,5,5v3H4Z"
  })), kn || (kn = /* @__PURE__ */ e.createElement("path", {
    d: "M12,4A5,5,0,1,1,7,9a5,5,0,0,1,5-5m0-2a7,7,0,1,0,7,7A7,7,0,0,0,12,2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (C8.propTypes = c);
const y8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Fn || (Fn = /* @__PURE__ */ e.createElement("path", {
    d: "M31.8301 13.3662L30.8301 11.6338 28 13.2681 28 10 26 10 26 13.2676 23.1699 11.6338 22.1699 13.3662 25 15 22.1699 16.6338 23.1699 18.3662 26 16.7324 26 20 28 20 28 16.7319 30.8301 18.3662 31.8301 16.6338 29 15 31.8301 13.3662zM22 30h-2v-5c-.0033-2.7601-2.2399-4.9967-5-5h-6c-2.7601.0033-4.9967 2.2399-5 5v5h-2v-5c.0045-3.8641 3.1359-6.9955 7-7h6c3.8641.0045 6.9955 3.1359 7 7v5zM12 4c2.7614 0 5 2.2386 5 5s-2.2386 5-5 5-5-2.2386-5-5c.0031-2.7601 2.2399-4.9969 5-5m0-2c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z"
  })), r);
});
process.env.NODE_ENV !== "production" && (y8.propTypes = c);
const T8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Pn || (Pn = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M28 9L28 7 25 7 25 5 23 5 23 7 20 7 20 9 23 9 23 12 20 12 20 14 23 14 23 16 25 16 25 14 28 14 28 12 25 12 25 9 28 9z"
  })), jn || (jn = /* @__PURE__ */ e.createElement("path", {
    d: "M31 3H17a1 1 0 00-1 1V17a1 1 0 001 1H31a1 1 0 001-1V4A1 1 0 0031 3zM28 9H25v3h3v2H25v2H23V14H20V12h3V9H20V7h3V5h2V7h3zM15 30H13V26a2.9465 2.9465 0 00-3-3H6a2.9465 2.9465 0 00-3 3v4H1V26a4.9514 4.9514 0 015-5h4a4.9514 4.9514 0 015 5zM8 11a3 3 0 010 6 3 3 0 010-6M8 9A5 5 0 008 19 5 5 0 008 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (T8.propTypes = c);
const b8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Gn || (Gn = /* @__PURE__ */ e.createElement("path", {
    d: "M19 13H26V15H19zM19 8H30V10H19zM19 3H30V5H19zM11 30H7a2.0059 2.0059 0 01-2-2V21a2.0059 2.0059 0 01-2-2V13a2.9465 2.9465 0 013-3h6a2.9465 2.9465 0 013 3v6a2.0059 2.0059 0 01-2 2v7A2.0059 2.0059 0 0111 30zM6 12a.9448.9448 0 00-1 1v6H7v9h4V19h2V13a.9448.9448 0 00-1-1zM9 9a4 4 0 114-4h0A4.0118 4.0118 0 019 9zM9 3a2 2 0 102 2h0A2.0059 2.0059 0 009 3z"
  })), r);
});
process.env.NODE_ENV !== "production" && (b8.propTypes = c);
const L8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Kn || (Kn = /* @__PURE__ */ e.createElement("path", {
    d: "M16,5.9121l1.7444,2.9326.7822,1.315,1.4739-.4107,3.1206-.87L22.2512,12,21.84,13.4731l1.315.7823L26.0876,16l-2.9323,1.7441-1.315.7818L22.2512,20l.87,3.1211-3.1208-.87L18.5266,21.84l-.7822,1.315L16,26.0879l-1.7444-2.9326-.7822-1.315L12,22.251l-3.1208.87L9.7488,20l.4109-1.4741-1.315-.7818L5.9124,16l2.9323-1.7446,1.315-.7823L9.7488,12l-.87-3.1206L12,9.749l1.4739.4107.7822-1.315L16,5.9121M16,2,12.5366,7.8223,6,6l1.8223,6.5366L2,16l5.8223,3.4629L6,26l6.5366-1.8223L16,30l3.4634-5.8223L26,26l-1.8223-6.5371L30,16l-5.8223-3.4634L26,6,19.4634,7.8223,16,2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (L8.propTypes = c);
const z8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Qn || (Qn = /* @__PURE__ */ e.createElement("path", {
    d: "M13 30H9a2.0027 2.0027 0 01-2-2V20H9v8h4V20h2v8A2.0027 2.0027 0 0113 30zM25 20L23.25 20 21 29.031 18.792 20 17 20 19.5 30 22.5 30 25 20zM15 2H17V7H15z"
  })), qn || (qn = /* @__PURE__ */ e.createElement("path", {
    d: "M21.668 6.854H26.625999999999998V8.854H21.668z",
    transform: "rotate(-45 24.147 7.853)"
  })), Xn || (Xn = /* @__PURE__ */ e.createElement("path", {
    d: "M25 15H30V17H25zM2 15H7V17H2z"
  })), Yn || (Yn = /* @__PURE__ */ e.createElement("path", {
    d: "M6.854 5.375H8.854V10.333H6.854z",
    transform: "rotate(-45 7.854 7.853)"
  })), Jn || (Jn = /* @__PURE__ */ e.createElement("path", {
    d: "M22,17H20V16a4,4,0,0,0-8,0v1H10V16a6,6,0,0,1,12,0Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (z8.propTypes = c);
const Z8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, eo || (eo = /* @__PURE__ */ e.createElement("path", {
    d: "M16,30l-3.4634-5.8223L6,26l1.8223-6.5369L2,16l5.8223-3.4631L6,6l6.5366,1.8223L16,2l3.4634,5.8223L26,6l-1.8223,6.5369L30,16l-5.8223,3.4631L26,26l-6.5366-1.8223Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Z8.propTypes = c);
const R8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, to || (to = /* @__PURE__ */ e.createElement("path", {
    d: "M26 28H22V26h4V6H22V4h4a2.0021 2.0021 0 012 2V26A2.0021 2.0021 0 0126 28zM20 11L18 11 16 14.897 14 11 12 11 14.905 16 12 21 14 21 16 17.201 18 21 20 21 17.098 16 20 11zM10 28H6a2.0021 2.0021 0 01-2-2V6A2.0021 2.0021 0 016 4h4V6H6V26h4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (R8.propTypes = c);
const $8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ro || (ro = /* @__PURE__ */ e.createElement("path", {
    d: "M29.81,16l-7-9.56A1,1,0,0,0,22,6H3A1,1,0,0,0,2,7V24a1,1,0,0,0,1,1H5.14a4,4,0,0,0,7.72,0h6.28a4,4,0,0,0,7.72,0H29a1,1,0,0,0,1-1V16.56A1,1,0,0,0,29.81,16ZM20,8h1.49l5.13,7H20ZM9,26a2,2,0,1,1,2-2A2,2,0,0,1,9,26Zm14,0a2,2,0,1,1,2-2A2,2,0,0,1,23,26Zm5-3H26.86a4,4,0,0,0-7.72,0H12.86a4,4,0,0,0-7.72,0H4V8H18v9H28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && ($8.propTypes = c);
const D8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, no || (no = /* @__PURE__ */ e.createElement("circle", {
    cx: "21.5",
    cy: "10.5",
    r: "1.5"
  })), oo || (oo = /* @__PURE__ */ e.createElement("path", {
    d: "M28.5 1a2.4518 2.4518 0 00-1.2061.3105L18.9834 5.6084l.0027.0054a5.497 5.497 0 107.3257 7.5444l.0031.0015 4.4-8.5A2.5 2.5 0 0028.5 1zm-7 13A3.5 3.5 0 1125 10.5 3.5042 3.5042 0 0121.5 14zM28.9414 3.7354L26.5571 8.3408A5.5279 5.5279 0 0023.658 5.4424l4.5949-2.377A.5165.5165 0 0129 3.5.4985.4985 0 0128.9414 3.7354zM19 20h7V18H17V28a2.0027 2.0027 0 002 2h3V28H19zM12 30H9V28h3V15.5664L8.4854 13.4575l1.0292-1.7148 3.5147 2.1084A2.0115 2.0115 0 0114 15.5664V28A2.0024 2.0024 0 0112 30z"
  })), ao || (ao = /* @__PURE__ */ e.createElement("path", {
    d: "M17.3079,2.2852A9.4882,9.4882,0,0,0,15,2,8.0275,8.0275,0,0,0,8.0786,6.001C8.0525,6,8.0264,6,8,6A6,6,0,0,0,8,18V16A4,4,0,0,1,8,8a2.7009,2.7009,0,0,1,.387.0391l.863.1142.3086-.6675A6.0192,6.0192,0,0,1,15,4a7.499,7.499,0,0,1,1.731.2148Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (D8.propTypes = c);
const B8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, lo || (lo = /* @__PURE__ */ e.createElement("path", {
    d: "M19 20h7v-2h-9v10c.0015 1.104.896 1.9985 2 2h3v-2h-3v-8zM12 30h-3v-2h3v-12.4336l-3.5146-2.1089 1.0292-1.7148 3.5147 2.1084c.6007.3632.9686 1.0133.9707 1.7153v12.4336c-.0013 1.104-.896 1.9987-2 2zM30 6.4102L28.59 5 25 8.5898 21.41 5 20 6.4102 23.59 10 20 13.5898 21.41 15 25 11.4102 28.59 15 30 13.5898 26.41 10 30 6.4102z"
  })), co || (co = /* @__PURE__ */ e.createElement("path", {
    d: "m17.3079,2.2852c-.7283-.1821-1.4995-.2852-2.3079-.2852-2.8545.0083-5.4897,1.5317-6.9214,4.001-.0261-.001-.0522-.001-.0786-.001-3.3137,0-6,2.6865-6,6s2.6863,6,6,6v-2c-2.209,0-4-1.791-4-4s1.791-4,4-4c.1299.0039.259.0166.387.0391l.863.1143.3086-.6675c.9834-2.1196,3.1047-3.4785,5.4414-3.4858.6079,0,1.1819.0854,1.731.2148l.5769-1.9297Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (B8.propTypes = c);
const O8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, io || (io = /* @__PURE__ */ e.createElement("path", {
    d: "m13,8l-5,5,1.4102,1.4102,2.5898-2.5801v16.1699h-3v2h3c1.104-.0015,1.9988-.896,2-2V11.8301l2.5898,2.5801,1.4102-1.4102-5-5Z"
  })), so || (so = /* @__PURE__ */ e.createElement("path", {
    d: "m22,30h-3c-1.104-.0013-1.9987-.896-2-2v-11h6c2.2096-.0001,4.0007-1.7915,4.0006-4.001,0-.1319-.0065-.2637-.0196-.395-.277-2.0943-2.0835-3.6461-4.1957-3.604h-1.5837l-.1766-.779c-.573-2.5249-2.9942-4.221-6.025-4.221-2.3366.0074-4.4579,1.3664-5.4415,3.4859l-.3085.6672-.863-.1143c-.1279-.022-.2573-.0349-.387-.0388-2.2091,0-4,1.7909-4,4s1.7909,4,4,4v2c-3.3137,0-6-2.6863-6-6s2.6863-6,6-6c.0264,0,.0525,0,.0786.001,1.4317-2.4694,4.067-3.9928,6.9214-4.001,3.6788,0,6.6923,1.9776,7.7516,5h.0337c3.1405-.0351,5.8053,2.2967,6.1872,5.4141.323,3.2985-2.0892,6.2344-5.3877,6.5573-.1943.019-.3895.0286-.5848.0286h-4v9h3v2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (O8.propTypes = c);
const I8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, ho || (ho = /* @__PURE__ */ e.createElement("path", {
    d: "M28 11a1.9907 1.9907 0 00-.8247.1821L24.8337 9.51A3.45 3.45 0 0025 8.5a3.45 3.45 0 00-.1663-1.01l2.3416-1.6723A1.9975 1.9975 0 1026 4c0 .064.0129.124.0188.1865L23.7273 5.8232A3.4652 3.4652 0 0021.5 5a3.5 3.5 0 000 7 3.4652 3.4652 0 002.2273-.8232l2.2915 1.6367C26.0129 12.876 26 12.936 26 13a2 2 0 102-2zm-6.5-1A1.5 1.5 0 1123 8.5 1.5017 1.5017 0 0121.5 10zM29.3379 19.9336l-7.7324-2.7783L18.374 13.0967A2.99 2.99 0 0016.0537 12H8.0576a2.9982 2.9982 0 00-2.48 1.3115L2.8662 17.2949A4.9884 4.9884 0 002 20.1074V26a1 1 0 001 1H5.1421a3.9806 3.9806 0 007.7158 0h6.2842a3.9806 3.9806 0 007.7158 0H29a1 1 0 001-1V20.875A1 1 0 0029.3379 19.9336zM9 28a2 2 0 112-2A2.0027 2.0027 0 019 28zm14 0a2 2 0 112-2A2.0025 2.0025 0 0123 28zm5-3H26.8579a3.9806 3.9806 0 00-7.7158 0H12.8579a3.9806 3.9806 0 00-7.7158 0H4V20.1074A2.9977 2.9977 0 014.52 18.4189l2.711-3.9814A.9992.9992 0 018.0576 14h7.9961a.9928.9928 0 01.7647.3545l3.3994 4.2685a1.0007 1.0007 0 00.4443.3184L28 21.5781z"
  })), r);
});
process.env.NODE_ENV !== "production" && (I8.propTypes = c);
const S8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, po || (po = /* @__PURE__ */ e.createElement("path", {
    d: "M29.3379 17.9336l-7.7324-2.7783L18.374 11.0967A2.99 2.99 0 0016.0537 10H8.0576a2.9982 2.9982 0 00-2.48 1.3115L2.8662 15.2949A4.9884 4.9884 0 002 18.1074V26a1 1 0 001 1H5.1421a3.9806 3.9806 0 007.7158 0h6.2842a3.9806 3.9806 0 007.7158 0H29a1 1 0 001-1V18.875A1 1 0 0029.3379 17.9336zM9 28a2 2 0 112-2A2.0027 2.0027 0 019 28zm14 0a2 2 0 112-2A2.0025 2.0025 0 0123 28zm5-3H26.8579a3.9806 3.9806 0 00-7.7158 0H12.8579a3.9806 3.9806 0 00-7.7158 0H4V18.1074A2.9977 2.9977 0 014.52 16.4189l2.711-3.9814A.9992.9992 0 018.0576 12h7.9961a.9928.9928 0 01.7647.3545l3.3994 4.2685a1.0007 1.0007 0 00.4443.3184L28 19.5781zM25 11H23a2.0021 2.0021 0 00-2-2V7A4.0045 4.0045 0 0125 11z"
  })), fo || (fo = /* @__PURE__ */ e.createElement("path", {
    d: "M29,11H27a6.0067,6.0067,0,0,0-6-6V3A8.0092,8.0092,0,0,1,29,11Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (S8.propTypes = c);
const W8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, wo || (wo = /* @__PURE__ */ e.createElement("path", {
    d: "M29.3379 17.9336l-7.7324-2.7783L18.374 11.0967A2.99 2.99 0 0016.0537 10H8.0576a2.9982 2.9982 0 00-2.48 1.3115L2.8662 15.2949A4.9884 4.9884 0 002 18.1074V26a1 1 0 001 1H5.1421a3.9806 3.9806 0 007.7158 0h6.2842a3.9806 3.9806 0 007.7158 0H29a1 1 0 001-1V18.875A1 1 0 0029.3379 17.9336zM9 28a2 2 0 112-2A2.0027 2.0027 0 019 28zm14 0a2 2 0 112-2A2.0025 2.0025 0 0123 28zm5-3H26.8579a3.9806 3.9806 0 00-7.7158 0H12.8579a3.9806 3.9806 0 00-7.7158 0H4V18.1074A2.9977 2.9977 0 014.52 16.4189l2.711-3.9814A.9992.9992 0 018.0576 12h7.9961a.9928.9928 0 01.7647.3545l3.3994 4.2685a1.0007 1.0007 0 00.4443.3184L28 19.5781zM28 2H30V9H28zM24 6H26V9H24zM20 4H22V9H20z"
  })), r);
});
process.env.NODE_ENV !== "production" && (W8.propTypes = c);
const U8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, uo || (uo = /* @__PURE__ */ e.createElement("path", {
    d: "M29.3379 17.9336l-7.7324-2.7783L18.374 11.0967A2.99 2.99 0 0016.0537 10H8.0576a2.9982 2.9982 0 00-2.48 1.3115L2.8662 15.2949A4.9884 4.9884 0 002 18.1074V26a1 1 0 001 1H5.1421a3.9806 3.9806 0 007.7158 0h6.2842a3.9806 3.9806 0 007.7158 0H29a1 1 0 001-1V18.875A1 1 0 0029.3379 17.9336zM9 28a2 2 0 112-2A2.0027 2.0027 0 019 28zm14 0a2 2 0 112-2A2.0025 2.0025 0 0123 28zm5-3H26.8579a3.9806 3.9806 0 00-7.7158 0H12.8579a3.9806 3.9806 0 00-7.7158 0H4V18.1074A2.9977 2.9977 0 014.52 16.4189l2.711-3.9814A.9992.9992 0 018.0576 12h7.9961a.9928.9928 0 01.7647.3545l3.3994 4.2685a1.0007 1.0007 0 00.4443.3184L28 19.5781zM24.5547 6a2 2 0 012-2H30a3.9756 3.9756 0 00-7.304 1H16V7h6.696A3.9756 3.9756 0 0030 8H26.5547A2 2 0 0124.5547 6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (U8.propTypes = c);
const k8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, mo || (mo = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2V4H26V19h2V4a2.0023,2.0023,0,0,0-2-2Z"
  })), vo || (vo = /* @__PURE__ */ e.createElement("path", {
    d: "M11,7V9H21V24h2V9a2.0023,2.0023,0,0,0-2-2Z"
  })), go || (go = /* @__PURE__ */ e.createElement("path", {
    d: "M6,12H16a2.0023,2.0023,0,0,1,2,2V28a2.0023,2.0023,0,0,1-2,2H6a2.0023,2.0023,0,0,1-2-2V14A2.0023,2.0023,0,0,1,6,12Zm10,2L6,13.9988V28H16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (k8.propTypes = c);
const F8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Eo || (Eo = /* @__PURE__ */ e.createElement("path", {
    d: "M18.5859 17.4141L16 14.8345 16 14.8345 13.4125 17.4156 12 16 16 12 20 16 18.5859 17.4141zM18.5859 11.4141L16 8.8345 16 8.8345 13.4125 11.4156 12 10 16 6 20 10 18.5859 11.4141zM18.5859 23.4141L16 20.8345 16 20.8345 13.4125 23.4156 12 22 16 18 20 22 18.5859 23.4141z"
  })), Vo || (Vo = /* @__PURE__ */ e.createElement("path", {
    d: "m1.5858,17.4142c-.3905-.3905-.5858-.9024-.5858-1.4142s.1953-1.0237.5858-1.4142L14.5858,1.5858c.3905-.3905.9023-.5858,1.4142-.5858s1.0237.1953,1.4142.5858l13,13c.3905.3905.5858.9024.5858,1.4142s-.1953,1.0237-.5858,1.4142l-13,13c-.3905.3905-.9024.5858-1.4142.5858s-1.0237-.1953-1.4142-.5858L1.5858,17.4142ZM16,3L3,16l13,13,13-13L16,3Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (F8.propTypes = c);
const P8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ho || (Ho = /* @__PURE__ */ e.createElement("path", {
    d: "M18.5859 15.4141L16 12.8345 16 12.8345 13.4125 15.4156 12 14 16 10 20 14 18.5859 15.4141zM18.5859 21.4141L16 18.8345 16 18.8345 13.4125 21.4156 12 20 16 16 20 20 18.5859 21.4141z"
  })), Mo || (Mo = /* @__PURE__ */ e.createElement("path", {
    d: "m1.5858,17.4142c-.3905-.3905-.5858-.9024-.5858-1.4142s.1953-1.0237.5858-1.4142L14.5858,1.5858c.3905-.3905.9023-.5858,1.4142-.5858s1.0237.1953,1.4142.5858l13,13c.3905.3905.5858.9024.5858,1.4142s-.1953,1.0237-.5858,1.4142l-13,13c-.3905.3905-.9024.5858-1.4142.5858s-1.0237-.1953-1.4142-.5858L1.5858,17.4142ZM16,3L3,16l13,13,13-13L16,3Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (P8.propTypes = c);
const j8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Ao || (Ao = /* @__PURE__ */ e.createElement("path", {
    d: "M18.5859 18.4141L16 15.8345 16 15.8345 13.4125 18.4156 12 17 16 13 20 17 18.5859 18.4141z"
  })), _o || (_o = /* @__PURE__ */ e.createElement("path", {
    d: "m1.5858,17.4142c-.3905-.3905-.5858-.9024-.5858-1.4142s.1953-1.0237.5858-1.4142L14.5858,1.5858c.3905-.3905.9023-.5858,1.4142-.5858s1.0237.1953,1.4142.5858l13,13c.3905.3905.5858.9024.5858,1.4142s-.1953,1.0237-.5858,1.4142l-13,13c-.3905.3905-.9024.5858-1.4142.5858s-1.0237-.1953-1.4142-.5858L1.5858,17.4142ZM16,3L3,16l13,13,13-13L16,3Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (j8.propTypes = c);
const G8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, xo || (xo = /* @__PURE__ */ e.createElement("path", {
    d: "M12 30H4a2.0021 2.0021 0 01-2-2V4A2.0021 2.0021 0 014 2h8a2.0021 2.0021 0 012 2V28A2.0021 2.0021 0 0112 30zM4 4V28h8V4zM28 30H20a2.0021 2.0021 0 01-2-2V4a2.0021 2.0021 0 012-2h8a2.0021 2.0021 0 012 2V28A2.0021 2.0021 0 0128 30zM20 4V28h8V4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (G8.propTypes = c);
const K8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, No || (No = /* @__PURE__ */ e.createElement("path", {
    d: "M21,26H4a2,2,0,0,1-2-2V8A2,2,0,0,1,4,6H21a2,2,0,0,1,2,2v4.06l5.42-3.87A1,1,0,0,1,30,9V23a1,1,0,0,1-1.58.81L23,19.94V24A2,2,0,0,1,21,26ZM4,8V24H21V18a1,1,0,0,1,1.58-.81L28,21.06V10.94l-5.42,3.87A1,1,0,0,1,21,14V8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (K8.propTypes = c);
const Q8 = {
  key: "Enter",
  which: 13,
  keyCode: 13,
  code: "Enter"
}, M1 = {
  key: [
    "Escape",
    // IE11 Escape
    "Esc"
  ],
  which: 27,
  keyCode: 27,
  code: "Esc"
}, q8 = {
  key: " ",
  which: 32,
  keyCode: 32,
  code: "Space"
}, f1 = (a, {
  key: r,
  which: t,
  keyCode: n,
  code: o
}) => typeof a == "string" ? a === r : typeof a == "number" ? a === t || a === n : a.key && Array.isArray(r) ? r.includes(a.key) : a.key === r || // TODO: When can these checks for deprecated properties be deleted?
// Presumably, the `Key` type should also be pruned of these properties.
a.which === t || a.keyCode === n || a.code === o, X8 = () => {
  let a = 0;
  return () => ++a;
}, Y8 = !!(typeof window < "u" && window.document && window.document.createElement), J8 = /* @__PURE__ */ e.createContext(null);
function Bo() {
  return e.useContext(J8);
}
const Oo = {
  ...e
}, C1 = X8(), e9 = Y8 ? u1 : Q;
let y1 = !1;
const Io = "id";
function t9(a = Io) {
  const r = Bo(), [t, n] = J(() => y1 ? `${r ? `${r}-` : ""}${a}-${C1()}` : null);
  return e9(() => {
    t === null && n(`${r ? `${r}-` : ""}${a}-${C1()}`);
  }, [C1]), Q(() => {
    y1 === !1 && (y1 = !0);
  }, []), t;
}
function r9(a = Io) {
  const r = Bo();
  return `${r ? `${r}-` : ""}${a}-${Oo.useId()}`;
}
const c1 = Oo.useId ? r9 : t9;
function n9(a) {
  const r = c1();
  return a ?? r;
}
const So = typeof window < "u" ? u1 : Q, _1 = (a) => H1((r) => {
  a.forEach((t) => {
    typeof t == "function" ? t(r) : t && (t.current = r);
  });
}, [a]), o9 = (a, r, t) => {
  const n = K(null);
  Q(() => {
    n.current = t;
  }, [t]), Q(() => {
    const o = "current" in a ? a.current : a;
    if (!o) return;
    const p = (d) => {
      n.current && n.current(d);
    };
    return o.addEventListener(r, p), () => {
      o.removeEventListener(r, p);
    };
  }, [a, r]);
}, T1 = (a, r) => {
  const t = K(null);
  Q(() => {
    t.current = r;
  }, [r]), Q(() => {
    const n = (o) => {
      t.current && t.current(o);
    };
    return window.addEventListener(a, n), () => {
      window.removeEventListener(a, n);
    };
  }, [a]);
}, a9 = {
  "top-left": "top-start",
  "top-right": "top-end",
  "bottom-left": "bottom-start",
  "bottom-right": "bottom-end",
  "left-bottom": "left-end",
  "left-top": "left-start",
  "right-bottom": "right-end",
  "right-top": "right-start"
}, x1 = (a) => a9[a] ?? a, Wo = {
  ...D
}, l9 = Wo.useInsertionEffect, c9 = l9 || ((a) => a());
function i9(a) {
  const r = D.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return c9(() => {
    r.current = a;
  }), D.useCallback(function() {
    for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
      n[o] = arguments[o];
    return r.current == null ? void 0 : r.current(...n);
  }, []);
}
var b1 = typeof document < "u" ? u1 : Q;
let Co = !1, s9 = 0;
const yo = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + s9++
);
function h9() {
  const [a, r] = D.useState(() => Co ? yo() : void 0);
  return b1(() => {
    a == null && r(yo());
  }, []), D.useEffect(() => {
    Co = !0;
  }, []), a;
}
const p9 = Wo.useId, f9 = p9 || h9;
let L1;
process.env.NODE_ENV !== "production" && (L1 = /* @__PURE__ */ new Set());
function d9() {
  for (var a, r = arguments.length, t = new Array(r), n = 0; n < r; n++)
    t[n] = arguments[n];
  const o = "Floating UI: " + t.join(" ");
  if (!((a = L1) != null && a.has(o))) {
    var p;
    (p = L1) == null || p.add(o), console.error(o);
  }
}
function w9() {
  const a = /* @__PURE__ */ new Map();
  return {
    emit(r, t) {
      var n;
      (n = a.get(r)) == null || n.forEach((o) => o(t));
    },
    on(r, t) {
      a.has(r) || a.set(r, /* @__PURE__ */ new Set()), a.get(r).add(t);
    },
    off(r, t) {
      var n;
      (n = a.get(r)) == null || n.delete(t);
    }
  };
}
const u9 = /* @__PURE__ */ D.createContext(null), m9 = /* @__PURE__ */ D.createContext(null), v9 = () => {
  var a;
  return ((a = D.useContext(u9)) == null ? void 0 : a.id) || null;
}, g9 = () => D.useContext(m9);
function E9(a) {
  const {
    open: r = !1,
    onOpenChange: t,
    elements: n
  } = a, o = f9(), p = D.useRef({}), [d] = D.useState(() => w9()), u = v9() != null;
  if (process.env.NODE_ENV !== "production") {
    const m = n.reference;
    m && !w1(m) && d9("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [h, A] = D.useState(n.reference), V = i9((m, N, s) => {
    p.current.openEvent = m ? N : void 0, d.emit("openchange", {
      open: m,
      event: N,
      reason: s,
      nested: u
    }), t == null || t(m, N, s);
  }), g = D.useMemo(() => ({
    setPositionReference: A
  }), []), _ = D.useMemo(() => ({
    reference: h || n.reference || null,
    floating: n.floating || null,
    domReference: n.reference
  }), [h, n.reference, n.floating]);
  return D.useMemo(() => ({
    dataRef: p,
    open: r,
    onOpenChange: V,
    elements: _,
    events: d,
    floatingId: o,
    refs: g
  }), [r, V, _, d, o, g]);
}
function V9(a) {
  a === void 0 && (a = {});
  const {
    nodeId: r
  } = a, t = E9({
    ...a,
    elements: {
      reference: null,
      floating: null,
      ...a.elements
    }
  }), n = a.rootContext || t, o = n.elements, [p, d] = D.useState(null), [u, h] = D.useState(null), V = (o == null ? void 0 : o.domReference) || p, g = D.useRef(null), _ = g9();
  b1(() => {
    V && (g.current = V);
  }, [V]);
  const m = p4({
    ...a,
    elements: {
      ...o,
      ...u && {
        reference: u
      }
    }
  }), N = D.useCallback((M) => {
    const C = w1(M) ? {
      getBoundingClientRect: () => M.getBoundingClientRect(),
      getClientRects: () => M.getClientRects(),
      contextElement: M
    } : M;
    h(C), m.refs.setReference(C);
  }, [m.refs]), s = D.useCallback((M) => {
    (w1(M) || M === null) && (g.current = M, d(M)), (w1(m.refs.reference.current) || m.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    M !== null && !w1(M)) && m.refs.setReference(M);
  }, [m.refs]), f = D.useMemo(() => ({
    ...m.refs,
    setReference: s,
    setPositionReference: N,
    domReference: g
  }), [m.refs, s, N]), H = D.useMemo(() => ({
    ...m.elements,
    domReference: V
  }), [m.elements, V]), w = D.useMemo(() => ({
    ...m,
    ...n,
    refs: f,
    elements: H,
    nodeId: r
  }), [m, f, H, r, n]);
  return b1(() => {
    n.dataRef.current.floatingContext = w;
    const M = _ == null ? void 0 : _.nodesRef.current.find((C) => C.id === r);
    M && (M.context = w);
  }), D.useMemo(() => ({
    ...m,
    context: w,
    refs: f,
    elements: H
  }), [m, f, H, w]);
}
const H9 = /* @__PURE__ */ Ro(a4);
i.node, Y(i.objectOf(i.bool), "The `flags` prop for `FeatureFlag` has been deprecated. Please run the `featureflag-deprecate-flags-prop` codemod to migrate to individual boolean props.npx @carbon/upgrade migrate featureflag-deprecate-flags-prop --write"), i.bool, i.bool, i.bool, i.bool, i.bool, i.bool, i.bool;
function Uo(a) {
  return Z1(H9).enabled(a);
}
i.elementType, i.node, i.string;
const ko = /* @__PURE__ */ e.createContext(void 0);
function Fo() {
  return Z1(ko);
}
function Po({
  align: a,
  as: r,
  autoAlign: t,
  className: n,
  children: o,
  defaultOpen: p = !1,
  ...d
}) {
  const u = K(null), [h, A] = J(p), V = I(), g = c1(), _ = b(`${V}--toggletip`, n, {
    [`${V}--toggletip--open`]: h,
    [`${V}--autoalign`]: t
  }), m = {
    toggle: () => {
      A(!h);
    },
    close: () => {
      A(!1);
    }
  }, N = {
    buttonProps: {
      "aria-expanded": h,
      "aria-controls": g,
      "aria-describedby": h ? g : void 0,
      onClick: m.toggle
    },
    contentProps: {
      id: g
    },
    onClick: {
      onClick: m.toggle
    }
  }, s = (H) => {
    var w;
    if (h && f1(H, M1)) {
      m.close();
      const M = (w = u.current) == null ? void 0 : w.children[0];
      M instanceof HTMLButtonElement && M.focus();
    }
  }, f = (H) => {
    h && H.relatedTarget === null || H.currentTarget.contains(H.relatedTarget) || m.close();
  };
  return T1("blur", () => {
    h && m.close();
  }), T1("click", ({
    target: H
  }) => {
    var w;
    h && H instanceof Node && !((w = u.current) != null && w.contains(H)) && m.close();
  }), /* @__PURE__ */ e.createElement(ko.Provider, {
    value: N
  }, /* @__PURE__ */ e.createElement(m1, U({
    align: a,
    as: r,
    caret: !0,
    className: _,
    dropShadow: !1,
    highContrast: !0,
    open: h,
    onKeyDown: s,
    onBlur: f,
    ref: u,
    autoAlign: t
  }, d), o));
}
Po.propTypes = {
  /**
   * Specify how the toggletip should align with the button
   */
  align: i.oneOf([
    "top",
    "top-left",
    // deprecated use top-start instead
    "top-right",
    // deprecated use top-end instead
    "bottom",
    "bottom-left",
    // deprecated use bottom-start instead
    "bottom-right",
    // deprecated use bottom-end instead
    "left",
    "left-bottom",
    // deprecated use left-end instead
    "left-top",
    // deprecated use left-start instead
    "right",
    "right-bottom",
    // deprecated use right-end instead
    "right-top",
    // deprecated use right-start instead
    // new values to match floating-ui
    "top-start",
    "top-end",
    "bottom-start",
    "bottom-end",
    "left-end",
    "left-start",
    "right-end",
    "right-start"
  ]),
  /**
   * **Experimental:** Provide an offset value for alignment axis. Only takes effect when `autoalign` is enabled.
   */
  alignmentAxisOffset: i.number,
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: i.elementType,
  /**
   * Will auto-align the popover on first render if it is not visible. This prop
   * is currently experimental and is subject to future changes. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: i.bool,
  /**
   * Custom children to be rendered as the content of the label
   */
  children: i.node,
  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: i.string,
  /**
   * Specify if the toggletip should be open by default
   */
  defaultOpen: i.bool
};
const N1 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  className: t,
  label: n = "Show information",
  as: o,
  ...p
}, d) {
  const u = Fo(), h = I(), A = b(`${h}--toggletip-button`, t), V = o ?? "button";
  return V !== "button" ? /* @__PURE__ */ e.createElement(V, U({}, u == null ? void 0 : u.onClick, {
    className: A
  }, p), r) : /* @__PURE__ */ e.createElement("button", U({}, u == null ? void 0 : u.buttonProps, {
    "aria-label": n,
    type: "button",
    className: A,
    ref: d
  }, p), r);
});
N1.propTypes = {
  /**
   * Custom children to be rendered as the content of the label
   */
  children: i.node,
  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: i.string,
  /**
   * Provide an accessible label for this button
   */
  label: i.string
};
N1.displayName = "ToggletipButton";
const $1 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  className: t
}, n) {
  const o = Fo(), p = I();
  return /* @__PURE__ */ e.createElement(d1, U({
    className: t
  }, o == null ? void 0 : o.contentProps, {
    ref: n
  }), /* @__PURE__ */ e.createElement("div", {
    className: `${p}--toggletip-content`
  }, r));
});
$1.propTypes = {
  /**
   * Custom children to be rendered as the content of the label
   */
  children: i.node,
  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: i.string
};
$1.displayName = "ToggletipContent";
function jo({
  children: a,
  className: r
}) {
  const t = I(), n = b(`${t}--toggletip-actions`, r);
  return /* @__PURE__ */ e.createElement("div", {
    className: n
  }, a);
}
jo.propTypes = {
  /**
   * Custom children to be rendered as the content of the label
   */
  children: i.node,
  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: i.string
};
const Go = /* @__PURE__ */ e.createContext({
  setFloating: {
    current: null
  },
  caretRef: {
    current: null
  },
  autoAlign: null
}), m1 = /* @__PURE__ */ e.forwardRef(function({
  isTabTip: r,
  align: t = r ? "bottom-start" : "bottom",
  as: n = "span",
  autoAlign: o = !1,
  autoAlignBoundary: p,
  caret: d = !r,
  className: u,
  children: h,
  dropShadow: A = !0,
  highContrast: V = !1,
  onRequestClose: g,
  open: _,
  alignmentAxisOffset: m,
  ...N
}, s) {
  var e1;
  const f = I(), H = K(null), w = K(null), M = K(null), C = Uo("enable-v12-dynamic-floating-styles") || o;
  let y = x1(t);
  o9(M, "focusout", (R) => {
    var F;
    const E = R.relatedTarget;
    if (!E)
      return;
    const O = !((F = M.current) != null && F.contains(E)), W = C && z.floating.current ? !z.floating.current.contains(E) : !0;
    O && W && (g == null || g());
  }), T1("click", ({
    target: R
  }) => {
    var E;
    _ && R instanceof Node && !((E = M.current) != null && E.contains(R)) && (g == null || g());
  });
  const $ = e.Children.toArray(h).some((R) => {
    var E, O, W, F;
    return ((O = (E = R == null ? void 0 : R.props) == null ? void 0 : E.className) == null ? void 0 : O.includes("slug")) || ((F = (W = R == null ? void 0 : R.props) == null ? void 0 : W.className) == null ? void 0 : F.includes("ai-label"));
  }) ? 7 : 6, x = K({
    offset: 10,
    caretHeight: $
  });
  So(() => {
    if (d && M.current) {
      const R = window.getComputedStyle(M.current, null), E = R.getPropertyValue("--cds-popover-offset"), O = R.getPropertyValue("--cds-popover-caret-height");
      E && (x.current.offset = E.includes("px") ? Number(E.split("px", 1)[0]) * 1 : Number(E.split("rem", 1)[0]) * 16), O && (x.current.caretHeight = O.includes("px") ? Number(O.split("px", 1)[0]) * 1 : Number(O.split("rem", 1)[0]) * 16);
    }
  });
  const {
    refs: z,
    floatingStyles: v,
    placement: k,
    middlewareData: P
  } = V9(
    C ? {
      placement: y,
      // The floating element is positioned relative to its nearest
      // containing block (usually the viewport). It will in many cases also
      // “break” the floating element out of a clipping ancestor.
      // https://floating-ui.com/docs/misc#clipping
      strategy: "fixed",
      // Middleware order matters, arrow should be last
      middleware: [f4(r ? 0 : {
        alignmentAxis: m,
        mainAxis: (e1 = x == null ? void 0 : x.current) == null ? void 0 : e1.offset
      }), o && d4({
        fallbackPlacements: r ? y.includes("bottom") ? ["bottom-start", "bottom-end", "top-start", "top-end"] : ["top-start", "top-end", "bottom-start", "bottom-end"] : y.includes("bottom") ? ["bottom", "bottom-start", "bottom-end", "right", "right-start", "right-end", "left", "left-start", "left-end", "top", "top-start", "top-end"] : ["top", "top-start", "top-end", "left", "left-start", "left-end", "right", "right-start", "right-end", "bottom", "bottom-start", "bottom-end"],
        fallbackStrategy: "initialPlacement",
        fallbackAxisSideDirection: "start",
        boundary: p
      }), w4({
        element: w
      }), o && u4()],
      whileElementsMounted: m4
    } : {}
    // When autoAlign is turned off & the `enable-v12-dynamic-floating-styles` feature flag is not
    // enabled, floating-ui will not be used
  ), S = s4(() => ({
    floating: H,
    setFloating: z.setFloating,
    caretRef: w,
    autoAlign: o
  }), [z.setFloating, o]);
  r && (["bottom-start", "bottom-end"].includes(y) || (y = "bottom-start")), Q(() => {
    var R, E;
    if (C) {
      const O = {
        ...v,
        visibility: (R = P.hide) != null && R.referenceHidden ? "hidden" : "visible"
      };
      if (Object.keys(O).forEach((W) => {
        z.floating.current && (z.floating.current.style[W] = O[W]);
      }), d && P && P.arrow && (w != null && w.current)) {
        const {
          x: W,
          y: F
        } = P.arrow, L = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[k.split("-")[0]];
        w.current.style.left = W != null ? `${W}px` : "", w.current.style.top = F != null ? `${F}px` : "", w.current.style.right = "", w.current.style.bottom = "", L && (w.current.style[L] = `${-((E = x == null ? void 0 : x.current) == null ? void 0 : E.caretHeight)}px`);
      }
    }
  }, [v, z.floating, C, P, k, d]);
  const q = _1([s, M]), j = o && k !== y ? k : y, B = b({
    [`${f}--popover-container`]: !0,
    [`${f}--popover--caret`]: d,
    [`${f}--popover--drop-shadow`]: A,
    [`${f}--popover--high-contrast`]: V,
    [`${f}--popover--open`]: _,
    [`${f}--popover--auto-align ${f}--autoalign`]: C,
    [`${f}--popover--${j}`]: !0,
    [`${f}--popover--tab-tip`]: r
  }, u), G = e.Children.map(h, (R) => {
    var n1, i1;
    const E = R, O = (n1 = E == null ? void 0 : E.type) == null ? void 0 : n1.displayName, W = (E == null ? void 0 : E.type) === "button", F = C && O && ["ToggletipButton"].includes(O), L = C && !["ToggletipContent", "PopoverContent"].includes(O);
    if (/* @__PURE__ */ e.isValidElement(E) && (W || F || L)) {
      const X = (i1 = E == null ? void 0 : E.props) == null ? void 0 : i1.className, t1 = (E == null ? void 0 : E.props).ref, g1 = b(`${f}--popover--tab-tip__button`, X);
      return /* @__PURE__ */ e.cloneElement(E, {
        className: r && (E == null ? void 0 : E.type) === "button" ? g1 : X || "",
        // With cloneElement, if you pass a `ref`, it overrides the original ref.
        // https://react.dev/reference/react/cloneElement#parameters
        // The block below works around this and ensures that the original ref is still
        // called while allowing the floating-ui reference element to be set as well.
        // `useMergedRefs` can't be used here because hooks can't be called from within a callback.
        // More here: https://github.com/facebook/react/issues/8873#issuecomment-489579878
        ref: (h1) => {
          (C && (E == null ? void 0 : E.type) !== d1 || C && (E == null ? void 0 : E.type) === N1) && z.setReference(h1), typeof t1 == "function" ? t1(h1) : t1 != null && (t1.current = h1);
        }
      });
    } else
      return E;
  }), T = n;
  return /* @__PURE__ */ e.createElement(Go.Provider, {
    value: S
  }, /* @__PURE__ */ e.createElement(T, U({}, N, {
    className: B,
    ref: q
  }), C || r ? G : h));
});
process.env.NODE_ENV !== "production" && (m1.displayName = "Popover");
m1.propTypes = {
  /**
   * Specify how the popover should align with the trigger element
   */
  align: z1(i.oneOf([
    "top",
    "top-left",
    // deprecated use top-start instead
    "top-right",
    // deprecated use top-end instead
    "bottom",
    "bottom-left",
    // deprecated use bottom-start instead
    "bottom-right",
    // deprecated use bottom-end instead
    "left",
    "left-bottom",
    // deprecated use left-end instead
    "left-top",
    // deprecated use left-start instead
    "right",
    "right-bottom",
    // deprecated use right-end instead
    "right-top",
    // deprecated use right-start instead
    // new values to match floating-ui
    "top-start",
    "top-end",
    "bottom-start",
    "bottom-end",
    "left-end",
    "left-start",
    "right-end",
    "right-start"
  ]), ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"], x1),
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: i.oneOfType([i.string, i.elementType]),
  /**
   * Will auto-align the popover on first render if it is not visible. This prop
   * is currently experimental and is subject to future changes. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: i.bool,
  /**
   * Specify a bounding element to be used for autoAlign calculations. The viewport is used by default. This prop is currently experimental and is subject to future changes.
   */
  autoAlignBoundary: i.oneOfType([i.oneOf(["clippingAncestors"]), i.elementType, i.arrayOf(i.elementType), i.exact({
    x: i.number.isRequired,
    y: i.number.isRequired,
    width: i.number.isRequired,
    height: i.number.isRequired
  })]),
  /**
   * Specify whether a caret should be rendered
   */
  caret: i.bool,
  /**
   * Provide elements to be rendered inside of the component
   */
  children: i.node,
  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: i.string,
  /**
   * Specify whether a drop shadow should be rendered on the popover
   */
  dropShadow: i.bool,
  /**
   * Render the component using the high-contrast variant
   */
  highContrast: i.bool,
  /**
   * Render the component using the tab tip variant
   */
  isTabTip: i.bool,
  /**
   * Specify a handler for closing popover.
   * The handler should take care of closing the popover, e.g. changing the `open` prop.
   */
  onRequestClose: i.func,
  /**
   * Specify whether the component is currently open or closed
   */
  open: i.bool.isRequired
};
function M9({
  className: a,
  children: r,
  ...t
}, n) {
  const o = I(), {
    setFloating: p,
    caretRef: d,
    autoAlign: u
  } = e.useContext(Go), h = K(null), [A, V] = e.useState(!1), g = _1([p, h, n]), _ = Uo("enable-v12-dynamic-floating-styles") || u;
  Q(() => {
    m();
  }, [r]);
  const m = () => {
    const N = h.current;
    if (N) {
      const s = getComputedStyle(N), f = parseFloat(s.lineHeight), H = N.offsetHeight, w = Math.floor(H / f);
      V(w > 1);
    }
  };
  return /* @__PURE__ */ e.createElement("span", U({}, t, {
    className: `${o}--popover`
  }), /* @__PURE__ */ e.createElement("span", {
    className: b(`${o}--popover-content`, a, {
      [`${o}--tooltip-content--multiline`]: A
    }),
    ref: g
  }, r, _ && /* @__PURE__ */ e.createElement("span", {
    className: b({
      [`${o}--popover-caret`]: !0,
      [`${o}--popover--auto-align`]: !0
    }),
    ref: d
  })), !_ && /* @__PURE__ */ e.createElement("span", {
    className: b({
      [`${o}--popover-caret`]: !0
    }),
    ref: d
  }));
}
const d1 = /* @__PURE__ */ e.forwardRef(M9);
d1.displayName = "PopoverContent";
d1.propTypes = {
  /**
   * Provide elements to be rendered inside of the component
   */
  children: i.node,
  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: i.string
};
const Ko = ({
  align: a = "bottom",
  autoAlign: r,
  className: t,
  children: n,
  definition: o,
  defaultOpen: p = !1,
  id: d,
  openOnHover: u,
  tooltipText: h,
  triggerClassName: A,
  ...V
}) => {
  const [g, _] = J(p), m = I(), N = n9(d);
  function s(f) {
    g && f1(f, M1) && (f.stopPropagation(), _(!1));
  }
  return /* @__PURE__ */ e.createElement(m1, {
    align: a,
    className: t,
    autoAlign: r,
    dropShadow: !1,
    highContrast: !0,
    onMouseLeave: () => {
      _(!1);
    },
    onMouseEnter: () => {
      u && _(!0);
    },
    onFocus: () => {
      _(!0);
    },
    open: g
  }, /* @__PURE__ */ e.createElement("button", U({}, V, {
    className: b(`${m}--definition-term`, A),
    "aria-controls": N,
    "aria-describedby": N,
    "aria-expanded": g,
    onBlur: () => {
      _(!1);
    },
    onMouseDown: (f) => {
      f.button === 0 && _(!g);
    },
    onKeyDown: s,
    type: "button"
  }), n), /* @__PURE__ */ e.createElement(d1, {
    className: `${m}--definition-tooltip`,
    id: N
  }, h ?? o));
};
Ko.propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: i.oneOf([
    "top",
    "top-left",
    // deprecated use top-start instead
    "top-right",
    // deprecated use top-end instead
    "bottom",
    "bottom-left",
    // deprecated use bottom-start instead
    "bottom-right",
    // deprecated use bottom-end instead
    "left",
    "left-bottom",
    // deprecated use left-end instead
    "left-top",
    // deprecated use left-start instead
    "right",
    "right-bottom",
    // deprecated use right-end instead
    "right-top",
    // deprecated use right-start instead
    // new values to match floating-ui
    "top-start",
    "top-end",
    "bottom-start",
    "bottom-end",
    "left-end",
    "left-start",
    "right-end",
    "right-start"
  ]),
  /**
   * Will auto-align the popover. This prop is currently experimental and is
   * subject to future changes. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: i.bool,
  /**
   * The `children` prop will be used as the value that is being defined
   */
  children: i.node.isRequired,
  /**
   * Specify an optional className to be applied to the container node
   */
  className: i.string,
  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen: i.bool,
  /**
   * The `definition` prop is used as the content inside of the tooltip that
   * appears when a user interacts with the element rendered by the `children`
   * prop
   */
  definition: i.node.isRequired,
  /**
   * Provide a value that will be assigned as the id of the tooltip
   */
  id: i.string,
  /**
   * Specifies whether or not the `DefinitionTooltip` should open on hover or not
   */
  openOnHover: i.bool,
  /**
   * [Deprecated in v11] Please use the `definition` prop instead.
   *
   * Provide the text that will be displayed in the tooltip when it is rendered.
   */
  tooltipText: Y(i.node, "The tooltipText prop has been deprecated. Please use the `definition` prop instead."),
  /**
   * The CSS class name of the trigger element
   */
  triggerClassName: i.string
};
function A9(a) {
  const [r, t] = J(a), n = K(null), o = H1((p, d = 0) => {
    if (window.clearTimeout(n.current ?? void 0), n.current = null, d === 0) {
      t(p);
      return;
    }
    n.current = window.setTimeout(() => {
      t(p), n.current = null;
    }, d);
  }, []);
  return Q(() => () => {
    window.clearTimeout(n.current ?? void 0);
  }, []), [r, o];
}
const To = /* @__PURE__ */ new Set(["mouseup", "touchend", "touchcancel"]), D1 = /* @__PURE__ */ e.forwardRef(({
  as: a,
  align: r = "top",
  className: t,
  children: n,
  label: o,
  description: p,
  enterDelayMs: d = 100,
  leaveDelayMs: u = 300,
  defaultOpen: h = !1,
  closeOnActivation: A = !1,
  dropShadow: V = !1,
  highContrast: g = !0,
  ..._
}, m) => {
  const N = K(null), [s, f] = A9(h), [H, w] = J(!1), [M, C] = J(!1), [y, $] = J(!1), x = c1("tooltip"), z = I(), v = e.Children.only(n), {
    "aria-labelledby": k,
    "aria-describedby": P
  } = (v == null ? void 0 : v.props) ?? {}, S = !!o, B = {
    onFocus: () => !M && f(!0),
    onBlur: () => {
      f(!1), C(!1);
    },
    onClick: () => A && f(!1),
    // This should be placed on the trigger in case the element is disabled
    onMouseEnter: e1,
    onMouseLeave: E,
    onMouseDown: R,
    onMouseMove: O,
    onTouchStart: W,
    "aria-labelledby": k ?? (S ? x : void 0),
    "aria-describedby": P ?? (S ? void 0 : x)
  };
  function G(L) {
    const n1 = Object.keys(B).filter((X) => X.startsWith("on")), i1 = {};
    return n1.forEach((X) => {
      i1[X] = (t1) => {
        B[X](t1), L != null && L[X] && (L == null || L[X](t1));
      };
    }), i1;
  }
  const T = H1((L) => {
    s && f1(L, M1) && (L.stopPropagation(), f(!1)), s && A && (f1(L, Q8) || f1(L, q8)) && f(!1);
  }, [A, s, f]);
  So(() => {
    if (!s)
      return;
    function L(n1) {
      f1(n1, M1) && T(n1);
    }
    return document.addEventListener("keydown", L), () => {
      document.removeEventListener("keydown", L);
    };
  }, [s, T]);
  function e1() {
    _ != null && _.onMouseEnter || ($(!0), f(!0, d));
  }
  function R() {
    C(!0), W();
  }
  function E() {
    $(!1), !H && f(!1, u);
  }
  function O(L) {
    L.buttons === 1 ? w(!0) : w(!1);
  }
  function W() {
    w(!0);
  }
  const F = H1(() => {
    w(!1), y || f(!1, u);
  }, [y, u, f]);
  return l4(N, "The Tooltip component must have no interactive content rendered by the`label` or `description` prop"), Q(() => (H && To.forEach((L) => {
    document.addEventListener(L, F);
  }), () => {
    To.forEach((L) => {
      document.removeEventListener(L, F);
    });
  }), [H, F]), /* @__PURE__ */ e.createElement(m1, U({
    as: a,
    ref: m
  }, _, {
    align: r,
    className: b(`${z}--tooltip`, t),
    dropShadow: V,
    highContrast: g,
    onKeyDown: T,
    onMouseLeave: E,
    open: s
  }), /* @__PURE__ */ e.createElement("div", {
    className: `${z}--tooltip-trigger__wrapper`
  }, typeof v < "u" ? /* @__PURE__ */ e.cloneElement(v, {
    ...B,
    ...G(v.props)
  }) : null), /* @__PURE__ */ e.createElement(d1, {
    "aria-hidden": s ? "false" : "true",
    className: `${z}--tooltip-content`,
    id: x,
    onMouseEnter: e1,
    role: "tooltip"
  }, o || p));
});
D1.propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: i.oneOf([
    "top",
    "top-left",
    // deprecated use top-start instead
    "top-right",
    // deprecated use top-end instead
    "bottom",
    "bottom-left",
    // deprecated use bottom-start instead
    "bottom-right",
    // deprecated use bottom-end instead
    "left",
    "left-bottom",
    // deprecated use left-end instead
    "left-top",
    // deprecated use left-start instead
    "right",
    "right-bottom",
    // deprecated use right-end instead
    "right-top",
    // deprecated use right-start instead
    // new values to match floating-ui
    "top-start",
    "top-end",
    "bottom-start",
    "bottom-end",
    "left-end",
    "left-start",
    "right-end",
    "right-start"
  ]),
  /**
   * Pass in the child to which the tooltip will be applied
   */
  children: i.node,
  /**
   * Specify an optional className to be applied to the container node
   */
  className: i.string,
  /**
   * Determines wether the tooltip should close when inner content is activated (click, Enter or Space)
   */
  closeOnActivation: i.bool,
  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen: i.bool,
  /**
   * Provide the description to be rendered inside of the Tooltip. The
   * description will use `aria-describedby` and will describe the child node
   * in addition to the text rendered inside of the child. This means that if you
   * have text in the child node, that it will be announced alongside the
   * description to the screen reader.
   *
   * Note: if label and description are both provided, label will be used and
   * description will not be used
   */
  description: i.node,
  /**
   * Specify whether a drop shadow should be rendered
   */
  dropShadow: i.bool,
  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs: i.number,
  /**
   * Render the component using the high-contrast theme
   */
  highContrast: i.bool,
  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node, that it will not be
   * announced to the screen reader.
   *
   * Note: if label and description are both provided, description will not be
   * used
   */
  label: i.node,
  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: i.number
};
const Qo = /* @__PURE__ */ e.forwardRef(function({
  as: r,
  children: t,
  className: n,
  dangerDescription: o = "danger",
  disabled: p = !1,
  hasIconOnly: d = !1,
  href: u,
  iconDescription: h,
  isExpressive: A = !1,
  isSelected: V,
  kind: g = "primary",
  onBlur: _,
  onClick: m,
  onFocus: N,
  onMouseEnter: s,
  onMouseLeave: f,
  renderIcon: H,
  size: w,
  tabIndex: M,
  type: C = "button",
  ...y
}, $) {
  const x = I(), z = b(n, {
    [`${x}--btn`]: !0,
    [`${x}--btn--xs`]: w === "xs" && !A,
    // TODO: V12 - Remove this class
    [`${x}--btn--sm`]: w === "sm" && !A,
    // TODO: V12 - Remove this class
    [`${x}--btn--md`]: w === "md" && !A,
    // TODO: V12 - Remove this class
    [`${x}--btn--lg`]: w === "lg" && !A,
    // TODO: V12 - Remove this class
    [`${x}--btn--xl`]: w === "xl",
    // TODO: V12 - Remove this class
    [`${x}--btn--2xl`]: w === "2xl",
    // TODO: V12 - Remove this class
    [`${x}--layout--size-${w}`]: w,
    [`${x}--btn--${g}`]: g,
    [`${x}--btn--disabled`]: p,
    [`${x}--btn--expressive`]: A,
    [`${x}--btn--icon-only`]: d,
    [`${x}--btn--selected`]: d && V && g === "ghost"
  }), v = {
    tabIndex: M,
    className: z,
    ref: $
  }, k = H ? /* @__PURE__ */ e.createElement(H, {
    "aria-label": h,
    className: `${x}--btn__icon`,
    "aria-hidden": "true"
  }) : null, P = ["danger", "danger--tertiary", "danger--ghost"];
  let S = "button";
  const q = c1("danger-description"), {
    "aria-pressed": j,
    "aria-describedby": B
  } = y;
  let G = {
    disabled: p,
    type: C,
    "aria-describedby": P.includes(g) ? q : B || void 0,
    "aria-pressed": j ?? (d && g === "ghost" ? V : void 0)
  };
  const T = {
    href: u
  };
  let e1 = null;
  return P.includes(g) && (e1 = /* @__PURE__ */ e.createElement("span", {
    id: q,
    className: `${x}--visually-hidden`
  }, o)), r ? (S = r, G = {
    ...G,
    ...T
  }) : u && !p && (S = "a", G = T), /* @__PURE__ */ e.createElement(S, {
    onMouseEnter: s,
    onMouseLeave: f,
    onFocus: N,
    onBlur: _,
    onClick: m,
    ...y,
    ...v,
    ...G
  }, e1, t, k);
}), qo = /* @__PURE__ */ e.forwardRef(function({
  className: r,
  count: t,
  ...n
}, o) {
  const p = I(), d = b(`${p}--badge-indicator`, r, {
    [`${p}--badge-indicator--count`]: t
  }), u = t && t > 999 ? "999+" : t;
  return /* @__PURE__ */ e.createElement("div", U({
    className: d,
    ref: o
  }, n), u);
});
qo.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: i.string,
  /**
   * Count of badge indicator
   */
  count: i.number,
  /**
   * Provide an `id` to uniquely identify the BadgeIndidcator
   */
  id: i.string
};
const Xo = ["primary", "secondary", "ghost", "tertiary"], B1 = /* @__PURE__ */ e.forwardRef(function({
  align: r,
  autoAlign: t = !1,
  badgeCount: n,
  children: o,
  className: p,
  closeOnActivation: d = !0,
  defaultOpen: u = !1,
  disabled: h,
  dropShadow: A = !1,
  enterDelayMs: V = 100,
  highContrast: g = !0,
  kind: _,
  label: m,
  leaveDelayMs: N = 100,
  wrapperClasses: s,
  size: f,
  isSelected: H,
  ...w
}, M) {
  const C = I(), y = b(s, `${C}--icon-tooltip`, {
    [`${C}--icon-tooltip--disabled`]: h
  });
  n && (_ !== "ghost" || f !== "lg") && console.warn("The prop BadgeCount must be used with hasIconOnly=true, kind='ghost' and size='lg'");
  const $ = c1("badge-indicator");
  return /* @__PURE__ */ e.createElement(D1, {
    align: r,
    autoAlign: t,
    closeOnActivation: d,
    className: y,
    defaultOpen: u,
    dropShadow: A,
    enterDelayMs: V,
    highContrast: g,
    label: m,
    leaveDelayMs: N
  }, /* @__PURE__ */ e.createElement(Qo, U({}, w, {
    disabled: h,
    kind: _,
    ref: M,
    size: f,
    isSelected: H,
    hasIconOnly: !0,
    className: p,
    "aria-describedby": w["aria-describedby"] || n && $
  }), o, !h && n !== void 0 && /* @__PURE__ */ e.createElement(qo, {
    id: $,
    count: n > 0 ? n : void 0
  })));
});
B1.propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: z1(i.oneOf([
    "top",
    "top-left",
    // deprecated use top-start instead
    "top-right",
    // deprecated use top-end instead
    "bottom",
    "bottom-left",
    // deprecated use bottom-start instead
    "bottom-right",
    // deprecated use bottom-end instead
    "left",
    "left-bottom",
    // deprecated use left-end instead
    "left-top",
    // deprecated use left-start instead
    "right",
    "right-bottom",
    // deprecated use right-end instead
    "right-top",
    // deprecated use right-start instead
    // new values to match floating-ui
    "top-start",
    "top-end",
    "bottom-start",
    "bottom-end",
    "left-end",
    "left-start",
    "right-end",
    "right-start"
  ]), ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"], x1),
  /**
   * **Experimental**: Will attempt to automatically align the tooltip. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: i.bool,
  /**
   * **Experimental**: Display a badge on the button. An empty/dot badge if 0, a numbered badge if > 0.
   * Must be used with size="lg", kind="ghost" and hasIconOnly=true
   */
  badgeCount: i.number,
  /**
   * Optionally specify an href for your IconButton to become an `<a>` element
   */
  href: i.string,
  /**
   * Provide an icon or asset to be rendered inside of the IconButton
   */
  children: i.node,
  /**
   * Specify an optional className to be added to your Button
   */
  className: i.string,
  /**
   * Determines whether the tooltip should close when inner content is activated (click, Enter or Space)
   */
  closeOnActivation: i.bool,
  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen: i.bool,
  /**
   * Specify whether a drop shadow should be rendered on the tooltip
   */
  dropShadow: i.bool,
  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled: i.bool,
  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs: i.number,
  /**
   * Specify whether the IconButton is currently selected
   */
  isSelected: i.bool,
  /**
   * Render the tooltip using the high-contrast theme
   */
  highContrast: i.bool,
  /**
   * Specify the type of button to be used as the base for the IconButton
   */
  kind: i.oneOf(Xo),
  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader.
   * If using `badgeCount={0}`, make sure the label explains that there is a
   * new notification.
   */
  label: i.node.isRequired,
  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: i.number,
  /**
   * Optionally specify a `rel` when using an `<a>` element.
   */
  rel: i.string,
  /**
   * Specify the size of the Button.
   */
  size: i.oneOf(["sm", "md", "lg"]),
  /**
   * Optionally specify a `target` when using an `<a>` element.
   */
  target: i.string,
  /**
   * Specify an optional className to be added to your Tooltip wrapper
   */
  wrapperClasses: i.string
};
const _9 = ["primary", "secondary", "danger", "ghost", "danger--primary", "danger--ghost", "danger--tertiary", "tertiary"];
function x9(a, r) {
  return a === !0;
}
const O1 = /* @__PURE__ */ e.forwardRef((a, r) => {
  const {
    as: t,
    autoAlign: n = !1,
    children: o,
    hasIconOnly: p = !1,
    tooltipHighContrast: d = !0,
    tooltipDropShadow: u = !1,
    iconDescription: h,
    kind: A = "primary",
    onBlur: V,
    onClick: g,
    onFocus: _,
    onMouseEnter: m,
    onMouseLeave: N,
    renderIcon: s,
    size: f,
    tooltipAlignment: H = "center",
    tooltipPosition: w = "top",
    ...M
  } = a;
  s && !o && !h && console.error("Button: renderIcon property specified without also providing an iconDescription property. This may impact accessibility for screen reader users.");
  const C = s ? /* @__PURE__ */ e.createElement(s, null) : null;
  if (x9(p)) {
    let y;
    return (w === "top" || w === "bottom") && (H === "center" && (y = w), H === "end" && (y = `${w}-end`), H === "start" && (y = `${w}-start`)), (w === "right" || w === "left") && (y = w), // @ts-expect-error - `IconButton` does not support all `size`s that
    // `Button` supports.
    //
    // TODO: What should be done here?
    // 1. Should the `IconButton` not be rendered if the `size` is not
    //    supported?
    // 2. Should an error be thrown?
    // 3. Something else?
    /* @__PURE__ */ e.createElement(B1, U({}, M, {
      ref: r,
      as: t,
      align: y,
      label: h,
      kind: A,
      size: f,
      highContrast: d,
      dropShadow: u,
      onMouseEnter: m,
      onMouseLeave: N,
      onFocus: _,
      onBlur: V,
      autoAlign: n,
      onClick: g,
      renderIcon: C ? null : s
      // avoid doubling the icon.
    }), C ?? o);
  } else {
    const {
      tooltipAlignment: y,
      ...$
    } = a;
    return /* @__PURE__ */ e.createElement(Qo, U({
      ref: r
    }, $));
  }
});
O1.displayName = "Button";
O1.propTypes = {
  /**
   * Specify how the button itself should be rendered.
   * Make sure to apply all props to the root node and render children appropriately
   */
  as: i.oneOfType([i.func, i.string, i.elementType]),
  /**
   * **Experimental**: Will attempt to automatically align the tooltip. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: i.bool,
  /**
   * Specify the content of your Button
   */
  children: i.node,
  /**
   * Specify an optional className to be added to your Button
   */
  className: i.string,
  /**
   * Specify the message read by screen readers for the danger button variant
   */
  dangerDescription: i.string,
  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled: i.bool,
  /**
   * Specify if the button is an icon-only button
   */
  hasIconOnly: i.bool,
  /**
   * Optionally specify an href for your Button to become an `<a>` element
   */
  href: i.string,
  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can
   * be read by screen readers
   */
  iconDescription: (a) => a.renderIcon && !a.children && !a.iconDescription ? new Error("renderIcon property specified without also providing an iconDescription property.") : null,
  /**
   * Specify whether the Button is expressive, or not
   */
  isExpressive: i.bool,
  /**
   * Specify whether the Button is currently selected. Only applies to the Ghost variant.
   */
  isSelected: i.bool,
  /**
   * Specify the kind of Button you want to create
   */
  kind: (a, r, t) => {
    const {
      hasIconOnly: n
    } = a, o = n ? Xo : _9;
    return a[r] === void 0 || o.includes(a[r]) ? null : new Error(`Invalid prop \`${r}\` supplied to \`${t}\`. Expected one of ${o.join(", ")}.`);
  },
  /**
   * Provide an optional function to be called when the button element
   * loses focus
   */
  onBlur: i.func,
  /**
   * Provide an optional function to be called when the button element
   * is clicked
   */
  onClick: i.func,
  /**
   * Provide an optional function to be called when the button element
   * receives focus
   */
  onFocus: i.func,
  /**
   * Provide an optional function to be called when the mouse
   * enters the button element
   */
  onMouseEnter: i.func,
  /**
   * Provide an optional function to be called when the mouse
   * leaves the button element
   */
  onMouseLeave: i.func,
  /**
   * Optionally specify a `rel` when using an `<a>` element.
   */
  rel: i.string,
  /**
   * A component used to render an icon.
   */
  renderIcon: i.oneOfType([i.func, i.object]),
  /**
   * Optional prop to specify the role of the Button
   */
  role: i.string,
  /**
   * Specify the size of the button, from the following list of sizes:
   */
  size: i.oneOf(["xs", "sm", "md", "lg", "xl", "2xl"]),
  /**
   * Optional prop to specify the tabIndex of the Button
   */
  tabIndex: i.number,
  /**
   * Optionally specify a `target` when using an `<a>` element.
   */
  target: i.string,
  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: i.oneOf(["start", "center", "end"]),
  /**
   * Enable drop shadow for tooltips for icon-only buttons.
   */
  tooltipDropShadow: i.bool,
  /**
   * Enable high-contrast theme for tooltips for icon-only buttons.
   * Defaults to true.
   */
  tooltipHighContrast: i.bool,
  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition: i.oneOf(["top", "right", "bottom", "left"]),
  /**
   * Optional prop to specify the type of the Button
   */
  type: i.oneOf(["button", "reset", "submit"])
};
var bo;
const Yo = /* @__PURE__ */ e.forwardRef(function({
  className: r,
  children: t,
  ...n
}, o) {
  const p = I(), d = e.Children.toArray(t).some((h) => {
    h.type;
  }), u = b(r, {
    [`${p}--ai-label-content`]: !0,
    [`${p}--ai-label-content--with-actions`]: d
  });
  return /* @__PURE__ */ e.createElement($1, {
    className: u
  }, t);
});
Yo.displayName = "AILabelContent";
Yo.propTypes = {
  /**
   * Specify the content you want rendered inside the AILabel ToggleTip
   */
  children: i.node,
  /**
   * Specify an optional className to be added to the AILabel callout
   */
  className: i.string
};
const I1 = /* @__PURE__ */ e.forwardRef(function({
  className: r,
  children: t,
  ...n
}, o) {
  const p = I(), d = b(r, {
    [`${p}--ai-label-actions`]: !0
  });
  return /* @__PURE__ */ e.createElement(jo, {
    className: d
  }, t);
});
I1.displayName = "AILabelActions";
I1.propTypes = {
  /**
   * Specify the content you want rendered inside the AILabel callout toolbar
   */
  children: i.node,
  /**
   * Specify an optional className to be added to the AILabel toolbar
   */
  className: i.string
};
const v1 = /* @__PURE__ */ e.forwardRef(function({
  aiText: r = "AI",
  aiTextLabel: t,
  textLabel: n,
  align: o,
  autoAlign: p = !0,
  children: d,
  className: u,
  kind: h = "default",
  onRevertClick: A,
  revertActive: V,
  revertLabel: g = "Revert to AI input",
  slugLabel: _ = "Show information",
  ["aria-label"]: m = "Show information",
  size: N = "xs",
  ...s
}, f) {
  const H = I(), w = c1("AILabel"), M = b(u, {
    [`${H}--ai-label`]: !0,
    [`${H}--ai-label--revert`]: V
  }), C = b({
    [`${H}--ai-label__button`]: !0,
    [`${H}--ai-label__button--${N}`]: N,
    [`${H}--ai-label__button--${h}`]: h,
    [`${H}--ai-label__button--inline-with-content`]: h === "inline" && (t || n)
  }), y = (z) => {
    A && A(z);
  }, $ = !t && !n ? `${r} ${_ || m}` : `${r} ${t || n}`, x = ["xs", "2xs", "mini"].includes(N);
  return /* @__PURE__ */ e.createElement("div", {
    className: M,
    ref: f,
    id: w
  }, V ? /* @__PURE__ */ e.createElement(B1, U({
    onClick: y,
    kind: "ghost",
    size: "sm",
    label: g
  }, s), bo || (bo = /* @__PURE__ */ e.createElement(Do, null))) : /* @__PURE__ */ e.createElement(Po, U({
    align: o,
    autoAlign: p,
    alignmentAxisOffset: x ? -24 : 0
  }, s), /* @__PURE__ */ e.createElement(N1, {
    className: C,
    label: h === "inline" ? "" : $
  }, /* @__PURE__ */ e.createElement("span", {
    className: `${H}--ai-label__text`
  }, r), h === "inline" && (t || n) && /* @__PURE__ */ e.createElement("span", {
    className: `${H}--ai-label__additional-text`
  }, t || n)), d));
});
v1.displayName = "AILabel";
v1.propTypes = {
  /**
   * Specify the content you want rendered inside the `AILabel` ToggleTip
   */
  AILabelContent: i.node,
  /**
   * Specify the correct translation of the AI text
   */
  aiText: i.string,
  /**
   * @deprecated
   * Specify additional text to be rendered next to the AI label in the inline variant
   */
  aiTextLabel: Y(i.string, "`aiTextLabel` on `AILabel` has been deprecated - Please use the `textLabel` prop instead"),
  /**
   * Specify how the popover should align with the button
   */
  align: z1(i.oneOf([
    "top",
    "top-left",
    // deprecated use top-start instead
    "top-right",
    // deprecated use top-end instead
    "bottom",
    "bottom-left",
    // deprecated use bottom-start instead
    "bottom-right",
    // deprecated use bottom-end instead
    "left",
    "left-bottom",
    // deprecated use left-end instead
    "left-top",
    // deprecated use left-start instead
    "right",
    "right-bottom",
    // deprecated use right-end instead
    "right-top",
    // deprecated use right-start instead
    // new values to match floating-ui
    "top-start",
    "top-end",
    "bottom-start",
    "bottom-end",
    "left-end",
    "left-start",
    "right-end",
    "right-start"
  ]), ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"], x1),
  /**
   * Specify the text that will be provided to the aria-label of the `AILabel` button
   */
  "aria-label": i.string,
  /**
   * Will auto-align the popover. This prop is currently experimental and is
   * subject to future changes. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: i.bool,
  /**
   * Specify the content you want rendered inside the `AILabel` ToggleTip
   */
  children: i.node,
  /**
   * Specify an optional className to be added to the `AILabel`
   */
  className: i.string,
  /**
   * Specify the type of `AILabel`, from the following list of types:
   */
  kind: i.oneOf(["default", "inline"]),
  /**
   * Callback function that fires when the revert button is clicked
   */
  onRevertClick: i.func,
  /**
   * Specify whether the revert button should be visible
   */
  revertActive: i.bool,
  /**
   * Specify the text that should be shown when the revert button is hovered
   */
  revertLabel: i.string,
  /**
   * Specify the size of the button, from the following list of sizes:
   */
  size: i.oneOf(["mini", "2xs", "xs", "sm", "md", "lg", "xl"]),
  /**
   * @deprecated
   * Specify the text that will be provided to the aria-label of the `AILabel` button
   */
  slugLabel: Y(i.string, "`slugLabel` on `AILabel` has been deprecated - Please use the `ariaLabel` prop instead"),
  /**
   * Specify additional text to be rendered next to the AI label in the inline variant
   */
  textLabel: i.string
};
const S1 = (a, r) => /* @__PURE__ */ h4(a) && a.type === r, N9 = /* @__PURE__ */ Ro({
  isFluid: !1
}), C9 = (...a) => (r) => {
  a.forEach((t) => {
    typeof t == "function" ? t(r) : Object(t) === t && (t.current = r);
  });
}, y9 = ({
  id: a,
  readOnly: r,
  disabled: t,
  invalid: n,
  invalidText: o,
  warn: p,
  warnText: d
}) => {
  const u = I(), h = {
    disabled: !r && t,
    invalid: !r && n,
    invalidId: `${a}-error-msg`,
    warn: !r && !n && p,
    warnId: `${a}-warn-msg`,
    validation: null,
    icon: null,
    helperId: `${a}-helper-text`
  };
  return h.invalid ? (h.icon = c4, h.validation = /* @__PURE__ */ e.createElement(o1, {
    as: "div",
    className: `${u}--form-requirement`,
    id: h.invalidId
  }, o)) : h.warn && (h.icon = i4, h.validation = /* @__PURE__ */ e.createElement(o1, {
    as: "div",
    className: `${u}--form-requirement`,
    id: h.warnId
  }, d)), h;
}, Jo = (a) => a ? (a == null ? void 0 : a.offsetWidth) < (a == null ? void 0 : a.scrollWidth) : !1;
var Lo;
const A1 = {
  red: "Red",
  magenta: "Magenta",
  purple: "Purple",
  blue: "Blue",
  cyan: "Cyan",
  teal: "Teal",
  green: "Green",
  gray: "Gray",
  "cool-gray": "Cool-Gray",
  "warm-gray": "Warm-Gray",
  "high-contrast": "High-Contrast",
  outline: "Outline"
}, e4 = {
  sm: "sm",
  md: "md",
  lg: "lg"
}, T9 = /* @__PURE__ */ e.forwardRef(({
  children: a,
  className: r,
  decorator: t,
  id: n,
  type: o,
  filter: p,
  // remove filter in next major release - V12
  renderIcon: d,
  title: u = "Clear filter",
  // remove title in next major release - V12
  disabled: h,
  onClose: A,
  // remove onClose in next major release - V12
  size: V,
  as: g,
  slug: _,
  ...m
}, N) => {
  const s = I(), f = K(null);
  p && console.warn("The `filter` prop for Tag has been deprecated and will be removed in the next major version. Use DismissibleTag instead."), A && console.warn("The `onClose` prop for Tag has been deprecated and will be removed in the next major version. Use DismissibleTag instead.");
  const H = _1([N, f]), w = n || `tag-${c1()}`, [M, C] = J(!1);
  u1(() => {
    var G;
    const B = (G = f.current) == null ? void 0 : G.getElementsByClassName(`${s}--tag__label`)[0];
    C(Jo(B));
  }, [s, f]);
  const $ = [`${s}--tag--selectable`, `${s}--tag--filter`, `${s}--tag--operational`].some((B) => r == null ? void 0 : r.includes(B)), x = b(`${s}--tag`, r, {
    [`${s}--tag--disabled`]: h,
    [`${s}--tag--filter`]: p,
    [`${s}--tag--${V}`]: V,
    // TODO: V12 - Remove this class
    [`${s}--layout--size-${V}`]: V,
    [`${s}--tag--${o}`]: o,
    [`${s}--tag--interactive`]: m.onClick && !$ && M
  }), z = o !== void 0 && o in Object.keys(A1) ? A1[o] : "", v = (B) => {
    A && (B.stopPropagation(), A(B));
  }, k = _ ?? t, S = S1(k, v1) && !$ ? /* @__PURE__ */ R1(k, {
    size: "sm",
    kind: "inline"
  }) : null;
  if (p) {
    const B = g ?? "div";
    return /* @__PURE__ */ e.createElement(B, U({
      className: x,
      id: w
    }, m), d && V !== "sm" ? /* @__PURE__ */ e.createElement("div", {
      className: `${s}--tag__custom-icon`
    }, /* @__PURE__ */ e.createElement(d, null)) : "", /* @__PURE__ */ e.createElement(o1, {
      title: typeof a == "string" ? a : void 0,
      className: `${s}--tag__label`
    }, a ?? z), S, /* @__PURE__ */ e.createElement("button", {
      type: "button",
      className: `${s}--tag__close-icon`,
      onClick: v,
      disabled: h,
      "aria-label": u,
      title: u
    }, Lo || (Lo = /* @__PURE__ */ e.createElement(Zo, null))));
  }
  const q = g ?? (m.onClick || r != null && r.includes(`${s}--tag--operational`) ? "button" : "div"), j = b({
    [`${s}--tag__label`]: !$
  });
  return /* @__PURE__ */ e.createElement(q, U({
    ref: H,
    disabled: h,
    className: x,
    id: w,
    type: q === "button" ? "button" : void 0
  }, m), d && V !== "sm" ? /* @__PURE__ */ e.createElement("div", {
    className: `${s}--tag__custom-icon`
  }, /* @__PURE__ */ e.createElement(d, null)) : "", M && !$ ? /* @__PURE__ */ e.createElement(Ko, {
    openOnHover: !1,
    definition: a ?? z,
    className: `${s}--definition--tooltip--tag`
  }, /* @__PURE__ */ e.createElement(o1, {
    title: a != null && typeof a == "string" ? a : z,
    className: j
  }, a ?? z)) : /* @__PURE__ */ e.createElement(o1, {
    title: a != null && typeof a == "string" ? a : z,
    className: j
  }, a ?? z), _ ? S : t ? /* @__PURE__ */ e.createElement("div", {
    className: `${s}--tag__decorator`
  }, S) : "");
}), t4 = T9;
t4.propTypes = {
  /**
   * Provide an alternative tag or component to use instead of the default
   * wrapping element
   */
  as: i.elementType,
  /**
   * Provide content to be rendered inside of a `Tag`
   */
  children: i.node,
  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: i.string,
  /**
   * **Experimental:** Provide a `decorator` component to be rendered inside the `Tag` component
   */
  decorator: i.node,
  /**
   * Specify if the `Tag` is disabled
   */
  disabled: i.bool,
  /**
   * Determine if `Tag` is a filter/chip
   */
  filter: Y(i.bool, "The `filter` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead."),
  /**
   * Specify the id for the tag.
   */
  id: i.string,
  /**
   * Click handler for filter tag close button.
   */
  onClose: Y(i.func, "The `onClose` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead."),
  /**
   * A component used to render an icon.
   */
  renderIcon: i.oneOfType([i.func, i.object]),
  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size: i.oneOf(Object.keys(e4)),
  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `Tag` component
   */
  slug: Y(i.node, "The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead."),
  /**
   * Text to show on clear filters
   */
  title: Y(i.string, "The `title` prop has been deprecated and will be removed in the next major version. Use DismissibleTag instead."),
  /**
   * Specify the type of the `Tag`
   */
  type: i.oneOf(Object.keys(A1))
};
var zo;
const r4 = /* @__PURE__ */ l1(({
  className: a,
  decorator: r,
  disabled: t,
  id: n,
  renderIcon: o,
  title: p = "Dismiss",
  onClose: d,
  slug: u,
  size: h,
  text: A,
  tagTitle: V,
  type: g,
  dismissTooltipLabel: _ = "Dismiss tag",
  ...m
}, N) => {
  const s = I(), f = K(null), H = n || `tag-${c1()}`, w = b(`${s}--tag--filter`, a), [M, C] = J(!1);
  u1(() => {
    var B;
    const j = (B = f.current) == null ? void 0 : B.getElementsByClassName(`${s}--tag__label`)[0];
    C(Jo(j));
  }, [s, f]);
  const y = C9(f, N), $ = (j) => {
    d && (j.stopPropagation(), d(j));
  }, x = u ?? r, v = S1(x, v1) ? /* @__PURE__ */ R1(x, {
    size: "sm",
    kind: "inline"
  }) : null, k = b(`${s}--icon-tooltip`, `${s}--tag-label-tooltip`), {
    onClick: P,
    ...S
  } = m, q = M ? _ : p;
  return /* @__PURE__ */ e.createElement(t4, U({
    ref: y,
    type: g,
    size: h,
    renderIcon: o,
    disabled: t,
    className: w,
    id: H
  }, S), /* @__PURE__ */ e.createElement("div", {
    className: `${s}--interactive--tag-children`
  }, /* @__PURE__ */ e.createElement(o1, {
    title: V || A,
    className: `${s}--tag__label`
  }, A), u ? v : r ? /* @__PURE__ */ e.createElement("div", {
    className: `${s}--tag__decorator`
  }, v) : "", /* @__PURE__ */ e.createElement(D1, {
    label: q,
    align: "bottom",
    className: k,
    leaveDelayMs: 0,
    closeOnActivation: !0
  }, /* @__PURE__ */ e.createElement("button", {
    type: "button",
    className: `${s}--tag__close-icon`,
    onClick: $,
    disabled: t,
    "aria-label": q
  }, zo || (zo = /* @__PURE__ */ e.createElement(Zo, null))))));
});
r4.propTypes = {
  /**
   * Provide a custom className that is applied to the containing <span>
   */
  className: i.string,
  /**
   * **Experimental:** Provide a `decorator` component to be rendered inside the `DismissibleTag` component
   */
  decorator: i.node,
  /**
   * Specify if the `DismissibleTag` is disabled
   */
  disabled: i.bool,
  /**
   * Provide a custom tooltip label for the dismiss button
   */
  dismissTooltipLabel: i.string,
  /**
   * Specify the id for the tag.
   */
  id: i.string,
  /**
   * Click handler for filter tag close button.
   */
  onClose: i.func,
  /**
   * A component used to render an icon.
   */
  renderIcon: i.oneOfType([i.func, i.object]),
  /**
   * Specify the size of the Tag. Currently supports either `sm`,
   * `md` (default) or `lg` sizes.
   */
  size: i.oneOf(Object.keys(e4)),
  /**
   * **Experimental:** Provide a `Slug` component to be rendered inside the `DismissibleTag` component
   */
  slug: Y(i.node, "The `slug` prop has been deprecated and will be removed in the next major version. Use the decorator prop instead."),
  /**
   * Provide text to be rendered inside of a the tag.
   */
  text: i.string,
  /**
   * Provide a custom `title` to be inserted in the tag.
   */
  tagTitle: i.string,
  /**
   * Text to show on clear filters
   */
  title: i.string,
  /**
   * Specify the type of the `Tag`
   */
  type: i.oneOf(Object.keys(A1))
};
const b9 = (a) => ({
  "data-invalid": !0,
  "aria-invalid": !0,
  "aria-describedby": a
}), L9 = (a) => ({
  "aria-describedby": a
}), z9 = (a) => ({
  "aria-describedby": a
}), Z9 = ({
  sharedTextInputProps: a,
  invalid: r,
  invalidId: t,
  warn: n,
  warnId: o,
  hasHelper: p,
  helperId: d
}) => ({
  ...a,
  ...r ? b9(t) : {},
  ...n ? L9(o) : {},
  ...p ? z9(d) : {}
}), R9 = (a, r, t = "character", n = "characters") => {
  if (typeof r > "u") return null;
  const o = r - a;
  return o <= 10 && o > 0 ? `${o} ${o === 1 ? t : n} left.` : o <= 0 ? `Maximum ${n} reached.` : null;
}, W1 = /* @__PURE__ */ e.forwardRef(function({
  className: r,
  decorator: t,
  disabled: n = !1,
  helperText: o,
  hideLabel: p,
  id: d,
  inline: u = !1,
  invalid: h = !1,
  invalidText: A,
  labelText: V,
  light: g,
  onChange: _ = () => {
  },
  onClick: m = () => {
  },
  placeholder: N,
  readOnly: s,
  size: f,
  type: H = "text",
  warn: w = !1,
  warnText: M,
  enableCounter: C = !1,
  maxCount: y,
  slug: $,
  ...x
}, z) {
  const v = I(), {
    defaultValue: k,
    value: P
  } = x, S = K(null), q = _1([z, S]);
  function j() {
    var a1;
    return (k || P || ((a1 = S.current) == null ? void 0 : a1.value) || "").toString().length;
  }
  const [B, G] = J(j());
  Q(() => {
    G(j());
  }, [P, k, C]);
  const T = y9({
    id: d,
    readOnly: s,
    disabled: n,
    invalid: h,
    invalidText: A,
    warn: w,
    warnText: M
  }), e1 = b(`${v}--text-input`, {
    [`${v}--text-input--light`]: g,
    [`${v}--text-input--invalid`]: T.invalid,
    [`${v}--text-input--warning`]: T.warn,
    [`${v}--text-input--${f}`]: f,
    // TODO: V12 - Remove this class
    [`${v}--layout--size-${f}`]: f
  }), R = {
    id: d,
    onChange: (r1) => {
      var a1;
      T.disabled || (G((a1 = r1.target.value) == null ? void 0 : a1.length), _(r1));
    },
    onClick: (r1) => {
      T.disabled || m(r1);
    },
    placeholder: N,
    type: H,
    ref: q,
    className: e1,
    title: N,
    disabled: T.disabled,
    readOnly: s,
    "aria-describedby": o && T.helperId,
    ...x
  };
  C && (R.maxLength = y);
  const E = b([b(`${v}--form-item`, r)], `${v}--text-input-wrapper`, {
    [`${v}--text-input-wrapper--readonly`]: s,
    [`${v}--text-input-wrapper--light`]: g,
    [`${v}--text-input-wrapper--inline`]: u,
    [`${v}--text-input-wrapper--inline--invalid`]: u && T.invalid
  }), O = b(`${v}--label`, {
    [`${v}--visually-hidden`]: p,
    [`${v}--label--disabled`]: T.disabled,
    [`${v}--label--inline`]: u,
    [`${v}--label--inline--${f}`]: u && !!f
  }), W = b(`${v}--form__helper-text`, {
    [`${v}--form__helper-text--disabled`]: T.disabled,
    [`${v}--form__helper-text--inline`]: u
  }), F = b(`${v}--text-input__field-outer-wrapper`, {
    [`${v}--text-input__field-outer-wrapper--inline`]: u
  }), L = b(`${v}--text-input__field-wrapper`, {
    [`${v}--text-input__field-wrapper--warning`]: T.warn,
    [`${v}--text-input__field-wrapper--slug`]: $,
    [`${v}--text-input__field-wrapper--decorator`]: t
  }), n1 = b({
    [`${v}--text-input__invalid-icon`]: T.invalid || T.warn,
    [`${v}--text-input__invalid-icon--warning`]: T.warn
  }), i1 = b(`${v}--label`, {
    [`${v}--label--disabled`]: n,
    [`${v}--text-input__label-counter`]: !0
  }), X = C && y ? /* @__PURE__ */ e.createElement(o1, {
    as: "div",
    className: i1
  }, `${B}/${y}`) : null, t1 = V ? /* @__PURE__ */ e.createElement(o1, {
    as: "label",
    htmlFor: d,
    className: O
  }, V) : null, g1 = /* @__PURE__ */ e.createElement("div", {
    className: `${v}--text-input__label-wrapper`
  }, t1, X), h1 = o ? /* @__PURE__ */ e.createElement(o1, {
    as: "div",
    id: T.helperId,
    className: W
  }, o) : null, n4 = /* @__PURE__ */ e.createElement("input", Z9({
    sharedTextInputProps: R,
    invalid: T.invalid,
    invalidId: T.invalidId,
    warn: T.warn,
    warnId: T.warnId
  })), {
    isFluid: E1
  } = Z1(N9), U1 = K(null), [k1, o4] = J(""), p1 = R9(B, y);
  Q(() => {
    if (p1 && p1 !== k1) {
      const r1 = U1.current;
      if (r1) {
        r1.textContent = "";
        const a1 = setTimeout(() => {
          r1 && (r1.textContent = p1, o4(p1));
        }, 1e3);
        return () => {
          a1 && clearTimeout(a1);
        };
      }
    }
  }, [p1, k1]);
  const F1 = T.icon, P1 = $ ?? t, j1 = S1(P1, v1) ? /* @__PURE__ */ R1(P1, {
    size: "mini"
  }) : null;
  return /* @__PURE__ */ e.createElement("div", {
    className: E
  }, u ? /* @__PURE__ */ e.createElement("div", {
    className: `${v}--text-input__label-helper-wrapper`
  }, g1, !E1 && (T.validation || h1)) : g1, /* @__PURE__ */ e.createElement("div", {
    className: F
  }, /* @__PURE__ */ e.createElement("div", {
    className: L,
    "data-invalid": T.invalid || null
  }, F1 && /* @__PURE__ */ e.createElement(F1, {
    className: n1
  }), n4, $ ? j1 : t ? /* @__PURE__ */ e.createElement("div", {
    className: `${v}--text-input__field-inner-wrapper--decorator`
  }, j1) : "", /* @__PURE__ */ e.createElement("span", {
    className: `${v}--text-input__counter-alert`,
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true",
    ref: U1
  }, p1), E1 && /* @__PURE__ */ e.createElement("hr", {
    className: `${v}--text-input__divider`
  }), E1 && !u && T.validation), !E1 && !u && (T.validation || h1)));
});
W1.displayName = "TextInput";
W1.propTypes = {
  /**
   * Specify an optional className to be applied to the `<input>` node
   */
  className: i.string,
  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TextInput` component
   */
  decorator: i.node,
  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: i.oneOfType([i.string, i.number]),
  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: i.bool,
  /**
   * Specify whether to display the character counter
   */
  enableCounter: i.bool,
  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: i.node,
  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: i.bool,
  /**
   * Specify a custom `id` for the `<input>`
   */
  id: i.string.isRequired,
  /**
   * `true` to use the inline version.
   */
  inline: i.bool,
  /**
   * Specify whether the control is currently invalid
   */
  invalid: i.bool,
  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: i.node,
  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: i.node.isRequired,
  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: Y(i.bool, "The `light` prop for `TextInput` has been deprecated in favor of the new `Layer` component. It will be removed in the next major release."),
  /**
   * Max character count allowed for the input. This is needed in order for enableCounter to display
   */
  maxCount: i.number,
  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange: i.func,
  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick: i.func,
  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: i.string,
  /**
   * Whether the input should be read-only
   */
  readOnly: i.bool,
  /**
   * Specify the size of the Text Input. Currently supports the following:
   */
  size: i.oneOf(["sm", "md", "lg"]),
  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TextInput` component
   */
  slug: Y(i.node, "The `slug` prop for `TextInput` has been deprecated in favor of the new `decorator` prop. It will be removed in the next major release."),
  /**
   * Specify the type of the `<input>`
   */
  type: i.string,
  /**
   * Specify the value of the `<input>`
   */
  value: i.oneOfType([i.string, i.number]),
  /**
   * Specify whether the control is currently in warning state
   */
  warn: i.bool,
  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: i.node
};
const F9 = [
  {
    label: "DB2 Subsystems",
    value: "KDP",
    id: "%IBM.STATIC017",
    apply: V1
  },
  {
    label: "MVS CICSTG",
    value: "KGW",
    id: "%IBM.STATIC115",
    apply: V1
  },
  {
    label: "IMS Subsystems",
    value: "KIP",
    id: "%IBM.STATIC014",
    apply: V1
  }
], P9 = [
  {
    id: "db2id",
    value: "${db2id}",
    label: "DB2 variable",
    apply: V1
  }
], j9 = l1(function(r, t) {
  return /* @__PURE__ */ s1(
    "div",
    {
      ...r,
      ref: t,
      className: "fui:flex fui:flex-row fui:items-center fui:bg-[var(--cds-field)] fui:!p-[2px] fui:focus-within:!outline-[2px] fui:focus-within:!outline-offset-[-2px] fui:focus-within:!outline-[var(--cds-focus)]",
      style: {
        borderBlockEnd: "1px solid var(--cds-border-strong)"
      }
    }
  );
}), G9 = l1(function(r, t) {
  return /* @__PURE__ */ s1(O1, { ...r, hasIconOnly: !0, size: "md", kind: "ghost", iconDescription: "Open", renderIcon: $o, ref: t });
}), K9 = l1(function(r, t) {
  return /* @__PURE__ */ s1(W1, { ...r, ref: t, labelText: "", id: "fui-input" });
}), Q9 = l1(function(r, t) {
  return /* @__PURE__ */ s1("div", { ...r, ref: t, className: "fui:bg-[var(--cds-field)] fui:text-[var(--cds-text-primary)]" });
}), q9 = l1(function(r, t) {
  return /* @__PURE__ */ s1("div", { ...r, ref: t, className: "cds--list-box__menu-item__option" });
}), X9 = l1(function(r, t) {
  return /* @__PURE__ */ s1(
    "div",
    {
      ...r,
      ref: t,
      className: "fui:flex fui:flex-row",
      style: {
        gap: "1rem",
        padding: "0.5rem"
      }
    }
  );
}), Y9 = l1(function({ onRemove: r, ...t }, n) {
  return /* @__PURE__ */ s1(
    r4,
    {
      ...t,
      ref: n,
      onClose: (o) => {
        o.stopPropagation(), r && r(t.option);
      },
      title: "Remove",
      text: t.option.label || t.option.value,
      type: "high-contrast"
    }
  );
});
export {
  Y9 as AsBadge,
  G9 as AsButton,
  j9 as AsCombobox,
  X9 as AsFields,
  K9 as AsInput,
  q9 as AsOption,
  Q9 as AsOptions,
  F9 as options,
  P9 as variables
};
