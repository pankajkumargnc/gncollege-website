// ═══════════════════════════════════════════════════════════════════════════════
// YouTubeTab — ▶️ YouTube API configuration + channel test
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
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
      if (d.items?.length) setYtTest({ ok: true, msg: `✅ Channel: "${d.items[0].snippet.title}"` });
      else throw new Error('Channel not found');
    } catch (e) { setYtTest({ ok: false, msg: `❌ ${e.message}` }); }
    setYtLoading(false);
  };

  return (
    <div className="fade-up">
      <p className="asec">▶️ YouTube Manager</p>
      <p className="asub">Auto-fetch latest videos → /video-gallery page</p>

      <div className="card-navy">
        <div className="actitle">🔑 YouTube API Configuration</div>

        {/* Setup guide */}
        <div style={{
          background: `${NAVY}0a`, border: `1.5px solid ${NAVY}25`,
          borderRadius: 12, padding: '14px 18px', marginBottom: 20
        }}>
          <div style={{ fontWeight: 800, color: NAVY, marginBottom: 8 }}>📋 3 Steps Setup:</div>
          <ol style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: T.t2, lineHeight: 2 }}>
            <li>Google Cloud Console → Enable <strong>YouTube Data API v3</strong></li>
            <li>Credentials → Create API Key → Copy karo</li>
            <li>YouTube Channel ID copy karo (URL se: youtube.com/channel/<strong>UCxxxxxx</strong>)</li>
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
                Manual Video IDs (optional — API key ke bina bhi kaam karega)
              </label>
              <textarea className="ainp" rows={3}
                value={ytCfg.videoIds || ''}
                onChange={e => setYtCfg(d => ({ ...d, videoIds: e.target.value }))}
                placeholder={"dQw4w9WgXcQ\nabc123xyz\n...ek line mein ek Video ID"}
              />
              <p style={{ fontSize: 11, color: '#94a3b8', margin: '4px 0 0' }}>
                💡 YouTube video URL mein <code>watch?v=</code> ke baad wala ID copy karo. Homepage pe yahi videos dikhenge.
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
            <button type="submit" className="abtn abtn-navy" disabled={loading}>
              💾 Save Config
            </button>
            <button type="button" className="abtn abtn-gold"
              disabled={ytLoading || !ytCfg.apiKey} onClick={testYt}>
              {ytLoading ? '⏳ Testing…' : '🧪 Test API'}
            </button>
          </div>
        </form>

        {ytTest && (
          <div style={{
            marginTop: 14, padding: '12px 16px', borderRadius: 10,
            background: ytTest.ok ? '#dcfce7' : '#fee2e2',
            color: ytTest.ok ? T.green : T.red,
            fontWeight: 700, fontSize: 14
          }}>
            {ytTest.msg}
          </div>
        )}
      </div>

      {/* Info card */}
      <div className="card">
        <div className="actitle">ℹ️ How Videos Show on Website</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {[
            { icon: '🔑', title: 'API Key Mode', desc: 'Automatically fetches latest videos from your channel. Requires Channel ID.' },
            { icon: '📋', title: 'Manual IDs Mode', desc: 'Paste specific video IDs. Works without API key. More control over what\'s shown.' },
            { icon: '🔄', title: 'Auto Refresh', desc: 'Videos refresh when visitors load /video-gallery page. No manual sync needed.' },
          ].map(item => (
            <div key={item.icon} style={{
              background: `${NAVY}06`, border: `1px solid ${NAVY}12`,
              borderRadius: 12, padding: '14px 16px'
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 800, color: NAVY, fontSize: 13, marginBottom: 5 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: T.t3, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
