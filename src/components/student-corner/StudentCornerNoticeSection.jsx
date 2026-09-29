// src/components/student-corner/StudentCornerNoticeSection.jsx
// 🎓 Comprehensive Student Notice & Circulars Hub with 3 Selectable Styles:
// 1. 'feed'         -> Option 1: Live Interactive Stream with Category Tabs, Search & 3D Date Tiles
// 2. 'columns'      -> Option 2: 3-Column Dedicated Boards (Exams, Admissions, Events)
// 3. 'ticker_modal' -> Option 3: Live Breaking Ticker Bar + Quick Hub Modal

import React, { useState, useMemo, lazy, Suspense, useRef } from 'react';
import { 
  Bell, FileText, Calendar, GraduationCap, Award, ExternalLink, 
  Search, X, Share2, Sparkles, AlertCircle, ChevronRight, Eye, 
  Download, Layers, Trophy, Clock, Filter, ArrowRight, Volume2, 
  CheckCircle2, Radio
} from 'lucide-react';
import useAppData from '../../hooks/useAppData';
import { useDriveDocs } from '../../hooks/useDriveDocs';
import { COLORS } from '../../styles/colors';
import toast from 'react-hot-toast';

const PDFModal = lazy(() => import('../PDFModal'));

const N = COLORS.navy || '#0B1F3A';
const G = COLORS.gold || '#F4B942';

// ── Helpers ──
const parseDateObj = (raw) => {
  if (!raw) return { dateStr: 'Recent', day: '•', month: 'NEW', year: '2026', ts: Date.now() };
  let d;
  if (raw.toDate) d = raw.toDate();
  else if (raw.toMillis) d = new Date(raw.toMillis());
  else if (typeof raw === 'number') d = new Date(raw);
  else d = new Date(raw);

  if (isNaN(d.getTime())) return { dateStr: 'Recent', day: '•', month: 'NEW', year: '2026', ts: Date.now() };

  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const month = months[d.getMonth()];
  const day = String(d.getDate()).padStart(2, '0');
  const year = String(d.getFullYear());
  const dateStr = `${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'short' })} ${year}`;
  return { dateStr, day, month, year, ts: d.getTime() };
};

const cleanDocumentTitle = (rawName = '') => {
  if (!rawName) return 'Official College Circular';
  let clean = rawName.replace(/\.(pdf|docx?|xlsx?|png|jpe?g)$/i, '').trim();
  clean = clean.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

// ── Smart Category Detector ──
const detectNoticeCategory = (title = '', rawType = '', rawCategory = '') => {
  const cleanType = String(rawType || rawCategory || '').trim().toLowerCase();
  const lowerTitle = String(title || '').toLowerCase();
  const combined = `${lowerTitle} ${cleanType}`;
  
  if (cleanType === 'examination' || cleanType === 'exam') {
    return {
      key: 'exam',
      label: 'EXAMINATION',
      badgeBg: '#eff6ff',
      badgeColor: '#1d4ed8',
      border: '#bfdbfe',
      icon: GraduationCap
    };
  }

  if (combined.includes('urgent') || combined.includes('alert') || combined.includes('deadline') || combined.includes('postpone') || combined.includes('important')) {
    return {
      key: 'urgent',
      label: 'URGENT ALERT',
      badgeBg: '#fee2e2',
      badgeColor: '#dc2626',
      border: '#fca5a5',
      icon: AlertCircle
    };
  }
  if (combined.includes('exam') || combined.includes('semester') || combined.includes('admit') || combined.includes('routine') || combined.includes('practical') || combined.includes('viva') || combined.includes('mid-term') || combined.includes('midterm') || combined.includes('assessment') || combined.includes('cia') || combined.includes('examination')) {
    return {
      key: 'exam',
      label: 'EXAMINATION',
      badgeBg: '#eff6ff',
      badgeColor: '#1d4ed8',
      border: '#bfdbfe',
      icon: GraduationCap
    };
  }
  if (combined.includes('result') || combined.includes('tabulation') || combined.includes('marksheet') || combined.includes('score') || combined.includes('grade')) {
    return {
      key: 'result',
      label: 'RESULTS',
      badgeBg: '#f0fdf4',
      badgeColor: '#15803d',
      border: '#bbf7d0',
      icon: Award
    };
  }
  if (combined.includes('admission') || combined.includes('merit') || combined.includes('chancellor') || combined.includes('fyugp') || combined.includes('registration') || combined.includes('fee payment') || combined.includes('cuet')) {
    return {
      key: 'admission',
      label: 'ADMISSION & FEE',
      badgeBg: '#fff7ed',
      badgeColor: '#c2410c',
      border: '#fed7aa',
      icon: FileText
    };
  }
  if (combined.includes('event') || combined.includes('fest') || combined.includes('sports') || combined.includes('seminar') || combined.includes('workshop') || combined.includes('nss') || combined.includes('ncc') || combined.includes('cultural') || combined.includes('competition')) {
    return {
      key: 'event',
      label: 'CAMPUS EVENT',
      badgeBg: '#faf5ff',
      badgeColor: '#7e22ce',
      border: '#e9d5ff',
      icon: Trophy
    };
  }
  return {
    key: 'general',
    label: rawType ? rawType.toUpperCase() : 'OFFICIAL NOTICE',
    badgeBg: '#f1f5f9',
    badgeColor: '#334155',
    border: '#cbd5e1',
    icon: Bell
  };
};

export default function StudentCornerNoticeSection({ noticeStyle = 'feed' }) {
  const { notices: fbNotices, events: fbEvents, announcements: fbAnnouncements } = useAppData();
  const NOTICE_FOLDER_ID = import.meta.env.VITE_DRIVE_NOTICE_FOLDER;
  const { docs: driveNotices } = useDriveDocs(NOTICE_FOLDER_ID);

  // Active UI States
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewPdf, setPreviewPdf] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // For Option 3 modal hub
  const [visibleCount, setVisibleCount] = useState(6);

  // ── Unified Data Aggregator ──
  const unifiedNotices = useMemo(() => {
    const list = [];
    const now = Date.now();
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

    // 1. Process Firestore Notices
    (fbNotices || []).forEach(n => {
      if (n.status === 'draft' || n.status === 'archived') return;
      if (n.publishDate && new Date(n.publishDate).getTime() > now) return;
      if (n.expiryDate && new Date(n.expiryDate).getTime() < now) return;

      const dateMeta = parseDateObj(n.createdAt || n.publishDate);
      const cat = detectNoticeCategory(n.text, n.type, n.category);
      const isFresh = Boolean(n.isNew) || (now - dateMeta.ts < SEVEN_DAYS_MS);

      list.push({
        id: `fb_notice_${n.id}`,
        title: cleanDocumentTitle(n.text),
        rawTitle: n.text,
        link: n.link || '',
        category: cat.key,
        badgeLabel: cat.label,
        badgeBg: cat.badgeBg,
        badgeColor: cat.badgeColor,
        border: cat.border,
        icon: cat.icon,
        dateMeta,
        isNew: isFresh,
        isUrgent: cat.key === 'urgent' || Boolean(n.pinned),
        pinned: Boolean(n.pinned),
        source: 'Official Notice'
      });
    });

    // 2. Process Google Drive Notices
    (driveNotices || []).forEach(d => {
      const dateMeta = parseDateObj(d.rawDate || d.createdTime);
      const cat = detectNoticeCategory(d.name, 'Drive Notice');
      const isFresh = (now - dateMeta.ts < SEVEN_DAYS_MS);

      list.push({
        id: `dr_notice_${d.id}`,
        title: cleanDocumentTitle(d.name),
        rawTitle: d.name,
        link: d.previewUrl || d.webContentLink || '',
        category: cat.key,
        badgeLabel: cat.label,
        badgeBg: cat.badgeBg,
        badgeColor: cat.badgeColor,
        border: cat.border,
        icon: cat.icon,
        dateMeta,
        isNew: isFresh,
        isUrgent: cat.key === 'urgent',
        pinned: false,
        source: 'Drive Circular'
      });
    });

    // 3. Process Campus Events
    (fbEvents || []).forEach(ev => {
      const dateMeta = parseDateObj(ev.date || ev.createdAt);
      list.push({
        id: `fb_event_${ev.id}`,
        title: ev.title ? cleanDocumentTitle(ev.title) : 'Campus Event & Activity',
        rawTitle: ev.title || '',
        link: ev.reportPdf || ev.link || '',
        category: 'event',
        badgeLabel: 'CAMPUS EVENT',
        badgeBg: '#faf5ff',
        badgeColor: '#7e22ce',
        border: '#e9d5ff',
        icon: Trophy,
        dateMeta,
        isNew: (now - dateMeta.ts < SEVEN_DAYS_MS),
        isUrgent: false,
        pinned: false,
        source: 'Campus Event'
      });
    });

    // 4. Process Urgent Announcements
    (fbAnnouncements || []).forEach(ann => {
      const dateMeta = parseDateObj(ann.createdAt);
      list.push({
        id: `fb_ann_${ann.id}`,
        title: cleanDocumentTitle(ann.text || ann.title),
        rawTitle: ann.text || '',
        link: ann.link || '',
        category: 'urgent',
        badgeLabel: 'ALERT NOTICE',
        badgeBg: '#fee2e2',
        badgeColor: '#dc2626',
        border: '#fca5a5',
        icon: AlertCircle,
        dateMeta,
        isNew: true,
        isUrgent: true,
        pinned: true,
        source: 'Flash Alert'
      });
    });

    // Sort: Pinned first, then latest timestamp descending
    return list.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.dateMeta.ts - a.dateMeta.ts;
    });
  }, [fbNotices, driveNotices, fbEvents, fbAnnouncements]);

  // Tab Category Counts
  const counts = useMemo(() => {
    return {
      all: unifiedNotices.length,
      examAndResult: unifiedNotices.filter(n => n.category === 'exam' || n.category === 'result').length,
      admission: unifiedNotices.filter(n => n.category === 'admission').length,
      event: unifiedNotices.filter(n => n.category === 'event').length,
      urgent: unifiedNotices.filter(n => n.isUrgent || n.category === 'urgent').length
    };
  }, [unifiedNotices]);

  // Filtered List for Display
  const filteredNotices = useMemo(() => {
    return unifiedNotices.filter(n => {
      // Tab matching
      if (activeTab === 'exam' && n.category !== 'exam' && n.category !== 'result') return false;
      if (activeTab === 'admission' && n.category !== 'admission') return false;
      if (activeTab === 'event' && n.category !== 'event') return false;
      if (activeTab === 'urgent' && !n.isUrgent && n.category !== 'urgent') return false;

      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return n.title.toLowerCase().includes(q) || n.rawTitle.toLowerCase().includes(q) || n.badgeLabel.toLowerCase().includes(q);
      }
      return true;
    });
  }, [unifiedNotices, activeTab, searchQuery]);

  // Share Notice on WhatsApp
  const handleWhatsAppShare = (notice, e) => {
    e.stopPropagation();
    const url = notice.link || window.location.href;
    const msg = `📢 *Guru Nanak College, Dhanbad — Official Notice:*\n\n📌 *${notice.title}*\n🗓️ Date: ${notice.dateMeta.dateStr}\n🏷️ Category: ${notice.badgeLabel}\n\n🔗 View / Download Notice:\n${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
    toast.success('Sharing notice to WhatsApp...');
  };

  // Open Notice PDF / Link
  const handleOpenNotice = (notice) => {
    if (!notice.link) {
      toast('Notice circular has no attached document file.', { icon: 'ℹ️' });
      return;
    }
    const isPdf = notice.link.toLowerCase().includes('.pdf') || notice.link.toLowerCase().includes('drive.google.com') || notice.link.toLowerCase().includes('firebasestorage');
    if (isPdf) {
      setPreviewPdf({ url: notice.link, title: notice.title });
    } else {
      window.open(notice.link, '_blank', 'noopener,noreferrer');
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER OPTION 1: LIVE INTERACTIVE STREAM (FEED WITH TABS & SEARCH)
  // ═══════════════════════════════════════════════════════════════
  const renderFeedStyle = () => (
    <div style={{
      background: '#ffffff',
      borderRadius: 24,
      padding: 'clamp(24px, 4vw, 36px)',
      boxShadow: '0 8px 30px rgba(11, 31, 58, 0.05)',
      border: '1.5px solid #e2e8f0',
      marginBottom: 44,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative top strip */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: 'linear-gradient(90deg, #0B1F3A, #0284c7, #F4B942)'
      }} />

      {/* Header & Search */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 20,
        marginBottom: 24
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: 'rgba(2, 132, 199, 0.1)',
            color: '#0284c7',
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 11.5,
            fontWeight: 800,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            marginBottom: 8
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#0284c7',
              display: 'inline-block',
              animation: 'pulse 1.8s infinite'
            }} />
            Live Notice Board &amp; Circulars Stream
          </div>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 900, color: N, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
            Official Student Notices &amp; Announcements
          </h2>
          <p style={{ fontSize: 13.5, color: '#64748B', margin: 0, maxWidth: 680 }}>
            Unified real-time feed covering Semester Examinations, UG/PG Admissions, Merit Tabulations, and College Events.
          </p>
        </div>

        {/* Live Notice Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#F8FAFC',
          border: '1.5px solid #e2e8f0',
          borderRadius: 14,
          padding: '8px 14px',
          minWidth: 260,
          maxWidth: 320,
          width: '100%'
        }}>
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices (e.g. BCA, Sem 4, Fee)..."
            aria-label="Search Student Notices"
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: N,
              width: '100%',
              background: 'transparent',
              fontWeight: 600
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', color: '#94a3b8' }}
              aria-label="Clear Search"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: '1px solid #f1f5f9'
      }}>
        {[
          { id: 'all', label: 'All Notices', count: counts.all, icon: Layers },
          { id: 'exam', label: '🎓 Exams & Results', count: counts.examAndResult, icon: GraduationCap },
          { id: 'admission', label: '💳 Admissions & Fees', count: counts.admission, icon: FileText },
          { id: 'event', label: '🎉 Events & News', count: counts.event, icon: Trophy },
          { id: 'urgent', label: '🚨 Urgent Alerts', count: counts.urgent, icon: AlertCircle }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setVisibleCount(6); }}
            style={{
              padding: '7px 16px',
              borderRadius: 30,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: activeTab === tab.id ? '1px solid #0B1F3A' : '1px solid #e2e8f0',
              background: activeTab === tab.id ? '#0B1F3A' : '#ffffff',
              color: activeTab === tab.id ? '#ffffff' : '#475569',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(11,31,58,0.2)' : 'none'
            }}
          >
            <span>{tab.label}</span>
            <span style={{
              fontSize: 11,
              fontWeight: 800,
              padding: '1px 7px',
              borderRadius: 10,
              background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
              color: activeTab === tab.id ? '#ffffff' : '#64748B'
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notice Cards List */}
      {filteredNotices.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredNotices.slice(0, visibleCount).map((notice) => {
            const CatIcon = notice.icon;
            return (
              <div
                key={notice.id}
                onClick={() => handleOpenNotice(notice)}
                className="gnc-notice-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 18px',
                  borderRadius: 16,
                  border: '1.5px solid #f1f5f9',
                  background: '#ffffff',
                  transition: 'all 0.25s ease',
                  cursor: notice.link ? 'pointer' : 'default',
                  position: 'relative'
                }}
              >
                {/* 3D Calendar Date Tile */}
                <div style={{
                  width: 52,
                  height: 54,
                  borderRadius: 12,
                  background: 'linear-gradient(180deg, #0B1F3A 0%, #172554 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(11, 31, 58, 0.15)',
                  border: '1px solid rgba(244, 185, 66, 0.2)'
                }}>
                  <span style={{ fontSize: 9.5, fontWeight: 800, color: '#F4B942', letterSpacing: '0.5px' }}>
                    {notice.dateMeta.month}
                  </span>
                  <span style={{ fontSize: 17, fontWeight: 900, lineHeight: 1 }}>
                    {notice.dateMeta.day}
                  </span>
                </div>

                {/* Content Area */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: 10.5,
                      fontWeight: 800,
                      color: notice.badgeColor,
                      background: notice.badgeBg,
                      border: `1px solid ${notice.border}`,
                      padding: '2px 8px',
                      borderRadius: 6,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      <CatIcon size={11} /> {notice.badgeLabel}
                    </span>

                    {notice.isNew && (
                      <span style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#dc2626',
                        background: '#fee2e2',
                        border: '1px solid #fca5a5',
                        padding: '1px 6px',
                        borderRadius: 6,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3
                      }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#dc2626' }} /> NEW
                      </span>
                    )}

                    {notice.pinned && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#b45309', background: '#fef3c7', padding: '1px 6px', borderRadius: 6 }}>
                        📌 PINNED
                      </span>
                    )}

                    <span style={{ fontSize: 11.5, color: '#94a3b8' }}>
                      {notice.dateMeta.dateStr}
                    </span>
                  </div>

                  <div style={{
                    fontSize: 14.5,
                    fontWeight: 700,
                    color: N,
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {notice.title}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => handleWhatsAppShare(notice, e)}
                    title="Share notice to WhatsApp"
                    aria-label="Share notice to WhatsApp"
                    style={{
                      background: '#25D36615',
                      border: '1px solid #25D36630',
                      color: '#16a34a',
                      borderRadius: 10,
                      width: 34,
                      height: 34,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Share2 size={15} />
                  </button>

                  {notice.link ? (
                    <button
                      onClick={() => handleOpenNotice(notice)}
                      style={{
                        background: 'linear-gradient(135deg, #0B1F3A, #1e3a8a)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 10,
                        padding: '7px 14px',
                        fontSize: 12,
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 2px 8px rgba(11,31,58,0.2)'
                      }}
                    >
                      <Eye size={13} /> View Notice
                    </button>
                  ) : (
                    <span style={{ fontSize: 11.5, color: '#94a3b8', fontStyle: 'italic', paddingRight: 6 }}>
                      Circular
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Load More Button */}
          {filteredNotices.length > visibleCount && (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <button
                onClick={() => setVisibleCount(c => c + 6)}
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #cbd5e1',
                  color: N,
                  borderRadius: 12,
                  padding: '9px 24px',
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.2s ease'
                }}
              >
                Load More Notices ({filteredNotices.length - visibleCount} remaining) <ChevronRight size={15} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: '#f8fafc',
          borderRadius: 16,
          border: '1.5px dashed #cbd5e1'
        }}>
          <Bell size={32} color="#94a3b8" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 15, fontWeight: 800, color: N, marginBottom: 4 }}>
            No circulars match your current filter
          </div>
          <div style={{ fontSize: 13, color: '#64748B' }}>
            Try clearing search queries or switching category tabs.
          </div>
        </div>
      )}
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // RENDER OPTION 2: 3-COLUMN DEDICATED NOTICE BOARDS
  // ═══════════════════════════════════════════════════════════════
  const renderColumnsStyle = () => {
    const examNotices = unifiedNotices.filter(n => n.category === 'exam' || n.category === 'result').slice(0, 4);
    const admissionNotices = unifiedNotices.filter(n => n.category === 'admission').slice(0, 4);
    const eventAndGeneral = unifiedNotices.filter(n => n.category === 'event' || n.category === 'general' || n.category === 'urgent').slice(0, 4);

    const columns = [
      {
        id: 'exams',
        title: 'Examination & Results Board',
        subtitle: 'Schedules, admit cards, viva dates & marksheet tabulations',
        icon: GraduationCap,
        accent: '#0284c7',
        badge: `${examNotices.length} Updates`,
        items: examNotices
      },
      {
        id: 'admission',
        title: 'Admission & Enrollment Desk',
        subtitle: 'Merit lists, Chancellor portal alerts & fee payment notices',
        icon: FileText,
        accent: '#059669',
        badge: `${admissionNotices.length} Updates`,
        items: admissionNotices
      },
      {
        id: 'events',
        title: 'Campus Events & General Circulars',
        subtitle: 'Workshops, sports meets, NSS/NCC drives & official notices',
        icon: Trophy,
        accent: '#7c3aed',
        badge: `${eventAndGeneral.length} Updates`,
        items: eventAndGeneral
      }
    ];

    return (
      <div style={{ marginBottom: 48 }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(2, 132, 199, 0.1)',
            color: '#0284c7',
            padding: '4px 14px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            marginBottom: 8
          }}>
            <Sparkles size={13} /> Dedicated Notice Desks
          </div>
          <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 900, color: N, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
            Student Notification Boards
          </h2>
          <p style={{ fontSize: 14, color: '#64748B', margin: 0, maxWidth: 650, marginLeft: 'auto', marginRight: 'auto' }}>
            Direct access to dedicated notice columns for Examinations, Admissions, and Campus Events.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24
        }}>
          {columns.map(col => {
            const ColIcon = col.icon;
            return (
              <div
                key={col.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 20,
                  border: '1.5px solid #e2e8f0',
                  padding: 24,
                  boxShadow: '0 6px 24px rgba(11, 31, 58, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: col.accent }} />

                <div>
                  {/* Column Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `${col.accent}15`,
                      color: col.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <ColIcon size={20} />
                    </div>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 800,
                      background: `${col.accent}15`,
                      color: col.accent,
                      padding: '3px 10px',
                      borderRadius: 10
                    }}>
                      {col.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 18, fontWeight: 900, color: N, margin: '0 0 4px', lineHeight: 1.3 }}>
                    {col.title}
                  </h3>
                  <p style={{ fontSize: 12.5, color: '#64748B', margin: '0 0 18px', lineHeight: 1.4 }}>
                    {col.subtitle}
                  </p>

                  {/* List of 4 Notices */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {col.items.length > 0 ? (
                      col.items.map(item => (
                        <div
                          key={item.id}
                          onClick={() => handleOpenNotice(item)}
                          style={{
                            padding: '10px 12px',
                            borderRadius: 12,
                            background: '#F8FAFC',
                            border: '1px solid #f1f5f9',
                            cursor: item.link ? 'pointer' : 'default',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
                              {item.dateMeta.dateStr}
                            </span>
                            {item.isNew && (
                              <span style={{ fontSize: 9.5, fontWeight: 800, color: '#dc2626', background: '#fee2e2', padding: '1px 5px', borderRadius: 4 }}>
                                NEW
                              </span>
                            )}
                          </div>
                          <div style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: N,
                            lineHeight: 1.35,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {item.title}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: 12.5, color: '#94a3b8', textAlign: 'center', padding: '20px 0' }}>
                        No current notices in this desk.
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
                  <button
                    onClick={() => {
                      // Switch to feed mode or open full list
                      setActiveTab(col.id === 'exams' ? 'exam' : col.id === 'admission' ? 'admission' : 'event');
                      setModalOpen(true);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: col.accent,
                      fontSize: 12.5,
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: 0
                    }}
                  >
                    <span>Browse All in Notice Hub</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER OPTION 3: LIVE BREAKING TICKER & QUICK HUB MODAL
  // ═══════════════════════════════════════════════════════════════
  const renderTickerModalStyle = () => {
    const recentNotices = unifiedNotices.slice(0, 10);

    return (
      <div style={{ marginBottom: 36 }}>
        {/* Ticker Strip */}
        <div style={{
          background: 'linear-gradient(135deg, #0B1F3A 0%, #172554 100%)',
          borderRadius: 16,
          padding: '12px 18px',
          boxShadow: '0 8px 24px rgba(11, 31, 58, 0.15)',
          border: '1px solid rgba(244, 185, 66, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          overflow: 'hidden'
        }}>
          {/* Pulsing Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#f87171',
            padding: '5px 12px',
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            flexShrink: 0
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#ef4444',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite'
            }} />
            Live Alerts
          </div>

          {/* Marquee / Cycling Text */}
          <div style={{
            flex: 1,
            overflow: 'hidden',
            position: 'relative',
            whiteSpace: 'nowrap'
          }}>
            <div style={{
              display: 'inline-flex',
              gap: 36,
              animation: 'gncTicker 38s linear infinite'
            }}>
              {recentNotices.map((n, idx) => (
                <span
                  key={idx}
                  onClick={() => handleOpenNotice(n)}
                  style={{
                    color: '#ffffff',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <span style={{
                    fontSize: 10,
                    fontWeight: 800,
                    background: n.badgeBg,
                    color: n.badgeColor,
                    padding: '1px 6px',
                    borderRadius: 4
                  }}>
                    {n.badgeLabel}
                  </span>
                  <span>{n.title}</span>
                  <span style={{ color: '#F4B942', fontSize: 11 }}>({n.dateMeta.dateStr})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Hub Trigger Button */}
          <button
            onClick={() => setModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #F4B942 0%, #E5A729 100%)',
              color: '#0B1F3A',
              border: 'none',
              borderRadius: 10,
              padding: '7px 14px',
              fontSize: 12,
              fontWeight: 800,
              cursor: 'pointer',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 8px rgba(244, 185, 66, 0.3)'
            }}
          >
            <span>Notice Hub ({unifiedNotices.length})</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // POPUP MODAL HUB (Used for Option 3 or "Browse All" trigger)
  // ═══════════════════════════════════════════════════════════════
  const renderNoticeHubModal = () => {
    if (!modalOpen) return null;

    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(11, 31, 58, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: 24,
          width: '100%',
          maxWidth: 900,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden'
        }}>
          {/* Modal Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0B1F3A 0%, #172554 100%)',
            color: '#ffffff',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(244, 185, 66, 0.3)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Bell size={18} color="#F4B942" />
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  Student Notice &amp; Circulars Hub
                </h3>
              </div>
              <p style={{ fontSize: 12.5, color: '#cbd5e1', margin: 0 }}>
                Showing all official notices, exam schedules, admissions, and campus events.
              </p>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#ffffff',
                width: 32,
                height: 32,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Controls Bar */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
            background: '#F8FAFC'
          }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All' },
                { id: 'exam', label: 'Exams' },
                { id: 'admission', label: 'Admissions' },
                { id: 'event', label: 'Events' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: activeTab === t.id ? '1px solid #0B1F3A' : '1px solid #cbd5e1',
                    background: activeTab === t.id ? '#0B1F3A' : '#ffffff',
                    color: activeTab === t.id ? '#ffffff' : '#475569'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: 10,
              padding: '6px 12px',
              maxWidth: 240,
              width: '100%'
            }}>
              <Search size={14} color="#94a3b8" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{ border: 'none', outline: 'none', fontSize: 12, width: '100%' }}
              />
            </div>
          </div>

          {/* Modal Content Scroll */}
          <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredNotices.map(notice => (
              <div
                key={notice.id}
                onClick={() => {
                  setModalOpen(false);
                  handleOpenNotice(notice);
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: 14,
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  cursor: notice.link ? 'pointer' : 'default'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: notice.badgeColor,
                      background: notice.badgeBg,
                      padding: '1px 6px',
                      borderRadius: 4
                    }}>
                      {notice.badgeLabel}
                    </span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>
                      {notice.dateMeta.dateStr}
                    </span>
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: N }}>
                    {notice.title}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={(e) => handleWhatsAppShare(notice, e)}
                    style={{
                      background: '#25D36615',
                      border: 'none',
                      color: '#16a34a',
                      borderRadius: 8,
                      width: 30,
                      height: 30,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Share2 size={13} />
                  </button>
                  {notice.link && (
                    <button
                      onClick={() => {
                        setModalOpen(false);
                        handleOpenNotice(notice);
                      }}
                      style={{
                        background: '#0B1F3A',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '6px 12px',
                        fontSize: 11.5,
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}
                    >
                      <Eye size={12} /> View
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @keyframes gncTicker {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .gnc-notice-row:hover {
          border-color: #0284c7 !important;
          box-shadow: 0 8px 24px rgba(2, 132, 199, 0.12) !important;
          transform: translateY(-2px);
        }
      `}</style>

      {/* Render the admin-selected style */}
      {noticeStyle === 'columns' && renderColumnsStyle()}
      {noticeStyle === 'ticker_modal' && renderTickerModalStyle()}
      {noticeStyle === 'feed' && renderFeedStyle()}

      {/* Quick Notice Hub Modal (for Option 3 or when triggered) */}
      {renderNoticeHubModal()}

      {/* 1-Click PDF Viewer Modal */}
      {previewPdf && (
        <Suspense fallback={null}>
          <PDFModal
            url={previewPdf.url}
            title={previewPdf.title}
            onClose={() => setPreviewPdf(null)}
          />
        </Suspense>
      )}
    </>
  );
}
