import { a as e, c as t, d as n, f as r, h as i, i as a, l as o, m as s, n as c, o as l, p as u, s as d } from "./floating-ui.react-dom-CMUG_Bz2.js";
import * as f from "react";
import p, { Fragment as m, cloneElement as h, createContext as g, createElement as _, forwardRef as v, isValidElement as y, useCallback as b, useContext as x, useDebugValue as S, useEffect as C, useId as w, useId as T, useLayoutEffect as E, useMemo as D, useRef as O, useState as k, useSyncExternalStore as A } from "react";
import * as j from "react-dom";
import { createPortal as M, flushSync as N } from "react-dom";
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/utils/domHelpers.mjs
var P = (e) => e?.ownerDocument ?? document, ee = (e) => e && "window" in e && e.window === e ? e : P(e).defaultView || window;
function te(e) {
	return typeof e == "object" && !!e && "nodeType" in e && typeof e.nodeType == "number";
}
function ne(e) {
	return te(e) && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in e;
}
//#endregion
//#region node_modules/.pnpm/react-stately@3.46.0_react@18.3.1/node_modules/react-stately/dist/private/flags/flags.mjs
var re = !1;
function ie() {
	return re;
}
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/utils/shadowdom/DOMFunctions.mjs
function F(e, t) {
	if (!ie()) return t && e ? e.contains(t) : !1;
	if (!e || !t) return !1;
	let n = t;
	for (; n !== null;) {
		if (n === e) return !0;
		n = n.tagName === "SLOT" && n.assignedSlot ? n.assignedSlot.parentNode : ne(n) ? n.host : n.parentNode;
	}
	return !1;
}
var I = (e = document) => {
	if (!ie()) return e.activeElement;
	let t = e.activeElement;
	for (; t && "shadowRoot" in t && t.shadowRoot?.activeElement;) t = t.shadowRoot.activeElement;
	return t;
};
function L(e) {
	if (ie() && e.target instanceof Element && e.target.shadowRoot) {
		if ("composedPath" in e) return e.composedPath()[0] ?? null;
		if ("composedPath" in e.nativeEvent) return e.nativeEvent.composedPath()[0] ?? null;
	}
	return e.target;
}
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/utils/focusWithoutScrolling.mjs
function ae(e) {
	if (se()) e.focus({ preventScroll: !0 });
	else {
		let t = ce(e);
		e.focus(), le(t);
	}
}
var oe = null;
function se() {
	if (oe == null) {
		oe = !1;
		try {
			document.createElement("div").focus({ get preventScroll() {
				return oe = !0, !0;
			} });
		} catch {}
	}
	return oe;
}
function ce(e) {
	let t = e.parentNode, n = [], r = document.scrollingElement || document.documentElement;
	for (; t instanceof HTMLElement && t !== r;) (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && n.push({
		element: t,
		scrollTop: t.scrollTop,
		scrollLeft: t.scrollLeft
	}), t = t.parentNode;
	return r instanceof HTMLElement && n.push({
		element: r,
		scrollTop: r.scrollTop,
		scrollLeft: r.scrollLeft
	}), n;
}
function le(e) {
	for (let { element: t, scrollTop: n, scrollLeft: r } of e) t.scrollTop = n, t.scrollLeft = r;
}
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/utils/useLayoutEffect.mjs
var ue = typeof document < "u" ? p.useLayoutEffect : () => {};
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/interactions/utils.mjs
function de(e) {
	let t = e;
	return t.nativeEvent = e, t.isDefaultPrevented = () => t.defaultPrevented, t.isPropagationStopped = () => t.cancelBubble, t.persist = () => {}, t;
}
function fe(e, t) {
	Object.defineProperty(e, "target", { value: t }), Object.defineProperty(e, "currentTarget", { value: t });
}
function pe(e) {
	let t = O({
		isFocused: !1,
		observer: null
	});
	return ue(() => {
		let e = t.current;
		return () => {
			e.observer &&= (e.observer.disconnect(), null);
		};
	}, []), b((n) => {
		let r = L(n);
		if (r instanceof HTMLButtonElement || r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement || r instanceof HTMLSelectElement) {
			t.current.isFocused = !0;
			let n = r;
			n.addEventListener("focusout", (r) => {
				if (t.current.isFocused = !1, n.disabled) {
					let t = de(r);
					e?.(t);
				}
				t.current.observer && (t.current.observer.disconnect(), t.current.observer = null);
			}, { once: !0 }), t.current.observer = new MutationObserver(() => {
				if (t.current.isFocused && n.disabled) {
					t.current.observer?.disconnect();
					let e = n === I() ? null : I();
					n.dispatchEvent(new FocusEvent("blur", { relatedTarget: e })), n.dispatchEvent(new FocusEvent("focusout", {
						bubbles: !0,
						relatedTarget: e
					}));
				}
			}), t.current.observer.observe(n, {
				attributes: !0,
				attributeFilter: ["disabled"]
			});
		}
	}, [e]);
}
var me = !1;
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/utils/platform.mjs
function he(e) {
	if (typeof window > "u" || window.navigator == null) return !1;
	let t = window.navigator.userAgentData?.brands;
	return Array.isArray(t) && t.some((t) => e.test(t.brand)) || e.test(window.navigator.userAgent);
}
function ge(e) {
	return typeof window < "u" && window.navigator != null ? e.test(window.navigator.userAgentData?.platform || window.navigator.platform) : !1;
}
function _e(e) {
	if (process.env.NODE_ENV === "test") return e;
	let t = null;
	return () => (t ??= e(), t);
}
var ve = _e(function() {
	return ge(/^Mac/i);
}), ye = _e(function() {
	return ge(/^iPhone/i);
}), be = _e(function() {
	return ge(/^iPad/i) || ve() && navigator.maxTouchPoints > 1;
}), xe = _e(function() {
	return ye() || be();
});
_e(function() {
	return ve() || xe();
});
var Se = _e(function() {
	return he(/AppleWebKit/i) && !Ce();
}), Ce = _e(function() {
	return he(/Chrome/i);
}), we = _e(function() {
	return he(/Android/i);
}), Te = _e(function() {
	return he(/Firefox/i);
});
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/utils/isVirtualEvent.mjs
function Ee(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : we() && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/utils/openLink.mjs
function De(e, t, n = !0) {
	let { metaKey: r, ctrlKey: i, altKey: a, shiftKey: o } = t;
	Te() && window.event?.type?.startsWith("key") && e.target === "_blank" && (ve() ? r = !0 : i = !0);
	let s = Se() && ve() && !be() && process.env.NODE_ENV !== "test" ? new KeyboardEvent("keydown", {
		keyIdentifier: "Enter",
		metaKey: r,
		ctrlKey: i,
		altKey: a,
		shiftKey: o
	}) : new MouseEvent("click", {
		metaKey: r,
		ctrlKey: i,
		altKey: a,
		shiftKey: o,
		detail: 1,
		bubbles: !0,
		cancelable: !0
	});
	De.isOpening = n, ae(e), e.dispatchEvent(s), De.isOpening = !1;
}
De.isOpening = !1;
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/interactions/useFocusVisible.mjs
var Oe = null, ke = /* @__PURE__ */ new Set(), Ae = /* @__PURE__ */ new Map(), je = !1, Me = !1, Ne = {
	Tab: !0,
	Escape: !0
};
function Pe(e, t) {
	for (let n of ke) n(e, t);
}
function Fe(e) {
	return !(e.metaKey || !ve() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function Ie(e) {
	je = !0, !De.isOpening && Fe(e) && (Oe = "keyboard", Pe("keyboard", e));
}
function R(e) {
	Oe = "pointer", "pointerType" in e && e.pointerType, (e.type === "mousedown" || e.type === "pointerdown") && (je = !0, Pe("pointer", e));
}
function Le(e) {
	!De.isOpening && Ee(e) && (je = !0, Oe = "virtual");
}
function Re(e) {
	let t = ee(L(e)), n = P(L(e));
	L(e) === t || L(e) === n || me || !e.isTrusted || (!je && !Me && (Oe = "virtual", Pe("virtual", e)), je = !1, Me = !1);
}
function ze() {
	me || (je = !1, Me = !0);
}
function Be(e) {
	if (typeof window > "u" || typeof document > "u") return;
	let t = ee(e), n = P(e);
	if (Ae.get(t)) return;
	let r = t.HTMLElement.prototype.focus;
	t.HTMLElement.prototype.focus = function() {
		je = !0, r.apply(this, arguments);
	}, n.addEventListener("keydown", Ie, !0), n.addEventListener("keyup", Ie, !0), n.addEventListener("click", Le, !0), t.addEventListener("focus", Re, !0), t.addEventListener("blur", ze, !1), typeof PointerEvent < "u" ? (n.addEventListener("pointerdown", R, !0), n.addEventListener("pointermove", R, !0), n.addEventListener("pointerup", R, !0)) : process.env.NODE_ENV === "test" && (n.addEventListener("mousedown", R, !0), n.addEventListener("mousemove", R, !0), n.addEventListener("mouseup", R, !0)), t.addEventListener("beforeunload", () => {
		Ve(e);
	}, { once: !0 }), Ae.set(t, { focus: r });
}
var Ve = (e, t) => {
	let n = ee(e), r = P(e);
	t && r.removeEventListener("DOMContentLoaded", t), Ae.has(n) && (n.HTMLElement.prototype.focus = Ae.get(n).focus, r.removeEventListener("keydown", Ie, !0), r.removeEventListener("keyup", Ie, !0), r.removeEventListener("click", Le, !0), n.removeEventListener("focus", Re, !0), n.removeEventListener("blur", ze, !1), typeof PointerEvent < "u" ? (r.removeEventListener("pointerdown", R, !0), r.removeEventListener("pointermove", R, !0), r.removeEventListener("pointerup", R, !0)) : process.env.NODE_ENV === "test" && (r.removeEventListener("mousedown", R, !0), r.removeEventListener("mousemove", R, !0), r.removeEventListener("mouseup", R, !0)), Ae.delete(n));
};
function He(e) {
	let t = P(e), n;
	return t.readyState === "loading" ? (n = () => {
		Be(e);
	}, t.addEventListener("DOMContentLoaded", n)) : Be(e), () => Ve(e, n);
}
typeof document < "u" && He();
function Ue() {
	return Oe !== "pointer";
}
var We = new Set([
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
function Ge(e, t, n) {
	let r = n ? L(n) : void 0, i = P(r), a = ee(r), o = a === void 0 ? HTMLInputElement : a.HTMLInputElement, s = a === void 0 ? HTMLTextAreaElement : a.HTMLTextAreaElement, c = a === void 0 ? HTMLElement : a.HTMLElement, l = a === void 0 ? KeyboardEvent : a.KeyboardEvent, u = I(i);
	return e = e || u instanceof o && !We.has(u.type) || u instanceof s || u instanceof c && u.isContentEditable, !(e && t === "keyboard" && n instanceof l && !Ne[n.key]);
}
function Ke(e, t, n) {
	Be(), C(() => {
		if (n?.enabled === !1) return;
		let t = (t, r) => {
			Ge(!!n?.isTextInput, t, r) && e(Ue());
		};
		return ke.add(t), () => {
			ke.delete(t);
		};
	}, t);
}
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/interactions/useFocus.mjs
function qe(e) {
	let { isDisabled: t, onFocus: n, onBlur: r, onFocusChange: i } = e, a = b((e) => {
		if (L(e) === e.currentTarget) return r && r(e), i && i(!1), !0;
	}, [r, i]), o = pe(a), s = b((e) => {
		let t = L(e), r = P(t), a = r ? I(r) : I();
		t === e.currentTarget && t === a && (n && n(e), i && i(!0), o(e));
	}, [
		i,
		n,
		o
	]);
	return { focusProps: {
		onFocus: !t && (n || i || r) ? s : void 0,
		onBlur: !t && (r || i) ? a : void 0
	} };
}
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/utils/useGlobalListeners.mjs
function Je() {
	let e = O(/* @__PURE__ */ new Map()), t = b((t, n, r, i) => {
		let a = i?.once ? (...t) => {
			e.current.delete(r), r(...t);
		} : r;
		e.current.set(r, {
			type: n,
			eventTarget: t,
			fn: a,
			options: i
		}), t.addEventListener(n, a, i);
	}, []), n = b((t, n, r, i) => {
		let a = e.current.get(r)?.fn || r;
		t.removeEventListener(n, a, i), e.current.delete(r);
	}, []), r = b(() => {
		e.current.forEach((e, t) => {
			n(e.eventTarget, e.type, t, e.options);
		});
	}, [n]);
	return C(() => r, [r]), {
		addGlobalListener: t,
		removeGlobalListener: n,
		removeAllGlobalListeners: r
	};
}
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/interactions/useFocusWithin.mjs
function Ye(e) {
	let { isDisabled: t, onBlurWithin: n, onFocusWithin: r, onFocusWithinChange: i } = e, a = O({ isFocusWithin: !1 }), { addGlobalListener: o, removeAllGlobalListeners: s } = Je(), c = b((e) => {
		F(e.currentTarget, L(e)) && a.current.isFocusWithin && !F(e.currentTarget, e.relatedTarget) && (a.current.isFocusWithin = !1, s(), n && n(e), i && i(!1));
	}, [
		n,
		i,
		a,
		s
	]), l = pe(c), u = b((e) => {
		if (!F(e.currentTarget, L(e))) return;
		let t = L(e), n = P(t), s = I(n);
		if (!a.current.isFocusWithin && s === t) {
			r && r(e), i && i(!0), a.current.isFocusWithin = !0, l(e);
			let t = e.currentTarget;
			o(n, "focus", (e) => {
				let r = L(e);
				if (a.current.isFocusWithin && !F(t, r)) {
					let e = new n.defaultView.FocusEvent("blur", { relatedTarget: r });
					fe(e, t), c(de(e));
				}
			}, { capture: !0 });
		}
	}, [
		r,
		i,
		l,
		o,
		c
	]);
	return t ? { focusWithinProps: {
		onFocus: void 0,
		onBlur: void 0
	} } : { focusWithinProps: {
		onFocus: u,
		onBlur: c
	} };
}
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/focus/useFocusRing.mjs
function Xe(e = {}) {
	let { autoFocus: t = !1, isTextInput: n, within: r } = e, i = O({
		isFocused: !1,
		isFocusVisible: t || Ue()
	}), [a, o] = k(!1), [s, c] = k(() => i.current.isFocused && i.current.isFocusVisible), l = b(() => c(i.current.isFocused && i.current.isFocusVisible), []), u = b((e) => {
		i.current.isFocused = e, i.current.isFocusVisible = Ue(), o(e), l();
	}, [l]);
	Ke((e) => {
		i.current.isFocusVisible = e, l();
	}, [n, a], {
		enabled: a,
		isTextInput: n
	});
	let { focusProps: d } = qe({
		isDisabled: r,
		onFocusChange: u
	}), { focusWithinProps: f } = Ye({
		isDisabled: !r,
		onFocusWithinChange: u
	});
	return {
		isFocused: a,
		isFocusVisible: s,
		focusProps: r ? f : d
	};
}
//#endregion
//#region node_modules/.pnpm/react-aria@3.48.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/react-aria/dist/private/interactions/useHover.mjs
var Ze = !1, Qe = 0;
function $e() {
	Ze = !0, setTimeout(() => {
		Ze = !1;
	}, 500);
}
function et(e) {
	e.pointerType === "touch" && $e();
}
function tt() {
	let e = P(null);
	if (e !== void 0) return Qe === 0 && (typeof PointerEvent < "u" ? e.addEventListener("pointerup", et) : process.env.NODE_ENV === "test" && e.addEventListener("touchend", $e)), Qe++, () => {
		Qe--, !(Qe > 0) && (typeof PointerEvent < "u" ? e.removeEventListener("pointerup", et) : process.env.NODE_ENV === "test" && e.removeEventListener("touchend", $e));
	};
}
function nt(e) {
	let { onHoverStart: t, onHoverChange: n, onHoverEnd: r, isDisabled: i } = e, [a, o] = k(!1), s = O({
		isHovered: !1,
		ignoreEmulatedMouseEvents: !1,
		pointerType: "",
		target: null
	}).current;
	C(tt, []);
	let { addGlobalListener: c, removeAllGlobalListeners: l } = Je(), { hoverProps: u, triggerHoverEnd: d } = D(() => {
		let e = (e, r) => {
			if (s.pointerType = r, i || r === "touch" || s.isHovered || !F(e.currentTarget, L(e))) return;
			s.isHovered = !0;
			let l = e.currentTarget;
			s.target = l, c(P(L(e)), "pointerover", (e) => {
				s.isHovered && s.target && !F(s.target, L(e)) && a(e, e.pointerType);
			}, { capture: !0 }), t && t({
				type: "hoverstart",
				target: l,
				pointerType: r
			}), n && n(!0), o(!0);
		}, a = (e, t) => {
			let i = s.target;
			s.pointerType = "", s.target = null, !(t === "touch" || !s.isHovered || !i) && (s.isHovered = !1, l(), r && r({
				type: "hoverend",
				target: i,
				pointerType: t
			}), n && n(!1), o(!1));
		}, u = {};
		return typeof PointerEvent < "u" ? (u.onPointerEnter = (t) => {
			Ze && t.pointerType === "mouse" || e(t, t.pointerType);
		}, u.onPointerLeave = (e) => {
			!i && F(e.currentTarget, L(e)) && a(e, e.pointerType);
		}) : process.env.NODE_ENV === "test" && (u.onTouchStart = () => {
			s.ignoreEmulatedMouseEvents = !0;
		}, u.onMouseEnter = (t) => {
			!s.ignoreEmulatedMouseEvents && !Ze && e(t, "mouse"), s.ignoreEmulatedMouseEvents = !1;
		}, u.onMouseLeave = (e) => {
			!i && F(e.currentTarget, L(e)) && a(e, "mouse");
		}), {
			hoverProps: u,
			triggerHoverEnd: a
		};
	}, [
		t,
		n,
		r,
		i,
		s,
		c,
		l
	]);
	return C(() => {
		i && d({ currentTarget: s.target }, s.pointerType);
	}, [i]), {
		hoverProps: u,
		isHovered: a
	};
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/env.js
var rt = Object.defineProperty, it = (e, t, n) => t in e ? rt(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, at = (e, t, n) => (it(e, typeof t == "symbol" ? t : t + "", n), n), z = new class {
	constructor() {
		at(this, "current", this.detect()), at(this, "handoffState", "pending"), at(this, "currentId", 0);
	}
	set(e) {
		this.current !== e && (this.handoffState = "pending", this.currentId = 0, this.current = e);
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
}();
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/owner.js
function ot(e) {
	return z.isServer ? null : e == null ? document : e?.ownerDocument ?? document;
}
function st(e) {
	return z.isServer ? null : e == null ? document : (e?.getRootNode)?.call(e) ?? document;
}
function ct(e) {
	return st(e)?.activeElement ?? null;
}
function lt(e) {
	return ct(e) === e;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/micro-task.js
function ut(e) {
	typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((e) => setTimeout(() => {
		throw e;
	}));
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/disposables.js
function B() {
	let e = [], t = {
		addEventListener(e, n, r, i) {
			return e.addEventListener(n, r, i), t.add(() => e.removeEventListener(n, r, i));
		},
		requestAnimationFrame(...e) {
			let n = requestAnimationFrame(...e);
			return t.add(() => cancelAnimationFrame(n));
		},
		nextFrame(...e) {
			return t.requestAnimationFrame(() => t.requestAnimationFrame(...e));
		},
		setTimeout(...e) {
			let n = setTimeout(...e);
			return t.add(() => clearTimeout(n));
		},
		microTask(...e) {
			let n = { current: !0 };
			return ut(() => {
				n.current && e[0]();
			}), t.add(() => {
				n.current = !1;
			});
		},
		style(e, t, n) {
			let r = e.style.getPropertyValue(t);
			return Object.assign(e.style, { [t]: n }), this.add(() => {
				Object.assign(e.style, { [t]: r });
			});
		},
		group(e) {
			let t = B();
			return e(t), this.add(() => t.dispose());
		},
		add(t) {
			return e.includes(t) || e.push(t), () => {
				let n = e.indexOf(t);
				if (n >= 0) for (let t of e.splice(n, 1)) t();
			};
		},
		dispose() {
			for (let t of e.splice(0)) t();
		}
	};
	return t;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-disposables.js
function dt() {
	let [e] = k(B);
	return C(() => () => e.dispose(), [e]), e;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js
var V = (e, t) => {
	z.isServer ? C(e, t) : E(e, t);
};
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-latest-value.js
function ft(e) {
	let t = O(e);
	return V(() => {
		t.current = e;
	}, [e]), t;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-event.js
var H = function(e) {
	let t = ft(e);
	return p.useCallback((...e) => t.current(...e), [t]);
};
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-active-press.js
function pt(e) {
	let t = e.width / 2, n = e.height / 2;
	return {
		top: e.clientY - n,
		right: e.clientX + t,
		bottom: e.clientY + n,
		left: e.clientX - t
	};
}
function mt(e, t) {
	return !(!e || !t || e.right < t.left || e.left > t.right || e.bottom < t.top || e.top > t.bottom);
}
function ht({ disabled: e = !1 } = {}) {
	let t = O(null), [n, r] = k(!1), i = dt(), a = H(() => {
		t.current = null, r(!1), i.dispose();
	}), o = H((e) => {
		if (i.dispose(), t.current === null) {
			t.current = e.currentTarget, r(!0);
			{
				let n = ot(e.currentTarget);
				i.addEventListener(n, "pointerup", a, !1), i.addEventListener(n, "pointermove", (e) => {
					t.current && r(mt(pt(e), t.current.getBoundingClientRect()));
				}, !1), i.addEventListener(n, "pointercancel", a, !1);
			}
		}
	});
	return {
		pressed: n,
		pressProps: e ? {} : {
			onPointerDown: o,
			onPointerUp: a,
			onClick: a
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-slot.js
function gt(e) {
	return D(() => e, Object.values(e));
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/internal/disabled.js
var _t = g(void 0);
function vt() {
	return x(_t);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/class-names.js
function yt(...e) {
	return Array.from(new Set(e.flatMap((e) => typeof e == "string" ? e.split(" ") : []))).filter(Boolean).join(" ");
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/match.js
function U(e, t, ...n) {
	if (e in t) {
		let r = t[e];
		return typeof r == "function" ? r(...n) : r;
	}
	let r = /* @__PURE__ */ Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((e) => `"${e}"`).join(", ")}.`);
	throw Error.captureStackTrace && Error.captureStackTrace(r, U), r;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/render.js
var bt = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(bt || {}), xt = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(xt || {});
function W() {
	let e = wt();
	return b((t) => St({
		mergeRefs: e,
		...t
	}), [e]);
}
function St({ ourProps: e, theirProps: t, slot: n, defaultTag: r, features: i, visible: a = !0, name: o, mergeRefs: s }) {
	s ??= Tt;
	let c = Et(t, e);
	if (a) return Ct(c, n, r, o, s);
	let l = i ?? 0;
	if (l & 2) {
		let { static: e = !1, ...t } = c;
		if (e) return Ct(t, n, r, o, s);
	}
	if (l & 1) {
		let { unmount: e = !0, ...t } = c;
		return U(+!e, {
			0() {
				return null;
			},
			1() {
				return Ct({
					...t,
					hidden: !0,
					style: { display: "none" }
				}, n, r, o, s);
			}
		});
	}
	return Ct(c, n, r, o, s);
}
function Ct(e, t = {}, n, r, i) {
	let { as: a = n, children: o, refName: s = "ref", ...c } = kt(e, ["unmount", "static"]), l = e.ref === void 0 ? {} : { [s]: e.ref }, u = typeof o == "function" ? o(t) : o;
	u = jt(u), "className" in c && c.className && typeof c.className == "function" && (c.className = c.className(t)), c["aria-labelledby"] && c["aria-labelledby"] === c.id && (c["aria-labelledby"] = void 0);
	let d = {};
	if (t) {
		let e = !1, n = [];
		for (let [r, i] of Object.entries(t)) typeof i == "boolean" && (e = !0), i === !0 && n.push(r.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`));
		if (e) {
			d["data-headlessui-state"] = n.join(" ");
			for (let e of n) d[`data-${e}`] = "";
		}
	}
	if (Mt(a) && (Object.keys(Ot(c)).length > 0 || Object.keys(Ot(d)).length > 0)) if (!y(u) || Array.isArray(u) && u.length > 1 || Nt(u)) {
		if (Object.keys(Ot(c)).length > 0) throw Error([
			"Passing props on \"Fragment\"!",
			"",
			`The current component <${r} /> is rendering a "Fragment".`,
			"However we need to passthrough the following props:",
			Object.keys(Ot(c)).concat(Object.keys(Ot(d))).map((e) => `  - ${e}`).join("\n"),
			"",
			"You can apply a few solutions:",
			["Add an `as=\"...\"` prop, to ensure that we render an actual element instead of a \"Fragment\".", "Render a single element as the child so that we can forward the props onto that element."].map((e) => `  - ${e}`).join("\n")
		].join("\n"));
	} else {
		let e = u.props?.className, t = typeof e == "function" ? (...t) => yt(e(...t), c.className) : yt(e, c.className), n = t ? { className: t } : {}, r = Et(u.props, Ot(kt(c, ["ref"])));
		for (let e in d) e in r && delete d[e];
		return h(u, Object.assign({}, r, d, l, { ref: i(At(u), l.ref) }, n));
	}
	return _(a, Object.assign({}, kt(c, ["ref"]), !Mt(a) && l, !Mt(a) && d), u);
}
function wt() {
	let e = O([]), t = b((t) => {
		for (let n of e.current) n != null && (typeof n == "function" ? n(t) : n.current = t);
	}, []);
	return (...n) => {
		if (!n.every((e) => e == null)) return e.current = n, t;
	};
}
function Tt(...e) {
	return e.every((e) => e == null) ? void 0 : (t) => {
		for (let n of e) n != null && (typeof n == "function" ? n(t) : n.current = t);
	};
}
function Et(...e) {
	if (e.length === 0) return {};
	if (e.length === 1) return e[0];
	let t = {}, n = {};
	for (let r of e) for (let e in r) e.startsWith("on") && typeof r[e] == "function" ? (n[e] ?? (n[e] = []), n[e].push(r[e])) : t[e] = r[e];
	if (t.disabled || t["aria-disabled"]) for (let e in n) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(e) && (n[e] = [(e) => (e?.preventDefault)?.call(e)]);
	for (let e in n) Object.assign(t, { [e](t, ...r) {
		let i = n[e];
		for (let e of i) {
			if ((t instanceof Event || t?.nativeEvent instanceof Event) && t.defaultPrevented) return;
			e(t, ...r);
		}
	} });
	return t;
}
function Dt(...e) {
	if (e.length === 0) return {};
	if (e.length === 1) return e[0];
	let t = {}, n = {};
	for (let r of e) for (let e in r) e.startsWith("on") && typeof r[e] == "function" ? (n[e] ?? (n[e] = []), n[e].push(r[e])) : t[e] = r[e];
	for (let e in n) Object.assign(t, { [e](...t) {
		let r = n[e];
		for (let e of r) e?.(...t);
	} });
	return t;
}
function G(e) {
	return Object.assign(v(e), { displayName: e.displayName ?? e.name });
}
function Ot(e) {
	let t = Object.assign({}, e);
	for (let e in t) t[e] === void 0 && delete t[e];
	return t;
}
function kt(e, t = []) {
	let n = Object.assign({}, e);
	for (let e of t) e in n && delete n[e];
	return n;
}
function At(e) {
	return p.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
function jt(e) {
	if (e != null && e.$$typeof === Symbol.for("react.lazy")) {
		let t = e._payload;
		if (t != null && t.status === "fulfilled") return jt(t.value);
	}
	return e;
}
function Mt(e) {
	return e === m || e === Symbol.for("react.fragment");
}
function Nt(e) {
	return Mt(e.type);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-controllable.js
function Pt(e, t, n) {
	let [r, i] = k(n), a = e !== void 0, o = O(a), s = O(!1), c = O(!1);
	return a && !o.current && !s.current ? (s.current = !0, o.current = a, console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")) : !a && o.current && !c.current && (c.current = !0, o.current = a, console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")), [a ? e : r, H((e) => (a || N(() => i(e)), t?.(e)))];
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-default-value.js
function Ft(e) {
	let [t] = k(e);
	return t;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/form.js
function It(e = {}, t = null, n = []) {
	for (let [r, i] of Object.entries(e)) Rt(n, Lt(t, r), i);
	return n;
}
function Lt(e, t) {
	return e ? e + "[" + t + "]" : t;
}
function Rt(e, t, n) {
	if (Array.isArray(n)) for (let [r, i] of n.entries()) Rt(e, Lt(t, r.toString()), i);
	else n instanceof Date ? e.push([t, n.toISOString()]) : typeof n == "boolean" ? e.push([t, n ? "1" : "0"]) : typeof n == "string" ? e.push([t, n]) : typeof n == "number" ? e.push([t, `${n}`]) : n == null ? e.push([t, ""]) : zt(n) && !y(n) && It(n, t, e);
}
function zt(e) {
	if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
	let t = Object.getPrototypeOf(e);
	return t === null || Object.getPrototypeOf(t) === null;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/internal/hidden.js
var Bt = "span", Vt = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Vt || {});
function Ht(e, t) {
	let { features: n = 1, ...r } = e, i = {
		ref: t,
		"aria-hidden": (n & 2) == 2 ? !0 : r["aria-hidden"] ?? void 0,
		hidden: (n & 4) == 4 ? !0 : void 0,
		style: {
			position: "fixed",
			top: 1,
			left: 1,
			width: 1,
			height: 0,
			padding: 0,
			margin: -1,
			overflow: "hidden",
			clip: "rect(0, 0, 0, 0)",
			whiteSpace: "nowrap",
			borderWidth: "0",
			...(n & 4) == 4 && (n & 2) != 2 && { display: "none" }
		}
	};
	return W()({
		ourProps: i,
		theirProps: r,
		slot: {},
		defaultTag: Bt,
		name: "Hidden"
	});
}
var Ut = G(Ht), Wt = g(null);
function Gt({ children: e }) {
	let t = x(Wt);
	if (!t) return p.createElement(p.Fragment, null, e);
	let { target: n } = t;
	return n ? M(p.createElement(p.Fragment, null, e), n) : null;
}
function Kt({ data: e, form: t, disabled: n, onReset: r, overrides: i }) {
	let [a, o] = k(null), s = dt();
	return C(() => {
		if (r && a) return s.addEventListener(a, "reset", r);
	}, [
		a,
		t,
		r
	]), p.createElement(Gt, null, p.createElement(qt, {
		setForm: o,
		formId: t
	}), It(e).map(([e, r]) => p.createElement(Ut, {
		features: Vt.Hidden,
		...Ot({
			key: e,
			as: "input",
			type: "hidden",
			hidden: !0,
			readOnly: !0,
			form: t,
			disabled: n,
			name: e,
			value: r,
			...i
		})
	})));
}
function qt({ setForm: e, formId: t }) {
	return C(() => {
		if (t) {
			let n = document.getElementById(t);
			n && e(n);
		}
	}, [e, t]), t ? null : p.createElement(Ut, {
		features: Vt.Hidden,
		as: "input",
		type: "hidden",
		hidden: !0,
		readOnly: !0,
		ref: (t) => {
			if (!t) return;
			let n = t.closest("form");
			n && e(n);
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/internal/id.js
var Jt = g(void 0);
function Yt() {
	return x(Jt);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/dom.js
function Xt(e) {
	return typeof e != "object" || !e ? !1 : "nodeType" in e;
}
function Zt(e) {
	return Xt(e) && "tagName" in e;
}
function Qt(e) {
	return Zt(e) && "accessKey" in e;
}
function $t(e) {
	return Zt(e) && "tabIndex" in e;
}
function en(e) {
	return Zt(e) && "style" in e;
}
function tn(e) {
	return Qt(e) && e.nodeName === "IFRAME";
}
function nn(e) {
	return Qt(e) && e.nodeName === "INPUT";
}
function rn(e) {
	return Qt(e) && e.nodeName === "LABEL";
}
function an(e) {
	return Qt(e) && e.nodeName === "FIELDSET";
}
function on(e) {
	return Qt(e) && e.nodeName === "LEGEND";
}
function sn(e) {
	return Zt(e) ? e.matches("a[href],audio[controls],button,details,embed,iframe,img[usemap],input:not([type=\"hidden\"]),label,select,textarea,video[controls]") : !1;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/bugs.js
function cn(e) {
	let t = e.parentElement, n = null;
	for (; t && !an(t);) on(t) && (n = t), t = t.parentElement;
	let r = t?.getAttribute("disabled") === "";
	return r && ln(n) ? !1 : r;
}
function ln(e) {
	if (!e) return !1;
	let t = e.previousElementSibling;
	for (; t !== null;) {
		if (on(t)) return !1;
		t = t.previousElementSibling;
	}
	return !0;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js
var un = Symbol();
function dn(e, t = !0) {
	return Object.assign(e, { [un]: t });
}
function fn(...e) {
	let t = O(e);
	C(() => {
		t.current = e;
	}, [e]);
	let n = H((e) => {
		for (let n of t.current) n != null && (typeof n == "function" ? n(e) : n.current = e);
	});
	return e.every((e) => e == null || e?.[un]) ? void 0 : n;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/components/description/description.js
var pn = g(null);
pn.displayName = "DescriptionContext";
function mn() {
	let e = x(pn);
	if (e === null) {
		let e = /* @__PURE__ */ Error("You used a <Description /> component, but it is not inside a relevant parent.");
		throw Error.captureStackTrace && Error.captureStackTrace(e, mn), e;
	}
	return e;
}
function hn() {
	return x(pn)?.value ?? void 0;
}
var gn = "p";
function _n(e, t) {
	let n = T(), r = vt(), { id: i = `headlessui-description-${n}`, ...a } = e, o = mn(), s = fn(t);
	V(() => o.register(i), [i, o.register]);
	let c = gt({
		...o.slot,
		disabled: r || !1
	}), l = {
		ref: s,
		...o.props,
		id: i
	};
	return W()({
		ourProps: l,
		theirProps: a,
		slot: c,
		defaultTag: gn,
		name: o.name || "Description"
	});
}
var vn = G(_n);
Object.assign(vn, {});
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/components/keyboard.js
var K = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(K || {}), yn = g(null);
yn.displayName = "LabelContext";
function bn() {
	let e = x(yn);
	if (e === null) {
		let e = /* @__PURE__ */ Error("You used a <Label /> component, but it is not inside a relevant parent.");
		throw Error.captureStackTrace && Error.captureStackTrace(e, bn), e;
	}
	return e;
}
function xn(e) {
	let t = x(yn)?.value ?? void 0;
	return (e?.length ?? 0) > 0 ? [t, ...e].filter(Boolean).join(" ") : t;
}
function Sn({ inherit: e = !1 } = {}) {
	let t = xn(), [n, r] = k([]), i = e ? [t, ...n].filter(Boolean) : n;
	return [i.length > 0 ? i.join(" ") : void 0, D(() => function(e) {
		let t = H((e) => (r((t) => [...t, e]), () => r((t) => {
			let n = t.slice(), r = n.indexOf(e);
			return r !== -1 && n.splice(r, 1), n;
		}))), n = D(() => ({
			register: t,
			slot: e.slot,
			name: e.name,
			props: e.props,
			value: e.value
		}), [
			t,
			e.slot,
			e.name,
			e.props,
			e.value
		]);
		return p.createElement(yn.Provider, { value: n }, e.children);
	}, [r])];
}
var Cn = "label";
function wn(e, t) {
	let n = T(), r = bn(), i = Yt(), a = vt(), { id: o = `headlessui-label-${n}`, htmlFor: s = i ?? r.props?.htmlFor, passive: c = !1, ...l } = e, u = fn(t);
	V(() => r.register(o), [o, r.register]);
	let d = H((e) => {
		let t = e.currentTarget;
		if (!(e.target !== e.currentTarget && sn(e.target)) && (rn(t) && e.preventDefault(), r.props && "onClick" in r.props && typeof r.props.onClick == "function" && r.props.onClick(e), rn(t))) {
			let e = document.getElementById(t.htmlFor);
			if (e) {
				let t = e.getAttribute("disabled");
				if (t === "true" || t === "") return;
				let n = e.getAttribute("aria-disabled");
				if (n === "true" || n === "") return;
				(nn(e) && (e.type === "file" || e.type === "radio" || e.type === "checkbox") || e.role === "radio" || e.role === "checkbox" || e.role === "switch") && e.click(), e.focus({ preventScroll: !0 });
			}
		}
	}), f = gt({
		...r.slot,
		disabled: a || !1
	}), p = {
		ref: u,
		...r.props,
		id: o,
		htmlFor: s,
		onClick: d
	};
	return c && ("onClick" in p && (delete p.htmlFor, delete p.onClick), "onClick" in l && delete l.onClick), W()({
		ourProps: p,
		theirProps: l,
		slot: f,
		defaultTag: s ? Cn : "div",
		name: r.name || "Label"
	});
}
var Tn = G(wn), En = Object.assign(Tn, {});
//#endregion
//#region node_modules/.pnpm/@tanstack+virtual-core@3.14.0/node_modules/@tanstack/virtual-core/dist/esm/utils.js
function Dn(e, t, n) {
	let r = n.initialDeps ?? [], i, a = !0;
	function o() {
		let o;
		n.key && n.debug?.call(n) && (o = Date.now());
		let s = e();
		if (!(s.length !== r.length || s.some((e, t) => r[t] !== e))) return i;
		r = s;
		let c;
		if (n.key && n.debug?.call(n) && (c = Date.now()), i = t(...s), n.key && n.debug?.call(n)) {
			let e = Math.round((Date.now() - o) * 100) / 100, t = Math.round((Date.now() - c) * 100) / 100, r = t / 16, i = (e, t) => {
				for (e = String(e); e.length < t;) e = " " + e;
				return e;
			};
			console.info(`%c⏱ ${i(t, 5)} /${i(e, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * r, 120))}deg 100% 31%);`, n?.key);
		}
		return n?.onChange && !(a && n.skipInitialOnChange) && n.onChange(i), a = !1, i;
	}
	return o.updateDeps = (e) => {
		r = e;
	}, o;
}
function On(e, t) {
	if (e === void 0) throw Error(`Unexpected undefined${t ? `: ${t}` : ""}`);
	return e;
}
var kn = (e, t) => Math.abs(e - t) < 1.01, An = (e, t, n) => {
	let r;
	return function(...i) {
		e.clearTimeout(r), r = e.setTimeout(() => t.apply(this, i), n);
	};
}, jn = (e) => {
	let { offsetWidth: t, offsetHeight: n } = e;
	return {
		width: t,
		height: n
	};
}, Mn = (e) => e, Nn = (e) => {
	let t = Math.max(e.startIndex - e.overscan, 0), n = Math.min(e.endIndex + e.overscan, e.count - 1), r = [];
	for (let e = t; e <= n; e++) r.push(e);
	return r;
}, Pn = (e, t) => {
	let n = e.scrollElement;
	if (!n) return;
	let r = e.targetWindow;
	if (!r) return;
	let i = (e) => {
		let { width: n, height: r } = e;
		t({
			width: Math.round(n),
			height: Math.round(r)
		});
	};
	if (i(jn(n)), !r.ResizeObserver) return () => {};
	let a = new r.ResizeObserver((t) => {
		let r = () => {
			let e = t[0];
			if (e?.borderBoxSize) {
				let t = e.borderBoxSize[0];
				if (t) {
					i({
						width: t.inlineSize,
						height: t.blockSize
					});
					return;
				}
			}
			i(jn(n));
		};
		e.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(r) : r();
	});
	return a.observe(n, { box: "border-box" }), () => {
		a.unobserve(n);
	};
}, Fn = { passive: !0 }, In = typeof window > "u" ? !0 : "onscrollend" in window, Ln = (e, t) => {
	let n = e.scrollElement;
	if (!n) return;
	let r = e.targetWindow;
	if (!r) return;
	let i = 0, a = e.options.useScrollendEvent && In ? () => void 0 : An(r, () => {
		t(i, !1);
	}, e.options.isScrollingResetDelay), o = (r) => () => {
		let { horizontal: o, isRtl: s } = e.options;
		i = o ? n.scrollLeft * (s && -1 || 1) : n.scrollTop, a(), t(i, r);
	}, s = o(!0), c = o(!1);
	n.addEventListener("scroll", s, Fn);
	let l = e.options.useScrollendEvent && In;
	return l && n.addEventListener("scrollend", c, Fn), () => {
		n.removeEventListener("scroll", s), l && n.removeEventListener("scrollend", c);
	};
}, Rn = (e, t, n) => {
	if (t?.borderBoxSize) {
		let e = t.borderBoxSize[0];
		if (e) return Math.round(e[n.options.horizontal ? "inlineSize" : "blockSize"]);
	}
	return e[n.options.horizontal ? "offsetWidth" : "offsetHeight"];
}, zn = (e, { adjustments: t = 0, behavior: n }, r) => {
	var i, a;
	let o = e + t;
	(a = (i = r.scrollElement)?.scrollTo) == null || a.call(i, {
		[r.options.horizontal ? "left" : "top"]: o,
		behavior: n
	});
}, Bn = class {
	constructor(e) {
		this.unsubs = [], this.scrollElement = null, this.targetWindow = null, this.isScrolling = !1, this.scrollState = null, this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.laneAssignments = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.prevLanes = void 0, this.lanesChangedFlag = !1, this.lanesSettling = !1, this.scrollRect = null, this.scrollOffset = null, this.scrollDirection = null, this.scrollAdjustments = 0, this.elementsCache = /* @__PURE__ */ new Map(), this.now = () => {
			var e;
			return ((e = this.targetWindow?.performance)?.now)?.call(e) ?? Date.now();
		}, this.observer = /* @__PURE__ */ (() => {
			let e = null, t = () => e || (!this.targetWindow || !this.targetWindow.ResizeObserver ? null : e = new this.targetWindow.ResizeObserver((e) => {
				e.forEach((e) => {
					let t = () => {
						let t = e.target, n = this.indexFromElement(t);
						if (!t.isConnected) {
							this.observer.unobserve(t);
							return;
						}
						this.shouldMeasureDuringScroll(n) && this.resizeItem(n, this.options.measureElement(t, e, this));
					};
					this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(t) : t();
				});
			}));
			return {
				disconnect: () => {
					var n;
					(n = t()) == null || n.disconnect(), e = null;
				},
				observe: (e) => t()?.observe(e, { box: "border-box" }),
				unobserve: (e) => t()?.unobserve(e)
			};
		})(), this.range = null, this.setOptions = (e) => {
			Object.entries(e).forEach(([t, n]) => {
				n === void 0 && delete e[t];
			}), this.options = {
				debug: !1,
				initialOffset: 0,
				overscan: 1,
				paddingStart: 0,
				paddingEnd: 0,
				scrollPaddingStart: 0,
				scrollPaddingEnd: 0,
				horizontal: !1,
				getItemKey: Mn,
				rangeExtractor: Nn,
				onChange: () => {},
				measureElement: Rn,
				initialRect: {
					width: 0,
					height: 0
				},
				scrollMargin: 0,
				gap: 0,
				indexAttribute: "data-index",
				initialMeasurementsCache: [],
				lanes: 1,
				isScrollingResetDelay: 150,
				enabled: !0,
				isRtl: !1,
				useScrollendEvent: !1,
				useAnimationFrameWithResizeObserver: !1,
				laneAssignmentMode: "estimate",
				...e
			};
		}, this.notify = (e) => {
			var t, n;
			(n = (t = this.options).onChange) == null || n.call(t, this, e);
		}, this.maybeNotify = Dn(() => (this.calculateRange(), [
			this.isScrolling,
			this.range ? this.range.startIndex : null,
			this.range ? this.range.endIndex : null
		]), (e) => {
			this.notify(e);
		}, {
			key: process.env.NODE_ENV !== "production" && "maybeNotify",
			debug: () => this.options.debug,
			initialDeps: [
				this.isScrolling,
				this.range ? this.range.startIndex : null,
				this.range ? this.range.endIndex : null
			]
		}), this.cleanup = () => {
			this.unsubs.filter(Boolean).forEach((e) => e()), this.unsubs = [], this.observer.disconnect(), this.rafId != null && this.targetWindow && (this.targetWindow.cancelAnimationFrame(this.rafId), this.rafId = null), this.scrollState = null, this.scrollElement = null, this.targetWindow = null;
		}, this._didMount = () => () => {
			this.cleanup();
		}, this._willUpdate = () => {
			let e = this.options.enabled ? this.options.getScrollElement() : null;
			if (this.scrollElement !== e) {
				if (this.cleanup(), !e) {
					this.maybeNotify();
					return;
				}
				this.scrollElement = e, this.scrollElement && "ownerDocument" in this.scrollElement ? this.targetWindow = this.scrollElement.ownerDocument.defaultView : this.targetWindow = this.scrollElement?.window ?? null, this.elementsCache.forEach((e) => {
					this.observer.observe(e);
				}), this.unsubs.push(this.options.observeElementRect(this, (e) => {
					this.scrollRect = e, this.maybeNotify();
				})), this.unsubs.push(this.options.observeElementOffset(this, (e, t) => {
					this.scrollAdjustments = 0, this.scrollDirection = t ? this.getScrollOffset() < e ? "forward" : "backward" : null, this.scrollOffset = e, this.isScrolling = t, this.scrollState && this.scheduleScrollReconcile(), this.maybeNotify();
				})), this._scrollToOffset(this.getScrollOffset(), {
					adjustments: void 0,
					behavior: void 0
				});
			}
		}, this.rafId = null, this.getSize = () => this.options.enabled ? (this.scrollRect = this.scrollRect ?? this.options.initialRect, this.scrollRect[this.options.horizontal ? "width" : "height"]) : (this.scrollRect = null, 0), this.getScrollOffset = () => this.options.enabled ? (this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset == "function" ? this.options.initialOffset() : this.options.initialOffset), this.scrollOffset) : (this.scrollOffset = null, 0), this.getFurthestMeasurement = (e, t) => {
			let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
			for (let i = t - 1; i >= 0; i--) {
				let t = e[i];
				if (n.has(t.lane)) continue;
				let a = r.get(t.lane);
				if (a == null || t.end > a.end ? r.set(t.lane, t) : t.end < a.end && n.set(t.lane, !0), n.size === this.options.lanes) break;
			}
			return r.size === this.options.lanes ? Array.from(r.values()).sort((e, t) => e.end === t.end ? e.index - t.index : e.end - t.end)[0] : void 0;
		}, this.getMeasurementOptions = Dn(() => [
			this.options.count,
			this.options.paddingStart,
			this.options.scrollMargin,
			this.options.getItemKey,
			this.options.enabled,
			this.options.lanes,
			this.options.laneAssignmentMode
		], (e, t, n, r, i, a, o) => (this.prevLanes !== void 0 && this.prevLanes !== a && (this.lanesChangedFlag = !0), this.prevLanes = a, this.pendingMeasuredCacheIndexes = [], {
			count: e,
			paddingStart: t,
			scrollMargin: n,
			getItemKey: r,
			enabled: i,
			lanes: a,
			laneAssignmentMode: o
		}), { key: !1 }), this.getMeasurements = Dn(() => [this.getMeasurementOptions(), this.itemSizeCache], ({ count: e, paddingStart: t, scrollMargin: n, getItemKey: r, enabled: i, lanes: a, laneAssignmentMode: o }, s) => {
			if (!i) return this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), [];
			if (this.laneAssignments.size > e) for (let t of this.laneAssignments.keys()) t >= e && this.laneAssignments.delete(t);
			this.lanesChangedFlag && (this.lanesChangedFlag = !1, this.lanesSettling = !0, this.measurementsCache = [], this.itemSizeCache.clear(), this.laneAssignments.clear(), this.pendingMeasuredCacheIndexes = []), this.measurementsCache.length === 0 && !this.lanesSettling && (this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.forEach((e) => {
				this.itemSizeCache.set(e.key, e.size);
			}));
			let c = this.lanesSettling ? 0 : this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
			this.pendingMeasuredCacheIndexes = [], this.lanesSettling && this.measurementsCache.length === e && (this.lanesSettling = !1);
			let l = this.measurementsCache.slice(0, c), u = Array(a).fill(void 0);
			for (let e = 0; e < c; e++) {
				let t = l[e];
				t && (u[t.lane] = e);
			}
			for (let i = c; i < e; i++) {
				let e = r(i), a = this.laneAssignments.get(i), c, d, f = o === "estimate" || s.has(e);
				if (a !== void 0 && this.options.lanes > 1) {
					c = a;
					let e = u[c], r = e === void 0 ? void 0 : l[e];
					d = r ? r.end + this.options.gap : t + n;
				} else {
					let e = this.options.lanes === 1 ? l[i - 1] : this.getFurthestMeasurement(l, i);
					d = e ? e.end + this.options.gap : t + n, c = e ? e.lane : i % this.options.lanes, this.options.lanes > 1 && f && this.laneAssignments.set(i, c);
				}
				let p = s.get(e), m = typeof p == "number" ? p : this.options.estimateSize(i), h = d + m;
				l[i] = {
					index: i,
					start: d,
					size: m,
					end: h,
					key: e,
					lane: c
				}, u[c] = i;
			}
			return this.measurementsCache = l, l;
		}, {
			key: process.env.NODE_ENV !== "production" && "getMeasurements",
			debug: () => this.options.debug
		}), this.calculateRange = Dn(() => [
			this.getMeasurements(),
			this.getSize(),
			this.getScrollOffset(),
			this.options.lanes
		], (e, t, n, r) => this.range = e.length > 0 && t > 0 ? Hn({
			measurements: e,
			outerSize: t,
			scrollOffset: n,
			lanes: r
		}) : null, {
			key: process.env.NODE_ENV !== "production" && "calculateRange",
			debug: () => this.options.debug
		}), this.getVirtualIndexes = Dn(() => {
			let e = null, t = null, n = this.calculateRange();
			return n && (e = n.startIndex, t = n.endIndex), this.maybeNotify.updateDeps([
				this.isScrolling,
				e,
				t
			]), [
				this.options.rangeExtractor,
				this.options.overscan,
				this.options.count,
				e,
				t
			];
		}, (e, t, n, r, i) => r === null || i === null ? [] : e({
			startIndex: r,
			endIndex: i,
			overscan: t,
			count: n
		}), {
			key: process.env.NODE_ENV !== "production" && "getVirtualIndexes",
			debug: () => this.options.debug
		}), this.indexFromElement = (e) => {
			let t = this.options.indexAttribute, n = e.getAttribute(t);
			return n ? parseInt(n, 10) : (console.warn(`Missing attribute name '${t}={index}' on measured element.`), -1);
		}, this.shouldMeasureDuringScroll = (e) => {
			if (!this.scrollState || this.scrollState.behavior !== "smooth") return !0;
			let t = this.scrollState.index ?? this.getVirtualItemForOffset(this.scrollState.lastTargetOffset)?.index;
			if (t !== void 0 && this.range) {
				let n = Math.max(this.options.overscan, Math.ceil((this.range.endIndex - this.range.startIndex) / 2)), r = Math.max(0, t - n), i = Math.min(this.options.count - 1, t + n);
				return e >= r && e <= i;
			}
			return !0;
		}, this.measureElement = (e) => {
			if (!e) {
				this.elementsCache.forEach((e, t) => {
					e.isConnected || (this.observer.unobserve(e), this.elementsCache.delete(t));
				});
				return;
			}
			let t = this.indexFromElement(e), n = this.options.getItemKey(t), r = this.elementsCache.get(n);
			r !== e && (r && this.observer.unobserve(r), this.observer.observe(e), this.elementsCache.set(n, e)), (!this.isScrolling || this.scrollState) && this.shouldMeasureDuringScroll(t) && this.resizeItem(t, this.options.measureElement(e, void 0, this));
		}, this.resizeItem = (e, t) => {
			let n = this.measurementsCache[e];
			if (!n) return;
			let r = t - (this.itemSizeCache.get(n.key) ?? n.size);
			r !== 0 && (this.scrollState?.behavior !== "smooth" && (this.shouldAdjustScrollPositionOnItemSizeChange === void 0 ? n.start < this.getScrollOffset() + this.scrollAdjustments : this.shouldAdjustScrollPositionOnItemSizeChange(n, r, this)) && (process.env.NODE_ENV !== "production" && this.options.debug && console.info("correction", r), this._scrollToOffset(this.getScrollOffset(), {
				adjustments: this.scrollAdjustments += r,
				behavior: void 0
			})), this.pendingMeasuredCacheIndexes.push(n.index), this.itemSizeCache = new Map(this.itemSizeCache.set(n.key, t)), this.notify(!1));
		}, this.getVirtualItems = Dn(() => [this.getVirtualIndexes(), this.getMeasurements()], (e, t) => {
			let n = [];
			for (let r = 0, i = e.length; r < i; r++) {
				let i = t[e[r]];
				n.push(i);
			}
			return n;
		}, {
			key: process.env.NODE_ENV !== "production" && "getVirtualItems",
			debug: () => this.options.debug
		}), this.getVirtualItemForOffset = (e) => {
			let t = this.getMeasurements();
			if (t.length !== 0) return On(t[Vn(0, t.length - 1, (e) => On(t[e]).start, e)]);
		}, this.getMaxScrollOffset = () => {
			if (!this.scrollElement) return 0;
			if ("scrollHeight" in this.scrollElement) return this.options.horizontal ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth : this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
			{
				let e = this.scrollElement.document.documentElement;
				return this.options.horizontal ? e.scrollWidth - this.scrollElement.innerWidth : e.scrollHeight - this.scrollElement.innerHeight;
			}
		}, this.getOffsetForAlignment = (e, t, n = 0) => {
			if (!this.scrollElement) return 0;
			let r = this.getSize(), i = this.getScrollOffset();
			t === "auto" && (t = e >= i + r ? "end" : "start"), t === "center" ? e += (n - r) / 2 : t === "end" && (e -= r);
			let a = this.getMaxScrollOffset();
			return Math.max(Math.min(a, e), 0);
		}, this.getOffsetForIndex = (e, t = "auto") => {
			e = Math.max(0, Math.min(e, this.options.count - 1));
			let n = this.getSize(), r = this.getScrollOffset(), i = this.measurementsCache[e];
			if (!i) return;
			if (t === "auto") if (i.end >= r + n - this.options.scrollPaddingEnd) t = "end";
			else if (i.start <= r + this.options.scrollPaddingStart) t = "start";
			else return [r, t];
			if (t === "end" && e === this.options.count - 1) return [this.getMaxScrollOffset(), t];
			let a = t === "end" ? i.end + this.options.scrollPaddingEnd : i.start - this.options.scrollPaddingStart;
			return [this.getOffsetForAlignment(a, t, i.size), t];
		}, this.scrollToOffset = (e, { align: t = "start", behavior: n = "auto" } = {}) => {
			let r = this.getOffsetForAlignment(e, t), i = this.now();
			this.scrollState = {
				index: null,
				align: t,
				behavior: n,
				startedAt: i,
				lastTargetOffset: r,
				stableFrames: 0
			}, this._scrollToOffset(r, {
				adjustments: void 0,
				behavior: n
			}), this.scheduleScrollReconcile();
		}, this.scrollToIndex = (e, { align: t = "auto", behavior: n = "auto" } = {}) => {
			e = Math.max(0, Math.min(e, this.options.count - 1));
			let r = this.getOffsetForIndex(e, t);
			if (!r) return;
			let [i, a] = r, o = this.now();
			this.scrollState = {
				index: e,
				align: a,
				behavior: n,
				startedAt: o,
				lastTargetOffset: i,
				stableFrames: 0
			}, this._scrollToOffset(i, {
				adjustments: void 0,
				behavior: n
			}), this.scheduleScrollReconcile();
		}, this.scrollBy = (e, { behavior: t = "auto" } = {}) => {
			let n = this.getScrollOffset() + e, r = this.now();
			this.scrollState = {
				index: null,
				align: "start",
				behavior: t,
				startedAt: r,
				lastTargetOffset: n,
				stableFrames: 0
			}, this._scrollToOffset(n, {
				adjustments: void 0,
				behavior: t
			}), this.scheduleScrollReconcile();
		}, this.getTotalSize = () => {
			let e = this.getMeasurements(), t;
			if (e.length === 0) t = this.options.paddingStart;
			else if (this.options.lanes === 1) t = e[e.length - 1]?.end ?? 0;
			else {
				let n = Array(this.options.lanes).fill(null), r = e.length - 1;
				for (; r >= 0 && n.some((e) => e === null);) {
					let t = e[r];
					n[t.lane] === null && (n[t.lane] = t.end), r--;
				}
				t = Math.max(...n.filter((e) => e !== null));
			}
			return Math.max(t - this.options.scrollMargin + this.options.paddingEnd, 0);
		}, this._scrollToOffset = (e, { adjustments: t, behavior: n }) => {
			this.options.scrollToFn(e, {
				behavior: n,
				adjustments: t
			}, this);
		}, this.measure = () => {
			this.itemSizeCache = /* @__PURE__ */ new Map(), this.laneAssignments = /* @__PURE__ */ new Map(), this.notify(!1);
		}, this.setOptions(e);
	}
	scheduleScrollReconcile() {
		if (!this.targetWindow) {
			this.scrollState = null;
			return;
		}
		this.rafId ??= this.targetWindow.requestAnimationFrame(() => {
			this.rafId = null, this.reconcileScroll();
		});
	}
	reconcileScroll() {
		if (!this.scrollState || !this.scrollElement) return;
		if (this.now() - this.scrollState.startedAt > 5e3) {
			this.scrollState = null;
			return;
		}
		let e = this.scrollState.index == null ? void 0 : this.getOffsetForIndex(this.scrollState.index, this.scrollState.align), t = e ? e[0] : this.scrollState.lastTargetOffset, n = t !== this.scrollState.lastTargetOffset;
		if (!n && kn(t, this.getScrollOffset())) {
			if (this.scrollState.stableFrames++, this.scrollState.stableFrames >= 1) {
				this.scrollState = null;
				return;
			}
		} else this.scrollState.stableFrames = 0, n && (this.scrollState.lastTargetOffset = t, this.scrollState.behavior = "auto", this._scrollToOffset(t, {
			adjustments: void 0,
			behavior: "auto"
		}));
		this.scheduleScrollReconcile();
	}
}, Vn = (e, t, n, r) => {
	for (; e <= t;) {
		let i = (e + t) / 2 | 0, a = n(i);
		if (a < r) e = i + 1;
		else if (a > r) t = i - 1;
		else return i;
	}
	return e > 0 ? e - 1 : 0;
};
function Hn({ measurements: e, outerSize: t, scrollOffset: n, lanes: r }) {
	let i = e.length - 1, a = (t) => e[t].start;
	if (e.length <= r) return {
		startIndex: 0,
		endIndex: i
	};
	let o = Vn(0, i, a, n), s = o;
	if (r === 1) for (; s < i && e[s].end < n + t;) s++;
	else if (r > 1) {
		let a = Array(r).fill(0);
		for (; s < i && a.some((e) => e < n + t);) {
			let t = e[s];
			a[t.lane] = t.end, s++;
		}
		let c = Array(r).fill(n + t);
		for (; o >= 0 && c.some((e) => e >= n);) {
			let t = e[o];
			c[t.lane] = t.start, o--;
		}
		o = Math.max(0, o - o % r), s = Math.min(i, s + (r - 1 - s % r));
	}
	return {
		startIndex: o,
		endIndex: s
	};
}
//#endregion
//#region node_modules/.pnpm/@tanstack+react-virtual@3.13.24_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@tanstack/react-virtual/dist/esm/index.js
var Un = typeof document < "u" ? f.useLayoutEffect : f.useEffect;
function Wn({ useFlushSync: e = !0, ...t }) {
	let n = f.useReducer(() => ({}), {})[1], r = {
		...t,
		onChange: (r, i) => {
			var a;
			e && i ? N(n) : n(), (a = t.onChange) == null || a.call(t, r, i);
		}
	}, [i] = f.useState(() => new Bn(r));
	return i.setOptions(r), Un(() => i._didMount(), []), Un(() => i._willUpdate()), i;
}
function Gn(e) {
	return Wn({
		observeElementRect: Pn,
		observeElementOffset: Ln,
		scrollToFn: zn,
		...e
	});
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-by-comparator.js
function Kn(e, t) {
	return e !== null && t !== null && typeof e == "object" && typeof t == "object" && "id" in e && "id" in t ? e.id === t.id : e === t;
}
function qn(e = Kn) {
	return b((t, n) => {
		if (typeof e == "string") {
			let r = e;
			return t?.[r] === n?.[r];
		}
		return e(t, n);
	}, [e]);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-element-size.js
function Jn(e) {
	if (e === null) return {
		width: 0,
		height: 0
	};
	let { width: t, height: n } = e.getBoundingClientRect();
	return {
		width: t,
		height: n
	};
}
function Yn(e, t, n = !1) {
	let [r, i] = k(() => Jn(t));
	return V(() => {
		if (!t || !e) return;
		let n = B();
		return n.requestAnimationFrame(function e() {
			n.requestAnimationFrame(e), i((e) => {
				let n = Jn(t);
				return n.width === e.width && n.height === e.height ? e : n;
			});
		}), () => {
			n.dispose();
		};
	}, [t, e]), n ? {
		width: `${r.width}px`,
		height: `${r.height}px`
	} : r;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/components/mouse.js
var Xn = ((e) => (e[e.Left = 0] = "Left", e[e.Right = 2] = "Right", e))(Xn || {});
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-handle-toggle.js
function Zn(e) {
	let t = O(null);
	return {
		onPointerDown: H((n) => {
			t.current = n.pointerType, !cn(n.currentTarget) && n.pointerType === "mouse" && n.button === Xn.Left && (n.preventDefault(), e(n));
		}),
		onClick: H((n) => {
			t.current !== "mouse" && (cn(n.currentTarget) || e(n));
		})
	};
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/default-map.js
var Qn = class extends Map {
	constructor(e) {
		super(), this.factory = e;
	}
	get(e) {
		let t = super.get(e);
		return t === void 0 && (t = this.factory(e), this.set(e, t)), t;
	}
}, $n = Object.defineProperty, er = (e, t, n) => t in e ? $n(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, tr = (e, t, n) => (er(e, typeof t == "symbol" ? t : t + "", n), n), nr = (e, t, n) => {
	if (!t.has(e)) throw TypeError("Cannot " + n);
}, q = (e, t, n) => (nr(e, t, "read from private field"), n ? n.call(e) : t.get(e)), rr = (e, t, n) => {
	if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
	t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, ir = (e, t, n, r) => (nr(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), J, ar, or, sr = class {
	constructor(e) {
		rr(this, J, {}), rr(this, ar, new Qn(() => /* @__PURE__ */ new Set())), rr(this, or, /* @__PURE__ */ new Set()), tr(this, "disposables", B()), ir(this, J, e), z.isServer && this.disposables.microTask(() => {
			this.dispose();
		});
	}
	dispose() {
		this.disposables.dispose();
	}
	get state() {
		return q(this, J);
	}
	subscribe(e, t) {
		if (z.isServer) return () => {};
		let n = {
			selector: e,
			callback: t,
			current: e(q(this, J))
		};
		return q(this, or).add(n), this.disposables.add(() => {
			q(this, or).delete(n);
		});
	}
	on(e, t) {
		return z.isServer ? () => {} : (q(this, ar).get(e).add(t), this.disposables.add(() => {
			q(this, ar).get(e).delete(t);
		}));
	}
	send(e) {
		let t = this.reduce(q(this, J), e);
		if (t !== q(this, J)) {
			ir(this, J, t);
			for (let e of q(this, or)) {
				let t = e.selector(q(this, J));
				cr(e.current, t) || (e.current = t, e.callback(t));
			}
			for (let t of q(this, ar).get(e.type)) t(q(this, J), e);
		}
	}
};
J = /* @__PURE__ */ new WeakMap(), ar = /* @__PURE__ */ new WeakMap(), or = /* @__PURE__ */ new WeakMap();
function cr(e, t) {
	return Object.is(e, t) ? !0 : typeof e != "object" || !e || typeof t != "object" || !t ? !1 : Array.isArray(e) && Array.isArray(t) ? e.length === t.length ? lr(e[Symbol.iterator](), t[Symbol.iterator]()) : !1 : e instanceof Map && t instanceof Map || e instanceof Set && t instanceof Set ? e.size === t.size ? lr(e.entries(), t.entries()) : !1 : ur(e) && ur(t) ? lr(Object.entries(e)[Symbol.iterator](), Object.entries(t)[Symbol.iterator]()) : !1;
}
function lr(e, t) {
	do {
		let n = e.next(), r = t.next();
		if (n.done && r.done) return !0;
		if (n.done || r.done || !Object.is(n.value, r.value)) return !1;
	} while (!0);
}
function ur(e) {
	if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
	let t = Object.getPrototypeOf(e);
	return t === null || Object.getPrototypeOf(t) === null;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/machines/stack-machine.js
var dr = Object.defineProperty, fr = (e, t, n) => t in e ? dr(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, pr = (e, t, n) => (fr(e, typeof t == "symbol" ? t : t + "", n), n), mr = ((e) => (e[e.Push = 0] = "Push", e[e.Pop = 1] = "Pop", e))(mr || {}), hr = {
	0(e, t) {
		let n = t.id, r = e.stack, i = e.stack.indexOf(n);
		if (i !== -1) {
			let t = e.stack.slice();
			return t.splice(i, 1), t.push(n), r = t, {
				...e,
				stack: r
			};
		}
		return {
			...e,
			stack: [...e.stack, n]
		};
	},
	1(e, t) {
		let n = t.id, r = e.stack.indexOf(n);
		if (r === -1) return e;
		let i = e.stack.slice();
		return i.splice(r, 1), {
			...e,
			stack: i
		};
	}
}, gr = class e extends sr {
	constructor() {
		super(...arguments), pr(this, "actions", {
			push: (e) => this.send({
				type: 0,
				id: e
			}),
			pop: (e) => this.send({
				type: 1,
				id: e
			})
		}), pr(this, "selectors", {
			isTop: (e, t) => e.stack[e.stack.length - 1] === t,
			inStack: (e, t) => e.stack.includes(t)
		});
	}
	static new() {
		return new e({ stack: [] });
	}
	reduce(e, t) {
		return U(t.type, hr, e, t);
	}
}, _r = new Qn(() => gr.new());
//#endregion
//#region esm-shims/use-sync-external-store-with-selector.js
function vr(e, t) {
	return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
}
var yr = typeof Object.is == "function" ? Object.is : vr;
function br(e, t, n, r, i) {
	let a = O(null);
	a.current === null && (a.current = {
		hasValue: !1,
		value: null
	});
	let o = a.current, [s, c] = D(() => {
		let e = !1, a, s, c = (t) => {
			if (!e) {
				e = !0, a = t;
				let n = r(t);
				if (i !== void 0 && o.hasValue) {
					let e = o.value;
					if (i(e, n)) return s = e, e;
				}
				return s = n, n;
			}
			let n = s;
			if (yr(a, t)) return n;
			let c = r(t);
			return i !== void 0 && i(n, c) ? (a = t, n) : (a = t, s = c, c);
		}, l = n === void 0 ? null : n;
		return [() => c(t()), l === null ? void 0 : () => c(l())];
	}, [
		t,
		n,
		r,
		i
	]), l = A(e, s, c);
	return C(() => {
		o.hasValue = !0, o.value = l;
	}, [l]), S(l), l;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/react-glue.js
function Y(e, t, n = cr) {
	return br(H((t) => e.subscribe(xr, t)), H(() => e.state), H(() => e.state), H(t), n);
}
function xr(e) {
	return e;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-is-top-layer.js
function Sr(e, t) {
	let n = w(), r = _r.get(t), [i, a] = Y(r, b((e) => [r.selectors.isTop(e, n), r.selectors.inStack(e, n)], [r, n]));
	return V(() => {
		if (e) return r.actions.push(n), () => r.actions.pop(n);
	}, [
		r,
		e,
		n
	]), e ? a ? i : !0 : !1;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-inert-others.js
var Cr = /* @__PURE__ */ new Map(), wr = /* @__PURE__ */ new Map();
function Tr(e) {
	let t = wr.get(e) ?? 0;
	return wr.set(e, t + 1), t === 0 ? (Cr.set(e, {
		"aria-hidden": e.getAttribute("aria-hidden"),
		inert: e.inert
	}), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => Er(e)) : () => Er(e);
}
function Er(e) {
	let t = wr.get(e) ?? 1;
	if (t === 1 ? wr.delete(e) : wr.set(e, t - 1), t !== 1) return;
	let n = Cr.get(e);
	n && (n["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", n["aria-hidden"]), e.inert = n.inert, Cr.delete(e));
}
function Dr(e, { allowed: t, disallowed: n } = {}) {
	let r = Sr(e, "inert-others");
	V(() => {
		if (!r) return;
		let e = B();
		for (let t of n?.() ?? []) t && e.add(Tr(t));
		let i = t?.() ?? [];
		for (let t of i) {
			if (!t) continue;
			let n = ot(t);
			if (!n) continue;
			let r = t.parentElement;
			for (; r && r !== n.body;) {
				for (let t of r.children) i.some((e) => t.contains(e)) || e.add(Tr(t));
				r = r.parentElement;
			}
		}
		return e.dispose;
	}, [
		r,
		t,
		n
	]);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-on-disappear.js
function Or(e, t, n) {
	let r = ft((e) => {
		let t = e.getBoundingClientRect();
		t.x === 0 && t.y === 0 && t.width === 0 && t.height === 0 && n();
	});
	C(() => {
		if (!e) return;
		let n = t === null ? null : Qt(t) ? t : t.current;
		if (!n) return;
		let i = B();
		if (typeof ResizeObserver < "u") {
			let e = new ResizeObserver(() => r.current(n));
			e.observe(n), i.add(() => e.disconnect());
		}
		if (typeof IntersectionObserver < "u") {
			let e = new IntersectionObserver(() => r.current(n));
			e.observe(n), i.add(() => e.disconnect());
		}
		return () => i.dispose();
	}, [
		t,
		r,
		e
	]);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/focus-management.js
var kr = [
	"[contentEditable=true]",
	"[tabindex]",
	"a[href]",
	"area[href]",
	"button:not([disabled])",
	"iframe",
	"input:not([disabled])",
	"select:not([disabled])",
	"details>summary",
	"textarea:not([disabled])"
].map((e) => `${e}:not([tabindex='-1'])`).join(",");
["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var Ar = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(Ar || {}), jr = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(jr || {}), Mr = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Mr || {}), Nr = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Nr || {});
function Pr(e, t = 0) {
	return e === ot(e)?.body ? !1 : U(t, {
		0() {
			return e.matches(kr);
		},
		1() {
			let t = e;
			for (; t !== null;) {
				if (t.matches(kr)) return !0;
				t = t.parentElement;
			}
			return !1;
		}
	});
}
var Fr = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Fr || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
	e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
	e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0)), ["textarea", "input"].join(",");
function Ir(e, t = (e) => e) {
	return e.slice().sort((e, n) => {
		let r = t(e), i = t(n);
		if (r === null || i === null) return 0;
		let a = r.compareDocumentPosition(i);
		return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
	});
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/platform.js
function Lr() {
	return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Rr() {
	return /Android/gi.test(window.navigator.userAgent);
}
function zr() {
	return Lr() || Rr();
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-document-event.js
function Br(e, t, n, r) {
	let i = ft(n);
	C(() => {
		if (!e) return;
		function n(e) {
			i.current(e);
		}
		return document.addEventListener(t, n, r), () => document.removeEventListener(t, n, r);
	}, [
		e,
		t,
		r
	]);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-window-event.js
function Vr(e, t, n, r) {
	let i = ft(n);
	C(() => {
		if (!e) return;
		function n(e) {
			i.current(e);
		}
		return window.addEventListener(t, n, r), () => window.removeEventListener(t, n, r);
	}, [
		e,
		t,
		r
	]);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-outside-click.js
var Hr = 30;
function Ur(e, t, n) {
	let r = ft(n), i = b(function(e, n) {
		if (e.defaultPrevented) return;
		let i = n(e);
		if (i === null || !i.getRootNode().contains(i) || !i.isConnected) return;
		let a = function e(t) {
			return typeof t == "function" ? e(t()) : Array.isArray(t) || t instanceof Set ? t : [t];
		}(t);
		for (let t of a) if (t !== null && (t.contains(i) || e.composed && e.composedPath().includes(t))) return;
		return !Pr(i, Nr.Loose) && i.tabIndex !== -1 && e.preventDefault(), r.current(e, i);
	}, [r, t]), a = O(null);
	Br(e, "pointerdown", (e) => {
		zr() || (a.current = e.composedPath?.call(e)?.[0] || e.target);
	}, !0), Br(e, "pointerup", (e) => {
		if (zr() || !a.current) return;
		let t = a.current;
		return a.current = null, i(e, () => t);
	}, !0);
	let o = O({
		x: 0,
		y: 0
	});
	Br(e, "touchstart", (e) => {
		o.current.x = e.touches[0].clientX, o.current.y = e.touches[0].clientY;
	}, !0), Br(e, "touchend", (e) => {
		let t = {
			x: e.changedTouches[0].clientX,
			y: e.changedTouches[0].clientY
		};
		if (!(Math.abs(t.x - o.current.x) >= Hr || Math.abs(t.y - o.current.y) >= Hr)) return i(e, () => $t(e.target) ? e.target : null);
	}, !0), Vr(e, "blur", (e) => i(e, () => tn(window.document.activeElement) ? window.document.activeElement : null), !0);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-owner.js
function Wr(...e) {
	return D(() => ot(...e), [...e]);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-quick-release.js
var Gr = ((e) => (e[e.Ignore = 0] = "Ignore", e[e.Select = 1] = "Select", e[e.Close = 2] = "Close", e))(Gr || {}), Kr = {
	Ignore: { kind: 0 },
	Select: (e) => ({
		kind: 1,
		target: e
	}),
	Close: { kind: 2 }
}, qr = 200, Jr = 5;
function Yr(e, { trigger: t, action: n, close: r, select: i }) {
	let a = O(null), o = O(null), s = O(null);
	Br(e && t !== null, "pointerdown", (e) => {
		Xt(e?.target) && t != null && t.contains(e.target) && (o.current = e.x, s.current = e.y, a.current = e.timeStamp);
	}), Br(e && t !== null, "pointerup", (e) => {
		let t = a.current;
		if (t === null || (a.current = null, !$t(e.target)) || Math.abs(e.x - (o.current ?? e.x)) < Jr && Math.abs(e.y - (s.current ?? e.y)) < Jr) return;
		let c = n(e);
		switch (c.kind) {
			case 0: return;
			case 1:
				e.timeStamp - t > qr && (i(c.target), r());
				break;
			case 2:
				r();
				break;
		}
	}, { capture: !0 });
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-event-listener.js
function Xr(e, t, n, r) {
	let i = ft(n);
	C(() => {
		e ??= window;
		function n(e) {
			i.current(e);
		}
		return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r);
	}, [
		e,
		t,
		r
	]);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-refocusable-input.js
function Zr(e) {
	let t = O({
		value: "",
		selectionStart: null,
		selectionEnd: null
	});
	return Xr(e, "blur", (e) => {
		let n = e.target;
		nn(n) && (t.current = {
			value: n.value,
			selectionStart: n.selectionStart,
			selectionEnd: n.selectionEnd
		});
	}), H(() => {
		if (!lt(e) && nn(e) && e.isConnected) {
			if (e.focus({ preventScroll: !0 }), e.value !== t.current.value) e.setSelectionRange(e.value.length, e.value.length);
			else {
				let { selectionStart: n, selectionEnd: r } = t.current;
				n !== null && r !== null && e.setSelectionRange(n, r);
			}
			t.current = {
				value: "",
				selectionStart: null,
				selectionEnd: null
			};
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js
function Qr(e, t) {
	return D(() => {
		if (e.type) return e.type;
		let n = e.as ?? "button";
		if (typeof n == "string" && n.toLowerCase() === "button" || t?.tagName === "BUTTON" && !t.hasAttribute("type")) return "button";
	}, [
		e.type,
		e.as,
		t
	]);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-store.js
function $r(e) {
	return A(e.subscribe, e.getSnapshot, e.getSnapshot);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/store.js
function ei(e, t) {
	let n = e(), r = /* @__PURE__ */ new Set();
	return {
		getSnapshot() {
			return n;
		},
		subscribe(e) {
			return r.add(e), () => r.delete(e);
		},
		dispatch(e, ...i) {
			let a = t[e].call(n, ...i);
			a && (n = a, r.forEach((e) => e()));
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/document-overflow/adjust-scrollbar-padding.js
function ti() {
	let e;
	return {
		before({ doc: t }) {
			let n = t.documentElement, r = t.defaultView ?? window;
			e = Math.max(0, r.innerWidth - n.clientWidth);
		},
		after({ doc: t, d: n }) {
			let r = t.documentElement, i = Math.max(0, r.clientWidth - r.offsetWidth), a = Math.max(0, e - i);
			n.style(r, "paddingRight", `${a}px`);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/document-overflow/handle-ios-locking.js
function ni() {
	return Lr() ? { before({ doc: e, d: t, meta: n }) {
		function r(e) {
			for (let t of n().containers) for (let n of t()) if (n.contains(e)) return !0;
			return !1;
		}
		t.microTask(() => {
			if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
				let n = B();
				n.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => n.dispose()));
			}
			let n = window.scrollY ?? window.pageYOffset, i = null;
			t.addEventListener(e, "click", (t) => {
				if ($t(t.target)) try {
					let n = t.target.closest("a");
					if (!n) return;
					let { hash: a } = new URL(n.href), o = e.querySelector(a);
					$t(o) && !r(o) && (i = o);
				} catch {}
			}, !0), t.group((n) => {
				t.addEventListener(e, "touchstart", (e) => {
					if (n.dispose(), $t(e.target) && en(e.target)) if (r(e.target)) {
						let t = e.target;
						for (; t.parentElement && r(t.parentElement);) t = t.parentElement;
						n.style(t, "overscrollBehavior", "contain");
					} else n.style(e.target, "touchAction", "none");
				});
			}), t.addEventListener(e, "touchmove", (e) => {
				if ($t(e.target)) {
					if (nn(e.target)) return;
					if (r(e.target)) {
						let t = e.target;
						for (; t.parentElement && t.dataset.headlessuiPortal !== "" && !(t.scrollHeight > t.clientHeight || t.scrollWidth > t.clientWidth);) t = t.parentElement;
						t.dataset.headlessuiPortal === "" && e.preventDefault();
					} else e.preventDefault();
				}
			}, { passive: !1 }), t.add(() => {
				n !== (window.scrollY ?? window.pageYOffset) && window.scrollTo(0, n), i && i.isConnected && (i.scrollIntoView({ block: "nearest" }), i = null);
			});
		});
	} } : {};
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/document-overflow/prevent-scroll.js
function ri() {
	return { before({ doc: e, d: t }) {
		t.style(e.documentElement, "overflow", "hidden");
	} };
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/document-overflow/overflow-store.js
function ii(e) {
	let t = {};
	for (let n of e) Object.assign(t, n(t));
	return t;
}
var ai = ei(() => /* @__PURE__ */ new Map(), {
	PUSH(e, t) {
		let n = this.get(e) ?? {
			doc: e,
			count: 0,
			d: B(),
			meta: /* @__PURE__ */ new Set(),
			computedMeta: {}
		};
		return n.count++, n.meta.add(t), n.computedMeta = ii(n.meta), this.set(e, n), this;
	},
	POP(e, t) {
		let n = this.get(e);
		return n && (n.count--, n.meta.delete(t), n.computedMeta = ii(n.meta)), this;
	},
	SCROLL_PREVENT(e) {
		let t = {
			doc: e.doc,
			d: e.d,
			meta() {
				return e.computedMeta;
			}
		}, n = [
			ni(),
			ti(),
			ri()
		];
		n.forEach(({ before: e }) => e?.(t)), n.forEach(({ after: e }) => e?.(t));
	},
	SCROLL_ALLOW({ d: e }) {
		e.dispose();
	},
	TEARDOWN({ doc: e }) {
		this.delete(e);
	}
});
ai.subscribe(() => {
	let e = ai.getSnapshot(), t = /* @__PURE__ */ new Map();
	for (let [n] of e) t.set(n, n.documentElement.style.overflow);
	for (let n of e.values()) {
		let e = t.get(n.doc) === "hidden", r = n.count !== 0;
		(r && !e || !r && e) && ai.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n), n.count === 0 && ai.dispatch("TEARDOWN", n);
	}
});
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/document-overflow/use-document-overflow.js
function oi(e, t, n = () => ({ containers: [] })) {
	let r = $r(ai), i = t ? r.get(t) : void 0, a = i ? i.count > 0 : !1;
	return V(() => {
		if (!(!t || !e)) return ai.dispatch("PUSH", t, n), () => ai.dispatch("POP", t, n);
	}, [e, t]), a;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-scroll-lock.js
function si(e, t, n = () => [document.body]) {
	oi(Sr(e, "scroll-lock"), t, (e) => ({ containers: [...e.containers ?? [], n] }));
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-tracked-pointer.js
function ci(e) {
	return [e.screenX, e.screenY];
}
function li() {
	let e = O([-1, -1]);
	return {
		wasMoved(t) {
			let n = ci(t);
			return e.current[0] === n[0] && e.current[1] === n[1] ? !1 : (e.current = n, !0);
		},
		update(t) {
			e.current = ci(t);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-flags.js
function ui(e = 0) {
	let [t, n] = k(e);
	return {
		flags: t,
		setFlag: b((e) => n(e), []),
		addFlag: b((e) => n((t) => t | e), []),
		hasFlag: b((e) => (t & e) === e, [t]),
		removeFlag: b((e) => n((t) => t & ~e), []),
		toggleFlag: b((e) => n((t) => t ^ e), [])
	};
}
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && (process == null ? void 0 : process.env)?.NODE_ENV === "test" && (Element == null ? void 0 : Element.prototype)?.getAnimations === void 0 && (Element.prototype.getAnimations = function() {
	return console.warn([
		"Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.",
		"Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.",
		"",
		"Example usage:",
		"```js",
		"import { mockAnimationsApi } from 'jsdom-testing-mocks'",
		"mockAnimationsApi()",
		"```"
	].join("\n")), [];
});
var di = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(di || {});
function fi(e) {
	let t = {};
	for (let n in e) e[n] === !0 && (t[`data-${n}`] = "");
	return t;
}
function pi(e, t, n, r) {
	let [i, a] = k(n), { hasFlag: o, addFlag: s, removeFlag: c } = ui(e && i ? 3 : 0), l = O(!1), u = O(!1);
	return V(() => {
		var i;
		if (e) {
			if (n && a(!0), !t) {
				n && s(3);
				return;
			}
			return (i = r?.start) == null || i.call(r, n), mi(t, {
				inFlight: l,
				prepare() {
					u.current ? u.current = !1 : u.current = l.current, l.current = !0, !u.current && (n ? (s(3), c(4)) : (s(4), c(2)));
				},
				run() {
					u.current ? n ? (c(3), s(4)) : (c(4), s(3)) : n ? c(1) : s(1);
				},
				done() {
					var e;
					u.current && _i(t) || (l.current = !1, c(7), n || a(!1), (e = r?.end) == null || e.call(r, n));
				}
			});
		}
	}, [
		e,
		n,
		t,
		dt()
	]), e ? [i, {
		closed: o(1),
		enter: o(2),
		leave: o(4),
		transition: o(2) || o(4)
	}] : [n, {
		closed: void 0,
		enter: void 0,
		leave: void 0,
		transition: void 0
	}];
}
function mi(e, { prepare: t, run: n, done: r, inFlight: i }) {
	let a = B();
	return gi(e, {
		prepare: t,
		inFlight: i
	}), a.nextFrame(() => {
		n(), a.requestAnimationFrame(() => {
			a.add(hi(e, r));
		});
	}), a.dispose;
}
function hi(e, t) {
	let n = B();
	if (!e) return n.dispose;
	let r = !1;
	n.add(() => {
		r = !0;
	});
	let i = e.getAnimations?.call(e).filter((e) => e instanceof CSSTransition) ?? [];
	return i.length === 0 ? (t(), n.dispose) : (Promise.allSettled(i.map((e) => e.finished)).then(() => {
		r || t();
	}), n.dispose);
}
function gi(e, { inFlight: t, prepare: n }) {
	if (t != null && t.current) {
		n();
		return;
	}
	let r = e.style.transition;
	e.style.transition = "none", n(), e.offsetHeight, e.style.transition = r;
}
function _i(e) {
	return (e.getAnimations?.call(e) ?? []).some((e) => e instanceof CSSTransition && e.playState !== "finished");
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-tree-walker.js
function vi(e, { container: t, accept: n, walk: r }) {
	let i = O(n), a = O(r);
	C(() => {
		i.current = n, a.current = r;
	}, [n, r]), V(() => {
		if (!t || !e) return;
		let n = ot(t);
		if (!n) return;
		let r = i.current, o = a.current, s = Object.assign((e) => r(e), { acceptNode: r }), c = n.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, s, !1);
		for (; c.nextNode();) o(c.currentNode);
	}, [
		t,
		e,
		i,
		a
	]);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-watch.js
function yi(e, t) {
	let n = O([]), r = H(e);
	C(() => {
		let e = [...n.current];
		for (let [i, a] of t.entries()) if (n.current[i] !== a) {
			let i = r(t, e);
			return n.current = t, i;
		}
	}, [r, ...t]);
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+react@0.26.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs
function bi() {
	let e = navigator.userAgentData;
	return e && Array.isArray(e.brands) ? e.brands.map((e) => {
		let { brand: t, version: n } = e;
		return t + "/" + n;
	}).join(" ") : navigator.userAgent;
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+react@0.26.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@floating-ui/react/dist/floating-ui.react.mjs
var xi = { ...f }, Si = xi.useInsertionEffect || ((e) => e());
function Ci(e) {
	let t = f.useRef(() => {
		if (process.env.NODE_ENV !== "production") throw Error("Cannot call an event handler while rendering.");
	});
	return Si(() => {
		t.current = e;
	}), f.useCallback(function() {
		var e = [...arguments];
		return t.current == null ? void 0 : t.current(...e);
	}, []);
}
var wi = "ArrowUp", Ti = "ArrowDown", Ei = "ArrowLeft", Di = "ArrowRight", Oi = typeof document < "u" ? E : C, ki = [Ei, Di], Ai = [wi, Ti];
[...ki, ...Ai];
var ji = !1, Mi = 0, Ni = () => "floating-ui-" + Math.random().toString(36).slice(2, 6) + Mi++;
function Pi() {
	let [e, t] = f.useState(() => ji ? Ni() : void 0);
	return Oi(() => {
		e ?? t(Ni());
	}, []), f.useEffect(() => {
		ji = !0;
	}, []), e;
}
var Fi = xi.useId || Pi, Ii;
process.env.NODE_ENV !== "production" && (Ii = /* @__PURE__ */ new Set());
function Li() {
	var e;
	let t = "Floating UI: " + [...arguments].join(" ");
	if (!((e = Ii) != null && e.has(t))) {
		var n;
		(n = Ii) == null || n.add(t), console.warn(t);
	}
}
function Ri() {
	var e;
	let t = "Floating UI: " + [...arguments].join(" ");
	if (!((e = Ii) != null && e.has(t))) {
		var n;
		(n = Ii) == null || n.add(t), console.error(t);
	}
}
function zi() {
	let e = /* @__PURE__ */ new Map();
	return {
		emit(t, n) {
			var r;
			(r = e.get(t)) == null || r.forEach((e) => e(n));
		},
		on(t, n) {
			e.set(t, [...e.get(t) || [], n]);
		},
		off(t, n) {
			e.set(t, e.get(t)?.filter((e) => e !== n) || []);
		}
	};
}
var Bi = /* @__PURE__ */ f.createContext(null), Vi = /* @__PURE__ */ f.createContext(null), Hi = () => f.useContext(Bi)?.id || null, Ui = () => f.useContext(Vi), Wi = "data-floating-ui-focusable";
function Gi(e) {
	let { open: t = !1, onOpenChange: n, elements: r } = e, a = Fi(), o = f.useRef({}), [s] = f.useState(() => zi()), c = Hi() != null;
	if (process.env.NODE_ENV !== "production") {
		let e = r.reference;
		e && !i(e) && Ri("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
	}
	let [l, u] = f.useState(r.reference), d = Ci((e, t, r) => {
		o.current.openEvent = e ? t : void 0, s.emit("openchange", {
			open: e,
			event: t,
			reason: r,
			nested: c
		}), n?.(e, t, r);
	}), p = f.useMemo(() => ({ setPositionReference: u }), []), m = f.useMemo(() => ({
		reference: l || r.reference || null,
		floating: r.floating || null,
		domReference: r.reference
	}), [
		l,
		r.reference,
		r.floating
	]);
	return f.useMemo(() => ({
		dataRef: o,
		open: t,
		onOpenChange: d,
		elements: m,
		events: s,
		floatingId: a,
		refs: p
	}), [
		t,
		d,
		m,
		s,
		a,
		p
	]);
}
function Ki(e) {
	e === void 0 && (e = {});
	let { nodeId: t } = e, n = Gi({
		...e,
		elements: {
			reference: null,
			floating: null,
			...e.elements
		}
	}), r = e.rootContext || n, a = r.elements, [o, s] = f.useState(null), [c, l] = f.useState(null), u = a?.domReference || o, p = f.useRef(null), m = Ui();
	Oi(() => {
		u && (p.current = u);
	}, [u]);
	let h = d({
		...e,
		elements: {
			...a,
			...c && { reference: c }
		}
	}), g = f.useCallback((e) => {
		let t = i(e) ? {
			getBoundingClientRect: () => e.getBoundingClientRect(),
			contextElement: e
		} : e;
		l(t), h.refs.setReference(t);
	}, [h.refs]), _ = f.useCallback((e) => {
		(i(e) || e === null) && (p.current = e, s(e)), (i(h.refs.reference.current) || h.refs.reference.current === null || e !== null && !i(e)) && h.refs.setReference(e);
	}, [h.refs]), v = f.useMemo(() => ({
		...h.refs,
		setReference: _,
		setPositionReference: g,
		domReference: p
	}), [
		h.refs,
		_,
		g
	]), y = f.useMemo(() => ({
		...h.elements,
		domReference: u
	}), [h.elements, u]), b = f.useMemo(() => ({
		...h,
		...r,
		refs: v,
		elements: y,
		nodeId: t
	}), [
		h,
		v,
		y,
		t,
		r
	]);
	return Oi(() => {
		r.dataRef.current.floatingContext = b;
		let e = m?.nodesRef.current.find((e) => e.id === t);
		e && (e.context = b);
	}), f.useMemo(() => ({
		...h,
		context: b,
		refs: v,
		elements: y
	}), [
		h,
		v,
		y,
		b
	]);
}
var qi = "active", Ji = "selected";
function Yi(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = n === "item", a = e;
	if (i && e) {
		let { [qi]: t, [Ji]: n, ...r } = e;
		a = r;
	}
	return {
		...n === "floating" && {
			tabIndex: -1,
			[Wi]: ""
		},
		...a,
		...t.map((t) => {
			let r = t ? t[n] : null;
			return typeof r == "function" ? e ? r(e) : null : r;
		}).concat(e).reduce((e, t) => (t && Object.entries(t).forEach((t) => {
			let [n, a] = t;
			if (!(i && [qi, Ji].includes(n))) if (n.indexOf("on") === 0) {
				if (r.has(n) || r.set(n, []), typeof a == "function") {
					var o;
					(o = r.get(n)) == null || o.push(a), e[n] = function() {
						var e = [...arguments];
						return r.get(n)?.map((t) => t(...e)).find((e) => e !== void 0);
					};
				}
			} else e[n] = a;
		}), e), {})
	};
}
function Xi(e) {
	e === void 0 && (e = []);
	let t = e.map((e) => e?.reference), n = e.map((e) => e?.floating), r = e.map((e) => e?.item), i = f.useCallback((t) => Yi(t, e, "reference"), t), a = f.useCallback((t) => Yi(t, e, "floating"), n), o = f.useCallback((t) => Yi(t, e, "item"), r);
	return f.useMemo(() => ({
		getReferenceProps: i,
		getFloatingProps: a,
		getItemProps: o
	}), [
		i,
		a,
		o
	]);
}
function Zi(e, t) {
	return {
		...e,
		rects: {
			...e.rects,
			floating: {
				...e.rects.floating,
				height: t
			}
		}
	};
}
var Qi = (e) => ({
	name: "inner",
	options: e,
	async fn(t) {
		let { listRef: i, overflowRef: c, onFallbackChange: l, offset: d = 0, index: f = 0, minItemsVisible: p = 4, referenceOverflowThreshold: m = 0, scrollRef: h, ...g } = n(e, t), { rects: _, elements: { floating: v } } = t, y = i.current[f], b = h?.current || v, x = v.clientTop || b.clientTop, S = v.clientTop !== 0, C = b.clientTop !== 0, w = v === b;
		if (process.env.NODE_ENV !== "production" && (t.placement.startsWith("bottom") || Li("`placement` side must be \"bottom\" when using the `inner`", "middleware.")), !y) return {};
		let T = {
			...t,
			...await a(-y.offsetTop - v.clientTop - _.reference.height / 2 - y.offsetHeight / 2 - d).fn(t)
		}, E = await o(Zi(T, b.scrollHeight + x + v.clientTop), g), D = await o(T, {
			...g,
			elementContext: "reference"
		}), O = r(0, E.top), k = T.y + O, A = (b.scrollHeight > b.clientHeight ? (e) => e : s)(r(0, b.scrollHeight + (S && w || C ? x * 2 : 0) - O - r(0, E.bottom)));
		if (b.style.maxHeight = A + "px", b.scrollTop = O, l) {
			let e = b.offsetHeight < y.offsetHeight * u(p, i.current.length) - 1 || D.top >= -m || D.bottom >= -m;
			j.flushSync(() => l(e));
		}
		return c && (c.current = await o(Zi({
			...T,
			y: k
		}, b.offsetHeight + x + v.clientTop), g)), { y: k };
	}
});
function $i(e, t) {
	let { open: n, elements: r } = e, { enabled: i = !0, overflowRef: a, scrollRef: o, onChange: s } = t, c = Ci(s), l = f.useRef(!1), u = f.useRef(null), d = f.useRef(null);
	f.useEffect(() => {
		if (!i) return;
		function e(e) {
			if (e.ctrlKey || !t || a.current == null) return;
			let n = e.deltaY, r = a.current.top >= -.5, i = a.current.bottom >= -.5, o = t.scrollHeight - t.clientHeight, s = n < 0 ? -1 : 1, l = n < 0 ? "max" : "min";
			t.scrollHeight <= t.clientHeight || (!r && n > 0 || !i && n < 0 ? (e.preventDefault(), j.flushSync(() => {
				c((e) => e + Math[l](n, o * s));
			})) : /firefox/i.test(bi()) && (t.scrollTop += n));
		}
		let t = o?.current || r.floating;
		if (n && t) return t.addEventListener("wheel", e), requestAnimationFrame(() => {
			u.current = t.scrollTop, a.current != null && (d.current = { ...a.current });
		}), () => {
			u.current = null, d.current = null, t.removeEventListener("wheel", e);
		};
	}, [
		i,
		n,
		r.floating,
		a,
		o,
		c
	]);
	let p = f.useMemo(() => ({
		onKeyDown() {
			l.current = !0;
		},
		onWheel() {
			l.current = !1;
		},
		onPointerMove() {
			l.current = !1;
		},
		onScroll() {
			let e = o?.current || r.floating;
			if (!(!a.current || !e || !l.current)) {
				if (u.current !== null) {
					let t = e.scrollTop - u.current;
					(a.current.bottom < -.5 && t < -1 || a.current.top < -.5 && t > 1) && j.flushSync(() => c((e) => e + t));
				}
				requestAnimationFrame(() => {
					u.current = e.scrollTop;
				});
			}
		}
	}), [
		r.floating,
		c,
		a,
		o
	]);
	return f.useMemo(() => i ? { floating: p } : {}, [i, p]);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/internal/floating.js
var ea = g({
	styles: void 0,
	setReference: () => {},
	setFloating: () => {},
	getReferenceProps: () => ({}),
	getFloatingProps: () => ({}),
	slot: {}
});
ea.displayName = "FloatingContext";
var ta = g(null);
ta.displayName = "PlacementContext";
function na(e) {
	return D(() => e ? typeof e == "string" ? { to: e } : e : null, [e]);
}
function ra() {
	return x(ea).setReference;
}
function ia() {
	let { getFloatingProps: e, slot: t } = x(ea);
	return b((...n) => Object.assign({}, e(...n), { "data-anchor": t.anchor }), [e, t]);
}
function aa(e = null) {
	e === !1 && (e = null), typeof e == "string" && (e = { to: e });
	let t = x(ta), n = D(() => e, [JSON.stringify(e, (e, t) => t?.outerHTML ?? t)]);
	V(() => {
		t?.(n ?? null);
	}, [t, n]);
	let r = x(ea);
	return D(() => [r.setFloating, e ? r.styles : {}], [
		r.setFloating,
		e,
		r.styles
	]);
}
var oa = 4;
function sa({ children: n, enabled: r = !0 }) {
	let [i, o] = k(null), [s, u] = k(0), d = O(null), [p, m] = k(null);
	ca(p);
	let h = r && i !== null && p !== null, { to: g = "bottom", gap: _ = 0, offset: v = 0, padding: y = 0, inner: b } = la(i, p), [x, S = "center"] = g.split(" ");
	V(() => {
		h && u(0);
	}, [h]);
	let { refs: C, floatingStyles: w, context: T } = Ki({
		open: h,
		placement: x === "selection" ? S === "center" ? "bottom" : `bottom-${S}` : S === "center" ? `${x}` : `${x}-${S}`,
		strategy: "absolute",
		transform: !1,
		middleware: [
			a({
				mainAxis: x === "selection" ? 0 : _,
				crossAxis: v
			}),
			e({ padding: y }),
			x !== "selection" && c({ padding: y }),
			x === "selection" && b ? Qi({
				...b,
				padding: y,
				overflowRef: d,
				offset: s,
				minItemsVisible: oa,
				referenceOverflowThreshold: y,
				onFallbackChange(e) {
					if (!e) return;
					let t = T.elements.floating;
					if (!t) return;
					let n = parseFloat(getComputedStyle(t).scrollPaddingBottom) || 0, r = Math.min(oa, t.childElementCount), i = 0, a = 0;
					for (let e of T.elements.floating?.childNodes ?? []) if (Qt(e)) {
						let o = e.offsetTop, s = o + e.clientHeight + n, c = t.scrollTop, l = c + t.clientHeight;
						if (o >= c && s <= l) r--;
						else {
							a = Math.max(0, Math.min(s, l) - Math.max(o, c)), i = e.clientHeight;
							break;
						}
					}
					r >= 1 && u((e) => {
						let t = i * r - a + n;
						return e >= t ? e : t;
					});
				}
			}) : null,
			l({
				padding: y,
				apply({ availableWidth: e, availableHeight: t, elements: n }) {
					Object.assign(n.floating.style, {
						overflow: "auto",
						maxWidth: `${e}px`,
						maxHeight: `min(var(--anchor-max-height, 100vh), ${t}px)`
					});
				}
			})
		].filter(Boolean),
		whileElementsMounted: t
	}), [E = x, A = S] = T.placement.split("-");
	x === "selection" && (E = "selection");
	let j = D(() => ({ anchor: [E, A].filter(Boolean).join(" ") }), [E, A]), { getReferenceProps: M, getFloatingProps: N } = Xi([$i(T, {
		overflowRef: d,
		onChange: u
	})]), P = H((e) => {
		m(e), C.setFloating(e);
	});
	return f.createElement(ta.Provider, { value: o }, f.createElement(ea.Provider, { value: {
		setFloating: P,
		setReference: C.setReference,
		styles: w,
		getReferenceProps: M,
		getFloatingProps: N,
		slot: j
	} }, n));
}
function ca(e) {
	V(() => {
		if (!e) return;
		let t = new MutationObserver(() => {
			let t = window.getComputedStyle(e).maxHeight, n = parseFloat(t);
			if (isNaN(n)) return;
			let r = parseInt(t);
			isNaN(r) || n !== r && (e.style.maxHeight = `${Math.ceil(n)}px`);
		});
		return t.observe(e, {
			attributes: !0,
			attributeFilter: ["style"]
		}), () => {
			t.disconnect();
		};
	}, [e]);
}
function la(e, t) {
	let n = ua(e?.gap ?? "var(--anchor-gap, 0)", t), r = ua(e?.offset ?? "var(--anchor-offset, 0)", t), i = ua(e?.padding ?? "var(--anchor-padding, 0)", t);
	return {
		...e,
		gap: n,
		offset: r,
		padding: i
	};
}
function ua(e, t, n = void 0) {
	let r = dt(), i = H((e, t) => {
		if (e == null) return [n, null];
		if (typeof e == "number") return [e, null];
		if (typeof e == "string") {
			if (!t) return [n, null];
			let i = fa(e, t);
			return [i, (n) => {
				let a = da(e);
				{
					let o = a.map((e) => window.getComputedStyle(t).getPropertyValue(e));
					r.requestAnimationFrame(function s() {
						r.nextFrame(s);
						let c = !1;
						for (let [e, n] of a.entries()) {
							let r = window.getComputedStyle(t).getPropertyValue(n);
							if (o[e] !== r) {
								o[e] = r, c = !0;
								break;
							}
						}
						if (!c) return;
						let l = fa(e, t);
						i !== l && (n(l), i = l);
					});
				}
				return r.dispose;
			}];
		}
		return [n, null];
	}), a = D(() => i(e, t)[0], [e, t]), [o = a, s] = k();
	return V(() => {
		let [n, r] = i(e, t);
		if (s(n), r) return r(s);
	}, [e, t]), o;
}
function da(e) {
	let t = /var\((.*)\)/.exec(e);
	if (t) {
		let e = t[1].indexOf(",");
		if (e === -1) return [t[1]];
		let n = t[1].slice(0, e).trim(), r = t[1].slice(e + 1).trim();
		return r ? [n, ...da(r)] : [n];
	}
	return [];
}
function fa(e, t) {
	let n = document.createElement("div");
	t.appendChild(n), n.style.setProperty("margin-top", "0px", "important"), n.style.setProperty("margin-top", e, "important");
	let r = parseFloat(window.getComputedStyle(n).marginTop) || 0;
	return t.removeChild(n), r;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/internal/frozen.js
function pa({ children: e, freeze: t }, n) {
	let r = ha(t, e);
	return y(r) ? h(r, { ref: n }) : p.createElement(p.Fragment, null, r);
}
var ma = p.forwardRef(pa);
function ha(e, t) {
	let [n, r] = k(t);
	return !e && n !== t && r(t), e ? n : t;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/internal/open-closed.js
var ga = g(null);
ga.displayName = "OpenClosedContext";
var _a = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(_a || {});
function va() {
	return x(ga);
}
function ya({ value: e, children: t }) {
	return p.createElement(ga.Provider, { value: e }, t);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/document-ready.js
function ba(e) {
	function t() {
		document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
	}
	typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/active-element-history.js
var xa = [];
ba(() => {
	function e(e) {
		if (!$t(e.target) || e.target === document.body || xa[0] === e.target) return;
		let t = e.target;
		t = t.closest(kr), xa.unshift(t ?? e.target), xa = xa.filter((e) => e != null && e.isConnected), xa.splice(10);
	}
	window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/utils/calculate-active-index.js
function Sa(e) {
	throw Error("Unexpected object: " + e);
}
var X = ((e) => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(X || {});
function Ca(e, t) {
	let n = t.resolveItems();
	if (n.length <= 0) return null;
	let r = t.resolveActiveIndex(), i = r ?? -1;
	switch (e.focus) {
		case 0:
			for (let e = 0; e < n.length; ++e) if (!t.resolveDisabled(n[e], e, n)) return e;
			return r;
		case 1:
			i === -1 && (i = n.length);
			for (let e = i - 1; e >= 0; --e) if (!t.resolveDisabled(n[e], e, n)) return e;
			return r;
		case 2:
			for (let e = i + 1; e < n.length; ++e) if (!t.resolveDisabled(n[e], e, n)) return e;
			return r;
		case 3:
			for (let e = n.length - 1; e >= 0; --e) if (!t.resolveDisabled(n[e], e, n)) return e;
			return r;
		case 4:
			for (let r = 0; r < n.length; ++r) if (t.resolveId(n[r], r, n) === e.id) return r;
			return r;
		case 5: return null;
		default: Sa(e);
	}
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-on-unmount.js
function wa(e) {
	let t = H(e), n = O(!1);
	C(() => (n.current = !1, () => {
		n.current = !0, ut(() => {
			n.current && t();
		});
	}), [t]);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js
function Ta() {
	let e = typeof document > "u";
	return "useSyncExternalStore" in f ? ((e) => e.useSyncExternalStore)(f)(() => () => {}, () => !1, () => !e) : !1;
}
function Ea() {
	let e = Ta(), [t, n] = f.useState(z.isHandoffComplete);
	return t && z.isHandoffComplete === !1 && n(!1), f.useEffect(() => {
		t !== !0 && n(!0);
	}, [t]), f.useEffect(() => z.handoff(), []), e ? !1 : t;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/internal/portal-force-root.js
var Da = g(!1);
function Oa() {
	return x(Da);
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/components/portal/portal.js
function ka(e) {
	let t = Oa(), n = x(Pa), [r, i] = k(() => {
		if (!t && n !== null) return n.current ?? null;
		if (z.isServer) return null;
		let r = e?.getElementById("headlessui-portal-root");
		if (r) return r;
		if (e === null) return null;
		let i = e.createElement("div");
		return i.setAttribute("id", "headlessui-portal-root"), e.body.appendChild(i);
	});
	return C(() => {
		r !== null && (e != null && e.body.contains(r) || e == null || e.body.appendChild(r));
	}, [r, e]), C(() => {
		t || n !== null && i(n.current);
	}, [
		n,
		i,
		t
	]), r;
}
var Aa = m, ja = G(function(e, t) {
	let { ownerDocument: n = null, ...r } = e, i = O(null), a = fn(dn((e) => {
		i.current = e;
	}), t), o = Wr(i.current), s = ka(n ?? o), c = x(Ia), l = dt(), u = Ea(), d = W();
	return wa(() => {
		var e;
		s && s.childNodes.length <= 0 && ((e = s.parentElement) == null || e.removeChild(s));
	}), !s || !u ? null : M(p.createElement("div", {
		"data-headlessui-portal": "",
		ref: (e) => {
			l.dispose(), c && e && l.add(c.register(e));
		}
	}, d({
		ourProps: { ref: a },
		theirProps: r,
		slot: {},
		defaultTag: Aa,
		name: "Portal"
	})), s);
});
function Ma(e, t) {
	let n = fn(t), { enabled: r = !0, ownerDocument: i, ...a } = e, o = W();
	return r ? p.createElement(ja, {
		...a,
		ownerDocument: i,
		ref: n
	}) : o({
		ourProps: { ref: n },
		theirProps: a,
		slot: {},
		defaultTag: Aa,
		name: "Portal"
	});
}
var Na = m, Pa = g(null);
function Fa(e, t) {
	let { target: n, ...r } = e, i = { ref: fn(t) }, a = W();
	return p.createElement(Pa.Provider, { value: n }, a({
		ourProps: i,
		theirProps: r,
		defaultTag: Na,
		name: "Popover.Group"
	}));
}
var Ia = g(null), La = G(Ma), Ra = G(Fa), za = Object.assign(La, { Group: Ra }), Ba = {
	Idle: { kind: "Idle" },
	Tracked: (e) => ({
		kind: "Tracked",
		position: e
	}),
	Moved: { kind: "Moved" }
};
function Va(e) {
	let t = e.getBoundingClientRect();
	return `${t.x},${t.y}`;
}
function Ha(e, t, n) {
	let r = B();
	if (t.kind === "Tracked") {
		let i = function() {
			a !== Va(e) && (r.dispose(), n());
		}, { position: a } = t, o = new ResizeObserver(i);
		o.observe(e), r.add(() => o.disconnect()), r.addEventListener(window, "scroll", i, { passive: !0 }), r.addEventListener(window, "resize", i);
	}
	return () => r.dispose();
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/components/combobox/combobox-machine.js
var Ua = Object.defineProperty, Wa = (e, t, n) => t in e ? Ua(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Ga = (e, t, n) => (Wa(e, typeof t == "symbol" ? t : t + "", n), n), Z = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Z || {}), Q = ((e) => (e[e.Single = 0] = "Single", e[e.Multi = 1] = "Multi", e))(Q || {}), $ = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Focus = 1] = "Focus", e[e.Other = 2] = "Other", e))($ || {}), Ka = ((e) => (e[e.OpenCombobox = 0] = "OpenCombobox", e[e.CloseCombobox = 1] = "CloseCombobox", e[e.GoToOption = 2] = "GoToOption", e[e.SetTyping = 3] = "SetTyping", e[e.RegisterOption = 4] = "RegisterOption", e[e.UnregisterOption = 5] = "UnregisterOption", e[e.DefaultToFirstOption = 6] = "DefaultToFirstOption", e[e.SetActivationTrigger = 7] = "SetActivationTrigger", e[e.UpdateVirtualConfiguration = 8] = "UpdateVirtualConfiguration", e[e.SetInputElement = 9] = "SetInputElement", e[e.SetButtonElement = 10] = "SetButtonElement", e[e.SetOptionsElement = 11] = "SetOptionsElement", e[e.MarkInputAsMoved = 12] = "MarkInputAsMoved", e))(Ka || {});
function qa(e, t = (e) => e) {
	let n = e.activeOptionIndex === null ? null : e.options[e.activeOptionIndex], r = t(e.options.slice()), i = r.length > 0 && r[0].dataRef.current.order !== null ? r.sort((e, t) => e.dataRef.current.order - t.dataRef.current.order) : Ir(r, (e) => e.dataRef.current.domRef.current), a = n ? i.indexOf(n) : null;
	return a === -1 && (a = null), {
		options: i,
		activeOptionIndex: a
	};
}
var Ja = {
	1(e) {
		var t;
		if ((t = e.dataRef.current) != null && t.disabled || e.comboboxState === 1) return e;
		let n = e.inputElement ? Ba.Tracked(Va(e.inputElement)) : e.inputPositionState;
		return {
			...e,
			activeOptionIndex: null,
			comboboxState: 1,
			isTyping: !1,
			activationTrigger: 2,
			inputPositionState: n,
			__demoMode: !1
		};
	},
	0(e) {
		var t, n;
		if ((t = e.dataRef.current) != null && t.disabled || e.comboboxState === 0) return e;
		if ((n = e.dataRef.current) != null && n.value) {
			let t = e.dataRef.current.calculateIndex(e.dataRef.current.value);
			if (t !== -1) return {
				...e,
				activeOptionIndex: t,
				comboboxState: 0,
				__demoMode: !1,
				inputPositionState: Ba.Idle
			};
		}
		return {
			...e,
			comboboxState: 0,
			inputPositionState: Ba.Idle,
			__demoMode: !1
		};
	},
	3(e, t) {
		return e.isTyping === t.isTyping ? e : {
			...e,
			isTyping: t.isTyping
		};
	},
	2(e, t) {
		var n, r;
		if ((n = e.dataRef.current) != null && n.disabled || e.optionsElement && !((r = e.dataRef.current) != null && r.optionsPropsRef.current.static) && e.comboboxState === 1) return e;
		if (e.virtual) {
			let { options: n, disabled: r } = e.virtual, i = t.focus === X.Specific ? t.idx : Ca(t, {
				resolveItems: () => n,
				resolveActiveIndex: () => e.activeOptionIndex ?? n.findIndex((e) => !r(e)) ?? null,
				resolveDisabled: r,
				resolveId() {
					throw Error("Function not implemented.");
				}
			}), a = t.trigger ?? 2;
			return e.activeOptionIndex === i && e.activationTrigger === a ? e : {
				...e,
				activeOptionIndex: i,
				activationTrigger: a,
				isTyping: !1,
				__demoMode: !1
			};
		}
		let i = qa(e);
		if (i.activeOptionIndex === null) {
			let e = i.options.findIndex((e) => !e.dataRef.current.disabled);
			e !== -1 && (i.activeOptionIndex = e);
		}
		let a = t.focus === X.Specific ? t.idx : Ca(t, {
			resolveItems: () => i.options,
			resolveActiveIndex: () => i.activeOptionIndex,
			resolveId: (e) => e.id,
			resolveDisabled: (e) => e.dataRef.current.disabled
		}), o = t.trigger ?? 2;
		return e.activeOptionIndex === a && e.activationTrigger === o ? e : {
			...e,
			...i,
			isTyping: !1,
			activeOptionIndex: a,
			activationTrigger: o,
			__demoMode: !1
		};
	},
	4: (e, t) => {
		var n, r, i, a;
		if ((n = e.dataRef.current) != null && n.virtual) return {
			...e,
			options: [...e.options, t.payload]
		};
		let o = t.payload, s = qa(e, (e) => (e.push(o), e));
		e.activeOptionIndex === null && (i = (r = e.dataRef.current).isSelected) != null && i.call(r, t.payload.dataRef.current.value) && (s.activeOptionIndex = s.options.indexOf(o));
		let c = {
			...e,
			...s,
			activationTrigger: 2
		};
		return (a = e.dataRef.current) != null && a.__demoMode && e.dataRef.current.value === void 0 && (c.activeOptionIndex = 0), c;
	},
	5: (e, t) => {
		var n;
		if ((n = e.dataRef.current) != null && n.virtual) return {
			...e,
			options: e.options.filter((e) => e.id !== t.id)
		};
		let r = qa(e, (e) => {
			let n = e.findIndex((e) => e.id === t.id);
			return n !== -1 && e.splice(n, 1), e;
		});
		return {
			...e,
			...r,
			activationTrigger: 2
		};
	},
	6: (e, t) => e.defaultToFirstOption === t.value ? e : {
		...e,
		defaultToFirstOption: t.value
	},
	7: (e, t) => e.activationTrigger === t.trigger ? e : {
		...e,
		activationTrigger: t.trigger
	},
	8: (e, t) => {
		if (e.virtual === null) return {
			...e,
			virtual: {
				options: t.options,
				disabled: t.disabled ?? (() => !1)
			}
		};
		if (e.virtual.options === t.options && e.virtual.disabled === t.disabled) return e;
		let n = e.activeOptionIndex;
		if (e.activeOptionIndex !== null) {
			let r = t.options.indexOf(e.virtual.options[e.activeOptionIndex]);
			n = r === -1 ? null : r;
		}
		return {
			...e,
			activeOptionIndex: n,
			virtual: {
				options: t.options,
				disabled: t.disabled ?? (() => !1)
			}
		};
	},
	9: (e, t) => e.inputElement === t.element ? e : {
		...e,
		inputElement: t.element
	},
	10: (e, t) => e.buttonElement === t.element ? e : {
		...e,
		buttonElement: t.element
	},
	11: (e, t) => e.optionsElement === t.element ? e : {
		...e,
		optionsElement: t.element
	},
	12(e) {
		return e.inputPositionState.kind === "Tracked" ? {
			...e,
			inputPositionState: Ba.Moved
		} : e;
	}
}, Ya = class e extends sr {
	constructor(e) {
		super(e), Ga(this, "actions", {
			onChange: (e) => {
				let { onChange: t, compare: n, mode: r, value: i } = this.state.dataRef.current;
				return U(r, {
					0: () => t?.(e),
					1: () => {
						let r = i.slice(), a = r.findIndex((t) => n(t, e));
						return a === -1 ? r.push(e) : r.splice(a, 1), t?.(r);
					}
				});
			},
			registerOption: (e, t) => (this.send({
				type: 4,
				payload: {
					id: e,
					dataRef: t
				}
			}), () => {
				this.state.activeOptionIndex === this.state.dataRef.current.calculateIndex(t.current.value) && this.send({
					type: 6,
					value: !0
				}), this.send({
					type: 5,
					id: e
				});
			}),
			goToOption: (e, t) => (this.send({
				type: 6,
				value: !1
			}), this.send({
				type: 2,
				...e,
				trigger: t
			})),
			setIsTyping: (e) => {
				this.send({
					type: 3,
					isTyping: e
				});
			},
			closeCombobox: () => {
				var e, t;
				this.send({ type: 1 }), this.send({
					type: 6,
					value: !1
				}), (t = (e = this.state.dataRef.current).onClose) == null || t.call(e);
			},
			openCombobox: () => {
				this.send({ type: 0 }), this.send({
					type: 6,
					value: !0
				});
			},
			setActivationTrigger: (e) => {
				this.send({
					type: 7,
					trigger: e
				});
			},
			selectActiveOption: () => {
				let e = this.selectors.activeOptionIndex(this.state);
				if (e !== null) {
					if (this.actions.setIsTyping(!1), this.state.virtual) this.actions.onChange(this.state.virtual.options[e]);
					else {
						let { dataRef: t } = this.state.options[e];
						this.actions.onChange(t.current.value);
					}
					this.actions.goToOption({
						focus: X.Specific,
						idx: e
					});
				}
			},
			setInputElement: (e) => {
				this.send({
					type: 9,
					element: e
				});
			},
			setButtonElement: (e) => {
				this.send({
					type: 10,
					element: e
				});
			},
			setOptionsElement: (e) => {
				this.send({
					type: 11,
					element: e
				});
			}
		}), Ga(this, "selectors", {
			activeDescendantId: (e) => {
				let t = this.selectors.activeOptionIndex(e);
				if (t !== null) return e.virtual ? e.options.find((n) => !n.dataRef.current.disabled && e.dataRef.current.compare(n.dataRef.current.value, e.virtual.options[t]))?.id : e.options[t]?.id;
			},
			activeOptionIndex: (e) => {
				if (e.defaultToFirstOption && e.activeOptionIndex === null && (e.virtual ? e.virtual.options.length > 0 : e.options.length > 0)) {
					if (e.virtual) {
						let { options: t, disabled: n } = e.virtual, r = t.findIndex((e) => {
							var t;
							return !((t = n?.(e)) != null && t);
						});
						if (r !== -1) return r;
					}
					let t = e.options.findIndex((e) => !e.dataRef.current.disabled);
					if (t !== -1) return t;
				}
				return e.activeOptionIndex;
			},
			activeOption: (e) => {
				let t = this.selectors.activeOptionIndex(e);
				return t === null ? null : e.virtual ? e.virtual.options[t ?? 0] : e.options[t]?.dataRef.current.value ?? null;
			},
			isActive: (e, t, n) => {
				let r = this.selectors.activeOptionIndex(e);
				return r === null ? !1 : e.virtual ? r === e.dataRef.current.calculateIndex(t) : e.options[r]?.id === n;
			},
			shouldScrollIntoView: (e, t, n) => !(e.virtual || e.__demoMode || e.comboboxState !== 0 || e.activationTrigger === 0 || !this.selectors.isActive(e, t, n)),
			didInputMove(e) {
				return e.inputPositionState.kind === "Moved";
			}
		});
		{
			let e = this.state.id, t = _r.get(null);
			this.disposables.add(t.on(mr.Push, (n) => {
				!t.selectors.isTop(n, e) && this.state.comboboxState === 0 && this.actions.closeCombobox();
			})), this.on(0, () => t.actions.push(e)), this.on(1, () => t.actions.pop(e));
		}
		this.disposables.group((e) => {
			this.on(1, (t) => {
				t.inputElement && (e.dispose(), e.add(Ha(t.inputElement, t.inputPositionState, () => {
					this.send({ type: 12 });
				})));
			});
		});
	}
	static new({ id: t, virtual: n = null, __demoMode: r = !1 }) {
		return new e({
			id: t,
			dataRef: { current: {} },
			comboboxState: +!r,
			isTyping: !1,
			options: [],
			virtual: n ? {
				options: n.options,
				disabled: n.disabled ?? (() => !1)
			} : null,
			activeOptionIndex: null,
			activationTrigger: 2,
			inputElement: null,
			buttonElement: null,
			optionsElement: null,
			__demoMode: r,
			inputPositionState: Ba.Idle
		});
	}
	reduce(e, t) {
		return U(t.type, Ja, e, t);
	}
}, Xa = g(null);
function Za(e) {
	let t = x(Xa);
	if (t === null) {
		let t = /* @__PURE__ */ Error(`<${e} /> is missing a parent <Combobox /> component.`);
		throw Error.captureStackTrace && Error.captureStackTrace(t, Qa), t;
	}
	return t;
}
function Qa({ id: e, virtual: t = null, __demoMode: n = !1 }) {
	let r = D(() => Ya.new({
		id: e,
		virtual: t,
		__demoMode: n
	}), []);
	return wa(() => r.dispose()), r;
}
//#endregion
//#region node_modules/.pnpm/@headlessui+react@2.2.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@headlessui/react/dist/components/combobox/combobox.js
var $a = g(null);
$a.displayName = "ComboboxDataContext";
function eo(e) {
	let t = x($a);
	if (t === null) {
		let t = /* @__PURE__ */ Error(`<${e} /> is missing a parent <Combobox /> component.`);
		throw Error.captureStackTrace && Error.captureStackTrace(t, eo), t;
	}
	return t;
}
var to = g(null);
function no(e) {
	let t = Za("VirtualProvider"), { options: n } = eo("VirtualProvider").virtual, r = Y(t, (e) => e.optionsElement), [i, a] = D(() => {
		let e = r;
		if (!e) return [0, 0];
		let t = window.getComputedStyle(e);
		return [parseFloat(t.paddingBlockStart || t.paddingTop), parseFloat(t.paddingBlockEnd || t.paddingBottom)];
	}, [r]), o = Gn({
		enabled: n.length !== 0,
		scrollPaddingStart: i,
		scrollPaddingEnd: a,
		count: n.length,
		estimateSize() {
			return 40;
		},
		getScrollElement() {
			return t.state.optionsElement;
		},
		overscan: 12
	}), [s, c] = k(0);
	V(() => {
		c((e) => e + 1);
	}, [n]);
	let l = o.getVirtualItems(), u = Y(t, (e) => e.activationTrigger === $.Pointer), d = Y(t, t.selectors.activeOptionIndex);
	return l.length === 0 ? null : p.createElement(to.Provider, { value: o }, p.createElement("div", {
		style: {
			position: "relative",
			width: "100%",
			height: `${o.getTotalSize()}px`
		},
		ref: (e) => {
			e && (u || d !== null && n.length > d && o.scrollToIndex(d));
		}
	}, l.map((t) => p.createElement(m, { key: t.key }, p.cloneElement(e.children?.call(e, {
		...e.slot,
		option: n[t.index]
	}), {
		key: `${s}-${t.key}`,
		"data-index": t.index,
		"aria-setsize": n.length,
		"aria-posinset": t.index + 1,
		style: {
			position: "absolute",
			top: 0,
			left: 0,
			transform: `translateY(${t.start}px)`,
			overflowAnchor: "none"
		}
	})))));
}
var ro = m;
function io(e, t) {
	let n = T(), r = vt(), { value: i, defaultValue: a, onChange: o, form: s, name: c, by: l, invalid: u = !1, disabled: d = r || !1, onClose: f, __demoMode: m = !1, multiple: h = !1, immediate: g = !1, virtual: _ = null, nullable: v, ...y } = e, x = Ft(a), [S = h ? [] : void 0, C] = Pt(i, o, x), w = Qa({
		id: n,
		virtual: _,
		__demoMode: m
	}), E = O({
		static: !1,
		hold: !1
	}), k = qn(l), A = H((e) => _ ? l === null ? _.options.indexOf(e) : _.options.findIndex((t) => k(t, e)) : w.state.options.findIndex((t) => k(t.dataRef.current.value, e))), j = b((e) => U(P.mode, {
		[Q.Multi]: () => S.some((t) => k(t, e)),
		[Q.Single]: () => k(S, e)
	}), [S]), M = Y(w, (e) => e.virtual), N = H(() => f?.()), P = D(() => ({
		__demoMode: m,
		immediate: g,
		optionsPropsRef: E,
		value: S,
		defaultValue: x,
		disabled: d,
		invalid: u,
		mode: h ? Q.Multi : Q.Single,
		virtual: _ ? M : null,
		onChange: C,
		isSelected: j,
		calculateIndex: A,
		compare: k,
		onClose: N
	}), [
		m,
		g,
		E,
		S,
		x,
		d,
		u,
		h,
		_,
		M,
		C,
		j,
		A,
		k,
		N
	]);
	V(() => {
		_ && w.send({
			type: Ka.UpdateVirtualConfiguration,
			options: _.options,
			disabled: _.disabled ?? null
		});
	}, [
		_,
		_?.options,
		_?.disabled
	]), V(() => {
		w.state.dataRef.current = P;
	}, [P]);
	let [ee, te, ne, re] = Y(w, (e) => [
		e.comboboxState,
		e.buttonElement,
		e.inputElement,
		e.optionsElement
	]), ie = _r.get(null);
	Ur(Y(ie, b((e) => ie.selectors.isTop(e, n), [ie, n])), [
		te,
		ne,
		re
	], () => w.actions.closeCombobox());
	let F = Y(w, w.selectors.activeOptionIndex), I = Y(w, w.selectors.activeOption), L = gt({
		open: ee === Z.Open,
		disabled: d,
		invalid: u,
		activeIndex: F,
		activeOption: I,
		value: S
	}), [ae, oe] = Sn(), se = t === null ? {} : { ref: t }, ce = b(() => {
		if (x !== void 0) return C?.(x);
	}, [C, x]), le = W();
	return p.createElement(oe, {
		value: ae,
		props: { htmlFor: ne?.id },
		slot: {
			open: ee === Z.Open,
			disabled: d
		}
	}, p.createElement(sa, null, p.createElement($a.Provider, { value: P }, p.createElement(Xa.Provider, { value: w }, p.createElement(ya, { value: U(ee, {
		[Z.Open]: _a.Open,
		[Z.Closed]: _a.Closed
	}) }, c != null && p.createElement(Kt, {
		disabled: d,
		data: S == null ? {} : { [c]: S },
		form: s,
		onReset: ce
	}), le({
		ourProps: se,
		theirProps: y,
		slot: L,
		defaultTag: ro,
		name: "Combobox"
	}))))));
}
var ao = "input";
function oo(e, t) {
	let n = Za("Combobox.Input"), r = eo("Combobox.Input"), i = T(), a = Yt(), { id: o = a || `headlessui-combobox-input-${i}`, onChange: s, displayValue: c, disabled: l = r.disabled || !1, autoFocus: u = !1, type: d = "text", ...f } = e, p = O(null), m = fn(p, t, ra(), n.actions.setInputElement), [h, g] = Y(n, (e) => [e.comboboxState, e.isTyping]), _ = dt(), v = H(() => {
		n.actions.onChange(null), n.state.optionsElement && (n.state.optionsElement.scrollTop = 0), n.actions.goToOption({ focus: X.Nothing });
	});
	yi(([e, t], [r, i]) => {
		if (n.state.isTyping) return;
		let a = p.current;
		a && ((i === Z.Open && t === Z.Closed || e !== r) && (a.value = e), requestAnimationFrame(() => {
			if (n.state.isTyping || !a || lt(a)) return;
			let { selectionStart: e, selectionEnd: t } = a;
			Math.abs((t ?? 0) - (e ?? 0)) === 0 && e === 0 && a.setSelectionRange(a.value.length, a.value.length);
		}));
	}, [
		D(() => typeof c == "function" && r.value !== void 0 ? c(r.value) ?? "" : typeof r.value == "string" ? r.value : "", [r.value, c]),
		h,
		g
	]), yi(([e], [t]) => {
		if (e === Z.Open && t === Z.Closed) {
			if (n.state.isTyping) return;
			let e = p.current;
			if (!e) return;
			let t = e.value, { selectionStart: r, selectionEnd: i, selectionDirection: a } = e;
			e.value = "", e.value = t, a === null ? e.setSelectionRange(r, i) : e.setSelectionRange(r, i, a);
		}
	}, [h]);
	let y = O(!1), b = H(() => {
		y.current = !0;
	}), x = H(() => {
		_.nextFrame(() => {
			y.current = !1;
		});
	}), S = H((e) => {
		switch (n.actions.setIsTyping(!0), e.key) {
			case K.Enter:
				if (n.state.comboboxState !== Z.Open || y.current) return;
				if (e.preventDefault(), e.stopPropagation(), n.selectors.activeOptionIndex(n.state) === null) {
					n.actions.closeCombobox();
					return;
				}
				n.actions.selectActiveOption(), r.mode === Q.Single && n.actions.closeCombobox();
				break;
			case K.ArrowDown: return e.preventDefault(), e.stopPropagation(), U(n.state.comboboxState, {
				[Z.Open]: () => n.actions.goToOption({ focus: X.Next }),
				[Z.Closed]: () => n.actions.openCombobox()
			});
			case K.ArrowUp: return e.preventDefault(), e.stopPropagation(), U(n.state.comboboxState, {
				[Z.Open]: () => n.actions.goToOption({ focus: X.Previous }),
				[Z.Closed]: () => {
					N(() => n.actions.openCombobox()), r.value || n.actions.goToOption({ focus: X.Last });
				}
			});
			case K.Home:
				if (n.state.comboboxState === Z.Closed || e.shiftKey) break;
				return e.preventDefault(), e.stopPropagation(), n.actions.goToOption({ focus: X.First });
			case K.PageUp: return e.preventDefault(), e.stopPropagation(), n.actions.goToOption({ focus: X.First });
			case K.End:
				if (n.state.comboboxState === Z.Closed || e.shiftKey) break;
				return e.preventDefault(), e.stopPropagation(), n.actions.goToOption({ focus: X.Last });
			case K.PageDown: return e.preventDefault(), e.stopPropagation(), n.actions.goToOption({ focus: X.Last });
			case K.Escape: return n.state.comboboxState === Z.Open ? (e.preventDefault(), n.state.optionsElement && !r.optionsPropsRef.current.static && e.stopPropagation(), r.mode === Q.Single && r.value === null && v(), n.actions.closeCombobox()) : void 0;
			case K.Tab:
				if (n.actions.setIsTyping(!1), n.state.comboboxState !== Z.Open) return;
				r.mode === Q.Single && n.state.activationTrigger !== $.Focus && n.actions.selectActiveOption(), n.actions.closeCombobox();
				break;
		}
	}), C = H((e) => {
		s?.(e), r.mode === Q.Single && e.target.value === "" && v(), n.actions.openCombobox();
	}), w = H((e) => {
		var t, i;
		let a = e.relatedTarget ?? xa.find((t) => t !== e.currentTarget);
		if (!((t = n.state.optionsElement) != null && t.contains(a)) && !((i = n.state.buttonElement) != null && i.contains(a)) && n.state.comboboxState === Z.Open) return e.preventDefault(), r.mode === Q.Single && r.value === null && v(), n.actions.closeCombobox();
	}), E = H((e) => {
		var t, i;
		let a = e.relatedTarget ?? xa.find((t) => t !== e.currentTarget);
		(t = n.state.buttonElement) != null && t.contains(a) || (i = n.state.optionsElement) != null && i.contains(a) || r.disabled || r.immediate && n.state.comboboxState !== Z.Open && _.microTask(() => {
			N(() => n.actions.openCombobox()), n.actions.setActivationTrigger($.Focus);
		});
	}), k = xn(), A = hn(), { isFocused: j, focusProps: M } = Xe({ autoFocus: u }), { isHovered: P, hoverProps: ee } = nt({ isDisabled: l }), te = Y(n, (e) => e.optionsElement), ne = gt({
		open: h === Z.Open,
		disabled: l,
		invalid: r.invalid,
		hover: P,
		focus: j,
		autofocus: u
	}), re = Dt({
		ref: m,
		id: o,
		role: "combobox",
		type: d,
		"aria-controls": te?.id,
		"aria-expanded": h === Z.Open,
		"aria-activedescendant": Y(n, n.selectors.activeDescendantId),
		"aria-labelledby": k,
		"aria-describedby": A,
		"aria-autocomplete": "list",
		defaultValue: e.defaultValue ?? (r.defaultValue === void 0 ? null : c?.(r.defaultValue)) ?? r.defaultValue,
		disabled: l || void 0,
		autoFocus: u,
		onCompositionStart: b,
		onCompositionEnd: x,
		onKeyDown: S,
		onChange: C,
		onFocus: E,
		onBlur: w
	}, M, ee);
	return W()({
		ourProps: re,
		theirProps: f,
		slot: ne,
		defaultTag: ao,
		name: "Combobox.Input"
	});
}
var so = "button";
function co(e, t) {
	let n = Za("Combobox.Button"), r = eo("Combobox.Button"), [i, a] = k(null), o = fn(t, a, n.actions.setButtonElement), s = T(), { id: c = `headlessui-combobox-button-${s}`, disabled: l = r.disabled || !1, autoFocus: u = !1, ...d } = e, [f, p, m] = Y(n, (e) => [
		e.comboboxState,
		e.inputElement,
		e.optionsElement
	]), h = Zr(p);
	Yr(f === Z.Open, {
		trigger: i,
		action: b((e) => {
			if (i != null && i.contains(e.target) || p != null && p.contains(e.target)) return Kr.Ignore;
			let t = e.target.closest("[role=\"option\"]:not([data-disabled])");
			return Qt(t) ? Kr.Select(t) : m != null && m.contains(e.target) ? Kr.Ignore : Kr.Close;
		}, [
			i,
			p,
			m
		]),
		close: n.actions.closeCombobox,
		select: n.actions.selectActiveOption
	});
	let g = H((e) => {
		switch (e.key) {
			case K.Space:
			case K.Enter:
				e.preventDefault(), e.stopPropagation(), n.state.comboboxState === Z.Closed && N(() => n.actions.openCombobox()), h();
				return;
			case K.ArrowDown:
				e.preventDefault(), e.stopPropagation(), n.state.comboboxState === Z.Closed && (N(() => n.actions.openCombobox()), n.state.dataRef.current.value || n.actions.goToOption({ focus: X.First })), h();
				return;
			case K.ArrowUp:
				e.preventDefault(), e.stopPropagation(), n.state.comboboxState === Z.Closed && (N(() => n.actions.openCombobox()), n.state.dataRef.current.value || n.actions.goToOption({ focus: X.Last })), h();
				return;
			case K.Escape:
				if (n.state.comboboxState !== Z.Open) return;
				e.preventDefault(), n.state.optionsElement && !r.optionsPropsRef.current.static && e.stopPropagation(), N(() => n.actions.closeCombobox()), h();
				return;
			default: return;
		}
	}), _ = Zn(() => {
		n.state.comboboxState === Z.Open ? n.actions.closeCombobox() : n.actions.openCombobox(), h();
	}), v = xn([c]), { isFocusVisible: y, focusProps: x } = Xe({ autoFocus: u }), { isHovered: S, hoverProps: C } = nt({ isDisabled: l }), { pressed: w, pressProps: E } = ht({ disabled: l }), D = gt({
		open: f === Z.Open,
		active: w || f === Z.Open,
		disabled: l,
		invalid: r.invalid,
		value: r.value,
		hover: S,
		focus: y
	}), O = Dt({
		ref: o,
		id: c,
		type: Qr(e, i),
		tabIndex: -1,
		"aria-haspopup": "listbox",
		"aria-controls": m?.id,
		"aria-expanded": f === Z.Open,
		"aria-labelledby": v,
		disabled: l || void 0,
		autoFocus: u,
		onKeyDown: g
	}, _, x, C, E);
	return W()({
		ourProps: O,
		theirProps: d,
		slot: D,
		defaultTag: so,
		name: "Combobox.Button"
	});
}
var lo = "div", uo = bt.RenderStrategy | bt.Static;
function fo(e, t) {
	let n = T(), { id: r = `headlessui-combobox-options-${n}`, hold: i = !1, anchor: a, portal: o = !1, modal: s = !0, transition: c = !1, ...l } = e, u = Za("Combobox.Options"), d = eo("Combobox.Options"), f = na(a);
	f && (o = !0);
	let [m, h] = aa(f), [g, _] = k(null), v = ia(), y = fn(t, f ? m : null, u.actions.setOptionsElement, _), [x, S, C, w, E] = Y(u, (e) => [
		e.comboboxState,
		e.inputElement,
		e.buttonElement,
		e.optionsElement,
		e.activationTrigger
	]), O = Wr(S || C), A = Wr(w), j = va(), [M, N] = pi(c, g, j === null ? x === Z.Open : (j & _a.Open) === _a.Open);
	Or(M, S, u.actions.closeCombobox), si(d.__demoMode ? !1 : s && x === Z.Open, A), Dr(d.__demoMode ? !1 : s && x === Z.Open, { allowed: b(() => [
		S,
		C,
		w
	], [
		S,
		C,
		w
	]) });
	let P = Y(u, u.selectors.didInputMove) ? !1 : M;
	V(() => {
		d.optionsPropsRef.current.static = e.static ?? !1;
	}, [d.optionsPropsRef, e.static]), V(() => {
		d.optionsPropsRef.current.hold = i;
	}, [d.optionsPropsRef, i]), vi(x === Z.Open, {
		container: w,
		accept(e) {
			return e.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : e.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
		},
		walk(e) {
			e.setAttribute("role", "none");
		}
	});
	let ee = xn([C?.id]), te = gt({
		open: x === Z.Open,
		option: void 0
	}), ne = H(() => {
		u.actions.setActivationTrigger($.Pointer);
	}), re = H((e) => {
		e.preventDefault(), u.actions.setActivationTrigger($.Pointer);
	}), ie = Dt(f ? v() : {}, {
		"aria-labelledby": ee,
		role: "listbox",
		"aria-multiselectable": d.mode === Q.Multi ? !0 : void 0,
		id: r,
		ref: y,
		style: {
			...l.style,
			...h,
			"--input-width": Yn(M, S, !0).width,
			"--button-width": Yn(M, C, !0).width
		},
		onWheel: E === $.Pointer ? void 0 : ne,
		onMouseDown: re,
		...fi(N)
	}), F = M && x === Z.Closed && !e.static, I = ha(F, d.virtual?.options), L = ha(F, d.value), ae = b((e) => d.compare(L, e), [d.compare, L]), oe = D(() => {
		if (!d.virtual) return d;
		if (I === void 0) throw Error("Missing `options` in virtual mode");
		return I === d.virtual.options ? d : {
			...d,
			virtual: {
				...d.virtual,
				options: I
			}
		};
	}, [
		d,
		I,
		d.virtual?.options
	]);
	d.virtual && Object.assign(l, { children: p.createElement($a.Provider, { value: oe }, p.createElement(no, { slot: te }, l.children)) });
	let se = W(), ce = D(() => d.mode === Q.Multi ? d : {
		...d,
		isSelected: ae
	}, [d, ae]);
	return p.createElement(za, {
		enabled: o ? e.static || M : !1,
		ownerDocument: O
	}, p.createElement($a.Provider, { value: ce }, se({
		ourProps: ie,
		theirProps: {
			...l,
			children: p.createElement(ma, { freeze: F }, typeof l.children == "function" ? l.children?.call(l, te) : l.children)
		},
		slot: te,
		defaultTag: lo,
		features: uo,
		visible: P,
		name: "Combobox.Options"
	})));
}
var po = "div";
function mo(e, t) {
	var n;
	let r = eo("Combobox.Option"), i = Za("Combobox.Option"), a = T(), { id: o = `headlessui-combobox-option-${a}`, value: s, disabled: c = ((n = r.virtual)?.disabled)?.call(n, s) ?? !1, order: l = null, ...u } = e, [d] = Y(i, (e) => [e.inputElement]), f = Zr(d), p = Y(i, b((e) => i.selectors.isActive(e, s, o), [s, o])), m = r.isSelected(s), h = O(null), g = ft({
		disabled: c,
		value: s,
		domRef: h,
		order: l
	}), _ = x(to), v = fn(t, h, _ ? _.measureElement : null), y = H(() => {
		i.actions.setIsTyping(!1), i.actions.onChange(s);
	});
	V(() => i.actions.registerOption(o, g), [g, o]);
	let S = Y(i, b((e) => i.selectors.shouldScrollIntoView(e, s, o), [s, o]));
	V(() => {
		if (S) return B().requestAnimationFrame(() => {
			var e, t;
			(t = (e = h.current)?.scrollIntoView) == null || t.call(e, { block: "nearest" });
		});
	}, [S, h]);
	let C = H((e) => {
		e.preventDefault(), e.button === Xn.Left && (c || (y(), zr() || requestAnimationFrame(() => f()), r.mode === Q.Single && i.actions.closeCombobox()));
	}), w = H(() => {
		if (c) return i.actions.goToOption({ focus: X.Nothing });
		let e = r.calculateIndex(s);
		i.actions.goToOption({
			focus: X.Specific,
			idx: e
		});
	}), E = li(), D = H((e) => E.update(e)), k = H((e) => {
		if (!E.wasMoved(e) || c || p && i.state.activationTrigger === $.Pointer) return;
		let t = r.calculateIndex(s);
		i.actions.goToOption({
			focus: X.Specific,
			idx: t
		}, $.Pointer);
	}), A = H((e) => {
		E.wasMoved(e) && (c || p && (r.optionsPropsRef.current.hold || i.state.activationTrigger === $.Pointer && i.actions.goToOption({ focus: X.Nothing })));
	}), j = gt({
		active: p,
		focus: p,
		selected: m,
		disabled: c
	}), M = {
		id: o,
		ref: v,
		role: "option",
		tabIndex: c === !0 ? void 0 : -1,
		"aria-disabled": c === !0 ? !0 : void 0,
		"aria-selected": m,
		disabled: void 0,
		onMouseDown: C,
		onFocus: w,
		onPointerEnter: D,
		onMouseEnter: D,
		onPointerMove: k,
		onMouseMove: k,
		onPointerLeave: A,
		onMouseLeave: A
	};
	return W()({
		ourProps: M,
		theirProps: u,
		slot: j,
		defaultTag: po,
		name: "Combobox.Option"
	});
}
var ho = G(io), go = G(co), _o = G(oo), vo = En, yo = G(fo), bo = G(mo), xo = Object.assign(ho, {
	Input: _o,
	Button: go,
	Label: vo,
	Options: yo,
	Option: bo
});
//#endregion
export { _o as a, yo as i, bo as n, xo as r, go as t };
