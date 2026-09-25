# GNC Digital Campus — Deployment & Release Engineering Guide (Website 2.0)
**Institution:** Guru Nanak College, Dhanbad  
**Specification Reference:** GNC Website 2.0 Master Prompt — Sections 38, 39, 82, 83, 84, 90, 93, 94  
**Classification:** DevOps & Production Release Engineering Document  

---

## 🚨 CRITICAL RELEASE RULE: GROUND RULE GR-2
> **NEVER** push to any remote Git branch, merge pull requests into `main`, or trigger CI/CD pipelines deploying to staging or production without **explicit, written permission from the project owner first.** All modifications must remain strictly local until authorized.

---

## 1. Prerequisites & Environment Configuration (Section 38)

- **Node.js:** `>= 18.20.0 LTS`
- **Package Manager:** `npm >= 9.0.0`
- **Firebase CLI:** `npm i -g firebase-tools` (v13+)

### Environment Files:
1. Copy `.env.example` to `.env` (or `.env.production` for production builds):
```bash
cp .env.example .env
```
2. Configure active environment variables:
   - `VITE_FIREBASE_API_KEY`: Firebase web API key.
   - `VITE_FIREBASE_PROJECT_ID`: `gnc-college-web`.
   - `VITE_CANONICAL_DOMAIN`: `https://gncollege.org` (or active production domain).
   - `VITE_RECAPTCHA_SITE_KEY`: Google reCAPTCHA v3 site key.

---

## 2. Pre-Deployment Validation Checklist

Execute the full verification pipeline locally before proposing any release:
```powershell
# 1. Run all unit and security matrix tests
npm test

# 2. Run automated multi-viewport Playwright QA suite
node scripts/runPlaywrightQA.js

# 3. Compile production bundle and generate XML sitemap
npm run build
```

---

## 3. Deployment to Firebase Hosting (Authorized Execution Only)

When explicitly approved by the project owner:

### 3.1 Deploy Public Hosting Shell & PWA Assets:
```bash
firebase deploy --only hosting
```

### 3.2 Deploy Security Rules:
```bash
# Firestore database security rules
firebase deploy --only firestore:rules

# Cloud Storage security rules
firebase deploy --only storage
```

### 3.3 Deploy Cloud Functions:
```bash
firebase deploy --only functions
```

---

## 4. Custom Domain Configuration (Section 90)

To map the institutional domain (`https://gncollege.org`):
1. Navigate to **Firebase Console → Hosting → Add Custom Domain**.
2. Enter `gncollege.org` (and `www.gncollege.org`).
3. Add the provided DNS records to the domain registrar / DNS provider:
   - **Type A:** `199.36.158.100`
   - **Type TXT:** `_acme-challenge` verification token.
4. Firebase automatically provisions free Let's Encrypt SSL certificates.

---

## 5. Host-Agnostic Deployments (Section 93)

### GitHub Pages / Cloudflare Pages / Netlify:
The application includes universal SPA routing support:
- `public/404.html` intercepts direct URL accesses on static hosts and redirects to `index.html` with route state preserved.
- `index.html` restores the original route using `window.history.replaceState` before React Router initializes.

---

## 6. Rollback Procedures (Section 84 & Ground Rule GR-1)

If an issue occurs post-release:

### Instant Firebase Hosting Rollback:
```bash
# List previous release versions
firebase hosting:releases:list

# Instant rollback to previous release channel
firebase hosting:rollback
```

### Git Checkpoint Rollback (GR-1):
```bash
# Revert working directory to pre-upgrade safety tag
git checkout backup/pre-upgrade-2026-09-25
```
An offline full-folder filesystem archive is also permanently preserved at:  
`D:\New folder\Working\gnc-college\gnc-college-backup-2026-09-25_132644`
