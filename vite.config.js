import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      // Your live Netlify/GoDaddy domain goes here
      hostname: 'www.archaeotrails.com'
    })
  ],
})
