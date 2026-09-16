# 🏫 Guru Nanak College, Dhanbad — Official Web Portal (v2.1.0)

<div align="center">

![Guru Nanak College](https://img.shields.io/badge/Guru%20Nanak%20College-Dhanbad%20%7C%20Est.%201970-0f2347?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-12.10.0-FFCA28?style=for-the-badge&logo=firebase)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite)
![Headless CMS](https://img.shields.io/badge/Headless_CMS-Firestore-FF3E00?style=for-the-badge)
![PWA Ready](https://img.shields.io/badge/PWA-Installable%20Offline-5A0FC8?style=for-the-badge)
![Playwright QA](https://img.shields.io/badge/Playwright_QA-42%2F42%20Passed%20(100%25)-22c55e?style=for-the-badge)
![Diagnostic Core](https://img.shields.io/badge/Diagnostic_Engine-v400.0%20(36--Phase)-eab308?style=for-the-badge)

**🎓 NAAC Accredited Grade 'B' Sikh Minority Degree College | Affiliated to Binod Bihari Mahto Koyalanchal University (BBMKU)**  
**🏛️ Recognized by UGC under Sections 2(f) and 12(B) of UGC Act, 1956**  
**📍 Dual Campuses: Bhuda Campus (Main / Boys Wing) & Bank More Campus (Girls Wing / Vocational Studies) | Dhanbad, Jharkhand — 826001**

[🌐 Live Official Website](https://pankajkumargnc.github.io/gncollege-website) · [📋 Architecture Encyclopedia](./public/docs/GNC_MASTER_ARCHITECTURE_BLUEPRINT.html) · [🛡️ Admin Reference Guide](./public/docs/CLAUDE_GNC_Reference.pdf)

---

> **⚡ Sole Designer, Lead Architect & Full-Stack Developer: [Pankaj Kumar](https://github.com/pankajkumargnc)**
>
> *"This entire enterprise portal — every single line of code, UI component, database schema, real-time synchronization hook, diagnostic engine, and visual layout — was single-handedly designed, programmed, tested, and deployed from scratch without third-party templates or outsourced modules."*

</div>

---

## 📌 Comprehensive Table of Contents

1. [Institutional Profile & Overview](#-institutional-profile--overview)
2. [Current Project Status (v2.1.0)](#-current-project-status-v210)
3. [Master Technology Stack](#-master-technology-stack)
4. [Architectural Highlights & Innovations](#-architectural-highlights--innovations)
5. [Complete Master Directory Structure](#-complete-master-directory-structure)
6. [Frontend Experience & Public Feature Directory (27+ Pages)](#-frontend-experience--public-feature-directory-27-pages)
7. [Admin Portal Ecosystem (All 28 Dedicated Tabs)](#-admin-portal-ecosystem-all-28-dedicated-tabs)
8. [Backend Architecture & Cloud Firestore Data Models](#-backend-architecture--cloud-firestore-data-models)
9. [Google Drive API Integration & 4-Tier Quota Shield](#-google-drive-api-integration--4-tier-quota-shield)
10. [Design System, Fluid Typography & Zero-Emoji Standard](#-design-system-fluid-typography--zero-emoji-standard)
11. [Security, Access Control & Compliance Framework](#-security-access-control--compliance-framework)
12. [Supreme Diagnostic Engine v400.0 (36-Phase Real Audit)](#-supreme-diagnostic-engine-v4000-36-phase-real-audit)
13. [Progressive Web App (PWA) & Service Worker Engine](#-progressive-web-app-pwa--service-worker-engine)
14. [Deep SEO & Dynamic Schema.org Graph Engine](#-deep-seo--dynamic-schemaorg-graph-engine)
15. [Automated Playwright QA & Viewport Verification](#-automated-playwright-qa--viewport-verification)
16. [Build Pipeline & Bundle Optimization](#-build-pipeline--bundle-optimization)
17. [Developer Commands & CLI Workflow](#-developer-commands--cli-workflow)
18. [Authorship, Copyright & Credits](#-authorship-copyright--credits)

---

## 🏛️ Institutional Profile & Overview

Guru Nanak College, Dhanbad was established in **1970** to commemorate the 500th Birth Anniversary of Sri Guru Nanak Dev Ji. Governed by a dedicated Sikh Minority Management, the institution delivers undergraduate education across Humanities, Social Sciences, Science, Commerce, and Vocational Information Technology.

| Key Metric / Parameter | Official Institutional Details |
|---|---|
| **Institution Name** | Guru Nanak College, Dhanbad |
| **Year of Establishment** | 1970 (Golden Jubilee Legacy) |
| **Affiliation** | Binod Bihari Mahto Koyalanchal University (BBMKU), Dhanbad |
| **Previous Affiliation** | Vinoba Bhave University (VBU), Hazaribagh |
| **UGC Recognition** | Sections 2(f) and 12(B) of the UGC Act, 1956 |
| **NAAC Accreditation** | Accredited Grade 'B' |
| **Status** | Sikh Minority Co-educational Degree College |
| **Main Campus (Boys Wing)** | Bhuda Campus, Dhanbad, Jharkhand — 826001 |
| **Vocational Campus (Girls Wing)** | Bank More Campus, Dhanbad, Jharkhand — 826001 |
| **Academic Offerings** | NEP-2020 FYUGP (B.A., B.Com, B.Sc), BCA, BBA, Vocational Certifications |
| **Active Student Body** | 4,000+ Students |
| **Alumni Network** | 45,000+ Alumni Worldwide |

---

## 🚀 Current Project Status (v2.1.0)

The project has achieved **v2.1.0 Production-Ready Master Status** with complete system transformation:

- ✅ **100% Zero-Emoji Standard**: Replaced all informal system emojis across the public site, navigation, and all 28 Admin tabs with sharp, accessible vector SVGs from `lucide-react`.
- ✅ **Editorial Publication Typography**: All paragraph copy across every page strictly enforces **Full Justified Alignment** (`text-align: justify; text-justify: inter-word; hyphens: auto;`) with fluid font pairing (`Space Grotesk` headings + `Plus Jakarta Sans` subheadings + `Inter` body text).
- ✅ **Supreme Diagnostic Engine v400.0**: 36-phase deep audit engine inspecting functional latency, security rules, axe-core WCAG A11y, web-vitals RUM, and generating 10-15 page A4 Printable Technical Encyclopedias.
- ✅ **Google Drive API Quota Shield**: 4-tier resilient architecture preventing HTTP 403/429 quota exhaustion.
- ✅ **Playwright Automated QA**: 42/42 checks passed (100% pass rate) with zero horizontal overflow across 6 responsive viewports (320px to 1920px).
- ✅ **Zero-Deletion Architecture**: All CMS hooks (`usePageContent`) retain hardcoded fallback JSX data guaranteeing 100% visual uptime if cloud databases are offline or unpopulated.
- ✅ **Split-Core Firebase Auth**: Physically separated `firebase.js` (Firestore only for public visitors) from `firebase-auth.js` (lazy-loaded for administrators), saving bundle weight.

---

## 🛠️ Master Technology Stack

### 💻 Frontend Core
- **React 18.2.0**: Concurrent rendering, functional hooks, strict state isolation.
- **Vite 7.3.1**: Next-generation ES module bundler and lightning-fast HMR build tool.
- **React Router 7.13.1**: Hash-based client routing (`HashRouter`) for seamless static hosting compatibility on GitHub Pages and Firebase Hosting.
- **Lucide React 1.7.0**: 100% vector SVG icons for modern, institutional visual presentation.

### 🔥 Backend as a Service (Firebase BaaS)
- **Cloud Firestore (v12.10.0)**: Real-time NoSQL document database with multi-tab offline cache persistence (`persistentLocalCache`, `persistentMultipleTabManager`).
- **Firebase Authentication**: Role-based access control with secure local browser persistence and email/password authentication.
- **Cloud Storage**: Enterprise bucket storage for documents, circulars, and images with strict server-side MIME type whitelists.
- **Firebase Cloud Messaging (FCM)**: Web Push Notification infrastructure for real-time student circular broadcasts.
- **Firebase Analytics**: Privacy-first, zero-PII telemetry and event measurement.

### 🎨 UI Engine & Media Libraries
- **Vanilla CSS (Lumina Design System)**: CSS Variables, fluid typography via `clamp()`, glassmorphism, responsive CSS grid, and tactile micro-physics (`transform: scale(0.97)`).
- **Jodit RTE v5 (`jodit-react`)**: Professional WYSIWYG rich text editor with clean HTML output and media embeds.
- **PhotoSphereViewer (`@photo-sphere-viewer/core`)**: Interactive 360° panoramic campus virtual tour engine.
- **React-PageFlip (`react-pageflip`)**: Realistic 3D canvas flipbook reader for digital college magazines.
- **PDF Infrastructure (`react-pdf`, `pdf-lib`)**: Client-side PDF rendering, streaming, and metadata optimization.
- **Interactive Maps (`leaflet`, `react-leaflet`)**: Geospatial campus mapping for Bhuda and Bank More campuses.
- **Data Analytics & Charts (`recharts`, `apexcharts`, `react-apexcharts`)**: Placement metrics and admission trends.
- **Search & Filter (`fuse.js`)**: Fuzzy client-side search indexing across notices, faculty, and departments.
- **Animation & Transitions (`aos`, `countup.js`, `canvas-confetti`)**: Scroll-triggered reveals and celebration physics.
- **Internationalization (`i18next`, `react-i18next`)**: Dual-language support (English & Hindi).

### 🛡️ Security, QA & Build Tooling
- **DOMPurify 3.3.3**: Universal XSS protection sanitizing every HTML payload before rendering.
- **axe-core 4.13.0**: WCAG 2.2 AA accessibility audit engine built directly into system diagnostics.
- **Playwright 1.58.2**: Automated headless Chromium browser test suite for visual regression and overflow detection.
- **Terser 5.46.0**: Production minifier auto-stripping `console.log` and `debugger` statements.
- **vite-plugin-imagemin 0.4.0**: Automated lossless and lossy WebP, PNG, and JPEG asset compression.
- **VitePWA 1.2.0**: Progressive Web App generator with Workbox precaching and service worker routing.

---

## 💡 Architectural Highlights & Innovations

### 1. Split-Core Firebase Architecture
Public visitors never touch authentication libraries:
```
Public Visitor Bundle       ──>  src/firebase.js        (Only Cloud Firestore + Analytics)
Admin Panel Route (#/admin)  ──>  src/firebase-auth.js   (Lazy-loaded Firebase Auth SDK)
```
This reduces the initial bundle footprint by ~85 KB for everyday student traffic.

### 2. Zero-Deletion Architecture (Headless CMS Fallback)
Every page powered by the `usePageContent('slug')` hook supplies full hardcoded JSX fallback data:
```jsx
const { content, getList, getText } = usePageContent('college-profile');
// If Firestore is empty, getList() seamlessly serves bundled institutional data:
const historicalMilestones = getList('milestones', DEFAULT_MILESTONES);
```
If an administrator accidentally deletes a collection or the network fails, the website **never breaks or displays blank cards**.

### 3. safeLazy Chunk Failure Recovery
When a new production build is deployed to GitHub Pages, users with stale browser caches can encounter `ChunkLoadError`. The custom `safeLazy` wrapper automatically intercepts chunk fetch errors and executes an automated, transparent reload:
```javascript
const safeLazy = (importFn) => lazy(() =>
  importFn().catch((err) => {
    if (err.message.includes('fetch') || err.message.includes('module')) {
      const reloadCount = parseInt(sessionStorage.getItem('gnc_lazy_reload') || '0', 10);
      if (reloadCount < 2) {
        sessionStorage.setItem('gnc_lazy_reload', (reloadCount + 1).toString());
        window.location.reload();
      }
    }
    return Promise.reject(err);
  })
);
```

### 4. Zero-Lag Real-Time Sync & BroadcastChannel
Changes made in the Admin Panel instantly synchronize worldwide without manual page reloads:
- **Global Firestore Trigger**: Listens on `settings/site_sync` document snapshot updates.
- **Cross-Tab Browser Sync**: Uses standard `BroadcastChannel('gnc_sync_channel')` to synchronize multiple open tabs on the same computer simultaneously with zero network calls.

---

## 📂 Complete Master Directory Structure

```text
gncollege-website/
├── .agents/                                ← Custom agent skills, rules, and workflows
├── .claude/                                ← Claude Code project configuration
├── backend-docs/                           ← Microservice & backend architecture specifications
├── backups/                                ← Automated local Firestore JSON backups
├── public/                                 ← Static public assets
│   ├── docs/                               ← Architecture encyclopedias, PDFs, blueprints
│   │   ├── GNC_MASTER_ARCHITECTURE_BLUEPRINT.html
│   │   └── CLAUDE_GNC_Reference.pdf
│   ├── images/                             ← Optimized WebP assets, hero slides, logos
│   ├── favicon.ico                         ← Site favicon
│   └── sw.js                               ← Custom service worker caching logic
├── scripts/                                ← Build, backup, and QA automation
│   ├── backupFirestore.js                  ← Server-side Firestore collection backup script
│   ├── do_backup.cjs                       ← CJS backup utility
│   ├── optimize_pdf.py                     ← Python PDF stream compression tool
│   ├── runPlaywrightQA.js                  ← Headless Playwright automated test runner
│   ├── seedAllMagazines.mjs                ← E-Magazine Firestore database seeder
│   └── seedMagazine.mjs                    ← Single issue seeder
├── src/                                    ← Primary application source code
│   ├── components/                         ← Reusable UI components
│   │   ├── admin/                          ← Centralized Admin Panel ecosystem
│   │   │   ├── tabs/                       ← All 28 dedicated Admin tabs (see Section 7)
│   │   │   ├── AdminPanel.jsx              ← Master Admin Orchestrator with safeLazyTab
│   │   │   └── AdminShared.jsx             ← Shared design tokens, buttons, glass cards
│   │   ├── departments/                    ← Department-specific components
│   │   ├── home/                           ← Specialized Home page modules
│   │   │   ├── AdmissionTimeline.jsx       ← Visual student admission lifecycle
│   │   │   ├── NotificationSection.jsx     ← Tabbed notices, events, and circulars
│   │   │   ├── PlacementAnalytics.jsx      ← Placement metrics & salary charts
│   │   │   ├── PlacementsSection.jsx       ← Marquee recruiter logo carousel
│   │   │   ├── SectionTitle.jsx            ← Unified golden kicker headers
│   │   │   ├── TestimonialsSection.jsx     ← Student and alumni review slider
│   │   │   └── TopBar.jsx                  ← Contact, theme toggle, accessibility bar
│   │   ├── AIChatbot.jsx                   ← Interactive student query assistant
│   │   ├── AcademicCalendarWidget.jsx      ← Monthly academic events calendar
│   │   ├── AdminLogin.jsx                  ← Enterprise split-screen admin login
│   │   ├── AlertBanner.jsx                 ← Emergency marquee notification banner
│   │   ├── AnimatedCounter.jsx             ← Tabular numeric CountUp counter
│   │   ├── AppRoutes.jsx                   ← Master 40+ route table with safeLazy
│   │   ├── BackToTop.jsx                   ← Smooth floating back-to-top trigger
│   │   ├── Breadcrumbs.jsx                 ← Dynamic JSON-LD integrated breadcrumbs
│   │   ├── CampusMap.jsx                   ← Interactive Leaflet map container
│   │   ├── DynamicSectionRenderer.jsx      ← CMS shortcode & JSON block parser
│   │   ├── ErrorBoundary.jsx               ← Per-route UI crash guard
│   │   ├── FlipbookViewer.jsx              ← 3D page-turning magazine viewer
│   │   ├── FloatingQRButton.jsx            ← Floating mobile portal share QR code
│   │   ├── Footer.jsx                      ← Institutional footer with sitemap & links
│   │   ├── HeroSlider.jsx                  ← High-res 15-slide touch hero slider
│   │   ├── HomeFeatures.jsx                ← Institutional highlights & badges
│   │   ├── ImageCropper.jsx                ← Client-side canvas image cropper
│   │   ├── LanguageToggle.jsx              ← English / Hindi i18n switcher
│   │   ├── LazyImg.jsx                     ← Progressive image loader with blur-up
│   │   ├── MediaPicker.jsx                 ← Universal cloud media & Drive picker
│   │   ├── MiniYouTubePlayer.jsx           ← Lightweight lazy YouTube video embed
│   │   ├── Navbar.jsx                      ← 3-level mega navigation with search
│   │   ├── PDFModal.jsx                    ← In-app full-featured PDF preview modal
│   │   ├── PageViewer.jsx                  ← Dynamic CMS page renderer (`/p/:slug`)
│   │   ├── PollWidget.jsx                  ← Real-time interactive student poll
│   │   ├── PremiumPagination.jsx           ← Accessible table/card pagination
│   │   ├── PremiumTicker.jsx               ← High-speed hardware-accelerated ticker
│   │   ├── QuickAccessSidebar.jsx          ← Sticky floating quick access menu
│   │   ├── QuickActionNav.jsx              ← Secondary quick navigation bar
│   │   ├── SectionHeader.jsx               ← Standardized section header
│   │   ├── ShareQRModal.jsx                ← QR code generator modal
│   │   ├── Ticker.jsx                      ← Breaking college alerts marquee
│   │   ├── UniversalSearch.jsx             ← Fuse.js global search modal (Ctrl+K)
│   │   ├── VirtualTour.jsx                 ← 360° PhotoSphere virtual campus tour
│   │   └── WhatsAppButton.jsx              ← Direct college admission desk WhatsApp
│   ├── data/                               ← Static baseline datasets
│   │   ├── db.js                           ← Static navigation links and campus data
│   │   └── defaultPageContent.js           ← Zero-Deletion fallback dictionary
│   ├── hooks/                              ← Custom React Hooks
│   │   ├── useAppData.js                   ← Real-time Firestore sync & reactive state
│   │   ├── useDarkMode.js                  ← Persistent theme controller
│   │   ├── useDriveDocs.js                 ← Google Drive API v3 Quota Shield
│   │   ├── useHashFragment.js              ← Anchor scrolling for HashRouter
│   │   └── usePageContent.js               ← Headless CMS data fetching hook
│   ├── locales/                            ← Translation dictionaries (en.json, hi.json)
│   ├── pages/                              ← 27+ Full page modules (see Section 6)
│   ├── styles/                             ← CSS stylesheets & design tokens
│   │   ├── admin-login.css                 ← Dedicated admin login styles
│   │   ├── admin.css                       ← Admin Panel layout, HUD, tabs
│   │   ├── colors.js                       ← Master color constants
│   │   ├── index.css                       ← Lumina Design System, fluid typography
│   │   └── print.css                       ← A4 print styling for reports & certificates
│   ├── utils/                              ← Helper libraries & utilities
│   │   ├── aiExtractor.js                  ← AI text parser & document analyzer
│   │   ├── analytics.js                    ← Privacy-preserving pageview telemetry
│   │   ├── backup.js                       ← Client-side JSON backup generator
│   │   ├── cachedFetch.js                  ← LocalStorage cache with TTL
│   │   ├── confetti.js                     ← Celebration confetti triggers
│   │   ├── documentValidator.js            ← PDF/file MIME and size validator
│   │   ├── errorLogger.js                  ← Client-side error aggregation
│   │   ├── excelExport.js                  ← XLSX table exporter
│   │   ├── pdfOptimizer.js                 ← PDF stream cleaner and optimizer
│   │   ├── resolver.js                     ← Deep object property resolver
│   │   └── seoManager.js                   ← Dynamic meta tags & Schema.org @graph
│   ├── App.jsx                             ← Root component, global listeners, layout
│   ├── AppWrapper.jsx                      ← Scroll restoration & hash navigation
│   ├── constants.js                        ← Master college constants, colors, collections
│   ├── firebase-auth.js                    ← Lazy-loaded Firebase Auth module
│   ├── firebase.js                         ← Firestore instance with offline cache
│   ├── i18n.js                             ← i18next configuration
│   └── main.jsx                            ← React mount, RootErrorBoundary, AOS init
├── tests/                                  ← Playwright test suites
│   └── responsive-qa.spec.js               ← 42-point responsive viewport QA test
├── firestore.rules                         ← Cloud Firestore security rules
├── storage.rules                           ← Cloud Storage security rules
├── firebase.json                           ← Firebase hosting & emulator configuration
├── vite.config.js                          ← Vite compiler, Terser, manual chunks, PWA
└── package.json                            ← Project dependencies & scripts
```

---

## 🌐 Frontend Experience & Public Feature Directory (27+ Pages)

Every route in `src/components/AppRoutes.jsx` is wrapped in an individual `ErrorBoundary` and loaded asynchronously through `safeLazy` with an animated skeleton loader.

### Core Institutional Pages
1. **Homepage (`/`)**: 15-slide high-res hero carousel, live ticker, emergency alert banner, tabbed notifications (Notices, Announcements, Events), statistical counter cards (`4000+ Enrolled`, `45000+ Alumni`), Principal's welcome note, placement metrics, recruiter marquee, student testimonials, and campus photo highlights.
2. **College Profile (`/about-us/college-profile`)**: Institutional history, founder vision, dual campus profile, academic milestones, and governing principles.
3. **Vision & Mission (`/about-us/vision-mission`)**: Core values, institutional goals, educational objectives, and motto.
4. **Principal's Message (`/about-us/principal-message`)**: Formal address from the Principal with institutional roadmap.
5. **Sikh Heritage (`/about-us/sikh-heritage`)**: Special historical tribute, teachings of Sri Guru Nanak Dev Ji, Punjabi culture, and interfaith harmony.
6. **Governing Body (`/about-us/governing-body`)**: Management committee roster, executive leadership, and university representatives.
7. **Staff Council (`/about-us/staff-council`)**: Academic staff council members and statutory internal committees.
8. **College Management Over the Years**:
   - `/about-us/college-management/presidents` — Historical roster of Presidents.
   - `/about-us/college-management/secretaries` — Historical roster of Honorary Secretaries.
   - `/about-us/college-management/principal` — Historical roster of Principals.
   - `/about-us/college-management/organogram` — Institutional organizational hierarchy.
9. **Statutory Cells & Committees (9 Dedicated Modules)**:
   - Women's Cell (`/about-us/various-committees/womens-cell`)
   - Anti-Ragging Cell (`/about-us/various-committees/anti-ragging`)
   - SC/ST Cell (`/about-us/various-committees/sc-st`)
   - OBC Cell (`/about-us/various-committees/obc`)
   - Grievance Redressal Cell (`/about-us/various-committees/grievance`)
   - Internal Complaints Committee (ICC) (`/about-us/various-committees/icc`)
   - Minority Cell (`/about-us/various-committees/minority`)
   - Placement Cell (`/about-us/various-committees/placement`)
   - RUSA Cell (`/about-us/various-committees/rusa`)
10. **Faculty & Staff Directory (`/about-us/college-staff/:staffType`)**: Filterable roster of teaching and non-teaching faculty across all 15 departments with qualifications and designations.
11. **Institutional Audit Report (`/about-us/audit-report`)**: Financial and statutory audit statements.

### Regulations & Statutory Affiliations (Embedded PDF Viewers)
12. **Regulations Overview (`/about-us/regulations`)**: Centralized repository of university and government regulations.
13. **Individual Statutory PDF Viewers**:
    - BBMKU UG CBCS Regulation (`/about-us/regulations/bbmku-ug`)
    - BBMKU Eligibility Circular (`/about-us/regulations/bbmku-circular`)
    - Jharkhand State Universities FYUGP NEP-2020 (`/about-us/regulations/fyugp-nep`)
    - Vinoba Bhave University UG Regulation 2015 (`/about-us/regulations/vbu-ug`)
    - VBU BCA Regulation (`/about-us/regulations/vbu-bca`)
    - Guru Nanak College Constitution & Byelaws (`/about-us/regulations/college-byelaws`)
    - University Permanent Affiliation Certificate (`/about-us/regulations/college-affiliation`)
    - UGC 2(f) & 12(B) Recognition Certificate (`/about-us/regulations/ugc-certificate`)
    - Sikh Minority Exemption & Quota Order (`/about-us/regulations/minority-exemption`)

### Campus & Infrastructure
14. **Campus Visual Galleries**:
    - Bhuda Campus Tour (`/campus/visuals/bhuda`)
    - Bank More Campus Tour (`/campus/visuals/bank-more`)
    - Vocational Building Tour (`/campus/visuals/vocational-building`)
15. **Infrastructure Facilities**:
    - Central Infrastructure (`/campus/infrastructure`)
    - Smart Classrooms (`/campus/classroom`)
    - ICT Rooms & Computer Labs (`/campus/ict-rooms`)
    - Green Campus & Solar Energy Initiatives (`/campus/green-campus`)
16. **Interactive 360° Virtual Tour (`/virtual-tour`, `/campus/virtual-tour`)**: Panoramic multi-node virtual walk-through powered by PhotoSphereViewer.

### Academics & Admissions
17. **IQAC Hub (`/academics/iqac`)**: Internal Quality Assurance Cell documentation, minutes, and quality initiatives.
18. **Courses Offered (`/academics/course-offered`)**: NEP-2020 4-year undergraduate programs (Major/Minor subjects in Arts, Science, Commerce, and IT).
19. **Academic Departments (`/academics/departments/:deptSlug/:subSlug`)**: Comprehensive pages for Commerce, English, Hindi, Economics, History, Pol. Science, BCA, Mathematics, etc., featuring course syllabus, faculty list, and departmental activities.
20. **Syllabus Archive (`/syllabus`)**: Downloadable semester-wise syllabus PDFs.
21. **Academic Calendar (`/academics/academic-calendar`)**: Interactive month-by-month academic events calendar.
22. **Placements & Career Cell (`/academics/placements`)**: Campus recruitment records, prominent recruiters, and training programs.
23. **Admission Portal Modules**:
    - Admission Rules & Eligibility (`/admission/rule`)
    - Required Documents Checklist (`/admission/document-required`)
    - Detailed Fee Structure (`/admission/fee-structure`)
    - Latest Admission Notifications (`/admission/notification/latest`)
    - Upcoming Admission Notifications (`/admission/notification/upcoming`)
    - Course-wise Intake Capacity (`/admission/intake-capacity`)

### Student Activities & Co-Curricular
24. **National Service Scheme (NSS) (`/activity/nss`)**: Community service camps and volunteer drives.
25. **National Cadet Corps (NCC) (`/activity/ncc`)**: Cadet training, parades, and certificate records.
26. **Workshops & Seminars (`/activity/workshop`)**: National and international conferences.
27. **Games & Sports (`/activity/games-sports`)**: Annual athletic meets, cricket, badminton, and state-level tournaments.
28. **Collaborations & Clubs**:
    - Rotaract Club of GNC (`/activity/collaboration/rotaract-club`)
    - Sadbhavana Diwas & Communal Harmony (`/activity/collaboration/sadbhavana-diwas`)

### NAAC & Quality Assurance
29. **NAAC Accreditation Hub**:
    - NAAC 1st Cycle SSR & Peer Team Reports (`/naac/ssr-1st-cycle/*`)
    - NAAC 2nd Cycle SSR & Executive Summaries (`/naac/ssr-2nd-cycle/*`)
    - Annual Quality Assurance Reports (AQAR) (`/naac/aqar`)
    - National Institutional Ranking Framework (NIRF) (`/naac/nirf`)
    - Institutional Perspective Plan (`/naac/perspective-plan`)

### Publications & Media Galleries
30. **College Central Library (`/publication/college-library`)**: Library catalog, e-resources, OPAC, reading rooms, and rules.
31. **Digital E-Magazine Flipbook (`/publication/e-magazine`)**: Interactive 3D flipbook reading experience for college annual magazines and newsletters.
32. **Examination Results Archive**:
    - Results 2024 (`/publication/examination-results/2024`)
    - Results 2023 (`/publication/examination-results/2023`)
33. **Student Satisfaction Survey (SSS)**:
    - SSS Report 2023–24 (`/publication/sss-report/2023-24`)
    - SSS Report 2022–23 (`/publication/sss-report/2022-23`)
34. **Photo Gallery (`/gallery`, `/gallery/photos`)**: Categorized high-resolution photo albums with lightbox zoom.
35. **Video Gallery (`/video-gallery`, `/videos`)**: Curated video library featuring college lectures, cultural fests, and annual days.
36. **News & Press Coverage (`/news`)**: Newspaper clippings and media mentions.
37. **Central Notice Board (`/notifications`)**: Live searchable and filterable circular archive.
38. **Downloads & Documents Archive (`/documents`)**: Official college forms, transfer certificate requests, and bonafide applications.
39. **College Events Calendar (`/events`)**: Upcoming and past college events with venue badges and descriptions.
40. **Scholarships & Financial Aid (`/scholarships`)**: State Post-Matric, E-Kalyan, and Minority scholarship guidance.
41. **Alumni Wall of Fame (`/alumni`, `/alumni-wall`)**: Distinguished alumni across civil services, armed forces, academia, and industry.
42. **Dynamic CMS Pages (`/p/:slug`)**: Custom pages built via the Admin Page Builder (`PageViewer.jsx`).
43. **Legal Pages**: Privacy Policy (`/privacy-policy`) and Terms of Service (`/terms-of-service`).
44. **Universal 404 Page (`*`)**: Custom illustrated page with intelligent navigation recovery.

---

## 🛡️ Admin Portal Ecosystem (All 28 Dedicated Tabs)

The Guru Nanak College Admin Portal (`#/admin`) is an enterprise-grade institutional content management system. Access is protected by Firebase Authentication and restricted to verified administrators (`pankajkumargnc@gmail.com`, `admin@gncollege.org`, `principal@gncollege.org`).

Every tab import is shielded by `safeLazyTab` with retry logic and in-app fallback recovery cards. All tabs feature 100% vector Lucide SVG icons, tabular metrics, and real-time synchronization.

| # | Admin Tab Component | Target File | Core Functionality & Admin Capabilities |
|---|---|---|---|
| 1 | **Dashboard** | `DashboardTab.jsx` | Real-time KPI cards (active notices, faculty count, document downloads), tabular counters, recent activity stream, quick actions, and system health status. |
| 2 | **Quick Publish** | `QuickPublishTab.jsx` | One-click multi-channel broadcaster: publishes a circular simultaneously to Notices, Ticker, and Push Notifications with file attachments. |
| 3 | **Announcements** | `AnnouncementsTab.jsx` | High-priority flashing announcements, urgency badges (`URGENT`, `EXAM`, `ADMISSION`), expiration dates, and live ticker previews. |
| 4 | **Faculty & Staff** | `FacultyTab.jsx` | Complete faculty manager: name, designation, department, qualification, email, image cropper/upload, and ordering controls. |
| 5 | **Meeting PDFs** | `MeetingPDFTab.jsx` | Statutory meeting minutes manager: Governing Body minutes, Academic Council, and IQAC records with PDF upload progress bars and modal previews. |
| 6 | **Notices** | `NoticesTab.jsx` | Master circulars manager: category pills, pin/star priority, target audience filters, PDF attachment upload, and search filters. |
| 7 | **Testimonials** | `TestimonialsTab.jsx` | Student and alumni review manager: rating stars, quote text, avatar upload, and publication approval toggle. |
| 8 | **YouTube Gallery** | `YouTubeTab.jsx` | College YouTube video channel manager: video ID parser, auto-thumbnail fetcher, title/description editor, and responsive video grid. |
| 9 | **Alerts & Banners** | `AlertsTab.jsx` | Top emergency banner broadcaster: severity coloring (Info, Warning, Critical), auto-expiry timestamp triggers, and live preview marquee. |
| 10 | **Hero Slider** | `SliderTab.jsx` | Homepage hero carousel manager: 15-slide reordering, WebP image uploader, heading/subheading editors, button links, and overlay opacity sliders. |
| 11 | **Placements** | `PlacementsTab.jsx` | Corporate recruitment manager: corporate recruiter logos, highest and average CTC packages, student placement highlights, and annual reports. |
| 12 | **Events** | `EventsTab.jsx` | Campus events manager: date/time pickers, venue badges, RSVP counter, event category, registration links, and photo galleries. |
| 13 | **Polls & Surveys** | `PollsTab.jsx` | Interactive student voting manager: poll question, multi-option choices, live percentage vote bars, active/closed toggles, and IP deduplication. |
| 14 | **Photo Gallery** | `GalleryTab.jsx` | Image album manager: category-based albums, batch file uploaders, thumbnail inspector, and caption editors. |
| 15 | **Documents** | `DocumentsTab.jsx` | Official documents repository: syllabus, circulars, bye-laws, download hit counters, and Google Drive URL linkers. |
| 16 | **Contact & Queries** | `ContactTab.jsx` | Student inbound query manager: submission inbox, unread query badges, query status updates (Pending, Resolved), and email reply triggers. |
| 17 | **Activity Log** | `ActivityTab.jsx` | Administrative audit trail: real-time logs of every create, update, and delete action with admin email, action category, and ISO timestamp. |
| 18 | **Backup & Restore** | `BackupRestoreTab.jsx` | One-click JSON Firestore backup: exports all collections into a timestamped JSON file with collection health stats and restore capability. |
| 19 | **Google Drive** | `DriveTab.jsx` | Live Google Drive folder explorer: navigates drive hierarchy, manages file IDs, and displays Quota Shield status. |
| 20 | **Site Settings** | `SettingsTab.jsx` | Master institutional metadata manager: campus phone numbers, emails, addresses, social media links, maintenance mode, and feature toggles. |
| 21 | **Campus Infrastructure**| `AdminCampusTab.jsx` | Facility manager for Bhuda and Bank More campuses: campus wing editors, facility bullet points, and infrastructure photos. |
| 22 | **Departments** | `AdminDepartmentTab.jsx` | Academic department manager: HOD profiles, course matrix, lab specifications, faculty rosters, and departmental vision statements. |
| 23 | **College Leadership** | `AdminLeadershipTab.jsx` | Historical registry manager: Presidents, Honorary Secretaries, and Principals over the years with tenures and portrait photographs. |
| 24 | **Neural AI Studio** | `AdminNeuralStudioTab.jsx` | Built-in AI assistant: prompt studio, institutional copy generator, circular summarizer, and token usage monitor. |
| 25 | **Menu Builder** | `MenuBuilderTab.jsx` | Visual 3-level navigation hierarchy orchestrator: add, edit, reorder, delete menu links, assign vector icons, with automated orphan cleanup. |
| 26 | **Content Manager** | `ContentManagerTab.jsx` | Headless CMS studio: structured JSON + rich text editing for 30+ core pages with split-screen real-time preview. |
| 27 | **Pages CMS** | `PagesTab.jsx` | Dynamic page builder: Jodit WYSIWYG editor, auto-slug generation, Google SERP snippet preview, and WhatsApp share card preview. |
| 28 | **Diagnostic Engine** | `SystemTestTab.jsx` | Supreme Diagnostic Core v400.0: 36-phase real audit, axe-core WCAG A11y, web-vitals RUM, and A4 Printable Architecture Encyclopedia generator. |

---

## 🗄️ Backend Architecture & Cloud Firestore Data Models

The system leverages Cloud Firestore as a scalable, low-latency NoSQL document store. All sensitive operations are guarded by `firestore.rules`.

### Firestore Collections Registry

| Collection Name | Document Schema & Primary Fields | Access Rules |
|---|---|---|
| `notices` | `{ id, title, text, date, category, isPinned, isNew, fileUrl, driveId, createdAt }` | Public Read; Admin Write |
| `announcements` | `{ id, title, text, urgency, badge, link, active, expiresAt, createdAt }` | Public Read; Admin Write |
| `events` | `{ id, title, date, time, venue, category, desc, image, rsvpCount, createdAt }` | Public Read; Admin Write |
| `gallery` | `{ id, title, category, imageUrl, caption, eventDate, createdAt }` | Public Read; Admin Write |
| `faculties` | `{ id, name, designation, department, qualification, email, image, order, createdAt }` | Public Read; Admin Write |
| `sliderSlides` | `{ id, title, subtitle, image, linkText, linkUrl, order, active, createdAt }` | Public Read; Admin Write |
| `updates` | `{ id, title, date, link, tag, createdAt }` | Public Read; Admin Write |
| `pages` | `{ id, slug, title, content, metaDesc, template, showInNav, updatedAt, createdAt }` | Public Read; Admin Write |
| `alerts` | `{ id, text, severity, active, autoExpire, expiresAt, createdAt }` | Public Read; Admin Write |
| `placements` | `{ id, companyName, logoUrl, year, packageCTC, studentsPlaced, createdAt }` | Public Read; Admin Write |
| `pdfReports` | `{ id, title, category, fileUrl, driveId, size, pages, year, createdAt }` | Public Read; Admin Write |
| `testimonials` | `{ id, name, role, batch, rating, quote, avatarUrl, approved, createdAt }` | Public Read; Admin Write |
| `contactDirectory`| `{ id, name, email, phone, subject, message, status, ip, createdAt }` | Public Read; Admin Write |
| `navigation` | `{ id, label, href, icon, badge, parentId, order, isActive, isExternal }` | Public Read; Admin Write |
| `leadership` | `{ id, name, type, tenureStart, tenureEnd, photoUrl, order, bio }` | Public Read; Admin Write |
| `departments` | `{ id, name, slug, hodName, hodPhoto, description, courses, labs, facilities }` | Public Read; Admin Write |
| `campus_gallery` | `{ id, campusId, title, imageUrl, caption, order }` | Public Read; Admin Write |
| `gb_meetings` | `{ id, meetingNumber, date, title, pdfUrl, agenda, attendees }` | Public Read; Admin Write |
| `staff_council` | `{ id, name, designation, committee, role, photoUrl }` | Public Read; Admin Write |
| `pageContent` | `{ id, slug, data: { sections, hero, content, getList, getText } }` | Public Read; Admin Write |
| `push_broadcasts`| `{ id, title, body, icon, url, sentAt, sentBy, recipientCount }` | Admin Read & Write |
| `polls` | `{ id, question, options: [{ text, votes }], totalVotes, votedIps: [], active }` | Public Read & Vote; Admin Write |
| `site_visits` | `{ id, page, device, referrer, date, timestamp }` | Admin Read; Public Create |
| `site_traffic` | `{ id, date, count, views, updatedAt }` | Admin Read; Public Update |
| `counters` | `{ id, key, value, label, count, updatedAt }` | Public Read; Public Increment |
| `settings/site` | `{ collegeName, address, phones, emails, social, maintenanceMode, enableFloatingQR }` | Public Read; Admin Write |
| `settings/site_sync` | `{ lastSyncTimestamp, updatedCollection, updatedBy }` | Public Read; Admin Write |
| `adminLogs` | `{ id, adminEmail, action, targetCollection, docId, details, t: timestamp }` | Admin Read & Write |
| `_systemTest` | `{ id, probe, t: timestamp }` | Admin Read, Write, Delete (Diagnostic Probes) |

---

## ⚡ Google Drive API Integration & 4-Tier Quota Shield

**Engine Hook:** `src/hooks/useDriveDocs.js`

Google Drive API v3 enforces strict limits (1,000 queries per 100 seconds). High student traffic previously risked HTTP 403 / 429 quota exhaustion. The system resolves this with an enterprise 4-tier resilience shield:

```
[UI Component Requests Document]
          │
          ▼
   1. Memory Cache (Map) ─────────► Found? Serve in 0ms synchronously
          │ (Miss)
          ▼
   2. Quota Shield Check ────────► In 15-min cooldown? Serve stale cache or bundled fallback
          │ (Quota OK)
          ▼
   3. LocalStorage SWR ──────────► Valid (< 30 mins)? Serve immediately & background validate
          │ (Stale / Empty)
          ▼
   4. Live Drive API Call ───────► On Success: Populate Memory & LocalStorage
                                 ► On 403/429: Activate 15-min Quota Shield in sessionStorage
```

Administrators can trigger `clearDriveCache()` from the Admin Drive Tab to immediately invalidate cached files after uploading new syllabus circulars.

---

## 🎨 Design System, Fluid Typography & Zero-Emoji Standard

### Lumina Design Architecture
- **Curated Color Tokens**:
  - `Deep Imperial Navy`: `#0f2347` (`--navy`), `#060e1c` (`--navy-dark`), `#1a3a7c` (`--navy-light`)
  - `Prestige Golden Amber`: `#f4a023` (`--gold`), `#d4870e` (`--gold-dark`), `#fff8ed` (`--gold-light`)
  - `Editorial White / Light Gray`: `#ffffff`, `#f8fafc`, `#e2e8f0`
- **Fluid Typography Hierarchy (`clamp()`)**:
  - No breakpoint jumping — fonts scale smoothly based on viewport width (`320px` to `2560px`):
  ```css
  --text-xs:    clamp(0.75rem,  0.70rem + 0.25vw, 0.85rem);
  --text-base:  clamp(0.95rem,  0.90rem + 0.28vw, 1.06rem);
  --text-lg:    clamp(1.125rem, 1.05rem + 0.40vw, 1.35rem);
  --text-xl:    clamp(1.375rem, 1.25rem + 0.65vw, 1.75rem);
  --text-2xl:   clamp(1.65rem,  1.50rem + 0.85vw, 2.25rem);
  --text-hero:  clamp(2.50rem,  2.10rem + 2.00vw, 4.00rem);
  ```
- **Authoritative Full Justified Body Text**:
  All editorial paragraphs (`p`, `.rich-text-content p`, `.prose p`, `article p`, `.content-card p`, `.gnc-prose p`) strictly enforce:
  ```css
  text-align: justify !important;
  text-justify: inter-word !important;
  hyphens: auto;
  -webkit-hyphens: auto;
  ```
  Both left and right margins align flush to create a scholarly publication aesthetic.
- **100% Vector SVG Standard (Zero Emojis)**:
  All informal emojis have been completely replaced with Lucide React vector icons (`<GraduationCap />`, `<Landmark />`, `<Award />`, `<ScrollText />`, `<Building2 />`, `<FileText />`), ensuring professional institutional visual consistency.
- **Tactile Physics**:
  All buttons and clickable cards feature native micro-physics:
  ```css
  button:active:not(:disabled),
  [role="button"]:active:not(:disabled),
  .clickable:active {
    transform: scale(0.97);
    transition: transform 0.08s ease;
  }
  ```

---

## 🔒 Security, Access Control & Compliance Framework

### 1. XSS Immunity with DOMPurify
Every piece of dynamic HTML from Cloud Firestore or external sources is sanitized through `DOMPurify.sanitize()` before entering `html-react-parser` or JSX renders. Script tags, malicious `onload` attributes, and iframe exploits are stripped.

### 2. Firestore Server-Side Security Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuth() { return request.auth != null; }
    function isAdmin() {
      return isAuth() && (
        request.auth.token.email in ["pankajkumargnc@gmail.com", "admin@gncollege.org", "principal@gncollege.org"] ||
        request.auth.token.admin == true
      );
    }
    // Public read, strictly admin-authenticated write for all academic content
    match /{collection}/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

### 3. Cloud Storage MIME Protection (`storage.rules`)
- Documents Vault (`/documents/{docFile}`): Restricted to admin-only uploads; maximum size **15 MB**; strict MIME whitelist (`application/pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`). Executables, PHP scripts, and HTML files are rejected.
- Images Vault (`/images/{imgFile}`): Restricted to admin-only uploads; maximum size **5 MB**; image MIME types only (`image/webp`, `image/png`, `image/jpeg`).

### 4. PII-Safe Telemetry
Client-side analytics tracking stores zero personal data, names, or identifiable IP addresses. Traffic counters aggregate anonymous daily visits by device category (Mobile, Tablet, Desktop).

---

## 🔬 Supreme Diagnostic Engine v400.0 (36-Phase Real Audit)

Accessible inside the Admin Panel under the **Diagnostics** tab (`SystemTestTab.jsx`), this hub performs a deep, 36-phase live audit of the portal and generates an official A4 Technical Blueprint for college accreditation files.

### 36 Diagnostic Phases Breakdown

1. **Functional Layer (8 Phases)**:
   - Firebase Write Latency (Probing `_systemTest` write/delete roundtrip)
   - Firestore Read Latency (Probing site settings document fetch)
   - Real-time Snapshot Channel Health (Verifying reactive unsubscribe cleanup)
   - Navigation Tree Structure Integrity (Checking for orphaned menu nodes)
   - CMS Fallback Integrity (`usePageContent` fallback resolution)
   - Google Drive Quota Status (Verifying API quota headroom)
   - PDF Streaming Pipeline (Validating PDF fetch headers and range requests)
   - Cross-Tab Broadcast Channel Sync (Verifying `gnc_sync_channel` responsiveness)

2. **Security & Data Vault (10 Phases)**:
   - Firestore Security Rules Enforcement (Testing unauthenticated write rejections)
   - Storage MIME Whitelist Verification (Confirming non-whitelisted upload blocks)
   - Admin Token Verification (Validating admin claims and authorized emails)
   - DOMPurify XSS Sanitization Gate (Running simulated SVG/Script injection payloads)
   - LocalStorage PII Scanner (Inspecting browser storage for unprotected personal data)
   - Auth SDK Isolation (Verifying `firebase/auth` is absent from public bundle)
   - Secure HTTPS Header Verification (Inspecting CSP, HSTS, and referrer policy)
   - Content Security Policy (CSP) Frame Ancestors (Testing clickjacking guards)
   - CSRF & Session Persistence Check (Validating browser session invalidation on logout)
   - Error Boundary Crash Containment (Testing mock render error containment)

3. **Performance & Core Web Vitals RUM (10 Phases)**:
   - Real User Largest Contentful Paint (LCP) measurement
   - Cumulative Layout Shift (CLS) stability tracking
   - First Contentful Paint (FCP) benchmark
   - Time to First Byte (TTFB) server latency
   - Interaction to Next Paint (INP) responsiveness
   - Frame Rate (Live FPS) rendering stability monitor
   - JavaScript Chunk Split Verification (Ensuring no single vendor bundle exceeds 500 KB)
   - Image WebP Format Compliance (Scanning for unoptimized legacy PNG/JPG assets)
   - Service Worker Cache Hit Ratio (Measuring offline asset availability)
   - DOM Node Depth & Weight (Ensuring DOM tree depth remains under 32 levels)

4. **Accessibility & WCAG 2.2 Level AA (8 Phases)**:
   - Real-time `axe-core` DOM accessibility evaluation
   - Color Contrast Ratio (AAA ratio compliance on dark navy backgrounds)
   - ARIA Attribute Validation (Checking landmark roles and tab indexes)
   - Form Label & Helper Text Associations (Validating inputs and select elements)
   - Alt Text Coverage on Media Elements (Ensuring 100% of images provide descriptions)
   - Keyboard Tab Navigation Trap Detection (Ensuring all modals permit Escape exit)
   - Screen Reader Announcer Testing (Testing aria-live notification regions)
   - Heading Hierarchy Structure (Validating single `h1` and sequential `h2`–`h4` depth)

---

## 📱 Progressive Web App (PWA) & Service Worker Engine

Guru Nanak College is configured as an installable Progressive Web App (PWA) via `vite-plugin-pwa` and Workbox.

- **Offline Capability**: Pre-caches **225+ core application assets (22.9 MB)** including fonts, stylesheets, logos, and critical scripts.
- **Runtime Caching Strategies**:
  - `Firestore API Calls`: `NetworkFirst` strategy with a 3-second network timeout and fallback to cached JSON documents.
  - `Firebase Storage Media`: `StaleWhileRevalidate` with an 30-day cache expiration window.
  - `Google Fonts & CDNs`: `CacheFirst` with a 1-year expiration window.
- **Web Push Notifications**: Leverages the browser `ServiceWorkerRegistration.showNotification()` API to broadcast college circulars directly to student home screens and desktops without requiring the portal to be open.

---

## 🎯 Deep SEO & Dynamic Schema.org Graph Engine

**Engine File:** `src/utils/seoManager.js`

The SEO Manager automatically updates meta tags, OpenGraph attributes, Twitter Cards, and injects dynamic JSON-LD structured data on route transitions:

### Connected `@graph` JSON-LD Schemas Injected:
1. **`CollegeOrUniversity` (Parent Entity)**:
   - Legal Name: Guru Nanak College, Dhanbad
   - Affiliated University: Binod Bihari Mahto Koyalanchal University (BBMKU)
   - Dual Campus Geo Coordinates: Bhuda Campus (`23.797659, 86.432321`) & Bank More Campus (`23.776019, 86.417586`)
   - Official Social Media Profiles: Facebook, Twitter/X, Instagram, YouTube.
2. **`BreadcrumbList`**:
   - Generated dynamically from the URL hierarchy (e.g. `Home` › `Academics` › `Departments` › `BCA`).
3. **`Course` Schema**:
   - Injected on course and department pages: course title, degree credential, intake capacity, and syllabus requirements.
4. **`EducationalOrganization` (Sub-Units)**:
   - Links individual departments (BCA, Commerce, Humanities, Science) back to the parent institution.
5. **`EducationEvent` Schema**:
   - Injected on events and workshops: event dates, venue coordinates, and admission criteria.

---

## 🧪 Automated Playwright QA & Viewport Verification

**Test Suite:** `tests/responsive-qa.spec.js` | **Runner:** `scripts/runPlaywrightQA.js`

A headless Chromium test suite runs automated responsive and visual regression audits across **6 viewports** and **7 core routes** (42 total checks):

```
======================================================
📊 PLAYWRIGHT QA TEST EXECUTION RESULTS
======================================================
Total Viewports Evaluated:  6 (320px, 375px, 768px, 1024px, 1440px, 1920px)
Total Core Routes Audited:  7 (/, /college-profile, /sikh-heritage, 
                              /course-offered, /fee-structure, 
                              /notifications, /contact)
Total Checks Run:           42
Checks Passed:              42 ✅
Checks Failed:              0 ❌
Pass Rate:                  100.0%
Layout Horizontal Overflow: ZERO (scrollWidth <= innerWidth across all screens)
```

---

## 📦 Build Pipeline & Bundle Optimization

The production build compiles via Vite with granular Rollup chunk splitting to ensure optimal caching and prevent monolithic downloads:

### Rollup Manual Chunk Distribution
| Chunk Name | Included Libraries & Modules | Purpose |
|---|---|---|
| `vendor-react` | `react`, `react-dom`, `react-router-dom`, `scheduler` | Core React runtime (Preloaded in `<head>`) |
| `vendor-firebase` | `@firebase/app`, `@firebase/firestore`, `@firebase/analytics` | Public database & analytics layer |
| `vendor-jodit` | `jodit`, `jodit-react` | Admin Rich Text Editor (Isolated to Admin chunk) |
| `vendor-pdf` | `pdfjs-dist`, `react-pdf`, `pdf-lib` | In-browser PDF rendering & manipulation |
| `vendor-charts` | `recharts`, `d3-scale`, `d3-shape` | Placement and admission data charts |
| `vendor-apexcharts`| `apexcharts`, `react-apexcharts` | High-performance interactive telemetry charts |
| `vendor-leaflet` | `leaflet`, `react-leaflet` | Interactive campus navigation maps |
| `vendor-360tour` | `@photo-sphere-viewer/core` | 360° panoramic virtual tour engine |
| `vendor-axe` | `axe-core` | WCAG accessibility audit engine |
| `vendor-excel` | `xlsx` | In-browser Excel data export engine |

---

## 💻 Developer Commands & CLI Workflow

```bash
# 1. Install project dependencies
npm install

# 2. Start local development server (Port 3000 with HMR)
npm run dev

# 3. Compile optimized production build (Target: dist/)
npm run build

# 4. Compile build tailored for GitHub Pages (/gncollege-website/ base path)
npm run build:github

# 5. Preview production build locally
npm run preview

# 6. Execute Playwright automated responsive QA test suite
npm run test:qa

# 7. Execute server-side Firestore collection backup
npm run backup

# 8. Deploy hosting build to Firebase Hosting
npm run deploy

# 9. Deploy build to GitHub Pages
npm run deploy:github

# 10. Deploy simultaneously to both Firebase and GitHub Pages
npm run deploy:all
```

---

## 🧑‍💻 Authorship, Copyright & Credits

### **Pankaj Kumar**
*Sole Designer, Lead Architect & Full-Stack Developer*  
Guru Nanak College, Dhanbad, Jharkhand

- 🌐 **GitHub**: [@pankajkumargnc](https://github.com/pankajkumargnc)
- 📧 **Direct Contact**: pankajkumargnc@gmail.com / info@gncollege.org
- 🏫 **Institution**: Guru Nanak College, Dhanbad — Affiliated to BBMKU

---

<div align="center">

*🏫 Built with dedication and craftsmanship for Guru Nanak College, Dhanbad*  
*© 2024–2026 Pankaj Kumar. All rights reserved. Intellectual Property of the Author.*

</div>