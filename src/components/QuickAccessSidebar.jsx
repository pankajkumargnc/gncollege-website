// src/components/QuickAccessSidebar.jsx — Floating Quick Access Menu
// 🎨 @UI_Agent — Right-side floating vertical quick access panel

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../styles/colors';

const ITEMS = [
  { icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
    ), label: "Principal's Message", href: '/about-us/principal-message' },
  { icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    ), label: 'Admission Rules', href: '/admission/rule' },
  { icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
    ), label: 'Courses Offered', href: '/academics/course-offered' },
  { icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ), label: 'NSS', href: '/activity/nss' },
  { icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    ), label: 'Syllabus', href: '/syllabus' },
  { icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    ), label: 'Gallery', href: '/gallery/photos' },
  { icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    ), label: 'Contact Us', href: '/contact' },
];

const CSS = `
.qas-wrap{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:9000;display:flex;flex-direction:column;gap:2px;}
.qas-item{display:flex;align-items:center;background:${COLORS.navy};color:#fff;text-decoration:none;padding:10px 12px;border-radius:10px 0 0 10px;font-size:12px;font-weight:700;transition:all .25s cubic-bezier(.25,.8,.25,1);cursor:pointer;white-space:nowrap;overflow:hidden;width:44px;border:1px solid rgba(255,255,255,.08);border-right:none;}
.qas-item:hover{width:180px;background:${COLORS.gold};color:${COLORS.navy};box-shadow:-4px 4px 16px rgba(0,0,0,.2);}
.qas-icon{width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
.qas-label{margin-left:10px;opacity:0;transition:opacity .2s .05s;font-family:'Inter',sans-serif;}
.qas-item:hover .qas-label{opacity:1;}
@media(max-width:768px){.qas-wrap{display:none;}}
`;

export default function QuickAccessSidebar() {
  return (
    <>
      <style>{CSS}</style>
      <nav className="qas-wrap" aria-label="Quick access links">
        {ITEMS.map(item => (
          <Link key={item.href} to={item.href} className="qas-item" title={item.label}>
            <span className="qas-icon">{item.icon}</span>
            <span className="qas-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
