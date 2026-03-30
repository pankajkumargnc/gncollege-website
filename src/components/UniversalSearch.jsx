// src/components/UniversalSearch.jsx — Premium AI-Powered Command Palette
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../styles/colors';

const N = COLORS.navy;
const G = COLORS.gold;

export default function UniversalSearch({ 
  isOpen, onClose, 
  notices = [], 
  faculties = [], 
  pages = [],
  gallery = []
}) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  // ── Combine & Filter All Searchable Data ──
  const flatResults = useMemo(() => {
    const items = [
      // 1. Static Core Pages
      { title: 'Home', path: '/', icon: '🏠', cat: 'Navigation' },
      { title: 'About GNC', path: '/about-us/college-profile', icon: '🏫', cat: 'Navigation' },
      { title: 'Admissions', path: '/admission/rule', icon: '🎓', cat: 'Navigation' },
      { title: 'Departments', path: '/academics/departments', icon: '🏛️', cat: 'Navigation' },
      { title: 'Photo Gallery', path: '/gallery/photos', icon: '📸', cat: 'Navigation' },
      
      // 2. Dynamic Faculties
      ...(faculties || []).map(f => ({
        title: f.name,
        sub: (f.designation || 'Faculty') + (f.department ? ' - ' + f.department : ''),
        path: '/about-us/college-staff/teaching-staff',
        img: f.image || 'images/staff_placeholder.webp',
        cat: 'Faculty & Staff'
      })),

      // 3. Dynamic Notices
      ...(notices || []).map(n => ({
        title: n.text,
        sub: n.date,
        path: n.link || '/notifications',
        icon: '🔔',
        cat: 'Latest Notices'
      })),

      // 4. Custom Pages from CMS
      ...(pages || []).map(p => ({
        title: p.title,
        sub: 'Institutional Page',
        path: `/p/${p.slug}`,
        icon: '📄',
        cat: 'Institutional Content'
      })),

      // 5. Gallery Items
      ...(gallery || []).map(g => ({
        title: g.title,
        path: '/gallery/photos',
        img: g.image,
        cat: 'Media Gallery'
      }))
    ];

    if (!query.trim()) return items.slice(0, 15);
    const q = query.toLowerCase().trim();
    return items.filter(i => 
      i.title?.toLowerCase().includes(q) || 
      i.sub?.toLowerCase().includes(q) ||
      i.cat?.toLowerCase().includes(q)
    );
  }, [query, notices, faculties, pages, gallery]);

  // Group by category for display
  const grouped = useMemo(() => {
    const groups = {};
    flatResults.forEach(i => {
      if (!groups[i.cat]) groups[i.cat] = [];
      groups[i.cat].push(i);
    });
    return groups;
  }, [flatResults]);

  useEffect(() => {
    if (isOpen) {
      setQuery(''); setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSelect = useCallback((item) => {
    onClose();
    if (item.path && item.path.startsWith('http')) window.open(item.path, '_blank');
    else if (item.path) navigate(item.path);
  }, [navigate, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(p => (p + 1) % Math.max(1, flatResults.length)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(p => (p - 1 + flatResults.length) % Math.max(1, flatResults.length)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (flatResults[activeIndex]) handleSelect(flatResults[activeIndex]); }
    else if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    const el = listRef.current?.querySelector('.us-active');
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  if (!isOpen) return null;

  let gCount = 0;

  return (
    <div className="us-overlay" onClick={onClose}>
      <style>{`
        .us-overlay { position: fixed; inset: 0; z-index: 100000; background: rgba(15,35,71,0.5); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); display: flex; justify-content: center; padding-top: 10vh; animation: usFadeIn 0.3s ease; }
        @keyframes usFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .us-modal { width: min(680px, 95vw); background: rgba(255, 255, 255, 0.98); border-radius: 24px; box-shadow: 0 40px 120px rgba(0,0,0,0.5); overflow: hidden; display: flex; flex-direction: column; height: fit-content; max-height: 80vh; border: 1px solid rgba(255,255,255,0.4); animation: usScaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes usScaleIn { from { transform: translateY(-20px) scale(0.95); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        
        .us-head { display: flex; align-items: center; gap: 15px; padding: 22px 28px; border-bottom: 2px solid rgba(15,35,71,0.04); background: #fff; }
        .us-input { flex: 1; border: none; outline: none; background: transparent; font-size: 19px; font-weight: 700; color: ${N}; font-family: 'Plus Jakarta Sans', sans-serif; }
        .us-kbd-hint { font-size: 11px; background: rgba(15,35,71,0.06); padding: 5px 12px; border-radius: 8px; font-weight: 800; color: ${N}; opacity: 0.7; }

        .us-body { flex: 1; overflow-y: auto; padding: 15px; background: #fafafa; }
        .us-body::-webkit-scrollbar { width: 4px; }
        .us-body::-webkit-scrollbar-thumb { background: rgba(15,35,71,0.1); border-radius: 10px; }

        .us-section-title { font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 2.2px; padding: 18px 15px 10px; }
        .us-row { display: flex; align-items: center; gap: 16px; padding: 14px 18px; border-radius: 16px; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); position: relative; border: 1px solid transparent; }
        .us-row.us-active { background: ${N}; transform: scale(1.02); box-shadow: 0 15px 35px rgba(15,35,71,0.25); border-color: ${G}; }
        
        .us-img-box { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; border: 1.5px solid rgba(15,35,71,0.08); box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .us-img { width: 100%; height: 100%; object-fit: cover; }
        
        .us-info { flex: 1; min-width: 0; }
        .us-title { font-size: 15px; font-weight: 800; color: ${N}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.2s; }
        .us-sub { font-size: 11px; color: #64748b; margin-top: 3px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.8; }
        .us-active .us-title { color: #fff; }
        .us-active .us-sub { color: rgba(255,255,255,0.7); }
        .us-active .us-img-box { border-color: rgba(255,255,255,0.2); }
        
        .us-foot { background: #fff; padding: 14px 28px; border-top: 2px solid rgba(15,35,71,0.03); display: flex; justify-content: space-between; align-items: center; }
        .us-meta { font-size: 11px; font-weight: 700; color: #94a3b8; display: flex; align-items: center; gap: 8px; }
        .us-shortcuts { display: flex; gap: 15px; }
        .us-sc-item { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; color: #64748b; }
        .us-sc-box { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; padding: 3px 8px; box-shadow: 0 2px 0 #e2e8f0; color: ${N}; }

        [data-theme="dark"] .us-modal { background: rgba(10, 20, 40, 0.98); border-color: rgba(255,255,255,0.1); }
        [data-theme="dark"] .us-head, [data-theme="dark"] .us-foot { background: transparent; }
        [data-theme="dark"] .us-input { color: #fff; }
        [data-theme="dark"] .us-title { color: #f1f5f9; }
        [data-theme="dark"] .us-body { background: rgba(255,255,255,0.02); }
        [data-theme="dark"] .us-row.us-active { background: ${G}; border-color: #fff; }
        [data-theme="dark"] .us-row.us-active .us-title { color: ${N}; }
        [data-theme="dark"] .us-row.us-active .us-sub { color: rgba(15,35,71,0.7); }
      `}</style>

      <div className="us-modal" onClick={e => e.stopPropagation()}>
        <div className="us-head">
          <span style={{ fontSize: 24 }}>✨</span>
          <input 
            ref={inputRef}
            className="us-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search alumni, faculty, latest notices, or pages..."
            spellCheck="false"
            autoComplete="off"
          />
          <span className="us-kbd-hint">Esc to Close</span>
        </div>

        <div className="us-body" ref={listRef}>
          {flatResults.length === 0 ? (
            <div style={{ padding: 80, textAlign: 'center' }}>
              <div style={{ fontSize: 50, marginBottom: 15, filter: 'grayscale(1)' }}>🔍</div>
              <div style={{ fontWeight: 900, color: '#94a3b8', fontSize: 18 }}>No matching results</div>
              <div style={{ color: '#cbd5e1', fontSize: 13, marginTop: 5 }}>Try searching for a different keyword</div>
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <div className="us-section-title">{category}</div>
                {items.map((item) => {
                  const isCurrent = gCount === activeIndex;
                  const currentIndex = gCount;
                  gCount++;
                  return (
                    <div 
                      key={item.title + item.path + currentIndex}
                      className={`us-row ${isCurrent ? 'us-active' : ''}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIndex(currentIndex)}
                    >
                      <div className="us-img-box">
                        {item.img ? <img src={item.img} className="us-img" alt="" /> : (item.icon || '📄')}
                      </div>
                      <div className="us-info">
                        <div className="us-title">{item.title}</div>
                        <div className="us-sub">{item.sub || 'GNC Content'}</div>
                      </div>
                      {isCurrent && <span style={{ fontSize: 22, color: 'inherit', opacity: 0.8 }}>↵</span>}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="us-foot">
          <div className="us-meta">
            <span>✨ GNC Intelligent Search</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span>{flatResults.length} records matched</span>
          </div>
          <div className="us-shortcuts">
            <div className="us-sc-item"><span className="us-sc-box">↑↓</span> Move</div>
            <div className="us-sc-item"><span className="us-sc-box">↵</span> Open</div>
          </div>
        </div>
      </div>
    </div>
  );
}
