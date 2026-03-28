// useDriveDocs.js
import { useState, useEffect } from "react";

const API_KEY   = import.meta.env.VITE_GOOGLE_API_KEY;
const BASE_URL  = "https://www.googleapis.com/drive/v3/files";

// Fetch all PDFs from a specific Drive folder
export function useDriveDocs(folderId) {
  const [docs,    setDocs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!folderId) return;

    async function fetchFiles() {
      setLoading(true);
      setError(null);
      try {
        const query = encodeURIComponent(
          `'${folderId}' in parents and mimeType='application/pdf' and trashed=false`
        );
        const url = `${BASE_URL}?q=${query}&key=${API_KEY}&fields=files(id,name,createdTime,modifiedTime,size)&orderBy=createdTime desc`;

        const res  = await fetch(url);
        if (!res.ok) throw new Error(`Drive API error: ${res.status}`);
        const data = await res.json();

        // Convert to usable format with preview/download URLs
        const files = data.files.map((f) => ({
          id:           f.id,
          name:         f.name.replace(".pdf", ""),
          size:         formatSize(f.size),
          date:         new Date(f.modifiedTime).toLocaleDateString("en-IN"),
          previewUrl:   `https://drive.google.com/file/d/${f.id}/preview`,
          downloadUrl:  `https://drive.google.com/uc?export=download&id=${f.id}`,
          viewUrl:      `https://drive.google.com/file/d/${f.id}/view`,
        }));

        setDocs(files);
      } catch (err) {
        console.error("[useDriveDocs]", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, [folderId]);

  return { docs, loading, error };
}

function formatSize(bytes) {
  if (!bytes) return "—";
  const kb = bytes / 1024;
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`;
}