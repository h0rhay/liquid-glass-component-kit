/**
 * React Hook Wrapper for Liquid Glass Component Kit
 * Provides React-friendly interface for vanilla JavaScript library
 */

import { useRef, useEffect, useCallback } from 'react';
import { applyLiquidGlass, cleanupAll } from './index.js';

/**
 * React hook for applying liquid glass effects to elements
 * @param {Object} options - Liquid glass options
 * @param {string} options.intensity - Effect intensity: 'subtle' | 'normal' | 'strong'
 * @returns {Array} [ref, { applyEffect, removeEffect }] - Ref for element and control functions
 */
export function useLiquidGlass(options = {}) {
  const elementRef = useRef(null);
  const effectRef = useRef(null);
  const optionsRef = useRef(options);

  // Update options ref when options change
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  // Apply effect function
  const applyEffect = useCallback(() => {
    if (elementRef.current && !effectRef.current) {
      effectRef.current = applyLiquidGlass(elementRef.current, optionsRef.current);
    }
  }, []);

  // Remove effect function  
  const removeEffect = useCallback(() => {
    if (effectRef.current) {
      effectRef.current.remove();
      effectRef.current = null;
    }
  }, []);

  // Reapply effect when options change
  const reapplyEffect = useCallback(() => {
    removeEffect();
    if (elementRef.current) {
      effectRef.current = applyLiquidGlass(elementRef.current, optionsRef.current);
    }
  }, [removeEffect]);

  // Auto-apply effect when element is available and options change
  useEffect(() => {
    if (elementRef.current) {
      reapplyEffect();
    }
    // Cleanup on unmount
    return removeEffect;
  }, [reapplyEffect, removeEffect, options]);

  return [elementRef, { applyEffect, removeEffect, reapplyEffect }];
}

/**
 * React hook for applying liquid glass effects to multiple elements
 * @param {Object} options - Liquid glass options
 * @returns {Function} applyToElements - Function to apply effects to element array
 */
export function useLiquidGlassMultiple(options = {}) {
  const effectsRef = useRef([]);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const applyToElements = useCallback((elements) => {
    // Clean up existing effects
    effectsRef.current.forEach(effect => effect.remove());
    effectsRef.current = [];

    // Apply to new elements
    if (elements) {
      const elementsArray = Array.isArray(elements) ? elements : Array.from(elements);
      effectsRef.current = elementsArray.map(element => 
        applyLiquidGlass(element, optionsRef.current)
      );
    }
  }, []);

  const removeAllEffects = useCallback(() => {
    effectsRef.current.forEach(effect => effect.remove());
    effectsRef.current = [];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return removeAllEffects;
  }, [removeAllEffects]);

  return { applyToElements, removeAllEffects };
}

/**
 * React hook for global cleanup of all liquid glass effects
 * @returns {Function} cleanup - Function to remove all effects and SVG filters
 */
export function useLiquidGlassCleanup() {
  return useCallback(() => {
    cleanupAll();
  }, []);
}