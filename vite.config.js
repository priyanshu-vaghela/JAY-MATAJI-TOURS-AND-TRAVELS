import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { reticle } from '@reticlehq/vite-plugin';
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/build/' : '/',
  plugins: [reticle({ port: 4400 }), react()],
  build: {
    outDir: 'build',
    assetsDir: 'static',
  },
  server: {
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: process.env.VITE_API_TARGET || 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
}));
