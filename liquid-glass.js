let u = !1;
function d(t, i = {}) {
  const { intensity: n = "normal" } = i;
  h();
  const e = p(t);
  return ["INPUT", "IMG", "BR", "HR"].includes(t.tagName) ? { remove: c(t, n, e) } : { remove: l(t, n, e) };
}
function c(t, i, n) {
  const e = document.createElement("div");
  e.className = `liquid-glass-wrapper ${i !== "normal" ? `intensity-${i}` : ""}`;
  const s = getComputedStyle(t);
  return Object.assign(e.style, {
    width: s.width === "auto" ? t.offsetWidth + "px" : s.width,
    height: s.height === "auto" ? t.offsetHeight + "px" : s.height,
    margin: s.margin,
    borderRadius: s.borderRadius
  }), t.parentNode.insertBefore(e, t), e.appendChild(t), Object.assign(t.style, {
    margin: "0",
    width: "100%",
    height: "100%",
    background: "transparent",
    border: "none"
  }), () => b(t, e, n);
}
function l(t, i, n) {
  const e = getComputedStyle(t);
  e.position === "static" && (t.style.position = "relative"), e.zIndex === "auto" && (t.style.zIndex = "0");
  const s = document.createElement("div");
  return s.className = `liquid-glass ${i !== "normal" ? `intensity-${i}` : ""}`, t.appendChild(s), () => m(t, s, n);
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
function b(t, i, n) {
  i.parentNode && (i.parentNode.insertBefore(t, i), i.remove()), Object.keys(n).forEach((e) => {
    e === "className" ? t.className = n[e] : t.style[e] = n[e];
  });
}
function m(t, i, n) {
  i.parentElement && i.remove(), t.className = n.className, ["position", "zIndex"].forEach((e) => {
    t.style[e] = n[e];
  });
}
function h() {
  if (u || document.getElementById("liquidGlassFilter"))
    return;
  const t = f();
  document.body.appendChild(t), u = !0;
}
function f() {
  const t = "http://www.w3.org/2000/svg", i = document.createElementNS(t, "svg");
  i.setAttribute("width", "0"), i.setAttribute("height", "0"), i.style.display = "none";
  const n = document.createElementNS(t, "defs"), e = document.createElementNS(t, "filter");
  e.setAttribute("id", "liquidGlassFilter"), e.setAttribute("x", "-20%"), e.setAttribute("y", "-20%"), e.setAttribute("width", "140%"), e.setAttribute("height", "140%");
  const s = document.createElementNS(t, "feTurbulence");
  s.setAttribute("baseFrequency", "0.003"), s.setAttribute("numOctaves", "2"), s.setAttribute("result", "noise"), e.appendChild(s);
  const r = document.createElementNS(t, "feDisplacementMap");
  return r.setAttribute("in", "SourceGraphic"), r.setAttribute("in2", "noise"), r.setAttribute("scale", "10"), r.setAttribute("result", "displaced"), e.appendChild(r), A(e, t), n.appendChild(e), i.appendChild(n), i;
}
function A(t, i) {
  const n = document.createElementNS(i, "feColorMatrix");
  n.setAttribute("in", "displaced"), n.setAttribute("values", "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"), n.setAttribute("result", "red"), t.appendChild(n);
  const e = document.createElementNS(i, "feColorMatrix");
  e.setAttribute("in", "displaced"), e.setAttribute("values", "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"), e.setAttribute("result", "green"), t.appendChild(e);
  const s = document.createElementNS(i, "feColorMatrix");
  s.setAttribute("in", "displaced"), s.setAttribute("values", "0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"), s.setAttribute("result", "blue"), t.appendChild(s);
  const r = document.createElementNS(i, "feBlend");
  r.setAttribute("in", "red"), r.setAttribute("in2", "green"), r.setAttribute("mode", "screen"), r.setAttribute("result", "comp1"), t.appendChild(r);
  const a = document.createElementNS(i, "feBlend");
  a.setAttribute("in", "blue"), a.setAttribute("in2", "comp1"), a.setAttribute("mode", "screen"), a.setAttribute("result", "comp2"), t.appendChild(a);
  const o = document.createElementNS(i, "feBlend");
  o.setAttribute("in", "displaced"), o.setAttribute("in2", "comp2"), o.setAttribute("mode", "lighten"), t.appendChild(o);
}
function g(t, i = {}) {
  return Array.from(t).map((n) => d(n, i));
}
function y() {
  var i;
  const t = (i = document.getElementById("liquidGlassFilter")) == null ? void 0 : i.parentElement;
  t && t.remove(), u = !1;
}
export {
  d as applyLiquidGlass,
  g as applyToMultiple,
  y as cleanupAll,
  d as default
};
//# sourceMappingURL=liquid-glass.js.map
