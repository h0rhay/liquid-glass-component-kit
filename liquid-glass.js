let a = !1;
function o() {
  return !(/iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}
function d(t, e = {}) {
  const { intensity: i = "normal" } = e;
  A();
  const n = b(t);
  return { remove: p(t, i, n) };
}
function p(t, e, i) {
  const n = getComputedStyle(t);
  n.position === "static" && (t.style.position = "relative"), n.zIndex === "auto" && (t.style.zIndex = "0");
  const r = ["INPUT", "IMG", "BR", "HR", "AREA", "BASE", "COL", "EMBED", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"].includes(t.tagName);
  let s = null;
  return r ? (t.classList.add("liquid-glass-direct"), e !== "normal" && t.classList.add(`intensity-${e}`)) : (s = document.createElement("div"), s.className = `liquid-glass ${e !== "normal" ? `intensity-${e}` : ""}`, t.appendChild(s)), () => m(t, s, i);
}
function b(t) {
  return {
    position: t.style.position,
    zIndex: t.style.zIndex
  };
}
function m(t, e, i) {
  e && e.parentNode && e.remove(), t.classList.remove("liquid-glass-direct", "intensity-subtle", "intensity-strong"), ["position", "zIndex"].forEach((n) => {
    t.style[n] = i[n];
  });
}
function A() {
  if (!(a || document.getElementById("liquidGlassFilter")) && o()) {
    const t = f();
    document.body.appendChild(t), a = !0;
  }
}
function f() {
  const t = "http://www.w3.org/2000/svg", e = document.createElementNS(t, "svg");
  e.setAttribute("width", "0"), e.setAttribute("height", "0"), e.style.display = "none";
  const i = document.createElementNS(t, "defs"), n = c(t, "liquidGlassFilter", {
    baseFrequency: "0.0005",
    numOctaves: "4",
    scale: "25"
  }), r = c(t, "liquidGlassFilterButton", {
    baseFrequency: "0.0005",
    numOctaves: "4",
    scale: "5"
  });
  return i.appendChild(n), i.appendChild(r), e.appendChild(i), e;
}
function c(t, e, i) {
  const n = document.createElementNS(t, "filter");
  n.setAttribute("id", e), n.setAttribute("x", "-20%"), n.setAttribute("y", "-20%"), n.setAttribute("width", "140%"), n.setAttribute("height", "140%");
  const r = document.createElementNS(t, "feTurbulence");
  r.setAttribute("baseFrequency", i.baseFrequency), r.setAttribute("numOctaves", i.numOctaves), r.setAttribute("result", "noise"), n.appendChild(r);
  const s = document.createElementNS(t, "feDisplacementMap");
  return s.setAttribute("in", "SourceGraphic"), s.setAttribute("in2", "noise"), s.setAttribute("scale", i.scale), s.setAttribute("result", "displaced"), n.appendChild(s), h(n, t), n;
}
function h(t, e) {
  const i = document.createElementNS(e, "feColorMatrix");
  i.setAttribute("in", "displaced"), i.setAttribute("values", "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"), i.setAttribute("result", "red"), t.appendChild(i);
  const n = document.createElementNS(e, "feColorMatrix");
  n.setAttribute("in", "displaced"), n.setAttribute("values", "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"), n.setAttribute("result", "green"), t.appendChild(n);
  const r = document.createElementNS(e, "feColorMatrix");
  r.setAttribute("in", "displaced"), r.setAttribute("values", "0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", "blue"), t.appendChild(r);
  const s = document.createElementNS(e, "feBlend");
  s.setAttribute("in", "red"), s.setAttribute("in2", "green"), s.setAttribute("mode", "screen"), s.setAttribute("result", "comp1"), t.appendChild(s);
  const l = document.createElementNS(e, "feBlend");
  l.setAttribute("in", "blue"), l.setAttribute("in2", "comp1"), l.setAttribute("mode", "screen"), l.setAttribute("result", "comp2"), t.appendChild(l);
  const u = document.createElementNS(e, "feBlend");
  u.setAttribute("in", "displaced"), u.setAttribute("in2", "comp2"), u.setAttribute("mode", "lighten"), t.appendChild(u);
}
function y(t, e = {}) {
  return Array.from(t).map((i) => d(i, e));
}
function E() {
  var e;
  const t = (e = document.getElementById("liquidGlassFilter")) == null ? void 0 : e.parentElement;
  t && t.remove(), a = !1;
}
export {
  d as applyLiquidGlass,
  y as applyToMultiple,
  E as cleanupAll,
  d as default
};
//# sourceMappingURL=liquid-glass.js.map
