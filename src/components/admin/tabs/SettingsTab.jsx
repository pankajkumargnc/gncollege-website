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
  PhoneCall, Compass, GraduationCap
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
      heroBgUrl: '/images/college_hero_bg.webp',
      heroOverlayStyle: 'royal-navy',
      heroOverlayGradient: 'linear-gradient(135deg, rgba(15, 35, 71, 0.90) 0%, rgba(10, 25, 47, 0.82) 48%, rgba(15, 35, 71, 0.92) 100%)',
      heroBgPosition: 'center 36%',
      heroKenBurns: true,
    };
  });

  const [siteLoading, setSiteLoading] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [testingGemini, setTestingGemini] = useState(false);
  const [geminiTestStatus, setGeminiTestStatus] = useState(null);

  // Hero Image Processing State
  const [heroProcessing, setHeroProcessing] = useState(false);
  const [heroStats, setHeroStats] = useState(null);
  const [heroPreviewDevice, setHeroPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'
  const [isHeroDragOver, setIsHeroDragOver] = useState(false);

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
    { id: 'social-seo', label: 'SEO & Social Preview', icon: Globe },
    { id: 'homepage-stats', label: 'Homepage Stats', icon: Layers },
    { id: 'hero-banner', label: 'Hero & Kinetic Banner', icon: ImageIcon },
    { id: 'broadcast', label: 'Emergency Broadcast', icon: Radio },
    { id: 'toggles', label: 'Feature Switches', icon: Sliders },
    { id: 'api-keys', label: 'API & Security Keys', icon: Bot },
    { id: 'backup', label: 'Database Snapshot', icon: Database },
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
      heroBgUrl: '/images/college_hero_bg.webp',
      heroOverlayStyle: 'royal-navy',
      heroOverlayGradient: 'linear-gradient(135deg, rgba(15, 35, 71, 0.90) 0%, rgba(10, 25, 47, 0.82) 48%, rgba(15, 35, 71, 0.92) 100%)',
      heroBgPosition: 'center 36%',
      heroKenBurns: true
    }));
    setHeroStats(null);
    toast.success('Reset to Official College Campus Dome Image! 🏛️');
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
                {/* Guidelines Callout Banner */}
                <div style={{ background: 'linear-gradient(135deg, rgba(15,35,71,0.04), rgba(244,160,35,0.06))', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, flexShrink: 0 }}>
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: NAVY, fontSize: 14 }}>
                        Recommended Dimensions, Format & Auto-Optimization Rules
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
                    marginBottom: 20
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
                        Click to Upload or Drag & Drop Campus Image
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

                {/* Compression Analytics Badge (if processed) */}
                {heroStats && (
                  <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={20} color="#059669" />
                      <div>
                        <div style={{ fontWeight: 800, color: '#065f46', fontSize: 13.5 }}>
                          Image Successfully Compressed & Converted!
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
                    <span style={{ fontSize: 11, color: T.t3, fontWeight: 600 }}>Supports local assets or external CDN URLs</span>
                  </label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <input 
                      className="ainp" 
                      style={{ flex: 1, minWidth: 260 }}
                      value={siteCfg.heroBgUrl || ''} 
                      placeholder="/images/college_hero_bg.webp"
                      onChange={e => setSiteCfg(d => ({ ...d, heroBgUrl: e.target.value }))}
                    />
                    <button 
                      type="button" 
                      className="abtn abtn-outline" 
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5 }}
                      onClick={resetHeroToDefault}
                      title="Reset to newly generated College Dome image"
                    >
                      <RotateCcw size={14} /> Reset to Default Dome
                    </button>
                  </div>

                  {/* Preset Chips */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11.5, color: T.t3, fontWeight: 700 }}>Quick Presets:</span>
                    <button
                      type="button"
                      onClick={() => setSiteCfg(d => ({ ...d, heroBgUrl: '/images/college_hero_bg.webp', heroBgPosition: 'center 36%' }))}
                      style={{ background: siteCfg.heroBgUrl === '/images/college_hero_bg.webp' ? NAVY : '#fff', color: siteCfg.heroBgUrl === '/images/college_hero_bg.webp' ? '#fff' : NAVY, border: '1px solid #cbd5e1', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                    >
                      🏛️ Campus Dome Composite (WebP)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSiteCfg(d => ({ ...d, heroBgUrl: '/images/college_hero_bg.jpg', heroBgPosition: 'center 36%' }))}
                      style={{ background: siteCfg.heroBgUrl === '/images/college_hero_bg.jpg' ? NAVY : '#fff', color: siteCfg.heroBgUrl === '/images/college_hero_bg.jpg' ? '#fff' : NAVY, border: '1px solid #cbd5e1', borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
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
                      <span style={{ fontSize: 11, background: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>
                        Real-Time CSS & Animation
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
                      {/* Background Image with Dynamic Ken Burns Animation */}
                      <div 
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `${siteCfg.heroOverlayGradient || 'linear-gradient(135deg, rgba(15, 35, 71, 0.90) 0%, rgba(10, 25, 47, 0.82) 48%, rgba(15, 35, 71, 0.92) 100%)'}, url("${siteCfg.heroBgUrl || '/images/college_hero_bg.webp'}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: siteCfg.heroBgPosition || 'center 36%',
                          backgroundRepeat: 'no-repeat',
                          animation: siteCfg.heroKenBurns !== false ? 'heroKenBurns 28s ease-in-out infinite alternate' : 'none'
                        }}
                      />

                      {/* Ambient Gold Flare */}
                      <div 
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'radial-gradient(circle at 50% 30%, rgba(244, 160, 35, 0.14) 0%, transparent 70%)',
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
