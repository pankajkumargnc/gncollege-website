# MASTER PROMPT — PHASE 2: Deep Diagnostic, Testing & Data-Flow Audit (GNC Dhanbad Website)

Use this **after** Phase 1 fixes (design/code consistency report) are implemented and merged. This prompt is for a different, deeper job: not "does it look right" but **"does it actually work, everywhere, every time, and how fast."**

Paste this whole document to the agent as its first instruction.

---

## 0. ROLE

You are now acting as:
1. **QA / Test Engineer** — write and run test cases, not opinions.
2. **Systems Diagnostician** — trace every data path end-to-end and produce evidence (timings, logs, screenshots of actual behavior), not assumptions.
3. **Site Reliability Reviewer** — assess what happens when something goes wrong (network drop, Firestore error, bad admin input) at every layer.

This is a **live college website** real students/parents/staff depend on. Your job is to find what's fragile *before* it fails in production, and to prove — with real evidence — how the system actually behaves, not how it's supposed to behave.

---

## 1. HARD RULE — DIAGNOSTIC MODE ONLY

- You may run **read-only and test-only** operations: static analysis, local dev server (`npm run dev`), local build (`npm run build`), a **local/staging Firebase project or emulator suite** (`firebase emulators:start`) for functional testing, browser dev-tools network/performance profiling, and automated test scripts you write yourself.
- **Never run tests against the live production Firebase project** (`gnc-college-web`) in a way that writes, deletes, or mutates real data. Any write-path test (admin add/edit/delete, poll voting, contact form) must run against the **Firebase Local Emulator Suite** or a disposable staging project, never production.
- Do not deploy, do not push to `main`, do not change any file. Output is a **diagnostic report** (§6) plus, where useful, throwaway test scripts kept in a local `/tests-scratch` folder that you do not commit.
- If a genuine production bug is found that is actively harming users right now (e.g. broken admissions form), flag it at the top of the report as **URGENT** — but still don't fix it without approval; just make it impossible to miss.

---

## 2. GROUND TRUTH — HOW THIS SYSTEM ACTUALLY WORKS (verify, don't re-derive from scratch)

Understand this architecture before testing it, so your diagnosis is about *deviations* from this design, not confusion about the design itself:

- **Content is live-updated via Firestore, independent of deployment.** The GitHub Actions pipeline (`.github/workflows/ci-cd.yml`, triggered on push to `main`) only rebuilds and redeploys **code** (React bundle) to GitHub Pages / Firebase Hosting. Admin-panel content changes (notices, gallery, documents, faculty, etc.) go straight to Firestore and do **not** require a rebuild or redeploy to appear on the live site. Confirm this distinction is actually true in practice, and confirm it is documented somewhere visible to non-technical admin staff (they should never think "I need to ask the developer to deploy" for a content change).
- **Two different data-freshness mechanisms coexist** in `src/hooks/useAppData.js`:
  - Some collections use `onSnapshot` (real-time listener — a Firestore write is pushed to every open browser tab within roughly a second, no manual refresh needed).
  - Other collections use a one-time `getDocs`, cached client-side via `src/utils/cachedFetch.js` with a **default TTL of 3,600,000 ms (1 hour)**, invalidated early via a custom `gnc_live_sync` event + `BroadcastChannel` (which only syncs tabs on the *same device/browser*, not other visitors).
  - **This means "how fast does an admin update go live" has a different answer depending on which collection was edited**, and a different answer again for "the admin's own browser" vs. "a visitor on a different device."
- **Test this distinction explicitly and produce real numbers**, don't assume:
  - For each collection editable in the admin panel (notices, gallery, events, faculty, documents/pdfReports, testimonials, sliders, pages, menu, alerts, polls, etc.): is it wired to `onSnapshot` or to the 1-hour-TTL cache path?
  - For an `onSnapshot`-backed collection: make an edit in the admin panel, measure actual wall-clock time until it appears (a) in the admin's own other browser tab, (b) in an incognito/second-device session.
  - For a cache-backed collection: same measurement, and confirm whether `clearCache()` / the `gnc_live_sync` broadcast actually forces same-device tabs to refresh immediately, and confirm what a **different visitor** (no BroadcastChannel connection, cache not yet expired) actually sees — do they wait up to the full 1 hour, or is there a shorter effective TTL in practice you should verify?
  - Document the actual measured delay per collection type. This answers the user's core question directly, with evidence, not a guess.

---

## 3. SCOPE — GO THROUGH LITERALLY EVERY FOLDER AND FILE

Treat this as exhaustive, not sampling. Structure your pass by folder, and inside each folder go file by file:

```
/src
  /pages            → every page file, one by one
  /components       → every component, one by one
    /admin
      /tabs         → every one of the ~29 admin tabs, one by one
  /hooks            → every custom hook — trace every read/write it performs
  /utils            → every utility — especially cachedFetch.js, any auth helpers, formatters
  /styles           → already covered in Phase 1, re-check only what Phase 1 changed
  constants.js, firebase.js, App.jsx, main.jsx → core wiring
/functions          → every Cloud Function, line by line
firestore.rules, storage.rules → every rule block
.github/workflows   → every CI/CD job step
```

For **every single file**, answer these questions (a line-by-line read, not a skim):
1. What does this file read from / write to (Firestore collection, Storage path, external API, localStorage)?
2. Does every error path (network failure, permission-denied, malformed data, empty result) get handled, or does it fail silently / crash / show a blank screen?
3. Are there any dead code paths, unused imports, unreachable branches, or commented-out blocks left in?
4. Does this file duplicate logic that exists elsewhere (candidate for extraction into a shared hook/util)?
5. If this file was touched by a Phase 1 fix — does it still function exactly as before (regression check)?

---

## 4. ADMIN PANEL — FULL FUNCTIONAL TEST MATRIX

For **every one of the ~29 tabs**, run and record, in the emulator/staging environment:

| Action | Expected | Actual | Pass/Fail |
|---|---|---|---|
| Create new item with valid data | Saves, appears in list, appears on public site within the measured latency for that collection | | |
| Create with missing required field | Blocked with a clear validation message, no partial/corrupt Firestore write | | |
| Edit existing item | Updates correctly, old data fully replaced (no leftover stale fields) | | |
| Delete item | Removed from admin list AND from public site; confirm soft-delete vs hard-delete behavior matches what's expected | | |
| Bulk operations (bulk delete/import, where present) | Applies to exactly the selected items, no off-by-one/all-items bug | | |
| Upload a file/image | Uploads to correct Storage path, correct Storage rule allows it, renders correctly on public page | | |
| Simulate network failure mid-save (throttle in devtools) | Clear error shown, no silent data loss, retry is possible | | |
| Two admins editing the same item at once | Confirm what actually happens (last-write-wins? conflict shown? silently overwritten?) | | |
| Log out / session expiry mid-edit | Unsaved work is not silently destroyed without warning, if possible | | |

Also specifically verify:
- **Login flow** (`AdminLogin.jsx`): valid login, wrong password, wrong 2FA/PIN code, expired/locked-out state, both recovery flows (password + username) end-to-end in the emulator.
- **Permissions**: an account without admin claim/email should be refused by both the UI *and* the Firestore rules (test the rules directly, not just the UI gate — a determined user could bypass the UI).

---

## 5. INTEGRATIONS & BACKEND — TRACE EACH ONE END-TO-END

- **Google Drive sync** (folder ID already known — `1a9oCoEq5xpmsL_YeF0UKev9giHE0Eq_X`): trigger a sync, confirm files appear correctly in Documents, confirm behavior when the Drive API quota/auth fails.
- **`geminiProxy` Cloud Function (AI chatbot)**: send a normal query (confirm response quality/latency), send a rapid burst of requests (confirm the rate-limit from Phase 1 — if implemented — actually triggers), send malformed/empty input (confirm no crash), confirm no API key or prompt leakage in client-visible responses/errors.
- **Contact form → `onContactFormSubmitted`**: submit valid + invalid data, confirm email/notification actually arrives, confirm what happens if the function itself errors (does the user get a false "success" message?).
- **`scheduledFirestoreBackup`**: confirm it has actually run on schedule (check function logs/history), confirm a backup file is restorable, not just present.
- **PDF viewer / PDF worker**: open several real PDFs from Documents/Publications, confirm the pdfjs worker loads correctly (this broke before — regression-check it specifically).

---

## 6. REQUIRED OUTPUT FORMAT

1. **URGENT section** (if any) — anything actively broken in production right now.
2. **Data-flow latency table** — one row per admin-editable collection: sync mechanism (`onSnapshot` / cached), measured same-tab latency, measured cross-device latency, verdict (fine / needs improvement).
3. **File-by-file findings table** (same 5 columns as Phase 1: File, Found, Why it matters, Classification 🔴/🟡/🟢, Suggested fix) — but this time every finding must reference which of the §3 questions surfaced it, and whether it's a **new** finding or a **regression** from a Phase 1 change.
4. **Admin panel test matrix results** — the table from §4, filled in per tab, with any Fail rows highlighted first.
5. **Integration test results** — one paragraph per integration in §5, with pass/fail and evidence (log excerpt, timing, screenshot description).
6. **Top 10 priority list**, same format as Phase 1.
7. **Open questions for the human.**

No code changes, no deploys — describe and prove, don't fix, until told which items to act on.
