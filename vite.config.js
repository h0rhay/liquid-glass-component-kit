import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    target: ['es2015', 'chrome60', 'firefox60', 'safari11'],
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
      name: 'LiquidGlass',
      formats: ['es', 'umd'],
      fileName: (format) => `liquid-glass.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    sourcemap: true,
    emptyOutDir: false
  },
  server: {
    open: '/demo/'
  },
  root: process.env.NODE_ENV === 'development' ? '.' : undefined
})