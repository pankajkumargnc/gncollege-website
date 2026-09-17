// src/components/VirtualTour.jsx — Interactive 360° Virtual Campus Tour with Web Speech Audio Narration
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import { Compass, Eye, MapPin, ChevronRight, Volume2, Square, Languages, Globe } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
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

const NARRATIONS = {
  'main-gate': {
    en: 'Welcome to Guru Nanak College, Dhanbad! Established in 1970 to mark the fifth birth centenary of Sri Guru Nanak Dev Ji, our historic campus provides comprehensive higher education across science, arts, commerce, and vocational fields.',
    hi: 'गुरु नानक कॉलेज, धनबाद में आपका हार्दिक स्वागत है! 1970 में स्थापित, यह सिख अल्पसंख्यक डिग्री कॉलेज झारखंड का एक प्रमुख उच्च शिक्षण संस्थान है।'
  },
  'admin-block': {
    en: 'You are viewing the Central Administrative Block. This houses the Principal chamber, academic council hall, accounts section, and the student facilitation helpdesk.',
    hi: 'यह कॉलेज का मुख्य प्रशासनिक भवन है जहाँ प्राचार्य कक्ष, प्रशासनिक कार्यालय, लेखा विभाग और छात्र सहायता केंद्र स्थित हैं।'
  },
  'library': {
    en: 'Welcome to the Central College Library and Reading Hall. Equipped with over 45,000 academic reference volumes, national journals, and high-speed digital research terminals with INFLIBNET access.',
    hi: 'यह केंद्रीय पुस्तकालय और वाचनालय है। यहाँ 45,000 से अधिक संदर्भ पुस्तकें, शोध पत्रिकाएं और इंटरनेट युक्त ई-लर्निंग डिजिटल स्टडी टर्मिनल उपलब्ध हैं।'
  },
  'auditorium': {
    en: 'Standing inside the Guru Gobind Singh Auditorium. This grand multipurpose auditorium hosts university youth fests, national academic seminars, convocations, and cultural celebrations.',
    hi: 'गुरु गोबिंद सिंह सभागार में आपका स्वागत है। यहाँ सभी प्रमुख राष्ट्रीय सेमिनार, सांस्कृतिक कार्यक्रम, युवा महोत्सव और दीक्षांत समारोह आयोजित होते हैं।'
  }
};

export default function VirtualTour() {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [locations, setLocations] = useState(TOUR_LOCATIONS);
  const [activeLocation, setActiveLocation] = useState(TOUR_LOCATIONS[0]);
  const [loading, setLoading] = useState(true);
  const [isNarrating, setIsNarrating] = useState(false);
  const [tourLang, setTourLang] = useState('en'); // 'en' | 'hi'

  // Sync locations from Firestore settings/virtual_tour with rock-solid fallback
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(doc(db, 'settings', 'virtual_tour'), (snap) => {
        if (snap.exists() && Array.isArray(snap.data().locations) && snap.data().locations.length > 0) {
          setLocations(snap.data().locations);
        }
      }, () => {});
      return () => unsub();
    } catch {}
  }, []);

  // 360 Viewer Initialization
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

  // Audio Tour Narration Guide
  const speakNarration = useCallback((locationId, targetLang = tourLang) => {
    if (!('speechSynthesis' in window)) {
      alert('Audio narration is not supported on this device/browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const narrationObj = NARRATIONS[locationId] || {
      en: activeLocation.description || activeLocation.title,
      hi: activeLocation.description || activeLocation.title
    };
    const textToSpeak = targetLang === 'hi' ? narrationObj.hi : narrationObj.en;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = targetLang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    try {
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => targetLang === 'hi' ? v.lang.includes('hi') : (v.lang.includes('en-IN') || v.lang.includes('en')));
      if (preferred) utterance.voice = preferred;
    } catch {}

    utterance.onend = () => setIsNarrating(false);
    utterance.onerror = () => setIsNarrating(false);

    setIsNarrating(true);
    window.speechSynthesis.speak(utterance);
  }, [activeLocation, tourLang]);

  const toggleNarration = () => {
    if (isNarrating) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsNarrating(false);
    } else {
      speakNarration(activeLocation.id, tourLang);
    }
  };

  // Stop speech when switching location or unmounting
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const switchLocation = (loc) => {
    if (loc.id === activeLocation.id) return;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsNarrating(false);
    setLoading(true);
    setActiveLocation(loc);
  };

  return (
    <div style={{ width: '100%', fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif" }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Audio Tour Guide Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.12)',
            padding: '6px 12px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <button
              onClick={toggleNarration}
              className="gnc-audio-tour-btn"
              style={{
                background: isNarrating ? '#ef4444' : GOLD,
                color: isNarrating ? '#fff' : NAVY,
                border: 'none',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title={isNarrating ? 'Stop Audio Guide' : 'Listen to Audio Tour Guide'}
            >
              {isNarrating ? <Square size={14} /> : <Volume2 size={14} />}
              {isNarrating ? 'Stop Audio' : 'Audio Guide'}
            </button>

            <button
              onClick={() => {
                const next = tourLang === 'en' ? 'hi' : 'en';
                setTourLang(next);
                if (isNarrating) {
                  window.speechSynthesis.cancel();
                  speakNarration(activeLocation.id, next);
                }
              }}
              style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 8,
                padding: '5px 10px',
                fontSize: 11,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
              title="Switch Audio Language"
            >
              <Languages size={13} color={GOLD} />
              {tourLang === 'en' ? 'हिंदी' : 'EN'}
            </button>
          </div>

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, color: NAVY, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            <MapPin size={16} color={GOLD} />
            <span>Select Campus Tour Hotspot</span>
          </div>
          <div style={{ fontSize: 12, color: '#64748b' }}>
            {locations.length} Interactive Locations Available
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12
        }}>
          {locations.map((loc) => {
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
                  flexShrink: 0
                }}>
                  {isActive ? <Globe size={18} color={GOLD} /> : <MapPin size={18} color="#64748b" />}
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
