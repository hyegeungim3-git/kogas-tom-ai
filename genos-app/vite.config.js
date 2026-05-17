import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/kogas-tom-ai/',
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
})
