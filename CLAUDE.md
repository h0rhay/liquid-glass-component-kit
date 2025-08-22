# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Liquid Glass Component Kit** - A vanilla JavaScript library for creating Apple-inspired glassmorphism UI effects with advanced features like specular highlights, backdrop blur, SVG refraction, edge distortion, and chromatic aberration.

## Development Commands

```bash
npm run dev        # Start development server with interactive demo
npm run build      # Production build (ES module, UMD, CSS, types)
npm run test       # Run Vitest tests
npm run preview    # Preview built demo
npm run typecheck  # TypeScript declaration checking
npm run lint       # ESLint code quality checks
```

**Testing specific functionality:**
```bash
npm test -- --reporter=verbose        # Detailed test output
npm test -- --coverage               # Test coverage report
```

## Architecture & Key Files

### Core Library Structure
- **`lib/index.js`**: Main API exports (`applyLiquidGlass`, `applyToMultiple`, `cleanupAll`)
- **`lib/liquid-glass.js`**: Core implementation with glass effects and SVG filter management
- **`lib/liquid-glass.css`**: Complete CSS glassmorphism effects with three intensity levels

### Demo Application  
- **`demo/index.html`**: Comprehensive feature showcase
- **`demo/demo.js`**: Interactive controls with real-time parameter adjustment
- **`demo/utils/debounce.js`**: Performance utilities for demo interactions

## Technical Architecture

### Dual Implementation Strategy
The library uses two distinct approaches:
1. **Overlay method**: Creates glass overlay elements for regular containers
2. **Direct styling**: Applies effects directly to void elements (inputs, images, buttons)

This hybrid approach is implemented in the `applyLiquidGlass` function and is critical for proper visual effects across different element types.

### SVG Filter System
- **Dynamic filter creation**: Runtime generation of element-specific SVG filters
- **Shared resources**: Single SVG container with reused filter definitions
- **Parameter optimization**: Different turbulence settings for buttons vs general elements
- **Cleanup management**: Automatic removal of unused filters

### CSS Effect Layers
1. **Backdrop filters**: Blur, saturation, contrast adjustments
2. **Multi-layered shadows**: Specular highlight simulation through inset box-shadows
3. **Gradient borders**: Complex masking and compositing for edge effects
4. **Intensity variants**: `subtle`, `normal`, `strong` with carefully tuned parameters

## Build System

**Vite configuration** handles:
- Development server with demo
- Rollup bundling (ES + UMD)
- TypeScript declarations (`.d.ts` only)
- CSS processing and optimization

**Output structure:**
```
dist/
├── liquid-glass.js      # ES module
├── liquid-glass.umd.cjs # UMD bundle  
├── style.css           # Processed CSS
├── liquid-glass.d.ts   # TypeScript declarations
└── *.map               # Source maps
```

## Key Implementation Patterns

### Element Type Detection
The library differentiates between void elements (input, img, button) and container elements, applying different effect strategies based on element capabilities.

### Progressive Enhancement
All effects include fallbacks for browsers without backdrop-filter support, gracefully degrading to basic glass styling.

### Resource Management
SVG filters are created once and reused across multiple elements. The cleanup system removes unused filters and overlays when effects are removed.

## Browser Support Strategy

**Primary targets**: Chrome/Edge 76+, Firefox 103+, Safari 14+
**Fallback approach**: Graceful degradation to basic glass effects without advanced filters

## Testing Approach

Uses **Vitest with jsdom** environment for:
- Core API function testing
- Element type handling validation  
- Cleanup and resource management
- Effect application across different scenarios

The test suite covers the hybrid approach patterns and ensures proper cleanup of dynamically created elements and SVG filters.