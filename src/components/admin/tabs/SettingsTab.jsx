// ═══════════════════════════════════════════════════════════════════════════════
// SettingsTab.jsx — GNC Administration Master Settings Hub v12.0
// Features: General Info, Live Social Graph / OpenGraph & SERP Simulator,
// Emergency Broadcast, Feature Toggles, Cloud/AI Keys, 1-Click DB Snapshot
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { 
  doc, setDoc, serverTimestamp, onSnapshot, 
  collection, getDocs 
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  Settings, Sliders, Globe, Share2, Image as ImageIcon, Bot, Shield, Save, 
  Eye, EyeOff, Zap, CheckCircle2, Building2, Wrench, Loader2, Download, 
  AlertTriangle, Radio, Bell, RefreshCw, Layers, Database, Check, 
  ExternalLink, Copy, Search, Smartphone, Monitor,
  UploadCloud, Sparkles, RotateCcw, ArrowUpRight, Info,
  PhoneCall, Compass, GraduationCap, MapPin, Palette, Type, Navigation, Tablet
} from 'lucide-react';
import { T, NAVY, GOLD, Toggle } from '../AdminShared';
import { clearCache, encodePayload, decodePayload } from '../../../utils/cachedFetch';
import { processHeroImage, formatBytes } from '../../../utils/imageProcessor';

export default function SettingsTab({ logAct }) {
  const [activeSubTab, setActiveSubTab] = useState('general');

  const [siteCfg, setSiteCfg] = useState(() => {
    try {
      const cached = localStorage.getItem('gnc_site_settings_cache');
      if (cached) return decodePayload(cached) || {};
    } catch {}
    return {
      name: 'Guru Nanak College',
      tagline: 'Affiliated to B.B.M.K. University, Dhanbad',
      address: 'Bank More, Dhanbad — 826001, Jharkhand',
      phone: '+91 326 2302324',
      email: 'principal@gncollege.org',
      facebook: 'https://facebook.com/gncollege',
      twitter: 'https://twitter.com/gncdhanbad',
      youtube: 'https://youtube.com/@gncollege',
      linkedin: 'https://linkedin.com/school/guru-nanak-college-dhanbad',
      footerText: '© 2026 Guru Nanak College, Dhanbad. All Rights Reserved.',
      maintenanceMode: false,
      maintenanceMessage: 'System undergoing scheduled maintenance. Services will resume shortly.',
      
      // SEO & Social Graph
      metaTitle: 'Guru Nanak College, Dhanbad | Premier Higher Education in Jharkhand',
      metaDescription: 'Guru Nanak College (GNC), Dhanbad offers top undergraduate & postgraduate programs in BCA, BBA, Commerce, Arts, and Science affiliated with BBMKU.',
      ogImage: 'images/logo.webp',

      // Emergency Broadcast Ticker
      emergencyBroadcastEnabled: false,
      emergencyBroadcastType: 'critical', // 'critical' | 'gold' | 'info'
      emergencyBroadcastText: 'Important Notice: Admission Portal for 2026-27 is now live.',
      emergencyBroadcastLink: '/admissions',
      emergencyBroadcastLinkText: 'Apply Online',

      // API Keys & Integrations
      imgbbKey: '',
      geminiApiKey: '',
      recaptchaSiteKey: '',
      enableRecaptcha: false,

      // Live Feature Switches
      enableLanguageToggle: true,
      enableCampusPoll: true,
      enableFloatingQR: true,
      enableVirtualTour: true,
      enableAlumniWall: true,
      enablePlacementAnalytics: true,

      // Hero & Kinetic Background Settings
      heroBgMode: 'image', // 'image' | 'mesh'
      heroBgUrl: '/images/college_hero_bg.webp',
      heroOverlayStyle: 'royal-navy',
      heroOverlayGradient: 'linear-gradient(135deg, rgba(15, 35, 71, 0.90) 0%, rgba(10, 25, 47, 0.82) 48%, rgba(15, 35, 71, 0.92) 100%)',
      heroBgPosition: 'center 36%',
      heroKenBurns: true,

      // Universal Master Theme & Typography
      fontFamily: "'Inter', sans-serif",
      headingFont: "'Outfit', sans-serif",
      themePreset: 'royal-navy',
      themePrimary: '#0f2347',
      themeAccent: '#f4a023',
      themeBg: '#f4f7f9',
      themeSurface: '#ffffff',
      enableAnimatedGradients: true,
      enableCardHoverEffects: true,
      motionSpeed: 'normal', // 'off' | 'normal' | 'smooth'

      // Dual Campus Interactive Google Maps Config
      campusBhudaTitle: 'Bhuda Main Campus (Dhanbad)',
      campusBhudaAddress: 'Guru Nanak College, Bhuda, Dhanbad, Jharkhand — 826001',
      campusBhudaMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin',
      campusBhudaDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Guru+Nanak+College+Bhuda+Campus+Dhanbad',

      campusBankMoreTitle: "Bank More Campus — Women's Wing",
      campusBankMoreAddress: 'Guru Nanak College Women\'s Wing, Bank More, Dhanbad, Jharkhand — 826001',
      campusBankMoreMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
      campusBankMoreDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Guru+Nanak+College+Bank+More+Campus+Dhanbad',

      // ── Two-Tone Solid Split Headings Engine (Image Reference Style) ──
      enableDualHeading: true,
      headingMode: 'two-tone', // 'two-tone' (solid split - recommended) | 'gradient' | 'solid'
      headingPrimaryColor: '#0f2347',
      headingAccentColor: '#f4a023',
      heroHeadingStart: '#ffffff',
      heroHeadingEnd: '#f4a023',
      heroHeadingAngle: '135deg',
      heroHeadingShadow: '0 4px 18px rgba(0,0,0,0.45)',
      heroHeadingGradient: 'linear-gradient(135deg, #ffffff 35%, #f4a023 100%)',

      // ── Hero Overlay & Visual Effects Suite ──
      heroVisualEffect: 'none', // 'none' | 'grid' | 'aurora' | 'lines'
      heroBackdropBlur: '0px',
      heroOverlayOpacity: 85,
      heroOverlayColor1: '#0f2347',
      heroOverlayColor2: '#0a192f',

      // ── 5-Color Harmony Palette (Paleta Color Pro) ──
      themeSecondary: '#1e3a8a',

      // ── Deep Global Styling (Body metrics, headings, bullets, alignment) ──
      bodyLineHeight: '1.62',
      bodyLetterSpacing: 'normal',
      bodyFontWeight: '400',
      headingTransform: 'none',
      headingWeight: '800',
      textAlignDefault: 'justify',
      bulletStyle: 'default',
      textColorPrimary: '#0f2347',
      textColorMuted: '#64748b',
    };
  });

  const [siteLoading, setSiteLoading] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [testingGemini, setTestingGemini] = useState(false);
  const [geminiTestStatus, setGeminiTestStatus] = useState(null);

  // Theme & Design Studio State
  const [themePreviewDevice, setThemePreviewDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [mapTestCampus, setMapTestCampus] = useState('bhuda'); // 'bhuda' | 'bankMore'

  // Interactive CSS Gradient Studio State (cssgradient.io style)
  const [gradType, setGradType] = useState('linear');
  const [gradAngle, setGradAngle] = useState(135);
  const [gradStop1, setGradStop1] = useState('#0f2347');
  const [gradStop2, setGradStop2] = useState('#1e3a8a');
  const [gradStop3, setGradStop3] = useState('#f4a023');
  const [activePaletteTab, setActivePaletteTab] = useState('harmony'); // 'harmony' | 'collections'

  // Hero Image Processing State
  const [heroProcessing, setHeroProcessing] = useState(false);
  const [heroStats, setHeroStats] = useState(null);
  const [heroPreviewDevice, setHeroPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'
  const [isHeroDragOver, setIsHeroDragOver] = useState(false);
  const isMeshActive = siteCfg.heroBgMode === 'mesh' || !siteCfg.heroBgUrl || siteCfg.heroBgUrl === 'none';

  // Social Preview State
  const [socialPlatform, setSocialPlatform] = useState('whatsapp'); // 'whatsapp' | 'facebook' | 'twitter' | 'google'

  // Backup State
  const [backupLoading, setBackupLoading] = useState(false);
  const [backupProgress, setBackupProgress] = useState('');
  const [lastBackupTime, setLastBackupTime] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'site'), s => {
      if (s.exists()) {
        const d = s.data();
        setSiteCfg(prev => ({ ...prev, ...d }));
        try { localStorage.setItem('gnc_site_settings_cache', encodePayload(d)); } catch {}
        if (d.imgbbKey) window.GN_IMGBB_KEY = d.imgbbKey;
        if (d.geminiApiKey) window.GNC_GEMINI_API_KEY = d.geminiApiKey;
      }
    });
    return () => unsub();
  }, []);

  const handleFeatureToggle = async (key) => {
    const currentVal = siteCfg[key] !== false;
    const newVal = !currentVal;

    setSiteCfg(prev => ({ ...prev, [key]: newVal }));

    try {
      await setDoc(doc(db, 'settings', 'site'), {
        [key]: newVal,
        updatedAt: serverTimestamp()
      }, { merge: true });

      try {
        const cached = localStorage.getItem('gnc_site_settings_cache');
        const parsed = (cached ? decodePayload(cached) : null) || {};
        parsed[key] = newVal;
        localStorage.setItem('gnc_site_settings_cache', encodePayload(parsed));
      } catch {}

      window.dispatchEvent(new CustomEvent('gnc_settings_updated', { detail: { [key]: newVal } }));
      clearCache('site_settings');
      toast.success(`${newVal ? '🟢 Feature Enabled' : '⚪ Feature Disabled'} (Live Synced!)`);
      logAct?.('update', `Toggled ${key}: ${newVal}`, 'settings');
    } catch (err) {
      setSiteCfg(prev => ({ ...prev, [key]: currentVal }));
      toast.error('Failed to update: ' + err.message);
    }
  };

  const testGeminiConnection = async () => {
    const key = (siteCfg.geminiApiKey || '').trim();
    if (!key) {
      toast.error('Pehle Gemini API key daaliye!');
      return;
    }
    setTestingGemini(true);
    setGeminiTestStatus(null);
    try {
      let candidateModels = [];
      try {
        const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const listData = await listRes.json();
        if (listData?.error) {
          if (listData.error.message?.toLowerCase().includes('leaked')) {
            throw new Error('Google security alert: Yeh API key "Leaked/Revoked" mark ho chuki hai. Kripya aistudio.google.com se nayi free key banayein.');
          }
          if (listData.error.code === 400) {
            throw new Error('API Key invalid hai. Kripya aistudio.google.com se copy karke sahi key paste karein.');
          }
        }
        if (Array.isArray(listData?.models)) {
          candidateModels = listData.models
            .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
            .map(m => m.name.replace(/^models\//, ''));
        }
      } catch (listErr) {
        if (listErr.message?.includes('Google security alert') || listErr.message?.includes('API Key invalid')) {
          throw listErr;
        }
      }

      const fallbackList = [
        'gemini-2.0-flash',
        'gemini-1.5-flash-latest',
        'gemini-1.5-flash',
        'gemini-1.5-flash-8b',
        'gemini-1.5-pro',
        'gemini-pro'
      ];

      const modelsToTry = Array.from(new Set([...candidateModels, ...fallbackList]));
      let successModel = null;
      let replyText = null;
      let lastError = null;

      for (const model of modelsToTry) {
        for (const ver of ['v1beta', 'v1']) {
          try {
            const url = `https://generativelanguage.googleapis.com/${ver}/models/${model}:generateContent?key=${key}`;
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: 'Respond with exactly: GNC AI Online' }] }]
              })
            });
            const data = await res.json();
            if (res.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
              successModel = `${model} (${ver})`;
              replyText = data.candidates[0].content.parts[0].text.trim();
              break;
            } else if (data?.error) {
              lastError = data.error.message;
            }
          } catch (e) {
            lastError = e.message;
          }
        }
        if (successModel) break;
      }

      if (!successModel) {
        throw new Error(lastError || 'Koi bhi Gemini model is key par generateContent ke liye available nahi mila.');
      }

      setGeminiTestStatus({
        success: true,
        message: `✅ Gemini Connected! Model: ${successModel} — Reply: "${replyText}"`
      });
      toast.success(`Gemini Connected successfully via ${successModel}! 🚀`);
    } catch (err) {
      setGeminiTestStatus({ success: false, message: `❌ ${err.message}` });
      toast.error(`Gemini Error: ${err.message}`);
    }
    setTestingGemini(false);
  };

  const saveSite = async (e) => {
    if (e) e.preventDefault();
    setSiteLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'site'), { ...siteCfg, updatedAt: serverTimestamp() }, { merge: true });
      if (siteCfg.imgbbKey) window.GN_IMGBB_KEY = siteCfg.imgbbKey;
      if (siteCfg.geminiApiKey) window.GNC_GEMINI_API_KEY = siteCfg.geminiApiKey;
      try { localStorage.setItem('gnc_site_settings_cache', encodePayload(siteCfg)); } catch {}
      window.dispatchEvent(new CustomEvent('gnc_settings_updated', { detail: siteCfg }));
      
      clearCache('site_settings');
      toast.success('Settings saved & live synced! 🎉');
      logAct?.('update', 'Site settings updated', 'settings');
    } catch (err) { toast.error(err.message); }
    setSiteLoading(false);
  };

  // ── 💾 1-CLICK FULL DATABASE SNAPSHOT EXPORTER ──
  const downloadDatabaseSnapshot = async () => {
    setBackupLoading(true);
    setBackupProgress('Connecting to Firestore Collections...');
    const collectionsToFetch = [
      'notices', 'events', 'departments', 'faculty', 'placements', 
      'gallery', 'sliderSlides', 'pages', 'alerts', 'settings'
    ];

    try {
      const fullSnapshot = {
        meta: {
          organization: 'Guru Nanak College, Dhanbad',
          exportedAt: new Date().toISOString(),
          appVersion: '12.0 Enterprise',
          soleAdmin: 'Pankaj Kumar Prasad',
        },
        counts: {},
        collections: {}
      };

      for (const col of collectionsToFetch) {
        setBackupProgress(`Snapshotting ${col}...`);
        try {
          const snap = await getDocs(collection(db, col));
          const docs = [];
          snap.forEach(d => {
            const data = d.data();
            const sanitized = {};
            for (const [k, v] of Object.entries(data)) {
              if (v && typeof v.toDate === 'function') {
                sanitized[k] = v.toDate().toISOString();
              } else {
                sanitized[k] = v;
              }
            }
            docs.push({ id: d.id, ...sanitized });
          });
          fullSnapshot.collections[col] = docs;
          fullSnapshot.counts[col] = docs.length;
        } catch (colErr) {
          console.warn(`Could not snapshot ${col}:`, colErr);
          fullSnapshot.collections[col] = [];
          fullSnapshot.counts[col] = 0;
        }
      }

      setBackupProgress('Compiling JSON Artifact...');
      const jsonString = JSON.stringify(fullSnapshot, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const filename = `GNC-College-Database-Snapshot-${new Date().toISOString().slice(0, 10)}.json`;
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setLastBackupTime(new Date().toLocaleTimeString());
      toast.success('Database Snapshot downloaded successfully! 🛡️', { duration: 5000 });
      logAct?.('export', `Database snapshot exported: ${filename}`, 'settings');
    } catch (err) {
      toast.error('Backup failed: ' + err.message);
    }
    setBackupLoading(false);
    setBackupProgress('');
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div key={key} className="settings-row" style={{ marginBottom: 14 }}>
      <label className="alabel" style={{ marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <span>{label}</span>
      </label>
      <input 
        className="ainp" 
        value={siteCfg[key] || ''}
        placeholder={placeholder}
        onChange={e => setSiteCfg(d => ({ ...d, [key]: e.target.value }))}
        type={type} 
      />
    </div>
  );

  const subTabs = [
    { id: 'general', label: 'General Info', icon: Building2 },
    { id: 'theme-design', label: 'Theme, Typography & Maps', icon: Sparkles },
    { id: 'social-seo', label: 'SEO & Social Preview', icon: Globe },
    { id: 'homepage-stats', label: 'Homepage Stats', icon: Layers },
    { id: 'hero-banner', label: 'Hero & Kinetic Banner', icon: ImageIcon },
    { id: 'broadcast', label: 'Emergency Broadcast', icon: Radio },
    { id: 'toggles', label: 'Feature Switches', icon: Sliders },
    { id: 'api-keys', label: 'API & Security Keys', icon: Bot },
    { id: 'backup', label: 'Database Snapshot', icon: Database },
  ];

  const FONT_OPTIONS = [
    { id: "'Inter', sans-serif", name: 'Inter (Clean, High-Legibility Modern Standard)' },
    { id: "'Outfit', sans-serif", name: 'Outfit (Geometric, Academic Display, Premium)' },
    { id: "'Plus Jakarta Sans', sans-serif", name: 'Plus Jakarta Sans (Editorial, Tech-Forward)' },
    { id: "'Poppins', sans-serif", name: 'Poppins (Friendly, Bold Contemporary Display)' },
    { id: "'Roboto', sans-serif", name: 'Roboto (Google Standard Neo-Grotesque)' },
    { id: "'Playfair Display', serif", name: 'Playfair Display (Classical Heritage Serif)' },
  ];

  const THEME_PRESETS = [
    {
      id: 'royal-navy',
      name: 'Royal Navy & Heritage Gold (Official)',
      primary: '#0f2347',
      accent: '#f4a023',
      bg: '#f4f7f9',
      surface: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(15, 35, 71, 0.92) 0%, rgba(10, 25, 47, 0.86) 50%, rgba(15, 35, 71, 0.94) 100%)',
      tag: 'Official Heritage',
      isAnimatedDefault: true
    },
    {
      id: 'midnight-sapphire',
      name: 'Midnight Sapphire & Neon Cyan',
      primary: '#09192f',
      accent: '#06b6d4',
      bg: '#f0f9ff',
      surface: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(9, 25, 47, 0.94) 0%, rgba(2, 132, 199, 0.85) 50%, rgba(8, 47, 73, 0.94) 100%)',
      tag: 'Modern Tech / BCA',
      isAnimatedDefault: true
    },
    {
      id: 'crimson-maroon',
      name: 'Imperial Crimson & Warm Amber',
      primary: '#450a0a',
      accent: '#f59e0b',
      bg: '#fffbeb',
      surface: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(69, 10, 10, 0.94) 0%, rgba(153, 27, 27, 0.86) 50%, rgba(28, 25, 23, 0.94) 100%)',
      tag: 'Historic Landmark',
      isAnimatedDefault: false
    },
    {
      id: 'emerald-forest',
      name: 'Emerald Forest & Mint Jade',
      primary: '#064e3b',
      accent: '#10b981',
      bg: '#f0fdf4',
      surface: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(6, 78, 59, 0.94) 0%, rgba(4, 120, 87, 0.86) 50%, rgba(2, 44, 34, 0.94) 100%)',
      tag: 'Eco Campus & Botany',
      isAnimatedDefault: true
    },
    {
      id: 'cyber-indigo',
      name: 'Cyber Indigo & Violet Pulse',
      primary: '#1e1b4b',
      accent: '#a855f7',
      bg: '#faf5ff',
      surface: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(30, 27, 75, 0.94) 0%, rgba(67, 56, 202, 0.86) 50%, rgba(49, 46, 129, 0.94) 100%)',
      tag: 'Futuristic AI',
      isAnimatedDefault: true
    },
    {
      id: 'slate-minimal',
      name: 'Graphite Slate & Cobalt Blue',
      primary: '#0f172a',
      accent: '#3b82f6',
      bg: '#f8fafc',
      surface: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(51, 65, 85, 0.86) 50%, rgba(2, 6, 23, 0.94) 100%)',
      tag: 'Executive Minimal',
      isAnimatedDefault: false
    },
    {
      id: 'dark-obsidian',
      name: 'Obsidian Velvet & Pure Gold',
      primary: '#030712',
      accent: '#fbbf24',
      bg: '#f9fafb',
      surface: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(3, 7, 18, 0.96) 0%, rgba(31, 41, 55, 0.88) 50%, rgba(0, 0, 0, 0.96) 100%)',
      tag: 'Luxury Contrast',
      isAnimatedDefault: true
    },
    {
      id: 'amethyst-purple',
      name: 'Royal Amethyst & Golden Sunset',
      primary: '#3b0764',
      accent: '#fb923c',
      bg: '#fdf4ff',
      surface: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(59, 7, 100, 0.94) 0%, rgba(126, 34, 206, 0.86) 50%, rgba(30, 27, 75, 0.94) 100%)',
      tag: 'Arts & Culture',
      isAnimatedDefault: false
    }
  ];

  const OVERLAY_THEMES = [
    {
      id: 'royal-navy',
      name: 'Royal Navy Deep (Default)',
      gradient: 'linear-gradient(135deg, rgba(15, 35, 71, 0.90) 0%, rgba(10, 25, 47, 0.82) 48%, rgba(15, 35, 71, 0.92) 100%)',
      accent: '#f4a023',
      desc: 'Institutional Navy with subtle gold glow (WCAG AAA contrast for titles & badges)'
    },
    {
      id: 'charcoal',
      name: 'Charcoal Onyx',
      gradient: 'linear-gradient(135deg, rgba(17, 24, 39, 0.92) 0%, rgba(31, 41, 55, 0.85) 100%)',
      accent: '#60a5fa',
      desc: 'Modern graphite dark tone for clean, minimal contemporary aesthetic'
    },
    {
      id: 'sapphire',
      name: 'Midnight Sapphire',
      gradient: 'linear-gradient(135deg, rgba(10, 30, 60, 0.94) 0%, rgba(15, 23, 42, 0.88) 100%)',
      accent: '#38bdf8',
      desc: 'Vibrant academic blue with deep night-sky undertones'
    },
    {
      id: 'sunset',
      name: 'Warm Sunset Maroon',
      gradient: 'linear-gradient(135deg, rgba(88, 28, 28, 0.92) 0%, rgba(15, 35, 71, 0.88) 100%)',
      accent: '#fb923c',
      desc: 'Prestigious deep maroon blend honoring college red brick architecture'
    }
  ];

  // ── CSS GRADIENT STUDIO PRESETS (cssgradient.io style) ──
  const GRADIENT_PRESETS = [
    { name: 'Royal Heritage Gold', grad: 'linear-gradient(135deg, #0f2347 0%, #1e3a8a 50%, #f4a023 100%)', cat: 'Heritage' },
    { name: 'Deep Navy Ocean', grad: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', cat: 'Cool' },
    { name: 'Sunset Majesty', grad: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)', cat: 'Warm' },
    { name: 'Cyber Neon', grad: 'linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)', cat: 'Vibrant' },
    { name: 'Emerald Aurora', grad: 'linear-gradient(135deg, #0575e6 0%, #00f260 100%)', cat: 'Cool' },
    { name: 'Midnight Amethyst', grad: 'linear-gradient(135deg, #302b63 0%, #24243e 100%)', cat: 'Vibrant' },
    { name: 'Golden Hour Glow', grad: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)', cat: 'Warm' },
    { name: 'Electric Cyan', grad: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', cat: 'Cool' },
    { name: 'Obsidian Velvet', grad: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #4338ca 100%)', cat: 'Dark' },
    { name: 'Rose Gold Shimmer', grad: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', cat: 'Soft' },
    { name: 'Imperial Maroon', grad: 'linear-gradient(135deg, #450a0a 0%, #991b1b 50%, #f59e0b 100%)', cat: 'Heritage' },
    { name: 'Arctic Frost', grad: 'linear-gradient(135deg, #e6f7ff 0%, #bae7ff 50%, #91caff 100%)', cat: 'Soft' },
  ];

  // ── PALETA COLOR PRO COLLECTIONS (paletacolorpro.com style) ──
  const PALETA_COLLECTIONS = [
    {
      name: 'Official Academic & Gold',
      themePrimary: '#0f2347',
      themeSecondary: '#1e3a8a',
      themeAccent: '#f4a023',
      themeSurface: '#ffffff',
      themeBg: '#f4f7f9',
      tag: 'Academic / BBMKU'
    },
    {
      name: 'Cyber Indigo & Violet',
      themePrimary: '#1e1b4b',
      themeSecondary: '#4338ca',
      themeAccent: '#a855f7',
      themeSurface: '#ffffff',
      themeBg: '#faf5ff',
      tag: 'Tech / BCA / AI'
    },
    {
      name: 'Emerald Botanic & Mint',
      themePrimary: '#064e3b',
      themeSecondary: '#047857',
      themeAccent: '#10b981',
      themeSurface: '#ffffff',
      themeBg: '#f0fdf4',
      tag: 'Eco / Green Campus'
    },
    {
      name: 'Royal Sikh Heritage & Amber',
      themePrimary: '#450a0a',
      themeSecondary: '#78350f',
      themeAccent: '#f59e0b',
      themeSurface: '#ffffff',
      themeBg: '#fffbeb',
      tag: 'Heritage & Tradition'
    },
    {
      name: 'Graphite Slate & Cobalt',
      themePrimary: '#0f172a',
      themeSecondary: '#1e293b',
      themeAccent: '#38bdf8',
      themeSurface: '#ffffff',
      themeBg: '#f8fafc',
      tag: 'Executive Minimal'
    },
    {
      name: 'Obsidian Velvet & Pure Gold',
      themePrimary: '#030712',
      themeSecondary: '#111827',
      themeAccent: '#fbbf24',
      themeSurface: '#ffffff',
      themeBg: '#f9fafb',
      tag: 'High Contrast Luxury'
    }
  ];

  const getContrastRatio = (hex1 = '#ffffff', hex2 = '#000000') => {
    const getLuminance = (hex) => {
      let c = (hex || '#ffffff').replace('#', '');
      if (c.length === 3) c = c.split('').map(x => x + x).join('');
      const num = parseInt(c, 16) || 0;
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      const [rs, gs, bs] = [r, g, b].map(v => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };
    try {
      const l1 = getLuminance(hex1);
      const l2 = getLuminance(hex2);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      return Math.round(ratio * 10) / 10;
    } catch {
      return 4.5;
    }
  };

  const HERO_PREVIEW_PAGES = [
    { name: 'College Profile', path: '/about-us/college-profile', type: 'Profile Hero' },
    { name: 'Vision & Mission', path: '/about-us/vision-mission', type: 'Kinetic BG' },
    { name: 'Fee Structure', path: '/admission/fee-structure', type: 'Kinetic BG' },
    { name: 'Academics (BCA)', path: '/academics/bca', type: 'Kinetic BG' },
    { name: 'Campus Facilities', path: '/campus/computer-lab', type: 'Kinetic BG' },
    { name: 'Alumni Wall', path: '/campus/alumni-wall', type: 'Kinetic BG' },
  ];

  const handleHeroFileUpload = async (file) => {
    if (!file) return;
    setHeroProcessing(true);
    try {
      const result = await processHeroImage(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.85,
        format: 'image/webp'
      });
      setHeroStats(result);

      let finalUrl = result.dataUrl;

      // If ImgBB API key exists, upload WebP to ImgBB
      const imgbbKey = siteCfg.imgbbKey || window.GN_IMGBB_KEY;
      if (imgbbKey && result.blob) {
        try {
          const body = new FormData();
          body.append('image', result.blob, `${file.name.replace(/\.[^.]+$/, '')}_1920.webp`);
          const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, { method: 'POST', body });
          const json = await res.json();
          if (json.success && json.data?.url) {
            finalUrl = json.data.url;
            toast.success('Uploaded to Cloud Storage CDN! ☁️');
          }
        } catch (e) {
          console.warn('ImgBB upload error, using optimized dataUrl:', e);
        }
      }

      setSiteCfg(prev => ({
        ...prev,
        heroBgMode: 'image',
        heroBgUrl: finalUrl
      }));

      toast.success(`Image auto-processed! Scaled to ${result.width}×${result.height} WebP (${result.formattedCompressed}, ${result.reductionRatio}% reduction) 🚀`);
    } catch (err) {
      toast.error('Failed to process image: ' + err.message);
    }
    setHeroProcessing(false);
  };

  const resetHeroToDefault = () => {
    setSiteCfg(prev => ({
      ...prev,
      heroBgMode: 'image',
      heroBgUrl: '/images/college_hero_bg.webp',
      heroOverlayStyle: 'royal-navy',
      heroOverlayGradient: 'linear-gradient(135deg, rgba(15, 35, 71, 0.90) 0%, rgba(10, 25, 47, 0.82) 48%, rgba(15, 35, 71, 0.92) 100%)',
      heroBgPosition: 'center 36%',
      heroKenBurns: true
    }));
    setHeroStats(null);
    toast.success('Reset to Official College Campus Dome Image! 🏛️');
  };

  const resetHeroToMesh = () => {
    setSiteCfg(prev => ({
      ...prev,
      heroBgMode: 'mesh',
      heroBgUrl: ''
    }));
    setHeroStats(null);
    toast.success('Restored to Original Pure Kinetic Animated Mesh! ✨ (No image - Pehle ki tarah)');
  };

  return (
    <div className="fade-up" style={{ maxWidth: 1240, margin: '0 auto', padding: '12px 6px 40px' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16, background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '18px 24px', boxShadow: '0 2px 10px rgba(15,35,71,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: 'linear-gradient(135deg, #0f2347, #1e3a8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, boxShadow: '0 4px 14px rgba(15,35,71,0.2)', flexShrink: 0 }}>
            <Settings size={24} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontWeight: 900, color: NAVY, fontSize: 'clamp(20px, 3.5vw, 24px)', letterSpacing: '-0.5px' }}>
              Site Settings & Central Configuration
            </h1>
            <p style={{ margin: '3px 0 0', color: T.t3, fontSize: 13, fontWeight: 600 }}>
              Institutional identity, social graph simulators, disaster recovery, and system switches.
            </p>
          </div>
        </div>

        <button 
          type="button" 
          onClick={saveSite} 
          className="abtn abtn-gold" 
          disabled={siteLoading}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 26px', fontSize: 13.5 }}
        >
          {siteLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Sub-Navigation Tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 14, marginBottom: 24, borderBottom: '1.5px solid #e2e8f0' }}>
        {subTabs.map(t => {
          const Icon = t.icon;
          const active = activeSubTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveSubTab(t.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 10,
                border: active ? `1.5px solid ${NAVY}` : '1.5px solid #e2e8f0',
                background: active ? NAVY : '#ffffff',
                color: active ? '#ffffff' : '#334155',
                fontWeight: active ? 800 : 600,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.18s ease',
                boxShadow: active ? '0 4px 12px rgba(15,35,71,0.15)' : 'none',
                flexShrink: 0
              }}
            >
              <Icon size={14} color={active ? GOLD : '#64748b'} />
              <span>{t.label}</span>
              {t.id === 'broadcast' && siteCfg.emergencyBroadcastEnabled && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
              )}
            </button>
          );
        })}
      </div>

      <form onSubmit={saveSite}>

        {/* ═════════ 1. GENERAL INFO ═════════ */}
        {activeSubTab === 'general' && (
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Card 1: Institutional Core Identity */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title">
                <Building2 size={18} color={GOLD} />
                <span>Institutional Core Identity</span>
                <span style={{ fontSize: 11, background: 'rgba(15,35,71,0.08)', color: NAVY, padding: '2px 8px', borderRadius: 10, fontWeight: 700, marginLeft: 'auto' }}>
                  Public Header &amp; Branding
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                {field('name', 'College Name', 'text', 'Guru Nanak College')}
                {field('tagline', 'Tagline / Affiliation', 'text', 'Affiliated to B.B.M.K. University, Dhanbad')}
                <div style={{ gridColumn: '1 / -1' }}>
                  {field('footerText', 'Footer Copyright Line', 'text', '© 2026 Guru Nanak College, Dhanbad')}
                </div>
              </div>
            </div>

            {/* Card 2: Official Contact & Campus Location */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title">
                <PhoneCall size={18} color={GOLD} />
                <span>Official Contact &amp; Campus Location</span>
                <span style={{ fontSize: 11, background: 'rgba(15,35,71,0.08)', color: NAVY, padding: '2px 8px', borderRadius: 10, fontWeight: 700, marginLeft: 'auto' }}>
                  Contact Page &amp; Footer
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                {field('phone', 'Public Telephone', 'text', '+91 326 2302324')}
                {field('email', 'Official Email', 'email', 'principal@gncollege.org')}
                <div style={{ gridColumn: '1 / -1' }}>
                  {field('address', 'Full Campus Address', 'text', 'Bank More, Dhanbad — 826001, Jharkhand')}
                </div>
              </div>
            </div>

            {/* Card 3: Emergency Maintenance Mode Banner */}
            <div className="settings-group" style={{ margin: 0, border: siteCfg.maintenanceMode ? '1.5px solid #fca5a5' : '1.5px solid #e2e8f0', background: siteCfg.maintenanceMode ? '#fff5f5' : '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: siteCfg.maintenanceMode ? '#b91c1c' : NAVY, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: siteCfg.maintenanceMode ? '#dc2626' : '#22c55e' }} />
                    Maintenance Mode (Under Construction Screen)
                  </div>
                  <div style={{ fontSize: 12.5, color: T.t3, marginTop: 4, maxWidth: 640 }}>
                    When enabled, public visitors see an official Under Construction / Maintenance notice. Administrators remain fully able to log in and manage the site via <code>/#/admin</code>.
                  </div>
                </div>
                <Toggle
                  checked={siteCfg.maintenanceMode || false}
                  onChange={() => setSiteCfg(d => ({ ...d, maintenanceMode: !d.maintenanceMode }))}
                  label={siteCfg.maintenanceMode ? 'SITE DOWN' : 'SITE LIVE'}
                  color={T.red}
                />
              </div>

              {siteCfg.maintenanceMode && (
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #fed7d7' }}>
                  <label className="alabel">Custom Maintenance Notice Message</label>
                  <input 
                    className="ainp"
                    value={siteCfg.maintenanceMessage || ''}
                    onChange={e => setSiteCfg(d => ({ ...d, maintenanceMessage: e.target.value }))}
                    placeholder="System undergoing scheduled maintenance. Services will resume shortly."
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═════════ 1.5. MASTER THEME, TYPOGRAPHY & CAMPUS MAPS ═════════ */}
        {activeSubTab === 'theme-design' && (
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Top Overview & Master Controls Banner */}
            <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 10px rgba(15,35,71,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #0f2347, #1e3a8a)', color: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(15,35,71,0.2)' }}>
                    <Palette size={22} />
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: NAVY }}>
                      Master Design, Typography, Effects &amp; Dual Campus Maps
                    </h2>
                    <p style={{ margin: '3px 0 0', fontSize: 12.5, color: T.t3 }}>
                      Live real-time control over brand colors, animated gradient themes, fonts, motion physics, and Google Maps across all pages.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => {
                      setSiteCfg(prev => ({
                        ...prev,
                        themePreset: 'royal-navy',
                        themePrimary: '#0f2347',
                        themeAccent: '#f4a023',
                        themeBg: '#f4f7f9',
                        themeSurface: '#ffffff',
                        fontFamily: "'Inter', sans-serif",
                        headingFont: "'Outfit', sans-serif",
                        enableAnimatedGradients: true,
                        enableKenBurns: true,
                        enableCardHoverEffects: true,
                        motionSpeed: 'normal',
                      }));
                      toast.success('Reset to Official GNC Design System! 🏛️');
                    }}
                    className="abtn abtn-outline"
                    style={{ fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px' }}
                  >
                    <RotateCcw size={14} /> Reset System Defaults
                  </button>
                </div>
              </div>
            </div>

            {/* ── LIVE INTERACTIVE WYSIWYG SIMULATOR ── */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Eye size={17} color={GOLD} />
                  <span>Real-Time WYSIWYG Device Simulator (Live Preview)</span>
                </div>
                {/* Device Selector */}
                <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: 3, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  {[
                    { id: 'desktop', label: 'Desktop (100%)', icon: Monitor },
                    { id: 'tablet', label: 'Tablet (768px)', icon: Tablet },
                    { id: 'mobile', label: 'Mobile (390px)', icon: Smartphone }
                  ].map(dev => {
                    const Icon = dev.icon;
                    const active = themePreviewDevice === dev.id;
                    return (
                      <button
                        key={dev.id}
                        type="button"
                        onClick={() => setThemePreviewDevice(dev.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '5px 12px',
                          borderRadius: 7,
                          border: 'none',
                          background: active ? '#ffffff' : 'transparent',
                          color: active ? NAVY : '#64748b',
                          fontWeight: active ? 800 : 600,
                          fontSize: 12,
                          boxShadow: active ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Icon size={13} /> {dev.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Simulator Frame */}
              <div style={{ padding: '16px 20px 24px', background: '#f8fafc', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                <div 
                  style={{ 
                    maxWidth: themePreviewDevice === 'mobile' ? 400 : themePreviewDevice === 'tablet' ? 768 : '100%',
                    margin: '0 auto',
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: '2px solid #cbd5e1',
                    boxShadow: '0 12px 36px rgba(15,35,71,0.12)',
                    background: siteCfg.themeBg || '#f4f7f9',
                    fontFamily: siteCfg.fontFamily || "'Inter', sans-serif",
                    transition: 'max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* Simulated TopBar */}
                  <div style={{ background: siteCfg.themePrimary || '#0f2347', color: '#ffffff', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, borderBottom: `2px solid ${siteCfg.themeAccent || '#f4a023'}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 800, color: siteCfg.themeAccent || '#f4a023' }}>📍 GNC DHANBAD</span>
                      <span>• UGC 2(f) &amp; 12(B)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span>Affiliated to BBMKU</span>
                    </div>
                  </div>

                  {/* Simulated Navbar */}
                  <div style={{ background: '#ffffff', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src="images/logo.webp" alt="GNC" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 900, color: siteCfg.themePrimary || '#0f2347', fontFamily: siteCfg.headingFont || "'Outfit', sans-serif" }}>
                          Guru Nanak College
                        </div>
                        <div style={{ fontSize: 10, color: '#64748b' }}>Dhanbad, Jharkhand</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: siteCfg.themePrimary || '#0f2347' }}>Home</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: siteCfg.themePrimary || '#0f2347' }}>About</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: siteCfg.themePrimary || '#0f2347' }}>Academics</span>
                      <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, background: siteCfg.themeAccent || '#f4a023', color: siteCfg.themePrimary || '#0f2347', fontWeight: 900 }}>
                        Apply
                      </span>
                    </div>
                  </div>

                  {/* Simulated Hero Section */}
                  <div 
                    style={{ 
                      padding: '36px 20px', 
                      textAlign: 'center', 
                      color: '#ffffff',
                      background: siteCfg.heroBgMode === 'mesh'
                        ? (siteCfg.enableAnimatedGradients ? 'linear-gradient(-45deg, #0f2347, #1e3a8a, #0c1c38, #1e40af)' : siteCfg.themePrimary || '#0f2347')
                        : (siteCfg.heroOverlayGradient || 'linear-gradient(135deg, rgba(15, 35, 71, 0.90) 0%, rgba(10, 25, 47, 0.82) 48%, rgba(15, 35, 71, 0.92) 100%)'),
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.14)', border: `1px solid ${siteCfg.themeAccent || '#f4a023'}`, padding: '3px 12px', borderRadius: 20, marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: siteCfg.themeAccent || '#f4a023' }}>ESTABLISHED 1970</span>
                    </div>
                    <h1 style={{ 
                      margin: '0 0 8px', 
                      fontSize: themePreviewDevice === 'mobile' ? 22 : 28, 
                      fontWeight: siteCfg.headingWeight || 900, 
                      fontFamily: siteCfg.headingFont || "'Outfit', sans-serif",
                      textTransform: siteCfg.headingTransform || 'none',
                      backgroundImage: siteCfg.enableDualHeading !== false 
                        ? (siteCfg.heroHeadingGradient || `linear-gradient(${siteCfg.heroHeadingAngle || '135deg'}, ${siteCfg.heroHeadingStart || '#ffffff'} 35%, ${siteCfg.heroHeadingEnd || '#f4a023'} 100%)`)
                        : 'none',
                      WebkitBackgroundClip: siteCfg.enableDualHeading !== false ? 'text' : 'border-box',
                      WebkitTextFillColor: siteCfg.enableDualHeading !== false ? 'transparent' : '#ffffff',
                      color: '#ffffff',
                      display: 'inline-block',
                      textShadow: siteCfg.heroHeadingShadow || '0 4px 18px rgba(0,0,0,0.45)'
                    }}>
                      Guru Nanak College • Dhanbad
                    </h1>
                    <p style={{ maxWidth: 540, margin: '0 auto 18px', fontSize: 13, opacity: 0.9, lineHeight: 1.5, color: '#f8fafc' }}>
                      NAAC Accredited Premier Sikh Minority Degree College affiliated with B.B.M.K. University.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <button 
                        type="button" 
                        style={{ 
                          padding: '8px 20px', 
                          borderRadius: 8, 
                          background: siteCfg.themeAccent || '#f4a023', 
                          color: siteCfg.themePrimary || '#0f2347', 
                          fontWeight: 900, 
                          border: 'none', 
                          fontSize: 12.5,
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)' 
                        }}
                      >
                        Explore Programs
                      </button>
                      <button 
                        type="button" 
                        style={{ 
                          padding: '8px 18px', 
                          borderRadius: 8, 
                          background: 'rgba(255,255,255,0.12)', 
                          color: '#ffffff', 
                          fontWeight: 700, 
                          border: '1px solid rgba(255,255,255,0.3)', 
                          fontSize: 12.5,
                          cursor: 'pointer' 
                        }}
                      >
                        Contact Campuses
                      </button>
                    </div>
                  </div>

                  {/* Simulated Content & Milestone Preview Card */}
                  <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: themePreviewDevice === 'mobile' ? '1fr' : '1.2fr 1fr', gap: 16 }}>
                    <div style={{ background: siteCfg.themeSurface || '#ffffff', borderRadius: 12, padding: 16, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: siteCfg.themeAccent || '#f4a023', textTransform: 'uppercase' }}>Sample Milestone Card</span>
                      </div>
                      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: siteCfg.themePrimary || '#0f2347', fontFamily: siteCfg.headingFont || "'Outfit', sans-serif" }}>
                        NEP-2020 &amp; Digital Campus
                      </h3>
                      <p style={{ margin: 0, fontSize: 12.5, color: '#475569', lineHeight: 1.55 }}>
                        Complete rollout of 4-year FYUGP degree courses, smart audio-visual lecture halls, and digitized library.
                      </p>
                    </div>

                    <div style={{ background: siteCfg.themeSurface || '#ffffff', borderRadius: 12, padding: 16, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: siteCfg.themePrimary || '#0f2347', marginBottom: 6, fontFamily: siteCfg.headingFont || "'Outfit', sans-serif" }}>
                        Active Configuration Spec
                      </div>
                      <div style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.6 }}>
                        Body Font: <b>{siteCfg.fontFamily || 'Inter'}</b><br />
                        Heading Font: <b>{siteCfg.headingFont || 'Outfit'}</b><br />
                        Motion: <b>{siteCfg.motionSpeed || 'Normal (60fps)'}</b><br />
                        Gradients: <b>{siteCfg.enableAnimatedGradients ? 'Animated (Active)' : 'Static'}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 1-CLICK MASTER THEME PRESETS ── */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title">
                <Sparkles size={17} color={GOLD} />
                <span>1-Click Master Theme &amp; Color Combinations (Curated Presets)</span>
                <span style={{ fontSize: 11, background: 'rgba(244,160,35,0.15)', color: NAVY, padding: '2px 8px', borderRadius: 10, fontWeight: 800, marginLeft: 'auto' }}>
                  Instant Apply
                </span>
              </div>

              <div style={{ padding: '0 20px 20px' }}>
                <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 16px', lineHeight: 1.6 }}>
                  Click any master preset to immediately update the color scheme, gradients, and animated backdrop across the entire website.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
                  {THEME_PRESETS.map(preset => {
                    const isSelected = siteCfg.themePreset === preset.id || (siteCfg.themePrimary === preset.primary && siteCfg.themeAccent === preset.accent);
                    return (
                      <div
                        key={preset.id}
                        onClick={() => {
                          setSiteCfg(prev => ({
                            ...prev,
                            themePreset: preset.id,
                            themePrimary: preset.primary,
                            themeAccent: preset.accent,
                            themeBg: preset.bg,
                            themeSurface: preset.surface,
                            heroOverlayGradient: preset.gradient,
                            enableAnimatedGradients: preset.isAnimatedDefault
                          }));
                          toast.success(`Theme applied: ${preset.name} ✨`);
                        }}
                        style={{
                          border: isSelected ? `2px solid ${preset.accent}` : '1.5px solid #e2e8f0',
                          borderRadius: 14,
                          padding: 14,
                          background: '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          boxShadow: isSelected ? `0 8px 24px ${preset.accent}33` : '0 2px 8px rgba(0,0,0,0.03)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Gradient Swatch Header */}
                        <div style={{ height: 44, borderRadius: 8, background: preset.gradient, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px' }}>
                          <span style={{ fontSize: 10.5, fontWeight: 900, color: '#ffffff', background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: 6 }}>
                            {preset.tag}
                          </span>
                          <span style={{ width: 18, height: 18, borderRadius: '50%', background: preset.accent, border: '2px solid #ffffff', display: 'inline-block' }} />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ fontWeight: 800, fontSize: 13.5, color: NAVY }}>{preset.name}</div>
                          {isSelected && (
                            <span style={{ fontSize: 11, fontWeight: 900, color: preset.accent, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Check size={14} /> ACTIVE
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: 8, marginTop: 8, fontSize: 11, color: '#64748b' }}>
                          <span>Primary: <code>{preset.primary}</code></span>
                          <span>Accent: <code>{preset.accent}</code></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── 1. TWO-TONE SOLID SPLIT COLOR HEADINGS STUDIO (MATCHING UPLOADED IMAGE) ── */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Type size={17} color={GOLD} />
                  <span>Two-Tone Solid Split Headings Studio (Matching Uploaded Image)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>Enable Two-Tone Headings</span>
                  <Toggle
                    checked={siteCfg.enableDualHeading !== false}
                    onChange={() => setSiteCfg(d => ({ ...d, enableDualHeading: d.enableDualHeading === false }))}
                  />
                </div>
              </div>

              <div style={{ padding: '0 20px 20px' }}>
                <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 16px', lineHeight: 1.6 }}>
                  Renders clean, discrete two-tone solid split headings across the website (e.g. <b>"Recent Events &amp;"</b> in solid Deep Navy and <b>"Happenings"</b> in solid Radiant Gold), exactly matching your uploaded image reference without letterform blur or gradients.
                </p>

                {/* Mode Selector */}
                <div style={{ marginBottom: 18, background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>Heading Style Mode:</span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[
                      { id: 'two-tone', label: '✨ Two-Tone Solid Split (Image Style - Recommended)' },
                      { id: 'gradient', label: '🌈 Linear Gradient Blend' },
                      { id: 'solid', label: '⬛ Single Solid Tone' }
                    ].map(m => {
                      const active = (siteCfg.headingMode || 'two-tone') === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSiteCfg(d => ({ ...d, headingMode: m.id }))}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: active ? NAVY : '#ffffff',
                            color: active ? '#ffffff' : '#334155',
                            border: active ? `1.5px solid ${NAVY}` : '1px solid #cbd5e1',
                            boxShadow: active ? '0 2px 6px rgba(15,35,71,0.2)' : 'none'
                          }}
                        >
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Heading Specimens (Both Section & Hero) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginBottom: 20 }}>
                  {/* Specimen 1: Section Headings (Exact Match to User Uploaded Image) */}
                  <div style={{ background: '#ffffff', borderRadius: 12, padding: '20px 22px', border: '1.5px solid #cbd5e1', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 10.5, fontWeight: 800, color: '#1e40af', background: '#dbeafe', padding: '3px 10px', borderRadius: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        📸 Section Headings (Image Reference)
                      </span>
                      <span style={{ fontSize: 11, color: '#64748b' }}>Light Background</span>
                    </div>

                    <div style={{ textAlign: 'left', padding: '10px 0' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: siteCfg.headingAccentColor || '#f4a023', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                        Campus Life
                      </div>
                      <h2 style={{
                        margin: 0,
                        fontSize: 'clamp(24px, 3.2vw, 34px)',
                        fontWeight: siteCfg.headingWeight || 800,
                        fontFamily: siteCfg.headingFont || "'Outfit', sans-serif",
                        lineHeight: 1.15,
                        letterSpacing: '-0.5px',
                        color: siteCfg.headingMode === 'solid' 
                          ? (siteCfg.headingPrimaryColor || '#0f2347') 
                          : (siteCfg.headingPrimaryColor || '#0f2347')
                      }}>
                        {siteCfg.headingMode === 'solid' ? (
                          'Recent Events & Happenings'
                        ) : siteCfg.headingMode === 'gradient' ? (
                          <span style={{
                            backgroundImage: `linear-gradient(${siteCfg.heroHeadingAngle || '135deg'}, ${siteCfg.headingPrimaryColor || '#0f2347'} 35%, ${siteCfg.headingAccentColor || '#f4a023'} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                            Recent Events &amp; Happenings
                          </span>
                        ) : (
                          <>
                            Recent Events &amp;{' '}
                            <span style={{ color: siteCfg.headingAccentColor || siteCfg.themeAccent || '#f4a023' }}>
                              Happenings
                            </span>
                          </>
                        )}
                      </h2>
                      <p style={{ margin: '8px 0 0', fontSize: 12.5, color: '#64748b' }}>
                        A glimpse into the latest seminars, workshops, and campus activities
                      </p>
                    </div>
                  </div>

                  {/* Specimen 2: Hero Banner Titles (Dark Canvas) */}
                  <div style={{ background: '#0f2347', borderRadius: 12, padding: '20px 22px', border: '1.5px solid rgba(244,160,35,0.3)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3)', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 10.5, fontWeight: 800, color: '#f4a023', background: 'rgba(244,160,35,0.15)', padding: '3px 10px', borderRadius: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        🏛️ Hero Banner Titles
                      </span>
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>Dark Hero Canvas</span>
                    </div>

                    <div style={{ textAlign: 'left', padding: '10px 0' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: siteCfg.heroHeadingEnd || '#f4a023', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                        Institutional Profile
                      </div>
                      <h1 style={{
                        margin: 0,
                        fontSize: 'clamp(24px, 3.2vw, 34px)',
                        fontWeight: siteCfg.headingWeight || 900,
                        fontFamily: siteCfg.headingFont || "'Outfit', sans-serif",
                        lineHeight: 1.15,
                        letterSpacing: '-0.5px',
                        color: siteCfg.heroHeadingStart || '#ffffff',
                        textShadow: siteCfg.heroHeadingShadow || '0 4px 18px rgba(0,0,0,0.45)'
                      }}>
                        {siteCfg.headingMode === 'solid' ? (
                          'Guru Nanak College'
                        ) : siteCfg.headingMode === 'gradient' ? (
                          <span style={{
                            backgroundImage: `linear-gradient(${siteCfg.heroHeadingAngle || '135deg'}, ${siteCfg.heroHeadingStart || '#ffffff'} 35%, ${siteCfg.heroHeadingEnd || '#f4a023'} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                            Guru Nanak College
                          </span>
                        ) : (
                          <>
                            Guru Nanak{' '}
                            <span style={{ color: siteCfg.heroHeadingEnd || '#f4a023' }}>
                              College
                            </span>
                          </>
                        )}
                      </h1>
                      <p style={{ margin: '8px 0 0', fontSize: 12.5, color: '#cbd5e1' }}>
                        Affiliated to B.B.M.K. University, Dhanbad
                      </p>
                    </div>
                  </div>
                </div>

                {/* Palette Controls (Light Sections & Dark Heroes) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                  {/* Section Heading Primary Color (Image: Navy #0f2347) */}
                  <div style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>
                      Section Heading Base Color (e.g. "Recent Events &amp;")
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input
                        type="color"
                        value={siteCfg.headingPrimaryColor || '#0f2347'}
                        onChange={e => setSiteCfg(d => ({ ...d, headingPrimaryColor: e.target.value }))}
                        style={{ width: 42, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', padding: 0 }}
                      />
                      <input
                        className="ainp"
                        value={siteCfg.headingPrimaryColor || '#0f2347'}
                        onChange={e => setSiteCfg(d => ({ ...d, headingPrimaryColor: e.target.value }))}
                        style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>

                  {/* Section Heading Accent Color (Image: Gold #f4a023) */}
                  <div style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>
                      Section Heading Accent Color (e.g. "Happenings")
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input
                        type="color"
                        value={siteCfg.headingAccentColor || '#f4a023'}
                        onChange={e => setSiteCfg(d => ({ ...d, headingAccentColor: e.target.value }))}
                        style={{ width: 42, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', padding: 0 }}
                      />
                      <input
                        className="ainp"
                        value={siteCfg.headingAccentColor || '#f4a023'}
                        onChange={e => setSiteCfg(d => ({ ...d, headingAccentColor: e.target.value }))}
                        style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>

                  {/* Hero Heading Primary Color (Dark Canvas: White #ffffff) */}
                  <div style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>
                      Hero Title Base Color (Dark Banner)
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input
                        type="color"
                        value={siteCfg.heroHeadingStart || '#ffffff'}
                        onChange={e => {
                          const val = e.target.value;
                          setSiteCfg(d => ({
                            ...d,
                            heroHeadingStart: val,
                            heroHeadingGradient: `linear-gradient(${d.heroHeadingAngle || '135deg'}, ${val} 35%, ${d.heroHeadingEnd || '#f4a023'} 100%)`
                          }));
                        }}
                        style={{ width: 42, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', padding: 0 }}
                      />
                      <input
                        className="ainp"
                        value={siteCfg.heroHeadingStart || '#ffffff'}
                        onChange={e => {
                          const val = e.target.value;
                          setSiteCfg(d => ({
                            ...d,
                            heroHeadingStart: val,
                            heroHeadingGradient: `linear-gradient(${d.heroHeadingAngle || '135deg'}, ${val} 35%, ${d.heroHeadingEnd || '#f4a023'} 100%)`
                          }));
                        }}
                        style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>

                  {/* Hero Heading Accent Color (Dark Canvas: Gold #f4a023) */}
                  <div style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>
                      Hero Title Accent Keyword Color
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <input
                        type="color"
                        value={siteCfg.heroHeadingEnd || '#f4a023'}
                        onChange={e => {
                          const val = e.target.value;
                          setSiteCfg(d => ({
                            ...d,
                            heroHeadingEnd: val,
                            heroHeadingGradient: `linear-gradient(${d.heroHeadingAngle || '135deg'}, ${d.heroHeadingStart || '#ffffff'} 35%, ${val} 100%)`
                          }));
                        }}
                        style={{ width: 42, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', padding: 0 }}
                      />
                      <input
                        className="ainp"
                        value={siteCfg.heroHeadingEnd || '#f4a023'}
                        onChange={e => {
                          const val = e.target.value;
                          setSiteCfg(d => ({
                            ...d,
                            heroHeadingEnd: val,
                            heroHeadingGradient: `linear-gradient(${d.heroHeadingAngle || '135deg'}, ${d.heroHeadingStart || '#ffffff'} 35%, ${val} 100%)`
                          }));
                        }}
                        style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Instant Quick Presets matching User Reference */}
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: '#64748b' }}>Quick Split Presets:</span>
                  {[
                    { 
                      label: '📸 Uploaded Image (Navy & Gold)', 
                      secPri: '#0f2347', secAcc: '#f4a023', 
                      heroPri: '#ffffff', heroAcc: '#f4a023' 
                    },
                    { 
                      label: '🌌 Deep Midnight & Amber Orange', 
                      secPri: '#0b192c', secAcc: '#f59e0b', 
                      heroPri: '#ffffff', heroAcc: '#f59e0b' 
                    },
                    { 
                      label: '🌿 Forest Slate & Emerald Teal', 
                      secPri: '#064e3b', secAcc: '#10b981', 
                      heroPri: '#ffffff', heroAcc: '#34d399' 
                    },
                    { 
                      label: '💎 Royal Blue & Ruby Crimson', 
                      secPri: '#1e3a8a', secAcc: '#ef4444', 
                      heroPri: '#f8fafc', heroAcc: '#f87171' 
                    },
                  ].map(p => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        setSiteCfg(d => ({
                          ...d,
                          headingMode: 'two-tone',
                          headingPrimaryColor: p.secPri,
                          headingAccentColor: p.secAcc,
                          heroHeadingStart: p.heroPri,
                          heroHeadingEnd: p.heroAcc,
                          heroHeadingGradient: `linear-gradient(135deg, ${p.heroPri} 35%, ${p.heroAcc} 100%)`
                        }));
                        toast.success(`Applied: ${p.label}`);
                      }}
                      style={{
                        padding: '5px 12px',
                        borderRadius: 6,
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        fontSize: 11.5,
                        fontWeight: 600,
                        color: NAVY,
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 2. INTERACTIVE CSS GRADIENT STUDIO (cssgradient.io style) ── */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sparkles size={17} color={GOLD} />
                  <span>CSS Gradient Backgrounds Studio (Inspired by CSSGradient.io)</span>
                </div>
                <span style={{ fontSize: 11, background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 6, fontWeight: 800 }}>
                  Multi-Stop Generator &amp; Trending Presets
                </span>
              </div>

              <div style={{ padding: '0 20px 20px' }}>
                <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 16px', lineHeight: 1.6 }}>
                  Interactive multi-color stop gradient studio. Choose angles, mix colors, browse curated trending gradients, and apply with 1-click to hero or site sections.
                </p>

                {/* Live Gradient Preview Bar */}
                {(() => {
                  const activeGrad = gradType === 'radial'
                    ? `radial-gradient(circle at center, ${gradStop1} 0%, ${gradStop2} 50%, ${gradStop3} 100%)`
                    : `linear-gradient(${gradAngle}deg, ${gradStop1} 0%, ${gradStop2} 50%, ${gradStop3} 100%)`;
                  return (
                    <div style={{ marginBottom: 18 }}>
                      <div
                        style={{
                          height: 70,
                          borderRadius: 14,
                          background: activeGrad,
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                          border: '2px solid #ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 18px',
                          color: '#ffffff'
                        }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 900, background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: 6 }}>
                          {gradType === 'linear' ? `${gradAngle}° Linear` : 'Radial Center'}
                        </span>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(`background: ${activeGrad};`);
                              toast.success('CSS Code Copied to Clipboard! 📋');
                            }}
                            className="abtn"
                            style={{ padding: '6px 12px', fontSize: 11.5, background: 'rgba(255,255,255,0.2)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)' }}
                          >
                            <Copy size={13} /> Copy CSS
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSiteCfg(d => ({ ...d, heroOverlayGradient: activeGrad }));
                              toast.success('Applied to Hero Background Overlay! 🏛️');
                            }}
                            className="abtn abtn-gold"
                            style={{ padding: '6px 14px', fontSize: 11.5 }}
                          >
                            <Sparkles size={13} /> Apply to Hero
                          </button>
                        </div>
                      </div>
                      <div style={{ marginTop: 6, fontSize: 11, color: '#64748b', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <code>background: {activeGrad};</code>
                      </div>
                    </div>
                  );
                })()}

                {/* Color Stops & Angle Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 18 }}>
                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 4 }}>Color Stop 1 (0%)</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="color" value={gradStop1} onChange={e => setGradStop1(e.target.value)} style={{ width: 36, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0 }} />
                      <input className="ainp" value={gradStop1} onChange={e => setGradStop1(e.target.value)} style={{ textTransform: 'uppercase', fontFamily: 'monospace' }} />
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 4 }}>Color Stop 2 (50%)</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="color" value={gradStop2} onChange={e => setGradStop2(e.target.value)} style={{ width: 36, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0 }} />
                      <input className="ainp" value={gradStop2} onChange={e => setGradStop2(e.target.value)} style={{ textTransform: 'uppercase', fontFamily: 'monospace' }} />
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 4 }}>Color Stop 3 (100%)</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="color" value={gradStop3} onChange={e => setGradStop3(e.target.value)} style={{ width: 36, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0 }} />
                      <input className="ainp" value={gradStop3} onChange={e => setGradStop3(e.target.value)} style={{ textTransform: 'uppercase', fontFamily: 'monospace' }} />
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <label className="alabel" style={{ margin: 0 }}>Angle: <b>{gradAngle}°</b></label>
                      <button
                        type="button"
                        onClick={() => setGradType(t => t === 'linear' ? 'radial' : 'linear')}
                        style={{ border: 'none', background: 'none', color: NAVY, fontWeight: 700, fontSize: 11, cursor: 'pointer' }}
                      >
                        Mode: {gradType.toUpperCase()}
                      </button>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="15"
                      value={gradAngle}
                      onChange={e => setGradAngle(parseInt(e.target.value, 10))}
                      style={{ width: '100%', accentColor: GOLD, cursor: 'pointer' }}
                    />
                  </div>
                </div>

                {/* Curated Trending Presets (cssgradient.io gallery) */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: NAVY, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Sparkles size={14} color={GOLD} />
                    <span>12 Trending Presets from Gradient Library</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
                    {GRADIENT_PRESETS.map((p, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSiteCfg(d => ({ ...d, heroOverlayGradient: p.grad }));
                          toast.success(`Applied ${p.name} to Hero Background! ✨`);
                        }}
                        style={{
                          height: 52,
                          borderRadius: 10,
                          background: p.grad,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0 12px',
                          color: '#ffffff',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                          transition: 'transform 0.15s ease',
                          border: '1.5px solid rgba(255,255,255,0.3)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <span style={{ fontSize: 11, fontWeight: 800, textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>{p.name}</span>
                        <ArrowUpRight size={13} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── 3. 5-COLOR HARMONY & PALETTE STUDIO (paletacolorpro.com style) ── */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Palette size={17} color={GOLD} />
                  <span>5-Color Harmony &amp; Palette Studio (Inspired by PaletaColorPro)</span>
                </div>
                <span style={{ fontSize: 11, background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: 6, fontWeight: 800 }}>
                  WCAG Contrast Tested
                </span>
              </div>

              <div style={{ padding: '0 20px 20px' }}>
                <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 16px', lineHeight: 1.6 }}>
                  Complete 5-swatch color strip (Primary, Secondary, Accent, Surface, Canvas). Each color is checked for WCAG accessibility and contrast against light and dark text.
                </p>

                {/* 5-Color Swatch Strip with Contrast Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 18 }}>
                  {[
                    { key: 'themePrimary', label: '1. Primary Brand', def: '#0f2347' },
                    { key: 'themeSecondary', label: '2. Secondary', def: '#1e3a8a' },
                    { key: 'themeAccent', label: '3. Accent Gold', def: '#f4a023' },
                    { key: 'themeSurface', label: '4. Card Surface', def: '#ffffff' },
                    { key: 'themeBg', label: '5. Page Canvas', def: '#f4f7f9' },
                  ].map(sw => {
                    const col = siteCfg[sw.key] || sw.def;
                    const contrastOnWhite = getContrastRatio(col, '#ffffff');
                    const isAA = contrastOnWhite >= 4.5;
                    const isAAA = contrastOnWhite >= 7.0;
                    return (
                      <div key={sw.key} style={{ background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}>
                        <div style={{ height: 48, borderRadius: 8, background: col, marginBottom: 8, border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 10, fontWeight: 900, color: contrastOnWhite > 4.5 ? '#ffffff' : '#0f2347' }}>
                            {contrastOnWhite}:1
                          </span>
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{sw.label}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <input
                            type="color"
                            value={col}
                            onChange={e => setSiteCfg(d => ({ ...d, [sw.key]: e.target.value }))}
                            style={{ width: 28, height: 28, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0 }}
                          />
                          <input
                            className="ainp"
                            value={col}
                            onChange={e => setSiteCfg(d => ({ ...d, [sw.key]: e.target.value }))}
                            style={{ textTransform: 'uppercase', fontFamily: 'monospace', fontSize: 11, padding: '4px 6px' }}
                          />
                        </div>
                        <div style={{ marginTop: 6 }}>
                          <span style={{ fontSize: 9.5, fontWeight: 800, padding: '1px 6px', borderRadius: 4, background: isAAA ? '#dcfce7' : isAA ? '#fef3c7' : '#fee2e2', color: isAAA ? '#15803d' : isAA ? '#b45309' : '#b91c1c' }}>
                            {isAAA ? 'AAA Passed' : isAA ? 'AA Passed' : 'Low Contrast'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pre-Built Palette Collections */}
                <div style={{ fontSize: 12.5, fontWeight: 800, color: NAVY, marginBottom: 10 }}>
                  Curated Collegiate &amp; Modern Palette Collections:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
                  {PALETA_COLLECTIONS.map((pal, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSiteCfg(d => ({
                          ...d,
                          themePrimary: pal.themePrimary,
                          themeSecondary: pal.themeSecondary,
                          themeAccent: pal.themeAccent,
                          themeSurface: pal.themeSurface,
                          themeBg: pal.themeBg
                        }));
                        toast.success(`Activated: ${pal.name} Palette! 🎨`);
                      }}
                      style={{
                        background: '#ffffff',
                        border: '1.5px solid #e2e8f0',
                        borderRadius: 12,
                        padding: 12,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                      }}
                    >
                      <div style={{ display: 'flex', height: 26, borderRadius: 6, overflow: 'hidden', marginBottom: 8 }}>
                        <div style={{ flex: 1, background: pal.themePrimary }} />
                        <div style={{ flex: 1, background: pal.themeSecondary }} />
                        <div style={{ flex: 1, background: pal.themeAccent }} />
                        <div style={{ flex: 1, background: pal.themeSurface }} />
                        <div style={{ flex: 1, background: pal.themeBg }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: NAVY }}>{pal.name}</div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>
                          {pal.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 4. UNIVERSAL TYPOGRAPHY & DEEP GLOBAL STYLING ── */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title">
                <Type size={17} color={GOLD} />
                <span>Universal Typography &amp; Deep Styling Suite</span>
              </div>

              <div style={{ padding: '0 20px 20px' }}>
                <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 16px', lineHeight: 1.6 }}>
                  Configure font pairings, paragraph line height (leading), letter spacing (tracking), heading weights, custom bullets, and text alignments across the entire website.
                </p>

                {/* Primary Font Selectors */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 18 }}>
                  {/* Body Font */}
                  <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>Body &amp; Paragraph Font (<code>--font-sans</code>)</label>
                    <select
                      className="ainp"
                      value={siteCfg.fontFamily || "'Inter', sans-serif"}
                      onChange={e => setSiteCfg(d => ({ ...d, fontFamily: e.target.value }))}
                    >
                      {FONT_OPTIONS.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                    <div style={{ marginTop: 10, padding: '10px 14px', background: '#ffffff', borderRadius: 8, border: '1px solid #e2e8f0', fontFamily: siteCfg.fontFamily || "'Inter', sans-serif" }}>
                      <div style={{ fontSize: 13, color: siteCfg.textColorPrimary || '#0f2347' }}>
                        The quick brown fox jumps over the lazy dog. 0123456789.
                      </div>
                    </div>
                  </div>

                  {/* Heading Font */}
                  <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>Headings &amp; Titles Font (<code>--font-heading</code>)</label>
                    <select
                      className="ainp"
                      value={siteCfg.headingFont || "'Outfit', sans-serif"}
                      onChange={e => setSiteCfg(d => ({ ...d, headingFont: e.target.value }))}
                    >
                      {FONT_OPTIONS.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                    <div style={{ marginTop: 10, padding: '10px 14px', background: '#ffffff', borderRadius: 8, border: '1px solid #e2e8f0', fontFamily: siteCfg.headingFont || "'Outfit', sans-serif" }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: siteCfg.themePrimary || '#0f2347' }}>
                        Guru Nanak College • Excellence in Education
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deep Metrics: Line-height, Letter-spacing, Font Weight, Heading Transform */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 18 }}>
                  {/* Line Height */}
                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>Paragraph Line Height (Leading)</label>
                    <select
                      className="ainp"
                      value={siteCfg.bodyLineHeight || '1.62'}
                      onChange={e => setSiteCfg(d => ({ ...d, bodyLineHeight: e.target.value }))}
                    >
                      <option value="1.45">1.45 — Compact (Editorial)</option>
                      <option value="1.62">1.62 — Normal (Optimal Standard)</option>
                      <option value="1.85">1.85 — Relaxed (Maximum Air)</option>
                    </select>
                  </div>

                  {/* Letter Spacing */}
                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>Letter Spacing (Tracking)</label>
                    <select
                      className="ainp"
                      value={siteCfg.bodyLetterSpacing || 'normal'}
                      onChange={e => setSiteCfg(d => ({ ...d, bodyLetterSpacing: e.target.value }))}
                    >
                      <option value="-0.5px">Tight (-0.5px)</option>
                      <option value="normal">Normal (0px Standard)</option>
                      <option value="0.5px">Spaced (+0.5px)</option>
                      <option value="1px">Wide (+1.0px)</option>
                    </select>
                  </div>

                  {/* Heading Transform */}
                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>Heading Text Transform</label>
                    <select
                      className="ainp"
                      value={siteCfg.headingTransform || 'none'}
                      onChange={e => setSiteCfg(d => ({ ...d, headingTransform: e.target.value }))}
                    >
                      <option value="none">Normal (As Written)</option>
                      <option value="capitalize">Capitalize Each Word</option>
                      <option value="uppercase">UPPERCASE (Institutional)</option>
                    </select>
                  </div>

                  {/* Heading Weight */}
                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>Heading Font Weight</label>
                    <select
                      className="ainp"
                      value={siteCfg.headingWeight || '800'}
                      onChange={e => setSiteCfg(d => ({ ...d, headingWeight: e.target.value }))}
                    >
                      <option value="700">700 — Bold</option>
                      <option value="800">800 — Extra Bold</option>
                      <option value="900">900 — Black / Ultra Heavy</option>
                    </select>
                  </div>
                </div>

                {/* Bullets Style, Text Alignment, Text Colors */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                  {/* Bullets Style */}
                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>Custom Bullet Markers</label>
                    <select
                      className="ainp"
                      value={siteCfg.bulletStyle || 'default'}
                      onChange={e => setSiteCfg(d => ({ ...d, bulletStyle: e.target.value }))}
                    >
                      <option value="default">Default Round Dot (•)</option>
                      <option value="check">Golden Checkmark (✓)</option>
                      <option value="diamond">Golden Diamond (◆)</option>
                      <option value="arrow">Modern Arrow (→)</option>
                    </select>
                  </div>

                  {/* Text Alignment */}
                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>Default Text Alignment</label>
                    <select
                      className="ainp"
                      value={siteCfg.textAlignDefault || 'justify'}
                      onChange={e => setSiteCfg(d => ({ ...d, textAlignDefault: e.target.value }))}
                    >
                      <option value="left">Left Aligned</option>
                      <option value="justify">Justified (Newspaper Editorial)</option>
                      <option value="center">Centered</option>
                    </select>
                  </div>

                  {/* Primary Text Color */}
                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>Primary Body Text Color</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="color"
                        value={siteCfg.textColorPrimary || '#0f2347'}
                        onChange={e => setSiteCfg(d => ({ ...d, textColorPrimary: e.target.value }))}
                        style={{ width: 34, height: 34, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0 }}
                      />
                      <input
                        className="ainp"
                        value={siteCfg.textColorPrimary || '#0f2347'}
                        onChange={e => setSiteCfg(d => ({ ...d, textColorPrimary: e.target.value }))}
                        style={{ textTransform: 'uppercase', fontFamily: 'monospace', fontSize: 11 }}
                      />
                    </div>
                  </div>

                  {/* Muted Text Color */}
                  <div style={{ background: '#f8fafc', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>Secondary / Muted Text Color</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="color"
                        value={siteCfg.textColorMuted || '#64748b'}
                        onChange={e => setSiteCfg(d => ({ ...d, textColorMuted: e.target.value }))}
                        style={{ width: 34, height: 34, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0 }}
                      />
                      <input
                        className="ainp"
                        value={siteCfg.textColorMuted || '#64748b'}
                        onChange={e => setSiteCfg(d => ({ ...d, textColorMuted: e.target.value }))}
                        style={{ textTransform: 'uppercase', fontFamily: 'monospace', fontSize: 11 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 5. HERO BACKGROUND VISUAL EFFECTS & OVERLAY CUSTOMIZER ── */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title">
                <Layers size={17} color={GOLD} />
                <span>Hero Background Visual Effects &amp; Kinetic Overlay Suite</span>
              </div>

              <div style={{ padding: '0 20px 20px' }}>
                <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 16px', lineHeight: 1.6 }}>
                  Choose subtle futuristic overlay effects, dark tones, and backdrop blur to ensure hero headings pop with crystal clarity.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                  {/* Visual Effect Selector */}
                  <div style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <label className="alabel" style={{ marginBottom: 6 }}>Kinetic Visual Effect Overlay</label>
                    <select
                      className="ainp"
                      value={siteCfg.heroVisualEffect || 'none'}
                      onChange={e => setSiteCfg(d => ({ ...d, heroVisualEffect: e.target.value }))}
                    >
                      <option value="none">None — Clean High Contrast</option>
                      <option value="grid">Cyber Tech Dot Grid (Subtle Matrix)</option>
                      <option value="aurora">Aurora Waves (Flowing Luminous Ribbons)</option>
                      <option value="lines">Geometric Angled Scanlines</option>
                    </select>
                  </div>

                  {/* Backdrop Blur Strength */}
                  <div style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <label className="alabel" style={{ margin: 0 }}>Backdrop Blur: <b>{siteCfg.heroBackdropBlur || '0px'}</b></label>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="24"
                      step="2"
                      value={parseInt(siteCfg.heroBackdropBlur || '0', 10)}
                      onChange={e => setSiteCfg(d => ({ ...d, heroBackdropBlur: `${e.target.value}px` }))}
                      style={{ width: '100%', accentColor: GOLD, cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8', marginTop: 4 }}>
                      <span>0px (Crisp)</span>
                      <span>8px</span>
                      <span>16px</span>
                      <span>24px (Soft Frosted Glass)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── ANIMATION & MOTION PHYSICS ENGINE ── */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title">
                <Zap size={17} color={GOLD} />
                <span>Animation, Gradient Motion &amp; Micro-Interactions</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, padding: '0 20px 20px' }}>
                <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: NAVY }}>Dynamic Gradient Animation</div>
                    <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2 }}>Subtle shifting hue &amp; luminous gradient glow</div>
                  </div>
                  <Toggle
                    checked={siteCfg.enableAnimatedGradients ?? true}
                    onChange={() => setSiteCfg(d => ({ ...d, enableAnimatedGradients: !d.enableAnimatedGradients }))}
                  />
                </div>

                <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: NAVY }}>Card 3D Lift &amp; Hover Glow</div>
                    <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2 }}>Elevation transition on milestones &amp; department cards</div>
                  </div>
                  <Toggle
                    checked={siteCfg.enableCardHoverEffects ?? true}
                    onChange={() => setSiteCfg(d => ({ ...d, enableCardHoverEffects: !d.enableCardHoverEffects }))}
                  />
                </div>

                <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: NAVY }}>Ken Burns Hero Zoom Effect</div>
                    <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2 }}>Cinematic slow pan-and-zoom on campus hero</div>
                  </div>
                  <Toggle
                    checked={siteCfg.heroKenBurns ?? true}
                    onChange={() => setSiteCfg(d => ({ ...d, heroKenBurns: !d.heroKenBurns }))}
                  />
                </div>

                <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <label className="alabel" style={{ marginBottom: 6 }}>Global Motion &amp; Transition Speed</label>
                  <select
                    className="ainp"
                    value={siteCfg.motionSpeed || 'normal'}
                    onChange={e => setSiteCfg(d => ({ ...d, motionSpeed: e.target.value }))}
                  >
                    <option value="normal">Normal (60fps Fluid Standard)</option>
                    <option value="smooth">Smooth (Cinematic 1.5x Slow Easing)</option>
                    <option value="off">Off (WCAG Reduced Motion - Immediate)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ── DUAL CAMPUS INTERACTIVE GOOGLE MAPS HUB ── */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={17} color={GOLD} />
                  <span>Dual Campus Interactive Google Maps Configurator</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => setMapTestCampus('bhuda')}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 6,
                      fontSize: 11.5,
                      fontWeight: 800,
                      border: 'none',
                      background: mapTestCampus === 'bhuda' ? NAVY : '#e2e8f0',
                      color: mapTestCampus === 'bhuda' ? GOLD : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Bhuda Campus Map
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapTestCampus('bankMore')}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 6,
                      fontSize: 11.5,
                      fontWeight: 800,
                      border: 'none',
                      background: mapTestCampus === 'bankMore' ? NAVY : '#e2e8f0',
                      color: mapTestCampus === 'bankMore' ? GOLD : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Bank More Campus Map
                  </button>
                </div>
              </div>

              <div style={{ padding: '0 20px 20px' }}>
                <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 16px', lineHeight: 1.6 }}>
                  Configure Google Maps embed iframes and navigation links for both college campuses. Changes sync live to Contact page, Footer, and Profile.
                </p>

                {/* Campus 1: Bhuda */}
                <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: 18, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 20 }}>🏛️</span>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 900, color: NAVY }}>
                      Campus 1: Bhuda Main Campus (Boys &amp; Co-Educational Complex)
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                    <div>
                      <label className="alabel" style={{ marginBottom: 6 }}>Campus Title</label>
                      <input
                        className="ainp"
                        value={siteCfg.campusBhudaTitle || ''}
                        placeholder="Bhuda Main Campus (Dhanbad)"
                        onChange={e => setSiteCfg(d => ({ ...d, campusBhudaTitle: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="alabel" style={{ marginBottom: 6 }}>Physical Campus Address</label>
                      <input
                        className="ainp"
                        value={siteCfg.campusBhudaAddress || ''}
                        placeholder="Guru Nanak College, Bhuda, Dhanbad..."
                        onChange={e => setSiteCfg(d => ({ ...d, campusBhudaAddress: e.target.value }))}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="alabel" style={{ marginBottom: 6 }}>Google Maps Embed Iframe URL (<code>src=...</code>)</label>
                      <input
                        className="ainp"
                        value={siteCfg.campusBhudaMapUrl || ''}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        onChange={e => {
                          let val = e.target.value;
                          const m = val.match(/src="([^"]+)"/);
                          if (m) val = m[1];
                          setSiteCfg(d => ({ ...d, campusBhudaMapUrl: val }));
                        }}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="alabel" style={{ marginBottom: 6 }}>Direct Google Maps Directions / Pinpoint URL</label>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <input
                          className="ainp"
                          value={siteCfg.campusBhudaDirectionsUrl || ''}
                          placeholder="https://www.google.com/maps/search/?api=1&query=..."
                          onChange={e => setSiteCfg(d => ({ ...d, campusBhudaDirectionsUrl: e.target.value }))}
                        />
                        {siteCfg.campusBhudaDirectionsUrl && (
                          <a
                            href={siteCfg.campusBhudaDirectionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="abtn abtn-outline"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0, textDecoration: 'none' }}
                          >
                            <ExternalLink size={14} /> Open Map
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Campus 2: Bank More */}
                <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: 18, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 20 }}>👩‍🎓</span>
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 900, color: NAVY }}>
                      Campus 2: Bank More Campus (Dedicated Women's Morning Wing)
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                    <div>
                      <label className="alabel" style={{ marginBottom: 6 }}>Campus Title</label>
                      <input
                        className="ainp"
                        value={siteCfg.campusBankMoreTitle || ''}
                        placeholder="Bank More Campus — Women's Wing"
                        onChange={e => setSiteCfg(d => ({ ...d, campusBankMoreTitle: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="alabel" style={{ marginBottom: 6 }}>Physical Campus Address</label>
                      <input
                        className="ainp"
                        value={siteCfg.campusBankMoreAddress || ''}
                        placeholder="Guru Nanak College Women's Wing, Bank More, Dhanbad..."
                        onChange={e => setSiteCfg(d => ({ ...d, campusBankMoreAddress: e.target.value }))}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="alabel" style={{ marginBottom: 6 }}>Google Maps Embed Iframe URL (<code>src=...</code>)</label>
                      <input
                        className="ainp"
                        value={siteCfg.campusBankMoreMapUrl || ''}
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        onChange={e => {
                          let val = e.target.value;
                          const m = val.match(/src="([^"]+)"/);
                          if (m) val = m[1];
                          setSiteCfg(d => ({ ...d, campusBankMoreMapUrl: val }));
                        }}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="alabel" style={{ marginBottom: 6 }}>Direct Google Maps Directions / Pinpoint URL</label>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <input
                          className="ainp"
                          value={siteCfg.campusBankMoreDirectionsUrl || ''}
                          placeholder="https://www.google.com/maps/search/?api=1&query=..."
                          onChange={e => setSiteCfg(d => ({ ...d, campusBankMoreDirectionsUrl: e.target.value }))}
                        />
                        {siteCfg.campusBankMoreDirectionsUrl && (
                          <a
                            href={siteCfg.campusBankMoreDirectionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="abtn abtn-outline"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0, textDecoration: 'none' }}
                          >
                            <ExternalLink size={14} /> Open Map
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Embedded Map Preview */}
                <div style={{ background: '#f8fafc', borderRadius: 14, padding: 18, border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>Live Embedded Map Test ({mapTestCampus === 'bhuda' ? 'Bhuda Main Campus' : 'Bank More Women\'s Wing'})</span>
                      <span style={{ fontSize: 11, background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                        Interactive
                      </span>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: 280, borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', background: '#e2e8f0' }}>
                    <iframe
                      title="Campus Map Preview"
                      src={mapTestCampus === 'bhuda' ? (siteCfg.campusBhudaMapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.089853381653!2d86.43232147533682!3d23.797658878638367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f69707963d7e8b%3A0x86733221469e7f7b!2sGuru%20Nanak%20College%20Dhanbad!5e0!3m2!1sen!2sin!4v1708688000000!5m2!1sen!2sin') : (siteCfg.campusBankMoreMapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.630325992144!2d86.4175863149822!3d23.77601898456687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a3048817a859%3A0x8d365f7d34c52968!2sGuru%20Nanak%20College%20Womens%20Wing!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin')}
                      style={{ width: '100%', height: '100%', border: 0 }}
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ═════════ 2. SOCIAL & LIVE SEO GRAPH SIMULATOR ═════════ */}
        {activeSubTab === 'social-seo' && (
          <div className="fade-up">
            <div className="settings-group">
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Globe size={17} color={GOLD} />
                <span>Official Social Media Channels</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                {['facebook', 'twitter', 'youtube', 'linkedin'].map(s => (
                  <div key={s} style={{ marginBottom: 4 }}>
                    <label className="alabel" style={{ textTransform: 'capitalize', marginBottom: 6 }}>{s} Profile URL</label>
                    <input 
                      className="ainp" 
                      value={siteCfg[s] || ''}
                      onChange={e => setSiteCfg(d => ({ ...d, [s]: e.target.value }))}
                      placeholder={`https://${s}.com/...`} 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 🚀 REAL-TIME OPEN GRAPH & SERP SIMULATOR */}
            <div className="settings-group" style={{ marginTop: 24 }}>
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Share2 size={17} color={GOLD} />
                  <span>Live Social Graph & Search Engine Simulator</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 6, background: '#e0f2fe', color: '#0369a1' }}>
                  Live Interactive
                </span>
              </div>

              <div style={{ padding: '0 20px 20px' }}>
                {/* Meta Fields */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label className="alabel" style={{ margin: 0 }}>SEO Meta Title Tag</label>
                    <span style={{ fontSize: 11, fontWeight: 700, color: (siteCfg.metaTitle?.length || 0) > 60 ? '#ef4444' : '#10b981' }}>
                      {siteCfg.metaTitle?.length || 0} / 60 characters (Optimal: 50–60)
                    </span>
                  </div>
                  <input 
                    className="ainp"
                    value={siteCfg.metaTitle || ''}
                    onChange={e => setSiteCfg(d => ({ ...d, metaTitle: e.target.value }))}
                    placeholder="Enter page title tag for Google and social previews..."
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label className="alabel" style={{ margin: 0 }}>SEO Meta Description</label>
                    <span style={{ fontSize: 11, fontWeight: 700, color: (siteCfg.metaDescription?.length || 0) > 160 ? '#ef4444' : '#10b981' }}>
                      {siteCfg.metaDescription?.length || 0} / 160 characters (Optimal: 120–160)
                    </span>
                  </div>
                  <textarea 
                    className="ainp"
                    rows={3}
                    value={siteCfg.metaDescription || ''}
                    onChange={e => setSiteCfg(d => ({ ...d, metaDescription: e.target.value }))}
                    placeholder="Concise overview snippet for search results..."
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Simulator Platform Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: NAVY }}>PREVIEW AS:</span>
                  {[
                    { id: 'whatsapp', label: '💬 WhatsApp' },
                    { id: 'facebook', label: '📘 Facebook / LinkedIn' },
                    { id: 'twitter',  label: '𝕏 Twitter' },
                    { id: 'google',   label: '🔍 Google SERP' },
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSocialPlatform(p.id)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 700,
                        border: socialPlatform === p.id ? `1.5px solid ${NAVY}` : '1.5px solid #cbd5e1',
                        background: socialPlatform === p.id ? '#0f2347' : '#f8fafc',
                        color: socialPlatform === p.id ? '#ffffff' : '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Simulation Canvas / Card Display */}
                <div style={{ background: '#f1f5f9', padding: 24, borderRadius: 16, border: '1.5px dashed #cbd5e1' }}>
                  
                  {/* 1. WHATSAPP CARD */}
                  {socialPlatform === 'whatsapp' && (
                    <div style={{ maxWidth: 360, background: '#ffffff', borderRadius: 12, padding: 12, boxShadow: '0 4px 14px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', margin: '0 auto' }}>
                      <div style={{ width: '100%', height: 160, background: 'linear-gradient(135deg, #0f2347, #1e3a8a)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src="images/logo.webp" alt="GNC Logo" style={{ width: 80, height: 80, objectFit: 'contain', background: '#fff', borderRadius: 12, padding: 6 }} />
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>gncollege.org</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', margin: '2px 0 4px', lineHeight: 1.3 }}>
                          {siteCfg.metaTitle || 'Guru Nanak College, Dhanbad'}
                        </div>
                        <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {siteCfg.metaDescription || 'Official website of Guru Nanak College, Dhanbad.'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. FACEBOOK / LINKEDIN CARD */}
                  {socialPlatform === 'facebook' && (
                    <div style={{ maxWidth: 520, background: '#ffffff', borderRadius: 10, overflow: 'hidden', border: '1px solid #dadde1', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', margin: '0 auto' }}>
                      <div style={{ width: '100%', height: 240, background: 'linear-gradient(135deg, #0f2347, #1e3a8a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', color: '#fff' }}>
                          <img src="images/logo.webp" alt="GNC" style={{ width: 70, height: 70, objectFit: 'contain', background: '#fff', borderRadius: 12, padding: 6, margin: '0 auto 10px' }} />
                          <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: '1px' }}>GURU NANAK COLLEGE</div>
                          <div style={{ fontSize: 11, color: GOLD, fontWeight: 700 }}>DHANBAD, JHARKHAND</div>
                        </div>
                      </div>
                      <div style={{ padding: '12px 16px', background: '#f0f2f5' }}>
                        <div style={{ fontSize: 11, color: '#65676b', textTransform: 'uppercase', fontWeight: 700 }}>GNCOLLEGE.ORG</div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#050505', margin: '4px 0', lineHeight: 1.3 }}>
                          {siteCfg.metaTitle || 'Guru Nanak College, Dhanbad'}
                        </div>
                        <div style={{ fontSize: 13, color: '#65676b', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {siteCfg.metaDescription || 'Affiliated with BBMKU, Dhanbad. Providing quality higher education.'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. TWITTER / X CARD */}
                  {socialPlatform === 'twitter' && (
                    <div style={{ maxWidth: 500, background: '#000000', borderRadius: 16, overflow: 'hidden', border: '1px solid #2f3336', margin: '0 auto', color: '#e7e9ea' }}>
                      <div style={{ width: '100%', height: 230, background: 'linear-gradient(135deg, #0f2347, #0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="images/logo.webp" alt="GNC" style={{ width: 80, height: 80, objectFit: 'contain', background: '#fff', borderRadius: 16, padding: 8 }} />
                      </div>
                      <div style={{ padding: '12px 16px' }}>
                        <div style={{ fontSize: 12, color: '#71767b' }}>gncollege.org</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#e7e9ea', marginTop: 2 }}>
                          {siteCfg.metaTitle || 'Guru Nanak College, Dhanbad'}
                        </div>
                        <div style={{ fontSize: 13, color: '#71767b', marginTop: 4, lineHeight: 1.4 }}>
                          {siteCfg.metaDescription || 'Official portal for admissions, notices, and academics.'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. GOOGLE SERP SNIPPET */}
                  {socialPlatform === 'google' && (
                    <div style={{ maxWidth: 600, background: '#ffffff', borderRadius: 12, padding: 18, border: '1px solid #dfe1e5', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', margin: '0 auto' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', padding: 2 }}>
                          <img src="images/logo.webp" alt="Favicon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 12, color: '#202124', fontWeight: 600 }}>Guru Nanak College, Dhanbad</div>
                          <div style={{ fontSize: 11, color: '#4d5156' }}>https://gncollege.org › academics</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: '#1a0dab', margin: '4px 0 6px', cursor: 'pointer', textDecoration: 'none' }}>
                        {siteCfg.metaTitle || 'Guru Nanak College, Dhanbad | Premier Higher Education in Jharkhand'}
                      </div>
                      <div style={{ fontSize: 13, color: '#4d5156', lineHeight: 1.5 }}>
                        <span style={{ color: '#70757a', fontWeight: 700 }}>Sep 2026 — </span>
                        {siteCfg.metaDescription || 'Guru Nanak College (GNC), Dhanbad offers top undergraduate & postgraduate programs in BCA, BBA, Commerce, Arts, and Science affiliated with BBMKU.'}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════ 2.5. HOMEPAGE STATS & COUNTERS ═════════ */}
        {activeSubTab === 'homepage-stats' && (
          <div className="fade-up">
            <div className="settings-group">
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Layers size={17} color={GOLD} />
                <span>Homepage Institutional Key Statistics (Live Counters)</span>
              </div>
              <p style={{ fontSize: 12.5, color: T.t3, margin: '6px 20px 14px', lineHeight: 1.6 }}>
                Configure the dynamic counters rendered in the celebration achievements section of the homepage.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, padding: '0 20px 20px' }}>
                <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: NAVY, marginBottom: 8 }}>Stat 1: Students Enrolled</div>
                  <input
                    className="ainp"
                    placeholder="e.g. 4,000+"
                    value={siteCfg.counter1Value ?? (siteCfg.counters?.[0]?.value || '4,000+')}
                    onChange={e => {
                      const val = e.target.value;
                      setSiteCfg(d => {
                        const counters = [...(d.counters || [
                          { label: "Students Enrolled", value: "4,000+", icon: "Users" },
                          { label: "Successful Alumni", value: "45,000+", icon: "GraduationCap" },
                          { label: "Expert Faculty", value: "50+", icon: "UserCheck" },
                          { label: "Years of Legacy", value: "56", icon: "Building2" },
                        ])];
                        counters[0] = { ...counters[0], value: val };
                        return { ...d, counter1Value: val, counters };
                      });
                    }}
                  />
                </div>

                <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: NAVY, marginBottom: 8 }}>Stat 2: Successful Alumni</div>
                  <input
                    className="ainp"
                    placeholder="e.g. 45,000+"
                    value={siteCfg.counter2Value ?? (siteCfg.counters?.[1]?.value || '45,000+')}
                    onChange={e => {
                      const val = e.target.value;
                      setSiteCfg(d => {
                        const counters = [...(d.counters || [
                          { label: "Students Enrolled", value: "4,000+", icon: "Users" },
                          { label: "Successful Alumni", value: "45,000+", icon: "GraduationCap" },
                          { label: "Expert Faculty", value: "50+", icon: "UserCheck" },
                          { label: "Years of Legacy", value: "56", icon: "Building2" },
                        ])];
                        counters[1] = { ...counters[1], value: val };
                        return { ...d, counter2Value: val, counters };
                      });
                    }}
                  />
                </div>

                <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: NAVY, marginBottom: 8 }}>Stat 3: Expert Faculty</div>
                  <input
                    className="ainp"
                    placeholder="e.g. 50+"
                    value={siteCfg.counter3Value ?? (siteCfg.counters?.[2]?.value || '50+')}
                    onChange={e => {
                      const val = e.target.value;
                      setSiteCfg(d => {
                        const counters = [...(d.counters || [
                          { label: "Students Enrolled", value: "4,000+", icon: "Users" },
                          { label: "Successful Alumni", value: "45,000+", icon: "GraduationCap" },
                          { label: "Expert Faculty", value: "50+", icon: "UserCheck" },
                          { label: "Years of Legacy", value: "56", icon: "Building2" },
                        ])];
                        counters[2] = { ...counters[2], value: val };
                        return { ...d, counter3Value: val, counters };
                      });
                    }}
                  />
                </div>

                <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: NAVY, marginBottom: 8 }}>Stat 4: Years of Legacy</div>
                  <input
                    className="ainp"
                    placeholder="e.g. 56"
                    value={siteCfg.counter4Value ?? (siteCfg.counters?.[3]?.value || '56')}
                    onChange={e => {
                      const val = e.target.value;
                      setSiteCfg(d => {
                        const counters = [...(d.counters || [
                          { label: "Students Enrolled", value: "4,000+", icon: "Users" },
                          { label: "Successful Alumni", value: "45,000+", icon: "GraduationCap" },
                          { label: "Expert Faculty", value: "50+", icon: "UserCheck" },
                          { label: "Years of Legacy", value: "56", icon: "Building2" },
                        ])];
                        counters[3] = { ...counters[3], value: val };
                        return { ...d, counter4Value: val, counters };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════ 2.8. HERO & KINETIC BACKGROUND MANAGER ═════════ */}
        {activeSubTab === 'hero-banner' && (
          <div className="fade-up">
            
            {/* Section 1: Specifications & Dimension Guidance */}
            <div className="settings-group">
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ImageIcon size={18} color={GOLD} />
                <span>Hero & Kinetic Background Management Engine</span>
                <span style={{ fontSize: 11, background: 'rgba(244,160,35,0.15)', color: '#d97706', padding: '2px 8px', borderRadius: 12, fontWeight: 800, marginLeft: 'auto' }}>
                  Universal Site-Wide Sync
                </span>
              </div>

              <div style={{ padding: '0 20px 16px' }}>

                {/* ── Mode Switcher Card: Campus Photo vs Pure Kinetic Mesh (Pehle Ki Tarah) ── */}
                <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: 18, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 13.5, color: NAVY, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Layers size={16} color={GOLD} />
                        <span>Hero Background Display Mode</span>
                      </div>
                      <div style={{ fontSize: 12, color: T.t3, marginTop: 2 }}>
                        Choose between campus photo background or the original animated 4-color kinetic mesh gradient (No Image).
                      </div>
                    </div>
                    <span style={{ fontSize: 11.5, background: isMeshActive ? '#ecfdf5' : '#eff6ff', color: isMeshActive ? '#059669' : '#2563eb', border: `1px solid ${isMeshActive ? '#a7f3d0' : '#bfdbfe'}`, padding: '3px 12px', borderRadius: 20, fontWeight: 800 }}>
                      {isMeshActive ? '✨ Original Kinetic Mesh Active' : '🏛️ Campus Photo Active'}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
                    {/* Option A: Campus Photo */}
                    <div
                      onClick={() => setSiteCfg(d => ({ ...d, heroBgMode: 'image', heroBgUrl: d.heroBgUrl || '/images/college_hero_bg.webp' }))}
                      style={{
                        padding: '14px 16px',
                        borderRadius: 12,
                        cursor: 'pointer',
                        border: !isMeshActive ? `2px solid ${NAVY}` : '1.5px solid #cbd5e1',
                        background: !isMeshActive ? '#ffffff' : '#f1f5f9',
                        boxShadow: !isMeshActive ? '0 4px 14px rgba(15,35,71,0.08)' : 'none',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: !isMeshActive ? NAVY : '#e2e8f0', color: !isMeshActive ? GOLD : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <ImageIcon size={19} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 13, color: NAVY }}>
                            College Campus Photo
                          </div>
                          <div style={{ fontSize: 11.5, color: T.t3, marginTop: 2 }}>
                            Custom/Preset photo with overlay &amp; Ken Burns zoom
                          </div>
                        </div>
                      </div>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: !isMeshActive ? NAVY : '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {!isMeshActive && <Check size={13} color="#fff" />}
                      </div>
                    </div>

                    {/* Option B: Pure Animated Mesh (No Image / Pehle Ki Tarah) */}
                    <div
                      onClick={resetHeroToMesh}
                      style={{
                        padding: '14px 16px',
                        borderRadius: 12,
                        cursor: 'pointer',
                        border: isMeshActive ? `2px solid ${GOLD}` : '1.5px solid #cbd5e1',
                        background: isMeshActive ? '#fffbeb' : '#f1f5f9',
                        boxShadow: isMeshActive ? '0 4px 14px rgba(244,160,35,0.15)' : 'none',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: isMeshActive ? GOLD : '#e2e8f0', color: isMeshActive ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Sparkles size={19} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 13, color: isMeshActive ? '#92400e' : NAVY }}>
                            Pure Kinetic Mesh (No Image)
                          </div>
                          <div style={{ fontSize: 11.5, color: isMeshActive ? '#b45309' : T.t3, marginTop: 2 }}>
                            Pehle ki tarah: Original 4-color animated gradient
                          </div>
                        </div>
                      </div>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: isMeshActive ? GOLD : '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isMeshActive && <Check size={13} color="#fff" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guidelines Callout Banner */}
                <div style={{ background: 'linear-gradient(135deg, rgba(15,35,71,0.04), rgba(244,160,35,0.06))', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, flexShrink: 0 }}>
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>
                        Recommended Dimensions, Format &amp; Auto-Optimization Rules
                      </div>
                      <p style={{ margin: '4px 0 10px', fontSize: 12.5, color: T.t2, lineHeight: 1.6 }}>
                        Upload any photograph of the college campus (smartphone or DSLR). Our client-side image processing engine will automatically scale it down, convert it into modern WebP format, and compress it to guarantee fast page loading (LCP).
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '4px 10px', fontSize: 11.5, fontWeight: 700, color: NAVY }}>
                          📐 <strong>Optimal Dimensions:</strong> 1920 × 1080 px (16:9 Landscape)
                        </div>
                        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '4px 10px', fontSize: 11.5, fontWeight: 700, color: NAVY }}>
                          ⚡ <strong>Auto-Format:</strong> WebP (85% Perceptual Quality)
                        </div>
                        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '4px 10px', fontSize: 11.5, fontWeight: 700, color: NAVY }}>
                          📦 <strong>Target File Size:</strong> ~150 KB – 300 KB
                        </div>
                        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '4px 10px', fontSize: 11.5, fontWeight: 700, color: NAVY }}>
                          📷 <strong>Supported Inputs:</strong> JPG, PNG, WEBP, AVIF, HEIC
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Smart Drag & Drop Upload Zone */}
                <div 
                  style={{ 
                    border: isHeroDragOver ? `2px dashed ${GOLD}` : '2px dashed #cbd5e1', 
                    borderRadius: 14, 
                    padding: '30px 20px', 
                    textAlign: 'center', 
                    background: isHeroDragOver ? 'rgba(244,160,35,0.05)' : '#f8fafc',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    marginBottom: isMeshActive ? 12 : 20
                  }}
                  onDragOver={e => { e.preventDefault(); setIsHeroDragOver(true); }}
                  onDragLeave={e => { e.preventDefault(); setIsHeroDragOver(false); }}
                  onDrop={e => {
                    e.preventDefault();
                    setIsHeroDragOver(false);
                    if (e.dataTransfer?.files?.[0]) {
                      handleHeroFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => document.getElementById('hero-file-picker')?.click()}
                >
                  <input 
                    type="file" 
                    id="hero-file-picker" 
                    accept="image/*" 
                    hidden 
                    onChange={e => {
                      if (e.target.files?.[0]) {
                        handleHeroFileUpload(e.target.files[0]);
                      }
                    }} 
                  />

                  {heroProcessing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: 10 }}>
                      <Loader2 size={36} className="animate-spin" color={GOLD} />
                      <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>
                        Auto-processing image in browser...
                      </div>
                      <div style={{ fontSize: 12, color: T.t3 }}>
                        Clamping to 1920×1080 • Converting to WebP • Optimizing compression
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: GOLD, marginBottom: 12 }}>
                        <UploadCloud size={26} />
                      </div>
                      <div style={{ fontWeight: 800, color: NAVY, fontSize: 15, marginBottom: 4 }}>
                        Click to Upload or Drag &amp; Drop Campus Image
                      </div>
                      <div style={{ fontSize: 12.5, color: T.t3, maxWidth: 500, margin: '0 auto 14px' }}>
                        Image will be automatically scaled to 1920×1080, compressed, and converted to WebP.
                      </div>
                      <button 
                        type="button" 
                        className="abtn abtn-navy" 
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 20px', fontSize: 13 }}
                        onClick={e => { e.stopPropagation(); document.getElementById('hero-file-picker')?.click(); }}
                      >
                        <ImageIcon size={15} /> Browse Image File
                      </button>
                    </div>
                  )}
                </div>

                {isMeshActive && (
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 10, padding: '10px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Sparkles size={18} color="#059669" />
                    <span style={{ fontSize: 12.5, color: '#065f46', fontWeight: 600 }}>
                      <strong>Pure Kinetic Mesh Active (Pehle ki tarah):</strong> Website ke sabhi hero sections bina image ke original animated gradient me render honge. Agar aap dobara college photo lagana chahein, to yahan image upload karein ya campus preset par click karein.
                    </span>
                  </div>
                )}

                {/* Compression Analytics Badge (if processed) */}
                {heroStats && (
                  <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={20} color="#059669" />
                      <div>
                        <div style={{ fontWeight: 800, color: '#065f46', fontSize: 13.5 }}>
                          Image Successfully Compressed &amp; Converted!
                        </div>
                        <div style={{ fontSize: 12, color: '#047857', marginTop: 2 }}>
                          Original: <strong>{heroStats.formattedOriginal}</strong> ➔ Processed WebP: <strong>{heroStats.formattedCompressed}</strong> ({heroStats.width}×{heroStats.height}px)
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ background: '#059669', color: '#fff', fontSize: 11.5, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>
                        {heroStats.reductionRatio}% Size Reduction
                      </span>
                      {heroStats.dataUrl && (
                        <a 
                          href={heroStats.dataUrl} 
                          download={`gnc_hero_${Date.now()}.webp`}
                          className="abtn abtn-outline"
                          style={{ padding: '6px 12px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                          onClick={e => e.stopPropagation()}
                        >
                          <Download size={13} /> Save WebP
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Direct URL Input & Fast Preset Chips */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, marginBottom: 20 }}>
                  <label className="alabel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Active Hero Background Image Path / URL</span>
                    <span style={{ fontSize: 11, color: T.t3, fontWeight: 600 }}>Supports local assets, external CDN URLs, or Pure Mesh</span>
                  </label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <input 
                      className="ainp" 
                      style={{ flex: 1, minWidth: 260 }}
                      value={siteCfg.heroBgUrl || ''} 
                      placeholder={isMeshActive ? "No Image (Pure Kinetic Mesh active — Pehle ki tarah)" : "/images/college_hero_bg.webp"}
                      onChange={e => {
                        const val = e.target.value;
                        setSiteCfg(d => ({ 
                          ...d, 
                          heroBgUrl: val,
                          heroBgMode: (val && val !== 'none') ? 'image' : 'mesh'
                        }));
                      }}
                    />
                    <button 
                      type="button" 
                      className="abtn abtn-outline" 
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5 }}
                      onClick={resetHeroToDefault}
                      title="Reset to newly generated College Dome image"
                    >
                      <RotateCcw size={14} /> Reset to Campus Dome
                    </button>
                    <button 
                      type="button" 
                      className="abtn" 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 6, 
                        fontSize: 12.5,
                        background: isMeshActive ? '#f59e0b' : '#fff',
                        color: isMeshActive ? '#fff' : '#b45309',
                        border: '1.5px solid #f59e0b',
                        fontWeight: 700
                      }}
                      onClick={resetHeroToMesh}
                      title="Pehle ki tarah bina image ke original animated mesh lagayein"
                    >
                      <Sparkles size={14} /> No Image (Pehle Ki Tarah)
                    </button>
                  </div>

                  {/* Preset Chips */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11.5, color: T.t3, fontWeight: 700 }}>Quick Presets:</span>
                    <button
                      type="button"
                      onClick={resetHeroToMesh}
                      style={{ 
                        background: isMeshActive ? '#f59e0b' : '#fff', 
                        color: isMeshActive ? '#fff' : '#b45309', 
                        border: '1.5px solid #f59e0b', 
                        borderRadius: 6, 
                        padding: '4px 11px', 
                        fontSize: 11, 
                        fontWeight: 700, 
                        cursor: 'pointer' 
                      }}
                    >
                      ✨ Pure Kinetic Mesh (No Image / Pehle Ki Tarah)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSiteCfg(d => ({ ...d, heroBgMode: 'image', heroBgUrl: '/images/college_hero_bg.webp', heroBgPosition: 'center 36%' }))}
                      style={{ background: (!isMeshActive && siteCfg.heroBgUrl === '/images/college_hero_bg.webp') ? NAVY : '#fff', color: (!isMeshActive && siteCfg.heroBgUrl === '/images/college_hero_bg.webp') ? '#fff' : NAVY, border: '1px solid #cbd5e1', borderRadius: 6, padding: '4px 11px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                    >
                      🏛️ Campus Dome Composite (WebP)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSiteCfg(d => ({ ...d, heroBgMode: 'image', heroBgUrl: '/images/college_hero_bg.jpg', heroBgPosition: 'center 36%' }))}
                      style={{ background: (!isMeshActive && siteCfg.heroBgUrl === '/images/college_hero_bg.jpg') ? NAVY : '#fff', color: (!isMeshActive && siteCfg.heroBgUrl === '/images/college_hero_bg.jpg') ? '#fff' : NAVY, border: '1px solid #cbd5e1', borderRadius: 6, padding: '4px 11px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                    >
                      🏫 Campus Archival (JPG)
                    </button>
                  </div>
                </div>

                {/* Section 3: Live Interactive Hero Simulator (WYSIWYG) */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Eye size={17} color={NAVY} />
                      <span style={{ fontWeight: 800, fontSize: 14, color: NAVY }}>
                        Live Hero Section Simulator (WYSIWYG)
                      </span>
                      <span style={{ fontSize: 11, background: isMeshActive ? '#ecfdf5' : '#dbeafe', color: isMeshActive ? '#059669' : '#1d4ed8', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>
                        {isMeshActive ? '✨ Live Pure Animated Mesh (No Image)' : '🏛️ Live Campus Image + Ken Burns'}
                      </span>
                    </div>

                    {/* Viewport switcher */}
                    <div style={{ display: 'inline-flex', background: '#f1f5f9', borderRadius: 8, padding: 3, border: '1px solid #e2e8f0' }}>
                      <button
                        type="button"
                        onClick={() => setHeroPreviewDevice('desktop')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '4px 12px',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: 'none',
                          background: heroPreviewDevice === 'desktop' ? '#ffffff' : 'transparent',
                          color: heroPreviewDevice === 'desktop' ? NAVY : '#64748b',
                          boxShadow: heroPreviewDevice === 'desktop' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                        }}
                      >
                        <Monitor size={14} /> Desktop (1920px)
                      </button>
                      <button
                        type="button"
                        onClick={() => setHeroPreviewDevice('mobile')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '4px 12px',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: 'none',
                          background: heroPreviewDevice === 'mobile' ? '#ffffff' : 'transparent',
                          color: heroPreviewDevice === 'mobile' ? NAVY : '#64748b',
                          boxShadow: heroPreviewDevice === 'mobile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                        }}
                      >
                        <Smartphone size={14} /> Mobile (375px)
                      </button>
                    </div>
                  </div>

                  {/* Simulator Container */}
                  <div style={{ background: '#0b132b', borderRadius: 14, padding: 14, overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        maxWidth: heroPreviewDevice === 'mobile' ? 380 : '100%', 
                        margin: '0 auto', 
                        borderRadius: 10, 
                        overflow: 'hidden', 
                        position: 'relative',
                        height: heroPreviewDevice === 'mobile' ? 260 : 320,
                        border: heroPreviewDevice === 'mobile' ? '4px solid #334155' : '1px solid rgba(255,255,255,0.15)',
                        transition: 'max-width 0.3s ease, height 0.3s ease'
                      }}
                    >
                      {/* Background Image with Dynamic Ken Burns Animation OR Pure Mesh Gradient */}
                      <div 
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: isMeshActive 
                            ? 'linear-gradient(-45deg, #0f2347, #1e3a8a, #0c1c38, #1e40af)' 
                            : undefined,
                          backgroundImage: !isMeshActive 
                            ? `${siteCfg.heroOverlayGradient || 'linear-gradient(135deg, rgba(15, 35, 71, 0.90) 0%, rgba(10, 25, 47, 0.82) 48%, rgba(15, 35, 71, 0.92) 100%)'}, url("${siteCfg.heroBgUrl || '/images/college_hero_bg.webp'}")` 
                            : undefined,
                          backgroundSize: isMeshActive ? '400% 400%' : 'cover',
                          backgroundPosition: isMeshActive ? 'center' : (siteCfg.heroBgPosition || 'center 36%'),
                          backgroundRepeat: 'no-repeat',
                          animation: isMeshActive 
                            ? 'gradientMotion 10s ease infinite' 
                            : (siteCfg.heroKenBurns !== false ? 'heroKenBurns 28s ease-in-out infinite alternate' : 'none')
                        }}
                      />

                      {/* Ambient Gold Flare */}
                      <div 
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: isMeshActive 
                            ? 'radial-gradient(circle at 50% 50%, rgba(244, 160, 35, 0.12) 0%, transparent 70%)' 
                            : 'radial-gradient(circle at 50% 30%, rgba(244, 160, 35, 0.14) 0%, transparent 70%)',
                          mixBlendMode: isMeshActive ? 'overlay' : undefined,
                          pointerEvents: 'none'
                        }}
                      />

                      {/* Content Overlay */}
                      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px', color: '#fff' }}>
                        {/* Gold Badge */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(244, 160, 35, 0.2)', border: '1px solid rgba(244, 160, 35, 0.45)', borderRadius: 20, padding: '3px 12px', marginBottom: 12 }}>
                          <span style={{ fontSize: 11, color: '#f4a023', fontWeight: 800, letterSpacing: 0.5 }}>
                            ESTABLISHED 1970 • UGC 2(F) &amp; 12(B)
                          </span>
                        </div>

                        {/* Title */}
                        <h2 style={{ fontSize: heroPreviewDevice === 'mobile' ? 20 : 30, fontWeight: 900, letterSpacing: '-0.5px', margin: '0 0 8px', color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                          Guru Nanak College, Dhanbad
                        </h2>

                        {/* Subtitle / Breadcrumb */}
                        <p style={{ margin: 0, fontSize: heroPreviewDevice === 'mobile' ? 12 : 14, color: 'rgba(255,255,255,0.88)', maxWidth: 500, lineHeight: 1.4 }}>
                          Home / Academics / Bachelor of Computer Applications (BCA)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Overlay Themes & Styling Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
                  {/* Theme Presets */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
                    <div style={{ fontWeight: 800, fontSize: 13, color: NAVY, marginBottom: 4 }}>
                      1. Overlay Darkness &amp; Color Theme
                    </div>
                    <div style={{ fontSize: 12, color: T.t3, marginBottom: 12 }}>
                      Select a balanced gradient overlay that matches institutional branding and maintains WCAG text contrast.
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {OVERLAY_THEMES.map(th => {
                        const isSelected = (siteCfg.heroOverlayStyle || 'royal-navy') === th.id;
                        return (
                          <div
                            key={th.id}
                            onClick={() => setSiteCfg(d => ({ ...d, heroOverlayStyle: th.id, heroOverlayGradient: th.gradient }))}
                            style={{
                              padding: '10px 14px',
                              borderRadius: 8,
                              border: isSelected ? `2px solid ${NAVY}` : '1px solid #e2e8f0',
                              background: isSelected ? '#ffffff' : '#f1f5f9',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div>
                              <div style={{ fontSize: 12.5, fontWeight: 800, color: NAVY }}>
                                {th.name}
                              </div>
                              <div style={{ fontSize: 11, color: T.t3, marginTop: 1 }}>
                                {th.desc}
                              </div>
                            </div>
                            <div style={{ width: 20, height: 20, borderRadius: '50%', background: th.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {isSelected && <Check size={12} color="#fff" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Focal Position & Ken Burns Toggle */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 13, color: NAVY, marginBottom: 4 }}>
                        2. Image Focal Alignment (Position)
                      </div>
                      <div style={{ fontSize: 12, color: T.t3, marginBottom: 12 }}>
                        Set which area of the campus photo stays centered when scaling across mobile and desktop.
                      </div>
                      
                      <select
                        className="ainp"
                        value={siteCfg.heroBgPosition || 'center 36%'}
                        onChange={e => setSiteCfg(d => ({ ...d, heroBgPosition: e.target.value }))}
                        style={{ marginBottom: 16 }}
                      >
                        <option value="center 36%">🏛️ Center 36% (Optimal for College Dome &amp; Facade)</option>
                        <option value="center center">🎯 Center Center (True Horizontal &amp; Vertical Center)</option>
                        <option value="center top">⛅ Center Top (Skyline &amp; Upper Architectural Dome)</option>
                        <option value="center bottom">🌿 Center Bottom (Lawns, Trees &amp; Ground Entrance)</option>
                      </select>

                      <div style={{ fontWeight: 800, fontSize: 13, color: NAVY, marginBottom: 4 }}>
                        3. Ambient Motion (Ken Burns Effect)
                      </div>
                      <div style={{ fontSize: 12, color: T.t3, marginBottom: 12 }}>
                        Smooth 28-second organic slow-zoom animation giving the hero a cinematic atmosphere.
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: NAVY }}>
                          {siteCfg.heroKenBurns !== false ? 'Cinematic Ken Burns: ACTIVE' : 'Cinematic Ken Burns: MUTED'}
                        </span>
                        <Toggle
                          checked={siteCfg.heroKenBurns !== false}
                          onChange={() => setSiteCfg(d => ({ ...d, heroKenBurns: d.heroKenBurns === false ? true : false }))}
                          color={GOLD}
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #e2e8f0', display: 'flex', gap: 8 }}>
                      <button
                        type="button"
                        className="abtn abtn-gold"
                        style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                        onClick={saveSite}
                        disabled={siteLoading}
                      >
                        {siteLoading ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                        Save &amp; Publish Hero Settings
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section 5: Live Browser Verification & Quick Preview Matrix */}
                <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <ExternalLink size={18} color={GOLD} />
                    <span style={{ fontWeight: 900, fontSize: 14.5, color: NAVY }}>
                      Live Browser Verification Matrix (Point 3)
                    </span>
                    <span style={{ fontSize: 11, background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: 10, fontWeight: 800 }}>
                      1-Click Test Links
                    </span>
                  </div>
                  <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 16px', lineHeight: 1.5 }}>
                    Click any page below to open it in a new browser tab and instantly verify your updated campus hero background and kinetic animation in real time:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                    {HERO_PREVIEW_PAGES.map(page => (
                      <a
                        key={page.path}
                        href={`#${page.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: 10,
                          textDecoration: 'none',
                          color: NAVY,
                          transition: 'all 0.18s ease'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'none'; }}
                      >
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>
                            {page.name}
                          </div>
                          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                            {page.type} • {page.path}
                          </div>
                        </div>
                        <ArrowUpRight size={16} color={GOLD} />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ═════════ 3. EMERGENCY BROADCAST TICKER ═════════ */}
        {activeSubTab === 'broadcast' && (
          <div className="fade-up">
            <div className="settings-group">
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Radio size={17} color="#ef4444" />
                <span>Site-Wide Emergency Flash Broadcast Ribbon</span>
              </div>

              <div style={{ padding: '0 20px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: siteCfg.emergencyBroadcastEnabled ? '#fef2f2' : '#f8fafc', borderRadius: 12, border: siteCfg.emergencyBroadcastEnabled ? '1.5px solid #f87171' : '1px solid #e2e8f0', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: siteCfg.emergencyBroadcastEnabled ? '#dc2626' : NAVY, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: siteCfg.emergencyBroadcastEnabled ? '#dc2626' : '#94a3b8' }} />
                      Master Broadcast Switch: {siteCfg.emergencyBroadcastEnabled ? 'BROADCASTING LIVE' : 'OFFLINE'}
                    </div>
                    <div style={{ fontSize: 12, color: T.t3, marginTop: 4 }}>
                      Display an urgent banner at the very top of all public pages for campus closures, urgent notifications, or admission deadlines.
                    </div>
                  </div>
                  <Toggle
                    checked={siteCfg.emergencyBroadcastEnabled || false}
                    onChange={() => setSiteCfg(d => ({ ...d, emergencyBroadcastEnabled: !d.emergencyBroadcastEnabled }))}
                    label={siteCfg.emergencyBroadcastEnabled ? 'ACTIVE' : 'MUTED'}
                    color={T.red}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>
                  <div>
                    <label className="alabel">Alert Priority Style</label>
                    <select 
                      className="ainp"
                      value={siteCfg.emergencyBroadcastType || 'critical'}
                      onChange={e => setSiteCfg(d => ({ ...d, emergencyBroadcastType: e.target.value }))}
                    >
                      <option value="critical">🚨 Critical Alert (Red Glowing Ribbon)</option>
                      <option value="gold">⚡ Official Announcement (Gold Ribbon)</option>
                      <option value="info">📢 Campus Notice (Navy Blue Ribbon)</option>
                    </select>
                  </div>
                  <div>
                    <label className="alabel">Action CTA Link (Optional)</label>
                    <input 
                      className="ainp"
                      value={siteCfg.emergencyBroadcastLink || ''}
                      onChange={e => setSiteCfg(d => ({ ...d, emergencyBroadcastLink: e.target.value }))}
                      placeholder="e.g. /notices or https://..."
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label className="alabel">Broadcast Message Text</label>
                  <input 
                    className="ainp"
                    value={siteCfg.emergencyBroadcastText || ''}
                    onChange={e => setSiteCfg(d => ({ ...d, emergencyBroadcastText: e.target.value }))}
                    placeholder="Enter urgent broadcast message..."
                  />
                </div>

                {/* Live Simulation Banner */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>
                    Live Banner Preview (As seen by students)
                  </div>
                  <div style={{
                    padding: '12px 18px',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    background: siteCfg.emergencyBroadcastType === 'critical' ? 'linear-gradient(90deg, #991b1b, #ef4444)' :
                                siteCfg.emergencyBroadcastType === 'gold' ? 'linear-gradient(90deg, #b45309, #f59e0b)' :
                                'linear-gradient(90deg, #0f2347, #1e3a8a)',
                    color: '#ffffff',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 13.5 }}>
                      <AlertTriangle size={17} color="#fff" />
                      <span>{siteCfg.emergencyBroadcastText || 'Notice text will appear here...'}</span>
                    </div>
                    {siteCfg.emergencyBroadcastLink && (
                      <span style={{ fontSize: 11.5, fontWeight: 800, padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.2)', textDecoration: 'underline' }}>
                        {siteCfg.emergencyBroadcastLinkText || 'View Details →'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════ 4. FEATURE SWITCHES ═════════ */}
        {activeSubTab === 'toggles' && (
          <div className="fade-up">
            <div className="settings-group">
              <div className="settings-group-title">
                <Sliders size={18} color={GOLD} />
                <span>Public Website Feature Modules (Instant On / Off)</span>
                <span style={{ fontSize: 11, background: 'rgba(244,160,35,0.15)', color: '#d97706', padding: '2px 8px', borderRadius: 10, fontWeight: 800, marginLeft: 'auto' }}>
                  Live Reactive Switches
                </span>
              </div>
              <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 20px', lineHeight: 1.6 }}>
                Toggle public website interactive features in real-time. Changes are broadcast immediately across all visitor sessions worldwide without rebuilding or redeploying code.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                {[
                  { key: 'enableLanguageToggle', title: 'Bilingual Language Switcher (EN / हिंदी)', sub: 'Display Hindi/English translation pill in the top header navbar', icon: Globe },
                  { key: 'enableCampusPoll', title: 'Live Campus Poll (Student Voice)', sub: 'Show interactive student voting & opinion widget on homepage', icon: Radio },
                  { key: 'enableFloatingQR', title: 'Floating QR Code Share & Print', sub: 'Enable floating action button for quick mobile share and printing', icon: Smartphone },
                  { key: 'enableVirtualTour', title: '360° Virtual Campus Twin & Tour', sub: 'Interactive panoramic 360° campus audio guide & navigation', icon: Compass },
                  { key: 'enableAlumniWall', title: 'Alumni Success Wall', sub: 'Public masonry wall showcasing prestigious alumni across industries', icon: GraduationCap },
                  { key: 'enablePlacementAnalytics', title: 'Placement Analytics & Career Trends', sub: 'Interactive Year-over-Year placement intelligence chart on homepage', icon: Layers },
                ].map(f => {
                  const Icon = f.icon;
                  const isEnabled = siteCfg[f.key] !== false;
                  return (
                    <div 
                      key={f.key}
                      style={{
                        padding: '16px 18px',
                        borderRadius: 12,
                        border: isEnabled ? '1.5px solid #0f2347' : '1.5px solid #e2e8f0',
                        background: isEnabled ? '#ffffff' : '#f8fafc',
                        boxShadow: isEnabled ? '0 4px 14px rgba(15,35,71,0.06)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 14,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flex: 1, minWidth: 0 }}>
                        <div style={{
                          width: 38, height: 38, borderRadius: 10,
                          background: isEnabled ? 'rgba(15,35,71,0.08)' : '#f1f5f9',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: isEnabled ? NAVY : '#94a3b8', flexShrink: 0, marginTop: 2
                        }}>
                          <Icon size={18} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 800, fontSize: 13.5, color: NAVY, lineHeight: 1.3, marginBottom: 4 }}>
                            {f.title}
                          </div>
                          <div style={{ fontSize: 11.5, color: T.t3, lineHeight: 1.4 }}>
                            {f.sub}
                          </div>
                        </div>
                      </div>

                      <div style={{ flexShrink: 0 }}>
                        <Toggle
                          checked={isEnabled}
                          onChange={() => handleFeatureToggle(f.key)}
                          label={isEnabled ? 'ON' : 'OFF'}
                          color={T.green}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═════════ 5. API & SECURITY KEYS ═════════ */}
        {activeSubTab === 'api-keys' && (
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Google Gemini AI */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title">
                <Bot size={18} color={GOLD} />
                <span>Google Gemini AI Engine (Chatbot &amp; Neural Studio)</span>
                <span style={{ fontSize: 11, background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: 10, fontWeight: 800, marginLeft: 'auto' }}>
                  Multi-Modal AI
                </span>
              </div>
              <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 16px', lineHeight: 1.6 }}>
                Powers both the student bilingual AI Copilot and the <strong>Neural AI Studio</strong> (campus photo scene analysis, automated notice drafting, and OCR).
              </p>

              <div style={{ marginBottom: 16 }}>
                <label className="alabel" style={{ marginBottom: 6 }}>Gemini API Key</label>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
                    className="ainp"
                    type={showGeminiKey ? 'text' : 'password'}
                    value={siteCfg.geminiApiKey || ''}
                    onChange={e => setSiteCfg(d => ({ ...d, geminiApiKey: e.target.value }))}
                    placeholder="AIzaSy..."
                    style={{ fontFamily: 'monospace', flex: 1, minWidth: 260 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowGeminiKey(!showGeminiKey)}
                    className="abtn abtn-outline"
                    style={{ padding: '9px 14px', fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    {showGeminiKey ? <><EyeOff size={14} /> Hide</> : <><Eye size={14} /> Show</>}
                  </button>
                  <button
                    type="button"
                    onClick={testGeminiConnection}
                    disabled={testingGemini || !siteCfg.geminiApiKey}
                    className="abtn"
                    style={{
                      background: '#0f2347',
                      color: '#f59e0b',
                      border: '1.5px solid #f59e0b',
                      padding: '9px 16px',
                      fontSize: 12.5,
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      opacity: (!siteCfg.geminiApiKey || testingGemini) ? 0.6 : 1
                    }}
                  >
                    {testingGemini ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                    {testingGemini ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>
              </div>

              {geminiTestStatus && (
                <div style={{ fontSize: 12.5, padding: '10px 16px', borderRadius: 10, fontWeight: 700, background: geminiTestStatus.success ? '#dcfce7' : '#fee2e2', color: geminiTestStatus.success ? '#15803d' : '#b91c1c', border: `1px solid ${geminiTestStatus.success ? '#86efac' : '#fca5a5'}` }}>
                  {geminiTestStatus.message}
                </div>
              )}
            </div>

            {/* ImgBB */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title">
                <ImageIcon size={18} color={GOLD} />
                <span>ImgBB Cloud Image Hosting CDN</span>
              </div>
              <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 16px', lineHeight: 1.6 }}>
                Enables instant cloud image uploads for photo gallery albums and rich notice attachments.
              </p>
              <div>
                <label className="alabel" style={{ marginBottom: 6 }}>ImgBB API Key</label>
                <input 
                  className="ainp" 
                  value={siteCfg.imgbbKey || ''}
                  onChange={e => setSiteCfg(d => ({ ...d, imgbbKey: e.target.value }))}
                  placeholder="Paste ImgBB API key..."
                  style={{ fontFamily: 'monospace' }} 
                />
              </div>
            </div>

            {/* Google reCAPTCHA */}
            <div className="settings-group" style={{ margin: 0 }}>
              <div className="settings-group-title">
                <Shield size={18} color={GOLD} />
                <span>Google reCAPTCHA v2 / Bot Filtering</span>
              </div>
              <p style={{ fontSize: 12.5, color: T.t3, margin: '0 0 16px', lineHeight: 1.6 }}>
                Protects contact forms, admission inquiries, and document requests from automated spam bots.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13.5, color: NAVY }}>reCAPTCHA Bot Filtering Status</div>
                  <div style={{ fontSize: 11.5, color: T.t3, marginTop: 2 }}>{siteCfg.enableRecaptcha ? 'Google reCAPTCHA v2 Active' : 'Fallback Honeypot Shield Active'}</div>
                </div>
                <Toggle
                  checked={siteCfg.enableRecaptcha || false}
                  onChange={() => setSiteCfg(d => ({ ...d, enableRecaptcha: !d.enableRecaptcha }))}
                  label={siteCfg.enableRecaptcha ? 'ACTIVE' : 'HONEYPOT'}
                  color={T.green}
                />
              </div>
              <div>
                <label className="alabel" style={{ marginBottom: 6 }}>reCAPTCHA Site Key</label>
                <input 
                  className="ainp" 
                  value={siteCfg.recaptchaSiteKey || ''}
                  onChange={e => setSiteCfg(d => ({ ...d, recaptchaSiteKey: e.target.value }))}
                  placeholder="6Lxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  style={{ fontFamily: 'monospace' }} 
                />
              </div>
            </div>
          </div>
        )}

        {/* ═════════ 6. 1-CLICK FULL DATABASE SNAPSHOT ═════════ */}
        {activeSubTab === 'backup' && (
          <div className="fade-up">
            <div className="settings-group">
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Database size={17} color={GOLD} />
                <span>Disaster Recovery & 1-Click Database Snapshot Console</span>
              </div>

              <div style={{ padding: '10px 20px 24px' }}>
                <div style={{ background: '#f8fafc', borderRadius: 14, padding: 20, border: '1.5px solid #e2e8f0', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Download size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 900, color: NAVY }}>Offline Full State Export (.JSON)</div>
                      <div style={{ fontSize: 12.5, color: T.t3, marginTop: 2 }}>
                        Extracts every single document from Firestore (Notices, Events, Departments, Faculty, Placements, Gallery, Sliders, Settings) into an encrypted, portable JSON artifact.
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      disabled={backupLoading}
                      onClick={downloadDatabaseSnapshot}
                      className="abtn"
                      style={{
                        background: 'linear-gradient(135deg, #059669, #047857)',
                        color: '#ffffff',
                        padding: '12px 24px',
                        fontSize: 13.5,
                        boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
                        cursor: backupLoading ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {backupLoading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                      <span>{backupLoading ? (backupProgress || 'Exporting Database...') : 'Download Full Database Snapshot'}</span>
                    </button>

                    {lastBackupTime && (
                      <span style={{ fontSize: 12, color: '#15803d', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <Check size={14} /> Last Downloaded at {lastBackupTime}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
                  {[
                    { label: 'Notices & Circulars', key: 'notices' },
                    { label: 'Events & Seminars', key: 'events' },
                    { label: 'Academic Departments', key: 'departments' },
                    { label: 'Faculty Directory', key: 'faculty' },
                    { label: 'Campus Placements', key: 'placements' },
                    { label: 'Photo Gallery', key: 'gallery' },
                    { label: 'Hero Sliders', key: 'sliderSlides' },
                    { label: 'System Alerts', key: 'alerts' },
                  ].map(c => (
                    <div key={c.key} style={{ padding: '10px 14px', background: '#ffffff', borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <CheckCircle2 size={14} color="#10b981" />
                      <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
