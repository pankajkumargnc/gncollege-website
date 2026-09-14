# Complete Website/Project QA Audit Prompt

Mujhe mere poore project/website ka **COMPLETE END-TO-END QA AUDIT + FIX** chahiye.
Koi bhi page, section, line, word ya element skip nahi hona chahiye.
Neeche diye gaye har point ko systematically, page-by-page, section-by-section check karo.

## ⚠️ IMPORTANT — PEHLE SIRF TEST KARO, IMPLEMENT NAHI
- Abhi ke liye **kuch bhi implement/fix nahi karna hai**.
- Pehle **sirf test, check, diagnose aur verify** karo — poora project, har page, har module.
- Jo bhi issues/bugs/mistakes mile unko note karo (kahan mila, kya problem hai, kitna critical hai).
- Sab kuch check karne ke baad mujhe ek **complete diagnosis report** do — full list of issues, page-wise/module-wise.
- Jab main explicitly bolun "ab implement karo" / "fix karo", **usi ke baad** actual code changes/fixes karna.
- Implementation ke baad bhi jab tak maine "commit/push/deploy karo" na bola ho, **GitHub par push, commit ya deploy bilkul nahi karna** — permission ke bina koi bhi git action mat lena.
- Sirf jab sab kuch (implementation ke baad) browser me dobara fully test ho jaye, sab sahi ho, aur maine explicitly permission di ho — tabhi commit → push → deploy GitHub par karna.

## 1) Structure Check (Pehle)
- Project ke saare pages/routes/components ki full list banao.
- Har page ka naam note karo taaki koi page miss na ho.
- Har page ko ek-ek karke audit karo (skip mat karo).

## 2) Responsiveness Test
Har page ko in sab screen sizes/breakpoints par test karo:
- Mobile: 320px, 375px, 390px, 414px, 480px
- Tablet: 600px, 768px, 834px, 1024px (portrait & landscape dono)
- Laptop: 1280px, 1366px, 1440px
- Desktop: 1536px, 1920px
- Large/4K: 2560px+

Har breakpoint par check karo:
- Overflow / cut-off text
- Overlapping elements
- Broken grid/flex layout
- Images stretch/squeeze
- Buttons/CTA touch-friendly size (min 44x44px)
- Navbar/hamburger menu sahi kaam kar raha hai ya nahi
- Orientation change (portrait ↔ landscape) par layout na tute
- Browser zoom 80%–150% par layout check

## 3) Text & Content Quality
- Har heading, subheading, paragraph, button label, placeholder, tooltip, alt text, footer text ko padho.
- Spelling mistakes, typos, grammar errors, extra/missing spaces, double punctuation fix karo.
- Consistency check: same terms ka spelling/case har jagah same ho.
- Placeholder text ("Lorem Ipsum", "TODO", "test123") dhoondo aur replace karo.

## 4) Alignment & Layout
- Har section ki horizontal/vertical alignment check karo.
- Padding/margin consistency har page/section me same pattern follow kare.
- Grid/flexbox items properly wrap/align ho rahe hain, har resolution par.
- Buttons, icons, form fields ek line me properly align ho.
- Sticky/fixed header-footer content ko overlap na kare scroll par.

## 5) Typography & Styling
- Font family, font size, font weight, line-height consistency saare pages me check karo.
- Heading hierarchy (h1 > h2 > h3...) logically sahi ho.
- Text truncation/wrap issues chote screens par na ho.
- Font loading smooth ho (flash of unstyled text na ho).

## 6) Color & Visual Consistency
- Color palette consistent ho (same brand colors har jagah).
- Contrast check karo (text readable ho background par).
- Hover/active/focus states ke colors check karo.
- Shadows, borders, border-radius consistency check karo.
- Dark mode / theme toggle (agar hai) consistency check karo.

## 7) Images & Media
- Har image sahi resolution par load ho, pixelated/blurry na ho.
- Broken image links check karo.
- Image aspect ratio distort na ho kisi screen size par.
- Lazy loading/alt tags missing na ho.

## 8) Interactive Elements
- Saare buttons, links, forms, dropdowns, modals, sliders test karo.
- Form validation messages sahi dikh rahe hain.
- Hover/focus states sab devices (touch vs mouse) par sahi behave kare.
- Keyboard navigation se saare interactive elements accessible ho.

## 9) Accessibility (a11y)
- Alt text har image par ho.
- Screen reader labels (aria-labels) forms/buttons par ho.
- Color contrast WCAG standard follow kare.
- Keyboard-only navigation fully functional ho.

## 10) SEO & Meta Basics
- Meta title/description har page par unique ho.
- Favicon set ho.
- Open Graph tags (social share preview) sahi ho.
- Broken internal/external links check karo, 404 page test karo.

## 11) Cross-Browser Check
- Chrome, Firefox, Safari, Edge par layout check karo.

## 12) Performance & Final Polish
- Console errors/warnings check karo.
- Unused/broken CSS classes clean karo.
- Loading states, empty states, error states har page par dekho.
- Images/videos optimize ho, unnecessary large files na ho.
- Cookie consent banner aur legal pages (privacy policy, terms) present ho.

## 13) Backend / API Check
- Har API endpoint response check karo (success + error cases dono)
- Loading state jab data fetch ho raha ho (spinner/skeleton) sahi dikhe
- Empty data state (jab admin panel se koi data na ho) properly handle ho
- Error handling agar API fail ho jaye (proper message dikhe, crash na ho)
- API response time/slow network simulate karke test karo

## 14) Admin Panel ↔ Website Sync
- Admin panel se data add/edit/delete karo → website par real-time/refresh par sahi update ho raha hai check karo
- Image upload admin panel se → website par sahi size/quality me show ho
- Draft vs Published content ka farak website par sahi reflect ho
- Pagination/sorting/filtering agar admin data list based hai to website par sahi kaam kare

## 15) Data Validation & Security
- Forms me input validation (empty, wrong format, special characters, script tags) test karo
- Authentication/login sessions properly expire/refresh ho
- Role-based access (admin vs normal user) sahi restrict ho
- Sensitive data (API keys, passwords) frontend code me expose na ho

## 16) Edge Cases
- Bahut zyada data (100+ items) aane par layout na tute (long lists, pagination)
- Special characters/emoji/long text admin se dalne par website par crash/overflow na ho
- Multiple users same time par admin se data change karein to conflict na ho

## 17) Website — Har Menu/Page Specific
- Har navigation menu item click karke check karo — sahi page open ho, wrong/dead link na ho
- Breadcrumbs (agar hain) sahi path show karein
- Active menu state highlight ho (current page ka menu item highlighted dikhe)
- Nested/dropdown submenus har device par sahi open/close ho
- Search bar (agar hai) sahi results de, empty search state handle ho
- Footer links (social media, contact, policies) sab working ho
- Pagination/"Load more" har listing page par sahi kaam kare

## 18) Admin Panel — Har Menu/Page Specific
- Har admin menu/module (Users, Products, Orders, Content, Settings etc.) individually open karke check karo
- CRUD operations (Create, Read, Update, Delete) har module me fully test karo
- Bulk actions (multiple select karke delete/update) sahi kaam karein
- Search/filter/sort admin tables me sahi kaam kare
- Confirmation popups (delete/update se pehle "Are you sure?") har jagah ho
- Success/error toast notifications har action ke baad dikhein
- Form auto-save ya unsaved changes warning (agar user page chhod raha ho)
- File/image upload size limit aur format validation
- Admin dashboard ke stats/charts sahi real data reflect karein
- Different admin roles (super admin, editor, viewer) ke permissions sahi restrict hon

## 19) Cross-Check (Admin ↔ Website)
- Admin se koi bhi menu/category/page add karo → website ke navigation me turant/sahi tarike se reflect ho
- Admin se disable/hide kiya gaya content website par actually hide ho
- SEO fields (agar admin se meta title/description edit hoti hai) website par sahi apply ho

## 20) Final Report (Diagnosis Stage)
Sab kuch check karne ke baad mujhe ek **complete report** do (implementation se pehle):
- Kaunse issues mile (page-wise/module-wise)
- Har issue ki severity (critical/major/minor)
- Kaunse pages/sections fully verified ho gaye
- Agar kahin manual visual check zaruri hai to specifically batao
- Ek to-do list jo maine approve karne ke baad implement hogi

---
**IMPORTANT RULES:**
- Kisi bhi page, component, ya text ko "minor" samajh kar skip mat karna. Har cheez ko actually verify karo, sirf assume mat karo.
- Pehle sirf test/diagnose/report karo — implementation nahi.
- Implementation sirf explicit permission ke baad.
- Git commit/push/deploy sirf tab jab implementation ke baad browser me fully re-test ho chuka ho **aur maine explicitly deploy karne ko bola ho.**
