// src/hooks/useDriveDocs.js
// ✅ Google Drive folder se files fetch karne ka reusable hook
// Usage: const { docs, loading, error } = useDriveDocs(folderId, 'pdf')

import { useState, useEffect } from 'react';

const BASE_URL = 'https://www.googleapis.com/drive/v3/files';

export function useDriveDocs(folderId, fileType = 'any') {
  const [docs,    setDocs]    = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    // folderId nahi hai toh kuch mat karo
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
        // MIME type filter
        let mimeFilter = '';
        if (fileType === 'pdf')   mimeFilter = " and mimeType='application/pdf'";
        if (fileType === 'image') mimeFilter = " and mimeType contains 'image/'";

        const q   = encodeURIComponent(`'${folderId}' in parents${mimeFilter} and trashed=false`);
        const url = `${BASE_URL}?q=${q}&key=${API_KEY}&fields=files(id,name,mimeType,createdTime,size)&orderBy=createdTime desc&pageSize=100`;

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

    // Cleanup — component unmount pe cancel karo
    return () => { cancelled = true; };
  }, [folderId, fileType]);

  return { docs, loading, error };
}

function formatSize(bytes) {
  if (!bytes) return '—';
  const kb = parseInt(bytes) / 1024;
  if (kb > 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${Math.round(kb)} KB`;
}