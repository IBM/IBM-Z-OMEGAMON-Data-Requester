import * as y from "react";
import C, { useRef as I, useCallback as D, useEffect as B, useState as k, useMemo as A, useLayoutEffect as Vt, createContext as J, useContext as V, forwardRef as Fn, Fragment as Ee, isValidElement as Rn, cloneElement as Ln, createElement as An, useId as we, useReducer as Wt, useSyncExternalStore as Dn, createRef as Nn } from "react";
import * as tt from "react-dom";
import { createPortal as Ut, flushSync as ge } from "react-dom";
import { u as Hn, i as Ce, e as kn, o as Kt, d as Ke, m as Ye, c as _n, r as jn, s as zn, f as Bn, g as Vn, b as Wn } from "./floating-ui.react-dom-BCXlcKqS.js";
const Yt = typeof document < "u" ? C.useLayoutEffect : () => {
};
function Un(e) {
  const n = I(null);
  return Yt(() => {
    n.current = e;
  }, [
    e
  ]), D((...t) => {
    const r = n.current;
    return r == null ? void 0 : r(...t);
  }, []);
}
const Le = (e) => {
  var n;
  return (n = e == null ? void 0 : e.ownerDocument) !== null && n !== void 0 ? n : document;
}, be = (e) => e && "window" in e && e.window === e ? e : Le(e).defaultView || window;
function Kn(e) {
  var n;
  return typeof window > "u" || window.navigator == null ? !1 : ((n = window.navigator.userAgentData) === null || n === void 0 ? void 0 : n.brands.some((t) => e.test(t.brand))) || e.test(window.navigator.userAgent);
}
function Yn(e) {
  var n;
  return typeof window < "u" && window.navigator != null ? e.test(((n = window.navigator.userAgentData) === null || n === void 0 ? void 0 : n.platform) || window.navigator.platform) : !1;
}
function Gt(e) {
  let n = null;
  return () => (n == null && (n = e()), n);
}
const Gn = Gt(function() {
  return Yn(/^Mac/i);
}), qn = Gt(function() {
  return Kn(/Android/i);
});
function Xn(e) {
  return e.mozInputSource === 0 && e.isTrusted ? !0 : qn() && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
class Jn {
  isDefaultPrevented() {
    return this.nativeEvent.defaultPrevented;
  }
  preventDefault() {
    this.defaultPrevented = !0, this.nativeEvent.preventDefault();
  }
  stopPropagation() {
    this.nativeEvent.stopPropagation(), this.isPropagationStopped = () => !0;
  }
  isPropagationStopped() {
    return !1;
  }
  persist() {
  }
  constructor(n, t) {
    this.nativeEvent = t, this.target = t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget, this.bubbles = t.bubbles, this.cancelable = t.cancelable, this.defaultPrevented = t.defaultPrevented, this.eventPhase = t.eventPhase, this.isTrusted = t.isTrusted, this.timeStamp = t.timeStamp, this.type = n;
  }
}
function qt(e) {
  let n = I({
    isFocused: !1,
    observer: null
  });
  Yt(() => {
    const r = n.current;
    return () => {
      r.observer && (r.observer.disconnect(), r.observer = null);
    };
  }, []);
  let t = Un((r) => {
    e == null || e(r);
  });
  return D((r) => {
    if (r.target instanceof HTMLButtonElement || r.target instanceof HTMLInputElement || r.target instanceof HTMLTextAreaElement || r.target instanceof HTMLSelectElement) {
      n.current.isFocused = !0;
      let o = r.target, i = (s) => {
        n.current.isFocused = !1, o.disabled && t(new Jn("blur", s)), n.current.observer && (n.current.observer.disconnect(), n.current.observer = null);
      };
      o.addEventListener("focusout", i, {
        once: !0
      }), n.current.observer = new MutationObserver(() => {
        if (n.current.isFocused && o.disabled) {
          var s;
          (s = n.current.observer) === null || s === void 0 || s.disconnect();
          let l = o === document.activeElement ? null : document.activeElement;
          o.dispatchEvent(new FocusEvent("blur", {
            relatedTarget: l
          })), o.dispatchEvent(new FocusEvent("focusout", {
            bubbles: !0,
            relatedTarget: l
          }));
        }
      }), n.current.observer.observe(o, {
        attributes: !0,
        attributeFilter: [
          "disabled"
        ]
      });
    }
  }, [
    t
  ]);
}
function Qn(e) {
  let { isDisabled: n, onFocus: t, onBlur: r, onFocusChange: o } = e;
  const i = D((u) => {
    if (u.target === u.currentTarget)
      return r && r(u), o && o(!1), !0;
  }, [
    r,
    o
  ]), s = qt(i), l = D((u) => {
    const a = Le(u.target);
    u.target === u.currentTarget && a.activeElement === u.target && (t && t(u), o && o(!0), s(u));
  }, [
    o,
    t,
    s
  ]);
  return {
    focusProps: {
      onFocus: !n && (t || o || r) ? l : void 0,
      onBlur: !n && (r || o) ? i : void 0
    }
  };
}
let Ae = null, nt = /* @__PURE__ */ new Set(), Ie = /* @__PURE__ */ new Map(), xe = !1, rt = !1;
const Zn = {
  Tab: !0,
  Escape: !0
};
function dt(e, n) {
  for (let t of nt) t(e, n);
}
function er(e) {
  return !(e.metaKey || !Gn() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function ze(e) {
  xe = !0, er(e) && (Ae = "keyboard", dt("keyboard", e));
}
function te(e) {
  Ae = "pointer", (e.type === "mousedown" || e.type === "pointerdown") && (xe = !0, dt("pointer", e));
}
function Xt(e) {
  Xn(e) && (xe = !0, Ae = "virtual");
}
function Jt(e) {
  e.target === window || e.target === document || (!xe && !rt && (Ae = "virtual", dt("virtual", e)), xe = !1, rt = !1);
}
function Qt() {
  xe = !1, rt = !0;
}
function ot(e) {
  if (typeof window > "u" || Ie.get(be(e))) return;
  const n = be(e), t = Le(e);
  let r = n.HTMLElement.prototype.focus;
  n.HTMLElement.prototype.focus = function() {
    xe = !0, r.apply(this, arguments);
  }, t.addEventListener("keydown", ze, !0), t.addEventListener("keyup", ze, !0), t.addEventListener("click", Xt, !0), n.addEventListener("focus", Jt, !0), n.addEventListener("blur", Qt, !1), typeof PointerEvent < "u" ? (t.addEventListener("pointerdown", te, !0), t.addEventListener("pointermove", te, !0), t.addEventListener("pointerup", te, !0)) : (t.addEventListener("mousedown", te, !0), t.addEventListener("mousemove", te, !0), t.addEventListener("mouseup", te, !0)), n.addEventListener("beforeunload", () => {
    Zt(e);
  }, {
    once: !0
  }), Ie.set(n, {
    focus: r
  });
}
const Zt = (e, n) => {
  const t = be(e), r = Le(e);
  n && r.removeEventListener("DOMContentLoaded", n), Ie.has(t) && (t.HTMLElement.prototype.focus = Ie.get(t).focus, r.removeEventListener("keydown", ze, !0), r.removeEventListener("keyup", ze, !0), r.removeEventListener("click", Xt, !0), t.removeEventListener("focus", Jt, !0), t.removeEventListener("blur", Qt, !1), typeof PointerEvent < "u" ? (r.removeEventListener("pointerdown", te, !0), r.removeEventListener("pointermove", te, !0), r.removeEventListener("pointerup", te, !0)) : (r.removeEventListener("mousedown", te, !0), r.removeEventListener("mousemove", te, !0), r.removeEventListener("mouseup", te, !0)), Ie.delete(t));
};
function tr(e) {
  const n = Le(e);
  let t;
  return n.readyState !== "loading" ? ot(e) : (t = () => {
    ot(e);
  }, n.addEventListener("DOMContentLoaded", t)), () => Zt(e, t);
}
typeof document < "u" && tr();
function en() {
  return Ae !== "pointer";
}
const nr = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function rr(e, n, t) {
  var r;
  const o = typeof window < "u" ? be(t == null ? void 0 : t.target).HTMLInputElement : HTMLInputElement, i = typeof window < "u" ? be(t == null ? void 0 : t.target).HTMLTextAreaElement : HTMLTextAreaElement, s = typeof window < "u" ? be(t == null ? void 0 : t.target).HTMLElement : HTMLElement, l = typeof window < "u" ? be(t == null ? void 0 : t.target).KeyboardEvent : KeyboardEvent;
  return e = e || (t == null ? void 0 : t.target) instanceof o && !nr.has(t == null || (r = t.target) === null || r === void 0 ? void 0 : r.type) || (t == null ? void 0 : t.target) instanceof i || (t == null ? void 0 : t.target) instanceof s && (t == null ? void 0 : t.target.isContentEditable), !(e && n === "keyboard" && t instanceof l && !Zn[t.key]);
}
function or(e, n, t) {
  ot(), B(() => {
    let r = (o, i) => {
      rr(!!(t != null && t.isTextInput), o, i) && e(en());
    };
    return nt.add(r), () => {
      nt.delete(r);
    };
  }, n);
}
function ir(e) {
  let { isDisabled: n, onBlurWithin: t, onFocusWithin: r, onFocusWithinChange: o } = e, i = I({
    isFocusWithin: !1
  }), s = D((a) => {
    i.current.isFocusWithin && !a.currentTarget.contains(a.relatedTarget) && (i.current.isFocusWithin = !1, t && t(a), o && o(!1));
  }, [
    t,
    o,
    i
  ]), l = qt(s), u = D((a) => {
    !i.current.isFocusWithin && document.activeElement === a.target && (r && r(a), o && o(!0), i.current.isFocusWithin = !0, l(a));
  }, [
    r,
    o,
    l
  ]);
  return n ? {
    focusWithinProps: {
      // These should not have been null, that would conflict in mergeProps
      onFocus: void 0,
      onBlur: void 0
    }
  } : {
    focusWithinProps: {
      onFocus: u,
      onBlur: s
    }
  };
}
let Be = !1, Ge = 0;
function it() {
  Be = !0, setTimeout(() => {
    Be = !1;
  }, 50);
}
function wt(e) {
  e.pointerType === "touch" && it();
}
function lr() {
  if (!(typeof document > "u"))
    return typeof PointerEvent < "u" ? document.addEventListener("pointerup", wt) : document.addEventListener("touchend", it), Ge++, () => {
      Ge--, !(Ge > 0) && (typeof PointerEvent < "u" ? document.removeEventListener("pointerup", wt) : document.removeEventListener("touchend", it));
    };
}
function tn(e) {
  let { onHoverStart: n, onHoverChange: t, onHoverEnd: r, isDisabled: o } = e, [i, s] = k(!1), l = I({
    isHovered: !1,
    ignoreEmulatedMouseEvents: !1,
    pointerType: "",
    target: null
  }).current;
  B(lr, []);
  let { hoverProps: u, triggerHoverEnd: a } = A(() => {
    let d = (c, m) => {
      if (l.pointerType = m, o || m === "touch" || l.isHovered || !c.currentTarget.contains(c.target)) return;
      l.isHovered = !0;
      let h = c.currentTarget;
      l.target = h, n && n({
        type: "hoverstart",
        target: h,
        pointerType: m
      }), t && t(!0), s(!0);
    }, f = (c, m) => {
      if (l.pointerType = "", l.target = null, m === "touch" || !l.isHovered) return;
      l.isHovered = !1;
      let h = c.currentTarget;
      r && r({
        type: "hoverend",
        target: h,
        pointerType: m
      }), t && t(!1), s(!1);
    }, p = {};
    return typeof PointerEvent < "u" ? (p.onPointerEnter = (c) => {
      Be && c.pointerType === "mouse" || d(c, c.pointerType);
    }, p.onPointerLeave = (c) => {
      !o && c.currentTarget.contains(c.target) && f(c, c.pointerType);
    }) : (p.onTouchStart = () => {
      l.ignoreEmulatedMouseEvents = !0;
    }, p.onMouseEnter = (c) => {
      !l.ignoreEmulatedMouseEvents && !Be && d(c, "mouse"), l.ignoreEmulatedMouseEvents = !1;
    }, p.onMouseLeave = (c) => {
      !o && c.currentTarget.contains(c.target) && f(c, "mouse");
    }), {
      hoverProps: p,
      triggerHoverEnd: f
    };
  }, [
    n,
    t,
    r,
    o,
    l
  ]);
  return B(() => {
    o && a({
      currentTarget: l.target
    }, l.pointerType);
  }, [
    o
  ]), {
    hoverProps: u,
    isHovered: i
  };
}
function nn(e = {}) {
  let { autoFocus: n = !1, isTextInput: t, within: r } = e, o = I({
    isFocused: !1,
    isFocusVisible: n || en()
  }), [i, s] = k(!1), [l, u] = k(() => o.current.isFocused && o.current.isFocusVisible), a = D(() => u(o.current.isFocused && o.current.isFocusVisible), []), d = D((c) => {
    o.current.isFocused = c, s(c), a();
  }, [
    a
  ]);
  or((c) => {
    o.current.isFocusVisible = c, a();
  }, [], {
    isTextInput: t
  });
  let { focusProps: f } = Qn({
    isDisabled: r,
    onFocusChange: d
  }), { focusWithinProps: p } = ir({
    isDisabled: !r,
    onFocusWithinChange: d
  });
  return {
    isFocused: i,
    isFocusVisible: l,
    focusProps: r ? p : f
  };
}
var sr = Object.defineProperty, ur = (e, n, t) => n in e ? sr(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, qe = (e, n, t) => (ur(e, typeof n != "symbol" ? n + "" : n, t), t);
let ar = class {
  constructor() {
    qe(this, "current", this.detect()), qe(this, "handoffState", "pending"), qe(this, "currentId", 0);
  }
  set(n) {
    this.current !== n && (this.handoffState = "pending", this.currentId = 0, this.current = n);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, ye = new ar();
function De(e) {
  return ye.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function rn(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((n) => setTimeout(() => {
    throw n;
  }));
}
function ae() {
  let e = [], n = { addEventListener(t, r, o, i) {
    return t.addEventListener(r, o, i), n.add(() => t.removeEventListener(r, o, i));
  }, requestAnimationFrame(...t) {
    let r = requestAnimationFrame(...t);
    return n.add(() => cancelAnimationFrame(r));
  }, nextFrame(...t) {
    return n.requestAnimationFrame(() => n.requestAnimationFrame(...t));
  }, setTimeout(...t) {
    let r = setTimeout(...t);
    return n.add(() => clearTimeout(r));
  }, microTask(...t) {
    let r = { current: !0 };
    return rn(() => {
      r.current && t[0]();
    }), n.add(() => {
      r.current = !1;
    });
  }, style(t, r, o) {
    let i = t.style.getPropertyValue(r);
    return Object.assign(t.style, { [r]: o }), this.add(() => {
      Object.assign(t.style, { [r]: i });
    });
  }, group(t) {
    let r = ae();
    return t(r), this.add(() => r.dispose());
  }, add(t) {
    return e.includes(t) || e.push(t), () => {
      let r = e.indexOf(t);
      if (r >= 0) for (let o of e.splice(r, 1)) o();
    };
  }, dispose() {
    for (let t of e.splice(0)) t();
  } };
  return n;
}
function Ne() {
  let [e] = k(ae);
  return B(() => () => e.dispose(), [e]), e;
}
let L = (e, n) => {
  ye.isServer ? B(e, n) : Vt(e, n);
};
function $e(e) {
  let n = I(e);
  return L(() => {
    n.current = e;
  }, [e]), n;
}
let w = function(e) {
  let n = $e(e);
  return C.useCallback((...t) => n.current(...t), [n]);
};
function cr(e) {
  let n = e.width / 2, t = e.height / 2;
  return { top: e.clientY - t, right: e.clientX + n, bottom: e.clientY + t, left: e.clientX - n };
}
function dr(e, n) {
  return !(!e || !n || e.right < n.left || e.left > n.right || e.bottom < n.top || e.top > n.bottom);
}
function fr({ disabled: e = !1 } = {}) {
  let n = I(null), [t, r] = k(!1), o = Ne(), i = w(() => {
    n.current = null, r(!1), o.dispose();
  }), s = w((l) => {
    if (o.dispose(), n.current === null) {
      n.current = l.currentTarget, r(!0);
      {
        let u = De(l.currentTarget);
        o.addEventListener(u, "pointerup", i, !1), o.addEventListener(u, "pointermove", (a) => {
          if (n.current) {
            let d = cr(a);
            r(dr(d, n.current.getBoundingClientRect()));
          }
        }, !1), o.addEventListener(u, "pointercancel", i, !1);
      }
    }
  });
  return { pressed: t, pressProps: e ? {} : { onPointerDown: s, onPointerUp: i, onClick: i } };
}
let pr = J(void 0);
function ft() {
  return V(pr);
}
function $t(...e) {
  return Array.from(new Set(e.flatMap((n) => typeof n == "string" ? n.split(" ") : []))).filter(Boolean).join(" ");
}
function ce(e, n, ...t) {
  if (e in n) {
    let o = n[e];
    return typeof o == "function" ? o(...t) : o;
  }
  let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map((o) => `"${o}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, ce), r;
}
var lt = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(lt || {}), mr = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(mr || {});
function ie() {
  let e = gr();
  return D((n) => hr({ mergeRefs: e, ...n }), [e]);
}
function hr({ ourProps: e, theirProps: n, slot: t, defaultTag: r, features: o, visible: i = !0, name: s, mergeRefs: l }) {
  l = l ?? br;
  let u = on(n, e);
  if (i) return je(u, t, r, s, l);
  let a = o ?? 0;
  if (a & 2) {
    let { static: d = !1, ...f } = u;
    if (d) return je(f, t, r, s, l);
  }
  if (a & 1) {
    let { unmount: d = !0, ...f } = u;
    return ce(d ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return je({ ...f, hidden: !0, style: { display: "none" } }, t, r, s, l);
    } });
  }
  return je(u, t, r, s, l);
}
function je(e, n = {}, t, r, o) {
  let { as: i = t, children: s, refName: l = "ref", ...u } = Xe(e, ["unmount", "static"]), a = e.ref !== void 0 ? { [l]: e.ref } : {}, d = typeof s == "function" ? s(n) : s;
  "className" in u && u.className && typeof u.className == "function" && (u.className = u.className(n)), u["aria-labelledby"] && u["aria-labelledby"] === u.id && (u["aria-labelledby"] = void 0);
  let f = {};
  if (n) {
    let p = !1, c = [];
    for (let [m, h] of Object.entries(n)) typeof h == "boolean" && (p = !0), h === !0 && c.push(m.replace(/([A-Z])/g, (g) => `-${g.toLowerCase()}`));
    if (p) {
      f["data-headlessui-state"] = c.join(" ");
      for (let m of c) f[`data-${m}`] = "";
    }
  }
  if (i === Ee && (Object.keys(me(u)).length > 0 || Object.keys(me(f)).length > 0)) if (!Rn(d) || Array.isArray(d) && d.length > 1) {
    if (Object.keys(me(u)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(me(u)).concat(Object.keys(me(f))).map((p) => `  - ${p}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((p) => `  - ${p}`).join(`
`)].join(`
`));
  } else {
    let p = d.props, c = p == null ? void 0 : p.className, m = typeof c == "function" ? (...E) => $t(c(...E), u.className) : $t(c, u.className), h = m ? { className: m } : {}, g = on(d.props, me(Xe(u, ["ref"])));
    for (let E in f) E in g && delete f[E];
    return Ln(d, Object.assign({}, g, f, a, { ref: o(vr(d), a.ref) }, h));
  }
  return An(i, Object.assign({}, Xe(u, ["ref"]), i !== Ee && a, i !== Ee && f), d);
}
function gr() {
  let e = I([]), n = D((t) => {
    for (let r of e.current) r != null && (typeof r == "function" ? r(t) : r.current = t);
  }, []);
  return (...t) => {
    if (!t.every((r) => r == null)) return e.current = t, n;
  };
}
function br(...e) {
  return e.every((n) => n == null) ? void 0 : (n) => {
    for (let t of e) t != null && (typeof t == "function" ? t(n) : t.current = n);
  };
}
function on(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let n = {}, t = {};
  for (let r of e) for (let o in r) o.startsWith("on") && typeof r[o] == "function" ? (t[o] != null || (t[o] = []), t[o].push(r[o])) : n[o] = r[o];
  if (n.disabled || n["aria-disabled"]) for (let r in t) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r) && (t[r] = [(o) => {
    var i;
    return (i = o == null ? void 0 : o.preventDefault) == null ? void 0 : i.call(o);
  }]);
  for (let r in t) Object.assign(n, { [r](o, ...i) {
    let s = t[r];
    for (let l of s) {
      if ((o instanceof Event || (o == null ? void 0 : o.nativeEvent) instanceof Event) && o.defaultPrevented) return;
      l(o, ...i);
    }
  } });
  return n;
}
function pt(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let n = {}, t = {};
  for (let r of e) for (let o in r) o.startsWith("on") && typeof r[o] == "function" ? (t[o] != null || (t[o] = []), t[o].push(r[o])) : n[o] = r[o];
  for (let r in t) Object.assign(n, { [r](...o) {
    let i = t[r];
    for (let s of i) s == null || s(...o);
  } });
  return n;
}
function le(e) {
  var n;
  return Object.assign(Fn(e), { displayName: (n = e.displayName) != null ? n : e.name });
}
function me(e) {
  let n = Object.assign({}, e);
  for (let t in n) n[t] === void 0 && delete n[t];
  return n;
}
function Xe(e, n = []) {
  let t = Object.assign({}, e);
  for (let r of n) r in t && delete t[r];
  return t;
}
function vr(e) {
  return C.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
function Er(e, n, t) {
  let [r, o] = k(t), i = e !== void 0, s = I(i), l = I(!1), u = I(!1);
  return i && !s.current && !l.current ? (l.current = !0, s.current = i, console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")) : !i && s.current && !u.current && (u.current = !0, s.current = i, console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")), [i ? e : r, w((a) => (i || o(a), n == null ? void 0 : n(a)))];
}
function yr(e) {
  let [n] = k(e);
  return n;
}
function ln(e = {}, n = null, t = []) {
  for (let [r, o] of Object.entries(e)) un(t, sn(n, r), o);
  return t;
}
function sn(e, n) {
  return e ? e + "[" + n + "]" : n;
}
function un(e, n, t) {
  if (Array.isArray(t)) for (let [r, o] of t.entries()) un(e, sn(n, r.toString()), o);
  else t instanceof Date ? e.push([n, t.toISOString()]) : typeof t == "boolean" ? e.push([n, t ? "1" : "0"]) : typeof t == "string" ? e.push([n, t]) : typeof t == "number" ? e.push([n, `${t}`]) : t == null ? e.push([n, ""]) : ln(t, n, e);
}
let xr = "span";
var mt = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(mt || {});
function wr(e, n) {
  var t;
  let { features: r = 1, ...o } = e, i = { ref: n, "aria-hidden": (r & 2) === 2 ? !0 : (t = o["aria-hidden"]) != null ? t : void 0, hidden: (r & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
  return ie()({ ourProps: i, theirProps: o, slot: {}, defaultTag: xr, name: "Hidden" });
}
let an = le(wr), $r = J(null);
function Sr({ children: e }) {
  let n = V($r);
  if (!n) return C.createElement(C.Fragment, null, e);
  let { target: t } = n;
  return t ? Ut(C.createElement(C.Fragment, null, e), t) : null;
}
function Or({ data: e, form: n, disabled: t, onReset: r, overrides: o }) {
  let [i, s] = k(null), l = Ne();
  return B(() => {
    if (r && i) return l.addEventListener(i, "reset", r);
  }, [i, n, r]), C.createElement(Sr, null, C.createElement(Tr, { setForm: s, formId: n }), ln(e).map(([u, a]) => C.createElement(an, { features: mt.Hidden, ...me({ key: u, as: "input", type: "hidden", hidden: !0, readOnly: !0, form: n, disabled: t, name: u, value: a, ...o }) })));
}
function Tr({ setForm: e, formId: n }) {
  return B(() => {
    if (n) {
      let t = document.getElementById(n);
      t && e(t);
    }
  }, [e, n]), n ? null : C.createElement(an, { features: mt.Hidden, as: "input", type: "hidden", hidden: !0, readOnly: !0, ref: (t) => {
    if (!t) return;
    let r = t.closest("form");
    r && e(r);
  } });
}
let Cr = J(void 0);
function cn() {
  return V(Cr);
}
function Ir(e) {
  let n = e.parentElement, t = null;
  for (; n && !(n instanceof HTMLFieldSetElement); ) n instanceof HTMLLegendElement && (t = n), n = n.parentElement;
  let r = (n == null ? void 0 : n.getAttribute("disabled")) === "";
  return r && Pr(t) ? !1 : r;
}
function Pr(e) {
  if (!e) return !1;
  let n = e.previousElementSibling;
  for (; n !== null; ) {
    if (n instanceof HTMLLegendElement) return !1;
    n = n.previousElementSibling;
  }
  return !0;
}
let dn = Symbol();
function Mr(e, n = !0) {
  return Object.assign(e, { [dn]: n });
}
function de(...e) {
  let n = I(e);
  B(() => {
    n.current = e;
  }, [e]);
  let t = w((r) => {
    for (let o of n.current) o != null && (typeof o == "function" ? o(r) : o.current = r);
  });
  return e.every((r) => r == null || (r == null ? void 0 : r[dn])) ? void 0 : t;
}
let ht = J(null);
ht.displayName = "DescriptionContext";
function fn() {
  let e = V(ht);
  if (e === null) {
    let n = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(n, fn), n;
  }
  return e;
}
function Fr() {
  var e, n;
  return (n = (e = V(ht)) == null ? void 0 : e.value) != null ? n : void 0;
}
let Rr = "p";
function Lr(e, n) {
  let t = we(), r = ft(), { id: o = `headlessui-description-${t}`, ...i } = e, s = fn(), l = de(n);
  L(() => s.register(o), [o, s.register]);
  let u = r || !1, a = A(() => ({ ...s.slot, disabled: u }), [s.slot, u]), d = { ref: l, ...s.props, id: o };
  return ie()({ ourProps: d, theirProps: i, slot: a, defaultTag: Rr, name: s.name || "Description" });
}
let Ar = le(Lr);
Object.assign(Ar, {});
var Y = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Y || {});
let Ve = J(null);
Ve.displayName = "LabelContext";
function pn() {
  let e = V(Ve);
  if (e === null) {
    let n = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(n, pn), n;
  }
  return e;
}
function We(e) {
  var n, t, r;
  let o = (t = (n = V(Ve)) == null ? void 0 : n.value) != null ? t : void 0;
  return ((r = e == null ? void 0 : e.length) != null ? r : 0) > 0 ? [o, ...e].filter(Boolean).join(" ") : o;
}
function Dr({ inherit: e = !1 } = {}) {
  let n = We(), [t, r] = k([]), o = e ? [n, ...t].filter(Boolean) : t;
  return [o.length > 0 ? o.join(" ") : void 0, A(() => function(i) {
    let s = w((u) => (r((a) => [...a, u]), () => r((a) => {
      let d = a.slice(), f = d.indexOf(u);
      return f !== -1 && d.splice(f, 1), d;
    }))), l = A(() => ({ register: s, slot: i.slot, name: i.name, props: i.props, value: i.value }), [s, i.slot, i.name, i.props, i.value]);
    return C.createElement(Ve.Provider, { value: l }, i.children);
  }, [r])];
}
let Nr = "label";
function Hr(e, n) {
  var t;
  let r = we(), o = pn(), i = cn(), s = ft(), { id: l = `headlessui-label-${r}`, htmlFor: u = i ?? ((t = o.props) == null ? void 0 : t.htmlFor), passive: a = !1, ...d } = e, f = de(n);
  L(() => o.register(l), [l, o.register]);
  let p = w((g) => {
    let E = g.currentTarget;
    if (E instanceof HTMLLabelElement && g.preventDefault(), o.props && "onClick" in o.props && typeof o.props.onClick == "function" && o.props.onClick(g), E instanceof HTMLLabelElement) {
      let $ = document.getElementById(E.htmlFor);
      if ($) {
        let b = $.getAttribute("disabled");
        if (b === "true" || b === "") return;
        let T = $.getAttribute("aria-disabled");
        if (T === "true" || T === "") return;
        ($ instanceof HTMLInputElement && ($.type === "radio" || $.type === "checkbox") || $.role === "radio" || $.role === "checkbox" || $.role === "switch") && $.click(), $.focus({ preventScroll: !0 });
      }
    }
  }), c = s || !1, m = A(() => ({ ...o.slot, disabled: c }), [o.slot, c]), h = { ref: f, ...o.props, id: l, htmlFor: u, onClick: p };
  return a && ("onClick" in h && (delete h.htmlFor, delete h.onClick), "onClick" in d && delete d.onClick), ie()({ ourProps: h, theirProps: d, slot: m, defaultTag: u ? Nr : "div", name: o.name || "Label" });
}
let kr = le(Hr), _r = Object.assign(kr, {});
function Se(e, n, t) {
  let r = t.initialDeps ?? [], o;
  return () => {
    var i, s, l, u;
    let a;
    t.key && ((i = t.debug) != null && i.call(t)) && (a = Date.now());
    const d = e();
    if (!(d.length !== r.length || d.some((c, m) => r[m] !== c)))
      return o;
    r = d;
    let p;
    if (t.key && ((s = t.debug) != null && s.call(t)) && (p = Date.now()), o = n(...d), t.key && ((l = t.debug) != null && l.call(t))) {
      const c = Math.round((Date.now() - a) * 100) / 100, m = Math.round((Date.now() - p) * 100) / 100, h = m / 16, g = (E, $) => {
        for (E = String(E); E.length < $; )
          E = " " + E;
        return E;
      };
      console.info(
        `%c⏱ ${g(m, 5)} /${g(c, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * h, 120)
        )}deg 100% 31%);`,
        t == null ? void 0 : t.key
      );
    }
    return (u = t == null ? void 0 : t.onChange) == null || u.call(t, o), o;
  };
}
function Je(e, n) {
  if (e === void 0)
    throw new Error("Unexpected undefined");
  return e;
}
const jr = (e, n) => Math.abs(e - n) < 1, zr = (e, n, t) => {
  let r;
  return function(...o) {
    e.clearTimeout(r), r = e.setTimeout(() => n.apply(this, o), t);
  };
}, Br = (e) => e, Vr = (e) => {
  const n = Math.max(e.startIndex - e.overscan, 0), t = Math.min(e.endIndex + e.overscan, e.count - 1), r = [];
  for (let o = n; o <= t; o++)
    r.push(o);
  return r;
}, Wr = (e, n) => {
  const t = e.scrollElement;
  if (!t)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  const o = (s) => {
    const { width: l, height: u } = s;
    n({ width: Math.round(l), height: Math.round(u) });
  };
  if (o(t.getBoundingClientRect()), !r.ResizeObserver)
    return () => {
    };
  const i = new r.ResizeObserver((s) => {
    const l = () => {
      const u = s[0];
      if (u != null && u.borderBoxSize) {
        const a = u.borderBoxSize[0];
        if (a) {
          o({ width: a.inlineSize, height: a.blockSize });
          return;
        }
      }
      o(t.getBoundingClientRect());
    };
    e.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(l) : l();
  });
  return i.observe(t, { box: "border-box" }), () => {
    i.unobserve(t);
  };
}, St = {
  passive: !0
}, Ot = typeof window > "u" ? !0 : "onscrollend" in window, Ur = (e, n) => {
  const t = e.scrollElement;
  if (!t)
    return;
  const r = e.targetWindow;
  if (!r)
    return;
  let o = 0;
  const i = e.options.useScrollendEvent && Ot ? () => {
  } : zr(
    r,
    () => {
      n(o, !1);
    },
    e.options.isScrollingResetDelay
  ), s = (d) => () => {
    const { horizontal: f, isRtl: p } = e.options;
    o = f ? t.scrollLeft * (p && -1 || 1) : t.scrollTop, i(), n(o, d);
  }, l = s(!0), u = s(!1);
  u(), t.addEventListener("scroll", l, St);
  const a = e.options.useScrollendEvent && Ot;
  return a && t.addEventListener("scrollend", u, St), () => {
    t.removeEventListener("scroll", l), a && t.removeEventListener("scrollend", u);
  };
}, Kr = (e, n, t) => {
  if (n != null && n.borderBoxSize) {
    const r = n.borderBoxSize[0];
    if (r)
      return Math.round(
        r[t.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  return Math.round(
    e.getBoundingClientRect()[t.options.horizontal ? "width" : "height"]
  );
}, Yr = (e, {
  adjustments: n = 0,
  behavior: t
}, r) => {
  var o, i;
  const s = e + n;
  (i = (o = r.scrollElement) == null ? void 0 : o.scrollTo) == null || i.call(o, {
    [r.options.horizontal ? "left" : "top"]: s,
    behavior: t
  });
};
class Gr {
  constructor(n) {
    this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.scrollToIndexTimeoutId = null, this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = /* @__PURE__ */ new Map(), this.observer = /* @__PURE__ */ (() => {
      let t = null;
      const r = () => t || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : t = new this.targetWindow.ResizeObserver((o) => {
        o.forEach((i) => {
          const s = () => {
            this._measureElement(i.target, i);
          };
          this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(s) : s();
        });
      }));
      return {
        disconnect: () => {
          var o;
          (o = r()) == null || o.disconnect(), t = null;
        },
        observe: (o) => {
          var i;
          return (i = r()) == null ? void 0 : i.observe(o, { box: "border-box" });
        },
        unobserve: (o) => {
          var i;
          return (i = r()) == null ? void 0 : i.unobserve(o);
        }
      };
    })(), this.range = null, this.setOptions = (t) => {
      Object.entries(t).forEach(([r, o]) => {
        typeof o > "u" && delete t[r];
      }), this.options = {
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: Br,
        rangeExtractor: Vr,
        onChange: () => {
        },
        measureElement: Kr,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: !0,
        isRtl: !1,
        useScrollendEvent: !0,
        useAnimationFrameWithResizeObserver: !1,
        ...t
      };
    }, this.notify = (t) => {
      var r, o;
      (o = (r = this.options).onChange) == null || o.call(r, this, t);
    }, this.maybeNotify = Se(
      () => (this.calculateRange(), [
        this.isScrolling,
        this.range ? this.range.startIndex : null,
        this.range ? this.range.endIndex : null
      ]),
      (t) => {
        this.notify(t);
      },
      {
        key: process.env.NODE_ENV !== "production" && "maybeNotify",
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    ), this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((t) => t()), this.unsubs = [], this.observer.disconnect(), this.scrollElement = null, this.targetWindow = null;
    }, this._didMount = () => () => {
      this.cleanup();
    }, this._willUpdate = () => {
      var t;
      const r = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== r) {
        if (this.cleanup(), !r) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = r, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = ((t = this.scrollElement) == null ? void 0 : t.window) ?? null, this.elementsCache.forEach((o) => {
          this.observer.observe(o);
        }), this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        }), this.unsubs.push(
          this.options.observeElementRect(this, (o) => {
            this.scrollRect = o, this.maybeNotify();
          })
        ), this.unsubs.push(
          this.options.observeElementOffset(this, (o, i) => {
            this.scrollAdjustments = 0, this.scrollDirection = i ? this.getScrollOffset() < o ? "forward" : "backward" : null, this.scrollOffset = o, this.isScrolling = i, this.maybeNotify();
          })
        );
      }
    }, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (t, r) => {
      const o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
      for (let s = r - 1; s >= 0; s--) {
        const l = t[s];
        if (o.has(l.lane))
          continue;
        const u = i.get(
          l.lane
        );
        if (u == null || l.end > u.end ? i.set(l.lane, l) : l.end < u.end && o.set(l.lane, !0), o.size === this.options.lanes)
          break;
      }
      return i.size === this.options.lanes ? Array.from(i.values()).sort((s, l) => s.end === l.end ? s.index - l.index : s.end - l.end)[0] : void 0;
    }, this.getMeasurementOptions = Se(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled
      ],
      (t, r, o, i, s) => (this.pendingMeasuredCacheIndexes = [], {
        count: t,
        paddingStart: r,
        scrollMargin: o,
        getItemKey: i,
        enabled: s
      }),
      {
        key: !1
      }
    ), this.getMeasurements = Se(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count: t, paddingStart: r, scrollMargin: o, getItemKey: i, enabled: s }, l) => {
        if (!s)
          return this.measurementsCache = [], this.itemSizeCache.clear(), [];
        this.measurementsCache.length === 0 && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((d) => {
          this.itemSizeCache.set(d.key, d.size);
        }));
        const u = this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        const a = this.measurementsCache.slice(0, u);
        for (let d = u; d < t; d++) {
          const f = i(d), p = this.options.lanes === 1 ? a[d - 1] : this.getFurthestMeasurement(a, d), c = p ? p.end + this.options.gap : r + o, m = l.get(f), h = typeof m == "number" ? m : this.options.estimateSize(d), g = c + h, E = p ? p.lane : d % this.options.lanes;
          a[d] = {
            index: d,
            start: c,
            size: h,
            end: g,
            key: f,
            lane: E
          };
        }
        return this.measurementsCache = a, a;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getMeasurements",
        debug: () => this.options.debug
      }
    ), this.calculateRange = Se(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (t, r, o, i) => this.range = t.length > 0 && r > 0 ? qr({
        measurements: t,
        outerSize: r,
        scrollOffset: o,
        lanes: i
      }) : null,
      {
        key: process.env.NODE_ENV !== "production" && "calculateRange",
        debug: () => this.options.debug
      }
    ), this.getVirtualIndexes = Se(
      () => {
        let t = null, r = null;
        const o = this.calculateRange();
        return o && (t = o.startIndex, r = o.endIndex), [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          t,
          r
        ];
      },
      (t, r, o, i, s) => i === null || s === null ? [] : t({
        startIndex: i,
        endIndex: s,
        overscan: r,
        count: o
      }),
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualIndexes",
        debug: () => this.options.debug
      }
    ), this.indexFromElement = (t) => {
      const r = this.options.indexAttribute, o = t.getAttribute(r);
      return o ? parseInt(o, 10) : (console.warn(
        `Missing attribute name '${r}={index}' on measured element.`
      ), -1);
    }, this._measureElement = (t, r) => {
      const o = this.indexFromElement(t), i = this.measurementsCache[o];
      if (!i)
        return;
      const s = i.key, l = this.elementsCache.get(s);
      l !== t && (l && this.observer.unobserve(l), this.observer.observe(t), this.elementsCache.set(s, t)), t.isConnected && this.resizeItem(o, this.options.measureElement(t, r, this));
    }, this.resizeItem = (t, r) => {
      const o = this.measurementsCache[t];
      if (!o)
        return;
      const i = this.itemSizeCache.get(o.key) ?? o.size, s = r - i;
      s !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(o, s, this) : o.start < this.getScrollOffset() + this.scrollAdjustments) && (process.env.NODE_ENV !== "production" && this.options.debug && console.info("correction", s), this._scrollToOffset(this.getScrollOffset(), {
        adjustments: this.scrollAdjustments += s,
        behavior: void 0
      })), this.pendingMeasuredCacheIndexes.push(o.index), this.itemSizeCache = new Map(this.itemSizeCache.set(o.key, r)), this.notify(!1));
    }, this.measureElement = (t) => {
      if (!t) {
        this.elementsCache.forEach((r, o) => {
          r.isConnected || (this.observer.unobserve(r), this.elementsCache.delete(o));
        });
        return;
      }
      this._measureElement(t, void 0);
    }, this.getVirtualItems = Se(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (t, r) => {
        const o = [];
        for (let i = 0, s = t.length; i < s; i++) {
          const l = t[i], u = r[l];
          o.push(u);
        }
        return o;
      },
      {
        key: process.env.NODE_ENV !== "production" && "getVirtualItems",
        debug: () => this.options.debug
      }
    ), this.getVirtualItemForOffset = (t) => {
      const r = this.getMeasurements();
      if (r.length !== 0)
        return Je(
          r[mn(
            0,
            r.length - 1,
            (o) => Je(r[o]).start,
            t
          )]
        );
    }, this.getOffsetForAlignment = (t, r, o = 0) => {
      const i = this.getSize(), s = this.getScrollOffset();
      r === "auto" && (r = t >= s + i ? "end" : "start"), r === "center" ? t += (o - i) / 2 : r === "end" && (t -= i);
      const l = this.options.horizontal ? "scrollWidth" : "scrollHeight", a = (this.scrollElement ? "document" in this.scrollElement ? this.scrollElement.document.documentElement[l] : this.scrollElement[l] : 0) - i;
      return Math.max(Math.min(a, t), 0);
    }, this.getOffsetForIndex = (t, r = "auto") => {
      t = Math.max(0, Math.min(t, this.options.count - 1));
      const o = this.measurementsCache[t];
      if (!o)
        return;
      const i = this.getSize(), s = this.getScrollOffset();
      if (r === "auto")
        if (o.end >= s + i - this.options.scrollPaddingEnd)
          r = "end";
        else if (o.start <= s + this.options.scrollPaddingStart)
          r = "start";
        else
          return [s, r];
      const l = r === "end" ? o.end + this.options.scrollPaddingEnd : o.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(l, r, o.size),
        r
      ];
    }, this.isDynamicMode = () => this.elementsCache.size > 0, this.cancelScrollToIndex = () => {
      this.scrollToIndexTimeoutId !== null && this.targetWindow && (this.targetWindow.clearTimeout(this.scrollToIndexTimeoutId), this.scrollToIndexTimeoutId = null);
    }, this.scrollToOffset = (t, { align: r = "start", behavior: o } = {}) => {
      this.cancelScrollToIndex(), o === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getOffsetForAlignment(t, r), {
        adjustments: void 0,
        behavior: o
      });
    }, this.scrollToIndex = (t, { align: r = "auto", behavior: o } = {}) => {
      t = Math.max(0, Math.min(t, this.options.count - 1)), this.cancelScrollToIndex(), o === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      );
      const i = this.getOffsetForIndex(t, r);
      if (!i) return;
      const [s, l] = i;
      this._scrollToOffset(s, { adjustments: void 0, behavior: o }), o !== "smooth" && this.isDynamicMode() && this.targetWindow && (this.scrollToIndexTimeoutId = this.targetWindow.setTimeout(() => {
        if (this.scrollToIndexTimeoutId = null, this.elementsCache.has(
          this.options.getItemKey(t)
        )) {
          const [a] = Je(
            this.getOffsetForIndex(t, l)
          );
          jr(a, this.getScrollOffset()) || this.scrollToIndex(t, { align: l, behavior: o });
        } else
          this.scrollToIndex(t, { align: l, behavior: o });
      }));
    }, this.scrollBy = (t, { behavior: r } = {}) => {
      this.cancelScrollToIndex(), r === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getScrollOffset() + t, {
        adjustments: void 0,
        behavior: r
      });
    }, this.getTotalSize = () => {
      var t;
      const r = this.getMeasurements();
      let o;
      return r.length === 0 ? o = this.options.paddingStart : o = this.options.lanes === 1 ? ((t = r[r.length - 1]) == null ? void 0 : t.end) ?? 0 : Math.max(
        ...r.slice(-this.options.lanes).map((i) => i.end)
      ), Math.max(
        o - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    }, this._scrollToOffset = (t, {
      adjustments: r,
      behavior: o
    }) => {
      this.options.scrollToFn(t, { behavior: o, adjustments: r }, this);
    }, this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map(), this.notify(!1);
    }, this.setOptions(n);
  }
}
const mn = (e, n, t, r) => {
  for (; e <= n; ) {
    const o = (e + n) / 2 | 0, i = t(o);
    if (i < r)
      e = o + 1;
    else if (i > r)
      n = o - 1;
    else
      return o;
  }
  return e > 0 ? e - 1 : 0;
};
function qr({
  measurements: e,
  outerSize: n,
  scrollOffset: t,
  lanes: r
}) {
  const o = e.length - 1;
  let s = mn(
    0,
    o,
    (u) => e[u].start,
    t
  ), l = s;
  for (; l < o && e[l].end < t + n; )
    l++;
  return r > 1 && (s = Math.max(0, s - s % r), l = Math.min(o, l + (r - 1 - l % r))), { startIndex: s, endIndex: l };
}
const Tt = typeof document < "u" ? y.useLayoutEffect : y.useEffect;
function Xr(e) {
  const n = y.useReducer(() => ({}), {})[1], t = {
    ...e,
    onChange: (o, i) => {
      var s;
      i ? ge(n) : n(), (s = e.onChange) == null || s.call(e, o, i);
    }
  }, [r] = y.useState(
    () => new Gr(t)
  );
  return r.setOptions(t), Tt(() => r._didMount(), []), Tt(() => r._willUpdate()), r;
}
function Jr(e) {
  return Xr({
    observeElementRect: Wr,
    observeElementOffset: Ur,
    scrollToFn: Yr,
    ...e
  });
}
function Qr(e, n) {
  return e !== null && n !== null && typeof e == "object" && typeof n == "object" && "id" in e && "id" in n ? e.id === n.id : e === n;
}
function Zr(e = Qr) {
  return D((n, t) => {
    if (typeof e == "string") {
      let r = e;
      return (n == null ? void 0 : n[r]) === (t == null ? void 0 : t[r]);
    }
    return e(n, t);
  }, [e]);
}
function eo(e) {
  if (e === null) return { width: 0, height: 0 };
  let { width: n, height: t } = e.getBoundingClientRect();
  return { width: n, height: t };
}
function Ct(e, n = !1) {
  let [t, r] = Wt(() => ({}), {}), o = A(() => eo(e), [e, t]);
  return L(() => {
    if (!e) return;
    let i = new ResizeObserver(r);
    return i.observe(e), () => {
      i.disconnect();
    };
  }, [e]), n ? { width: `${o.width}px`, height: `${o.height}px` } : o;
}
let to = class extends Map {
  constructor(n) {
    super(), this.factory = n;
  }
  get(n) {
    let t = super.get(n);
    return t === void 0 && (t = this.factory(n), this.set(n, t)), t;
  }
};
function hn(e, n) {
  let t = e(), r = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return t;
  }, subscribe(o) {
    return r.add(o), () => r.delete(o);
  }, dispatch(o, ...i) {
    let s = n[o].call(t, ...i);
    s && (t = s, r.forEach((l) => l()));
  } };
}
function gn(e) {
  return Dn(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let no = new to(() => hn(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let n = this.indexOf(e);
  if (n === -1) return this;
  let t = this.slice();
  return t.splice(n, 1), t;
} }));
function gt(e, n) {
  let t = no.get(n), r = we(), o = gn(t);
  if (L(() => {
    if (e) return t.dispatch("ADD", r), () => t.dispatch("REMOVE", r);
  }, [t, e]), !e) return !1;
  let i = o.indexOf(r), s = o.length;
  return i === -1 && (i = s, s += 1), i === s - 1;
}
let st = /* @__PURE__ */ new Map(), Pe = /* @__PURE__ */ new Map();
function It(e) {
  var n;
  let t = (n = Pe.get(e)) != null ? n : 0;
  return Pe.set(e, t + 1), t !== 0 ? () => Pt(e) : (st.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => Pt(e));
}
function Pt(e) {
  var n;
  let t = (n = Pe.get(e)) != null ? n : 1;
  if (t === 1 ? Pe.delete(e) : Pe.set(e, t - 1), t !== 1) return;
  let r = st.get(e);
  r && (r["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", r["aria-hidden"]), e.inert = r.inert, st.delete(e));
}
function ro(e, { allowed: n, disallowed: t } = {}) {
  let r = gt(e, "inert-others");
  L(() => {
    var o, i;
    if (!r) return;
    let s = ae();
    for (let u of (o = t == null ? void 0 : t()) != null ? o : []) u && s.add(It(u));
    let l = (i = n == null ? void 0 : n()) != null ? i : [];
    for (let u of l) {
      if (!u) continue;
      let a = De(u);
      if (!a) continue;
      let d = u.parentElement;
      for (; d && d !== a.body; ) {
        for (let f of d.children) l.some((p) => f.contains(p)) || s.add(It(f));
        d = d.parentElement;
      }
    }
    return s.dispose;
  }, [r, n, t]);
}
function oo(e, n, t) {
  let r = $e((o) => {
    let i = o.getBoundingClientRect();
    i.x === 0 && i.y === 0 && i.width === 0 && i.height === 0 && t();
  });
  B(() => {
    if (!e) return;
    let o = n === null ? null : n instanceof HTMLElement ? n : n.current;
    if (!o) return;
    let i = ae();
    if (typeof ResizeObserver < "u") {
      let s = new ResizeObserver(() => r.current(o));
      s.observe(o), i.add(() => s.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let s = new IntersectionObserver(() => r.current(o));
      s.observe(o), i.add(() => s.disconnect());
    }
    return () => i.dispose();
  }, [n, r, e]);
}
let ut = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var io = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(io || {}), lo = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(lo || {}), so = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(so || {}), bn = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(bn || {});
function uo(e, n = 0) {
  var t;
  return e === ((t = De(e)) == null ? void 0 : t.body) ? !1 : ce(n, { 0() {
    return e.matches(ut);
  }, 1() {
    let r = e;
    for (; r !== null; ) {
      if (r.matches(ut)) return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var ao = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(ao || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function co(e, n = (t) => t) {
  return e.slice().sort((t, r) => {
    let o = n(t), i = n(r);
    if (o === null || i === null) return 0;
    let s = o.compareDocumentPosition(i);
    return s & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : s & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function vn() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function fo() {
  return /Android/gi.test(window.navigator.userAgent);
}
function En() {
  return vn() || fo();
}
function Te(e, n, t, r) {
  let o = $e(t);
  B(() => {
    if (!e) return;
    function i(s) {
      o.current(s);
    }
    return document.addEventListener(n, i, r), () => document.removeEventListener(n, i, r);
  }, [e, n, r]);
}
function po(e, n, t, r) {
  let o = $e(t);
  B(() => {
    if (!e) return;
    function i(s) {
      o.current(s);
    }
    return window.addEventListener(n, i, r), () => window.removeEventListener(n, i, r);
  }, [e, n, r]);
}
const Mt = 30;
function mo(e, n, t) {
  let r = gt(e, "outside-click"), o = $e(t), i = D(function(u, a) {
    if (u.defaultPrevented) return;
    let d = a(u);
    if (d === null || !d.getRootNode().contains(d) || !d.isConnected) return;
    let f = function p(c) {
      return typeof c == "function" ? p(c()) : Array.isArray(c) || c instanceof Set ? c : [c];
    }(n);
    for (let p of f) if (p !== null && (p.contains(d) || u.composed && u.composedPath().includes(p))) return;
    return !uo(d, bn.Loose) && d.tabIndex !== -1 && u.preventDefault(), o.current(u, d);
  }, [o, n]), s = I(null);
  Te(r, "pointerdown", (u) => {
    var a, d;
    s.current = ((d = (a = u.composedPath) == null ? void 0 : a.call(u)) == null ? void 0 : d[0]) || u.target;
  }, !0), Te(r, "mousedown", (u) => {
    var a, d;
    s.current = ((d = (a = u.composedPath) == null ? void 0 : a.call(u)) == null ? void 0 : d[0]) || u.target;
  }, !0), Te(r, "click", (u) => {
    En() || s.current && (i(u, () => s.current), s.current = null);
  }, !0);
  let l = I({ x: 0, y: 0 });
  Te(r, "touchstart", (u) => {
    l.current.x = u.touches[0].clientX, l.current.y = u.touches[0].clientY;
  }, !0), Te(r, "touchend", (u) => {
    let a = { x: u.changedTouches[0].clientX, y: u.changedTouches[0].clientY };
    if (!(Math.abs(a.x - l.current.x) >= Mt || Math.abs(a.y - l.current.y) >= Mt)) return i(u, () => u.target instanceof HTMLElement ? u.target : null);
  }, !0), po(r, "blur", (u) => i(u, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Ue(...e) {
  return A(() => De(...e), [...e]);
}
function ho(e, n, t, r) {
  let o = $e(t);
  B(() => {
    e = e ?? window;
    function i(s) {
      o.current(s);
    }
    return e.addEventListener(n, i, r), () => e.removeEventListener(n, i, r);
  }, [e, n, r]);
}
function yn(e) {
  let n = I({ value: "", selectionStart: null, selectionEnd: null });
  return ho(e, "blur", (t) => {
    let r = t.target;
    r instanceof HTMLInputElement && (n.current = { value: r.value, selectionStart: r.selectionStart, selectionEnd: r.selectionEnd });
  }), w(() => {
    if (document.activeElement !== e && e instanceof HTMLInputElement && e.isConnected) {
      if (e.focus({ preventScroll: !0 }), e.value !== n.current.value) e.setSelectionRange(e.value.length, e.value.length);
      else {
        let { selectionStart: t, selectionEnd: r } = n.current;
        t !== null && r !== null && e.setSelectionRange(t, r);
      }
      n.current = { value: "", selectionStart: null, selectionEnd: null };
    }
  });
}
function go(e, n) {
  return A(() => {
    var t;
    if (e.type) return e.type;
    let r = (t = e.as) != null ? t : "button";
    if (typeof r == "string" && r.toLowerCase() === "button" || (n == null ? void 0 : n.tagName) === "BUTTON" && !n.hasAttribute("type")) return "button";
  }, [e.type, e.as, n]);
}
function bo() {
  let e;
  return { before({ doc: n }) {
    var t;
    let r = n.documentElement, o = (t = n.defaultView) != null ? t : window;
    e = Math.max(0, o.innerWidth - r.clientWidth);
  }, after({ doc: n, d: t }) {
    let r = n.documentElement, o = Math.max(0, r.clientWidth - r.offsetWidth), i = Math.max(0, e - o);
    t.style(r, "paddingRight", `${i}px`);
  } };
}
function vo() {
  return vn() ? { before({ doc: e, d: n, meta: t }) {
    function r(o) {
      return t.containers.flatMap((i) => i()).some((i) => i.contains(o));
    }
    n.microTask(() => {
      var o;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let l = ae();
        l.style(e.documentElement, "scrollBehavior", "auto"), n.add(() => n.microTask(() => l.dispose()));
      }
      let i = (o = window.scrollY) != null ? o : window.pageYOffset, s = null;
      n.addEventListener(e, "click", (l) => {
        if (l.target instanceof HTMLElement) try {
          let u = l.target.closest("a");
          if (!u) return;
          let { hash: a } = new URL(u.href), d = e.querySelector(a);
          d && !r(d) && (s = d);
        } catch {
        }
      }, !0), n.addEventListener(e, "touchstart", (l) => {
        if (l.target instanceof HTMLElement) if (r(l.target)) {
          let u = l.target;
          for (; u.parentElement && r(u.parentElement); ) u = u.parentElement;
          n.style(u, "overscrollBehavior", "contain");
        } else n.style(l.target, "touchAction", "none");
      }), n.addEventListener(e, "touchmove", (l) => {
        if (l.target instanceof HTMLElement) {
          if (l.target.tagName === "INPUT") return;
          if (r(l.target)) {
            let u = l.target;
            for (; u.parentElement && u.dataset.headlessuiPortal !== "" && !(u.scrollHeight > u.clientHeight || u.scrollWidth > u.clientWidth); ) u = u.parentElement;
            u.dataset.headlessuiPortal === "" && l.preventDefault();
          } else l.preventDefault();
        }
      }, { passive: !1 }), n.add(() => {
        var l;
        let u = (l = window.scrollY) != null ? l : window.pageYOffset;
        i !== u && window.scrollTo(0, i), s && s.isConnected && (s.scrollIntoView({ block: "nearest" }), s = null);
      });
    });
  } } : {};
}
function Eo() {
  return { before({ doc: e, d: n }) {
    n.style(e.documentElement, "overflow", "hidden");
  } };
}
function yo(e) {
  let n = {};
  for (let t of e) Object.assign(n, t(n));
  return n;
}
let ve = hn(() => /* @__PURE__ */ new Map(), { PUSH(e, n) {
  var t;
  let r = (t = this.get(e)) != null ? t : { doc: e, count: 0, d: ae(), meta: /* @__PURE__ */ new Set() };
  return r.count++, r.meta.add(n), this.set(e, r), this;
}, POP(e, n) {
  let t = this.get(e);
  return t && (t.count--, t.meta.delete(n)), this;
}, SCROLL_PREVENT({ doc: e, d: n, meta: t }) {
  let r = { doc: e, d: n, meta: yo(t) }, o = [vo(), bo(), Eo()];
  o.forEach(({ before: i }) => i == null ? void 0 : i(r)), o.forEach(({ after: i }) => i == null ? void 0 : i(r));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
ve.subscribe(() => {
  let e = ve.getSnapshot(), n = /* @__PURE__ */ new Map();
  for (let [t] of e) n.set(t, t.documentElement.style.overflow);
  for (let t of e.values()) {
    let r = n.get(t.doc) === "hidden", o = t.count !== 0;
    (o && !r || !o && r) && ve.dispatch(t.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t), t.count === 0 && ve.dispatch("TEARDOWN", t);
  }
});
function xo(e, n, t = () => ({ containers: [] })) {
  let r = gn(ve), o = n ? r.get(n) : void 0, i = o ? o.count > 0 : !1;
  return L(() => {
    if (!(!n || !e)) return ve.dispatch("PUSH", n, t), () => ve.dispatch("POP", n, t);
  }, [e, n]), i;
}
function wo(e, n, t = () => [document.body]) {
  let r = gt(e, "scroll-lock");
  xo(r, n, (o) => {
    var i;
    return { containers: [...(i = o.containers) != null ? i : [], t] };
  });
}
function Ft(e) {
  return [e.screenX, e.screenY];
}
function $o() {
  let e = I([-1, -1]);
  return { wasMoved(n) {
    let t = Ft(n);
    return e.current[0] === t[0] && e.current[1] === t[1] ? !1 : (e.current = t, !0);
  }, update(n) {
    e.current = Ft(n);
  } };
}
function So(e = 0) {
  let [n, t] = k(e), r = D((u) => t(u), [n]), o = D((u) => t((a) => a | u), [n]), i = D((u) => (n & u) === u, [n]), s = D((u) => t((a) => a & ~u), [t]), l = D((u) => t((a) => a ^ u), [t]);
  return { flags: n, setFlag: r, addFlag: o, hasFlag: i, removeFlag: s, toggleFlag: l };
}
var Rt, Lt;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Rt = process == null ? void 0 : process.env) == null ? void 0 : Rt.NODE_ENV) === "test" && typeof ((Lt = Element == null ? void 0 : Element.prototype) == null ? void 0 : Lt.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var Oo = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(Oo || {});
function To(e) {
  let n = {};
  for (let t in e) e[t] === !0 && (n[`data-${t}`] = "");
  return n;
}
function Co(e, n, t, r) {
  let [o, i] = k(t), { hasFlag: s, addFlag: l, removeFlag: u } = So(e && o ? 3 : 0), a = I(!1), d = I(!1), f = Ne();
  return L(() => {
    var p;
    if (e) {
      if (t && i(!0), !n) {
        t && l(3);
        return;
      }
      return (p = void 0) == null || p.call(r, t), Io(n, { inFlight: a, prepare() {
        d.current ? d.current = !1 : d.current = a.current, a.current = !0, !d.current && (t ? (l(3), u(4)) : (l(4), u(2)));
      }, run() {
        d.current ? t ? (u(3), l(4)) : (u(4), l(3)) : t ? u(1) : l(1);
      }, done() {
        var c;
        d.current && typeof n.getAnimations == "function" && n.getAnimations().length > 0 || (a.current = !1, u(7), t || i(!1), (c = void 0) == null || c.call(r, t));
      } });
    }
  }, [e, t, n, f]), e ? [o, { closed: s(1), enter: s(2), leave: s(4), transition: s(2) || s(4) }] : [t, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function Io(e, { prepare: n, run: t, done: r, inFlight: o }) {
  let i = ae();
  return Mo(e, { prepare: n, inFlight: o }), i.nextFrame(() => {
    t(), i.requestAnimationFrame(() => {
      i.add(Po(e, r));
    });
  }), i.dispose;
}
function Po(e, n) {
  var t, r;
  let o = ae();
  if (!e) return o.dispose;
  let i = !1;
  o.add(() => {
    i = !0;
  });
  let s = (r = (t = e.getAnimations) == null ? void 0 : t.call(e).filter((l) => l instanceof CSSTransition)) != null ? r : [];
  return s.length === 0 ? (n(), o.dispose) : (Promise.allSettled(s.map((l) => l.finished)).then(() => {
    i || n();
  }), o.dispose);
}
function Mo(e, { inFlight: n, prepare: t }) {
  if (n != null && n.current) {
    t();
    return;
  }
  let r = e.style.transition;
  e.style.transition = "none", t(), e.offsetHeight, e.style.transition = r;
}
function Fo(e, { container: n, accept: t, walk: r }) {
  let o = I(t), i = I(r);
  B(() => {
    o.current = t, i.current = r;
  }, [t, r]), L(() => {
    if (!n || !e) return;
    let s = De(n);
    if (!s) return;
    let l = o.current, u = i.current, a = Object.assign((f) => l(f), { acceptNode: l }), d = s.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, a, !1);
    for (; d.nextNode(); ) u(d.currentNode);
  }, [n, e, o, i]);
}
function At(e, n) {
  let t = I([]), r = w(e);
  B(() => {
    let o = [...t.current];
    for (let [i, s] of n.entries()) if (t.current[i] !== s) {
      let l = r(n, o);
      return t.current = n, l;
    }
  }, [r, ...n]);
}
function Ro() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((n) => {
    let {
      brand: t,
      version: r
    } = n;
    return t + "/" + r;
  }).join(" ") : navigator.userAgent;
}
const xn = {
  ...y
}, Lo = xn.useInsertionEffect, Ao = Lo || ((e) => e());
function wn(e) {
  const n = y.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return Ao(() => {
    n.current = e;
  }), y.useCallback(function() {
    for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++)
      r[o] = arguments[o];
    return n.current == null ? void 0 : n.current(...r);
  }, []);
}
var at = typeof document < "u" ? Vt : B;
let Dt = !1, Do = 0;
const Nt = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + Do++
);
function No() {
  const [e, n] = y.useState(() => Dt ? Nt() : void 0);
  return at(() => {
    e == null && n(Nt());
  }, []), y.useEffect(() => {
    Dt = !0;
  }, []), e;
}
const Ho = xn.useId, ko = Ho || No;
let Me;
process.env.NODE_ENV !== "production" && (Me = /* @__PURE__ */ new Set());
function _o() {
  for (var e, n = arguments.length, t = new Array(n), r = 0; r < n; r++)
    t[r] = arguments[r];
  const o = "Floating UI: " + t.join(" ");
  if (!((e = Me) != null && e.has(o))) {
    var i;
    (i = Me) == null || i.add(o), console.warn(o);
  }
}
function jo() {
  for (var e, n = arguments.length, t = new Array(n), r = 0; r < n; r++)
    t[r] = arguments[r];
  const o = "Floating UI: " + t.join(" ");
  if (!((e = Me) != null && e.has(o))) {
    var i;
    (i = Me) == null || i.add(o), console.error(o);
  }
}
function zo() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(n, t) {
      var r;
      (r = e.get(n)) == null || r.forEach((o) => o(t));
    },
    on(n, t) {
      e.set(n, [...e.get(n) || [], t]);
    },
    off(n, t) {
      var r;
      e.set(n, ((r = e.get(n)) == null ? void 0 : r.filter((o) => o !== t)) || []);
    }
  };
}
const Bo = /* @__PURE__ */ y.createContext(null), Vo = /* @__PURE__ */ y.createContext(null), Wo = () => {
  var e;
  return ((e = y.useContext(Bo)) == null ? void 0 : e.id) || null;
}, Uo = () => y.useContext(Vo), Ko = "data-floating-ui-focusable";
function Yo(e) {
  const {
    open: n = !1,
    onOpenChange: t,
    elements: r
  } = e, o = ko(), i = y.useRef({}), [s] = y.useState(() => zo()), l = Wo() != null;
  if (process.env.NODE_ENV !== "production") {
    const c = r.reference;
    c && !Ce(c) && jo("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [u, a] = y.useState(r.reference), d = wn((c, m, h) => {
    i.current.openEvent = c ? m : void 0, s.emit("openchange", {
      open: c,
      event: m,
      reason: h,
      nested: l
    }), t == null || t(c, m, h);
  }), f = y.useMemo(() => ({
    setPositionReference: a
  }), []), p = y.useMemo(() => ({
    reference: u || r.reference || null,
    floating: r.floating || null,
    domReference: r.reference
  }), [u, r.reference, r.floating]);
  return y.useMemo(() => ({
    dataRef: i,
    open: n,
    onOpenChange: d,
    elements: p,
    events: s,
    floatingId: o,
    refs: f
  }), [n, d, p, s, o, f]);
}
function Go(e) {
  e === void 0 && (e = {});
  const {
    nodeId: n
  } = e, t = Yo({
    ...e,
    elements: {
      reference: null,
      floating: null,
      ...e.elements
    }
  }), r = e.rootContext || t, o = r.elements, [i, s] = y.useState(null), [l, u] = y.useState(null), d = (o == null ? void 0 : o.domReference) || i, f = y.useRef(null), p = Uo();
  at(() => {
    d && (f.current = d);
  }, [d]);
  const c = Hn({
    ...e,
    elements: {
      ...o,
      ...l && {
        reference: l
      }
    }
  }), m = y.useCallback((b) => {
    const T = Ce(b) ? {
      getBoundingClientRect: () => b.getBoundingClientRect(),
      contextElement: b
    } : b;
    u(T), c.refs.setReference(T);
  }, [c.refs]), h = y.useCallback((b) => {
    (Ce(b) || b === null) && (f.current = b, s(b)), (Ce(c.refs.reference.current) || c.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    b !== null && !Ce(b)) && c.refs.setReference(b);
  }, [c.refs]), g = y.useMemo(() => ({
    ...c.refs,
    setReference: h,
    setPositionReference: m,
    domReference: f
  }), [c.refs, h, m]), E = y.useMemo(() => ({
    ...c.elements,
    domReference: d
  }), [c.elements, d]), $ = y.useMemo(() => ({
    ...c,
    ...r,
    refs: g,
    elements: E,
    nodeId: n
  }), [c, g, E, n, r]);
  return at(() => {
    r.dataRef.current.floatingContext = $;
    const b = p == null ? void 0 : p.nodesRef.current.find((T) => T.id === n);
    b && (b.context = $);
  }), y.useMemo(() => ({
    ...c,
    context: $,
    refs: g,
    elements: E
  }), [c, g, E, $]);
}
const Ht = "active", kt = "selected";
function Qe(e, n, t) {
  const r = /* @__PURE__ */ new Map(), o = t === "item";
  let i = e;
  if (o && e) {
    const {
      [Ht]: s,
      [kt]: l,
      ...u
    } = e;
    i = u;
  }
  return {
    ...t === "floating" && {
      tabIndex: -1,
      [Ko]: ""
    },
    ...i,
    ...n.map((s) => {
      const l = s ? s[t] : null;
      return typeof l == "function" ? e ? l(e) : null : l;
    }).concat(e).reduce((s, l) => (l && Object.entries(l).forEach((u) => {
      let [a, d] = u;
      if (!(o && [Ht, kt].includes(a)))
        if (a.indexOf("on") === 0) {
          if (r.has(a) || r.set(a, []), typeof d == "function") {
            var f;
            (f = r.get(a)) == null || f.push(d), s[a] = function() {
              for (var p, c = arguments.length, m = new Array(c), h = 0; h < c; h++)
                m[h] = arguments[h];
              return (p = r.get(a)) == null ? void 0 : p.map((g) => g(...m)).find((g) => g !== void 0);
            };
          }
        } else
          s[a] = d;
    }), s), {})
  };
}
function qo(e) {
  e === void 0 && (e = []);
  const n = e.map((l) => l == null ? void 0 : l.reference), t = e.map((l) => l == null ? void 0 : l.floating), r = e.map((l) => l == null ? void 0 : l.item), o = y.useCallback(
    (l) => Qe(l, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n
  ), i = y.useCallback(
    (l) => Qe(l, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), s = y.useCallback(
    (l) => Qe(l, e, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    r
  );
  return y.useMemo(() => ({
    getReferenceProps: o,
    getFloatingProps: i,
    getItemProps: s
  }), [o, i, s]);
}
function _t(e, n) {
  return {
    ...e,
    rects: {
      ...e.rects,
      floating: {
        ...e.rects.floating,
        height: n
      }
    }
  };
}
const Xo = (e) => ({
  name: "inner",
  options: e,
  async fn(n) {
    const {
      listRef: t,
      overflowRef: r,
      onFallbackChange: o,
      offset: i = 0,
      index: s = 0,
      minItemsVisible: l = 4,
      referenceOverflowThreshold: u = 0,
      scrollRef: a,
      ...d
    } = kn(e, n), {
      rects: f,
      elements: {
        floating: p
      }
    } = n, c = t.current[s], m = (a == null ? void 0 : a.current) || p, h = p.clientTop || m.clientTop, g = p.clientTop !== 0, E = m.clientTop !== 0, $ = p === m;
    if (process.env.NODE_ENV !== "production" && (n.placement.startsWith("bottom") || _o('`placement` side must be "bottom" when using the `inner`', "middleware.")), !c)
      return {};
    const b = {
      ...n,
      ...await Kt(-c.offsetTop - p.clientTop - f.reference.height / 2 - c.offsetHeight / 2 - i).fn(n)
    }, T = await Ke(_t(b, m.scrollHeight + h + p.clientTop), d), M = await Ke(b, {
      ...d,
      elementContext: "reference"
    }), P = Ye(0, T.top), O = b.y + P, W = (m.scrollHeight > m.clientHeight ? (N) => N : jn)(Ye(0, m.scrollHeight + (g && $ || E ? h * 2 : 0) - P - Ye(0, T.bottom)));
    if (m.style.maxHeight = W + "px", m.scrollTop = P, o) {
      const N = m.offsetHeight < c.offsetHeight * _n(l, t.current.length) - 1 || M.top >= -u || M.bottom >= -u;
      tt.flushSync(() => o(N));
    }
    return r && (r.current = await Ke(_t({
      ...b,
      y: O
    }, m.offsetHeight + h + p.clientTop), d)), {
      y: O
    };
  }
});
function Jo(e, n) {
  const {
    open: t,
    elements: r
  } = e, {
    enabled: o = !0,
    overflowRef: i,
    scrollRef: s,
    onChange: l
  } = n, u = wn(l), a = y.useRef(!1), d = y.useRef(null), f = y.useRef(null);
  y.useEffect(() => {
    if (!o) return;
    function c(h) {
      if (h.ctrlKey || !m || i.current == null)
        return;
      const g = h.deltaY, E = i.current.top >= -0.5, $ = i.current.bottom >= -0.5, b = m.scrollHeight - m.clientHeight, T = g < 0 ? -1 : 1, M = g < 0 ? "max" : "min";
      m.scrollHeight <= m.clientHeight || (!E && g > 0 || !$ && g < 0 ? (h.preventDefault(), tt.flushSync(() => {
        u((P) => P + Math[M](g, b * T));
      })) : /firefox/i.test(Ro()) && (m.scrollTop += g));
    }
    const m = (s == null ? void 0 : s.current) || r.floating;
    if (t && m)
      return m.addEventListener("wheel", c), requestAnimationFrame(() => {
        d.current = m.scrollTop, i.current != null && (f.current = {
          ...i.current
        });
      }), () => {
        d.current = null, f.current = null, m.removeEventListener("wheel", c);
      };
  }, [o, t, r.floating, i, s, u]);
  const p = y.useMemo(() => ({
    onKeyDown() {
      a.current = !0;
    },
    onWheel() {
      a.current = !1;
    },
    onPointerMove() {
      a.current = !1;
    },
    onScroll() {
      const c = (s == null ? void 0 : s.current) || r.floating;
      if (!(!i.current || !c || !a.current)) {
        if (d.current !== null) {
          const m = c.scrollTop - d.current;
          (i.current.bottom < -0.5 && m < -1 || i.current.top < -0.5 && m > 1) && tt.flushSync(() => u((h) => h + m));
        }
        requestAnimationFrame(() => {
          d.current = c.scrollTop;
        });
      }
    }
  }), [r.floating, u, i, s]);
  return y.useMemo(() => o ? {
    floating: p
  } : {}, [o, p]);
}
let He = J({ styles: void 0, setReference: () => {
}, setFloating: () => {
}, getReferenceProps: () => ({}), getFloatingProps: () => ({}), slot: {} });
He.displayName = "FloatingContext";
let bt = J(null);
bt.displayName = "PlacementContext";
function Qo(e) {
  return A(() => e ? typeof e == "string" ? { to: e } : e : null, [e]);
}
function Zo() {
  return V(He).setReference;
}
function ei() {
  let { getFloatingProps: e, slot: n } = V(He);
  return D((...t) => Object.assign({}, e(...t), { "data-anchor": n.anchor }), [e, n]);
}
function ti(e = null) {
  e === !1 && (e = null), typeof e == "string" && (e = { to: e });
  let n = V(bt), t = A(() => e, [JSON.stringify(e, (o, i) => {
    var s;
    return (s = i == null ? void 0 : i.outerHTML) != null ? s : i;
  })]);
  L(() => {
    n == null || n(t ?? null);
  }, [n, t]);
  let r = V(He);
  return A(() => [r.setFloating, e ? r.styles : {}], [r.setFloating, e, r.styles]);
}
let jt = 4;
function ni({ children: e, enabled: n = !0 }) {
  let [t, r] = k(null), [o, i] = k(0), s = I(null), [l, u] = k(null);
  ri(l);
  let a = n && t !== null && l !== null, { to: d = "bottom", gap: f = 0, offset: p = 0, padding: c = 0, inner: m } = oi(t, l), [h, g = "center"] = d.split(" ");
  L(() => {
    a && i(0);
  }, [a]);
  let { refs: E, floatingStyles: $, context: b } = Go({ open: a, placement: h === "selection" ? g === "center" ? "bottom" : `bottom-${g}` : g === "center" ? `${h}` : `${h}-${g}`, strategy: "absolute", transform: !1, middleware: [Kt({ mainAxis: h === "selection" ? 0 : f, crossAxis: p }), zn({ padding: c }), h !== "selection" && Bn({ padding: c }), h === "selection" && m ? Xo({ ...m, padding: c, overflowRef: s, offset: o, minItemsVisible: jt, referenceOverflowThreshold: c, onFallbackChange(N) {
    var Q, G;
    if (!N) return;
    let x = b.elements.floating;
    if (!x) return;
    let F = parseFloat(getComputedStyle(x).scrollPaddingBottom) || 0, q = Math.min(jt, x.childElementCount), ne = 0, se = 0;
    for (let X of (G = (Q = b.elements.floating) == null ? void 0 : Q.childNodes) != null ? G : []) if (X instanceof HTMLElement) {
      let ee = X.offsetTop, fe = ee + X.clientHeight + F, j = x.scrollTop, v = j + x.clientHeight;
      if (ee >= j && fe <= v) q--;
      else {
        se = Math.max(0, Math.min(fe, v) - Math.max(ee, j)), ne = X.clientHeight;
        break;
      }
    }
    q >= 1 && i((X) => {
      let ee = ne * q - se + F;
      return X >= ee ? X : ee;
    });
  } }) : null, Vn({ padding: c, apply({ availableWidth: N, availableHeight: Q, elements: G }) {
    Object.assign(G.floating.style, { overflow: "auto", maxWidth: `${N}px`, maxHeight: `min(var(--anchor-max-height, 100vh), ${Q}px)` });
  } })].filter(Boolean), whileElementsMounted: Wn }), [T = h, M = g] = b.placement.split("-");
  h === "selection" && (T = "selection");
  let P = A(() => ({ anchor: [T, M].filter(Boolean).join(" ") }), [T, M]), O = Jo(b, { overflowRef: s, onChange: i }), { getReferenceProps: _, getFloatingProps: Z } = qo([O]), W = w((N) => {
    u(N), E.setFloating(N);
  });
  return y.createElement(bt.Provider, { value: r }, y.createElement(He.Provider, { value: { setFloating: W, setReference: E.setReference, styles: $, getReferenceProps: _, getFloatingProps: Z, slot: P } }, e));
}
function ri(e) {
  L(() => {
    if (!e) return;
    let n = new MutationObserver(() => {
      let t = window.getComputedStyle(e).maxHeight, r = parseFloat(t);
      if (isNaN(r)) return;
      let o = parseInt(t);
      isNaN(o) || r !== o && (e.style.maxHeight = `${Math.ceil(r)}px`);
    });
    return n.observe(e, { attributes: !0, attributeFilter: ["style"] }), () => {
      n.disconnect();
    };
  }, [e]);
}
function oi(e, n) {
  var t, r, o;
  let i = Ze((t = e == null ? void 0 : e.gap) != null ? t : "var(--anchor-gap, 0)", n), s = Ze((r = e == null ? void 0 : e.offset) != null ? r : "var(--anchor-offset, 0)", n), l = Ze((o = e == null ? void 0 : e.padding) != null ? o : "var(--anchor-padding, 0)", n);
  return { ...e, gap: i, offset: s, padding: l };
}
function Ze(e, n, t = void 0) {
  let r = Ne(), o = w((u, a) => {
    if (u == null) return [t, null];
    if (typeof u == "number") return [u, null];
    if (typeof u == "string") {
      if (!a) return [t, null];
      let d = zt(u, a);
      return [d, (f) => {
        let p = $n(u);
        {
          let c = p.map((m) => window.getComputedStyle(a).getPropertyValue(m));
          r.requestAnimationFrame(function m() {
            r.nextFrame(m);
            let h = !1;
            for (let [E, $] of p.entries()) {
              let b = window.getComputedStyle(a).getPropertyValue($);
              if (c[E] !== b) {
                c[E] = b, h = !0;
                break;
              }
            }
            if (!h) return;
            let g = zt(u, a);
            d !== g && (f(g), d = g);
          });
        }
        return r.dispose;
      }];
    }
    return [t, null];
  }), i = A(() => o(e, n)[0], [e, n]), [s = i, l] = k();
  return L(() => {
    let [u, a] = o(e, n);
    if (l(u), !!a) return a(l);
  }, [e, n]), s;
}
function $n(e) {
  let n = /var\((.*)\)/.exec(e);
  if (n) {
    let t = n[1].indexOf(",");
    if (t === -1) return [n[1]];
    let r = n[1].slice(0, t).trim(), o = n[1].slice(t + 1).trim();
    return o ? [r, ...$n(o)] : [r];
  }
  return [];
}
function zt(e, n) {
  let t = document.createElement("div");
  n.appendChild(t), t.style.setProperty("margin-top", "0px", "important"), t.style.setProperty("margin-top", e, "important");
  let r = parseFloat(window.getComputedStyle(t).marginTop) || 0;
  return n.removeChild(t), r;
}
function ii({ children: e, freeze: n }) {
  let t = ct(n, e);
  return C.createElement(C.Fragment, null, t);
}
function ct(e, n) {
  let [t, r] = k(n);
  return !e && t !== n && r(n), e ? t : n;
}
let vt = J(null);
vt.displayName = "OpenClosedContext";
var Fe = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(Fe || {});
function li() {
  return V(vt);
}
function si({ value: e, children: n }) {
  return C.createElement(vt.Provider, { value: e }, n);
}
function ui(e) {
  function n() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", n));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", n), n());
}
let he = [];
ui(() => {
  function e(n) {
    if (!(n.target instanceof HTMLElement) || n.target === document.body || he[0] === n.target) return;
    let t = n.target;
    t = t.closest(ut), he.unshift(t ?? n.target), he = he.filter((r) => r != null && r.isConnected), he.splice(10);
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function ai(e) {
  throw new Error("Unexpected object: " + e);
}
var H = ((e) => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(H || {});
function Bt(e, n) {
  let t = n.resolveItems();
  if (t.length <= 0) return null;
  let r = n.resolveActiveIndex(), o = r ?? -1;
  switch (e.focus) {
    case 0: {
      for (let i = 0; i < t.length; ++i) if (!n.resolveDisabled(t[i], i, t)) return i;
      return r;
    }
    case 1: {
      o === -1 && (o = t.length);
      for (let i = o - 1; i >= 0; --i) if (!n.resolveDisabled(t[i], i, t)) return i;
      return r;
    }
    case 2: {
      for (let i = o + 1; i < t.length; ++i) if (!n.resolveDisabled(t[i], i, t)) return i;
      return r;
    }
    case 3: {
      for (let i = t.length - 1; i >= 0; --i) if (!n.resolveDisabled(t[i], i, t)) return i;
      return r;
    }
    case 4: {
      for (let i = 0; i < t.length; ++i) if (n.resolveId(t[i], i, t) === e.id) return i;
      return r;
    }
    case 5:
      return null;
    default:
      ai(e);
  }
}
var Et = ((e) => (e[e.Left = 0] = "Left", e[e.Right = 2] = "Right", e))(Et || {});
function ci(e) {
  let n = w(e), t = I(!1);
  B(() => (t.current = !1, () => {
    t.current = !0, rn(() => {
      t.current && n();
    });
  }), [n]);
}
function di() {
  let e = typeof document > "u";
  return "useSyncExternalStore" in y ? ((n) => n.useSyncExternalStore)(y)(() => () => {
  }, () => !1, () => !e) : !1;
}
function fi() {
  let e = di(), [n, t] = y.useState(ye.isHandoffComplete);
  return n && ye.isHandoffComplete === !1 && t(!1), y.useEffect(() => {
    n !== !0 && t(!0);
  }, [n]), y.useEffect(() => ye.handoff(), []), e ? !1 : n;
}
let pi = J(!1);
function mi() {
  return V(pi);
}
function hi(e) {
  let n = mi(), t = V(On), r = Ue(e), [o, i] = k(() => {
    var s;
    if (!n && t !== null) return (s = t.current) != null ? s : null;
    if (ye.isServer) return null;
    let l = r == null ? void 0 : r.getElementById("headlessui-portal-root");
    if (l) return l;
    if (r === null) return null;
    let u = r.createElement("div");
    return u.setAttribute("id", "headlessui-portal-root"), r.body.appendChild(u);
  });
  return B(() => {
    o !== null && (r != null && r.body.contains(o) || r == null || r.body.appendChild(o));
  }, [o, r]), B(() => {
    n || t !== null && i(t.current);
  }, [t, i, n]), o;
}
let Sn = Ee, gi = le(function(e, n) {
  let t = e, r = I(null), o = de(Mr((f) => {
    r.current = f;
  }), n), i = Ue(r), s = hi(r), [l] = k(() => {
    var f;
    return ye.isServer ? null : (f = i == null ? void 0 : i.createElement("div")) != null ? f : null;
  }), u = V(yi), a = fi();
  L(() => {
    !s || !l || s.contains(l) || (l.setAttribute("data-headlessui-portal", ""), s.appendChild(l));
  }, [s, l]), L(() => {
    if (l && u) return u.register(l);
  }, [u, l]), ci(() => {
    var f;
    !s || !l || (l instanceof Node && s.contains(l) && s.removeChild(l), s.childNodes.length <= 0 && ((f = s.parentElement) == null || f.removeChild(s)));
  });
  let d = ie();
  return a ? !s || !l ? null : Ut(d({ ourProps: { ref: o }, theirProps: t, slot: {}, defaultTag: Sn, name: "Portal" }), l) : null;
});
function bi(e, n) {
  let t = de(n), { enabled: r = !0, ...o } = e, i = ie();
  return r ? C.createElement(gi, { ...o, ref: t }) : i({ ourProps: { ref: t }, theirProps: o, slot: {}, defaultTag: Sn, name: "Portal" });
}
let vi = Ee, On = J(null);
function Ei(e, n) {
  let { target: t, ...r } = e, o = { ref: de(n) }, i = ie();
  return C.createElement(On.Provider, { value: t }, i({ ourProps: o, theirProps: r, defaultTag: vi, name: "Popover.Group" }));
}
let yi = J(null), xi = le(bi), wi = le(Ei), $i = Object.assign(xi, { Group: wi });
var Si = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Si || {}), Oi = ((e) => (e[e.Single = 0] = "Single", e[e.Multi = 1] = "Multi", e))(Oi || {}), Ti = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Focus = 1] = "Focus", e[e.Other = 2] = "Other", e))(Ti || {}), Ci = ((e) => (e[e.OpenCombobox = 0] = "OpenCombobox", e[e.CloseCombobox = 1] = "CloseCombobox", e[e.GoToOption = 2] = "GoToOption", e[e.SetTyping = 3] = "SetTyping", e[e.RegisterOption = 4] = "RegisterOption", e[e.UnregisterOption = 5] = "UnregisterOption", e[e.SetActivationTrigger = 6] = "SetActivationTrigger", e[e.UpdateVirtualConfiguration = 7] = "UpdateVirtualConfiguration", e[e.SetInputElement = 8] = "SetInputElement", e[e.SetButtonElement = 9] = "SetButtonElement", e[e.SetOptionsElement = 10] = "SetOptionsElement", e))(Ci || {});
function et(e, n = (t) => t) {
  let t = e.activeOptionIndex !== null ? e.options[e.activeOptionIndex] : null, r = n(e.options.slice()), o = r.length > 0 && r[0].dataRef.current.order !== null ? r.sort((s, l) => s.dataRef.current.order - l.dataRef.current.order) : co(r, (s) => s.dataRef.current.domRef.current), i = t ? o.indexOf(t) : null;
  return i === -1 && (i = null), { options: o, activeOptionIndex: i };
}
let Ii = { 1(e) {
  var n;
  return (n = e.dataRef.current) != null && n.disabled || e.comboboxState === 1 ? e : { ...e, activeOptionIndex: null, comboboxState: 1, isTyping: !1, activationTrigger: 2, __demoMode: !1 };
}, 0(e) {
  var n, t;
  if ((n = e.dataRef.current) != null && n.disabled || e.comboboxState === 0) return e;
  if ((t = e.dataRef.current) != null && t.value) {
    let r = e.dataRef.current.calculateIndex(e.dataRef.current.value);
    if (r !== -1) return { ...e, activeOptionIndex: r, comboboxState: 0, __demoMode: !1 };
  }
  return { ...e, comboboxState: 0, __demoMode: !1 };
}, 3(e, n) {
  return e.isTyping === n.isTyping ? e : { ...e, isTyping: n.isTyping };
}, 2(e, n) {
  var t, r, o, i;
  if ((t = e.dataRef.current) != null && t.disabled || e.optionsElement && !((r = e.dataRef.current) != null && r.optionsPropsRef.current.static) && e.comboboxState === 1) return e;
  if (e.virtual) {
    let { options: a, disabled: d } = e.virtual, f = n.focus === H.Specific ? n.idx : Bt(n, { resolveItems: () => a, resolveActiveIndex: () => {
      var c, m;
      return (m = (c = e.activeOptionIndex) != null ? c : a.findIndex((h) => !d(h))) != null ? m : null;
    }, resolveDisabled: d, resolveId() {
      throw new Error("Function not implemented.");
    } }), p = (o = n.trigger) != null ? o : 2;
    return e.activeOptionIndex === f && e.activationTrigger === p ? e : { ...e, activeOptionIndex: f, activationTrigger: p, isTyping: !1, __demoMode: !1 };
  }
  let s = et(e);
  if (s.activeOptionIndex === null) {
    let a = s.options.findIndex((d) => !d.dataRef.current.disabled);
    a !== -1 && (s.activeOptionIndex = a);
  }
  let l = n.focus === H.Specific ? n.idx : Bt(n, { resolveItems: () => s.options, resolveActiveIndex: () => s.activeOptionIndex, resolveId: (a) => a.id, resolveDisabled: (a) => a.dataRef.current.disabled }), u = (i = n.trigger) != null ? i : 2;
  return e.activeOptionIndex === l && e.activationTrigger === u ? e : { ...e, ...s, isTyping: !1, activeOptionIndex: l, activationTrigger: u, __demoMode: !1 };
}, 4: (e, n) => {
  var t, r, o;
  if ((t = e.dataRef.current) != null && t.virtual) return { ...e, options: [...e.options, n.payload] };
  let i = n.payload, s = et(e, (u) => (u.push(i), u));
  e.activeOptionIndex === null && (r = e.dataRef.current) != null && r.isSelected(n.payload.dataRef.current.value) && (s.activeOptionIndex = s.options.indexOf(i));
  let l = { ...e, ...s, activationTrigger: 2 };
  return (o = e.dataRef.current) != null && o.__demoMode && e.dataRef.current.value === void 0 && (l.activeOptionIndex = 0), l;
}, 5: (e, n) => {
  var t;
  if ((t = e.dataRef.current) != null && t.virtual) return { ...e, options: e.options.filter((o) => o.id !== n.id) };
  let r = et(e, (o) => {
    let i = o.findIndex((s) => s.id === n.id);
    return i !== -1 && o.splice(i, 1), o;
  });
  return { ...e, ...r, activationTrigger: 2 };
}, 6: (e, n) => e.activationTrigger === n.trigger ? e : { ...e, activationTrigger: n.trigger }, 7: (e, n) => {
  var t, r;
  if (e.virtual === null) return { ...e, virtual: { options: n.options, disabled: (t = n.disabled) != null ? t : () => !1 } };
  if (e.virtual.options === n.options && e.virtual.disabled === n.disabled) return e;
  let o = e.activeOptionIndex;
  if (e.activeOptionIndex !== null) {
    let i = n.options.indexOf(e.virtual.options[e.activeOptionIndex]);
    i !== -1 ? o = i : o = null;
  }
  return { ...e, activeOptionIndex: o, virtual: { options: n.options, disabled: (r = n.disabled) != null ? r : () => !1 } };
}, 8: (e, n) => e.inputElement === n.element ? e : { ...e, inputElement: n.element }, 9: (e, n) => e.buttonElement === n.element ? e : { ...e, buttonElement: n.element }, 10: (e, n) => e.optionsElement === n.element ? e : { ...e, optionsElement: n.element } }, yt = J(null);
yt.displayName = "ComboboxActionsContext";
function ke(e) {
  let n = V(yt);
  if (n === null) {
    let t = new Error(`<${e} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, ke), t;
  }
  return n;
}
let Tn = J(null);
function Pi(e) {
  let n = Oe("VirtualProvider"), { options: t } = n.virtual, [r, o] = A(() => {
    let a = n.optionsElement;
    if (!a) return [0, 0];
    let d = window.getComputedStyle(a);
    return [parseFloat(d.paddingBlockStart || d.paddingTop), parseFloat(d.paddingBlockEnd || d.paddingBottom)];
  }, [n.optionsElement]), i = Jr({ enabled: t.length !== 0, scrollPaddingStart: r, scrollPaddingEnd: o, count: t.length, estimateSize() {
    return 40;
  }, getScrollElement() {
    return n.optionsElement;
  }, overscan: 12 }), [s, l] = k(0);
  L(() => {
    l((a) => a + 1);
  }, [t]);
  let u = i.getVirtualItems();
  return u.length === 0 ? null : C.createElement(Tn.Provider, { value: i }, C.createElement("div", { style: { position: "relative", width: "100%", height: `${i.getTotalSize()}px` }, ref: (a) => {
    a && n.activationTrigger !== 0 && n.activeOptionIndex !== null && t.length > n.activeOptionIndex && i.scrollToIndex(n.activeOptionIndex);
  } }, u.map((a) => {
    var d;
    return C.createElement(Ee, { key: a.key }, C.cloneElement((d = e.children) == null ? void 0 : d.call(e, { ...e.slot, option: t[a.index] }), { key: `${s}-${a.key}`, "data-index": a.index, "aria-setsize": t.length, "aria-posinset": a.index + 1, style: { position: "absolute", top: 0, left: 0, transform: `translateY(${a.start}px)`, overflowAnchor: "none" } }));
  })));
}
let Re = J(null);
Re.displayName = "ComboboxDataContext";
function Oe(e) {
  let n = V(Re);
  if (n === null) {
    let t = new Error(`<${e} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, Oe), t;
  }
  return n;
}
function Mi(e, n) {
  return ce(n.type, Ii, e, n);
}
let Fi = Ee;
function Ri(e, n) {
  var t, r;
  let o = ft(), { value: i, defaultValue: s, onChange: l, form: u, name: a, by: d, disabled: f = o || !1, onClose: p, __demoMode: c = !1, multiple: m = !1, immediate: h = !1, virtual: g = null, nullable: E, ...$ } = e, b = yr(s), [T = m ? [] : void 0, M] = Er(i, l, b), [P, O] = Wt(Mi, { dataRef: Nn(), comboboxState: c ? 0 : 1, isTyping: !1, options: [], virtual: g ? { options: g.options, disabled: (t = g.disabled) != null ? t : () => !1 } : null, activeOptionIndex: null, activationTrigger: 2, inputElement: null, buttonElement: null, optionsElement: null, __demoMode: c }), _ = I(!1), Z = I({ static: !1, hold: !1 }), W = Zr(d), N = w((S) => g ? d === null ? g.options.indexOf(S) : g.options.findIndex((R) => W(R, S)) : P.options.findIndex((R) => W(R.dataRef.current.value, S))), Q = D((S) => ce(x.mode, { 1: () => T.some((R) => W(R, S)), 0: () => W(T, S) }), [T]), G = w((S) => P.activeOptionIndex === N(S)), x = A(() => ({ ...P, immediate: h, optionsPropsRef: Z, value: T, defaultValue: b, disabled: f, mode: m ? 1 : 0, virtual: g ? P.virtual : null, get activeOptionIndex() {
    if (_.current && P.activeOptionIndex === null && (g ? g.options.length > 0 : P.options.length > 0)) {
      if (g) {
        let R = g.options.findIndex((ue) => {
          var _e, xt;
          return !((xt = (_e = g.disabled) == null ? void 0 : _e.call(g, ue)) != null && xt);
        });
        if (R !== -1) return R;
      }
      let S = P.options.findIndex((R) => !R.dataRef.current.disabled);
      if (S !== -1) return S;
    }
    return P.activeOptionIndex;
  }, calculateIndex: N, compare: W, isSelected: Q, isActive: G }), [T, b, f, m, c, P, g]);
  L(() => {
    var S;
    g && O({ type: 7, options: g.options, disabled: (S = g.disabled) != null ? S : null });
  }, [g, g == null ? void 0 : g.options, g == null ? void 0 : g.disabled]), L(() => {
    P.dataRef.current = x;
  }, [x]);
  let F = x.comboboxState === 0;
  mo(F, [x.buttonElement, x.inputElement, x.optionsElement], () => K.closeCombobox());
  let q = A(() => {
    var S, R, ue;
    return { open: x.comboboxState === 0, disabled: f, activeIndex: x.activeOptionIndex, activeOption: x.activeOptionIndex === null ? null : x.virtual ? x.virtual.options[(S = x.activeOptionIndex) != null ? S : 0] : (ue = (R = x.options[x.activeOptionIndex]) == null ? void 0 : R.dataRef.current.value) != null ? ue : null, value: T };
  }, [x, f, T]), ne = w(() => {
    if (x.activeOptionIndex !== null) {
      if (K.setIsTyping(!1), x.virtual) v(x.virtual.options[x.activeOptionIndex]);
      else {
        let { dataRef: S } = x.options[x.activeOptionIndex];
        v(S.current.value);
      }
      K.goToOption(H.Specific, x.activeOptionIndex);
    }
  }), se = w(() => {
    O({ type: 0 }), _.current = !0;
  }), X = w(() => {
    O({ type: 1 }), _.current = !1, p == null || p();
  }), ee = w((S) => {
    O({ type: 3, isTyping: S });
  }), fe = w((S, R, ue) => (_.current = !1, S === H.Specific ? O({ type: 2, focus: H.Specific, idx: R, trigger: ue }) : O({ type: 2, focus: S, trigger: ue }))), j = w((S, R) => (O({ type: 4, payload: { id: S, dataRef: R } }), () => {
    x.isActive(R.current.value) && (_.current = !0), O({ type: 5, id: S });
  })), v = w((S) => ce(x.mode, { 0() {
    return M == null ? void 0 : M(S);
  }, 1() {
    let R = x.value.slice(), ue = R.findIndex((_e) => W(_e, S));
    return ue === -1 ? R.push(S) : R.splice(ue, 1), M == null ? void 0 : M(R);
  } })), re = w((S) => {
    O({ type: 6, trigger: S });
  }), U = w((S) => {
    O({ type: 8, element: S });
  }), oe = w((S) => {
    O({ type: 9, element: S });
  }), z = w((S) => {
    O({ type: 10, element: S });
  }), K = A(() => ({ onChange: v, registerOption: j, goToOption: fe, setIsTyping: ee, closeCombobox: X, openCombobox: se, setActivationTrigger: re, selectActiveOption: ne, setInputElement: U, setButtonElement: oe, setOptionsElement: z }), []), [pe, Cn] = Dr(), In = n === null ? {} : { ref: n }, Pn = D(() => {
    if (b !== void 0) return M == null ? void 0 : M(b);
  }, [M, b]), Mn = ie();
  return C.createElement(Cn, { value: pe, props: { htmlFor: (r = x.inputElement) == null ? void 0 : r.id }, slot: { open: x.comboboxState === 0, disabled: f } }, C.createElement(ni, null, C.createElement(yt.Provider, { value: K }, C.createElement(Re.Provider, { value: x }, C.createElement(si, { value: ce(x.comboboxState, { 0: Fe.Open, 1: Fe.Closed }) }, a != null && C.createElement(Or, { disabled: f, data: T != null ? { [a]: T } : {}, form: u, onReset: Pn }), Mn({ ourProps: In, theirProps: $, slot: q, defaultTag: Fi, name: "Combobox" }))))));
}
let Li = "input";
function Ai(e, n) {
  var t, r, o, i, s;
  let l = Oe("Combobox.Input"), u = ke("Combobox.Input"), a = we(), d = cn(), { id: f = d || `headlessui-combobox-input-${a}`, onChange: p, displayValue: c, disabled: m = l.disabled || !1, autoFocus: h = !1, type: g = "text", ...E } = e, $ = I(null), b = de($, n, Zo(), u.setInputElement), T = Ue(l.inputElement), M = Ne(), P = w(() => {
    u.onChange(null), l.optionsElement && (l.optionsElement.scrollTop = 0), u.goToOption(H.Nothing);
  }), O = A(() => {
    var v;
    return typeof c == "function" && l.value !== void 0 ? (v = c(l.value)) != null ? v : "" : typeof l.value == "string" ? l.value : "";
  }, [l.value, c]);
  At(([v, re], [U, oe]) => {
    if (l.isTyping) return;
    let z = $.current;
    z && ((oe === 0 && re === 1 || v !== U) && (z.value = v), requestAnimationFrame(() => {
      if (l.isTyping || !z || (T == null ? void 0 : T.activeElement) !== z) return;
      let { selectionStart: K, selectionEnd: pe } = z;
      Math.abs((pe ?? 0) - (K ?? 0)) === 0 && K === 0 && z.setSelectionRange(z.value.length, z.value.length);
    }));
  }, [O, l.comboboxState, T, l.isTyping]), At(([v], [re]) => {
    if (v === 0 && re === 1) {
      if (l.isTyping) return;
      let U = $.current;
      if (!U) return;
      let oe = U.value, { selectionStart: z, selectionEnd: K, selectionDirection: pe } = U;
      U.value = "", U.value = oe, pe !== null ? U.setSelectionRange(z, K, pe) : U.setSelectionRange(z, K);
    }
  }, [l.comboboxState]);
  let _ = I(!1), Z = w(() => {
    _.current = !0;
  }), W = w(() => {
    M.nextFrame(() => {
      _.current = !1;
    });
  }), N = w((v) => {
    switch (u.setIsTyping(!0), v.key) {
      case Y.Enter:
        if (l.comboboxState !== 0 || _.current) return;
        if (v.preventDefault(), v.stopPropagation(), l.activeOptionIndex === null) {
          u.closeCombobox();
          return;
        }
        u.selectActiveOption(), l.mode === 0 && u.closeCombobox();
        break;
      case Y.ArrowDown:
        return v.preventDefault(), v.stopPropagation(), ce(l.comboboxState, { 0: () => u.goToOption(H.Next), 1: () => u.openCombobox() });
      case Y.ArrowUp:
        return v.preventDefault(), v.stopPropagation(), ce(l.comboboxState, { 0: () => u.goToOption(H.Previous), 1: () => {
          ge(() => u.openCombobox()), l.value || u.goToOption(H.Last);
        } });
      case Y.Home:
        if (v.shiftKey) break;
        return v.preventDefault(), v.stopPropagation(), u.goToOption(H.First);
      case Y.PageUp:
        return v.preventDefault(), v.stopPropagation(), u.goToOption(H.First);
      case Y.End:
        if (v.shiftKey) break;
        return v.preventDefault(), v.stopPropagation(), u.goToOption(H.Last);
      case Y.PageDown:
        return v.preventDefault(), v.stopPropagation(), u.goToOption(H.Last);
      case Y.Escape:
        return l.comboboxState !== 0 ? void 0 : (v.preventDefault(), l.optionsElement && !l.optionsPropsRef.current.static && v.stopPropagation(), l.mode === 0 && l.value === null && P(), u.closeCombobox());
      case Y.Tab:
        if (l.comboboxState !== 0) return;
        l.mode === 0 && l.activationTrigger !== 1 && u.selectActiveOption(), u.closeCombobox();
        break;
    }
  }), Q = w((v) => {
    p == null || p(v), l.mode === 0 && v.target.value === "" && P(), u.openCombobox();
  }), G = w((v) => {
    var re, U, oe;
    let z = (re = v.relatedTarget) != null ? re : he.find((K) => K !== v.currentTarget);
    if (!((U = l.optionsElement) != null && U.contains(z)) && !((oe = l.buttonElement) != null && oe.contains(z)) && l.comboboxState === 0) return v.preventDefault(), l.mode === 0 && l.value === null && P(), u.closeCombobox();
  }), x = w((v) => {
    var re, U, oe;
    let z = (re = v.relatedTarget) != null ? re : he.find((K) => K !== v.currentTarget);
    (U = l.buttonElement) != null && U.contains(z) || (oe = l.optionsElement) != null && oe.contains(z) || l.disabled || l.immediate && l.comboboxState !== 0 && M.microTask(() => {
      ge(() => u.openCombobox()), u.setActivationTrigger(1);
    });
  }), F = We(), q = Fr(), { isFocused: ne, focusProps: se } = nn({ autoFocus: h }), { isHovered: X, hoverProps: ee } = tn({ isDisabled: m }), fe = A(() => ({ open: l.comboboxState === 0, disabled: m, hover: X, focus: ne, autofocus: h }), [l, X, ne, h, m]), j = pt({ ref: b, id: f, role: "combobox", type: g, "aria-controls": (t = l.optionsElement) == null ? void 0 : t.id, "aria-expanded": l.comboboxState === 0, "aria-activedescendant": l.activeOptionIndex === null ? void 0 : l.virtual ? (r = l.options.find((v) => !v.dataRef.current.disabled && l.compare(v.dataRef.current.value, l.virtual.options[l.activeOptionIndex]))) == null ? void 0 : r.id : (o = l.options[l.activeOptionIndex]) == null ? void 0 : o.id, "aria-labelledby": F, "aria-describedby": q, "aria-autocomplete": "list", defaultValue: (s = (i = e.defaultValue) != null ? i : l.defaultValue !== void 0 ? c == null ? void 0 : c(l.defaultValue) : null) != null ? s : l.defaultValue, disabled: m || void 0, autoFocus: h, onCompositionStart: Z, onCompositionEnd: W, onKeyDown: N, onChange: Q, onFocus: x, onBlur: G }, se, ee);
  return ie()({ ourProps: j, theirProps: E, slot: fe, defaultTag: Li, name: "Combobox.Input" });
}
let Di = "button";
function Ni(e, n) {
  var t;
  let r = Oe("Combobox.Button"), o = ke("Combobox.Button"), i = de(n, o.setButtonElement), s = we(), { id: l = `headlessui-combobox-button-${s}`, disabled: u = r.disabled || !1, autoFocus: a = !1, ...d } = e, f = yn(r.inputElement), p = w((O) => {
    switch (O.key) {
      case Y.Space:
      case Y.Enter:
        O.preventDefault(), O.stopPropagation(), r.comboboxState === 1 && ge(() => o.openCombobox()), f();
        return;
      case Y.ArrowDown:
        O.preventDefault(), O.stopPropagation(), r.comboboxState === 1 && (ge(() => o.openCombobox()), r.value || o.goToOption(H.First)), f();
        return;
      case Y.ArrowUp:
        O.preventDefault(), O.stopPropagation(), r.comboboxState === 1 && (ge(() => o.openCombobox()), r.value || o.goToOption(H.Last)), f();
        return;
      case Y.Escape:
        if (r.comboboxState !== 0) return;
        O.preventDefault(), r.optionsElement && !r.optionsPropsRef.current.static && O.stopPropagation(), ge(() => o.closeCombobox()), f();
        return;
      default:
        return;
    }
  }), c = w((O) => {
    O.preventDefault(), !Ir(O.currentTarget) && (O.button === Et.Left && (r.comboboxState === 0 ? o.closeCombobox() : o.openCombobox()), f());
  }), m = We([l]), { isFocusVisible: h, focusProps: g } = nn({ autoFocus: a }), { isHovered: E, hoverProps: $ } = tn({ isDisabled: u }), { pressed: b, pressProps: T } = fr({ disabled: u }), M = A(() => ({ open: r.comboboxState === 0, active: b || r.comboboxState === 0, disabled: u, value: r.value, hover: E, focus: h }), [r, E, h, b, u]), P = pt({ ref: i, id: l, type: go(e, r.buttonElement), tabIndex: -1, "aria-haspopup": "listbox", "aria-controls": (t = r.optionsElement) == null ? void 0 : t.id, "aria-expanded": r.comboboxState === 0, "aria-labelledby": m, disabled: u || void 0, autoFocus: a, onMouseDown: c, onKeyDown: p }, g, $, T);
  return ie()({ ourProps: P, theirProps: d, slot: M, defaultTag: Di, name: "Combobox.Button" });
}
let Hi = "div", ki = lt.RenderStrategy | lt.Static;
function _i(e, n) {
  var t, r, o;
  let i = we(), { id: s = `headlessui-combobox-options-${i}`, hold: l = !1, anchor: u, portal: a = !1, modal: d = !0, transition: f = !1, ...p } = e, c = Oe("Combobox.Options"), m = ke("Combobox.Options"), h = Qo(u);
  h && (a = !0);
  let [g, E] = ti(h), [$, b] = k(null), T = ei(), M = de(n, h ? g : null, m.setOptionsElement, b), P = Ue(c.optionsElement), O = li(), [_, Z] = Co(f, $, O !== null ? (O & Fe.Open) === Fe.Open : c.comboboxState === 0);
  oo(_, c.inputElement, m.closeCombobox);
  let W = c.__demoMode ? !1 : d && c.comboboxState === 0;
  wo(W, P);
  let N = c.__demoMode ? !1 : d && c.comboboxState === 0;
  ro(N, { allowed: D(() => [c.inputElement, c.buttonElement, c.optionsElement], [c.inputElement, c.buttonElement, c.optionsElement]) }), L(() => {
    var j;
    c.optionsPropsRef.current.static = (j = e.static) != null ? j : !1;
  }, [c.optionsPropsRef, e.static]), L(() => {
    c.optionsPropsRef.current.hold = l;
  }, [c.optionsPropsRef, l]), Fo(c.comboboxState === 0, { container: c.optionsElement, accept(j) {
    return j.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : j.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(j) {
    j.setAttribute("role", "none");
  } });
  let Q = We([(t = c.buttonElement) == null ? void 0 : t.id]), G = A(() => ({ open: c.comboboxState === 0, option: void 0 }), [c.comboboxState]), x = w(() => {
    m.setActivationTrigger(0);
  }), F = w((j) => {
    j.preventDefault(), m.setActivationTrigger(0);
  }), q = pt(h ? T() : {}, { "aria-labelledby": Q, role: "listbox", "aria-multiselectable": c.mode === 1 ? !0 : void 0, id: s, ref: M, style: { ...p.style, ...E, "--input-width": Ct(c.inputElement, !0).width, "--button-width": Ct(c.buttonElement, !0).width }, onWheel: c.activationTrigger === 0 ? void 0 : x, onMouseDown: F, ...To(Z) }), ne = _ && c.comboboxState === 1, se = ct(ne, (r = c.virtual) == null ? void 0 : r.options), X = ct(ne, c.value), ee = w((j) => c.compare(X, j));
  if (c.virtual) {
    if (se === void 0) throw new Error("Missing `options` in virtual mode");
    Object.assign(p, { children: C.createElement(Re.Provider, { value: se !== c.virtual.options ? { ...c, virtual: { ...c.virtual, options: se } } : c }, C.createElement(Pi, { slot: G }, p.children)) });
  }
  let fe = ie();
  return C.createElement($i, { enabled: a ? e.static || _ : !1 }, C.createElement(Re.Provider, { value: c.mode === 1 ? c : { ...c, isSelected: ee } }, fe({ ourProps: q, theirProps: { ...p, children: C.createElement(ii, { freeze: ne }, typeof p.children == "function" ? (o = p.children) == null ? void 0 : o.call(p, G) : p.children) }, slot: G, defaultTag: Hi, features: ki, visible: _, name: "Combobox.Options" })));
}
let ji = "div";
function zi(e, n) {
  var t, r, o, i;
  let s = Oe("Combobox.Option"), l = ke("Combobox.Option"), u = we(), { id: a = `headlessui-combobox-option-${u}`, value: d, disabled: f = (o = (r = (t = s.virtual) == null ? void 0 : t.disabled) == null ? void 0 : r.call(t, d)) != null ? o : !1, order: p = null, ...c } = e, m = yn(s.inputElement), h = s.virtual ? s.activeOptionIndex === s.calculateIndex(d) : s.activeOptionIndex === null ? !1 : ((i = s.options[s.activeOptionIndex]) == null ? void 0 : i.id) === a, g = s.isSelected(d), E = I(null), $ = $e({ disabled: f, value: d, domRef: E, order: p }), b = V(Tn), T = de(n, E, b ? b.measureElement : null), M = w(() => {
    l.setIsTyping(!1), l.onChange(d);
  });
  L(() => l.registerOption(a, $), [$, a]);
  let P = I(!(s.virtual || s.__demoMode));
  L(() => {
    if (!s.virtual && !s.__demoMode) return ae().requestAnimationFrame(() => {
      P.current = !0;
    });
  }, [s.virtual, s.__demoMode]), L(() => {
    if (P.current && s.comboboxState === 0 && h && s.activationTrigger !== 0) return ae().requestAnimationFrame(() => {
      var F, q;
      (q = (F = E.current) == null ? void 0 : F.scrollIntoView) == null || q.call(F, { block: "nearest" });
    });
  }, [E, h, s.comboboxState, s.activationTrigger, s.activeOptionIndex]);
  let O = w((F) => {
    F.preventDefault(), F.button === Et.Left && (f || (M(), En() || requestAnimationFrame(() => m()), s.mode === 0 && l.closeCombobox()));
  }), _ = w(() => {
    if (f) return l.goToOption(H.Nothing);
    let F = s.calculateIndex(d);
    l.goToOption(H.Specific, F);
  }), Z = $o(), W = w((F) => Z.update(F)), N = w((F) => {
    if (!Z.wasMoved(F) || f || h) return;
    let q = s.calculateIndex(d);
    l.goToOption(H.Specific, q, 0);
  }), Q = w((F) => {
    Z.wasMoved(F) && (f || h && (s.optionsPropsRef.current.hold || l.goToOption(H.Nothing)));
  }), G = A(() => ({ active: h, focus: h, selected: g, disabled: f }), [h, g, f]), x = { id: a, ref: T, role: "option", tabIndex: f === !0 ? void 0 : -1, "aria-disabled": f === !0 ? !0 : void 0, "aria-selected": g, disabled: void 0, onMouseDown: O, onFocus: _, onPointerEnter: W, onMouseEnter: W, onPointerMove: N, onMouseMove: N, onPointerLeave: Q, onMouseLeave: Q };
  return ie()({ ourProps: x, theirProps: c, slot: G, defaultTag: ji, name: "Combobox.Option" });
}
let Bi = le(Ri), Vi = le(Ni), Wi = le(Ai), Ui = _r, Ki = le(_i), Yi = le(zi), Zi = Object.assign(Bi, { Input: Wi, Button: Vi, Label: Ui, Options: Ki, Option: Yi });
export {
  Wi as G,
  Zi as H,
  Ki as K,
  Vi as U,
  Yi as j
};
