// src/components/Navbar.jsx
// ✅ Ultra Premium Fully Responsive — 360px to 2560px
// ✅ Smooth hamburger animation, fluid logo, proper dropdowns
// ✅ Mobile breakpoint: 1024px (was 1250px — too high)
// ✅ Touch targets 44px+, no horizontal scroll

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { COLORS } from '../styles/colors'

export default function Navbar({ onAdminClick, navLinks }) {
  const [openL1, setOpenL1]   = useState(null)
  const [openL2, setOpenL2]   = useState(null)
  const [openL3, setOpenL3]   = useState(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const closeTimer = useRef(null)
  const menuRef    = useRef(null)

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) { setMenuOpen(false); setOpenL1(null); setOpenL2(null); setOpenL3(null) }
    }
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('resize', onResize); window.removeEventListener('scroll', onScroll) }
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = (isMobile && menuOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobile, menuOpen])

  const toggleL1 = label => { setOpenL1(p => p === label ? null : label); setOpenL2(null); setOpenL3(null) }
  const toggleL2 = label => { setOpenL2(p => p === label ? null : label); setOpenL3(null) }
  const toggleL3 = label => setOpenL3(p => p === label ? null : label)

  const getRoute = href => {
    if (!href) return '#'
    if (href.startsWith('/#')) return href.substring(2)
    return href
  }

  const closeAll = () => { setMenuOpen(false); setOpenL1(null); setOpenL2(null); setOpenL3(null) }

  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes coinSpin {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes shineText {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dropFade {
          from { opacity: 0; transform: translateY(6px) scaleY(.97); }
          to   { opacity: 1; transform: translateY(0) scaleY(1); }
        }

        /* ── Logo ── */
        .gnc-logo-img {
          animation: coinSpin 6s linear infinite;
          transform-style: preserve-3d;
        }
        .gnc-logo-wrap:hover .gnc-logo-img { animation-play-state: paused; }

        /* ── Title shimmer ── */
        .gnc-title {
          background: linear-gradient(90deg, ${COLORS.navy} 0%, #1e3a8a 30%, #d4af37 50%, #1e3a8a 70%, ${COLORS.navy} 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shineText 5s linear infinite;
        }

        /* ── Navbar base ── */
        .gnc-nav {
          position: sticky; top: 0; z-index: 99999; width: 100%;
          transition: background .3s ease, box-shadow .3s ease;
        }
        .gnc-nav-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 clamp(12px, 2vw, 24px);
          display: flex; align-items: center;
          justify-content: space-between;
          gap: clamp(8px, 1.5vw, 20px);
          min-height: clamp(60px, 8vw, 80px);
        }

        /* ── Logo link ── */
        .gnc-logo-link {
          display: flex; align-items: center; text-decoration: none;
          gap: clamp(8px, 1.2vw, 14px);
          flex-shrink: 1; min-width: 0; padding: 6px 0;
        }
        .gnc-logo-wrap {
          flex-shrink: 0;
          width: clamp(42px, 5.5vw, 72px);
          height: clamp(42px, 5.5vw, 72px);
        }
        .gnc-logo-img { width: 100%; height: 100%; object-fit: contain; }

        .gnc-divider {
          border-left: 2.5px solid ${COLORS.gold};
          border-radius: 2px;
          display: flex; flex-direction: column;
          justify-content: center;
          padding-left: clamp(8px, 1.2vw, 14px);
          overflow: hidden; min-width: 0;
        }
        .gnc-title {
          margin: 0 0 3px;
          font-size: clamp(11px, 1.4vw, 20px);
          font-weight: 900; font-family: Georgia, serif;
          white-space: nowrap; letter-spacing: clamp(0px, .12vw, 2px);
          line-height: 1.15; overflow: hidden; text-overflow: ellipsis;
        }
        .gnc-subtitle {
          margin: 0; font-size: clamp(8px, .75vw, 11px);
          color: #475569; font-weight: 700;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          line-height: 1.3;
        }
        .gnc-tagline {
          margin: 0;
          font-size: clamp(7.5px, .7vw, 10.5px);
          color: ${COLORS.gold}; font-weight: 800;
          letter-spacing: clamp(.2px, .14vw, 1.8px);
          text-transform: uppercase; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }

        /* ── Hamburger ── */
        .gnc-burger {
          display: none; flex-direction: column; justify-content: center;
          gap: 5px; background: none; border: none; cursor: pointer;
          padding: 10px; flex-shrink: 0; border-radius: 8px;
          min-width: 44px; min-height: 44px; align-items: center;
          transition: background .2s;
        }
        .gnc-burger:hover { background: rgba(15,35,71,.06); }
        .gnc-burger span {
          display: block; width: 22px; height: 2px;
          background: ${COLORS.navy}; border-radius: 2px;
          transition: transform .3s ease, opacity .3s ease, width .3s ease;
          transform-origin: center;
        }
        .gnc-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .gnc-burger.open span:nth-child(2) { opacity: 0; width: 0; }
        .gnc-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Desktop nav items ── */
        .gnc-nav-items {
          display: flex; align-items: center;
          gap: 0; flex-shrink: 0;
        }

        .gnc-l1 {
          position: relative;
        }
        .gnc-l1-row {
          display: flex; align-items: center;
          cursor: default;
        }
        .gnc-l1-link {
          color: ${COLORS.navy}; padding: clamp(18px,2.8vw,26px) clamp(8px,1vw,12px);
          display: block; font-size: clamp(12px, .9vw, 13.5px);
          font-weight: 700; white-space: nowrap; text-decoration: none;
          transition: color .2s; position: relative;
        }
        .gnc-l1-link::after {
          content: ''; position: absolute; bottom: 10px; left: 50%; right: 50%;
          height: 2px; background: ${COLORS.gold};
          transition: left .2s, right .2s;
        }
        .gnc-l1:hover .gnc-l1-link::after,
        .gnc-l1-link:hover::after { left: 10%; right: 10%; }
        .gnc-l1-link:hover { color: ${COLORS.gold}; }
        .gnc-chevron {
          font-size: 10px; color: ${COLORS.navy};
          margin-right: 6px; margin-top: 1px;
          transition: transform .2s; pointer-events: none;
        }
        .gnc-l1:hover .gnc-chevron { transform: rotate(180deg); }

        /* ── Dropdown L1 ── */
        .gnc-drop1 {
          position: absolute; top: 100%; left: 0;
          background: #fff; min-width: 240px;
          box-shadow: 0 16px 40px rgba(0,0,0,.14);
          border-top: 3px solid ${COLORS.navy};
          border-radius: 0 0 10px 10px;
          z-index: 300; padding: 6px 0;
          animation: dropFade .22s ease both;
        }

        .gnc-l2-row {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          border-bottom: 1px solid #f8f9fa;
          transition: background .15s; cursor: default;
        }
        .gnc-l2-row:hover { background: #f4f7ff; }
        .gnc-l2-row:last-child { border-bottom: none; }
        .gnc-l2-link {
          font-size: 13px; font-weight: 600; color: ${COLORS.navy};
          text-decoration: none; flex: 1; display: block;
          min-height: 24px; line-height: 24px;
        }
        .gnc-l2-link:hover { color: ${COLORS.gold}; }
        .gnc-arrow { font-size: 11px; color: ${COLORS.gold}; flex-shrink: 0; }

        /* ── Dropdown L2 ── */
        .gnc-drop2 {
          position: absolute; top: -3px; left: 100%;
          background: #fff; min-width: 240px;
          box-shadow: 6px 6px 24px rgba(0,0,0,.12);
          border-top: 3px solid ${COLORS.gold};
          border-radius: 0 10px 10px 10px;
          z-index: 400; padding: 6px 0;
          animation: dropFade .2s ease both;
        }

        .gnc-l3-row {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid #f8f9fa;
          transition: background .15s; cursor: default;
        }
        .gnc-l3-row:hover { background: #f4f7ff; }
        .gnc-l3-row:last-child { border-bottom: none; }
        .gnc-l3-link {
          font-size: 12.5px; font-weight: 600; color: #444;
          text-decoration: none; flex: 1; display: block;
          min-height: 22px; line-height: 22px;
        }
        .gnc-l3-link:hover { color: ${COLORS.gold}; }

        /* ── Dropdown L3 ── */
        .gnc-drop3 {
          position: absolute; top: -3px; left: 100%;
          background: #fff; min-width: 240px;
          box-shadow: 6px 6px 24px rgba(0,0,0,.12);
          border-top: 3px solid ${COLORS.navy};
          border-radius: 0 10px 10px 10px;
          z-index: 500; padding: 6px 0;
          animation: dropFade .2s ease both;
        }
        .gnc-l4-link {
          display: block; padding: 10px 16px;
          font-size: 12px; color: #555; font-weight: 600;
          text-decoration: none;
          border-bottom: 1px solid #f8f9fa;
          transition: background .15s, color .15s;
          min-height: 44px; display: flex; align-items: center;
        }
        .gnc-l4-link:last-child { border-bottom: none; }
        .gnc-l4-link:hover { background: #f4f7ff; color: ${COLORS.gold}; }

        /* ── Admin btn ── */
        .gnc-admin-btn {
          flex-shrink: 0; background: ${COLORS.gold}; color: #000;
          border: none; padding: 8px 16px; border-radius: 7px;
          cursor: pointer; font-size: clamp(11px,.85vw,13px); font-weight: 800;
          margin-left: clamp(6px,.8vw,12px);
          box-shadow: 0 4px 14px rgba(244,160,35,.3);
          white-space: nowrap; display: flex; align-items: center;
          gap: 5px; transition: transform .2s, box-shadow .2s;
          min-height: 36px;
        }
        .gnc-admin-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(244,160,35,.45); }

        /* ═══════════════════════════════
           MOBILE MENU
        ═══════════════════════════════ */
        @media (max-width: 1023px) {
          .gnc-burger { display: flex; }
          .gnc-nav-items {
            display: flex; flex-direction: column; align-items: stretch;
            position: absolute; top: 100%; left: 0; right: 0;
            background: rgba(255,255,255,.99);
            backdrop-filter: blur(16px);
            border-top: 2px solid ${COLORS.gold};
            box-shadow: 0 16px 40px rgba(0,0,0,.18);
            padding: 8px 0 20px;
            max-height: calc(100vh - 70px);
            overflow-y: auto; overflow-x: hidden;
            z-index: 250;
            animation: menuSlide .25s ease both;
            -webkit-overflow-scrolling: touch;
          }
          .gnc-nav-items.closed { display: none; }

          /* L1 mobile */
          .gnc-l1 { width: 100%; }
          .gnc-l1-row { flex-wrap: wrap; }
          .gnc-l1-link {
            padding: 14px 20px; font-size: 14px; flex: 1;
            border-bottom: 1px solid #f1f5f9;
          }
          .gnc-l1-link::after { display: none; }
          .gnc-l1-toggle {
            padding: 14px 20px; color: ${COLORS.navy};
            font-size: 18px; cursor: pointer; border: none;
            background: none; min-width: 44px; min-height: 44px;
            display: flex; align-items: center; justify-content: center;
            border-bottom: 1px solid #f1f5f9;
            transition: transform .2s;
          }
          .gnc-l1-toggle.open { transform: rotate(180deg); }
          .gnc-chevron { display: none; }

          /* Dropdowns mobile = static */
          .gnc-drop1 {
            position: static; box-shadow: none; border-top: none;
            border-radius: 0; padding: 0; animation: none;
            background: #f8fafc;
            border-left: 3px solid ${COLORS.navy};
            margin: 0 0 0 20px;
          }
          .gnc-l2-row {
            padding: 12px 16px; border-bottom: 1px solid #eef2f7;
          }
          .gnc-l2-link { font-size: 13px; }

          .gnc-drop2 {
            position: static; box-shadow: none; border-top: none;
            border-radius: 0; padding: 0; animation: none;
            background: #f0f4ff;
            border-left: 3px solid ${COLORS.gold};
            margin: 0 0 0 16px;
          }
          .gnc-l3-row { padding: 11px 14px; }
          .gnc-l3-link { font-size: 12.5px; }

          .gnc-drop3 {
            position: static; box-shadow: none; border-top: none;
            border-radius: 0; padding: 0; animation: none;
            background: #eef2ff;
            border-left: 3px solid ${COLORS.navy}55;
            margin: 0 0 0 16px;
          }
          .gnc-l4-link { padding: 10px 14px; font-size: 12px; min-height: 40px; }

          .gnc-admin-btn {
            margin: 14px 20px 0; width: calc(100% - 40px);
            justify-content: center; font-size: 13px;
            padding: 12px; min-height: 44px;
          }

          /* Subtitle hide on very small */
          .gnc-subtitle-hide { display: none; }
        }

        /* Very small phones */
        @media (max-width: 380px) {
          .gnc-title { font-size: 10.5px; letter-spacing: 0; }
          .gnc-tagline { font-size: 7px; }
          .gnc-logo-wrap { width: 38px; height: 38px; }
        }

        /* Tablet fixes — prevent dropdown overflow */
        @media (min-width: 1024px) and (max-width: 1280px) {
          .gnc-l1-link { padding: 20px 8px; font-size: 12px; }
          .gnc-drop1 { min-width: 210px; }
          .gnc-drop2, .gnc-drop3 { min-width: 210px; }
          /* Flip dropdowns that are near right edge */
          .gnc-l1:nth-last-child(-n+3) .gnc-drop1 { left: auto; right: 0; }
          .gnc-l1:nth-last-child(-n+3) .gnc-drop2 { left: auto; right: 100%; }
        }
      `}</style>

      <nav ref={menuRef} className="gnc-nav" style={{
        background: isScrolled ? 'rgba(255,255,255,.98)' : '#ffffff',
        boxShadow: isScrolled ? '0 8px 28px rgba(0,0,0,.12)' : '0 2px 12px rgba(0,0,0,.05)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      }}>
        <div className="gnc-nav-inner">

          {/* ── LOGO ── */}
          <Link to="/" className="gnc-logo-link" onClick={closeAll}>
            <div className="gnc-logo-wrap gnc-logo-wrap">
              <img
                className="gnc-logo-img"
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Guru Nanak College Logo"
              />
            </div>
            <div className="gnc-divider">
              <h1 className="gnc-title">GURU NANAK COLLEGE, DHANBAD</h1>
              <p className="gnc-subtitle gnc-subtitle-hide">
                A Sikh Minority Degree College — Gurudwara Prabhandhak Committee
              </p>
              <p className="gnc-tagline">
                {window.innerWidth < 480
                  ? 'Est. 1970 · Dhanbad'
                  : 'Affiliated to Binod Bihari Mahto Koyalanchal University, Dhanbad'}
              </p>
            </div>
          </Link>

          {/* ── HAMBURGER ── */}
          {isMobile && (
            <button
              className={`gnc-burger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          )}

          {/* ── NAV ITEMS ── */}
          <div className={`gnc-nav-items${isMobile && !menuOpen ? ' closed' : ''}`}>

            {(navLinks || []).map(l0 => (
              <div
                key={l0.label}
                className="gnc-l1"
                onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); if (!isMobile) setOpenL1(l0.label) }}
                onMouseLeave={() => { if (!isMobile) closeTimer.current = setTimeout(() => { setOpenL1(null); setOpenL2(null); setOpenL3(null) }, 180) }}
              >
                <div className="gnc-l1-row">
                  <Link
                    to={getRoute(l0.href)}
                    className="gnc-l1-link"
                    onClick={() => { if (!l0.sub) closeAll(); if (l0.label === 'Home') window.scrollTo(0, 0) }}
                  >
                    {l0.label === 'Home' ? '🏠 ' : ''}{l0.label}
                  </Link>
                  {l0.sub && !isMobile && <span className="gnc-chevron">▾</span>}
                  {l0.sub && isMobile && (
                    <button
                      className={`gnc-l1-toggle${openL1 === l0.label ? ' open' : ''}`}
                      onClick={() => toggleL1(l0.label)}
                      aria-label={`Toggle ${l0.label} submenu`}
                    >▾</button>
                  )}
                </div>

                {/* L1 Dropdown */}
                {l0.sub && openL1 === l0.label && (
                  <div className="gnc-drop1">
                    {l0.sub.map(l1 => (
                      <div
                        key={l1.label}
                        className="gnc-l2-row"
                        style={{ position: 'relative' }}
                        onMouseEnter={() => { if (!isMobile) setOpenL2(l1.label) }}
                        onMouseLeave={() => { if (!isMobile) setOpenL2(null) }}
                      >
                        <Link
                          to={getRoute(l1.href)}
                          className="gnc-l2-link"
                          onClick={() => { if (!l1.sub) closeAll() }}
                        >{l1.label}</Link>
                        {l1.sub && !isMobile && <span className="gnc-arrow">▶</span>}
                        {l1.sub && isMobile && (
                          <button
                            onClick={e => { e.stopPropagation(); toggleL2(l1.label) }}
                            style={{ background:'none', border:'none', cursor:'pointer', padding:'8px', color: COLORS.gold, fontSize:16, minWidth:44, minHeight:44 }}
                          >{openL2 === l1.label ? '▴' : '▾'}</button>
                        )}

                        {/* L2 Dropdown */}
                        {l1.sub && openL2 === l1.label && (
                          <div className="gnc-drop2">
                            {l1.sub.map(l2 => (
                              <div
                                key={l2.label}
                                className="gnc-l3-row"
                                style={{ position: 'relative' }}
                                onMouseEnter={() => { if (!isMobile) setOpenL3(l2.label) }}
                                onMouseLeave={() => { if (!isMobile) setOpenL3(null) }}
                              >
                                <Link
                                  to={getRoute(l2.href)}
                                  className="gnc-l3-link"
                                  onClick={() => { if (!l2.sub) closeAll() }}
                                >{l2.label}</Link>
                                {l2.sub && !isMobile && <span className="gnc-arrow">▶</span>}
                                {l2.sub && isMobile && (
                                  <button
                                    onClick={e => { e.stopPropagation(); toggleL3(l2.label) }}
                                    style={{ background:'none', border:'none', cursor:'pointer', padding:'8px', color: COLORS.gold, fontSize:14, minWidth:44, minHeight:44 }}
                                  >{openL3 === l2.label ? '▴' : '▾'}</button>
                                )}

                                {/* L3 Dropdown */}
                                {l2.sub && openL3 === l2.label && (
                                  <div className="gnc-drop3">
                                    {l2.sub.map(l3 => (
                                      <Link
                                        key={l3.label}
                                        to={getRoute(l3.href)}
                                        className="gnc-l4-link"
                                        onClick={closeAll}
                                      >{l3.label}</Link>
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
              className="gnc-admin-btn"
              onClick={() => { closeAll(); onAdminClick?.() }}
            >
              <span style={{ fontSize: 15 }}>⚙️</span> Admin
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}