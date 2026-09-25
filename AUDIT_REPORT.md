# GNC Digital Campus — Website 2.0: Full Master Audit Report
**Project:** Guru Nanak College, Dhanbad — Digital Campus Portal Upgrade  
**Repository:** `pankajkumargnc/gncollege-website` (`main` branch)  
**Audit Local Timestamp:** 2026-09-25T14:02:00+05:30  
**Audit Role:** Principal Software Architect, Full-Stack Engineer, Firebase Architect, Security & Performance Engineer  
**Status:** Phase 0 (Full Backup Checkpoint) Complete | Phase 1 (Full Project Audit) Complete  

---

## 1. Executive Summary & Verdict

This comprehensive audit of the **Guru Nanak College, Dhanbad** web repository was conducted directly on the complete project files within Antigravity IDE. The audit evaluated all 140+ source files, configuration manifests, build scripts, Firebase Cloud Functions, Firestore/Storage security rules, CI/CD pipelines, testing harnesses, and bundle compositions.

### Overall Verdict: Strong Foundation, Strategic Modernization Required
The project possesses a robust modern React/Vite/Firebase foundation, clean component modularity, instant cloud-sync architecture, zero mobile overflow across 320px–1920px viewports (48/48 automated checks passing), and 109 passing unit/integration tests. 

However, achieving the **"GNC Digital Campus — Website 2.0"** target standard requires resolving several architectural, security, performance, and UI/UX gaps:
1. **Security & Session Management (P0/P1):** Admin authentication currently uses persistent local storage (`browserLocalPersistence`) rather than session-only persistence (`browserSessionPersistence`), and lacks automated idle auto-logout (10–15 min timeout with countdown) and tab-close protection per Section 81. In Storage rules, open global reads (`match /{allPaths=**}`) expose private assets and lack structured path partitioning (`/public/...` vs `/private/...`).
2. **Performance & Bundle Bloat (P1):** The initial JavaScript bundle (`index.js` at 568 kB minified / 163 kB gzip) loads unnecessary libraries. Redundant dual charting libraries (`apexcharts` at 970 kB and `recharts` at 394 kB) exist in dependencies; `PDFModal` and `canvas-confetti` are statically imported into multiple public pages; and `PlacementAnalytics` pulls Recharts into the home page.
3. **Information Architecture & Navigation (P1):** The "Student Corner" required by Section 18 as a top-level hub is absent from the navigation structure.
4. **Content Governance & Workflow (P1):** The CMS lacks the multi-stage content lifecycle (`draft → pending → approved → scheduled → published → expired → archived`), role-based access control (RBAC with custom claims for `super_admin`, `principal`, `office_admin`, `department_admin`, `editor`, `viewer`), and content revision history/versioning required by Sections 21–23.
5. **Design System Consolidation (P2):** Color tokens in `colors.js` (`#0f2347`, `#f4a023`) and CSS variables require strict synchronization with the specified Website 2.0 Palette (Primary `#0B1F3A`, Secondary `#D4A72C`, Accent `#F4B942`, Background `#F7F9FC`, Surface `#FFFFFF`, Text `#172033`, Muted `#64748B`).

---

## 2. Methodology & Evidence Base

The audit was conducted using real local metrics:
- **Phase 0 Safety Checkpoint:** Dedicated git branch `backup/pre-upgrade-2026-09-25`, tag `backup-pre-upgrade-2026-09-25`, and complete external directory backup `gnc-college-backup-2026-09-25_132644` containing all environment secrets, rules, and assets.
- **Automated Unit & Integration Test Suite:** 109/109 passing tests (`npm test`).
- **Production Bundle Compilation:** Vite 7.3.1 + Terser build output analysis (`npm run build`).
- **Playwright Responsive & Overflow Matrix:** 48/48 checks passing across 6 viewports (320px, 375px, 768px, 1024px, 1440px, 1920px).
- **Security Rule Static Evaluation:** Syntax, permission models, and role coverage for `firestore.rules` and `storage.rules`.

---

## 3. Technology Architecture & Stack Review

| Component | Current Technology | Website 2.0 Evaluation & Status |
|---|---|---|
| **Core Framework** | React 18.2.0 + Vite 7.3.1 | Excellent. Fast HMR, ESM bundling, React 18 Concurrent mode support. Retain. |
| **Language** | TypeScript / JavaScript (ESM) | Mixed `.jsx` and `.js` with `tsconfig.json`. Strict typing to be progressively enforced. |
| **Routing** | React Router v7.13.1 (`HashRouter`) | Needs clean URL migration with proper SPA fallback support (`BrowserRouter` with custom base). |
| **Backend & Cloud** | Firebase v12.10.0 (Firestore, Storage, Auth, Functions v2) | Serverless, real-time reactive sync. Needs security rule tightening and scheduled publishing functions. |
| **CSS & Design System** | Vanilla CSS + CSS Custom Properties (`src/styles/index.css`) | High performance, zero CSS-in-JS runtime overhead. Needs token harmonization to Section 4 palette. |
| **Icons** | Lucide React v1.7.0 | Clean, accessible SVG icons. Uniform throughout. Retain. |
| **PWA** | Vite-Plugin-PWA v1.2.0 + Workbox | Manifest, service worker, offline fallback. Caching strategy needs tuning. |
| **Rich Text Editor** | Jodit React v5.3.21 | 697 kB chunk; properly code-split and lazy-loaded only in admin pages. |
| **Mapping** | Leaflet 1.9.4 + React-Leaflet 4.2.1 | 153 kB chunk; loaded only when Contact page mounts. Retain. |
| **Charts** | Dual: ApexCharts (970 kB) + Recharts (394 kB) | **Redundant**. Consolidate to single lightweight chart library. |
| **Testing** | Playwright 1.58.2 + Custom Node ESM Unit Runner | 109 unit tests + 48 responsive tests. Fast, reliable. |

---

## 4. Detailed Audit Findings by Category

### Priority Scale
- **P0 — Critical:** Security vulnerability, unrecoverable data loss risk, or broken core service.
- **P1 — High:** Architectural violation, major performance bottleneck, missing required core feature, or session vulnerability.
- **P2 — Medium:** Code duplication, incomplete workflow, design system inconsistency, or suboptimal UX.
- **P3 — Nice to Have:** Minor cosmetic enhancement, supplementary documentation, or non-critical refactor.

---

### Category A: Security & Authentication

#### [P0] Storage Security Rules: Global Public Read Access (`storage.rules`)
- **Finding:** Line 17 of `storage.rules` specifies `match /{allPaths=**} { allow read: if true; }`. This exposes the entire Storage bucket publicly, including any private administrative or student document uploads.
- **Violation:** Sections 29, 78, and 80.
- **Remediation:** Partition Storage into `/public/` (public read, authenticated admin write) and `/private/` (restricted access based on student token or admin credentials). Enforce nested wildcard matching (`/documents/{allPaths=**}`) rather than single-segment `{docFile}`.

#### [P1] Admin Session Persistence & Tab-Close Protection (`firebase-auth.js`)
- **Finding:** Lines 20–25 of `src/firebase-auth.js` execute `setPersistence(auth, browserLocalPersistence)`. Admin credentials persist permanently in `localStorage`. If an administrator closes the browser tab, the session remains active indefinitely.
- **Violation:** Section 81 (tab-close behavior).
- **Remediation:** Configure `browserSessionPersistence` for admin authentication so closing the tab immediately terminates the session. When navigating directly to `#admin` or `/admin` entry points while active, enforce explicit re-authentication check.

#### [P1] Missing Admin Idle Auto-Logout with Warning Countdown
- **Finding:** No idle timer or inactivity listener is implemented for the admin panel. If an administrator leaves their workstation unattended, the dashboard remains indefinitely accessible.
- **Violation:** Section 81 (idle auto-logout requirement).
- **Remediation:** Implement a global idle-detection hook (`useAdminIdleTimeout`) that tracks genuine user interactions (mouse move, click, keydown). Trigger a 60-second warning modal after 10 minutes of inactivity and execute automatic secure logout if unacknowledged.

#### [P1] RBAC Authorization Model in Firestore Security Rules (`firestore.rules`)
- **Finding:** In `firestore.rules`, authorization is restricted to an `isAdmin()` check evaluating 3 hardcoded emails or `token.admin == true`. The system does not enforce multi-tier roles (`super_admin`, `principal`, `office_admin`, `department_admin`, `editor`, `viewer`).
- **Violation:** Section 21 & Section 29.
- **Remediation:** Implement granular role evaluation helper functions in Firestore rules (`isSuperAdmin()`, `isPrincipal()`, `isEditor()`, `canPublishNotices()`).

#### [P2] Insecure Dummy Credentials in `.env.example`
- **Finding:** `.env.example` defines `VITE_ADMIN_USERNAME=admin` and `VITE_ADMIN_PASSWORD=admin123`. While unused in production client code, exposing sample admin passwords in `.env.example` encourages insecure configuration and can leak into client bundles if accessed via `import.meta.env`.
- **Violation:** Section 38 & Section 63.
- **Remediation:** Clean up `.env.example` to remove fake admin credential variables, documenting Firebase Auth console provisioning instead.

---

### Category B: Performance & Bundle Optimization

#### [P1] Redundant Dual Charting Libraries (ApexCharts vs Recharts)
- **Finding:** `package.json` includes both `apexcharts` / `react-apexcharts` (970 kB minified) and `recharts` (394 kB minified). `DashboardTab.jsx` uses ApexCharts, while `PlacementAnalytics.jsx` uses Recharts. Together they consume >1.36 MB of minified JavaScript.
- **Violation:** Section 32, 64, and 65.
- **Remediation:** Standardize on a single charting library across admin and public views, eliminating one 500kB+ dependency from the dependency graph.

#### [P1] Homepage Loads Chart Bundle via `PlacementsSection`
- **Finding:** `HomePage.jsx` imports `PlacementsSection`, which dynamically mounts `PlacementAnalytics`, triggering the load of the 394 kB `vendor-charts` chunk during initial page scroll.
- **Violation:** Section 33 ("The homepage must NOT load: PDF libraries, analytics chart libraries, maps...").
- **Remediation:** Replace the eager chart loading on the homepage with high-impact static visual stat badges and a "View Trend Analytics" interactive modal/sub-page trigger, deferring the chart bundle until explicitly requested.

#### [P1] Static Imports of `PDFModal` in Public Pages
- **Finding:** While `HomePage.jsx` properly uses `const PDFModal = lazy(() => import('../components/PDFModal'))`, `AboutPages.jsx`, `NotificationsPage.jsx`, `RegulationsPage.jsx`, and `EventsPage.jsx` import `PDFModal` statically. This forces the 848 kB `vendor-pdf` bundle (`pdfjs-dist` + `react-pdf` + `pdf-lib`) into the initial chunk of those routes.
- **Violation:** Section 32 & 33.
- **Remediation:** Convert all `PDFModal` imports to `safeLazy(() => import('../components/PDFModal'))` so PDF rendering libraries are loaded on-demand only when a user clicks "View PDF".

#### [P2] Static Import of `canvas-confetti`
- **Finding:** `src/utils/confetti.js` statically imports `canvas-confetti`. Because `HomePage.jsx` imports helper functions from `confetti.js`, the confetti library is bundled into the core homepage bundle.
- **Violation:** Section 32.
- **Remediation:** Dynamic import `canvas-confetti` inside the execution functions (`await import('canvas-confetti')`).

#### [P2] Universal Search Bundles Fuse.js Statically
- **Finding:** In `src/App.jsx`, `UniversalSearch` is statically imported even though it is wrapped in `<Suspense>`. This includes `fuse.js` (approx. 25 kB) directly in `index.js`.
- **Violation:** Section 32.
- **Remediation:** Convert `UniversalSearch` in `App.jsx` to `const UniversalSearch = lazy(() => import("./components/UniversalSearch"))`.

---

### Category C: Information Architecture & Public UI/UX

#### [P1] Missing Top-Level "Student Corner" Hub
- **Finding:** The site lacks a dedicated "Student Corner" top-level route and navigation menu. Essential student links (Examination Results, Syllabus, Academic Calendar, Scholarships, Document Requests, Grievance Cell) are scattered under `Academics`, `Admission`, or `About Us`.
- **Violation:** Section 6 and Section 18.
- **Remediation:** Add "Student Corner" to the primary desktop navigation, mobile drawer, and create a centralized `/student-corner` gateway page aggregating these services.

#### [P1] Design System Token Alignment
- **Finding:** `src/styles/colors.js` and `src/styles/index.css` use legacy color values (`--navy: #0f2347`, `--gold: #f4a023`). Section 4 defines the official Website 2.0 design tokens:
  - Primary: `#0B1F3A`
  - Secondary: `#D4A72C`
  - Accent: `#F4B942`
  - Background: `#F7F9FC`
  - Surface: `#FFFFFF`
  - Text: `#172033`
  - Muted: `#64748B`
- **Violation:** Section 4 & Section 5.
- **Remediation:** Update `colors.js` and `:root` custom properties in `index.css` to the exact specified tokens, ensuring smooth contrast and consistency across all cards, buttons, and badges.

#### [P2] Global Search Data Incompleteness
- **Finding:** `UniversalSearch.jsx` only indexes static core routes, notices, faculties, custom pages, and gallery items. It ignores courses, academic departments, and downloadable documents.
- **Violation:** Section 10.
- **Remediation:** Expand the searchable data array in `UniversalSearch.jsx` to include `departments`, `courses`, and `documents` with category badges and instant Ctrl+K keyboard navigation.

---

### Category D: CMS & Governance Capabilities

#### [P1] Content Lifecycle Statuses & Workflow
- **Finding:** Notices and News items currently toggle between active/pinned/new without formal lifecycle stages. The schema lacks explicit support for `draft → pending → approved → scheduled → published → expired → archived`.
- **Violation:** Section 11, 12, and 22.
- **Remediation:** Upgrade the content schema in `NoticesTab.jsx`, `EventsTab.jsx`, and `NewsPage.jsx` with an explicit `status` field, status badges in admin tables, and automated archival filtering for expired items.

#### [P1] Automated Server-Side Scheduled Publishing
- **Finding:** Content scheduling currently relies entirely on client-side date comparison (`new Date(item.publishDate) <= now`). If an admin schedules a notice for 09:00 AM, it does not officially transition to `published` in Firestore unless an admin manually updates it.
- **Violation:** Section 25.
- **Remediation:** Deploy an automated Cloud Function (`scheduledContentPublisher`) in `functions/index.js` running on cron to check and transition pending scheduled notices and events to `published` status.

#### [P1] Content Version History & Rollback
- **Finding:** When an admin edits a notice, event, department, or CMS page, the existing document fields are overwritten in Firestore. No historical snapshots or restoration capabilities exist.
- **Violation:** Section 23.
- **Remediation:** Implement a subcollection `/revisions/` for critical content collections (`pages`, `notices`, `departments`) that saves snapshot history (`version`, `data`, `updatedBy`, `timestamp`) on every write, providing a one-click "Restore Previous Version" modal in the admin UI.

#### [P2] Audit Trail Schema Standardization
- **Finding:** Admin logs in `adminLogs` record basic actions but lack structured tracking of previous vs new state diffs and actor role metadata.
- **Violation:** Section 24.
- **Remediation:** Standardize the audit logger (`logAct`) across all admin tabs to record `{ action, collection, docId, userEmail, userRole, timestamp, details }`.

---

### Category E: SEO, Clean URLs & Custom Domain

#### [P1] Canonical Domain Hardcoding (`index.html` & `seoManager.js`)
- **Finding:** `index.html` and `src/utils/seoManager.js` hardcode `https://gnc-college-web.web.app` across canonical tags, OpenGraph URLs, Twitter metadata, and JSON-LD schema. If deployed to a custom domain (e.g. `https://gncollege.org`), search engines index the wrong canonical domain.
- **Violation:** Section 37 & Section 90.
- **Remediation:** Make canonical domain configurable via `import.meta.env.VITE_CANONICAL_DOMAIN || 'https://gncollege-web.web.app'`. In `index.html`, ensure asset links use configurable base paths.

#### [P2] Routing Architecture: HashRouter vs BrowserRouter
- **Finding:** `src/main.jsx` uses `HashRouter` (`/#/about-us/...`). While safe for basic static servers, Section 36 specifies clean URLs (`/about-us/...`) where host configuration permits. `firebase.json` already contains `rewrites: [{ source: "**", destination: "/index.html" }]`.
- **Violation:** Section 36.
- **Remediation:** Provide clean URL support with configurable router selection or fallback so custom domains and Firebase hosting run with standard clean URLs while preserving hash compatibility for legacy links.

---

## 5. Prioritized Action Matrix

| Issue ID | Area | Description | Priority | Target Phase |
|---|---|---|:---:|:---:|
| **SEC-01** | Storage Rules | Fix open wildcard read; partition into `/public/` & `/private/` | **P0** | Phase 3 |
| **SEC-02** | Auth Persistence | Switch from `browserLocalPersistence` to `browserSessionPersistence` | **P0** | Phase 3 |
| **SEC-03** | Session Security | Add 15-minute idle auto-logout with 60-second warning countdown | **P1** | Phase 3 |
| **SEC-04** | RBAC Enforcement | Implement multi-role permissions in rules & admin UI | **P1** | Phase 3 / Phase 8 |
| **PERF-01** | Dependency Audit | Remove ApexCharts; consolidate on Recharts | **P1** | Phase 4 |
| **PERF-02** | Code Splitting | Lazy-load `PDFModal` across all remaining pages | **P1** | Phase 4 |
| **PERF-03** | Homepage Load | Defer Recharts loading from `PlacementsSection` | **P1** | Phase 4 |
| **PERF-04** | Micro-Bundles | Lazy-load `canvas-confetti` and `UniversalSearch` | **P2** | Phase 4 |
| **UI-01** | Design Tokens | Harmonize palette with Section 4 Design System tokens | **P1** | Phase 5 |
| **UI-02** | Information Arch | Implement "Student Corner" hub in navigation and dedicated page | **P1** | Phase 6 |
| **UI-03** | Global Search | Index departments, courses, and documents in search | **P2** | Phase 6 |
| **CMS-01** | Content Workflow | Add full status workflow (`draft` → `published` → `archived`) | **P1** | Phase 7 |
| **CMS-02** | Version History | Implement revision history snapshotting and restore in CMS | **P1** | Phase 8 |
| **CMS-03** | Cloud Publishing | Add scheduled publishing Cloud Function in `functions/index.js` | **P1** | Phase 8 |
| **SEO-01** | Canonical Config | Replace hardcoded domain in `seoManager.js` and `index.html` | **P1** | Phase 9 |
| **SEO-02** | Clean URLs | Enable clean URL routing with SPA rewrite compatibility | **P2** | Phase 9 |

---

## 6. Next Steps & Implementation Roadmap

With **Phase 0 (Backup Checkpoint)** and **Phase 1 (Full Project Audit)** completed, the project is ready to proceed through the sequential implementation order defined in Section 98:
- **Phase 2:** Critical bug fixes
- **Phase 3:** Security hardening (Storage rules, session persistence, idle timeout)
- **Phase 4:** Performance optimization (Dependency consolidation, lazy-loading heavy bundles)
- **Phase 5:** Design system tokens alignment
- **Phase 6:** Public UI enhancements (Student Corner hub, search expansion)
- **Phase 7:** Admin CMS enhancements
- **Phase 8:** Workflow, versioning & RBAC

All subsequent phases will adhere strictly to **Ground Rule GR-1** (checkpoint before high-risk changes) and **Ground Rule GR-2** (zero remote GitHub pushes without explicit permission).
