# Liquid Glass Component Kit

A production-ready vanilla JavaScript toolkit for creating beautiful liquid glass morphism effects on any HTML element. Features all advanced effects from the [Atlas Pup Labs article](https://atlaspuplabs.com/blog/liquid-glass-but-in-css): specular highlights, backdrop blur, color filters, SVG refraction, edge distortion, and chromatic aberration.

## ✨ Features

- 🎯 **Simple & Elegant** - Pure functions, no classes, clean API
- 🔧 **Zero Dependencies** - Vanilla JavaScript, works anywhere  
- 📱 **Cross-browser Compatible** - Progressive enhancement with fallbacks
- ⚡ **Lightweight & Fast** - Optimized SVG filters and GPU acceleration
- 🎨 **Customizable** - Multiple intensity levels (subtle, normal, strong)
- 🖼️ **Universal** - Works on buttons, inputs, images, cards, any element

## Installation

```bash
npm install liquid-glass-component-kit
```

## Quick Start

```javascript
import { applyLiquidGlass } from 'liquid-glass-component-kit';

// Apply to any element
const button = document.querySelector('#myButton');
const cleanup = applyLiquidGlass(button);

// With intensity options
const cleanup2 = applyLiquidGlass(button, { intensity: 'strong' });

// Cleanup when done
cleanup();
cleanup2();
```

## Usage

### Basic Usage

```javascript
import { applyLiquidGlass } from 'liquid-glass-component-kit';

// Apply default liquid glass effect
const element = document.querySelector('.my-element');
const cleanup = applyLiquidGlass(element);

// The function returns a cleanup function
// Call it when you want to remove the effect
cleanup();
```

### With Options

```javascript
const cleanup = applyLiquidGlass(element, {
  intensity: 'strong'     // 'subtle' | 'normal' | 'strong'
});
```

### Multiple Elements

```javascript
import { applyToMultiple } from 'liquid-glass-component-kit';

// Apply to multiple elements at once
const buttons = document.querySelectorAll('.liquid-buttons');
const cleanupFunctions = applyToMultiple(buttons, { 
  intensity: 'subtle',
  intensity: 'subtle' 
});

// Cleanup all
cleanupFunctions.forEach(fn => fn());
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

**Returns:** Function - Cleanup function to remove the effect

### `applyToMultiple(elements, options?)`

Applies liquid glass effect to multiple elements.

**Parameters:**
- `elements` (NodeList | Array) - Target elements  
- `options` (Object, optional) - Same as `applyLiquidGlass`

**Returns:** Array of cleanup functions

### `cleanupAll()`

Removes all liquid glass effects and cleans up SVG filters.

## Effects Included

This implementation includes all liquid glass effects from the original article:

- **Specular Highlights** - Multi-layered inset shadows for depth
- **Backdrop Blur** - Gaussian blur with browser fallbacks
- **Color Filters** - Saturation and contrast adjustments  
- **SVG Refraction** - Advanced refraction using SVG filters
- **Edge Distortion** - Radial distortion mapping
- **Ripple Distortion** - Turbulence-based ripple effects
- **Chromatic Aberration** - RGB channel separation for realism

## Browser Support

- **Chrome/Edge 76+** - Full support with all effects
- **Firefox 103+** - Full support with all effects
- **Safari 14+** - Full support with all effects
- **Older browsers** - Graceful fallback to basic glass effect

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
applyLiquidGlass(button, { intensity: 'strong', intensity: 'subtle' });
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
applyToMultiple(cards, { intensity: 'normal', intensity: 'subtle' });
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