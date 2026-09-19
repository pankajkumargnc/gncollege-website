// src/pages/NewsPage.jsx
import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS } from '../styles/colors';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';
import PremiumPagination from '../components/PremiumPagination';
import { Megaphone, Trophy, Newspaper, Building2 } from 'lucide-react';

const PDFModal = lazy(() => import('../components/PDFModal'));

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const CATEGORIES   = ['All', 'News', 'Achievement', 'Admission', 'Examination', 'Result', 'Placement', 'Sports', 'Scholarship', 'Update'];
const ITEMS_PER_PAGE = 12;

const TYPE_CONFIG = {
  News:        { label: 'News',        bg: '#EBF0FF', text: '#1a365d', border: '#BED0FF', dot: '#4a7fd4' },
  Achievement: { label: 'Achievement', bg: '#F0FFF4', text: '#1c4532', border: '#9AE6B4', dot: '#38a169' },
  Admission:   { label: 'Admission',   bg: '#FFF7ED', text: '#9A3412', border: '#FED7AA', dot: '#F97316' },
  Examination: { label: 'Examination', bg: '#FEF2F2', text: '#991B1B', border: '#FECACA', dot: '#EF4444' },
  Result:      { label: 'Result',      bg: '#FFF5F5', text: '#742a2a', border: '#FEB2B2', dot: '#e53e3e' },
  Placement:   { label: 'Placement',   bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE', dot: '#3B82F6' },
  Sports:      { label: 'Sports',      bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0', dot: '#10B981' },
  Scholarship: { label: 'Scholarship', bg: '#FAF5FF', text: '#44337a', border: '#E9D8FD', dot: '#805ad5' },
  Update:      { label: 'Update',      bg: '#FFFBEB', text: '#744210', border: '#FAF089', dot: '#d69e2e' },
};

// Press & Media Clippings data celebrating GNC's regional media presence
const PRESS_CLIPPINGS = [
  {
    id: 'pr-1',
    headline: 'गुरु नानक कॉलेज के छात्रों ने BBMKU यूथ फेस्टिवल में लहराया परचम, जीते कई ख़िताब',
    publication: 'प्रभात खबर (Prabhat Khabar)',
    date: '14 Nov 2025',
    edition: 'Dhanbad Edition',
    category: 'Youth Festival',
    image: '/images/slider_youth_winners.webp',
    snippet: 'बिनोद बिहारी महतो कोयलांचल विश्वविद्यालय (BBMKU) द्वारा आयोजित इंटर-कॉलेज यूथ फेस्टिवल में गुरु नानक कॉलेज धनबाद के छात्र-छात्राओं ने भांगड़ा, क्विज़, डिबेट और सुगम संगीत में प्रथम व द्वितीय स्थान प्राप्त कर कॉलेज का गौरव बढ़ाया। प्राचार्या व शासी निकाय ने दी बधाई।',
  },
  {
    id: 'pr-2',
    headline: 'गुरु नानक कॉलेज में राष्ट्रीय संगोष्ठी: "उच्च शिक्षा में राष्ट्रीय शिक्षा नीति 2020 का क्रियान्वयन"',
    publication: 'दैनिक जागरण (Dainik Jagran)',
    date: '28 Sep 2025',
    edition: 'Dhanbad Metro',
    category: 'Academic Seminar',
    image: '/images/slider_seminar.webp',
    snippet: 'IQAC द्वारा आयोजित एक दिवसीय नेशनल सेमिनार में विभिन्न विश्वविद्यालयों के शिक्षाविदों ने भाग लिया। तकनीकी सत्रों में शोधार्थियों ने बहुविषयक पाठ्यक्रमों के कौशल विकास और रोजगारोन्मुखी संभावनाओं पर विचार रखे।',
  },
  {
    id: 'pr-3',
    headline: 'गुरु नानक कॉलेज एनसीसी कैडेट्स ने चलाया पर्यावरण एवं स्वच्छता जागरूकता अभियान',
    publication: 'हिन्दुस्तान (Hindustan)',
    date: '05 Jun 2025',
    edition: 'Dhanbad Daily',
    category: 'NSS & NCC',
    image: '/images/slider_ncc.webp',
    snippet: 'विश्व पर्यावरण दिवस पर कॉलेज के 36 झारखंड बटालियन एनसीसी कैडेट्स और एनएसएस स्वयंसेवकों ने साइकिल रैली और पौधारोपण कर हरित परिसर का संकल्प लिया। शहर में प्लास्टिक मुक्ति की शपथ दिलाई गई।',
  },
  {
    id: 'pr-4',
    headline: 'गुरु नानक कॉलेज में भव्य बैसाखी व विरासत उत्सव संपन्न',
    publication: 'प्रभात खबर (Prabhat Khabar)',
    date: '14 Apr 2025',
    edition: 'Dhanbad Edition',
    category: 'Cultural Heritage',
    image: '/images/slider_baisakhi.webp',
    snippet: 'गुरु नानक कॉलेज भुदा परिसर में खालसा साजना दिवस व बैसाखी पर विशेष सांस्कृतिक कार्यक्रम आयोजित हुआ। कॉलेज प्रबंधक समिति के पदाधिकारियों ने गुरु साहिबान के सर्व-धर्म समभाव और सेवा संदेश को आत्मसात करने का आह्वान किया।',
  },
  {
    id: 'pr-5',
    headline: 'वार्षिक खेलकूद प्रतियोगिता: कॉमर्स व आईटी विभाग की टीमों का शानदार प्रदर्शन',
    publication: 'दैनिक भास्कर (Dainik Bhaskar)',
    date: '22 Feb 2025',
    edition: 'Dhanbad City',
    category: 'Sports Meet',
    image: '/images/slider_cricket.webp',
    snippet: 'कॉलेज मैदान पर आयोजित इंटर-डिपार्टमेंटल क्रिकेट व एथलेटिक्स टूर्नामेंट के फाइनल में बी.कॉम ने रोमांचक मुकाबले में जीत दर्ज की। विजेता खिलाड़ियों को कॉलेज प्रबंधन द्वारा मेडल व प्रशस्ति पत्र प्रदान किया गया।',
  },
  {
    id: 'pr-6',
    headline: 'जी-20 वसुधैव कुटुम्बकम संगोष्ठी व वाद-विवाद प्रतियोगिता में छात्रों ने प्रस्तुत किए विचार',
    publication: 'Hindustan Times (Ranchi & Dhanbad)',
    date: '18 Jan 2025',
    edition: 'Jharkhand Focus',
    category: 'Institutional',
    image: '/images/g20.webp',
    snippet: 'भारत के जी-20 नेतृत्व पर केंद्रित अंतर-महाविद्यालयी संगोष्ठी में वक्ताओं ने सतत विकास, हरित ऊर्जा और डिजिटल साक्षरता पर विद्यार्थियों की भूमिका को रेखांकित किया।',
  }
];

const getTS   = ts  => ts?.toDate ? ts.toDate() : new Date(ts || Date.now());
const fmtFull = ts  => { const d = getTS(ts); return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`; };
const clean   = html => DOMPurify.sanitize(html || '');

export default function NewsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [newsList, setNewsList] = useState([]);
  const [loading,  setLoading]  = useState(true);

  // Sync state with URL params
  const activeTab = searchParams.get('tab') || 'bulletins'; // 'bulletins' or 'press'
  const selCat    = searchParams.get('category') || 'All';
  const selYear   = searchParams.get('year') || 'All';
  const selMonth  = searchParams.get('month') || 'All';
  const search    = searchParams.get('q') || '';
  const view      = searchParams.get('view') || 'card'; // default card view

  const [currentPage, setCurrentPage] = useState(1);
  const [previewPdf, setPreviewPdf]   = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [speakingId, setSpeakingId]   = useState(null);

  const navy = COLORS.navy || '#0f2347';
  const gold = COLORS.gold || '#f4a023';

  // Helper to update URL params cleanly
  const updateParams = (newParams) => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([k, v]) => {
        if (!v || v === 'All') p.delete(k);
        else p.set(k, v);
      });
      return p;
    }, { replace: true });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setNewsList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => {
      setLoading(false);
    });
    return () => {
      unsub();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Audio text to speech handler
  const handleToggleSpeak = (id, rawHtml) => {
    if (!('speechSynthesis' in window)) {
      toast.error('Audio reader is not supported on this browser.');
      return;
    }
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawHtml || '';
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';
    if (!cleanText.trim()) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Share handlers
  const handleShareWhatsApp = (text, link) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text || '';
    const raw = tempDiv.textContent || tempDiv.innerText || 'College News Update';
    const msg = `📢 *Guru Nanak College News*\n\n${raw.slice(0, 180)}...\n\n🔗 ${link || window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleCopyLink = (n) => {
    const url = `${window.location.origin}/news?tab=bulletins&q=${encodeURIComponent(n.text?.slice(0, 25) || '')}`;
    navigator.clipboard.writeText(url);
    toast.success('News link copied to clipboard!');
  };

  const years = useMemo(() => {
    const s = new Set(newsList.map(n => getTS(n.createdAt).getFullYear()));
    return ['All', ...Array.from(s).sort((a, b) => b - a)];
  }, [newsList]);

  // Filtered Bulletins
  const filteredBulletins = useMemo(() => {
    setCurrentPage(1);
    return newsList.filter(n => {
      const d = getTS(n.createdAt);
      if (selYear  !== 'All' && d.getFullYear() !== Number(selYear))     return false;
      if (selMonth !== 'All' && MONTHS_SHORT[d.getMonth()] !== selMonth) return false;
      if (selCat   !== 'All' && (n.type || 'News').toLowerCase() !== selCat.toLowerCase()) return false;
      if (search) {
        const q = search.toLowerCase();
        const inText = n.text?.toLowerCase().includes(q);
        const inType = (n.type || '').toLowerCase().includes(q);
        if (!inText && !inType) return false;
      }
      return true;
    });
  }, [newsList, selYear, selMonth, selCat, search]);

  // Filtered Press Clippings
  const filteredPress = useMemo(() => {
    if (!search) return PRESS_CLIPPINGS;
    const q = search.toLowerCase();
    return PRESS_CLIPPINGS.filter(p =>
      p.headline.toLowerCase().includes(q) ||
      p.publication.toLowerCase().includes(q) ||
      p.snippet.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [search]);

  const paginatedBulletins = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBulletins.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBulletins, currentPage]);

  const groupedBulletins = useMemo(() => {
    const map = {};
    paginatedBulletins.forEach(n => {
      const d = getTS(n.createdAt);
      const k = `${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
      if (!map[k]) map[k] = [];
      map[k].push(n);
    });
    return map;
  }, [paginatedBulletins]);

  return (
    <div className="profile-page-wrapper">
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .ntf-btn-interactive {
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ntf-btn-interactive:hover {
          transform: translateY(-1px);
        }
        .ntf-card-hover {
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .ntf-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(15, 35, 71, 0.12) !important;
          border-color: ${gold} !important;
        }
        .tab-btn {
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 800;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 2px solid transparent;
        }
      `}</style>

      {/* Unified Hero Skeleton */}
      <div className="premium-hero">
        <div className="kinetic-bg" />
        <div className="hero-content-wrapper anim-fade-in">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244, 160, 35, 0.18)', border: '1px solid rgba(244, 160, 35, 0.4)', borderRadius: 20, padding: '4px 14px', marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: gold, fontWeight: 800, letterSpacing: 0.5 }}>MEDIA &amp; BULLETINS</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 900, letterSpacing: '-0.5px', margin: '0 0 10px' }}>
            News &amp; Media <span>Coverage</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 720, margin: '0 auto', fontSize: 15, opacity: 0.92, color: 'rgba(255,255,255,0.9)' }}>
            Live announcements, academic milestones, student achievements, and regional press media coverage of Guru Nanak College, Dhanbad.
          </p>
        </div>
      </div>

      {/* Top Statistical Overview Banner — Positioned cleanly below hero without overlapping */}
      <div style={{ maxWidth: '1120px', margin: '32px auto 24px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '18px 24px', boxShadow: '0 12px 36px rgba(15,35,71,0.09)', border: '1px solid #e2e8f0', display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
          {[
            { val: newsList.length, label: 'Official Bulletins', icon: Megaphone, color: '#1E40AF' },
            { val: newsList.filter(n => n.type === 'Achievement').length, label: 'Campus Achievements', icon: Trophy, color: '#047857' },
            { val: PRESS_CLIPPINGS.length, label: 'Press Media Features', icon: Newspaper, color: '#9333EA' },
            { val: years.length > 1 ? `${years.length - 1}+ Yrs` : 'Active', label: 'Archival Records', icon: Building2, color: '#D97706' },
          ].map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 170 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${stat.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconComp size={22} style={{ color: stat.color }} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: navy, lineHeight: 1.1 }}>{stat.val}</div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px 60px' }}>
        <main>
          {/* Dual Tab Navigation (Bulletins vs Press Clippings) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 26, flexWrap: 'wrap' }}>
            <button
              onClick={() => updateParams({ tab: 'bulletins', page: 1 })}
              className="tab-btn"
              style={{
                background: activeTab === 'bulletins' ? navy : '#fff',
                color: activeTab === 'bulletins' ? '#fff' : navy,
                borderColor: activeTab === 'bulletins' ? navy : '#e2e8f0',
                boxShadow: activeTab === 'bulletins' ? '0 6px 18px rgba(15,35,71,0.2)' : 'none',
              }}
            >
              <span>📢</span> Campus Bulletins &amp; Notices ({newsList.length})
            </button>
            <button
              onClick={() => updateParams({ tab: 'press', page: 1 })}
              className="tab-btn"
              style={{
                background: activeTab === 'press' ? navy : '#fff',
                color: activeTab === 'press' ? '#fff' : navy,
                borderColor: activeTab === 'press' ? navy : '#e2e8f0',
                boxShadow: activeTab === 'press' ? '0 6px 18px rgba(15,35,71,0.2)' : 'none',
              }}
            >
              <span>📰</span> Press &amp; Media Clippings ({PRESS_CLIPPINGS.length})
            </button>
          </div>

          {/* TAB 1: CAMPUS BULLETINS & ANNOUNCEMENTS */}
          {activeTab === 'bulletins' && (
            <div>
              {/* Filter Card */}
              <section style={{ background: '#fff', padding: '24px 28px', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: 28 }}>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
                  {/* Search Bar */}
                  <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: 16 }}>🔍</span>
                    <input
                      value={search}
                      onChange={e => updateParams({ q: e.target.value })}
                      placeholder="Search bulletins by keywords, exam, admission, sports..."
                      style={{
                        width: '100%',
                        padding: '11px 14px 11px 40px',
                        border: '2px solid #e2e8f0',
                        borderRadius: 10,
                        fontSize: 14,
                        fontFamily: 'inherit',
                        background: '#f8fafc',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = gold}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                    {search && (
                      <button
                        onClick={() => updateParams({ q: '' })}
                        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: 14, fontWeight: 800 }}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* View Switcher */}
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <button
                      className="ntf-btn-interactive"
                      onClick={() => updateParams({ view: 'card' })}
                      style={{
                        padding: '9px 14px',
                        borderRadius: 8,
                        border: `1.5px solid ${view === 'card' ? navy : '#e2e8f0'}`,
                        background: view === 'card' ? navy : '#fff',
                        color: view === 'card' ? '#fff' : '#64748b',
                        fontWeight: 700,
                        fontSize: 12.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <span>⊞</span> Cards
                    </button>
                    <button
                      className="ntf-btn-interactive"
                      onClick={() => updateParams({ view: 'list' })}
                      style={{
                        padding: '9px 14px',
                        borderRadius: 8,
                        border: `1.5px solid ${view === 'list' ? navy : '#e2e8f0'}`,
                        background: view === 'list' ? navy : '#fff',
                        color: view === 'list' ? '#fff' : '#64748b',
                        fontWeight: 700,
                        fontSize: 12.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <span>☰</span> List
                    </button>
                    <span style={{ background: '#f1f5f9', color: navy, borderRadius: 20, padding: '6px 14px', fontSize: 12.5, fontWeight: 800 }}>
                      {filteredBulletins.length} Items
                    </span>
                  </div>
                </div>

                {/* Category Pills */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8, flexShrink: 0 }}>
                    CATEGORY:
                  </span>
                  {CATEGORIES.map(c => {
                    const isSelected = (selCat === 'All' && c === 'All') || selCat.toLowerCase() === c.toLowerCase();
                    const cfg = TYPE_CONFIG[c] || { bg: '#f1f5f9', text: '#334155', border: '#e2e8f0' };
                    return (
                      <button
                        key={c}
                        onClick={() => updateParams({ category: c })}
                        className="ntf-btn-interactive"
                        style={{
                          padding: '6px 14px',
                          borderRadius: 20,
                          border: `1.5px solid ${isSelected ? (c === 'All' ? navy : cfg.border) : '#e2e8f0'}`,
                          background: isSelected ? (c === 'All' ? navy : cfg.bg) : '#fff',
                          color: isSelected ? (c === 'All' ? '#fff' : cfg.text) : '#64748b',
                          fontWeight: 700,
                          fontSize: 12,
                        }}
                      >
                        {c === 'All' ? 'All Updates' : cfg.label || c}
                      </button>
                    );
                  })}
                </div>

                {/* Year & Month Secondary Filters */}
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', paddingTop: 10, borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>YEAR:</span>
                    {years.map(y => (
                      <button
                        key={y}
                        onClick={() => updateParams({ year: String(y) })}
                        className="ntf-btn-interactive"
                        style={{
                          padding: '3px 10px',
                          borderRadius: 6,
                          border: `1px solid ${selYear === String(y) ? gold : '#e2e8f0'}`,
                          background: selYear === String(y) ? gold : 'transparent',
                          color: selYear === String(y) ? navy : '#64748b',
                          fontWeight: 700,
                          fontSize: 11.5,
                        }}
                      >
                        {y}
                      </button>
                    ))}
                  </div>

                  {(selCat !== 'All' || selYear !== 'All' || search) && (
                    <button
                      onClick={() => updateParams({ category: 'All', year: 'All', month: 'All', q: '' })}
                      className="ntf-btn-interactive"
                      style={{
                        padding: '3px 12px',
                        borderRadius: 6,
                        border: '1px solid #fca5a5',
                        background: '#fef2f2',
                        color: '#dc2626',
                        fontWeight: 700,
                        fontSize: 11.5,
                        marginLeft: 'auto',
                      }}
                    >
                      ✕ Reset Filters
                    </button>
                  )}
                </div>
              </section>

              {/* Feed Results */}
              <section>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16 }}>
                    <div style={{ width: 44, height: 44, border: `4px solid ${gold}`, borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 16px' }} />
                    <p style={{ color: '#64748b', fontWeight: 600 }}>Retrieving campus bulletins...</p>
                  </div>
                ) : filteredBulletins.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 44, marginBottom: 12 }}>🔍</div>
                    <h3 style={{ color: navy, fontWeight: 800, margin: '0 0 6px' }}>No Bulletins Match Your Criteria</h3>
                    <p style={{ color: '#64748b', fontSize: 14 }}>Try relaxing your search terms or clearing selected categories.</p>
                  </div>
                ) : view === 'card' ? (
                  /* CARD VIEW */
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
                    {paginatedBulletins.map(n => {
                      const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.News;
                      const dateStr = fmtFull(n.createdAt);
                      const isSpeaking = speakingId === n.id;
                      return (
                        <div
                          key={n.id}
                          className="ntf-card-hover"
                          style={{
                            background: '#fff',
                            borderRadius: 16,
                            overflow: 'hidden',
                            boxShadow: '0 4px 18px rgba(15,35,71,0.06)',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          {/* Card Header Strip */}
                          <div style={{ background: '#f8fafc', padding: '14px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}`, padding: '4px 11px', borderRadius: 20, fontSize: 11.5, fontWeight: 800 }}>
                              {cfg.label || n.type || 'News'}
                            </span>
                            <span style={{ color: '#64748b', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <span>📅</span> {dateStr}
                            </span>
                          </div>

                          {/* Body Text */}
                          <div style={{ padding: '18px 20px', flex: 1 }}>
                            <div
                              dangerouslySetInnerHTML={{ __html: clean(n.text) }}
                              style={{ fontSize: 14.5, color: '#1e293b', lineHeight: 1.65, fontWeight: 500 }}
                            />
                          </div>

                          {/* Card Footer Actions */}
                          <div style={{ background: '#fafbfc', padding: '12px 18px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                              {/* Audio Speak */}
                              <button
                                onClick={() => handleToggleSpeak(n.id, n.text)}
                                title={isSpeaking ? 'Stop reading' : 'Listen via voice reader'}
                                className="ntf-btn-interactive"
                                style={{
                                  padding: '6px 10px',
                                  borderRadius: 8,
                                  background: isSpeaking ? '#fee2e2' : '#f1f5f9',
                                  color: isSpeaking ? '#dc2626' : '#475569',
                                  border: '1px solid #e2e8f0',
                                  fontSize: 12,
                                  fontWeight: 700,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 4,
                                }}
                              >
                                {isSpeaking ? '⏹️ Stop' : '🔊 Listen'}
                              </button>

                              {/* WhatsApp Share */}
                              <button
                                onClick={() => handleShareWhatsApp(n.text, n.link)}
                                title="Share on WhatsApp"
                                className="ntf-btn-interactive"
                                style={{
                                  padding: '6px 10px',
                                  borderRadius: 8,
                                  background: '#f0fdf4',
                                  color: '#15803d',
                                  border: '1px solid #bbf7d0',
                                  fontSize: 12,
                                  fontWeight: 700,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 4,
                                }}
                              >
                                💬 Share
                              </button>

                              {/* Copy Link */}
                              <button
                                onClick={() => handleCopyLink(n)}
                                title="Copy permalink"
                                className="ntf-btn-interactive"
                                style={{
                                  padding: '6px 8px',
                                  borderRadius: 8,
                                  background: '#f8fafc',
                                  color: '#64748b',
                                  border: '1px solid #e2e8f0',
                                  fontSize: 12,
                                }}
                              >
                                🔗
                              </button>
                            </div>

                            {/* View Document Button */}
                            {n.link && (
                              <button
                                onClick={() => {
                                  if (n.link.includes('drive.google') || n.link.endsWith('.pdf') || n.link.includes('firebase')) {
                                    setPreviewPdf({ url: n.link, title: n.type || 'College Bulletin' });
                                  } else {
                                    window.open(n.link, '_blank');
                                  }
                                }}
                                className="ntf-btn-interactive"
                                style={{
                                  background: navy,
                                  color: '#fff',
                                  padding: '7px 14px',
                                  borderRadius: 8,
                                  fontSize: 12,
                                  fontWeight: 700,
                                  border: 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 5,
                                }}
                              >
                                <span>📄</span> View Attachment
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* LIST VIEW GROUPED BY MONTH */
                  <div style={{ background: '#fff', padding: '28px 32px', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                    {Object.entries(groupedBulletins).map(([monthYear, items]) => (
                      <div key={monthYear} style={{ marginBottom: 30 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                          <span style={{ background: navy, color: gold, padding: '5px 16px', borderRadius: 8, fontSize: 13, fontWeight: 900 }}>
                            📅 {monthYear}
                          </span>
                          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                          <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>
                            {items.length} announcement{items.length > 1 ? 's' : ''}
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          {items.map(n => {
                            const d = getTS(n.createdAt);
                            const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.News;
                            const isSpeaking = speakingId === n.id;
                            return (
                              <div
                                key={n.id}
                                style={{
                                  background: '#fff',
                                  borderRadius: 12,
                                  padding: '16px 20px',
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 16,
                                  borderLeft: `4px solid ${cfg.dot}`,
                                  border: '1px solid #edf2f7',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                                }}
                              >
                                {/* Date Column */}
                                <div style={{ textAlign: 'center', minWidth: 46, flexShrink: 0, paddingTop: 2 }}>
                                  <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
                                    {MONTHS_SHORT[d.getMonth()]}
                                  </div>
                                  <div style={{ fontSize: 24, fontWeight: 900, color: navy, lineHeight: 1.1 }}>
                                    {d.getDate()}
                                  </div>
                                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
                                    {d.getFullYear()}
                                  </div>
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                                    <span style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}`, padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>
                                      {cfg.label || n.type || 'News'}
                                    </span>
                                  </div>
                                  <div
                                    dangerouslySetInnerHTML={{ __html: clean(n.text) }}
                                    style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.6, fontWeight: 500 }}
                                  />
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                                  {n.link && (
                                    <button
                                      onClick={() => {
                                        if (n.link.includes('drive.google') || n.link.endsWith('.pdf') || n.link.includes('firebase')) {
                                          setPreviewPdf({ url: n.link, title: n.type || 'College Bulletin' });
                                        } else {
                                          window.open(n.link, '_blank');
                                        }
                                      }}
                                      className="ntf-btn-interactive"
                                      style={{
                                        background: navy,
                                        color: '#fff',
                                        padding: '6px 12px',
                                        borderRadius: 6,
                                        fontSize: 12,
                                        fontWeight: 700,
                                        border: 'none',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      📄 View PDF
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleToggleSpeak(n.id, n.text)}
                                    className="ntf-btn-interactive"
                                    style={{
                                      background: isSpeaking ? '#fee2e2' : '#f1f5f9',
                                      color: isSpeaking ? '#dc2626' : '#475569',
                                      padding: '5px 10px',
                                      borderRadius: 6,
                                      fontSize: 11.5,
                                      fontWeight: 700,
                                      border: '1px solid #e2e8f0',
                                    }}
                                  >
                                    {isSpeaking ? '⏹️ Stop' : '🔊 Listen'}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {!loading && filteredBulletins.length > ITEMS_PER_PAGE && (
                  <div style={{ marginTop: 28 }}>
                    <PremiumPagination
                      totalItems={filteredBulletins.length}
                      itemsPerPage={ITEMS_PER_PAGE}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                )}
              </section>
            </div>
          )}

          {/* TAB 2: PRESS & MEDIA CLIPPINGS */}
          {activeTab === 'press' && (
            <div>
              {/* Header Note */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: navy }}>
                    📰 Print &amp; Digital Media Coverage
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
                    Leading news dailies covering academic, sports, NSS/NCC, and youth festival milestones of Guru Nanak College, Dhanbad.
                  </p>
                </div>
                <span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 800 }}>
                  ✓ Verified Media Reports
                </span>
              </div>

              {/* Press Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
                {filteredPress.map(clip => (
                  <div
                    key={clip.id}
                    className="ntf-card-hover"
                    style={{
                      background: '#fff',
                      borderRadius: 16,
                      overflow: 'hidden',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 6px 20px rgba(15,35,71,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Image Preview / Clipping */}
                    <div
                      style={{ position: 'relative', height: 210, overflow: 'hidden', cursor: 'pointer', background: '#0f172a' }}
                      onClick={() => setPreviewImage(clip)}
                    >
                      <img
                        src={clip.image}
                        alt={clip.headline}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(15,35,71,0.85) 100%)' }} />
                      <span style={{ position: 'absolute', bottom: 12, left: 14, background: gold, color: navy, padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 900, textTransform: 'uppercase' }}>
                        {clip.category}
                      </span>
                      <span style={{ position: 'absolute', top: 12, right: 14, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, backdropFilter: 'blur(4px)' }}>
                        🔍 Click to Zoom
                      </span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <span style={{ color: '#dc2626', fontWeight: 800, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                          📰 {clip.publication}
                        </span>
                        <span style={{ color: '#94a3b8', fontSize: 11.5, fontWeight: 600 }}>
                          {clip.date} • {clip.edition}
                        </span>
                      </div>

                      <h4 style={{ margin: '0 0 10px', fontSize: 15.5, fontWeight: 800, color: navy, lineHeight: 1.45 }}>
                        {clip.headline}
                      </h4>

                      <p style={{ margin: 0, fontSize: 13.5, color: '#475569', lineHeight: 1.6, flex: 1 }}>
                        {clip.snippet}
                      </p>

                      <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button
                          onClick={() => setPreviewImage(clip)}
                          className="ntf-btn-interactive"
                          style={{
                            background: '#f1f5f9',
                            color: navy,
                            border: '1px solid #e2e8f0',
                            borderRadius: 8,
                            padding: '6px 14px',
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          🔍 Full View
                        </button>
                        <button
                          onClick={() => {
                            const text = `📰 *${clip.headline}*\nPublished in ${clip.publication} (${clip.date})\n\n${clip.snippet}\n\n🔗 ${window.location.origin}/news?tab=press`;
                            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="ntf-btn-interactive"
                          style={{
                            background: '#f0fdf4',
                            color: '#15803d',
                            border: '1px solid #bbf7d0',
                            borderRadius: 8,
                            padding: '6px 12px',
                            fontSize: 12,
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          💬 Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* PDF Modal */}
      {previewPdf && (
        <Suspense fallback={null}>
          <PDFModal url={previewPdf.url} title={previewPdf.title} onClose={() => setPreviewPdf(null)} />
        </Suspense>
      )}

      {/* Media Clipping Image Zoom Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(10, 20, 38, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 18,
              maxWidth: 860,
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ background: navy, color: '#fff', padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: 11, color: gold, fontWeight: 800, textTransform: 'uppercase' }}>
                  {previewImage.publication} • {previewImage.date}
                </span>
                <h4 style={{ margin: '4px 0 0', fontSize: 16, fontWeight: 800, color: '#fff' }}>
                  {previewImage.headline}
                </h4>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', fontSize: 16, fontWeight: 800 }}
              >
                ✕
              </button>
            </div>
            <div style={{ overflowY: 'auto', padding: 20, textAlign: 'center' }}>
              <img
                src={previewImage.image}
                alt={previewImage.headline}
                style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain', borderRadius: 10, border: '1px solid #e2e8f0' }}
              />
              <p style={{ marginTop: 14, fontSize: 14, color: '#334155', lineHeight: 1.7, textAlign: 'left' }}>
                {previewImage.snippet}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}