// src/App.jsx — COMPLETE v5
// ✅ All About Us routes fully wired — GoverningBody, StaffCouncil, Organogram, all 9 committees

import { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import TopBar         from './components/home/TopBar';
import Breadcrumbs    from './components/Breadcrumbs';
import QuickActionNav from './components/QuickActionNav';
import ErrorBoundary  from './components/ErrorBoundary';
import AdminLogin     from './components/AdminLogin';
import { COLORS }     from './styles/colors';
import { navLinks as staticNavLinks } from './data/db';
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { db } from './firebase';

// CMS page viewer (admin-editable pages)
import { PageViewerStandalone } from './components/PageViewer';

// ── Core pages ─────────────────────────────────────────────────────────────────
import HomePage          from './pages/HomePage';
import Contact           from './pages/Contact';
import StaffPage         from './pages/StaffPage';
import DepartmentPage    from './pages/DepartmentPage';
import GalleryPage       from './pages/GalleryPage';
import VideoGallery      from './pages/VideoGallery';
import CollegeProfile    from './pages/CollegeProfile';
import LeadershipPage    from './pages/LeadershipPage';
import NewsPage          from './pages/NewsPage';
import NotificationsPage from './pages/NotificationsPage';
import DocumentsPage     from './pages/DocumentsPage';
import EventsPage        from './pages/EventsPage';

// ── About Us pages ─────────────────────────────────────────────────────────────
import {
  VisionMission, PrincipalMessage, Organogram,
  WomensCell, AntiRagging, ScStCell, ObcCell,
  GrievanceCell, IccCell, MinorityCell, PlacementCell, RusaCell,
  GoverningBody, StaffCouncil,
} from './pages/AboutPages';

// ── Academics ──────────────────────────────────────────────────────────────────
import { IqacPage, CourseOffered, Syllabus, AcademicCalendar } from './pages/AcademicsPages';

// ── Admission ──────────────────────────────────────────────────────────────────
import {
  AdmissionRule, DocumentRequired, FeeStructure,
  AdmissionNotification, IntakeCapacity,
} from './pages/AdmissionPages';

// ── NAAC ───────────────────────────────────────────────────────────────────────
import { SsrCyclePage, AqarPage, NirfPage, PerspectivePlan } from './pages/NaacPages';

// ── Publication ────────────────────────────────────────────────────────────────
import { LibraryPage, PublicationPage } from './pages/PublicationPages';

// ── Activity ───────────────────────────────────────────────────────────────────
import {
  NssPage, NccPage, WorkshopPage, SportsPage,
  RotaractClub, SadbhavanaDiwas,
} from './pages/ActivityPages';

// ── Campus ─────────────────────────────────────────────────────────────────────
import { CampusVisuals, Infrastructure, Classrooms, IctRooms, GreenCampus } from './pages/CampusPages';

// ── Lazy ───────────────────────────────────────────────────────────────────────
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const Ticker     = lazy(() => import('./components/Ticker'));

// Shorthand wrappers
const EB  = ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>;
const PVS = () => <EB><PageViewerStandalone /></EB>;

export default function App() {
  const [notices,       setNotices]       = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events,        setEvents]        = useState([]);
  const [gallery,       setGallery]       = useState([]);
  const [faculties,     setFaculties]     = useState([]);
  const [sliderSlides,  setSliderSlides]  = useState([]);
  const [firebaseNav,   setFirebaseNav]   = useState(null);
  // ── Admin auth session (clears on page refresh for security) ────────────
  const [adminAuthed, setAdminAuthed] = useState(
    () => sessionStorage.getItem('gnc_admin_auth') === 'true'
  );
  const handleAdminLogin  = () => { sessionStorage.setItem('gnc_admin_auth', 'true');  setAdminAuthed(true);  };
  const handleAdminLogout = () => { sessionStorage.removeItem('gnc_admin_auth');        setAdminAuthed(false); window.location.hash = '/'; };

  const location     = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') ||
  window.location.hash.startsWith('#/admin');


  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'navbar'), snap => {
      if (snap.exists() && snap.data().links) setFirebaseNav(snap.data().links);
    });
  }, []);

  useEffect(() => {
    const cols = [
      ['notices', setNotices], ['announcements', setAnnouncements],
      ['events', setEvents],   ['gallery', setGallery],
      ['faculties', setFaculties], ['sliderSlides', setSliderSlides],
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

  const baseNavLinks = useMemo(() => {
  const links = firebaseNav || staticNavLinks;
  // Gallery sub-menu hamesha correct routes ke saath force karo
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
    window.open(`${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}/#/admin`, '_blank');

  return (
    <>
      <Toaster position="top-right" />
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

      <Routes>
        {/* HOME */}
        <Route path="/" element={
          <EB><HomePage notices={notices} announcements={announcements}
            sliderSlides={sliderSlides} events={events} gallery={gallery} /></EB>
        } />
        <Route path="/contact" element={<EB><Contact /></EB>} />

        {/* ══ ABOUT US ══ */}
        <Route path="/about-us/college-profile"    element={<EB><CollegeProfile /></EB>} />
        <Route path="/about-us/vision-mission"     element={<EB><VisionMission /></EB>} />
        <Route path="/about-us/principal-message"  element={<EB><PrincipalMessage /></EB>} />
        <Route path="/about-us/governing-body"     element={<EB><GoverningBody /></EB>} />
        <Route path="/about-us/staff-council"      element={<EB><StaffCouncil /></EB>} />
        <Route path="/about-us/audit-report"       element={<PVS />} />

        {/* College Management */}
        <Route path="/about-us/college-management/organogram"  element={<EB><Organogram /></EB>} />
        <Route path="/about-us/college-management/presidents"  element={<EB><LeadershipPage type="president"  title="Presidents Over the Years"  /></EB>} />
        <Route path="/about-us/college-management/secretaries" element={<EB><LeadershipPage type="secretary"  title="Secretaries Over the Years" /></EB>} />
        <Route path="/about-us/college-management/principal"   element={<EB><LeadershipPage type="principal"  title="Principals Over the Years"  /></EB>} />

        {/* Various Committees — all 9 */}
        <Route path="/about-us/various-committees/womens-cell"  element={<EB><WomensCell /></EB>} />
        <Route path="/about-us/various-committees/anti-ragging" element={<EB><AntiRagging /></EB>} />
        <Route path="/about-us/various-committees/sc-st"        element={<EB><ScStCell /></EB>} />
        <Route path="/about-us/various-committees/obc"          element={<EB><ObcCell /></EB>} />
        <Route path="/about-us/various-committees/grievance"    element={<EB><GrievanceCell /></EB>} />
        <Route path="/about-us/various-committees/icc"          element={<EB><IccCell /></EB>} />
        <Route path="/about-us/various-committees/minority"     element={<EB><MinorityCell /></EB>} />
        <Route path="/about-us/various-committees/placement"    element={<EB><PlacementCell /></EB>} />
        <Route path="/about-us/various-committees/rusa"         element={<EB><RusaCell /></EB>} />

        {/* Staff */}
        <Route path="/about-us/college-staff/:staffType" element={<EB><StaffPage faculties={faculties} /></EB>} />

        {/* Regulations — CMS (Admin → Pages & SEO se content add karein) */}
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
        <Route path="/campus/visuals/bhuda"              element={<EB><CampusVisuals title="Bhuda Campus"        categoryId="bhuda"      desc="Bhuda campus ki photos"        /></EB>} />
        <Route path="/campus/visuals/bank-more"          element={<EB><CampusVisuals title="Bank More Campus"    categoryId="bank-more"  desc="Bank More campus ki photos"    /></EB>} />
        <Route path="/campus/visuals/vocational-building"element={<EB><CampusVisuals title="Vocational Building" categoryId="vocational" desc="Vocational building ki photos" /></EB>} />
        <Route path="/campus/infrastructure"             element={<EB><Infrastructure /></EB>} />
        <Route path="/campus/classroom"                  element={<EB><Classrooms /></EB>} />
        <Route path="/campus/ict-rooms"                  element={<EB><IctRooms /></EB>} />
        <Route path="/campus/green-campus"               element={<EB><GreenCampus /></EB>} />

        {/* ══ ACADEMICS ══ */}
        <Route path="/academics/iqac"                   element={<EB><IqacPage /></EB>} />
        <Route path="/academics/course-offered"         element={<EB><CourseOffered /></EB>} />
        <Route path="/academics/departments"            element={<EB><DepartmentPage /></EB>} />
        <Route path="/academics/departments/:deptSlug"  element={<EB><DepartmentPage /></EB>} />
        <Route path="/syllabus"                         element={<EB><Syllabus /></EB>} />
        <Route path="/academics/academic-calendar"      element={<EB><AcademicCalendar /></EB>} />

        {/* ══ ADMISSION ══ */}
        <Route path="/admission/rule"                   element={<EB><AdmissionRule /></EB>} />
        <Route path="/admission/document-required"      element={<EB><DocumentRequired /></EB>} />
        <Route path="/admission/fee-structure"          element={<EB><FeeStructure /></EB>} />
        <Route path="/admission/notification/latest"    element={<EB><AdmissionNotification type="latest"   title="Latest Notifications"  /></EB>} />
        <Route path="/admission/notification/upcoming"  element={<EB><AdmissionNotification type="upcoming" title="Upcoming Notifications" /></EB>} />
        <Route path="/admission/intake-capacity"        element={<EB><IntakeCapacity /></EB>} />

        {/* ══ ACTIVITY ══ */}
        <Route path="/activity/nss"                            element={<EB><NssPage /></EB>} />
        <Route path="/activity/ncc"                            element={<EB><NccPage /></EB>} />
        <Route path="/activity/workshop"                       element={<EB><WorkshopPage /></EB>} />
        <Route path="/activity/games-sports"                   element={<EB><SportsPage /></EB>} />
        <Route path="/activity/collaboration/rotaract-club"    element={<EB><RotaractClub /></EB>} />
        <Route path="/activity/collaboration/sadbhavana-diwas" element={<EB><SadbhavanaDiwas /></EB>} />

        {/* ══ NAAC ══ */}
        <Route path="/naac/ssr-1st-cycle/cycle-1-documents" element={<EB><SsrCyclePage cycle={1} /></EB>} />
        <Route path="/naac/ssr-1st-cycle/peer-team-report"  element={<EB><SsrCyclePage cycle={1} /></EB>} />
        <Route path="/naac/ssr-2nd-cycle/cycle-2-documents" element={<EB><SsrCyclePage cycle={2} /></EB>} />
        <Route path="/naac/ssr-2nd-cycle/executive-summary" element={<EB><SsrCyclePage cycle={2} /></EB>} />
        <Route path="/naac/aqar"             element={<EB><AqarPage /></EB>} />
        <Route path="/naac/nirf"             element={<EB><NirfPage /></EB>} />
        <Route path="/naac/perspective-plan" element={<EB><PerspectivePlan /></EB>} />

        {/* ══ PUBLICATION ══ */}
        <Route path="/publication/college-library"          element={<EB><LibraryPage /></EB>} />
        <Route path="/publication/e-magazine"               element={<EB><PublicationPage type="magazine" title="E-Magazine"        subtitle="College ki digital publications"   icon="📰" keyword="magazine"   /></EB>} />
        <Route path="/publication/examination-results/2024" element={<EB><PublicationPage type="result"   title="Exam Results 2024" subtitle="Academic year 2023-24 ke results"  icon="📋" keyword="result-2024" /></EB>} />
        <Route path="/publication/examination-results/2023" element={<EB><PublicationPage type="result"   title="Exam Results 2023" subtitle="Academic year 2022-23 ke results"  icon="📋" keyword="result-2023" /></EB>} />
        <Route path="/publication/sss-report/2023-24"       element={<EB><PublicationPage type="sss"      title="SSS Report 2023-24" subtitle="Student Satisfaction Survey"      icon="📊" keyword="sss-2023-24" /></EB>} />
        <Route path="/publication/sss-report/2022-23"       element={<EB><PublicationPage type="sss"      title="SSS Report 2022-23" subtitle="Student Satisfaction Survey"      icon="📊" keyword="sss-2022-23" /></EB>} />

        {/* ══ GALLERY / NEWS ══ */}
        <Route path="/gallery"               element={<EB><GalleryPage gallery={gallery} /></EB>} />
        <Route path="/gallery/photos"        element={<EB><GalleryPage gallery={gallery} /></EB>} />
        <Route path="/gallery/photo-gallery" element={<EB><GalleryPage gallery={gallery} /></EB>} />
        <Route path="/video-gallery"         element={<EB><VideoGallery /></EB>} />
        <Route path="/gallery/videos"        element={<EB><VideoGallery /></EB>} />
        <Route path="/gallery/video-gallery" element={<EB><VideoGallery /></EB>} />
        <Route path="/news"          element={<EB><NewsPage /></EB>} />
        <Route path="/notifications" element={<EB><NotificationsPage /></EB>} />
        <Route path="/documents"     element={<EB><DocumentsPage /></EB>} />
        <Route path="/events"        element={<EB><EventsPage /></EB>} />

        {/* ══ ADMIN ══ */}
        <Route path="/admin" element={
          adminAuthed ? (
            <Suspense fallback={<div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center' }}>Loading Admin...</div>}>
              <AdminPanel notices={notices} announcements={announcements}
                events={events} gallery={gallery} faculties={faculties}
                onClose={handleAdminLogout} />
            </Suspense>
          ) : (
            <AdminLogin
              onSuccess={handleAdminLogin}
              onClose={() => { window.location.hash = '/'; }}
            />
          )
        } />
      </Routes>

      {!isAdminRoute && (
        <>
          <Footer />
          <button onClick={handleOpenAdminTab} title="Open Admin Panel"
            style={{ position:'fixed', bottom:25, right:25, background:COLORS.navy,
              color:'#fff', border:`3px solid ${COLORS.gold}`, borderRadius:'50%',
              width:60, height:60, cursor:'pointer', zIndex:500, fontSize:24 }}>
            ⚙️
          </button>
        </>
      )}
    </>
  );
}