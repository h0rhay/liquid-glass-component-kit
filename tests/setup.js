// Test setup for Vitest
import { beforeEach, afterEach } from 'vitest';

// Setup DOM environment
beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  // Clean up any remaining DOM elements
  document.body.innerHTML = '';
  
  // Remove any injected SVG filters
  const svg = document.getElementById('liquidGlassFilter')?.parentElement;
  if (svg) svg.remove();
});