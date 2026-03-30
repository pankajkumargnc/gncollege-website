// src/hooks/useDarkMode.js — Dark Mode Hook
// 🎨 @UI_Agent — Persistent dark mode with CSS custom property toggling

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'gnc_dark_mode';

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) return stored === 'true';
      // Respect system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      root.style.setProperty('--bg', '#0c1222');
      root.style.setProperty('--glass-bg', 'rgba(15,25,50,.85)');
      root.style.setProperty('--glass-border', 'rgba(255,255,255,.08)');
      root.style.setProperty('--glass-shadow', '0 8px 32px rgba(0,0,0,.4)');
      document.body.style.background = '#0c1222';
      document.body.style.color = '#e2e8f0';
    } else {
      root.removeAttribute('data-theme');
      root.style.setProperty('--bg', '#f4f7f9');
      root.style.setProperty('--glass-bg', 'rgba(255,255,255,.78)');
      root.style.setProperty('--glass-border', 'rgba(255,255,255,.42)');
      root.style.setProperty('--glass-shadow', '0 8px 32px rgba(15,35,71,.1)');
      document.body.style.background = '#f4f7f9';
      document.body.style.color = '#1e293b';
    }
    try { localStorage.setItem(STORAGE_KEY, String(isDark)); } catch {}
  }, [isDark]);

  const toggle = useCallback(() => setIsDark(d => !d), []);

  return { isDark, toggle };
}
