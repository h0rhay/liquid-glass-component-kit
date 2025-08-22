let a = !1;
function d(t, e = {}) {
  const { intensity: s = "normal" } = e;
  A();
  const i = p(t);
  return { remove: o(t, s, i) };
}
function o(t, e, s) {
  const i = getComputedStyle(t);
  i.position === "static" && (t.style.position = "relative"), i.zIndex === "auto" && (t.style.zIndex = "0");
  const r = ["INPUT", "IMG", "BR", "HR", "AREA", "BASE", "COL", "EMBED", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"].includes(t.tagName);
  let n = null;
  return r ? (t.classList.add("liquid-glass-direct"), e !== "normal" && t.classList.add(`intensity-${e}`), console.log("Applied direct glass effect to void element:", t.tagName, t)) : (n = document.createElement("div"), n.className = `liquid-glass ${e !== "normal" ? `intensity-${e}` : ""}`, t.appendChild(n), console.log("Applied glass overlay to regular element:", t.tagName, t)), () => b(t, n, s);
}
function p(t) {
  return {
    className: t.className,
    margin: t.style.margin,
    width: t.style.width,
    height: t.style.height,
    position: t.style.position,
    zIndex: t.style.zIndex,
    background: t.style.background,
    border: t.style.border
  };
}
function b(t, e, s) {
  e && e.parentNode && e.remove(), t.classList.remove("liquid-glass-direct", "intensity-subtle", "intensity-strong"), ["position", "zIndex"].forEach((i) => {
    t.style[i] = s[i];
  });
}
function A() {
  if (a || document.getElementById("liquidGlassFilter"))
    return;
  const t = m();
  document.body.appendChild(t), a = !0;
}
function m() {
  const t = "http://www.w3.org/2000/svg", e = document.createElementNS(t, "svg");
  e.setAttribute("width", "0"), e.setAttribute("height", "0"), e.style.display = "none";
  const s = document.createElementNS(t, "defs"), i = c(t, "liquidGlassFilter", {
    baseFrequency: "0.0005",
    numOctaves: "4",
    scale: "25"
  }), r = c(t, "liquidGlassFilterButton", {
    baseFrequency: "0.0005",
    numOctaves: "4",
    scale: "5"
  });
  return s.appendChild(i), s.appendChild(r), e.appendChild(s), e;
}
function c(t, e, s) {
  const i = document.createElementNS(t, "filter");
  i.setAttribute("id", e), i.setAttribute("x", "-20%"), i.setAttribute("y", "-20%"), i.setAttribute("width", "140%"), i.setAttribute("height", "140%");
  const r = document.createElementNS(t, "feTurbulence");
  r.setAttribute("baseFrequency", s.baseFrequency), r.setAttribute("numOctaves", s.numOctaves), r.setAttribute("result", "noise"), i.appendChild(r);
  const n = document.createElementNS(t, "feDisplacementMap");
  return n.setAttribute("in", "SourceGraphic"), n.setAttribute("in2", "noise"), n.setAttribute("scale", s.scale), n.setAttribute("result", "displaced"), i.appendChild(n), f(i, t), i;
}
function f(t, e) {
  const s = document.createElementNS(e, "feColorMatrix");
  s.setAttribute("in", "displaced"), s.setAttribute("values", "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"), s.setAttribute("result", "red"), t.appendChild(s);
  const i = document.createElementNS(e, "feColorMatrix");
  i.setAttribute("in", "displaced"), i.setAttribute("values", "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"), i.setAttribute("result", "green"), t.appendChild(i);
  const r = document.createElementNS(e, "feColorMatrix");
  r.setAttribute("in", "displaced"), r.setAttribute("values", "0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", "blue"), t.appendChild(r);
  const n = document.createElementNS(e, "feBlend");
  n.setAttribute("in", "red"), n.setAttribute("in2", "green"), n.setAttribute("mode", "screen"), n.setAttribute("result", "comp1"), t.appendChild(n);
  const l = document.createElementNS(e, "feBlend");
  l.setAttribute("in", "blue"), l.setAttribute("in2", "comp1"), l.setAttribute("mode", "screen"), l.setAttribute("result", "comp2"), t.appendChild(l);
  const u = document.createElementNS(e, "feBlend");
  u.setAttribute("in", "displaced"), u.setAttribute("in2", "comp2"), u.setAttribute("mode", "lighten"), t.appendChild(u);
}
function y(t, e = {}) {
  return Array.from(t).map((s) => d(s, e));
}
function h() {
  var e;
  const t = (e = document.getElementById("liquidGlassFilter")) == null ? void 0 : e.parentElement;
  t && t.remove(), a = !1;
}
export {
  d as applyLiquidGlass,
  y as applyToMultiple,
  h as cleanupAll,
  d as default
};
//# sourceMappingURL=liquid-glass.js.map
