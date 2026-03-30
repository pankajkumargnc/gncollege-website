// src/components/QuickAccessSidebar.jsx — Floating Quick Access Menu
// 🎨 @UI_Agent — Right-side floating vertical quick access panel

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../styles/colors';

const ITEMS = [
  { icon: '👨‍🏫', label: "Principal's Message", href: '/about-us/principal-message' },
  { icon: '📌', label: 'Admission Rules', href: '/admission/rule' },
  { icon: '📚', label: 'Courses Offered', href: '/academics/course-offered' },
  { icon: '🌿', label: 'NSS', href: '/activity/nss' },
  { icon: '📋', label: 'Syllabus', href: '/syllabus' },
  { icon: '📸', label: 'Gallery', href: '/gallery/photos' },
  { icon: '📞', label: 'Contact Us', href: '/contact' },
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
