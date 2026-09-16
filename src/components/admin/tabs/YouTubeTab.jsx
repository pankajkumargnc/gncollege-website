// ═══════════════════════════════════════════════════════════════════════════════
// YouTubeTab — YouTube API configuration + channel test
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Video, Key, CheckCircle2, XCircle, Save, RefreshCw, PlaySquare, Info, ShieldCheck } from 'lucide-react';
import { T, NAVY, GOLD } from '../AdminShared';

export default function YouTubeTab({ logAct }) {
  const [ytCfg, setYtCfg]       = useState({ apiKey: '', channelId: '', maxResults: 12, videoIds: '' });
  const [ytTest, setYtTest]     = useState(null);
  const [ytLoading, setYtLoading] = useState(false);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'youtube'))
      .then(s => s.exists() && setYtCfg(prev => ({ ...prev, ...s.data() })))
      .catch(() => {});
  }, []);

  const saveYt = async e => {
    e.preventDefault(); setLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'youtube'), { ...ytCfg, updatedAt: serverTimestamp() });
      toast.success('YouTube config saved!');
      logAct?.('update', 'YouTube config updated', 'settings');
    } catch (err) { toast.error(err.message); }
    setLoading(false);
  };

  const testYt = async () => {
    setYtLoading(true); setYtTest(null);
    try {
      const r = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ytCfg.channelId}&key=${ytCfg.apiKey}`);
      const d = await r.json();
      if (d.error) throw new Error(d.error.message);
      if (d.items?.length) setYtTest({ ok: true, msg: `Channel Verified: "${d.items[0].snippet.title}"` });
      else throw new Error('Channel not found');
    } catch (e) { setYtTest({ ok: false, msg: e.message }); }
    setYtLoading(false);
  };

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <Video size={24} color={GOLD} />
        <h2 style={{ margin: 0, fontWeight: 900, color: NAVY, fontSize: 'clamp(20px, 5vw, 24px)', letterSpacing: '-0.5px' }}>YouTube Manager</h2>
      </div>
      <p style={{ margin: '4px 0 20px', color: T.t3, fontSize: 13, fontWeight: 600 }}>Configure API keys and automated video feeds for the institutional video gallery</p>

      <div className="card-navy">
        <div className="actitle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Key size={16} color={GOLD} />
          <span>YouTube API Configuration</span>
        </div>

        {/* Setup guide */}
        <div style={{
          background: `${NAVY}0a`, border: `1.5px solid ${NAVY}25`,
          borderRadius: 12, padding: '14px 18px', marginBottom: 20
        }}>
          <div style={{ fontWeight: 800, color: NAVY, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Info size={15} color={NAVY} /> 3-Step Integration Guide:
          </div>
          <ol style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: T.t2, lineHeight: 2 }}>
            <li>Google Cloud Console → Enable <strong>YouTube Data API v3</strong></li>
            <li>Credentials → Create API Key → Copy it</li>
            <li>Copy your YouTube Channel ID (from URL: youtube.com/channel/<strong>UCxxxxxx</strong>)</li>
          </ol>
        </div>

        <form onSubmit={saveYt}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginBottom: 14 }}>
            <div>
              <label className="alabel">API Key *</label>
              <input className="ainp" value={ytCfg.apiKey}
                onChange={e => setYtCfg(d => ({ ...d, apiKey: e.target.value }))}
                placeholder="AIzaSyxxxxxxxxx" type="password" />
            </div>
            <div>
              <label className="alabel">Channel ID *</label>
              <input className="ainp" value={ytCfg.channelId}
                onChange={e => setYtCfg(d => ({ ...d, channelId: e.target.value }))}
                placeholder="UCxxxxxxxxxxxxxxxxx" />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label className="alabel">
                Manual Video IDs (optional — works without API key)
              </label>
              <textarea className="ainp" rows={3}
                value={ytCfg.videoIds || ''}
                onChange={e => setYtCfg(d => ({ ...d, videoIds: e.target.value }))}
                placeholder={"dQw4w9WgXcQ\nabc123xyz\n...one Video ID per line"}
              />
              <p style={{ fontSize: 11, color: '#94a3b8', margin: '4px 0 0' }}>
                Note: Paste video IDs extracted from YouTube URLs (e.g. watch?v=ID). These videos will display directly on the institutional homepage.
              </p>
            </div>
            <div>
              <label className="alabel">Videos to fetch</label>
              <select className="ainp" value={ytCfg.maxResults}
                onChange={e => setYtCfg(d => ({ ...d, maxResults: +e.target.value }))}>
                {[6, 9, 12, 15, 18, 24].map(n => <option key={n} value={n}>{n} videos</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="submit" className="abtn abtn-navy" disabled={loading} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Save size={15} /> Save Config
            </button>
            <button type="button" className="abtn abtn-gold"
              disabled={ytLoading || !ytCfg.apiKey} onClick={testYt} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {ytLoading ? <RefreshCw size={15} className="spin" /> : <ShieldCheck size={15} />}
              {ytLoading ? 'Testing API…' : 'Test API Connection'}
            </button>
          </div>
        </form>

        {ytTest && (
          <div style={{
            marginTop: 14, padding: '12px 16px', borderRadius: 10,
            background: ytTest.ok ? '#dcfce7' : '#fee2e2',
            color: ytTest.ok ? T.green : T.red,
            fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8
          }}>
            {ytTest.ok ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            <span>{ytTest.msg}</span>
          </div>
        )}
      </div>

      {/* Info card */}
      <div className="card">
        <div className="actitle" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Info size={16} color={NAVY} /> How Videos Show on Website
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[
            { Icon: Key, title: 'API Key Mode', desc: 'Automatically fetches latest videos from your channel. Requires Channel ID.' },
            { Icon: PlaySquare, title: 'Manual IDs Mode', desc: 'Paste specific video IDs. Works without API key. More control over what is shown.' },
            { Icon: RefreshCw, title: 'Auto Refresh', desc: 'Videos refresh when visitors load /video-gallery page. No manual sync needed.' },
          ].map(({ Icon, title, desc }) => (
            <div key={title} style={{
              background: `${NAVY}06`, border: `1px solid ${NAVY}12`,
              borderRadius: 12, padding: '14px 16px'
            }}>
              <div style={{ marginBottom: 8, color: GOLD }}>
                <Icon size={22} />
              </div>
              <div style={{ fontWeight: 800, color: NAVY, fontSize: 13, marginBottom: 5 }}>{title}</div>
              <div style={{ fontSize: 12, color: T.t3, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
