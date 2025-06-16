import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/remote",
  server: {
    allowedHosts: ["tgo.tristinxie.com"]
  },
  plugins: [react()],
})
