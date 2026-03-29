// src/hooks/useDriveDocs.js
// ✅ Upgraded: Google Drive folder se files fetch karne ka Enterprise hook
// 🚀 New Features: Video streaming support & Deep Full-Text Search inside PDFs
// Usage: const { docs, loading, error } = useDriveDocs(folderId, 'pdf', 'search_keyword')

import { useState, useEffect } from 'react';

const BASE_URL = 'https://www.googleapis.com/drive/v3/files';

export function useDriveDocs(folderId, fileType = 'any', searchQuery = '') {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // folderId nahi hai toh return karo
    if (!folderId) {
      setDocs([]);
      setLoading(false);
      setError(null);
      return;
    }

    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!API_KEY) {
      setError('VITE_GOOGLE_API_KEY missing in .env file');
      return;
    }

    let cancelled = false;

    async function fetchFiles() {
      setLoading(true);
      setError(null);

      try {
        // 1. MIME type filter (Ab Video bhi support karega)
        let mimeFilter = '';
        if (fileType === 'pdf')   mimeFilter = " and mimeType='application/pdf'";
        if (fileType === 'image') mimeFilter = " and mimeType contains 'image/'";
        if (fileType === 'video') mimeFilter = " and mimeType contains 'video/'"; // 🎥 NAYA FEATURE

        // 2. Deep Search Filter (Drive ke andar documents me text dhundne ke liye)
        let searchFilter = '';
        if (searchQuery.trim() !== '') {
            // fullText query Drive ko PDFs aur Docs ke andar padhne bolti hai
            const safeQuery = searchQuery.replace(/'/g, "\\'");
            searchFilter = ` and fullText contains '${safeQuery}'`;
        }

        const q = encodeURIComponent(`'${folderId}' in parents${mimeFilter}${searchFilter} and trashed=false`);
        
        // 3. API URL (webContentLink add kiya gaya hai direct download/stream ke liye)
        const url = `${BASE_URL}?q=${q}&key=${API_KEY}&fields=files(id,name,mimeType,createdTime,size,webContentLink)&orderBy=createdTime desc&pageSize=100`;

        const res = await fetch(url);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `Drive API error: ${res.status}`);
        }

        const data = await res.json();
        if (cancelled) return;

        const files = (data.files || []).map(f => ({
          id:         f.id,
          name:       f.name.replace(/\.pdf$/i, '').trim(),
          mimeType:   f.mimeType,
          size:       formatSize(f.size),
          date:       new Date(f.createdTime).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      }),
          previewUrl: `https://drive.google.com/file/d/${f.id}/preview`,
          viewUrl:    `https://drive.google.com/file/d/${f.id}/view`,
          
          // 🎥 NAYA: Custom HTML5 Video Player ke liye direct API streaming link
          streamUrl:  `https://www.googleapis.com/drive/v3/files/${f.id}?alt=media&key=${API_KEY}`,
          downloadUrl: f.webContentLink
        }));

        setDocs(files);
      } catch (err) {
        if (!cancelled) {
          console.error('[useDriveDocs]', err);
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFiles();

    // Cleanup 
    return () => { cancelled = true; };
  }, [folderId, fileType, searchQuery]); // searchQuery change hone pe naya data aayega

  return { docs, loading, error };
}

function formatSize(bytes) {
  if (!bytes) return '—';
  const kb = parseInt(bytes) / 1024;
  if (kb > 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${Math.round(kb)} KB`;
}