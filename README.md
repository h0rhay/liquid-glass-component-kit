# Liquid Glass Component Kit

**[🚀 View Live Demo](https://h0rhay.github.io/liquid-glass-component-kit/)** | **[📦 npm Package](https://www.npmjs.com/package/liquid-glass-component-kit)**

🍎 **Apple-inspired Liquid Glass morphism toolkit** for creating stunning, frosted glassmorphism UI components.

_Simply wrap buttons, images, form elements, cards, navbars — anything. Put them over a background image and boom: Liquid Glass._

A production-ready vanilla JavaScript library that brings beautiful liquid-glass effects to any HTML element with Apple-style polish and performance.

Features full-stack glassmorphism effects like specular highlights, backdrop blur, color filters, SVG refraction, edge distortion, and chromatic aberration — inspired by Apple’s Liquid Glass design language and modern glassmorphism trends.

---

## 🔍 Testing It Out

To really see the distortion at work, drag the glass panes over the top of the mountain — you’ll see it flip.  
Or line them up with the tree trunks and watch how the alignment shifts.  
That’s the magic: **this isn’t just blur, it’s real refraction and distortion.**

---

### Credit

Wouldn’t have been possible without the incredible work documented here:  
👉 [Atlas Pup Labs — Liquid Glass but in CSS](https://atlaspuplabs.com/blog/liquid-glass-but-in-css)

---

## ✨ Features

- 🎯 **Simple Liquid Glass API** — Pure functions, no classes, easy to drop in  
- 🔧 **Zero Dependencies** — Vanilla JavaScript version ships clean  
- ⚛️ **React Support** — Hooks included if that’s how you roll  
- 📱 **Cross-browser Ready** — Progressive enhancement with fallbacks baked in  
- ⚡ **Optimized** — Fast SVG filters and GPU-accelerated effects  
- 🎨 **Customizable** — Choose subtle, normal, or strong intensity  
- 🖼️ **Universal** — Works on buttons, inputs, images, cards, modals, anything  

---

## Installation

### Vanilla JS
```bash
npm install liquid-glass-component-kit
```

### React
```bash
npm install liquid-glass-component-kit react
```

> **Note**: React is optional. Vanilla JS users get zero React bloat — React hooks live in a separate entry point (`/react`) that’s only loaded when imported.

---

## Importing Styles

The package includes CSS styles that need to be imported globally:

### CSS Import
```css
@import 'liquid-glass-component-kit/styles';
```

### JS Import
```js
import 'liquid-glass-component-kit/styles';
```

---

## Quick Start

💡 Tip: Try the [interactive demo](https://h0rhay.github.io/liquid-glass-component-kit/) to see all effects in action.
> To really see the distortion at work, drag the glass panes over the top of the mountain — you’ll see it flip.
Or line them up with the tree trunks and watch how the alignment shifts.

### Vanilla JS
```js
import { applyLiquidGlass } from 'liquid-glass-component-kit';

const button = document.querySelector('#myButton');
const effect = applyLiquidGlass(button);

const strong = applyLiquidGlass(button, { intensity: 'strong' });

effect.remove();
strong.remove();
```

### React
```jsx
import { useLiquidGlass } from 'liquid-glass-component-kit/react';

function MyButton() {
  const [ref] = useLiquidGlass({ intensity: 'strong' });
  return <button ref={ref}>Click me</button>;
}
```

---

## Usage Examples

- **Single element**  
```js
const el = document.querySelector('.my-element');
const effect = applyLiquidGlass(el);
effect.remove();
```

- **With options**  
```js
applyLiquidGlass(el, { intensity: 'subtle' });
```

- **Multiple elements**  
```js
import { applyToMultiple } from 'liquid-glass-component-kit';
const els = document.querySelectorAll('.liquid-buttons');
const effects = applyToMultiple(els, { intensity: 'normal' });
effects.forEach(e => e.remove());
```

- **Global cleanup**  
```js
import { cleanupAll } from 'liquid-glass-component-kit';
cleanupAll();
```

---

## API Reference

### `applyLiquidGlass(element, options?)`
Apply to a single element. Returns an effect object with `.remove()`.

Options:
- `intensity`: `'subtle' | 'normal' | 'strong'` (default `'normal'`)

### `applyToMultiple(elements, options?)`
Apply to multiple elements. Returns an array of effect objects.

### `cleanupAll()`
Remove all liquid glass effects and filters.

---

## Effects Included

**Core (all browsers)**  
- Specular highlights  
- Backdrop blur  
- Color filters  
- Gradient borders  
- Depth / box shadows  

**Enhanced (desktop + Android)**  
- SVG refraction  
- Edge distortion  
- Ripple distortion  
- Chromatic aberration  

Everything is progressive: users always see *something* beautiful, with upgrades where supported.

---

## Browser Support

- **Chrome / Edge 76+**: full effects  
- **Firefox 103+**: full effects  
- **Safari 14+**: full effects  
- **iOS Safari/Chrome**: blur + saturation, no SVG distortion  
- **Android Chrome**: full effects  
- **Older browsers**: fallback to basic glass styling  

---

## SSR Ready

Works in **Next.js**, **Remix**, **Nuxt**, etc.  
Server renders clean base glass, client hydrates with SVG enhancements. No mismatches.

---

## Performance

- Shared SVG filters (no duplication)  
- GPU-accelerated CSS effects  
- Minimal DOM churn  
- Easy cleanup  

---

## Examples

- **Buttons**
```js
applyLiquidGlass(document.querySelector('.cta'), { intensity: 'strong' });
```

- **Inputs**
```js
applyToMultiple(document.querySelectorAll('input'), { intensity: 'subtle' });
```

- **Cards**
```js
applyToMultiple(document.querySelectorAll('.card'), { intensity: 'normal' });
```

---

## React Goodies

### Import styles
```js
import 'liquid-glass-component-kit/styles';
```

### Hook
```jsx
import { useLiquidGlass } from 'liquid-glass-component-kit/react';

function GlassButton({ children }) {
  const [ref] = useLiquidGlass({ intensity: 'normal' });
  return <button ref={ref}>{children}</button>;
}
```

### With controls
```jsx
const [ref, { removeEffect, reapplyEffect }] = useLiquidGlass({ intensity: 'strong' });
```

---

## Development

```bash
npm install
npm run dev   # start demo
npm test
npm run build
```

---

## License

MIT — see LICENSE

---

## Credits

Based on the Liquid Glass CSS technique by [Atlas Pup Labs](https://atlaspuplabs.com/blog/liquid-glass-but-in-css).
