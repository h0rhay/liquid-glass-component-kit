# GitHub Actions Workflows

## Build and Deploy

This workflow automatically:

1. **On every push/PR**: 
   - Installs dependencies
   - Runs tests and linting
   - Builds the library with browser compatibility
   - Copies built files to demo folder
   - Uploads build artifacts

2. **On main branch push**:
   - Deploys the demo to GitHub Pages

## Local Development

```bash
# Build and start dev server
npm run dev

# Build only
npm run build

# Build demo files only
npm run build:demo
```

## Browser Compatibility

The build targets:
- ES2015+ (modern browsers)
- Chrome 60+
- Firefox 60+
- Safari 11+

This ensures `let`/`const` and other modern features work across browsers.
