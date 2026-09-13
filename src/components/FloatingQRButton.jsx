// src/components/FloatingQRButton.jsx — Floating QR share button with modal
import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import ShareQRModal from './ShareQRModal';
import { COLORS } from '../styles/colors';

const N = COLORS.navy || '#0f2347';
const G = COLORS.gold || '#f4a023';

export default function FloatingQRButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Share page via QR code"
        title="Share & Print QR Code"
        style={{
          position: 'fixed',
          bottom: '152px',
          right: '20px',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: '#ffffff',
          color: N,
          border: `2px solid ${G}`,
          boxShadow: '0 8px 25px rgba(15,35,71,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9990,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
          e.currentTarget.style.background = N;
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.background = '#ffffff';
          e.currentTarget.style.color = N;
        }}
      >
        <QrCode size={22} strokeWidth={2} />
      </button>

      <ShareQRModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
