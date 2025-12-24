import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Your existing chunk logic is excellent, keep it.
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          ui: ['lucide-react'],
          slider: ['react-slick', 'slick-carousel'],
          lightbox: ['fslightbox-react'],
          email: ['@emailjs/browser']
        }
      }
    },
    // THE FIX: Simply raise the limit to 1000kB (1MB) to silence the warning.
    // This is common for modern React apps with 3D/Animation libraries.
    chunkSizeWarningLimit: 1000
  }
})