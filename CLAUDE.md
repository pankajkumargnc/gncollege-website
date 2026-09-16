# 🤖 CLAUDE.md — AI Engineering & Development Reference (v2.1.0)

> **CRITICAL NOTICE FOR AI ASSISTANTS (Claude, Antigravity, Copilot, etc.)**  
> This file contains the complete architectural blueprint, strict non-negotiable rules, data flows, and development standards for the **Guru Nanak College (GNC Dhanbad)** web application.
> 
> You MUST read and strictly adhere to the rules in this document before proposing or applying ANY changes. All architectural decisions (HashRouter, Split-Core Auth, clamp() typography, Zero-Deletion fallback, Quota Shield, Zero-Emoji Lucide icons) are deliberate, rigorously tested, and production-enforced. Do NOT refactor or bypass them without explicit human instructions.

---

## 🏫 1. Project Identity & Architecture Baseline

```yaml
Project Name:       Guru Nanak College Official Web Portal
Repository:         pankajkumargnc/gncollege-website
Author & Architect: Pankaj Kumar (Sole Designer, Lead Architect & Full-Stack Developer)
Institution:        Guru Nanak College, Dhanbad, Jharkhand (Est. 1970)
Affiliation:        BBMKU (Binod Bihari Mahto Koyalanchal University), NAAC Grade 'B'
Current Version:    v2.1.0 (Master Production Release)
Diagnostic Core:    Supreme Diagnostic Engine v400.0 (36-Phase Real Audit)
Hosting Targets:    GitHub Pages (Primary Static) & Firebase Hosting
Primary Tech Stack: React 18.2.0 + Vite 7.3.1 + Firebase 12.10.0 + Vanilla CSS (Lumina) + PWA
Verification:       Playwright 1.58.2 Headless QA (42/42 Checks Passed, 100% Zero Overflow)
```

---

## ⚠️ 2. Non-Negotiable Architectural Rules (The Golden Principles)

### 📌 Rule 1: HashRouter is Mandatory — NEVER Switch to BrowserRouter
```jsx
// src/main.jsx — MANDATORY ROUTER TYPE
import { HashRouter as Router } from 'react-router-dom';
```
- **Reason:** The primary production site is hosted on GitHub Pages (`https://pankajkumargnc.github.io/gncollege-website/`), which does not support server-side URL rewriting for single-page applications. Static hosting requires `#/` hash routes.
- **Strict Prohibition:** **NEVER** propose, rewrite, or switch to `BrowserRouter`. Doing so breaks sub-page reloads and triggers HTTP 404 errors on GitHub Pages.

---

### 📌 Rule 2: Split-Core Firebase Architecture — NEVER Merge Auth with Main Bundle
```
Public Visitor Bundle       ──>  src/firebase.js        (Only Cloud Firestore + Analytics)
Admin Panel Route (#/admin)  ──>  src/firebase-auth.js   (Lazy-loaded Firebase Auth SDK)
```
- `src/firebase.js` initializes Firestore with offline cache persistence (`persistentLocalCache`, `persistentMultipleTabManager`) and Analytics. It imports **ZERO** authentication packages.
- `src/firebase-auth.js` initializes `firebase/auth` and is dynamically imported **only** when an administrator visits `#/admin`.
- **Strict Prohibition:** **NEVER** import from `firebase/auth` inside `src/firebase.js` or in any public page/component. Keep the public payload lean.

---

### 📌 Rule 3: safeLazy & safeLazyTab — Fault-Tolerant Dynamic Loading
All route pages and admin tabs are lazy-loaded through specialized fault-tolerant wrappers:
- **`safeLazy` in `src/components/AppRoutes.jsx`**: Intercepts `ChunkLoadError` caused by users visiting the site during or after a new deployment, reloading the page automatically up to 2 times via `sessionStorage.getItem('gnc_lazy_reload')`.
- **`safeLazyTab` in `src/components/admin/AdminPanel.jsx`**: Wraps all 28 administrative tabs with auto-retries and renders an interactive recovery card with a manual reload trigger if network bundles fail.
- **Strict Prohibition:** **NEVER** replace `safeLazy` or `safeLazyTab` with standard, unhandled `React.lazy()`.

---

### 📌 Rule 4: Editorial Typography & Fluid CSS clamp()
- **Full Justified Body Paragraphs**: All editorial paragraphs (`p`, `.rich-text-content p`, `.prose p`, `article p`, `.content-card p`, CMS `.gnc-prose p`) strictly enforce:
  ```css
  text-align: justify !important;
  text-justify: inter-word !important;
  hyphens: auto;
  -webkit-hyphens: auto;
  ```
  Both left and right margins must align flush to present an authoritative publication standard.
- **Fluid clamp() Sizing**: All font sizes and spacing utilize fluid CSS tokens in `src/styles/index.css` (`--text-xs` through `--text-hero`, `--space-*`).
- **Strict Prohibition:** **NEVER** hardcode fixed pixel font sizes (`font-size: 16px;`) or replace fluid tokens with rigid media query breakpoints.

---

### 📌 Rule 5: 100% Vector SVG Standard — Strict Zero-Emoji Policy
All informal emojis across the public site, navigation, and all 28 Admin tabs have been eliminated and replaced with crisp, accessible vector SVGs from `lucide-react` (`<GraduationCap />`, `<Landmark />`, `<Award />`, `<ScrollText />`, `<Building2 />`, `<FileText />`).
- **Strict Prohibition:** **NEVER** insert raw emojis (e.g. `🎓`, `🏛️`, `📢`, `🔥`) into navigation labels, admin tab titles, buttons, or institutional badge headers. Always use vector icons from `lucide-react`.

---

### 📌 Rule 6: React 18 / 19 Lucide Icon Rendering Safety
In React 18 and 19, Lucide icons wrapped in `React.forwardRef` evaluate to `typeof === 'object'` (with properties `{$$typeof, render}`). A condition checking `typeof Icon === 'function'` evaluates to `false` and causes React to render the icon object directly as a child, crashing the component with:
`Objects are not valid as a React child (found: object with keys {$$typeof, render})`.
- **Correct Rendering Pattern:**
  ```jsx
  {React.isValidElement(Icon) ? Icon : (Icon ? <Icon size={18} /> : null)}
  ```
- **Strict Requirement:** Always use `React.isValidElement(Icon)` or inspect the icon safely before rendering dynamic icons.

---

### 📌 Rule 7: Zero-Deletion Architecture (Headless CMS Fallbacks)
We employ a Headless CMS pattern leveraging the `pageContent` collection in Cloud Firestore.
- **Fallback Rule:** Whenever calling `usePageContent(slug)`, you **MUST** provide the complete, hardcoded JSX/JSON data as the fallback argument:
  ```jsx
  const { content, getList, getText } = usePageContent('college-profile');
  const milestones = getList('milestones', DEFAULT_MILESTONES);
  ```
- **Strict Prohibition:** **NEVER** remove or wipe the hardcoded baseline data arrays. If Firestore data is wiped, unauthenticated, or offline, the component MUST gracefully display the built-in institutional content.

---

### 📌 Rule 8: Google Drive API Quota Shield
Raw Google Drive API v3 calls will fail under high student traffic with HTTP 403 / 429 quota exhaustion.
- Always fetch Drive files through `src/hooks/useDriveDocs.js`.
- The hook provides a **4-tier shield**: Memory Cache (`Map`) ➔ 15-minute `sessionStorage` Quota Shield Cooldown ➔ `localStorage` Stale-While-Revalidate (30-minute window) ➔ Live API call.
- Use `clearDriveCache()` to invalidate cache programmatically when new files are uploaded.
- **Strict Prohibition:** Do NOT make unthrottled raw `fetch()` calls to `googleapis.com/drive/v3/files` directly from components.

---

### 📌 Rule 9: Universal DOMPurify Sanitization
Every piece of HTML originating from Firestore, Jodit Rich Text Editor, or external feeds **MUST** be sanitized before rendering via `html-react-parser` or `dangerouslySetInnerHTML`:
```javascript
import DOMPurify from 'dompurify';
const cleanHtml = DOMPurify.sanitize(rawHtmlFromFirestore);
```
- **Strict Prohibition:** **NEVER** bypass `DOMPurify.sanitize()`.

---

### 📌 Rule 10: Base64 & LocalStorage JSON Parsing Resilience
In `SystemTestTab.jsx` and caching utilities, never pass raw localStorage strings directly to `JSON.parse()` without checking for legacy base64-encoded strings:
- Use `safeParseAuditHistory()` or `decodePayload(cached)` from `src/utils/cachedFetch.js`.
- This eliminates `SyntaxError: Unexpected token 'W', "W3sic2Nvcm"... is not valid JSON`.

---

### 📌 Rule 11: Real-Time Snapshot Unsubscribe Hygiene
Every `onSnapshot` listener registered in `App.jsx`, `useAppData.js`, or admin tabs **MUST** return its cleanup unsubscribe function inside `useEffect`:
```javascript
useEffect(() => {
  const unsub = onSnapshot(queryRef, (snap) => { ... });
  return () => unsub();
}, []);
```
- Failing to unsubscribe leaks Firestore connections, consumes quota, and degrades browser performance.

---

## 📂 3. Key File Map & Change Risk Assessment

| File Path | Purpose & Architectural Role | Change Risk Level |
|---|---|---|
| `src/main.jsx` | React DOM mount, `RootErrorBoundary`, `HashRouter`, AOS animation | 🔴 High |
| `src/App.jsx` | App root, master real-time state, dark mode, layout, PWA notification listener | 🔴 High |
| `src/components/AppRoutes.jsx` | Master route table (40+ routes), `safeLazy` dynamic loader, `PageLoader` | 🔴 High |
| `src/firebase.js` | Cloud Firestore configuration with multi-tab offline cache (Public bundle) | 🟡 Moderate |
| `src/firebase-auth.js` | Firebase Authentication SDK, persistence, admin credentials (Lazy-loaded) | 🟡 Moderate |
| `src/hooks/useAppData.js` | Real-time collection snapshots, `site_sync` remote listener, `BroadcastChannel` | 🔴 High |
| `src/hooks/useDriveDocs.js` | Google Drive API v3 4-tier Quota Shield & memory cache | 🟡 Moderate |
| `src/hooks/usePageContent.js` | Headless CMS hook with zero-deletion fallback support | 🟢 Safe |
| `src/constants.js` | College metadata, color tokens, layout boundaries, collection names | 🟢 Safe |
| `src/styles/index.css` | Lumina design system, fluid typography tokens, full justified copy, tactile physics | 🔴 High |
| `src/styles/admin.css` | Admin Panel layout, HUD controls, tab cards, modal styling | 🟡 Moderate |
| `src/components/Navbar.jsx` | 3-level mega navigation, search trigger, mobile drawer | 🟡 Moderate |
| `src/components/admin/AdminPanel.jsx` | Admin ecosystem orchestrator, sidebar, `safeLazyTab` loader | 🔴 High |
| `src/components/admin/tabs/SystemTestTab.jsx` | Supreme Diagnostic Engine v400.0 (36-phase audit, A4 report generator) | 🟡 Moderate |
| `src/utils/seoManager.js` | Dynamic meta tag updater, Schema.org connected `@graph` builder | 🟢 Safe |
| `src/utils/cachedFetch.js` | LocalStorage caching with TTL, payload encoder/decoder | 🟢 Safe |
| `firestore.rules` | Server-side Firestore security rules (role-based admin guards) | 🔴 High |
| `storage.rules` | Server-side Cloud Storage security rules (MIME whitelist, size limits) | 🔴 High |
| `vite.config.js` | Vite compiler, Terser minification, manual chunk splitting, PWA config | 🔴 High |
| `tests/responsive-qa.spec.js` | Playwright test suite for 6 responsive viewports across core routes | 🟢 Safe |

---

## ⚡ 4. Data Flow, State Management & Real-Time Sync

### Central Data Hook: `useAppData.js`
The application does not use heavy state libraries like Redux or Zustand. State is managed reactively via `src/hooks/useAppData.js` and passed downward via props:

1. **High-Velocity Real-Time Collections (`onSnapshot`)**:
   - `notices` (30 docs, ordered by `createdAt` desc)
   - `announcements` (15 docs, ordered by `createdAt` desc)
   - `events` (25 docs, ordered by `createdAt` desc)
   - `updates` (15 docs, ordered by `createdAt` desc)
   - `sliderSlides` (10 docs, ordered by `order` asc)

2. **Cached Low-Velocity Collections (`localStorage` + Memory Cache)**:
   - `faculties` (120 docs max)
   - `gallery` (50 docs max)
   - `testimonials` (20 docs max)
   - `pdfReports` (50 docs max)
   - `navigation` (Hierarchical 3-level tree built recursively from flat documents)

3. **Zero-Lag Remote Sync Trigger (`settings/site_sync`)**:
   - When any admin updates data anywhere in the world, the Admin Panel writes a timestamp to `settings/site_sync`.
   - All connected client browsers immediately intercept the snapshot change and invalidate their local caches (`fetchNavigation(true)`, `fetchStaticCollections(true)`).

4. **Cross-Tab Browser Synchronization (`BroadcastChannel`)**:
   - Within the same browser, tabs communicate through `new BroadcastChannel('gnc_sync_channel')`.
   - Modifying a notice in the Admin Panel updates the public tab instantly without a network roundtrip.

---

## 🛡️ 5. Complete 28 Admin Tabs Architecture Reference

Located in `src/components/admin/tabs/`:

```
1.  DashboardTab.jsx          ── Key metrics, tabular stats, recent activity log, system health
2.  QuickPublishTab.jsx       ── Rapid multi-channel notice & circular broadcaster
3.  AnnouncementsTab.jsx      ── Urgent flash notifications, admission/exam badges
4.  FacultyTab.jsx            ── Staff directory, designations, qualifications, photo uploads
5.  MeetingPDFTab.jsx         ── Governing Body & IQAC statutory meeting minutes
6.  NoticesTab.jsx            ── Student circulars, categorized notices, PDF attachments
7.  TestimonialsTab.jsx       ── Student & alumni reviews with moderation approval toggles
8.  YouTubeTab.jsx            ── College video library, YouTube channel sync, responsive video grid
9.  AlertsTab.jsx             ── Emergency top banner marquee with severity coloring and expiry
10. SliderTab.jsx             ── 15-slide homepage hero carousel, reordering, overlay opacity
11. PlacementsTab.jsx         ── Recruiter logos, salary packages (CTC), placement records
12. EventsTab.jsx             ── Campus event calendar, venue badges, RSVP counters
13. PollsTab.jsx              ── Interactive campus voting polls with live percentage bars
14. GalleryTab.jsx            ── Categorized high-resolution photo albums with batch uploads
15. DocumentsTab.jsx          ── Syllabus, regulations, circular archives, download hit tracking
16. ContactTab.jsx            ── Student inbound queries inbox, status updater, email triggers
17. ActivityTab.jsx           ── Administrator action audit trail with ISO timestamps
18. BackupRestoreTab.jsx      ── One-click Firestore collection JSON backup & restore
19. DriveTab.jsx              ── Google Drive file explorer, Quota Shield status monitor
20. SettingsTab.jsx           ── Global institutional metadata, phone numbers, addresses, social links
21. AdminCampusTab.jsx        ── Bhuda & Bank More campus facility and infrastructure editors
22. AdminDepartmentTab.jsx    ── Academic departments, HOD profiles, course matrix, lab details
23. AdminLeadershipTab.jsx    ── Presidents, Secretaries, Principals historical registry
24. AdminNeuralStudioTab.jsx  ── AI prompt studio, circular auto-summarizer, copy generator
25. MenuBuilderTab.jsx        ── Visual 3-level navigation tree manager with auto-cleanup
26. ContentManagerTab.jsx     ── Headless CMS studio for 30+ pages with split-screen preview
27. PagesTab.jsx              ── Dynamic page builder with Jodit RTE, SEO SERP, WhatsApp previews
28. SystemTestTab.jsx         ── Supreme Diagnostic Engine v400.0 (36-phase audit, A4 report generator)
```

---

## 🔒 6. Security, Permissions & Access Control

### Authorized Admin Accounts
Authentication is strictly guarded by `src/firebase-auth.js` and `firestore.rules`.
Authorized email accounts:
```javascript
export const AUTHORIZED_ADMIN_EMAILS = [
  "pankajkumargnc@gmail.com",
  "admin@gncollege.org",
  "principal@gncollege.org"
];
```

### Storage Upload Constraints (`storage.rules`)
- **Documents Vault (`/documents/`)**: Maximum **15 MB** per file. Allowed MIME types: `application/pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`. All other files are rejected.
- **Images Vault (`/images/`)**: Maximum **5 MB** per file. Allowed MIME types: `image/*` (`image/webp`, `image/png`, `image/jpeg`).

---

## 🧪 7. Quality Assurance & Verification Commands

Before declaring any coding task complete or committing changes, run the following verification pipeline:

```bash
# 1. Run local development server to test changes interactively
npm run dev

# 2. Run production build — MUST compile with zero errors and exit code 0
npm run build

# 3. Run Playwright automated responsive QA suite across 6 viewports
npm run test:qa
```

### Playwright Viewports Verified:
1. `320px × 568px` (Mobile Small — iPhone SE)
2. `375px × 667px` (Mobile Standard — iPhone 8/SE2)
3. `768px × 1024px` (Tablet Portrait — iPad Mini/Air)
4. `1024px × 768px` (Tablet Landscape — iPad Pro)
5. `1440px × 900px` (Desktop Standard — MacBook / Standard Screen)
6. `1920px × 1080px` (Desktop Full HD)

**Pass Criteria:** 100% of tested routes must have `scrollWidth <= innerWidth` (Zero Horizontal Overflow).

---

## 📝 8. Coding Standards & Conventions

| Area | Strict Convention |
|---|---|
| **Language** | All source code, documentation, comments, and commit messages must be in **Pure English**. |
| **Icons** | Use `lucide-react` vector SVGs exclusively. Zero raw emojis in UI controls or navigation. |
| **Typography** | Use `var(--text-*)` and `var(--space-*)` fluid CSS variables. Never hardcode inline `px` font sizes. |
| **Paragraphs** | All body copy paragraphs MUST use full justified text (`text-align: justify; text-justify: inter-word; hyphens: auto;`). |
| **Images** | All photographic assets must be compressed `.webp` format. |
| **HTML Output** | All user or CMS HTML rendered via `html-react-parser` or `dangerouslySetInnerHTML` MUST pass through `DOMPurify.sanitize()`. |
| **Clean Build** | `npm run build` must compile cleanly without chunk size warnings or unhandled imports. |

---

*Last Updated & Synchronized: September 2026 — v2.1.0 Enforcement*  
*Guru Nanak College, Dhanbad — Maintained by Pankaj Kumar*