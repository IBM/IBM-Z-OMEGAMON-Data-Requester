import * as e from "react";
import { useEffect as t, useLayoutEffect as n } from "react";
import * as r from "react-dom";
//#region node_modules/.pnpm/@floating-ui+utils@0.2.9/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function i() {
	return typeof window < "u";
}
function a(e) {
	return c(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function o(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function s(e) {
	return ((c(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function c(e) {
	return i() ? e instanceof Node || e instanceof o(e).Node : !1;
}
function l(e) {
	return i() ? e instanceof Element || e instanceof o(e).Element : !1;
}
function u(e) {
	return i() ? e instanceof HTMLElement || e instanceof o(e).HTMLElement : !1;
}
function d(e) {
	return !i() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof o(e).ShadowRoot;
}
function f(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = y(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function p(e) {
	return [
		"table",
		"td",
		"th"
	].includes(a(e));
}
function m(e) {
	return [":popover-open", ":modal"].some((t) => {
		try {
			return e.matches(t);
		} catch {
			return !1;
		}
	});
}
function h(e) {
	let t = _(), n = l(e) ? y(e) : e;
	return [
		"transform",
		"translate",
		"scale",
		"rotate",
		"perspective"
	].some((e) => n[e] ? n[e] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || [
		"transform",
		"translate",
		"scale",
		"rotate",
		"perspective",
		"filter"
	].some((e) => (n.willChange || "").includes(e)) || [
		"paint",
		"layout",
		"strict",
		"content"
	].some((e) => (n.contain || "").includes(e));
}
function g(e) {
	let t = x(e);
	for (; u(t) && !v(t);) {
		if (h(t)) return t;
		if (m(t)) return null;
		t = x(t);
	}
	return null;
}
function _() {
	return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function v(e) {
	return [
		"html",
		"body",
		"#document"
	].includes(a(e));
}
function y(e) {
	return o(e).getComputedStyle(e);
}
function b(e) {
	return l(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function x(e) {
	if (a(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || d(e) && e.host || s(e);
	return d(t) ? t.host : t;
}
function S(e) {
	let t = x(e);
	return v(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : u(t) && f(t) ? t : S(t);
}
function C(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = S(e), i = r === e.ownerDocument?.body, a = o(r);
	if (i) {
		let e = w(a);
		return t.concat(a, a.visualViewport || [], f(r) ? r : [], e && n ? C(e) : []);
	}
	return t.concat(r, C(r, [], n));
}
function w(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.9/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var T = [
	"top",
	"right",
	"bottom",
	"left"
], E = Math.min, D = Math.max, O = Math.round, k = Math.floor, A = (e) => ({
	x: e,
	y: e
}), j = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
}, M = {
	start: "end",
	end: "start"
};
function N(e, t, n) {
	return D(e, E(t, n));
}
function P(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function F(e) {
	return e.split("-")[0];
}
function I(e) {
	return e.split("-")[1];
}
function L(e) {
	return e === "x" ? "y" : "x";
}
function ee(e) {
	return e === "y" ? "height" : "width";
}
function R(e) {
	return ["top", "bottom"].includes(F(e)) ? "y" : "x";
}
function te(e) {
	return L(R(e));
}
function ne(e, t, n) {
	n === void 0 && (n = !1);
	let r = I(e), i = te(e), a = ee(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = B(o)), [o, B(o)];
}
function re(e) {
	let t = B(e);
	return [
		z(e),
		t,
		z(t)
	];
}
function z(e) {
	return e.replace(/start|end/g, (e) => M[e]);
}
function ie(e, t, n) {
	let r = ["left", "right"], i = ["right", "left"], a = ["top", "bottom"], o = ["bottom", "top"];
	switch (e) {
		case "top":
		case "bottom": return n ? t ? i : r : t ? r : i;
		case "left":
		case "right": return t ? a : o;
		default: return [];
	}
}
function ae(e, t, n, r) {
	let i = I(e), a = ie(F(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(z)))), a;
}
function B(e) {
	return e.replace(/left|right|bottom|top/g, (e) => j[e]);
}
function oe(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function se(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : oe(e);
}
function V(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
var H = /* @__PURE__ */ [
	"input:not([inert])",
	"select:not([inert])",
	"textarea:not([inert])",
	"a[href]:not([inert])",
	"button:not([inert])",
	"[tabindex]:not(slot):not([inert])",
	"audio[controls]:not([inert])",
	"video[controls]:not([inert])",
	"[contenteditable]:not([contenteditable=\"false\"]):not([inert])",
	"details>summary:first-of-type:not([inert])",
	"details:not([inert])"
].join(","), ce = typeof Element > "u", U = ce ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, W = !ce && Element.prototype.getRootNode ? function(e) {
	return e?.getRootNode?.call(e);
} : function(e) {
	return e?.ownerDocument;
}, G = function e(t, n) {
	n === void 0 && (n = !0);
	var r = t?.getAttribute?.call(t, "inert");
	return r === "" || r === "true" || n && t && e(t.parentNode);
}, le = function(e) {
	var t = e?.getAttribute?.call(e, "contenteditable");
	return t === "" || t === "true";
}, ue = function(e, t, n) {
	if (G(e)) return [];
	var r = Array.prototype.slice.apply(e.querySelectorAll(H));
	return t && U.call(e, H) && r.unshift(e), r = r.filter(n), r;
}, de = function e(t, n, r) {
	for (var i = [], a = Array.from(t); a.length;) {
		var o = a.shift();
		if (!G(o, !1)) if (o.tagName === "SLOT") {
			var s = o.assignedElements(), c = e(s.length ? s : o.children, !0, r);
			r.flatten ? i.push.apply(i, c) : i.push({
				scopeParent: o,
				candidates: c
			});
		} else {
			U.call(o, H) && r.filter(o) && (n || !t.includes(o)) && i.push(o);
			var l = o.shadowRoot || typeof r.getShadowRoot == "function" && r.getShadowRoot(o), u = !G(l, !1) && (!r.shadowRootFilter || r.shadowRootFilter(o));
			if (l && u) {
				var d = e(l === !0 ? o.children : l.children, !0, r);
				r.flatten ? i.push.apply(i, d) : i.push({
					scopeParent: o,
					candidates: d
				});
			} else a.unshift.apply(a, o.children);
		}
	}
	return i;
}, fe = function(e) {
	return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, pe = function(e) {
	if (!e) throw Error("No node provided");
	return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || le(e)) && !fe(e) ? 0 : e.tabIndex;
}, me = function(e, t) {
	var n = pe(e);
	return n < 0 && t && !fe(e) ? 0 : n;
}, he = function(e, t) {
	return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, ge = function(e) {
	return e.tagName === "INPUT";
}, _e = function(e) {
	return ge(e) && e.type === "hidden";
}, ve = function(e) {
	return e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(e) {
		return e.tagName === "SUMMARY";
	});
}, ye = function(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === t) return e[n];
}, be = function(e) {
	if (!e.name) return !0;
	var t = e.form || W(e), n = function(e) {
		return t.querySelectorAll("input[type=\"radio\"][name=\"" + e + "\"]");
	}, r;
	if (typeof window < "u" && window.CSS !== void 0 && typeof window.CSS.escape == "function") r = n(window.CSS.escape(e.name));
	else try {
		r = n(e.name);
	} catch (e) {
		return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1;
	}
	var i = ye(r, e.form);
	return !i || i === e;
}, xe = function(e) {
	return ge(e) && e.type === "radio";
}, Se = function(e) {
	return xe(e) && !be(e);
}, Ce = function(e) {
	var t = e && W(e), n = t?.host, r = !1;
	if (t && t !== e) {
		var i, a, o;
		for (r = !!((i = n) != null && (a = i.ownerDocument) != null && a.contains(n) || e != null && (o = e.ownerDocument) != null && o.contains(e)); !r && n;) {
			var s, c;
			t = W(n), n = t?.host, r = !!((s = n) != null && (c = s.ownerDocument) != null && c.contains(n));
		}
	}
	return r;
}, we = function(e) {
	var t = e.getBoundingClientRect(), n = t.width, r = t.height;
	return n === 0 && r === 0;
}, Te = function(e, t) {
	var n = t.displayCheck, r = t.getShadowRoot;
	if (getComputedStyle(e).visibility === "hidden") return !0;
	var i = U.call(e, "details>summary:first-of-type") ? e.parentElement : e;
	if (U.call(i, "details:not([open]) *")) return !0;
	if (!n || n === "full" || n === "legacy-full") {
		if (typeof r == "function") {
			for (var a = e; e;) {
				var o = e.parentElement, s = W(e);
				if (o && !o.shadowRoot && r(o) === !0) return we(e);
				e = e.assignedSlot ? e.assignedSlot : !o && s !== e.ownerDocument ? s.host : o;
			}
			e = a;
		}
		if (Ce(e)) return !e.getClientRects().length;
		if (n !== "legacy-full") return !0;
	} else if (n === "non-zero-area") return we(e);
	return !1;
}, Ee = function(e) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName)) for (var t = e.parentElement; t;) {
		if (t.tagName === "FIELDSET" && t.disabled) {
			for (var n = 0; n < t.children.length; n++) {
				var r = t.children.item(n);
				if (r.tagName === "LEGEND") return U.call(t, "fieldset[disabled] *") ? !0 : !r.contains(e);
			}
			return !0;
		}
		t = t.parentElement;
	}
	return !1;
}, De = function(e, t) {
	return !(t.disabled || G(t) || _e(t) || Te(t, e) || ve(t) || Ee(t));
}, Oe = function(e, t) {
	return !(Se(t) || pe(t) < 0 || !De(e, t));
}, ke = function(e) {
	var t = parseInt(e.getAttribute("tabindex"), 10);
	return !!(isNaN(t) || t >= 0);
}, Ae = function e(t) {
	var n = [], r = [];
	return t.forEach(function(t, i) {
		var a = !!t.scopeParent, o = a ? t.scopeParent : t, s = me(o, a), c = a ? e(t.candidates) : o;
		s === 0 ? a ? n.push.apply(n, c) : n.push(o) : r.push({
			documentOrder: i,
			tabIndex: s,
			item: t,
			isScope: a,
			content: c
		});
	}), r.sort(he).reduce(function(e, t) {
		return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e;
	}, []).concat(n);
}, je = function(e, t) {
	return t ||= {}, Ae(t.getShadowRoot ? de([e], t.includeContainer, {
		filter: Oe.bind(null, t),
		flatten: !1,
		getShadowRoot: t.getShadowRoot,
		shadowRootFilter: ke
	}) : ue(e, t.includeContainer, Oe.bind(null, t)));
};
//#endregion
//#region node_modules/.pnpm/@floating-ui+core@1.6.9/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function Me(e, t, n) {
	let { reference: r, floating: i } = e, a = R(t), o = te(t), s = ee(o), c = F(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	switch (I(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
var Ne = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = a.filter(Boolean), c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Me(l, r, c), f = r, p = {}, m = 0;
	for (let n = 0; n < s.length; n++) {
		let { name: a, fn: h } = s[n], { x: g, y: _, data: v, reset: y } = await h({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: p,
			rects: l,
			platform: o,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = g ?? u, d = _ ?? d, p = {
			...p,
			[a]: {
				...p[a],
				...v
			}
		}, y && m <= 50 && (m++, typeof y == "object" && (y.placement && (f = y.placement), y.rects && (l = y.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : y.rects), {x: u, y: d} = Me(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: p
	};
};
async function K(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = P(t, e), p = se(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = V(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = V(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Pe = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = P(e, t) || {};
		if (l == null) return {};
		let d = se(u), f = {
			x: n,
			y: r
		}, p = te(i), m = ee(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, D = E(d[_], T), O = E(d[v], T), k = D, A = C - h[m] - O, j = C / 2 - h[m] / 2 + w, M = N(k, j, A), F = !c.arrow && I(i) != null && j !== M && a.reference[m] / 2 - (j < k ? D : O) - h[m] / 2 < 0, L = F ? j < k ? j - k : j - A : 0;
		return {
			[p]: f[p] + L,
			data: {
				[p]: M,
				centerOffset: j - M - L,
				...F && { alignmentOffset: L }
			},
			reset: F
		};
	}
}), Fe = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = P(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = F(r), _ = R(o), v = F(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [B(o)] : re(o)), x = p !== "none";
			!d && x && b.push(...ae(o, m, p, y));
			let S = [o, ...b], C = await K(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = ne(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = R(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Ie(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Le(e) {
	return T.some((t) => e[t] >= 0);
}
var Re = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n } = t, { strategy: r = "referenceHidden", ...i } = P(e, t);
			switch (r) {
				case "referenceHidden": {
					let e = Ie(await K(t, {
						...i,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Le(e)
					} };
				}
				case "escaped": {
					let e = Ie(await K(t, {
						...i,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Le(e)
					} };
				}
				default: return {};
			}
		}
	};
};
async function ze(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = F(n), s = I(n), c = R(n) === "y", l = ["left", "top"].includes(o) ? -1 : 1, u = a && c ? -1 : 1, d = P(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Be = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await ze(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Ve = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i } = t, { mainAxis: a = !0, crossAxis: o = !1, limiter: s = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...c } = P(e, t), l = {
				x: n,
				y: r
			}, u = await K(t, c), d = R(F(i)), f = L(d), p = l[f], m = l[d];
			if (a) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = p + u[e], r = p - u[t];
				p = N(n, p, r);
			}
			if (o) {
				let e = d === "y" ? "top" : "left", t = d === "y" ? "bottom" : "right", n = m + u[e], r = m - u[t];
				m = N(n, m, r);
			}
			let h = s.fn({
				...t,
				[f]: p,
				[d]: m
			});
			return {
				...h,
				data: {
					x: h.x - n,
					y: h.y - r,
					enabled: {
						[f]: a,
						[d]: o
					}
				}
			};
		}
	};
}, He = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = P(e, t), u = await K(t, l), d = F(i), f = I(i), p = R(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = E(h - u[g], v), x = E(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = D(u.left, 0), t = D(u.right, 0), n = D(u.top, 0), r = D(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : D(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : D(u.top, u.bottom));
			}
			await c({
				...t,
				availableWidth: w,
				availableHeight: C
			});
			let T = await o.getDimensions(s.floating);
			return m !== T.width || h !== T.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.6.13/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Ue(e) {
	let t = y(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = u(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = O(n) !== a || O(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function q(e) {
	return l(e) ? e : e.contextElement;
}
function J(e) {
	let t = q(e);
	if (!u(t)) return A(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Ue(t), o = (a ? O(n.width) : n.width) / r, s = (a ? O(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var We = /* @__PURE__ */ A(0);
function Ge(e) {
	let t = o(e);
	return !_() || !t.visualViewport ? We : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Ke(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== o(e) ? !1 : t;
}
function Y(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = q(e), s = A(1);
	t && (r ? l(r) && (s = J(r)) : s = J(e));
	let c = Ke(a, n, r) ? Ge(a) : A(0), u = (i.left + c.x) / s.x, d = (i.top + c.y) / s.y, f = i.width / s.x, p = i.height / s.y;
	if (a) {
		let e = o(a), t = r && l(r) ? o(r) : r, n = e, i = w(n);
		for (; i && r && t !== n;) {
			let e = J(i), t = i.getBoundingClientRect(), r = y(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, s = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			u *= e.x, d *= e.y, f *= e.x, p *= e.y, u += a, d += s, n = o(i), i = w(n);
		}
	}
	return V({
		width: f,
		height: p,
		x: u,
		y: d
	});
}
function X(e, t) {
	let n = b(e).scrollLeft;
	return t ? t.left + n : Y(s(e)).left + n;
}
function qe(e, t, n) {
	n === void 0 && (n = !1);
	let r = e.getBoundingClientRect();
	return {
		x: r.left + t.scrollLeft - (n ? 0 : X(e, r)),
		y: r.top + t.scrollTop
	};
}
function Je(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, o = i === "fixed", c = s(r), l = t ? m(t.floating) : !1;
	if (r === c || l && o) return n;
	let d = {
		scrollLeft: 0,
		scrollTop: 0
	}, p = A(1), h = A(0), g = u(r);
	if ((g || !g && !o) && ((a(r) !== "body" || f(c)) && (d = b(r)), u(r))) {
		let e = Y(r);
		p = J(r), h.x = e.x + r.clientLeft, h.y = e.y + r.clientTop;
	}
	let _ = c && !g && !o ? qe(c, d, !0) : A(0);
	return {
		width: n.width * p.x,
		height: n.height * p.y,
		x: n.x * p.x - d.scrollLeft * p.x + h.x + _.x,
		y: n.y * p.y - d.scrollTop * p.y + h.y + _.y
	};
}
function Ye(e) {
	return Array.from(e.getClientRects());
}
function Xe(e) {
	let t = s(e), n = b(e), r = e.ownerDocument.body, i = D(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = D(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + X(e), c = -n.scrollTop;
	return y(r).direction === "rtl" && (o += D(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: c
	};
}
function Ze(e, t) {
	let n = o(e), r = s(e), i = n.visualViewport, a = r.clientWidth, c = r.clientHeight, l = 0, u = 0;
	if (i) {
		a = i.width, c = i.height;
		let e = _();
		(!e || e && t === "fixed") && (l = i.offsetLeft, u = i.offsetTop);
	}
	return {
		width: a,
		height: c,
		x: l,
		y: u
	};
}
function Qe(e, t) {
	let n = Y(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = u(e) ? J(e) : A(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function $e(e, t, n) {
	let r;
	if (t === "viewport") r = Ze(e, n);
	else if (t === "document") r = Xe(s(e));
	else if (l(t)) r = Qe(t, n);
	else {
		let n = Ge(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return V(r);
}
function et(e, t) {
	let n = x(e);
	return n === t || !l(n) || v(n) ? !1 : y(n).position === "fixed" || et(n, t);
}
function tt(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = C(e, [], !1).filter((e) => l(e) && a(e) !== "body"), i = null, o = y(e).position === "fixed", s = o ? x(e) : e;
	for (; l(s) && !v(s);) {
		let t = y(s), n = h(s);
		!n && t.position === "fixed" && (i = null), (o ? !n && !i : !n && t.position === "static" && i && ["absolute", "fixed"].includes(i.position) || f(s) && !n && et(e, s)) ? r = r.filter((e) => e !== s) : i = t, s = x(s);
	}
	return t.set(e, r), r;
}
function nt(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? m(t) ? [] : tt(t, this._c) : [].concat(n), r], o = a[0], s = a.reduce((e, n) => {
		let r = $e(t, n, i);
		return e.top = D(r.top, e.top), e.right = E(r.right, e.right), e.bottom = E(r.bottom, e.bottom), e.left = D(r.left, e.left), e;
	}, $e(t, o, i));
	return {
		width: s.right - s.left,
		height: s.bottom - s.top,
		x: s.left,
		y: s.top
	};
}
function rt(e) {
	let { width: t, height: n } = Ue(e);
	return {
		width: t,
		height: n
	};
}
function it(e, t, n) {
	let r = u(t), i = s(t), o = n === "fixed", c = Y(e, !0, o, t), l = {
		scrollLeft: 0,
		scrollTop: 0
	}, d = A(0);
	if (r || !r && !o) if ((a(t) !== "body" || f(i)) && (l = b(t)), r) {
		let e = Y(t, !0, o, t);
		d.x = e.x + t.clientLeft, d.y = e.y + t.clientTop;
	} else i && (d.x = X(i));
	let p = i && !r && !o ? qe(i, l) : A(0);
	return {
		x: c.left + l.scrollLeft - d.x - p.x,
		y: c.top + l.scrollTop - d.y - p.y,
		width: c.width,
		height: c.height
	};
}
function Z(e) {
	return y(e).position === "static";
}
function at(e, t) {
	if (!u(e) || y(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return s(e) === n && (n = n.ownerDocument.body), n;
}
function ot(e, t) {
	let n = o(e);
	if (m(e)) return n;
	if (!u(e)) {
		let t = x(e);
		for (; t && !v(t);) {
			if (l(t) && !Z(t)) return t;
			t = x(t);
		}
		return n;
	}
	let r = at(e, t);
	for (; r && p(r) && Z(r);) r = at(r, t);
	return r && v(r) && Z(r) && !h(r) ? n : r || g(e) || n;
}
var st = async function(e) {
	let t = this.getOffsetParent || ot, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: it(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function ct(e) {
	return y(e).direction === "rtl";
}
var lt = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Je,
	getDocumentElement: s,
	getClippingRect: nt,
	getOffsetParent: ot,
	getElementRects: st,
	getClientRects: Ye,
	getDimensions: rt,
	getScale: J,
	isElement: l,
	isRTL: ct
};
function ut(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function dt(e, t) {
	let n = null, r, i = s(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = k(d), h = k(i.clientWidth - (u + f)), g = k(i.clientHeight - (d + p)), _ = k(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: D(0, E(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !ut(l, e.getBoundingClientRect()) && o(), y = !1;
		}
		try {
			n = new IntersectionObserver(b, {
				...v,
				root: i.ownerDocument
			});
		} catch {
			n = new IntersectionObserver(b, v);
		}
		n.observe(e);
	}
	return o(!0), a;
}
function ft(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = q(e), u = i || a ? [...l ? C(l) : [], ...C(t)] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? dt(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), p.observe(t));
	let m, h = c ? Y(e) : null;
	c && g();
	function g() {
		let t = Y(e);
		h && !ut(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var pt = K, mt = Be, ht = Ve, gt = Fe, _t = He, vt = Re, yt = Pe, bt = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: lt,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return Ne(e, t, {
		...i,
		platform: a
	});
}, Q = typeof document < "u" ? n : t;
function $(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!$(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !$(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function xt(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function St(e, t) {
	let n = xt(e);
	return Math.round(t * n) / n;
}
function Ct(t) {
	let n = e.useRef(t);
	return Q(() => {
		n.current = t;
	}), n;
}
function wt(t) {
	t === void 0 && (t = {});
	let { placement: n = "bottom", strategy: i = "absolute", middleware: a = [], platform: o, elements: { reference: s, floating: c } = {}, transform: l = !0, whileElementsMounted: u, open: d } = t, [f, p] = e.useState({
		x: 0,
		y: 0,
		strategy: i,
		placement: n,
		middlewareData: {},
		isPositioned: !1
	}), [m, h] = e.useState(a);
	$(m, a) || h(a);
	let [g, _] = e.useState(null), [v, y] = e.useState(null), b = e.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = e.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = s || g, C = c || v, w = e.useRef(null), T = e.useRef(null), E = e.useRef(f), D = u != null, O = Ct(u), k = Ct(o), A = Ct(d), j = e.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: n,
			strategy: i,
			middleware: m
		};
		k.current && (e.platform = k.current), bt(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !$(E.current, t) && (E.current = t, r.flushSync(() => {
				p(t);
			}));
		});
	}, [
		m,
		n,
		i,
		k,
		A
	]);
	Q(() => {
		d === !1 && E.current.isPositioned && (E.current.isPositioned = !1, p((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [d]);
	let M = e.useRef(!1);
	Q(() => (M.current = !0, () => {
		M.current = !1;
	}), []), Q(() => {
		if (S && (w.current = S), C && (T.current = C), S && C) {
			if (O.current) return O.current(S, C, j);
			j();
		}
	}, [
		S,
		C,
		j,
		O,
		D
	]);
	let N = e.useMemo(() => ({
		reference: w,
		floating: T,
		setReference: b,
		setFloating: x
	}), [b, x]), P = e.useMemo(() => ({
		reference: S,
		floating: C
	}), [S, C]), F = e.useMemo(() => {
		let e = {
			position: i,
			left: 0,
			top: 0
		};
		if (!P.floating) return e;
		let t = St(P.floating, f.x), n = St(P.floating, f.y);
		return l ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...xt(P.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: i,
			left: t,
			top: n
		};
	}, [
		i,
		l,
		P.floating,
		f.x,
		f.y
	]);
	return e.useMemo(() => ({
		...f,
		update: j,
		refs: N,
		elements: P,
		floatingStyles: F
	}), [
		f,
		j,
		N,
		P,
		F
	]);
}
var Tt = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : yt({
				element: r.current,
				padding: i
			}).fn(n) : r ? yt({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, Et = (e, t) => ({
	...mt(e),
	options: [e, t]
}), Dt = (e, t) => ({
	...ht(e),
	options: [e, t]
}), Ot = (e, t) => ({
	...gt(e),
	options: [e, t]
}), kt = (e, t) => ({
	..._t(e),
	options: [e, t]
}), At = (e, t) => ({
	...vt(e),
	options: [e, t]
}), jt = (e, t) => ({
	...Tt(e),
	options: [e, t]
});
//#endregion
export { Dt as a, ft as c, P as d, D as f, l as h, Et as i, pt as l, O as m, Ot as n, kt as o, E as p, At as r, wt as s, jt as t, je as u };
