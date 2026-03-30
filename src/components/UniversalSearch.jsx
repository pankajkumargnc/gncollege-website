// src/components/UniversalSearch.jsx — Ctrl+K Command Palette
// 🎨 @UI_Agent — Premium search overlay with keyboard navigation

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../styles/colors';

const N = COLORS.navy;
const G = COLORS.gold;

// All searchable pages
const SEARCH_ITEMS = [
  { title: 'Home', path: '/', icon: '🏠', category: 'Pages' },
  { title: 'College Profile', path: '/about-us/college-profile', icon: '🏫', category: 'About' },
  { title: 'Vision & Mission', path: '/about-us/vision-mission', icon: '🎯', category: 'About' },
  { title: "Principal's Message", path: '/about-us/principal-message', icon: '👨‍🏫', category: 'About' },
  { title: 'Governing Body', path: '/about-us/governing-body', icon: '👥', category: 'About' },
  { title: 'Staff Council', path: '/about-us/staff-council', icon: '📋', category: 'About' },
  { title: 'Organogram', path: '/about-us/college-management/organogram', icon: '📊', category: 'About' },
  { title: 'Presidents', path: '/about-us/college-management/presidents', icon: '👔', category: 'About' },
  { title: 'Secretaries', path: '/about-us/college-management/secretaries', icon: '📝', category: 'About' },
  { title: 'Principals', path: '/about-us/college-management/principal', icon: '🎓', category: 'About' },
  { title: "Women's Cell", path: '/about-us/various-committees/womens-cell', icon: '👩‍💼', category: 'Committees' },
  { title: 'Anti Ragging', path: '/about-us/various-committees/anti-ragging', icon: '🛡️', category: 'Committees' },
  { title: 'SC/ST Cell', path: '/about-us/various-committees/sc-st', icon: '⚖️', category: 'Committees' },
  { title: 'OBC Cell', path: '/about-us/various-committees/obc', icon: '📑', category: 'Committees' },
  { title: 'Grievance Cell', path: '/about-us/various-committees/grievance', icon: '📢', category: 'Committees' },
  { title: 'ICC', path: '/about-us/various-committees/icc', icon: '🏛️', category: 'Committees' },
  { title: 'Minority Cell', path: '/about-us/various-committees/minority', icon: '🤝', category: 'Committees' },
  { title: 'Placement Cell', path: '/about-us/various-committees/placement', icon: '💼', category: 'Committees' },
  { title: 'RUSA', path: '/about-us/various-committees/rusa', icon: '🏗️', category: 'Committees' },
  { title: 'Teaching Staff', path: '/about-us/college-staff/teaching-staff', icon: '👨‍🏫', category: 'Staff' },
  { title: 'Non-Teaching Staff', path: '/about-us/college-staff/non-teaching-staff', icon: '👨‍💻', category: 'Staff' },
  { title: 'IQAC', path: '/academics/iqac', icon: '✅', category: 'Academics' },
  { title: 'Course Offered', path: '/academics/course-offered', icon: '📚', category: 'Academics' },
  { title: 'Departments', path: '/academics/departments', icon: '🏛️', category: 'Academics' },
  { title: 'Humanities', path: '/academics/departments/humanities', icon: '📖', category: 'Departments' },
  { title: 'Commerce', path: '/academics/departments/commerce', icon: '💰', category: 'Departments' },
  { title: 'BCA', path: '/academics/departments/bca', icon: '💻', category: 'Departments' },
  { title: 'BBA', path: '/academics/departments/bba', icon: '📈', category: 'Departments' },
  { title: 'Syllabus', path: '/syllabus', icon: '📋', category: 'Academics' },
  { title: 'Academic Calendar', path: '/academics/academic-calendar', icon: '📅', category: 'Academics' },
  { title: 'Admission Rules', path: '/admission/rule', icon: '📌', category: 'Admission' },
  { title: 'Documents Required', path: '/admission/document-required', icon: '📄', category: 'Admission' },
  { title: 'Fee Structure', path: '/admission/fee-structure', icon: '💳', category: 'Admission' },
  { title: 'Intake Capacity', path: '/admission/intake-capacity', icon: '📊', category: 'Admission' },
  { title: 'Latest Notifications', path: '/admission/notification/latest', icon: '🔔', category: 'Admission' },
  { title: 'Upcoming Notifications', path: '/admission/notification/upcoming', icon: '📢', category: 'Admission' },
  { title: 'NSS', path: '/activity/nss', icon: '🌿', category: 'Activity' },
  { title: 'NCC', path: '/activity/ncc', icon: '🎖️', category: 'Activity' },
  { title: 'Workshop', path: '/activity/workshop', icon: '🔧', category: 'Activity' },
  { title: 'Games & Sports', path: '/activity/games-sports', icon: '🏅', category: 'Activity' },
  { title: 'NAAC AQAR', path: '/naac/aqar', icon: '📊', category: 'NAAC' },
  { title: 'NAAC NIRF', path: '/naac/nirf', icon: '🏆', category: 'NAAC' },
  { title: 'SSR Cycle 1', path: '/naac/ssr-1st-cycle/cycle-1-documents', icon: '📁', category: 'NAAC' },
  { title: 'SSR Cycle 2', path: '/naac/ssr-2nd-cycle/cycle-2-documents', icon: '📁', category: 'NAAC' },
  { title: 'Photo Gallery', path: '/gallery/photos', icon: '📸', category: 'Gallery' },
  { title: 'Video Gallery', path: '/gallery/videos', icon: '🎬', category: 'Gallery' },
  { title: 'Events', path: '/events', icon: '📅', category: 'Pages' },
  { title: 'News', path: '/news', icon: '📰', category: 'Pages' },
  { title: 'Notifications', path: '/notifications', icon: '🔔', category: 'Pages' },
  { title: 'Documents', path: '/documents', icon: '📄', category: 'Pages' },
  { title: 'Contact Us', path: '/contact', icon: '📞', category: 'Pages' },
  { title: 'College Library', path: '/publication/college-library', icon: '📚', category: 'Publication' },
  { title: 'E-Magazine', path: '/publication/e-magazine', icon: '📰', category: 'Publication' },
  { title: 'Infrastructure', path: '/campus/infrastructure', icon: '🏗️', category: 'Campus' },
  { title: 'Classrooms', path: '/campus/classroom', icon: '🏫', category: 'Campus' },
  { title: 'ICT Rooms', path: '/campus/ict-rooms', icon: '💻', category: 'Campus' },
  { title: 'Green Campus', path: '/campus/green-campus', icon: '🌳', category: 'Campus' },
  // External links
  { title: 'Exam Results (BBMKU)', path: 'https://bbmkuniv.in/login', icon: '📋', category: 'Quick Links', external: true },
  { title: 'Fee Payment Portal', path: 'https://cimsstudentnewui.mastersofterp.in/', icon: '💳', category: 'Quick Links', external: true },
  { title: 'Apply for Admission', path: 'https://jharkhanduniversities.nic.in/', icon: '🎓', category: 'Quick Links', external: true },
];

const CSS = `
.us-overlay{position:fixed;inset:0;z-index:99999;background:rgba(15,35,71,.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:flex-start;justify-content:center;padding-top:min(15vh,120px);animation:us-fadeIn .15s ease;}
@keyframes us-fadeIn{from{opacity:0}to{opacity:1}}
.us-modal{width:min(600px,92vw);background:#fff;border-radius:20px;box-shadow:0 25px 60px rgba(0,0,0,.35);overflow:hidden;animation:us-slideDown .2s cubic-bezier(.22,1,.36,1);}
@keyframes us-slideDown{from{opacity:0;transform:translateY(-20px) scale(.97)}to{opacity:1;transform:none}}
.us-input-wrap{display:flex;align-items:center;gap:12px;padding:18px 22px;border-bottom:1.5px solid #eef2f7;}
.us-icon{font-size:20px;color:${N};opacity:.5;}
.us-input{flex:1;border:none;outline:none;font-size:17px;font-family:'Inter',sans-serif;font-weight:500;color:#1e293b;background:transparent;}
.us-input::placeholder{color:#94a3b8;}
.us-kbd{background:#f1f5f9;color:#64748b;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;font-family:'Inter',monospace;border:1px solid #e2e8f0;}
.us-results{max-height:min(420px,55vh);overflow-y:auto;padding:8px;}
.us-results::-webkit-scrollbar{width:5px;}
.us-results::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px;}
.us-cat{padding:8px 14px 4px;font-size:10px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;}
.us-item{display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:12px;cursor:pointer;transition:background .12s,transform .12s;}
.us-item:hover,.us-item.active{background:${N};color:#fff;transform:scale(1.01);}
.us-item:hover .us-item-path,.us-item.active .us-item-path{color:rgba(255,255,255,.5);}
.us-item:hover .us-item-icon,.us-item.active .us-item-icon{background:rgba(255,255,255,.15);}
.us-item-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:#f1f5f9;flex-shrink:0;transition:background .12s;}
.us-item-text{flex:1;min-width:0;}
.us-item-title{font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.us-item-path{font-size:11px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .12s;}
.us-item-ext{font-size:10px;color:${G};font-weight:800;margin-left:auto;flex-shrink:0;}
.us-footer{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;border-top:1.5px solid #eef2f7;background:#f8fafc;}
.us-footer-hint{display:flex;align-items:center;gap:10px;font-size:11px;color:#94a3b8;font-weight:600;}
.us-footer-hint .us-kbd{margin:0 2px;}
.us-empty{padding:48px 20px;text-align:center;}
.us-empty-icon{font-size:48px;margin-bottom:12px;display:block;opacity:.4;}
.us-empty-text{color:#94a3b8;font-size:14px;}
`;

export default function UniversalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  // Filter results
  const filtered = useMemo(() => {
    if (!query.trim()) return SEARCH_ITEMS;
    const q = query.toLowerCase().trim();
    return SEARCH_ITEMS.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.category.toLowerCase().includes(q) ||
      item.path.toLowerCase().includes(q)
    );
  }, [query]);

  // Group by category
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filtered]);

  // Flat list for keyboard navigation
  const flatList = useMemo(() => {
    const items = [];
    Object.values(grouped).forEach(group => items.push(...group));
    return items;
  }, [grouped]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector('.us-item.active');
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  const handleSelect = useCallback((item) => {
    onClose();
    if (item.external) {
      window.open(item.path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.path);
    }
  }, [navigate, onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, flatList.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flatList[activeIndex]) {
      e.preventDefault();
      handleSelect(flatList[activeIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [flatList, activeIndex, handleSelect, onClose]);

  // Reset active index when filtered changes
  useEffect(() => { setActiveIndex(0); }, [filtered]);

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <>
      <style>{CSS}</style>
      <div className="us-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search pages">
        <div className="us-modal" onClick={e => e.stopPropagation()}>
          <div className="us-input-wrap">
            <span className="us-icon">🔍</span>
            <input
              ref={inputRef}
              className="us-input"
              type="text"
              placeholder="Search pages, departments, documents..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck="false"
            />
            <span className="us-kbd" style={{ cursor: 'pointer' }} onClick={onClose}>ESC</span>
          </div>

          <div className="us-results" ref={listRef}>
            {flatList.length === 0 ? (
              <div className="us-empty">
                <span className="us-empty-icon">🔍</span>
                <div className="us-empty-text">No results for "{query}"</div>
              </div>
            ) : (
              Object.entries(grouped).map(([cat, items]) => (
                <div key={cat}>
                  <div className="us-cat">{cat}</div>
                  {items.map(item => {
                    flatIndex++;
                    const idx = flatIndex;
                    return (
                      <div
                        key={item.path}
                        className={`us-item${idx === activeIndex ? ' active' : ''}`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                      >
                        <div className="us-item-icon">{item.icon}</div>
                        <div className="us-item-text">
                          <div className="us-item-title">{item.title}</div>
                          <div className="us-item-path">{item.path}</div>
                        </div>
                        {item.external && <span className="us-item-ext">↗ External</span>}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          <div className="us-footer">
            <div className="us-footer-hint">
              <span><span className="us-kbd">↑↓</span> Navigate</span>
              <span><span className="us-kbd">↵</span> Open</span>
              <span><span className="us-kbd">ESC</span> Close</span>
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>
              {flatList.length} results
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
