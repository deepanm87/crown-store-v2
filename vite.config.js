import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['redux-saga/effects', 'typed-redux-saga/macro']
  },
  define: {
    global: 'globalThis'
  }
})
