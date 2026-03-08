import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';

// 🌟 AOS ANIMATION IMPORTS
import AOS from 'aos';
import 'aos/dist/aos.css';

import { sliderSlides, navLinks as staticNavLinks } from './data/db';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import Ticker from './components/Ticker';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopBar from './components/home/TopBar';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { COLORS } from './styles/colors';
import Breadcrumbs from './components/Breadcrumbs';
import QuickActionNav from './components/QuickActionNav';
import PageViewer from './components/PageViewer'; 
import Contact from './pages/Contact'; 
import CollegeProfile from './pages/CollegeProfile';

// FIREBASE IMPORTS
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

const placeholderPaths = [
  '/syllabus', '/about-us', '/about-us/vision-mission', 
  '/about-us/principal-message', '/about-us/college-management/organogram', 
  '/about-us/college-management/presidents', '/about-us/college-management/secretaries', 
  '/about-us/college-management/principal', '/about-us/various-committees/womens-cell', 
  '/about-us/various-committees/anti-ragging', '/about-us/various-committees/sc-st', 
  '/about-us/various-committees/obc', '/about-us/various-committees/grievance', 
  '/about-us/various-committees/icc', '/about-us/various-committees/minority', 
  '/about-us/various-committees/placement', '/about-us/various-committees/rusa', 
  '/about-us/college-staff/teaching-staff', '/about-us/college-staff/non-teaching-staff', 
  '/about-us/regulations/bbmku/special-ug-regulation', '/about-us/regulations/bbmku/ug-regulation-fyugp', 
  '/about-us/regulations/bbmku/ug-regulation-cbcs', '/about-us/regulations/college-affiliation', 
  '/about-us/regulations/ugc-section', '/about-us/regulations/vbu/ug-regulation-2015', 
  '/about-us/regulations/vbu/bca-regulation', '/about-us/regulations/byelaws', 
  '/about-us/regulations/exemption', '/about-us/audit-report', '/campus/visuals/bhuda', 
  '/campus/visuals/bank-more', '/campus/visuals/vocational-building', '/campus/infrastructure', 
  '/campus/classroom', '/campus/ict-rooms', '/campus/green-campus', '/academics/iqac', 
  '/academics/course-offered', '/academics/departments/humanities', '/academics/departments/social-science', 
  '/academics/departments/commerce', '/academics/departments/bca', '/academics/departments/bba', 
  '/academics/academic-calendar', '/admission/rule', '/admission/document-required', 
  '/admission/fee-structure', '/admission/notification/latest', '/admission/notification/upcoming', 
  '/admission/intake-capacity', '/activity/nss', '/activity/ncc', '/activity/workshop', 
  '/activity/games-sports', '/activity/collaboration/rotaract-club', '/activity/collaboration/sadbhavana-diwas', 
  '/naac/ssr-1st-cycle/cycle-1-documents', '/naac/ssr-1st-cycle/peer-team-report', 
  '/naac/ssr-2nd-cycle/cycle-2-documents', '/naac/ssr-2nd-cycle/executive-summary', 
  '/naac/aqar', '/naac/nirf', '/naac/perspective-plan', '/publication/college-library', 
  '/publication/e-magazine', '/publication/examination-results/2024', 
  '/publication/examination-results/2023', '/publication/sss-report/2023-24', 
  '/publication/sss-report/2022-23', '/gallery'
];

const DynamicPageRoute = ({ pages }) => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (pages && slug) {
      const foundPage = pages.find(p => p.slug === slug);
      setPage(foundPage);
    }
  }, [slug, pages]);

  if (!pages || pages.length === 0) return <div style={{ padding: '40px 20px', textAlign: 'center' }}>Loading pages...</div>;
  return <PageViewer page={page} />;
};

// 🌟 FIX: navLinks prop yahan pass kiya gaya hai
const AdminRouteWrapper = ({ notices, announcements, events, gallery, pdfReports, pages, placeholderPaths, navLinks }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isGncAdmin') === 'true');

  if (!isLoggedIn) {
    return <AdminLogin onSuccess={() => { setIsLoggedIn(true); localStorage.setItem('isGncAdmin', 'true'); }} onClose={() => window.close()} />;
  }

  // 🌟 FIX: AdminPanel ko navLinks diya gaya hai
  return <AdminPanel notices={notices} announcements={announcements} events={events} gallery={gallery} pdfReports={pdfReports} pages={pages} placeholderPaths={placeholderPaths} navLinks={navLinks} onClose={() => { setIsLoggedIn(false); localStorage.removeItem('isGncAdmin'); window.close(); }} />;
};

const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

export default function App() {
  const [notices, setNotices]             = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents]               = useState([]);
  const [gallery, setGallery]             = useState([]);
  const [pdfReports, setPdfReports]       = useState([]);
  const [pages, setPages]                 = useState([]);

  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: false, mirror: true, offset: 50 });
  }, []);

  const dynamicNavLinks = useMemo(() => {
    const newPages = pages.filter(p => p.slug && !p.path).sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)).map(p => ({ label: p.title, href: `/p/${p.slug}` }));
    const linksCopy = JSON.parse(JSON.stringify(staticNavLinks));
    if (newPages.length > 0) {
      const moreMenu = { label: "More", href: "#", sub: newPages };
      const galleryIndex = linksCopy.findIndex(link => link.label === 'Gallery');
      linksCopy.splice(galleryIndex > -1 ? galleryIndex : linksCopy.length - 1, 0, moreMenu);
    }
    return linksCopy;
  }, [pages]);

  const pageContentByPath = useMemo(() => {
    const map = new Map();
    const sortedPages = [...pages].sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
    sortedPages.forEach(p => { if (p.path && !map.has(p.path)) { map.set(p.path, p); } });
    return map;
  }, [pages]);

  useEffect(() => {
    const collections = [['notices', setNotices], ['announcements', setAnnouncements], ['events', setEvents], ['gallery', setGallery], ['pdfReports', setPdfReports], ['pages', setPages]];
    const unsubscribers = collections.map(([colName, setter]) => {
      const q = query(collection(db, colName), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const dataArr = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setter(dataArr);
      });
    });
    return () => unsubscribers.forEach(unsub => unsub());
  }, []);
  
  const handleOpenAdminTab = () => { window.open('#/admin', '_blank'); };

  const tickerItems = [...notices.slice(0, 3), ...announcements.slice(0, 2)].map(item => ({
    ...item,
    text: stripHtml(item.text || item.title)
  }));

  return (
    <>
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={12}
        containerStyle={{ top: 20, right: 20, zIndex: 999999 }}
        toastOptions={{
          style: { background: 'rgba(15, 35, 71, 0.85)', backdropFilter: 'blur(12px)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '600' },
          success: { icon: '✅', duration: 3000 },
          error: { icon: '❌', duration: 4000 },
        }}
      />
      <div className={`splash-screen ${!showSplash ? 'hide' : ''}`}>
        <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Guru Nanak College" className="splash-logo" />
        <div className="splash-text">Loading Portal...</div>
      </div>

      {!isAdminRoute && (
        <>
          <TopBar />
          <Ticker items={tickerItems} />
          <Navbar onAdminClick={handleOpenAdminTab} navLinks={dynamicNavLinks} />
          <Breadcrumbs />
          {!isMobile && <QuickActionNav />}
        </>
      )}
      
      <div key={location.pathname} className={isAdminRoute ? "" : "page-transition"}>
        <Routes location={location}>
          <Route path="/" element={<HomePage notices={notices} announcements={announcements} pdfReports={pdfReports} sliderSlides={sliderSlides} events={events} gallery={gallery} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us/college-profile" element={<CollegeProfile />} />
          {/* 🌟 FIX: navLinks yahan pass kiya gaya hai */}
          <Route path="/admin" element={ <AdminRouteWrapper notices={notices} announcements={announcements} events={events} gallery={gallery} pdfReports={pdfReports} pages={pages} placeholderPaths={placeholderPaths} navLinks={dynamicNavLinks} /> } />
          <Route path="/p/:slug" element={<DynamicPageRoute pages={pages} />} />
          {placeholderPaths.map(path => {
            const page = pageContentByPath.get(path);
            return <Route key={path} path={path} element={<PageViewer page={page} />} />;
          })}
        </Routes>
      </div>

      {!isAdminRoute && (
        <>
          <Footer />
          <button onClick={handleOpenAdminTab} style={{ position: 'fixed', bottom: 25, right: 25, background: COLORS.navy, color: '#fff', border: `3px solid ${COLORS.gold}`, borderRadius: '50%', width: 60, height: 60, cursor: 'pointer', zIndex: 500 }}>
            <span style={{ fontSize: 18 }}>⚙️</span>
          </button>
        </>
      )}
    </>
  )
}