import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
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
    emptyOutDir: true
  },
  server: {
    open: '/demo/'
  },
  root: process.env.NODE_ENV === 'development' ? '.' : undefined
})