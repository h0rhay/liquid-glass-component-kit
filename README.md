# Liquid Glass Component Kit

🍎 **Apple-inspired liquid glass morphism toolkit** for creating stunning glassmorphism UI components. A production-ready vanilla JavaScript library that brings beautiful liquid-glass effects to any HTML element with Apple-style polish and performance.

Features complete glassmorphism effects including specular highlights, backdrop blur, color filters, SVG refraction, edge distortion, and chromatic aberration - inspired by Apple's design language and modern glass morphism trends.

## ✨ Features

- 🎯 **Simple Liquid-Glass API** - Pure functions, no classes, clean liquid-glass integration
- 🔧 **Zero Dependencies** - Pure vanilla JavaScript liquid-glass library  
- 📱 **Cross-browser Liquid-Glass** - Progressive enhancement with liquid-glass fallbacks
- ⚡ **Optimized Liquid-Glass Effects** - Fast SVG filters and GPU-accelerated liquid-glass
- 🎨 **Customizable Liquid-Glass** - Multiple liquid-glass intensity levels (subtle, normal, strong)
- 🖼️ **Universal Liquid-Glass** - Apply liquid-glass to buttons, inputs, images, cards, any element

## Installation

```bash
npm install liquid-glass-component-kit
```

## Quick Start

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