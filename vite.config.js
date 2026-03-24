import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    }),

    // ✅ Image compression — build time pe images automatically compress hongi
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng:  { optimizationLevel: 7 },
      mozjpeg:  { quality: 75 },
      pngquant: { quality: [0.7, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: true },
        ],
      },
      webp: { quality: 75 }, // slider images ke liye sabse zyada fayda
    }),
  ],

  base: '/gncollege-website/',

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Firebase
          if (id.includes('firebase'))                                           return 'vendor-firebase'
          // Jodit + heavy admin libs — sirf /admin pe
          if (id.includes('jodit') || id.includes('dompurify') || id.includes('html-react-parser'))
                                                                                 return 'vendor-admin'
          // React core
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('react'))
                                                                                 return 'vendor-react'
          // Route-level page chunks
          if (id.includes('/pages/AboutPages'))        return 'page-about'
          if (id.includes('/pages/AcademicsPages'))    return 'page-academics'
          if (id.includes('/pages/AdmissionPages'))    return 'page-admission'
          if (id.includes('/pages/ActivityPages'))     return 'page-activity'
          if (id.includes('/pages/NaacPages'))         return 'page-naac'
          if (id.includes('/pages/CampusPages'))       return 'page-campus'
          if (id.includes('/pages/PublicationPages'))  return 'page-publication'
          // Individual heavy pages
          if (id.includes('/pages/GalleryPage'))       return 'page-gallery'
          if (id.includes('/pages/VideoGallery'))      return 'page-gallery'
          if (id.includes('/pages/CollegeProfile'))    return 'page-about'
          if (id.includes('/pages/LeadershipPage'))    return 'page-about'
          // AdminPanel + subcomponents
          if (id.includes('/components/AdminPanel'))         return 'chunk-admin'
          if (id.includes('/components/AdminDepartmentTab')) return 'chunk-admin'
          if (id.includes('/components/AdminCampusTab'))     return 'chunk-admin'
          if (id.includes('/components/AdminLeadershipTab')) return 'chunk-admin'
          if (id.includes('/components/ImageCropper'))       return 'chunk-admin'
          if (id.includes('/components/MediaPicker'))        return 'chunk-admin'
        },

        // Asset file naming — cache busting ke liye
        chunkFileNames:  'assets/[name]-[hash].js',
        entryFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
    },

    chunkSizeWarningLimit: 800,
    assetsInlineLimit:     4096,

    // ✅ esbuild se minify (fast) + console.log production mein hata do
    minify: 'esbuild',
    target: 'es2015',

    sourcemap: false,
    cssCodeSplit: true,
    reportCompressedSize: false, // Build thoda fast hoga
  },

  // ✅ esbuild options — drop console & debugger in production
  esbuild: {
    drop: ['console', 'debugger'],
  },

  // Dev server
  server: {
    port: 5173,
    hmr: {
      protocol: 'ws',
      host:     'localhost',
      port:     5173,
    },
  },

  // Preview server (npm run preview)
  preview: {
    port: 4173,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
})