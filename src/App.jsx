// src/App.jsx — FINAL MERGE VERSION (With Hardcoded Sub-menus & Partial PDF Embed)

import WhatsAppButton      from './components/WhatsAppButton';
import BackToTop           from './components/BackToTop';
import { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster }         from 'react-hot-toast';
import AlertBanner         from './components/AlertBanner';
import Ticker              from './components/Ticker';

import PageViewer          from './components/PageViewer';
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

// ── 🛡️ SMART LAZY LOADER ─────────────────────────────────────────────────────
const safeLazy = (importFunction) => {
  return lazy(() =>
    importFunction().catch((error) => {
      if (error.message.includes('fetch') || error.message.includes('module')) {
        window.location.reload();
      }
      return Promise.reject(error);
    })
  );
};

// ── Lazy pages ───────────────────────────────────────────────────────────────
const StaffPage         = safeLazy(() => import('./pages/StaffPage'));
const DepartmentPage    = safeLazy(() => import('./pages/DepartmentPage'));
const GalleryPage       = safeLazy(() => import('./pages/GalleryPage'));
const VideoGallery      = safeLazy(() => import('./pages/VideoGallery'));
const CollegeProfile    = safeLazy(() => import('./pages/CollegeProfile'));
const LeadershipPage    = safeLazy(() => import('./pages/LeadershipPage'));
const NewsPage          = safeLazy(() => import('./pages/NewsPage'));
const NotificationsPage = safeLazy(() => import('./pages/NotificationsPage'));
const DocumentsPage     = safeLazy(() => import('./pages/DocumentsPage'));
const EventsPage        = safeLazy(() => import('./pages/EventsPage'));

const AdminPanel        = safeLazy(() => import('./components/admin/AdminPanel'));
const EmbeddedPDFPage   = safeLazy(() => import('./pages/EmbeddedPDFPage'));

// ── Named export lazy helpers ────────────────────────────────────────────────
const LazyAbout       = n => safeLazy(() => import('./pages/AboutPages').then(m => ({ default: m[n] })));
const LazyAcademics   = n => safeLazy(() => import('./pages/AcademicsPages').then(m => ({ default: m[n] })));
const LazyAdmission   = n => safeLazy(() => import('./pages/AdmissionPages').then(m => ({ default: m[n] })));
const LazyNaac        = n => safeLazy(() => import('./pages/NaacPages').then(m => ({ default: m[n] })));
const LazyPublication = n => safeLazy(() => import('./pages/PublicationPages').then(m => ({ default: m[n] })));
const LazyActivity    = n => safeLazy(() => import('./pages/ActivityPages').then(m => ({ default: m[n] })));
const LazyCampus      = n => safeLazy(() => import('./pages/CampusPages').then(m => ({ default: m[n] })));

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
  const [updates,       setUpdates]       = useState([]);
  const [notices,       setNotices]       = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events,        setEvents]        = useState([]);
  const [gallery,       setGallery]       = useState([]);
  const [faculties,     setFaculties]     = useState([]);
  const [sliderSlides,  setSliderSlides]  = useState([]);
  const [navLinks,      setNavLinks]      = useState([]);

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
  };

  const location     = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') ||
    window.location.hash.startsWith('#/admin');

  // ── Jodit CSS — sirf /admin route pe load karo ──────────────────────────
  useEffect(() => {
    if (!isAdminRoute) return;

    if (document.querySelector('link[data-jodit-css]')) return;

    const link    = document.createElement('link');
    link.rel      = 'stylesheet';
    link.type     = 'text/css';
    link.setAttribute('data-jodit-css', 'true');

    link.onerror  = () => {
      const cdn     = document.createElement('link');
      cdn.rel       = 'stylesheet';
      cdn.type      = 'text/css';
      cdn.href      = 'https://cdnjs.cloudflare.com/ajax/libs/jodit/4.0.0-beta.76/jodit.min.css';
      cdn.setAttribute('data-jodit-css', 'true');
      document.head.appendChild(cdn);
    };

    const allLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    const joditLink = allLinks.find(l => l.href.includes('vendor-ad') || l.href.includes('jodit'));

    if (joditLink) return;

    import('jodit-react').catch(() => {});

    return () => {
      const el = document.querySelector('link[data-jodit-css]');
      if (el) el.remove();
    };
  }, [isAdminRoute]);

  // ── Firebase listeners ───────────────────────────────────────────────────
  useEffect(() => {
    const qNav = query(collection(db, 'navigation'), orderBy('order', 'asc'));
    const unsubNav = onSnapshot(qNav, snap => {
      const flatMenus = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      const buildNavTree = (parentId) => {
        const children = flatMenus.filter(m => (m.parentId || null) === (parentId || null));
        if (children.length === 0) return null;
        return children.map(child => ({
          label: child.label,
          href: child.href,
          sub: buildNavTree(child.id)
        }));
      };

      const finalTree = buildNavTree(null);
      setNavLinks(finalTree || []);
    });
    return () => unsubNav();
  }, []);

  useEffect(() => {
    const cols = [
      ['notices',       setNotices],
      ['announcements', setAnnouncements],
      ['events',        setEvents],
      ['gallery',       setGallery],
      ['faculties',     setFaculties],
      ['sliderSlides',  setSliderSlides],
      ['updates',       setUpdates], 
    ];
    const unsubs = cols.map(([col, setter]) => {
      return onSnapshot(collection(db, col),
        snap => {
          const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          docs.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
          setter(docs);
        },
        err  => console.error(`[${col}] fetching error:`, err)
      );
    });
    return () => unsubs.forEach(u => u());
  }, []);

  // 🚀 SMART DEEP MERGE & HARDCODE INJECTION
  const baseNavLinks = useMemo(() => {
    let combinedLinks = [...staticNavLinks];

    // 1. Menu Builder Merging
    if (navLinks && navLinks.length > 0) {
      navLinks.forEach(dynamicLink => {
        const existingIndex = combinedLinks.findIndex(staticLink => staticLink.label.trim().toLowerCase() === dynamicLink.label.trim().toLowerCase());
        
        if (existingIndex >= 0) {
          const existingSub = combinedLinks[existingIndex].sub || [];
          const dynamicSub = dynamicLink.sub || [];
          
          let mergedSub = [...existingSub];
          
          dynamicSub.forEach(dSub => {
            const subIdx = mergedSub.findIndex(eSub => eSub.label.trim().toLowerCase() === dSub.label.trim().toLowerCase());
            if (subIdx >= 0) {
              const eL3 = mergedSub[subIdx].sub || [];
              const dL3 = dSub.sub || [];
              let mergedL3 = [...eL3];
              
              dL3.forEach(dItem => {
                const l3Idx = mergedL3.findIndex(eItem => eItem.label.trim().toLowerCase() === dItem.label.trim().toLowerCase());
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
    const aboutIdx = combinedLinks.findIndex(l => l.label.toLowerCase() === 'about us');
    if (aboutIdx >= 0) {
      let aboutSub = combinedLinks[aboutIdx].sub || [];
      
      // Ensure "College Management" Category exists
      let mgmtIdx = aboutSub.findIndex(s => s.label.toLowerCase() === 'college management');
      if (mgmtIdx === -1) {
        aboutSub.push({ label: 'College Management', sub: [] });
        mgmtIdx = aboutSub.length - 1;
      }
      
      let mgmtSub = aboutSub[mgmtIdx].sub || [];
      
      // Inject missing submenus automatically
      if (!mgmtSub.some(s => s.label.toLowerCase() === 'governing body')) {
        mgmtSub.push({ label: 'Governing Body', href: '/about-us/governing-body' });
      }
      if (!mgmtSub.some(s => s.label.toLowerCase() === 'staff council')) {
        mgmtSub.push({ label: 'Staff Council', href: '/about-us/staff-council' });
      }
      
      aboutSub[mgmtIdx].sub = mgmtSub;
      combinedLinks[aboutIdx].sub = aboutSub;
    }

    // 3. Keep Gallery Fallback
    return combinedLinks.map(link =>
      link.label === 'Gallery' && (!link.sub || link.sub.length === 0)
        ? { ...link, href: '/gallery', sub: [
            { label: 'Photo Gallery', href: '/gallery/photos' },
            { label: 'Video Gallery', href: '/gallery/videos' },
          ]}
        : link
    );
  }, [navLinks]);

  const handleOpenAdminTab = () =>
    window.open(`${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}/#/admin`, '_blank');

  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: 999999 }}
        toastOptions={{
          duration: 3500,
          style: { fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '14px', borderRadius: '12px', padding: '14px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' },
          success: { style: { background: '#0f2347', color: '#fff', border: '1.5px solid #f4a023' }, iconTheme: { primary: '#f4a023', secondary: '#0f2347' } },
          error: { style: { background: '#fff0f0', color: '#b91c1c', border: '1.5px solid #f87171' } },
        }}
      />

      {!isAdminRoute && (
        <>
          <AlertBanner /> 
          <TopBar />
          <ErrorBoundary>
            <Suspense fallback={<div style={{ height: 40 }} />}>
              <Ticker items={notices} /> 
            </Suspense>
          </ErrorBoundary>
          <Navbar onAdminClick={handleOpenAdminTab} navLinks={baseNavLinks} />
          <Breadcrumbs />
          <QuickActionNav />
        </>
      )}

      <main id="main-content">
        <Routes>
          <Route path="/" element={<EB><HomePage notices={notices} announcements={announcements} sliderSlides={sliderSlides} events={events} gallery={gallery} updates={updates}/></EB>} />
          <Route path="/contact" element={<EB><Contact /></EB>} />

          {/* About */}
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
          
          {/* Regulations (Embedded PDFs) */}
          <Route path="/about-us/regulations/college-affiliation" element={<R el={<EmbeddedPDFPage title="College Affiliation" subtitle="B.B.M.K.U. Affiliation Papers" pdfUrl="docs/affiliation.pdf" />} />} />
          <Route path="/about-us/regulations/ugc-section" element={<R el={<EmbeddedPDFPage title="UGC Section 2(f) & 12(B)" subtitle="University Grants Commission" pdfUrl="docs/ugc_section.pdf" />} />} />
          <Route path="/about-us/regulations/byelaws" element={<R el={<EmbeddedPDFPage title="College ByeLaws" subtitle="Rules & Regulations" pdfUrl="docs/byelaws.pdf" />} />} />
          <Route path="/about-us/regulations/exemption" element={<R el={<EmbeddedPDFPage title="Exemption Document" subtitle="Official Notice" pdfUrl="docs/exemption.pdf" />} />} />

          <Route path="/about-us/regulations/bbmku/special-ug-regulation" element={<R el={<EmbeddedPDFPage title="Special UG Regulation" subtitle="B.B.M.K. University" pdfUrl="docs/bbmku_special_ug.pdf" />} />} />
          <Route path="/about-us/regulations/bbmku/ug-regulation-fyugp" element={<R el={<EmbeddedPDFPage title="UG Regulation FYUGP" subtitle="B.B.M.K. University" pdfUrl="docs/bbmku_fyugp.pdf" />} />} />
          <Route path="/about-us/regulations/bbmku/ug-regulation-cbcs" element={<R el={<EmbeddedPDFPage title="UG Regulation CBCS" subtitle="B.B.M.K. University" pdfUrl="docs/bbmku_cbcs.pdf" />} />} />

          <Route path="/about-us/regulations/vbu/ug-regulation-2015" element={<R el={<EmbeddedPDFPage title="UG Regulation 2015" subtitle="V.B.U. Hazaribag" pdfUrl="docs/vbu_ug_2015.pdf" />} />} />
          <Route path="/about-us/regulations/vbu/bca-regulation" element={<R el={<EmbeddedPDFPage title="BCA Regulation" subtitle="V.B.U. Hazaribag" pdfUrl="docs/vbu_bca.pdf" />} />} />

          {/* Campus */}
          <Route path="/campus/visuals/bhuda"               element={<R el={<CampusVisuals title="Bhuda Campus"        categoryId="bhuda"      desc="Bhuda campus ki photos"        />} />} />
          <Route path="/campus/visuals/bank-more"           element={<R el={<CampusVisuals title="Bank More Campus"    categoryId="bank-more"  desc="Bank More campus ki photos"    />} />} />
          <Route path="/campus/visuals/vocational-building" element={<R el={<CampusVisuals title="Vocational Building" categoryId="vocational" desc="Vocational building ki photos" />} />} />
          <Route path="/campus/infrastructure"              element={<R el={<Infrastructure />} />} />
          <Route path="/campus/classroom"                   element={<R el={<Classrooms />} />} />
          <Route path="/campus/ict-rooms"                   element={<R el={<IctRooms />} />} />
          <Route path="/campus/green-campus"                element={<R el={<GreenCampus />} />} />

          {/* Academics */}
          <Route path="/academics/iqac"                  element={<R el={<IqacPage />} />} />
          <Route path="/academics/course-offered"        element={<R el={<CourseOffered />} />} />
          <Route path="/academics/departments"           element={<R el={<DepartmentPage />} />} />
          <Route path="/academics/departments/:deptSlug" element={<R el={<DepartmentPage />} />} />
          <Route path="/syllabus"                        element={<R el={<Syllabus />} />} />
          <Route path="/academics/academic-calendar"     element={<R el={<AcademicCalendar />} />} />

          {/* Admission */}
          <Route path="/admission/rule"                  element={<R el={<AdmissionRule />} />} />
          <Route path="/admission/document-required"     element={<R el={<DocumentRequired />} />} />
          <Route path="/admission/fee-structure"         element={<R el={<FeeStructure />} />} />
          <Route path="/admission/notification/latest"   element={<R el={<AdmissionNotif type="latest"   title="Latest Notifications"  />} />} />
          <Route path="/admission/notification/upcoming" element={<R el={<AdmissionNotif type="upcoming" title="Upcoming Notifications" />} />} />
          <Route path="/admission/intake-capacity"       element={<R el={<IntakeCapacity />} />} />

          {/* Activity */}
          <Route path="/activity/nss"                            element={<R el={<NssPage />} />} />
          <Route path="/activity/ncc"                            element={<R el={<NccPage />} />} />
          <Route path="/activity/workshop"                       element={<R el={<WorkshopPage />} />} />
          <Route path="/activity/games-sports"                   element={<R el={<SportsPage />} />} />
          <Route path="/activity/collaboration/rotaract-club"    element={<R el={<RotaractClub />} />} />
          <Route path="/activity/collaboration/sadbhavana-diwas" element={<R el={<SadbhavanaDiwas />} />} />

          {/* NAAC */}
          <Route path="/naac/ssr-1st-cycle/cycle-1-documents" element={<R el={<SsrCyclePage cycle={1} />} />} />
          <Route path="/naac/ssr-1st-cycle/peer-team-report"  element={<R el={<SsrCyclePage cycle={1} />} />} />
          <Route path="/naac/ssr-2nd-cycle/cycle-2-documents" element={<R el={<SsrCyclePage cycle={2} />} />} />
          <Route path="/naac/ssr-2nd-cycle/executive-summary" element={<R el={<SsrCyclePage cycle={2} />} />} />
          <Route path="/naac/aqar"             element={<R el={<AqarPage />} />} />
          <Route path="/naac/nirf"             element={<R el={<NirfPage />} />} />
          <Route path="/naac/perspective-plan" element={<R el={<PerspectivePlan />} />} />

          {/* Publication */}
          <Route path="/publication/college-library"          element={<R el={<LibraryPage />} />} />
          <Route path="/publication/e-magazine"               element={<R el={<PublicationPage type="magazine" title="E-Magazine"        subtitle="College ki digital publications"  icon="📰" keyword="magazine"    />} />} />
          <Route path="/publication/examination-results/2024" element={<R el={<PublicationPage type="result"   title="Exam Results 2024" subtitle="Academic year 2023-24 ke results" icon="📋" keyword="result-2024" />} />} />
          <Route path="/publication/examination-results/2023" element={<R el={<PublicationPage type="result"   title="Exam Results 2023" subtitle="Academic year 2022-23 ke results" icon="📋" keyword="result-2023" />} />} />
          <Route path="/publication/sss-report/2023-24"       element={<R el={<PublicationPage type="sss"      title="SSS Report 2023-24" subtitle="Student Satisfaction Survey"     icon="📊" keyword="sss-2023-24" />} />} />
          <Route path="/publication/sss-report/2022-23"       element={<R el={<PublicationPage type="sss"      title="SSS Report 2022-23" subtitle="Student Satisfaction Survey"     icon="📊" keyword="sss-2022-23" />} />} />

          {/* Gallery / News */}
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
          
          <Route path="/p/:slug" element={<PageViewer />} />

          {/* Admin */}
          <Route path="/admin" element={
            adminAuthed ? (
              <Suspense fallback={<div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center' }}><PageLoader /></div>}>
                <AdminPanel notices={notices} announcements={announcements} events={events} gallery={gallery} faculties={faculties} onClose={handleAdminLogout} />
              </Suspense>
            ) : (
              <AdminLogin onSuccess={handleAdminLogin} onClose={() => { window.location.hash = '/'; }} />
            )
          } />
        </Routes>
      </main>

      {!isAdminRoute && (
        <>
          <Footer dynamicSocialLinks={navLinks} />
          <WhatsAppButton />
          <BackToTop />
          
          <button onClick={handleOpenAdminTab} title="Open Admin Panel" style={{ position: 'fixed', bottom: 'clamp(16px, 3vw, 25px)', right: 'clamp(16px, 3vw, 25px)', background: COLORS.navy, color: '#fff', border: `3px solid ${COLORS.gold}`, borderRadius: '50%', width: 'clamp(48px, 6vw, 60px)', height: 'clamp(48px, 6vw, 60px)', cursor: 'pointer', zIndex: 500, fontSize: 'clamp(18px, 2.5vw, 24px)', flexShrink: 0 }}>⚙️</button>
        </>
      )}
    </>
  );
}