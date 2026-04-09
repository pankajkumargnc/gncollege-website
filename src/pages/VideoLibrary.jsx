// Example: src/pages/VideoLibrary.jsx
import React from 'react';
// Import the upgraded hook
import { useDriveDocs } from '../hooks/useDriveDocs';
// Import the new Video Player
import MiniYouTubePlayer from '../components/MiniYouTubePlayer';

export default function VideoLibrary() {
  // You can get the folder ID from .env or pass it directly
  const folderId = import.meta.env.VITE_DRIVE_DOCUMENT_FOLDER; 
  
  // Passed 'video' as the fileType
  const { docs, loading, error } = useDriveDocs(folderId, 'video'); 

  if (loading) return <div style={{ padding: '20px' }}>Loading Enterprise Video System...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>College Event Videos</h2>
      <p style={{ color: 'gray' }}>Streaming ad-free directly from Drive Storage</p>

      {docs.length === 0 ? (
        <p>No videos found in this folder.</p>
      ) : null}

      {/* Render MiniYouTubePlayer for each video file */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {docs.map((file) => (
          <MiniYouTubePlayer key={file.id} videoFile={file} />
        ))}
      </div>
    </div>
  );
}