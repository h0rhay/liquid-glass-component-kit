let d = !1, a = !1;
function c() {
  if (a || typeof document == "undefined")
    return;
  const e = !/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  document.documentElement.style.setProperty("--svg-filters-enabled", e ? "1" : "0"), console.log("SVG filters capability:", e ? "enabled" : "disabled"), a = !0;
}
function p(e, t = {}) {
  const { intensity: n = "normal" } = t;
  c(), f();
  const i = m(e);
  return { remove: b(e, n, i) };
}
function b(e, t, n) {
  const i = getComputedStyle(e);
  i.position === "static" && (e.style.position = "relative"), i.zIndex === "auto" && (e.style.zIndex = "0");
  const r = ["INPUT", "IMG", "BR", "HR", "AREA", "BASE", "COL", "EMBED", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"].includes(e.tagName);
  let s = null;
  return r ? (e.classList.add("liquid-glass-direct"), t !== "normal" && e.classList.add("intensity-".concat(t))) : (s = document.createElement("div"), s.className = "liquid-glass ".concat(t !== "normal" ? "intensity-".concat(t) : ""), e.appendChild(s)), () => A(e, s, n);
}
function m(e) {
  return {
    position: e.style.position,
    zIndex: e.style.zIndex
  };
}
function A(e, t, n) {
  t && t.parentNode && t.remove(), e.classList.remove("liquid-glass-direct", "intensity-subtle", "intensity-strong"), ["position", "zIndex"].forEach((i) => {
    e.style[i] = n[i];
  });
}
function f() {
  if (d || document.getElementById("liquidGlassFilter"))
    return;
  c();
  const e = y();
  document.body.appendChild(e), d = !0;
}
function y() {
  const e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "svg");
  t.setAttribute("width", "0"), t.setAttribute("height", "0"), t.style.display = "none";
  const n = document.createElementNS(e, "defs"), i = o(e, "liquidGlassFilter", {
    baseFrequency: "0.0005",
    numOctaves: "4",
    scale: "25"
  }), r = o(e, "liquidGlassFilterButton", {
    baseFrequency: "0.0005",
    numOctaves: "4",
    scale: "5"
  });
  return n.appendChild(i), n.appendChild(r), t.appendChild(n), t;
}
function o(e, t, n) {
  const i = document.createElementNS(e, "filter");
  i.setAttribute("id", t), i.setAttribute("x", "-20%"), i.setAttribute("y", "-20%"), i.setAttribute("width", "140%"), i.setAttribute("height", "140%");
  const r = document.createElementNS(e, "feTurbulence");
  r.setAttribute("baseFrequency", n.baseFrequency), r.setAttribute("numOctaves", n.numOctaves), r.setAttribute("result", "noise"), i.appendChild(r);
  const s = document.createElementNS(e, "feDisplacementMap");
  return s.setAttribute("in", "SourceGraphic"), s.setAttribute("in2", "noise"), s.setAttribute("scale", n.scale), s.setAttribute("result", "displaced"), i.appendChild(s), E(i, e), i;
}
function E(e, t) {
  const n = document.createElementNS(t, "feColorMatrix");
  n.setAttribute("in", "displaced"), n.setAttribute("values", "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"), n.setAttribute("result", "red"), e.appendChild(n);
  const i = document.createElementNS(t, "feColorMatrix");
  i.setAttribute("in", "displaced"), i.setAttribute("values", "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"), i.setAttribute("result", "green"), e.appendChild(i);
  const r = document.createElementNS(t, "feColorMatrix");
  r.setAttribute("in", "displaced"), r.setAttribute("values", "0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", "blue"), e.appendChild(r);
  const s = document.createElementNS(t, "feBlend");
  s.setAttribute("in", "red"), s.setAttribute("in2", "green"), s.setAttribute("mode", "screen"), s.setAttribute("result", "comp1"), e.appendChild(s);
  const l = document.createElementNS(t, "feBlend");
  l.setAttribute("in", "blue"), l.setAttribute("in2", "comp1"), l.setAttribute("mode", "screen"), l.setAttribute("result", "comp2"), e.appendChild(l);
  const u = document.createElementNS(t, "feBlend");
  u.setAttribute("in", "displaced"), u.setAttribute("in2", "comp2"), u.setAttribute("mode", "lighten"), e.appendChild(u);
}
function h(e, t = {}) {
  return Array.from(e).map((n) => p(n, t));
}
function C() {
  var t;
  const e = (t = document.getElementById("liquidGlassFilter")) == null ? void 0 : t.parentElement;
  e && e.remove(), d = !1;
}
export {
  p as applyLiquidGlass,
  h as applyToMultiple,
  C as cleanupAll,
  p as default
};
//# sourceMappingURL=liquid-glass.js.map
