// src/components/FlipbookViewer.jsx — Ultra Pro Max Dynamic College Magazine Suite
// 🌟 Dual Engine: 1) Interactive Multi-Page Live Streamer + 2) 3D Realistic Physics Page-Flip
import React, { useRef, useState, useEffect, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { 
  ChevronLeft, ChevronRight, BookOpen, Maximize2, Sparkles, 
  FileText, ExternalLink, RefreshCw, Eye, Download, Share2
} from 'lucide-react';
import { COLORS } from '../styles/colors';
import { resolveUrl } from '../utils/resolver';

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

/**
 * Resolves any PDF link into an interactive, embeddable streaming preview URL.
 * Converts Google Drive view/download links to the fast, virus-scan-free /preview stream.
 */
export function getPdfStreamUrl(url) {
  if (!url) return '';
  const trimmed = String(url).trim();

  // 1. Google Drive URLs
  const m1 = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const m2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const driveId = m1?.[1] || m2?.[1];
  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  }

  // 2. Google Docs Viewer fallback for external/direct PDFs
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    if (trimmed.includes('/preview') || trimmed.includes('docs.google.com/viewer')) {
      return trimmed;
    }
    return `https://docs.google.com/viewer?url=${encodeURIComponent(trimmed)}&embedded=true`;
  }

  return trimmed;
}

export function getDriveViewUrl(url) {
  if (!url) return '';
  const trimmed = String(url).trim();
  const m1 = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const m2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const driveId = m1?.[1] || m2?.[1];
  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/view`;
  }
  return url;
}

/**
 * Individual Flipbook Page (for 3D mode)
 */
const Page = forwardRef(({ number, title, subtitle, image, content, isCover, isBackCover, activeMag, onSwitchToLive, onOpenPdf }, ref) => {
  if (isCover) {
    const rawCover = activeMag?.coverImage;
    const coverImg = rawCover ? resolveUrl(rawCover) : '';
    const magTitle = activeMag?.title || 'ANNUAL MAGAZINE';
    const magSub = activeMag?.volumeIssue || activeMag?.academicYear 
      ? `${activeMag?.volumeIssue || ''} • ${activeMag?.academicYear || '2024-25'}` 
      : 'GURUPRADEEP • 2024-25';

    if (coverImg) {
      return (
        <div ref={ref} style={{
          background: '#09172e',
          color: '#ffffff',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          borderRight: '2px solid rgba(255,255,255,0.12)',
          boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.45)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Ambient Blurred Background */}
          <img
            src={coverImg}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -20,
              width: 'calc(100% + 40px)',
              height: 'calc(100% + 40px)',
              objectFit: 'cover',
              filter: 'blur(30px) saturate(1.8) brightness(0.35)',
              opacity: 0.7,
              pointerEvents: 'none'
            }}
          />
          {/* Uncropped Cover Image */}
          <img
            src={coverImg}
            alt={magTitle}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              position: 'relative',
              zIndex: 2,
              display: 'block'
            }}
          />
          {/* Spine Highlight */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 14,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 40%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 3
          }} />
        </div>
      );
    }

    return (
      <div ref={ref} style={{
        background: `linear-gradient(145deg, #09172e 0%, ${NAVY} 60%, #1a3a7c 100%)`,
        color: '#ffffff',
        height: '100%',
        padding: '36px 26px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        borderRight: '2px solid rgba(255,255,255,0.12)',
        boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.45)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: `${GOLD}22`, filter: 'blur(30px)' }} />
        
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(244,160,35,0.25)',
            backdropFilter: 'blur(8px)',
            color: GOLD,
            padding: '5px 14px',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '1px',
            marginBottom: 16,
            border: `1px solid ${GOLD}44`
          }}>
            <Sparkles size={13} /> GURU NANAK COLLEGE, DHANBAD
          </div>
          <h1 style={{ fontSize: coverImg ? 22 : 25, fontWeight: 900, margin: '0 0 8px', color: '#ffffff', letterSpacing: '-0.5px', textShadow: '0 2px 10px rgba(0,0,0,0.7)', lineHeight: 1.2 }}>
            {magTitle}
          </h1>
          <div style={{ fontSize: 13, color: GOLD, fontWeight: 800, letterSpacing: '1.5px', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            {magSub}
          </div>
        </div>

        {!coverImg && (
          <div style={{ textAlign: 'center', margin: '20px 0', position: 'relative', zIndex: 2 }}>
            <div style={{
              width: 120,
              height: 120,
              margin: '0 auto',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: `3px solid ${GOLD}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              boxShadow: `0 12px 35px ${GOLD}33`
            }}>
              🏛️
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 16, position: 'relative', zIndex: 2, background: coverImg ? 'rgba(9,23,46,0.65)' : 'transparent', borderRadius: 12, padding: '12px 8px 8px' }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#f8fafc' }}>
            Affiliated to B.B.M.K. University
          </div>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>
            Est. 1970 • NAAC Accredited • Dhanbad, Jharkhand
          </div>
          <div style={{ fontSize: 11, color: GOLD, marginTop: 8, fontWeight: 800 }}>
            📖 Click or Drag Corner to Flip Pages ➔
          </div>
        </div>
      </div>
    );
  }

  if (isBackCover) {
    return (
      <div ref={ref} style={{
        background: `linear-gradient(145deg, #09172e 0%, ${NAVY} 100%)`,
        color: '#ffffff',
        height: '100%',
        padding: '36px 26px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.35)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: GOLD, letterSpacing: 1 }}>
          GURU NANAK COLLEGE
        </div>
        <div>
          <div style={{ fontSize: 36, marginBottom: 10 }}>🎓</div>
          <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 8px', color: '#fff' }}>
            Shaping Futures Since 1970
          </h3>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, maxWidth: 280, margin: '0 auto 16px' }}>
            A premier institution committed to academic excellence, value-based learning, and national integration.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            {onSwitchToLive && (
              <button
                type="button"
                onClick={onSwitchToLive}
                style={{
                  background: GOLD,
                  color: NAVY,
                  fontWeight: 800,
                  fontSize: 12.5,
                  padding: '9px 18px',
                  borderRadius: 20,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: `0 4px 14px ${GOLD}55`
                }}
              >
                📑 Read All Pages in Live Streamer
              </button>
            )}

            {onOpenPdf && (
              <button
                type="button"
                onClick={() => onOpenPdf(activeMag)}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 12,
                  padding: '7px 16px',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.25)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5
                }}
              >
                👁️ View Fullscreen HD
              </button>
            )}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
            Official Web Portal: gncollege.org
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>
            Dhanbad — 826001, Jharkhand
          </div>
        </div>
      </div>
    );
  }

  const volumeTag = activeMag?.volumeIssue || activeMag?.title || 'Gurupradeep';

  return (
    <div ref={ref} style={{
      background: '#ffffff',
      color: '#1e293b',
      height: '100%',
      padding: '32px 26px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      borderRight: number % 2 === 0 ? '1px solid #e2e8f0' : 'none',
      borderLeft: number % 2 !== 0 ? '1px solid #e2e8f0' : 'none',
      boxShadow: number % 2 === 0 ? 'inset -6px 0 12px rgba(0,0,0,0.04)' : 'inset 6px 0 12px rgba(0,0,0,0.04)'
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: 8, marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.2, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {subtitle || volumeTag}
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, color: GOLD }}>GNC</div>
        </div>

        <h3 style={{ fontSize: 16.5, fontWeight: 800, color: NAVY, margin: '0 0 10px', lineHeight: 1.3 }}>
          {title}
        </h3>

        {image && (
          <div style={{ width: '100%', height: 130, borderRadius: 10, overflow: 'hidden', marginBottom: 12, background: '#f8fafc' }}>
            <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <div style={{ fontSize: 12.5, lineHeight: 1.65, color: '#475569' }}>
          {content}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: 10, fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>
        <span>Guru Nanak College</span>
        <span style={{ color: NAVY, fontWeight: 800 }}>Page {number}</span>
      </div>
    </div>
  );
});

Page.displayName = 'FlipbookPage';

/**
 * Builds dynamic summary pages reflecting the selected magazine edition.
 */
function buildDynamicPages(activeMag) {
  const title = activeMag?.title || 'Annual College Magazine';
  const desc = activeMag?.description || 'Official annual publication of Guru Nanak College Dhanbad, celebrating academic achievements, research papers, and cultural milestones.';
  const year = activeMag?.academicYear || activeMag?.year || '2024';
  const volume = activeMag?.volumeIssue || 'Official Edition';

  return [
    { isCover: true },
    {
      number: 1,
      title: `${title} — Editorial Overview`,
      subtitle: volume,
      image: "/images/college_photo.webp",
      content: desc
    },
    {
      number: 2,
      title: "Five Decades of Academic Glory",
      subtitle: "Institutional Legacy",
      image: "/images/slide1.webp",
      content: `Established in 1970 to mark Sri Guru Nanak Dev Ji's 500th birth anniversary, Guru Nanak College has grown into a premier institution affiliated with BBMK University, empowering youth across Jharkhand with moral strength and modern education.`
    },
    {
      number: 3,
      title: "Articles, Research & Creative Writing",
      subtitle: "Student & Faculty Voice",
      image: "/images/slider_seminar.webp",
      content: `This ${year} edition contains outstanding literary contributions in English, Hindi, and regional literature, cutting-edge faculty research papers, and analytical essays on contemporary societal challenges.`
    },
    {
      number: 4,
      title: "Campus Vista: Sports, NCC & NSS",
      subtitle: "Beyond The Classroom",
      image: "/images/slider_ncc.webp",
      content: `From state and national level athletics to the spirited service of our NCC cadets and NSS volunteers, the college nurtures holistic character, discipline, and community development.`
    },
    {
      number: 5,
      title: "Corporate Placements & Alumni",
      subtitle: "Career Pathways",
      image: "/images/slider_baisakhi.webp",
      content: `GNC students continue to secure placements in multinational giants like TCS, Wipro, ICICI, and prestigious civil services. Our 45,000+ alumni globally uphold the college's motto of dedication and integrity.`
    },
    { isBackCover: true }
  ];
}

export default function FlipbookViewer({ activeMagazine, onOpenPdf }) {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const currentPdfUrl = activeMagazine?.pdfUrl || activeMagazine?.link;
  const currentTitle = activeMagazine?.title || 'Gurupradeep Annual Magazine';
  const currentSub = activeMagazine?.volumeIssue || activeMagazine?.academicYear || 'Edition 2024-25';

  // If a real PDF URL is present, default to the live cloud stream so the user instantly sees all pages!
  const [viewMode, setViewMode] = useState(currentPdfUrl ? 'stream' : '3d');

  // Reset state whenever active magazine changes
  useEffect(() => {
    setCurrentPage(0);
    if (currentPdfUrl) {
      setViewMode('stream');
    }
  }, [activeMagazine?.id, currentPdfUrl]);

  const streamUrl = getPdfStreamUrl(currentPdfUrl);
  const driveViewUrl = getDriveViewUrl(currentPdfUrl);
  const pages = buildDynamicPages(activeMagazine);
  const totalPages = pages.length;

  const flipNext = () => bookRef.current?.pageFlip()?.flipNext();
  const flipPrev = () => bookRef.current?.pageFlip()?.flipPrev();

  const handleShareWa = () => {
    const text = encodeURIComponent(`📖 Read Guru Nanak College Digital Magazine: "${currentTitle}" (${currentSub})\n\n🔗 Read Online: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 10px 40px',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* ── Magazine Header & Dual-Engine Toolbar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 'min(980px, 96vw)',
        marginBottom: 20,
        background: '#ffffff',
        padding: '16px 24px',
        borderRadius: 20,
        boxShadow: '0 10px 30px rgba(15,35,71,0.06)',
        border: '1.5px solid #e2e8f0',
        flexWrap: 'wrap',
        gap: 14
      }}>
        {/* Magazine Title Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 260, flex: 1 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${NAVY}, #1e3a8a)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(15,35,71,0.15)',
            flexShrink: 0
          }}>
            <BookOpen size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 900, fontSize: 16, color: NAVY, letterSpacing: '-0.3px' }}>
                {currentTitle}
              </span>
              <span style={{ fontSize: 10, fontWeight: 800, background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d', padding: '2px 8px', borderRadius: 20 }}>
                {activeMagazine?.isFeatured ? '⭐ CURRENT ISSUE' : 'OFFICIAL PUBLICATION'}
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginTop: 2 }}>
              {currentSub} • Official Guru Nanak College Digital Edition
            </div>
          </div>
        </div>

        {/* View Mode Switcher & Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          
          {/* Direct High-Speed Cloud Viewer Link (Instant for 127MB PDFs!) */}
          {driveViewUrl && (
            <a
              href={driveViewUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #d97706)`,
                color: NAVY,
                fontWeight: 800,
                fontSize: 12,
                padding: '8px 14px',
                borderRadius: 10,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: `0 3px 10px ${GOLD}44`,
                transition: 'transform .15s'
              }}
              title="Open all pages directly in Google Cloud Reader"
            >
              <ExternalLink size={13} /> 🚀 Cloud Reader (All Pages)
            </a>
          )}

          {/* Engine Mode Toggle (Stream vs 3D Flipbook) */}
          {streamUrl && (
            <div style={{
              display: 'inline-flex',
              background: '#f1f5f9',
              padding: '3px',
              borderRadius: 12,
              border: '1px solid #e2e8f0'
            }}>
              <button
                type="button"
                onClick={() => setViewMode('stream')}
                style={{
                  background: viewMode === 'stream' ? NAVY : 'transparent',
                  color: viewMode === 'stream' ? '#ffffff' : '#475569',
                  border: 'none',
                  padding: '7px 14px',
                  borderRadius: 9,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all .2s'
                }}
              >
                <FileText size={13} /> Live Stream
              </button>

              <button
                type="button"
                onClick={() => setViewMode('3d')}
                style={{
                  background: viewMode === '3d' ? NAVY : 'transparent',
                  color: viewMode === '3d' ? '#ffffff' : '#475569',
                  border: 'none',
                  padding: '7px 14px',
                  borderRadius: 9,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all .2s'
                }}
              >
                <BookOpen size={13} /> 3D Flipbook
              </button>
            </div>
          )}

          {/* Fullscreen HD Modal Button */}
          {streamUrl && onOpenPdf && (
            <button
              type="button"
              onClick={() => onOpenPdf(activeMagazine)}
              style={{
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: 10,
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 700,
                color: NAVY,
                transition: 'all .2s'
              }}
              title="Open full magazine in high-def fullscreen reader"
            >
              <Eye size={14} /> Fullscreen
            </button>
          )}

          {/* WhatsApp Share */}
          <button
            type="button"
            onClick={handleShareWa}
            style={{
              background: '#25D366',
              border: 'none',
              borderRadius: 10,
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 12,
              fontWeight: 700,
              color: '#ffffff',
              boxShadow: '0 3px 10px rgba(37,211,102,0.3)'
            }}
            title="Share this magazine issue on WhatsApp"
          >
            <Share2 size={13} /> Share
          </button>

          {/* 3D Mode Pagination Controls */}
          {viewMode === '3d' && (
            <div style={{ display: 'inline-flex', alignItems: 'center', background: '#f1f5f9', borderRadius: 10, padding: '3px', marginLeft: 4 }}>
              <button
                type="button"
                onClick={flipPrev}
                disabled={currentPage === 0}
                style={{
                  background: currentPage === 0 ? 'transparent' : '#ffffff',
                  border: 'none',
                  borderRadius: 7,
                  padding: '6px 10px',
                  cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  fontSize: 12,
                  fontWeight: 700,
                  color: currentPage === 0 ? '#94a3b8' : NAVY,
                  boxShadow: currentPage === 0 ? 'none' : '0 2px 5px rgba(0,0,0,0.06)'
                }}
              >
                <ChevronLeft size={15} /> Prev
              </button>

              <span style={{ fontSize: 11.5, fontWeight: 800, color: NAVY, padding: '0 10px', whiteSpace: 'nowrap' }}>
                {currentPage + 1} / {totalPages}
              </span>

              <button
                type="button"
                onClick={flipNext}
                disabled={currentPage >= totalPages - 1}
                style={{
                  background: currentPage >= totalPages - 1 ? 'transparent' : NAVY,
                  border: 'none',
                  borderRadius: 7,
                  padding: '6px 12px',
                  cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  fontSize: 12,
                  fontWeight: 700,
                  color: currentPage >= totalPages - 1 ? '#94a3b8' : '#ffffff',
                  boxShadow: currentPage >= totalPages - 1 ? 'none' : '0 2px 6px rgba(15,35,71,0.2)'
                }}
              >
                Next <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── MODE 1: LIVE INTERACTIVE MULTI-PAGE CLOUD STREAMER ── */}
      {viewMode === 'stream' && streamUrl && (
        <div style={{
          width: 'min(980px, 96vw)',
          height: '750px',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 25px 70px rgba(15,35,71,0.18)',
          border: '2px solid rgba(15,35,71,0.12)',
          background: '#09172e',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Top Assistant Banner */}
          <div style={{
            background: 'linear-gradient(90deg, #09172e 0%, #172554 100%)',
            color: '#ffffff',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            flexWrap: 'wrap',
            gap: 8,
            zIndex: 2
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>⚡</span>
              <span>
                <strong>127 MB High-Definition Master Edition:</strong> Agar neeche Google preview me "File is too large" dikhe, to direct Google Cloud Viewer me kholein:
              </span>
            </div>
            {driveViewUrl && (
              <a
                href={driveViewUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: GOLD,
                  color: NAVY,
                  fontWeight: 800,
                  fontSize: 11.5,
                  padding: '5px 14px',
                  borderRadius: 16,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  boxShadow: `0 2px 8px ${GOLD}44`,
                  flexShrink: 0
                }}
              >
                <ExternalLink size={12} /> 🚀 Open Full Cloud Viewer
              </a>
            )}
          </div>

          <iframe
            src={streamUrl}
            title={currentTitle}
            style={{
              width: '100%',
              flex: 1,
              border: 'none',
              display: 'block'
            }}
            allow="autoplay; fullscreen"
          />
        </div>
      )}

      {/* ── MODE 2: 3D REALISTIC PAGE-FLIP BOOK ── */}
      {(viewMode === '3d' || !streamUrl) && (
        <div style={{
          boxShadow: '0 30px 80px rgba(15,35,71,0.25)',
          borderRadius: 12,
          overflow: 'hidden',
          background: '#09172e'
        }}>
          <HTMLFlipBook
            ref={bookRef}
            width={360}
            height={500}
            size="fixed"
            minWidth={300}
            maxWidth={420}
            minHeight={420}
            maxHeight={580}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={(e) => setCurrentPage(e.data)}
            style={{ margin: '0 auto' }}
          >
            {pages.map((p, idx) => (
              <Page
                key={idx}
                number={p.number}
                title={p.title}
                subtitle={p.subtitle}
                image={p.image}
                content={p.content}
                isCover={p.isCover}
                isBackCover={p.isBackCover}
                activeMag={activeMagazine}
                onSwitchToLive={streamUrl ? () => setViewMode('stream') : null}
                onOpenPdf={onOpenPdf}
              />
            ))}
          </HTMLFlipBook>
        </div>
      )}

      {/* Helper Footer Hint */}
      <div style={{
        fontSize: 12.5,
        color: '#64748b',
        marginTop: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        flexWrap: 'wrap',
        textAlign: 'center'
      }}>
        {viewMode === 'stream' ? (
          <span>
            💡 <strong>Cloud Stream Active:</strong> Scroll through all pages, pinch/click zoom, search text, or switch to <strong>3D Flipbook</strong> using the toggle button above.
          </span>
        ) : (
          <span>
            💡 <strong>3D Physics Flip:</strong> Click page corners, drag edges with mouse/touch to turn pages, or click <strong>Live Magazine Reader</strong> above to view every single page of the PDF.
          </span>
        )}
      </div>
    </div>
  );
}
