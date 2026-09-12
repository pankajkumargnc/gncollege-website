// ═══════════════════════════════════════════════════════════════════════════════
// SettingsTab — ⚙️ Site settings, social links, maintenance mode, ImgBB key
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD, Toggle, useLocalDraft } from '../AdminShared';
import { clearCache } from '../../../utils/cachedFetch';
import MediaPicker from "../../MediaPicker";

export default function SettingsTab({ logAct }) {
  const [siteCfg, setSiteCfg, clearDraft] = useLocalDraft('site_settings', {
    name: 'Guru Nanak College',
    tagline: 'Affiliated to B.B.M.K. University, Dhanbad',
    address: 'Bank More, Dhanbad — 826001, Jharkhand',
    phone: '', email: '',
    facebook: '', twitter: '', youtube: '', linkedin: '',
    footerText: '', maintenanceMode: false, imgbbKey: '',
    geminiApiKey: '',
  }, ['email', 'phone', 'imgbbKey', 'geminiApiKey']); // 🔐 These sensitive fields won't be saved to localStorage
  const [siteLoading, setSiteLoading] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [testingGemini, setTestingGemini] = useState(false);
  const [geminiTestStatus, setGeminiTestStatus] = useState(null);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'site'))
      .then(s => {
        if (s.exists()) {
          const d = s.data();
          setSiteCfg(prev => ({ ...prev, ...d }));
          if (d.imgbbKey) window.GN_IMGBB_KEY = d.imgbbKey;
          if (d.geminiApiKey) window.GNC_GEMINI_API_KEY = d.geminiApiKey;
        }
      })
      .catch(() => {});
  }, []);

  const testGeminiConnection = async () => {
    const key = (siteCfg.geminiApiKey || '').trim();
    if (!key) {
      toast.error('Pehle Gemini API key daaliye!');
      return;
    }
    setTestingGemini(true);
    setGeminiTestStatus(null);
    try {
      // 1. Query ListModels to find which models are enabled for this key
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

      // Default fallback candidate models in order of speed and stability
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

  const saveSite = async e => {
    e.preventDefault(); setSiteLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'site'), { ...siteCfg, updatedAt: serverTimestamp() });
      if (siteCfg.imgbbKey) window.GN_IMGBB_KEY = siteCfg.imgbbKey;
      if (siteCfg.geminiApiKey) window.GNC_GEMINI_API_KEY = siteCfg.geminiApiKey;
      
      clearCache('site_settings');
      toast.success('Settings saved & live synced! 🎉');
      logAct?.('update', 'Site settings updated', 'settings');
      clearDraft(); // ✅ Draft clear after save
    } catch (err) { toast.error(err.message); }
    setSiteLoading(false);
  };

  const field = (key, label, type = 'text') => (
    <div key={key} className="settings-row">
      <label className="alabel" style={{ minWidth: 140, margin: 0 }}>{label}</label>
      <input className="ainp" value={siteCfg[key] || ''}
        onChange={e => setSiteCfg(d => ({ ...d, [key]: e.target.value }))}
        type={type} />
    </div>
  );

  return (
    <div className="fade-up">
      <p style={{ margin: 0, fontWeight: 900, color: NAVY, fontSize: 'clamp(20px, 5vw, 24px)', letterSpacing: '-0.5px' }}>⚙️ Site Settings</p>
      <p style={{ margin: '4px 0 20px', color: T.t3, fontSize: 13, fontWeight: 600 }}>Manage college information, social links, and system status.</p>

      <form onSubmit={saveSite}>

        {/* College Info */}
        <div className="settings-group">
          <div className="settings-group-title">🏫 College Information</div>
          {field('name', 'College Name')}
          {field('tagline', 'Tagline')}
          {field('address', 'Address')}
          {field('phone', 'Phone')}
          {field('email', 'Email', 'email')}
        </div>

        {/* Social Links */}
        <div className="settings-group">
          <div className="settings-group-title">🌐 Social Media Links</div>
          {['facebook', 'twitter', 'youtube', 'linkedin'].map(s => (
            <div key={s} className="settings-row">
              <label className="alabel" style={{ minWidth: 140, margin: 0, textTransform: 'capitalize' }}>{s}</label>
              <input className="ainp" value={siteCfg[s] || ''}
                onChange={e => setSiteCfg(d => ({ ...d, [s]: e.target.value }))}
                placeholder={`https://${s}.com/...`} />
            </div>
          ))}
        </div>

        {/* Advanced */}
        <div className="settings-group">
          <div className="settings-group-title">🔧 Advanced</div>
          <div className="settings-row">
            <label className="alabel" style={{ minWidth: 140, margin: 0 }}>Footer Text</label>
            <input className="ainp" value={siteCfg.footerText || ''}
              onChange={e => setSiteCfg(d => ({ ...d, footerText: e.target.value }))}
              placeholder="© 2024 Guru Nanak College" />
          </div>
          <div className="settings-row">
            <label className="alabel" style={{ minWidth: 140, margin: 0 }}>Maintenance Mode</label>
            <Toggle
              checked={siteCfg.maintenanceMode || false}
              onChange={() => setSiteCfg(d => ({ ...d, maintenanceMode: !d.maintenanceMode }))}
              label={siteCfg.maintenanceMode ? '🔴 Site is DOWN for maintenance' : '🟢 Site is LIVE'}
              color={T.red}
            />
          </div>
        </div>

        {/* ImgBB */}
        <div className="settings-group">
          <div className="settings-group-title">🖼️ ImgBB — Free Image Hosting</div>
          <div style={{
            background: '#fffbeb', border: '1px solid #fed7aa',
            borderRadius: 10, padding: '10px 14px', margin: '12px 20px',
            fontSize: 12.5, color: '#92400e', lineHeight: 1.7
          }}>
            <strong>How to create a Free ImgBB API Key:</strong><br />
            1. Create a free account at <a href="https://imgbb.com/signup" target="_blank" rel="noreferrer"
              style={{ color: '#b45309' }}>imgbb.com/signup</a><br />
            2. Go to <a href="https://api.imgbb.com/" target="_blank" rel="noreferrer"
              style={{ color: '#b45309' }}>api.imgbb.com</a> and copy your API key<br />
            3. Paste it below and Save — Lifetime Free, no credit card required!
          </div>
          <div className="settings-row">
            <label className="alabel" style={{ minWidth: 140, margin: 0 }}>ImgBB API Key</label>
            <input className="ainp" value={siteCfg.imgbbKey || ''}
              onChange={e => setSiteCfg(d => ({ ...d, imgbbKey: e.target.value }))}
              placeholder="Paste your ImgBB API key here..."
              style={{ fontFamily: 'monospace' }} />
          </div>
          {siteCfg.imgbbKey && (
            <div style={{
              fontSize: 12, color: '#065f46', background: '#d1fae5',
              padding: '6px 12px 6px 20px', display: 'inline-flex', alignItems: 'center', gap: 6
            }}>
              \u2705 ImgBB key set \u2014 will work on all upload tabs
            </div>
          )}
        </div>

        {/* Google Gemini AI Chatbot */}
        <div className="settings-group">
          <div className="settings-group-title">🤖 Google Gemini AI Chatbot Configuration</div>
          <div style={{
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: 10, padding: '12px 16px', margin: '12px 20px',
            fontSize: 12.5, color: '#166534', lineHeight: 1.7
          }}>
            <strong>How to get a 100% Free Gemini API Key:</strong><br />
            1. Go to Google AI Studio: <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer"
              style={{ color: '#15803d', fontWeight: 800, textDecoration: 'underline' }}>aistudio.google.com</a><br />
            2. Sign in with your Google account and click <strong>"Get API key"</strong> ➜ <strong>"Create API key"</strong>.<br />
            3. Paste the key below, click <strong>"⚡ Test Connection"</strong>, and <strong>Save</strong>.<br />
            <em>Yeh key website ke AI Chatbot ko live Gemini AI powers deti hai aur public se safe/hidden rehti hai.</em>
          </div>

          <div className="settings-row">
            <label className="alabel" style={{ minWidth: 140, margin: 0 }}>Gemini API Key</label>
            <div style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                className="ainp"
                type={showGeminiKey ? 'text' : 'password'}
                value={siteCfg.geminiApiKey || ''}
                onChange={e => setSiteCfg(d => ({ ...d, geminiApiKey: e.target.value }))}
                placeholder="Paste AIzaSy... key from Google AI Studio"
                style={{ fontFamily: 'monospace', flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowGeminiKey(!showGeminiKey)}
                className="abtn abtn-outline"
                style={{ padding: '8px 12px', fontSize: 12 }}
                title={showGeminiKey ? 'Hide key' : 'Show key'}
              >
                {showGeminiKey ? '🙈 Hide' : '👁️ Show'}
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
                  fontWeight: 800,
                  opacity: (!siteCfg.geminiApiKey || testingGemini) ? 0.6 : 1
                }}
              >
                {testingGemini ? '⏳ Testing...' : '⚡ Test Connection'}
              </button>
            </div>
          </div>

          {geminiTestStatus && (
            <div style={{
              margin: '6px 20px 12px',
              fontSize: 12,
              padding: '8px 14px',
              borderRadius: 8,
              fontWeight: 600,
              background: geminiTestStatus.success ? '#dcfce7' : '#fee2e2',
              color: geminiTestStatus.success ? '#15803d' : '#b91c1c',
              border: `1px solid ${geminiTestStatus.success ? '#86efac' : '#fca5a5'}`
            }}>
              {geminiTestStatus.message}
            </div>
          )}

          {siteCfg.geminiApiKey && !geminiTestStatus && (
            <div style={{
              fontSize: 12, color: '#065f46', background: '#d1fae5',
              padding: '6px 12px 6px 20px', display: 'inline-flex', alignItems: 'center', gap: 6
            }}>
              ✅ Gemini API Key set — All students will receive live AI responses
            </div>
          )}
        </div>

        <button type="submit" className="abtn abtn-gold" disabled={siteLoading}>
          💾 Save All Settings
        </button>
      </form>
    </div>
  );
}
