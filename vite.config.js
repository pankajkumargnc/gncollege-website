// vite.config.js
// ✅ console.log production build mein automatically remove ho jaayenge
// ✅ Bundle chunks split — faster loading
// ✅ Source maps disabled in production — security

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  build: {
    // ✅ FIX 1: Production mein console.log + console.warn automatically delete
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // console.log, console.info — sab gone
        drop_debugger: true,  // debugger; statements bhi gone
      },
    },

    // ✅ FIX 2: Manual chunks — vendor libraries alag file mein
    // Fayda: Browser cache karta hai — repeat visitors ko faster load
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — rarely changes, aggressively cached
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // Firebase — bada hai, alag chunk better
          'vendor-firebase': [
            'firebase/app',
            'firebase/firestore',
            'firebase/storage',
            'firebase/auth',
          ],

          // UI utilities
          'vendor-ui': ['dompurify', 'html-react-parser', 'react-hot-toast'],
        },
      },
    },

    // ✅ FIX 3: Source maps production mein band
    // Source maps se attackers aapka original code dekh sakte hain
    sourcemap: false,

    // Chunk size warning — 500KB se bada hua toh warning aayega
    chunkSizeWarningLimit: 500,
  },

  // Development mein sab normal rahega — console.log kaam karega
  // Sirf `npm run build` pe ye rules apply honge
});