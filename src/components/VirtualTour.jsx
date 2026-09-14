// src/components/VirtualTour.jsx — Interactive 360° Virtual Campus Tour
import React, { useEffect, useRef, useState } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import { Compass, Eye, Maximize2, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { COLORS } from '../styles/colors';

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

const TOUR_LOCATIONS = [
  {
    id: 'main-gate',
    title: 'Main Entrance & Campus Gate',
    description: 'Guru Nanak College main entrance welcoming students, faculty and visitors to the historic campus.',
    image: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
    category: 'Entrance'
  },
  {
    id: 'admin-block',
    title: 'Central Administrative Building & Courtyard',
    description: 'The administrative heart of GNC housing the Principal chamber, academic offices and admissions.',
    image: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere-small.jpg',
    category: 'Administration'
  },
  {
    id: 'library',
    title: 'Central College Library & Reading Hall',
    description: 'Extensive academic library with over 45,000 reference books, journals and digital e-learning zone.',
    image: 'https://photo-sphere-viewer-data.netlify.app/assets/test-sphere.jpg',
    category: 'Academic'
  },
  {
    id: 'auditorium',
    title: 'Guru Gobind Singh Auditorium',
    description: 'Grand multipurpose auditorium hosting cultural festivals, seminars, convocations and youth fests.',
    image: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere-cropped.jpg',
    category: 'Cultural'
  }
];

export default function VirtualTour() {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [activeLocation, setActiveLocation] = useState(TOUR_LOCATIONS[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    let viewer = null;
    try {
      viewer = new Viewer({
        container: containerRef.current,
        panorama: activeLocation.image,
        caption: `${activeLocation.title} — Guru Nanak College`,
        loadingTxt: 'Loading 360° Panorama...',
        touchmoveTwoFingers: false,
        mousewheelCtrlKey: false,
        defaultZoomLvl: 50,
        navbar: [
          'zoom',
          'move',
          'caption',
          'fullscreen',
        ],
      });

      viewerRef.current = viewer;

      viewer.addEventListener('ready', () => {
        setLoading(false);
      });
    } catch (e) {
      console.warn('[VirtualTour] 360 viewer initialization note:', e);
      setLoading(false);
    }

    return () => {
      try {
        if (viewer) viewer.destroy();
      } catch (e) {
        console.warn('Error destroying 360 viewer:', e);
      }
    };
  }, [activeLocation]);

  const switchLocation = (loc) => {
    if (loc.id === activeLocation.id) return;
    setLoading(true);
    setActiveLocation(loc);
  };

  return (
    <div style={{ width: '100%', fontFamily: "'DM Sans', 'Plus Jakarta Sans', sans-serif" }}>
      {/* Tour Header */}
      <div style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #173266 100%)`,
        color: '#ffffff',
        padding: '32px 24px',
        borderRadius: '20px 20px 0 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        boxShadow: '0 10px 30px rgba(15,35,71,0.15)'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(244,160,35,0.2)',
            color: GOLD,
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '1px',
            marginBottom: 8
          }}>
            <Compass size={14} /> 360° INTERACTIVE IMMERSIVE VIEW
          </div>
          <h1 style={{ margin: '0 0 6px', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 900 }}>
            {activeLocation.title}
          </h1>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: 13.5, maxWidth: 650 }}>
            {activeLocation.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '8px 14px',
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Eye size={15} color={GOLD} /> Drag to Pan 360°
          </span>
        </div>
      </div>

      {/* 360 Sphere Viewport */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(380px, 60vh, 560px)',
        background: '#0a1424',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
      }}>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

        {loading && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10, 20, 36, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            color: '#fff'
          }}>
            <div style={{
              width: 44,
              height: 44,
              border: `3px solid rgba(244,160,35,0.3)`,
              borderTopColor: GOLD,
              borderRadius: '50%',
              animation: 'spin 1s infinite linear',
              marginBottom: 14
            }} />
            <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: 0.5 }}>Loading 360° Panorama...</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>High definition spherical environment</div>
          </div>
        )}
      </div>

      {/* Location Hotspot Navigator */}
      <div style={{
        background: '#ffffff',
        padding: '20px',
        borderRadius: '0 0 20px 20px',
        border: '1px solid #e2e8f0',
        borderTop: 'none',
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          flexWrap: 'wrap',
          gap: 8
        }}>
          <div style={{ fontWeight: 800, color: NAVY, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            📍 Select Campus Tour Hotspot
          </div>
          <div style={{ fontSize: 12, color: '#64748b' }}>
            {TOUR_LOCATIONS.length} Interactive Locations Available
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12
        }}>
          {TOUR_LOCATIONS.map((loc) => {
            const isActive = loc.id === activeLocation.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => switchLocation(loc)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 14,
                  border: `2px solid ${isActive ? GOLD : '#f1f5f9'}`,
                  background: isActive ? `${NAVY}` : '#f8fafc',
                  color: isActive ? '#ffffff' : NAVY,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? `0 8px 20px ${NAVY}30` : 'none'
                }}
              >
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: isActive ? 'rgba(255,255,255,0.15)' : '#ffffff',
                  border: `1px solid ${isActive ? 'transparent' : '#e2e8f0'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  flexShrink: 0
                }}>
                  {isActive ? '🌐' : '📍'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 800,
                    fontSize: 13,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {loc.title}
                  </div>
                  <div style={{
                    fontSize: 11,
                    color: isActive ? 'rgba(255,255,255,0.7)' : '#64748b',
                    fontWeight: 600,
                    marginTop: 2
                  }}>
                    {loc.category}
                  </div>
                </div>
                <ChevronRight size={16} color={isActive ? GOLD : '#94a3b8'} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
