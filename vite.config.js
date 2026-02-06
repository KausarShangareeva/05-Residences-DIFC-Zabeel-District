import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5174,
    strictPort: true,
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['libphonenumber-js'],
  },
  build: {
    commonjsOptions: {
      include: [/libphonenumber-js/, /node_modules/],
    },
  },
})
