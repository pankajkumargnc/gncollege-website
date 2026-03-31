// ═══════════════════════════════════════════════════════════════════════════════
// SettingsTab — ⚙️ Site settings, social links, maintenance mode, ImgBB key
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD, Toggle, useLocalDraft } from '../AdminShared';
import MediaPicker from "../../MediaPicker";

export default function SettingsTab({ logAct }) {
  const [siteCfg, setSiteCfg, clearDraft] = useLocalDraft('site_settings', {
    name: 'Guru Nanak College',
    tagline: 'Affiliated to B.B.M.K. University, Dhanbad',
    address: 'Bank More, Dhanbad — 826001, Jharkhand',
    phone: '', email: '',
    facebook: '', twitter: '', youtube: '', linkedin: '',
    footerText: '', maintenanceMode: false, imgbbKey: '',
  });
  const [siteLoading, setSiteLoading] = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'site'))
      .then(s => {
        if (s.exists()) {
          const d = s.data();
          setSiteCfg(prev => ({ ...prev, ...d }));
          if (d.imgbbKey) window.GN_IMGBB_KEY = d.imgbbKey;
        }
      })
      .catch(() => {});
  }, []);

  const saveSite = async e => {
    e.preventDefault(); setSiteLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'site'), { ...siteCfg, updatedAt: serverTimestamp() });
      if (siteCfg.imgbbKey) window.GN_IMGBB_KEY = siteCfg.imgbbKey;
      
      toast.success('Settings saved! 🎉');
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
      <p className="asec">⚙️ Site Settings</p>
      <p className="asub">College info, social links, maintenance mode</p>

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
            <strong>ImgBB Free API Key kaise banayein:</strong><br />
            1. <a href="https://imgbb.com/signup" target="_blank" rel="noreferrer"
              style={{ color: '#b45309' }}>imgbb.com/signup</a> pe Free account banayein<br />
            2. <a href="https://api.imgbb.com/" target="_blank" rel="noreferrer"
              style={{ color: '#b45309' }}>api.imgbb.com</a> → apni API key copy karein<br />
            3. Neeche paste karein aur Save karein — Lifetime Free, no credit card!
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
              ✅ ImgBB key set — saare upload tabs pe kaam karega
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
