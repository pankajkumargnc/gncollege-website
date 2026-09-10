// src/utils/resolver.js — Universal Image & Media Resolver
// ⚙️ @Backend_Agent & @Media_Agent — High-reliability image resolver for Google Drive, CDN, and local assets

const BASE = import.meta.env.BASE_URL || '/';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';

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
 * Prioritizes authenticated Google Drive API streaming (alt=media&key=...)
 * which never triggers HTTP 429 rate limits or referrer blocks.
 */
export function driveToDirectUrl(input) {
  if (!input) return '';
  
  if (typeof input === 'string') {
    // If it's already an active Google API streaming endpoint, return as-is
    if (input.includes('googleapis.com/drive/v3/files') && input.includes('alt=media')) {
      return input;
    }
  }

  const fileId = extractDriveFileId(input);
  if (fileId) {
    if (API_KEY) {
      return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
    }
    return `https://lh3.googleusercontent.com/d/${fileId}=w1200`;
  }

  return typeof input === 'string' ? input : (input?.image || input?.src || input?.link || input?.url || '');
}

/**
 * Generates an efficient thumbnail URL for Google Drive items
 */
export function driveToThumbnailUrl(input, size = 220) {
  const fileId = extractDriveFileId(input);
  if (fileId) {
    if (API_KEY) {
      return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
    }
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
    if (driveId && API_KEY) {
      return `https://www.googleapis.com/drive/v3/files/${driveId}?alt=media&key=${API_KEY}`;
    }
    target = input.image || input.src || input.url || input.link || driveId || '';
  }

  if (typeof target !== 'string') return '';
  const trimmed = target.trim();
  if (!trimmed) return '';

  // Data URIs pass through
  if (trimmed.startsWith('data:')) return trimmed;

  // Check if it represents a Google Drive file
  const driveId = extractDriveFileId(trimmed);
  if (driveId) {
    return driveToDirectUrl(driveId);
  }

  // Absolute external URLs
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // Relative path cleanup: remove leading "public/" and "/"
  let cleaned = trimmed.replace(/^public\//, '').replace(/^\//, '');

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
