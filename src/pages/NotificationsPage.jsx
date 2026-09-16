// src/pages/NotificationsPage.jsx — GNC Official Notifications & Circulars Hub
// 🚀 Dual-Synced with Google Drive & Firestore + Voice Reader + URL Param Synergy
import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COLORS } from '../styles/colors';
import PDFModal from '../components/PDFModal';
import PremiumPagination from '../components/PremiumPagination';
import { useDriveDocs } from '../hooks/useDriveDocs';
import useAppData from '../hooks/useAppData';
import { 
  Bell, Volume2, VolumeX, Share2, Search, Calendar, FileText, 
  Sparkles, ExternalLink, Check, Filter, AlertCircle, BookmarkCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const ITEMS_PER_PAGE = 15;

const CATEGORIES = [
  { id: 'All', label: 'All Notices', icon: '📢' },
  { id: 'exam', label: 'Examinations', icon: '📝' },
  { id: 'admission', label: 'Admissions', icon: '🎓' },
  { id: 'holiday', label: 'Holidays & Recess', icon: '🏖️' },
  { id: 'academic', label: 'Academic & NEP', icon: '📚' },
  { id: 'general', label: 'General Circulars', icon: '📄' }
];

const getTS = ts => {
  if (!ts) return new Date();
  if (ts.toDate) return ts.toDate();
  const d = new Date(ts);
  return isNaN(d.getTime()) ? new Date() : d;
};

// Heuristic categorization based on notice text & title
const detectCategory = (text = '', type = '') => {
  const combined = `${text} ${type}`.toLowerCase();
  if (combined.includes('exam') || combined.includes('practical') || combined.includes('admit') || combined.includes('routine') || combined.includes('viva') || combined.includes('semester')) {
    return { id: 'exam', label: 'Examination', badgeBg: '#eff6ff', badgeColor: '#1d4ed8', border: '#bfdbfe' };
  }
  if (combined.includes('admission') || combined.includes('merit') || combined.includes('fyugp') || combined.includes('chancellor') || combined.includes('registration') || combined.includes('fee')) {
    return { id: 'admission', label: 'Admission', badgeBg: '#f0fdf4', badgeColor: '#15803d', border: '#bbf7d0' };
  }
  if (combined.includes('holiday') || combined.includes('closed') || combined.includes('vacation') || combined.includes('recess') || combined.includes('baisakhi') || combined.includes('puja')) {
    return { id: 'holiday', label: 'Campus Holiday', badgeBg: '#fffbeb', badgeColor: '#b45309', border: '#fde68a' };
  }
  if (combined.includes('syllabus') || combined.includes('class') || combined.includes('lecture') || combined.includes('seminar') || combined.includes('workshop')) {
    return { id: 'academic', label: 'Academic Notice', badgeBg: '#faf5ff', badgeColor: '#7e22ce', border: '#e9d5ff' };
  }
  return { id: 'general', label: 'Official Circular', badgeBg: '#f8fafc', badgeColor: '#334155', border: '#cbd5e1' };
};

export default function NotificationsPage() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialType);
  const [selYear, setSelYear] = useState('All');
  const [selMonth, setSelMonth] = useState('All');
  const [search, setSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewPdf, setPreviewPdf] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);

  const navy = COLORS.navy || '#0f2347';
  const gold = COLORS.gold || '#f4a023';

  // Fetch Firestore Notices
  const { notices: fbNotices } = useAppData();

  // Fetch Drive Notices
  const NOTICE_FOLDER_ID = import.meta.env.VITE_DRIVE_NOTICE_FOLDER;
  const { docs: driveNotices, loading, error } = useDriveDocs(NOTICE_FOLDER_ID);

  // Sync with URL query parameters on mount or change
  useEffect(() => {
    const urlType = searchParams.get('type') || searchParams.get('category');
    if (urlType) setActiveCategory(urlType.toLowerCase());
    const urlSearch = searchParams.get('search');
    if (urlSearch) setSearch(urlSearch);
  }, [searchParams]);

  // Merge & Sort both data sources
  const notices = useMemo(() => {
    const drNotices = driveNotices.map(doc => ({
      id: doc.id,
      text: doc.name, 
      createdAt: { toDate: () => new Date(doc.rawDate || Date.now()) },
      link: doc.previewUrl,
      type: 'Drive Notice',
      isNew: (new Date() - new Date(doc.rawDate || Date.now())) < 7 * 24 * 60 * 60 * 1000 
    }));
    
    return [...drNotices, ...(fbNotices || [])].sort((a, b) => {
      const aTime = getTS(a.createdAt).getTime();
      const bTime = getTS(b.createdAt).getTime();
      return bTime - aTime;
    });
  }, [driveNotices, fbNotices]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const years = useMemo(() => {
    const s = new Set(notices.map(n => getTS(n.createdAt).getFullYear()));
    return ['All', ...Array.from(s).sort((a, b) => b - a)];
  }, [notices]);

  // Filter pipeline
  const filtered = useMemo(() => {
    const now = new Date();
    return notices.filter(n => {
      // Content Scheduling
      if (n.publishDate && new Date(n.publishDate) > now) return false;
      if (n.expiryDate && new Date(n.expiryDate) < now) return false;

      const d = getTS(n.createdAt);
      if (selYear !== 'All' && d.getFullYear() !== Number(selYear)) return false;
      if (selMonth !== 'All' && MONTHS_SHORT[d.getMonth()] !== selMonth) return false;

      // Category filter
      if (activeCategory !== 'All') {
        const cat = detectCategory(n.text, n.type);
        if (cat.id !== activeCategory && !cat.label.toLowerCase().includes(activeCategory.toLowerCase())) {
          return false;
        }
      }

      if (search && !n.text?.toLowerCase().includes(search.toLowerCase()) && !n.description?.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [notices, selYear, selMonth, activeCategory, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selYear, selMonth, activeCategory, search]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const grouped = useMemo(() => {
    const map = {};
    paginated.forEach(n => {
      const d = getTS(n.createdAt);
      const k = `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
      if (!map[k]) map[k] = [];
      map[k].push(n);
    });
    return map;
  }, [paginated]);

  // Audio Text-to-Speech handler
  const handleSpeak = (id, text) => {
    if (!('speechSynthesis' in window)) {
      toast.error('Voice playback is not supported on this browser');
      return;
    }
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/[-_.]+/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleShareWhatsapp = (n) => {
    const shareText = `📢 *GNC Official Notice*\n${n.text}\n\nRead full circular at Guru Nanak College portal:\n${window.location.origin}/notifications#${n.id}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleCopyLink = (n) => {
    const url = `${window.location.origin}/notifications#${n.id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Direct circular link copied to clipboard!');
    });
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#f8fafc', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* 1. HERO BANNER */}
      <header className="premium-hero" style={{
        background: 'linear-gradient(135deg, #0a192f 0%, #0f2347 60%, #1e3a8a 100%)',
        color: '#fff',
        padding: 'clamp(50px, 8vw, 80px) 20px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(244,160,35,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(244,160,35,0.15)', border: '1px solid rgba(244,160,35,0.3)',
            padding: '4px 14px', borderRadius: 50, fontSize: 12, fontWeight: 800,
            color: '#f59e0b', marginBottom: 14
          }}>
            <Bell size={13} className="animate-pulse" /> OFFICIAL ADMINISTRATIVE & ACADEMIC REPOSITORY
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.02em', color: '#fff' }}>
            Notifications & <span style={{ color: '#f4a023' }}>Circulars</span>
          </h1>
          <p style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', color: '#cbd5e1', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Live authoritative circulars, university exam routines, admission merit lists, and academic schedules of Guru Nanak College, Dhanbad.
          </p>
        </div>
      </header>

      {/* 2. MAIN CONTENT WRAPPER */}
      <main style={{ maxWidth: 1160, margin: '-28px auto 60px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        {/* FILTER CONTROLS HUD */}
        <div style={{
          background: '#ffffff',
          borderRadius: 20,
          padding: '24px',
          boxShadow: '0 12px 36px rgba(15,35,71,0.06)',
          border: '1px solid #e2e8f0',
          marginBottom: 32
        }}>
          {/* Top Search and Category Pills */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Search by keyword, subject, exam code, circular number..." 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 18px 13px 44px',
                  borderRadius: 12,
                  border: '1.5px solid #e2e8f0',
                  fontSize: 14,
                  fontWeight: 600,
                  outline: 'none',
                  background: '#f8fafc',
                  color: navy,
                  boxSizing: 'border-box'
                }}
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 800 }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Year selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={16} color="#64748b" />
              <select 
                value={selYear} 
                onChange={e => setSelYear(e.target.value)}
                style={{
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #e2e8f0',
                  fontSize: 13,
                  fontWeight: 700,
                  color: navy,
                  background: '#fff',
                  cursor: 'pointer'
                }}
              >
                {years.map(y => <option key={y} value={y}>{y === 'All' ? 'All Years' : `Session ${y}`}</option>)}
              </select>
            </div>
          </div>

          {/* Category Pills Row */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', paddingTop: 16, borderTop: '1px dashed #e2e8f0' }}>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px', marginRight: 4 }}>
              Category:
            </span>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 50,
                    border: isActive ? `1.5px solid ${navy}` : '1px solid #e2e8f0',
                    background: isActive ? navy : '#f8fafc',
                    color: isActive ? '#fff' : '#475569',
                    fontSize: 12.5,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(15,35,71,0.2)' : 'none'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sync Status Banner */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px 16px', borderRadius: 12, marginBottom: 20, fontSize: 13, fontWeight: 700 }}>
            ⚠️ Google Drive sync notice: Serving latest verified records from college database.
          </div>
        )}

        {/* Active Result Count */}
        {!loading && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '0 4px' }}>
            <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>
              Showing <span style={{ color: navy, fontWeight: 900 }}>{filtered.length}</span> official notifications
              {activeCategory !== 'All' && <span> under <strong>{CATEGORIES.find(c => c.id === activeCategory)?.label}</strong></span>}
            </div>
            {(search || activeCategory !== 'All' || selYear !== 'All') && (
              <button
                type="button"
                onClick={() => { setSearch(''); setActiveCategory('All'); setSelYear('All'); }}
                style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}
              >
                ✕ Reset Filters
              </button>
            )}
          </div>
        )}

        {/* FEED RENDERING */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b', fontWeight: 700 }}>
            <div style={{ fontSize: 32, marginBottom: 10 }} className="animate-spin">🔄</div>
            <div>Syncing official notices from college archive...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#ffffff', borderRadius: 20,
            border: '2px dashed #e2e8f0', color: '#94a3b8'
          }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📭</div>
            <h3 style={{ color: navy, fontWeight: 800, margin: '0 0 8px', fontSize: 18 }}>No Notifications Found</h3>
            <p style={{ margin: '0 auto 20px', maxWidth: 380, fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
              {search ? `No circulars match "${search}". Try searching with another keyword or resetting categories.` : 'No notifications found for the selected category.'}
            </p>
            <button
              type="button"
              onClick={() => { setSearch(''); setActiveCategory('All'); setSelYear('All'); }}
              className="abtn abtn-navy"
              style={{ padding: '8px 18px', fontSize: 12 }}
            >
              Show All Notices
            </button>
          </div>
        ) : (
          <div>
            {Object.entries(grouped).map(([monthYear, items]) => (
              <div key={monthYear} style={{ marginBottom: 36 }}>
                {/* Month Separator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0 16px' }}>
                  <span style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                  <span style={{
                    background: '#ffffff',
                    color: navy,
                    fontWeight: 900,
                    fontSize: 12,
                    padding: '4px 14px',
                    borderRadius: 20,
                    border: '1.5px solid #e2e8f0',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}>
                    📅 {monthYear}
                  </span>
                  <span style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {items.map(n => {
                    const d = getTS(n.createdAt);
                    const catInfo = detectCategory(n.text, n.type);
                    const isSpeaking = speakingId === n.id;

                    return (
                      <article 
                        key={n.id}
                        id={n.id}
                        style={{
                          background: '#ffffff',
                          borderRadius: 16,
                          border: n.isNew ? '1.5px solid #f87171' : '1px solid #e2e8f0',
                          padding: '20px 22px',
                          display: 'flex',
                          gap: 18,
                          alignItems: 'flex-start',
                          boxShadow: '0 4px 16px rgba(15,35,71,0.03)',
                          transition: 'all 0.2s ease',
                          position: 'relative'
                        }}
                      >
                        {/* Date Calendar Box */}
                        <div style={{
                          textAlign: 'center',
                          minWidth: 62,
                          background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
                          border: '1px solid #e2e8f0',
                          borderRadius: 12,
                          padding: '10px 8px',
                          flexShrink: 0
                        }}>
                          <div style={{ fontSize: 10.5, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                            {MONTHS_SHORT[d.getMonth()]}
                          </div>
                          <div style={{ fontSize: 24, fontWeight: 900, color: navy, lineHeight: 1.1, marginTop: 2 }}>
                            {d.getDate()}
                          </div>
                          <div style={{ fontSize: 9.5, color: '#94a3b8', fontWeight: 700, marginTop: 2 }}>
                            {d.getFullYear()}
                          </div>
                        </div>

                        {/* Text & Meta Information */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
                            {/* Category Badge */}
                            <span style={{
                              fontSize: 10.5,
                              fontWeight: 800,
                              padding: '2px 10px',
                              borderRadius: 50,
                              background: catInfo.badgeBg,
                              color: catInfo.badgeColor,
                              border: `1px solid ${catInfo.border}`,
                              textTransform: 'uppercase'
                            }}>
                              {catInfo.label}
                            </span>

                            {n.isNew && (
                              <span style={{
                                fontSize: 9.5,
                                fontWeight: 900,
                                background: '#dc2626',
                                color: '#ffffff',
                                padding: '2px 8px',
                                borderRadius: 50,
                                letterSpacing: '0.6px'
                              }}>
                                🌟 NEW
                              </span>
                            )}
                          </div>

                          <h2 style={{
                            margin: 0,
                            fontSize: 'clamp(14.5px, 1.4vw, 16.5px)',
                            fontWeight: 800,
                            color: navy,
                            lineHeight: 1.45,
                            letterSpacing: '-0.01em'
                          }}>
                            {n.text}
                          </h2>

                          {n.description && (
                            <p style={{ margin: '8px 0 0', fontSize: 13.5, color: '#475569', lineHeight: 1.6 }}>
                              {n.description}
                            </p>
                          )}

                          {/* Quick Interactive Actions Row */}
                          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginTop: 14, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                            {n.link && (
                              <button
                                type="button"
                                onClick={() => setPreviewPdf({ url: n.link, title: n.text })}
                                style={{
                                  background: 'linear-gradient(135deg, #0f2347, #1e3a8a)',
                                  border: 'none',
                                  color: '#ffffff',
                                  padding: '6px 14px',
                                  borderRadius: 8,
                                  fontSize: 12,
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 6
                                }}
                              >
                                <FileText size={13} color="#f4a023" /> View Official PDF
                              </button>
                            )}

                            {/* Voice Reader */}
                            <button
                              type="button"
                              onClick={() => handleSpeak(n.id, n.text + (n.description ? '. ' + n.description : ''))}
                              title={isSpeaking ? 'Stop listening' : 'Listen to notice audio'}
                              style={{
                                background: isSpeaking ? '#fef3c7' : '#f8fafc',
                                border: isSpeaking ? '1.5px solid #f59e0b' : '1px solid #e2e8f0',
                                color: isSpeaking ? '#b45309' : '#64748b',
                                padding: '6px 12px',
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 5
                              }}
                            >
                              {isSpeaking ? <VolumeX size={13} color="#b45309" /> : <Volume2 size={13} />}
                              <span>{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
                            </button>

                            {/* WhatsApp Share */}
                            <button
                              type="button"
                              onClick={() => handleShareWhatsapp(n)}
                              title="Share with classmates on WhatsApp"
                              style={{
                                background: '#f0fdf4',
                                border: '1px solid #bbf7d0',
                                color: '#15803d',
                                padding: '6px 12px',
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 5
                              }}
                            >
                              <Share2 size={13} /> WhatsApp
                            </button>

                            {/* Copy Anchor */}
                            <button
                              type="button"
                              onClick={() => handleCopyLink(n)}
                              title="Copy direct circular link"
                              style={{
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                color: '#64748b',
                                padding: '6px 10px',
                                borderRadius: 8,
                                fontSize: 11.5,
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              🔗 Copy Link
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Smart Pagination Component */}
            <PremiumPagination
              totalItems={filtered.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </main>

      {/* PDF Modal Preview */}
      {previewPdf && (
        <Suspense fallback={null}>
          <PDFModal
            url={previewPdf.url}
            title={previewPdf.title}
            onClose={() => setPreviewPdf(null)}
          />
        </Suspense>
      )}
    </div>
  );
}