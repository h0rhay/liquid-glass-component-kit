/**
 * Liquid Glass Component - Simple & Elegant
 * Pure functions for applying glass morphism effects
 */

let svgFiltersInjected = false;

/**
 * Apply liquid glass effect to an element
 * @param {HTMLElement} element - The element to apply the effect to
 * @param {Object} options - Configuration options
 * @param {string} options.intensity - 'subtle', 'normal', 'strong'
 * @returns {Object} Effect object with remove() method
 */
export function applyLiquidGlass(element, options = {}) {
  const { intensity = 'normal' } = options;
  
  ensureSVGFilters();
  
  // Store original state
  const originalStyles = storeOriginalStyles(element);
  
  // Use the same approach for all elements - simple overlay
  const cleanupFn = applyGlassOverlay(element, intensity, originalStyles);
  return { remove: cleanupFn };
}

/**
 * Apply glass overlay to any element - unified bulletproof approach
 */
function applyGlassOverlay(element, intensity, originalStyles) {
  // Universal approach: create overlay positioned over the element
  // This works for ALL element types and avoids any DOM manipulation issues
  
  // Ensure parent has positioning context
  const computedStyle = getComputedStyle(element);
  if (computedStyle.position === 'static') {
    element.style.position = 'relative';
  }
  if (computedStyle.zIndex === 'auto') {
    element.style.zIndex = '0';
  }
  
  // Check element type first
  const isVoidElement = ['INPUT', 'IMG', 'BR', 'HR', 'AREA', 'BASE', 'COL', 'EMBED', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR'].includes(element.tagName);
  
  let overlay = null;
  
  if (isVoidElement) {
    // For void elements (inputs), apply glass effect directly to avoid text blurring
    element.classList.add('liquid-glass-direct');
    if (intensity !== 'normal') {
      element.classList.add(`intensity-${intensity}`);
    }
    
  } else {
    // For non-void elements, create and use overlay approach
    overlay = document.createElement('div');
    overlay.className = `liquid-glass ${intensity !== 'normal' ? `intensity-${intensity}` : ''}`;
    element.appendChild(overlay);
    
  }
  
  return () => restoreElement(element, overlay, originalStyles);
}

/**
 * Store original element styles for cleanup
 */
function storeOriginalStyles(element) {
  return {
    position: element.style.position,
    zIndex: element.style.zIndex
  };
}

/**
 * Restore element to original state - unified cleanup
 */
function restoreElement(element, overlay, originalStyles) {
  if (overlay && overlay.parentNode) {
    overlay.remove();
  }
  
  // Remove direct glass classes for void elements
  element.classList.remove('liquid-glass-direct', 'intensity-subtle', 'intensity-strong');
  
  // Restore original styles
  ['position', 'zIndex'].forEach(prop => {
    element.style[prop] = originalStyles[prop];
  });
}

/**
 * Ensure SVG filters are injected into the document
 */
function ensureSVGFilters() {
  if (svgFiltersInjected || document.getElementById('liquidGlassFilter')) {
    return;
  }

  const svg = createSVGFilters();
  document.body.appendChild(svg);
  svgFiltersInjected = true;
}

/**
 * Create optimized SVG filters with element-specific parameters
 */
function createSVGFilters() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.display = 'none';

  const defs = document.createElementNS(svgNS, 'defs');
  
  // Default filter for most elements
  const defaultFilter = createFilter(svgNS, 'liquidGlassFilter', {
    baseFrequency: '0.0005',
    numOctaves: '4',
    scale: '25'
  });
  
  // Button-specific filter with reduced scale to avoid border artifacts
  const buttonFilter = createFilter(svgNS, 'liquidGlassFilterButton', {
    baseFrequency: '0.0005',
    numOctaves: '4',
    scale: '5'
  });
  
  defs.appendChild(defaultFilter);
  defs.appendChild(buttonFilter);
  svg.appendChild(defs);
  
  return svg;
}

/**
 * Create individual SVG filter with specified parameters
 */
function createFilter(svgNS, id, params) {
  const filter = document.createElementNS(svgNS, 'filter');
  
  filter.setAttribute('id', id);
  filter.setAttribute('x', '-20%');
  filter.setAttribute('y', '-20%');
  filter.setAttribute('width', '140%');
  filter.setAttribute('height', '140%');

  // Turbulence with specified values
  const turbulence = document.createElementNS(svgNS, 'feTurbulence');
  turbulence.setAttribute('baseFrequency', params.baseFrequency);
  turbulence.setAttribute('numOctaves', params.numOctaves);
  turbulence.setAttribute('result', 'noise');
  filter.appendChild(turbulence);

  // Displacement with specified scale
  const displacement = document.createElementNS(svgNS, 'feDisplacementMap');
  displacement.setAttribute('in', 'SourceGraphic');
  displacement.setAttribute('in2', 'noise');
  displacement.setAttribute('scale', params.scale);
  displacement.setAttribute('result', 'displaced');
  filter.appendChild(displacement);

  // Chromatic aberration effect
  createChromaticAberration(filter, svgNS);
  
  return filter;
}

/**
 * Create chromatic aberration effect
 */
function createChromaticAberration(filter, svgNS) {
  // Red channel
  const redMatrix = document.createElementNS(svgNS, 'feColorMatrix');
  redMatrix.setAttribute('in', 'displaced');
  redMatrix.setAttribute('values', '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0');
  redMatrix.setAttribute('result', 'red');
  filter.appendChild(redMatrix);

  // Green channel  
  const greenMatrix = document.createElementNS(svgNS, 'feColorMatrix');
  greenMatrix.setAttribute('in', 'displaced');
  greenMatrix.setAttribute('values', '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0');
  greenMatrix.setAttribute('result', 'green');
  filter.appendChild(greenMatrix);

  // Blue channel
  const blueMatrix = document.createElementNS(svgNS, 'feColorMatrix');
  blueMatrix.setAttribute('in', 'displaced');
  blueMatrix.setAttribute('values', '0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0');
  blueMatrix.setAttribute('result', 'blue');
  filter.appendChild(blueMatrix);

  // Blend channels
  const blend1 = document.createElementNS(svgNS, 'feBlend');
  blend1.setAttribute('in', 'red');
  blend1.setAttribute('in2', 'green');
  blend1.setAttribute('mode', 'screen');
  blend1.setAttribute('result', 'comp1');
  filter.appendChild(blend1);

  const blend2 = document.createElementNS(svgNS, 'feBlend');
  blend2.setAttribute('in', 'blue');
  blend2.setAttribute('in2', 'comp1');
  blend2.setAttribute('mode', 'screen');
  blend2.setAttribute('result', 'comp2');
  filter.appendChild(blend2);

  // Final blend
  const finalBlend = document.createElementNS(svgNS, 'feBlend');
  finalBlend.setAttribute('in', 'displaced');
  finalBlend.setAttribute('in2', 'comp2');
  finalBlend.setAttribute('mode', 'lighten');
  filter.appendChild(finalBlend);
}

/**
 * Apply to multiple elements
 * @param {NodeList|Array} elements - Elements to apply effect to
 * @param {Object} options - Configuration options
 * @returns {Array} Array of effect objects with remove() methods
 */
export function applyToMultiple(elements, options = {}) {
  return Array.from(elements).map(el => applyLiquidGlass(el, options));
}

/**
 * Clean up all effects and remove SVG filters
 */
export function cleanupAll() {
  const svg = document.getElementById('liquidGlassFilter')?.parentElement;
  if (svg) svg.remove();
  svgFiltersInjected = false;
}