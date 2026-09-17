## 📝 Description of Changes
<!-- Provide a concise summary of the changes made and the problem being solved. -->

## 🛡️ Pre-Merge Verification Checklist (CLAUDE.md Rules)
- [ ] **HashRouter Enforced**: No `BrowserRouter` introduced (preserves GitHub Pages static hosting).
- [ ] **Split-Core Firebase**: Public bundle imports from `src/firebase.js` ONLY. No `firebase/auth` in public pages.
- [ ] **Zero-Emoji Policy**: All icons use accessible vector SVGs from `lucide-react` with `currentColor`.
- [ ] **Zero-Deletion Fallback**: Built-in fallback data is preserved for headless CMS resilience.
- [ ] **Playwright QA Passed**: `npm run test:qa` completes with 0 layout overflow errors.
- [ ] **XSS Sanitization**: All rich text content is passed through `DOMPurify.sanitize()`.
- [ ] **Production Build**: `npm run build` exits with code 0.
