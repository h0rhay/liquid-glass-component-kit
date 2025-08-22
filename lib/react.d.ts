/**
 * TypeScript declarations for React Hook Wrapper
 * Provides type definitions for React integration
 */

import { RefObject } from 'react';

export interface LiquidGlassOptions {
  /** Effect intensity: 'subtle' | 'normal' | 'strong' */
  intensity?: 'subtle' | 'normal' | 'strong';
}

export interface LiquidGlassEffect {
  /** Remove the liquid glass effect */
  remove(): void;
}

export interface LiquidGlassControls {
  /** Apply the liquid glass effect */
  applyEffect(): void;
  /** Remove the liquid glass effect */
  removeEffect(): void;
  /** Reapply the effect with current options */
  reapplyEffect(): void;
}

export interface LiquidGlassMultipleControls {
  /** Apply effects to an array of elements */
  applyToElements(elements: HTMLElement[] | NodeList): void;
  /** Remove all applied effects */
  removeAllEffects(): void;
}

/**
 * React hook for applying liquid glass effects to elements
 * @param options - Liquid glass configuration options
 * @returns Tuple of [elementRef, controls] for attaching to elements and controlling effects
 */
export function useLiquidGlass(
  options?: LiquidGlassOptions
): [RefObject<HTMLElement>, LiquidGlassControls];

/**
 * React hook for applying liquid glass effects to multiple elements
 * @param options - Liquid glass configuration options
 * @returns Controls for applying effects to element arrays
 */
export function useLiquidGlassMultiple(
  options?: LiquidGlassOptions
): LiquidGlassMultipleControls;

/**
 * React hook for global cleanup of all liquid glass effects
 * @returns Cleanup function that removes all effects and SVG filters
 */
export function useLiquidGlassCleanup(): () => void;