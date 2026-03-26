import React, { useState } from "react";
// ══════════════════════════════════════════════════════════════════
// STEP 1: Ye 2 helper components AboutPages.jsx mein
// "function useScrollTop()" se UPAR paste karo (line ~14 ke paas)
// ══════════════════════════════════════════════════════════════════

// ─── Organogram Node Styles ───────────────────────────────────────
const ORG_VARIANTS = {
  apex:     { bg:'linear-gradient(135deg,#c8a84b,#b8943a)',       color:'#0a1628', border:'#c8a84b',            shadow:'0 8px 28px rgba(200,168,75,0.45)' },
  council:  { bg:'linear-gradient(135deg,#162a52,#0f1f3d)',       color:'#e5c96a', border:'rgba(200,168,75,0.6)',shadow:'0 6px 20px rgba(200,168,75,0.2)'  },
  primary:  { bg:'linear-gradient(135deg,#0f2347,#162a52)',       color:'#f0f4ff', border:'rgba(255,255,255,0.15)',shadow:'0 4px 14px rgba(0,0,0,0.4)'    },
  incharge: { bg:'linear-gradient(135deg,#0d9488,#0a7567)',       color:'#fff',    border:'#2dd4bf',             shadow:'0 4px 18px rgba(13,148,136,0.35)' },
  body:     { bg:'linear-gradient(135deg,#0f1f3d,#1a2840)',       color:'#e2e8f0', border:'rgba(255,255,255,0.1)',shadow:'0 3px 10px rgba(0,0,0,0.35)'     },
  special:  { bg:'linear-gradient(135deg,#1e3a5f,#0f2a47)',       color:'#93c5fd', border:'rgba(147,197,253,0.3)',shadow:'0 3px 10px rgba(0,0,0,0.3)'      },
  leaf:     { bg:'rgba(255,255,255,0.04)',                         color:'#7a8ba0', border:'rgba(255,255,255,0.07)',shadow:'0 2px 6px rgba(0,0,0,0.2)'      },
};

function OrgNode({ label, sub, variant = 'body', icon, minW = 160, delay = 0 }) {
  const [hov, setHov] = React.useState(false);
  const v = ORG_VARIANTS[variant];
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:'inline-flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', minWidth: minW, maxWidth: 280,
        padding: variant === 'apex' || variant === 'council' ? '14px 22px' : variant === 'leaf' ? '8px 12px' : '11px 18px',
        background: v.bg,
        color: v.color,
        border: `1.5px solid ${v.border}`,
        borderRadius: 10,
        boxShadow: v.shadow,
        textAlign:'center', cursor:'default',
        transition:'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-3px) scale(1.03)' : 'none',
        animation: `orgFadeUp 0.5s ease ${delay}s both`,
        position:'relative', overflow:'hidden',
        fontSize: variant === 'apex' ? 15 : variant === 'council' ? 14 : variant === 'leaf' ? 11 : 13,
        fontWeight: variant === 'leaf' ? 500 : variant === 'apex' || variant === 'council' ? 800 : 700,
        lineHeight: 1.3,
        whiteSpace: 'nowrap',
      }}
    >
      {hov && <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#e5c96a,transparent)' }}/>}
      {icon && <span style={{ fontSize: variant === 'apex' ? 20 : 15, marginBottom: 3 }}>{icon}</span>}
      <span>{label}</span>
      {sub && <span style={{ fontSize: 10, opacity: 0.72, marginTop: 3, fontWeight: 400, fontStyle:'italic', whiteSpace:'normal', lineHeight:1.3 }}>{sub}</span>}
    </div>
  );
}

function OrgVLine({ h = 20, color = 'rgba(200,168,75,0.35)' }) {
  return <div style={{ width: 1, height: h, background: color, margin: '0 auto', flexShrink: 0 }} />;
}

// ══════════════════════════════════════════════════════════════════
// STEP 2: AboutPages.jsx mein purana Organogram function (line ~207)
// DELETE karo aur YE replace karo:
// ══════════════════════════════════════════════════════════════════

export function Organogram() {
  useScrollTop();
  return (
    <div>
      <PageHero
        title="Organogram"
        subtitle="Organizational structure and hierarchy of Guru Nanak College, Dhanbad"
        icon="🏛️"
      />
      <PageLayout>
        {/* ── Premium Interactive Tree ── */}
        <Fade>
          <div style={{
            background: 'linear-gradient(160deg, #0a1628 0%, #0d1a2e 60%, #0a1628 100%)',
            borderRadius: 20, padding: '40px 24px 48px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            overflowX: 'auto', marginBottom: 24,
          }}>
            <style>{`
              @keyframes orgFadeUp {
                from { opacity:0; transform:translateY(14px); }
                to   { opacity:1; transform:translateY(0); }
              }
              @keyframes orgShimmer {
                0%   { background-position: 300% 0; }
                100% { background-position: -300% 0; }
              }
            `}</style>

            {/* Header */}
            <div style={{ textAlign:'center', marginBottom: 36 }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.26em', color:'#c8a84b', textTransform:'uppercase', marginBottom:8 }}>
                Guru Nanak College, Dhanbad
              </div>
              <div style={{ fontSize:20, fontWeight:800, color:'#f0f4ff', letterSpacing:'-0.01em', marginBottom:10 }}>
                College Administration — Organogram
              </div>
              <div style={{ width:180, height:2, margin:'0 auto', background:'linear-gradient(90deg,transparent,#c8a84b,#2dd4bf,#c8a84b,transparent)', backgroundSize:'300% 100%', animation:'orgShimmer 3s linear infinite', borderRadius:2 }}/>
            </div>

            {/* ── TREE ── */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', minWidth: 820 }}>

              {/* L1 */}
              <OrgNode label="Gurudwara Prabandhak Committee" sub="(Parent Body)" variant="apex" icon="🏛️" minW={280} delay={0.05}/>
              <OrgVLine h={24} color="rgba(200,168,75,0.6)"/>

              {/* L2 */}
              <OrgNode label="Governing Council" sub="[Nominated by GPC (Sponsors)]" variant="council" icon="⚖️" minW={260} delay={0.12}/>
              <OrgVLine h={24} color="rgba(200,168,75,0.5)"/>

              {/* L3: President | Principal | Secretary */}
              <div style={{ position:'relative', display:'flex', gap:28, alignItems:'flex-start' }}>
                <div style={{ position:'absolute', top:0, left:'15%', right:'15%', height:1, background:'rgba(200,168,75,0.3)' }}/>
                {[{l:'President',icon:'👤'},{l:'Principal',icon:'🎓'},{l:'Secretary',icon:'📋'}].map((n,i)=>(
                  <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', zIndex:1 }}>
                    <OrgVLine h={22}/>
                    <OrgNode label={n.l} variant="primary" icon={n.icon} minW={140} delay={0.18+i*0.07}/>
                  </div>
                ))}
              </div>
              <OrgVLine h={4} color="transparent"/>

              {/* L4: Two Prof-in-Charge */}
              <div style={{ position:'relative', display:'flex', gap:60, alignItems:'flex-start', marginTop:8 }}>
                <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'rgba(45,212,191,0.25)' }}/>
                {[{l:'Prof-in-Charge',s:'Main Campus, Bhuda',icon:'🏫'},{l:'Prof-in-Charge',s:"Women's Wing, Bank More",icon:'🏢'}].map((n,i)=>(
                  <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', zIndex:1 }}>
                    <OrgVLine h={22} color="rgba(45,212,191,0.4)"/>
                    <OrgNode label={n.l} sub={n.s} variant="incharge" icon={n.icon} minW={200} delay={0.38+i*0.08}/>
                  </div>
                ))}
              </div>

              {/* L5 main row */}
              <div style={{ position:'relative', display:'flex', gap:14, alignItems:'flex-start', marginTop:0, flexWrap:'wrap', justifyContent:'center', width:'100%' }}>
                <div style={{ position:'absolute', top:0, left:'4%', right:'4%', height:1, background:'rgba(200,168,75,0.2)' }}/>

                {/* Committees */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', zIndex:1 }}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:'100%' }}>
                    <OrgVLine h={24}/><OrgNode label="Committees" variant="body" icon="📌" delay={0.5}/>
                  </div>
                  <OrgVLine h={12}/>
                  <div style={{ display:'flex', flexDirection:'column', gap:4, paddingLeft:12 }}>
                    {["Women's Cell","Anti-Ragging Cell","Committee for SC/ST","OBC Cell","Grievance Redressal Cell","Internal Complaint Committee","Minority Cell","Placement Cell","RUSA Cell"].map((item,i)=>(
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:6, animation:`orgFadeUp 0.4s ease ${0.55+i*0.04}s both` }}>
                        <div style={{ width:12, height:1, background:'rgba(200,168,75,0.3)' }}/>
                        <OrgNode label={item} variant="leaf" minW={170}/>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle column: Staff Council + Association + IQAC */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:0, zIndex:1 }}>
                  <OrgVLine h={24}/>
                  <OrgNode label="Staff Council" sub="(All Teachers are Members)" variant="special" icon="👥" delay={0.52}/>
                  <OrgVLine h={20}/>
                  <OrgNode label="Association" variant="body" icon="🤝" delay={0.54}/>
                  <OrgVLine h={12}/>
                  <div style={{ display:'flex', gap:8 }}>
                    <OrgNode label="Staff Association"  variant="leaf" delay={0.58}/>
                    <OrgNode label="Alumni Association" variant="leaf" delay={0.60}/>
                  </div>
                  <OrgVLine h={18}/>
                  <OrgNode label="IQAC" variant="special" icon="🔬" delay={0.56}/>
                </div>

                {/* Accounts chain */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', zIndex:1 }}>
                  <OrgVLine h={24}/>
                  <OrgNode label="Accounts Section" variant="body" icon="🧾" delay={0.57}/>
                  <OrgVLine h={14}/>
                  <OrgNode label="Bursar" variant="primary" icon="💼" delay={0.61}/>
                  <OrgVLine h={14}/>
                  <div style={{ display:'flex', gap:8 }}>
                    <OrgNode label="Accountant" variant="leaf" delay={0.64}/>
                    <OrgNode label="Cashier"    variant="leaf" delay={0.66}/>
                  </div>
                </div>

                {/* CoE + Non-Teaching */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14, zIndex:1 }}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                    <OrgVLine h={24}/>
                    <OrgNode label="Controller of Examinations" variant="special" icon="📝" delay={0.59}/>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                    <OrgVLine h={14}/>
                    <OrgNode label="Non-Teaching Staff" variant="body" icon="🧑‍💼" delay={0.62}/>
                  </div>
                </div>
              </div>

              {/* L6: Bottom row */}
              <div style={{ display:'flex', gap:12, alignItems:'flex-start', marginTop:24, flexWrap:'wrap', justifyContent:'center' }}>
                {[{l:'NSS',icon:'🌱'},{l:'NCC',icon:'🎖️'},{l:'Sports & Games',icon:'🏅'},{l:'Creativity & Culture',icon:'🎨'}].map((n,i)=>(
                  <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                    <div style={{ width:1, height:18, background:'rgba(200,168,75,0.25)' }}/>
                    <OrgNode label={n.l} variant="leaf" icon={n.icon} minW={120} delay={0.75+i*0.06}/>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center', marginTop:36, paddingTop:24, borderTop:'1px solid rgba(255,255,255,0.07)' }}>
              {[
                {color:'#c8a84b',label:'Parent / Apex Body'},
                {color:'#e5c96a',label:'Governing Council'},
                {color:'#f0f4ff',label:'Key Officials'},
                {color:'#2dd4bf',label:'Campus Leadership'},
                {color:'#93c5fd',label:'Special Bodies'},
                {color:'#7a8ba0',label:'Sub-Units / Cells'},
              ].map((l,i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'#7a8ba0' }}>
                  <div style={{ width:10, height:10, borderRadius:3, background:l.color, flexShrink:0 }}/>
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </Fade>

        {/* ── Static image fallback ── */}
        <Fade delay={0.15}>
          <div style={{ background:'#fff', borderRadius:20, padding:32, boxShadow:'0 8px 30px rgba(0,0,0,0.07)', marginBottom:24 }}>
            <h2 className="section-heading">Official Organogram (Image)</h2>
            <div className="heading-underline"/>
            <div style={{ textAlign:'center', marginTop:20 }}>
              <img
                src="/images/organogram.webp"
                alt="College Organogram"
                style={{ maxWidth:'100%', borderRadius:10, boxShadow:'0 4px 16px rgba(0,0,0,0.1)' }}
              />
            </div>
            <div style={{ textAlign:'center', marginTop:20 }}>
              <a href="images/organogram.webp" download
                style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:'#0f2347', color:'#fff', padding:'10px 22px',
                  borderRadius:10, fontWeight:700, fontSize:14, textDecoration:'none',
                }}>
                📥 Download Organogram PDF
              </a>
            </div>
          </div>
        </Fade>
      </PageLayout>
    </div>
  );
}
