import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/react.js'),
      name: 'LiquidGlassReact',
      formats: ['es', 'umd'],
      fileName: (format) => `react.${format === 'es' ? 'js' : 'umd.cjs'}`
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: false,
    outDir: 'dist'
  }
})