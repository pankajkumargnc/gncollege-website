# 🤖 CLAUDE.md — AI Development Reference (v200.0)

> **This file is for AI assistants (Claude, Copilot, etc.) working on this codebase.**  
> It ensures that any AI assistant understands the full architectural context and adheres to the project's strict development standards to prevent incorrect changes.

---

## 🏫 Project Identity

```
Project:    GNC College Website
Owner:      Pankaj Kumar (Sole Developer)
College:    Guru Nanak College, Dhanbad, Jharkhand (Est. 1970)
Repo:       https://github.com/pankajkumargnc/gncollege-website
Live URL:   https://pankajkumargnc.github.io/gncollege-website
Stack:      React 18 + Firebase 10 + Vite 7 + PWA
Engine:     Supreme Diagnostic Core v200.0 (85-Phase)
```

**⚠️ Important:** This is a single-developer project. All architectural decisions (e.g., HashRouter, Split-Auth, clamp() typography) are deliberate and tested. AI should not refactor without explicit reasons.

---

## 🧠 Critical Context for AI

### 1. Router Type: HashRouter (Mandatory)
```jsx
// main.jsx — INTENTIONAL: HashRouter is used for GitHub Pages compatibility
import { HashRouter as Router } from 'react-router-dom';
```
- GitHub Pages static hosting requires `#/` routes (no server-side routing support).
- **DO NOT** suggest changing to `BrowserRouter` unless the deployment target changes.

### 2. Firebase Split Architecture (High Performance)
```
firebase.js      ← Only Firestore — always loaded for public visitors.
firebase-auth.js ← Only Auth — lazy loaded, admin-only.
```
- Auth is intentionally separated for performance — public users NEVER download the `firebase/auth` SDK.
- **DO NOT** merge these files or move Auth imports to the main bundle.

### 3. safeLazy — Custom Error-Resilient Lazy Loader
```jsx
// App.jsx
const safeLazy = (importFunction) => lazy(() =>
  importFunction().catch((error) => {
    if (error.message.includes('fetch') || error.message.includes('module')) {
      window.location.reload(); // Resolves stale chunk issues after new deployment
    }
    return Promise.reject(error);
  })
);
```
- Handles the common "ChunkLoadError" that happens when a user stays on the site during a new deployment.
- **DO NOT** replace with standard `React.lazy()` without understanding this impact.

### 4. CSS Architecture: clamp() Fluid Typography
```css
/* index.css — Use clamp() for fluid, responsive scaling */
--text-xs:   clamp(10px, .75vw, 12px);
--text-base: clamp(13px, 1vw,   15px);
--text-xl:   clamp(20px, 2vw,   28px);
```
- This removes the need for frequent `@media` break-points for font sizes.
- **DO NOT** replace with fixed `px` or `rem` values.

### 5. Architectural Encyclopedia (v200.0) — Zero Deletion Rule
- The `SystemTestTab.jsx` generates a massive 10-15 page A4-style technical report.
- **STRICT RULE:** Any modification to the `handleDownloadReport` logic MUST NOT delete existing sections (Summary, Tech Stack, Features A-Z, Trace Table, etc.).
- Unified Master Reports are cumulative and must include all technical details.

### 6. Automated Navbar Sync
```jsx
// PagesTab.jsx — Real-time background cleanup
const triggerAutoCleanup = () => { setTimeout(handleCleanupNavbar, 2000); };
```
- When a page is deleted/created, the system automatically orphan-scans the `menu` collection.
- **DO NOT** remove these cleanup triggers.

### 7. DOMPurify Sanitization
- Every Firestore HTML string MUST pass through `DOMPurify.sanitize()` before being parsed by `html-react-parser`.
- **NEVER** bypass this sanitization layer.

---

## 📁 Key File Map

| File | Primary Role | Change Risk |
|------|--------------|-------------|
| `src/main.jsx` | App Mount, RootErrorBoundary, HashRouter | 🔴 High |
| `src/App.jsx` | Routes, Real-time Listeners, safeLazy | 🔴 High |
| `src/firebase.js` | Firestore config (Public) | 🟢 Safe |
| `src/firebase-auth.js` | Auth config (Admin-only) | 🟢 Safe |
| `src/constants.js` | Site metadata and color tokens | 🟢 Safe |
| `src/styles/index.css` | Global CSS vars and fluid resets | 🟡 Moderate |
| `vite.config.js` | Build logic, Terser, and chunk splitting | 🔴 High |
| `public/sw.js` | PWA Service Worker caching | 🔴 High |

---

## 🔥 Data Flow & State

### Real-time Listeners (App.jsx)
- The app uses `onSnapshot` for site-wide settings, notices, navigation, and hero sliders.
- All live data is fetched at the root and passed via props — no Redux or Zustand is used to keep the bundle lean.

### Admin Content
- Pages are built using the **Jodit Rich Text Editor**.
- Media assets are handled via the **Universal MediaPicker** with a 3-way Google Drive (v3) steering logic.

---

## ⚠️ Standards & Quality

| Category | Requirement |
|----------|-------------|
| **Language** | All technical and public documentation must be in **Pure English**. |
| **Images** | 100% of images must be in `.webp` format. |
| **Typography** | Use `var(--text-*)` and `var(--space-*)` instead of hardcoded spacing. |
| **PR Ready** | `npm run build` must complete without errors or Jodit-chunk warnings. |
| **Cleanup** | Every `onSnapshot` listener must include its `unsub()` cleanup. |

---

## 🚀 Commands Reference

- `npm run dev` — Launch dev server (3000)
- `npm run build` — Optimized production build (target: gh-pages)
- `npm run deploy` — Automated build and deployment to GitHub Pages

---

### **Need Clarification?**
*Read README.md first, then CLAUDE.md. If questions persist, contact Pankaj Kumar.*

*Last updated: April 2026 — v200.0 Enforcement*