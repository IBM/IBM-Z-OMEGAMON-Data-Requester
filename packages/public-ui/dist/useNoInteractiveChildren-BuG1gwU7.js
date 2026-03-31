import { g as H6 } from "./_commonjsHelpers-DaMA6jEr.js";
import e, { createContext as A6, useContext as y6, Children as N6, useEffect as L6 } from "react";
var w = {};
try {
  process.env.CARBON_ENABLE_CSS_CUSTOM_PROPERTIES && process.env.CARBON_ENABLE_CSS_CUSTOM_PROPERTIES === "true" ? w.enableCssCustomProperties = !0 : w.enableCssCustomProperties = !1, process.env.CARBON_ENABLE_CSS_GRID && process.env.CARBON_ENABLE_CSS_GRID === "true" ? w.enableCssGrid = !0 : w.enableCssGrid = !1, process.env.CARBON_ENABLE_V11_RELEASE ? process.env.CARBON_ENABLE_V11_RELEASE === "true" ? w.enableV11Release = !0 : w.enableV11Release = !1 : w.enableV11Release = !0, process.env.CARBON_ENABLE_EXPERIMENTAL_TILE_CONTRAST && process.env.CARBON_ENABLE_EXPERIMENTAL_TILE_CONTRAST === "true" ? w.enableExperimentalTileContrast = !0 : w.enableExperimentalTileContrast = !1, process.env.CARBON_ENABLE_V12_TILE_DEFAULT_ICONS && process.env.CARBON_ENABLE_V12_TILE_DEFAULT_ICONS === "true" ? w.enableV12TileDefaultIcons = !0 : w.enableV12TileDefaultIcons = !1, process.env.CARBON_ENABLE_V12_TILE_RADIO_ICONS && process.env.CARBON_ENABLE_V12_TILE_RADIO_ICONS === "true" ? w.enableV12TileRadioIcons = !0 : w.enableV12TileRadioIcons = !1, process.env.CARBON_ENABLE_V12_OVERFLOWMENU && process.env.CARBON_ENABLE_V12_OVERFLOWMENU === "true" ? w.enableV12Overflowmenu = !0 : w.enableV12Overflowmenu = !1, process.env.CARBON_ENABLE_TREEVIEW_CONTROLLABLE && process.env.CARBON_ENABLE_TREEVIEW_CONTROLLABLE === "true" ? w.enableTreeviewControllable = !0 : w.enableTreeviewControllable = !1, process.env.CARBON_ENABLE_V12_STRUCTURED_LIST_VISIBLE_ICONS && process.env.CARBON_ENABLE_V12_STRUCTURED_LIST_VISIBLE_ICONS === "true" ? w.enableV12StructuredListVisibleIcons = !0 : w.enableV12StructuredListVisibleIcons = !1, process.env.CARBON_ENABLE_EXPERIMENTAL_FOCUS_WRAP_WITHOUT_SENTINELS && process.env.CARBON_ENABLE_EXPERIMENTAL_FOCUS_WRAP_WITHOUT_SENTINELS === "true" ? w.enableExperimentalFocusWrapWithoutSentinels = !0 : w.enableExperimentalFocusWrapWithoutSentinels = !1, process.env.CARBON_ENABLE_DIALOG_ELEMENT && process.env.CARBON_ENABLE_DIALOG_ELEMENT === "true" ? w.enableDialogElement = !0 : w.enableDialogElement = !1, process.env.CARBON_ENABLE_V12_DYNAMIC_FLOATING_STYLES && process.env.CARBON_ENABLE_V12_DYNAMIC_FLOATING_STYLES === "true" ? w.enableV12DynamicFloatingStyles = !0 : w.enableV12DynamicFloatingStyles = !1, process.env.CARBON_ENABLE_V12_TOGGLE_REDUCED_LABEL_SPACING && process.env.CARBON_ENABLE_V12_TOGGLE_REDUCED_LABEL_SPACING === "true" ? w.enableV12ToggleReducedLabelSpacing = !0 : w.enableV12ToggleReducedLabelSpacing = !1;
} catch {
  w.enableCssCustomProperties = !1, w.enableCssGrid = !1, w.enableV11Release = !0, w.enableExperimentalTileContrast = !1, w.enableV12TileDefaultIcons = !1, w.enableV12TileRadioIcons = !1, w.enableV12Overflowmenu = !1, w.enableTreeviewControllable = !1, w.enableV12StructuredListVisibleIcons = !1, w.enableExperimentalFocusWrapWithoutSentinels = !1, w.enableDialogElement = !1, w.enableV12DynamicFloatingStyles = !1, w.enableV12ToggleReducedLabelSpacing = !1;
}
var M1 = [{
  name: "enable-css-custom-properties",
  description: "Describe what the flag does",
  enabled: w.enableCssCustomProperties
}, {
  name: "enable-css-grid",
  description: `Enable CSS Grid Layout in the Grid and Column React components
`,
  enabled: w.enableCssGrid
}, {
  name: "enable-v11-release",
  description: `Enable the features and functionality for the v11 Release
`,
  enabled: w.enableV11Release
}, {
  name: "enable-experimental-tile-contrast",
  description: `Enable the experimental tile improved contrast styles
`,
  enabled: w.enableExperimentalTileContrast
}, {
  name: "enable-v12-tile-default-icons",
  description: `Enable rendering of default icons in the tile components
`,
  enabled: w.enableV12TileDefaultIcons
}, {
  name: "enable-v12-tile-radio-icons",
  description: `Enable rendering of radio icons in the RadioTile component
`,
  enabled: w.enableV12TileRadioIcons
}, {
  name: "enable-v12-overflowmenu",
  description: `Enable the use of the v12 OverflowMenu leveraging the Menu subcomponents
`,
  enabled: w.enableV12Overflowmenu
}, {
  name: "enable-treeview-controllable",
  description: `Enable the new TreeView controllable API
`,
  enabled: w.enableTreeviewControllable
}, {
  name: "enable-v12-structured-list-visible-icons",
  description: `Enable rendering of radio icons in the StructuredList component
`,
  enabled: w.enableV12StructuredListVisibleIcons
}, {
  name: "enable-experimental-focus-wrap-without-sentinels",
  description: `Enable the new focus wrap behavior that doesn't use sentinel nodes
`,
  enabled: w.enableExperimentalFocusWrapWithoutSentinels
}, {
  name: "enable-dialog-element",
  description: `Enable components to utilize the native dialog element
`,
  enabled: w.enableDialogElement
}, {
  name: "enable-v12-dynamic-floating-styles",
  description: `Enable dynamic setting of floating styles for components like Popover, Tooltip, etc.
`,
  enabled: w.enableV12DynamicFloatingStyles
}, {
  name: "enable-v12-toggle-reduced-label-spacing",
  description: `Enable a reduced spacing between the toggle control and its label
`,
  enabled: w.enableV12ToggleReducedLabelSpacing
}];
function _1(a, r) {
  (r == null || r > a.length) && (r = a.length);
  for (var t = 0, n = Array(r); t < r; t++) n[t] = a[t];
  return n;
}
function T6(a) {
  if (Array.isArray(a)) return a;
}
function O6(a, r) {
  if (!(a instanceof r)) throw new TypeError("Cannot call a class as a function");
}
function Z6(a, r) {
  for (var t = 0; t < r.length; t++) {
    var n = r[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, z6(n.key), n);
  }
}
function R6(a, r, t) {
  return Z6(a.prototype, r), Object.defineProperty(a, "prototype", {
    writable: !1
  }), a;
}
function b6(a, r) {
  var t = typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
  if (!t) {
    if (Array.isArray(a) || (t = g6(a)) || r) {
      t && (a = t);
      var n = 0, o = function() {
      };
      return {
        s: o,
        n: function() {
          return n >= a.length ? {
            done: !0
          } : {
            done: !1,
            value: a[n++]
          };
        },
        e: function(d) {
          throw d;
        },
        f: o
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var i, h = !0, u = !1;
  return {
    s: function() {
      t = t.call(a);
    },
    n: function() {
      var d = t.next();
      return h = d.done, d;
    },
    e: function(d) {
      u = !0, i = d;
    },
    f: function() {
      try {
        h || t.return == null || t.return();
      } finally {
        if (u) throw i;
      }
    }
  };
}
function D6(a, r) {
  var t = a == null ? null : typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
  if (t != null) {
    var n, o, i, h, u = [], d = !0, V = !1;
    try {
      if (i = (t = t.call(a)).next, r !== 0) for (; !(d = (n = i.call(t)).done) && (u.push(n.value), u.length !== r); d = !0) ;
    } catch (m) {
      V = !0, o = m;
    } finally {
      try {
        if (!d && t.return != null && (h = t.return(), Object(h) !== h)) return;
      } finally {
        if (V) throw o;
      }
    }
    return u;
  }
}
function B6() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function S6(a, r) {
  return T6(a) || D6(a, r) || g6(a, r) || B6();
}
function $6(a, r) {
  if (typeof a != "object" || !a) return a;
  var t = a[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(a, r);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(a);
}
function z6(a) {
  var r = $6(a, "string");
  return typeof r == "symbol" ? r : r + "";
}
function g6(a, r) {
  if (a) {
    if (typeof a == "string") return _1(a, r);
    var t = {}.toString.call(a).slice(8, -1);
    return t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set" ? Array.from(a) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _1(a, r) : void 0;
  }
}
var W6 = /* @__PURE__ */ function() {
  function a(r) {
    var t = this;
    O6(this, a), this.flags = /* @__PURE__ */ new Map(), r && Object.keys(r).forEach(function(n) {
      t.flags.set(n, r[n]);
    });
  }
  return R6(a, [{
    key: "checkForFlag",
    value: function(t) {
      if (!this.flags.has(t))
        throw new Error("Unable to find a feature flag with the name: `".concat(t, "`"));
    }
    /**
     * Add a feature flag
     * @param {string} name
     * @param {boolean} enabled
     */
  }, {
    key: "add",
    value: function(t, n) {
      if (this.flags.has(t))
        throw new Error("The feature flag: ".concat(t, " already exists"));
      this.flags.set(t, n);
    }
    /**
     * Enable a feature flag
     * @param {string} name
     */
  }, {
    key: "enable",
    value: function(t) {
      this.checkForFlag(t), this.flags.set(t, !0);
    }
    /**
     * Disable a feature flag
     * @param {string} name
     */
  }, {
    key: "disable",
    value: function(t) {
      this.checkForFlag(t), this.flags.set(t, !1);
    }
    /**
     * Merge the given feature flags with the current set of feature flags.
     * Duplicate keys will be set to the value in the given feature flags.
     * @param {object} flags
     */
  }, {
    key: "merge",
    value: function(t) {
      var n = this;
      Object.keys(t).forEach(function(o) {
        n.flags.set(o, t[o]);
      });
    }
    /**
     * @param {FeatureFlagScope} scope
     */
  }, {
    key: "mergeWithScope",
    value: function(t) {
      var n = b6(t.flags), o;
      try {
        for (n.s(); !(o = n.n()).done; ) {
          var i = S6(o.value, 2), h = i[0], u = i[1];
          this.flags.has(h) || this.flags.set(h, u);
        }
      } catch (d) {
        n.e(d);
      } finally {
        n.f();
      }
    }
    /**
     * Check if a feature flag is enabled
     * @param {string} name
     * @returns {boolean}
     */
  }, {
    key: "enabled",
    value: function(t) {
      return this.checkForFlag(t), this.flags.get(t);
    }
  }]);
}(), E1 = P6();
for (var i1 = 0; i1 < M1.length; i1++) {
  var C1 = M1[i1];
  E1.add(C1.name, C1.enabled);
}
function P6(a) {
  return new W6(a);
}
function I6() {
  return E1.merge.apply(E1, arguments);
}
I6({
  "enable-css-custom-properties": !0,
  "enable-css-grid": !0,
  "enable-v11-release": !0,
  "enable-experimental-tile-contrast": !1,
  "enable-v12-tile-radio-icons": !1,
  "enable-v12-structured-list-visible-icons": !1,
  "enable-v12-dynamic-floating-styles": !1
});
function V1() {
  return V1 = Object.assign ? Object.assign.bind() : function(a) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t) ({}).hasOwnProperty.call(t, n) && (a[n] = t[n]);
    }
    return a;
  }, V1.apply(null, arguments);
}
var p1 = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var x1;
function k6() {
  return x1 || (x1 = 1, function(a) {
    (function() {
      var r = {}.hasOwnProperty;
      function t() {
        for (var i = "", h = 0; h < arguments.length; h++) {
          var u = arguments[h];
          u && (i = o(i, n(u)));
        }
        return i;
      }
      function n(i) {
        if (typeof i == "string" || typeof i == "number")
          return i;
        if (typeof i != "object")
          return "";
        if (Array.isArray(i))
          return t.apply(null, i);
        if (i.toString !== Object.prototype.toString && !i.toString.toString().includes("[native code]"))
          return i.toString();
        var h = "";
        for (var u in i)
          r.call(i, u) && i[u] && (h = o(h, u));
        return h;
      }
      function o(i, h) {
        return h ? i ? i + " " + h : i + h : i;
      }
      a.exports ? (t.default = t, a.exports = t) : window.classNames = t;
    })();
  }(p1)), p1.exports;
}
var F6 = k6();
const Gl = /* @__PURE__ */ H6(F6), j6 = /* @__PURE__ */ e.createContext("cds");
function Xl() {
  return e.useContext(j6);
}
var Q = { exports: {} }, K = { exports: {} }, y = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var A1;
function U6() {
  if (A1) return y;
  A1 = 1;
  var a = typeof Symbol == "function" && Symbol.for, r = a ? Symbol.for("react.element") : 60103, t = a ? Symbol.for("react.portal") : 60106, n = a ? Symbol.for("react.fragment") : 60107, o = a ? Symbol.for("react.strict_mode") : 60108, i = a ? Symbol.for("react.profiler") : 60114, h = a ? Symbol.for("react.provider") : 60109, u = a ? Symbol.for("react.context") : 60110, d = a ? Symbol.for("react.async_mode") : 60111, V = a ? Symbol.for("react.concurrent_mode") : 60111, m = a ? Symbol.for("react.forward_ref") : 60112, L = a ? Symbol.for("react.suspense") : 60113, Z = a ? Symbol.for("react.suspense_list") : 60120, b = a ? Symbol.for("react.memo") : 60115, z = a ? Symbol.for("react.lazy") : 60116, R = a ? Symbol.for("react.block") : 60121, S = a ? Symbol.for("react.fundamental") : 60117, W = a ? Symbol.for("react.responder") : 60118, q = a ? Symbol.for("react.scope") : 60119;
  function B(f) {
    if (typeof f == "object" && f !== null) {
      var k = f.$$typeof;
      switch (k) {
        case r:
          switch (f = f.type, f) {
            case d:
            case V:
            case n:
            case i:
            case o:
            case L:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case u:
                case m:
                case z:
                case b:
                case h:
                  return f;
                default:
                  return k;
              }
          }
        case t:
          return k;
      }
    }
  }
  function D(f) {
    return B(f) === V;
  }
  return y.AsyncMode = d, y.ConcurrentMode = V, y.ContextConsumer = u, y.ContextProvider = h, y.Element = r, y.ForwardRef = m, y.Fragment = n, y.Lazy = z, y.Memo = b, y.Portal = t, y.Profiler = i, y.StrictMode = o, y.Suspense = L, y.isAsyncMode = function(f) {
    return D(f) || B(f) === d;
  }, y.isConcurrentMode = D, y.isContextConsumer = function(f) {
    return B(f) === u;
  }, y.isContextProvider = function(f) {
    return B(f) === h;
  }, y.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === r;
  }, y.isForwardRef = function(f) {
    return B(f) === m;
  }, y.isFragment = function(f) {
    return B(f) === n;
  }, y.isLazy = function(f) {
    return B(f) === z;
  }, y.isMemo = function(f) {
    return B(f) === b;
  }, y.isPortal = function(f) {
    return B(f) === t;
  }, y.isProfiler = function(f) {
    return B(f) === i;
  }, y.isStrictMode = function(f) {
    return B(f) === o;
  }, y.isSuspense = function(f) {
    return B(f) === L;
  }, y.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === n || f === V || f === i || f === o || f === L || f === Z || typeof f == "object" && f !== null && (f.$$typeof === z || f.$$typeof === b || f.$$typeof === h || f.$$typeof === u || f.$$typeof === m || f.$$typeof === S || f.$$typeof === W || f.$$typeof === q || f.$$typeof === R);
  }, y.typeOf = B, y;
}
var N = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var y1;
function q6() {
  return y1 || (y1 = 1, process.env.NODE_ENV !== "production" && function() {
    var a = typeof Symbol == "function" && Symbol.for, r = a ? Symbol.for("react.element") : 60103, t = a ? Symbol.for("react.portal") : 60106, n = a ? Symbol.for("react.fragment") : 60107, o = a ? Symbol.for("react.strict_mode") : 60108, i = a ? Symbol.for("react.profiler") : 60114, h = a ? Symbol.for("react.provider") : 60109, u = a ? Symbol.for("react.context") : 60110, d = a ? Symbol.for("react.async_mode") : 60111, V = a ? Symbol.for("react.concurrent_mode") : 60111, m = a ? Symbol.for("react.forward_ref") : 60112, L = a ? Symbol.for("react.suspense") : 60113, Z = a ? Symbol.for("react.suspense_list") : 60120, b = a ? Symbol.for("react.memo") : 60115, z = a ? Symbol.for("react.lazy") : 60116, R = a ? Symbol.for("react.block") : 60121, S = a ? Symbol.for("react.fundamental") : 60117, W = a ? Symbol.for("react.responder") : 60118, q = a ? Symbol.for("react.scope") : 60119;
    function B(s) {
      return typeof s == "string" || typeof s == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      s === n || s === V || s === i || s === o || s === L || s === Z || typeof s == "object" && s !== null && (s.$$typeof === z || s.$$typeof === b || s.$$typeof === h || s.$$typeof === u || s.$$typeof === m || s.$$typeof === S || s.$$typeof === W || s.$$typeof === q || s.$$typeof === R);
    }
    function D(s) {
      if (typeof s == "object" && s !== null) {
        var I = s.$$typeof;
        switch (I) {
          case r:
            var X = s.type;
            switch (X) {
              case d:
              case V:
              case n:
              case i:
              case o:
              case L:
                return X;
              default:
                var g1 = X && X.$$typeof;
                switch (g1) {
                  case u:
                  case m:
                  case z:
                  case b:
                  case h:
                    return g1;
                  default:
                    return I;
                }
            }
          case t:
            return I;
        }
      }
    }
    var f = d, k = V, e1 = u, t1 = h, r1 = r, n1 = m, Y = n, o1 = z, a1 = b, j = t, l1 = i, P = o, F = L, G = !1;
    function c1(s) {
      return G || (G = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), p(s) || D(s) === d;
    }
    function p(s) {
      return D(s) === V;
    }
    function v(s) {
      return D(s) === u;
    }
    function _(s) {
      return D(s) === h;
    }
    function g(s) {
      return typeof s == "object" && s !== null && s.$$typeof === r;
    }
    function E(s) {
      return D(s) === m;
    }
    function C(s) {
      return D(s) === n;
    }
    function H(s) {
      return D(s) === z;
    }
    function M(s) {
      return D(s) === b;
    }
    function x(s) {
      return D(s) === t;
    }
    function T(s) {
      return D(s) === i;
    }
    function A(s) {
      return D(s) === o;
    }
    function $(s) {
      return D(s) === L;
    }
    N.AsyncMode = f, N.ConcurrentMode = k, N.ContextConsumer = e1, N.ContextProvider = t1, N.Element = r1, N.ForwardRef = n1, N.Fragment = Y, N.Lazy = o1, N.Memo = a1, N.Portal = j, N.Profiler = l1, N.StrictMode = P, N.Suspense = F, N.isAsyncMode = c1, N.isConcurrentMode = p, N.isContextConsumer = v, N.isContextProvider = _, N.isElement = g, N.isForwardRef = E, N.isFragment = C, N.isLazy = H, N.isMemo = M, N.isPortal = x, N.isProfiler = T, N.isStrictMode = A, N.isSuspense = $, N.isValidElementType = B, N.typeOf = D;
  }()), N;
}
var N1;
function M6() {
  return N1 || (N1 = 1, process.env.NODE_ENV === "production" ? K.exports = U6() : K.exports = q6()), K.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var h1, L1;
function Y6() {
  if (L1) return h1;
  L1 = 1;
  var a = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, t = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var h = {}, u = 0; u < 10; u++)
        h["_" + String.fromCharCode(u)] = u;
      var d = Object.getOwnPropertyNames(h).map(function(m) {
        return h[m];
      });
      if (d.join("") !== "0123456789")
        return !1;
      var V = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(m) {
        V[m] = m;
      }), Object.keys(Object.assign({}, V)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return h1 = o() ? Object.assign : function(i, h) {
    for (var u, d = n(i), V, m = 1; m < arguments.length; m++) {
      u = Object(arguments[m]);
      for (var L in u)
        r.call(u, L) && (d[L] = u[L]);
      if (a) {
        V = a(u);
        for (var Z = 0; Z < V.length; Z++)
          t.call(u, V[Z]) && (d[V[Z]] = u[V[Z]]);
      }
    }
    return d;
  }, h1;
}
var s1, T1;
function H1() {
  if (T1) return s1;
  T1 = 1;
  var a = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return s1 = a, s1;
}
var f1, O1;
function _6() {
  return O1 || (O1 = 1, f1 = Function.call.bind(Object.prototype.hasOwnProperty)), f1;
}
var w1, Z1;
function G6() {
  if (Z1) return w1;
  Z1 = 1;
  var a = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var r = /* @__PURE__ */ H1(), t = {}, n = /* @__PURE__ */ _6();
    a = function(i) {
      var h = "Warning: " + i;
      typeof console < "u" && console.error(h);
      try {
        throw new Error(h);
      } catch {
      }
    };
  }
  function o(i, h, u, d, V) {
    if (process.env.NODE_ENV !== "production") {
      for (var m in i)
        if (n(i, m)) {
          var L;
          try {
            if (typeof i[m] != "function") {
              var Z = Error(
                (d || "React class") + ": " + u + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw Z.name = "Invariant Violation", Z;
            }
            L = i[m](h, m, d, u, null, r);
          } catch (z) {
            L = z;
          }
          if (L && !(L instanceof Error) && a(
            (d || "React class") + ": type specification of " + u + " `" + m + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof L + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), L instanceof Error && !(L.message in t)) {
            t[L.message] = !0;
            var b = V ? V() : "";
            a(
              "Failed " + u + " type: " + L.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (t = {});
  }, w1 = o, w1;
}
var u1, R1;
function X6() {
  if (R1) return u1;
  R1 = 1;
  var a = M6(), r = Y6(), t = /* @__PURE__ */ H1(), n = /* @__PURE__ */ _6(), o = /* @__PURE__ */ G6(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(u) {
    var d = "Warning: " + u;
    typeof console < "u" && console.error(d);
    try {
      throw new Error(d);
    } catch {
    }
  });
  function h() {
    return null;
  }
  return u1 = function(u, d) {
    var V = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function L(p) {
      var v = p && (V && p[V] || p[m]);
      if (typeof v == "function")
        return v;
    }
    var Z = "<<anonymous>>", b = {
      array: W("array"),
      bigint: W("bigint"),
      bool: W("boolean"),
      func: W("function"),
      number: W("number"),
      object: W("object"),
      string: W("string"),
      symbol: W("symbol"),
      any: q(),
      arrayOf: B,
      element: D(),
      elementType: f(),
      instanceOf: k,
      node: n1(),
      objectOf: t1,
      oneOf: e1,
      oneOfType: r1,
      shape: o1,
      exact: a1
    };
    function z(p, v) {
      return p === v ? p !== 0 || 1 / p === 1 / v : p !== p && v !== v;
    }
    function R(p, v) {
      this.message = p, this.data = v && typeof v == "object" ? v : {}, this.stack = "";
    }
    R.prototype = Error.prototype;
    function S(p) {
      if (process.env.NODE_ENV !== "production")
        var v = {}, _ = 0;
      function g(C, H, M, x, T, A, $) {
        if (x = x || Z, A = A || M, $ !== t) {
          if (d) {
            var s = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw s.name = "Invariant Violation", s;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var I = x + ":" + M;
            !v[I] && // Avoid spamming the console because they are often not actionable except for lib authors
            _ < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + A + "` prop on `" + x + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), v[I] = !0, _++);
          }
        }
        return H[M] == null ? C ? H[M] === null ? new R("The " + T + " `" + A + "` is marked as required " + ("in `" + x + "`, but its value is `null`.")) : new R("The " + T + " `" + A + "` is marked as required in " + ("`" + x + "`, but its value is `undefined`.")) : null : p(H, M, x, T, A);
      }
      var E = g.bind(null, !1);
      return E.isRequired = g.bind(null, !0), E;
    }
    function W(p) {
      function v(_, g, E, C, H, M) {
        var x = _[g], T = P(x);
        if (T !== p) {
          var A = F(x);
          return new R(
            "Invalid " + C + " `" + H + "` of type " + ("`" + A + "` supplied to `" + E + "`, expected ") + ("`" + p + "`."),
            { expectedType: p }
          );
        }
        return null;
      }
      return S(v);
    }
    function q() {
      return S(h);
    }
    function B(p) {
      function v(_, g, E, C, H) {
        if (typeof p != "function")
          return new R("Property `" + H + "` of component `" + E + "` has invalid PropType notation inside arrayOf.");
        var M = _[g];
        if (!Array.isArray(M)) {
          var x = P(M);
          return new R("Invalid " + C + " `" + H + "` of type " + ("`" + x + "` supplied to `" + E + "`, expected an array."));
        }
        for (var T = 0; T < M.length; T++) {
          var A = p(M, T, E, C, H + "[" + T + "]", t);
          if (A instanceof Error)
            return A;
        }
        return null;
      }
      return S(v);
    }
    function D() {
      function p(v, _, g, E, C) {
        var H = v[_];
        if (!u(H)) {
          var M = P(H);
          return new R("Invalid " + E + " `" + C + "` of type " + ("`" + M + "` supplied to `" + g + "`, expected a single ReactElement."));
        }
        return null;
      }
      return S(p);
    }
    function f() {
      function p(v, _, g, E, C) {
        var H = v[_];
        if (!a.isValidElementType(H)) {
          var M = P(H);
          return new R("Invalid " + E + " `" + C + "` of type " + ("`" + M + "` supplied to `" + g + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return S(p);
    }
    function k(p) {
      function v(_, g, E, C, H) {
        if (!(_[g] instanceof p)) {
          var M = p.name || Z, x = c1(_[g]);
          return new R("Invalid " + C + " `" + H + "` of type " + ("`" + x + "` supplied to `" + E + "`, expected ") + ("instance of `" + M + "`."));
        }
        return null;
      }
      return S(v);
    }
    function e1(p) {
      if (!Array.isArray(p))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), h;
      function v(_, g, E, C, H) {
        for (var M = _[g], x = 0; x < p.length; x++)
          if (z(M, p[x]))
            return null;
        var T = JSON.stringify(p, function($, s) {
          var I = F(s);
          return I === "symbol" ? String(s) : s;
        });
        return new R("Invalid " + C + " `" + H + "` of value `" + String(M) + "` " + ("supplied to `" + E + "`, expected one of " + T + "."));
      }
      return S(v);
    }
    function t1(p) {
      function v(_, g, E, C, H) {
        if (typeof p != "function")
          return new R("Property `" + H + "` of component `" + E + "` has invalid PropType notation inside objectOf.");
        var M = _[g], x = P(M);
        if (x !== "object")
          return new R("Invalid " + C + " `" + H + "` of type " + ("`" + x + "` supplied to `" + E + "`, expected an object."));
        for (var T in M)
          if (n(M, T)) {
            var A = p(M, T, E, C, H + "." + T, t);
            if (A instanceof Error)
              return A;
          }
        return null;
      }
      return S(v);
    }
    function r1(p) {
      if (!Array.isArray(p))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), h;
      for (var v = 0; v < p.length; v++) {
        var _ = p[v];
        if (typeof _ != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + G(_) + " at index " + v + "."
          ), h;
      }
      function g(E, C, H, M, x) {
        for (var T = [], A = 0; A < p.length; A++) {
          var $ = p[A], s = $(E, C, H, M, x, t);
          if (s == null)
            return null;
          s.data && n(s.data, "expectedType") && T.push(s.data.expectedType);
        }
        var I = T.length > 0 ? ", expected one of type [" + T.join(", ") + "]" : "";
        return new R("Invalid " + M + " `" + x + "` supplied to " + ("`" + H + "`" + I + "."));
      }
      return S(g);
    }
    function n1() {
      function p(v, _, g, E, C) {
        return j(v[_]) ? null : new R("Invalid " + E + " `" + C + "` supplied to " + ("`" + g + "`, expected a ReactNode."));
      }
      return S(p);
    }
    function Y(p, v, _, g, E) {
      return new R(
        (p || "React class") + ": " + v + " type `" + _ + "." + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + E + "`."
      );
    }
    function o1(p) {
      function v(_, g, E, C, H) {
        var M = _[g], x = P(M);
        if (x !== "object")
          return new R("Invalid " + C + " `" + H + "` of type `" + x + "` " + ("supplied to `" + E + "`, expected `object`."));
        for (var T in p) {
          var A = p[T];
          if (typeof A != "function")
            return Y(E, C, H, T, F(A));
          var $ = A(M, T, E, C, H + "." + T, t);
          if ($)
            return $;
        }
        return null;
      }
      return S(v);
    }
    function a1(p) {
      function v(_, g, E, C, H) {
        var M = _[g], x = P(M);
        if (x !== "object")
          return new R("Invalid " + C + " `" + H + "` of type `" + x + "` " + ("supplied to `" + E + "`, expected `object`."));
        var T = r({}, _[g], p);
        for (var A in T) {
          var $ = p[A];
          if (n(p, A) && typeof $ != "function")
            return Y(E, C, H, A, F($));
          if (!$)
            return new R(
              "Invalid " + C + " `" + H + "` key `" + A + "` supplied to `" + E + "`.\nBad object: " + JSON.stringify(_[g], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(p), null, "  ")
            );
          var s = $(M, A, E, C, H + "." + A, t);
          if (s)
            return s;
        }
        return null;
      }
      return S(v);
    }
    function j(p) {
      switch (typeof p) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !p;
        case "object":
          if (Array.isArray(p))
            return p.every(j);
          if (p === null || u(p))
            return !0;
          var v = L(p);
          if (v) {
            var _ = v.call(p), g;
            if (v !== p.entries) {
              for (; !(g = _.next()).done; )
                if (!j(g.value))
                  return !1;
            } else
              for (; !(g = _.next()).done; ) {
                var E = g.value;
                if (E && !j(E[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function l1(p, v) {
      return p === "symbol" ? !0 : v ? v["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && v instanceof Symbol : !1;
    }
    function P(p) {
      var v = typeof p;
      return Array.isArray(p) ? "array" : p instanceof RegExp ? "object" : l1(v, p) ? "symbol" : v;
    }
    function F(p) {
      if (typeof p > "u" || p === null)
        return "" + p;
      var v = P(p);
      if (v === "object") {
        if (p instanceof Date)
          return "date";
        if (p instanceof RegExp)
          return "regexp";
      }
      return v;
    }
    function G(p) {
      var v = F(p);
      switch (v) {
        case "array":
        case "object":
          return "an " + v;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + v;
        default:
          return v;
      }
    }
    function c1(p) {
      return !p.constructor || !p.constructor.name ? Z : p.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, u1;
}
var d1, b1;
function Q6() {
  if (b1) return d1;
  b1 = 1;
  var a = /* @__PURE__ */ H1();
  function r() {
  }
  function t() {
  }
  return t.resetWarningCache = r, d1 = function() {
    function n(h, u, d, V, m, L) {
      if (L !== a) {
        var Z = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw Z.name = "Invariant Violation", Z;
      }
    }
    n.isRequired = n;
    function o() {
      return n;
    }
    var i = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: o,
      element: n,
      elementType: n,
      instanceOf: o,
      node: n,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: t,
      resetWarningCache: r
    };
    return i.PropTypes = i, i;
  }, d1;
}
var D1;
function K6() {
  if (D1) return Q.exports;
  if (D1 = 1, process.env.NODE_ENV !== "production") {
    var a = M6(), r = !0;
    Q.exports = /* @__PURE__ */ X6()(a.isElement, r);
  } else
    Q.exports = /* @__PURE__ */ Q6()();
  return Q.exports;
}
var J6 = /* @__PURE__ */ K6();
const O = /* @__PURE__ */ H6(J6);
function ea(a, r, t) {
  return (r = na(r)) in a ? Object.defineProperty(a, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[r] = t, a;
}
function B1(a, r) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(a);
    r && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(a, o).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function v1(a) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? B1(Object(t), !0).forEach(function(n) {
      ea(a, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : B1(Object(t)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return a;
}
function S1(a, r) {
  if (a == null) return {};
  var t, n, o = ta(a, r);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(a);
    for (n = 0; n < i.length; n++) t = i[n], r.indexOf(t) === -1 && {}.propertyIsEnumerable.call(a, t) && (o[t] = a[t]);
  }
  return o;
}
function ta(a, r) {
  if (a == null) return {};
  var t = {};
  for (var n in a) if ({}.hasOwnProperty.call(a, n)) {
    if (r.indexOf(n) !== -1) continue;
    t[n] = a[n];
  }
  return t;
}
function ra(a, r) {
  if (typeof a != "object" || !a) return a;
  var t = a[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(a, r);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(a);
}
function na(a) {
  var r = ra(a, "string");
  return typeof r == "symbol" ? r : r + "";
}
var oa = ["width", "height", "viewBox"], aa = ["tabindex"], la = {
  // Reference:
  // https://github.com/IBM/carbon-components-react/issues/1392
  // https://github.com/PolymerElements/iron-iconset-svg/pull/47
  // `focusable` is a string attribute which is why we do not use a boolean here
  focusable: "false",
  preserveAspectRatio: "xMidYMid meet"
};
function ca() {
  var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = a.width, t = a.height, n = a.viewBox, o = n === void 0 ? "0 0 ".concat(r, " ").concat(t) : n, i = S1(a, oa), h = i.tabindex, u = S1(i, aa), d = v1(v1(v1({}, la), u), {}, {
    width: r,
    height: t,
    viewBox: o
  });
  return d["aria-label"] || d["aria-labelledby"] || d.title ? (d.role = "img", h != null && (d.focusable = "true", d.tabindex = h)) : d["aria-hidden"] = !0, d;
}
const l = /* @__PURE__ */ e.forwardRef(function({
  className: r,
  children: t,
  tabIndex: n,
  xmlns: o = "http://www.w3.org/2000/svg",
  preserveAspectRatio: i = "xMidYMid meet",
  ...h
}, u) {
  const {
    tabindex: d,
    ...V
  } = ca({
    ...h,
    tabindex: n
  }), m = V;
  return r && (m.className = r), d != null && (typeof d == "number" ? m.tabIndex = d : m.tabIndex = Number(n)), u && (m.ref = u), o && (m.xmlns = o), i && (m.preserveAspectRatio = i), /* @__PURE__ */ e.createElement("svg", m, t);
});
l.displayName = "Icon";
l.propTypes = {
  "aria-hidden": O.oneOfType([O.bool, O.oneOf(["true", "false"])]),
  "aria-label": O.string,
  "aria-labelledby": O.string,
  children: O.node,
  className: O.string,
  height: O.oneOfType([O.number, O.string]),
  preserveAspectRatio: O.string,
  tabIndex: O.oneOfType([O.number, O.string]),
  viewBox: O.string,
  width: O.oneOfType([O.number, O.string]),
  xmlns: O.string
};
const c = {
  size: O.oneOfType([O.number, O.string])
};
var $1, z1, W1, P1, I1, k1, F1, j1, U1, q1, Y1, G1, X1, Q1, K1, J1, e0, t0, r0, n0, o0, a0, l0, c0, i0, p0, h0, s0, f0, w0, u0, d0, v0, m0, E0, V0, H0, g0, M0, _0, C0, x0, A0, y0, N0, L0, T0, O0, Z0, R0, b0, D0, B0, S0, $0, z0, W0, P0, I0, k0, F0, j0, U0, q0, Y0, G0, X0, Q0, K0, J0, e2, t2, r2, n2, o2, a2, l2, c2, i2, p2, h2, s2, f2, w2, u2, d2, v2, m2, E2, V2, H2, g2, M2, _2, C2, x2, A2, y2, N2, L2, T2, O2, Z2, R2, b2, D2, B2, S2, $2, z2, W2, P2, I2, k2, F2, j2, U2, q2, Y2, G2, X2, Q2, K2, J2, ee, te, re, ne, oe, ae, le, ce, ie, pe, he, se, fe, we, ue, de, ve, me, Ee, Ve, He, ge, Me, _e, Ce, xe, Ae, ye, Ne, Le, Te, Oe, Ze, Re, be, De, Be, Se, $e, ze, We, Pe, Ie, ke, Fe, je, Ue, qe, Ye, Ge, Xe, Qe, Ke, Je, et, tt, rt, nt, ot, at, lt, ct, it, pt, ht, st, ft, wt, ut, dt, vt, mt, Et, Vt, Ht, gt, Mt, _t, Ct, xt, At, yt, Nt, Lt, Tt, Ot, Zt, Rt, bt, Dt, Bt, St, $t, zt, Wt, Pt, It, kt, Ft, jt, Ut, qt, Yt, Gt, Xt, Qt, Kt, Jt, er, tr, rr, nr, or, ar, lr, cr, ir, pr, hr, sr, fr;
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
  }, $1 || ($1 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,28V18H26V28H22V4H20V28H10V14H8V28H4V2H2V28a2.0023,2.0023,0,0,0,2,2H30V28Z"
  })), z1 || (z1 = /* @__PURE__ */ e.createElement("path", {
    d: "M14 4H16V18H14z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ia.propTypes = c);
const pa = /* @__PURE__ */ e.forwardRef(function({
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
  }, W1 || (W1 = /* @__PURE__ */ e.createElement("path", {
    d: "M30,15H16V6a2.0023,2.0023,0,0,0-2-2H6A2.0023,2.0023,0,0,0,4,6v9H2v2H16v9a2.0023,2.0023,0,0,0,2,2h8a2.0023,2.0023,0,0,0,2-2V17h2ZM6,6h8v9H6ZM26,26H18V17h8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (pa.propTypes = c);
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
  }, P1 || (P1 = /* @__PURE__ */ e.createElement("path", {
    d: "M17.74,30,16,29l4-7h6a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2H6A2,2,0,0,0,4,8V20a2,2,0,0,0,2,2h9v2H6a4,4,0,0,1-4-4V8A4,4,0,0,1,6,4H26a4,4,0,0,1,4,4V20a4,4,0,0,1-4,4H21.16Z"
  })), I1 || (I1 = /* @__PURE__ */ e.createElement("path", {
    d: "M8 10H24V12H8zM8 16H18V18H8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ha.propTypes = c);
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
  }, k1 || (k1 = /* @__PURE__ */ e.createElement("path", {
    d: "M22 4L22 6 26.586 6 20 12.586 21.414 14 28 7.414 28 12 30 12 30 4 22 4zM28 16v4a1.9965 1.9965 0 01-2 2H20l-4 7 1.7358 1 3.4288-6H26a3.9992 3.9992 0 004-4V16zM4 20V8A1.9965 1.9965 0 016 6H18V4H6A3.9986 3.9986 0 002 8V20a3.9992 3.9992 0 004 4h9V22H6A1.9965 1.9965 0 014 20z"
  })), r);
});
process.env.NODE_ENV !== "production" && (sa.propTypes = c);
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
  }, F1 || (F1 = /* @__PURE__ */ e.createElement("path", {
    d: "M28 8V21h2V8a3.9986 3.9986 0 00-4-4H8.2429l2 2H26A1.9965 1.9965 0 0128 8zM30 28.5859L3.4141 2 2 3.4141 3.5039 4.918A3.9181 3.9181 0 002 8V20a3.9992 3.9992 0 004 4h6V22H6a1.9965 1.9965 0 01-2-2V8a1.9814 1.9814 0 01.9194-1.6665L20.5859 22H17l-4 7 1.7358 1 3.4288-6h4.4213l6 6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (fa.propTypes = c);
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
  }, j1 || (j1 = /* @__PURE__ */ e.createElement("path", {
    d: "M15.586 10.414L19.166 14 19.166 14 15.584 17.587 17 19 22 14 17 9 15.586 10.414z"
  })), U1 || (U1 = /* @__PURE__ */ e.createElement("path", {
    d: "M20.586 10.414L24.166 14 24.166 14 20.584 17.587 22 19 27 14 22 9 20.586 10.414zM10 9L11.593 12 15 12.414 12.5 14.667 13 18 10 16.125 7 18 7.5 14.667 5 12.414 8.5 12 10 9z"
  })), q1 || (q1 = /* @__PURE__ */ e.createElement("path", {
    d: "M17.7358,30,16,29l4-7h6a1.9966,1.9966,0,0,0,2-2V8a1.9966,1.9966,0,0,0-2-2H6A1.9966,1.9966,0,0,0,4,8V20a1.9966,1.9966,0,0,0,2,2h9v2H6a3.9993,3.9993,0,0,1-4-4V8A3.9988,3.9988,0,0,1,6,4H26a3.9988,3.9988,0,0,1,4,4V20a3.9993,3.9993,0,0,1-4,4H21.1646Z"
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
  }, Y1 || (Y1 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 19a6.9908 6.9908 0 01-5.833-3.1287l1.666-1.1074a5.0007 5.0007 0 008.334 0l1.666 1.1074A6.9908 6.9908 0 0116 19zM20 8a2 2 0 102 2A1.9806 1.9806 0 0020 8zM12 8a2 2 0 102 2A1.9806 1.9806 0 0012 8z"
  })), G1 || (G1 = /* @__PURE__ */ e.createElement("path", {
    d: "M17.7358,30,16,29l4-7h6a1.9966,1.9966,0,0,0,2-2V6a1.9966,1.9966,0,0,0-2-2H6A1.9966,1.9966,0,0,0,4,6V20a1.9966,1.9966,0,0,0,2,2h9v2H6a3.9993,3.9993,0,0,1-4-4V6A3.9988,3.9988,0,0,1,6,2H26a3.9988,3.9988,0,0,1,4,4V20a3.9993,3.9993,0,0,1-4,4H21.1646Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ua.propTypes = c);
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
  }, X1 || (X1 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM6,26V6H26V26Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (da.propTypes = c);
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
  }, Q1 || (Q1 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM6,26V6H26V26Z"
  })), K1 || (K1 = /* @__PURE__ */ e.createElement("path", {
    d: "M14 21.5L9 16.54 10.59 15 14 18.35 21.41 11 23 12.58 14 21.5z"
  })), r);
});
process.env.NODE_ENV !== "production" && (va.propTypes = c);
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
  }, J1 || (J1 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM14,21.5,9,16.5427,10.5908,15,14,18.3456,21.4087,11l1.5918,1.5772Z"
  })), e0 || (e0 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M14,21.5,9,16.5427,10.5908,15,14,18.3456,21.4087,11l1.5918,1.5772Z",
    "data-icon-path": "inner-path"
  })), r);
});
process.env.NODE_ENV !== "production" && (ma.propTypes = c);
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
  }, t0 || (t0 = /* @__PURE__ */ e.createElement("path", {
    d: "M10 14H22V18H10z"
  })), r0 || (r0 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM6,26V6H26V26Z"
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
  }, n0 || (n0 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM22,18H10V14H22Z"
  })), o0 || (o0 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M22,18H10V14H22Z",
    "data-icon-path": "inner-path"
  })), r);
});
process.env.NODE_ENV !== "production" && (Va.propTypes = c);
const Ha = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === 20 || t === "20" || t === "20px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    ...n
  }, a0 || (a0 = /* @__PURE__ */ e.createElement("path", {
    d: "M8 13.2L3.6 8.8 2.7 9.7 7.1 14.1 8 15 16.5 6.5 15.6 5.6z"
  })), l0 || (l0 = /* @__PURE__ */ e.createElement("path", {
    d: "M15.6 5.6L8 13.2 3.6 8.8 2.7 9.7 7.1 14.1 8 15 16.5 6.5 15.6 5.6z"
  })), r) : t === 24 || t === "24" || t === "24px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    ...n
  }, c0 || (c0 = /* @__PURE__ */ e.createElement("path", {
    d: "M10 15.9L4.7 10.6 3.6 11.6 8.9 16.9 10 18 20.6 7.4 19.5 6.3z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, i0 || (i0 = /* @__PURE__ */ e.createElement("path", {
    d: "M13 24L4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ha.propTypes = c);
const ga = /* @__PURE__ */ e.forwardRef(function({
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
  }, p0 || (p0 = /* @__PURE__ */ e.createElement("path", {
    d: "M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"
  })), h0 || (h0 = /* @__PURE__ */ e.createElement("path", {
    d: "M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z",
    "data-icon-path": "inner-path",
    opacity: "0"
  })), r) : t === 20 || t === "20" || t === "20px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    ...n
  }, s0 || (s0 = /* @__PURE__ */ e.createElement("path", {
    d: "M10,1c-4.9,0-9,4.1-9,9s4.1,9,9,9s9-4,9-9S15,1,10,1z M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"
  })), f0 || (f0 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z",
    "data-icon-path": "inner-path",
    opacity: "0"
  })), r) : t === 24 || t === "24" || t === "24px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    ...n
  }, w0 || (w0 = /* @__PURE__ */ e.createElement("path", {
    d: "M12,1C6,1,1,6,1,12s5,11,11,11s11-4.9,11-11S18.1,1,12,1z M10.4,16.3l-3.9-3.9l1.3-1.2l2.7,2.7l5.8-5.8l1.3,1.3L10.4,16.3z"
  })), u0 || (u0 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M10.4,16.3l-3.9-3.9l1.3-1.2l2.7,2.7l5.8-5.8l1.3,1.3L10.4,16.3z",
    "data-icon-path": "inner-path",
    opacity: "0"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, d0 || (d0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM14,21.5908l-5-5L10.5906,15,14,18.4092,21.41,11l1.5957,1.5859Z"
  })), v0 || (v0 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M14 21.591L9 16.591 10.591 15 14 18.409 21.41 11 23.005 12.585 14 21.591z",
    "data-icon-path": "inner-path"
  })), r);
});
process.env.NODE_ENV !== "production" && (ga.propTypes = c);
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
  }, m0 || (m0 = /* @__PURE__ */ e.createElement("path", {
    d: "M30,24a6,6,0,1,0-6,6A6.0066,6.0066,0,0,0,30,24Zm-2,0a3.9521,3.9521,0,0,1-.5669,2.019L21.981,20.5669A3.9529,3.9529,0,0,1,24,20,4.0045,4.0045,0,0,1,28,24Zm-8,0a3.9521,3.9521,0,0,1,.5669-2.019l5.4521,5.4521A3.9529,3.9529,0,0,1,24,28,4.0045,4.0045,0,0,1,20,24Z"
  })), E0 || (E0 = /* @__PURE__ */ e.createElement("path", {
    d: "M14,2a12,12,0,1,0,2,23.82V24a8,8,0,0,1,8-8h1.82A11.9348,11.9348,0,0,0,14,2ZM12,18.5908l-4-4L9.5908,13,12,15.4092,17.4092,10,19,11.5908Z"
  })), V0 || (V0 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M12 18.591L8 14.591 9.591 13 12 15.409 17.409 10 19 11.591 12 18.591z",
    "data-icon-path": "inner-path"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ma.propTypes = c);
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
  }, H0 || (H0 = /* @__PURE__ */ e.createElement("path", {
    d: "M14,2a12,12,0,1,0,3.3928,23.5059l3.9246-7.8492A2.9846,2.9846,0,0,1,24,16h1.82A11.9348,11.9348,0,0,0,14,2ZM12,18.5908l-4-4L9.5908,13,12,15.4092,17.4092,10,19,11.5908Z"
  })), g0 || (g0 = /* @__PURE__ */ e.createElement("path", {
    d: "M27.38,28H20.6178L24,21.2358ZM24,18a1,1,0,0,0-.8947.5527l-5,10A1.0005,1.0005,0,0,0,19,30H29a1,1,0,0,0,.9214-1.3892L24.8946,18.5527A1,1,0,0,0,24,18Z"
  })), M0 || (M0 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M12 18.591L8 14.591 9.591 13 12 15.409 17.409 10 19 11.591 12 18.591z",
    "data-icon-path": "inner-path"
  })), r);
});
process.env.NODE_ENV !== "production" && (_a.propTypes = c);
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
  }, _0 || (_0 = /* @__PURE__ */ e.createElement("path", {
    d: "M14 21.414L9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414z"
  })), C0 || (C0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ca.propTypes = c);
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
  }, x0 || (x0 = /* @__PURE__ */ e.createElement("path", {
    d: "M14,24A10,10,0,1,1,24,14h2A12,12,0,1,0,14,26Z"
  })), A0 || (A0 = /* @__PURE__ */ e.createElement("path", {
    d: "M12 15.59L9.41 13 8 14.41 12 18.41 19 11.41 17.59 10 12 15.59zM30 24a6 6 0 10-6 6A6.0066 6.0066 0 0030 24zm-2 0a3.9521 3.9521 0 01-.5669 2.019L21.981 20.5669A3.9529 3.9529 0 0124 20 4.0045 4.0045 0 0128 24zm-8 0a3.9521 3.9521 0 01.5669-2.019l5.4521 5.4521A3.9529 3.9529 0 0124 28 4.0045 4.0045 0 0120 24z"
  })), r);
});
process.env.NODE_ENV !== "production" && (xa.propTypes = c);
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
  }, y0 || (y0 = /* @__PURE__ */ e.createElement("path", {
    d: "M14,24A10,10,0,1,1,24,14h2A12,12,0,1,0,14,26Z"
  })), N0 || (N0 = /* @__PURE__ */ e.createElement("path", {
    d: "M12 15.59L9.41 13 8 14.41 12 18.41 19 11.41 17.59 10 12 15.59zM27.38 28H20.6178L24 21.2358zM24 18a1 1 0 00-.8947.5527l-5 10A1.0005 1.0005 0 0019 30H29a1 1 0 00.9214-1.3892L24.8946 18.5527A1 1 0 0024 18z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Aa.propTypes = c);
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
  }, L0 || (L0 = /* @__PURE__ */ e.createElement("path", {
    d: "M27.2314,23.6182,20,13.6748V4h2V2H10V4h2v9.6748L4.7686,23.6182A4.0183,4.0183,0,0,0,8.0186,30H23.9814a4.0183,4.0183,0,0,0,3.25-6.3818ZM14,14.3252V4h4V14.3252L20.6728,18H11.3272ZM23.9814,28H8.0186a2.0192,2.0192,0,0,1-1.6329-3.2061L9.8726,20H22.1274l3.4869,4.7939A2.0192,2.0192,0,0,1,23.9814,28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ya.propTypes = c);
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
  }, T0 || (T0 = /* @__PURE__ */ e.createElement("path", {
    d: "M4 20L4 22 8.586 22 2 28.586 3.414 30 10 23.414 10 28 12 28 12 20 4 20z"
  })), O0 || (O0 = /* @__PURE__ */ e.createElement("path", {
    d: "M20,13.67V4h2V2H10V4h2v9.67L9.58,17h2.4767L14,14.33V4h4V14.33l7.61,10.46a2.0133,2.0133,0,0,1-.44,2.82,2.0406,2.0406,0,0,1-1.19.39H15v2h8.98a4.0154,4.0154,0,0,0,3.25-6.38Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Na.propTypes = c);
const La = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === "glyph" || t === "glyph" || t === "glyphpx" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 10 6",
    fill: "currentColor",
    ...n
  }, Z0 || (Z0 = /* @__PURE__ */ e.createElement("path", {
    d: "M5 6L0 1 0.7 0.3 5 4.6 9.3 0.3 10 1z"
  })), r) : t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, R0 || (R0 = /* @__PURE__ */ e.createElement("path", {
    d: "M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, b0 || (b0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"
  })), r);
});
process.env.NODE_ENV !== "production" && (La.propTypes = c);
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
  }, D0 || (D0 = /* @__PURE__ */ e.createElement("path", {
    d: "M9.4142 12.5858L16 19.1714 22.5858 12.5858 24 14 16 22 8 14 9.4142 12.5858z"
  })), B0 || (B0 = /* @__PURE__ */ e.createElement("path", {
    d: "m30,16c0,7.7197-6.2803,14-14,14S2,23.7197,2,16,8.2803,2,16,2s14,6.2803,14,14Zm-26,0c0,6.6167,5.3833,12,12,12s12-5.3833,12-12-5.3833-12-12-12S4,9.3833,4,16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ta.propTypes = c);
const Oa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === "glyph" || t === "glyph" || t === "glyphpx" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 6 10",
    fill: "currentColor",
    ...n
  }, S0 || (S0 = /* @__PURE__ */ e.createElement("path", {
    d: "M0 5L5 0 5.7 0.7 1.4 5 5.7 9.3 5 10z"
  })), r) : t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, $0 || ($0 = /* @__PURE__ */ e.createElement("path", {
    d: "M5 8L10 3 10.7 3.7 6.4 8 10.7 12.3 10 13z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, z0 || (z0 = /* @__PURE__ */ e.createElement("path", {
    d: "M10 16L20 6 21.4 7.4 12.8 16 21.4 24.6 20 26z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Oa.propTypes = c);
const Za = /* @__PURE__ */ e.forwardRef(function({
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
  }, W0 || (W0 = /* @__PURE__ */ e.createElement("path", {
    d: "M15 9L15 15 9 15z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, P0 || (P0 = /* @__PURE__ */ e.createElement("path", {
    d: "M31 19L31 31 19 31 31 19z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Za.propTypes = c);
const Ra = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === "glyph" || t === "glyph" || t === "glyphpx" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 6 10",
    fill: "currentColor",
    ...n
  }, I0 || (I0 = /* @__PURE__ */ e.createElement("path", {
    d: "M6 5L1 10 0.3 9.3 4.6 5 0.3 0.7 1 0z"
  })), r) : t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, k0 || (k0 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 8L6 13 5.3 12.3 9.6 8 5.3 3.7 6 3z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, F0 || (F0 = /* @__PURE__ */ e.createElement("path", {
    d: "M22 16L12 26 10.6 24.6 19.2 16 10.6 7.4 12 6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ra.propTypes = c);
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
  }, j0 || (j0 = /* @__PURE__ */ e.createElement("path", {
    d: "M8 14L4.5 10.5 5.2 9.8 8 12.6 10.8 9.8 11.5 10.5zM8 2L11.5 5.5 10.8 6.2 8 3.4 5.2 6.2 4.5 5.5z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, U0 || (U0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 28L9 21 10.41 19.59 16 25.17 21.59 19.59 23 21 16 28zM16 4L23 11 21.59 12.41 16 6.83 10.41 12.41 9 11 16 4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ba.propTypes = c);
const Da = /* @__PURE__ */ e.forwardRef(function({
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
  }, q0 || (q0 = /* @__PURE__ */ e.createElement("path", {
    d: "M8 14L4.5 10.5 5.2 9.8 8 12.6 10.8 9.8 11.5 10.5z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Y0 || (Y0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 28L9 21 10.4 19.6 16 25.2 21.6 19.6 23 21z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Da.propTypes = c);
const Ba = /* @__PURE__ */ e.forwardRef(function({
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
  }, G0 || (G0 = /* @__PURE__ */ e.createElement("path", {
    d: "M8 2L11.5 5.5 10.8 6.2 8 3.4 5.2 6.2 4.5 5.5z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, X0 || (X0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 4L23 11 21.6 12.4 16 6.8 10.4 12.4 9 11z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ba.propTypes = c);
const Sa = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === "glyph" || t === "glyph" || t === "glyphpx" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 10 6",
    fill: "currentColor",
    ...n
  }, Q0 || (Q0 = /* @__PURE__ */ e.createElement("path", {
    d: "M5 0L10 5 9.3 5.7 5 1.4 0.7 5.7 0 5z"
  })), r) : t === 16 || t === "16" || t === "16px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, K0 || (K0 = /* @__PURE__ */ e.createElement("path", {
    d: "M8 5L13 10 12.3 10.7 8 6.4 3.7 10.7 3 10z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, J0 || (J0 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 10L26 20 24.6 21.4 16 12.8 7.4 21.4 6 20z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Sa.propTypes = c);
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
  }, e2 || (e2 = /* @__PURE__ */ e.createElement("path", {
    d: "M9.4142 19.4142L16 12.8286 22.5858 19.4142 24 18 16 10 8 18 9.4142 19.4142z"
  })), t2 || (t2 = /* @__PURE__ */ e.createElement("path", {
    d: "m30,16c0,7.7197-6.2803,14-14,14S2,23.7197,2,16,8.2803,2,16,2s14,6.2803,14,14Zm-26,0c0,6.6167,5.3833,12,12,12s12-5.3833,12-12-5.3833-12-12-12S4,9.3833,4,16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && ($a.propTypes = c);
const za = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M23,20c-2.41,0-4.43,1.72-4.9,4h-4.1c-2.21,0-4-1.79-4-4v-8.1c2.28-.46,4-2.48,4-4.9,0-2.76-2.24-5-5-5s-5,2.24-5,5c0,2.41,1.72,4.43,4,4.9v8.1c0,3.31,2.69,6,6,6h4.1c.46,2.28,2.48,4,4.9,4,2.76,0,5-2.24,5-5s-2.24-5-5-5ZM6,7c0-1.65,1.35-3,3-3s3,1.35,3,3-1.35,3-3,3-3-1.35-3-3Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (za.propTypes = c);
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
  }, n2 || (n2 = /* @__PURE__ */ e.createElement("path", {
    d: "M11,11V21H21V11Zm8,8H13V13h6Z"
  })), o2 || (o2 = /* @__PURE__ */ e.createElement("path", {
    d: "M30,13V11H26V8a2,2,0,0,0-2-2H21V2H19V6H13V2H11V6H8A2,2,0,0,0,6,8v3H2v2H6v6H2v2H6v3a2,2,0,0,0,2,2h3v4h2V26h6v4h2V26h3a2,2,0,0,0,2-2V21h4V19H26V13ZM24,24H8V8H24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Wa.propTypes = c);
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
  }, a2 || (a2 = /* @__PURE__ */ e.createElement("path", {
    d: "M28 13L28 4 19 4 19 6 24.586 6 16 14.586 7.414 6 13 6 13 4 4 4 4 13 6 13 6 7.414 15 16.414 15 26 4 26 4 28 28 28 28 26 17 26 17 16.414 26 7.414 26 13 28 13z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Pa.propTypes = c);
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
  }, l2 || (l2 = /* @__PURE__ */ e.createElement("path", {
    d: "M29.3163,9.4912l-8.004-6.997c-.3645-.3186-.8322-.4942-1.3163-.4942H4c-1.1046,0-2,.8954-2,2v24c0,1.1046.8954,2,2,2h24c1.1046,0,2-.8954,2-2V10.997c0-.577-.2493-1.126-.6837-1.5058ZM28,28H4V4h14v7c0,1.1046.8954,2,2,2h8v15ZM20,11v-7l8,7h-8ZM6,20.084c0-4.041,2.0122-6.2939,5.1763-6.2939,2.1499,0,3.5425.9121,4.3853,2.7686l-1.9434,1.0322c-.3438-1.0664-1.1006-1.7881-2.4419-1.7881-1.6851,0-2.7686,1.2207-2.7686,3.2666v1.8916c0,2.0645,1.0835,3.2334,2.7686,3.2334,1.3584,0,2.2012-.8252,2.5967-1.9092l1.8403,1.084c-.8599,1.7881-2.2871,2.8369-4.437,2.8369-3.1641,0-5.1763-2.0801-5.1763-6.1221ZM16.8193,21.4941c0-2.8711,1.5991-4.6768,4.1611-4.6768,2.5796,0,4.1792,1.8057,4.1792,4.6768,0,2.8896-1.5996,4.7119-4.1792,4.7119-2.562,0-4.1611-1.8223-4.1611-4.7119ZM22.855,22.3369v-1.668c0-1.3408-.7222-2.0811-1.8745-2.0811-1.1348,0-1.8569.7402-1.8569,2.0811v1.668c0,1.3584.7222,2.0986,1.8569,2.0986,1.1523,0,1.8745-.7402,1.8745-2.0986Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ia.propTypes = c);
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
  }, c2 || (c2 = /* @__PURE__ */ e.createElement("path", {
    d: "M28 6H30V26H28zM17 6L15.57 7.393 23.15 15 2 15 2 17 23.15 17 15.57 24.573 17 26 27 16 17 6z"
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
  }, i2 || (i2 = /* @__PURE__ */ e.createElement("path", {
    d: "M29.2427,4.03l-8-2a1.0065,1.0065,0,0,0-.6143.0415l-9.7,3.88L3.2427,4.03A1,1,0,0,0,2,5V27a1,1,0,0,0,.7573.97l8,2A1.0244,1.0244,0,0,0,11,30a.9953.9953,0,0,0,.3716-.0718l9.7-3.88,7.686,1.9219A1,1,0,0,0,30,27V5A1,1,0,0,0,29.2427,4.03ZM28,11H22V4.2806l6,1.5ZM10,19H4V13h6Zm2-8V7.6771l8-3.2V11Zm8,2v6H12V13Zm-8,8h8v3.3227l-8,3.2Zm10-8h6v6H22ZM10,7.7806V11H4V6.2806ZM4,21h6v6.7192l-6-1.5Zm18,3.2187V21h6v4.7192Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Fa.propTypes = c);
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
  }, p2 || (p2 = /* @__PURE__ */ e.createElement("path", {
    d: "M30.3335 30H26V28h4V26H28a2.002 2.002 0 01-2-2V21.6665A1.6684 1.6684 0 0127.6665 20H32v2H28v2h2a2.002 2.002 0 012 2v2.3335A1.6684 1.6684 0 0130.3335 30zM22.3335 20h-2.667A1.6665 1.6665 0 0018 21.6665V30h2V26h2v4h2V21.6665A1.6665 1.6665 0 0022.3335 20zM20 24V22h2v2zM12.5 24L11 20 9 20 9 30 11 30 11 23 12.5 27 14 23 14 30 16 30 16 20 14 20 12.5 24zM1 22v6.5A1.4727 1.4727 0 002.5 30H7V28H3V22H7V20H3A2.0059 2.0059 0 001 22zM13 8L11 8 11 11 8 11 8 13 11 13 11 16 13 16 13 13 16 13 16 11 13 11 13 8z"
  })), h2 || (h2 = /* @__PURE__ */ e.createElement("path", {
    d: "M6,6H26V18h2V6a2.0059,2.0059,0,0,0-2-2H6A2.0059,2.0059,0,0,0,4,6V18H6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ja.propTypes = c);
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
  }, s2 || (s2 = /* @__PURE__ */ e.createElement("path", {
    d: "M22.5,30c-1.9299,0-3.5-1.5701-3.5-3.5,0-.9346,.3638-1.8134,1.0244-2.4742l1.4146,1.4138c-.283,.2832-.439,.6598-.439,1.0604,0,.8271,.6729,1.5,1.5,1.5,.4009,0,.7776-.1561,1.061-.4396l4.9998-4.9998c.2832-.2833,.4392-.66,.4392-1.0607,0-.8271-.6729-1.5-1.5-1.5-.4011,0-.7783,.1564-1.0618,.4404l-1.4155-1.4131c.6616-.6625,1.5413-1.0273,2.4773-1.0273,1.9299,0,3.5,1.5701,3.5,3.5,0,.9348-.364,1.8137-1.0249,2.4749l-4.9998,4.9996c-.6609,.6613-1.54,1.0255-2.4753,1.0255Z"
  })), f2 || (f2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16.5 31c-1.9299 0-3.5-1.5701-3.5-3.5 0-.9348.364-1.8137 1.0249-2.4749l4.9998-4.9996c.6609-.6613 1.54-1.0255 2.4753-1.0255 1.9299 0 3.5 1.5701 3.5 3.5 0 .9346-.3638 1.8134-1.0244 2.4742l-1.4146-1.4138c.283-.2832.439-.6598.439-1.0604 0-.8271-.6729-1.5-1.5-1.5-.4009 0-.7776.1561-1.061.4396l-4.9998 4.9998c-.2832.2833-.4392.66-.4392 1.0607 0 .8271.6729 1.5 1.5 1.5.4011 0 .7783-.1564 1.0618-.4404l1.4155 1.4131c-.6616.6625-1.5413 1.0273-2.4773 1.0273zM16 2c-5.2979 0-11 1.252-11 4V24c0 1.6797 2.134 2.7979 5 3.415v-2.0459c-1.9939-.4727-2.9453-1.1431-3-1.3691v-3.5723c1.4937.749 3.6738 1.2153 6 1.4302v-1.9976c-3.8779-.3774-5.8774-1.4219-6-1.8604v-3.5723c2.1279 1.0674 5.6426 1.5723 9 1.5723 5.2979 0 11-1.252 11-4V5.9995c-.0007-2.748-5.7024-3.9995-11-3.9995zM6.9985 6.0151c.1523-.5552 3.1514-2.0151 9.0015-2.0151 5.7976 0 8.7949 1.4341 8.9968 2-.2019.5659-3.1992 2-8.9968 2-5.8501 0-8.8491-1.46-9.0015-1.9849zm18.0015 5.9722c-.1606.5571-3.1587 2.0127-9 2.0127-5.8501 0-8.8491-1.46-9-2v-3.5723c2.1279 1.0674 5.6426 1.5723 9 1.5723s6.8721-.5049 9-1.5723v3.5596z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ua.propTypes = c);
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
  }, w2 || (w2 = /* @__PURE__ */ e.createElement("path", {
    d: "M24 16L19.4 14.6 21.7 10.3 17.4 12.6 16 8 14.6 12.6 10.3 10.3 12.6 14.6 8 16 12.6 17.4 10.3 21.7 14.6 19.4 16 24 17.4 19.4 21.7 21.7 19.4 17.4 24 16z"
  })), u2 || (u2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (qa.propTypes = c);
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
  }, d2 || (d2 = /* @__PURE__ */ e.createElement("path", {
    d: "M20.17 19L17.58 21.59 19 23 23 19 19 15 17.58 16.41 20.17 19zM11.83 19L14.42 16.41 13 15 9 19 13 23 14.42 21.59 11.83 19z"
  })), v2 || (v2 = /* @__PURE__ */ e.createElement("circle", {
    cx: "9",
    cy: "8",
    r: "1"
  })), m2 || (m2 = /* @__PURE__ */ e.createElement("circle", {
    cx: "6",
    cy: "8",
    r: "1"
  })), E2 || (E2 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,4H4c-1.1028,0-2,.8975-2,2V26c0,1.1025,.8972,2,2,2H28c1.1028,0,2-.8975,2-2V6c0-1.1025-.8972-2-2-2Zm0,2v4H4V6H28ZM4,26V12H28v14H4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ya.propTypes = c);
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
  }, V2 || (V2 = /* @__PURE__ */ e.createElement("path", {
    d: "M23 22L30 27 23 32 23 22z"
  })), H2 || (H2 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,3H6c-1.6543,0-3,1.3457-3,3V26c0,1.6543,1.3457,3,3,3h11v-9h12V6c0-1.6543-1.3457-3-3-3ZM6,5H26c.5515,0,1,.4482,1,1v3H5v-3c0-.5518,.4485-1,1-1Zm9,6v7H5v-7H15Zm0,16H6c-.5515,0-1-.4482-1-1v-6H15v7Zm2-9v-7h10v7h-10Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ga.propTypes = c);
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
  }, g2 || (g2 = /* @__PURE__ */ e.createElement("path", {
    d: "M31.707 20.293l-3-3c-.3901-.3906-1.0239-.3906-1.4141 0l-9.293 9.293v4.4141h4.4143l9.2927-9.293c.3906-.3906.3906-1.0234 0-1.4141zm-7.4141 6l-2.7073 2.707h-1.5857v-1.5859l2.707-2.707 2.293-2.293 1.5859 1.5859-2.293 2.293zm3.707-3.707l-1.5859-1.5859 1.5859-1.5859 1.5857 1.5859-1.5857 1.5859zM20 20v-2h-4v-7h10v2h2V6c0-1.6543-1.3457-3-3-3H5c-1.6543 0-3 1.3457-3 3V26c0 1.6543 1.3457 3 3 3h11v-9h4zm-6-2H4v-7H14v7zM5 5H25c.5515 0 1 .4482 1 1v3H4v-3c0-.5518.4485-1 1-1zM14 27H5c-.5515 0-1-.4482-1-1v-6H14v7z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Xa.propTypes = c);
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
  }, M2 || (M2 = /* @__PURE__ */ e.createElement("path", {
    d: "M28 2H23V4h5V28H23v2h5a2.0059 2.0059 0 002-2V4A2.0059 2.0059 0 0028 2zM14 17H8a.9448.9448 0 00-1 1v6a.9448.9448 0 001 1h6a.9448.9448 0 001-1V18A.9448.9448 0 0014 17zm-1 6H9V19h4z"
  })), _2 || (_2 = /* @__PURE__ */ e.createElement("path", {
    d: "M25 24V18a.9448.9448 0 00-1-1H18a.9448.9448 0 00-1 1v6a.9448.9448 0 001 1h6A1.0021 1.0021 0 0025 24zm-2-1H19V19h4zM14 7H8A.9448.9448 0 007 8v6a.9448.9448 0 001 1h6a.9448.9448 0 001-1V8A.9448.9448 0 0014 7zm-1 6H9V9h4zM18 15h6a.9448.9448 0 001-1V8a.9448.9448 0 00-1-1H18a.9448.9448 0 00-1 1v6A1.0021 1.0021 0 0018 15zm1-6h4v4H19z"
  })), C2 || (C2 = /* @__PURE__ */ e.createElement("path", {
    d: "M4,4H9V2H4A2.0059,2.0059,0,0,0,2,4V28a2.0059,2.0059,0,0,0,2,2H9V28H4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Qa.propTypes = c);
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
  }, x2 || (x2 = /* @__PURE__ */ e.createElement("circle", {
    cx: "28",
    cy: "10",
    r: "2"
  })), A2 || (A2 = /* @__PURE__ */ e.createElement("path", {
    d: "M18,29h-7v-2h7c4.9626,0,9-4.0374,9-9v-4h2v4c0,6.0654-4.9346,11-11,11Z"
  })), y2 || (y2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,21c-2.7571,0-5-2.2429-5-5s2.2429-5,5-5,5,2.2429,5,5-2.2429,5-5,5Zm0-8c-1.6543,0-3,1.3457-3,3s1.3457,3,3,3,3-1.3457,3-3-1.3457-3-3-3Z"
  })), N2 || (N2 = /* @__PURE__ */ e.createElement("circle", {
    cx: "4",
    cy: "22",
    r: "2"
  })), L2 || (L2 = /* @__PURE__ */ e.createElement("path", {
    d: "M5,18H3v-4C3,7.9346,7.9346,3,14,3h7v2h-7c-4.9626,0-9,4.0374-9,9v4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ka.propTypes = c);
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
  }, T2 || (T2 = /* @__PURE__ */ e.createElement("path", {
    d: "M22 22L24 22 24 28 22 28 22 30 28 30 28 28 26 28 26 22 28 22 28 20 22 20 22 22zM18 28H16V20H14v8.6A1.4529 1.4529 0 0015.5 30h3A1.4529 1.4529 0 0020 28.6V20H18zM10.2 20L10 28.5 9 22 7 22 6 28.5 5.8 20 4 20 4.72 30 7 30 8 23.5 9 30 11.28 30 12 20 10.2 20zM16 11L13 11 13 8 11 8 11 11 8 11 8 13 11 13 11 16 13 16 13 13 16 13 16 11z"
  })), O2 || (O2 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,4H6A2.0059,2.0059,0,0,0,4,6V18H6V6H26V18h2V6A2.0059,2.0059,0,0,0,26,4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ja.propTypes = c);
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
  }, Z2 || (Z2 = /* @__PURE__ */ e.createElement("path", {
    d: "M23.5 18L21 18.7 21 16 19 16 19 18.7 16.5 18 16 19.9 18.4 20.6 17 23 18.7 24 20 21.8 21.3 24 23 23 21.6 20.6 24 19.9 23.5 18zM16 13L16 11 13 11 13 8 11 8 11 11 8 11 8 13 11 13 11 16 13 16 13 13 16 13z"
  })), R2 || (R2 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,4H6A2.0059,2.0059,0,0,0,4,6V26a2.0059,2.0059,0,0,0,2,2H26a2.0059,2.0059,0,0,0,2-2V6A2.0059,2.0059,0,0,0,26,4ZM6,26V6H26V26Z"
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
  }, b2 || (b2 = /* @__PURE__ */ e.createElement("path", {
    d: "M31 13v-2h-4c-1.1028 0-2 .8975-2 2v2c0 1.1025.8972 2 2 2h2v2h-4v2h4c1.1028 0 2-.8975 2-2v-2c0-1.1025-.8972-2-2-2h-2v-2h4zM17 13v6c0 1.1025.8972 2 2 2h4v-2h-4v-6h4v-2h-4c-1.1028 0-2 .8975-2 2zM9 13L11 13 11 19 9 19 9 21 15 21 15 19 13 19 13 13 15 13 15 11 9 11 9 13zM1 13v6c0 1.1025.8972 2 2 2H7v-2H3v-6H7v-2H3c-1.1028 0-2 .8975-2 2z"
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
  }, D2 || (D2 = /* @__PURE__ */ e.createElement("path", {
    d: "M22 2L22 4 26.6 4 20 10.6 21.4 12 28 5.4 28 10 30 10 30 2 22 2zM19 16L19 18.7 16.5 18 16 19.9 18.4 20.6 17 23 18.7 24 20 21.8 21.3 24 23 23 21.6 20.6 24 19.9 23.5 18 21 18.7 21 16 19 16zM13 16L13 13 16 13 16 11 13 11 13 8 11 8 11 11 8 11 8 13 11 13 11 16 13 16z"
  })), B2 || (B2 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,26H6V6H19V4H6A2.0059,2.0059,0,0,0,4,6V26a2.0059,2.0059,0,0,0,2,2H26a2.0059,2.0059,0,0,0,2-2V13H26Z"
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
  }, S2 || (S2 = /* @__PURE__ */ e.createElement("path", {
    d: "M26 7H28V10H26zM29 4H32V6H29zM26 0H28V3H26zM22 4H25V6H22zM19 16L19 18.7 16.5 18 16 19.9 18.4 20.6 17 23 18.7 24 20 21.8 21.3 24 23 23 21.6 20.6 24 19.9 23.5 18 21 18.7 21 16 19 16zM13 16L13 13 16 13 16 11 13 11 13 8 11 8 11 11 8 11 8 13 11 13 11 16 13 16z"
  })), $2 || ($2 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,26H6V6H19V4H6A2.0059,2.0059,0,0,0,4,6V26a2.0059,2.0059,0,0,0,2,2H26a2.0059,2.0059,0,0,0,2-2V13H26Z"
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
  }, z2 || (z2 = /* @__PURE__ */ e.createElement("path", {
    d: "M8 18.6V17H6v1.6A7.3833 7.3833 0 0013.4 26H15V24H13.4A5.3775 5.3775 0 018 18.6zM28 18H20a2.0059 2.0059 0 00-2 2v8a2.0059 2.0059 0 002 2h8a2.0059 2.0059 0 002-2V20A2.0059 2.0059 0 0028 18zM20 28V20h8v8zM24 13.4V15h2V13.4A7.3833 7.3833 0 0018.6 6H17V8h1.6A5.3775 5.3775 0 0124 13.4zM12 2H4A2.0059 2.0059 0 002 4v8a2.0059 2.0059 0 002 2h8a2.0059 2.0059 0 002-2V4A2.0059 2.0059 0 0012 2zM4 12V4h8v8z"
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
  }, W2 || (W2 = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "10"
  })), P2 || (P2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"
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
  }, I2 || (I2 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m16,2c-7.732,0-14,6.268-14,14s6.268,14,14,14,14-6.268,14-14S23.732,2,16,2Zm0,26c-6.6274,0-12-5.3726-12-12s5.3726-12,12-12,12,5.3726,12,12-5.3726,12-12,12Z"
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
  }, k2 || (k2 = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "14"
  })), r);
});
process.env.NODE_ENV !== "production" && (c5.propTypes = c);
const i5 = /* @__PURE__ */ e.forwardRef(function({
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
  }, F2 || (F2 = /* @__PURE__ */ e.createElement("path", {
    d: "M7.7 4.7a14.7 14.7 0 00-3 3.1L6.3 9A13.26 13.26 0 018.9 6.3zM4.6 12.3l-1.9-.6A12.51 12.51 0 002 16H4A11.48 11.48 0 014.6 12.3zM2.7 20.4a14.4 14.4 0 002 3.9l1.6-1.2a12.89 12.89 0 01-1.7-3.3zM7.8 27.3a14.4 14.4 0 003.9 2l.6-1.9A12.89 12.89 0 019 25.7zM11.7 2.7l.6 1.9A11.48 11.48 0 0116 4V2A12.51 12.51 0 0011.7 2.7zM24.2 27.3a15.18 15.18 0 003.1-3.1L25.7 23A11.53 11.53 0 0123 25.7zM27.4 19.7l1.9.6A15.47 15.47 0 0030 16H28A11.48 11.48 0 0127.4 19.7zM29.2 11.6a14.4 14.4 0 00-2-3.9L25.6 8.9a12.89 12.89 0 011.7 3.3zM24.1 4.6a14.4 14.4 0 00-3.9-2l-.6 1.9a12.89 12.89 0 013.3 1.7zM20.3 29.3l-.6-1.9A11.48 11.48 0 0116 28v2A21.42 21.42 0 0020.3 29.3z"
  })), r);
});
process.env.NODE_ENV !== "production" && (i5.propTypes = c);
const p5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === "glyph" || t === "glyph" || t === "glyphpx" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, j2 || (j2 = /* @__PURE__ */ e.createElement("circle", {
    cx: "8",
    cy: "8",
    r: "6"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, U2 || (U2 = /* @__PURE__ */ e.createElement("circle", {
    cx: "8",
    cy: "8",
    r: "6"
  })), r);
});
process.env.NODE_ENV !== "production" && (p5.propTypes = c);
const h5 = /* @__PURE__ */ e.forwardRef(function({
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
  }, q2 || (q2 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,30A14,14,0,1,1,30,16,14,14,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12,12,0,0,0,16,4Z"
  })), Y2 || (Y2 = /* @__PURE__ */ e.createElement("path", {
    d: "M21,12.41V16h2V9H16v2h3.59L11,19.59V16H9v7h7V21H12.41Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (h5.propTypes = c);
const s5 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm7.5,7A3.5,3.5,0,1,1,20,12.5,3.5041,3.5041,0,0,1,23.5,9Zm.4348-1.978C23.791,7.0107,23.6467,7,23.5,7a5.4826,5.4826,0,0,0-4.1323,1.8784,8.0109,8.0109,0,0,0-5.5664-4.6675A11.8554,11.8554,0,0,1,23.9348,7.022ZM16,28a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,16,28ZM12,18a6,6,0,1,1,6-6A6.0067,6.0067,0,0,1,12,18ZM4,16a11.97,11.97,0,0,1,.2112-2.1987,7.9921,7.9921,0,0,0,7.3459,6.1762,5.9581,5.9581,0,0,0-.89,6.7564A12.0025,12.0025,0,0,1,4,16ZM21.3325,26.7339a5.9834,5.9834,0,0,0-4.1782-8.6206,8.02,8.02,0,0,0,1.9126-2.3672,5.4883,5.4883,0,0,0,8.9167-.0679c.003.1079.0164.2134.0164.3218A12.0025,12.0025,0,0,1,21.3325,26.7339Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (s5.propTypes = c);
const f5 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return t === "glyph" || t === "glyph" || t === "glyphpx" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, X2 || (X2 = /* @__PURE__ */ e.createElement("path", {
    d: "M8,4A4,4,0,1,1,4,8,4.0045,4.0045,0,0,1,8,4M8,2a6,6,0,1,0,6,6A6,6,0,0,0,8,2Z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16",
    fill: "currentColor",
    ...n
  }, Q2 || (Q2 = /* @__PURE__ */ e.createElement("path", {
    d: "M8,4A4,4,0,1,1,4,8,4.0045,4.0045,0,0,1,8,4M8,2a6,6,0,1,0,6,6A6,6,0,0,0,8,2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (f5.propTypes = c);
const w5 = /* @__PURE__ */ e.forwardRef(function({
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
  }, K2 || (K2 = /* @__PURE__ */ e.createElement("path", {
    d: "M18 9L18 15 14 15 14 9 12 9 12 23 14 23 14 17 18 17 18 23 20 23 20 9 18 9z"
  })), J2 || (J2 = /* @__PURE__ */ e.createElement("path", {
    d: "M30,15H26V6a2,2,0,0,0-2-2H8A2,2,0,0,0,6,6v9H2v2H6v9a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V17h4ZM8,26V6H24V26Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (w5.propTypes = c);
const u5 = /* @__PURE__ */ e.forwardRef(function({
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
  }, ee || (ee = /* @__PURE__ */ e.createElement("circle", {
    cx: "15",
    cy: "19",
    r: "1"
  })), te || (te = /* @__PURE__ */ e.createElement("path", {
    d: "M27.7,9.3l-7-7A.9087.9087,0,0,0,20,2H10A2.0058,2.0058,0,0,0,8,4V14H6a2.0023,2.0023,0,0,0-2,2v6a2.0023,2.0023,0,0,0,2,2H8v4a2.0058,2.0058,0,0,0,2,2H26a2.0058,2.0058,0,0,0,2-2V10A.9092.9092,0,0,0,27.7,9.3ZM20,4.4,25.6,10H20ZM6,16h9.5972L19,19l-3.3926,3H6ZM26,28H10V24h5.6089a2.0076,2.0076,0,0,0,1.3135-.4927l3.3833-2.9917a2.0015,2.0015,0,0,0,.01-3.0229l-3.4033-3.0083A1.9961,1.9961,0,0,0,15.6089,14H10V4h8v6a2.0058,2.0058,0,0,0,2,2h6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (u5.propTypes = c);
const d5 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M30 10V2H22v8h3v4H23v2h7V14H27V10zM24 4h4V8H24zM20 23.41L18.59 22 16 24.59 13.41 22 12 23.41 14.59 26 12 28.59 13.41 30 16 27.41 18.59 30 20 28.59 17.41 26 20 23.41zM20 14L12 14 12 16 15 16 15 21 17 21 17 16 20 16 20 14zM7 9.86a4 4 0 10-2 0V14H2v2H9V14H7zM4 6A2 2 0 116 8 2 2 0 014 6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (d5.propTypes = c);
const v5 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M20 18H26V20H20z",
    transform: "rotate(-180 23 19)"
  })), oe || (oe = /* @__PURE__ */ e.createElement("path", {
    d: "M24 26H30V28H24z",
    transform: "rotate(-180 27 27)"
  })), ae || (ae = /* @__PURE__ */ e.createElement("path", {
    d: "M22 22H28V24H22z",
    transform: "rotate(-180 25 23)"
  })), le || (le = /* @__PURE__ */ e.createElement("path", {
    d: "M17.0029,20a4.8952,4.8952,0,0,0-2.4044-4.1729L22,3,20.2691,2,12.6933,15.126A5.6988,5.6988,0,0,0,7.45,16.6289C3.7064,20.24,3.9963,28.6821,4.01,29.04a1,1,0,0,0,1,.96H20.0012a1,1,0,0,0,.6-1.8C17.0615,25.5439,17.0029,20.0537,17.0029,20ZM11.93,16.9971A3.11,3.11,0,0,1,15.0041,20c0,.0381.0019.208.0168.4688L9.1215,17.8452A3.8,3.8,0,0,1,11.93,16.9971ZM15.4494,28A5.2,5.2,0,0,1,14,25H12a6.4993,6.4993,0,0,0,.9684,3H10.7451A16.6166,16.6166,0,0,1,10,24H8a17.3424,17.3424,0,0,0,.6652,4H6c.031-1.8364.29-5.8921,1.8027-8.5527l7.533,3.35A13.0253,13.0253,0,0,0,17.5968,28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (v5.propTypes = c);
const m5 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M17.4141 16L24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8 22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z"
  })), r);
});
process.env.NODE_ENV !== "production" && (m5.propTypes = c);
const E5 = /* @__PURE__ */ e.forwardRef(function({
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
  }, ie || (ie = /* @__PURE__ */ e.createElement("path", {
    d: "M8,1C4.1,1,1,4.1,1,8s3.1,7,7,7s7-3.1,7-7S11.9,1,8,1z M10.7,11.5L8,8.8l-2.7,2.7l-0.8-0.8L7.2,8L4.5,5.3l0.8-0.8L8,7.2 l2.7-2.7l0.8,0.8L8.8,8l2.7,2.7L10.7,11.5z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, pe || (pe = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2C8.2,2,2,8.2,2,16s6.2,14,14,14s14-6.2,14-14S23.8,2,16,2z M21.4,23L16,17.6L10.6,23L9,21.4l5.4-5.4L9,10.6L10.6,9 l5.4,5.4L21.4,9l1.6,1.6L17.6,16l5.4,5.4L21.4,23z"
  })), he || (he = /* @__PURE__ */ e.createElement("path", {
    d: "M14.4 16L9 10.6 10.6 9 16 14.4 21.4 9 23 10.6 17.6 16 23 21.4 21.4 23 16 17.6 10.6 23 9 21.4 14.4 16",
    "data-icon-path": "inner-path",
    opacity: "0"
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
  }, se || (se = /* @__PURE__ */ e.createElement("path", {
    d: "M17.4141 16L26 7.4141 24.5859 6 16 14.5859 7.4143 6 6 7.4141 14.5859 16 6 24.5859 7.4143 26 16 17.4141 24.5859 26 26 24.5859 17.4141 16z"
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
  }, fe || (fe = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2C8.2,2,2,8.2,2,16s6.2,14,14,14s14-6.2,14-14S23.8,2,16,2z M16,28C9.4,28,4,22.6,4,16S9.4,4,16,4s12,5.4,12,12 S22.6,28,16,28z"
  })), we || (we = /* @__PURE__ */ e.createElement("path", {
    d: "M21.4 23L16 17.6 10.6 23 9 21.4 14.4 16 9 10.6 10.6 9 16 14.4 21.4 9 23 10.6 17.6 16 23 21.4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (H5.propTypes = c);
const g5 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M15 21H10a2 2 0 01-2-2V13a2 2 0 012-2h5v2H10v6h5zM25 21H20a2 2 0 01-2-2V13a2 2 0 012-2h5v2H20v6h5z"
  })), de || (de = /* @__PURE__ */ e.createElement("path", {
    d: "M28,26H4a2,2,0,0,1-2-2V8A2,2,0,0,1,4,6H28a2,2,0,0,1,2,2V24A2,2,0,0,1,28,26ZM4,8V24H28V8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (g5.propTypes = c);
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
  }, ve || (ve = /* @__PURE__ */ e.createElement("path", {
    d: "M19 17H25V19H19zM11 17H17V19H11zM6 17H9V19H6zM22 13H26V15H22zM13 13H20V15H13zM6 13H11V15H6z"
  })), me || (me = /* @__PURE__ */ e.createElement("path", {
    d: "M17.7358,30,16,29l4-7h6a1.9966,1.9966,0,0,0,2-2V8a1.9966,1.9966,0,0,0-2-2H6A1.9966,1.9966,0,0,0,4,8V20a1.9966,1.9966,0,0,0,2,2h9v2H6a3.9993,3.9993,0,0,1-4-4V8A3.9988,3.9988,0,0,1,6,4H26a3.9988,3.9988,0,0,1,4,4V20a3.9993,3.9993,0,0,1-4,4H21.1646Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (M5.propTypes = c);
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
  }, Ee || (Ee = /* @__PURE__ */ e.createElement("path", {
    d: "M28,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6ZM15,13H10v6h5v2H10a2,2,0,0,1-2-2V13a2,2,0,0,1,2-2h5Zm10,0H20v6h5v2H20a2,2,0,0,1-2-2V13a2,2,0,0,1,2-2h5Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (_5.propTypes = c);
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
  }, Ve || (Ve = /* @__PURE__ */ e.createElement("path", {
    d: "M16,7h0a7.66,7.66,0,0,1,1.51.15,8,8,0,0,1,6.35,6.34l.26,1.35,1.35.24a5.5,5.5,0,0,1-1,10.92H7.5a5.5,5.5,0,0,1-1-10.92l1.34-.24.26-1.35A8,8,0,0,1,16,7m0-2a10,10,0,0,0-9.83,8.12A7.5,7.5,0,0,0,7.49,28h17a7.5,7.5,0,0,0,1.32-14.88,10,10,0,0,0-7.94-7.94A10.27,10.27,0,0,0,16,5Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (C5.propTypes = c);
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
  }, He || (He = /* @__PURE__ */ e.createElement("path", {
    d: "M28,17v5H4V6H15V4H4A2,2,0,0,0,2,6V22a2,2,0,0,0,2,2h8v4H8v2H24V28H20V24h8a2,2,0,0,0,2-2V17ZM18,28H14V24h4Z"
  })), ge || (ge = /* @__PURE__ */ e.createElement("path", {
    d: "M29,14H17a1,1,0,0,1-.8574-1.5144l6-10a1,1,0,0,1,1.7154,0l6,10A1,1,0,0,1,29,14ZM18.7661,12h8.4678L23,4.9436Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (x5.propTypes = c);
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
  }, Me || (Me = /* @__PURE__ */ e.createElement("path", {
    d: "M28,16v6H4V6H16V4H4A2,2,0,0,0,2,6V22a2,2,0,0,0,2,2h8v4H8v2H24V28H20V24h8a2,2,0,0,0,2-2V16ZM18,28H14V24h4Z"
  })), _e || (_e = /* @__PURE__ */ e.createElement("path", {
    d: "M21 15L16 10.04 17.59 8.47 21 11.85 28.41 4.5 30 6.08 21 15z"
  })), r);
});
process.env.NODE_ENV !== "production" && (A5.propTypes = c);
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
  }, Ce || (Ce = /* @__PURE__ */ e.createElement("path", {
    d: "M28 18H30V28H28zM24 14H26V28H24zM20 22H22V28H20zM22.175 10L23.76 8.7339A9.9522 9.9522 0 0017.89 5.1816 10.0025 10.0025 0 006.17 13.1152 7.5054 7.5054 0 00.0544 21.4087 7.6843 7.6843 0 007.7692 28H16V26H7.6945a5.632 5.632 0 01-5.6023-4.4858 5.5064 5.5064 0 014.4339-6.4307l1.3486-.2441.2139-1.11a8.206 8.206 0 016.7426-6.6426 7.9666 7.9666 0 013.0137.13A7.8037 7.8037 0 0122.175 10z"
  })), r);
});
process.env.NODE_ENV !== "production" && (y5.propTypes = c);
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
  }, xe || (xe = /* @__PURE__ */ e.createElement("path", {
    d: "M23.5,22H23V20h.5a4.5,4.5,0,0,0,.36-9L23,11l-.1-.82a7,7,0,0,0-13.88,0L9,11,8.14,11a4.5,4.5,0,0,0,.36,9H9v2H8.5A6.5,6.5,0,0,1,7.2,9.14a9,9,0,0,1,17.6,0A6.5,6.5,0,0,1,23.5,22Z"
  })), Ae || (Ae = /* @__PURE__ */ e.createElement("path", {
    d: "M17 26.17L17 14 15 14 15 26.17 12.41 23.59 11 25 16 30 21 25 19.59 23.59 17 26.17z"
  })), r);
});
process.env.NODE_ENV !== "production" && (N5.propTypes = c);
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
  }, ye || (ye = /* @__PURE__ */ e.createElement("path", {
    d: "M28 16v6H4V6H15V4H4A2 2 0 002 6V22a2 2 0 002 2h8v4H8v2H24V28H20V24h8a2 2 0 002-2V16zM18 28H14V24h4zM18 4H30V6H18z"
  })), Ne || (Ne = /* @__PURE__ */ e.createElement("path", {
    d: "M18 8H30V10H18zM18 12H24V14H18z"
  })), r);
});
process.env.NODE_ENV !== "production" && (L5.propTypes = c);
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
  }, Le || (Le = /* @__PURE__ */ e.createElement("path", {
    d: "M28,16v6H4V6h7V4H4A2,2,0,0,0,2,6V22a2,2,0,0,0,2,2h8v4H8v2H24V28H20V24h8a2,2,0,0,0,2-2V16ZM18,28H14V24h4Z"
  })), Te || (Te = /* @__PURE__ */ e.createElement("path", {
    d: "M18,18h-.01a1,1,0,0,1-.9511-.7253L15.2456,11H11V9h5a1,1,0,0,1,.9615.7252l1.0742,3.7589,3.0088-9.7783A1.0142,1.0142,0,0,1,22,3a.98.98,0,0,1,.9487.6838L24.7207,9H30v2H24a1,1,0,0,1-.9487-.6838l-1.0132-3.04L18.9556,17.2942A1,1,0,0,1,18,18Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (T5.propTypes = c);
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
  }, Oe || (Oe = /* @__PURE__ */ e.createElement("path", {
    d: "M24.8008 12.1362a8.8694 8.8694 0 00-.9795-2.5434L30 3.4142 28.5872 2 2 28.5872 3.4142 30l5-5H23.5a6.4974 6.4974 0 001.3008-12.8638zM23.5 23H10.4141L22.3418 11.0723a6.9049 6.9049 0 01.6006 2.0708l.0986.812.8154.0639A4.4975 4.4975 0 0123.5 23zM4.2964 23.4487l1.4313-1.4311A4.4774 4.4774 0 018.144 14.019l.8155-.0639.0991-.812a6.9867 6.9867 0 0110.63-5.0865l1.4431-1.4428A8.9859 8.9859 0 007.2 12.1362 6.4891 6.4891 0 004.2964 23.4487z"
  })), r);
});
process.env.NODE_ENV !== "production" && (O5.propTypes = c);
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
  }, Ze || (Ze = /* @__PURE__ */ e.createElement("path", {
    d: "M28,17v5H4V6H14V4H4A2,2,0,0,0,2,6V22a2,2,0,0,0,2,2h8v4H8v2H24V28H20V24h8a2,2,0,0,0,2-2V17ZM18,28H14V24h4Z"
  })), Re || (Re = /* @__PURE__ */ e.createElement("path", {
    d: "M30,10V8H27.8989a4.9678,4.9678,0,0,0-.7319-1.7529l1.49-1.49-1.414-1.414-1.49,1.49A4.9678,4.9678,0,0,0,24,4.1011V2H22V4.1011a4.9678,4.9678,0,0,0-1.7529.7319l-1.49-1.49-1.414,1.414,1.49,1.49A4.9678,4.9678,0,0,0,18.1011,8H16v2h2.1011a4.9678,4.9678,0,0,0,.7319,1.7529l-1.49,1.49,1.414,1.414,1.49-1.49A4.9678,4.9678,0,0,0,22,13.8989V16h2V13.8989a4.9678,4.9678,0,0,0,1.7529-.7319l1.49,1.49,1.414-1.414-1.49-1.49A4.9678,4.9678,0,0,0,27.8989,10Zm-7,2a3,3,0,1,1,3-3A3.0033,3.0033,0,0,1,23,12Z"
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
  }, be || (be = /* @__PURE__ */ e.createElement("path", {
    d: "M11 18L12.41 19.41 15 16.83 15 29 17 29 17 16.83 19.59 19.41 21 18 16 13 11 18z"
  })), De || (De = /* @__PURE__ */ e.createElement("path", {
    d: "M23.5,22H23V20h.5a4.5,4.5,0,0,0,.36-9L23,11l-.1-.82a7,7,0,0,0-13.88,0L9,11,8.14,11a4.5,4.5,0,0,0,.36,9H9v2H8.5A6.5,6.5,0,0,1,7.2,9.14a9,9,0,0,1,17.6,0A6.5,6.5,0,0,1,23.5,22Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (R5.propTypes = c);
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
  }, Be || (Be = /* @__PURE__ */ e.createElement("path", {
    d: "M25.8289 13.1155A10.02 10.02 0 0016 5.0005V7a8.0233 8.0233 0 017.8649 6.4934l.2591 1.346 1.3488.2441A5.5019 5.5019 0 0124.5076 26H16v2h8.5076a7.5019 7.5019 0 001.3213-14.8845zM8 24H14V26H8zM4 24H6V26H4zM6 20H14V22H6zM2 20H4V22H2zM8 16H14V18H8zM4 16H6V18H4zM10 12H14V14H10zM6 12H8V14H6zM12 8H14V10H12z"
  })), r);
});
process.env.NODE_ENV !== "production" && (b5.propTypes = c);
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
  }, Se || (Se = /* @__PURE__ */ e.createElement("path", {
    d: "M2 28H11V30H2zM21 28H30V30H21zM17 26.167L17 17.832 19.586 20.414 21 19 16 14 11 19 12.413 20.415 15 17.832 15 26.167 12.413 23.584 11 25 16 30 21 25 19.586 23.586 17 26.167z"
  })), $e || ($e = /* @__PURE__ */ e.createElement("path", {
    d: "M23,16H21V14h2a3,3,0,0,0,0-6c-.0938.0144-.1538.0219-.2153.0263l-.8037.0572L21.7544,7.31a5.9927,5.9927,0,0,0-11.1758-.8655l-.2832.5994-.8423-.0455A3.5008,3.5008,0,0,0,9.5,14H11v2H9.5A5.5,5.5,0,0,1,9.07,5.0166,7.9909,7.9909,0,0,1,23.42,6.0175,5,5,0,0,1,23,16Z"
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
  }, ze || (ze = /* @__PURE__ */ e.createElement("path", {
    d: "M16,7h0a7.66,7.66,0,0,1,1.51.15,8,8,0,0,1,6.35,6.34l.26,1.35,1.35.24a5.5,5.5,0,0,1-1,10.92H7.5a5.5,5.5,0,0,1-1-10.92l1.34-.24.26-1.35A8,8,0,0,1,16,7m0-2a10,10,0,0,0-9.83,8.12A7.5,7.5,0,0,0,7.49,28h17a7.5,7.5,0,0,0,1.32-14.88,10,10,0,0,0-7.94-7.94A10.27,10.27,0,0,0,16,5Z"
  })), We || (We = /* @__PURE__ */ e.createElement("path", {
    d: "M14 24H11a2 2 0 01-2-2V19a2 2 0 012-2h3v2H11v3h3zM21 15V13H19a2 2 0 00-2 2v2H16v2h1v5h2V19h2V17H19V15z"
  })), r);
});
process.env.NODE_ENV !== "production" && (B5.propTypes = c);
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
  }, Pe || (Pe = /* @__PURE__ */ e.createElement("path", {
    d: "M25 11L25 9 17 9 17 23 19 23 19 17 24 17 24 15 19 15 19 11 25 11zM15 23H9a2 2 0 01-2-2V11A2 2 0 019 9h6v2H9V21h6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (S5.propTypes = c);
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
  }, Ie || (Ie = /* @__PURE__ */ e.createElement("path", {
    d: "M28 30H23a2.0023 2.0023 0 01-2-2V23a2.0023 2.0023 0 012-2h5a2.0023 2.0023 0 012 2v5A2.0023 2.0023 0 0128 30zm-5-7h-.0012L23 28h5V23zM16 23H11a2.0023 2.0023 0 01-2-2V11a2.0023 2.0023 0 012-2H21a2.0023 2.0023 0 012 2v5H21V11H11V21h5z"
  })), ke || (ke = /* @__PURE__ */ e.createElement("path", {
    d: "M16,30H4a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,4,2H28a2.0023,2.0023,0,0,1,2,2V16H28V4H4V28H16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && ($5.propTypes = c);
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
  }, Fe || (Fe = /* @__PURE__ */ e.createElement("circle", {
    cx: "9",
    cy: "20",
    r: "2"
  })), je || (je = /* @__PURE__ */ e.createElement("path", {
    d: "M16,20a4,4,0,1,1,4-4A4.0118,4.0118,0,0,1,16,20Zm0-6a2,2,0,1,0,2,2A2.0059,2.0059,0,0,0,16,14Z"
  })), Ue || (Ue = /* @__PURE__ */ e.createElement("circle", {
    cx: "23",
    cy: "12",
    r: "2"
  })), qe || (qe = /* @__PURE__ */ e.createElement("path", {
    d: "M16,31a.9988.9988,0,0,1-.5039-.1357l-12-7A1.0008,1.0008,0,0,1,3,23V9a.9994.9994,0,0,1,.4961-.8638l12-7a1,1,0,0,1,1.0078,0l12,7L27.4961,9.8638,16,3.1577,5,9.5742V22.4258l11,6.417,11-6.417V15h2v8a1.0008,1.0008,0,0,1-.4961.8643l-12,7A.9988.9988,0,0,1,16,31Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (z5.propTypes = c);
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
  }, Ye || (Ye = /* @__PURE__ */ e.createElement("path", {
    d: "M32,26V24H29.8989a4.9678,4.9678,0,0,0-.7319-1.7529l1.49-1.49-1.414-1.414-1.49,1.49A4.9678,4.9678,0,0,0,26,20.1011V18H24v2.1011a4.9678,4.9678,0,0,0-1.7529.7319l-1.49-1.49-1.414,1.414,1.49,1.49A4.9678,4.9678,0,0,0,20.1011,24H18v2h2.1011a4.9678,4.9678,0,0,0,.7319,1.7529l-1.49,1.49,1.414,1.414,1.49-1.49A4.9678,4.9678,0,0,0,24,29.8989V32h2V29.8989a4.9678,4.9678,0,0,0,1.7529-.7319l1.49,1.49,1.414-1.414-1.49-1.49A4.9678,4.9678,0,0,0,29.8989,26Zm-7,2a3,3,0,1,1,3-3A3.0033,3.0033,0,0,1,25,28Z"
  })), Ge || (Ge = /* @__PURE__ */ e.createElement("circle", {
    cx: "7",
    cy: "20",
    r: "2"
  })), Xe || (Xe = /* @__PURE__ */ e.createElement("path", {
    d: "M14,20a4,4,0,1,1,4-4A4.0118,4.0118,0,0,1,14,20Zm0-6a2,2,0,1,0,2,2A2.0059,2.0059,0,0,0,14,14Z"
  })), Qe || (Qe = /* @__PURE__ */ e.createElement("circle", {
    cx: "21",
    cy: "12",
    r: "2"
  })), Ke || (Ke = /* @__PURE__ */ e.createElement("path", {
    d: "M13.0205,28.2715,3,22.4258V9.5742L14,3.1577,25.4961,9.8638l1.0078-1.7276-12-7a1,1,0,0,0-1.0078,0l-12,7A.9994.9994,0,0,0,1,9V23a1.0008,1.0008,0,0,0,.4961.8643L12.0127,30Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (W5.propTypes = c);
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
  }, Je || (Je = /* @__PURE__ */ e.createElement("path", {
    d: "M30.9763,24.9748l-5.0015,5.0015a3.501,3.501,0,0,1-4.9511-4.9511L22.4383,26.44A1.5,1.5,0,0,0,24.56,28.5617L29.5617,23.56A1.5,1.5,0,0,0,27.44,21.4383l-1.4146-1.4146a3.501,3.501,0,0,1,4.9511,4.9511Z"
  })), et || (et = /* @__PURE__ */ e.createElement("path", {
    d: "M20.0252,21.0237l-5.0015,5.0015a3.501,3.501,0,0,0,4.9511,4.9511L18.56,29.5617A1.5,1.5,0,0,1,16.4383,27.44L21.44,22.4383A1.5,1.5,0,0,1,23.5617,24.56l1.4146,1.4146a3.501,3.501,0,0,0-4.9511-4.9511Z"
  })), tt || (tt = /* @__PURE__ */ e.createElement("circle", {
    cx: "7",
    cy: "20",
    r: "2"
  })), rt || (rt = /* @__PURE__ */ e.createElement("path", {
    d: "M14,20a4,4,0,1,1,4-4A4.0118,4.0118,0,0,1,14,20Zm0-6a2,2,0,1,0,2,2A2.0059,2.0059,0,0,0,14,14Z"
  })), nt || (nt = /* @__PURE__ */ e.createElement("circle", {
    cx: "21",
    cy: "12",
    r: "2"
  })), ot || (ot = /* @__PURE__ */ e.createElement("path", {
    d: "M11.3076,27.2725,3,22.4258V9.5742L14,3.1577,25.4961,9.8638l1.0078-1.7276-12-7a1,1,0,0,0-1.0078,0l-12,7A.9994.9994,0,0,0,1,9V23a1.0008,1.0008,0,0,0,.4961.8643L10.3,29Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (P5.propTypes = c);
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
  }, at || (at = /* @__PURE__ */ e.createElement("path", {
    d: "M29,26a2.97,2.97,0,0,0-1.8551.6607L25,25.4224V23.8157a3,3,0,1,0-2,0v1.6067l-2.1449,1.2383A2.97,2.97,0,0,0,19,26a3.02,3.02,0,1,0,2.9254,2.3525L24,27.1548l2.0746,1.1977A2.9978,2.9978,0,1,0,29,26ZM19,30a1,1,0,1,1,1-1A1.0006,1.0006,0,0,1,19,30Zm5-10a1,1,0,1,1-1,1A1.0009,1.0009,0,0,1,24,20Zm5,10a1,1,0,1,1,1-1A1.0006,1.0006,0,0,1,29,30Z"
  })), lt || (lt = /* @__PURE__ */ e.createElement("circle", {
    cx: "7",
    cy: "20",
    r: "2"
  })), ct || (ct = /* @__PURE__ */ e.createElement("path", {
    d: "M14,20a4,4,0,1,1,4-4A4.0118,4.0118,0,0,1,14,20Zm0-6a2,2,0,1,0,2,2A2.0059,2.0059,0,0,0,14,14Z"
  })), it || (it = /* @__PURE__ */ e.createElement("circle", {
    cx: "21",
    cy: "12",
    r: "2"
  })), pt || (pt = /* @__PURE__ */ e.createElement("path", {
    d: "M13.0205,28.2715,3,22.4258V9.5742L14,3.1577,25.4961,9.8638l1.0078-1.7276-12-7a1,1,0,0,0-1.0078,0l-12,7A.9994.9994,0,0,0,1,9V23a1.0008,1.0008,0,0,0,.4961.8643L12.0127,30Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (I5.propTypes = c);
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
  }, ht || (ht = /* @__PURE__ */ e.createElement("path", {
    d: "M25.8218,10.124a9.9991,9.9991,0,0,0-19.6435,0A7.4964,7.4964,0,0,0,7.5,25H8V23H7.5a5.4961,5.4961,0,0,1-.3769-10.9795l.8364-.0571.09-.8335a7.9979,7.9979,0,0,1,15.9013,0l.09.8335.8364.0571A5.4961,5.4961,0,0,1,24.5,23H24v2h.5a7.4964,7.4964,0,0,0,1.3218-14.876Z"
  })), st || (st = /* @__PURE__ */ e.createElement("path", {
    d: "M23,22V20H20.8989a4.9678,4.9678,0,0,0-.7319-1.7529l1.49-1.49-1.414-1.414-1.49,1.49A4.9678,4.9678,0,0,0,17,16.1011V14H15v2.1011a4.9678,4.9678,0,0,0-1.7529.7319l-1.49-1.49-1.414,1.414,1.49,1.49A4.9678,4.9678,0,0,0,11.1011,20H9v2h2.1011a4.9678,4.9678,0,0,0,.7319,1.7529l-1.49,1.49,1.414,1.414,1.49-1.49A4.9678,4.9678,0,0,0,15,25.8989V28h2V25.8989a4.9678,4.9678,0,0,0,1.7529-.7319l1.49,1.49,1.414-1.414-1.49-1.49A4.9678,4.9678,0,0,0,20.8989,22Zm-7,2a3,3,0,1,1,3-3A3.0033,3.0033,0,0,1,16,24Z"
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
  }, ft || (ft = /* @__PURE__ */ e.createElement("path", {
    d: "M30.0005,15.5005a6.5324,6.5324,0,0,0-5.1992-6.3638,8.9943,8.9943,0,0,0-17.6006,0,6.5321,6.5321,0,0,0-5.2,6.3638,6.4543,6.4543,0,0,0,1.6887,4.35A5.9829,5.9829,0,0,0,8,30H19a5.9764,5.9764,0,0,0,5.6094-8.1016A6.5051,6.5051,0,0,0,30.0005,15.5005ZM19,28H8a3.9925,3.9925,0,0,1-.6731-7.9292L7.99,19.958l.1458-.6562a5.496,5.496,0,0,1,10.7294,0l.1458.6562.6626.1128A3.9925,3.9925,0,0,1,19,28Zm4.5-8h-.0554a5.9562,5.9562,0,0,0-2.7959-1.7564,7.4952,7.4952,0,0,0-14.2984,0,5.9877,5.9877,0,0,0-1.0315.4073A4.4446,4.4446,0,0,1,4,15.5005a4.5171,4.5171,0,0,1,4.144-4.481l.8155-.0639.0991-.812a6.9938,6.9938,0,0,1,13.8838,0l.0986.812.8154.0639a4.4975,4.4975,0,0,1-.3564,8.981Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (F5.propTypes = c);
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
  }, wt || (wt = /* @__PURE__ */ e.createElement("path", {
    d: "M20 17V15a2 2 0 00-2-2H10a2 2 0 00-2 2v2a2 2 0 002 2h8A2 2 0 0020 17zM10 15h8v2H10zM23.42 24.48A2 2 0 0021 23.06l-7.73 2.07a2 2 0 00-1.42 2.44h0l.52 1.93A2 2 0 0014.27 31a3 3 0 00.52-.07l7.73-2.07h0a2 2 0 001.41-2.45zM14.27 29l-.51-1.94L21.48 25 22 26.92zM13.24 6.86L21 8.93h0a2.24 2.24 0 00.51.07 2 2 0 001.94-1.48L24 5.58a2 2 0 00-1.41-2.45L14.79 1.06a2 2 0 00-2.45 1.41h0l-.52 1.93a2 2 0 001.42 2.44zm1-3.86L22 5.07 21.48 7 13.76 4.93zM14 21H16V23H14zM14 9H16V11H14z"
  })), r);
});
process.env.NODE_ENV !== "production" && (j5.propTypes = c);
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
  }, ut || (ut = /* @__PURE__ */ e.createElement("path", {
    d: "M31 16L24 23 22.59 21.59 28.17 16 22.59 10.41 24 9 31 16zM1 16L8 9 9.41 10.41 3.83 16 9.41 21.59 8 23 1 16z"
  })), dt || (dt = /* @__PURE__ */ e.createElement("path", {
    d: "M5.91 15H26.080000000000002V17H5.91z",
    transform: "rotate(-75 15.996 16)"
  })), r);
});
process.env.NODE_ENV !== "production" && (U5.propTypes = c);
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
  }, vt || (vt = /* @__PURE__ */ e.createElement("path", {
    d: "M17.713 13.471L19.576 6.518 17.645 6 16.08 11.838 17.713 13.471zM24.207 19.965L25.621 21.379 31 16 24 9 22.586 10.414 28.172 16 24.207 19.965zM30 28.586L3.414 2 2 3.414 7.793 9.207 1 16 8 23 9.414 21.586 3.828 16 9.207 10.621 14.884 16.298 12.423 25.482 14.355 26 16.517 17.931 28.586 30 30 28.586z"
  })), r);
});
process.env.NODE_ENV !== "production" && (q5.propTypes = c);
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
  }, mt || (mt = /* @__PURE__ */ e.createElement("path", {
    d: "M4 20L4 22 8.586 22 2 28.586 3.414 30 10 23.414 10 28 12 28 12 20 4 20zM30 10L24 4 22.586 5.414 27.172 10 22.586 14.586 24 16 30 10z"
  })), Et || (Et = /* @__PURE__ */ e.createElement("path", {
    d: "M8.944 9.001H24.974000000000004V11.001H8.944z",
    transform: "rotate(-74.995 16.96 10)"
  })), Vt || (Vt = /* @__PURE__ */ e.createElement("path", {
    d: "M4 10L10 4 11.414 5.414 6.828 10 11.414 14.586 10 16 4 10z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Y5.propTypes = c);
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
  }, Ht || (Ht = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "M2 3H10V5H2zM6 9H30V11H6zM6 15H30V17H6zM2 27H10V29H2zM6 21H22V23H6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (G5.propTypes = c);
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
  }, gt || (gt = /* @__PURE__ */ e.createElement("circle", {
    cx: "25",
    cy: "20",
    r: "1"
  })), Mt || (Mt = /* @__PURE__ */ e.createElement("path", {
    d: "M19.4141 30H15V25.5857l5.0337-5.0337A4.6069 4.6069 0 0120 20a5 5 0 114.4478 4.9663zM17 28h1.5859l5.2061-5.2063.5395.1238a3.0351 3.0351 0 10-2.249-2.2488l.1236.5393L17 26.4143zM6 8H8V16H6zM2 8H4V16H2zM18 8H20V14H18zM14 16H12a2 2 0 01-2-2V10a2 2 0 012-2h2a2 2 0 012 2v4A2 2 0 0114 16zm-2-2h2V10H12zM2 18H4V26H2zM14 18H16V22H14zM10 26H8a2 2 0 01-2-2V20a2 2 0 012-2h2a2 2 0 012 2v4A2 2 0 0110 26zM8 24h2V20H8zM2 2H4V6H2zM14 2H16V6H14zM18 2H20V6H18zM10 6H8A2 2 0 016 4V2H8V4h2V2h2V4A2 2 0 0110 6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (X5.propTypes = c);
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
  }, _t || (_t = /* @__PURE__ */ e.createElement("path", {
    d: "M30,13A11,11,0,0,0,19,2H11a9,9,0,0,0-9,9v3a5,5,0,0,0,5,5H8.1A5,5,0,0,0,13,23h1.38l4,7,1.73-1-4-6.89A2,2,0,0,0,14.38,21H13a3,3,0,0,1,0-6h1V13H13a5,5,0,0,0-4.9,4H7a3,3,0,0,1-3-3V12H6A3,3,0,0,0,9,9V8H7V9a1,1,0,0,1-1,1H4.08A7,7,0,0,1,11,4h6V6a1,1,0,0,1-1,1H14V9h2a3,3,0,0,0,3-3V4a9,9,0,0,1,8.05,5H26a3,3,0,0,0-3,3v1h2V12a1,1,0,0,1,1-1h1.77A8.76,8.76,0,0,1,28,13v1a5,5,0,0,1-5,5H20v2h3a7,7,0,0,0,3-.68V21a3,3,0,0,1-3,3H22v2h1a5,5,0,0,0,5-5V18.89A7,7,0,0,0,30,14Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Q5.propTypes = c);
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
  }, Ct || (Ct = /* @__PURE__ */ e.createElement("path", {
    d: "M6 21V20H4v1a7 7 0 007 7h3V26H11A5 5 0 016 21zM24 11v1h2V11a7 7 0 00-7-7H16V6h3A5 5 0 0124 11zM11 11H5a3 3 0 00-3 3v2H4V14a1 1 0 011-1h6a1 1 0 011 1v2h2V14A3 3 0 0011 11zM8 10A4 4 0 104 6 4 4 0 008 10zM8 4A2 2 0 116 6 2 2 0 018 4zM27 25H21a3 3 0 00-3 3v2h2V28a1 1 0 011-1h6a1 1 0 011 1v2h2V28A3 3 0 0027 25zM20 20a4 4 0 104-4A4 4 0 0020 20zm6 0a2 2 0 11-2-2A2 2 0 0126 20z"
  })), r);
});
process.env.NODE_ENV !== "production" && (K5.propTypes = c);
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
  }, xt || (xt = /* @__PURE__ */ e.createElement("path", {
    d: "M30,15H28V7H13V5H28a2.0023,2.0023,0,0,1,2,2Z"
  })), At || (At = /* @__PURE__ */ e.createElement("path", {
    d: "M25,20H23V12H8V10H23a2.0023,2.0023,0,0,1,2,2Z"
  })), yt || (yt = /* @__PURE__ */ e.createElement("path", {
    d: "M18,27H4a2.0023,2.0023,0,0,1-2-2V17a2.0023,2.0023,0,0,1,2-2H18a2.0023,2.0023,0,0,1,2,2v8A2.0023,2.0023,0,0,1,18,27ZM4,17v8H18.0012L18,17Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (J5.propTypes = c);
const e9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Nt || (Nt = /* @__PURE__ */ e.createElement("path", {
    d: "M14 25H28V27H14zM7.17 26L4.59 28.58 6 30 10 26 6 22 4.58 23.41 7.17 26zM14 15H28V17H14zM7.17 16L4.59 18.58 6 20 10 16 6 12 4.58 13.41 7.17 16zM14 5H28V7H14zM7.17 6L4.59 8.58 6 10 10 6 6 2 4.58 3.41 7.17 6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (e9.propTypes = c);
const t9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Lt || (Lt = /* @__PURE__ */ e.createElement("circle", {
    cx: "10",
    cy: "12",
    r: "2"
  })), Tt || (Tt = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "9",
    r: "2"
  })), Ot || (Ot = /* @__PURE__ */ e.createElement("circle", {
    cx: "22",
    cy: "12",
    r: "2"
  })), Zt || (Zt = /* @__PURE__ */ e.createElement("circle", {
    cx: "23",
    cy: "18",
    r: "2"
  })), Rt || (Rt = /* @__PURE__ */ e.createElement("circle", {
    cx: "19",
    cy: "23",
    r: "2"
  })), bt || (bt = /* @__PURE__ */ e.createElement("path", {
    d: "M16.54,2A14,14,0,0,0,2,16a4.82,4.82,0,0,0,6.09,4.65l1.12-.31A3,3,0,0,1,13,23.24V27a3,3,0,0,0,3,3A14,14,0,0,0,30,15.46,14.05,14.05,0,0,0,16.54,2Zm8.11,22.31A11.93,11.93,0,0,1,16,28a1,1,0,0,1-1-1V23.24a5,5,0,0,0-5-5,5.07,5.07,0,0,0-1.33.18l-1.12.31A2.82,2.82,0,0,1,4,16,12,12,0,0,1,16.47,4,12.18,12.18,0,0,1,28,15.53,11.89,11.89,0,0,1,24.65,24.32Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (t9.propTypes = c);
const r9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Dt || (Dt = /* @__PURE__ */ e.createElement("path", {
    d: "M26,4H6A2.0025,2.0025,0,0,0,4,6V26a2.0025,2.0025,0,0,0,2,2H26a2.0025,2.0025,0,0,0,2-2V6A2.0025,2.0025,0,0,0,26,4ZM6,26,26,6V26Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (r9.propTypes = c);
const n9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Bt || (Bt = /* @__PURE__ */ e.createElement("path", {
    d: "M24 4H26V28H24zM18 6V26H14V6h4m0-2H14a2 2 0 00-2 2V26a2 2 0 002 2h4a2 2 0 002-2V6a2 2 0 00-2-2zM6 4H8V28H6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (n9.propTypes = c);
const o9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, St || (St = /* @__PURE__ */ e.createElement("path", {
    d: "M30 3.41L28.59 2 25 5.59 21.41 2 20 3.41 23.59 7 20 10.59 21.41 12 25 8.41 28.59 12 30 10.59 26.41 7 30 3.41z"
  })), $t || ($t = /* @__PURE__ */ e.createElement("path", {
    d: "M24 14V28H18V6H16V28a2.0023 2.0023 0 002 2h6a2.0023 2.0023 0 002-2V14zM10 30H4a2.0021 2.0021 0 01-2-2V8A2.0021 2.0021 0 014 6h6a2.0021 2.0021 0 012 2V28A2.0021 2.0021 0 0110 30zM4 8V28h6V8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (o9.propTypes = c);
const a9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, zt || (zt = /* @__PURE__ */ e.createElement("path", {
    d: "M28 30H22a2.0021 2.0021 0 01-2-2V10a2.0021 2.0021 0 012-2h6a2.0021 2.0021 0 012 2V28A2.0021 2.0021 0 0128 30zM22 10V28h6V10zM16 9L21.586 3.414 20.172 2 16 6.172 11.828 2 10.414 3.414 16 9zM10 30H4a2.0021 2.0021 0 01-2-2V10A2.0021 2.0021 0 014 8h6a2.0021 2.0021 0 012 2V28A2.0021 2.0021 0 0110 30zM4 10V28h6V10z"
  })), r);
});
process.env.NODE_ENV !== "production" && (a9.propTypes = c);
const l9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M30,10V2H22V5H17a2.0023,2.0023,0,0,0-2,2v8H10V12H2v8h8V17h5v8a2.0023,2.0023,0,0,0,2,2h5v3h8V22H22v3H17V17h5v3h8V12H22v3H17V7h5v3ZM8,18H4V14H8Zm16,6h4v4H24Zm0-10h4v4H24ZM24,4h4V8H24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (l9.propTypes = c);
const c9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Pt || (Pt = /* @__PURE__ */ e.createElement("path", {
    d: "M30,15H21.91A5.9925,5.9925,0,0,0,10.09,15H2v2h8.09A5.9925,5.9925,0,0,0,21.91,17H30ZM16,20a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,16,20Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (c9.propTypes = c);
const i9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M28 17H18a2.0025 2.0025 0 00-2 2v6a2.0025 2.0025 0 002 2h4V25H18V19H28v6H25.4648l-2.5937 3.8906L24.5352 30l2-3H28a2.0025 2.0025 0 002-2V19A2.0025 2.0025 0 0028 17zM8.6667 24.1086l.8614-.8615a.8334.8334 0 01.8988-.1844l1.0493.42A.8334.8334 0 0112 24.2561v1.9082a.8334.8334 0 01-.8786.8341c-7.3546-.4578-8.84-6.6863-9.1158-9.0723A.8316.8316 0 012.8343 17H4.7085a.8335.8335 0 01.7737.5238l.42 1.0493a.8332.8332 0 01-.1845.8988l-.8614.8614A4.5267 4.5267 0 008.6667 24.1086zM21 9H28V11H21zM21 5H30V7H21zM17 6L14 8.2V6a2.0024 2.0024 0 00-2-2H4A2.0024 2.0024 0 002 6v6a2.0024 2.0024 0 002 2h8a2.0024 2.0024 0 002-2V9.8L17 12zM4 12V6h8v6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (i9.propTypes = c);
const p9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, kt || (kt = /* @__PURE__ */ e.createElement("path", {
    d: "M28,6H18V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V24a2,2,0,0,0,2,2H14v2a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6ZM4,15h6.17L7.59,17.59,9,19l5-5L9,9,7.59,10.41,10.17,13H4V4H16V24H4ZM16,28V26a2,2,0,0,0,2-2V8H28v9H21.83l2.58-2.59L23,13l-5,5,5,5,1.41-1.41L21.83,19H28v9Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (p9.propTypes = c);
const h9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M16,4A12,12,0,1,1,4,16,12,12,0,0,1,16,4m0-2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z"
  })), jt || (jt = /* @__PURE__ */ e.createElement("path", {
    d: "M23,10.41,21.59,9l-4.3,4.3a3,3,0,0,0-4,4L9,21.59,10.41,23l4.3-4.3a3,3,0,0,0,4-4ZM17,16a1,1,0,1,1-1-1A1,1,0,0,1,17,16Z"
  })), Ut || (Ut = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "7.5",
    r: "1.5"
  })), r);
});
process.env.NODE_ENV !== "production" && (h9.propTypes = c);
const s9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, qt || (qt = /* @__PURE__ */ e.createElement("path", {
    d: "M25.82,10H30V8H25.82a3,3,0,0,0-5.64,0H13V5H5V8H2v2H5v3h8V10h7.18A3,3,0,0,0,22,11.82v7.32A4,4,0,0,0,19.14,22H2v2H19.14a4,4,0,0,0,7.72,0H30V22H26.86A4,4,0,0,0,24,19.14V11.82A3,3,0,0,0,25.82,10ZM11,11H7V7h4ZM25,23a2,2,0,1,1-2-2A2,2,0,0,1,25,23Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (s9.propTypes = c);
const f9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M20.8851,19.4711a5.9609,5.9609,0,0,0,0-6.9422L23,10.4141l1.293,1.2929a.9995.9995,0,0,0,1.414,0l4-4a.9994.9994,0,0,0,0-1.414l-4-4a.9994.9994,0,0,0-1.414,0l-4,4a.9994.9994,0,0,0,0,1.414L21.5859,9l-2.1148,2.1149a5.9609,5.9609,0,0,0-6.9422,0L10,8.5859V2H2v8H8.5859l2.529,2.5289a5.9609,5.9609,0,0,0,0,6.9422L9,21.5859,7.707,20.293a.9994.9994,0,0,0-1.414,0l-4,4a.9994.9994,0,0,0,0,1.414l4,4a.9995.9995,0,0,0,1.414,0l4-4a.9994.9994,0,0,0,0-1.414L10.4141,23l2.1148-2.1149a5.9609,5.9609,0,0,0,6.9422,0L22,23.4141V30h8V22H23.4141ZM25,4.4141,27.5859,7,25,9.5859,22.4141,7ZM7,27.5859,4.4141,25,7,22.4141,9.5859,25ZM8,8H4V4H8Zm4,8a4,4,0,1,1,4,4A4.0045,4.0045,0,0,1,12,16Zm12,8h4v4H24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (f9.propTypes = c);
const w9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M10.343 10.343H21.657V21.657H10.343z",
    transform: "rotate(-45 16 16)"
  })), Xt || (Xt = /* @__PURE__ */ e.createElement("path", {
    d: "M29.3906,14.5269,17.4731,2.6094a2.0852,2.0852,0,0,0-2.9462,0L2.6094,14.5269a2.0852,2.0852,0,0,0,0,2.9462L14.5269,29.3906a2.0852,2.0852,0,0,0,2.9462,0L29.3906,17.4731a2.0852,2.0852,0,0,0,0-2.9462ZM16,28.0356,3.9646,16,16,3.9644,28.0356,16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (w9.propTypes = c);
const u9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Qt || (Qt = /* @__PURE__ */ e.createElement("path", {
    d: "M10.343 10.343H21.657V21.657H10.343z",
    transform: "rotate(-45 16 16)"
  })), Kt || (Kt = /* @__PURE__ */ e.createElement("path", {
    d: "M16,4A12,12,0,1,1,4,16,12.0136,12.0136,0,0,1,16,4m0-2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (u9.propTypes = c);
const d9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M23,16a7,7,0,0,0-4.18,1.39L14.6,13.17A6.86,6.86,0,0,0,16,9a7,7,0,1,0-2.81,5.59l4.21,4.22A7,7,0,1,0,23,16ZM4,9a5,5,0,1,1,5,5A5,5,0,0,1,4,9Z",
    transform: "translate(0 .01)"
  })), r);
});
process.env.NODE_ENV !== "production" && (d9.propTypes = c);
const v9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M28,7H13.8281l3.586-3.5859L16,2,10,8l6,6,1.4141-1.4141L13.8281,9H28V20H11.8989A5.0145,5.0145,0,0,0,8,16.1011V2H6V16.1011a5,5,0,0,0,0,9.7978V30H8V25.8989A5.0145,5.0145,0,0,0,11.8989,22H28a2.0023,2.0023,0,0,0,2-2V9A2.0023,2.0023,0,0,0,28,7ZM7,24a3,3,0,1,1,3-3A3.0033,3.0033,0,0,1,7,24Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (v9.propTypes = c);
const m9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M4 20L4 22 8.586 22 2 28.586 3.414 30 10 23.414 10 28 12 28 12 20 4 20z"
  })), rr || (rr = /* @__PURE__ */ e.createElement("path", {
    d: "M23,16c-1.5696,0-3.0124,.5159-4.1813,1.3919l-4.2173-4.2174c.876-1.1689,1.3986-2.6048,1.3986-4.1745,0-3.8599-3.1406-7-7-7S2,5.1401,2,9s3.1406,7,7,7c1.5696,0,3.0184-.5355,4.1873-1.4114l4.2173,4.2174c-.8759,1.1689-1.4046,2.6243-1.4046,4.194,0,3.8599,3.1406,7,7,7s7-3.1401,7-7-3.1406-7-7-7ZM4,9c0-2.7568,2.2432-5,5-5s5,2.2432,5,5-2.2432,5-5,5-5-2.2432-5-5Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (m9.propTypes = c);
const E9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M24,10l-1.4141,1.4141L26.1719,15H11.8989A5.0145,5.0145,0,0,0,8,11.1011V2H6v9.1011a5,5,0,0,0,0,9.7978V30H8V20.8989A5.0145,5.0145,0,0,0,11.8989,17h14.273l-3.586,3.5859L24,22l6-6ZM7,19a3,3,0,1,1,3-3A3.0033,3.0033,0,0,1,7,19Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (E9.propTypes = c);
const V9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M28 2H30V30H28zM20 10l-1.4141 1.4141L22.1719 15H11.8989a5 5 0 100 2h10.273l-3.586 3.5859L20 22l6-6zM7 19a3 3 0 113-3A3.0033 3.0033 0 017 19z"
  })), r);
});
process.env.NODE_ENV !== "production" && (V9.propTypes = c);
const H9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, ar || (ar = /* @__PURE__ */ e.createElement("path", {
    d: "M8 8H10V12H8zM8 14H10V18H8zM14 8H16V12H14zM14 14H16V18H14zM8 20H10V24H8zM14 20H16V24H14zM30 14L21.83 14 24.41 16.59 23 18 18 13 23 8 24.41 9.41 21.83 12 30 12 30 14z"
  })), lr || (lr = /* @__PURE__ */ e.createElement("path", {
    d: "M28,20v8H22V20H20v8H4V4H20V6h2V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V30H30V20Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (H9.propTypes = c);
const g9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, cr || (cr = /* @__PURE__ */ e.createElement("path", {
    d: "M8 8H10V12H8zM8 14H10V18H8zM14 8H16V12H14zM14 14H16V18H14zM8 20H10V24H8zM14 20H16V24H14zM18 14L26.17 14 23.59 16.59 25 18 30 13 25 8 23.59 9.41 26.17 12 18 12 18 14z"
  })), ir || (ir = /* @__PURE__ */ e.createElement("path", {
    d: "M28,20v8H22V20H20v8H4V4H20V6h2V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V30H30V20Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (g9.propTypes = c);
const M9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, pr || (pr = /* @__PURE__ */ e.createElement("path", {
    d: "M8 8H10V12H8zM8 14H10V18H8zM14 8H16V12H14zM14 14H16V18H14zM8 20H10V24H8zM14 20H16V24H14zM30 22L21.83 22 24.41 24.59 23 26 18 21 23 16 24.41 17.41 21.83 20 30 20 30 22zM19 12L27.17 12 24.59 14.59 26 16 31 11 26 6 24.59 7.41 27.17 10 19 10 19 12z"
  })), hr || (hr = /* @__PURE__ */ e.createElement("path", {
    d: "M28,26v2H4V4H20V6h2V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V30H30V26Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (M9.propTypes = c);
const _9 = /* @__PURE__ */ e.forwardRef(function({
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
    strokeWidth: "0",
    d: "m17,26V6c0-1.1046-.8954-2-2-2H4v2h11v20c0,1.1046.8954,2,2,2h11v-2h-11Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (_9.propTypes = c);
const C9 = /* @__PURE__ */ e.forwardRef(function({
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
    strokeWidth: "0",
    d: "m22,16l-1.4141,1.4141,4.5859,4.5859h-10.1719V5c0-1.1046-.8954-2-2-2H3v2h10v17c0,1.1046.8954,2,2,2h10.1719l-4.5859,4.5859,1.4141,1.4141,7-7-7-7Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (C9.propTypes = c);
var wr, ur, dr, vr, mr, Er, Vr, Hr, gr, Mr, _r, Cr, xr, Ar, yr, Nr, Lr, Tr, Or, Zr, Rr, br, Dr, Br, Sr, $r, zr, Wr, Pr, Ir, kr, Fr, jr, Ur, qr, Yr, Gr, Xr, Qr, Kr, Jr, en, tn, rn, nn, on, an, ln, cn, pn, hn, sn, fn, wn, un, dn, vn, mn, En, Vn, Hn, gn, Mn, _n, Cn, xn, An, yn, Nn, Ln, Tn, On, Zn, Rn, bn, Dn, Bn, Sn, $n, zn, Wn, Pn, In, kn, Fn, jn, Un, qn, Yn, Gn, Xn, Qn, Kn, Jn, e4, t4, r4, n4, o4, a4, l4, c4, i4, p4, h4, s4, f4, w4, u4, d4, v4, m4, E4, V4, H4, g4, M4, _4, C4, x4, A4, y4, N4, L4, T4, O4, Z4, R4, b4, D4, B4, S4, $4, z4, W4, P4, I4, k4, F4, j4, U4, q4, Y4, G4, X4, Q4, K4, J4, e3, t3, r3, n3, o3, a3, l3, c3, i3, p3, h3, s3, f3, w3, u3, d3, v3, m3, E3, V3, H3, g3, M3, _3, C3, x3, A3, y3, N3, L3, T3, O3, Z3, R3, b3, D3, B3, S3, $3, z3, W3, P3, I3, k3, F3, j3, U3, q3, Y3, G3, X3, Q3, K3, J3, eo, to, ro, no, oo, ao, lo, co, io, po, ho, so, fo, wo, uo, vo, mo, Eo, Vo, Ho, go, Mo, _o, Co, xo, Ao, yo, No, Lo, To, Oo, Zo, Ro, bo, Do, Bo, So, $o, zo, Wo, Po, Io, ko, Fo, jo, Uo, qo, Yo, Go, Xo, Qo, Ko, Jo, e6, t6, r6, n6, o6, a6, l6, c6, i6, p6, h6, s6, f6, w6, u6, d6, v6, m6, E6;
const U = {}, x9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, wr || (wr = /* @__PURE__ */ e.createElement("path", {
    d: "M18 15L14 15 14 11 12 11 12 15 8 15 8 17 12 17 12 21 14 21 14 17 18 17 18 15z"
  })), ur || (ur = /* @__PURE__ */ e.createElement("path", {
    d: "M21,26H4a2.0023,2.0023,0,0,1-2-2V8A2.0023,2.0023,0,0,1,4,6H21a2.0023,2.0023,0,0,1,2,2v4.0566l5.4189-3.87A.9995.9995,0,0,1,30,9V23a.9995.9995,0,0,1-1.5811.8135L23,19.9434V24A2.0023,2.0023,0,0,1,21,26ZM4,8V24.001L21,24V18a.9995.9995,0,0,1,1.5811-.8135L28,21.0566V10.9434l-5.4189,3.87A.9995.9995,0,0,1,21,14V8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (x9.propTypes = c);
const A9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M8 12H17V14H8zM8 17H13V19H8z"
  })), vr || (vr = /* @__PURE__ */ e.createElement("path", {
    d: "M21,26H4a2.0023,2.0023,0,0,1-2-2V8A2.0023,2.0023,0,0,1,4,6H21a2.0023,2.0023,0,0,1,2,2v4.0566l5.4189-3.87A.9995.9995,0,0,1,30,9V23a.9995.9995,0,0,1-1.5811.8135L23,19.9434V24A2.0023,2.0023,0,0,1,21,26ZM4,8V24.001L21,24V18a.9995.9995,0,0,1,1.5811-.8135L28,21.0566V10.9434l-5.4189,3.87A.9995.9995,0,0,1,21,14V8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (A9.propTypes = c);
const y9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, mr || (mr = /* @__PURE__ */ e.createElement("path", {
    d: "M21,26H4a2,2,0,0,1-2-2V8A2,2,0,0,1,4,6H21a2,2,0,0,1,2,2v4.06l5.42-3.87A1,1,0,0,1,30,9V23a1,1,0,0,1-1.58.81L23,19.94V24A2,2,0,0,1,21,26Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (y9.propTypes = c);
const N9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M29.46 8.11a1 1 0 00-1 .08L23 12.06V10.44l7-7L28.56 2 2 28.56 3.44 30l4-4H21a2 2 0 002-2V19.94l5.42 3.87A1 1 0 0030 23V9A1 1 0 0029.46 8.11zM28 21.06l-5.42-3.87A1 1 0 0021 18v6H9.44L21 12.44V14a1 1 0 001.58.81L28 10.94zM4 24V8H20V6H4A2 2 0 002 8V24z"
  })), r);
});
process.env.NODE_ENV !== "production" && (N9.propTypes = c);
const L9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Vr || (Vr = /* @__PURE__ */ e.createElement("path", {
    d: "M20.31 6H4A2 2 0 002 8V24a2.85 2.85 0 000 .29zM29.46 8.11a1 1 0 00-1 .08L23 12.06V10.44l7-7L28.56 2 2 28.56 3.44 30l4-4H21a2 2 0 002-2V19.94l5.42 3.87A1 1 0 0030 23V9A1 1 0 0029.46 8.11z"
  })), r);
});
process.env.NODE_ENV !== "production" && (L9.propTypes = c);
const T9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M13 11L13 21 21 16 13 11z"
  })), gr || (gr = /* @__PURE__ */ e.createElement("path", {
    d: "m28,6H4c-1.103,0-2,.8975-2,2v16c0,1.1025.897,2,2,2h24c1.103,0,2-.8975,2-2V8c0-1.1025-.897-2-2-2Zm0,18H4V8h24v16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (T9.propTypes = c);
const O9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Mr || (Mr = /* @__PURE__ */ e.createElement("path", {
    d: "M15.5,7.8C14.3,4.7,11.3,2.6,8,2.5C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3c1.2,3.1,4.1,5.2,7.5,5.3 c3.3-0.1,6.3-2.2,7.5-5.3C15.5,8.1,15.5,7.9,15.5,7.8z M8,12.5c-2.7,0-5.4-2-6.5-4.5c1-2.5,3.8-4.5,6.5-4.5s5.4,2,6.5,4.5 C13.4,10.5,10.6,12.5,8,12.5z"
  })), _r || (_r = /* @__PURE__ */ e.createElement("path", {
    d: "M8,5C6.3,5,5,6.3,5,8s1.3,3,3,3s3-1.3,3-3S9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S9.1,10,8,10z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Cr || (Cr = /* @__PURE__ */ e.createElement("path", {
    d: "M30.94,15.66A16.69,16.69,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16.69,16.69,0,0,0,16,27,16.69,16.69,0,0,0,30.94,16.34,1,1,0,0,0,30.94,15.66ZM16,25c-5.3,0-10.9-3.93-12.93-9C5.1,10.93,10.7,7,16,7s10.9,3.93,12.93,9C26.9,21.07,21.3,25,16,25Z"
  })), xr || (xr = /* @__PURE__ */ e.createElement("path", {
    d: "M16,10a6,6,0,1,0,6,6A6,6,0,0,0,16,10Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (O9.propTypes = c);
const Z9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Ar || (Ar = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "4"
  })), yr || (yr = /* @__PURE__ */ e.createElement("path", {
    d: "M30.94,15.66A16.69,16.69,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16.69,16.69,0,0,0,16,27,16.69,16.69,0,0,0,30.94,16.34,1,1,0,0,0,30.94,15.66ZM16,22.5A6.5,6.5,0,1,1,22.5,16,6.51,6.51,0,0,1,16,22.5Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Z9.propTypes = c);
const R9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M4 26H28V28H4zM4 19H28V21H4zM26 6v6H6V6H26m0-2H6A2 2 0 004 6v6a2 2 0 002 2H26a2 2 0 002-2V6a2 2 0 00-2-2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (R9.propTypes = c);
const b9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M4 26H28V28H4zM4 19H28V21H4zM12 6v6H6V6h6m0-2H6A2 2 0 004 6v6a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2zM26 6v6H20V6h6m0-2H20a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (b9.propTypes = c);
const D9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Tr || (Tr = /* @__PURE__ */ e.createElement("path", {
    d: "M2.6,11.3l0.7-0.7C2.6,9.8,1.9,9,1.5,8c1-2.5,3.8-4.5,6.5-4.5c0.7,0,1.4,0.1,2,0.4l0.8-0.8C9.9,2.7,9,2.5,8,2.5 C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3C1,9.3,1.7,10.4,2.6,11.3z"
  })), Or || (Or = /* @__PURE__ */ e.createElement("path", {
    d: "M6 7.9c.1-1 .9-1.8 1.8-1.8l.9-.9C7.2 4.7 5.5 5.6 5.1 7.2 5 7.7 5 8.3 5.1 8.8L6 7.9zM15.5 7.8c-.6-1.5-1.6-2.8-2.9-3.7L15 1.7 14.3 1 1 14.3 1.7 15l2.6-2.6c1.1.7 2.4 1 3.7 1.1 3.3-.1 6.3-2.2 7.5-5.3C15.5 8.1 15.5 7.9 15.5 7.8zM10 8c0 1.1-.9 2-2 2-.3 0-.7-.1-1-.3L9.7 7C9.9 7.3 10 7.6 10 8zM8 12.5c-1 0-2.1-.3-3-.8l1.3-1.3c1.4.9 3.2.6 4.2-.8.7-1 .7-2.4 0-3.4l1.4-1.4c1.1.8 2 1.9 2.6 3.2C13.4 10.5 10.6 12.5 8 12.5z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Zr || (Zr = /* @__PURE__ */ e.createElement("path", {
    d: "M5.24,22.51l1.43-1.42A14.06,14.06,0,0,1,3.07,16C5.1,10.93,10.7,7,16,7a12.38,12.38,0,0,1,4,.72l1.55-1.56A14.72,14.72,0,0,0,16,5,16.69,16.69,0,0,0,1.06,15.66a1,1,0,0,0,0,.68A16,16,0,0,0,5.24,22.51Z"
  })), Rr || (Rr = /* @__PURE__ */ e.createElement("path", {
    d: "M12 15.73a4 4 0 013.7-3.7l1.81-1.82a6 6 0 00-7.33 7.33zM30.94 15.66A16.4 16.4 0 0025.2 8.22L30 3.41 28.59 2 2 28.59 3.41 30l5.1-5.1A15.29 15.29 0 0016 27 16.69 16.69 0 0030.94 16.34 1 1 0 0030.94 15.66zM20 16a4 4 0 01-6 3.44L19.44 14A4 4 0 0120 16zm-4 9a13.05 13.05 0 01-6-1.58l2.54-2.54a6 6 0 008.35-8.35l2.87-2.87A14.54 14.54 0 0128.93 16C26.9 21.07 21.3 25 16 25z"
  })), r);
});
process.env.NODE_ENV !== "production" && (D9.propTypes = c);
const B9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M30.94 15.66a16.4 16.4 0 00-5.73-7.45L30 3.41 28.59 2 2 28.59 3.41 30l5.1-5.09A15.38 15.38 0 0016 27 16.69 16.69 0 0030.94 16.34 1 1 0 0030.94 15.66zM16 22.5a6.46 6.46 0 01-3.83-1.26L14 19.43A4 4 0 0019.43 14l1.81-1.81A6.49 6.49 0 0116 22.5zM4.53 21.81l5-5A6.84 6.84 0 019.5 16 6.51 6.51 0 0116 9.5a6.84 6.84 0 01.79.05l3.78-3.77A14.39 14.39 0 0016 5 16.69 16.69 0 001.06 15.66a1 1 0 000 .68A15.86 15.86 0 004.53 21.81z"
  })), r);
});
process.env.NODE_ENV !== "production" && (B9.propTypes = c);
const S9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M20.587 22L15 16.41 15 7 16.998 7 16.998 15.582 22 20.587 20.587 22z"
  })), Br || (Br = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2A13.9158,13.9158,0,0,1,26,6.2343V2h2v8H20V8h4.9217A11.9818,11.9818,0,1,0,28,16h2A14,14,0,1,1,16,2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (S9.propTypes = c);
const $9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M25 11L26.414 12.414 23.828 15 30 15 30 17 23.828 17 26.414 19.586 25 21 20 16 25 11z"
  })), $r || ($r = /* @__PURE__ */ e.createElement("path", {
    d: "M30 28H20a2.0023 2.0023 0 01-2-2V6a2.0023 2.0023 0 012-2H30V6H20V26H30zM12 28H2V26H12V6H2V4H12a2.0023 2.0023 0 012 2V26A2.0023 2.0023 0 0112 28z"
  })), zr || (zr = /* @__PURE__ */ e.createElement("path", {
    d: "M7 11L5.586 12.414 8.172 15 2 15 2 17 8.172 17 5.586 19.586 7 21 12 16 7 11z"
  })), r);
});
process.env.NODE_ENV !== "production" && ($9.propTypes = c);
const z9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Wr || (Wr = /* @__PURE__ */ e.createElement("circle", {
    cx: "24.5",
    cy: "9.5",
    r: "1.5"
  })), Pr || (Pr = /* @__PURE__ */ e.createElement("path", {
    d: "M17.4143,22H12V16.5857l6.03-6.03A5.3518,5.3518,0,0,1,18,10a6,6,0,1,1,6,6,5.3583,5.3583,0,0,1-.5559-.03ZM14,20h2.5857l6.1706-6.1709.5174.0957A3.935,3.935,0,0,0,24,14a4.0507,4.0507,0,1,0-3.925-3.2729l.0952.5166L14,17.4143Z"
  })), Ir || (Ir = /* @__PURE__ */ e.createElement("path", {
    d: "M28,18v8H10V6h4V4H4A2.0025,2.0025,0,0,0,2,6V26a2.0025,2.0025,0,0,0,2,2H28a2.0025,2.0025,0,0,0,2-2V18ZM4,6H8V26H4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (z9.propTypes = c);
const W9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, kr || (kr = /* @__PURE__ */ e.createElement("path", {
    d: "M21,16H11a2.0023,2.0023,0,0,0-2,2v6a2.0023,2.0023,0,0,0,2,2h4v2H12v2h8V28H17V26h4a2.0023,2.0023,0,0,0,2-2V18A2.0023,2.0023,0,0,0,21,16ZM11,24V18H21l.0015,6Z"
  })), Fr || (Fr = /* @__PURE__ */ e.createElement("path", {
    d: "M25.8218,10.124a9.9992,9.9992,0,0,0-19.6436,0A7.4914,7.4914,0,0,0,7,24.9746v-2a5.4945,5.4945,0,0,1,.123-10.9541l.8365-.0566.09-.834a7.9979,7.9979,0,0,1,15.9014,0l.09.834.8365.0566A5.4945,5.4945,0,0,1,25,22.9746v2a7.4914,7.4914,0,0,0,.8218-14.8506Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (W9.propTypes = c);
const P9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M20,13H12a2.0025,2.0025,0,0,0-2,2V28a2.0025,2.0025,0,0,0,2,2h8a2.0025,2.0025,0,0,0,2-2V15A2.0025,2.0025,0,0,0,20,13Zm0,2,0,3H12V15Zm0,5,0,3H12V20Zm-8,8V25h8v3Z"
  })), Ur || (Ur = /* @__PURE__ */ e.createElement("path", {
    d: "M25.91,10.13a.121.121,0,0,1-.0967-.0952A10.0061,10.0061,0,0,0,17.89,2.1816,10.0025,10.0025,0,0,0,6.1858,10.0347a.1212.1212,0,0,1-.0964.0957A7.5019,7.5019,0,0,0,7.4912,25H8V23H7.4954a5.5108,5.5108,0,0,1-5.4387-6.3,5.6992,5.6992,0,0,1,4.7138-4.6606l1.0166-.1836a.1306.1306,0,0,0,.1045-.1035l.18-.9351a8.28,8.28,0,0,1,6.8469-6.7427,7.957,7.957,0,0,1,2.8471.1245,8.22,8.22,0,0,1,6.1475,6.545l.1941,1.0083a.13.13,0,0,0,.1045.1035l1.0576.1914a5.7819,5.7819,0,0,1,3.1011,1.539A5.5052,5.5052,0,0,1,24.5076,23H24v2h.5076A7.5019,7.5019,0,0,0,25.91,10.13Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (P9.propTypes = c);
const I9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, qr || (qr = /* @__PURE__ */ e.createElement("path", {
    d: "M20,20V17a4,4,0,0,0-8,0v3a2.0025,2.0025,0,0,0-2,2v6a2.0025,2.0025,0,0,0,2,2h8a2.0025,2.0025,0,0,0,2-2V22A2.0025,2.0025,0,0,0,20,20Zm-6-3a2,2,0,0,1,4,0v3H14ZM12,28V22h8l.0012,6Z"
  })), Yr || (Yr = /* @__PURE__ */ e.createElement("path", {
    d: "M25.8288,10.1152A10.0067,10.0067,0,0,0,17.89,2.1816,10.0025,10.0025,0,0,0,6.17,10.1152,7.502,7.502,0,0,0,7.4912,25H8V23H7.4953a5.5019,5.5019,0,0,1-.9694-10.9165l1.3488-.2441.2591-1.3457a8.0109,8.0109,0,0,1,15.7312,0l.259,1.3457,1.3489.2441A5.5019,5.5019,0,0,1,24.5076,23H24v2h.5076a7.502,7.502,0,0,0,1.3212-14.8848Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (I9.propTypes = c);
const k9 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (U.VirtualPrivateCloudAlt || (U.VirtualPrivateCloudAlt = !0, console.warn("Icon name was requested by the product team to be renamed to and replaced by ibm-cloud--vpc. As a result, the VirtualPrivateCloudAlt component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, Gr || (Gr = /* @__PURE__ */ e.createElement("path", {
    d: "M23.4141,22,10,8.5859V2H2v8H8.5859L22,23.4141V30h8V22ZM8,8H4V4H8ZM28,28H24V24h4Z"
  })), Xr || (Xr = /* @__PURE__ */ e.createElement("path", {
    d: "M30 6a3.9915 3.9915 0 00-7.8579-1H13V7h9.1421A3.9945 3.9945 0 0025 9.8579V19h2V9.8579A3.9962 3.9962 0 0030 6zM26 8a2 2 0 112-2A2.0023 2.0023 0 0126 8zM19 25H9.8579A3.9945 3.9945 0 007 22.1421V13H5v9.1421A3.9915 3.9915 0 109.8579 27H19zM6 28a2 2 0 112-2A2.0023 2.0023 0 016 28z"
  })), r);
});
process.env.NODE_ENV !== "production" && (k9.propTypes = c);
const F9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Qr || (Qr = /* @__PURE__ */ e.createElement("circle", {
    cx: "23",
    cy: "12",
    r: "2"
  })), Kr || (Kr = /* @__PURE__ */ e.createElement("path", {
    d: "M28,5H16.24A8,8,0,1,0,6,16.92V27a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V7A2,2,0,0,0,28,5ZM4,10A6,6,0,0,1,15.19,7H8V9h7.91A6.64,6.64,0,0,1,16,10a6.64,6.64,0,0,1-.09,1H10v2h5.19A6,6,0,0,1,4,10ZM28,27H8l5-5,1.59,1.59a2,2,0,0,0,2.82,0L23,18l5,5Zm0-6.83-3.59-3.59a2,2,0,0,0-2.82,0L16,22.17l-1.59-1.59a2,2,0,0,0-2.82,0L8,24.17V17.74A8.24,8.24,0,0,0,10,18a8,8,0,0,0,8-8,7.9,7.9,0,0,0-.59-3H28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (F9.propTypes = c);
const j9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M30,17V15H17V11h2a2.0023,2.0023,0,0,0,2-2V4a2.0023,2.0023,0,0,0-2-2H13a2.0023,2.0023,0,0,0-2,2V9a2.0023,2.0023,0,0,0,2,2h2v4H2v2H8v4H6a2.0023,2.0023,0,0,0-2,2v5a2.0023,2.0023,0,0,0,2,2h6a2.0023,2.0023,0,0,0,2-2V23a2.0023,2.0023,0,0,0-2-2H10V17H22v4H20a2.0023,2.0023,0,0,0-2,2v5a2.0023,2.0023,0,0,0,2,2h6a2.0023,2.0023,0,0,0,2-2V23a2.0023,2.0023,0,0,0-2-2H24V17ZM13,4h6V9H13ZM12,28H6V23h6Zm14,0H20V23h6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (j9.propTypes = c);
const U9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M16 22a4 4 0 104 4A4.0045 4.0045 0 0016 22zm0 6a2 2 0 112-2A2.002 2.002 0 0116 28zM30 5a3 3 0 10-4 2.8154V15H17V9H15v6H6V7.8159a3.0007 3.0007 0 10-2 0V15a2.002 2.002 0 002 2h9v3h2V17h9a2.002 2.002 0 002-2V7.8159A2.9958 2.9958 0 0030 5zM5 4A1 1 0 114 5 1.0013 1.0013 0 015 4zM27 6a1 1 0 111-1A1.0013 1.0013 0 0127 6z"
  })), tn || (tn = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "5",
    r: "2"
  })), r);
});
process.env.NODE_ENV !== "production" && (U9.propTypes = c);
const q9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, rn || (rn = /* @__PURE__ */ e.createElement("circle", {
    cx: "10.5",
    cy: "24.5",
    r: "1.5"
  })), nn || (nn = /* @__PURE__ */ e.createElement("path", {
    d: "M19.5 14.964H21.5V20.035H19.5z",
    transform: "rotate(-45 20.5 17.5)"
  })), on || (on = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "13",
    r: "2"
  })), an || (an = /* @__PURE__ */ e.createElement("path", {
    d: "M16,6a7,7,0,0,0,0,14V18a5,5,0,1,1,5-5h2A7,7,0,0,0,16,6Z"
  })), ln || (ln = /* @__PURE__ */ e.createElement("path", {
    d: "M26,2H6A2,2,0,0,0,4,4V28a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V4A2,2,0,0,0,26,2Zm0,26H6V4H26Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (q9.propTypes = c);
const Y9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, cn || (cn = /* @__PURE__ */ e.createElement("path", {
    d: "M26,30H24V27H20a5.0055,5.0055,0,0,1-5-5V20.7207l-2.3162-.772a1,1,0,0,1-.5412-1.4631L15,13.7229V11a9.01,9.01,0,0,1,9-9h5V4H24a7.0078,7.0078,0,0,0-7,7v3a.9991.9991,0,0,1-.1426.5144l-2.3586,3.9312,1.8174.6057A1,1,0,0,1,17,20v2a3.0033,3.0033,0,0,0,3,3h5a1,1,0,0,1,1,1Z"
  })), pn || (pn = /* @__PURE__ */ e.createElement("path", {
    d: "M19 12H23V14H19zM9.3325 25.2168a7.0007 7.0007 0 010-10.4341l1.334 1.49a5 5 0 000 7.4537z"
  })), hn || (hn = /* @__PURE__ */ e.createElement("path", {
    d: "M6.3994,28.8008a11.0019,11.0019,0,0,1,0-17.6006L7.6,12.8a9.0009,9.0009,0,0,0,0,14.4014Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Y9.propTypes = c);
const G9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M24,10a6,6,0,0,0-4.46,10H12.46A6,6,0,1,0,8,22H24a6,6,0,0,0,0-12ZM4,16a4,4,0,1,1,4,4A4,4,0,0,1,4,16Zm20,4a4,4,0,1,1,4-4A4,4,0,0,1,24,20Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (G9.propTypes = c);
const X9 = /* @__PURE__ */ e.forwardRef(function({
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
  }, fn || (fn = /* @__PURE__ */ e.createElement("path", {
    d: "M17 21H10V14h7zm-5-2h3V16H12zM17 30H10V23h7zm-5-2h3V25H12zM26 21H19V14h7zm-5-2h3V16H21zM26 30H19V23h7zm-5-2h3V25H21z"
  })), wn || (wn = /* @__PURE__ */ e.createElement("path", {
    d: "M8,28H4a2.0023,2.0023,0,0,1-2-2V6A2.0023,2.0023,0,0,1,4,4h7.5857A1.9865,1.9865,0,0,1,13,4.5859L16.4143,8H28a2.0023,2.0023,0,0,1,2,2v8H28V10H15.5857l-4-4H4V26H8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (X9.propTypes = c);
const Q9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M25.1 10.66L23.58 12a6 6 0 01-.18 7.94l1.47 1.36a8 8 0 00.23-10.59zM20 30a1 1 0 01-.71-.3L11.67 22H5a1 1 0 01-1-1H4V11a1 1 0 011-1h6.67l7.62-7.7a1 1 0 011.41 0A1 1 0 0121 3V29A1 1 0 0120 30zM6 20h6a1.17 1.17 0 01.79.3L19 26.57V5.43L12.79 11.7A1.17 1.17 0 0112 12H6z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Q9.propTypes = c);
const K9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M22 15H32V17H22zM18 30a.997.997 0 01-.7109-.2969L9.666 22H3a.9993.9993 0 01-1-.9988V11a.9993.9993 0 01.9988-1H9.666l7.623-7.7031A1 1 0 0119 3V29A1.0007 1.0007 0 0118 30zM4 20h6a1.2008 1.2008 0 01.7939.2969L17 26.5684V5.4316l-6.2061 6.2715A1.2013 1.2013 0 0110 12H4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (K9.propTypes = c);
const J9 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M25.1 10.66L23.58 12a6 6 0 01-.18 7.94l1.47 1.36a8 8 0 00.23-10.59zM20 30a1 1 0 01-.71-.3L11.67 22H5a1 1 0 01-1-1H4V11a1 1 0 011-1h6.67l7.62-7.7a1 1 0 011.41 0A1 1 0 0121 3V29A1 1 0 0120 30z"
  })), r);
});
process.env.NODE_ENV !== "production" && (J9.propTypes = c);
const e8 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M22 15H32V17H22zM18 30a.997.997 0 01-.7109-.2969L9.666 22H3a.9993.9993 0 01-1-.9988V11a.9993.9993 0 01.9988-1H9.666l7.623-7.7031A1 1 0 0119 3V29A1.0007 1.0007 0 0118 30z"
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
  }, En || (En = /* @__PURE__ */ e.createElement("path", {
    d: "M25.707,17.293l-5-5A1,1,0,0,0,20,12H14a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V18A1,1,0,0,0,25.707,17.293ZM23.5857,18H20V14.4141ZM14,28V14h4v4a2,2,0,0,0,2,2h4v8Z"
  })), Vn || (Vn = /* @__PURE__ */ e.createElement("path", {
    d: "M8,27H4a2.0023,2.0023,0,0,1-2-2V5A2.0023,2.0023,0,0,1,4,3h7.5857A1.9865,1.9865,0,0,1,13,3.5859L16.4143,7H28a2.0023,2.0023,0,0,1,2,2v8H28V9H15.5857l-4-4H4V25H8Z"
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
  }, Hn || (Hn = /* @__PURE__ */ e.createElement("path", {
    d: "M31 12.41L29.59 11 26 14.59 22.41 11 21 12.41 24.59 16 21 19.59 22.41 21 26 17.41 29.59 21 31 19.59 27.41 16 31 12.41zM18 30a1 1 0 01-.71-.3L9.67 22H3a1 1 0 01-1-1H2V11a1 1 0 011-1H9.67l7.62-7.7a1 1 0 011.41 0A1 1 0 0119 3V29A1 1 0 0118 30zM4 20h6a1.17 1.17 0 01.79.3L17 26.57V5.43L10.79 11.7A1.17 1.17 0 0110 12H4z"
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
  }, gn || (gn = /* @__PURE__ */ e.createElement("path", {
    d: "M31 12.41L29.59 11 26 14.59 22.41 11 21 12.41 24.59 16 21 19.59 22.41 21 26 17.41 29.59 21 31 19.59 27.41 16 31 12.41zM18 30a1 1 0 01-.71-.3L9.67 22H3a1 1 0 01-1-1H2V11a1 1 0 011-1H9.67l7.62-7.7a1 1 0 011.41 0A1 1 0 0119 3V29A1 1 0 0118 30z"
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
  }, Mn || (Mn = /* @__PURE__ */ e.createElement("path", {
    d: "M23,24a2.98,2.98,0,0,0-2.0376.8115l-4.0037-2.4023a2.0478,2.0478,0,0,0,0-.8184l4.0037-2.4023a3.2463,3.2463,0,1,0-.9211-1.7793l-4.0037,2.4023a3,3,0,1,0,0,4.377l4.0037,2.4023A2.9729,2.9729,0,0,0,20,27a3,3,0,1,0,3-3Zm0-8a1,1,0,1,1-1,1A1.0008,1.0008,0,0,1,23,16Zm-9,7a1,1,0,1,1,1-1A1.0008,1.0008,0,0,1,14,23Zm9,5a1,1,0,1,1,1-1A1.0008,1.0008,0,0,1,23,28Z"
  })), _n || (_n = /* @__PURE__ */ e.createElement("path", {
    d: "M8,28H4a2.0023,2.0023,0,0,1-2-2V6A2.0023,2.0023,0,0,1,4,4h7.5857A1.9865,1.9865,0,0,1,13,4.5859L16.4143,8H28a2.0023,2.0023,0,0,1,2,2v8H28V10H15.5857l-4-4H4V26H8Z"
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
  }, Cn || (Cn = /* @__PURE__ */ e.createElement("path", {
    d: "M27.16,8.08,25.63,9.37a10,10,0,0,1-.29,13.23L26.81,24a12,12,0,0,0,.35-15.88Z"
  })), xn || (xn = /* @__PURE__ */ e.createElement("path", {
    d: "M21.58 12a6 6 0 01-.18 7.94l1.47 1.36a8 8 0 00.23-10.59zM18 30a1 1 0 01-.71-.3L9.67 22H3a1 1 0 01-1-1H2V11a1 1 0 011-1H9.67l7.62-7.7a1 1 0 011.41 0A1 1 0 0119 3V29A1 1 0 0118 30zM4 20h6.08a1 1 0 01.71.3L17 26.57V5.43L10.79 11.7a1 1 0 01-.71.3H4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (a8.propTypes = c);
const l8 = /* @__PURE__ */ e.forwardRef(function({
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
  }, An || (An = /* @__PURE__ */ e.createElement("path", {
    d: "M32 15L28 15 28 11 26 11 26 15 22 15 22 17 26 17 26 21 28 21 28 17 32 17 32 15zM18 30a.997.997 0 01-.7109-.2969L9.666 22H3a.9993.9993 0 01-1-.9988V11a.9993.9993 0 01.9988-1H9.666l7.623-7.7031A1 1 0 0119 3V29A1.0007 1.0007 0 0118 30zM4 20h6a1.2008 1.2008 0 01.7939.2969L17 26.5684V5.4316l-6.2061 6.2715A1.2013 1.2013 0 0110 12H4z"
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
  }, yn || (yn = /* @__PURE__ */ e.createElement("path", {
    d: "M27.16,8.08,25.63,9.37a10,10,0,0,1-.29,13.23L26.81,24a12,12,0,0,0,.35-15.88Z"
  })), Nn || (Nn = /* @__PURE__ */ e.createElement("path", {
    d: "M21.58 12a6 6 0 01-.18 7.94l1.47 1.36a8 8 0 00.23-10.59zM18 30a1 1 0 01-.71-.3L9.67 22H3a1 1 0 01-1-1H2V11a1 1 0 011-1H9.67l7.62-7.7a1 1 0 011.41 0A1 1 0 0119 3V29A1 1 0 0118 30z"
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
  }, Ln || (Ln = /* @__PURE__ */ e.createElement("path", {
    d: "M32 15L28 15 28 11 26 11 26 15 22 15 22 17 26 17 26 21 28 21 28 17 32 17 32 15zM18 30a.997.997 0 01-.7109-.2969L9.666 22H3a.9993.9993 0 01-1-.9988V11a.9993.9993 0 01.9988-1H9.666l7.623-7.7031A1 1 0 0119 3V29A1.0007 1.0007 0 0118 30z"
  })), r);
});
process.env.NODE_ENV !== "production" && (i8.propTypes = c);
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
  }, Tn || (Tn = /* @__PURE__ */ e.createElement("path", {
    d: "M14 23H12V9h6a2 2 0 012 2v5a2 2 0 01-2 2H14zm0-7h4V11H14zM28 19L24.32 9 22 9 22 23 24 23 24 13 27.68 23 30 23 30 9 28 9 28 19zM8 9L6 22 4 9 2 9 4.52 23 7.48 23 10 9 8 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (p8.propTypes = c);
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
  }, On || (On = /* @__PURE__ */ e.createElement("path", {
    d: "M28,7a1.9919,1.9919,0,0,0-1.7227,1H22A6,6,0,0,0,10,8H5.7227a2,2,0,1,0,0,2H10v4H8a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V16a2,2,0,0,0-2-2H22V10h4.2773A1.9966,1.9966,0,1,0,28,7ZM12,8a4,4,0,0,1,8,0v6H12V10h5V8Zm12,8V28H8V16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (h8.propTypes = c);
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
  }, Zn || (Zn = /* @__PURE__ */ e.createElement("path", {
    d: "M30,15A6,6,0,1,0,20,19.46V29l4-1.8838L28,29V19.46A5.98,5.98,0,0,0,30,15ZM26,25.8477l-2-.9415-2,.9415V20.65a5.8877,5.8877,0,0,0,4,0ZM24,19a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,24,19Z"
  })), Rn || (Rn = /* @__PURE__ */ e.createElement("path", {
    d: "M14,2A6.0066,6.0066,0,0,0,8,8v6H6a2.0023,2.0023,0,0,0-2,2V28a2.0023,2.0023,0,0,0,2,2H17V28H6V16h9V14H10V8a4,4,0,0,1,7.92-.8008l1.96-.3984A6.0167,6.0167,0,0,0,14,2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (s8.propTypes = c);
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
  }, bn || (bn = /* @__PURE__ */ e.createElement("path", {
    d: "M22 17H24V19H22z"
  })), Dn || (Dn = /* @__PURE__ */ e.createElement("path", {
    d: "M28,8H4V5H26V3H4A2,2,0,0,0,2,5V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10A2,2,0,0,0,28,8ZM4,26V10H28v3H20a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h8v3ZM28,15v6H20V15Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (f8.propTypes = c);
const w8 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Bn || (Bn = /* @__PURE__ */ e.createElement("path", {
    d: "M8,1C4.1,1,1,4.1,1,8s3.1,7,7,7s7-3.1,7-7S11.9,1,8,1z M8,14c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S11.3,14,8,14z"
  })), Sn || (Sn = /* @__PURE__ */ e.createElement("path", {
    d: "M7.5 4H8.5V9H7.5zM8 10.2c-.4 0-.8.3-.8.8s.3.8.8.8c.4 0 .8-.3.8-.8S8.4 10.2 8 10.2z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, $n || ($n = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"
  })), zn || (zn = /* @__PURE__ */ e.createElement("path", {
    d: "M15 8H17V19H15zM16 22a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 22z"
  })), r);
});
process.env.NODE_ENV !== "production" && (w8.propTypes = c);
const u8 = /* @__PURE__ */ e.forwardRef(function({
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
  }, Wn || (Wn = /* @__PURE__ */ e.createElement("path", {
    d: "M14.5,14h-13c-0.2,0-0.3-0.1-0.4-0.2c-0.1-0.2-0.1-0.3,0-0.5l6.5-12C7.7,1,8,0.9,8.2,1.1c0.1,0,0.2,0.1,0.2,0.2l6.5,12 c0.1,0.2,0.1,0.3,0,0.5C14.9,13.9,14.7,14,14.5,14z M2.3,13h11.3L8,2.5L2.3,13z"
  })), Pn || (Pn = /* @__PURE__ */ e.createElement("path", {
    d: "M7.5 6H8.5V9.5H7.5zM8 10.8c-.4 0-.8.3-.8.8s.3.8.8.8c.4 0 .8-.3.8-.8S8.4 10.8 8 10.8z"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, In || (In = /* @__PURE__ */ e.createElement("path", {
    d: "M16 23a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 23zM15 12H17V21H15z"
  })), kn || (kn = /* @__PURE__ */ e.createElement("path", {
    d: "M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (u8.propTypes = c);
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
  }, Fn || (Fn = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z",
    "data-icon-path": "inner-path"
  })), jn || (jn = /* @__PURE__ */ e.createElement("path", {
    d: "M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z"
  })), Un || (Un = /* @__PURE__ */ e.createElement("path", {
    d: "M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (d8.propTypes = c);
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
  }, qn || (qn = /* @__PURE__ */ e.createElement("path", {
    d: "M16 17a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 17zM15 6H17V15H15z"
  })), Yn || (Yn = /* @__PURE__ */ e.createElement("path", {
    d: "M29.855,2.481a1.001,1.001,0,0,1,.0322.98l-13,25a1,1,0,0,1-1.7744,0l-13-25A1,1,0,0,1,3,2H29A1.0007,1.0007,0,0,1,29.855,2.481ZM4.6487,4.0033,15.998,25.8286h.004L27.3513,4.0033,27.3493,4H4.6507Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (v8.propTypes = c);
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
  }, Gn || (Gn = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M16,20a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,20Zm-1.125-5h2.25V6h-2.25Z",
    "data-icon-path": "inner-path"
  })), Xn || (Xn = /* @__PURE__ */ e.createElement("path", {
    d: "M27.3494,4H4.6506l-.0019.0034L15.998,25.8286h.004L27.3513,4.0034ZM14.875,6h2.25v9h-2.25ZM16,20a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,20Z"
  })), Qn || (Qn = /* @__PURE__ */ e.createElement("path", {
    d: "M29.855,2.481a1.001,1.001,0,0,1,.0322.98l-13,25a1,1,0,0,1-1.7744,0l-13-25A1,1,0,0,1,3,2H29A1.0007,1.0007,0,0,1,29.855,2.481ZM4.6487,4.0033,15.998,25.8286h.004L27.3513,4.0033,27.3493,4H4.6507Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (m8.propTypes = c);
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
  }, Kn || (Kn = /* @__PURE__ */ e.createElement("path", {
    d: "M16 20c-.8284 0-1.5.6716-1.5 1.5s.6716 1.5 1.5 1.5 1.5-.6716 1.5-1.5-.6716-1.5-1.5-1.5h0zM15 9H17V18H15z"
  })), Jn || (Jn = /* @__PURE__ */ e.createElement("path", {
    d: "m16,30c-.5335,0-1.0672-.2031-1.4732-.6094L2.6094,17.4732c-.8126-.8123-.8126-2.1342,0-2.9465L14.5268,2.6094c.8121-.8126,2.1344-.8126,2.9465,0l11.9173,11.9173c.8126.8123.8126,2.1342,0,2.9465l-11.9173,11.9173c-.406.4063-.9398.6094-1.4732.6094Zm0-26.0008c-.0215,0-.0427.0083-.0591.0244L4.0236,15.9409c-.0325.0327-.0325.0855,0,.1182l11.9173,11.9173c.0327.0322.0855.0322.1182,0l11.9173-11.9173c.0325-.0327.0325-.0855,0-.1182l-11.9173-11.9173c-.0164-.0161-.0376-.0244-.0591-.0244Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (E8.propTypes = c);
const V8 = /* @__PURE__ */ e.forwardRef(function({
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
  }, e4 || (e4 = /* @__PURE__ */ e.createElement("path", {
    d: "M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2 c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"
  })), t4 || (t4 = /* @__PURE__ */ e.createElement("path", {
    d: "M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8 c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z",
    "data-icon-path": "inner-path",
    opacity: "0"
  })), r) : t === 20 || t === "20" || t === "20px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    ...n
  }, r4 || (r4 = /* @__PURE__ */ e.createElement("path", {
    d: "M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1 s1,0.4,1,1S10.6,16,10,16z"
  })), n4 || (n4 = /* @__PURE__ */ e.createElement("path", {
    d: "M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z",
    "data-icon-path": "inner-path",
    opacity: "0"
  })), r) : t === 24 || t === "24" || t === "24px" ? /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    ...n
  }, o4 || (o4 = /* @__PURE__ */ e.createElement("path", {
    d: "M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-4.9,11-11C23,5.9,18.1,1,12,1z M11.1,6h1.8v8h-1.8V6z M12,19.2 c-0.7,0-1.2-0.6-1.2-1.2s0.6-1.2,1.2-1.2s1.2,0.6,1.2,1.2S12.7,19.2,12,19.2z"
  })), a4 || (a4 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M13.2,18c0,0.7-0.6,1.2-1.2,1.2s-1.2-0.6-1.2-1.2s0.6-1.2,1.2-1.2S13.2,17.3,13.2,18z M12.9,6 h-1.8v8h1.8V6z",
    "data-icon-path": "inner-path",
    opacity: "0"
  })), r) : /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, l4 || (l4 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14C30,8.3,23.7,2,16,2z M14.9,8h2.2v11h-2.2V8z M16,25 c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22c0.8,0,1.5,0.7,1.5,1.5S16.8,25,16,25z"
  })), c4 || (c4 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M17.5,23.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22 C16.8,22,17.5,22.7,17.5,23.5z M17.1,8h-2.2v11h2.2V8z",
    "data-icon-path": "inner-path",
    opacity: "0"
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
  }, i4 || (i4 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 21a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 21zM15 8H17V18H15z"
  })), p4 || (p4 = /* @__PURE__ */ e.createElement("path", {
    d: "M23,29H9a1,1,0,0,1-.8638-.4961l-7-12a1,1,0,0,1,0-1.0078l7-12A1,1,0,0,1,9,3H23a1,1,0,0,1,.8638.4961l7,12a1,1,0,0,1,0,1.0078l-7,12A1,1,0,0,1,23,29ZM9.5742,27H22.4258l6.4165-11L22.4258,5H9.5742L3.1577,16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (H8.propTypes = c);
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
  }, h4 || (h4 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M14.875,8h2.25V19h-2.25ZM16,25a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,25Z",
    "data-icon-path": "inner-path"
  })), s4 || (s4 = /* @__PURE__ */ e.createElement("path", {
    d: "M30.8508,15.4487,23.8867,3.5322A1.0687,1.0687,0,0,0,22.9643,3H9.0357a1.0687,1.0687,0,0,0-.9224.5322L1.1492,15.4487a1.0933,1.0933,0,0,0,0,1.1026L8.1133,28.4678A1.0687,1.0687,0,0,0,9.0357,29H22.9643a1.0687,1.0687,0,0,0,.9224-.5322l6.9641-11.9165A1.0933,1.0933,0,0,0,30.8508,15.4487ZM14.875,8h2.25V19h-2.25ZM16,25a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,25Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (g8.propTypes = c);
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
  }, f4 || (f4 = /* @__PURE__ */ e.createElement("path", {
    d: "m29,23h-4v-2h2.3821l-7.8821-15.7639-1.1055,2.2112-1.7891-.8945,2-4c.1694-.3387.532-.5527.8945-.5527s.7251.214.8945.5527l9.5,19c.1548.3101.1384.6782-.0439.973-.1821.2948-.5039.4742-.8506.4742Z"
  })), w4 || (w4 = /* @__PURE__ */ e.createElement("circle", {
    cx: "14",
    cy: "25",
    r: "1.25"
  })), u4 || (u4 = /* @__PURE__ */ e.createElement("path", {
    d: "M13 15H15V22H13z"
  })), d4 || (d4 = /* @__PURE__ */ e.createElement("path", {
    d: "m25,30H3c-.3499,0-.6743-.1829-.8555-.4823s-.1926-.6718-.0303-.9817L13.1143,7.536c.1726-.3296.5292-.536.8857-.536s.7131.2064.8857.536l11,21c.1624.3099.1509.6823-.0303.9817s-.5056.4823-.8555.4823Zm-20.3474-2h18.6948L14,10.1552,4.6526,28Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (M8.propTypes = c);
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
  }, v4 || (v4 = /* @__PURE__ */ e.createElement("path", {
    d: "M18 20H30V22H18zM18 24H30V26H18zM18 28H30V30H18zM14 18a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0014 18zM13 7H15V16H13z"
  })), m4 || (m4 = /* @__PURE__ */ e.createElement("path", {
    d: "M14,4A10.0111,10.0111,0,0,1,24,14h2A12,12,0,1,0,14,26V24A10,10,0,0,1,14,4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (_8.propTypes = c);
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
  }, E4 || (E4 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 20a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 20zM15 9H17V18H15z"
  })), V4 || (V4 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,28H6a2.0023,2.0023,0,0,1-2-2V6A2.0023,2.0023,0,0,1,6,4H26a2.0023,2.0023,0,0,1,2,2V26A2.0023,2.0023,0,0,1,26,28ZM6,6V26H26.0012L26,6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (C8.propTypes = c);
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
  }, H4 || (H4 = /* @__PURE__ */ e.createElement("path", {
    d: "M26.0022,4H5.998A1.998,1.998,0,0,0,4,5.998V26.002A1.998,1.998,0,0,0,5.998,28H26.0022A1.9979,1.9979,0,0,0,28,26.002V5.998A1.9979,1.9979,0,0,0,26.0022,4ZM14.8752,8h2.25V18h-2.25ZM16,24a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,24Z"
  })), g4 || (g4 = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M14.8751,8h2.25V18h-2.25ZM16,24a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,24Z",
    "data-icon-path": "inner-path"
  })), r);
});
process.env.NODE_ENV !== "production" && (x8.propTypes = c);
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
  }, M4 || (M4 = /* @__PURE__ */ e.createElement("path", {
    d: "M22 8H21V2H19V8H13V2H11V8H10a2 2 0 00-2 2V22a2 2 0 002 2h1v6h2V24h6v6h2V24h1a2 2 0 002-2V10A2 2 0 0022 8zM10 22V10H22V22zM25 14H27V18H25z"
  })), r);
});
process.env.NODE_ENV !== "production" && (A8.propTypes = c);
const y8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (U.Watson || (U.Watson = !0, console.warn("Icon represents the old avatar for the Watson brand, which is retired since the watsonx brand launch. Replaced by the icon watsonx. As a result, the Watson component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, _4 || (_4 = /* @__PURE__ */ e.createElement("path", {
    d: "M21.74 9.49h0A11.41 11.41 0 0016 8h0a.76.76 0 100 1.51 10.15 10.15 0 011.91.21c-2.26 1.08-4.76 3.58-6.73 7a22.48 22.48 0 00-2 4.44A9.58 9.58 0 017 17.22a3.43 3.43 0 01.28-2.66v0h0c.79-1.37 2.44-2.15 4.63-2.2a.76.76 0 00.74-.78.75.75 0 00-.78-.74C9.19 10.88 7.1 11.92 6 13.74H6v0s0 0 0 0a4.84 4.84 0 00-.44 3.79 12 12 0 003.2 5.22A11.36 11.36 0 008.52 26a10 10 0 01-2-3.48A.75.75 0 005.57 22a.76.76 0 00-.49 1 11.45 11.45 0 005.18 6.38h0A11.42 11.42 0 0016 30.92a11.74 11.74 0 003-.39 11.48 11.48 0 002.77-21zM18.58 29.06a9.9 9.9 0 01-7.56-1h0c-.86-.49-1.21-2-.94-4a18.85 18.85 0 002.48 1.72 13.92 13.92 0 006.93 2 11 11 0 002.42-.28A9.78 9.78 0 0118.58 29.06zm6.06-4.66c-2 2-6.66 2.74-11.32.05a17.36 17.36 0 01-2.89-2.12 21.08 21.08 0 012.08-4.91c2.94-5.08 6.83-7.57 8.47-6.62h0A10 10 0 0124.64 24.4zM4.16 11.72L1.14 10a.76.76 0 10-.76 1.31L3.4 13a.86.86 0 00.38.1.77.77 0 00.66-.38A.76.76 0 004.16 11.72zM8.29 7.59A.74.74 0 008.94 8a.75.75 0 00.38-.1.76.76 0 00.28-1l-1.74-3a.76.76 0 00-1-.27.75.75 0 00-.28 1zM16 6.08a.76.76 0 00.76-.76V1.83a.76.76 0 00-1.52 0V5.32A.76.76 0 0016 6.08zM22.68 7.87a.75.75 0 001-.28l1.75-3a.75.75 0 00-.28-1 .76.76 0 00-1 .27l-1.74 3A.76.76 0 0022.68 7.87zM31.9 10.25a.76.76 0 00-1-.27l-3 1.74a.76.76 0 00-.28 1 .77.77 0 00.66.38.86.86 0 00.38-.1l3-1.75A.76.76 0 0031.9 10.25z"
  })), r);
});
process.env.NODE_ENV !== "production" && (y8.propTypes = c);
const N8 = /* @__PURE__ */ e.forwardRef(function({
  children: r,
  size: t = 16,
  ...n
}, o) {
  return process.env.NODE_ENV !== "production" && (U.WatsonMachineLearning || (U.WatsonMachineLearning = !0, console.warn("Icon design is defunct, replaced with the existing icon ibm-watson--machine-learning. As a result, the WatsonMachineLearning component will be removed in the next major version of @carbon/icons-react."))), /* @__PURE__ */ e.createElement(l, {
    width: t,
    height: t,
    ref: o,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    fill: "currentColor",
    ...n
  }, C4 || (C4 = /* @__PURE__ */ e.createElement("path", {
    d: "M22 26H20V17.76l-3.23 3.88a1 1 0 01-1.54 0L12 17.76V26H10V15a1 1 0 01.66-.94 1 1 0 011.11.3L16 19.44l4.23-5.08a1 1 0 011.11-.3A1 1 0 0122 15zM4.16 14.65l-3-1.75a.76.76 0 10-.76 1.32L3.4 16a.76.76 0 10.76-1.31zM8.29 10.52a.73.73 0 001 .27.75.75 0 00.28-1l-1.74-3a.76.76 0 10-1.32.76zM16 9a.76.76 0 00.76-.76V4.76a.76.76 0 10-1.52 0V8.25A.76.76 0 0016 9zM22.68 10.79a.75.75 0 00.37.11.76.76 0 00.66-.38l1.75-3a.76.76 0 00-1.32-.76l-1.74 3A.75.75 0 0022.68 10.79zM31.9 13.18a.76.76 0 00-1-.28l-3 1.75A.76.76 0 0028.6 16l3-1.74A.77.77 0 0031.9 13.18z"
  })), r);
});
process.env.NODE_ENV !== "production" && (N8.propTypes = c);
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
  }, x4 || (x4 = /* @__PURE__ */ e.createElement("path", {
    strokeWidth: "0",
    d: "m29.312,22.9189c1.1042-2.1201,1.688-4.5127,1.688-6.9189C31,7.729,24.271,1,16,1c-3.3738,0-6.5815,1.1191-9.2046,3.1665-.2441-.106-.5125-.1665-.7954-.1665-1.1045,0-2,.8955-2,2s.8955,2,2,2,2-.8955,2-2c0-.0762-.0142-.1489-.0225-.2227,2.2812-1.7964,5.0793-2.7773,8.0225-2.7773.9727,0,1.9172.1157,2.8293.3193-3.3938.9258-5.8994,4.0273-5.8994,7.7109,0,.7891.1167,1.5503.332,2.27-.6985-.2021-1.4285-.3306-2.1919-.3306-3.7039,0-6.8191,2.5342-7.7256,5.957-.218-.9424-.3445-1.9189-.3445-2.9268,0-2.1162.4919-4.1328,1.4619-5.9951l-1.7739-.9238c-1.1042,2.1201-1.688,4.5127-1.688,6.9189,0,8.271,6.729,15,15,15,3.3738,0,6.5815-1.1191,9.2046-3.1665.2441.106.5125.1665.7954.1665,1.1045,0,2-.8955,2-2s-.8955-2-2-2-2,.8955-2,2c0,.0762.0142.1489.0225.2231-1.0796.8496-2.2776,1.5098-3.5493,1.9771.3315-.6641.5269-1.4072.5269-2.2002,0-1.6304-.7959-3.0669-2.0068-3.9805.0457-.3472.0769-.6978.0769-1.0498,0-.7856-.1257-1.54-.3381-2.2573.6995.2012,1.4346.3179,2.198.3179,3.7039,0,6.8191-2.5342,7.7256-5.957.218.9424.3445,1.9189.3445,2.9268,0,2.1162-.4919,4.1328-1.4619,5.9951l1.7739.9238Zm-17.7935,5.2646c-1.8389-.6807-3.49-1.7529-4.8325-3.1338-1.0366-1.1143-1.616-2.5527-1.616-4.0801,0-3.3081,2.6917-6,6-6s6,2.6919,6,6c0,.0498-.0125.0977-.0134.1475-.3413-.0737-.6936-.1172-1.0566-.1172-2.7571,0-5,2.2432-5,5,0,.7861.1924,1.5234.5186,2.1836Zm7.4814-2.1836c0,1.6543-1.3457,3-3,3s-3-1.3457-3-3,1.3457-3,3-3,3,1.3457,3,3Zm1.9299-8.9697c-3.3083,0-6-2.6919-6-6s2.6917-6,6-6c1.4294,0,2.7422.5039,3.7742,1.3418.3027.2739.5918.561.8677.8618.8479,1.0352,1.3582,2.3569,1.3582,3.7964,0,3.3081-2.6917,6-6,6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (L8.propTypes = c);
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
  }, A4 || (A4 = /* @__PURE__ */ e.createElement("path", {
    d: "m26,24c-1.1046,0-2,.8954-2,2,0,.0764.0142.1488.0225.2229-2.2808,1.7963-5.0792,2.7771-8.0225,2.7771-4.2617,0-8-3.9722-8-8.5,0-4.687,3.813-8.5,8.5-8.5h.5v-2h-.5c-5.7896,0-10.5,4.7104-10.5,10.5,0,1.8839.5304,3.6896,1.4371,5.2565-2.7133-2.3843-4.4371-5.869-4.4371-9.7565,0-2.1152.4917-4.1328,1.4619-5.9956l-1.7744-.9238c-1.104,2.1211-1.6875,4.5137-1.6875,6.9194,0,8.271,6.729,15,15,15,3.3744,0,6.5818-1.1193,9.2048-3.1662.244.106.5123.1662.7952.1662,1.1046,0,2-.8954,2-2s-.8954-2-2-2Z"
  })), y4 || (y4 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 20H13V22H11z",
    transform: "rotate(90 12 21)"
  })), N4 || (N4 = /* @__PURE__ */ e.createElement("path", {
    d: "M19 10H21V12H19z",
    transform: "rotate(90 20 11)"
  })), L4 || (L4 = /* @__PURE__ */ e.createElement("path", {
    d: "m16,1c-3.3744,0-6.5818,1.1193-9.2048,3.1662-.244-.106-.5123-.1662-.7952-.1662-1.1046,0-2,.8954-2,2s.8954,2,2,2,2-.8954,2-2c0-.0764-.0142-.1488-.0225-.2229,2.2808-1.7963,5.0792-2.7771,8.0225-2.7771,4.2617,0,8,3.9722,8,8.5,0,4.687-3.813,8.5-8.5,8.5h-.5v2h.5c5.7896,0,10.5-4.7104,10.5-10.5,0-1.8853-.5322-3.6917-1.4401-5.2593,2.715,2.3843,4.4401,5.8704,4.4401,9.7593,0,2.1152-.4917,4.1328-1.4619,5.9956l1.7744.9238c1.104-2.1211,1.6875-4.5137,1.6875-6.9194C31,7.729,24.271,1,16,1Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (T8.propTypes = c);
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
  }, T4 || (T4 = /* @__PURE__ */ e.createElement("path", {
    d: "m26,24c-1.1046,0-2,.8954-2,2,0,.0764.0142.1488.0225.2229-2.2808,1.7963-5.0792,2.7771-8.0225,2.7771-2.7746,0-5.3432-.881-7.4566-2.3676.2576.0261.517.0444.7798.0444,4.2329,0,7.6768-3.4438,7.6768-7.6768h-2c0,3.1304-2.5464,5.6768-5.6768,5.6768-2.2111,0-4.1977-1.2816-5.1318-3.2725-.1365-.2972-.2595-.6007-.3738-.9094.6602.322,1.3998.5051,2.1824.5051,2.7568,0,5-2.2432,5-5v-2h-2v2c0,1.6543-1.3457,3-3,3s-3-1.3457-3-3c0-2.1152.4917-4.1328,1.4619-5.9956l-1.7744-.9238c-1.104,2.1211-1.6875,4.5137-1.6875,6.9194,0,8.271,6.729,15,15,15,3.3744,0,6.5818-1.1193,9.2048-3.1662.244.106.5123.1662.7952.1662,1.1046,0,2-.8954,2-2s-.8954-2-2-2Z"
  })), O4 || (O4 = /* @__PURE__ */ e.createElement("path", {
    d: "M21 21H23V23H21z",
    transform: "rotate(90 22 22)"
  })), Z4 || (Z4 = /* @__PURE__ */ e.createElement("path", {
    d: "M15 15H17V17H15z",
    transform: "rotate(90 16 16)"
  })), R4 || (R4 = /* @__PURE__ */ e.createElement("path", {
    d: "M9 9H11V11H9z",
    transform: "rotate(-90 10 10)"
  })), b4 || (b4 = /* @__PURE__ */ e.createElement("path", {
    d: "m16,1c-3.3744,0-6.5818,1.1193-9.2048,3.1662-.244-.106-.5123-.1662-.7952-.1662-1.1046,0-2,.8954-2,2s.8954,2,2,2,2-.8954,2-2c0-.0764-.0142-.1488-.0225-.2229,2.2808-1.7963,5.0792-2.7771,8.0225-2.7771,2.7708,0,5.3363.8784,7.4481,2.3613-.249-.0242-.5005-.038-.7547-.038-4.2329,0-7.6768,3.4438-7.6768,7.6768h2c0-3.1304,2.5464-5.6768,5.6768-5.6768,2.0554,0,3.9068,1.0953,4.9186,2.8651.2153.4283.4053.8701.5729,1.3237-.6615-.3234-1.4005-.5121-2.1849-.5121-2.7568,0-5,2.2432-5,5v2h2v-2c0-1.6543,1.3457-3,3-3s3,1.3457,3,3c0,2.1152-.4917,4.1328-1.4619,5.9956l1.7744.9238c1.104-2.1211,1.6875-4.5137,1.6875-6.9194C31,7.729,24.271,1,16,1Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (O8.propTypes = c);
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
  }, D4 || (D4 = /* @__PURE__ */ e.createElement("path", {
    d: "m26,24c-1.1046,0-2,.8954-2,2,0,.0764.0142.1488.0225.2229-2.2808,1.7963-5.0792,2.7771-8.0225,2.7771-7.1685,0-13-5.8315-13-13,0-2.1152.4917-4.1328,1.4619-5.9956l-1.7744-.9238c-1.104,2.1211-1.6875,4.5137-1.6875,6.9194,0,8.271,6.729,15,15,15,3.3744,0,6.5818-1.1193,9.2048-3.1662.244.106.5123.1662.7952.1662,1.1046,0,2-.8954,2-2s-.8954-2-2-2Z"
  })), B4 || (B4 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 23H13V25H11z",
    transform: "rotate(90 12 24)"
  })), S4 || (S4 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 9H13V11H11z",
    transform: "rotate(90 12 10)"
  })), $4 || ($4 = /* @__PURE__ */ e.createElement("path", {
    d: "M11 16H13V18H11z",
    transform: "rotate(90 12 17)"
  })), z4 || (z4 = /* @__PURE__ */ e.createElement("path", {
    d: "m16,1c-3.3744,0-6.5818,1.1193-9.2048,3.1662-.244-.106-.5123-.1662-.7952-.1662-1.1046,0-2,.8954-2,2s.8954,2,2,2,2-.8954,2-2c0-.0764-.0142-.1488-.0225-.2229,2.2808-1.7963,5.0792-2.7771,8.0225-2.7771,1.6543,0,3,1.3457,3,3s-1.3457,3-3,3h-1v2h1c2.7568,0,5-2.2432,5-5,0-.2399-.0203-.4748-.0531-.7057.9663,1.1348,1.5531,2.6021,1.5531,4.2057,0,3.584-2.916,6.5-6.5,6.5h-1v2h1c4.687,0,8.5-3.813,8.5-8.5,0-.7654-.1111-1.5036-.3017-2.2096,1.1321,1.6206,1.8017,3.587,1.8017,5.7096,0,5.5142-4.4858,10-10,10h-1v2h1c6.6167,0,12-5.3833,12-12,0-.8995-.1058-1.774-.2944-2.6176.8207,1.7031,1.2944,3.6038,1.2944,5.6176,0,2.1152-.4917,4.1328-1.4619,5.9956l1.7744.9238c1.104-2.1211,1.6875-4.5137,1.6875-6.9194C31,7.729,24.271,1,16,1Z"
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
  }, W4 || (W4 = /* @__PURE__ */ e.createElement("path", {
    d: "M22,30H17a7.0078,7.0078,0,0,1-7-7,6.6832,6.6832,0,0,1,2.0244-4.6967A6.7126,6.7126,0,0,0,10.0093,18C5.0425,18.0466,4,24.5513,4,30H2C2,18.4907,6.3452,16.0342,9.9907,16a10.0962,10.0962,0,0,1,4.4785,1.117,1,1,0,0,1,.0616,1.73A4.8773,4.8773,0,0,0,17,28h5Z"
  })), P4 || (P4 = /* @__PURE__ */ e.createElement("path", {
    d: "M18,24V22a8,8,0,1,0-8-8H8A10,10,0,1,1,18,24Z"
  })), I4 || (I4 = /* @__PURE__ */ e.createElement("circle", {
    cx: "18",
    cy: "8",
    r: "1"
  })), k4 || (k4 = /* @__PURE__ */ e.createElement("path", {
    d: "M23,17.5859l-2.3-2.3007A2.9665,2.9665,0,0,0,21,14a3.0033,3.0033,0,0,0-3-3,2.9609,2.9609,0,0,0-1.2854.3008L14.4141,9,13,10.4141l2.3,2.3007A2.9665,2.9665,0,0,0,15,14a3.0033,3.0033,0,0,0,3,3,2.9609,2.9609,0,0,0,1.2854-.3008L21.5859,19ZM17,14a1,1,0,1,1,1,1A1.0009,1.0009,0,0,1,17,14Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (R8.propTypes = c);
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
  }, F4 || (F4 = /* @__PURE__ */ e.createElement("path", {
    d: "M24 2H30V4H24zM24 8H28V10H24zM24 14H30V16H24zM24 20H28V22H24z"
  })), j4 || (j4 = /* @__PURE__ */ e.createElement("path", {
    d: "M30,28H24a10.0349,10.0349,0,0,1-6.9268-17.2622A11.9629,11.9629,0,0,0,12.9937,10a6.9027,6.9027,0,0,0-6.0308,3.42C4.9966,16.4348,4,21.34,4,28H2c0-7.0542,1.106-12.3274,3.2871-15.6726A8.906,8.906,0,0,1,12.9937,8h.0068a14.762,14.762,0,0,1,6.4619,1.592,1,1,0,0,1,.0869,1.7222A8.0249,8.0249,0,0,0,24,26h6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (b8.propTypes = c);
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
  }, U4 || (U4 = /* @__PURE__ */ e.createElement("path", {
    d: "M22 30H17a7.0078 7.0078 0 01-7-7 6.6832 6.6832 0 012.0244-4.6967A6.7935 6.7935 0 0010.0093 18C5.0425 18.0466 4 24.5513 4 30H2C2 18.4907 6.3452 16.0342 9.9907 16a10.0717 10.0717 0 014.4785 1.117 1 1 0 01.0616 1.73A4.8773 4.8773 0 0017 28h5zM17 8H19V16H17z"
  })), q4 || (q4 = /* @__PURE__ */ e.createElement("path", {
    d: "M28,5.4141,26.5859,4,24.3242,6.2617A9.95,9.95,0,0,0,19,4.0508V2H17V4.0508A10.0132,10.0132,0,0,0,8,14h2a8,8,0,1,1,8,8v2A9.9928,9.9928,0,0,0,25.7383,7.6758Z"
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
  }, Y4 || (Y4 = /* @__PURE__ */ e.createElement("path", {
    d: "M19,19h-2v-6h2v6ZM4,10h-2v12h2v-12ZM14,10h-2v12h2v-12ZM24,10h-2v12h2v-12ZM9,6h-2v20h2V6ZM29,6h-2v20h2V6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (B8.propTypes = c);
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
  }, G4 || (G4 = /* @__PURE__ */ e.createElement("path", {
    d: "M28.1655 2a13.0289 13.0289 0 00-12.542 9.5791l-1.1767 4.3154A11.0237 11.0237 0 013.8345 24H2v2H3.8345c.2975 0 .5918-.0171.8853-.0371l7.9291 2.9736A1 1 0 0014 28V21.0923a12.9311 12.9311 0 00.9121-1.313l6.3628-1.8179a1 1 0 00.5059-1.5864L17.7843 11.38a10.9268 10.9268 0 011.1516-2.3472l5.7477 1.916A1 1 0 0026 10V4.2251A10.8956 10.8956 0 0128.1655 4H30V2zM8.3354 25.1826A13.047 13.047 0 0012 23.0943v3.4624zm7.74-7.8154c.1107-.3105.2136-.625.3013-.9463l.732-2.6846L19.28 16.4512zM24 8.6123l-3.7411-1.247A11.0712 11.0712 0 0124 4.8306zM10 4L10 8.586 3.414 2 2 3.414 8.586 10 4 10 4 12 12 12 12 4 10 4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (S8.propTypes = c);
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
  }, X4 || (X4 = /* @__PURE__ */ e.createElement("path", {
    d: "M28.1655 2a12.9848 12.9848 0 00-8.4074 3.1065A3.9947 3.9947 0 1015.583 11.728l-1.1362 4.1665c-.0725.2657-.1579.5254-.2489.7818a3.9864 3.9864 0 00-5.1547 6.0054A10.9541 10.9541 0 013.8345 24H2v2H3.8345c.2975 0 .5918-.0171.8853-.0371l7.9291 2.9736A1 1 0 0014 28V21.0923a12.9311 12.9311 0 00.9121-1.313l6.3628-1.8179a1 1 0 00.5059-1.5864L17.7843 11.38a10.9268 10.9268 0 011.1516-2.3472l5.7477 1.916A1 1 0 0026 10V4.2251A10.8956 10.8956 0 0128.1655 4H30V2zM17 6a1.98 1.98 0 011.3237.53A12.9413 12.9413 0 0016.24 9.8482 1.9988 1.9988 0 0117 6zM10 20a1.9879 1.9879 0 013.3374-1.4717 11.0157 11.0157 0 01-2.5959 3.0147A1.9975 1.9975 0 0110 20zM8.3354 25.1826A13.047 13.047 0 0012 23.0943v3.4624zm7.74-7.8154c.1107-.3105.2136-.625.3013-.9463l.732-2.6846L19.28 16.4512zM24 8.6123l-3.7411-1.247A11.0712 11.0712 0 0124 4.8306zM22 22L22 24 26.586 24 22 28.586 23.414 30 28 25.414 28 30 30 30 30 22 22 22zM2 2L2 4 6.586 4 2 8.586 3.414 10 8 5.414 8 10 10 10 10 2 2 2z"
  })), r);
});
process.env.NODE_ENV !== "production" && ($8.propTypes = c);
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
  }, Q4 || (Q4 = /* @__PURE__ */ e.createElement("path", {
    d: "M28.1655 2a13.0289 13.0289 0 00-12.542 9.5791l-1.1767 4.3154A11.0237 11.0237 0 013.8345 24H2v2H3.8345a12.9139 12.9139 0 003.4687-.4819 3.9979 3.9979 0 106.5818-4.2866 12.9671 12.9671 0 001.6209-2.5269 3.9944 3.9944 0 102.3772-7.5991 10.95 10.95 0 011.7253-3.01 3.9825 3.9825 0 006.9058-3.9648A10.9435 10.9435 0 0128.1655 4H30V2zM11 26a1.9983 1.9983 0 01-1.8118-1.1655 13.0811 13.0811 0 003.2969-2.1426A1.9773 1.9773 0 0111 26zm8-11a1.9926 1.9926 0 01-2.759 1.8467c.0442-.1426.0959-.2813.1355-.4258L17.301 13.03A1.9976 1.9976 0 0119 15zm6-9a1.9942 1.9942 0 01-3.9011.5894 11.0511 11.0511 0 013.3623-1.9385A1.995 1.995 0 0125 6zM10 4L10 8.586 3.414 2 2 3.414 8.586 10 4 10 4 12 12 12 12 4 10 4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (z8.propTypes = c);
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
  }, K4 || (K4 = /* @__PURE__ */ e.createElement("path", {
    d: "M17,28V17h1a2.0023,2.0023,0,0,0,2-2V11a2.0023,2.0023,0,0,0-2-2H14a2.0023,2.0023,0,0,0-2,2v4a2.0023,2.0023,0,0,0,2,2h1V28H2v2H30V28ZM14,11h4l.0015,4H14Z"
  })), J4 || (J4 = /* @__PURE__ */ e.createElement("path", {
    d: "M9.3325 18.2168a7.0007 7.0007 0 010-10.4341l1.334 1.49a5 5 0 000 7.4537zM22.667 18.2168l-1.334-1.49a4.9995 4.9995 0 000-7.4537l1.334-1.49a7 7 0 010 10.4341z"
  })), e3 || (e3 = /* @__PURE__ */ e.createElement("path", {
    d: "M6.3994 21.8008a11.0019 11.0019 0 010-17.6006L7.6 5.8a9.0009 9.0009 0 000 14.4014zM25.6006 21.8008l-1.2012-1.6a9.001 9.001 0 000-14.4019l1.2012-1.6a11.002 11.002 0 010 17.6011z"
  })), r);
});
process.env.NODE_ENV !== "production" && (W8.propTypes = c);
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
  }, t3 || (t3 = /* @__PURE__ */ e.createElement("path", {
    d: "M16 26c-.2559 0-.512-.0977-.707-.2928l-3-3c-.1953-.1953-.293-.4512-.293-.7071s.0977-.5118.293-.7072l3-3c.1951-.1952.451-.2928.707-.2928s.512.0977.707.2928l3 3c.1953.1953.293.4512.293.7071s-.0977.5118-.293.7072l-3 3c-.1951.1952-.4512.2928-.707.2928zm-1.5857-4l1.5857 1.5858 1.5857-1.5858-1.5857-1.5858-1.5857 1.5858zM22 20c-.2559 0-.512-.0977-.707-.2928l-3-3c-.1953-.1953-.293-.4512-.293-.7071s.0977-.5118.293-.7072l3-3c.1951-.1952.451-.2928.707-.2928s.512.0977.707.2928l3 3c.1953.1953.293.4512.293.7071s-.0977.5118-.293.7072l-3 3c-.1951.1952-.4512.2928-.707.2928zm-1.5857-4l1.5857 1.5858 1.5857-1.5858-1.5857-1.5858-1.5857 1.5858zM16 14c-.2559 0-.512-.0977-.707-.2928l-3-3c-.1953-.1953-.293-.4512-.293-.7071s.0977-.5118.293-.7072l3-3c.1951-.1952.451-.2928.707-.2928s.512.0977.707.2928l3 3c.1953.1953.293.4512.293.7071s-.0977.5118-.293.7072l-3 3c-.1951.1952-.4512.2928-.707.2928zm-1.5857-4l1.5857 1.5858 1.5857-1.5858-1.5857-1.5858-1.5857 1.5858zM10 20c-.2559 0-.512-.0977-.707-.2928l-3-3c-.1953-.1953-.293-.4512-.293-.7071s.0977-.5118.293-.7072l3-3c.1951-.1952.451-.2928.707-.2928s.512.0977.707.2928l3 3c.1953.1953.293.4512.293.7071s-.0977.5118-.293.7072l-3 3c-.1951.1952-.4512.2928-.707.2928zm-1.5857-4l1.5857 1.5858 1.5857-1.5858-1.5857-1.5858-1.5857 1.5858z"
  })), r3 || (r3 = /* @__PURE__ */ e.createElement("path", {
    d: "m16,1c-.1741,0-.3481.0454-.5039.1362L3.4961,8.1362c-.3071.1792-.4961.5081-.4961.8638v14c0,.3557.189.6846.4961.8638l12,7c.1558.0908.3298.1362.5039.1362s.3481-.0454.5039-.1362l11-6.4166-1.0078-1.7275-10.4961,6.1227-11-6.4166v-12.8513L16,3.1577l11,6.4166v7.4257h2v-8c0-.3557-.189-.6846-.4961-.8638L16.5039,1.1362c-.1558-.0908-.3298-.1362-.5039-.1362Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (P8.propTypes = c);
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
  }, n3 || (n3 = /* @__PURE__ */ e.createElement("path", {
    d: "m22.5046,11.6367l-5.9883-3.5c-.1594-.0933-.3381-.1387-.5164-.1367-.1699.002-.3394.0474-.4915.1357l-6.0117,3.5c-.3076.1792-.4968.5083-.4968.8643v7c0,.356.1892.6851.4968.8643l6.0117,3.5c.1555.0903.3176.1357.4915.1357.1743,0,.3604-.0454.5164-.1367l5.9883-3.5c.3069-.1792.4954-.5078.4954-.8633v-7c0-.3555-.1885-.6841-.4954-.8633Zm-6.4939-1.479l4.0076,2.3423-4.0076,2.3423-4.0232-2.3423,4.0232-2.3423Zm-5.0107,4.0815l4,2.3291v4.6855l-4-2.3291v-4.6855Zm6,7.0249v-4.6836l4-2.3379v4.6836l-4,2.3379Z"
  })), o3 || (o3 = /* @__PURE__ */ e.createElement("path", {
    d: "m16,1c-.1741,0-.3481.0454-.5039.1362L3.4961,8.1362c-.3071.1792-.4961.5081-.4961.8638v14c0,.3557.189.6846.4961.8638l12,7c.1558.0908.3298.1362.5039.1362s.3481-.0454.5039-.1362l11-6.4166-1.0078-1.7275-10.4961,6.1227-11-6.4166v-12.8513L16,3.1577l11,6.4166v7.4257h2v-8c0-.3557-.189-.6846-.4961-.8638L16.5039,1.1362c-.1558-.0908-.3298-.1362-.5039-.1362Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (I8.propTypes = c);
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
  }, a3 || (a3 = /* @__PURE__ */ e.createElement("path", {
    d: "M14 17H16V19H14zM14 13H18V15H14z"
  })), l3 || (l3 = /* @__PURE__ */ e.createElement("path", {
    d: "m21,23h-10c-.5522,0-1-.4478-1-1v-12c0-.5522.4478-1,1-1h10c.5522,0,1,.4478,1,1v12c0,.5522-.4478,1-1,1Zm-9-2h8v-10h-8v10Z"
  })), c3 || (c3 = /* @__PURE__ */ e.createElement("path", {
    d: "m16,1c-.1741,0-.3481.0454-.5039.1362L3.4961,8.1362c-.3071.1792-.4961.5081-.4961.8638v14c0,.3557.189.6846.4961.8638l12,7c.1558.0908.3298.1362.5039.1362s.3481-.0454.5039-.1362l11-6.4166-1.0078-1.7275-10.4961,6.1227-11-6.4166v-12.8513L16,3.1577l11,6.4166v7.4257h2v-8c0-.3557-.189-.6846-.4961-.8638L16.5039,1.1362c-.1558-.0908-.3298-.1362-.5039-.1362Z"
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
  }, i3 || (i3 = /* @__PURE__ */ e.createElement("path", {
    d: "m23,18h-2v-7h-7v-2h8c.5522,0,1,.4478,1,1v8Z"
  })), p3 || (p3 = /* @__PURE__ */ e.createElement("path", {
    d: "m18,23h-8c-.5522,0-1-.4478-1-1v-8c0-.5522.4478-1,1-1h8c.5522,0,1,.4478,1,1v8c0,.5522-.4478,1-1,1Zm-7-2h6v-6h-6v6Z"
  })), h3 || (h3 = /* @__PURE__ */ e.createElement("path", {
    d: "m16,1c-.1741,0-.3481.0454-.5039.1362L3.4961,8.1362c-.3071.1792-.4961.5081-.4961.8638v14c0,.3557.189.6846.4961.8638l12,7c.1558.0908.3298.1362.5039.1362s.3481-.0454.5039-.1362l11-6.4166-1.0078-1.7275-10.4961,6.1227-11-6.4166v-12.8513L16,3.1577l11,6.4166v7.4257h2v-8c0-.3557-.189-.6846-.4961-.8638L16.5039,1.1362c-.1558-.0908-.3298-.1362-.5039-.1362Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (F8.propTypes = c);
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
  }, s3 || (s3 = /* @__PURE__ */ e.createElement("path", {
    d: "M20 20.18L18.41 18.59 17 20 20 23 25 18 23.59 16.59 20 20.18z"
  })), f3 || (f3 = /* @__PURE__ */ e.createElement("path", {
    d: "m15,23h-4c-.5522,0-1-.4478-1-1v-12c0-.5522.4478-1,1-1h10c.5522,0,1,.4478,1,1v6h-2v-5h-8v10h3v2Z"
  })), w3 || (w3 = /* @__PURE__ */ e.createElement("path", {
    d: "m16,1c-.1741,0-.3481.0454-.5039.1362L3.4961,8.1362c-.3071.1792-.4961.5081-.4961.8638v14c0,.3557.189.6846.4961.8638l12,7c.1558.0908.3298.1362.5039.1362s.3481-.0454.5039-.1362l11-6.4166-1.0078-1.7275-10.4961,6.1227-11-6.4166v-12.8513L16,3.1577l11,6.4166v7.4257h2v-8c0-.3557-.189-.6846-.4961-.8638L16.5039,1.1362c-.1558-.0908-.3298-.1362-.5039-.1362Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (j8.propTypes = c);
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
  }, u3 || (u3 = /* @__PURE__ */ e.createElement("path", {
    d: "M24 15L22.25 15 20 22.0312 17.7917 15.0003 16 15.0003 18.5 23 21.5 23 24 15z"
  })), d3 || (d3 = /* @__PURE__ */ e.createElement("path", {
    d: "m16,23h-5c-.5522,0-1-.4478-1-1v-12c0-.5522.4478-1,1-1h10c.5522,0,1,.4478,1,1v4h-2v-3h-8v10h4v2Z"
  })), v3 || (v3 = /* @__PURE__ */ e.createElement("path", {
    d: "m16,1c-.1741,0-.3481.0454-.5039.1362L3.4961,8.1362c-.3071.1792-.4961.5081-.4961.8638v14c0,.3557.189.6846.4961.8638l12,7c.1558.0908.3298.1362.5039.1362s.3481-.0454.5039-.1362l11-6.4166-1.0078-1.7275-10.4961,6.1227-11-6.4166v-12.8513L16,3.1577l11,6.4166v7.4257h2v-8c0-.3557-.189-.6846-.4961-.8638L16.5039,1.1362c-.1558-.0908-.3298-.1362-.5039-.1362Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (U8.propTypes = c);
const q8 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M24,26a3,3,0,1,0-2.8164-4H13v1a5,5,0,1,1-5-5V16a7,7,0,1,0,6.9287,8h6.2549A2.9914,2.9914,0,0,0,24,26Z"
  })), E3 || (E3 = /* @__PURE__ */ e.createElement("path", {
    d: "M24,16a7.024,7.024,0,0,0-2.57.4873l-3.1656-5.5395a3.0469,3.0469,0,1,0-1.7326.9985l4.1189,7.2085.8686-.4976a5.0006,5.0006,0,1,1-1.851,6.8418L17.937,26.501A7.0005,7.0005,0,1,0,24,16Z"
  })), V3 || (V3 = /* @__PURE__ */ e.createElement("path", {
    d: "M8.532,20.0537a3.03,3.03,0,1,0,1.7326.9985C11.74,18.47,13.86,14.7607,13.89,14.708l.4976-.8682-.8677-.497a5,5,0,1,1,6.812-1.8438l1.7315,1.002a7.0008,7.0008,0,1,0-10.3462,2.0356c-.457.7427-1.1021,1.8716-2.0737,3.5728Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (q8.propTypes = c);
const Y8 = /* @__PURE__ */ e.forwardRef(function({
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
  }, H3 || (H3 = /* @__PURE__ */ e.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "2"
  })), g3 || (g3 = /* @__PURE__ */ e.createElement("path", {
    d: "M24,30a6,6,0,1,1,6-6A6.0069,6.0069,0,0,1,24,30Zm0-10a4,4,0,1,0,4,4A4.0045,4.0045,0,0,0,24,20Z"
  })), M3 || (M3 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,28H8V4h8v6a2.0058,2.0058,0,0,0,2,2h6v3h2V10a.9092.9092,0,0,0-.3-.7l-7-7A.9087.9087,0,0,0,18,2H8A2.0058,2.0058,0,0,0,6,4V28a2.0058,2.0058,0,0,0,2,2h8ZM18,4.4,23.6,10H18Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Y8.propTypes = c);
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
  }, _3 || (_3 = /* @__PURE__ */ e.createElement("path", {
    d: "M21,3V5.5857l-4,4V1H15V9.5857l-4-4V3H9V19a7.004,7.004,0,0,0,6,6.92V30h2V25.92A7.004,7.004,0,0,0,23,19V3ZM15,23.8987A5.008,5.008,0,0,1,11,19v-2.586l4,4Zm0-6.313-4-4V8.4138l4,4Zm2-5.1719,4-4v5.1719l-4,4Zm0,11.4849V20.4138l4-4V19A5.008,5.008,0,0,1,17,23.8987Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (G8.propTypes = c);
const X8 = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M23,23h7v7h-2v-3.3518c-1.6447,2.0408-4.1525,3.3516-7.0002,3.3516l-9.9998.0002c-5,0-9-4-9-9v-8h2v8c0,3.8999,3.1,7,7,7h10c2.4032,0,4.4943-1.1841,5.7518-3h-3.7518v-2ZM9,7h-3.7518c1.2575-1.8159,3.3486-3,5.7518-3h10c3.9,0,7,3.1001,7,7v8h2v-8c0-5-4-9-9-9l-9.9998.0002c-2.8477,0-5.3555,1.3108-7.0002,3.3516V2h-2v7h7v-2ZM13.957,22l1.5303-6.3457.7739-3.1641h.0347l.7393,3.1641,1.5308,6.3457h2.562l2.8721-12.0029h-2.167l-1.2207,5.7607-.7568,3.6797h-.0518l-.8423-3.6797-1.376-5.7607h-2.5107l-1.3755,5.7607-.8599,3.6797h-.0518l-.7393-3.6797-1.1865-5.7607h-2.27l2.7856,12.0029h2.5796Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (X8.propTypes = c);
const Q8 = /* @__PURE__ */ e.forwardRef(function({
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
  }, x3 || (x3 = /* @__PURE__ */ e.createElement("path", {
    d: "M22 27.1798L19.41 24.5899 18 26 22 30 30 22 28.5899 20.59 22 27.1798zM9 17H16V19H9zM9 12H21V14H9zM9 7H21V9H9z"
  })), A3 || (A3 = /* @__PURE__ */ e.createElement("path", {
    d: "m16,30H6c-1.103,0-2-.8972-2-2V4c0-1.1028.897-2,2-2h18c1.103,0,2,.8972,2,2v15h-2V4H6v24h10v2Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Q8.propTypes = c);
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
  }, y3 || (y3 = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "25",
    r: "2"
  })), N3 || (N3 = /* @__PURE__ */ e.createElement("path", {
    d: "M10.47,19.2334l1.4136,1.4131a5.9688,5.9688,0,0,1,8.2229-.0093L21.52,19.2236a7.9629,7.9629,0,0,0-11.05.01Z"
  })), L3 || (L3 = /* @__PURE__ */ e.createElement("path", {
    d: "M6.229,14.9927l1.4136,1.4135a11.955,11.955,0,0,1,16.7041-.01L25.76,14.9829a13.9514,13.9514,0,0,0-19.5313.01Z"
  })), T3 || (T3 = /* @__PURE__ */ e.createElement("path", {
    d: "M30,10.7412a19.94,19.94,0,0,0-28,0v.0225L3.4043,12.168a17.9336,17.9336,0,0,1,25.1811-.01L30,10.7432Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (K8.propTypes = c);
const J8 = /* @__PURE__ */ e.forwardRef(function({
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
  }, O3 || (O3 = /* @__PURE__ */ e.createElement("path", {
    d: "M6,30H26a2,2,0,0,0,2-2V22a2,2,0,0,0-2-2H6a2,2,0,0,0-2,2v6A2,2,0,0,0,6,30Zm0-8H26v6H6Z"
  })), Z3 || (Z3 = /* @__PURE__ */ e.createElement("circle", {
    cx: "9",
    cy: "25",
    r: "1"
  })), R3 || (R3 = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "14.5",
    r: "1.5"
  })), b3 || (b3 = /* @__PURE__ */ e.createElement("path", {
    d: "M10.7832,10.3325a7.0007,7.0007,0,0,1,10.4341,0l-1.49,1.334a5,5,0,0,0-7.4537,0Z"
  })), D3 || (D3 = /* @__PURE__ */ e.createElement("path", {
    d: "M7.1992,7.3994a11.0019,11.0019,0,0,1,17.6006,0L23.2,8.6a9.0009,9.0009,0,0,0-14.4014.0005Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (J8.propTypes = c);
const el = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M20 20H14V17a2 2 0 014 0h2a4 4 0 00-8 0v3a2.0025 2.0025 0 00-2 2v6a2.0025 2.0025 0 002 2h8a2.0025 2.0025 0 002-2V22A2.0025 2.0025 0 0020 20zm0 8H12V22h8zM16 8a8.9709 8.9709 0 00-6.3608 2.6392l1.4133 1.4135a6.9887 6.9887 0 019.895 0l1.4135-1.4135A8.9717 8.9717 0 0016 8z"
  })), S3 || (S3 = /* @__PURE__ */ e.createElement("path", {
    d: "M6.105,7.105,7.5188,8.5186a11.9808,11.9808,0,0,1,16.9624,0L25.8949,7.105a13.9782,13.9782,0,0,0-19.79,0Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (el.propTypes = c);
const tl = /* @__PURE__ */ e.forwardRef(function({
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
  }, $3 || ($3 = /* @__PURE__ */ e.createElement("circle", {
    cx: "16",
    cy: "25",
    r: "2"
  })), z3 || (z3 = /* @__PURE__ */ e.createElement("path", {
    d: "M30 3.4141L28.5859 2 2 28.5859 3.4141 30 14.0962 19.3179a5.9359 5.9359 0 016.01 1.3193L21.52 19.2236a7.9669 7.9669 0 00-5.125-2.2041l3.3875-3.3877a11.9908 11.9908 0 014.5647 2.7647L25.76 14.9829A13.975 13.975 0 0021.334 12.08L24.3308 9.083a17.9364 17.9364 0 014.2546 3.0747L30 10.7432v-.002a20.02 20.02 0 00-4.1895-3.1377zM14.68 13.0776l2.0415-2.0415C16.481 11.0234 16.2437 11 16 11a13.9447 13.9447 0 00-9.771 3.9927l1.4136 1.4136A11.97 11.97 0 0114.68 13.0776zM16 7a17.87 17.87 0 014.2324.5254L21.875 5.8828A19.9537 19.9537 0 002 10.7412v.0225L3.4043 12.168A17.9193 17.9193 0 0116 7z"
  })), r);
});
process.env.NODE_ENV !== "production" && (tl.propTypes = c);
const rl = /* @__PURE__ */ e.forwardRef(function({
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
  }, W3 || (W3 = /* @__PURE__ */ e.createElement("path", {
    d: "M20 20V17a4 4 0 00-8 0v3a2.0025 2.0025 0 00-2 2v6a2.0025 2.0025 0 002 2h8a2.0025 2.0025 0 002-2V22A2.0025 2.0025 0 0020 20zm-6-3a2 2 0 014 0v3H14zM12 28V22h8v6zM6.105 7.105L7.5188 8.5186a11.9808 11.9808 0 0116.9624 0L25.8949 7.105a13.9782 13.9782 0 00-19.79 0z"
  })), P3 || (P3 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,8a8.9709,8.9709,0,0,0-6.3608,2.6392l1.4133,1.4135a6.9887,6.9887,0,0,1,9.895,0l1.4135-1.4135A8.9717,8.9717,0,0,0,16,8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (rl.propTypes = c);
const nl = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M6.9492,20.95l-1.414-1.4141a5,5,0,0,0,0-7.0715L6.9492,11.05a7,7,0,0,1,0,9.9Z"
  })), k3 || (k3 = /* @__PURE__ */ e.createElement("path", {
    d: "M10.4854 24.4854L9.0713 23.0713a10.0011 10.0011 0 000-14.1426l1.4141-1.4141a12.0006 12.0006 0 010 16.9708zM25.0508 20.95a7 7 0 010-9.9l1.414 1.4146a5 5 0 000 7.0715z"
  })), F3 || (F3 = /* @__PURE__ */ e.createElement("path", {
    d: "M21.5146 24.4854a12.0006 12.0006 0 010-16.9708l1.4141 1.4141a10.0011 10.0011 0 000 14.1426zM3 15H2V4H0V28H2V17H3a1 1 0 000-2zM30 4V15H29a1 1 0 000 2h1V28h2V4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (nl.propTypes = c);
const ol = /* @__PURE__ */ e.forwardRef(function({
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
  }, j3 || (j3 = /* @__PURE__ */ e.createElement("path", {
    d: "M13,26H11a5.0057,5.0057,0,0,0-5-5V19A7.0078,7.0078,0,0,1,13,26Z"
  })), U3 || (U3 = /* @__PURE__ */ e.createElement("path", {
    d: "M18 26H16A10.0113 10.0113 0 006 16V14A12.0137 12.0137 0 0118 26zM26 13a7.0078 7.0078 0 01-7-7h2a5.0057 5.0057 0 005 5z"
  })), q3 || (q3 = /* @__PURE__ */ e.createElement("path", {
    d: "M26 18A12.0137 12.0137 0 0114 6h2A10.0113 10.0113 0 0026 16zM7.707 24.293a.9994.9994 0 00-1.414 0L2 28.5859 3.4143 30 7.707 25.707A.9994.9994 0 007.707 24.293zM28.5859 2L24.293 6.293a1 1 0 001.414 1.414L30 3.4141z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ol.propTypes = c);
const al = /* @__PURE__ */ e.forwardRef(function({
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
  }, Y3 || (Y3 = /* @__PURE__ */ e.createElement("path", {
    d: "M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM28,15H22A24.26,24.26,0,0,0,19.21,4.45,12,12,0,0,1,28,15ZM16,28a5,5,0,0,1-.67,0A21.85,21.85,0,0,1,12,17H20a21.85,21.85,0,0,1-3.3,11A5,5,0,0,1,16,28ZM12,15a21.85,21.85,0,0,1,3.3-11,6,6,0,0,1,1.34,0A21.85,21.85,0,0,1,20,15Zm.76-10.55A24.26,24.26,0,0,0,10,15h-6A12,12,0,0,1,12.79,4.45ZM4.05,17h6a24.26,24.26,0,0,0,2.75,10.55A12,12,0,0,1,4.05,17ZM19.21,27.55A24.26,24.26,0,0,0,22,17h6A12,12,0,0,1,19.21,27.55Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (al.propTypes = c);
const ll = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M29.3164,8.0513l-18-6A1,1,0,0,0,10.4,2.2L4,7V2H2V30H4V11l6.4,4.8a1,1,0,0,0,.9165.1489l18-6a1,1,0,0,0,0-1.8974ZM10,13,4.6665,9,10,5Zm4-.0542-2,.667V4.3872l2,.667Zm4-1.333-2,.6665V5.7207l2,.6665Zm2-.667V7.0542L25.8379,9Z"
  })), X3 || (X3 = /* @__PURE__ */ e.createElement("path", {
    d: "M20,22a4,4,0,0,0-8,0h2a2,2,0,1,1,2,2H8v2h8A4.0045,4.0045,0,0,0,20,22Z"
  })), Q3 || (Q3 = /* @__PURE__ */ e.createElement("path", {
    d: "M26,22a4.0045,4.0045,0,0,0-4,4h2a2,2,0,1,1,2,2H12v2H26a4,4,0,0,0,0-8Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ll.propTypes = c);
const cl = /* @__PURE__ */ e.forwardRef(function({
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
  }, K3 || (K3 = /* @__PURE__ */ e.createElement("path", {
    d: "M17,28V15.8159a3.0059,3.0059,0,0,0,1.47-1.1186L27.063,17l.5176-1.9321-8.6045-2.3052a2.985,2.985,0,0,0-2.63-2.7275L14.1938,2l-1.9316.5186,2.1318,7.956a2.9588,2.9588,0,0,0-1.093,3.8115L7,20.5859,8.415,22l6.3-6.3A2.8938,2.8938,0,0,0,15,15.8154V28H2v2H30V28Zm0-15a1,1,0,1,1-1-1A1.0008,1.0008,0,0,1,17,13Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (cl.propTypes = c);
const il = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M25,2,23.5859,3.4141,26.1719,6h-5.09a16.93,16.93,0,0,0-6.3139,1.2158L10.4893,8.9272A14.93,14.93,0,0,1,4.9185,10H2v2H4.9185a16.93,16.93,0,0,0,6.3139-1.2158l4.2783-1.7114A14.93,14.93,0,0,1,21.0815,8h5.09l-2.586,2.5859L25,12l5-5Z"
  })), eo || (eo = /* @__PURE__ */ e.createElement("path", {
    d: "M21,11l-1.4141,1.4141L22.1719,15H18.9014a16.9422,16.9422,0,0,0-5.9693,1.0825l-2.5664.9624A14.9456,14.9456,0,0,1,5.0986,18H2v2H5.0986a16.9422,16.9422,0,0,0,5.9693-1.0825l2.5664-.9624A14.9456,14.9456,0,0,1,18.9014,17h3.2705l-2.586,2.5859L21,21l5-5Z"
  })), to || (to = /* @__PURE__ */ e.createElement("path", {
    d: "M17,20l-1.4141,1.4141L18.1719,24H16.5967a16.9879,16.9879,0,0,0-5.3765.8721l-1.0727.3584A14.9852,14.9852,0,0,1,5.4033,26H2v2H5.4033a16.9879,16.9879,0,0,0,5.3765-.8721l1.0727-.3584A14.9852,14.9852,0,0,1,16.5967,26h1.5752l-2.586,2.5859L17,30l5-5Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (il.propTypes = c);
const pl = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M15 4H17V7H15zM25 15H28V17H25zM15 25H17V28H15zM4 15H7V17H4z"
  })), no || (no = /* @__PURE__ */ e.createElement("path", {
    d: "M7.55 7.04H9.55V10.04H7.55z",
    transform: "rotate(-45 8.55 8.548)"
  })), oo || (oo = /* @__PURE__ */ e.createElement("path", {
    d: "M21.96 7.55H24.96V9.55H21.96z",
    transform: "rotate(-45 23.454 8.555)"
  })), ao || (ao = /* @__PURE__ */ e.createElement("path", {
    d: "M22.45 21.95H24.45V24.95H22.45z",
    transform: "rotate(-45 23.452 23.446)"
  })), lo || (lo = /* @__PURE__ */ e.createElement("path", {
    d: "M7.05 22.45H10.05V24.45H7.05z",
    transform: "rotate(-45 8.544 23.451)"
  })), co || (co = /* @__PURE__ */ e.createElement("path", {
    d: "M4 30H28V32H4zM4 0H28V2H4zM16 10a6 6 0 106 6A6 6 0 0016 10zm-4 6a4 4 0 014-4v8A4 4 0 0112 16z"
  })), r);
});
process.env.NODE_ENV !== "production" && (pl.propTypes = c);
const hl = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M15 2H17V5H15zM25 13H28V15H25zM15 23H17V26H15zM4 13H7V15H4z"
  })), po || (po = /* @__PURE__ */ e.createElement("path", {
    d: "M7.55 5.03H9.55V8.030000000000001H7.55z",
    transform: "rotate(-45 8.56 6.544)"
  })), ho || (ho = /* @__PURE__ */ e.createElement("path", {
    d: "M21.96 5.54H24.96V7.54H21.96z",
    transform: "rotate(-45 23.469 6.539)"
  })), so || (so = /* @__PURE__ */ e.createElement("path", {
    d: "M22.46 19.94H24.46V22.94H22.46z",
    transform: "rotate(-45 23.462 21.442)"
  })), fo || (fo = /* @__PURE__ */ e.createElement("path", {
    d: "M7.04 20.45H10.04V22.45H7.04z",
    transform: "rotate(-45 8.554 21.447)"
  })), wo || (wo = /* @__PURE__ */ e.createElement("path", {
    d: "M4 28H28V30H4zM16 20a6 6 0 10-6-6A6 6 0 0016 20zm0-10v8a4 4 0 010-8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (hl.propTypes = c);
const sl = /* @__PURE__ */ e.forwardRef(function({
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
    d: "M15 2H17V5H15zM27 15H30V17H27zM15 27H17V30H15zM2 15H5V17H2z"
  })), vo || (vo = /* @__PURE__ */ e.createElement("path", {
    d: "M6.225 5.729H8.228V8.732H6.225z",
    transform: "rotate(-45 7.227 7.23)"
  })), mo || (mo = /* @__PURE__ */ e.createElement("path", {
    d: "M23.267 6.227H26.267V8.227H23.267z",
    transform: "rotate(-45 24.767 7.227)"
  })), Eo || (Eo = /* @__PURE__ */ e.createElement("path", {
    d: "M23.769 23.269H25.770999999999997V26.270999999999997H23.769z",
    transform: "rotate(-44.999 24.77 24.77)"
  })), Vo || (Vo = /* @__PURE__ */ e.createElement("path", {
    d: "M5.47 25.126L7.591 23 9 24.419 6.884 26.54 5.47 25.126zM15 13H17V15H15zM19 13H21V15H19zM17 11H19V13H17zM17 15H19V17H17zM17 19H19V21H17zM15 17H17V19H15zM19 17H21V19H19z"
  })), Ho || (Ho = /* @__PURE__ */ e.createElement("path", {
    d: "M16,7a9,9,0,1,0,9,9A9.01,9.01,0,0,0,16,7ZM9,16a7.004,7.004,0,0,1,6-6.92V11h2V9.08a6.9231,6.9231,0,0,1,2,.605V11h1.89c.0374.0366.074.0732.11.11V13h1.3149a6.931,6.931,0,0,1,.6053,2H21v2h1.92a6.931,6.931,0,0,1-.6053,2H21v1.89c-.0364.0372-.073.0738-.11.11H19v1.3149a6.9231,6.9231,0,0,1-2,.605V21H15v1.92A7.004,7.004,0,0,1,9,16Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (sl.propTypes = c);
const fl = /* @__PURE__ */ e.forwardRef(function({
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
  }, go || (go = /* @__PURE__ */ e.createElement("path", {
    d: "M15 6H17V9H15zM25 17H28V19H25zM15 27H17V30H15zM4 17H7V19H4z"
  })), Mo || (Mo = /* @__PURE__ */ e.createElement("path", {
    d: "M7.55 9.03H9.55V12.03H7.55z",
    transform: "rotate(-45 8.558 10.545)"
  })), _o || (_o = /* @__PURE__ */ e.createElement("path", {
    d: "M21.96 9.54H24.96V11.54H21.96z",
    transform: "rotate(-45 23.466 10.54)"
  })), Co || (Co = /* @__PURE__ */ e.createElement("path", {
    d: "M22.46 23.94H24.46V26.94H22.46z",
    transform: "rotate(-45 23.459 25.443)"
  })), xo || (xo = /* @__PURE__ */ e.createElement("path", {
    d: "M7.04 24.45H10.04V26.45H7.04z",
    transform: "rotate(-45 8.55 25.448)"
  })), Ao || (Ao = /* @__PURE__ */ e.createElement("path", {
    d: "M4 2H28V4H4zM16 24a6 6 0 10-6-6A6 6 0 0016 24zm0-10v8a4 4 0 010-8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (fl.propTypes = c);
const wl = /* @__PURE__ */ e.forwardRef(function({
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
  }, yo || (yo = /* @__PURE__ */ e.createElement("path", {
    d: "M15 6H17V8H15zM24 15H26V17H24zM15 24H17V26H15zM6 15H8V17H6z"
  })), No || (No = /* @__PURE__ */ e.createElement("path", {
    d: "M8.586 8.586H10.586V10.586H8.586z",
    transform: "rotate(-45 9.586 9.586)"
  })), Lo || (Lo = /* @__PURE__ */ e.createElement("path", {
    d: "M21.414 8.586H23.414V10.586H21.414z",
    transform: "rotate(-45 22.414 9.586)"
  })), To || (To = /* @__PURE__ */ e.createElement("path", {
    d: "M21.414 21.414H23.414V23.414H21.414z",
    transform: "rotate(-45 22.414 22.414)"
  })), Oo || (Oo = /* @__PURE__ */ e.createElement("path", {
    d: "M8.586 21.414H10.586V23.414H8.586z",
    transform: "rotate(-45 9.586 22.414)"
  })), Zo || (Zo = /* @__PURE__ */ e.createElement("path", {
    d: "M16,22a6,6,0,1,0-6-6A6,6,0,0,0,16,22Zm0-10v8a4,4,0,0,1,0-8Z"
  })), Ro || (Ro = /* @__PURE__ */ e.createElement("path", {
    d: "M28,30H4a2.0021,2.0021,0,0,1-2-2V4A2.0021,2.0021,0,0,1,4,2H28a2.0021,2.0021,0,0,1,2,2V28A2.0021,2.0021,0,0,1,28,30ZM4,4V28H28V4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (wl.propTypes = c);
const ul = /* @__PURE__ */ e.forwardRef(function({
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
  }, bo || (bo = /* @__PURE__ */ e.createElement("path", {
    d: "M21 15H8V13H21a3 3 0 10-3-3H16a5 5 0 115 5zM23 28a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H4V18H23a5 5 0 010 10z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ul.propTypes = c);
const dl = /* @__PURE__ */ e.forwardRef(function({
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
  }, Do || (Do = /* @__PURE__ */ e.createElement("path", {
    d: "M23 28a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H22V18h1a5 5 0 010 10zM16 18H20V20H16zM10 18H14V20H10zM4 18H8V20H4zM21 15H20V13h1a3 3 0 10-3-3H16a5 5 0 115 5zM14 13H18V15H14zM8 13H12V15H8z"
  })), r);
});
process.env.NODE_ENV !== "production" && (dl.propTypes = c);
const vl = /* @__PURE__ */ e.forwardRef(function({
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
  }, Bo || (Bo = /* @__PURE__ */ e.createElement("path", {
    d: "M25 28a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H6V18H25a5 5 0 010 10zM23 15H10V13H23a3 3 0 10-3-3H18a5 5 0 115 5z"
  })), So || (So = /* @__PURE__ */ e.createElement("path", {
    d: "M11 23H13V25H11zM13 25H15V27H13zM15 27H17V29H15zM15 23H17V25H15zM11 27H13V29H11zM6 4H8V6H6zM8 6H10V8H8zM10 8H12V10H10zM10 4H12V6H10zM6 8H8V10H6zM2 26H4V28H2zM4 28H6V30H4zM6 30H8V32H6zM6 26H8V28H6zM2 30H4V32H2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (vl.propTypes = c);
const ml = /* @__PURE__ */ e.forwardRef(function({
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
  }, $o || ($o = /* @__PURE__ */ e.createElement("path", {
    d: "M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z"
  })), zo || (zo = /* @__PURE__ */ e.createElement("path", {
    d: "M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z"
  })), r);
});
process.env.NODE_ENV !== "production" && (ml.propTypes = c);
const El = /* @__PURE__ */ e.forwardRef(function({
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
  }, Wo || (Wo = /* @__PURE__ */ e.createElement("path", {
    d: "M21.684 19.051L19.167 19.891 13 15.486 13 7.369 15.555 5.665 14.445 4.001 12 5.631 9.555 4.001 8.445 5.665 11 7.369 11 14.057 6 10.486 6 8 4 8 4 10.279 1.684 11.051 2.316 12.949 4.833 12.11 10.28 16.001 4.833 19.891 2.316 19.051 1.684 20.949 4 21.721 4 24 6 24 6 21.515 11 17.944 11 24.631 8.445 26.335 9.555 27.999 12 26.368 14.445 27.999 15.555 26.335 13 24.631 13 17.943 18 21.515 18 24 20 24 20 21.721 22.316 20.949 21.684 19.051z"
  })), Po || (Po = /* @__PURE__ */ e.createElement("path", {
    fill: "none",
    d: "M23.75,10h-1.5V6h1.5ZM23,11a1,1,0,1,0,1,1A1,1,0,0,0,23,11Z"
  })), Io || (Io = /* @__PURE__ */ e.createElement("path", {
    d: "M29.9115,13.9355,23.6284,2.3706a.7181.7181,0,0,0-1.2568,0L16.0885,13.9355A.72.72,0,0,0,16.72,15H29.28A.72.72,0,0,0,29.9115,13.9355ZM22.25,6h1.5v4h-1.5ZM23,13a1,1,0,1,1,1-1A1,1,0,0,1,23,13Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (El.propTypes = c);
const Vl = /* @__PURE__ */ e.forwardRef(function({
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
  }, ko || (ko = /* @__PURE__ */ e.createElement("path", {
    d: "M15 26H17V28H15zM17 28H19V30H17zM19 30H21V32H19zM19 26H21V28H19zM15 30H17V32H15zM13 16H15V18H13zM15 18H17V20H15zM17 20H19V22H17zM17 16H19V18H17zM13 20H15V22H13zM10 30a1 1 0 01-.8944-1.4474l2-4.0005a1 1 0 111.7888.8947l-2 4A.9981.9981 0 0110 30z"
  })), Fo || (Fo = /* @__PURE__ */ e.createElement("path", {
    d: "M24.8008,9.1362a8.9943,8.9943,0,0,0-17.6006,0A6.5321,6.5321,0,0,0,2,15.5V22l1,2,1-2V20.18a6.4891,6.4891,0,0,0,3.4294,1.7246L6.106,24.5527a1,1,0,1,0,1.7885.8946l2-4a1,1,0,0,0-.447-1.3418.977.977,0,0,0-.489-.0894V20H8.5a4.4975,4.4975,0,0,1-.356-8.981l.8155-.0639.0991-.812a6.9938,6.9938,0,0,1,13.8838,0l.0986.812.8154.0639A4.4975,4.4975,0,0,1,23.5,20h-.542v.0083A.9955.9955,0,0,0,22,21v3l1,2,1-2V21.9746a6.4473,6.4473,0,0,0,2-.4761V26l1,2,1-2V20.18A6.4876,6.4876,0,0,0,24.8008,9.1362Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Vl.propTypes = c);
const Hl = /* @__PURE__ */ e.forwardRef(function({
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
  }, jo || (jo = /* @__PURE__ */ e.createElement("path", {
    d: "M18,28V26A10,10,0,0,0,28,16h2A12,12,0,0,1,18,28Z"
  })), Uo || (Uo = /* @__PURE__ */ e.createElement("path", {
    d: "M18,23V21a5,5,0,0,0,5-5h2A7,7,0,0,1,18,23Z"
  })), qo || (qo = /* @__PURE__ */ e.createElement("path", {
    d: "M27,11H21V7a3,3,0,0,0-3-3H12A3,3,0,0,0,9,7v4H3a1,1,0,0,0-1,1.15L3.88,24.3a2,2,0,0,0,2,1.7H15V24H5.86L4.17,13H27ZM11,7a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v4H11Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Hl.propTypes = c);
const gl = /* @__PURE__ */ e.forwardRef(function({
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
  }, Yo || (Yo = /* @__PURE__ */ e.createElement("path", {
    d: "M29 9L27 22 25 9 23 9 25.52 23 28.48 23 31 9 29 9zM19 9L17.48 14 17 15.98 16.54 14 15 9 13 9 13 23 15 23 15 15 14.84 13 15.42 15 17 19.63 18.58 15 19.16 13 19 15 19 23 21 23 21 9 19 9zM9.2 9L8.86 17 8.6 21.54 8.19 18 7.51 12.54 5.49 12.54 4.81 18 4.4 21.54 4.14 17 3.8 9 2 9 3 23 5.27 23 6.03 18.07 6.49 14 6.5 13.97 6.51 14 6.97 18.07 7.73 23 10 23 11 9 9.2 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (gl.propTypes = c);
const Ml = /* @__PURE__ */ e.forwardRef(function({
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
  }, Go || (Go = /* @__PURE__ */ e.createElement("path", {
    d: "M10 16H22V18H10zM10 20H18V22H10z"
  })), Xo || (Xo = /* @__PURE__ */ e.createElement("path", {
    d: "M16,7h0a8.0233,8.0233,0,0,1,7.8649,6.4935l.2591,1.346,1.3488.244A5.5019,5.5019,0,0,1,24.5076,26H7.4954a5.5019,5.5019,0,0,1-.9695-10.9165l1.3488-.244.2591-1.346A8.0256,8.0256,0,0,1,16,7m0-2a10.0244,10.0244,0,0,0-9.83,8.1155A7.5019,7.5019,0,0,0,7.4911,28H24.5076a7.5019,7.5019,0,0,0,1.3213-14.8845A10.0229,10.0229,0,0,0,15.9883,5Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ml.propTypes = c);
const _l = /* @__PURE__ */ e.forwardRef(function({
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
  }, Qo || (Qo = /* @__PURE__ */ e.createElement("switch", null, /* @__PURE__ */ e.createElement("g", null, /* @__PURE__ */ e.createElement("path", {
    d: "M16 27c-3.6 0-7.1-1.8-9.2-5H12v-2H4v8h2v-3.7c2.5 3 6.1 4.7 10 4.7V27zM31 23v-2h-2.1c-.1-.6-.4-1.2-.7-1.8l1.5-1.5-1.4-1.4-1.5 1.5c-.5-.3-1.1-.6-1.8-.7V15h-2v2.1c-.6.1-1.2.4-1.8.7l-1.5-1.5-1.4 1.4 1.5 1.5c-.3.5-.6 1.1-.7 1.8H17v2h2.1c.1.6.4 1.2.7 1.8l-1.5 1.5 1.4 1.4 1.5-1.5c.5.3 1.1.6 1.8.7V29h2v-2.1c.6-.1 1.2-.4 1.8-.7l1.5 1.5 1.4-1.4-1.5-1.5c.3-.5.6-1.1.7-1.8H31zM24 25c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3S25.7 25 24 25zM20 10h5.2C21.9 4.9 15.1 3.5 10 6.8c-3.1 2-5 5.5-5 9.2H3C3 8.8 8.8 3 16 3c3.9 0 7.5 1.7 10 4.7V4h2v8h-8V10z"
  })))), r);
});
process.env.NODE_ENV !== "production" && (_l.propTypes = c);
const Cl = /* @__PURE__ */ e.forwardRef(function({
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
  }, Ko || (Ko = /* @__PURE__ */ e.createElement("path", {
    d: "M16 17v8H6V17H16m0-2H6a2 2 0 00-2 2v8a2 2 0 002 2H16a2 2 0 002-2V17a2 2 0 00-2-2zM27 6v5H17V6H27m0-2H17a2 2 0 00-2 2v5a2 2 0 002 2H27a2 2 0 002-2V6a2 2 0 00-2-2zM27 17v5H22V17h5m0-2H22a2 2 0 00-2 2v5a2 2 0 002 2h5a2 2 0 002-2V17a2 2 0 00-2-2zM11 6v5H6V6h5m0-2H6A2 2 0 004 6v5a2 2 0 002 2h5a2 2 0 002-2V6a2 2 0 00-2-2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Cl.propTypes = c);
const xl = /* @__PURE__ */ e.forwardRef(function({
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
  }, Jo || (Jo = /* @__PURE__ */ e.createElement("path", {
    d: "M27 6v5H17V6H27m0-2H17a2 2 0 00-2 2v5a2 2 0 002 2H27a2 2 0 002-2V6a2 2 0 00-2-2zM12 25H6V17h6V15H6a2 2 0 00-2 2v8a2 2 0 002 2h6zM30 20L16.828 20 19.414 17.414 18 16 13 21 18 26 19.414 24.586 16.828 22 30 22 30 20zM11 6v5H6V6h5m0-2H6A2 2 0 004 6v5a2 2 0 002 2h5a2 2 0 002-2V6a2 2 0 00-2-2z"
  })), r);
});
process.env.NODE_ENV !== "production" && (xl.propTypes = c);
const Al = /* @__PURE__ */ e.forwardRef(function({
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
  }, e6 || (e6 = /* @__PURE__ */ e.createElement("path", {
    d: "M26.5859,17,22,21.5859v0h0l-5-5a2.002,2.002,0,0,0-2.8286,0L9.585,21.1709A2.0031,2.0031,0,0,0,9.585,24l4.0009,4H6v2H16a1,1,0,0,0,.707-1.707L11,22.585,15.5852,18l5.7078,5.707a.9995.9995,0,0,0,1.414,0L28,18.4141Z"
  })), t6 || (t6 = /* @__PURE__ */ e.createElement("path", {
    d: "M21.5,17A3.5,3.5,0,1,1,25,13.5,3.5042,3.5042,0,0,1,21.5,17Zm0-5A1.5,1.5,0,1,0,23,13.5,1.5017,1.5017,0,0,0,21.5,12Z"
  })), r6 || (r6 = /* @__PURE__ */ e.createElement("path", {
    d: "M4,10.5977l12-6.462,12.5264,6.7452.9472-1.7618-13-7a1.0045,1.0045,0,0,0-.9472,0l-13,7A1,1,0,0,0,2,10V30H4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Al.propTypes = c);
const yl = /* @__PURE__ */ e.forwardRef(function({
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
  }, n6 || (n6 = /* @__PURE__ */ e.createElement("path", {
    d: "M17,30H15a2.0021,2.0021,0,0,1-2-2V14H8a2.0021,2.0021,0,0,1-2-2V10A2.0021,2.0021,0,0,1,8,8h5V4a2.0021,2.0021,0,0,1,2-2h2a2.0021,2.0021,0,0,1,2,2V8h5a2.0021,2.0021,0,0,1,2,2v2a2.0021,2.0021,0,0,1-2,2H19V28A2.0021,2.0021,0,0,1,17,30ZM8,10v2h7V28h2V12h7V10H17V4H15v6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (yl.propTypes = c);
const Nl = /* @__PURE__ */ e.forwardRef(function({
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
  }, o6 || (o6 = /* @__PURE__ */ e.createElement("path", {
    d: "M24.291,16l3.585-6.5181A1,1,0,0,0,27,8H19.8911L16.876,2.5181a1,1,0,0,0-1.752,0L12.1089,8H5a1,1,0,0,0-.876,1.4819L7.709,16,4.124,22.5181A1,1,0,0,0,5,24h7.1089l3.0151,5.4819a1,1,0,0,0,1.752,0L19.8911,24H27a1,1,0,0,0,.876-1.4819Zm-5.5823,6L16,26.9248,13.2913,22h-6.6l3.3-6-3.3-6h6.6L16,5.0752,18.7087,10h6.6l-3.3,6,3.3,6Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Nl.propTypes = c);
const Ll = /* @__PURE__ */ e.forwardRef(function({
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
  }, a6 || (a6 = /* @__PURE__ */ e.createElement("path", {
    d: "M27,18a.9986.9986,0,0,1-.5415-.1594L22,14.9688l-4.4585,2.8718a1,1,0,0,1-1.5088-1.095l1.35-5.1318L14.3105,8.69a1,1,0,0,1,.5508-1.7146l4.3745-.6128,1.8663-3.8032A1.0008,1.0008,0,0,1,21.9878,2a1.0171,1.0171,0,0,1,.8989.5378L24.88,6.3625l4.2622.6133A1,1,0,0,1,29.69,8.69l-3.0723,2.9239,1.35,5.1318A1,1,0,0,1,27,18Zm-5-5.2207a.999.999,0,0,1,.5415.1594l2.8369,1.8272-.8457-3.2149a1.0006,1.0006,0,0,1,.2778-.9787l2.0074-1.91-2.73-.3929a.9994.9994,0,0,1-.7441-.5275L22.0269,5.2151,20.7979,7.72a1.0008,1.0008,0,0,1-.7593.55L17.19,8.6687l2,1.9036a1.0006,1.0006,0,0,1,.2778.9787l-.8457,3.2149,2.8369-1.8272A.999.999,0,0,1,22,12.7793Z"
  })), l6 || (l6 = /* @__PURE__ */ e.createElement("path", {
    d: "M15.8169,30A13.8137,13.8137,0,0,1,9.0752,4.1277a1,1,0,0,1,1.3613,1.3611A11.8091,11.8091,0,0,0,26.5107,21.5635a1,1,0,0,1,1.3619,1.3611A13.8411,13.8411,0,0,1,15.8169,30ZM7.3271,7.9727a11.81,11.81,0,0,0,16.7,16.7,13.8086,13.8086,0,0,1-16.7-16.7Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ll.propTypes = c);
const Tl = /* @__PURE__ */ e.forwardRef(function({
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
  }, c6 || (c6 = /* @__PURE__ */ e.createElement("path", {
    d: "M20 9L18 9 16 15 14 9 12 9 14.75 16 12 23 14 23 16 17 18 23 20 23 17.25 16 20 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Tl.propTypes = c);
const Ol = /* @__PURE__ */ e.forwardRef(function({
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
  }, i6 || (i6 = /* @__PURE__ */ e.createElement("path", {
    d: "M23,20l-1.4141,1.4141L24.1719,24H6V4H4V24a2.0023,2.0023,0,0,0,2,2H24.1719l-2.586,2.5859L23,30l5-5Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Ol.propTypes = c);
const Zl = /* @__PURE__ */ e.forwardRef(function({
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
  }, p6 || (p6 = /* @__PURE__ */ e.createElement("path", {
    d: "M28 23H22V21h6V17H24a2.002 2.002 0 01-2-2V11a2.002 2.002 0 012-2h6v2H24v4h4a2.002 2.002 0 012 2v4A2.0023 2.0023 0 0128 23zM14 21L14 9 12 9 12 23 20 23 20 21 14 21zM10 9L8 9 6 15 4 9 2 9 4.752 16 2 23 4 23 6 17 8 23 10 23 7.245 16 10 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Zl.propTypes = c);
const Rl = /* @__PURE__ */ e.forwardRef(function({
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
  }, h6 || (h6 = /* @__PURE__ */ e.createElement("path", {
    d: "M24 21L24 9 22 9 22 23 30 23 30 21 24 21zM18 9L16.48 14 16 15.98 15.54 14 14 9 12 9 12 23 14 23 14 15 13.84 13 14.42 15 16 19.63 17.58 15 18.16 13 18 15 18 23 20 23 20 9 18 9zM10 9L8 9 6 15 4 9 2 9 4.75 16 2 23 4 23 6 17 8 23 10 23 7.25 16 10 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Rl.propTypes = c);
const bl = /* @__PURE__ */ e.forwardRef(function({
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
  }, s6 || (s6 = /* @__PURE__ */ e.createElement("path", {
    d: "M20 9L18 9 16 16 14 9 12 9 15 18 15 23 17 23 17 18 20 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (bl.propTypes = c);
const Dl = /* @__PURE__ */ e.forwardRef(function({
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
  }, f6 || (f6 = /* @__PURE__ */ e.createElement("path", {
    d: "M8,26V7.8281l2.5859,2.586L12,9,7,4,2,9l1.4141,1.4141L6,7.8281V26a2.0023,2.0023,0,0,0,2,2H28V26Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Dl.propTypes = c);
const Bl = /* @__PURE__ */ e.forwardRef(function({
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
  }, w6 || (w6 = /* @__PURE__ */ e.createElement("path", {
    d: "M20 9L12 9 12 11 18 11 12 21 12 23 20 23 20 21 14 21 20 11 20 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Bl.propTypes = c);
const Sl = /* @__PURE__ */ e.forwardRef(function({
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
  }, u6 || (u6 = /* @__PURE__ */ e.createElement("path", {
    d: "M24,10h4c1.1046,0,2-.8954,2-2V4c0-1.1046-.8954-2-2-2h-4c-1.1046,0-2,.8954-2,2v1h-3c-1.1046,0-2,.8954-2,2V15h-3V5c0-1.1046-.8954-2-2-2H4c-1.1046,0-2,.8954-2,2V27c0,1.1046,.8954,2,2,2H12c1.1046,0,2-.8954,2-2v-10h3v8c0,1.1046,.8954,2,2,2h3v1c0,1.1046,.8954,2,2,2h4c1.1046,0,2-.8954,2-2v-4c0-1.1046-.8954-2-2-2h-4c-1.1046,0-2,.8954-2,2v1h-3v-8h3v1c0,1.1046,.8954,2,2,2h4c1.1046,0,2-.8954,2-2v-4c0-1.1046-.8954-2-2-2h-4c-1.1046,0-2,.8954-2,2v1h-3V7h3v1c0,1.1046,.8954,2,2,2Zm0-6h4v4s-4,0-4,0V4ZM11.3992,12l-7.3992,5.9194V6.0806l7.3992,5.9194Zm.6013,2.0801l.0007,11.8403-7.4004-5.9204,7.3997-5.9199Zm-.0002-4.1606L5.8508,5h6.1492l.0002,4.9194ZM4,22.0806l6.1492,4.9194H4v-4.9194Zm20,1.9194h4v4h-4v-4Zm0-10h4v4h-4v-4Z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Sl.propTypes = c);
const $l = /* @__PURE__ */ e.forwardRef(function({
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
  }, d6 || (d6 = /* @__PURE__ */ e.createElement("path", {
    d: "M27 3h-8c-1.1028 0-2 .8975-2 2V27c0 1.1025.8972 2 2 2h8c1.1028 0 2-.8975 2-2V5c0-1.1025-.8972-2-2-2zm.0002 6.9194l-6.1494-4.9194h6.1492l.0002 4.9194zm-.6011 2.0806l-7.3992 5.9194V6.0806l7.3992 5.9194zm.6013 2.0801l.0007 11.8403-7.4004-5.9204 7.3997-5.9199zm-8.0005 8.0005l6.1492 4.9194h-6.1492v-4.9194zM13 3H5c-1.1028 0-2 .8975-2 2V27c0 1.1025.8972 2 2 2H13c1.1028 0 2-.8975 2-2V5c0-1.1025-.8972-2-2-2zm.0002 6.9194L6.8508 5h6.1492l.0002 4.9194zm-.6011 2.0806l-7.3992 5.9194V6.0806l7.3992 5.9194zm.6013 2.0801l.0007 11.8403-7.4004-5.9204 7.3997-5.9199zM5 22.0806l6.1492 4.9194H5v-4.9194z"
  })), r);
});
process.env.NODE_ENV !== "production" && ($l.propTypes = c);
const zl = /* @__PURE__ */ e.forwardRef(function({
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
  }, v6 || (v6 = /* @__PURE__ */ e.createElement("path", {
    d: "M26 22L26 25.586 17 16.586 17 10 17 6 17 5.828 19.586 8.414 21 7 16 2 11 7 12.414 8.414 15 5.828 15 6 15 10 15 16.586 6 25.586 6 22 4 22 4 29 11 29 11 27 7.414 27 16 18.414 24.586 27 21 27 21 29 28 29 28 22 26 22z"
  })), r);
});
process.env.NODE_ENV !== "production" && (zl.propTypes = c);
const Wl = /* @__PURE__ */ e.forwardRef(function({
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
  }, m6 || (m6 = /* @__PURE__ */ e.createElement("path", {
    d: "M28 9H22V23h2V18h4a2 2 0 002-2V11A2 2 0 0028 9zm0 7H24V11h4zM12 9L12 11 15 11 15 21 12 21 12 23 20 23 20 21 17 21 17 11 20 11 20 9 12 9zM10 9L2 9 2 11 8 11 2 21 2 23 10 23 10 21 4 21 10 11 10 9z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Wl.propTypes = c);
const Pl = /* @__PURE__ */ e.forwardRef(function({
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
  }, E6 || (E6 = /* @__PURE__ */ e.createElement("path", {
    d: "M4 20L4 22 8.586 22 2 28.586 3.414 30 10 23.414 10 28 12 28 12 20 4 20zM28 2H22V16h2V11h4a2 2 0 002-2V4A2 2 0 0028 2zm0 7H24V4h4zM12 4L15 4 15 14 12 14 12 16 20 16 20 14 17 14 17 4 20 4 20 2 12 2 12 4zM2 4L8 4 2 14 2 16 10 16 10 14 4 14 10 4 10 2 2 2 2 4z"
  })), r);
});
process.env.NODE_ENV !== "production" && (Pl.propTypes = c);
const V6 = /* @__PURE__ */ A6({
  direction: "auto",
  getTextDirection: {
    current: void 0
  }
}), Il = /* @__PURE__ */ e.forwardRef(({
  as: a,
  children: r,
  dir: t = "auto",
  ...n
}, o) => {
  const i = y6(V6), h = {}, u = a ?? "span", d = {
    ...i
  };
  if (!i)
    h.dir = t, d.direction = t;
  else {
    const {
      direction: V,
      getTextDirection: m
    } = i;
    if (m && m.current) {
      const L = Fl(r), Z = m.current(L);
      V !== Z ? (h.dir = Z, d.direction = Z) : V === "auto" && (h.dir = Z);
    } else V !== t ? (h.dir = t, d.direction = t) : V === "auto" && (h.dir = t);
  }
  return /* @__PURE__ */ e.createElement(V6.Provider, {
    value: d
  }, /* @__PURE__ */ e.createElement(u, V1({
    ref: o
  }, n, h), r));
}), kl = Il;
kl.propTypes = {
  /**
   * Provide a custom element type used to render the outermost node
   */
  as: O.oneOfType([O.func, O.string, O.elementType]),
  /**
   * Provide child elements or text to be rendered inside of this component
   */
  children: O.node.isRequired,
  /**
   * Specify the text direction to be used for this component and any of its
   * children
   */
  dir: O.oneOf(["ltr", "rtl", "auto"])
};
const Fl = (a) => {
  var t;
  if (typeof a == "string")
    return a;
  const r = (t = N6.map(a, (n) => typeof n == "string" ? n : null)) == null ? void 0 : t.filter((n) => n !== null);
  return (r == null ? void 0 : r.length) === 1 ? r[0] : r;
}, jl = () => {
}, C6 = process.env.NODE_ENV !== "production" ? (a, r) => {
  if (typeof r > "u")
    throw new Error("`warning(condition, message)` requires a warning format argument");
  a || console.warn("Warning: " + r);
} : jl, m1 = /* @__PURE__ */ new Map(), Ql = (a, r) => (n, o, i, ...h) => {
  if (typeof n[o] > "u")
    return;
  m1.has(i) || m1.set(i, /* @__PURE__ */ new Set());
  const u = m1.get(i);
  return u && !u.has(o) && (u.add(o), process.env.NODE_ENV !== "production" && C6(!1, r || `The prop \`${o}\` has been deprecated for the ${i} component. It will be removed in the next major release`)), a(n, o, i, ...h);
}, J = {};
function Kl(a, r, t) {
  return function(o, i, h, ...u) {
    if (o[i] !== void 0) {
      if (!J[h] || !J[h][i]) {
        J[h] = {
          ...J[h],
          [i]: !0
        };
        const d = o[i], V = t ? t(d) : null;
        if (r && !r.includes(d)) {
          const m = t ? `"${d}" is a deprecated value for the "${i}" prop on the "${h}" component. Use "${V}" instead. "${d}" will be removed in the next major release.` : `"${d}" is a deprecated value for the "${i}" prop on the "${h}" component. Allowed values is/are: ${r.join(", ")}.  "${d}" will be removed in the next major release. `;
          process.env.NODE_ENV !== "production" && C6(!1, m);
        }
      }
      return a(o, i, h, ...u);
    }
  };
}
const Jl = (a, r = "component should have no interactive child nodes") => {
  process.env.NODE_ENV !== "production" && L6(() => {
    const t = a.current ? x6(a.current) : !1;
    if (t) {
      const n = `Error: ${r}.

Instead found: ${t.outerHTML}`;
      throw console.error(n), new Error(n);
    }
  }, []);
}, x6 = (a) => {
  if (!a || !a.childNodes)
    return null;
  if (Ul(a))
    return a;
  for (const r of a.childNodes)
    if (r instanceof HTMLElement) {
      const t = x6(r);
      if (t)
        return t;
    }
  return null;
}, Ul = (a) => {
  if (a.tabIndex === void 0 || a.tabIndex < 0 || (a instanceof HTMLButtonElement || a instanceof HTMLInputElement || a instanceof HTMLSelectElement || a instanceof HTMLTextAreaElement) && a.disabled)
    return !1;
  switch (a.nodeName) {
    case "A":
      return a instanceof HTMLAnchorElement && !!a.href && a.rel !== "ignore";
    case "INPUT":
      return a instanceof HTMLInputElement && a.type !== "hidden";
    default:
      return !0;
  }
};
export {
  m5 as C,
  E1 as F,
  l as I,
  O as P,
  kl as T,
  V8 as W,
  V1 as _,
  Jl as a,
  Kl as b,
  Gl as c,
  Ql as d,
  ga as e,
  d8 as f,
  c as i,
  jl as n,
  Xl as u
};
