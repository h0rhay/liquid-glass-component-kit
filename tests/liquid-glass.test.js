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
    
    expect(testElement.classList.contains('liquid-glass')).toBe(true);
    expect(testElement.classList.contains('animated')).toBe(true);
    expect(typeof cleanup).toBe('function');
    
    cleanup();
  });

  it('applies intensity variants correctly', () => {
    const cleanup = applyLiquidGlass(testElement, { intensity: 'strong' });
    
    expect(testElement.classList.contains('liquid-glass')).toBe(true);
    expect(testElement.classList.contains('intensity-strong')).toBe(true);
    
    cleanup();
  });

  it('applies animation option correctly', () => {
    const cleanup = applyLiquidGlass(testElement, { animated: false });
    
    expect(testElement.classList.contains('liquid-glass')).toBe(true);
    expect(testElement.classList.contains('animated')).toBe(false);
    
    cleanup();
  });

  it('creates container wrapper', () => {
    const cleanup = applyLiquidGlass(testElement);
    
    expect(testElement.parentElement.classList.contains('liquid-glass-container')).toBe(true);
    
    cleanup();
  });

  it('cleanup function removes effect', () => {
    const originalClassName = testElement.className;
    const cleanup = applyLiquidGlass(testElement);
    
    expect(testElement.classList.contains('liquid-glass')).toBe(true);
    
    cleanup();
    
    expect(testElement.className).toBe(originalClassName);
    expect(testElement.parentElement).toBe(document.body);
  });

  it('applies to multiple elements', () => {
    const elements = [
      document.createElement('button'),
      document.createElement('input'),
      document.createElement('img')
    ];
    
    elements.forEach(el => document.body.appendChild(el));
    
    const cleanupFunctions = applyToMultiple(elements);
    
    expect(cleanupFunctions).toHaveLength(3);
    elements.forEach(el => {
      expect(el.classList.contains('liquid-glass')).toBe(true);
    });
    
    cleanupFunctions.forEach(cleanup => cleanup());
  });
});