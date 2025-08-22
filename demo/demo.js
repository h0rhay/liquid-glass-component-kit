import { applyLiquidGlass, cleanupAll } from '../lib/index.js';

// Store effect objects for demo controls
let currentEffects = [];
const currentOptions = { intensity: 'normal' };
let effectsEnabled = true;

// SVG filter parameters - optimized values
let filterParams = {
    baseFrequency: 0.003,
    numOctaves: 2,
    displacement1Scale: 10,
    displacement2Scale: 11,
    enableComplexDistortion: false
};

// Demo elements
const elements = [
    '#btn1', '#btn2', '#btn3',
    '#input1', '#input2', '#input3', 
    '#img1', '#img2',
    '#card1',
    // Glass test buttons
    '#testBtn1', '#testBtn2', '#testBtn3', '#testBtn4'
];

// Initialize demo
function initDemo() {
    applyEffects();
    setupControls();
}

function applyEffects() {
    // Clean up existing effects first
    currentEffects.forEach(effect => effect.remove());
    currentEffects = [];
    
    // Only apply if effects are enabled
    if (effectsEnabled) {
        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                // console.log(`Applying glass effect to:`, selector, element);
                const effect = applyLiquidGlass(element, currentOptions);
                currentEffects.push(effect);
            } else {
                // console.warn(`Element not found:`, selector);
            }
        });
        // console.log(`Applied liquid glass with options:`, currentOptions);
    } else {
        // console.log('Glass effects disabled');
    }
}

function setupControls() {
    // Master toggle
    const masterToggle = document.getElementById('masterToggle');
    masterToggle.addEventListener('change', (e) => {
        effectsEnabled = e.target.checked;
        applyEffects();
        
        // Update controls state
        const controls = document.querySelectorAll('.control-button, .filter-controls');
        controls.forEach(ctrl => {
            ctrl.style.opacity = effectsEnabled ? '1' : '0.5';
            if (ctrl.classList.contains('filter-controls')) {
                ctrl.style.pointerEvents = effectsEnabled ? 'auto' : 'none';
            }
        });
    });
    
    // Intensity controls
    document.querySelectorAll('[data-intensity]').forEach(button => {
        button.addEventListener('click', () => {
            if (!effectsEnabled) return;
            
            // Update active state
            document.querySelectorAll('[data-intensity]').forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            // Update options and reapply
            currentOptions.intensity = button.dataset.intensity;
            applyEffects();
        });
    });
    
    // Setup filter parameter sliders
    setupFilterSliders();
}

function setupFilterSliders() {
    // Base frequency slider
    const baseFreqSlider = document.getElementById('baseFrequency');
    const baseFreqValue = baseFreqSlider.nextElementSibling;
    
    baseFreqSlider.addEventListener('input', (e) => {
        filterParams.baseFrequency = parseFloat(e.target.value);
        baseFreqValue.textContent = filterParams.baseFrequency.toFixed(4);
        updateSVGFilter();
    });
    
    // Octaves slider
    const octavesSlider = document.getElementById('numOctaves');
    const octavesValue = octavesSlider.nextElementSibling;
    
    octavesSlider.addEventListener('input', (e) => {
        filterParams.numOctaves = parseInt(e.target.value);
        octavesValue.textContent = filterParams.numOctaves;
        updateSVGFilter();
    });
    
    // Displacement 1 scale slider
    const disp1Slider = document.getElementById('displacement1Scale');
    const disp1Value = disp1Slider.nextElementSibling;
    
    disp1Slider.addEventListener('input', (e) => {
        filterParams.displacement1Scale = parseInt(e.target.value);
        disp1Value.textContent = filterParams.displacement1Scale;
        updateSVGFilter();
    });
    
    // Displacement 2 scale slider
    const disp2Slider = document.getElementById('displacement2Scale');
    const disp2Value = disp2Slider.nextElementSibling;
    
    disp2Slider.addEventListener('input', (e) => {
        filterParams.displacement2Scale = parseInt(e.target.value);
        disp2Value.textContent = filterParams.displacement2Scale;
        updateSVGFilter();
    });
    
    // Reset button
    document.getElementById('resetFilters').addEventListener('click', () => {
        filterParams = {
            baseFrequency: 0.001,
            numOctaves: 2,
            displacement1Scale: 10,
            displacement2Scale: 10
        };
        
        // Update slider values
        baseFreqSlider.value = filterParams.baseFrequency;
        baseFreqValue.textContent = filterParams.baseFrequency.toFixed(4);
        octavesSlider.value = filterParams.numOctaves;
        octavesValue.textContent = filterParams.numOctaves;
        disp1Slider.value = filterParams.displacement1Scale;
        disp1Value.textContent = filterParams.displacement1Scale;
        disp2Slider.value = filterParams.displacement2Scale;
        disp2Value.textContent = filterParams.displacement2Scale;
        
        updateSVGFilter();
    });
    
    // Complex distortion toggle
    const complexDistortionToggle = document.getElementById('enableComplexDistortion');
    complexDistortionToggle.addEventListener('change', (e) => {
        filterParams.enableComplexDistortion = e.target.checked;
        updateSVGFilter();
    });
    
    // Copy values button
    document.getElementById('copyValues').addEventListener('click', () => {
        const values = `baseFrequency: ${filterParams.baseFrequency}
numOctaves: ${filterParams.numOctaves}
displacement1Scale: ${filterParams.displacement1Scale}
displacement2Scale: ${filterParams.displacement2Scale}
enableComplexDistortion: ${filterParams.enableComplexDistortion}`;
        
        navigator.clipboard.writeText(values).then(() => {
            const btn = document.getElementById('copyValues');
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 1000);
        });
    });
}

function updateSVGFilter() {
    // Find the existing SVG filter elements and update their attributes
    const turbulence = document.querySelector('#liquidGlassFilter feTurbulence');
    const displacement1 = document.querySelector('#liquidGlassFilter feDisplacementMap');
    const displacement2 = document.querySelectorAll('#liquidGlassFilter feDisplacementMap')[1];
    // const feImage = document.querySelector('#liquidGlassFilter feImage');
    
    if (turbulence) {
        turbulence.setAttribute('baseFrequency', filterParams.baseFrequency.toString());
        turbulence.setAttribute('numOctaves', filterParams.numOctaves.toString());
    }
    
    if (displacement1) {
        displacement1.setAttribute('scale', filterParams.displacement1Scale.toString());
    }
    
    if (displacement2) {
        // Enable/disable complex distortion by changing the scale or input
        if (filterParams.enableComplexDistortion) {
            displacement2.setAttribute('scale', filterParams.displacement2Scale.toString());
            displacement2.setAttribute('in', 'turbDisplaced');  // Use both effects
        } else {
            displacement2.setAttribute('scale', '0');  // Disable complex distortion
            displacement2.setAttribute('in', 'turbDisplaced');  // Keep turbulence only
        }
    }
    
    // console.log('Updated SVG filter with:', filterParams);
}


// Log for debugging
// console.log('Liquid Glass Demo loaded');
// console.log('Available functions:', { applyLiquidGlass, applyToMultiple, cleanupAll });

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initDemo();
    });
} else {
    initDemo();
}

// Global cleanup for development
window.cleanupLiquidGlass = () => {
    currentEffects.forEach(effect => effect.remove());
    cleanupAll();
    // console.log('All liquid glass effects cleaned up');
};

// For easy debugging in dev tools
window.demoState = {
    effectsEnabled: () => effectsEnabled,
    currentOptions: () => currentOptions,
    toggleEffects: () => document.getElementById('masterToggle').click(),
    checkElements: () => {
        elements.forEach(selector => {
            document.querySelector(selector);
            // console.log(`${selector}:`, el ? `found, classes: ${el.className}` : 'NOT FOUND');
        });
    }
};