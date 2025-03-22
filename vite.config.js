import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Portfolio-Website/', // Correct base path for GitHub Pages
  build: {
    outDir: 'dist', // Use 'dist' as the default output directory
  },
});