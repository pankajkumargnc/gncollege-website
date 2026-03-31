// src/App.jsx — REFACTORED VERSION
import React, { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ── Components ──
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";
import AIChatbot from "./components/AIChatbot";
import UniversalSearch from "./components/UniversalSearch";
import AlertBanner from "./components/AlertBanner";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopBar from "./components/home/TopBar";
import Breadcrumbs from "./components/Breadcrumbs";
import QuickActionNav from "./components/QuickActionNav";
import AppRoutes from "./components/AppRoutes";

// ── Data & Styles ──
import { navLinks as staticNavLinks } from "./data/db";
import { updateSEO } from "./utils/seoManager";
import useDarkMode from "./hooks/useDarkMode";
import useAppData from "./hooks/useAppData";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();
  
  // ── Custom Hooks ──
  const { isDark } = useDarkMode();
  const data = useAppData();
  const { 
    updates, notices, announcements, events, gallery, 
    faculties, testimonials, sliderSlides, navLinks 
  } = data;

  // ── Network Status ──
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ── 🔥 STRENGTHENED ADMIN AUTH ──────────────────────────────────────────
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let unsub;
    import('firebase/auth').then(({ onAuthStateChanged }) => {
      import('./firebase-auth').then(({ auth }) => {
        unsub = onAuthStateChanged(auth, (user) => {
          setAdminAuthed(!!user);
          setIsInitializing(false);
        });
      });
    }).catch(err => {
      console.error("Auth sync error", err);
      setIsInitializing(false);
    });
    return () => unsub && unsub();
  }, []);

  const handleAdminLogin = () => setAdminAuthed(true);
  const handleAdminLogout = () => {
    import('./firebase-auth').then(({ auth }) => auth.signOut());
    setAdminAuthed(false);
  };

  const isAdminRoute = location.pathname.startsWith("/admin") || window.location.hash.startsWith("#/admin");

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

  // ── SEO Manager ──
  useEffect(() => {
    updateSEO(location.pathname);
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
      <UniversalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      
      {!isAdminRoute && (
        <div style={{ position: 'relative', zIndex: 1000 }}>
          <AlertBanner />
          <TopBar />
          <Ticker items={notices} />
          <Navbar navLinks={baseNavLinks} />
          <Breadcrumbs />
          <QuickActionNav />
        </div>
      )}

      <main style={{ minHeight: '80vh', background: isDark ? '#060e1c' : '#f4f7f9' }}>
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
          <WhatsAppButton />
          <AIChatbot />
          <BackToTop />
        </>
      )}
    </>
  );
}
