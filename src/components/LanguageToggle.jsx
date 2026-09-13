// src/components/LanguageToggle.jsx — English / Hindi Language Switcher
import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n';
import { Languages } from 'lucide-react';
import { COLORS } from '../styles/colors';

const NAVY = COLORS?.navy || '#0f2347';
const GOLD = COLORS?.gold || '#f4a023';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const toggle = () => {
    const nextLang = currentLang === 'en' ? 'hi' : 'en';
    changeLanguage(nextLang);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={currentLang === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
      aria-label="Switch Language"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: 'rgba(15, 35, 71, 0.08)',
        color: NAVY,
        border: '1px solid rgba(15, 35, 71, 0.18)',
        borderRadius: 99,
        padding: '0 8px',
        height: 20,
        fontSize: 10,
        fontWeight: 800,
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        whiteSpace: 'nowrap',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = NAVY;
        e.currentTarget.style.color = '#ffffff';
        e.currentTarget.style.borderColor = NAVY;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(15, 35, 71, 0.08)';
        e.currentTarget.style.color = NAVY;
        e.currentTarget.style.borderColor = 'rgba(15, 35, 71, 0.18)';
      }}
    >
      <Languages size={11} />
      <span>{currentLang === 'en' ? 'हिंदी' : 'Eng'}</span>
    </button>
  );
}
