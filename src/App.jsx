// src/App.jsx — REFACTORED VERSION
import React, { useMemo, useState, useEffect, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ── Components ──
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopBar from "./components/home/TopBar";
import Breadcrumbs from "./components/Breadcrumbs";
import QuickActionNav from "./components/QuickActionNav";
import AppRoutes from "./components/AppRoutes";
import Ticker from "./components/Ticker";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";
import UniversalSearch from "./components/UniversalSearch";
import AlertBanner from "./components/AlertBanner";
import FloatingQRButton from "./components/FloatingQRButton";

const AIChatbot = lazy(() => import("./components/AIChatbot"));

// ── Data & Styles ──
import { navLinks as staticNavLinks } from "./data/db";
import { updateSEO } from "./utils/seoManager";
import { trackPageView } from "./utils/analytics";
import useDarkMode from "./hooks/useDarkMode";
import useAppData from "./hooks/useAppData";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") || window.location.hash.startsWith("#/admin");
  
  // ── Custom Hooks ──
  const { isDark, toggle: toggleDark } = useDarkMode();
  const data = useAppData();
  const { 
    updates, notices, announcements, events, gallery, 
    faculties, testimonials, sliderSlides, navLinks, siteSettings 
  } = data;

  // ── Network Status & Notifications ──
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // ✅ PWA: Request Notification Permission safely
    if (typeof window !== 'undefined' && "Notification" in window && Notification.permission === "default") {
      try {
        Notification.requestPermission().catch(() => {});
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ── 🌐 Real-Time SEO Title & Meta Description Sync ──
  useEffect(() => {
    if (siteSettings?.metaTitle && !isAdminRoute) {
      document.title = siteSettings.metaTitle;
    }
    if (siteSettings?.metaDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', siteSettings.metaDescription);
    }
  }, [siteSettings?.metaTitle, siteSettings?.metaDescription, isAdminRoute]);

  // ── 🎨 Dynamic Universal Theme, Typography & Background Synchronization ──
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // 1. Hero Mode & Image
    const isMesh = siteSettings?.heroBgMode === 'mesh' || siteSettings?.heroBgUrl === 'none' || siteSettings?.heroBgUrl === '';
    if (isMesh) {
      root.setAttribute('data-hero-mode', 'mesh');
      root.style.setProperty('--hero-mode', 'mesh');
      root.style.removeProperty('--hero-bg-url');
    } else {
      root.removeAttribute('data-hero-mode');
      root.style.setProperty('--hero-mode', 'image');
      const bgUrl = siteSettings?.heroBgUrl || '/images/college_hero_bg.webp';
      root.style.setProperty('--hero-bg-url', `url("${bgUrl}")`);
    }

    if (siteSettings?.heroOverlayGradient) {
      root.style.setProperty('--hero-overlay-gradient', siteSettings.heroOverlayGradient);
    } else {
      root.style.removeProperty('--hero-overlay-gradient');
    }

    if (siteSettings?.heroBgPosition) {
      root.style.setProperty('--hero-bg-position', siteSettings.heroBgPosition);
    } else {
      root.style.removeProperty('--hero-bg-position');
    }

    if (siteSettings?.heroKenBurns === false) {
      root.style.setProperty('--hero-kenburns-animation', 'none');
    } else {
      root.style.removeProperty('--hero-kenburns-animation');
    }

    // 2. Global Typography (Body & Headings)
    if (siteSettings?.fontFamily) {
      root.style.setProperty('--font-sans', siteSettings.fontFamily);
    } else {
      root.style.removeProperty('--font-sans');
    }

    if (siteSettings?.headingFont) {
      root.style.setProperty('--font-heading', siteSettings.headingFont);
    } else {
      root.style.removeProperty('--font-heading');
    }

    // 3. Color Combinations & Master Theme
    if (siteSettings?.themePrimary) {
      root.style.setProperty('--navy', siteSettings.themePrimary);
    } else {
      root.style.removeProperty('--navy');
    }

    if (siteSettings?.themeAccent) {
      root.style.setProperty('--gold', siteSettings.themeAccent);
    } else {
      root.style.removeProperty('--gold');
    }

    if (siteSettings?.themeBg) {
      root.style.setProperty('--bg', siteSettings.themeBg);
    } else {
      root.style.removeProperty('--bg');
    }

    if (siteSettings?.themeSurface) {
      root.style.setProperty('--surface', siteSettings.themeSurface);
    } else {
      root.style.removeProperty('--surface');
    }

    // 4. Two-Tone Heading Engine (Image Style: Primary Solid Color + Accent Solid Word)
    const headingMode = siteSettings?.headingMode || 'two-tone';
    root.setAttribute('data-heading-mode', headingMode);
    root.style.setProperty('--hero-heading-primary', siteSettings?.heroHeadingStart || '#ffffff');
    root.style.setProperty('--hero-heading-accent', siteSettings?.heroHeadingEnd || '#f4a023');
    root.style.setProperty('--heading-primary', siteSettings?.headingPrimaryColor || siteSettings?.themePrimary || '#0f2347');
    root.style.setProperty('--heading-accent', siteSettings?.headingAccentColor || siteSettings?.themeAccent || '#f4a023');
    
    const hGrad = siteSettings?.heroHeadingGradient || 
      `linear-gradient(${siteSettings?.heroHeadingAngle || '135deg'}, ${siteSettings?.heroHeadingStart || '#ffffff'} 35%, ${siteSettings?.heroHeadingEnd || '#f4a023'} 100%)`;
    root.style.setProperty('--hero-heading-gradient', hGrad);
    root.style.setProperty('--hero-heading-shadow', siteSettings?.heroHeadingShadow || '0 4px 18px rgba(0,0,0,0.45)');

    // 5. Hero Background Visual Effects & Blur
    if (siteSettings?.heroVisualEffect && siteSettings.heroVisualEffect !== 'none') {
      root.setAttribute('data-hero-effect', siteSettings.heroVisualEffect);
    } else {
      root.removeAttribute('data-hero-effect');
    }

    // 6. Deep Global Styling Engine (Body metrics, headings, bullets, alignment)
    if (siteSettings?.bodyLineHeight) {
      root.style.setProperty('--body-line-height', siteSettings.bodyLineHeight);
    } else {
      root.style.removeProperty('--body-line-height');
    }

    if (siteSettings?.bodyLetterSpacing) {
      root.style.setProperty('--body-letter-spacing', siteSettings.bodyLetterSpacing);
    } else {
      root.style.removeProperty('--body-letter-spacing');
    }

    if (siteSettings?.bodyFontWeight) {
      root.style.setProperty('--body-weight', siteSettings.bodyFontWeight);
    } else {
      root.style.removeProperty('--body-weight');
    }

    if (siteSettings?.headingTransform) {
      root.style.setProperty('--heading-transform', siteSettings.headingTransform);
    } else {
      root.style.removeProperty('--heading-transform');
    }

    if (siteSettings?.textAlignDefault) {
      root.style.setProperty('--text-align-default', siteSettings.textAlignDefault);
    } else {
      root.style.removeProperty('--text-align-default');
    }

    if (siteSettings?.bulletStyle && siteSettings.bulletStyle !== 'default') {
      root.setAttribute('data-bullets', siteSettings.bulletStyle);
    } else {
      root.removeAttribute('data-bullets');
    }

    if (siteSettings?.textColorPrimary) {
      root.style.setProperty('--text-primary', siteSettings.textColorPrimary);
    } else {
      root.style.removeProperty('--text-primary');
    }

    if (siteSettings?.themeSecondary) {
      root.style.setProperty('--theme-secondary', siteSettings.themeSecondary);
    } else {
      root.style.removeProperty('--theme-secondary');
    }

    // 7. Animated Theme Gradients
    if (siteSettings?.enableAnimatedGradients) {
      root.setAttribute('data-animated-theme', 'true');
    } else {
      root.removeAttribute('data-animated-theme');
    }

    // 8. Global Motion & Animation Speed
    if (siteSettings?.motionSpeed === 'off') {
      root.setAttribute('data-motion', 'off');
      root.style.setProperty('--motion-factor', '0');
    } else if (siteSettings?.motionSpeed === 'smooth') {
      root.removeAttribute('data-motion');
      root.style.setProperty('--motion-factor', '1.5');
    } else {
      root.removeAttribute('data-motion');
      root.style.setProperty('--motion-factor', '1');
    }
  }, [
    siteSettings?.heroBgMode, siteSettings?.heroBgUrl, siteSettings?.heroOverlayGradient,
    siteSettings?.heroBgPosition, siteSettings?.heroKenBurns, siteSettings?.heroVisualEffect,
    siteSettings?.fontFamily, siteSettings?.headingFont, siteSettings?.themePrimary,
    siteSettings?.themeAccent, siteSettings?.themeSecondary, siteSettings?.themeBg,
    siteSettings?.themeSurface, siteSettings?.enableAnimatedGradients, siteSettings?.motionSpeed,
    siteSettings?.enableDualHeading, siteSettings?.heroHeadingGradient, siteSettings?.heroHeadingStart,
    siteSettings?.heroHeadingEnd, siteSettings?.heroHeadingAngle, siteSettings?.heroHeadingShadow,
    siteSettings?.bodyLineHeight, siteSettings?.bodyLetterSpacing, siteSettings?.bodyFontWeight,
    siteSettings?.headingTransform, siteSettings?.textAlignDefault, siteSettings?.bulletStyle,
    siteSettings?.textColorPrimary
  ]);

  // ✅ PWA: New Notice Push Simulator (Students only)
  useEffect(() => {
    try {
      if (isAdminRoute || !notices?.length || !("Notification" in window) || Notification.permission !== "granted") return;
      
      const newest = notices[0];
      if (newest && newest.isNew) {
        const lastNotified = localStorage.getItem('gnc_last_notified');
        if (lastNotified !== newest.id) {
          const title = "📢 New College Notice";
          const options = {
            body: newest.text?.substring(0, 100) || 'New update published',
            icon: `${import.meta.env.BASE_URL}images/logo.webp`
          };

          // On mobile Android / Chrome, new Notification() throws Illegal Constructor.
          // We MUST use ServiceWorkerRegistration.showNotification() or catch the error.
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(reg => {
              reg.showNotification(title, options);
            }).catch(() => {
              try { new Notification(title, options); } catch (e) {}
            });
          } else {
            try { new Notification(title, options); } catch (e) {}
          }
          localStorage.setItem('gnc_last_notified', newest.id);
        }
      }
    } catch (err) {
      console.warn('Push notification safe-fail:', err);
    }
  }, [notices, isAdminRoute]);

  // ── 🔥 STRENGTHENED ADMIN AUTH ──────────────────────────────────────────
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let unsub;
    import('firebase/auth').then(({ onAuthStateChanged }) => {
      import('./firebase-auth').then(({ auth, isUserAuthorizedAdmin }) => {
        unsub = onAuthStateChanged(auth, (user) => {
          const isAuthed = !!user && isUserAuthorizedAdmin(user);
          setAdminAuthed(isAuthed);
          setIsInitializing(false);
        });
      });
    }).catch(err => {
      console.error("Auth sync error", err);
      setAdminAuthed(false);
      setIsInitializing(false);
    });
    return () => unsub && unsub();
  }, []);

  const handleAdminLogin = () => {
    setAdminAuthed(true);
  };
  const handleAdminLogout = () => {
    sessionStorage.removeItem('gnc_admin_auth');
    sessionStorage.removeItem('gnc_active_session');
    sessionStorage.removeItem('gnc_admin_role');
    import('./firebase-auth').then(({ auth, logoutAdmin }) => {
      if (typeof logoutAdmin === 'function') logoutAdmin();
      else auth.signOut();
    });
    setAdminAuthed(false);
  };


  // ── ⌨️ GLOBAL KEYBOARD SHORTCUTS ──
  useEffect(() => {
    const handleKeys = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, []);

  // ── SEO & Analytics ──
  useEffect(() => {
    updateSEO(location.pathname);
    
    // ✅ Real analytics — deduplicated, no PII, device-aware
    const cleanup = trackPageView(location.pathname);
    return cleanup;
  }, [location.pathname]);

  // ── Derived Data ──
  const counterData = useMemo(() => [
    { label: "Students Enrolled", value: "4,000+", icon: "👨‍🎓", raw: 4000 },
    { label: "Successful Alumni", value: "45,000+", icon: "🎓", raw: 45000 },
    { label: "Expert Faculty", value: `${faculties.length}+`, icon: "👨‍🏫", raw: faculties.length },
    { label: "Years of Legacy", value: `${new Date().getFullYear() - 1970}`, icon: "🏛️", raw: new Date().getFullYear() - 1970 },
  ], [faculties.length]);

  // 🚀 SMART DEEP MERGE & HARDCODE INJECTION
  const baseNavLinks = useMemo(() => {
    let combinedLinks = [...staticNavLinks];

    // 1. Menu Builder Merging
    if (navLinks && navLinks.length > 0) {
      navLinks.forEach((dynamicLink) => {
        const existingIndex = combinedLinks.findIndex(
          (staticLink) =>
            staticLink.label.trim().toLowerCase() ===
            dynamicLink.label.trim().toLowerCase(),
        );

        if (existingIndex >= 0) {
          const existingSub = combinedLinks[existingIndex].sub || [];
          const dynamicSub = dynamicLink.sub || [];

          let mergedSub = [...existingSub];

          dynamicSub.forEach((dSub) => {
            const subIdx = mergedSub.findIndex(
              (eSub) =>
                eSub.label.trim().toLowerCase() ===
                dSub.label.trim().toLowerCase(),
            );
            if (subIdx >= 0) {
              const eL3 = mergedSub[subIdx].sub || [];
              const dL3 = dSub.sub || [];
              let mergedL3 = [...eL3];

              dL3.forEach((dItem) => {
                const l3Idx = mergedL3.findIndex(
                  (eItem) =>
                    eItem.label.trim().toLowerCase() ===
                    dItem.label.trim().toLowerCase(),
                );
                if (l3Idx >= 0) mergedL3[l3Idx] = dItem;
                else mergedL3.push(dItem);
              });

              mergedSub[subIdx] = { ...dSub, sub: mergedL3 };
            } else {
              mergedSub.push(dSub);
            }
          });
          combinedLinks[existingIndex] = { ...dynamicLink, sub: mergedSub };
        } else {
          combinedLinks.splice(combinedLinks.length - 1, 0, dynamicLink);
        }
      });
    }

    // 2. 🚀 HARDCODE GOVERNING BODY & STAFF COUNCIL INTO "ABOUT US"
    const aboutIdx = combinedLinks.findIndex(
      (l) => l.label.toLowerCase() === "about us",
    );
    if (aboutIdx >= 0) {
      let aboutSub = combinedLinks[aboutIdx].sub || [];

      // Ensure "College Management" Category exists
      let mgmtIdx = aboutSub.findIndex(
        (s) => s.label.toLowerCase() === "college management",
      );
      if (mgmtIdx === -1) {
        aboutSub.push({ label: "College Management", sub: [] });
        mgmtIdx = aboutSub.length - 1;
      }

      let mgmtSub = aboutSub[mgmtIdx].sub || [];

      // Inject missing submenus automatically
      if (!mgmtSub.some((s) => s.label.toLowerCase() === "governing body")) {
        mgmtSub.push({
          label: "Governing Body",
          href: "/about-us/governing-body",
        });
      }
      if (!mgmtSub.some((s) => s.label.toLowerCase() === "staff council")) {
        mgmtSub.push({
          label: "Staff Council",
          href: "/about-us/staff-council",
        });
      }

      aboutSub[mgmtIdx].sub = mgmtSub;
      combinedLinks[aboutIdx].sub = aboutSub;
    }

    // 3. Keep Gallery Fallback
    return combinedLinks.map((link) =>
      link.label === "Gallery" && (!link.sub || link.sub.length === 0)
        ? {
            ...link,
            href: "/gallery",
          }
        : link,
    );
  }, [navLinks]);

  if (isInitializing) {
    return (
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f7f9', zIndex: 999999 }}>
        <div style={{ textAlign: 'center' }}>
          <img src={import.meta.env.BASE_URL + 'images/logo.webp'} alt="GNC" width="40" style={{ animation: 'pulse 1.5s infinite ease-in-out' }} />
          <style>{`@keyframes pulse { 0%, 100% { opacity: 0.5; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.05); } }`}</style>
        </div>
      </div>
    );
  }

  if (siteSettings?.maintenanceMode && !isAdminRoute) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #070d1e, #0f2347, #020617)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        padding: 24,
        textAlign: 'center',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: '#ffffff', padding: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          marginBottom: 20
        }}>
          <img src="images/logo.webp" alt="GNC Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ fontSize: 12, fontWeight: 900, color: '#f59e0b', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 6 }}>
          Guru Nanak College, Dhanbad
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 5vw, 32px)', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.5px' }}>
          System Under Scheduled Maintenance
        </h1>
        <p style={{ maxWidth: 560, fontSize: 14, color: '#94a3b8', lineHeight: 1.7, margin: '0 auto 24px' }}>
          {siteSettings.maintenanceMessage || 'Guru Nanak College online services are currently undergoing scheduled optimization. All portals will resume operation shortly.'}
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#0f2347',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 10,
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer'
            }}
          >
            Check Status (Refresh)
          </button>
          <a 
            href="#/admin" 
            style={{
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '12px 20px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            Staff & Admin Login →
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="bottom-right" containerStyle={{ zIndex: 9999999 }} />
      <Suspense fallback={null}>
        <UniversalSearch 
          isOpen={searchOpen} 
          onClose={() => setSearchOpen(false)} 
          notices={notices}
          faculties={faculties}
          gallery={gallery}
        />
      </Suspense>
      
      {!isAdminRoute && (
        <div style={{ position: 'relative', zIndex: 1000 }}>
          {/* 🚨 Real-Time Emergency Flash Broadcast Ribbon */}
          {siteSettings?.emergencyBroadcastEnabled && siteSettings?.emergencyBroadcastText && (
            <div style={{
              background: siteSettings.emergencyBroadcastType === 'critical' ? 'linear-gradient(90deg, #991b1b, #dc2626, #b91c1c)' :
                          siteSettings.emergencyBroadcastType === 'gold' ? 'linear-gradient(90deg, #b45309, #d97706, #f59e0b)' :
                          'linear-gradient(90deg, #0f2347, #1e3a8a)',
              color: '#ffffff',
              padding: '8px 16px',
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
              position: 'relative',
              zIndex: 10001
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', animation: 'pulse 1.2s infinite' }} />
                {siteSettings.emergencyBroadcastText}
              </span>
              {siteSettings.emergencyBroadcastLink && (
                <a 
                  href={siteSettings.emergencyBroadcastLink} 
                  style={{ 
                    color: '#ffffff', 
                    background: 'rgba(255,255,255,0.22)', 
                    padding: '2px 10px', 
                    borderRadius: 6, 
                    fontSize: '11px', 
                    fontWeight: 800,
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.4)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {siteSettings.emergencyBroadcastLinkText || 'View Details →'}
                </a>
              )}
            </div>
          )}

          <AlertBanner />
          <TopBar isDark={isDark} onToggleDark={toggleDark} siteSettings={siteSettings} />
          <Suspense fallback={null}>
            <Ticker items={notices} />
          </Suspense>
          <Navbar navLinks={baseNavLinks} />
          <Breadcrumbs />
          <QuickActionNav />
        </div>
      )}

      <main id="main-content" tabIndex="-1" style={{ minHeight: '80vh', background: isDark ? '#060e1c' : '#f4f7f9', outline: 'none' }}>
        <AppRoutes 
          {...data} 
          counterData={counterData}
          adminAuthed={adminAuthed} 
          handleAdminLogin={handleAdminLogin} 
          handleAdminLogout={handleAdminLogout} 
        />
      </main>

      {!isAdminRoute && (
        <>
          <Footer dynamicSocialLinks={baseNavLinks} />
          <Suspense fallback={null}>
            {siteSettings?.enableFloatingQR !== false && <FloatingQRButton />}
            <WhatsAppButton />
            <AIChatbot />
            <BackToTop />
          </Suspense>
        </>
      )}
    </>
  );
}
