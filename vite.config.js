// vite.config.js
// ✅ console.log production build mein automatically remove ho jaayenge
// ✅ Source maps disabled in production — security
// ✅ Base URL added for GitHub Pages
// ✅ Smart Dynamic Chunk Splitting added
// ✅ FIXED: dev server port + strictPort added

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // ✅ GitHub Pages base URL
  base: '/gncollege-website/',

  // ✅ Dev server config
  server: {
  port: 5173,
  hmr: {
    protocol: 'ws',
    host: 'localhost',
    port: 5173,
  },
  watch: {
    usePolling: false,
  },
},

  build: {
    // ✅ Production mein console.log automatically delete
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    // ✅ Source maps production mein band (Security)
    sourcemap: false,

    chunkSizeWarningLimit: 1600,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase-vendor';
            if (id.includes('jodit'))    return 'jodit-vendor';
            if (id.includes('react'))   return 'react-vendor';
            return 'vendor';
          }
        }
      },
    },
  },
});
