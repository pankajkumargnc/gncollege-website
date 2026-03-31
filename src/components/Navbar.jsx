// src/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { COLORS } from '../styles/colors'

export default function Navbar({ onAdminClick, navLinks }) {
  const [openL1, setOpenL1] = useState(null)
  const [openL2, setOpenL2] = useState(null)
  const [openL3, setOpenL3] = useState(null)
  const closeTimer = useRef(null)

  const [isMobile,  setIsMobile]  = useState(window.innerWidth < 1024)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  // ── Dark mode detection (reads html[data-theme]) ──
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    function handleScroll() {
      setIsScrolled(window.scrollY > 40)
    }
    // MutationObserver — watch data-theme on <html>
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const toggleL1 = (label) => {
    if (openL1 === label) { setOpenL1(null); setOpenL2(null); setOpenL3(null) }
    else { setOpenL1(label); setOpenL2(null); setOpenL3(null) }
  }
  const toggleL2 = (label) => {
    if (openL2 === label) { setOpenL2(null); setOpenL3(null) }
    else { setOpenL2(label); setOpenL3(null) }
  }
  const toggleL3 = (label) => {
    if (openL3 === label) { setOpenL3(null) }
    else { setOpenL3(label) }
  }

  const getRoute = (href) => {
    if (!href) return '#'
    if (href.startsWith('/#')) return href.substring(2)
    return href
  }

  return (
    <>
      {/* Spacer to prevent content jump when navbar becomes fixed */}
      {isScrolled && <div style={{ height: isMobile ? '65px' : '95px', width: '100%' }} />}
      
      <nav className="glass-navbar" style={{
        position: isScrolled ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        zIndex: 99999,
        // ── Dark-aware background ──
        background: isDark
          ? (isScrolled ? 'rgba(6,14,28,0.97)' : 'rgba(6,14,28,1)')
          : (isScrolled ? 'rgba(255,255,255,0.72)' : '#ffffff'),
        boxShadow: isDark
          ? '0 4px 30px rgba(0,0,0,0.55)'
          : (isScrolled ? '0 8px 32px rgba(15,35,71,0.1)' : '0 4px 15px rgba(0,0,0,0.05)'),
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: isDark ? '1px solid rgba(244,160,35,0.15)' : (isScrolled ? '1px solid rgba(255,255,255,0.5)' : 'none'),
        transition: 'all 0.4s ease-in-out',
        width: '100%'
      }}>

        <style>{`
          @keyframes coinSpin {
            0%   { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          @keyframes shineText {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes dropdownFadeDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes dropdownFadeSide {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
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
          .nav-hover-link {
            transition: color 0.25s ease, transform 0.25s cubic-bezier(.22,1,.36,1);
          }
          .nav-hover-link:hover {
            color: ${COLORS.gold} !important;
            transform: translateX(4px);
          }
          .nav-dropdown-item {
            transition: background 0.2s ease;
          }
          .nav-dropdown-item:hover {
            background: rgba(15,35,71,0.03);
          }
          [data-theme="dark"] .nav-dropdown-item:hover {
            background: rgba(255,255,255,0.04);
          }
        `}</style>

        {/* Main Container */}
        <div style={{
          width: '100%',
          maxWidth: '98%',
          margin: '0 auto',
          padding: '0 15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: isMobile ? '8px' : 'clamp(10px, 1.5vw, 20px)'
        }}>

          {/* ── LOGO & TITLE ── */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 0',
            flexShrink: 0,
            textDecoration: 'none',
            gap: isMobile ? '6px' : '15px',
            marginLeft: isMobile ? '0' : '-20px',
            minWidth: 0 // ✅ Prevent overflow on tiny screens
          }}>

            <div className="logo-box-container" style={{
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              width:  isMobile ? 'clamp(38px, 10vw, 45px)' : '75px',
              height: isMobile ? 'clamp(38px, 10vw, 45px)' : '75px',
            }}>
              <img
                className="spinning-logo"
                src={`${import.meta.env.BASE_URL}images/logo.webp`}
                alt="Guru Nanak College Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <div className="clean-divider" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: isMobile ? '6px' : '15px',
              textAlign: 'left',
              alignItems: 'flex-start',
              minWidth: 0 // ✅ Allow text truncation if needed
            }}>
              <h1 className="shimmering-title" style={{
                margin: '0 0 5px 0',
                // ✅ FLUID TYPE HERE FOR EXTREME RESPONSIVENESS
                fontSize: isMobile ? 'clamp(11px, 3.5vw, 14px)' : 'clamp(16px, 1.8vw, 21.5px)',
                fontWeight: '900',
                fontFamily: "'Plus Jakarta Sans', Georgia, serif",
                whiteSpace: 'nowrap',
                letterSpacing: isMobile ? '0px' : '2.5px',
                textAlign: 'left',
                lineHeight: '1.1',
              }}>
                GURU NANAK COLLEGE, DHANBAD
              </h1>

              {!isMobile && (
                <p style={{
                  margin: '0 0 3px 0',
                  fontSize: '11px',
                  color: isDark ? '#94a3b8' : '#475569',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                }}>
                  A Sikh Minority Degree College Established &amp; Managed by Gurudwara Prabhandhak Committee, Dhanbad.
                </p>
              )}

              <p style={{
                margin: 0,
                // ✅ FLUID SUBTITLE
                fontSize: isMobile ? 'clamp(7.5px, 2.2vw, 9px)' : '10.5px',
                color: COLORS.gold,
                fontWeight: '800',
                letterSpacing: isMobile ? '0.2px' : '1.8px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                textAlign: 'left',
              }}>
                {isMobile
                  ? 'Est. 1970 | Dhanbad, Jharkhand'
                  : 'Affiliated to Binod Bihari Mahto Koyalanchal University, Dhanbad.'}
              </p>
            </div>
          </Link>

          {/* ── HAMBURGER ── */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              style={{
                background: 'transparent', border: 'none',
                color: isDark ? '#e2e8f0' : COLORS.navy, fontSize: 26,
                cursor: 'pointer', padding: '8px',
                flexShrink: 0, zIndex: 200,
                minWidth: '44px', minHeight: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '8px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,35,71,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          )}

          {/* ── NAV LINKS ── */}
          <div style={{
            display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            position: isMobile ? 'absolute' : 'static',
            top: '100%', left: 0, right: 0,
            
            background: isMobile
              ? (isDark ? 'rgba(6,14,28,0.98)' : (isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.98)'))
              : 'transparent',
            backdropFilter: isMobile && isScrolled ? 'blur(16px)' : 'none',
            
            padding: isMobile ? '10px 20px 20px' : 0,
            gap: isMobile ? 10 : 0,
            boxShadow: isMobile && menuOpen ? '0 10px 20px rgba(0,0,0,.15)' : 'none',
            maxHeight: isMobile ? '80vh' : 'auto',
            overflowY: isMobile ? 'auto' : 'visible',
            flex: isMobile ? 'unset' : 1,
            justifyContent: isMobile ? 'flex-start' : 'flex-end',
            marginLeft: isMobile ? '0' : 'auto',
            marginRight: isMobile ? '0' : '10px',
            borderTop: isMobile && menuOpen ? '1px solid #eee' : 'none',
            zIndex: 250,
          }}>
            {(navLinks || []).map(l0 => (
              <div key={l0.label}
                style={{ position: 'relative', width: isMobile ? '100%' : 'auto' }}
                onMouseEnter={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current)
                  if (!isMobile) setOpenL1(l0.label)
                }}
                onMouseLeave={() => {
                  if (!isMobile) closeTimer.current = setTimeout(() => {
                    setOpenL1(null); setOpenL2(null); setOpenL3(null)
                  }, 200)
                }}
              >
                <div
                  onClick={() => isMobile && l0.sub && toggleL1(l0.label)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: isMobile && l0.sub ? 'pointer' : 'default',
                  }}>
                  <Link
                    to={getRoute(l0.href)}
                    onClick={() => { 
                      if (l0.label === 'Home') window.scrollTo(0, 0)
                      if (isMobile) setMenuOpen(false)
                    }}
                    className="nav-hover-link"
                    style={{
                      color: isDark ? '#e2e8f0' : COLORS.navy,
                      padding: isMobile ? '14px 0' : '16px 11px',
                      display: 'block',
                      fontSize: isMobile ? 14 : 'clamp(12px, 0.9vw, 13.5px)', 
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                      width: '100%',
                      minHeight: '44px',
                      lineHeight: isMobile ? '16px' : 'normal',
                    }}>
                    {l0.label === 'Home' ? '🏠 ' : ''}{l0.label}
                  </Link>
                  {isMobile  && l0.sub && <span style={{ color: isDark ? '#94a3b8' : COLORS.navy, fontSize: 20 }}>{openL1 === l0.label ? '▴' : '▾'}</span>}
                  {!isMobile && l0.sub && <span style={{ color: isDark ? '#94a3b8' : COLORS.navy, fontSize: 11, marginLeft: 2, marginRight: 8, marginTop: 2 }}>▾</span>}
                </div>

                {/* ── L1 Dropdown ── */}
                {l0.sub && openL1 === l0.label && (
                  <div className="nav-dropdown-panel" style={{
                    position: isMobile ? 'static' : 'absolute',
                    top: '100%', left: 0,
                    
                    background: isMobile ? '#fff' : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: isMobile ? 'none' : 'blur(20px)',
                    WebkitBackdropFilter: isMobile ? 'none' : 'blur(20px)',
                    border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.6)',
                    
                    minWidth: isMobile ? '100%' : 210,
                    boxShadow: isMobile ? 'none' : '0 15px 35px rgba(0,0,0,.12)',
                    borderTop: isMobile ? 'none' : '3px solid ' + COLORS.navy,
                    borderRadius: isMobile ? 8 : '0 0 12px 12px',
                    zIndex: 200, 
                    padding: isMobile ? '5px 0' : '8px 0',
                    animation: isMobile ? 'none' : 'dropdownFadeDown 0.25s ease-out forwards',
                    transformOrigin: 'top center'
                  }}>
                    {l0.sub.map(l1 => (
                      <div key={l1.label}
                        style={{ position: 'relative' }}
                        onMouseEnter={() => !isMobile && setOpenL2(l1.label)}
                        onMouseLeave={() => !isMobile && setOpenL2(null)}
                      >
                        <div className="nav-dropdown-item"
                          onClick={e => { if (isMobile && l1.sub) { e.stopPropagation(); toggleL2(l1.label) } }}
                          style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: isMobile ? '12px 16px' : '6px 16px',
                            minHeight: isMobile ? '44px' : 'auto',
                            borderBottom: isMobile ? 'none' : '1px solid rgba(15, 35, 71, 0.03)',
                            cursor: isMobile && l1.sub ? 'pointer' : 'default',
                          }}
                        >
                          <Link to={getRoute(l1.href)} className="nav-hover-link dropdown-link-text"
                            style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: 'block', width: '100%', textDecoration: 'none' }}>
                            {l1.label}
                          </Link>
                          {l1.sub && <span style={{ fontSize: 12, color: COLORS.gold, marginLeft: 8 }}>{isMobile ? (openL2 === l1.label ? '▴' : '▾') : '▶'}</span>}
                        </div>

                        {/* ── L2 Dropdown ── */}
                        {l1.sub && openL2 === l1.label && (
                          <div className="nav-dropdown-panel" style={{
                            position: isMobile ? 'static' : 'absolute',
                            top: 0, left: '100%',
                            
                            background: isMobile ? '#fff' : 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: isMobile ? 'none' : 'blur(20px)',
                            WebkitBackdropFilter: isMobile ? 'none' : 'blur(20px)',
                            border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.6)',
                            
                            minWidth: isMobile ? '100%' : 210,
                            boxShadow: isMobile ? 'none' : '5px 5px 25px rgba(0,0,0,.12)',
                            borderTop: isMobile ? 'none' : '3px solid ' + COLORS.gold,
                            borderRadius: isMobile ? 4 : '0 12px 12px 12px',
                            margin: isMobile ? '0 16px 10px' : 0,
                            borderLeft: isMobile ? '2px solid ' + COLORS.gold : 'none',
                            padding: isMobile ? '5px 0' : '8px 0',
                            animation: isMobile ? 'none' : 'dropdownFadeSide 0.25s ease-out forwards',
                            transformOrigin: 'left top'
                          }}>
                            {l1.sub.map(l2 => (
                              <div key={l2.label}
                                style={{ position: 'relative' }}
                                onMouseEnter={() => !isMobile && setOpenL3(l2.label)}
                                onMouseLeave={() => !isMobile && setOpenL3(null)}
                              >
                                <div className="nav-dropdown-item"
                                  onClick={e => { if (isMobile && l2.sub) { e.stopPropagation(); toggleL3(l2.label) } }}
                                  style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: isMobile ? '12px 16px' : '6px 16px',
                                    minHeight: isMobile ? '44px' : 'auto',
                                    borderBottom: isMobile ? 'none' : '1px solid rgba(15, 35, 71, 0.03)',
                                    cursor: isMobile && l2.sub ? 'pointer' : 'default',
                                  }}
                                >
                                  <Link to={getRoute(l2.href)} className="nav-hover-link dropdown-link-text"
                                    style={{ fontSize: 12.5, fontWeight: 600, color: '#444', display: 'block', width: '100%', textDecoration: 'none' }}>
                                    {l2.label}
                                  </Link>
                                  {l2.sub && <span style={{ fontSize: 11, color: COLORS.gold, marginLeft: 8 }}>{isMobile ? (openL3 === l2.label ? '▴' : '▾') : '▶'}</span>}
                                </div>

                                {/* ── L3 Dropdown ── */}
                                {l2.sub && openL3 === l2.label && (
                                  <div className="nav-dropdown-panel" style={{
                                    position: isMobile ? 'static' : 'absolute',
                                    top: 0, left: '100%',
                                    
                                    background: isMobile ? '#fff' : 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: isMobile ? 'none' : 'blur(20px)',
                                    WebkitBackdropFilter: isMobile ? 'none' : 'blur(20px)',
                                    border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.6)',
                                    
                                    minWidth: isMobile ? '100%' : 210,
                                    boxShadow: isMobile ? 'none' : '5px 5px 25px rgba(0,0,0,.12)',
                                    borderTop: isMobile ? 'none' : '3px solid ' + COLORS.navy,
                                    borderRadius: isMobile ? 4 : '0 12px 12px 12px',
                                    margin: isMobile ? '0 16px 10px' : 0,
                                    borderLeft: isMobile ? '2px solid ' + COLORS.navy : 'none',
                                    padding: isMobile ? '5px 0' : '8px 0',
                                    animation: isMobile ? 'none' : 'dropdownFadeSide 0.25s ease-out forwards',
                                    transformOrigin: 'left top'
                                  }}>
                                    {l2.sub.map(l3 => (
                                      <Link key={l3.label} to={getRoute(l3.href)} className="nav-hover-link nav-dropdown-item dropdown-link-text"
                                        style={{
                                          display: 'block', padding: '6px 16px',
                                          fontSize: 12, color: '#555',
                                          borderBottom: isMobile ? 'none' : '1px solid rgba(15, 35, 71, 0.03)',
                                          textDecoration: 'none',
                                        }}
                                      >
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

            {/* Admin Button */}
            <button
              onClick={onAdminClick}
              aria-label="Open Admin Panel"
              style={{
                flexShrink: 0,
                background: COLORS.gold, color: '#000',
                border: 'none', padding: '10px 20px',
                borderRadius: 8, cursor: 'pointer',
                fontSize: 12.5, fontWeight: 800,
                marginLeft: isMobile ? 0 : 10,
                marginTop: isMobile ? 12 : 0,
                width: isMobile ? '100%' : 'auto',
                minHeight: '44px',
                boxShadow: '0 4px 15px rgba(244,160,35,0.3)',
                whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '6px',
                transition: 'transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s ease',
                letterSpacing: '0.3px',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(244,160,35,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(244,160,35,0.3)' }}
            >
              <span style={{ fontSize: 16 }}>⚙️</span> Admin Login
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}