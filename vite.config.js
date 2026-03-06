import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 🌟 YAHAN APNE GITHUB REPO KA NAAM DAALEIN, AAGE-PICHE SLASH (/) KE SATH
  base: '/gncollege-website/', 
})