import React, { useState, useEffect } from 'react';
import { COLORS } from '../styles/colors';

export default function QuickActionNav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false);

  // ── Detect screen resize ──────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false); // desktop pe always visible, no toggle needed
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Close sidebar when any nav link is clicked (mobile) ───────
  const handleLinkClick = () => {
    if (isMobile) setIsOpen(false);
  };

  const actions = [
    { label: "Principal Message", icon: "👨‍🏫", href: "#/about-us/principal-message" },
    { label: "Admission Rules",   icon: "🎓", href: "#/admission/rule" },
    { label: "Departments",       icon: "🏛️", href: "#/academics/course-offered" },
    { label: "NSS / NCC",         icon: "🎖️", href: "#/activity/nss" },
    { label: "Syllabus",          icon: "📚", href: "#/syllabus" },
    { label: "Photo Gallery",     icon: "📸", href: "#/gallery" },
    { label: "Contact Us",        icon: "📞", href: "#/contact" },
  ];

  return (
    <>
      {/* ── MOBILE TOGGLE BUTTON ─────────────────────────────── */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(prev => !prev)}
          style={{
            position: 'fixed',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            width: '36px',
            height: '100px',
            backgroundColor: COLORS.navy,
            color: '#fff',
            border: 'none',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            boxShadow: '-3px 0 12px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s',
            fontSize: '18px',
            writingMode: 'vertical-rl',
            padding: '8px 6px',
          }}
          aria-label={isOpen ? 'Close quick links' : 'Open quick links'}
        >
          {isOpen ? '✕' : '≡'}
        </button>
      )}

      {/* ── SIDEBAR NAV ──────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          zIndex: 990,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          // Mobile: hidden by default, shown only when isOpen=true
          // Desktop: always visible
          visibility: isMobile && !isOpen ? 'hidden' : 'visible',
          opacity:    isMobile && !isOpen ? 0 : 1,
          pointerEvents: isMobile && !isOpen ? 'none' : 'auto',
          transform: isMobile
            ? `translateY(-50%) translateX(${isOpen ? '0' : '100%'})`
            : 'translateY(-50%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
        }}
      >
        {actions.map((action, index) => (
          <QuickActionItem
            key={index}
            action={action}
            index={index}
            onLinkClick={handleLinkClick}
          />
        ))}
      </div>
    </>
  );
}

// ── INDIVIDUAL ITEM ───────────────────────────────────────────────
const QuickActionItem = ({ action, index, onLinkClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={action.href}
      onClick={onLinkClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '12px 15px',
        backgroundColor: hover ? COLORS.gold : COLORS.navy,
        color: hover ? COLORS.navy : '#fff',
        textDecoration: 'none',
        width: hover ? '200px' : '55px',
        height: '55px',
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        boxShadow: hover
          ? '-5px 5px 15px rgba(0,0,0,0.2)'
          : '-2px 2px 8px rgba(0,0,0,0.1)',
        position: 'relative',
        right: hover ? '0' : '-5px',
        animation: `slideInRight 0.5s ease forwards ${index * 0.1}s`,
        opacity: 0,
      }}
    >
      <span style={{ fontSize: '22px', minWidth: '30px', textAlign: 'center', display: 'block' }}>
        {action.icon}
      </span>
      <span style={{
        fontWeight: '800', fontSize: '14px', marginLeft: '12px',
        opacity: hover ? 1 : 0,
        transition: 'opacity 0.3s ease 0.1s',
      }}>
        {action.label}
      </span>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </a>
  );
};