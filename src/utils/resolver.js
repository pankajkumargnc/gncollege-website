// src/utils/resolver.js — Universal Image & Media Resolver
// ⚙️ @Backend_Agent & @Media_Agent — High-reliability image resolver for Google Drive, CDN, and local assets

const BASE = import.meta.env?.BASE_URL || '/';
const API_KEY = import.meta.env?.VITE_GOOGLE_API_KEY || '';

/**
 * Extract Google Drive file ID from diverse formats:
 * - drive.google.com/file/d/FILE_ID/...
 * - drive.google.com/open?id=FILE_ID
 * - drive.google.com/uc?id=FILE_ID
 * - googleusercontent.com/d/FILE_ID
 * - googleusercontent.com/drive-storage/... (if file ID is present elsewhere)
 * - Raw Google Drive IDs (e.g. 1C8oCcvkMIoKxbYVXRD7F7PfEFMXGeMMo)
 */
export function extractDriveFileId(input) {
  if (!input) return null;
  
  if (typeof input === 'object') {
    if (input.driveId) return input.driveId;
    if (input.id && typeof input.id === 'string' && /^[a-zA-Z0-9_-]{25,}$/.test(input.id)) {
      return input.id;
    }
    const val = input.image || input.src || input.link || input.url;
    return extractDriveFileId(val);
  }

  if (typeof input !== 'string') return null;
  const str = input.trim();

  // Raw Google Drive file ID (usually 28-33 chars, alphanumeric with - and _)
  if (/^[a-zA-Z0-9_-]{25,}$/.test(str)) {
    return str;
  }

  // /file/d/ID
  const m1 = str.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (m1) return m1[1];

  // /files/ID (e.g. googleapis.com/drive/v3/files/ID)
  const mFiles = str.match(/\/files\/([a-zA-Z0-9_-]+)/);
  if (mFiles) return mFiles[1];

  // ?id=ID or &id=ID
  const m2 = str.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m2) return m2[1];

  // /d/ID (e.g., googleusercontent.com/d/ID)
  const m3 = str.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (m3) return m3[1];

  return null;
}

/**
 * Convert Google Drive links or IDs into reliable, direct streaming image URLs
 * Uses Google's high-speed public CDN (lh3.googleusercontent.com/d/ID)
 * which never triggers 403 API authentication errors or Referrer blocks.
 */
export function driveToDirectUrl(input) {
  if (!input) return '';
  
  const fileId = extractDriveFileId(input);
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}=w1200`;
  }

  return typeof input === 'string' ? input : (input?.image || input?.src || input?.link || input?.url || '');
}

/**
 * Generates an efficient thumbnail URL for Google Drive items
 */
export function driveToThumbnailUrl(input, size = 300) {
  const fileId = extractDriveFileId(input);
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}=w${size}`;
  }
  return resolveUrl(input);
}

/**
 * Universal URL resolver for images and assets
 * Handles:
 *   - Object inputs ({ image, src, link, url, driveId, id })
 *   - Google Drive links & raw IDs → Direct high-speed API stream
 *   - Relative paths (images/...) → Prepend BASE_URL
 *   - public/ prefix → Strip it (Vite serves from public root)
 *   - Absolute URLs (HTTPS/HTTP) & CDNs → Pass through or convert if Drive
 *   - data: URIs → Pass through
 */
export function resolveUrl(input) {
  if (!input) return '';

  let target = input;

  // Handle object inputs (e.g., Firestore gallery or event docs)
  if (typeof input === 'object') {
    const driveId = extractDriveFileId(input);
    if (driveId) {
      return driveToDirectUrl(driveId);
    }
    target = input.image || input.src || input.url || input.link || driveId || '';
  }

  if (typeof target !== 'string') return '';
  const trimmed = target.trim();
  if (!trimmed) return '';

  // Normalize backslashes (Windows paths)
  const normalized = trimmed.replace(/\\/g, '/');

  // Check if URL points to a known local asset file
  const KNOWN_LOCAL_ASSETS = [
    'green1.webp', 'green2.webp', 'green3.webp', 'green4.webp', 'green5.webp', 'green6.webp', 'green7.webp', 'greencampus.webp',
    'pf1.webp', 'pf2.webp', 'pf3.webp', 'pf4.webp', 'pf5.webp', 'pf6.webp', 'pf7.webp', 'pf8.webp', 'pf9.webp', 'pf10.webp',
    'pic1.webp', 'pic1.png', 'college_photo.webp', 'organogram.webp', 'organogram.jpg',
    'slider_baisakhi.webp', 'slider_cricket.webp', 'slider_ncc.webp', 'slider_seminar.webp', 'slider_youth_winners.webp',
    'logo.webp', 'logo.png', 'logo1.webp', 'logo1.png'
  ];

  for (const asset of KNOWN_LOCAL_ASSETS) {
    const baseName = asset.split('.')[0];
    const regex = new RegExp(`[/\\\\]${baseName}\\.(webp|jpg|jpeg|png)($|\\?)`, 'i');
    if (regex.test(normalized)) {
      return `${BASE}images/${asset}`;
    }
  }

  // Data URIs pass through
  if (normalized.startsWith('data:')) return normalized;

  // Check if it represents a Google Drive file
  const driveId = extractDriveFileId(normalized);
  if (driveId) {
    return driveToDirectUrl(driveId);
  }

  // Absolute external URLs
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    return normalized;
  }

  // Relative path cleanup: remove leading "public/" and "/"
  let cleaned = normalized.replace(/^public\//, '').replace(/^\//, '');

  return `${BASE}${cleaned}`;
}

/**
 * Resolve with fallback image if URL is missing or empty
 */
export function resolveWithFallback(input, fallback = 'images/college_photo.webp') {
  const resolved = resolveUrl(input);
  if (!resolved) return resolveUrl(fallback);
  return resolved;
}

export default resolveUrl;
