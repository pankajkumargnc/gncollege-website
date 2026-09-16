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
  ExternalLink, Copy, Search, Smartphone, Monitor
} from 'lucide-react';
import { T, NAVY, GOLD, Toggle } from '../AdminShared';
import { clearCache, encodePayload, decodePayload } from '../../../utils/cachedFetch';

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
    };
  });

  const [siteLoading, setSiteLoading] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [testingGemini, setTestingGemini] = useState(false);
  const [geminiTestStatus, setGeminiTestStatus] = useState(null);

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
    <div key={key} className="settings-row">
      <label className="alabel" style={{ minWidth: 160, margin: 0 }}>{label}</label>
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
    { id: 'social-seo', label: 'Social & SEO Preview', icon: Globe },
    { id: 'broadcast', label: 'Emergency Broadcast', icon: Radio },
    { id: 'toggles', label: 'Feature Switches', icon: Sliders },
    { id: 'api-keys', label: 'API & Security Keys', icon: Bot },
    { id: 'backup', label: 'Database Snapshot', icon: Database },
  ];

  return (
    <div className="fade-up" style={{ maxWidth: 1200, margin: '0 auto' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #0f2347, #1e3a8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, boxShadow: '0 4px 14px rgba(15,35,71,0.2)' }}>
            <Settings size={22} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontWeight: 900, color: NAVY, fontSize: 'clamp(20px, 4vw, 24px)', letterSpacing: '-0.5px' }}>
              Site Settings & Central Configuration
            </h1>
            <p style={{ margin: '2px 0 0', color: T.t3, fontSize: 13, fontWeight: 600 }}>
              Institutional identity, social graph simulators, disaster recovery, and system switches.
            </p>
          </div>
        </div>

        <button 
          type="button" 
          onClick={saveSite} 
          className="abtn abtn-gold" 
          disabled={siteLoading}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', fontSize: 13.5 }}
        >
          {siteLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Sub-Navigation Tabs */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 10, marginBottom: 20, borderBottom: '1.5px solid #e2e8f0' }}>
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
                padding: '9px 16px',
                borderRadius: 10,
                border: active ? `1.5px solid ${NAVY}` : '1.5px solid #e2e8f0',
                background: active ? NAVY : '#ffffff',
                color: active ? '#ffffff' : T.t2,
                fontWeight: active ? 800 : 600,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.18s ease',
                boxShadow: active ? '0 4px 12px rgba(15,35,71,0.15)' : 'none'
              }}
            >
              <Icon size={15} color={active ? GOLD : '#64748b'} />
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
          <div className="settings-group fade-up">
            <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Building2 size={17} color={GOLD} />
              <span>Institutional Identity & Contact Information</span>
            </div>
            {field('name', 'College Name', 'text', 'Guru Nanak College')}
            {field('tagline', 'Tagline / Affiliation', 'text', 'Affiliated to B.B.M.K. University, Dhanbad')}
            {field('address', 'Full Campus Address', 'text', 'Bank More, Dhanbad — 826001, Jharkhand')}
            {field('phone', 'Public Telephone', 'text', '+91 326 2302324')}
            {field('email', 'Official Email', 'email', 'principal@gncollege.org')}
            {field('footerText', 'Footer Copyright Line', 'text', '© 2026 Guru Nanak College, Dhanbad')}

            <div className="settings-row" style={{ marginTop: 16, background: siteCfg.maintenanceMode ? '#fef2f2' : '#f8fafc', padding: 16, borderRadius: 12, border: siteCfg.maintenanceMode ? '1.5px solid #fca5a5' : '1px solid #e2e8f0' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: siteCfg.maintenanceMode ? '#b91c1c' : NAVY }}>
                  Maintenance Mode (Under Construction)
                </div>
                <div style={{ fontSize: 12, color: T.t3, marginTop: 2 }}>
                  When enabled, visitors see a scheduled maintenance screen. Administrators remain able to login via <code>/admin</code>.
                </div>
                {siteCfg.maintenanceMode && (
                  <div style={{ marginTop: 10 }}>
                    <input 
                      className="ainp"
                      value={siteCfg.maintenanceMessage || ''}
                      onChange={e => setSiteCfg(d => ({ ...d, maintenanceMessage: e.target.value }))}
                      placeholder="Custom maintenance message displayed to visitors..."
                    />
                  </div>
                )}
              </div>
              <Toggle
                checked={siteCfg.maintenanceMode || false}
                onChange={() => setSiteCfg(d => ({ ...d, maintenanceMode: !d.maintenanceMode }))}
                label={siteCfg.maintenanceMode ? 'SITE DOWN' : 'SITE LIVE'}
                color={T.red}
              />
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
              {['facebook', 'twitter', 'youtube', 'linkedin'].map(s => (
                <div key={s} className="settings-row">
                  <label className="alabel" style={{ minWidth: 160, margin: 0, textTransform: 'capitalize' }}>{s} Profile URL</label>
                  <input 
                    className="ainp" 
                    value={siteCfg[s] || ''}
                    onChange={e => setSiteCfg(d => ({ ...d, [s]: e.target.value }))}
                    placeholder={`https://${s}.com/...`} 
                  />
                </div>
              ))}
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
          <div className="settings-group fade-up">
            <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sliders size={17} color={GOLD} />
              <span>Public Website Feature Modules (Instant On / Off)</span>
            </div>
            <p style={{ fontSize: 12.5, color: T.t3, margin: '6px 20px 14px', lineHeight: 1.6 }}>
              Enable or disable website components in real-time. Changes are instantly synchronized across all user sessions.
            </p>

            {[
              { key: 'enableLanguageToggle', title: 'Bilingual Language Switcher (EN / हिंदी)', sub: 'Display Hindi/English translation pill in the top header navbar' },
              { key: 'enableCampusPoll', title: 'Live Campus Poll (Student Voice)', sub: 'Show interactive student voting & opinion widget on homepage' },
              { key: 'enableFloatingQR', title: 'Floating QR Code Share & Print', sub: 'Enable floating action button for quick mobile share and printing' },
              { key: 'enableVirtualTour', title: '360° Virtual Campus Tour', sub: 'Interactive panoramic 360° campus navigation module' },
              { key: 'enableAlumniWall', title: 'Alumni Success Wall', sub: 'Public masonry wall showcasing prestigious alumni across industries' },
              { key: 'enablePlacementAnalytics', title: 'Placement Analytics & Career Trends (Homepage)', sub: 'Toggle the interactive Year-over-Year placement intelligence chart (placement-analytics-wrap) on the homepage' },
            ].map(f => (
              <div key={f.key} className="settings-row">
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 13.5, color: NAVY }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: T.t3 }}>{f.sub}</div>
                </div>
                <Toggle
                  checked={siteCfg[f.key] !== false}
                  onChange={() => handleFeatureToggle(f.key)}
                  label={siteCfg[f.key] !== false ? 'Enabled' : 'Disabled'}
                  color={T.green}
                />
              </div>
            ))}
          </div>
        )}

        {/* ═════════ 5. API & SECURITY KEYS ═════════ */}
        {activeSubTab === 'api-keys' && (
          <div className="fade-up">
            {/* Google Gemini AI */}
            <div className="settings-group">
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Bot size={17} color={GOLD} />
                <span>Google Gemini AI Engine (Chatbot & Neural Studio)</span>
              </div>
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '12px 16px', margin: '12px 20px', fontSize: 12.5, color: '#166534', lineHeight: 1.6 }}>
                <strong>Multi-Modal AI Power:</strong> Powers both the student AI Chatbot and the <strong>Neural AI Studio</strong> (photo scene analysis, copy generation, and vision OCR). Key is stored securely in your private Firestore settings.
              </div>

              <div className="settings-row">
                <label className="alabel" style={{ minWidth: 140, margin: 0 }}>Gemini API Key</label>
                <div style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    className="ainp"
                    type={showGeminiKey ? 'text' : 'password'}
                    value={siteCfg.geminiApiKey || ''}
                    onChange={e => setSiteCfg(d => ({ ...d, geminiApiKey: e.target.value }))}
                    placeholder="AIzaSy..."
                    style={{ fontFamily: 'monospace', flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowGeminiKey(!showGeminiKey)}
                    className="abtn abtn-outline"
                    style={{ padding: '8px 12px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    {showGeminiKey ? <><EyeOff size={13} /> Hide</> : <><Eye size={13} /> Show</>}
                  </button>
                  <button
                    type="button"
                    onClick={testGeminiConnection}
                    disabled={testingGemini || !siteCfg.geminiApiKey}
                    className="abtn"
                    style={{
                      background: '#0f2347',
                      color: '#f59e0b',
                      border: '1px solid #f59e0b',
                      padding: '8px 14px',
                      fontSize: 12,
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      opacity: (!siteCfg.geminiApiKey || testingGemini) ? 0.6 : 1
                    }}
                  >
                    {testingGemini ? <Loader2 size={13} className="animate-spin" /> : <Zap size={13} />}
                    {testingGemini ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>
              </div>

              {geminiTestStatus && (
                <div style={{ margin: '6px 20px 12px', fontSize: 12, padding: '8px 14px', borderRadius: 8, fontWeight: 600, background: geminiTestStatus.success ? '#dcfce7' : '#fee2e2', color: geminiTestStatus.success ? '#15803d' : '#b91c1c', border: `1px solid ${geminiTestStatus.success ? '#86efac' : '#fca5a5'}` }}>
                  {geminiTestStatus.message}
                </div>
              )}
            </div>

            {/* ImgBB */}
            <div className="settings-group" style={{ marginTop: 20 }}>
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ImageIcon size={17} color={GOLD} />
                <span>ImgBB Cloud Image Hosting</span>
              </div>
              <div className="settings-row">
                <label className="alabel" style={{ minWidth: 140, margin: 0 }}>ImgBB API Key</label>
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
            <div className="settings-group" style={{ marginTop: 20 }}>
              <div className="settings-group-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Shield size={17} color={GOLD} />
                <span>Google reCAPTCHA v2 / Bot Filtering</span>
              </div>
              <div className="settings-row">
                <label className="alabel" style={{ minWidth: 140, margin: 0 }}>Enable reCAPTCHA</label>
                <Toggle
                  checked={siteCfg.enableRecaptcha || false}
                  onChange={() => setSiteCfg(d => ({ ...d, enableRecaptcha: !d.enableRecaptcha }))}
                  label={siteCfg.enableRecaptcha ? 'Protection Active' : 'Honeypot Active'}
                  color={T.green}
                />
              </div>
              <div className="settings-row">
                <label className="alabel" style={{ minWidth: 140, margin: 0 }}>reCAPTCHA Site Key</label>
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
