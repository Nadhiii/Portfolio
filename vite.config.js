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
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          ui: ['lucide-react'],
          slider: ['react-slick', 'slick-carousel'],
          lightbox: ['fslightbox-react'],
          email: ['@emailjs/browser'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          lenis: ['lenis'],
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})