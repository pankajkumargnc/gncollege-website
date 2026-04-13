import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
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
            purpose: "any maskable",
          },
          {
            src: "images/logo_512.png",
            sizes: "512x512",
            type: "image/png",
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
            if (id.includes("firebase")) return "firebase-core";
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("react")) return "react-vendor";
            return "vendor";
          }
        },
      },
    },
  },
});