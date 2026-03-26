import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GNC College — Optimized Vite Config v6
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

  // Dev server
  server: {
    port: 3000,
    open: false,
  },

  // CSS
  css: {
    devSourcemap: false,
  },

  // Optimize deps
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    exclude: ["jodit-react"],
  },
});
