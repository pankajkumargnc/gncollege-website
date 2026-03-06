# Guru Nanak College - Official Website

A Sikh Minority Degree College, Dhanbad, Jharkhand - Established 1970.

## Tech Stack
- React 18 + Vite 5
- Plain CSS (no extra framework)

## Quick Start

1. Copy .env.example to .env and set your admin password:
   cp .env.example .env

2. Install dependencies:
   npm install

3. Start dev server:
   npm run dev
   Opens at http://localhost:5173

4. Build for production:
   npm run build

## Admin Panel
- Click the gear floating button (bottom-right corner)
- Set password in .env file: VITE_ADMIN_PASS=yourpassword

## Deployment
Upload the dist/ folder to:
- GitHub Pages
- Netlify (drag and drop)
- Any cPanel hosting
