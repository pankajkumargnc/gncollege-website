import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { collection, onSnapshot, getDocsFromServer } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import FlipbookViewer from '../components/FlipbookViewer';
import { BookOpen, Download, Share2, Sparkles, Eye, Search, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { resolveUrl } from '../utils/resolver';
const PDFModal = lazy(() => import('../components/PDFModal'));

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

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

export function getDriveDownloadUrl(url) {
  if (!url) return '';
  const trimmed = String(url).trim();
  const m1 = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const m2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const driveId = m1?.[1] || m2?.[1];
  if (driveId) {
    return `https://drive.google.com/uc?id=${driveId}&export=download`;
  }
  return url;
}

const DEFAULT_MAGAZINE = {
  id: 'default-gurupradeep',
  title: 'Gurupradeep Annual Magazine 2024-25',
  volumeIssue: 'Vol. 32 • Annual Edition',
  academicYear: '2024-25',
  coverImage: '',
  pdfUrl: '',
  link: '',
  description: 'The flagship annual publication of Guru Nanak College Dhanbad, highlighting student achievements, departmental reports, creative literature, and campus milestones.',
  isFeatured: true
};

function Fade({ children, delay = 0, y = 20 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current); return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : `translateY(${y}px)`, transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s` }}>{children}</div>;
}

const PageHeader = ({ title, subtitle, icon }) => (
  <header className="premium-hero">
    <div className="kinetic-bg" />
    <Fade>
      <div className="hero-content-wrapper">
        {icon && <div className="hero-icon">{icon}</div>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </Fade>
  </header>
);

function PublicationDocList({ keyword }) {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState('');
  const [previewPdf, setPreviewPdf] = useState(null);

  useEffect(() => {
    const q = collection(db, 'pdfReports');
    const unsub = onSnapshot(q, snap => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      all.sort((a, b) => {
        const tA = a.createdAt?.toMillis?.() || (a.createdAt ? new Date(a.createdAt).getTime() : 0);
        const tB = b.createdAt?.toMillis?.() || (b.createdAt ? new Date(b.createdAt).getTime() : 0);
        return tB - tA;
      });
      setDocs(all.filter(d =>
        (d.targetPage || '').toLowerCase() === keyword.toLowerCase() ||
        (d.title || '').toLowerCase().includes(keyword.toLowerCase()) ||
        (d.category || '').toLowerCase().includes(keyword.toLowerCase())
      ));
    }, err => {
      console.warn('[PublicationDocList] onSnapshot warning:', err);
    });

    const handleSync = () => {
      // Re-trigger snap automatically via Firestore listener
    };
    window.addEventListener('gnc_live_sync', handleSync);
    return () => {
      unsub();
      window.removeEventListener('gnc_live_sync', handleSync);
    };
  }, [keyword]);

  const filtered = docs.filter(d => 
    !search || 
    (d.title || '').toLowerCase().includes(search.toLowerCase()) || 
    (d.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleShare = (doc) => {
    const link = doc.pdfUrl || doc.link || window.location.href;
    const text = encodeURIComponent(`📄 Check out "${doc.title}" from Guru Nanak College:\n${link}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', minWidth: 260, flex: 1 }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search documents, exam results, or circulars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              border: '1.5px solid #e2e8f0',
              borderRadius: 12,
              fontSize: 13.5,
              background: '#ffffff',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>
          {filtered.length} document{filtered.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 18 }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px 20px', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: 20, background: '#ffffff' }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>📁</div>
            <div style={{ fontWeight: 800, color: NAVY, fontSize: 16 }}>No documents found in this section.</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Documents uploaded from Admin Panel with target <code>{keyword}</code> will appear here automatically.</div>
          </div>
        ) : (
          filtered.map((d, i) => {
            const pdfLink = d.pdfUrl || d.link;
            return (
              <Fade key={d.id} delay={i * 0.04}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(15,35,71,0.05)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}>
                  {d.coverImage && (
                    <div style={{ width: '100%', height: 200, overflow: 'hidden', background: '#09172e', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={resolveUrl(d.coverImage)} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(20px) brightness(0.4)', opacity: 0.7 }} />
                      <img src={resolveUrl(d.coverImage)} alt={d.title} style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain', position: 'relative', zIndex: 2, borderRadius: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }} />
                      <span style={{ position: 'absolute', bottom: 10, left: 12, background: GOLD, color: NAVY, padding: '3px 9px', borderRadius: 6, fontSize: 10, fontWeight: 800, zIndex: 3 }}>
                        {d.category || d.type || 'DOCUMENT'}
                      </span>
                    </div>
                  )}

                  <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                      {!d.coverImage && <span style={{ fontSize: 24 }}>📄</span>}
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: '0 0 4px', lineHeight: 1.4 }}>
                          {d.title}
                        </h3>
                        {d.description && (
                          <p style={{ fontSize: 13, color: '#475569', margin: 0, lineHeight: 1.55, textAlign: 'left', textWrap: 'pretty' }}>
                            {d.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
                        {d.fileSize ? `📦 ${d.fileSize}` : 'PDF Document'}
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {pdfLink && (
                          <button
                            type="button"
                            onClick={() => setPreviewPdf({ url: pdfLink, title: d.title })}
                            style={{
                              background: NAVY,
                              color: '#ffffff',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4
                            }}
                          >
                            <Eye size={13} /> View
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleShare(d)}
                          style={{
                            background: '#25D366',
                            color: '#ffffff',
                            border: 'none',
                            padding: '6px 10px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 3
                          }}
                          title="Share on WhatsApp"
                        >
                          <Share2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            );
          })
        )}
      </div>

      {previewPdf && (
        <Suspense fallback={null}>
          <PDFModal url={previewPdf.url} title={previewPdf.title} onClose={() => setPreviewPdf(null)} />
        </Suspense>
      )}
    </>
  );
}

export function LibraryPage() {
  const stats = [
    { label: 'Books', val: '50,000+', icon: '📚' },
    { label: 'Journals', val: '25+', icon: '📰' },
    { label: 'Digital Access', val: 'N-LIST', icon: '💻' },
    { label: 'Reading Hall', val: '200 Seating', icon: '🪑' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title="College Library" subtitle="A hub of knowledge equipped with vast resources for research and learning." icon="📖" />
      <div style={{ maxWidth: 1100, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 20, marginBottom: 40 }}>
          {stats.map((s, i) => (
            <Fade key={i} delay={i * 0.1}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 30, textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15,35,71,0.05)' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: NAVY, marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            </Fade>
          ))}
        </div>
        <Fade delay={0.3}>
          <div style={{ background: '#fff', borderRadius: 24, padding: 40, border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 20 }}>Library Services</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
              {['Online Public Access Catalog (OPAC)', 'Inter-Library Loan Facility', 'Reprographic Services', 'Digital Library Section'].map((item, i) => (
                <div key={i} style={{ padding: 16, background: '#f8fafc', borderRadius: 12, fontWeight: 600, color: NAVY, border: '1px solid #f1f5f9' }}>✓ {item}</div>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

function MagazineCardItem({ mag, idx, onShareWa }) {
  const [imgFailed, setImgFailed] = useState(false);
  const rawPdf = mag.pdfUrl || mag.link || '';
  const viewLink = getDriveViewUrl(rawPdf);
  const downloadLink = getDriveDownloadUrl(rawPdf);
  const coverImg = mag.coverImage && !imgFailed ? resolveUrl(mag.coverImage) : '';
  const magYear = mag.academicYear || mag.year || '2024';

  return (
    <Fade delay={idx * 0.05}>
      <div
        className="gnc-magazine-card"
        style={{
          background: '#ffffff',
          borderRadius: 20,
          border: '1.5px solid #e2e8f0',
          boxShadow: '0 10px 30px rgba(15,35,71,0.06)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative'
        }}
      >
        {/* ── 3D Realistic Book Showcase Frame ── */}
        <div
          style={{
            height: 380,
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            background: 'radial-gradient(ellipse at 50% 100%, rgba(244, 160, 35, 0.12) 0%, transparent 65%), linear-gradient(160deg, #071326 0%, #0c1d3b 60%, #152d59 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            boxSizing: 'border-box'
          }}
        >
          {/* Ambient Blurred Aura */}
          {coverImg && (
            <img
              src={coverImg}
              alt=""
              aria-hidden="true"
              className="gnc-ambient-glow"
              onError={() => setImgFailed(true)}
              style={{
                position: 'absolute',
                inset: -20,
                width: 'calc(100% + 40px)',
                height: 'calc(100% + 40px)',
                objectFit: 'cover',
                filter: 'blur(30px) saturate(2) brightness(0.35)',
                opacity: 0.65,
                pointerEvents: 'none',
                zIndex: 1,
                transform: 'scale(1.15)'
              }}
            />
          )}

          {/* Subtle Bookshelf Perspective Base */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 18,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            zIndex: 2
          }} />

          {/* Top Badges Bar */}
          <div style={{
            position: 'absolute',
            top: 12,
            left: 14,
            right: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 4,
            pointerEvents: 'none'
          }}>
            <div style={{
              background: 'rgba(9, 23, 46, 0.82)',
              backdropFilter: 'blur(10px)',
              color: '#ffffff',
              padding: '4px 12px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              border: '1px solid rgba(255,255,255,0.22)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              <Calendar size={12} color={GOLD} /> {magYear}
            </div>

            {mag.isFeatured && (
              <div style={{
                background: `linear-gradient(135deg, ${GOLD}, #d97706)`,
                color: NAVY,
                padding: '4px 12px',
                borderRadius: 20,
                fontSize: 10.5,
                fontWeight: 900,
                letterSpacing: 0.5,
                boxShadow: `0 4px 14px ${GOLD}66`
              }}>
                ⭐ LATEST ISSUE
              </div>
            )}
          </div>

          {/* Foreground Realistic 3D Magazine Cover Stand */}
          <div style={{
            position: 'relative',
            zIndex: 3,
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {coverImg ? (
              <div style={{
                position: 'relative',
                height: '100%',
                maxHeight: 330,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={coverImg}
                  alt={mag.title}
                  className="gnc-book-cover-img"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '3px 9px 9px 3px',
                    boxShadow: '-6px 4px 18px rgba(0,0,0,0.55), 10px 14px 28px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.18)',
                    borderLeft: '3px solid rgba(255,255,255,0.45)',
                    display: 'block'
                  }}
                  onError={() => setImgFailed(true)}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: 12,
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 40%, transparent 100%)',
                  pointerEvents: 'none',
                  borderRadius: '3px 0 0 3px'
                }} />
              </div>
            ) : (
              <div
                className="gnc-fallback-cover"
                style={{
                  display: 'flex',
                  width: 220,
                  height: 310,
                  borderRadius: '4px 12px 12px 4px',
                  borderLeft: `6px solid ${GOLD}`,
                  boxShadow: '-6px 6px 20px rgba(0,0,0,0.6), 10px 14px 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.15)',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: `linear-gradient(145deg, #09172e 0%, ${NAVY} 60%, #1a3a7c 100%)`,
                  color: '#ffffff',
                  textAlign: 'center',
                  padding: '26px 18px',
                  boxSizing: 'border-box'
                }}
              >
                <div>
                  <span style={{ fontSize: 10, fontWeight: 800, color: GOLD, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                    GURU NANAK COLLEGE
                  </span>
                  <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 2 }}>DHANBAD</div>
                </div>
                <div>
                  <span style={{ fontSize: 42, display: 'block', marginBottom: 8 }}>📖</span>
                  <h4 style={{ fontSize: 16, fontWeight: 900, margin: 0, lineHeight: 1.3, textTransform: 'uppercase', color: '#ffffff' }}>
                    {mag.title}
                  </h4>
                </div>
                <div style={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  background: 'rgba(244,160,35,0.2)',
                  color: GOLD,
                  padding: '4px 10px',
                  borderRadius: 12,
                  border: `1px solid ${GOLD}44`
                }}>
                  {mag.volumeIssue || `Annual Issue ${magYear}`}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Magazine Information Body ── */}
        <div style={{ padding: '18px 20px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 8 }}>
            <span style={{
              fontSize: 11,
              fontWeight: 800,
              background: '#fef3c7',
              color: '#92400e',
              padding: '2px 8px',
              borderRadius: 6,
              letterSpacing: 0.3
            }}>
              {mag.volumeIssue || 'Annual Issue'}
            </span>
            <span style={{ fontSize: 11.5, color: '#64748b', fontWeight: 700 }}>
              Session {magYear}
            </span>
          </div>

          <h3 style={{
            fontSize: 16.5,
            fontWeight: 900,
            color: NAVY,
            margin: '0 0 6px',
            lineHeight: 1.35,
            letterSpacing: '-0.2px'
          }}>
            {mag.title}
          </h3>

          <p style={{
            fontSize: 12.5,
            color: '#64748b',
            lineHeight: 1.55,
            margin: '0 0 12px',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textAlign: 'left',
            textWrap: 'pretty'
          }}>
            {mag.description || 'Official digital publication of Guru Nanak College, Dhanbad featuring student articles, departmental achievements, faculty research, and campus memories.'}
          </p>

          <div style={{
            fontSize: 11,
            color: '#94a3b8',
            marginBottom: 12,
            paddingTop: 8,
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>📄 High-Definition Edition</span>
            <span>{mag.fileSize || 'PDF Format'}</span>
          </div>

          {/* ── Action Buttons ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr auto', gap: 8, marginTop: 'auto' }}>
            {viewLink ? (
              <a
                href={viewLink}
                target="_blank"
                rel="noreferrer"
                className="action-btn-view"
                style={{
                  background: `linear-gradient(135deg, ${NAVY}, #1a3a7c)`,
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  boxShadow: '0 3px 12px rgba(15,35,71,0.15)'
                }}
                title="Open full magazine online"
              >
                <Eye size={14} color={GOLD} /> View Online
              </a>
            ) : (
              <button
                type="button"
                disabled
                style={{
                  background: '#f1f5f9',
                  color: '#94a3b8',
                  padding: '8px 12px',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'not-allowed'
                }}
              >
                Processing
              </button>
            )}

            {downloadLink ? (
              <a
                href={downloadLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #cbd5e1',
                  color: NAVY,
                  padding: '8px 10px',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  transition: 'all 0.15s'
                }}
                title="Download Magazine PDF"
              >
                <Download size={13} /> PDF
              </a>
            ) : null}

            <button
              type="button"
              onClick={() => onShareWa(mag)}
              style={{
                background: '#25D366',
                color: '#ffffff',
                border: 'none',
                padding: '8px 11px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(37,211,102,0.25)',
                transition: 'all 0.15s'
              }}
              title="Share Edition on WhatsApp"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export function PublicationPage({ type, title, subtitle, icon, keyword }) {
  const isMagazine = type === 'magazine' || keyword === 'magazine';
  const [magazines, setMagazines] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [previewPdf, setPreviewPdf] = useState(null);

  useEffect(() => {
    if (!isMagazine) return;
    const q = collection(db, 'pdfReports');
    const unsub = onSnapshot(q, snap => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      all.sort((a, b) => {
        const tA = a.createdAt?.toMillis?.() || (a.createdAt ? new Date(a.createdAt).getTime() : 0);
        const tB = b.createdAt?.toMillis?.() || (b.createdAt ? new Date(b.createdAt).getTime() : 0);
        return tB - tA;
      });
      const mags = all.filter(d =>
        (d.targetPage || '').toLowerCase() === 'magazine' ||
        (d.category || '').toLowerCase().includes('magazine') ||
        (d.type || '').toLowerCase() === 'magazine' ||
        (d.title || '').toLowerCase().includes('magazine') ||
        (d.title || '').toLowerCase().includes('gurupradeep')
      );
      setMagazines(mags);
    }, err => {
      console.warn('[PublicationPage] onSnapshot warning:', err);
    });

    getDocsFromServer(q).then(serverSnap => {
      const all = serverSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      all.sort((a, b) => {
        const tA = a.createdAt?.toMillis?.() || (a.createdAt ? new Date(a.createdAt).getTime() : 0);
        const tB = b.createdAt?.toMillis?.() || (b.createdAt ? new Date(b.createdAt).getTime() : 0);
        return tB - tA;
      });
      const mags = all.filter(d =>
        (d.targetPage || '').toLowerCase() === 'magazine' ||
        (d.category || '').toLowerCase().includes('magazine') ||
        (d.type || '').toLowerCase() === 'magazine' ||
        (d.title || '').toLowerCase().includes('magazine') ||
        (d.title || '').toLowerCase().includes('gurupradeep')
      );
      if (mags.length > 0) {
        setMagazines(mags);
      }
    }).catch(() => {});

    const handleSync = () => {};
    window.addEventListener('gnc_live_sync', handleSync);
    return () => {
      unsub();
      window.removeEventListener('gnc_live_sync', handleSync);
    };
  }, [isMagazine]);

  // Extract available years for filtering
  const availableYears = ['All', ...Array.from(new Set(
    magazines
      .map(m => m.academicYear || m.year)
      .filter(Boolean)
  ))];

  // Filter magazines based on search and year
  const filteredMags = magazines.filter(m => {
    const matchSearch = !search || 
      (m.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.description || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.volumeIssue || '').toLowerCase().includes(search.toLowerCase());
    const matchYear = selectedYear === 'All' || (m.academicYear === selectedYear || m.year === selectedYear);
    return matchSearch && matchYear;
  });

  const handleShareWa = (mag) => {
    const link = getDriveViewUrl(mag.pdfUrl || mag.link) || window.location.href;
    const text = encodeURIComponent(`📖 Read "${mag.title}" (${mag.academicYear || mag.year || 'Official Issue'}) of Guru Nanak College:\n${link}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100dvh', fontFamily: "'DM Sans', sans-serif" }}>
      <PageHeader title={title} subtitle={subtitle} icon={icon} />

      <style>{`
        .gnc-magazine-card {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border-left: 5px solid #f4a023 !important;
        }
        .gnc-magazine-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 50px rgba(15, 35, 71, 0.18) !important;
          border-color: #f4a023 !important;
        }
        .gnc-magazine-card .gnc-book-cover-img {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .gnc-magazine-card:hover .gnc-book-cover-img {
          transform: translateY(-6px) scale(1.03);
          box-shadow: -8px 8px 24px rgba(0,0,0,0.65), 14px 18px 36px rgba(0,0,0,0.5), 0 0 0 1.5px rgba(255,255,255,0.3) !important;
        }
        .gnc-magazine-card .gnc-ambient-glow {
          transition: opacity 0.4s ease, filter 0.4s ease;
        }
        .gnc-magazine-card:hover .gnc-ambient-glow {
          opacity: 0.85 !important;
          filter: blur(24px) saturate(2.2) brightness(0.48) !important;
        }
        .gnc-magazine-card .action-btn-view {
          transition: all 0.2s ease;
        }
        .gnc-magazine-card .action-btn-view:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '-40px auto 80px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        {isMagazine ? (
          <div>
            {/* ── DIGITAL BOOKSHELF ARCHIVE HEADER & SEARCH ── */}
            <div style={{
              background: '#ffffff',
              borderRadius: 24,
              padding: '32px 28px',
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 10px 35px rgba(15,35,71,0.05)',
              marginBottom: 32
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
                <div style={{ textAlign: 'left', maxWidth: 720 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: GOLD, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'left' }}>
                    <Sparkles size={14} /> Official Publications
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, margin: '4px 0 0', letterSpacing: '-0.3px', textAlign: 'left' }}>
                    Digital Magazine Archive & Annual Editions
                  </h2>
                  <p style={{ fontSize: 13.5, color: '#64748b', margin: '6px 0 0', textAlign: 'left' }}>
                    Explore Guru Nanak College's annual publications, souvenirs, and student editions. Read online or download high-definition PDF copies.
                  </p>
                </div>

                <div style={{ fontSize: 13, color: NAVY, fontWeight: 800, background: '#f1f5f9', padding: '8px 16px', borderRadius: 20, border: '1px solid #e2e8f0' }}>
                  📚 {magazines.length} Edition{magazines.length !== 1 ? 's' : ''} in Archive
                </div>
              </div>

              {/* Controls: Search & Year Filter */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', minWidth: 260, flex: 1 }}>
                  <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Search magazine by title, year or description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px 11px 40px',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: 14,
                      fontSize: 13.5,
                      background: '#f8fafc',
                      boxSizing: 'border-box',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                  />
                </div>

                {/* Year Filter Pills */}
                {availableYears.length > 1 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginRight: 4 }}>
                      Academic Year:
                    </span>
                    {availableYears.map(yr => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setSelectedYear(yr)}
                        style={{
                          background: selectedYear === yr ? NAVY : '#f1f5f9',
                          color: selectedYear === yr ? '#ffffff' : '#475569',
                          border: selectedYear === yr ? `1px solid ${NAVY}` : '1px solid #e2e8f0',
                          padding: '6px 14px',
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        {yr === 'All' ? 'All Years' : yr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── BOOKSHELF MAGAZINE GRID ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 28 }}>
              {filteredMags.length === 0 ? (
                <div style={{
                  gridColumn: '1 / -1',
                  background: '#ffffff',
                  borderRadius: 20,
                  padding: 50,
                  textAlign: 'center',
                  border: '2px dashed #cbd5e1'
                }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>📚</div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: NAVY, margin: '0 0 6px' }}>
                    No magazine editions found
                  </h3>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
                    {search || selectedYear !== 'All' 
                      ? 'Try clearing your search query or selecting "All Years".' 
                      : 'Upload annual magazines from Admin Panel -> Documents tab to display them here.'}
                  </p>
                </div>
              ) : (
                filteredMags.map((mag, idx) => (
                  <MagazineCardItem
                    key={mag.id || idx}
                    mag={mag}
                    idx={idx}
                    onShareWa={handleShareWa}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <PublicationDocList keyword={keyword} />
        )}
      </div>

      {/* PDF Modal */}
      {previewPdf && (
        <Suspense fallback={null}>
          <PDFModal url={previewPdf.url} title={previewPdf.title} onClose={() => setPreviewPdf(null)} />
        </Suspense>
      )}
    </div>
  );
}