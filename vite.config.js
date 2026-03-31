import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GNC College — Optimized Vite Config v7
// ✅ v7: Added pdfjs-dist worker support (fixes "fake worker" crash)
export default defineConfig({
  base: "/gncollege-website/",
  plugins: [react()],

  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — rarely changes, long-term cached
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Firebase
          "firebase-app"  : ["firebase/app"],
          "firebase-auth" : ["firebase/auth"],
          "firebase-db"   : ["firebase/firestore"],
          "firebase-store": ["firebase/storage"],
          // Editor (lazy — only admin needs it)
          "jodit": ["jodit-react"],
        },
        // Asset naming for long-term caching
        assetFileNames : "assets/[name]-[hash][extname]",
        chunkFileNames : "assets/[name]-[hash].js",
        entryFileNames : "assets/[name]-[hash].js",
      },
    },
  },

  // ✅ CRITICAL: Tell Vite how to handle Web Worker files
  worker: {
    format: "es",
  },

  // Dev server
  server: {
    port: 3000,
    open: false,
  },

  // CSS
  css: {
    devSourcemap: false,
  },

  // ✅ CRITICAL: Include pdfjs worker so ?url import resolves correctly
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "pdfjs-dist/build/pdf.worker.min.mjs",
    ],
    exclude: ["jodit-react"],
  },
});