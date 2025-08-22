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
    const effect = applyLiquidGlass(testElement);
    
    // Check that overlay was created with glass effect
    const overlay = testElement.querySelector('.liquid-glass');
    expect(overlay).toBeTruthy();
    expect(typeof effect.remove).toBe('function');
    
    effect.remove();
  });

  it('applies intensity variants correctly', () => {
    const effect = applyLiquidGlass(testElement, { intensity: 'strong' });
    
    const overlay = testElement.querySelector('.liquid-glass');
    expect(overlay).toBeTruthy();
    expect(overlay.classList.contains('intensity-strong')).toBe(true);
    
    effect.remove();
  });

  it('creates glass overlay', () => {
    const effect = applyLiquidGlass(testElement);
    
    const overlay = testElement.querySelector('.liquid-glass');
    expect(overlay).toBeTruthy();
    
    effect.remove();
  });

  it('cleanup function removes effect', () => {
    const effect = applyLiquidGlass(testElement);
    
    const overlay = testElement.querySelector('.liquid-glass');
    expect(overlay).toBeTruthy();
    
    effect.remove();
    
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
    
    const effects = applyToMultiple(elements);
    
    expect(effects).toHaveLength(3);
    elements.forEach(el => {
      const overlay = el.querySelector('.liquid-glass');
      expect(overlay).toBeTruthy();
    });
    
    effects.forEach(effect => effect.remove());
  });

  it('handles input elements with direct glass effect', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    
    const effect = applyLiquidGlass(input);
    
    // Input should have direct glass class applied
    expect(input.classList.contains('liquid-glass-direct')).toBe(true);
    
    effect.remove();
    
    // Direct glass class should be removed
    expect(input.classList.contains('liquid-glass-direct')).toBe(false);
  });
});