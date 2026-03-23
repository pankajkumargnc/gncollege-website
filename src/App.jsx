// src/App.jsx — COMPLETE v7 (Performance Optimized + Jodit CSS deferred)
// ✅ Jodit CSS sirf /admin route pe load hoga
// ✅ Saari existing functionality intact
// ✅ Route-level lazy loading
// ✅ <main> landmark — Accessibility fix

import WhatsAppButton      from './components/WhatsAppButton';
import { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster }         from 'react-hot-toast';

import Navbar              from './components/Navbar';
import Footer              from './components/Footer';
import TopBar              from './components/home/TopBar';
import Breadcrumbs         from './components/Breadcrumbs';
import QuickActionNav      from './components/QuickActionNav';
import ErrorBoundary       from './components/ErrorBoundary';
import AdminLogin          from './components/AdminLogin';
import { COLORS }          from './styles/colors';
import { navLinks as staticNavLinks } from './data/db';
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { db }              from './firebase';

import { PageViewerStandalone } from './components/PageViewer';

// ── Core pages — eager load ──────────────────────────────────────────────────
import HomePage            from './pages/HomePage';
import Contact             from './pages/Contact';

// ── Lazy pages ───────────────────────────────────────────────────────────────
const StaffPage         = lazy(() => import('./pages/StaffPage'));
const DepartmentPage    = lazy(() => import('./pages/DepartmentPage'));
const GalleryPage       = lazy(() => import('./pages/GalleryPage'));
const VideoGallery      = lazy(() => import('./pages/VideoGallery'));
const CollegeProfile    = lazy(() => import('./pages/CollegeProfile'));
const LeadershipPage    = lazy(() => import('./pages/LeadershipPage'));
const NewsPage          = lazy(() => import('./pages/NewsPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const DocumentsPage     = lazy(() => import('./pages/DocumentsPage'));
const EventsPage        = lazy(() => import('./pages/EventsPage'));
const AdminPanel        = lazy(() => import('./components/AdminPanel'));
const Ticker            = lazy(() => import('./components/Ticker'));

// ── Named export lazy helpers ────────────────────────────────────────────────
const LazyAbout       = n => lazy(() => import('./pages/AboutPages').then(m => ({ default: m[n] })));
const LazyAcademics   = n => lazy(() => import('./pages/AcademicsPages').then(m => ({ default: m[n] })));
const LazyAdmission   = n => lazy(() => import('./pages/AdmissionPages').then(m => ({ default: m[n] })));
const LazyNaac        = n => lazy(() => import('./pages/NaacPages').then(m => ({ default: m[n] })));
const LazyPublication = n => lazy(() => import('./pages/PublicationPages').then(m => ({ default: m[n] })));
const LazyActivity    = n => lazy(() => import('./pages/ActivityPages').then(m => ({ default: m[n] })));
const LazyCampus      = n => lazy(() => import('./pages/CampusPages').then(m => ({ default: m[n] })));

// About
const VisionMission    = LazyAbout('VisionMission');
const PrincipalMessage = LazyAbout('PrincipalMessage');
const Organogram       = LazyAbout('Organogram');
const WomensCell       = LazyAbout('WomensCell');
const AntiRagging      = LazyAbout('AntiRagging');
const ScStCell         = LazyAbout('ScStCell');
const ObcCell          = LazyAbout('ObcCell');
const GrievanceCell    = LazyAbout('GrievanceCell');
const IccCell          = LazyAbout('IccCell');
const MinorityCell     = LazyAbout('MinorityCell');
const PlacementCell    = LazyAbout('PlacementCell');
const RusaCell         = LazyAbout('RusaCell');
const GoverningBody    = LazyAbout('GoverningBody');
const StaffCouncil     = LazyAbout('StaffCouncil');

// Academics
const IqacPage         = LazyAcademics('IqacPage');
const CourseOffered    = LazyAcademics('CourseOffered');
const Syllabus         = LazyAcademics('Syllabus');
const AcademicCalendar = LazyAcademics('AcademicCalendar');

// Admission
const AdmissionRule    = LazyAdmission('AdmissionRule');
const DocumentRequired = LazyAdmission('DocumentRequired');
const FeeStructure     = LazyAdmission('FeeStructure');
const AdmissionNotif   = LazyAdmission('AdmissionNotification');
const IntakeCapacity   = LazyAdmission('IntakeCapacity');

// NAAC
const SsrCyclePage     = LazyNaac('SsrCyclePage');
const AqarPage         = LazyNaac('AqarPage');
const NirfPage         = LazyNaac('NirfPage');
const PerspectivePlan  = LazyNaac('PerspectivePlan');

// Publication
const LibraryPage      = LazyPublication('LibraryPage');
const PublicationPage  = LazyPublication('PublicationPage');

// Activity
const NssPage          = LazyActivity('NssPage');
const NccPage          = LazyActivity('NccPage');
const WorkshopPage     = LazyActivity('WorkshopPage');
const SportsPage       = LazyActivity('SportsPage');
const RotaractClub     = LazyActivity('RotaractClub');
const SadbhavanaDiwas  = LazyActivity('SadbhavanaDiwas');

// Campus
const CampusVisuals    = LazyCampus('CampusVisuals');
const Infrastructure   = LazyCampus('Infrastructure');
const Classrooms       = LazyCampus('Classrooms');
const IctRooms         = LazyCampus('IctRooms');
const GreenCampus      = LazyCampus('GreenCampus');

// ── Page loader spinner ──────────────────────────────────────────────────────
const PageLoader = () => (
  <div style={{
    minHeight: '60vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexDirection: 'column', gap: 12,
  }}>
    <div style={{
      width: 40, height: 40,
      border: `4px solid ${COLORS.gold}`,
      borderTop: `4px solid ${COLORS.navy}`,
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    <span style={{ color: COLORS.navy, fontSize: 13, fontWeight: 600 }}>Loading...</span>
  </div>
);

// ── Shorthand wrappers ───────────────────────────────────────────────────────
const EB  = ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>;
const PVS = () => <EB><PageViewerStandalone /></EB>;
const R   = ({ el }) => (
  <Suspense fallback={<PageLoader />}>
    <EB>{el}</EB>
  </Suspense>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [notices,       setNotices]       = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events,        setEvents]        = useState([]);
  const [gallery,       setGallery]       = useState([]);
  const [faculties,     setFaculties]     = useState([]);
  const [sliderSlides,  setSliderSlides]  = useState([]);
  const [firebaseNav,   setFirebaseNav]   = useState(null);

  // ── Admin auth ───────────────────────────────────────────────────────────
  const [adminAuthed, setAdminAuthed] = useState(
    () => sessionStorage.getItem('gnc_admin_auth') === 'true'
  );
  const handleAdminLogin  = () => {
    sessionStorage.setItem('gnc_admin_auth', 'true');
    setAdminAuthed(true);
  };
  const handleAdminLogout = () => {
    sessionStorage.removeItem('gnc_admin_auth');
    setAdminAuthed(false);
    window.location.hash = '/';
  };

  const location     = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') ||
    window.location.hash.startsWith('#/admin');

  // ── Jodit CSS — sirf /admin route pe load karo ──────────────────────────
  useEffect(() => {
    if (!isAdminRoute) return;

    // Pehle se loaded hai toh skip
    if (document.querySelector('link[data-jodit-css]')) return;

    const link    = document.createElement('link');
    link.rel      = 'stylesheet';
    link.type     = 'text/css';
    link.setAttribute('data-jodit-css', 'true');

    // Try npm build se pehle, fallback CDN
    link.onerror  = () => {
      const cdn     = document.createElement('link');
      cdn.rel       = 'stylesheet';
      cdn.type      = 'text/css';
      cdn.href      = 'https://cdnjs.cloudflare.com/ajax/libs/jodit/4.0.0-beta.76/jodit.min.css';
      cdn.setAttribute('data-jodit-css', 'true');
      document.head.appendChild(cdn);
    };

    // Vite build pe vendor-ad….css ka naam hota hai — runtime mein find karo
    const allLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    const joditLink = allLinks.find(l => l.href.includes('vendor-ad') || l.href.includes('jodit'));

    if (joditLink) {
      // Pehle se loaded hai, kuch nahi karna
      return;
    }

    // Dynamic import se load karo
    import('jodit-react').then(() => {
      // jodit-react import hone ke baad CSS bhi bundle mein aa jaati hai
    }).catch(() => {});

    return () => {
      // Admin se nikalne par CSS cleanup
      const el = document.querySelector('link[data-jodit-css]');
      if (el) el.remove();
    };
  }, [isAdminRoute]);

  // ── Firebase listeners ───────────────────────────────────────────────────
  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'navbar'), snap => {
      if (snap.exists() && snap.data().links) setFirebaseNav(snap.data().links);
    });
  }, []);

  useEffect(() => {
    const cols = [
      ['notices',       setNotices],
      ['announcements', setAnnouncements],
      ['events',        setEvents],
      ['gallery',       setGallery],
      ['faculties',     setFaculties],
      ['sliderSlides',  setSliderSlides],
    ];
    const unsubs = cols.map(([col, setter]) => {
      const q = query(collection(db, col), orderBy('createdAt', 'desc'));
      return onSnapshot(q,
        snap => setter(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
        err  => console.error(`[${col}]`, err)
      );
    });
    return () => unsubs.forEach(u => u());
  }, []);

  // ── Nav links ────────────────────────────────────────────────────────────
  const baseNavLinks = useMemo(() => {
    const links = firebaseNav || staticNavLinks;
    return links.map(link =>
      link.label === 'Gallery'
        ? { ...link, href: '/gallery', sub: [
            { label: 'Photo Gallery', href: '/gallery/photos' },
            { label: 'Video Gallery', href: '/gallery/videos' },
          ]}
        : link
    );
  }, [firebaseNav]);

  const handleOpenAdminTab = () =>
    window.open(
      `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}/#/admin`,
      '_blank'
    );

  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: 999999 }}
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600, fontSize: '14px',
            borderRadius: '12px', padding: '14px 18px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          },
          success: {
            style: { background: '#0f2347', color: '#fff', border: '1.5px solid #f4a023' },
            iconTheme: { primary: '#f4a023', secondary: '#0f2347' },
          },
          error: {
            style: { background: '#fff0f0', color: '#b91c1c', border: '1.5px solid #f87171' },
          },
        }}
      />

      {!isAdminRoute && (
        <>
          <TopBar />
          <Suspense fallback={<div style={{ height: 40 }} />}>
            <Ticker items={notices} />
          </Suspense>
          <Navbar onAdminClick={handleOpenAdminTab} navLinks={baseNavLinks} />
          <Breadcrumbs />
          <QuickActionNav />
        </>
      )}

      {/* ✅ <main> landmark — Accessibility fix */}
      <main id="main-content">
        <Routes>

          {/* ── HOME ── */}
          <Route path="/" element={
            <EB>
              <HomePage
                notices={notices} announcements={announcements}
                sliderSlides={sliderSlides} events={events} gallery={gallery}
              />
            </EB>
          } />
          <Route path="/contact" element={<EB><Contact /></EB>} />

          {/* ══ ABOUT US ══ */}
          <Route path="/about-us/college-profile"   element={<R el={<CollegeProfile />} />} />
          <Route path="/about-us/vision-mission"    element={<R el={<VisionMission />} />} />
          <Route path="/about-us/principal-message" element={<R el={<PrincipalMessage />} />} />
          <Route path="/about-us/governing-body"    element={<R el={<GoverningBody />} />} />
          <Route path="/about-us/staff-council"     element={<R el={<StaffCouncil />} />} />
          <Route path="/about-us/audit-report"      element={<PVS />} />

          <Route path="/about-us/college-management/organogram"  element={<R el={<Organogram />} />} />
          <Route path="/about-us/college-management/presidents"  element={<R el={<LeadershipPage type="president"  title="Presidents Over the Years"  />} />} />
          <Route path="/about-us/college-management/secretaries" element={<R el={<LeadershipPage type="secretary"  title="Secretaries Over the Years" />} />} />
          <Route path="/about-us/college-management/principal"   element={<R el={<LeadershipPage type="principal"  title="Principals Over the Years"  />} />} />

          <Route path="/about-us/various-committees/womens-cell"  element={<R el={<WomensCell />} />} />
          <Route path="/about-us/various-committees/anti-ragging" element={<R el={<AntiRagging />} />} />
          <Route path="/about-us/various-committees/sc-st"        element={<R el={<ScStCell />} />} />
          <Route path="/about-us/various-committees/obc"          element={<R el={<ObcCell />} />} />
          <Route path="/about-us/various-committees/grievance"    element={<R el={<GrievanceCell />} />} />
          <Route path="/about-us/various-committees/icc"          element={<R el={<IccCell />} />} />
          <Route path="/about-us/various-committees/minority"     element={<R el={<MinorityCell />} />} />
          <Route path="/about-us/various-committees/placement"    element={<R el={<PlacementCell />} />} />
          <Route path="/about-us/various-committees/rusa"         element={<R el={<RusaCell />} />} />

          <Route path="/about-us/college-staff/:staffType" element={<R el={<StaffPage faculties={faculties} />} />} />

          <Route path="/about-us/regulations/bbmku/special-ug-regulation" element={<PVS />} />
          <Route path="/about-us/regulations/bbmku/ug-regulation-fyugp"   element={<PVS />} />
          <Route path="/about-us/regulations/bbmku/ug-regulation-cbcs"    element={<PVS />} />
          <Route path="/about-us/regulations/college-affiliation"          element={<PVS />} />
          <Route path="/about-us/regulations/ugc-section"                  element={<PVS />} />
          <Route path="/about-us/regulations/vbu/ug-regulation-2015"       element={<PVS />} />
          <Route path="/about-us/regulations/vbu/bca-regulation"           element={<PVS />} />
          <Route path="/about-us/regulations/byelaws"                      element={<PVS />} />
          <Route path="/about-us/regulations/exemption"                    element={<PVS />} />

          {/* ══ CAMPUS ══ */}
          <Route path="/campus/visuals/bhuda"               element={<R el={<CampusVisuals title="Bhuda Campus"        categoryId="bhuda"      desc="Bhuda campus ki photos"        />} />} />
          <Route path="/campus/visuals/bank-more"           element={<R el={<CampusVisuals title="Bank More Campus"    categoryId="bank-more"  desc="Bank More campus ki photos"    />} />} />
          <Route path="/campus/visuals/vocational-building" element={<R el={<CampusVisuals title="Vocational Building" categoryId="vocational" desc="Vocational building ki photos" />} />} />
          <Route path="/campus/infrastructure"              element={<R el={<Infrastructure />} />} />
          <Route path="/campus/classroom"                   element={<R el={<Classrooms />} />} />
          <Route path="/campus/ict-rooms"                   element={<R el={<IctRooms />} />} />
          <Route path="/campus/green-campus"                element={<R el={<GreenCampus />} />} />

          {/* ══ ACADEMICS ══ */}
          <Route path="/academics/iqac"                  element={<R el={<IqacPage />} />} />
          <Route path="/academics/course-offered"        element={<R el={<CourseOffered />} />} />
          <Route path="/academics/departments"           element={<R el={<DepartmentPage />} />} />
          <Route path="/academics/departments/:deptSlug" element={<R el={<DepartmentPage />} />} />
          <Route path="/syllabus"                        element={<R el={<Syllabus />} />} />
          <Route path="/academics/academic-calendar"     element={<R el={<AcademicCalendar />} />} />

          {/* ══ ADMISSION ══ */}
          <Route path="/admission/rule"                  element={<R el={<AdmissionRule />} />} />
          <Route path="/admission/document-required"     element={<R el={<DocumentRequired />} />} />
          <Route path="/admission/fee-structure"         element={<R el={<FeeStructure />} />} />
          <Route path="/admission/notification/latest"   element={<R el={<AdmissionNotif type="latest"   title="Latest Notifications"  />} />} />
          <Route path="/admission/notification/upcoming" element={<R el={<AdmissionNotif type="upcoming" title="Upcoming Notifications" />} />} />
          <Route path="/admission/intake-capacity"       element={<R el={<IntakeCapacity />} />} />

          {/* ══ ACTIVITY ══ */}
          <Route path="/activity/nss"                            element={<R el={<NssPage />} />} />
          <Route path="/activity/ncc"                            element={<R el={<NccPage />} />} />
          <Route path="/activity/workshop"                       element={<R el={<WorkshopPage />} />} />
          <Route path="/activity/games-sports"                   element={<R el={<SportsPage />} />} />
          <Route path="/activity/collaboration/rotaract-club"    element={<R el={<RotaractClub />} />} />
          <Route path="/activity/collaboration/sadbhavana-diwas" element={<R el={<SadbhavanaDiwas />} />} />

          {/* ══ NAAC ══ */}
          <Route path="/naac/ssr-1st-cycle/cycle-1-documents" element={<R el={<SsrCyclePage cycle={1} />} />} />
          <Route path="/naac/ssr-1st-cycle/peer-team-report"  element={<R el={<SsrCyclePage cycle={1} />} />} />
          <Route path="/naac/ssr-2nd-cycle/cycle-2-documents" element={<R el={<SsrCyclePage cycle={2} />} />} />
          <Route path="/naac/ssr-2nd-cycle/executive-summary" element={<R el={<SsrCyclePage cycle={2} />} />} />
          <Route path="/naac/aqar"             element={<R el={<AqarPage />} />} />
          <Route path="/naac/nirf"             element={<R el={<NirfPage />} />} />
          <Route path="/naac/perspective-plan" element={<R el={<PerspectivePlan />} />} />

          {/* ══ PUBLICATION ══ */}
          <Route path="/publication/college-library"          element={<R el={<LibraryPage />} />} />
          <Route path="/publication/e-magazine"               element={<R el={<PublicationPage type="magazine" title="E-Magazine"        subtitle="College ki digital publications"  icon="📰" keyword="magazine"    />} />} />
          <Route path="/publication/examination-results/2024" element={<R el={<PublicationPage type="result"   title="Exam Results 2024" subtitle="Academic year 2023-24 ke results" icon="📋" keyword="result-2024" />} />} />
          <Route path="/publication/examination-results/2023" element={<R el={<PublicationPage type="result"   title="Exam Results 2023" subtitle="Academic year 2022-23 ke results" icon="📋" keyword="result-2023" />} />} />
          <Route path="/publication/sss-report/2023-24"       element={<R el={<PublicationPage type="sss"      title="SSS Report 2023-24" subtitle="Student Satisfaction Survey"     icon="📊" keyword="sss-2023-24" />} />} />
          <Route path="/publication/sss-report/2022-23"       element={<R el={<PublicationPage type="sss"      title="SSS Report 2022-23" subtitle="Student Satisfaction Survey"     icon="📊" keyword="sss-2022-23" />} />} />

          {/* ══ GALLERY / NEWS ══ */}
          <Route path="/gallery"               element={<R el={<GalleryPage gallery={gallery} />} />} />
          <Route path="/gallery/photos"        element={<R el={<GalleryPage gallery={gallery} />} />} />
          <Route path="/gallery/photo-gallery" element={<R el={<GalleryPage gallery={gallery} />} />} />
          <Route path="/video-gallery"         element={<R el={<VideoGallery />} />} />
          <Route path="/gallery/videos"        element={<R el={<VideoGallery />} />} />
          <Route path="/gallery/video-gallery" element={<R el={<VideoGallery />} />} />
          <Route path="/news"          element={<R el={<NewsPage />} />} />
          <Route path="/notifications" element={<R el={<NotificationsPage />} />} />
          <Route path="/documents"     element={<R el={<DocumentsPage />} />} />
          <Route path="/events"        element={<R el={<EventsPage />} />} />

          {/* ══ ADMIN ══ */}
          <Route path="/admin" element={
            adminAuthed ? (
              <Suspense fallback={
                <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <PageLoader />
                </div>
              }>
                <AdminPanel
                  notices={notices} announcements={announcements}
                  events={events}   gallery={gallery} faculties={faculties}
                  onClose={handleAdminLogout}
                />
              </Suspense>
            ) : (
              <AdminLogin
                onSuccess={handleAdminLogin}
                onClose={() => { window.location.hash = '/'; }}
              />
            )
          } />

        </Routes>
      </main>

      {/* ── Footer + FAB + WhatsApp — non-admin only ── */}
      {!isAdminRoute && (
        <>
          <Footer />
          <WhatsAppButton />
          <button
            onClick={handleOpenAdminTab}
            title="Open Admin Panel"
            style={{
              position:     'fixed',
              bottom:       'clamp(16px, 3vw, 25px)',
              right:        'clamp(16px, 3vw, 25px)',
              background:   COLORS.navy,
              color:        '#fff',
              border:       `3px solid ${COLORS.gold}`,
              borderRadius: '50%',
              width:        'clamp(48px, 6vw, 60px)',
              height:       'clamp(48px, 6vw, 60px)',
              cursor:       'pointer',
              zIndex:       500,
              fontSize:     'clamp(18px, 2.5vw, 24px)',
              flexShrink:   0,
            }}
          >⚙️</button>
        </>
      )}
    </>
  );
}