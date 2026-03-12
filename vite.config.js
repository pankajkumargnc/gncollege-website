// vite.config.js
// ✅ console.log production build mein automatically remove ho jaayenge
// ✅ Source maps disabled in production — security
// ✅ Base URL added for GitHub Pages
// ✅ Smart Dynamic Chunk Splitting added

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // ✅ NAYA ADD KIYA: Aapka existing base URL
  base: '/gncollege-website/', 

  build: {
    // ✅ PURANA BEST FEATURE: Production mein console.log automatically delete
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // console.log, console.info — sab gone
        drop_debugger: true,  // debugger; statements bhi gone
      },
    },

    // ✅ PURANA BEST FEATURE: Source maps production mein band (Security)
    sourcemap: false,

    // ✅ NAYA ADD KIYA: Warning limit ko 500kb se badhakar 1600kb kar diya
    chunkSizeWarningLimit: 1600,

    // ✅ NAYA ADD KIYA: Dynamic manualChunks — Badi files (Jodit, Firebase) ko smartly todne ke liye
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase-vendor';
            if (id.includes('jodit')) return 'jodit-vendor';
            if (id.includes('react')) return 'react-vendor';
            // Baaki UI utilities (dompurify, html-react-parser, toast) isme jayenge
            return 'vendor'; 
          }
        }
      },
    },
  },
});