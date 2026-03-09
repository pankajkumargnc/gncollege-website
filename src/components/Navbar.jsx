import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { COLORS } from '../styles/colors'

export default function Navbar({ onAdminClick, navLinks }) {
  const [openL1, setOpenL1] = useState(null)
  const [openL2, setOpenL2] = useState(null)
  const [openL3, setOpenL3] = useState(null)
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1250)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1250)
      if (window.innerWidth >= 1250) setMenuOpen(false)
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleL1 = (label) => {
    if (openL1 === label) { setOpenL1(null); setOpenL2(null); setOpenL3(null); }
    else { setOpenL1(label); setOpenL2(null); setOpenL3(null); }
  }
  const toggleL2 = (label) => {
    if (openL2 === label) { setOpenL2(null); setOpenL3(null); }
    else { setOpenL2(label); setOpenL3(null); }
  }
  const toggleL3 = (label) => {
    if (openL3 === label) { setOpenL3(null); }
    else { setOpenL3(label); }
  }

  const getRoute = (href) => {
    if (!href) return '#';
    if (href.startsWith('/#')) return href.substring(2);
    return href;
  };

  return (
    <nav className="glass-navbar" style={{ 
      position: '-webkit-sticky', // Safari ke liye
      position: 'sticky',         // Chrome/Edge/Firefox ke liye
      top: 0, 
      zIndex: 99999,              // Sabse upar rakhne ke liye
      background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : '#ffffff',
      boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.15)' : '0 4px 15px rgba(0,0,0,0.05)',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s ease',
      width: '100%'
    }}>
      
      <style>{`
        /* 🚨 MASTER OVERRIDE: Ye sticky behavior ko fail hone se rokega 🚨 */
        html, body, #root {
          overflow-x: clip !important;
          overflow-y: visible !important;
        }

        /* 3D Spin for Logo */
        @keyframes coinSpin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        
        /* Shimmering effect for Text */
        @keyframes shineText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .spinning-logo {
          animation: coinSpin 6s linear infinite;
          transform-style: preserve-3d;
        }
        
        .logo-box-container:hover .spinning-logo {
          animation-play-state: paused;
        }

        .shimmering-title {
          background: linear-gradient(90deg, ${COLORS.navy} 0%, #1e3a8a 30%, #d4af37 50%, #1e3a8a 70%, ${COLORS.navy} 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shineText 5s linear infinite;
        }

        .clean-divider {
          border-left: 2.5px solid ${COLORS.gold};
          border-radius: 2px;
        }
      `}</style>

      {/* Main Container */}
      <div style={{ width: '100%', maxWidth: '98%', margin: '0 auto', padding: '0 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: isMobile ? '5px' : '20px' }}>

        {/* =========================================
            🌟 TRANSPARENT LOGO & TYPOGRAPHY SECTION 🌟
        ========================================== */}
        <Link to="/" style={{ 
          display: 'flex', alignItems: 'center', padding: '8px 0', flexShrink: 1, textDecoration: 'none', gap: isMobile ? '8px' : '15px',
          marginLeft: isMobile ? '0' : '-20px', minWidth: 0
        }}>
          
          <div className="logo-box-container" style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: isMobile ? '45px' : '75px', height: isMobile ? '45px' : '75px' }}>
            <img className="spinning-logo" src={`${import.meta.env.BASE_URL}images/logo.png`} 
              alt="Guru Nanak College Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>

          <div className="clean-divider" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: isMobile ? '8px' : '15px', textAlign: 'left', alignItems: 'flex-start', overflow: 'hidden' }}>
            
            <h1 className="shimmering-title" style={{ margin: '0 0 5px 0', fontSize: isMobile ? '13px' : '21.5px', fontWeight: '900', fontFamily: 'Georgia, serif', whiteSpace: 'nowrap', letterSpacing: isMobile ? '0px' : '2.5px', textAlign: 'left', lineHeight: '1.1' }}>
              GURU NANAK COLLEGE, DHANBAD
            </h1>
            
            {!isMobile && (
              <p style={{ margin: '0 0 3px 0', fontSize: '11px', color: '#475569', fontWeight: '700', whiteSpace: 'nowrap', textAlign: 'left' }}>
                A Sikh Minority Degree College Established & Managed by Gurudwara Prabhandhak Committee, Dhanbad.
              </p>
            )}
            
            <p style={{ margin: 0, fontSize: isMobile ? '8.5px' : '10.5px', color: COLORS.gold, fontWeight: '800', letterSpacing: isMobile ? '0.2px' : '1.8px', textTransform: 'uppercase', whiteSpace: 'nowrap', textAlign: 'left' }}>
              {isMobile ? 'Est. 1970 | Dhanbad, Jharkhand' : 'Affiliated to Binod Bihari Mahto Koyalanchal University, Dhanbad.'}
            </p>
          </div>
        </Link>
        {/* ========================================= */}

        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: 'none', color: COLORS.navy, fontSize: 28, cursor: 'pointer', padding: '4px', flexShrink: 0, zIndex: 200 }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        )}

        <div style={{
          display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          position: isMobile ? 'absolute' : 'static',
          top: '100%', left: 0, right: 0,
          background: isMobile ? 'rgba(255,255,255,0.98)' : 'transparent',
          padding: isMobile ? '10px 20px 20px' : 0,
          gap: isMobile ? 10 : 0,
          boxShadow: isMobile && menuOpen ? '0 10px 20px rgba(0,0,0,.15)' : 'none',
          maxHeight: isMobile ? '80vh' : 'auto',
          overflowY: isMobile ? 'auto' : 'visible',
          flex: 1, 
          justifyContent: isMobile ? 'flex-start' : 'flex-end',
          marginLeft: isMobile ? '0' : 'auto', 
          marginRight: isMobile ? '0' : '10px',
          borderTop: isMobile && menuOpen ? '1px solid #eee' : 'none',
          zIndex: 250 
        }}>
          {navLinks.map(l0 => (
            <div key={l0.label} style={{ position: 'relative', width: isMobile ? '100%' : 'auto' }}
              onMouseEnter={() => !isMobile && setOpenL1(l0.label)}
              onMouseLeave={() => { if (!isMobile) { setOpenL1(null); setOpenL2(null); setOpenL3(null); } }}>

              <div onClick={() => isMobile && l0.sub && toggleL1(l0.label)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: isMobile && l0.sub ? 'pointer' : 'default' }}>
                
                <Link to={getRoute(l0.href)}
                  onClick={() => { if (l0.label === 'Home') window.scrollTo(0, 0); }}
                  style={{ color: COLORS.navy, padding: isMobile ? '12px 0' : '24px 11px', display: 'block', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap', textDecoration: 'none', transition: 'all .2s', width: '100%' }}>
                  {l0.label === 'Home' ? '🏠 ' : ''}{l0.label}
                </Link>
                
                {isMobile && l0.sub && <span style={{ color: COLORS.navy, fontSize: 20 }}>{openL1 === l0.label ? '▴' : '▾'}</span>}
                {!isMobile && l0.sub && <span style={{ color: COLORS.navy, fontSize: 11, marginLeft: 2, marginRight: 8, marginTop: 2 }}>▾</span>}
              </div>

              {l0.sub && openL1 === l0.label && (
                <div style={{ position: isMobile ? 'static' : 'absolute', top: '100%', left: 0, background: '#fff', minWidth: 240, boxShadow: isMobile ? 'none' : '0 12px 30px rgba(0,0,0,.15)', borderTop: isMobile ? 'none' : '3px solid ' + COLORS.navy, borderRadius: isMobile ? 8 : '0 0 8px 8px', zIndex: 200, padding: isMobile ? '5px 0' : '8px 0' }}>
                  {l0.sub.map(l1 => (
                    <div key={l1.label} style={{ position: 'relative' }} onMouseEnter={() => !isMobile && setOpenL2(l1.label)} onMouseLeave={() => !isMobile && setOpenL2(null)}>
                      <div onClick={(e) => { if (isMobile && l1.sub) { e.stopPropagation(); toggleL2(l1.label); } }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '10px 16px' : '10px 18px', borderBottom: isMobile ? 'none' : '1px solid #f8f9fa', cursor: isMobile && l1.sub ? 'pointer' : 'default' }} onMouseEnter={e => { if(!isMobile) e.currentTarget.style.background = '#f4f6f9' }} onMouseLeave={e => { if(!isMobile) e.currentTarget.style.background = 'transparent' }}>
                        <Link to={getRoute(l1.href)} style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: 'block', width: '100%', textDecoration: 'none' }}>{l1.label}</Link>
                        {l1.sub && <span style={{ fontSize: 12, color: COLORS.gold, marginLeft: 8 }}>{isMobile ? (openL2 === l1.label ? '▴' : '▾') : '▶'}</span>}
                      </div>
                      {l1.sub && openL2 === l1.label && (
                        <div style={{ position: isMobile ? 'static' : 'absolute', top: 0, left: '100%', background: '#fff', minWidth: 240, boxShadow: isMobile ? 'none' : '4px 4px 20px rgba(0,0,0,.15)', borderTop: isMobile ? 'none' : '3px solid ' + COLORS.gold, borderRadius: isMobile ? 4 : '0 8px 8px 8px', margin: isMobile ? '0 16px 10px' : 0, borderLeft: isMobile ? '2px solid ' + COLORS.gold : 'none' }}>
                          {l1.sub.map(l2 => (
                             <div key={l2.label} style={{ position: 'relative' }} onMouseEnter={() => !isMobile && setOpenL3(l2.label)} onMouseLeave={() => !isMobile && setOpenL3(null)}>
                              <div onClick={(e) => { if (isMobile && l2.sub) { e.stopPropagation(); toggleL3(l2.label); } }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: isMobile ? 'none' : '1px solid #f8f9fa', cursor: isMobile && l2.sub ? 'pointer' : 'default' }} onMouseEnter={e => { if(!isMobile) e.currentTarget.style.background = '#f4f6f9' }} onMouseLeave={e => { if(!isMobile) e.currentTarget.style.background = 'transparent' }}>
                                <Link to={getRoute(l2.href)} style={{ fontSize: 12.5, fontWeight: 600, color: '#444', display: 'block', width: '100%', textDecoration: 'none' }}>{l2.label}</Link>
                                {l2.sub && <span style={{ fontSize: 11, color: COLORS.gold, marginLeft: 8 }}>{isMobile ? (openL3 === l2.label ? '▴' : '▾') : '▶'}</span>}
                              </div>
                              {l2.sub && openL3 === l2.label && (
                                <div style={{ position: isMobile ? 'static' : 'absolute', top: 0, left: '100%', background: '#fff', minWidth: 240, boxShadow: isMobile ? 'none' : '4px 4px 20px rgba(0,0,0,.15)', borderTop: isMobile ? 'none' : '3px solid ' + COLORS.navy, borderRadius: isMobile ? 4 : '0 8px 8px 8px', margin: isMobile ? '0 16px 10px' : 0, borderLeft: isMobile ? '2px solid ' + COLORS.navy : 'none' }}>
                                  {l2.sub.map(l3 => (
                                    <Link key={l3.label} to={getRoute(l3.href)} style={{ display: 'block', padding: '10px 16px', fontSize: 12, color: '#555', borderBottom: isMobile ? 'none' : '1px solid #f8f9fa', textDecoration: 'none' }} onMouseEnter={e => { if(!isMobile) e.currentTarget.style.background = '#f4f6f9' }} onMouseLeave={e => { if(!isMobile) e.currentTarget.style.background = 'transparent' }}>
                                      {l3.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Admin Login Button */}
          <button onClick={onAdminClick}
            style={{ flexShrink: 0, background: COLORS.gold, color: '#000', border: 'none', padding: '7px 18px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 800, marginLeft: isMobile ? 0 : 10, marginTop: isMobile ? 12 : 0, width: isMobile ? '100%' : 'auto', boxShadow: '0 4px 15px rgba(244,160,35,0.3)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <span style={{ fontSize: 16 }}>⚙️</span> Admin Login
          </button>
        </div>
      </div>
    </nav>
  )
}