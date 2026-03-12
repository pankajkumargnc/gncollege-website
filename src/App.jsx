// src/App.jsx
// ✅ FINAL MASTER CODE: About Us, Staff Fix, Gallery & Admin Sync
import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';

// Layout & Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopBar from './components/home/TopBar';
import Breadcrumbs from './components/Breadcrumbs';
import QuickActionNav from './components/QuickActionNav';
import { COLORS } from './styles/colors';

// Static Data & Firebase
import { navLinks as staticNavLinks } from './data/db';
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { db } from './firebase';

// Pages
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import StaffPage from './pages/StaffPage';
import DepartmentPage from './pages/DepartmentPage';
import GalleryPage from './pages/GalleryPage';
import VideoGallery from './pages/VideoGallery';
import { CollegeProfile, VisionMission, CommitteePage } from './pages/AboutPages';
import { AdmissionRule, FeeStructure } from './pages/AdmissionPages';
import { Syllabus } from './pages/AcademicsPages';

// Lazy Components
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const Ticker = lazy(() => import('./components/Ticker'));

export default function App() {
  const [notices, setNotices] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [videoGallery, setVideoGallery] = useState([]);
  const [faculties, setFaculties] = useState([]); // Teaching/Non-Teaching Data
  const [sliderSlides, setSliderSlides] = useState([]);
  const [firebaseNav, setFirebaseNav] = useState(null);
  
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // AOS & Initial Load
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  // 1. Navbar Sync
  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'navbar'), snap => {
      if (snap.exists() && snap.data().links) setFirebaseNav(snap.data().links);
    });
  }, []);

  // 2. Real-time Data Sync (Firebase)
  useEffect(() => {
    const collections = [
      ['notices', setNotices],
      ['announcements', setAnnouncements],
      ['events', setEvents],
      ['gallery', setGallery],
      ['videoGallery', setVideoGallery],
      ['faculties', setFaculties], // Staff Page ke liye
      ['sliderSlides', setSliderSlides]
    ];

    const unsubs = collections.map(([col, setter]) => {
      const q = query(collection(db, col), orderBy('createdAt', 'desc'));
      return onSnapshot(q, snap => setter(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    });

    return () => unsubs.forEach(u => u());
  }, []);

  const baseNavLinks = firebaseNav || staticNavLinks;

  const handleOpenAdminTab = () => {
    window.open(`${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}/#/admin`, '_blank');
  };

  return (
    <>
      <Toaster position="top-right" />
      
      {!isAdminRoute && (
        <>
          <TopBar />
          <Suspense fallback={<div style={{ height: '40px' }} />}><Ticker items={notices} /></Suspense>
          <Navbar onAdminClick={handleOpenAdminTab} navLinks={baseNavLinks} />
          <Breadcrumbs />
          <QuickActionNav />
        </>
      )}

      <Routes>
        {/* ── HOME & MAIN ── */}
        <Route path="/" element={
          <HomePage 
            notices={notices} 
            announcements={announcements} 
            sliderSlides={sliderSlides} 
            events={events} 
            gallery={gallery} 
            videoGallery={videoGallery} 
          />
        } />
        <Route path="/contact" element={<Contact />} />

        {/* ── 1. ABOUT US (Profile, Vision, Message) ── */}
        <Route path="/about-us/college-profile" element={<CollegeProfile />} />
        <Route path="/about-us/vision-mission" element={<VisionMission />} />
        
        {/* ── 3. VARIOUS COMMITTEES (Dynamic Pages) ── */}
        <Route path="/about-us/various-committees/womens-cell" element={<CommitteePage name="Women's Cell" desc="Safety and empowerment of female students." icon="👩‍💼" />} />
        <Route path="/about-us/various-committees/anti-ragging" element={<CommitteePage name="Anti-Ragging" desc="Maintaining a 100% ragging-free campus." icon="🚫" />} />
        <Route path="/about-us/various-committees/sc-st" element={<CommitteePage name="SC/ST Cell" desc="Welfare and support for SC/ST students." icon="🤝" />} />
        <Route path="/about-us/various-committees/obc" element={<CommitteePage name="OBC Cell" desc="Support for students from OBC communities." icon="📚" />} />
        <Route path="/about-us/various-committees/grievance" element={<CommitteePage name="Grievance Redressal" desc="Platform to address student/staff concerns." icon="⚖️" />} />
        <Route path="/about-us/various-committees/placement" element={<CommitteePage name="Placement Cell" desc="Training and career opportunities." icon="💼" />} />

        {/* ── 4. STAFF (Fixed: Passing Faculties Data) ── */}
        <Route path="/about-us/college-staff/:staffType" element={<StaffPage faculties={faculties} />} />

        {/* ── 5. REGULATIONS & OTHERS ── */}
        <Route path="/admission/rule" element={<AdmissionRule />} />
        <Route path="/admission/fee-structure" element={<FeeStructure />} />
        <Route path="/syllabus" element={<Syllabus />} />
        
        {/* ── GALLERY ── */}
        <Route path="/gallery" element={<GalleryPage gallery={gallery} />} />
        <Route path="/video-gallery" element={<VideoGallery videoGallery={videoGallery} />} />

        {/* ── ADMIN ── */}
        <Route path="/admin" element={
          <Suspense fallback={<div>Loading Admin...</div>}>
            <AdminPanel 
              notices={notices} 
              announcements={announcements} 
              events={events} 
              gallery={gallery} 
              faculties={faculties} 
            />
          </Suspense>
        } />
      </Routes>

      {!isAdminRoute && (
        <>
          <Footer />
          <button 
            onClick={handleOpenAdminTab} 
            style={{ position:'fixed', bottom:25, right:25, background:COLORS.navy, color:'#fff', border:`3px solid ${COLORS.gold}`, borderRadius:'50%', width:60, height:60, cursor:'pointer', zIndex:500, fontSize:24 }}
          >⚙️</button>
        </>
      )}
    </>
  );
}