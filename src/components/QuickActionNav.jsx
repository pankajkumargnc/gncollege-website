import React, { useState } from 'react';
import { COLORS } from '../styles/colors';

const QuickActionNav = () => {
  const actions = [
    { label: "Admission 2024", icon: "🎓", href: "#" },
    { label: "Student Portal", icon: "💻", href: "#" },
    { label: "Exam Results", icon: "📋", href: "#" },
    { label: "Pay Fee Online", icon: "💳", href: "#" },
    { label: "Syllabus", icon: "📚", href: "#" },
  ];

  return (
    <div style={{
      position: 'fixed',
      right: 0,
      top: '40%',
      transform: 'translateY(-50%)',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    }}>
      {actions.map((action, index) => (
        <QuickActionItem key={index} action={action} />
      ))}
    </div>
  );
};

const QuickActionItem = ({ action }) => {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={action.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '12px',
        backgroundColor: hover ? COLORS.gold : COLORS.navy,
        color: hover ? COLORS.navy : '#fff',
        textDecoration: 'none',
        width: hover ? '190px' : '50px',
        height: '50px',
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        boxShadow: '-2px 2px 8px rgba(0,0,0,0.15)',
        position: 'relative',
        right: hover ? '0' : '-5px'
      }}
    >
      <span style={{ fontSize: '22px', minWidth: '30px', textAlign: 'center', marginLeft: '-2px' }}>{action.icon}</span>
      <span style={{ fontWeight: '700', fontSize: '14px', marginLeft: '15px', opacity: hover ? 1 : 0, transition: 'opacity 0.2s' }}>{action.label}</span>
    </a>
  );
};

export default QuickActionNav;