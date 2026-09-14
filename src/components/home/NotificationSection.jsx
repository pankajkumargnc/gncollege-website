// src/components/home/NotificationSection.jsx — Interactive, Dynamic Campus Notices & News Hub
import React, { useRef, useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { COLORS } from '../../styles/colors';
import { useDriveDocs } from '../../hooks/useDriveDocs';

const PDFModal = lazy(() => import('../PDFModal'));

const N = COLORS.navy || '#0f2347';
const G = COLORS.gold || '#f4a023';

const parseDateTile = (dateVal) => {
  if (!dateVal) return { month: 'NEW', day: '•' };
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return { month: 'DOC', day: '•' };
    const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = d.getDate().toString().padStart(2, '0');
    return { month, day };
  } catch {
    return { month: 'DOC', day: '•' };
  }
};

const getCategoryStyle = (type = '', text = '') => {
  const combined = `${type} ${text}`.toLowerCase();
  if (combined.includes('urgent') || combined.includes('alert') || combined.includes('last date') || combined.includes('deadline')) {
    return { bg: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: 'rgba(239, 68, 68, 0.25)', label: '🚨 URGENT' };
  }
  if (combined.includes('exam') || combined.includes('semester') || combined.includes('practical') || combined.includes('viva')) {
    return { bg: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', border: 'rgba(37, 99, 235, 0.25)', label: '🎓 EXAM' };
  }
  if (combined.includes('result') || combined.includes('merit') || combined.includes('marksheet')) {
    return { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669', border: 'rgba(16, 185, 129, 0.25)', label: '📊 RESULT' };
  }
  if (combined.includes('admission') || combined.includes('form') || combined.includes('fee')) {
    return { bg: 'rgba(245, 158, 11, 0.1)', color: '#d97706', border: 'rgba(245, 158, 11, 0.25)', label: '💳 ADMISSION' };
  }
  if (combined.includes('event') || combined.includes('cultural') || combined.includes('fest') || combined.includes('sports')) {
    return { bg: 'rgba(147, 51, 234, 0.1)', color: '#7c3aed', border: 'rgba(147, 51, 234, 0.25)', label: '🎉 EVENT' };
  }
  if (combined.includes('holiday') || combined.includes('closure') || combined.includes('closed')) {
    return { bg: 'rgba(234, 88, 12, 0.1)', color: '#ea580c', border: 'rgba(234, 88, 12, 0.25)', label: '🏖️ HOLIDAY' };
  }
  return { bg: 'rgba(15, 35, 71, 0.06)', color: N, border: 'rgba(15, 35, 71, 0.15)', label: type ? type.toUpperCase() : 'NOTICE' };
};

const cleanDocumentTitle = (rawName = '') => {
  if (!rawName) return 'Official Document';
  // 1. Strip file extensions
  let clean = rawName.replace(/\.(pdf|docx?|xlsx?|png|jpe?g)$/i, '').trim();
  // 2. Normalize hyphens and underscores
  clean = clean.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  // 3. Convert shorthand e.g. "doc3" -> "College Document 03"
  if (/^doc\s*(\d+)$/i.test(clean)) {
    const num = clean.match(/\d+/)[0];
    return `College Document ${num.padStart(2, '0')}`;
  }
  // 4. Proper Title Case preserving academic acronyms
  const ACRONYMS = ['FYUGP', 'BCA', 'BBA', 'NAAC', 'IQAC', 'CBCS', 'NEP', 'UG', 'PG', 'NSS', 'NCC', 'III', 'IV', 'VI', 'II', 'I', 'V', 'B.A', 'B.COM'];
  return clean
    .split(' ')
    .map(word => {
      const upper = word.toUpperCase();
      if (ACRONYMS.includes(upper)) return upper;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

const detectDocCategory = (title = '') => {
  const t = title.toLowerCase();
  if (t.includes('exam') || t.includes('semester') || t.includes('practical') || t.includes('routine')) return 'Exam Routine';
  if (t.includes('result') || t.includes('marksheet') || t.includes('merit')) return 'Exam Result';
  if (t.includes('naac') || t.includes('ssr') || t.includes('iqac')) return 'NAAC Report';
  if (t.includes('regulation') || t.includes('syllabus') || t.includes('cbcs')) return 'Regulation';
  if (t.includes('admission') || t.includes('fee')) return 'Admission Doc';
  if (t.includes('audit') || t.includes('financial')) return 'Audit Report';
  return 'Official Circular';
};

const DEFAULT_CAMPUS_NOTICES = [
  {
    id: 'd-not-1',
    text: 'Online Admission Form Submission for UG (B.A / B.Com / BCA / BBA) Session 2025-2029 is now open.',
    date: new Date().toISOString(),
    type: 'Admission',
    isNew: true,
    link: '#/admission/rule'
  },
  {
    id: 'd-not-2',
    text: 'Schedule for Semester-IV & VI Internal Assessment & Project Report Submission.',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    type: 'Exam',
    isNew: true,
    link: '#/publication/examination-results/2024'
  },
  {
    id: 'd-not-3',
    text: 'Publication of Merit List for Vocational Courses (BCA & BBA) Phase-II.',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    type: 'Result',
    isNew: false,
    link: '#/publication/examination-results/2024'
  },
  {
    id: 'd-not-4',
    text: 'Instructions regarding Semester End Examination Form fill-up and Fee clearance.',
    date: new Date(Date.now() - 86400000 * 8).toISOString(),
    type: 'Exam',
    isNew: false
  },
  {
    id: 'd-not-5',
    text: 'Notice regarding distribution of Original Degree Certificates & Migration Certificates.',
    date: new Date(Date.now() - 86400000 * 12).toISOString(),
    type: 'General',
    isNew: false
  }
];

const DEFAULT_CAMPUS_NEWS = [
  {
    id: 'd-news-1',
    text: 'Guru Nanak College organizes National Seminar on Digital Transformation & AI in Higher Education.',
    date: new Date().toISOString(),
    type: 'Event',
    isNew: true,
    link: '#/activity/workshop'
  },
  {
    id: 'd-news-2',
    text: 'Annual Sports Meet & Inter-Department Badminton Tournament 2025 successfully concluded.',
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    type: 'Event',
    isNew: true,
    link: '#/activity/games-sports'
  },
  {
    id: 'd-news-3',
    text: 'NSS Wing organizes Special Cleanliness Drive & Tree Plantation Campaign across campus.',
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    type: 'NSS',
    isNew: false,
    link: '#/activity/nss'
  },
  {
    id: 'd-news-4',
    text: 'College signs MoU with Industry Partners for Student Internships and Placement Training.',
    date: new Date(Date.now() - 86400000 * 11).toISOString(),
    type: 'News',
    isNew: false,
    link: '#/about-us/various-committees/placement'
  }
];

const NotificationSection = ({ notices = [], announcements = [], pdfReports = [], upcomingEvents = [] }) => {
  const noticesRef    = useRef(null);
  const newsRef       = useRef(null);
  const pdfRef        = useRef(null);
  const noticesRafRef = useRef(null);
  const newsRafRef    = useRef(null);
  const pdfRafRef     = useRef(null);

  const [previewPdf, setPreviewPdf] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState('ALL');
  const [isPaused, setIsPaused] = useState(false);
  const [mobileTab, setMobileTab] = useState('notices'); // 'notices' | 'news' | 'docs'

  const { docs: driveDocs, loading: driveLoading } = useDriveDocs(
    import.meta.env.VITE_DRIVE_DOCUMENT_FOLDER
  );

  // 1. Process Raw Data Collections
  const allNotices = useMemo(() => {
    const raw = (notices && notices.length > 0) ? notices : DEFAULT_CAMPUS_NOTICES;
    return raw.map(n => ({
      ...n,
      text: n.text || n.title || '',
      date: n.createdAt?.toDate?.() || n.date,
      type: n.type || 'Notice',
      isNew: n.isNew || (n.date && (new Date() - new Date(n.date)) / 86400000 < 7)
    }));
  }, [notices]);

  const allNews = useMemo(() => {
    const upcoming = (upcomingEvents || []).map(e => ({
      ...e,
      text: e.title || e.text || '',
      date: e.createdAt?.toDate?.() || e.date,
      type: e.type || 'Event',
      isNew: (e.createdAt?.toDate?.() || e.date) ? (new Date() - new Date(e.createdAt?.toDate?.() || e.date)) / 86400000 < 7 : false
    }));
    const news = (announcements || []).map(a => ({
      ...a,
      text: a.title || a.text || '',
      date: a.createdAt?.toDate?.() || a.date,
      type: a.type || 'News',
      isNew: a.isNew || (a.date && (new Date() - new Date(a.date)) / 86400000 < 7)
    }));
    const combined = [...upcoming, ...news];
    const source = combined.length > 0 ? combined : DEFAULT_CAMPUS_NEWS;
    return [...source].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [upcomingEvents, announcements]);

  const allDocs = useMemo(() => {
    const driveFormatted = (driveDocs || []).map(d => {
      const cleanTitle = cleanDocumentTitle(d.name);
      const cat = detectDocCategory(cleanTitle);
      return {
        id: `drive_${d.id}`,
        text: cleanTitle,
        title: cleanTitle,
        link: d.previewUrl,
        downloadUrl: d.downloadUrl,
        date: d.date,
        type: cat,
        source: 'drive',
        isNew: false
      };
    });
    const fbFormatted = (pdfReports || []).map(p => ({
      ...p,
      text: p.title || p.text || '',
      title: p.title || p.text || '',
      link: p.link || p.pdfUrl,
      date: p.createdAt?.toDate?.() || p.date,
      type: p.type || 'Document',
      source: 'firebase',
      isNew: p.isNew || (p.date && (new Date() - new Date(p.date)) / 86400000 < 10)
    }));
    return [...driveFormatted, ...fbFormatted].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [driveDocs, pdfReports]);

  // 2. Real-Time Search & Category Filtering
  const filterList = (list) => {
    return list.filter(item => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery = !q || 
        (item.text && item.text.toLowerCase().includes(q)) || 
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.type && item.type.toLowerCase().includes(q));

      if (!matchesQuery) return false;

      if (activeChip === 'URGENT') {
        const str = `${item.text} ${item.type}`.toLowerCase();
        return item.isNew || str.includes('urgent') || str.includes('alert') || str.includes('last date');
      }
      if (activeChip === 'EXAM') {
        const str = `${item.text} ${item.type}`.toLowerCase();
        return str.includes('exam') || str.includes('semester') || str.includes('admit') || str.includes('practical');
      }
      if (activeChip === 'RESULT') {
        const str = `${item.text} ${item.type}`.toLowerCase();
        return str.includes('result') || str.includes('merit') || str.includes('marks');
      }
      if (activeChip === 'DOCS') {
        return Boolean(item.link || item.pdfUrl || item.source === 'drive');
      }

      return true;
    });
  };

  const filteredNotices = useMemo(() => filterList(allNotices), [allNotices, searchQuery, activeChip]);
  const filteredNews    = useMemo(() => filterList(allNews), [allNews, searchQuery, activeChip]);
  const filteredDocs    = useMemo(() => filterList(allDocs), [allDocs, searchQuery, activeChip]);

  // Check if filtering is active (disable auto-scroll when user is searching to allow calm reading)
  const isFiltering = searchQuery.trim().length > 0 || activeChip !== 'ALL';

  const doubledNotices = useMemo(() => {
    if (isFiltering || filteredNotices.length <= 3) return filteredNotices;
    return [...filteredNotices, ...filteredNotices];
  }, [filteredNotices, isFiltering]);

  const doubledNews = useMemo(() => {
    if (isFiltering || filteredNews.length <= 3) return filteredNews;
    return [...filteredNews, ...filteredNews];
  }, [filteredNews, isFiltering]);

  const doubledDocs = useMemo(() => {
    if (isFiltering || filteredDocs.length <= 3) return filteredDocs;
    return [...filteredDocs, ...filteredDocs];
  }, [filteredDocs, isFiltering]);

  // 3. Smooth Auto-Scroll Engine with Play/Pause & Hover Stop
  const startScrolling = (ref, rafRef) => {
    const el = ref.current;
    if (!el || isPaused || isFiltering) return;
    let pos = 0;
    const animate = () => {
      pos -= 0.65;
      if (pos < -el.scrollHeight / 2) pos = 0;
      el.style.transform = `translateY(${pos}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  const stopScrolling = (rafRef) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  useEffect(() => {
    const el = noticesRef.current;
    if (!el || isPaused || isFiltering) {
      if (el) el.style.transform = 'none';
      stopScrolling(noticesRafRef);
      return;
    }
    const onEnter = () => stopScrolling(noticesRafRef);
    const onLeave = () => startScrolling(noticesRef, noticesRafRef);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    startScrolling(noticesRef, noticesRafRef);
    return () => {
      stopScrolling(noticesRafRef);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [doubledNotices, isPaused, isFiltering]);

  useEffect(() => {
    const el = newsRef.current;
    if (!el || isPaused || isFiltering) {
      if (el) el.style.transform = 'none';
      stopScrolling(newsRafRef);
      return;
    }
    const onEnter = () => stopScrolling(newsRafRef);
    const onLeave = () => startScrolling(newsRef, newsRafRef);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    startScrolling(newsRef, newsRafRef);
    return () => {
      stopScrolling(newsRafRef);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [doubledNews, isPaused, isFiltering]);

  useEffect(() => {
    const el = pdfRef.current;
    if (!el || isPaused || isFiltering) {
      if (el) el.style.transform = 'none';
      stopScrolling(pdfRafRef);
      return;
    }
    const onEnter = () => stopScrolling(pdfRafRef);
    const onLeave = () => startScrolling(pdfRef, pdfRafRef);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    startScrolling(pdfRef, pdfRafRef);
    return () => {
      stopScrolling(pdfRafRef);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [doubledDocs, isPaused, isFiltering]);

  return (
    <section className="ns-root" id="notifications">
      <style>{`
        /* ══════════════════════════════════════════════════════════ */
        /* ██  CAMPUS NOTICES & NEWS — NEXT-GEN INTERACTIVE HUB   ██ */
        /* ══════════════════════════════════════════════════════════ */

        .ns-root {
          padding: clamp(50px, 8vw, 100px) clamp(16px, 3vw, 36px);
          background: radial-gradient(circle at 10% 15%, rgba(244,160,35,0.06) 0%, transparent 45%),
                      radial-gradient(circle at 90% 85%, rgba(15,35,71,0.05) 0%, transparent 45%),
                      #f8fafc;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .ns-inner {
          max-width: 1380px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* ── SECTION HEADER ── */
        .ns-heading-wrap {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 30px;
        }

        .ns-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(15,35,71,0.06);
          border: 1px solid rgba(15,35,71,0.14);
          color: ${N};
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 99px;
          margin-bottom: 12px;
        }

        .ns-main-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(26px, 4vw, 42px);
          font-weight: 900;
          color: ${N};
          line-height: 1.15;
          margin: 0 0 10px;
          letter-spacing: -1px;
        }

        .ns-main-title span {
          background: linear-gradient(135deg, #f4a023, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ns-sub-desc {
          font-size: clamp(13px, 1.1vw, 15.5px);
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }

        /* ── INTERACTIVE SEARCH & FILTER CONTROLS BAR ── */
        .ns-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: #ffffff;
          padding: 8px 14px;
          border-radius: 20px;
          border: 1.5px solid rgba(15,35,71,0.08);
          box-shadow: 0 8px 24px rgba(15,35,71,0.04);
          margin-bottom: 35px;
          flex-wrap: wrap;
        }

        .ns-search-input-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f1f5f9;
          padding: 6px 14px;
          border-radius: 12px;
          flex: 1;
          min-width: 220px;
          max-width: 400px;
          border: 1px solid transparent;
          transition: all 0.25s ease;
        }

        .ns-search-input-box:focus-within {
          background: #ffffff;
          border-color: ${G};
          box-shadow: 0 0 0 3px rgba(244,160,35,0.15);
        }

        .ns-search-input-box input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13px;
          color: ${N};
          width: 100%;
          font-family: inherit;
        }

        .ns-chip-list {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .ns-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .ns-chip:hover {
          border-color: ${N};
          color: ${N};
        }

        .ns-chip.active {
          background: ${N};
          color: #ffffff;
          border-color: ${N};
          box-shadow: 0 3px 10px rgba(15,35,71,0.2);
        }

        .ns-motion-toggle {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          background: transparent;
          border: 1px solid #e2e8f0;
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-left: auto;
        }

        .ns-motion-toggle:hover {
          color: ${N};
          border-color: ${N};
        }

        /* ── MOBILE SEGMENTED TABS (SAVES 1000px SCROLL ON PHONES) ── */
        .ns-mobile-tabs {
          display: none;
          background: #ffffff;
          padding: 4px;
          border-radius: 16px;
          border: 1.5px solid rgba(15,35,71,0.08);
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          margin-bottom: 20px;
          gap: 4px;
        }

        .ns-mob-tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 8px;
          font-size: 12px;
          font-weight: 800;
          border: none;
          background: transparent;
          color: #64748b;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ns-mob-tab-btn.active {
          background: ${N};
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(15,35,71,0.2);
        }

        .ns-mob-count {
          background: rgba(255,255,255,0.25);
          font-size: 10px;
          padding: 1px 6px;
          border-radius: 99px;
          line-height: 1.2;
        }

        /* ── CARDS 3-COLUMN GRID ── */
        .ns-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(18px, 2.5vw, 36px);
        }

        .ns-card {
          background: #ffffff;
          border-radius: 28px;
          overflow: hidden;
          height: 560px;
          display: flex;
          flex-direction: column;
          border: 1.5px solid rgba(15,35,71,0.08);
          box-shadow: 0 10px 35px rgba(15, 35, 71, 0.04);
          transition: transform 0.35s cubic-bezier(0.2, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.2, 1, 0.3, 1),
                      border-color 0.25s ease;
          position: relative;
        }

        .ns-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 55px rgba(15, 35, 71, 0.1);
          border-color: rgba(244,160,35,0.4);
        }

        /* ── CARD HEADERS WITH LIVE PULSE ── */
        .ns-header {
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ffffff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .ns-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ns-header-title {
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.2px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ns-header-badge {
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.3);
          font-size: 10px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 99px;
          letter-spacing: 0.5px;
        }

        .nh-notice { background: linear-gradient(135deg, #0f2347 0%, #1e3a8a 100%); }
        .nh-news   { background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%); }
        .nh-docs   { background: linear-gradient(135deg, #065f46 0%, #059669 100%); }

        /* ── CARD BODY (SCROLL CONTAINER) ── */
        .ns-body {
          flex: 1;
          padding: 10px 18px;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to bottom, black 84%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 84%, transparent 100%);
        }

        .ns-scroll-track {
          will-change: transform;
        }

        /* ── ITEM CARD WITH CALENDAR TILE ── */
        .ns-item {
          padding: 14px 12px;
          border-bottom: 1px solid #f1f5f9;
          border-radius: 16px;
          margin-bottom: 6px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          transition: all 0.22s ease;
          background: transparent;
        }

        .ns-item:hover {
          background: #f8fafc;
          box-shadow: 0 4px 14px rgba(15,35,71,0.04);
          transform: translateX(3px);
        }

        /* 3D Modern Date Tile */
        .ns-date-tile {
          width: 44px;
          min-width: 44px;
          height: 46px;
          border-radius: 11px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0,0,0,0.03);
          transition: all 0.22s ease;
          margin-top: 2px;
        }

        .ns-date-month {
          font-size: 8px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          background: ${N};
          color: #ffffff;
          width: 100%;
          text-align: center;
          padding: 1px 0;
          line-height: 1.2;
        }

        .ns-date-day {
          font-size: 15px;
          font-weight: 900;
          color: ${N};
          line-height: 1.2;
        }

        .ns-item:hover .ns-date-tile {
          border-color: ${G};
          box-shadow: 0 4px 10px rgba(244,160,35,0.25);
        }

        .ns-item:hover .ns-date-month {
          background: ${G};
          color: #000000;
        }

        /* Item Content — STRICT LEFT ALIGN */
        .ns-item-content {
          flex: 1;
          min-width: 0;
          text-align: left !important;
        }

        .ns-item-tags {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 6px;
          margin-bottom: 5px;
          flex-wrap: wrap;
          text-align: left !important;
        }

        .ns-badge-type {
          font-size: 9.5px;
          font-weight: 800;
          padding: 1.5px 7px;
          border-radius: 5px;
          letter-spacing: 0.3px;
          border: 1px solid transparent;
          line-height: 1.3;
          text-align: left !important;
        }

        .ns-badge-new {
          font-size: 9px;
          font-weight: 900;
          color: #dc2626;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 1.5px 6px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          animation: pulseRed 2s infinite ease-in-out;
        }

        @keyframes pulseRed {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.04); }
        }

        /* Notice Text, Headline / Text, and Document Title — Explicit Left Align */
        .ns-title,
        .ns-title *,
        h3.ns-title,
        h3.ns-title * {
          text-align: left !important;
        }

        .ns-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.45;
          margin: 0 0 6px 0;
          word-break: break-word;
          text-align: left !important;
          display: block;
        }

        .ns-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
          text-align: left !important;
          display: block;
        }

        .ns-title a:hover {
          color: ${G};
        }

        .ns-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          gap: 5px;
          font-size: 11.5px;
          font-weight: 800;
          color: ${G};
          text-decoration: none;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: transform 0.2s ease, color 0.2s ease;
          text-align: left !important;
        }

        .ns-action-btn:hover {
          transform: translateX(3px);
          color: ${N};
        }

        /* ── CARD FOOTER ── */
        .ns-footer {
          padding: 14px 20px;
          background: #ffffff;
          border-top: 1px solid #f1f5f9;
        }

        .ns-all-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 11px;
          border-radius: 14px;
          background: #f8fafc;
          color: ${N};
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          border: 1.5px solid #e2e8f0;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-sizing: border-box;
        }

        .ns-all-btn:hover {
          background: ${N};
          color: #ffffff;
          border-color: ${N};
          box-shadow: 0 6px 18px rgba(15,35,71,0.2);
          transform: translateY(-1px);
        }

        /* ── EMPTY STATE ── */
        .ns-empty-msg {
          text-align: center;
          padding: 60px 20px;
          color: #94a3b8;
          font-size: 13px;
        }

        /* ── DARK MODE STYLING ── */
        [data-theme="dark"] .ns-root {
          background: #060e1c;
        }
        [data-theme="dark"] .ns-card,
        [data-theme="dark"] .ns-controls-bar,
        [data-theme="dark"] .ns-footer,
        [data-theme="dark"] .ns-mobile-tabs {
          background: #091322;
          border-color: rgba(255,255,255,0.09);
        }
        [data-theme="dark"] .ns-title {
          color: #f1f5f9;
        }
        [data-theme="dark"] .ns-all-btn {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.1);
          color: #f1f5f9;
        }
        [data-theme="dark"] .ns-date-tile {
          background: #0f1c33;
          border-color: #1e2e4a;
        }
        [data-theme="dark"] .ns-date-day {
          color: #f1f5f9;
        }

        /* ══════════════════════════════════════════════════ */
        /* ██  RESPONSIVE BREAKPOINTS                      ██ */
        /* ══════════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .ns-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .ns-mobile-tabs {
            display: flex; /* Activate Segmented Control */
          }
          .ns-grid {
            grid-template-columns: 1fr;
          }
          .ns-card {
            height: 480px;
          }
          /* Show only active tab card on mobile */
          .ns-card.mob-hidden {
            display: none !important;
          }
          .ns-controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .ns-search-input-box {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="ns-inner">

        {/* ── SECTION HEADING ── */}
        <div className="ns-heading-wrap">
          <div className="ns-pill-badge">📢 Stay Updated</div>
          <h2 className="ns-main-title">Campus <span>Notices & News</span></h2>
          <p className="ns-sub-desc">
            Late-breaking news, announcements, and crucial notifications, always at your fingertips.
          </p>
        </div>

        {/* ── REAL-TIME SEARCH & FILTER BAR ── */}
        <div className="ns-controls-bar">
          <div className="ns-search-input-box">
            <span style={{ fontSize: 14 }}>🔍</span>
            <input 
              type="text" 
              placeholder="Filter by keyword (e.g. Exam, BBA, Fee, Holiday)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter notices"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 12 }}
                aria-label="Clear filter"
              >✕</button>
            )}
          </div>

          {/* Quick Filter Chips */}
          <div className="ns-chip-list">
            {[
              { id: 'ALL', label: 'All Updates' },
              { id: 'URGENT', label: '🚨 Urgent / New' },
              { id: 'EXAM', label: '🎓 Exams' },
              { id: 'RESULT', label: '📊 Results' },
              { id: 'DOCS', label: '📁 PDFs' },
            ].map(chip => (
              <button
                key={chip.id}
                className={`ns-chip ${activeChip === chip.id ? 'active' : ''}`}
                onClick={() => setActiveChip(chip.id)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Auto-Scroll Motion Toggle */}
          <button 
            className="ns-motion-toggle"
            onClick={() => setIsPaused(p => !p)}
            title={isPaused ? "Resume Auto-Scroll" : "Pause Auto-Scroll"}
          >
            <span>{isPaused ? '▶' : '⏸'}</span>
            <span>{isPaused ? 'Scroll Paused' : 'Auto-Scroll'}</span>
          </button>
        </div>

        {/* ── MOBILE SEGMENTED CONTROL TABS (Saves 1000px Vertical Scroll on Phones) ── */}
        <div className="ns-mobile-tabs" role="tablist">
          <button 
            role="tab" 
            aria-selected={mobileTab === 'notices'}
            className={`ns-mob-tab-btn ${mobileTab === 'notices' ? 'active' : ''}`}
            onClick={() => setMobileTab('notices')}
          >
            <span>📄 Notices</span>
            <span className="ns-mob-count">{filteredNotices.length}</span>
          </button>
          <button 
            role="tab" 
            aria-selected={mobileTab === 'news'}
            className={`ns-mob-tab-btn ${mobileTab === 'news' ? 'active' : ''}`}
            onClick={() => setMobileTab('news')}
          >
            <span>🔥 News & Events</span>
            <span className="ns-mob-count">{filteredNews.length}</span>
          </button>
          <button 
            role="tab" 
            aria-selected={mobileTab === 'docs'}
            className={`ns-mob-tab-btn ${mobileTab === 'docs' ? 'active' : ''}`}
            onClick={() => setMobileTab('docs')}
          >
            <span>📁 E-Docs</span>
            <span className="ns-mob-count">{filteredDocs.length}</span>
          </button>
        </div>

        {/* ── 3-COLUMN NOTIFICATION CARDS ── */}
        <div className="ns-grid">

          {/* ══ 1. NOTICES CARD ══ */}
          <div className={`ns-card ${mobileTab !== 'notices' ? 'mob-hidden' : ''}`}>
            <div className="ns-header nh-notice">
              <div className="ns-header-left">
                <span style={{ fontSize: 20 }}>📄</span>
                <span className="ns-header-title">Campus Notices</span>
              </div>
              <span className="ns-header-badge">{filteredNotices.length} Active</span>
            </div>

            <div className="ns-body">
              {filteredNotices.length === 0 ? (
                <div className="ns-empty-msg">No notices match your filter.</div>
              ) : (
                <div ref={noticesRef} className="ns-scroll-track">
                  {doubledNotices.map((n, i) => {
                    const { month, day } = parseDateTile(n.date);
                    const cat = getCategoryStyle(n.type, n.text);
                    return (
                      <div key={i} className="ns-item">
                        <div className="ns-date-tile" aria-hidden="true">
                          <span className="ns-date-month">{month}</span>
                          <span className="ns-date-day">{day}</span>
                        </div>

                        <div className="ns-item-content">
                          <div className="ns-item-tags">
                            <span 
                              className="ns-badge-type" 
                              style={{ background: cat.bg, color: cat.color, borderColor: cat.border }}
                            >
                              {cat.label}
                            </span>
                            {n.isNew && (
                              <span className="ns-badge-new">
                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#dc2626' }} />
                                NEW
                              </span>
                            )}
                          </div>

                          <h3 className="ns-title">
                            {n.link ? (
                              <a 
                                href={n.link} 
                                target="_blank" 
                                rel="noreferrer"
                                onClick={(e) => {
                                  if (n.link.endsWith('.pdf')) {
                                    e.preventDefault();
                                    setPreviewPdf({ url: n.link, title: n.text });
                                  }
                                }}
                              >
                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(n.text || '') }} />
                              </a>
                            ) : (
                              <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(n.text || '') }} />
                            )}
                          </h3>

                          {n.link && (
                            <button
                              className="ns-action-btn"
                              onClick={() => setPreviewPdf({ url: n.link, title: n.text })}
                            >
                              <span>View Circular</span>
                              <span aria-hidden="true">→</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="ns-footer">
              <Link to="/notifications" className="ns-all-btn">
                <span>View All Notices</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* ══ 2. NEWS & EVENTS CARD ══ */}
          <div className={`ns-card ${mobileTab !== 'news' ? 'mob-hidden' : ''}`}>
            <div className="ns-header nh-news">
              <div className="ns-header-left">
                <span style={{ fontSize: 20 }}>🔥</span>
                <span className="ns-header-title">News & Events</span>
              </div>
              <span className="ns-header-badge">{filteredNews.length} Updates</span>
            </div>

            <div className="ns-body">
              {filteredNews.length === 0 ? (
                <div className="ns-empty-msg">No news matches your filter.</div>
              ) : (
                <div ref={newsRef} className="ns-scroll-track">
                  {doubledNews.map((n, i) => {
                    const { month, day } = parseDateTile(n.date);
                    const cat = getCategoryStyle(n.type, n.text);
                    return (
                      <div key={i} className="ns-item">
                        <div className="ns-date-tile" aria-hidden="true">
                          <span className="ns-date-month">{month}</span>
                          <span className="ns-date-day">{day}</span>
                        </div>

                        <div className="ns-item-content">
                          <div className="ns-item-tags">
                            <span 
                              className="ns-badge-type" 
                              style={{ background: cat.bg, color: cat.color, borderColor: cat.border }}
                            >
                              {cat.label}
                            </span>
                            {n.isNew && (
                              <span className="ns-badge-new">
                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#dc2626' }} />
                                NEW
                              </span>
                            )}
                          </div>

                          <h3 className="ns-title">
                            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(n.text || n.title || '') }} />
                          </h3>

                          {n.link ? (
                            <a href={n.link} target="_blank" rel="noreferrer" className="ns-action-btn">
                              <span>Read Story</span>
                              <span aria-hidden="true">→</span>
                            </a>
                          ) : (
                            <Link to="/news" className="ns-action-btn">
                              <span>Read Story</span>
                              <span aria-hidden="true">→</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="ns-footer">
              <Link to="/news" className="ns-all-btn">
                <span>Explore All News</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* ══ 3. E-DOCUMENTS & REPORTS CARD ══ */}
          <div className={`ns-card ${mobileTab !== 'docs' ? 'mob-hidden' : ''}`}>
            <div className="ns-header nh-docs">
              <div className="ns-header-left">
                <span style={{ fontSize: 20 }}>📁</span>
                <span className="ns-header-title">E-Documents</span>
              </div>
              <span className="ns-header-badge">
                {driveLoading ? 'Syncing...' : `${filteredDocs.length} Docs`}
              </span>
            </div>

            <div className="ns-body">
              {filteredDocs.length === 0 ? (
                <div className="ns-empty-msg">No documents match your filter.</div>
              ) : (
                <div ref={pdfRef} className="ns-scroll-track">
                  {doubledDocs.map((n, i) => {
                    const { month, day } = parseDateTile(n.date);
                    return (
                      <div key={i} className="ns-item">
                        <div className="ns-date-tile" aria-hidden="true">
                          <span className="ns-date-month">{month}</span>
                          <span className="ns-date-day">{day}</span>
                        </div>

                        <div className="ns-item-content">
                          <div className="ns-item-tags">
                            <span 
                              className="ns-badge-type" 
                              style={{ 
                                background: 'rgba(5, 150, 105, 0.1)', 
                                color: '#059669', 
                                border: '1px solid rgba(5, 150, 105, 0.25)' 
                              }}
                            >
                              {n.source === 'drive' ? '☁️ DRIVE PDF' : '📄 OFFICIAL'}
                            </span>
                          </div>

                          <h3 className="ns-title">{n.text || n.title}</h3>

                          {n.link && (
                            <button 
                              className="ns-action-btn"
                              onClick={() => setPreviewPdf({ url: n.link, title: n.text || n.title })}
                            >
                              <span>Preview Document</span>
                              <span aria-hidden="true">→</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="ns-footer">
              <Link to="/documents" className="ns-all-btn">
                <span>Doc Archive</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── IN-APP PDF MODAL PREVIEW ── */}
      {previewPdf && (
        <Suspense fallback={null}>
          <PDFModal
            url={previewPdf.url}
            title={previewPdf.title}
            onClose={() => setPreviewPdf(null)}
          />
        </Suspense>
      )}
    </section>
  );
};

export default NotificationSection;