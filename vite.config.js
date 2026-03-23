import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gncollege-website/',

  build: {
    // ── Code splitting — vendor bundles alag ──
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — har page pe chahiye
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Firebase — sirf jab data chahiye
          'vendor-firebase': [
            'firebase/app',
            'firebase/firestore',
            'firebase/auth',
            'firebase/messaging',
          ],
          // Heavy UI libs — sirf admin page pe
          'vendor-admin': ['jodit-react', 'dompurify', 'html-react-parser'],
        },
      },
    },

    // ── Asset optimization ──
    chunkSizeWarningLimit: 1200,
    assetsInlineLimit: 4096, // 4KB se chhoti files inline ho jaayengi

    // ── Minification ──
    minify: 'esbuild',
    target: 'es2015',

    // ── Source maps sirf development mein ──
    sourcemap: false,
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