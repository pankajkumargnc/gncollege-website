import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  resolve: {
    dedupe: ["react", "react-dom"],
  },

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
            if (id.includes("firebase")) return "vendor-firebase";
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) return "vendor-react";
            if (id.includes("jodit")) return "vendor-jodit";
            if (id.includes("recharts") || id.includes("d3")) return "vendor-charts";
            if (id.includes("pdfjs-dist") || id.includes("react-pdf")) return "vendor-pdf";
          }
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["jodit-react"],
  },
});