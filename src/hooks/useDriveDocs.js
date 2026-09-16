// src/hooks/useDriveDocs.js
// ⚡ Enterprise Google Drive Hook with Offline Cache, Quota Shield & Video Streaming
// Usage: const { docs, loading, error, isCached, refetch } = useDriveDocs(folderId, 'pdf', 'search_keyword')

import { useState, useEffect, useCallback, useRef } from 'react';

const BASE_URL = 'https://www.googleapis.com/drive/v3/files';
const CACHE_TTL = 60 * 60 * 1000; // 1 Hour
const QUOTA_COOLDOWN = 15 * 60 * 1000; // 15 Minutes cooldown if 403 / 429 quota hit
const memoryCache = new Map();

// Helper to check quota shield cooldown
function isQuotaExhausted() {
  try {
    const cooldownUntil = sessionStorage.getItem('gnc_drive_quota_cooldown');
    if (cooldownUntil && Date.now() < Number(cooldownUntil)) {
      return true;
    }
  } catch (_) {}
  return false;
}

function setQuotaExhausted() {
  try {
    sessionStorage.setItem('gnc_drive_quota_cooldown', String(Date.now() + QUOTA_COOLDOWN));
  } catch (_) {}
}

export function useDriveDocs(folderId, fileType = 'any', searchQuery = '') {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCached, setIsCached] = useState(false);
  const fetchCountRef = useRef(0);

  const fetchFiles = useCallback(async (bypassCache = false) => {
    if (!folderId) {
      setDocs([]);
      setLoading(false);
      setError(null);
      return;
    }

    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!API_KEY) {
      setError('VITE_GOOGLE_API_KEY missing in .env configuration');
      return;
    }

    const cacheKey = `gnc_drive_cache_${folderId}_${fileType}_${searchQuery.trim().toLowerCase()}`;

    // 1. Fast Memory Cache check
    if (!bypassCache && memoryCache.has(cacheKey)) {
      const mem = memoryCache.get(cacheKey);
      if (Date.now() - mem.timestamp < CACHE_TTL) {
        setDocs(mem.data);
        setIsCached(true);
        setLoading(false);
        return;
      }
    }

    // 2. LocalStorage Cache check (stale-while-revalidate)
    let cachedData = null;
    let cacheTimestamp = 0;
    try {
      const stored = localStorage.getItem(cacheKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.data) && parsed.data.length > 0) {
          cachedData = parsed.data;
          cacheTimestamp = parsed.timestamp || 0;
          setDocs(cachedData);
          setIsCached(true);
          memoryCache.set(cacheKey, { timestamp: cacheTimestamp, data: cachedData });
        }
      }
    } catch (_) {}

    // 3. Quota Shield Check: If quota is currently hit, serve cache without hammering Google API
    if (isQuotaExhausted() && cachedData) {
      setLoading(false);
      return;
    }

    // If cache is fresh (< 30 mins) and not forced, skip network call
    if (!bypassCache && cachedData && (Date.now() - cacheTimestamp < CACHE_TTL / 2) && !searchQuery.trim()) {
      setLoading(false);
      return;
    }

    // 4. Network Fetch with Quota Protection
    setLoading(true);
    setError(null);
    const thisRequestId = ++fetchCountRef.current;

    try {
      let mimeFilter = '';
      if (fileType === 'pdf')   mimeFilter = " and mimeType='application/pdf'";
      if (fileType === 'image') mimeFilter = " and mimeType contains 'image/'";
      if (fileType === 'video') mimeFilter = " and mimeType contains 'video/'";

      let searchFilter = '';
      if (searchQuery.trim() !== '') {
        const safeQuery = searchQuery.replace(/'/g, "\\'");
        searchFilter = ` and fullText contains '${safeQuery}'`;
      }

      const q = encodeURIComponent(`'${folderId}' in parents${mimeFilter}${searchFilter} and trashed=false`);
      const url = `${BASE_URL}?q=${q}&key=${API_KEY}&fields=files(id,name,mimeType,createdTime,size,webContentLink,thumbnailLink,hasThumbnail)&orderBy=createdTime desc&pageSize=100`;

      const res = await fetch(url);

      if (!res.ok) {
        if (res.status === 403 || res.status === 429) {
          console.warn('[useDriveDocs] Quota shield activated for 15 minutes due to HTTP', res.status);
          setQuotaExhausted();
          if (cachedData) {
            setDocs(cachedData);
            setLoading(false);
            return;
          }
        }
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Drive API error: ${res.status}`);
      }

      const data = await res.json();
      if (thisRequestId !== fetchCountRef.current) return;

      const files = (data.files || []).map(f => {
        const isImg = f.mimeType?.startsWith('image/');
        const directImgUrl = API_KEY 
          ? `https://www.googleapis.com/drive/v3/files/${f.id}?alt=media&key=${API_KEY}`
          : `https://lh3.googleusercontent.com/d/${f.id}=w1200`;
        
        const thumbUrl = f.thumbnailLink 
          || (isImg ? (API_KEY ? `https://www.googleapis.com/drive/v3/files/${f.id}?alt=media&key=${API_KEY}` : `https://lh3.googleusercontent.com/d/${f.id}=w220`) : null);

        return {
          id:           f.id,
          name:         f.name.replace(/\.pdf$/i, '').trim(),
          mimeType:     f.mimeType,
          size:         formatSize(f.size),
          date:         new Date(f.createdTime).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        }),
          rawDate:      f.createdTime,
          previewUrl:   isImg ? directImgUrl : `https://drive.google.com/file/d/${f.id}/preview`,
          viewUrl:      `https://drive.google.com/file/d/${f.id}/view`,
          imageUrl:     directImgUrl,
          thumbnailUrl: thumbUrl,
          thumbnailLink: f.thumbnailLink || '',
          streamUrl:    directImgUrl,
          downloadUrl:  f.webContentLink
        };
      });

      // Save fresh data into both memory and localStorage
      memoryCache.set(cacheKey, { timestamp: Date.now(), data: files });
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: files }));
      } catch (_) {}

      setDocs(files);
      setIsCached(false);
    } catch (err) {
      if (thisRequestId === fetchCountRef.current) {
        console.warn('[useDriveDocs] Network fetch error, checking fallback:', err.message);
        if (cachedData) {
          setDocs(cachedData);
          setIsCached(true);
        } else {
          setError(err.message);
        }
      }
    } finally {
      if (thisRequestId === fetchCountRef.current) {
        setLoading(false);
      }
    }
  }, [folderId, fileType, searchQuery]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const refetch = useCallback(() => fetchFiles(true), [fetchFiles]);

  return { docs, loading, error, isCached, refetch };
}

export function clearDriveCache(folderId) {
  try {
    memoryCache.clear();
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('gnc_drive_cache_') && (!folderId || k.includes(folderId))) {
        localStorage.removeItem(k);
      }
    });
  } catch (_) {}
}

function formatSize(bytes) {
  if (!bytes) return '—';
  const kb = parseInt(bytes) / 1024;
  if (kb > 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${Math.round(kb)} KB`;
}