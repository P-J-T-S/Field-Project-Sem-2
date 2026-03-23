import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    // Proxy /api requests to the Express backend during development.
    // This avoids CORS issues when running both servers locally.
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    // Ensure SPA routing works for /payment-success and /payment-failure
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})
