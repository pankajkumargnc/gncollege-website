import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Babel transform sirf .jsx files pe — .js skip hoga, faster build
      include: '**/*.{jsx,tsx}',
    }),
  ],
  base: '/gncollege-website/',

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Firebase — sirf jab chahiye
          if (id.includes('firebase')) return 'vendor-firebase'
          // Jodit + DOMPurify — heavy, sirf admin me
          if (id.includes('jodit') || id.includes('dompurify') || id.includes('html-react-parser'))
            return 'vendor-admin'
          // React core
          if (id.includes('react-dom') || id.includes('react-router'))
            return 'vendor-react'
          if (id.includes('react'))
            return 'vendor-react'
          // Pages ko route-level chunks me split karo
          if (id.includes('/pages/AboutPages'))    return 'page-about'
          if (id.includes('/pages/AcademicsPages'))return 'page-academics'
          if (id.includes('/pages/AdmissionPages'))return 'page-admission'
          if (id.includes('/pages/ActivityPages')) return 'page-activity'
          if (id.includes('/pages/NaacPages'))     return 'page-naac'
          if (id.includes('/pages/CampusPages'))   return 'page-campus'
          if (id.includes('/pages/PublicationPages')) return 'page-publication'
          // AdminPanel — sirf /admin route pe load ho
          if (id.includes('/components/AdminPanel')) return 'chunk-admin'
        },
      },
    },

    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,  // 4KB se chhoti files inline
    minify: 'esbuild',
    target: 'es2015',
    sourcemap: false,

    // CSS bhi split ho — har chunk apna CSS load kare
    cssCodeSplit: true,
  },

  server: {
    port: 5173,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
})