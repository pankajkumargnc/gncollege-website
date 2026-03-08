import React, { useState } from 'react';
import { COLORS } from '../styles/colors';

export default function QuickActionNav() {
  const actions = [
    { label: "Principal Message", icon: "👨‍🏫", href: "#/about-us/principal-message" },
    { label: "Admission Rules", icon: "🎓", href: "#/admission/rule" },
    { label: "Departments", icon: "🏛️", href: "#/academics/course-offered" },
    { label: "NSS / NCC", icon: "🎖️", href: "#/activity/nss" },
    { label: "Syllabus", icon: "📚", href: "#/syllabus" },
    { label: "Photo Gallery", icon: "📸", href: "#/gallery" },
    { label: "Contact Us", icon: "📞", href: "#/contact" },
  ];

  return (
    <div style={{ position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 990, display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {actions.map((action, index) => (
        <QuickActionItem key={index} action={action} index={index} />
      ))}
    </div>
  );
}

const QuickActionItem = ({ action, index }) => {
  const [hover, setHover] = useState(false);

  return (
    <a href={action.href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '12px 15px',
        backgroundColor: hover ? COLORS.gold : COLORS.navy,
        color: hover ? COLORS.navy : '#fff',
        textDecoration: 'none',
        width: hover ? '200px' : '55px',
        height: '55px',
        borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        overflow: 'hidden', whiteSpace: 'nowrap',
        boxShadow: hover ? '-5px 5px 15px rgba(0,0,0,0.2)' : '-2px 2px 8px rgba(0,0,0,0.1)',
        position: 'relative', right: hover ? '0' : '-5px',
        animation: `slideInRight 0.5s ease forwards ${index * 0.1}s`,
        opacity: 0
      }}
    >
      <span style={{ fontSize: '22px', minWidth: '30px', textAlign: 'center', display: 'block' }}>{action.icon}</span>
      <span style={{ fontWeight: '800', fontSize: '14px', marginLeft: '12px', opacity: hover ? 1 : 0, transition: 'opacity 0.3s ease 0.1s' }}>
        {action.label}
      </span>
      <style>{`@keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </a>
  );
};