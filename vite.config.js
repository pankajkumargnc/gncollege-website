import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// GNC College — Optimized Vite Config v8 (PWA Enabled)
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Guru Nanak College Dhanbad",
        short_name: "GNC Dhanbad",
        description: "Official website of Guru Nanak College, Dhanbad",
        theme_color: "#0f2347",
        background_color: "#0f2347",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "images/logo.webp",
            sizes: "192x192",
            type: "image/webp",
          },
          {
            src: "images/logo.webp",
            sizes: "512x512",
            type: "image/webp",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "firebase-storage",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
        ],
      },
    }),
  ],

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
          "pdf-viewer": ["react-pdf", "pdfjs-dist"],
          "charts": ["recharts"],
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