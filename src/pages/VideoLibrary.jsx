// Example: src/pages/VideoLibrary.jsx
import React from 'react';
// 1. Apne upgraded hook ko import karein
import { useDriveDocs } from '../hooks/useDriveDocs';
// 2. Naye Video Player ko import karein
import MiniYouTubePlayer from '../components/MiniYouTubePlayer';

export default function VideoLibrary() {
  // Aap .env se folder id le sakte hain, ya direct pass kar sakte hain
  const folderId = import.meta.env.VITE_DRIVE_DOCUMENT_FOLDER; 
  
  // 🚀 JADU YAHAN HAI: fileType me 'video' pass kiya
  const { docs, loading, error } = useDriveDocs(folderId, 'video'); 

  if (loading) return <div style={{ padding: '20px' }}>Loading Enterprise Video System...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>College Event Videos</h2>
      <p style={{ color: 'gray' }}>Streaming ad-free directly from Drive Storage</p>

      {docs.length === 0 ? (
        <p>Is folder mein koi video nahi mili.</p>
      ) : null}

      {/* Har ek video file ke liye MiniYouTubePlayer render karo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {docs.map((file) => (
          <MiniYouTubePlayer key={file.id} videoFile={file} />
        ))}
      </div>
    </div>
  );
}