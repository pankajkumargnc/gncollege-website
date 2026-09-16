import React, { useState, useEffect, useRef, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { COLORS } from '../styles/colors'

const SPOTLIGHT_CARDS = {
  'About Us': {
    badge: 'SIKH MINORITY INSTITUTION',
    title: 'Heritage & 1970 Roots',
    desc: 'Empowering coalfield youth for 56 years with UGC 2(f) & 12(B) status, NCMEI minority recognition, and constitutional autonomy.',
    link: '/about-us/sikh-heritage',
    btnText: 'Sikh Heritage Hub →',
    icon: '☬'
  },
  'Academics': {
    badge: 'NEP-2020 & BBMKU',
    title: 'Curriculum & Degrees',
    desc: 'BA, B.Sc, B.Com honors degrees, premier BCA vocational IT wing, and updated university CBCS syllabi.',
    link: '/academics/departments',
    btnText: 'Explore Departments →',
    icon: '✦'
  },
  'Admission': {
    badge: 'SESSION 2026–27',
    title: 'Admissions & Quotas',
    desc: 'Direct registration via Chancellor Portal. 50% Sikh Minority Quota reservations & fee concession assistance.',
    link: '/admission/rule',
    btnText: 'Admission Rules →',
    icon: '✦'
  },
  'Admissions': {
    badge: 'SESSION 2026–27',
    title: 'Admissions & Quotas',
    desc: 'Direct registration via Chancellor Portal. 50% Sikh Minority Quota reservations & fee concession assistance.',
    link: '/admission/rule',
    btnText: 'Admission Rules →',
    icon: '✦'
  },
  'Campus': {
    badge: 'DUAL CAMPUS WINGS',
    title: 'Bhuda & Bank More',
    desc: 'Main Boys Wing at Bhuda & Vocational Girls Wing at Bank More with hi-tech science and computer labs.',
    link: '/campus/infrastructure',
    btnText: 'Campus Tour →',
    icon: '✦'
  },
  'NAAC': {
    badge: 'QUALITY BENCHMARK',
    title: 'NAAC Cycles & SSR',
    desc: 'Complete transparency in institutional reporting: SSR Cycle 1 & 2, AQAR, NIRF, and IQAC perspective plan.',
    link: '/naac/aqar',
    btnText: 'View AQAR Reports →',
    icon: '✦'
  },
  'Activity': {
    badge: 'CHARACTER & SERVICE',
    title: 'NSS, NCC & Sports',
    desc: 'Active student volunteer units delivering blood donation camps, disaster relief, and university sports champions.',
    link: '/activity/nss',
    btnText: 'NSS Activities →',
    icon: '✦'
  },
  'Publication': {
    badge: 'RESEARCH & MEDIA',
    title: 'Journals & Student Media',
    desc: 'Annual college e-magazines, semester examination results, digital library resources, and Student Satisfaction Surveys.',
    link: '/publication/e-magazine',
    btnText: 'Read E-Magazine →',
    icon: '✦'
  },
  'Gallery': {
    badge: 'CAMPUS LIFE ARCHIVE',
    title: 'Life at Guru Nanak',
    desc: 'High-definition photo archives and video coverage of Youth Festivals, Sports Meets, Prakash Purab, and Convocation.',
    link: '/gallery/photos',
    btnText: 'Browse Gallery →',
    icon: '✦'
  }
};

const Navbar = memo(function Navbar({ onAdminClick, navLinks }) {
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

  // ── Active route detection ──
  const location = useLocation()
  const currentPath = location.pathname

  // ✅ Auto-close menu on real navigation (ignores hash-only changes like '#')
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
      // We keep dropdown states for a smoother feel, 
      // they'll reset when the user opens the menu again if needed,
      // or we can reset them here if pathname definitively changed.
      setOpenL1(null);
      setOpenL2(null);
      setOpenL3(null);
    }
  }, [location.pathname, location.search]);

  // ── Body scroll lock when mobile menu is open ──
  useEffect(() => {
    if (isMobile && menuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isMobile, menuOpen])

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

  const isItemActive = (item) => {
    const route = getRoute(item.href);
    
    // Explicit match for Home or other paths
    if (route === currentPath && currentPath !== '#') {
      // Prevent parent categories with empty or '/' hrefs from lighting up on the Home route
      if (currentPath === '/' && item.label !== 'Home' && item.sub) {
        // Skip
      } else {
        return true;
      }
    }

    if (item.sub) {
      return item.sub.some(sub1 => {
        if (getRoute(sub1.href) === currentPath && currentPath !== '#') return true;
        if (sub1.sub) {
          return sub1.sub.some(sub2 => getRoute(sub2.href) === currentPath && currentPath !== '#');
        }
        return false;
      });
    }
    return false;
  };

  const renderBadge = (badge, badgeColor) => {
    if (!badge) return null;
    const colorMap = {
      gold: { bg: 'rgba(244, 160, 35, 0.18)', text: '#f4a023', border: 'rgba(244, 160, 35, 0.4)' },
      green: { bg: 'rgba(16, 185, 129, 0.18)', text: '#10b981', border: 'rgba(16, 185, 129, 0.4)' },
      red: { bg: 'rgba(239, 68, 68, 0.18)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.4)' },
      blue: { bg: 'rgba(59, 130, 246, 0.18)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.4)' },
      purple: { bg: 'rgba(168, 85, 247, 0.18)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.4)' }
    };
    const c = colorMap[badgeColor] || colorMap.gold;
    return (
      <span style={{
        fontSize: '9px',
        fontWeight: 800,
        letterSpacing: '0.4px',
        textTransform: 'uppercase',
        padding: '1px 5px',
        borderRadius: '4px',
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        marginLeft: '6px',
        whiteSpace: 'nowrap',
        lineHeight: '1.2',
        display: 'inline-block',
        verticalAlign: 'middle'
      }}>
        {badge}
      </span>
    );
  };

  return (
    <>
      {/* Spacer to prevent content jump when navbar becomes fixed */}
      {isScrolled && <div style={{ height: isMobile ? '65px' : '95px', width: '100%' }} />}
      
      <nav className={`glass-navbar${isScrolled ? ' scrolled' : ''}`} style={{
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
          : (isScrolled ? '0 8px 40px rgba(15,35,71,0.12), 0 2px 8px rgba(244,160,35,0.05)' : '0 4px 15px rgba(0,0,0,0.05)'),
        backdropFilter: isScrolled ? 'blur(24px) saturate(200%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(200%)' : 'none',
        borderBottom: isDark ? '1px solid rgba(244,160,35,0.15)' : (isScrolled ? '1px solid rgba(255,255,255,0.5)' : 'none'),
        transition: 'all 0.4s ease-in-out',
        width: '100%'
      }}>

        <style>{`
          /* ═══════════════════════════════════════════════════ */
          /* ██  PREMIUM NAVBAR — GOLDEN AURA EDITION        ██ */
          /* ═══════════════════════════════════════════════════ */

          /* ── Logo: Endless Spin with Golden Glow Aura ── */
          @keyframes coinSpin {
            0%   { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          @keyframes logoAuraBreath {
            0%, 100% { box-shadow: 0 0 12px rgba(244,160,35,0.15), 0 0 25px rgba(244,160,35,0.05); }
            50%      { box-shadow: 0 0 20px rgba(244,160,35,0.35), 0 0 40px rgba(244,160,35,0.12); }
          }
          .spinning-logo {
            animation: coinSpin 6s linear infinite;
            transform-style: preserve-3d;
            filter: drop-shadow(0 2px 8px rgba(244,160,35,0.2));
            transition: filter 0.4s ease;
          }
          .logo-box-container {
            border-radius: 50%;
            animation: logoAuraBreath 4s ease-in-out infinite;
            transition: all 0.4s ease;
          }
          .logo-box-container:hover {
            box-shadow: 0 0 25px rgba(244,160,35,0.45), 0 0 50px rgba(244,160,35,0.15) !important;
          }
          .logo-box-container:hover .spinning-logo {
            animation-play-state: paused;
            filter: drop-shadow(0 4px 15px rgba(244,160,35,0.4));
          }

          /* ── Title: Rich Gold-Pearl Shimmer Sweep ── */
          @keyframes premiumShineText {
            0%   { background-position: -100% 50%; }
            100% { background-position: 200% 50%; }
          }
          .shimmering-title {
            background: linear-gradient(
              90deg, 
              ${COLORS.navy} 0%, 
              #1e3a8a 20%, 
              #d4af37 40%,
              #f5e6c8 50%, 
              #d4af37 60%, 
              #1e3a8a 80%, 
              ${COLORS.navy} 100%
            );
            background-size: 250% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: premiumShineText 6s linear infinite;
          }
          [data-theme="dark"] .shimmering-title {
            background: linear-gradient(
              90deg, 
              #e2e8f0 0%, 
              #94a3b8 20%, 
              #fbbf24 40%,
              #fff7ed 50%, 
              #fbbf24 60%, 
              #94a3b8 80%, 
              #e2e8f0 100%
            );
            background-size: 250% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
          }

          /* ── Golden Accent Divider ── */
          .clean-divider {
            border-left: 2.5px solid ${COLORS.gold};
            border-radius: 2px;
            border-image: linear-gradient(to bottom, ${COLORS.gold}, #d97706, ${COLORS.gold}) 1;
          }

          /* ── Nav Links: Underline Grow from Center ── */
          .nav-hover-link {
            transition: color 0.25s ease, transform 0.25s cubic-bezier(.22,1,.36,1);
            position: relative;
          }
          .nav-hover-link::after {
            content: '';
            position: absolute;
            bottom: 6px; left: 50%;
            width: 0; height: 2px;
            background: linear-gradient(90deg, ${COLORS.gold}, #fbbf24);
            border-radius: 2px;
            transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: translateX(-50%);
            box-shadow: 0 1px 6px rgba(244,160,35,0.3);
          }
          .nav-hover-link:hover::after {
            width: 80%;
          }
          .nav-hover-link:hover {
            color: ${COLORS.gold} !important;
          }

          /* ── Active Link: Golden Dot Indicator ── */
          .nav-link-active {
            position: relative;
          }
          .nav-link-active::before {
            content: '';
            position: absolute;
            bottom: 2px; left: 50%;
            transform: translateX(-50%);
            width: 5px; height: 5px;
            border-radius: 50%;
            background: ${COLORS.gold};
            box-shadow: 0 0 8px rgba(244,160,35,0.6), 0 0 15px rgba(244,160,35,0.2);
          }

          /* ── Scroll State: Animated Gold Bottom Border ── */
          .glass-navbar::after {
            content: '';
            position: absolute;
            bottom: 0; left: 50%;
            width: 0; height: 2px;
            background: linear-gradient(90deg, transparent, ${COLORS.gold}, #fbbf24, ${COLORS.gold}, transparent);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: translateX(-50%);
          }
          .glass-navbar.scrolled::after {
            width: 100%;
            box-shadow: 0 2px 12px rgba(244,160,35,0.2);
          }

          /* ── Dropdown Animations ── */
          @keyframes dropdownFadeDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes dropdownFadeSide {
            from { opacity: 0; transform: translateX(-10px); }
            to { opacity: 1; transform: translateX(0); }
          }

          /* ── Mega-Menu Styles (preserved) ── */
          .nav-dropdown-item {
            transition: background 0.2s ease;
          }
          .nav-dropdown-item:hover {
            background: rgba(15,35,71,0.03);
          }
          [data-theme="dark"] .nav-dropdown-item:hover {
            background: rgba(255,255,255,0.04);
          }
          .mega-sub-link {
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            border-radius: 6px;
          }
          .mega-sub-link:hover {
            background: rgba(244,160,35,0.12) !important;
            color: ${COLORS.gold} !important;
            transform: translateX(4px);
          }
          [data-theme="dark"] .mega-sub-link:hover {
            background: rgba(244,160,35,0.18) !important;
            color: #fbbf24 !important;
          }
          @keyframes dropdownMegaPop {
            0% {
              opacity: 0;
              transform: translate(-50%, -8px) scale(0.985);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, 0) scale(1);
            }
          }
          .mega-menu-container::-webkit-scrollbar {
            width: 5px;
          }
          .mega-menu-container::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.03);
            border-radius: 4px;
          }
          .mega-menu-container::-webkit-scrollbar-thumb {
            background: rgba(244, 160, 35, 0.4);
            border-radius: 4px;
          }
          .mega-menu-container::-webkit-scrollbar-thumb:hover {
            background: rgba(244, 160, 35, 0.7);
          }

          /* ── Reduced Motion ── */
          @media (prefers-reduced-motion: reduce) {
            .spinning-logo { transition: none !important; }
            .logo-box-container { animation: none !important; }
            .shimmering-title { animation: none !important; }
            .nav-hover-link::after { transition: none !important; }
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
          gap: isMobile ? '8px' : '20px'
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
              <div className="shimmering-title" style={{
                margin: '0 0 5px 0',
                // ✅ FLUID TYPE HERE FOR EXTREME RESPONSIVENESS
                fontSize: isMobile ? 'clamp(11px, 3.5vw, 14px)' : 'clamp(15px, 1.6vw, 21.5px)',
                fontWeight: '900',
                fontFamily: "'Plus Jakarta Sans', Georgia, serif",
                whiteSpace: 'nowrap',
                letterSpacing: isMobile ? '0px' : 'clamp(1.5px, 0.35vw, 6.9px)',
                textAlign: 'left',
                lineHeight: '1.1',
              }}>
                GURU NANAK COLLEGE, DHANBAD
              </div>

              {!isMobile && (
                <p style={{
                  margin: '0 0 3px 0',
                  fontSize: '11px',
                  color: isDark ? '#94a3b8' : '#475569',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                }}>
                  A Sikh Minority Degree College Established &amp; Managed by Gurudwara Prabandhak Committee, Dhanbad.
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
            gap: isMobile ? 10 : 'clamp(6px, 0.75vw, 14px)',
            boxShadow: isMobile && menuOpen ? '0 10px 20px rgba(0,0,0,.15)' : 'none',
            maxHeight: isMobile ? '80vh' : 'auto',
            overflowY: isMobile ? 'auto' : 'visible',
            flex: isMobile ? 'unset' : 1,
            justifyContent: isMobile ? 'flex-start' : 'flex-end',
            marginLeft: isMobile ? '0' : 'auto',
            marginRight: isMobile ? '0' : '10px',
            borderTop: isMobile && menuOpen ? '1px solid #eee' : 'none',
            zIndex: 250,
            flexWrap: 'nowrap'
          }}>
            {(navLinks || []).map((l0, l0Index) => {
              const isMega = !isMobile && (SPOTLIGHT_CARDS[l0.label] || l0.sub?.some(item => item.sub && item.sub.length > 0));
              const isRightAligned = l0.label === 'More' || l0Index >= (navLinks.length - 2);

              return (
                <div key={l0.label}
                  style={{ position: isMobile ? 'relative' : (isMega ? 'static' : 'relative'), width: isMobile ? '100%' : 'auto' }}
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
                    onClick={() => { if (l0.label === 'Home') window.scrollTo(0, 0) }}
                    className={`nav-hover-link${isItemActive(l0) ? ' nav-link-active' : ''}`}
                    style={{
                      color: isItemActive(l0) ? COLORS.gold : (isDark ? '#e2e8f0' : COLORS.navy),
                      padding: isMobile ? '14px 0' : '12px 6px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 'clamp(12px, 1vw, 14.5px)', 
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                      width: '100%',
                      minHeight: '44px',
                      lineHeight: isMobile ? '16px' : 'normal',
                      transition: 'color 0.2s',
                    }}>
                    {l0.label === 'Home' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '5px'}}>
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    )}
                    {l0.label}
                  </Link>
                  {isMobile  && l0.sub && <span style={{ color: isItemActive(l0) ? COLORS.gold : (isDark ? '#94a3b8' : COLORS.navy), fontSize: 20 }}>{openL1 === l0.label ? '▴' : '▾'}</span>}
                  {!isMobile && l0.sub && <span style={{ color: isItemActive(l0) ? COLORS.gold : (isDark ? '#94a3b8' : COLORS.navy), fontSize: 13, marginLeft: 4, marginTop: 2 }}>▾</span>}
                </div>

                {/* ── L1 Dropdown or Mega-Menu ── */}
                {l0.sub && openL1 === l0.label && (() => {
                  const isMega = !isMobile && (SPOTLIGHT_CARDS[l0.label] || l0.sub.some(item => item.sub && item.sub.length > 0));
                  const spotlight = SPOTLIGHT_CARDS[l0.label];

                  if (isMega) {
                    const isAboutUs = l0.label === 'About Us';
                    const directLinks = l0.sub.filter(item => !item.sub || item.sub.length === 0);
                    const groupSections = l0.sub.filter(item => item.sub && item.sub.length > 0);

                    // Perfectly calibrated container width based on menu complexity
                    const megaWidth = isAboutUs
                      ? 'min(1180px, 96vw)'
                      : (groupSections.length <= 1 ? 'min(640px, 94vw)' : 'min(980px, 95vw)');

                    return (
                      <div className="nav-dropdown-panel mega-menu-container" style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: isDark ? 'rgba(8, 16, 32, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(25px)',
                        WebkitBackdropFilter: 'blur(25px)',
                        border: isDark ? '1px solid rgba(244,160,35,0.25)' : '1px solid rgba(15,35,71,0.08)',
                        borderTop: `3px solid ${COLORS.gold}`,
                        boxShadow: isDark
                          ? '0 25px 60px rgba(0,0,0,0.85), 0 0 0 1px rgba(244,160,35,0.2)'
                          : '0 25px 60px rgba(11,31,78,0.18), 0 0 0 1px rgba(11,31,78,0.06)',
                        borderRadius: '0 0 16px 16px',
                        zIndex: 300,
                        padding: '22px 26px',
                        width: megaWidth,
                        maxHeight: 'calc(100vh - 120px)',
                        overflowY: 'auto',
                        animation: 'dropdownMegaPop 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        display: 'flex',
                        gap: '22px',
                        boxSizing: 'border-box'
                      }}>
                        {/* ── About Us Dedicated 4-Column Balanced Grid ── */}
                        {isAboutUs ? (
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '18px',
                            flex: 1,
                            minWidth: 0
                          }}>
                            {/* Col 1: Overview & Sikh Heritage */}
                            <div style={{ minWidth: 0 }}>
                              <div style={{
                                fontSize: '11px', fontWeight: 800, letterSpacing: '0.6px',
                                textTransform: 'uppercase', color: COLORS.gold, marginBottom: '10px',
                                paddingBottom: '5px', borderBottom: '1.5px solid rgba(244,160,35,0.3)',
                                display: 'flex', alignItems: 'center', gap: '5px'
                              }}>
                                <span>☬ Overview & Heritage</span>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {/* Sikh Heritage Highlight Link */}
                                <Link
                                  to="/about-us/sikh-heritage"
                                  className="mega-sub-link"
                                  onClick={() => { setOpenL1(null); setOpenL2(null); setOpenL3(null); }}
                                  style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '7px 9px', borderRadius: '7px', fontSize: '12px', fontWeight: 700,
                                    background: isDark ? 'rgba(244,160,35,0.18)' : 'rgba(244,160,35,0.12)',
                                    border: '1px solid rgba(244,160,35,0.4)', color: COLORS.gold,
                                    textDecoration: 'none', marginBottom: '3px'
                                  }}
                                >
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span>☬</span>
                                    <span>Sikh Heritage Hub</span>
                                  </span>
                                  <span style={{
                                    fontSize: '9px', padding: '1px 5px', borderRadius: '4px',
                                    background: COLORS.gold, color: '#060e1c', fontWeight: 800
                                  }}>
                                    DIVINE
                                  </span>
                                </Link>
                                {directLinks.filter(l => l.label !== 'Sikh Heritage').map(link => (
                                  <Link
                                    key={link.label}
                                    to={getRoute(link.href)}
                                    className="mega-sub-link"
                                    onClick={() => { setOpenL1(null); setOpenL2(null); setOpenL3(null); }}
                                    style={{
                                      display: 'flex', alignItems: 'center', gap: '7px',
                                      padding: '6px 8px', borderRadius: '6px', fontSize: '12px',
                                      fontWeight: 600, color: isDark ? '#e2e8f0' : COLORS.navy,
                                      textDecoration: 'none'
                                    }}
                                  >
                                    <span style={{ color: COLORS.gold, fontSize: '10px' }}>▸</span>
                                    <span>{link.label}</span>
                                    {renderBadge(link.badge, link.badgeColor)}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Col 2: Leadership & Staff */}
                            <div style={{ minWidth: 0 }}>
                              <div style={{
                                fontSize: '11px', fontWeight: 800, letterSpacing: '0.6px',
                                textTransform: 'uppercase', color: COLORS.gold, marginBottom: '10px',
                                paddingBottom: '5px', borderBottom: '1.5px solid rgba(244,160,35,0.3)',
                                display: 'flex', alignItems: 'center', gap: '5px'
                              }}>
                                <span>🏛️ Governance & Staff</span>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                {groupSections.filter(g => g.label === 'College Management' || g.label === 'College Staff').flatMap(g => g.sub).map(item => (
                                  <Link
                                    key={item.label}
                                    to={getRoute(item.href)}
                                    className="mega-sub-link"
                                    onClick={() => { setOpenL1(null); setOpenL2(null); setOpenL3(null); }}
                                    style={{
                                      display: 'flex', alignItems: 'center', gap: '7px',
                                      padding: '5px 8px', borderRadius: '6px', fontSize: '12px',
                                      fontWeight: 500, color: isDark ? '#e2e8f0' : '#1e293b',
                                      textDecoration: 'none'
                                    }}
                                  >
                                    <span style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '8px' }}>•</span>
                                    <span>{item.label}</span>
                                    {renderBadge(item.badge, item.badgeColor)}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Col 3: Statutory Committees */}
                            <div style={{ minWidth: 0 }}>
                              <div style={{
                                fontSize: '11px', fontWeight: 800, letterSpacing: '0.6px',
                                textTransform: 'uppercase', color: COLORS.gold, marginBottom: '10px',
                                paddingBottom: '5px', borderBottom: '1.5px solid rgba(244,160,35,0.3)',
                                display: 'flex', alignItems: 'center', gap: '5px'
                              }}>
                                <span>Statutory Committees</span>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {(groupSections.find(g => g.label === 'Various Committees')?.sub || []).map(item => (
                                  <Link
                                    key={item.label}
                                    to={getRoute(item.href)}
                                    className="mega-sub-link"
                                    onClick={() => { setOpenL1(null); setOpenL2(null); setOpenL3(null); }}
                                    style={{
                                      display: 'flex', alignItems: 'center', gap: '6px',
                                      padding: '4px 6px', borderRadius: '5px', fontSize: '11.5px',
                                      fontWeight: 500, color: isDark ? '#cbd5e1' : '#334155',
                                      textDecoration: 'none'
                                    }}
                                  >
                                    <span style={{ color: COLORS.gold, fontSize: '8px' }}>•</span>
                                    <span>{item.label}</span>
                                    {renderBadge(item.badge, item.badgeColor)}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Col 4: University Regulations */}
                            <div style={{ minWidth: 0 }}>
                              <div style={{
                                fontSize: '11px', fontWeight: 800, letterSpacing: '0.6px',
                                textTransform: 'uppercase', color: COLORS.gold, marginBottom: '10px',
                                paddingBottom: '5px', borderBottom: '1.5px solid rgba(244,160,35,0.3)',
                                display: 'flex', alignItems: 'center', gap: '5px'
                              }}>
                                <span>Regulations & Affiliation</span>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                {(groupSections.find(g => g.label === 'Regulations')?.sub || []).map(item => (
                                  <React.Fragment key={item.label}>
                                    {item.sub ? (
                                      <div style={{ marginTop: '3px', marginBottom: '2px' }}>
                                        <div style={{
                                          fontSize: '10.5px', fontWeight: 700,
                                          color: isDark ? '#94a3b8' : '#475569',
                                          padding: '1px 6px', display: 'flex', alignItems: 'center', gap: '4px'
                                        }}>
                                          <span style={{ color: COLORS.gold, fontSize: '8px' }}>▾</span>
                                          <span>{item.label}</span>
                                        </div>
                                        <div style={{
                                          paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '2px',
                                          borderLeft: `1.5px solid ${isDark ? 'rgba(244,160,35,0.2)' : 'rgba(11,31,78,0.1)'}`,
                                          marginLeft: '8px', marginTop: '2px'
                                        }}>
                                          {item.sub.map(l3 => (
                                            <Link
                                              key={l3.label}
                                              to={getRoute(l3.href)}
                                              className="mega-sub-link"
                                              onClick={() => { setOpenL1(null); setOpenL2(null); setOpenL3(null); }}
                                              style={{
                                                display: 'block', padding: '3px 6px', borderRadius: '4px',
                                                fontSize: '11px', color: isDark ? '#cbd5e1' : '#334155',
                                                textDecoration: 'none'
                                              }}
                                            >
                                              {l3.label}
                                              {renderBadge(l3.badge, l3.badgeColor)}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <Link
                                        to={getRoute(item.href)}
                                        className="mega-sub-link"
                                        onClick={() => { setOpenL1(null); setOpenL2(null); setOpenL3(null); }}
                                        style={{
                                          display: 'flex', alignItems: 'center', gap: '6px',
                                          padding: '4px 6px', borderRadius: '5px', fontSize: '11.5px',
                                          fontWeight: 500, color: isDark ? '#cbd5e1' : '#334155',
                                          textDecoration: 'none'
                                        }}
                                      >
                                        <span style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '8px' }}>•</span>
                                        <span>{item.label}</span>
                                        {renderBadge(item.badge, item.badgeColor)}
                                      </Link>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* ── Other Sections Multi-Column Grid ── */
                          <div style={{
                            display: 'flex',
                            gap: '20px',
                            flex: 1,
                            minWidth: 0
                          }}>
                            {/* Direct Links Column */}
                            {directLinks.length > 0 && (
                              <div style={{ flex: 1, minWidth: 160 }}>
                                <div style={{
                                  fontSize: '11px', fontWeight: 800, letterSpacing: '0.6px',
                                  textTransform: 'uppercase', color: COLORS.gold, marginBottom: '10px',
                                  paddingBottom: '5px', borderBottom: '1.5px solid rgba(244,160,35,0.3)',
                                  display: 'flex', alignItems: 'center', gap: '6px'
                                }}>
                                  <span>Overview & Highlights</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                  {directLinks.map(link => (
                                    <Link
                                      key={link.label}
                                      to={getRoute(link.href)}
                                      className="mega-sub-link"
                                      onClick={() => { setOpenL1(null); setOpenL2(null); setOpenL3(null); }}
                                      style={{
                                        display: 'flex', alignItems: 'center', gap: '7px',
                                        padding: '6px 8px', borderRadius: '6px', fontSize: '12px',
                                        fontWeight: 600, color: isDark ? '#e2e8f0' : COLORS.navy,
                                        textDecoration: 'none'
                                      }}
                                    >
                                      <span style={{ color: COLORS.gold, fontSize: '10px' }}>▸</span>
                                      <span>{link.label}</span>
                                      {renderBadge(link.badge, link.badgeColor)}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Group Sections */}
                            {groupSections.map(grp => (
                              <div key={grp.label} style={{ flex: 1, minWidth: 165 }}>
                                <div style={{
                                  fontSize: '11px', fontWeight: 800, letterSpacing: '0.6px',
                                  textTransform: 'uppercase', color: COLORS.gold, marginBottom: '10px',
                                  paddingBottom: '5px', borderBottom: '1.5px solid rgba(244,160,35,0.3)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                }}>
                                  <span>{grp.label}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                  {grp.sub.map(subItem => (
                                    <React.Fragment key={subItem.label}>
                                      {subItem.sub && subItem.sub.length > 0 ? (
                                        <div style={{ marginTop: '4px', marginBottom: '4px' }}>
                                          <div style={{
                                            fontSize: '11px', fontWeight: 700,
                                            color: isDark ? '#94a3b8' : '#475569',
                                            padding: '2px 6px', display: 'flex', alignItems: 'center', gap: '5px'
                                          }}>
                                            <span style={{ color: COLORS.gold, fontSize: '8px' }}>▾</span>
                                            <span>{subItem.label}</span>
                                          </div>
                                          <div style={{
                                            paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '2px',
                                            borderLeft: `1.5px solid ${isDark ? 'rgba(244,160,35,0.2)' : 'rgba(11,31,78,0.1)'}`,
                                            marginLeft: '8px', marginTop: '2px'
                                          }}>
                                            {subItem.sub.map(l3 => (
                                              <Link
                                                key={l3.label}
                                                to={getRoute(l3.href)}
                                                className="mega-sub-link"
                                                onClick={() => { setOpenL1(null); setOpenL2(null); setOpenL3(null); }}
                                                style={{
                                                  display: 'block', padding: '3px 6px', borderRadius: '4px',
                                                  fontSize: '11px', color: isDark ? '#cbd5e1' : '#334155',
                                                  textDecoration: 'none'
                                                }}
                                              >
                                                {l3.label}
                                              </Link>
                                            ))}
                                          </div>
                                        </div>
                                      ) : (
                                        <Link
                                          to={getRoute(subItem.href)}
                                          className="mega-sub-link"
                                          onClick={() => { setOpenL1(null); setOpenL2(null); setOpenL3(null); }}
                                          style={{
                                            display: 'flex', alignItems: 'center', gap: '7px',
                                            padding: '5px 8px', borderRadius: '6px', fontSize: '12px',
                                            fontWeight: 500, color: isDark ? '#e2e8f0' : '#1e293b',
                                            textDecoration: 'none'
                                          }}
                                        >
                                          <span style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '8px' }}>•</span>
                                          <span>{subItem.label}</span>
                                          {renderBadge(subItem.badge, subItem.badgeColor)}
                                        </Link>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ── Spotlight Card Column ── */}
                        {spotlight && (
                          <div style={{
                            width: 235,
                            flexShrink: 0,
                            background: isDark
                              ? 'linear-gradient(145deg, #111d38 0%, #080f1e 100%)'
                              : 'linear-gradient(145deg, #0b1f4e 0%, #060e1c 100%)',
                            borderRadius: '12px',
                            padding: '18px',
                            color: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 8px 24px rgba(11,31,78,0.28)',
                            border: '1px solid rgba(244,160,35,0.3)'
                          }}>
                            <div style={{
                              position: 'absolute', right: '-10px', bottom: '-15px',
                              fontSize: '85px', opacity: 0.12, pointerEvents: 'none', userSelect: 'none'
                            }}>
                              {spotlight.icon || '☬'}
                            </div>
                            
                            <div>
                              <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '5px',
                                background: 'rgba(244,160,35,0.2)', color: '#f4a023',
                                padding: '2px 8px', borderRadius: '999px', fontSize: '9.5px',
                                fontWeight: 800, letterSpacing: '0.6px', textTransform: 'uppercase',
                                marginBottom: '8px'
                              }}>
                                {spotlight.badge}
                              </div>
                              <h4 style={{
                                margin: '0 0 6px 0', fontSize: '14px', fontWeight: 700,
                                color: '#ffffff', lineHeight: 1.3
                              }}>
                                {spotlight.title}
                              </h4>
                              <p style={{
                                margin: 0, fontSize: '11.5px', color: '#cbd5e1', lineHeight: 1.45
                              }}>
                                {spotlight.desc}
                              </p>
                            </div>

                            <Link
                              to={spotlight.link}
                              onClick={() => { setOpenL1(null); setOpenL2(null); setOpenL3(null); }}
                              style={{
                                marginTop: '14px', display: 'inline-flex', alignItems: 'center',
                                justifyContent: 'center', padding: '7px 12px',
                                background: 'linear-gradient(135deg, #f4a023, #d48b16)',
                                color: '#060e1c', fontWeight: 700, fontSize: '11.5px',
                                borderRadius: '7px', textDecoration: 'none',
                                boxShadow: '0 4px 12px rgba(244,160,35,0.35)',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(244,160,35,0.45)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(244,160,35,0.35)';
                              }}
                            >
                              {spotlight.btnText}
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // ── Mobile / Non-Mega Fallback Dropdown ──
                  return (
                    <div className="nav-dropdown-panel" style={{
                      position: isMobile ? 'static' : 'absolute',
                      top: '100%',
                      left: isMobile ? 0 : (isRightAligned ? 'auto' : 0),
                      right: isMobile ? 'auto' : (isRightAligned ? 0 : 'auto'),
                      background: isMobile ? '#fff' : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: isMobile ? 'none' : 'blur(20px)',
                      WebkitBackdropFilter: isMobile ? 'none' : 'blur(20px)',
                      border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.6)',
                      minWidth: isMobile ? '100%' : 220,
                      boxShadow: isMobile ? 'none' : '0 15px 35px rgba(0,0,0,.12)',
                      borderTop: isMobile ? 'none' : '3px solid ' + COLORS.navy,
                      borderRadius: isMobile ? 8 : (isRightAligned ? '12px 0 12px 12px' : '0 0 12px 12px'),
                      zIndex: 200, 
                      padding: isMobile ? '5px 0' : '8px 0',
                      animation: isMobile ? 'none' : 'dropdownFadeDown 0.25s ease-out forwards',
                      transformOrigin: isRightAligned ? 'top right' : 'top left'
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
                              style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: 'flex', alignItems: 'center', width: '100%', textDecoration: 'none' }}>
                              <span>{l1.label}</span>
                              {renderBadge(l1.badge, l1.badgeColor)}
                            </Link>
                            {l1.sub && <span style={{ fontSize: 12, color: COLORS.gold, marginLeft: 8 }}>{isMobile ? (openL2 === l1.label ? '▴' : '▾') : '▶'}</span>}
                          </div>

                          {/* ── L2 Dropdown ── */}
                          {l1.sub && openL2 === l1.label && (
                            <div className="nav-dropdown-panel" style={{
                              position: isMobile ? 'static' : 'absolute',
                              top: 0,
                              left: isMobile ? 'auto' : (isRightAligned ? 'auto' : '100%'),
                              right: isMobile ? 'auto' : (isRightAligned ? '100%' : 'auto'),
                              background: isMobile ? '#fff' : 'rgba(255, 255, 255, 0.95)',
                              backdropFilter: isMobile ? 'none' : 'blur(20px)',
                              WebkitBackdropFilter: isMobile ? 'none' : 'blur(20px)',
                              border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.6)',
                              minWidth: isMobile ? '100%' : 210,
                              boxShadow: isMobile ? 'none' : '5px 5px 25px rgba(0,0,0,.12)',
                              borderTop: isMobile ? 'none' : '3px solid ' + COLORS.gold,
                              borderRadius: isMobile ? 4 : (isRightAligned ? '12px 0 12px 12px' : '0 12px 12px 12px'),
                              margin: isMobile ? '0 16px 10px' : 0,
                              borderLeft: isMobile ? '2px solid ' + COLORS.gold : 'none',
                              padding: isMobile ? '5px 0' : '8px 0',
                              animation: isMobile ? 'none' : 'dropdownFadeSide 0.25s ease-out forwards',
                              transformOrigin: isRightAligned ? 'right top' : 'left top'
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
                                      style={{ fontSize: 12.5, fontWeight: 600, color: '#444', display: 'flex', alignItems: 'center', width: '100%', textDecoration: 'none' }}>
                                      <span>{l2.label}</span>
                                      {renderBadge(l2.badge, l2.badgeColor)}
                                    </Link>
                                    {l2.sub && <span style={{ fontSize: 11, color: COLORS.gold, marginLeft: 8 }}>{isMobile ? (openL3 === l2.label ? '▴' : '▾') : '▶'}</span>}
                                  </div>

                                  {/* ── L3 Dropdown ── */}
                                  {l2.sub && openL3 === l2.label && (
                                    <div className="nav-dropdown-panel" style={{
                                      position: isMobile ? 'static' : 'absolute',
                                      top: 0,
                                      left: isMobile ? 'auto' : (isRightAligned ? 'auto' : '100%'),
                                      right: isMobile ? 'auto' : (isRightAligned ? '100%' : 'auto'),
                                      background: isMobile ? '#fff' : 'rgba(255, 255, 255, 0.95)',
                                      backdropFilter: isMobile ? 'none' : 'blur(20px)',
                                      WebkitBackdropFilter: isMobile ? 'none' : 'blur(20px)',
                                      border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.6)',
                                      minWidth: isMobile ? '100%' : 210,
                                      boxShadow: isMobile ? 'none' : '5px 5px 25px rgba(0,0,0,.12)',
                                      borderTop: isMobile ? 'none' : '3px solid ' + COLORS.navy,
                                      borderRadius: isMobile ? 4 : (isRightAligned ? '12px 0 12px 12px' : '0 12px 12px 12px'),
                                      margin: isMobile ? '0 16px 10px' : 0,
                                      borderLeft: isMobile ? '2px solid ' + COLORS.navy : 'none',
                                      padding: isMobile ? '5px 0' : '8px 0',
                                      animation: isMobile ? 'none' : 'dropdownFadeSide 0.25s ease-out forwards',
                                      transformOrigin: isRightAligned ? 'right top' : 'left top'
                                    }}>
                                      {l2.sub.map(l3 => (
                                        <Link key={l3.label} to={getRoute(l3.href)} className="nav-hover-link nav-dropdown-item dropdown-link-text"
                                          style={{
                                            display: 'flex', alignItems: 'center', padding: '6px 16px',
                                            fontSize: 12, color: '#555',
                                            borderBottom: isMobile ? 'none' : '1px solid rgba(15, 35, 71, 0.03)',
                                            textDecoration: 'none',
                                          }}
                                        >
                                          <span>{l3.label}</span>
                                          {renderBadge(l3.badge, l3.badgeColor)}
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
                  );
                })()}
              </div>
            );
          })}

            {/* Admin Portal is now located in the Footer */}
          </div>
        </div>
      </nav>
    </>
  )
});

export default Navbar;