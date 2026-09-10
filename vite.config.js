import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
const modulePreloadPlugin = {
  name: "inject-modulepreload",
  transformIndexHtml(html, ctx) {
    if (!ctx?.bundle) return html;
    const reactVendorChunk = Object.keys(ctx.bundle).find(
      (k) => k.includes("vendor-react") && k.endsWith(".js")
    );
    if (!reactVendorChunk) return html;
    const preloadTag = `  <link rel="modulepreload" href="/${reactVendorChunk}" crossorigin>\n`;
    return html.replace("</head>", preloadTag + "</head>");
  },
};

import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  base: "/",
  resolve: {
    dedupe: ["react", "react-dom"],
  },

  plugins: [
    modulePreloadPlugin,
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
            src: "images/logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "images/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "images/logo_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/logo_512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,webp,woff2}"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api/],
        offlineGoogleAnalytics: false,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "firestore-cache",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 50, maxAgeSeconds: 3600 },
            },
          },
          {
            urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "firebase-storage",
              expiration: { maxEntries: 50, maxAgeSeconds: 2592000 },
            },
          },
        ],
      },
    }),
    (viteImagemin.default || viteImagemin)({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 78 },
      pngquant: { quality: [0.7, 0.9], speed: 4 },
      svgo: {
        plugins: [{ name: "removeViewBox" }, { name: "removeEmptyAttrs", active: false }],
      },
      webp: { quality: 78 },
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