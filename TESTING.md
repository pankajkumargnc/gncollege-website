# GNC Digital Campus — Automated Testing & Verification Guide (Website 2.0)
**Institution:** Guru Nanak College, Dhanbad  
**Specification Reference:** GNC Website 2.0 Master Prompt — Sections 44, 45, 46, 47, 86, 94  
**Classification:** Quality Assurance & Test Engineering Document  

---

## 1. Testing Architecture & Test Suites

The GNC Digital Campus test pipeline combines fast headless unit assertions with full-browser Playwright responsive verification:

```
Automated Test Hierarchy:
├── Level 1: Unit & Security Assertions (node scripts/runUnitTests.js / npm test)
│   ├── SEO & Route Integrity (7 tests)
│   ├── Persistent Cache & Payload Safety (12 tests)
│   ├── Student Document Request Token Formats (7 tests)
│   ├── Client-Side Image Dimension Scalers (15 tests)
│   ├── Firestore Rules Least-Privilege Matrix (22 tests)
│   ├── Google Drive CDN Sanitization (8 tests)
│   ├── Cloud Backup Function Integrity (7 tests)
│   ├── AI Chatbot & Server Callable Routing (7 tests)
│   ├── CMS Draft Autosave & Recovery (14 tests)
│   ├── Real-Time Dashboard Sync Messaging (6 tests)
│   └── Dead Code & Unused Imports Cleanup (4 tests)
│
└── Level 2: Responsive Playwright QA Matrix (node scripts/runPlaywrightQA.js)
    ├── Viewport: Mobile Small 320x568 (8 routes, 0 overflow)
    ├── Viewport: Mobile Standard 375x667 (8 routes, 0 overflow)
    ├── Viewport: Tablet Portrait 768x1024 (8 routes, 0 overflow)
    ├── Viewport: Tablet Landscape 1024x768 (8 routes, 0 overflow)
    ├── Viewport: Desktop Standard 1440x900 (8 routes, 0 overflow)
    └── Viewport: Desktop Full HD 1920x1080 (8 routes, 0 overflow)
```

---

## 2. Test Execution Commands

### Run Unit & Security Test Suite:
```bash
npm test
# Equivalent to: node scripts/runUnitTests.js
```
*Expected Execution Time:* ~1.5s  
*Baseline Verification:* **109 / 109 Passed (100% Pass Rate)**

### Run Responsive & Horizontal Overflow QA:
```bash
node scripts/runPlaywrightQA.js
```
*Execution Details:* Boots a temporary Vite preview server on `http://localhost:3000` and validates page bounding boxes and scroll widths across 48 route-viewport permutations.  
*Baseline Verification:* **48 / 48 Passed (100% Pass Rate, 0 Layout Overflow Bugs)**

### Run Production Build & Sitemap Generation:
```bash
npm run build
```
*Expected Output:* Minified bundles in `dist/`, PWA service worker generation via Workbox, asset image compression, and dynamic generation of `dist/sitemap.xml` with 106 routes.

---

## 3. Accessibility & WCAG 2.2 AA Verification (Section 43 & 86)

1. **Skip Links:** Primary `<a class="skip-link" href="#main-content">Skip to main content</a>` implemented in `index.html`.
2. **Keyboard Focus:** High-contrast focus rings (`:focus-visible`) across all interactive buttons, links, search triggers, and modal dialogs.
3. **Contrast Ratios:** Text color `#172033` on `#FFFFFF` / `#F7F9FC` yields contrast ratios exceeding 11:1 (well above the 4.5:1 WCAG AA threshold).
4. **Accessible Alerts:** Inactivity auto-logout warning renders with `role="alertdialog"`, `aria-modal="true"`, and `aria-labelledby`.
