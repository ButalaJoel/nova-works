import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_DEMO=1 builds a single-bundle preview with the dashboard in sample mode.
const demo = process.env.VITE_DEMO === '1'

export default defineConfig({
  plugins: [react()],
  build: demo
    ? { outDir: 'dist-demo', rollupOptions: { output: { inlineDynamicImports: true } } }
    : {},
})
