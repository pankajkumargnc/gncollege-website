// src/components/ShareQRModal.jsx — QR Code Generator & Page Sharing
import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QrCode, Download, Share2, Copy, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { COLORS } from '../styles/colors';

const N = COLORS.navy || '#0f2347';
const G = COLORS.gold || '#f4a023';

export default function ShareQRModal({ 
  isOpen, 
  onClose, 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Guru Nanak College, Dhanbad'
}) {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  if (!isOpen) return null;

  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleDownload = () => {
    try {
      const canvas = document.getElementById('gnc-qr-canvas');
      if (!canvas) return;
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `GNC_QR_${Date.now()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success('QR Code downloaded!');
    } catch (e) {
      console.error(e);
      toast.error('Could not download QR code');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check this page on Guru Nanak College website:`,
          url: currentUrl
        });
      } catch {
        // User canceled or failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(15, 35, 71, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#ffffff',
          borderRadius: 20,
          width: 'min(420px, 95vw)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          border: '1px solid rgba(15,35,71,0.08)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${N}, #1a3a7c)`,
          color: '#ffffff',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <QrCode size={20} color={G} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>Share & Print QR</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Guru Nanak College Portal</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#ffffff',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* QR Code Canvas Area */}
        <div style={{ padding: '24px 20px', textAlign: 'center', background: '#fafafa' }}>
          <div style={{
            display: 'inline-block',
            padding: 16,
            background: '#ffffff',
            borderRadius: 16,
            boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <QRCodeCanvas 
              id="gnc-qr-canvas"
              value={currentUrl} 
              size={200}
              level="H"
              includeMargin={false}
              fgColor={N}
              imageSettings={{
                src: '/favicon.ico',
                height: 28,
                width: 28,
                excavate: true,
              }}
            />
          </div>

          <p style={{
            fontSize: 12,
            color: '#64748b',
            marginTop: 14,
            marginBottom: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            padding: '0 10px'
          }}>
            {currentUrl}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ padding: '16px 20px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button
              type="button"
              onClick={handleDownload}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: N,
                color: '#ffffff',
                border: 'none',
                padding: '11px 16px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'transform 0.15s'
              }}
            >
              <Download size={16} />
              Download PNG
            </button>

            <button
              type="button"
              onClick={handleCopy}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: '#f1f5f9',
                color: N,
                border: '1px solid #e2e8f0',
                padding: '11px 16px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          <button
            type="button"
            onClick={handleNativeShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: `linear-gradient(135deg, ${G}, #e08b12)`,
              color: '#ffffff',
              border: 'none',
              padding: '11px 16px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <Share2 size={16} />
            Share Current Page
          </button>
        </div>
      </div>
    </div>
  );
}
