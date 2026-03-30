// src/utils/resolver.js — Universal Image Resolver
// ⚙️ @Backend_Agent — Resolves image URLs from multiple sources

const BASE = import.meta.env.BASE_URL || '/gncollege-website/';

/**
 * Convert Google Drive share links to direct lh3.googleusercontent URLs
 * Examples:
 *   drive.google.com/file/d/FILE_ID/view → lh3.googleusercontent.com/d/FILE_ID
 *   drive.google.com/open?id=FILE_ID     → lh3.googleusercontent.com/d/FILE_ID
 */
function driveToLh3(url) {
  if (!url || typeof url !== 'string') return url;
  
  // Pattern 1: /file/d/FILE_ID/...
  const match1 = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/);
  if (match1) return `https://lh3.googleusercontent.com/d/${match1[1]}`;
  
  // Pattern 2: /open?id=FILE_ID
  const match2 = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (match2) return `https://lh3.googleusercontent.com/d/${match2[1]}`;
  
  // Pattern 3: /uc?id=FILE_ID
  const match3 = url.match(/drive\.google\.com\/uc\?.*id=([^&]+)/);
  if (match3) return `https://lh3.googleusercontent.com/d/${match3[1]}`;
  
  return url;
}

/**
 * Universal URL resolver for images and assets
 * Handles:
 *   - Google Drive links → lh3 direct
 *   - Relative paths (images/...) → prepend BASE_URL
 *   - public/ prefix → strip it (Vite serves from public root)
 *   - Absolute URLs → pass through
 *   - ImgBB / external CDN → pass through
 */
export function resolveUrl(url) {
  if (!url || typeof url !== 'string') return '';
  
  const trimmed = url.trim();
  
  // Already a full URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return driveToLh3(trimmed);
  }
  
  // data: URI — pass through
  if (trimmed.startsWith('data:')) return trimmed;
  
  // Strip leading "public/" — Vite serves public/ as root
  let cleaned = trimmed.replace(/^public\//, '');
  
  // Strip leading "/" if present, we'll add BASE
  cleaned = cleaned.replace(/^\//, '');
  
  // Prepend BASE_URL
  return `${BASE}${cleaned}`;
}

/**
 * Resolve with fallback — returns fallback image if URL is empty/broken
 */
export function resolveWithFallback(url, fallback) {
  const resolved = resolveUrl(url);
  if (!resolved) return resolveUrl(fallback || 'images/college_photo.webp');
  return resolved;
}

export default resolveUrl;
