// src/components/CampusMap.jsx — Interactive Leaflet Campus Map for Guru Nanak College
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Navigation, Phone, Mail, ExternalLink, School } from 'lucide-react';
import { COLORS } from '../styles/colors';

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

// Custom Leaflet DivIcon for pins
const createCampusIcon = (color, label) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: ${color};
        color: #ffffff;
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        border: 2px solid #ffffff;
      ">
        <span style="transform: rotate(45deg); font-size: 15px;">🏛️</span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

const CAMPUSES = [
  {
    id: 'bhuda',
    name: 'Bhuda Campus (Main / Boys Wing)',
    lat: 23.7925,
    lng: 86.4358,
    address: 'Guru Nanak College, Bhuda, Dhanbad, Jharkhand - 826001',
    phone: '+91 79033 40991',
    email: 'principal@gncollege.org',
    type: 'Main Campus & Administration',
    googleMapsUrl: 'https://maps.google.com/?q=Guru+Nanak+College+Bhuda+Dhanbad',
    image: '/images/college_photo.webp'
  },
  {
    id: 'bankmore',
    name: 'Bank More Campus (Girls & Vocational Wing)',
    lat: 23.7885,
    lng: 86.4255,
    address: 'Guru Nanak College, Bank More, Dhanbad, Jharkhand - 826001',
    phone: '+91 79033 40991',
    email: 'vocational@gncollege.org',
    type: 'Girls Wing & BCA IT Center',
    googleMapsUrl: 'https://maps.google.com/?q=Guru+Nanak+College+Bank+More+Dhanbad',
    image: '/images/slide1.webp'
  }
];

export default function CampusMap() {
  const [selectedCampus, setSelectedCampus] = useState(CAMPUSES[0]);

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 20,
      border: '1px solid #e2e8f0',
      boxShadow: '0 15px 35px rgba(15,35,71,0.06)',
      overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Map Header */}
      <div style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #173266 100%)`,
        color: '#ffffff',
        padding: '24px 28px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
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
            fontSize: 11.5,
            fontWeight: 800,
            letterSpacing: '1px',
            marginBottom: 6
          }}>
            <MapPin size={13} /> GEOGRAPHIC LOCATOR
          </div>
          <h3 style={{ margin: 0, fontSize: 'clamp(18px, 3.5vw, 22px)', fontWeight: 900 }}>
            Interactive Campus Navigator
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
            Locate both Bhuda Main Campus and Bank More Campus in Dhanbad
          </p>
        </div>

        {/* Switchers */}
        <div style={{ display: 'flex', gap: 8 }}>
          {CAMPUSES.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCampus(c)}
              style={{
                background: selectedCampus.id === c.id ? GOLD : 'rgba(255,255,255,0.12)',
                color: selectedCampus.id === c.id ? NAVY : '#ffffff',
                border: 'none',
                padding: '8px 14px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {c.id === 'bhuda' ? '🏛️ Bhuda' : '🏢 Bank More'}
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Map Frame */}
      <div style={{ height: 'clamp(320px, 45vh, 420px)', width: '100%', position: 'relative' }}>
        <MapContainer
          center={[23.7905, 86.4300]}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {CAMPUSES.map(c => (
            <Marker
              key={c.id}
              position={[c.lat, c.lng]}
              icon={createCampusIcon(c.id === 'bhuda' ? NAVY : GOLD, c.name)}
            >
              <Popup>
                <div style={{ padding: '6px', maxWidth: 220, fontFamily: "'DM Sans', sans-serif" }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: NAVY, marginBottom: 4 }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5, marginBottom: 8 }}>
                    {c.address}
                  </div>
                  <a
                    href={c.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 11,
                      fontWeight: 800,
                      color: GOLD,
                      textDecoration: 'none'
                    }}
                  >
                    Get Directions <ExternalLink size={11} />
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Selected Campus Detail Card */}
      <div style={{
        padding: '20px 24px',
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, color: NAVY, marginBottom: 4 }}>
            {selectedCampus.name}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={14} color={GOLD} />
            {selectedCampus.address}
          </div>
        </div>

        <a
          href={selectedCampus.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: NAVY,
            color: '#ffffff',
            padding: '10px 18px',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 800,
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(15,35,71,0.18)'
          }}
        >
          <Navigation size={15} color={GOLD} />
          Directions in Google Maps
        </a>
      </div>
    </div>
  );
}
