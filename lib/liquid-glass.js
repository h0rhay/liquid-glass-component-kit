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
  const isVoidElement = ['INPUT', 'IMG', 'BR', 'HR'].includes(element.tagName);
  
  if (isVoidElement) {
    const cleanupFn = applyToVoidElement(element, intensity, originalStyles);
    return { remove: cleanupFn };
  } else {
    const cleanupFn = applyToRegularElement(element, intensity, originalStyles);
    return { remove: cleanupFn };
  }
}

/**
 * Apply glass effect to void elements (inputs, images) using wrapper approach
 */
function applyToVoidElement(element, intensity, originalStyles) {
  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = `liquid-glass-wrapper ${intensity !== 'normal' ? `intensity-${intensity}` : ''}`;
  
  // Copy element dimensions and position
  const computedStyle = getComputedStyle(element);
  Object.assign(wrapper.style, {
    width: computedStyle.width === 'auto' ? element.offsetWidth + 'px' : computedStyle.width,
    height: computedStyle.height === 'auto' ? element.offsetHeight + 'px' : computedStyle.height,
    margin: computedStyle.margin,
    borderRadius: computedStyle.borderRadius
  });
  
  // Insert wrapper and move element
  element.parentNode.insertBefore(wrapper, element);
  wrapper.appendChild(element);
  
  // Make element transparent to show glass effect
  Object.assign(element.style, {
    margin: '0',
    width: '100%',
    height: '100%',
    background: 'transparent',
    border: 'none'
  });
  
  return () => restoreVoidElement(element, wrapper, originalStyles);
}

/**
 * Apply glass effect to regular elements using overlay approach
 */
function applyToRegularElement(element, intensity, originalStyles) {
  // Set positioning context
  const computedStyle = getComputedStyle(element);
  if (computedStyle.position === 'static') {
    element.style.position = 'relative';
  }
  if (computedStyle.zIndex === 'auto') {
    element.style.zIndex = '0';
  }
  
  // Create glass overlay
  const overlay = document.createElement('div');
  overlay.className = `liquid-glass ${intensity !== 'normal' ? `intensity-${intensity}` : ''}`;
  
  element.appendChild(overlay);
  
  return () => restoreRegularElement(element, overlay, originalStyles);
}

/**
 * Store original element styles for cleanup
 */
function storeOriginalStyles(element) {
  return {
    className: element.className,
    margin: element.style.margin,
    width: element.style.width,
    height: element.style.height,
    position: element.style.position,
    zIndex: element.style.zIndex,
    background: element.style.background,
    border: element.style.border
  };
}

/**
 * Restore void element to original state
 */
function restoreVoidElement(element, wrapper, originalStyles) {
  if (wrapper.parentNode) {
    wrapper.parentNode.insertBefore(element, wrapper);
    wrapper.remove();
  }
  
  // Restore all original styles
  Object.keys(originalStyles).forEach(prop => {
    if (prop === 'className') {
      element.className = originalStyles[prop];
    } else {
      element.style[prop] = originalStyles[prop];
    }
  });
}

/**
 * Restore regular element to original state
 */
function restoreRegularElement(element, overlay, originalStyles) {
  if (overlay.parentElement) {
    overlay.remove();
  }
  
  // Restore original styles
  element.className = originalStyles.className;
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
 * Create optimized SVG filter with final tuned values
 */
function createSVGFilters() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.display = 'none';

  const defs = document.createElementNS(svgNS, 'defs');
  const filter = document.createElementNS(svgNS, 'filter');
  
  filter.setAttribute('id', 'liquidGlassFilter');
  filter.setAttribute('x', '-20%');
  filter.setAttribute('y', '-20%');
  filter.setAttribute('width', '140%');
  filter.setAttribute('height', '140%');

  // Optimized turbulence
  const turbulence = document.createElementNS(svgNS, 'feTurbulence');
  turbulence.setAttribute('baseFrequency', '0.003');
  turbulence.setAttribute('numOctaves', '2');
  turbulence.setAttribute('result', 'noise');
  filter.appendChild(turbulence);

  // Displacement with optimized scale
  const displacement = document.createElementNS(svgNS, 'feDisplacementMap');
  displacement.setAttribute('in', 'SourceGraphic');
  displacement.setAttribute('in2', 'noise');
  displacement.setAttribute('scale', '10');
  displacement.setAttribute('result', 'displaced');
  filter.appendChild(displacement);

  // Chromatic aberration effect
  createChromaticAberration(filter, svgNS);

  defs.appendChild(filter);
  svg.appendChild(defs);
  
  return svg;
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