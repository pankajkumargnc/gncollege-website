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
