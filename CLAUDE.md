# 🤖 CLAUDE.md — AI Development Reference

> **This file is for AI assistants (Claude, Copilot, etc.) working on this codebase.**  
> Yeh file ye ensure karta hai ki koi bhi AI assistant is project ka full context samjhe,  
> aur galat changes ya suggestions na de.

---

## 🏫 Project Identity

```
Project:    GNC College Website
Owner:      Pankaj Kumar (sole developer)
College:    Guru Nanak College, Dhanbad, Jharkhand
Repo:       https://github.com/pankajkumargnc/gncollege-website
Live URL:   https://pankajkumargnc.github.io/gncollege-website
Stack:      React 18 + Firebase 12 + Vite 7 + PWA
```

**⚠️ Important:** Yeh ek single-developer project hai. All architectural decisions are intentional. AI ko bina reason ke refactor nahi karna chahiye.

---

## 🧠 Critical Context for AI

### 1. Router Type: HashRouter (NOT BrowserRouter)
```jsx
// main.jsx — INTENTIONAL: HashRouter is used for GitHub Pages compatibility
import { HashRouter as Router } from 'react-router-dom';
```
- GitHub Pages static hosting requires `#/` routes (no server-side routing)
- **DO NOT** suggest changing to `BrowserRouter` without deployment changes

### 2. Firebase Split Architecture
```
firebase.js      ← Only Firestore — always loaded
firebase-auth.js ← Only Auth — lazy loaded, admin-only
```
- Auth is intentionally separated for performance — public users NEVER download firebase/auth
- **DO NOT** merge these files

### 3. safeLazy — Custom Error-Resilient Lazy Loader
```jsx
// App.jsx
const safeLazy = (importFunction) => lazy(() =>
  importFunction().catch((error) => {
    if (error.message.includes('fetch') || error.message.includes('module')) {
      window.location.reload(); // Handles stale chunk after deployment
    }
    return Promise.reject(error);
  })
);
```
- This solves the "ChunkLoadError after new deployment" problem
- **DO NOT** replace with vanilla `React.lazy()` without understanding this

### 4. CSS Architecture: clamp() Fluid Typography
```css
/* index.css — All font sizes use clamp() for fluid scaling */
--text-xs:   clamp(10px, .75vw, 12px);
--text-base: clamp(13px, 1vw,   15px);
--text-xl:   clamp(20px, 2vw,   28px);
```
- No `@media` breakpoint for font sizes — fluid scaling handles it
- **DO NOT** replace with fixed px or rem values

### 5. Overflow Lock Pattern
```css
/* index.css — Triple overflow lock (intentional, not a mistake) */
html, body, #root { overflow-x: hidden !important; }
* { min-width: 0; }  /* Prevents flex/grid children from overflowing */
```
- This is deliberate to prevent horizontal scroll on any device
- The `!important` is intentional here

### 6. Image Format: WebP Everywhere
- All `/public/images/` files are `.webp`
- Images are pre-optimized; further compression is via `vite-plugin-imagemin`
- **DO NOT** suggest adding JPEG/PNG without a specific reason

### 7. DOMPurify is Non-Negotiable
```jsx
// Any Firestore HTML content MUST go through:
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(firestoreHtmlContent);
```
- Firestore data can contain malicious HTML if admin account is compromised
- **NEVER** remove DOMPurify from the HTML rendering pipeline

### 8. Jodit is Admin-Only (Intentional Code Split)
```js
// vite.config.js
manualChunks: { "jodit": ["jodit-react"] }  // excluded from public bundle
optimizeDeps: { exclude: ["jodit-react"] }
```
- Jodit is ~500KB — zero public users should download it
- **DO NOT** import jodit outside admin components

---

## 📁 Key Files Map

| File | What It Does | Change Carefully |
|------|-------------|-----------------|
| `src/main.jsx` | React root mount, RootErrorBoundary, HashRouter | ⚠️ High risk |
| `src/App.jsx` | All routes, Firestore listeners, safeLazy | ⚠️ High risk |
| `src/firebase.js` | Firestore-only init | ✅ Safe to update config |
| `src/firebase-auth.js` | Auth-only init (lazy) | ✅ Safe to update config |
| `src/constants.js` | Central config (COLLEGE, COLORS) | ✅ Safe |
| `src/data/db.js` | Fallback static data | ✅ Safe |
| `src/styles/index.css` | Global styles + CSS vars | ⚠️ Test thoroughly |
| `vite.config.js` | Build config + chunks | ⚠️ High risk |
| `public/sw.js` | Service Worker | ⚠️ High risk |
| `public/manifest.json` | PWA manifest | ✅ Safe |
| `index.html` | HTML entry, SEO, PWA meta | ✅ Safe |

---

## 🏗️ Architecture Decisions (Don't Change Without Reason)

### State Management: useState + Firestore onSnapshot
- **Why not Redux/Zustand?** — Overkill for this project size
- **Why not React Query/SWR?** — Firestore's `onSnapshot` already handles real-time + caching
- **Pattern:** All live data fetched in `App.jsx`, passed as props or via context

### Routing: Client-side Hash Routing
- **Why not SSR (Next.js)?** — Static hosting on GitHub Pages; no server available
- **Why HashRouter?** — `#/path` works on static hosts without server config
- If migrating to Vercel/custom server → switch to `BrowserRouter` + add `_redirects`

### Admin Auth: Firebase Email/Password
- **Why not Google OAuth?** — College staff prefer simple email/password
- Admin route `/admin` → Firebase Auth → protected panel

### Images: External CDN (ImgBB) for Gallery
- **Why ImgBB for gallery?** — Keeps Firebase Storage egress costs at zero.
- **Bulk Media Engine:** Admin Tab includes a drag-and-drop multi-image uploader for ImgBB/Firestore synchronization.

---

## 🔥 Firestore Data Flow

```
Firestore Collection
       │
       │  onSnapshot() — App.jsx
       ▼
   React State (useState)
       │
       │  Props / Context
       ▼
   Component renders
       │
       │  DOMPurify.sanitize() — if HTML content
       ▼
   DOM (browser)
```

**Collections used in real-time listeners (App.jsx):**
- `settings` — site config
- `notices` — notice board
- `announcements` — announcements
- `alerts` — alert banners
- `menu` — navigation structure
- `menu` — navigation structure
- `slider` — hero images
- `testimonials` — rotating reviews
- `settings` — site-wide config (including counter seeds)

**Collections fetched per-page:**
- `gallery`, `events`, `faculty`, `leadership`, `departments`, `placements`,
  `documents`, `youtube`, `pages`

---

## 🧩 Component Patterns

### Page Component Pattern
```jsx
// Standard page component structure
export default function MyPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'collectionName'), orderBy('date', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub(); // ALWAYS cleanup
  }, []);

  if (loading) return <LoadingSpinner />;
  return <div>...</div>;
}
```

### Admin Tab Pattern
```jsx
// All admin tabs follow this structure
export default function SomeTab({ db, showToast }) {
  // db and showToast always passed from AdminPanel
  const [items, setItems] = useState([]);
  // CRUD operations
  const handleAdd = async () => { await addDoc(collection(db, 'name'), data); };
  const handleDelete = async (id) => { await deleteDoc(doc(db, 'name', id)); };
}
```

### Lazy Page Pattern
```jsx
// Named export lazy loading (used for pages with multiple exports)
const LazyAbout = n => safeLazy(() =>
  import('./pages/AboutPages').then(m => ({ default: m[n] }))
);
const VisionMission = LazyAbout('VisionMission');
const PrincipalMessage = LazyAbout('PrincipalMessage');
// Advantage: Only one import() call for all About sub-pages
```

---

## 🎨 Design System

### Color Palette
```js
// constants.js / colors.js
Navy:       #0f2347  // Primary brand color
Gold:       #f4a023  // Accent color
Navy Dark:  #060e1c  // Deep backgrounds
BG:         #f4f7f9  // Page background
```

### Glass Morphism Pattern
```css
background: rgba(255,255,255,.78);
border: 1px solid rgba(255,255,255,.42);
box-shadow: 0 8px 32px rgba(15,35,71,.1);
backdrop-filter: blur(12px);
```

### Spacing Scale (use CSS vars, not hardcoded values)
```css
--space-xs: clamp(6px, .8vw, 10px)
--space-sm: clamp(10px, 1.2vw, 16px)
--space-md: clamp(16px, 2vw, 24px)
--space-lg: clamp(24px, 3vw, 40px)
--space-xl: clamp(40px, 6vw, 80px)
```

---

## ⚠️ Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---------|----------|
| `React.lazy(() => import(...))` | `safeLazy(() => import(...))` |
| `import { getAuth } from 'firebase/auth'` in public components | Only import auth in `firebase-auth.js` |
| `import parse from 'html-react-parser'` without DOMPurify | Always: `parse(DOMPurify.sanitize(html))` |
| Hardcoded color `#0f2347` | Use `COLORS.navy` or `var(--navy)` |
| Fixed `px` font sizes | Use `var(--text-sm)` etc. |
| `BrowserRouter` | `HashRouter` (for GitHub Pages) |
| `window.location.href = '/admin'` | `navigate('/admin')` with React Router |
| Importing Jodit in public components | Only in admin tabs |

---

## 🧪 Testing & Quality

- **Admin Panel System Test Tab** — 60-Phase premium diagnostic engine (v100.0)
- **Offline HUD** — Real-time connectivity status indicator
- **ErrorBoundary** — wraps all routes for graceful failure
- **RootErrorBoundary** — wraps entire app in `main.jsx`
- **Console warnings** — Firebase config errors show styled console messages

### Pre-PR Checklist
- [ ] `npm run build` completes without errors
- [ ] No new `console.log` (dropped by terser but messy in dev)
- [ ] New Firebase writes go through `addDoc`/`setDoc`/`updateDoc` (not `set()`)
- [ ] New HTML from Firestore goes through `DOMPurify.sanitize()`
- [ ] New lazy pages use `safeLazy()` not `lazy()`
- [ ] New colors use CSS vars not hardcoded hex
- [ ] Images are `.webp` format

---

## 🚀 Quick Reference

### Run Dev
```bash
npm run dev       # localhost:3000
```

### Build + Preview
```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

### Firebase Rules (copy to Firebase Console)
```js
// Firestore Rules — production
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated admins
    }
  }
}
```

---

## 📞 Need Help?

**Developer:** Pankaj Kumar  
**Email:** pankajkumargnc@gmail.com  
**GitHub:** [@pankajkumargnc](https://github.com/pankajkumargnc)

> *"Agar koi doubt ho, pehle README.md padho, phir CLAUDE.md — phir bhi doubt ho to sampark karo."*

---

*Last updated: March 2026 — By Pankaj Kumar*