// src/components/MiniYouTubePlayer.jsx
import React from 'react';

export default function MiniYouTubePlayer({ videoFile }) {
  // Agar video data nahi hai, toh kuch render mat karo
  if (!videoFile || !videoFile.streamUrl) return null;

  return (
    <div 
      style={{ 
        width: '100%', 
        maxWidth: '800px', 
        margin: '20px auto', 
        backgroundColor: '#000', 
        borderRadius: '10px', 
        overflow: 'hidden', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
      }}
    >
      {/* Custom Video Header */}
      <div 
        style={{ 
          padding: '12px 15px', 
          color: '#fff', 
          backgroundColor: '#1a1a1a', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}
      >
         <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
            🎥 {videoFile.name}
         </h3>
         <span style={{ fontSize: '12px', color: '#aaa' }}>{videoFile.size}</span>
      </div>

      {/* HTML5 Video Player */}
      <video
        controls
        controlsList="nodownload" // User ko direct download button nahi dikhega (Mini-YouTube feel)
        preload="metadata"
        style={{ width: '100%', display: 'block', maxHeight: '450px', backgroundColor: '#000' }}
        src={videoFile.streamUrl}
      >
        Aapka browser HTML5 video support nahi karta.
      </video>
    </div>
  );
}