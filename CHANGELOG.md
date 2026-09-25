# Changelog — GNC Digital Campus Website 2.0

All notable changes to this project are documented in this file in accordance with [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-09-25

### 🛡️ Ground Rules Compliance
- **GR-1 Checkpoint:** Created Git backup branch `backup/pre-upgrade-2026-09-25`, Git tag `backup-pre-upgrade-2026-09-25`, and external filesystem directory archive `gnc-college-backup-2026-09-25_132644`.
- **GR-2 Checkpoint:** All commits and validation steps conducted strictly on the local machine; zero pushes to remote GitHub repository or public staging/production deployments.

---

### ✨ Added
- **`src/pages/StudentCornerPage.jsx`:** Brand-new centralized digital student governance portal featuring quick service tiles, live request tracking input, government educational portals, and student support helplines (Sections 6 & 18).
- **`src/hooks/useAdminIdleTimeout.js`:** Inactivity detection hook listening to genuine user actions with a 15-minute timeout and 60-second modal countdown warning before terminating the admin session (Section 81).
- **`public/404.html`:** Host-agnostic SPA fallback router allowing deep link refreshes to resolve correctly across GitHub Pages, Cloudflare Pages, Netlify, and custom web servers (Section 39 & 93).
- **Scheduled Publishing Cloud Function:** Added `processScheduledPublishing` cron function to `functions/index.js` running every 30 minutes to transition scheduled notices to published and expired notices to archived status (Section 25).
- **CMS Revision History:** Added subcollection version snapshotting (`pageContent/{slug}/revisions`) in `ContentManagerTab.jsx` on every page save (Section 23).
- **Documentation Suite:** Created `ARCHITECTURE.md`, `SECURITY.md`, `PERFORMANCE.md`, `SEO.md`, `TESTING.md`, `DEPLOYMENT.md`, `ADMIN_GUIDE.md`, `BACKUP_AND_RESTORE.md`, and `BEFORE_AFTER_REPORT.md` (Section 102).

---

### ⚡ Performance & Optimization
- **Critical Path Code Splitting (Section 33):**
  - Converted eager `<PlacementAnalytics />` rendering on the homepage to an on-demand interactive button, deferring 394 kB of `recharts` JavaScript.
  - Converted static `PDFModal` imports in `RegulationsPage.jsx`, `NotificationsPage.jsx`, `EventsPage.jsx`, and `AboutPages.jsx` to `React.lazy`, isolating 849 kB of `vendor-pdf` from the page routes.
  - Converted `UniversalSearch` and `fuse.js` to `React.lazy` and mounted only when `searchOpen` is active, removing 38 kB from the initial landing bundle.
  - Dynamically imported `canvas-confetti` in `src/utils/confetti.js` and `src/components/home/AdmissionTimeline.jsx`.
  - Net initial JavaScript bundle dropped from **568.12 kB** to **534.44 kB** (-33.68 kB / -6.0%).

---

### 🔒 Security Hardening
- **Storage Rules (`storage.rules`):** Enforced structured path partitioning (`/public/`, `/documents/`, `/images/`, `/private/`, `/backups/`) with strict MIME whitelisting, 15MB document caps, 8MB image caps, and default-deny policies (Sections 78 & 80).
- **Session Persistence (`src/firebase-auth.js`):** Switched from `browserLocalPersistence` to `browserSessionPersistence` so closing the admin tab destroys the session token (Section 81).
- **Admin Panel Idle Modal:** Integrated `useAdminIdleTimeout` into `src/components/admin/AdminPanel.jsx` with an accessible modal dialog countdown (Section 81).
- **Secret Sanitization:** Cleaned `.env.example`, removing plaintext admin credentials and adding `VITE_CANONICAL_DOMAIN` and Google Drive folder placeholders.

---

### 🎨 Design System & UI/UX
- **Design System Harmonization (Section 4):**
  - Updated `src/styles/colors.js` to match Section 4 master design tokens (`#0B1F3A`, `#D4A72C`, `#F4B942`, `#F7F9FC`, `#FFFFFF`, `#172033`, `#64748B`) with backward-compatible aliases for legacy components.
  - Aligned `:root` CSS custom properties in `src/styles/index.css`.
- **Navigation (Section 6 & 18):**
  - Added "Student Corner" to `MENU_SECTIONS` and `navLinks` in `src/data/db.js`.
  - Added "Student Corner" spotlight card to `src/components/Navbar.jsx`.
- **Search Palette (Section 10):**
  - Expanded `UniversalSearch.jsx` index to cover Courses, Departments, Student Services, and Governance documents.

---

### 🧪 Verification
- **Unit Tests:** 109 / 109 tests passed (`npm test`).
- **Responsive QA Matrix:** 48 / 48 Playwright checks passed with 0 horizontal overflow across 6 viewports (320px to 1920px).
- **Production Build:** Vite 7 production build succeeds cleanly, generating 106 sitemap routes.
