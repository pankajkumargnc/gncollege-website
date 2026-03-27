# 🏫 Guru Nanak College, Dhanbad — Official Website

<div align="center">

![GNC](https://img.shields.io/badge/Guru%20Nanak%20College-Dhanbad%20%7C%20Est.%201970-0f2347?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-12.x-FFCA28?style=for-the-badge&logo=firebase)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge)
![NAAC Accredited](https://img.shields.io/badge/NAAC-Accredited-27ae60?style=for-the-badge)

**🎓 A NAAC Accredited Sikh Minority Degree College | Affiliated to B.B.M.K. University**  
**📍 Bhuda Campus + Bank More Campus | Dhanbad, Jharkhand — 826001**

[🌐 Live Website](https://pankajkumargnc.github.io/gncollege-website) · [📋 Audit Report](./public/docs/audit_report.html) · [🛡️ Admin Panel Docs](./public/docs/AdminPanel_TestReport.html)

---

> **⚡ Designed, Built & Deployed by [Pankaj Kumar](https://github.com/pankajkumargnc)**
>
> *"Yeh poora project — ek ek line ka code, ek ek pixel ka design — mere dwara akele plan karke,  
> likha karke, test karke, aur deploy kiya gaya hai. Koi team nahi, koi template nahi — sirf mehnat."*

</div>

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Live Demo](#-live-demo)
3. [Tech Stack](#-tech-stack)
4. [Architecture Diagram](#-architecture-diagram)
5. [Features — A to Z](#-features--a-to-z)
6. [Firebase & Database](#-firebase--database-architecture)
7. [Admin Panel (CMS)](#-admin-panel--cms)
8. [PWA & Service Worker](#-pwa--service-worker)
9. [Performance Optimizations](#-performance-optimizations)
10. [Folder Structure](#-folder-structure)
11. [Pages & Routes Reference](#-pages--routes-reference)
12. [Components Glossary](#-components-glossary)
13. [Getting Started (Local Setup)](#-getting-started--local-setup)
14. [Environment Variables](#-environment-variables)
15. [Build & Deployment](#-build--deployment)
16. [Security Model](#-security-model)
17. [Accessibility](#-accessibility)
18. [Audit Reports](#-audit-reports)
19. [Author & Credits](#-author--credits)

---

## 🎯 Project Overview

**GNC College Website** ek ultra-modern, production-grade **React + Firebase + Vite** application hai. Yeh sirf ek static brochure website nahi hai — yeh ek **fully dynamic, CMS-powered platform** hai jisme college staff bina kisi coding knowledge ke apna content, events, gallery, notices, faculty info — sab kuch manage kar sakte hain.

### 🏆 What Makes This Special?

| Aspect | What Was Built |
|--------|---------------|
| 🔥 **Real-time Database** | Firebase Firestore — live updates across all pages |
| 🎛️ **Full CMS** | Admin panel with 20+ management modules |
| 📱 **Progressive Web App** | Installable, offline-capable, app-like experience |
| ⚡ **Blazing Performance** | Code splitting, lazy loading, WebP images, terser compression |
| 🎨 **Premium Design System** | Glass morphism, fluid typography (clamp), smooth animations |
| ♿ **WCAG Accessible** | Semantic HTML, ARIA labels, keyboard navigation |
| 🔍 **SEO Optimized** | Open Graph, structured meta tags, canonical URLs |
| 🛡️ **Secure** | DOMPurify XSS protection, Firebase Auth, env-based secrets |
| 🌐 **Multi-Campus** | Bhuda Campus + Bank More Campus — both handled |
| 📄 **Dynamic Pages** | Custom rich-text pages via Jodit editor + Firestore |

---

## 🌐 Live Demo

```
🔗 https://pankajkumargnc.github.io/gncollege-website
```

- **Admin Access:** `/#/admin` route navigate karo
- Credentials `.env` file se set hote hain (default `.env.example` dekho)

---

## 🛠️ Tech Stack

### 🖥️ Frontend

| Technology | Version | Role |
|-----------|---------|------|
| **React** | 18.2.0 | Component-based UI library |
| **React Router DOM** | 7.13.1 | Client-side SPA routing |
| **Vite** | 7.3.1 | Dev server + optimized production build |
| **React Hot Toast** | 2.6.0 | Elegant toast notifications |
| **html-react-parser** | 5.2.17 | Safe render of HTML from Firestore |
| **DOMPurify** | 3.3.3 | XSS sanitization layer |
| **react-pdf** | 10.4.1 | In-browser PDF rendering |

### 🔥 Backend (Firebase BaaS)

| Service | Purpose |
|---------|---------|
| **Cloud Firestore** | NoSQL real-time database for all dynamic content |
| **Firebase Auth** | Secure admin panel authentication |
| **Firebase Storage** | File/document/image storage |

### ✍️ Rich Content

| Package | Version | Purpose |
|---------|---------|---------|
| **Jodit React** | 5.3.21 | Full WYSIWYG rich text editor (admin only) |
| **Jodit** | 4.11.3 | Core editor engine |

### 🔧 Build & Dev Tools

| Tool | Purpose |
|------|---------|
| **Terser** | Production JS minification (`drop_console`, `drop_debugger`) |
| **vite-plugin-imagemin** | Automatic image compression on build |
| **gh-pages** | GitHub Pages automated deployment |

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER (User / Admin)                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │               React SPA (HashRouter)                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐  │   │
│  │  │ Navbar   │  │  Pages   │  │Components│  │  Admin  │  │   │
│  │  │ Footer   │  │ (Lazy)   │  │ (Eager)  │  │  Panel  │  │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬────┘  │   │
│  │       │              │              │              │        │   │
│  │  ┌────▼──────────────▼──────────────▼──────────────▼────┐ │   │
│  │  │            App.jsx — Route Manager                    │ │   │
│  │  │  • onSnapshot() Firestore listeners                   │ │   │
│  │  │  • safeLazy() error-resilient lazy loader             │ │   │
│  │  │  • useMemo() nav link optimization                    │ │   │
│  │  └───────────────────┬────────────────────────────────── ┘ │   │
│  └──────────────────────┼───────────────────────────────────── ┘   │
└─────────────────────────┼──────────────────────────────────────────┘
                           │ HTTPS
┌─────────────────────────▼──────────────────────────────────────────┐
│                      FIREBASE (Google Cloud)                        │
│                                                                      │
│  ┌──────────────────┐  ┌─────────────────┐  ┌──────────────────┐  │
│  │   Cloud Firestore │  │  Firebase Auth  │  │ Firebase Storage │  │
│  │                   │  │                 │  │                  │  │
│  │ 16+ Collections:  │  │ Email/Password  │  │ PDFs, Images     │  │
│  │ notices, events,  │  │ Admin only      │  │ (Lazy loaded)    │  │
│  │ gallery, faculty, │  │ Lazy imported   │  │                  │  │
│  │ pages, menu...    │  │ in firebase-    │  │                  │  │
│  │                   │  │ auth.js         │  │                  │  │
│  └──────────────────┘  └─────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────▼──────────────────────────────────────────┐
│                    SERVICE WORKER (PWA)                              │
│  Cache First: App Shell, Images                                      │
│  Network Only: Firebase API, YouTube, External URLs                  │
│  Offline Fallback: Custom HTML page                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features — A to Z

### 🌐 Public Website Features

| # | Feature | Details |
|---|---------|---------|
| A | **Alert Banner** | Dismissible site-wide alerts — Firebase powered |
| B | **Breadcrumbs** | Hierarchical nav trail on every inner page |
| C | **College Profile** | Detailed institutional profile page |
| D | **Department Pages** | Individual pages per department — dynamic Firestore data |
| E | **Events Page** | Event cards with dates, categories, descriptions |
| F | **Footer** | Comprehensive footer — links, campus maps, social |
| G | **Gallery** | Filterable photo gallery with 6 categories |
| H | **Hero Slider** | 15 auto-play slides, touch/swipe, keyboard accessible |
| I | **IQAC Page** | Academic quality assurance documentation |
| L | **Leadership Page** | Principal message + Governing Body profiles |
| M | **Mega Menu Navbar** | Multi-level dropdown, mobile-responsive hamburger |
| N | **News & Notifications** | Live updates from Firebase — auto-paginated |
| O | **Organogram** | College organizational chart |
| P | **Placements Section** | Placement achievements & records |
| Q | **Quick Action Nav** | Shortcut buttons for key sections |
| R | **Rich-Text Dynamic Pages** | Custom pages editable via admin panel |
| S | **Staff Page** | Staff roster display |
| T | **Ticker** | Scrolling news/notice ticker |
| V | **Video Gallery** | YouTube embed gallery |
| W | **WhatsApp Button** | Floating instant contact button |

### 🔐 Admin Panel Features (20+ Modules)

| Module | Function |
|--------|----------|
| **Dashboard** | Stats overview, quick summaries |
| **Quick Publish** | One-click publish for notices/events |
| **Gallery** | Upload, categorize, delete photos |
| **Events** | Create/edit/delete college events |
| **Notices** | Student notice board management |
| **Announcements** | Site-wide announcement management |
| **Faculty** | Faculty profiles CRUD |
| **Leadership** | Principal & governing body content |
| **Departments** | Department info editor |
| **Campus** | Campus photos & information |
| **Documents** | PDF document upload & management |
| **Drive** | Google Drive document integration |
| **Meeting PDFs** | Meeting minutes management |
| **YouTube** | Video gallery management |
| **Slider** | Hero slider image management |
| **Placements** | Placement data management |
| **Pages** | Dynamic rich-text page builder (Jodit) |
| **Menu Builder** | Navigation structure editor |
| **Alerts** | Alert banner management |
| **Settings** | Site configuration |
| **Backup** | Firestore data export/import |
| **System Test** | Live Firebase health check |
| **Activity Log** | Full admin audit trail |
| **Contact** | Form submission viewer |

---

## 🔥 Firebase & Database Architecture

### Firestore Collections Schema

```
firestore/
├── settings/          ← Site config (contact info, social URLs, etc.)
├── notices/           ← Student notices (text, date, isNew flag)
├── announcements/     ← College announcements
├── events/            ← Events (title, date, description, image)
├── gallery/           ← Gallery items (imgbb URL, category, title)
├── faculty/           ← Faculty (name, dept, designation, photo)
├── leadership/        ← Leadership profiles (principal, secretary, etc.)
├── departments/       ← Department data (courses, faculty count, etc.)
├── placements/        ← Placement records
├── slider/            ← Hero slider (image URL, caption, order)
├── documents/         ← PDF docs (title, URL, category, date)
├── youtube/           ← YouTube videos (title, URL, thumbnail)
├── alerts/            ← Site alerts (text, type, isActive)
├── pages/             ← Dynamic pages (slug, title, richText content)
├── menu/              ← Navigation menu structure
└── activity_log/      ← Admin actions with timestamp
```

### Real-time Listeners (App.jsx)
```js
// Example: notices fetch with real-time sync
onSnapshot(query(collection(db,'notices'), orderBy('date','desc')), snap => {
  setNotices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
});
```

### Firebase Auth Flow
- `firebase-auth.js` is a **separate lazy-loaded module** — never included in public bundle
- Only imported on `/admin` route — zero Auth SDK overhead for regular visitors
- Firebase Email/Password provider handles admin authentication

---

## 🛡️ Admin Panel / CMS

**Route:** `/#/admin` → Login → `/#/admin/panel`

### Access Control
1. User `/#/admin` pe jaata hai → `AdminLogin.jsx` render hota hai
2. Firebase Auth se login hota hai
3. Successful login → `AdminPanel.jsx` with full CMS access

### Key Admin Capabilities
- **Jodit WYSIWYG Editor** — Full rich text with image embed for custom pages
- **ImageCropper** — Client-side crop before upload
- **MediaPicker** — Browse all uploaded media
- **PDF Viewer** — Preview documents before publishing
- **Backup System** — Export all Firestore data as JSON, restore from backup
- **System Test** — Ping all Firebase services, check connectivity
- **Activity Log** — Every write operation logged with admin email + timestamp

---

## 📱 PWA & Service Worker

**File:** `/public/sw.js`

### Caching Strategy

| Resource Type | Strategy | Cache |
|--------------|----------|-------|
| HTML/CSS/JS (App Shell) | Cache First → Network fallback | `gnc-cache-v1` |
| Images (.webp, .jpg, .png) | Cache First → Network fallback | `gnc-images-v1` |
| Firebase API (googleapis.com) | **Network Only** | — |
| YouTube embeds | Network Only | — |
| External links (BBMKU, imgbb) | Network Only | — |

### PWA Manifest Capabilities
```json
{
  "name": "GNC Dhanbad",
  "display": "standalone",
  "theme_color": "#0f2347",
  "background_color": "#0f2347",
  "start_url": "./index.html"
}
```

- ✅ Installable on Android Chrome, iOS Safari, Desktop Chrome
- ✅ Custom offline fallback HTML page (Navy branded)
- ✅ Full Apple meta tags (`apple-mobile-web-app-*`)
- ✅ Microsoft tile support (`msapplication-*`)
- ✅ Status bar color theming

---

## ⚡ Performance Optimizations

### 🏗️ Build-time Optimizations

```js
// vite.config.js — Manual chunk splitting
manualChunks: {
  "firebase-app"  : ["firebase/app"],
  "firebase-auth" : ["firebase/auth"],      // only admin
  "firebase-db"   : ["firebase/firestore"],
  "firebase-store": ["firebase/storage"],
  "jodit"         : ["jodit-react"],        // only admin
}
```

| Optimization | Impact |
|-------------|--------|
| **Terser** `drop_console` | Removes debug logs in prod |
| **CSS code splitting** | Per-route CSS, not one giant file |
| **Hash filenames** | `[name]-[hash].js` → permanent browser caching |
| **`vite-plugin-imagemin`** | Auto compress images on build |
| **4 Firebase chunks** | Visitors never download `firebase/auth` |
| **Jodit excluded** | 0 impact on public — only admin downloads it |

### ⚙️ Runtime Optimizations

| Technique | Where | Impact |
|-----------|-------|--------|
| **`React.lazy()`** | All pages except Home+Contact | Smaller initial bundle |
| **`safeLazy()`** | All lazy imports | Auto-reload on stale chunk (deploy fix) |
| **`useMemo()`** | Nav links in App.jsx | Prevents re-renders on state change |
| **`Suspense`** | Around all lazy routes | Graceful loading state |
| **WebP images** | All `/public/images/` | 50–80% smaller than JPEG |
| **`clamp()` typography** | `index.css` | No layout shift, fluid scaling |
| **`onSnapshot` cleanup** | App.jsx useEffect | No memory leaks on unmount |
| **`overflow-x: hidden`** | html, body, #root | Guaranteed no horizontal scroll |

### 🌐 Network Optimizations

| Strategy | Implementation |
|---------|---------------|
| **Pre-bundled deps** | `optimizeDeps.include: [react, react-dom, react-router-dom]` |
| **Service Worker** | App shell cached on first visit → instant reload |
| **Lazy Firebase Auth** | Auth SDK loaded only when admin navigates to `/admin` |
| **ImgBB CDN** | External CDN for gallery images → Firebase Storage cost = 0 |

---

## 📁 Folder Structure

```
gncollege-website/
│
├── 📄 index.html              ← Entry HTML (SEO, OG, PWA manifest, favicon pack)
├── 📄 package.json            ← npm dependencies + scripts
├── 📄 vite.config.js          ← Vite build (chunks, terser, optimizeDeps)
├── 📄 .env.example            ← Environment variable template
├── 📄 .vscode/settings.json   ← Editor settings
│
├── 📂 public/
│   ├── 📄 manifest.json       ← PWA web manifest
│   ├── 📄 sw.js               ← Service Worker (multi-strategy caching)
│   ├── 📂 images/
│   │   ├── logo.webp
│   │   ├── college_photo.webp
│   │   ├── greencampus.webp
│   │   ├── organogram.webp
│   │   ├── green1–7.webp      ← Campus environment photos
│   │   ├── ncc1–4.webp        ← NCC activity photos
│   │   ├── pf1–10.webp        ← Profile photos
│   │   ├── slider_*.webp      ← Event slider images
│   │   └── 📂 HeroSlider/
│   │       └── slide0–14.webp ← 15 hero carousel images
│   └── 📂 docs/
│       ├── audit_report.html
│       ├── AdminPanel_TestReport.html
│       ├── CLAUDE_GNC_Reference.pdf
│       ├── GNC_Website_Full_Audit_Report.pdf
│       └── demo.pdf
│
└── 📂 src/
    ├── 📄 main.jsx            ← Root render + RootErrorBoundary + HashRouter
    ├── 📄 AppWrapper.jsx      ← App initializer wrapper
    ├── 📄 App.jsx             ← Routes + Firestore listeners + lazy loading
    ├── 📄 firebase.js         ← Firestore init (Auth deliberately excluded)
    ├── 📄 firebase-auth.js    ← Auth — separate lazy-loaded module
    ├── 📄 constants.js        ← Central config (COLLEGE, COLORS, SOCIAL, etc.)
    │
    ├── 📂 data/
    │   └── 📄 db.js           ← Static/fallback data + shared constants
    │
    ├── 📂 styles/
    │   ├── 📄 index.css       ← Global stylesheet (fluid type, glass, resets)
    │   ├── 📄 admin.css       ← Admin panel styles
    │   └── 📄 colors.js       ← JS color exports for inline styles
    │
    ├── 📂 hooks/
    │   └── 📄 useHashFragment.js ← Smooth scroll to hash on route change
    │
    ├── 📂 pages/              ← 19 page files
    │   ├── HomePage.jsx       ← 🔴 EAGER (critical path — first render)
    │   ├── Contact.jsx        ← 🔴 EAGER
    │   ├── AboutPages.jsx     ← 14 named exports (Vision, Principal, Cells...)
    │   ├── AcademicsPages.jsx ← IQAC, Courses, Syllabus, Calendar
    │   ├── AdmissionPages.jsx ← Rules, Fees, Documents, Notification, Intake
    │   ├── DepartmentPage.jsx ← Dynamic: /department/:id
    │   ├── GalleryPage.jsx    ← Filterable photo gallery
    │   ├── VideoGallery.jsx   ← YouTube embed gallery
    │   ├── EventsPage.jsx     ← Events with categories
    │   ├── DocumentsPage.jsx  ← PDF documents browser
    │   ├── LeadershipPage.jsx ← Leadership profiles
    │   ├── NewsPage.jsx       ← News & updates
    │   ├── NotificationsPage.jsx ← Student notices
    │   ├── NaacPages.jsx      ← SSR, AQAR, NIRF, Perspective Plan
    │   ├── ActivityPages.jsx  ← NSS, NCC, Sports, Cultural activities
    │   ├── CampusPages.jsx    ← Campus facilities
    │   ├── PublicationPages.jsx ← Library, journal
    │   ├── StaffPage.jsx      ← Staff roster
    │   └── CollegeProfile.jsx ← Institutional profile
    │
    └── 📂 components/
        ├── Navbar.jsx          ← Dynamic mega-menu, Firebase-powered
        ├── Footer.jsx          ← Full footer with maps & links
        ├── HeroSlider.jsx      ← 15-image auto-play carousel
        ├── HomeFeatures.jsx    ← Department cards + stats
        ├── PageViewer.jsx      ← Firestore rich-text page renderer
        ├── ErrorBoundary.jsx   ← React error catcher (shows friendly UI)
        ├── AlertBanner.jsx     ← Dismissible site-wide alert
        ├── MediaPicker.jsx     ← Image/file picker (admin)
        ├── ImageCropper.jsx    ← Client-side crop before upload
        ├── PDFModal.jsx        ← In-browser PDF viewer (react-pdf)
        ├── WhatsAppButton.jsx  ← Floating WhatsApp FAB
        ├── PremiumTicker.jsx   ← Animated news ticker
        ├── Ticker.jsx          ← Basic ticker fallback
        ├── Breadcrumbs.jsx     ← Hierarchical navigation
        ├── AutoPaginate.jsx    ← Automatic pagination
        ├── PremiumPagination.jsx ← Styled pagination
        ├── QuickActionNav.jsx  ← Quick shortcut navigation
        ├── AdminLogin.jsx      ← Firebase Auth login form
        ├── 📂 home/
        │   ├── TopBar.jsx           ← Info bar (phone, email, social)
        │   ├── NotificationSection.jsx ← Live notices board
        │   ├── PlacementsSection.jsx   ← Placements highlight
        │   └── SectionTitle.jsx        ← Reusable section heading
        └── 📂 admin/
            ├── AdminPanel.jsx       ← Main CMS router
            ├── AdminShared.jsx      ← Shared admin utilities
            └── 📂 tabs/ (20 tab components)
                ├── DashboardTab.jsx
                ├── QuickPublishTab.jsx
                ├── GalleryTab.jsx
                ├── EventsTab.jsx
                ├── NoticesTab.jsx
                ├── AnnouncementsTab.jsx
                ├── FacultyTab.jsx
                ├── AdminLeadershipTab.jsx
                ├── AdminDepartmentTab.jsx
                ├── AdminCampusTab.jsx
                ├── DocumentsTab.jsx
                ├── DriveTab.jsx
                ├── MeetingPDFTab.jsx
                ├── YouTubeTab.jsx
                ├── SliderTab.jsx
                ├── PlacementsTab.jsx
                ├── PagesTab.jsx
                ├── MenuBuilderTab.jsx
                ├── AlertsTab.jsx
                ├── SettingsTab.jsx
                ├── BackupTab.jsx
                ├── SystemTestTab.jsx
                ├── ActivityTab.jsx
                └── ContactTab.jsx
```

---

## 🗺️ Pages & Routes Reference

| Route Path | Component | Load |
|------------|-----------|------|
| `/` | `HomePage` | 🔴 Eager |
| `/contact` | `Contact` | 🔴 Eager |
| `/about/vision-mission` | `VisionMission` | 🟡 Lazy |
| `/about/principal-message` | `PrincipalMessage` | 🟡 Lazy |
| `/about/organogram` | `Organogram` | 🟡 Lazy |
| `/about/governing-body` | `GoverningBody` | 🟡 Lazy |
| `/about/womens-cell` | `WomensCell` | 🟡 Lazy |
| `/about/anti-ragging` | `AntiRagging` | 🟡 Lazy |
| `/about/sc-st-cell` | `ScStCell` | 🟡 Lazy |
| `/about/obc-cell` | `ObcCell` | 🟡 Lazy |
| `/about/minority-cell` | `MinorityCell` | 🟡 Lazy |
| `/about/icc-cell` | `IccCell` | 🟡 Lazy |
| `/about/placement-cell` | `PlacementCell` | 🟡 Lazy |
| `/about/rusa` | `RusaCell` | 🟡 Lazy |
| `/about/staff-council` | `StaffCouncil` | 🟡 Lazy |
| `/academics/iqac` | `IqacPage` | 🟡 Lazy |
| `/academics/courses` | `CourseOffered` | 🟡 Lazy |
| `/academics/syllabus` | `Syllabus` | 🟡 Lazy |
| `/academics/calendar` | `AcademicCalendar` | 🟡 Lazy |
| `/admission/rules` | `AdmissionRule` | 🟡 Lazy |
| `/admission/fee-structure` | `FeeStructure` | 🟡 Lazy |
| `/admission/documents` | `DocumentRequired` | 🟡 Lazy |
| `/admission/notification` | `AdmissionNotif` | 🟡 Lazy |
| `/admission/intake` | `IntakeCapacity` | 🟡 Lazy |
| `/naac/ssr` | `SsrCyclePage` | 🟡 Lazy |
| `/naac/aqar` | `AqarPage` | 🟡 Lazy |
| `/naac/nirf` | `NirfPage` | 🟡 Lazy |
| `/naac/perspective-plan` | `PerspectivePlan` | 🟡 Lazy |
| `/publication/library` | `LibraryPage` | 🟡 Lazy |
| `/activity/*` | Activity pages | 🟡 Lazy |
| `/campus/*` | Campus pages | 🟡 Lazy |
| `/department/:id` | `DepartmentPage` | 🟡 Lazy |
| `/gallery` | `GalleryPage` | 🟡 Lazy |
| `/video-gallery` | `VideoGallery` | 🟡 Lazy |
| `/events` | `EventsPage` | 🟡 Lazy |
| `/news` | `NewsPage` | 🟡 Lazy |
| `/notifications` | `NotificationsPage` | 🟡 Lazy |
| `/documents` | `DocumentsPage` | 🟡 Lazy |
| `/leadership` | `LeadershipPage` | 🟡 Lazy |
| `/staff` | `StaffPage` | 🟡 Lazy |
| `/college-profile` | `CollegeProfile` | 🟡 Lazy |
| `/page/:slug` | `PageViewerStandalone` | 🔵 Dynamic |
| `/admin` | `AdminLogin` | — |
| `/admin/panel` | `AdminPanel` | 🟡 Lazy (auth-gated) |

---

## 🧩 Components Glossary

| Component | Purpose | Notes |
|-----------|---------|-------|
| `Navbar` | Mega-menu with Firebase dynamic links | Mobile hamburger, scroll-aware |
| `Footer` | Site-wide footer | Dual campus maps, social links |
| `HeroSlider` | 15-image auto-play carousel | Touch/swipe + keyboard |
| `HomeFeatures` | Department cards + stats | Firestore-powered counts |
| `PageViewer` | Render Firestore rich-text pages | DOMPurify sanitized |
| `PageViewerStandalone` | Full-page dynamic content | Slug-based routing |
| `ErrorBoundary` | Catches React errors | Friendly UI + reload button |
| `AlertBanner` | Dismissible alert | Firebase `alerts` collection |
| `MediaPicker` | Browse & select uploaded media | Admin-only |
| `ImageCropper` | Client-side image crop | Before upload to storage |
| `PDFModal` | In-browser PDF viewer | react-pdf, modal overlay |
| `WhatsAppButton` | Floating WhatsApp FAB | Fixed bottom-right |
| `PremiumTicker` | Animated scrolling ticker | Firebase notices |
| `Ticker` | Basic ticker | Fallback variant |
| `Breadcrumbs` | Page hierarchy trail | Route-aware |
| `AutoPaginate` | Automatic list pagination | Reusable |
| `PremiumPagination` | Styled pagination controls | Premium UI |
| `QuickActionNav` | Quick-access shortcuts | Homepage only |
| `TopBar` | Header info bar | Phone, email, weather |
| `NotificationSection` | Live notice board | Firebase realtime |
| `PlacementsSection` | Placement stats display | — |
| `SectionTitle` | Consistent section header | Reusable |
| `AdminLogin` | Firebase Auth form | Auto-redirects on success |
| `AdminPanel` | 20-tab CMS | Auth-gated |

---

## 🚀 Getting Started — Local Setup

### Prerequisites

```
Node.js  >= 18.0.0
npm      >= 9.0.0
```

### Step 1: Clone

```bash
git clone https://github.com/pankajkumargnc/gncollege-website.git
cd gncollege-website
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Firebase Project Setup

1. [Firebase Console](https://console.firebase.google.com/) → New Project
2. **Firestore** → Create Database → Production mode
3. **Authentication** → Enable → Email/Password provider
4. **Storage** → Enable
5. **Project Settings** → Your Apps → Add Web App → Copy config

### Step 4: Create .env File

```bash
cp .env.example .env
```

Fill in your Firebase credentials (see next section).

### Step 5: Run Dev Server

```bash
npm run dev
# Opens at http://localhost:3000
```

### Step 6: Create First Admin User

Go to Firebase Console → Authentication → Add User → set email + password → use these to login at `/#/admin`.

---

## 🔑 Environment Variables

**File:** `.env` (root of project — never commit this!)

```env
# ── Firebase Config ──────────────────────────────────────────────────
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# ── Admin Credentials (optional — change in production!) ─────────────
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=YourStrongPassword@2024
```

| Variable | Required | Purpose |
|---------|----------|---------|
| `VITE_FIREBASE_API_KEY` | ✅ | Firebase Web API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | ✅ | Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | ✅ | Firestore + all services |
| `VITE_FIREBASE_STORAGE_BUCKET` | ✅ | File storage |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ✅ | FCM Sender ID |
| `VITE_FIREBASE_APP_ID` | ✅ | App registration ID |
| `VITE_ADMIN_USERNAME` | Optional | Admin UI username hint |
| `VITE_ADMIN_PASSWORD` | ⚠️ Change! | Admin fallback — set strong password |

> **Security:** `.env` file `.gitignore` mein already listed hai. Kabhi bhi GitHub pe push mat karo!

---

## 🌍 Build & Deployment

### Build

```bash
npm run build
# Output: /dist folder
```

### GitHub Pages Deploy

```bash
npm run deploy
# = npm run build → gh-pages -d dist
```

**`vite.config.js` base path:**
```js
base: "/gncollege-website/"   // GitHub Pages repo sub-path
```

### Custom Domain Deploy
1. `vite.config.js` mein `base: "/"` set karo
2. `index.html` mein canonical URL update karo
3. `public/CNAME` file banao with your domain
4. `npm run build` → `/dist` deploy karo

### Vercel / Netlify
```bash
npm run build    # Build command
dist/            # Output directory
```
SPA routing ke liye `_redirects` (Netlify) ya `vercel.json` add karo.

### Apache / Nginx
`/dist` serve karo with catch-all redirect to `index.html`.

---

## 🔒 Security Model

| Layer | Measure | Implementation |
|-------|---------|---------------|
| **XSS** | HTML sanitization | `DOMPurify.sanitize()` on all Firestore HTML |
| **Authentication** | Firebase Auth | Admin routes auth-gated, JWT tokens |
| **Secrets** | Environment variables | `.env` file, never in code |
| **Injection** | NoSQL database | Firestore — no SQL injection vectors |
| **CORS** | Firebase managed | Google handles API CORS |
| **Content Security** | Parser + sanitizer | `html-react-parser` + DOMPurify combo |
| **Auth Lazy Load** | Bundle isolation | `firebase/auth` never loaded on public pages |

### ⚠️ Pre-Deployment Checklist
- [ ] Firebase Firestore Rules → lock down write rules for production
- [ ] Change default admin password in `.env`
- [ ] Create Firebase Auth user (don't use default creds)
- [ ] Verify `.env` is in `.gitignore`
- [ ] Update `canonical` URL in `index.html`
- [ ] Update `COLLEGE.SOCIAL` URLs in `constants.js`

---

## ♿ Accessibility

| Feature | Implementation |
|---------|---------------|
| **Language declaration** | `<html lang="hi">` |
| **Semantic structure** | `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>` |
| **ARIA attributes** | `aria-label`, `aria-current`, `aria-expanded`, `role` throughout |
| **Keyboard navigation** | All interactive elements keyboard accessible |
| **Focus styles** | Custom focus rings preserved |
| **Color contrast** | Navy `#0f2347` on white — 10.5:1 ratio (AAA) |
| **Alt text** | All `<img>` have descriptive alt attributes |
| **Touch targets** | Minimum 44×44px touch targets on mobile |
| **Fluid font scaling** | `clamp()` — readable on all screen sizes (360px → 2560px) |

---

## 📊 Audit Reports

Full reports available in `public/docs/`:

| Report | Format | Contents |
|--------|--------|---------|
| `audit_report.html` | HTML | Performance, Accessibility, Security, SEO audit |
| `AdminPanel_TestReport.html` | HTML | Admin panel test coverage |
| `GNC_Website_Full_Audit_Report.pdf` | PDF | Complete technical audit |
| `CLAUDE_GNC_Reference.pdf` | PDF | AI-assisted development reference |
| `demo.pdf` | PDF | Project demo document |

---

## 👤 Author & Credits

<div align="center">

## 🧑‍💻 Pankaj Kumar

### *Sole Designer & Developer*

> **"Is website ka har ek component, har ek page, har ek feature —  
> mere dwara scratch se design karke, code karke aur deploy kiya gaya hai.  
> Koi ready-made template nahi, koi outsourced work nahi — 100% original creation."**

| Contact | |
|---------|--|
| 🌐 **GitHub** | [@pankajkumargnc](https://github.com/pankajkumargnc) |
| 📧 **Email** | pankajkumargnc@gmail.com |
| 🏫 **Institution** | Guru Nanak College, Dhanbad, Jharkhand |

---

### Tech Stack Credits

| Technology | Creator |
|-----------|---------|
| React | Meta (Facebook) |
| Firebase | Google |
| Vite | Evan You & Vite Team |
| Jodit | Valeriy Chupurnov |
| React Router | Remix Software |
| react-pdf | wojtekmaj |
| DOMPurify | Cure53 |

---

*🏫 Built with ❤️ for Guru Nanak College, Dhanbad*

*© 2024–2026 Pankaj Kumar. All rights reserved.*

*Website design, architecture, codebase — original work, not for redistribution.*

</div>

---

<div align="center">

![Built with React](https://img.shields.io/badge/Built%20with-React%2018-61DAFB?style=flat-square&logo=react)
![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?style=flat-square&logo=firebase)
![Hosted on GitHub Pages](https://img.shields.io/badge/Hosted-GitHub%20Pages-222?style=flat-square&logo=github)
![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=flat-square)
![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)

</div>