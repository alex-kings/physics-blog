// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir:"docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        post1: resolve(__dirname, 'posts/infinite-square-well-1d/index.html'),
        post2: resolve(__dirname, 'posts/time-dependance-well-1d/index.html'),
      },
    },
  },
})