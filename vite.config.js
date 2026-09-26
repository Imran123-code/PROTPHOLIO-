import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    open: false
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate Three.js into its own chunk (~600KB) — only loaded when ThreeHeroScene mounts
          'three-vendor': ['three'],
          // React ecosystem
          'react-vendor': ['react', 'react-dom'],
          // Icon library
          'lucide-vendor': ['lucide-react'],
        }
      }
    },
    // Raise warning threshold slightly since Three.js is now isolated
    chunkSizeWarningLimit: 700,
  }
})
