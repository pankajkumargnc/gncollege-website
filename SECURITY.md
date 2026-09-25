# GNC Digital Campus — Security Policy & Hardening Guide (Website 2.0)
**Institution:** Guru Nanak College, Dhanbad  
**Specification Reference:** GNC Website 2.0 Master Prompt — Sections 21, 29, 30, 31, 63, 78, 80, 81, 94  
**Classification:** Enterprise Security Architecture Document  

---

## 1. Security Overview & Threat Model

The Guru Nanak College Digital Campus portal serves public student inquiries, official notices, academic marksheet publications, and institutional governance. The attack surface encompasses:
1. Unauthorized modification of public college circulars, notices, or examination records.
2. Inadvertent disclosure of student private records or administrative audit trails.
3. Client-side credential leakage or persistent session hijacking on shared staff terminals.
4. Malicious document or script uploads to public storage buckets.
5. Bot flooding and denial-of-wallet attacks on cloud functions or database writes.

---

## 2. Authentication & Admin Session Security (Section 81)

### 2.1 Tab-Scoped Session Persistence
Traditional SPAs store auth tokens in `localStorage` (`browserLocalPersistence`), which persists tokens across browser restarts and opens sessions in subsequent tabs.
- **Hardened Configuration:** `src/firebase-auth.js` enforces `browserSessionPersistence`.
- **Enforcement Mechanism:** Closing the administrator tab immediately terminates the session. Opening a new tab requires fresh re-authentication.

### 2.2 Inactivity Idle Auto-Logout Guard
Shared college staff room computers are protected by an automated inactivity watchdog:
- **Hook:** `src/hooks/useAdminIdleTimeout.js`
- **Tracked User Signals:** `mousedown`, `keydown`, `touchstart`, `scroll`, and `click`. Background polling and Firestore network listeners do NOT reset the timer.
- **Timeout Threshold:** 15 minutes of user silence triggers a 60-second modal countdown warning.
- **Graceful Termination:** If no activity occurs before the countdown expires, the session is cleanly signed out and redirected to the login view.

---

## 3. Storage Security Rules (`storage.rules`) (Section 78 & 80)

Storage permissions are partitioned by directory purpose, enforcing strict MIME validation and payload size caps:

```javascript
service firebase.storage {
  match /b/{bucket}/o {
    function isAdmin() {
      return request.auth != null && (
        request.auth.token.email == 'pankajkumargnc@gmail.com' ||
        request.auth.token.role in ['admin', 'super_admin', 'principal', 'office_admin']
      );
    }

    function isValidDocument() {
      return request.resource.size <= 15 * 1024 * 1024
        && (
          request.resource.contentType == 'application/pdf' ||
          request.resource.contentType == 'application/msword' ||
          request.resource.contentType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          request.resource.contentType == 'application/vnd.ms-excel' ||
          request.resource.contentType == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
    }

    function isValidImage() {
      return request.resource.size <= 8 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }

    // Public Media & Documents
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin() && (isValidImage() || isValidDocument());
    }

    // Private Vault (Student verification & internal records)
    match /private/{allPaths=**} {
      allow read, write: if isAdmin();
    }

    // Automated & Manual Backup Archives
    match /backups/{allPaths=**} {
      allow read, write: if isAdmin();
    }

    // Default Deny
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 4. Firestore Database Security Rules (`firestore.rules`) (Section 29)

1. **Default Deny:** All unmapped collections deny reads and writes.
2. **Public Read Collections:** `notices`, `news`, `events`, `gallery`, `faculties`, `pageContent`, `regulations`, `eventReports`, `pdfReports`, `sliderSlides`, and `settings/contact`.
3. **Admin Least-Privilege Writes:** Only authenticated admin tokens can create, modify, or delete institutional documents.
4. **Student Inquiries Protection:** Public users may create inquiry documents only if they provide valid fields (`name`, `email`, `phone`, `message`). Public users cannot list or read submitted inquiries; only administrators have read access.

---

## 5. Server-Side Secret Management & AI Proxy (Section 58 & 63)

1. **No Client-Side Secrets:** Gemini API keys are never exposed in client bundles.
2. **Serverless Proxy:** `functions/index.js` defines `geminiProxy`, an HTTPS callable Cloud Function that accesses `GEMINI_API_KEY` via Google Cloud Secret Manager.
3. **Environment Files:** `.env.example` contains sanitized placeholders without plaintext passwords or private service account credentials. Service account keys (`new-project-key.json`) are blocked from version control by `.gitignore`.

---

## 6. HTTP Headers & Content Security Policy (Section 30–31)

Configured in `firebase.json` for all hosting distributions:

```json
{
  "headers": [
    {
      "source": "**",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

---

## 7. Operational Ground Rules (GR-1 & GR-2)
- **GR-1 (Full Local Backup Checkpoint):** Pre-upgrade snapshots and local tarball archives must be verified prior to executing risky schema, security rule, or dependency changes.
- **GR-2 (Zero Remote Deployment Without Authorization):** No code is pushed to GitHub or deployed to live hosting environments without explicit permission from the project owner.
