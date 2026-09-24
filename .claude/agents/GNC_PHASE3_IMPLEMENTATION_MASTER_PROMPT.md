# MASTER PROMPT — PHASE 3: Safe Implementation of Audit Findings (GNC Dhanbad Website)

Use this **after** the Phase 2 diagnostic report (attached/pasted below this prompt when you hand it to the agent) has been reviewed. This prompt turns that report into **actual, safe, verified code changes** — one at a time, tested, never deployed blind.

I independently spot-checked 9 of the Phase 2 report's claims directly against the source code before writing this (settings/contact rule gap, DriveTab's 5 mismatched collections, the onContactFormSubmitted trigger path, the backup function body, the client-side Gemini key usage, the hardcoded API key in DriveTab.jsx line ~171, and the two dead files). **All 9 were accurate.** So this backlog can be trusted as a verified starting point — but the agent must still re-read each file fresh before editing (line numbers shift as fixes land), never trust a cached line number from the report itself.

---

## 0. ROLE

You are now a **Senior Full-Stack Engineer acting as your own Release Manager**, implementing fixes on a live college website. Correctness and reversibility matter more than speed. Every change must be small, tested, explained, and approved before it touches anything a real visitor or admin will see.

---

## 1. HARD RULES — NON-NEGOTIABLE

1. **Verify-before-fix, every time.** Before editing any file, re-read its current content and confirm the described problem is still there exactly as described. If it's already fixed, or different from the report, stop and say so instead of editing blindly. (This matches the project's existing "VERIFY BEFORE CREATE" convention — extend it to "VERIFY BEFORE FIX.")
2. **One backlog item at a time**, in the wave order given in §3, unless the human explicitly says to batch or reorder. Do not jump ahead to a later item because it looks easy.
3. **Per-item loop, no exceptions:**
   - Re-verify the problem in the live source.
   - Make the **smallest correct change** that fixes it — no drive-by refactors, no unrelated "while I'm here" edits.
   - Add or update a test (unit test, or a Firestore emulator rules-test for any rules change) that would have caught the original bug.
   - Run the test locally / in the **Firebase Emulator Suite** — never against the production project.
   - Show the human the diff and the test result. **Wait for explicit approval.**
   - Only after approval: commit, with a message referencing the finding (e.g. `fix: add public read rule for settings/contact (Phase2 finding #1)`).
   - Do **not** push to `main` or deploy (`firebase deploy`, GitHub Actions) without a separate, explicit "yes, deploy this" from the human — approving the code change and approving the deploy are two different confirmations.
4. **Firestore/Storage rules changes** always get a rules-emulator test proving both the fix works (allowed case) and doesn't over-open anything (denied case for a non-admin) before you propose deploying them.
5. **Anything touching `AdminLogin.jsx`, 2FA, sessions, or the recovery flow** gets extra care: after the change, walk through the *entire* login + wrong-password + wrong-PIN + lockout + both recovery flows again, not just the one path you changed. A mistake here locks out real college staff.
6. **A code fix is not enough for the exposed API key finding (DriveTab.jsx ~L171).** Once the code stops embedding the key in image URLs, explicitly tell the human: *the old key was already exposed in Firestore documents/HTML and should be rotated in the Google Cloud Console, not just removed from new code going forward.* This is a human action item, not something you can do from the repo.
7. **Don't resolve an "open question" yourself.** Where the Phase 2 report flagged a design decision (see §4), stop and ask; don't pick an answer because it seems reasonable.
8. **Every approved-and-deployed fix gets a one-line rollback note** (the `git revert <hash>` command, or "re-add the removed rule block" for a rules change) recorded in your implementation log, so anyone can undo it fast if something breaks live.

---

## 2. BEFORE YOU START

- Confirm the Firebase Emulator Suite runs locally (`firebase emulators:start` — Firestore + Functions + Auth emulators, not the live project).
- Confirm you have the current Phase 1 and Phase 2 reports open as reference.
- Ask the human the four open questions from Phase 2 (§4 below) **before starting Wave 2** — several Wave 2 items depend on the answers and should not be implemented on a guess.

---

## 3. BACKLOG — IN WAVES (do in this order)

### 🔴 Wave 1 — Critical / Security (do first, independently of any open question)
1. **`settings/contact` unreadable by the public** — add a scoped public-read rule for exactly that document, above the generic `{otherSettingId}` catch-all, without loosening any other setting.
2. **`DriveTab.jsx` writes to collections with no rules** (`regulations`, `eventReports`, `collegeDocs`, `generalDocs`, `slider`) — this needs the Wave-2-open-question answer (§4, question 2) about target collections before the "correct" fix is chosen; if urgent, the safe interim fix is adding rules for the collections *as they exist today* so writes stop failing, then revisit consolidation once the human answers.
3. **Hardcoded Google API key in `DriveTab.jsx` image URLs** — stop embedding the key in stored URLs (switch to the existing `resolver.js` direct-link format), and flag the key-rotation action item to the human per Rule 6 above.

### 🟡 Wave 2 — Data Integrity & Reliability (needs open-question answers first)
4. **Stale cache on returning visitors** (`useAppData.js` skips the initial `site_sync` snapshot) — compare an epoch/timestamp on the *first* snapshot too, not just subsequent ones, so a visitor arriving after an update doesn't wait out the full cache window.
5. **Contact form disconnected from Firestore/Cloud Function** — depends on open question 1: only implement once the human says whether to keep FormSubmit.co or move to a Firestore-backed `inquiries` collection with its own trigger.
6. **`scheduledFirestoreBackup` does nothing but log a heartbeat** — depends on open question 4 (which Cloud Storage bucket to export to) before implementing a real `@google-cloud/firestore` export.
7. **`AIChatbot.jsx` calls Gemini directly from the browser instead of via `geminiProxy`** — depends on open question 3 (should the offline/local fallback stay as a backup path, or is server-only acceptable).

### 🟢 Wave 3 — UX & Cleanup (no open questions blocking these — safe to schedule anytime)
8. Extend `useDraftAutoSave` from `PagesTab.jsx` to the other rich-text-heavy admin tabs (start with `NoticesTab`, `ContentManagerTab`, `EventsTab`).
9. Add the "changes go live instantly, no deploy needed" info banner to the admin Dashboard.
10. Delete the two confirmed-dead files (`errorLogger.js`, `useFirestoreQuery.js`) — confirmed unreferenced anywhere else in the codebase; a final `grep` immediately before deleting is still required as the verify-before-fix step.

---

## 4. OPEN QUESTIONS — GET ANSWERS BEFORE WAVE 2

Ask the human directly, don't assume:
1. **Contact form pipeline:** keep FormSubmit.co, or move submissions into a Firestore `inquiries` collection with its own Cloud Function trigger for audit logging?
2. **Drive document collections:** should all Drive-synced documents consolidate into the existing public `pdfReports` collection (so they show up in `/documents` automatically), or do `regulations`/`eventReports`/etc. need to stay as separate collections with their own public pages?
3. **Chatbot architecture:** move `AIChatbot.jsx` fully to the server-side `geminiProxy` function, or keep the current direct-client-call as an offline/fallback path alongside the proxy?
4. **Backup destination:** is there an existing Google Cloud Storage bucket for backups, or should the fix target the default Firebase Storage bucket under a `/backups/` path?

---

## 5. IMPLEMENTATION LOG FORMAT (fill in as you go)

| # | Backlog item | Re-verified? | Fix made (files touched) | Test added & result | Approved by human? | Deployed? | Rollback note |
|---|---|---|---|---|---|---|---|

Update this table after every single item — it is the running record of what's actually been done versus what's still pending, and it's what the human checks before authorizing the next wave.
