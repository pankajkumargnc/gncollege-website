import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from "./ErrorBoundary";
import { PageViewerStandalone } from "./PageViewer";
import HomePage from "../pages/HomePage";
import Contact from "../pages/Contact";
import VideoLibrary from '../pages/VideoLibrary';
import AdminLogin from "./AdminLogin";

// ── 🛡️ SMART LAZY LOADER ─────────────────────────────────────────────────────
const safeLazy = (importFunction) => {
  return lazy(() =>
    importFunction().catch((error) => {
      if (error.message.includes("fetch") || error.message.includes("module")) {
        window.location.reload();
      }
      return Promise.reject(error);
    }),
  );
};

// ── Lazy pages ───────────────────────────────────────────────────────────────
const StaffPage = safeLazy(() => import("../pages/StaffPage"));
const DepartmentPage = safeLazy(() => import("../pages/DepartmentPage"));
const GalleryPage = safeLazy(() => import("../pages/GalleryPage"));
const VideoGallery = safeLazy(() => import("../pages/VideoGallery"));
const CollegeProfile = safeLazy(() => import("../pages/CollegeProfile"));
const LeadershipPage = safeLazy(() => import("../pages/LeadershipPage"));
const NewsPage = safeLazy(() => import("../pages/NewsPage"));
const NotificationsPage = safeLazy(() => import("../pages/NotificationsPage"));
const DocumentsPage = safeLazy(() => import("../pages/DocumentsPage"));
const EventsPage = safeLazy(() => import("../pages/EventsPage"));
const AdminPanel = safeLazy(() => import("./admin/AdminPanel"));
const EmbeddedPDFPage = safeLazy(() => import("../pages/EmbeddedPDFPage"));
const NotFoundPage = safeLazy(() => import("../pages/NotFoundPage"));
const RegulationsPage = safeLazy(() => import("../pages/RegulationsPage"));

// ── Named export lazy helpers ────────────────────────────────────────────────
const LazyAbout = (n) => safeLazy(() => import("../pages/AboutPages").then((m) => ({ default: m[n] })));
const LazyAcademics = (n) => safeLazy(() => import("../pages/AcademicsPages").then((m) => ({ default: m[n] })));
const LazyAdmission = (n) => safeLazy(() => import("../pages/AdmissionPages").then((m) => ({ default: m[n] })));
const LazyNaac = (n) => safeLazy(() => import("../pages/NaacPages").then((m) => ({ default: m[n] })));
const LazyPublication = (n) => safeLazy(() => import("../pages/PublicationPages").then((m) => ({ default: m[n] })));
const LazyActivity = (n) => safeLazy(() => import("../pages/ActivityPages").then((m) => ({ default: m[n] })));
const LazyCampus = (n) => safeLazy(() => import("../pages/CampusPages").then((m) => ({ default: m[n] })));

const VisionMission = LazyAbout("VisionMission");
const PrincipalMessage = LazyAbout("PrincipalMessage");
const Organogram = LazyAbout("Organogram");
const WomensCell = LazyAbout("WomensCell");
const AntiRagging = LazyAbout("AntiRagging");
const ScStCell = LazyAbout("ScStCell");
const ObcCell = LazyAbout("ObcCell");
const GrievanceCell = LazyAbout("GrievanceCell");
const IccCell = LazyAbout("IccCell");
const MinorityCell = LazyAbout("MinorityCell");
const PlacementCell = LazyAbout("PlacementCell");
const RusaCell = LazyAbout("RusaCell");
const GoverningBody = LazyAbout("GoverningBody");
const StaffCouncil = LazyAbout("StaffCouncil");

const IqacPage = LazyAcademics("IqacPage");
const CourseOffered = LazyAcademics("CourseOffered");
const Syllabus = LazyAcademics("Syllabus");
const AcademicCalendar = LazyAcademics("AcademicCalendar");

const AdmissionRule = LazyAdmission("AdmissionRule");
const DocumentRequired = LazyAdmission("DocumentRequired");
const FeeStructure = LazyAdmission("FeeStructure");
const AdmissionNotif = LazyAdmission("AdmissionNotification");
const IntakeCapacity = LazyAdmission("IntakeCapacity");

const SsrCyclePage = LazyNaac("SsrCyclePage");
const AqarPage = LazyNaac("AqarPage");
const NirfPage = LazyNaac("NirfPage");
const PerspectivePlan = LazyNaac("PerspectivePlan");

const LibraryPage = LazyPublication("LibraryPage");
const PublicationPage = LazyPublication("PublicationPage");

const NssPage = LazyActivity("NssPage");
const NccPage = LazyActivity("NccPage");
const WorkshopPage = LazyActivity("WorkshopPage");
const SportsPage = LazyActivity("SportsPage");
const RotaractClub = LazyActivity("RotaractClub");
const SadbhavanaDiwas = LazyActivity("SadbhavanaDiwas");

const CampusVisuals = LazyCampus("CampusVisuals");
const Infrastructure = LazyCampus("Infrastructure");
const Classrooms = LazyCampus("Classrooms");
const IctRooms = LazyCampus("IctRooms");
const GreenCampus = LazyCampus("GreenCampus");

const PageLoader = () => (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px', display: 'flex', flexDirection: 'column', gap: '30px', minHeight: '60vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <div className="premium-skeleton" style={{ width: 250, height: 40, borderRadius: 8 }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[...Array(6)].map((_, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div className="premium-skeleton" style={{ width: '100%', height: 200, borderRadius: 12 }}></div>
                    <div className="premium-skeleton" style={{ width: '80%', height: 20, borderRadius: 6 }}></div>
                    <div className="premium-skeleton" style={{ width: '60%', height: 16, borderRadius: 6 }}></div>
                </div>
            ))}
        </div>
    </div>
);

const PageViewer = safeLazy(() => import("./PageViewer"));

const EB = ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>;
const R = ({ el }) => (
    <Suspense fallback={<PageLoader />}>
        <EB>{el}</EB>
    </Suspense>
);

export default function AppRoutes({
    updates, notices, announcements, events, gallery, 
    faculties, testimonials, sliderSlides, navLinks, pdfReports,
    counterData, adminAuthed, handleAdminLogin, handleAdminLogout
}) {
    return (
        <Routes>
            <Route index element={
                <R el={
                    <HomePage 
                        updates={updates} 
                        notices={notices} 
                        announcements={announcements} 
                        events={events} 
                        gallery={gallery} 
                        testimonials={testimonials} 
                        sliderSlides={sliderSlides}
                        pdfReports={pdfReports}
                        counterData={counterData}
                    />
                } />
            } />
            <Route path="/contact" element={<R el={<Contact />} />} />
            
            {/* About Us */}
            <Route path="/about-us/college-profile" element={<R el={<CollegeProfile />} />} />
            <Route path="/about-us/vision-mission" element={<R el={<VisionMission />} />} />
            <Route path="/about-us/principal-message" element={<R el={<PrincipalMessage />} />} />
            <Route path="/about-us/governing-body" element={<R el={<GoverningBody />} />} />
            <Route path="/about-us/staff-council" element={<R el={<StaffCouncil />} />} />
            <Route path="/about-us/college-management/organogram" element={<R el={<Organogram />} />} />
            <Route path="/about-us/college-management/presidents" element={<R el={<LeadershipPage type="president" title="Presidents Over the Years" />} />} />
            <Route path="/about-us/college-management/secretaries" element={<R el={<LeadershipPage type="secretary" title="Secretaries Over the Years" />} />} />
            <Route path="/about-us/college-management/principal" element={<R el={<LeadershipPage type="principal" title="Principals Over the Years" />} />} />
            <Route path="/about-us/various-committees/womens-cell" element={<R el={<WomensCell />} />} />
            <Route path="/about-us/various-committees/anti-ragging" element={<R el={<AntiRagging />} />} />
            <Route path="/about-us/various-committees/sc-st" element={<R el={<ScStCell />} />} />
            <Route path="/about-us/various-committees/obc" element={<R el={<ObcCell />} />} />
            <Route path="/about-us/various-committees/grievance" element={<R el={<GrievanceCell />} />} />
            <Route path="/about-us/various-committees/icc" element={<R el={<IccCell />} />} />
            <Route path="/about-us/various-committees/minority" element={<R el={<MinorityCell />} />} />
            <Route path="/about-us/various-committees/placement" element={<R el={<PlacementCell />} />} />
            <Route path="/about-us/various-committees/rusa" element={<R el={<RusaCell />} />} />
            <Route path="/about-us/college-staff/:staffType" element={<R el={<StaffPage faculties={faculties} />} />} />
            
            {/* Regulations */}
            <Route path="/about-us/regulations" element={<R el={<RegulationsPage />} />} />
            <Route path="/about-us/regulations/bbmku-ug" element={<R el={<EmbeddedPDFPage title="BBMKU UG Regulation (CBCS)" subtitle="Academic Session 2020-23" pdfUrl="https://drive.google.com/file/d/118SXsMuxjsmGirmcrdE8mcJOMBWIs5Rm/view?usp=sharing" />} />} />
            <Route path="/about-us/regulations/bbmku-circular" element={<R el={<EmbeddedPDFPage title="BBMKU UG Circular" subtitle="Eligibility Criteria 2020-23" pdfUrl="https://drive.google.com/file/d/1Xavf4XBsfDF2imKwqaUavQwYOiC8kD7O/view?usp=sharing" />} />} />
            <Route path="/about-us/regulations/fyugp-nep" element={<R el={<EmbeddedPDFPage title="FYUGP NEP-2020" subtitle="State Universities of Jharkhand" pdfUrl="https://drive.google.com/file/d/17vs8HAt4sVtoi93fwyHSOyUH_ODytcJf/view?usp=sharing" />} />} />
            <Route path="/about-us/regulations/vbu-ug" element={<R el={<EmbeddedPDFPage title="VBU UG Regulation 2015" subtitle="Vinoba Bhave University" pdfUrl="https://drive.google.com/file/d/1sosYIf-txXl2_E6AftVIsc7WJIMJWoBU/view?usp=sharing" />} />} />
            <Route path="/about-us/regulations/vbu-bca" element={<R el={<EmbeddedPDFPage title="VBU BCA Regulation" subtitle="Vinoba Bhave University" pdfUrl="https://drive.google.com/file/d/1dibEXgbXjG9OpXn1-Nidvs6rxog75tHb/view?usp=sharing" />} />} />
            <Route path="/about-us/regulations/college-byelaws" element={<R el={<EmbeddedPDFPage title="Constitution & Byelaws" subtitle="Guru Nanak College, Dhanbad" pdfUrl="https://drive.google.com/file/d/1alRlJR1htK2fsXGDNDq9Qjv8HMY_1gGJ/view?usp=sharing" />} />} />
            <Route path="/about-us/regulations/college-affiliation" element={<R el={<EmbeddedPDFPage title="College Affiliation" subtitle="Guru Nanak College, Dhanbad" pdfUrl="https://drive.google.com/file/d/12N45R0hs58-Lni-vou5NQewwGXXqrTNV/view?usp=sharing" />} />} />
            <Route path="/about-us/regulations/ugc-certificate" element={<R el={<EmbeddedPDFPage title="UGC 2(f) & 12(B) Certificate" subtitle="University Grants Commission" pdfUrl="https://drive.google.com/file/d/1aGqVamrprvI8_mFN92gXSJRspwkCVrte/view?usp=sharing" />} />} />
            <Route path="/about-us/regulations/minority-exemption" element={<R el={<EmbeddedPDFPage title="Minority Exemption & Quota" subtitle="UGC Guidelines & Supreme Court" pdfUrl="https://drive.google.com/file/d/1zBn3_dL5dIZBV_tQEoxdUDbokuofeRfd/view?usp=sharing" />} />} />

            {/* Campus */}
            <Route path="/campus/visuals/bhuda" element={<R el={<CampusVisuals title="Bhuda Campus" categoryId="bhuda" desc="Bhuda campus ki photos" />} />} />
            <Route path="/campus/visuals/bank-more" element={<R el={<CampusVisuals title="Bank More Campus" categoryId="bank-more" desc="Bank More campus ki photos" />} />} />
            <Route path="/campus/visuals/vocational-building" element={<R el={<CampusVisuals title="Vocational Building" categoryId="vocational" desc="Vocational building ki photos" />} />} />
            <Route path="/campus/infrastructure" element={<R el={<Infrastructure />} />} />
            <Route path="/campus/classroom" element={<R el={<Classrooms />} />} />
            <Route path="/campus/ict-rooms" element={<R el={<IctRooms />} />} />
            <Route path="/campus/green-campus" element={<R el={<GreenCampus />} />} />

            {/* Academics */}
            <Route path="/academics/iqac" element={<R el={<IqacPage />} />} />
            <Route path="/academics/course-offered" element={<R el={<CourseOffered />} />} />
            <Route path="/academics/departments" element={<R el={<DepartmentPage />} />} />
            <Route path="/academics/departments/:deptSlug" element={<R el={<DepartmentPage />} />} />
            <Route path="/syllabus" element={<R el={<Syllabus />} />} />
            <Route path="/academics/academic-calendar" element={<R el={<AcademicCalendar />} />} />

            {/* Admission */}
            <Route path="/admission/rule" element={<R el={<AdmissionRule />} />} />
            <Route path="/admission/document-required" element={<R el={<DocumentRequired />} />} />
            <Route path="/admission/fee-structure" element={<R el={<FeeStructure />} />} />
            <Route path="/admission/notification/latest" element={<R el={<AdmissionNotif type="latest" title="Latest Notifications" />} />} />
            <Route path="/admission/notification/upcoming" element={<R el={<AdmissionNotif type="upcoming" title="Upcoming Notifications" />} />} />
            <Route path="/admission/intake-capacity" element={<R el={<IntakeCapacity />} />} />
            <Route path="/videos" element={<VideoLibrary />} />

            {/* Activity */}
            <Route path="/activity/nss" element={<R el={<NssPage />} />} />
            <Route path="/activity/ncc" element={<R el={<NccPage />} />} />
            <Route path="/activity/workshop" element={<R el={<WorkshopPage />} />} />
            <Route path="/activity/games-sports" element={<R el={<SportsPage />} />} />
            <Route path="/activity/collaboration/rotaract-club" element={<R el={<RotaractClub />} />} />
            <Route path="/activity/collaboration/sadbhavana-diwas" element={<R el={<SadbhavanaDiwas />} />} />

            {/* NAAC */}
            <Route path="/naac/ssr-1st-cycle/cycle-1-documents" element={<R el={<SsrCyclePage cycle={1} />} />} />
            <Route path="/naac/ssr-1st-cycle/peer-team-report" element={<R el={<SsrCyclePage cycle={1} />} />} />
            <Route path="/naac/ssr-2nd-cycle/cycle-2-documents" element={<R el={<SsrCyclePage cycle={2} />} />} />
            <Route path="/naac/ssr-2nd-cycle/executive-summary" element={<R el={<SsrCyclePage cycle={2} />} />} />
            <Route path="/naac/aqar" element={<R el={<AqarPage />} />} />
            <Route path="/naac/nirf" element={<R el={<NirfPage />} />} />
            <Route path="/naac/perspective-plan" element={<R el={<PerspectivePlan />} />} />

            {/* Publication */}
            <Route path="/publication/college-library" element={<R el={<LibraryPage />} />} />
            <Route path="/publication/e-magazine" element={<R el={<PublicationPage type="magazine" title="E-Magazine" subtitle="College ki digital publications" icon="📰" keyword="magazine" />} />} />
            <Route path="/publication/examination-results/2024" element={<R el={<PublicationPage type="result" title="Exam Results 2024" subtitle="Academic year 2023-24 ke results" icon="📋" keyword="result-2024" />} />} />
            <Route path="/publication/examination-results/2023" element={<R el={<PublicationPage type="result" title="Exam Results 2023" subtitle="Academic year 2022-23 ke results" icon="📋" keyword="result-2023" />} />} />
            <Route path="/publication/sss-report/2023-24" element={<R el={<PublicationPage type="sss" title="SSS Report 2023-24" subtitle="Student Satisfaction Survey" icon="📊" keyword="sss-2023-24" />} />} />
            <Route path="/publication/sss-report/2022-23" element={<R el={<PublicationPage type="sss" title="SSS Report 2022-23" subtitle="Student Satisfaction Survey" icon="📊" keyword="sss-2022-23" />} />} />

            {/* Gallery / News */}
            <Route path="/gallery" element={<R el={<GalleryPage gallery={gallery} />} />} />
            <Route path="/gallery/photos" element={<R el={<GalleryPage gallery={gallery} />} />} />
            <Route path="/gallery/photo-gallery" element={<R el={<GalleryPage gallery={gallery} />} />} />
            <Route path="/video-gallery" element={<R el={<VideoGallery />} />} />
            <Route path="/gallery/videos" element={<R el={<VideoGallery />} />} />
            <Route path="/gallery/video-gallery" element={<R el={<VideoGallery />} />} />
            <Route path="/news" element={<R el={<NewsPage />} />} />
            <Route path="/notifications" element={<R el={<NotificationsPage />} />} />
            <Route path="/documents" element={<R el={<DocumentsPage />} />} />
            <Route path="/events" element={<R el={<EventsPage />} />} />

            <Route path="/p/:slug" element={<R el={<PageViewer gallery={gallery} events={events} faculties={faculties} />} />} />
            <Route path="*" element={<R el={<NotFoundPage />} />} />

            {/* Admin */}
            <Route path="/admin" element={
                adminAuthed ? (
                    <R el={<AdminPanel notices={notices} announcements={announcements} events={events} gallery={gallery} faculties={faculties} onClose={handleAdminLogout} />} />
                ) : (
                    <AdminLogin onSuccess={handleAdminLogin} onClose={() => { window.location.hash = "/"; }} />
                )
            } />
        </Routes>
    );
}
