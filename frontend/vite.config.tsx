import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure Vite starts in the current folder
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});