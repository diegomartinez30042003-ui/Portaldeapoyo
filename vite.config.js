import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  // Base relativa: el portal funciona igual abierto sin conexión (file://)
  // y publicado en GitHub Pages bajo un subdirectorio (/Portaldeapoyo/).
  base: './',
  plugins: [react(), viteSingleFile()],
})
