# Liquid Glass Component Kit

**[🚀 View Live Demo](https://h0rhay.github.io/liquid-glass-component-kit/)** | **[📦 npm Package](https://www.npmjs.com/package/liquid-glass-component-kit)**

🍎 **Apple-inspired liquid glass morphism toolkit** for creating stunning glassmorphism UI components.

_Simply wrap buttons, images, form elements etc. Ensure they are positioned over a BG image, and voila!_

A production-ready vanilla JavaScript library that brings beautiful liquid-glass effects to any HTML element with Apple-style polish and performance.

Features complete glassmorphism effects including specular highlights, backdrop blur, color filters, SVG refraction, edge distortion, and chromatic aberration - inspired by Apple's design language and modern glass morphism trends.

### Credit:

**Wouldn’t have been possible without the incredible work documented here: [https://atlaspuplabs.com/blog/liquid-glass-but-in-css](https://atlaspuplabs.com/blog/liquid-glass-but-in-css)**

## ✨ Features

- 🎯 **Simple Liquid-Glass API** - Pure functions, no classes, clean liquid-glass integration
- 🔧 **Zero Dependencies** - The vanilla JavaScript version doesnt need any. 
- ⚛️ **React Support** - Set up with React too if thats how you roll
- 📱 **Cross-browser Liquid-Glass** - Progressive enhancement with liquid-glass fallbacks
- ⚡ **Optimized Liquid-Glass Effects** - Fast SVG filters and GPU-accelerated liquid-glass
- 🎨 **Customizable Liquid-Glass** - Multiple liquid-glass intensity levels (subtle, normal, strong)
- 🖼️ **Universal Liquid-Glass** - Apply liquid-glass to buttons, inputs, images, cards, any element

## Installation

### For Vanilla JavaScript Projects
```bash
npm install liquid-glass-component-kit
```

### For React Projects
```bash
npm install liquid-glass-component-kit react
```

> **Note**: React is an optional peer dependency. Vanilla JS users get zero React bloat - the React hooks are in a separate entry point (`/react`) that's only loaded when explicitly imported.

## Importing Styles

The package includes CSS styles that need to be imported at root for the liquid glass effects to work. You can import them in several ways:

### Using CSS Import
```css
@import 'liquid-glass-component-kit/styles';
```

### Using JavaScript Import
```javascript
import 'liquid-glass-component-kit/styles';
```

## Quick Start

> **💡 Tip**: Try the [interactive demo](https://h0rhay.github.io/liquid-glass-component-kit/) to see all effects in action!

### Vanilla JavaScript
```javascript
import { applyLiquidGlass } from 'liquid-glass-component-kit';

// Get element and apply liquid-glass effect (applies immediately)
const button = document.querySelector('#myButton');
const effect = applyLiquidGlass(button);

// Apply with custom intensity (applies immediately) 
const strongEffect = applyLiquidGlass(button, { intensity: 'strong' });

// Remove effects when done
effect.remove();        // removes first effect
strongEffect.remove();  // removes strong effect
```

### React
```jsx
import { useLiquidGlass } from 'liquid-glass-component-kit/react';

function MyButton() {
  const [glassRef] = useLiquidGlass({ intensity: 'strong' });
  return <button ref={glassRef}>Click me</button>;
}
```

## Usage

### Basic Usage

```javascript
import { applyLiquidGlass } from 'liquid-glass-component-kit';

// Apply default liquid-glass effect (applies immediately)
const element = document.querySelector('.my-element');
const effect = applyLiquidGlass(element);

// The function returns an effect object
// Call remove() when you want to remove the liquid-glass effect
effect.remove();
```

### With Options

```javascript
// Liquid-glass with custom intensity (applies immediately)
const applyEffect = applyLiquidGlass(element, {
  intensity: 'strong'     // liquid-glass intensity: 'subtle' | 'normal' | 'strong'
});
```

### Multiple Elements

```javascript
import { applyToMultiple } from 'liquid-glass-component-kit';

// Apply to multiple elements at once
const buttons = document.querySelectorAll('.liquid-buttons');
const buttonEffects = applyToMultiple(buttons, { 
  intensity: 'subtle' 
});

// Cleanup all
buttonEffects.forEach(effect => effect.remove());
```

### Global Cleanup

```javascript
import { cleanupAll } from 'liquid-glass-component-kit';

// Remove all liquid glass effects and SVG filters
cleanupAll();
```

## API Reference

### `applyLiquidGlass(element, options?)`

Applies liquid glass effect to a single element.

**Parameters:**
- `element` (HTMLElement) - Target element
- `options` (Object, optional) - Configuration options
  - `intensity` (string) - Effect intensity: `'subtle'`, `'normal'`, `'strong'` (default: `'normal'`)

**Returns:** Object - Effect object with remove() method

### `applyToMultiple(elements, options?)`

Applies liquid glass effect to multiple elements.

**Parameters:**
- `elements` (NodeList | Array) - Target elements  
- `options` (Object, optional) - Same as `applyLiquidGlass`

**Returns:** Array of effect objects with remove() methods

### `cleanupAll()`

Removes all liquid glass effects and cleans up SVG filters.

## Effects Included

### Core Glass Effects (All Browsers)
- **Specular Highlights** - Multi-layered inset shadows for realistic depth
- **Backdrop Blur** - Gaussian blur with progressive enhancement
- **Color Filters** - Saturation and contrast adjustments for glass tinting
- **Glass Depth** - Box shadows and background transparency
- **Gradient Borders** - Subtle light reflections on edges

### Enhanced Effects (Desktop + Android)
- **SVG Refraction** - Advanced refraction using SVG displacement filters
- **Edge Distortion** - Radial distortion mapping with feTurbulence
- **Ripple Distortion** - Turbulence-based organic glass distortion
- **Chromatic Aberration** - RGB channel separation for realistic glass behavior

All effects are applied using progressive enhancement, ensuring every user gets a beautiful glass experience appropriate for their device capabilities.

## Browser Support

### Desktop Browsers
- **Chrome/Edge 76+** - Full support with all effects including SVG distortion
- **Firefox 103+** - Full support with all effects including SVG distortion  
- **Safari 14+** - Full support with all effects including SVG distortion

### Mobile Browsers
- **iOS Safari/Chrome** - Glass effects with blur and saturation (no SVG distortion)
- **Android Chrome** - Full support with all effects including SVG distortion
- **Older browsers** - Graceful fallback to basic glass styling

### Progressive Enhancement
The library uses CSS `@supports` queries to provide:
- **Base layer**: Beautiful glass effects (blur, saturation, highlights) that work everywhere
- **Enhanced layer**: Advanced SVG distortion filters on supported browsers
- **Fallback layer**: Semi-transparent styling when backdrop-filter isn't supported

**Technical Note**: iOS Safari and Chrome don't support `backdrop-filter` with `url()` SVG filters. The library automatically detects this limitation using CSS `@supports` queries and provides appropriate fallbacks, ensuring consistent visual quality across all platforms without requiring JavaScript device detection.

## SVG Filter Compatibility

### The Mobile SVG Filter Issue

During development, we discovered that mobile browsers (particularly iOS Safari and Chrome) report support for `backdrop-filter: url(#filter)` via CSS `@supports` queries, but the SVG filters don't actually work and can break the entire backdrop-filter declaration.

### Our Solution

The library uses a sophisticated detection approach:

```css
/* Enhanced effects only for desktop browsers */
@supports (backdrop-filter: url(#test)) and (hover: hover) and (pointer: fine) {
  /* SVG distortion filters applied here */
}
```

This ensures:
- **Desktop browsers**: Get full SVG distortion effects
- **Mobile browsers**: Get reliable backdrop-filter effects without problematic SVG URLs
- **Older browsers**: Get graceful fallbacks

### Why This Matters

Without this detection, mobile users would see no glass effects at all because the SVG filter URL breaks the entire backdrop-filter property. Our approach guarantees that every user gets beautiful glass effects appropriate for their device.

## Performance

The component is optimized for performance:
- SVG filters are shared across instances
- GPU-accelerated CSS effects
- Minimal DOM manipulation
- Efficient cleanup functions

## Examples

### Button with Liquid Glass
```javascript
const button = document.querySelector('.cta-button');
applyLiquidGlass(button, { intensity: 'strong' });
```

### Form Inputs
```javascript
const inputs = document.querySelectorAll('input, textarea');
applyToMultiple(inputs, { intensity: 'subtle' });
```

### Image Gallery
```javascript
const images = document.querySelectorAll('.gallery img');
applyToMultiple(images, { intensity: 'subtle' });
```

### Cards/Containers
```javascript
const cards = document.querySelectorAll('.card');
applyToMultiple(cards, { intensity: 'normal' });
```

## React Usage

### Import Styles
First, import the required CSS styles:
```javascript
import 'liquid-glass-component-kit/styles';
```

### Basic React Hook
```jsx
import { useLiquidGlass } from 'liquid-glass-component-kit/react';

function GlassButton({ children, intensity = 'normal' }) {
  const [ref] = useLiquidGlass({ intensity });
  return <button ref={ref}>{children}</button>;
}
```

### React Hook with Controls
```jsx
import { useLiquidGlass } from 'liquid-glass-component-kit/react';

function InteractiveCard() {
  const [ref, { removeEffect, reapplyEffect }] = useLiquidGlass({ 
    intensity: 'strong' 
  });
  
  return (
    <div ref={ref} className="card">
      <h3>Glass Card</h3>
      <button onClick={removeEffect}>Remove Effect</button>
      <button onClick={reapplyEffect}>Reapply Effect</button>
    </div>
  );
}
```

### Multiple Elements Hook
```jsx
import { useLiquidGlassMultiple } from 'liquid-glass-component-kit/react';
import { useRef, useEffect } from 'react';

function GlassGallery() {
  const imagesRef = useRef([]);
  const { applyToElements } = useLiquidGlassMultiple({ intensity: 'subtle' });
  
  useEffect(() => {
    applyToElements(imagesRef.current);
  }, [applyToElements]);
  
  return (
    <div>
      {[1, 2, 3].map(i => (
        <img 
          key={i}
          ref={el => imagesRef.current[i-1] = el}
          src={`image${i}.jpg`}
          alt={`Glass effect ${i}`}
        />
      ))}
    </div>
  );
}
```

### TypeScript Support
```tsx
import { useLiquidGlass, LiquidGlassOptions } from 'liquid-glass-component-kit/react';

interface Props {
  intensity?: LiquidGlassOptions['intensity'];
}

function TypedGlassComponent({ intensity }: Props) {
  const [ref] = useLiquidGlass({ intensity });
  return <div ref={ref}>TypeScript glass effect</div>;
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server with demo
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## License

MIT License - see LICENSE file for details

## Credits

Based on the liquid glass CSS technique by [Atlas Pup Labs](https://atlaspuplabs.com/blog/liquid-glass-but-in-css).