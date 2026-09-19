// scripts/generateSitemap.js — Dynamic Sitemap Generator for GNC College
// Extracts all active routes from SEO_MAP and outputs XML sitemaps
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_MAP, BASE_URL } from '../src/utils/seoManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const today = new Date().toISOString().split('T')[0];

function getPriority(route) {
  if (route === '/') return '1.0';
  if (route.startsWith('/admission')) return '0.9';
  if (route.startsWith('/academics') || route.startsWith('/course')) return '0.8';
  if (route === '/contact') return '0.8';
  if (route.startsWith('/about-us')) return '0.7';
  if (route.startsWith('/naac') || route.startsWith('/iqac')) return '0.7';
  if (route.startsWith('/events') || route.startsWith('/news') || route.startsWith('/notifications')) return '0.8';
  return '0.6';
}

function getChangefreq(route) {
  if (route === '/' || route.startsWith('/notifications') || route.startsWith('/news')) return 'daily';
  if (route.startsWith('/events') || route.startsWith('/gallery')) return 'weekly';
  if (route.startsWith('/admission')) return 'weekly';
  return 'monthly';
}

const routes = Object.keys(SEO_MAP);

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (const route of routes) {
  // Emit canonical standard URL without hash fragment (RFC 3986 / Google Search standard)
  const loc = route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}`;
  const priority = getPriority(route);
  const changefreq = getChangefreq(route);

  xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
}

xml += `</urlset>\n`;

// Write to public/sitemap.xml
const publicPath = path.join(ROOT_DIR, 'public', 'sitemap.xml');
fs.writeFileSync(publicPath, xml, 'utf8');
console.log(`[Sitemap] Generated public/sitemap.xml with ${routes.length} routes.`);

// Also write to dist/sitemap.xml if dist exists
const distDir = path.join(ROOT_DIR, 'dist');
if (fs.existsSync(distDir)) {
  const distPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(distPath, xml, 'utf8');
  console.log(`[Sitemap] Generated dist/sitemap.xml with ${routes.length} routes.`);
}
