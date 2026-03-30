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
      document.body.style.background = 'var(--bg)';
      document.body.style.color = 'var(--text-primary)';
    } else {
      root.removeAttribute('data-theme');
      document.body.style.background = 'var(--bg)';
      document.body.style.color = 'var(--text-primary)';
    }
    try { localStorage.setItem(STORAGE_KEY, String(isDark)); } catch {}
  }, [isDark]);

  const toggle = useCallback(() => setIsDark(d => !d), []);

  return { isDark, toggle };
}
