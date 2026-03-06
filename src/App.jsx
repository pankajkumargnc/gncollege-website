import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { sliderSlides, navLinks as staticNavLinks } from './data/db';
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

// FIREBASE IMPORTS
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

const placeholderPaths = [
  '/about-us/college-profile',
  '/syllabus',
  '/about-us', '/about-us/vision-mission', '/about-us/principal-message',
  '/about-us/college-management/organogram', '/about-us/college-management/presidents',
  '/about-us/college-management/secretaries', '/about-us/college-management/principal',
  '/about-us/various-committees/womens-cell', '/about-us/various-committees/anti-ragging',
  '/about-us/various-committees/sc-st', '/about-us/various-committees/obc',
  '/about-us/various-committees/grievance', '/about-us/various-committees/icc',
  '/about-us/various-committees/minority', '/about-us/various-committees/placement',
  '/about-us/various-committees/rusa', '/about-us/college-staff/teaching-staff',
  '/about-us/college-staff/non-teaching-staff', '/about-us/regulations/bbmku/special-ug-regulation',
  '/about-us/regulations/bbmku/ug-regulation-fyugp', '/about-us/regulations/bbmku/ug-regulation-cbcs',
  '/about-us/regulations/college-affiliation', '/about-us/regulations/ugc-section',
  '/about-us/regulations/vbu/ug-regulation-2015', '/about-us/regulations/vbu/bca-regulation',
  '/about-us/regulations/byelaws', '/about-us/regulations/exemption', '/about-us/audit-report',
  '/campus/visuals/bhuda', '/campus/visuals/bank-more', '/campus/visuals/vocational-building',
  '/campus/infrastructure', '/campus/classroom', '/campus/ict-rooms', '/campus/green-campus',
  '/academics/iqac', '/academics/course-offered', '/academics/departments/humanities',
  '/academics/departments/social-science', '/academics/departments/commerce',
  '/academics/departments/bca', '/academics/departments/bba', '/academics/academic-calendar',
  '/admission/rule', '/admission/document-required', '/admission/fee-structure',
  '/admission/notification/latest', '/admission/notification/upcoming', '/admission/intake-capacity',
  '/activity/nss', '/activity/ncc', '/activity/workshop', '/activity/games-sports',
  '/activity/collaboration/rotaract-club', '/activity/collaboration/sadbhavana-diwas',
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

  if (!pages || pages.length === 0) {
    return <div style={{ padding: '40px 20px', textAlign: 'center' }}>Loading pages...</div>;
  }

  return <PageViewer page={page} />;
};

// 🌟 NAYA COMPONENT: Sirf "New Tab" wale Admin Panel ke liye
const AdminRouteWrapper = ({ notices, announcements, events, gallery, pdfReports, pages, placeholderPaths }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isGncAdmin') === 'true');

  if (!isLoggedIn) {
    return <AdminLogin 
      onSuccess={() => { setIsLoggedIn(true); localStorage.setItem('isGncAdmin', 'true'); }} 
      onClose={() => window.close()} // Close dabane par naya tab band ho jayega
    />;
  }

  return <AdminPanel 
    notices={notices} announcements={announcements} events={events} 
    gallery={gallery} pdfReports={pdfReports} pages={pages} 
    placeholderPaths={placeholderPaths} 
    onClose={() => { setIsLoggedIn(false); localStorage.removeItem('isGncAdmin'); window.close(); }} // Logout par tab band
  />;
};

export default function App() {
  const [notices, setNotices]             = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents]               = useState([]);
  const [gallery, setGallery]             = useState([]);
  const [pdfReports, setPdfReports]       = useState([]);
  const [pages, setPages]                 = useState([]);

  const dynamicNavLinks = useMemo(() => {
    const newPages = pages
      .filter(p => p.slug && !p.path)
      .sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))
      .map(p => ({ label: p.title, href: `/p/${p.slug}` }));

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
    const sortedPages = [...pages].sort((a, b) => {
      return (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0);
    });
    sortedPages.forEach(p => {
      if (p.path && !map.has(p.path)) {
        map.set(p.path, p);
      }
    });
    return map;
  }, [pages]);

  useEffect(() => {
    const collections = [
      ['notices', setNotices], ['announcements', setAnnouncements],
      ['events', setEvents], ['gallery', setGallery],
      ['pdfReports', setPdfReports], ['pages', setPages]
    ];

    const unsubscribers = collections.map(([colName, setter]) => {
      const q = query(collection(db, colName), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const dataArr = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setter(dataArr);
      });
    });

    return () => unsubscribers.forEach(unsub => unsub());
  }, []);
  
  // 🌟 NAYA FUNCTION: Jo naya tab kholta hai
  const handleOpenAdminTab = () => {
    // '_blank' ka matlab hai "Open in New Tab"
    window.open('#/admin', '_blank'); 
  };

  return (
    <>
      <TopBar />
      <Ticker items={[...notices.slice(0, 3), ...announcements.slice(0, 2)]} />
      {/* 🌟 Naya function yahan Navbar me pass kiya hai */}
      <Navbar onAdminClick={handleOpenAdminTab} navLinks={dynamicNavLinks} />
      <Breadcrumbs />
      <QuickActionNav />
      
      <Routes>
        <Route path="/" element={<HomePage notices={notices} announcements={announcements} pdfReports={pdfReports} sliderSlides={sliderSlides} events={events} gallery={gallery} />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* 🌟 NAYA ROUTE: Jab koi /admin par jayega tabhi admin panel khulega */}
        <Route path="/admin" element={
          <AdminRouteWrapper 
            notices={notices} announcements={announcements} events={events} 
            gallery={gallery} pdfReports={pdfReports} pages={pages} 
            placeholderPaths={placeholderPaths} 
          />
        } />
        
        <Route path="/p/:slug" element={<DynamicPageRoute pages={pages} />} />
        {placeholderPaths.map(path => {
          const page = pageContentByPath.get(path);
          return <Route key={path} path={path} element={<PageViewer page={page} />} />;
        })}
      </Routes>

      <Footer />
      
      {/* 🌟 Floating button bhi ab naya tab kholega */}
      <button 
        onClick={handleOpenAdminTab} 
        style={{ position: 'fixed', bottom: 25, right: 25, background: COLORS.navy, color: '#fff', border: `3px solid ${COLORS.gold}`, borderRadius: '50%', width: 60, height: 60, cursor: 'pointer', zIndex: 500 }}>
        ⚙️
      </button>
    </>
  )
}