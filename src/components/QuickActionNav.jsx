// src/components/QuickActionNav.jsx
// ✅ Toggle button always visible — sidebar ke bahar rakha
// ✅ Sidebar zIndex toggle se UPAR nahi aata
// ✅ Animation reset on reopen
// ✅ Mobile scroll pe hide, visible area mein stay

import React, { useState, useEffect, useCallback } from 'react';
import { COLORS } from '../styles/colors';

const N = COLORS.navy || '#0f2347';
const G = COLORS.gold || '#f4a023';

const ACTIONS = [
  { label:'Principal Message', icon:'👨‍🏫', href:'#/about-us/principal-message' },
  { label:'Admission Rules',   icon:'🎓',  href:'#/admission/rule'              },
  { label:'Departments',       icon:'🏛️',  href:'#/academics/course-offered'    },
  { label:'NSS / NCC',         icon:'🎖️',  href:'#/activity/nss'               },
  { label:'Syllabus',          icon:'📚',  href:'#/syllabus'                    },
  { label:'Photo Gallery',     icon:'📸',  href:'#/gallery'                     },
  { label:'Contact Us',        icon:'📞',  href:'#/contact'                     },
];

export default function QuickActionNav() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [isOpen,   setIsOpen]   = useState(false);
  const [hovered,  setHovered]  = useState(null);

  useEffect(() => {
    const fn = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);

  const close = useCallback(() => { if (isMobile) setIsOpen(false); }, [isMobile]);

  // Sidebar width
  const SIDEBAR_W  = 58;   // collapsed width
  const EXPANDED_W = 200;  // hover expanded width
  const TOGGLE_W   = 32;   // toggle button width

  return (
    <>
      <style>{`
        /* ── Slide in items ── */
        @keyframes qan-slide {
          from { opacity:0; transform:translateX(60px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .qan-item {
          display:flex; align-items:center;
          height:52px; border-radius:12px 0 0 12px;
          text-decoration:none; overflow:hidden;
          white-space:nowrap; cursor:pointer;
          transition: width .35s cubic-bezier(.175,.885,.32,1.275),
                      background .2s, color .2s,
                      box-shadow .2s;
          position:relative;
        }
        .qan-item.anim { animation: qan-slide .45s ease both; }

        /* ── Toggle button ── */
        .qan-toggle {
          position:fixed;
          right:0; top:50%;
          transform:translateY(-50%);
          z-index:1001;               /* always on top */
          width:${TOGGLE_W}px; height:88px;
          background:${N};
          color:#fff; border:none;
          border-radius:10px 0 0 10px;
          cursor:pointer;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          gap:3px;
          box-shadow:-3px 0 12px rgba(0,0,0,.22);
          transition:background .25s;
          font-size:18px;
        }
        .qan-toggle:hover { background:${G}; color:${N}; }

        /* ── Sidebar ── */
        .qan-sidebar {
          position:fixed;
          /* Keep sidebar LEFT of toggle button */
          right:${TOGGLE_W}px;
          top:50%;
          z-index:999;               /* below toggle */
          display:flex; flex-direction:column;
          gap:5px;
          transform:translateY(-50%);
          transition:transform .35s cubic-bezier(.4,0,.2,1),
                     opacity   .3s ease;
        }
        .qan-sidebar.mobile-closed {
          transform:translateY(-50%) translateX(calc(100% + ${TOGGLE_W}px));
          opacity:0; pointer-events:none;
        }

        /* Desktop — no toggle, sidebar at right:0 */
        .qan-sidebar.desktop {
          right:0;
          transform:translateY(-50%);
          opacity:1; pointer-events:auto;
        }

        @media(max-width:768px) {
          /* On very small phones shrink items */
          .qan-item { height:46px; }
        }
      `}</style>

      {/* ── TOGGLE — only mobile ── */}
      {isMobile && (
        <button
          className="qan-toggle"
          onClick={() => setIsOpen(o => !o)}
          aria-label={isOpen ? 'Close quick links' : 'Open quick links'}
          aria-expanded={isOpen}
        >
          <span style={{ fontSize: 20, lineHeight: 1 }}>
            {isOpen ? '✕' : '≡'}
          </span>
          {!isOpen && (
            <span style={{
              fontSize: 8, fontWeight: 800, letterSpacing: .5,
              writingMode: 'vertical-rl', textTransform: 'uppercase',
              opacity: .7, marginTop: 4,
            }}>LINKS</span>
          )}
        </button>
      )}

      {/* ── SIDEBAR ── */}
      <div
        className={
          isMobile
            ? `qan-sidebar ${isOpen ? '' : 'mobile-closed'}`
            : 'qan-sidebar desktop'
        }
      >
        {ACTIONS.map((action, i) => (
          <a
            key={i}
            href={action.href}
            className={`qan-item${isOpen || !isMobile ? ' anim' : ''}`}
            onClick={close}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              width:            hovered === i ? `${EXPANDED_W}px` : `${SIDEBAR_W}px`,
              background:       hovered === i ? G : N,
              color:            hovered === i ? N : '#fff',
              boxShadow:        hovered === i
                ? '-5px 5px 16px rgba(0,0,0,.22)'
                : '-2px 2px 8px rgba(0,0,0,.12)',
              animationDelay:   `${i * 0.07}s`,
              paddingLeft:      '13px',
              paddingRight:     '10px',
            }}
          >
            {/* Icon */}
            <span style={{
              fontSize: 20, minWidth: 30,
              textAlign: 'center', display: 'block', flexShrink: 0,
            }}>
              {action.icon}
            </span>

            {/* Label — fade in on hover */}
            <span style={{
              fontWeight: 800, fontSize: 13,
              marginLeft: 10, flexShrink: 0,
              opacity:    hovered === i ? 1 : 0,
              transform:  hovered === i ? 'translateX(0)' : 'translateX(8px)',
              transition: 'opacity .25s ease .05s, transform .25s ease .05s',
              pointerEvents: 'none',
            }}>
              {action.label}
            </span>
          </a>
        ))}
      </div>
    </>
  );
}