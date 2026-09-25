# GNC Digital Campus — Performance & Web Vitals Optimization (Website 2.0)
**Institution:** Guru Nanak College, Dhanbad  
**Specification Reference:** GNC Website 2.0 Master Prompt — Sections 32, 33, 34, 65, 77, 91, 94  
**Classification:** Technical Performance Engineering Document  

---

## 1. Executive Performance Targets (Section 34)

| Metric | Target | Optimization Strategy |
|---|---|---|
| **LCP (Largest Contentful Paint)** | `< 2.0s` | High-priority WebP hero preload, zero render-blocking CSS, preconnected fonts |
| **INP (Interaction to Next Paint)** | `< 200ms` | Debounced state updates, lazy modals, decoupled DOM mutations |
| **CLS (Cumulative Layout Shift)** | `< 0.1` | Explicit aspect ratios on media, reserved dimensions on dynamic cards |
| **TTFB (Time to First Byte)** | `< 500ms` | Edge caching via Firebase CDN, pre-rendered static shells |

---

## 2. Critical Performance Rule (Section 33)

> *"The homepage must NOT load: PDF libraries, analytics chart libraries, maps, photo sphere, rich editors, heavy admin modules, heavy gallery tools — unless actually required. Use dynamic imports."*

### Architectural Audit & Remediation:

1. **Recharts Elimination from Homepage Critical Path:**
   - *Previous state:* `PlacementsSection.jsx` rendered `<PlacementAnalytics />` eagerly, pulling `recharts` (394 kB) into the initial page bundle.
   - *Remediation:* Replaced eager mounting with an interactive on-demand toggle: *"Explore Placement Trends & Package Analytics"*. `recharts` is only fetched when explicitly requested.
2. **PDF Engine Splitting:**
   - *Previous state:* Four pages (`RegulationsPage.jsx`, `NotificationsPage.jsx`, `EventsPage.jsx`, `AboutPages.jsx`) statically imported `PDFModal.jsx`.
   - *Remediation:* Converted all 4 pages to `React.lazy(() => import('../components/PDFModal'))`. The 848 kB `vendor-pdf` chunk (`pdfjs-dist`) is completely decoupled.
3. **Universal Search & Fuzzy Index Isolation:**
   - *Previous state:* `UniversalSearch.jsx` and `fuse.js` were imported statically at the root of `src/App.jsx`.
   - *Remediation:* Lazy-loaded `UniversalSearch` and mounted it conditionally `{searchOpen && <UniversalSearch />}`. This eliminates 38 kB of JS and fuzzy search overhead from the initial landing render.
4. **Celebration Confetti Dynamic Loading:**
   - *Previous state:* `src/utils/confetti.js` and `src/components/home/AdmissionTimeline.jsx` statically imported `canvas-confetti`.
   - *Remediation:* Converted both to dynamic `await import('canvas-confetti')`.

---

## 3. Bundle Analysis & Before / After Metrics

### Production Build Comparison:

| Asset / Chunk | Pre-Upgrade State | Website 2.0 State | Net Difference | Status |
|---|---|---|---|---|
| `index.js` (Initial Bundle) | **568.12 kB** (163.2 kB gzip) | **534.44 kB** (151.9 kB gzip) | **-33.68 kB** (-6.0%) | ⚡ Optimized |
| `vendor-charts.js` (`recharts`) | Bundled on Home | 393.98 kB (On Demand) | Split from Home | ✅ Isolated |
| `vendor-pdf.js` (`pdfjs-dist`) | Leaked into 4 pages | 848.98 kB (On Demand) | Split from Pages | ✅ Isolated |
| `UniversalSearch.js` | In `index.js` | 38.44 kB (On Demand) | Split from Root | ✅ Isolated |
| Routes in Sitemap | 104 Routes | 106 Routes (+Student Corner) | +2 Routes | ✅ Indexed |

---

## 4. Image Optimization Pipeline (Section 77)

1. **Build-Time Compression:** Automated via `vite-plugin-imagemin` with MozJPEG (75%), OptiPNG, and WebP compression, achieving between 56% and 92% file size reductions across all assets.
2. **Responsive Modern Formats:** Primary institutional photography converted to `.webp` with explicit `width`, `height`, and `loading="lazy"` attributes.
3. **LCP Hero Protection:** Hero campus backgrounds are rendered with `fetchpriority="high"` and excluded from lazy-loading routines.

---

## 5. Client-Side Data Caching (`useAppData.js`)

1. **Local Persistent Cache:** Public collections (`notices`, `events`, `faculties`, `gallery`) are encoded and stored in client-side storage.
2. **Liveness Heartbeat (`remoteEpoch`):** When the app mounts, it checks the lightweight `site_sync` document timestamp rather than re-fetching full collections.
3. **Bandwidth Savings:** If the client cache matches `remoteEpoch`, zero unnecessary reads are made to Firestore, controlling project costs (Section 56).
