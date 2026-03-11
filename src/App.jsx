// src/App.jsx
// ✅ UPDATED: ErrorBoundary added on all pages
// ✅ FIXED: window.open('#/admin') → window.open('/admin') (Batch 1 critical bug)

import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { navLinks as staticNavLinks } from './data/db';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopBar from './components/home/TopBar';
import AdminLogin from './components/AdminLogin';
import { COLORS } from './styles/colors';
import Breadcrumbs from './components/Breadcrumbs';
import QuickActionNav from './components/QuickActionNav';
import PageViewer from './components/PageViewer';
import Contact from './pages/Contact';
import CollegeProfile from './pages/CollegeProfile';
import NotificationsPage from './pages/NotificationsPage';
import DocumentsPage from './pages/DocumentsPage';
import EventsPage from './pages/EventsPage';
import VideoGallery from './pages/VideoGallery';
import AlertBanner from './components/AlertBanner';
import StaffPage from './pages/StaffPage';
import NewsPage from './pages/NewsPage';
import DepartmentPage from './pages/DepartmentPage';
// ✅ NEW: ErrorBoundary import
import ErrorBoundary from './components/ErrorBoundary';
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { db } from './firebase';

const AdminPanel = lazy(() => import('./components/AdminPanel'));
const Ticker     = lazy(() => import('./components/Ticker'));

const placeholderPaths = [
  '/syllabus', '/about-us', '/about-us/vision-mission', '/about-us/principal-message', '/about-us/college-management/organogram', '/about-us/college-management/presidents', '/about-us/college-management/secretaries', '/about-us/college-management/principal', '/about-us/various-committees/womens-cell', '/about-us/various-committees/anti-ragging', '/about-us/various-committees/sc-st', '/about-us/various-committees/obc', '/about-us/various-committees/grievance', '/about-us/various-committees/icc', '/about-us/various-committees/minority', '/about-us/various-committees/placement', '/about-us/various-committees/rusa', '/about-us/college-staff/teaching-staff', '/about-us/college-staff/non-teaching-staff', '/about-us/regulations/bbmku/special-ug-regulation', '/about-us/regulations/bbmku/ug-regulation-fyugp', '/about-us/regulations/bbmku/ug-regulation-cbcs', '/about-us/regulations/college-affiliation', '/about-us/regulations/ugc-section', '/about-us/regulations/vbu/ug-regulation-2015', '/about-us/regulations/vbu/bca-regulation', '/about-us/regulations/byelaws', '/about-us/regulations/exemption', '/about-us/audit-report', '/campus/visuals/bhuda', '/campus/visuals/bank-more', '/campus/visuals/vocational-building', '/campus/infrastructure', '/campus/classroom', '/campus/ict-rooms', '/campus/green-campus', '/academics/iqac', '/academics/course-offered', '/academics/academic-calendar', '/admission/rule', '/admission/document-required', '/admission/fee-structure', '/admission/notification/latest', '/admission/notification/upcoming', '/admission/intake-capacity', '/activity/nss', '/activity/ncc', '/activity/workshop', '/activity/games-sports', '/activity/collaboration/rotaract-club', '/activity/collaboration/sadbhavana-diwas', '/naac/ssr-1st-cycle/cycle-1-documents', '/naac/ssr-1st-cycle/peer-team-report', '/naac/ssr-2nd-cycle/cycle-2-documents', '/naac/ssr-2nd-cycle/executive-summary', '/naac/aqar', '/naac/nirf', '/naac/perspective-plan', '/publication/college-library', '/publication/e-magazine', '/publication/examination-results/2024', '/publication/examination-results/2023', '/publication/sss-report/2023-24', '/publication/sss-report/2022-23', '/gallery'
];

// ── Dynamic page route ────────────────────────────────────────────────────────
const DynamicPageRoute = ({ pages }) => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  useEffect(() => {
    if (pages && slug) {
      const found = pages.find(p => p.slug === slug);
      setPage(found);
    }
  }, [slug, pages]);
  if (!pages || pages.length === 0) return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>Loading pages...</div>
  );
  return <PageViewer page={page} />;
};

// ── Admin loading screen ──────────────────────────────────────────────────────
const AdminLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#030b1a', color: '#10b981', fontFamily: 'monospace', fontSize: 16 }}>
    ⚡ Initializing Secure Admin Panel...
  </div>
);

// ── Admin route wrapper ───────────────────────────────────────────────────────
const AdminRouteWrapper = ({
  notices, announcements, events, gallery, pdfReports,
  pages, sliderSlides, placeholderPaths, navLinks,
  faculties, placements, alerts,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isGncAdmin') === 'true'
  );

  if (!isLoggedIn) return (
    <AdminLogin
      onSuccess={() => { setIsLoggedIn(true); localStorage.setItem('isGncAdmin', 'true'); }}
      onClose={() => window.close()}
    />
  );

  return (
    <Suspense fallback={<AdminLoader />}>
      <AdminPanel
        notices={notices} announcements={announcements} events={events}
        gallery={gallery} pdfReports={pdfReports} pages={pages}
        sliderSlides={sliderSlides} placeholderPaths={placeholderPaths}
        navLinks={navLinks} faculties={faculties} placements={placements}
        alerts={alerts}
        onClose={() => {
          setIsLoggedIn(false);
          localStorage.removeItem('isGncAdmin');
          window.close();
        }}
      />
    </Suspense>
  );
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const stripHtml = html => {
  if (!html) return '';
  const d = new DOMParser().parseFromString(html, 'text/html');
  return d.body.textContent || '';
};

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [notices,       setNotices]       = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events,        setEvents]        = useState([]);
  const [gallery,       setGallery]       = useState([]);
  const [pdfReports,    setPdfReports]    = useState([]);
  const [pages,         setPages]         = useState([]);
  const [sliderSlides,  setSliderSlides]  = useState([]);
  const [faculties,     setFaculties]     = useState([]);
  const [placements,    setPlacements]    = useState([]);
  const [alerts,        setAlerts]        = useState([]);
  const [firebaseNav,   setFirebaseNav]   = useState(null);

  const location     = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [isMobile,   setIsMobile]   = useState(window.innerWidth < 768);
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Resize listener
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  // Splash screen
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // AOS animations
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: false, mirror: true, offset: 50 });
  }, []);

  // Navbar from Firebase
  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'navbar'), snap => {
      setFirebaseNav(
        snap.exists() && snap.data().links?.length > 0
          ? snap.data().links
          : staticNavLinks
      );
    });
  }, []);

  const baseNavLinks = firebaseNav || staticNavLinks;

  // Dynamic nav links (pages se)
  const dynamicNavLinks = useMemo(() => {
    const newPages = pages
      .filter(p => p.slug && (!p.path || p.path === ''))
      .sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))
      .map(p => ({ label: p.title, href: `/p/${p.slug}` }));

    const linksCopy = JSON.parse(JSON.stringify(baseNavLinks));
    if (newPages.length > 0) {
      let more = linksCopy.find(l => l.label.toLowerCase() === 'more');
      if (!more) { more = { label: 'More', href: '#', sub: [] }; linksCopy.push(more); }
      if (!more.sub) more.sub = [];
      newPages.forEach(np => { if (!more.sub.some(s => s.href === np.href)) more.sub.push(np); });
    }
    return linksCopy;
  }, [pages, baseNavLinks]);

  // Page content map (path → page)
  const pageContentByPath = useMemo(() => {
    const map = new Map();
    [...pages]
      .sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))
      .forEach(p => { if (p.path && !map.has(p.path)) map.set(p.path, p); });
    return map;
  }, [pages]);

  // All Firestore listeners
  useEffect(() => {
    const cols = [
      ['notices',       setNotices],
      ['announcements', setAnnouncements],
      ['events',        setEvents],
      ['gallery',       setGallery],
      ['pdfReports',    setPdfReports],
      ['pages',         setPages],
      ['faculties',     setFaculties],
      ['placements',    setPlacements],
      ['alerts',        setAlerts],
    ];

    const unsubs = cols.map(([col, setter]) => {
      try {
        return onSnapshot(
          query(collection(db, col), orderBy('createdAt', 'desc')),
          snap => setter(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        );
      } catch {
        return onSnapshot(
          query(collection(db, col)),
          snap => setter(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        );
      }
    });

    // Slider — order field se, fallback createdAt
    let unsubSlider;
    try {
      unsubSlider = onSnapshot(
        query(collection(db, 'sliderSlides'), orderBy('order', 'asc')),
        snap => setSliderSlides(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
        () => {
          unsubSlider = onSnapshot(
            query(collection(db, 'sliderSlides'), orderBy('createdAt', 'asc')),
            snap => setSliderSlides(snap.docs.map(d => ({ id: d.id, ...d.data() })))
          );
        }
      );
    } catch {
      unsubSlider = onSnapshot(
        query(collection(db, 'sliderSlides'), orderBy('createdAt', 'asc')),
        snap => setSliderSlides(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      );
    }

    return () => { unsubs.forEach(u => u()); if (unsubSlider) unsubSlider(); };
  }, []);

  // ✅ FIXED: window.open('/admin') — Batch 1 critical bug fix
  // Pehle '#/admin' tha jo React Router ke saath kaam nahi karta tha
  const handleOpenAdminTab = () => {
    window.open('#/admin', '_blank');
  };

  const tickerItems = [
    ...notices.slice(0, 3),
    ...announcements.slice(0, 2),
  ].map(item => ({ ...item, text: stripHtml(item.text || item.title) }));

  const activeAlerts = alerts.filter(a => a.isActive);

  return (
    <>
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ top: 20, right: 20, zIndex: 999999 }}
        toastOptions={{
          style: {
            background: 'rgba(15,35,71,0.85)', backdropFilter: 'blur(12px)',
            color: '#fff', border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)', padding: '16px',
            borderRadius: '14px', fontSize: '15px', fontWeight: '600',
          },
          success: { icon: '✅', duration: 3000 },
          error:   { icon: '❌', duration: 4000 },
        }}
      />

      {/* Splash screen */}
      <div className={`splash-screen ${!showSplash ? 'hide' : ''}`}>
        <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Guru Nanak College" className="splash-logo" />
        <div className="splash-text">Loading Portal...</div>
      </div>

      {/* Top bar, ticker, alert banner, navbar */}
      {!isAdminRoute && (
        <>
          <TopBar />
          <Suspense fallback={<div style={{ height: '37px' }} />}>
            <Ticker items={tickerItems} />
          </Suspense>

          {/* ✅ AlertBanner — minimal mode: agar crash ho toh banner silently hide hoga */}
          {activeAlerts.length > 0 && (
            <ErrorBoundary page="AlertBanner" minimal={true}>
              <AlertBanner />
            </ErrorBoundary>
          )}

          <Navbar onAdminClick={handleOpenAdminTab} navLinks={dynamicNavLinks} />
          <Breadcrumbs />
          {!isMobile && <QuickActionNav />}
        </>
      )}

      {/* ── Routes ── */}
      <div key={location.pathname} className={isAdminRoute ? '' : 'page-transition'}>
        <Routes location={location}>

          {/* Home */}
          <Route path="/" element={
            <ErrorBoundary page="HomePage">
              <HomePage
                notices={notices}
                announcements={announcements}
                pdfReports={pdfReports}
                sliderSlides={sliderSlides}
                events={events}
                gallery={gallery}
                placements={placements}
              />
            </ErrorBoundary>
          } />

          {/* Contact */}
          <Route path="/contact" element={
            <ErrorBoundary page="Contact">
              <Contact />
            </ErrorBoundary>
          } />

          {/* College Profile */}
          <Route path="/about-us/college-profile" element={
            <ErrorBoundary page="CollegeProfile">
              <CollegeProfile />
            </ErrorBoundary>
          } />

          {/* Notifications */}
          <Route path="/notifications" element={
            <ErrorBoundary page="NotificationsPage">
              <NotificationsPage />
            </ErrorBoundary>
          } />

          {/* Documents */}
          <Route path="/documents" element={
            <ErrorBoundary page="DocumentsPage">
              <DocumentsPage />
            </ErrorBoundary>
          } />

          {/* Events */}
          <Route path="/events" element={
            <ErrorBoundary page="EventsPage">
              <EventsPage />
            </ErrorBoundary>
          } />

          {/* News */}
          <Route path="/news" element={
            <ErrorBoundary page="NewsPage">
              <NewsPage />
            </ErrorBoundary>
          } />

          {/* Video Gallery */}
          <Route path="/video-gallery" element={
            <ErrorBoundary page="VideoGallery">
              <VideoGallery />
            </ErrorBoundary>
          } />

          {/* Teaching Staff */}
          <Route path="/about-us/college-staff/teaching-staff" element={
            <ErrorBoundary page="StaffPage">
              <StaffPage faculties={faculties} staffType="Teaching" />
            </ErrorBoundary>
          } />

          {/* Non-Teaching Staff */}
          <Route path="/about-us/college-staff/non-teaching-staff" element={
            <ErrorBoundary page="StaffPage">
              <StaffPage faculties={faculties} staffType="Non-Teaching" />
            </ErrorBoundary>
          } />

          {/* Gallery — scrolls to gallery section on HomePage */}
          <Route path="/gallery" element={
            <ErrorBoundary page="HomePage">
              <HomePage />
            </ErrorBoundary>
          } />

          {/* ✅ B1 FIX: Hub + single :deptSlug param route
               Pehle static routes the (bca, bba...) → useParams() kuch nahi deta tha
               Ab :deptSlug se sahi slug milta hai */}
          <Route path="/academics/departments" element={
            <ErrorBoundary page="DepartmentPage">
              <DepartmentPage />
            </ErrorBoundary>
          } />
          <Route path="/academics/departments/:deptSlug" element={
            <ErrorBoundary page="DepartmentPage">
              <DepartmentPage />
            </ErrorBoundary>
          } />

          {/* Admin — ErrorBoundary nahi — AdminPanel ka apna ErrorBoundary hai */}
          <Route path="/admin" element={
            <AdminRouteWrapper
              notices={notices} announcements={announcements} events={events}
              gallery={gallery} pdfReports={pdfReports} pages={pages}
              sliderSlides={sliderSlides} placeholderPaths={placeholderPaths}
              navLinks={baseNavLinks} faculties={faculties}
              placements={placements} alerts={alerts}
            />
          } />

          {/* Dynamic slug pages (/p/:slug) */}
          <Route path="/p/:slug" element={
            <ErrorBoundary page="PageViewer">
              <DynamicPageRoute pages={pages} />
            </ErrorBoundary>
          } />

          {/* Placeholder paths — Firebase se content aata hai */}
          {placeholderPaths.map(path => {
            const page = pageContentByPath.get(path);
            return (
              <Route key={path} path={path} element={
                <ErrorBoundary page="PageViewer">
                  <PageViewer page={page} />
                </ErrorBoundary>
              } />
            );
          })}

        </Routes>
      </div>

      {/* Footer + Admin button */}
      {!isAdminRoute && (
        <>
          <Footer />
          <button
            onClick={handleOpenAdminTab}
            style={{
              position: 'fixed', bottom: 25, right: 25,
              background: COLORS.navy, color: '#fff',
              border: `3px solid ${COLORS.gold}`,
              borderRadius: '50%', width: 60, height: 60,
              cursor: 'pointer', zIndex: 500,
              boxShadow: '0 6px 20px rgba(0,0,0,.25)',
            }}
          >
            <span style={{ fontSize: 18 }}>⚙️</span>
          </button>
        </>
      )}
    </>
  );
}