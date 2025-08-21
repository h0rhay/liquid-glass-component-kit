import { describe, it, expect, beforeEach } from 'vitest';
import { applyLiquidGlass, applyToMultiple } from '../lib/liquid-glass.js';

describe('Liquid Glass Component', () => {
  let testElement;

  beforeEach(() => {
    testElement = document.createElement('div');
    testElement.textContent = 'Test Element';
    document.body.appendChild(testElement);
  });

  it('applies liquid glass effect to element', () => {
    const cleanup = applyLiquidGlass(testElement);
    
    // Check that overlay was created with glass effect
    const overlay = testElement.querySelector('.liquid-glass');
    expect(overlay).toBeTruthy();
    expect(typeof cleanup).toBe('function');
    
    cleanup();
  });

  it('applies intensity variants correctly', () => {
    const cleanup = applyLiquidGlass(testElement, { intensity: 'strong' });
    
    const overlay = testElement.querySelector('.liquid-glass');
    expect(overlay).toBeTruthy();
    expect(overlay.classList.contains('intensity-strong')).toBe(true);
    
    cleanup();
  });

  it('creates glass overlay', () => {
    const cleanup = applyLiquidGlass(testElement);
    
    const overlay = testElement.querySelector('.liquid-glass');
    expect(overlay).toBeTruthy();
    
    cleanup();
  });

  it('cleanup function removes effect', () => {
    const cleanup = applyLiquidGlass(testElement);
    
    const overlay = testElement.querySelector('.liquid-glass');
    expect(overlay).toBeTruthy();
    
    cleanup();
    
    const overlayAfterCleanup = testElement.querySelector('.liquid-glass');
    expect(overlayAfterCleanup).toBeFalsy();
  });

  it('applies to multiple elements', () => {
    const elements = [
      document.createElement('button'),
      document.createElement('div'),
      document.createElement('span')
    ];
    
    elements.forEach(el => document.body.appendChild(el));
    
    const cleanupFunctions = applyToMultiple(elements);
    
    expect(cleanupFunctions).toHaveLength(3);
    elements.forEach(el => {
      const overlay = el.querySelector('.liquid-glass');
      expect(overlay).toBeTruthy();
    });
    
    cleanupFunctions.forEach(cleanup => cleanup());
  });

  it('handles input elements with wrapper', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    
    const cleanup = applyLiquidGlass(input);
    
    // Input should be wrapped
    expect(input.parentElement.classList.contains('liquid-glass-wrapper')).toBe(true);
    
    cleanup();
    
    // Should be unwrapped
    expect(input.parentElement.classList.contains('liquid-glass-wrapper')).toBe(false);
  });
});