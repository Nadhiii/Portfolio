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
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          ui: ['lucide-react'],
          slider: ['react-slick', 'slick-carousel'],
          lightbox: ['fslightbox-react'],
          email: ['@emailjs/browser']
        }
      }
    },
    // Increase chunk size warning limit since we're now splitting properly
    chunkSizeWarningLimit: 600
  }
})
