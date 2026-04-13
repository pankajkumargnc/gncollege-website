import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Guru Nanak College, Dhanbad",
        short_name: "GNC Dhanbad",
        description: "Guru Nanak College, Dhanbad Official Website",
        theme_color: "#0f2347",
        background_color: "#0f2347",
        display: "standalone",
        start_url: "./index.html",
        icons: [
          {
            src: "images/logo_192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "images/logo_512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "images/logo.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "apple-touch-icon",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,webp,woff2}"],
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "firestore-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 3600 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    minify: "terser",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("firebase")) return "firebase-db";
            if (id.includes("jodit")) return "jodit-editor";
            if (id.includes("recharts")) return "charts";
            if (id.includes("pdfjs-dist")) return "pdf-viewer";
            // Group all core React + Router together to avoid circularity
            if (id.includes("react") || id.includes("router") || id.includes("@remix-run")) {
              return "react-core";
            }
            return "vendor";
          }
        },
      },
    },
  },
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