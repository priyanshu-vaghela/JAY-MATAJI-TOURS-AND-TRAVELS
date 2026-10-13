import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reticle } from '@reticlehq/vite-plugin';

export default defineConfig(({ command, mode }) => ({
  base: command === 'build' ? '/build/' : '/',

  plugins: [reticle({ port: 4400 }), react()],

  define: {
    // Make environment available in JS at build time
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },

  build: {
    outDir: 'build',
    assetsDir: 'static',
    // Warn when any single chunk > 400KB
    chunkSizeWarningLimit: 400,
    // Produce source maps only in staging (not in production to avoid leaking code)
    sourcemap: mode === 'staging',
    rollupOptions: {
      output: {
        // Split vendor libraries into a separate chunk for better browser caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },

  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_TARGET || 'http://127.0.0.1:8000',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', () => {
            // Silently ignore backend proxy errors in dev — the frontend
            // falls back to built-in curated destination data automatically.
          });
        },
      },
    },
  },
}));
