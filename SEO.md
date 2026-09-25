# GNC Digital Campus — Search Engine Optimization & Metadata (Website 2.0)
**Institution:** Guru Nanak College, Dhanbad  
**Specification Reference:** GNC Website 2.0 Master Prompt — Sections 35, 36, 37, 60, 87, 90, 94  
**Classification:** Institutional SEO & Indexing Engineering Document  

---

## 1. Canonical Domain & Host Portability (Section 37 & 90)

The canonical domain is decoupled from hardcoded URLs and driven dynamically by environment configuration:

```javascript
// src/utils/seoManager.js
const configuredDomain = (typeof process !== 'undefined' && process.env?.VITE_CANONICAL_DOMAIN)
  || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CANONICAL_DOMAIN);
export const BASE_URL = configuredDomain ? configuredDomain.replace(/\/+$/, '') : 'https://gnc-college-web.web.app';
```

- **Production Custom Domain:** Configurable to `https://gncollege.org` via `.env.production`.
- **Firebase Default:** Falls back cleanly to `https://gnc-college-web.web.app`.
- **Automated Validation:** Canonical `<link rel="canonical" href="..." />` tags update dynamically on every client route transition.

---

## 2. Route-Based Metadata Directory (`SEO_MAP`) (106 Routes)

All 106 application routes possess unique, human-curated title tags, meta descriptions, and OpenGraph descriptors.

### Key Route Mappings:
| Route | Page Title | Meta Description Focus |
|---|---|---|
| `/` | `Guru Nanak College Dhanbad \| NAAC Accredited Degree College` | Institutional overview, NAAC accreditation, admissions alert |
| `/student-corner` | `Student Corner \| Guru Nanak College Dhanbad` | Centralized student hub, exams, results, document requests |
| `/admission/rule` | `Admission Rules & Procedure \| Guru Nanak College Dhanbad` | Chancellor Portal eligibility, Sikh minority reservation rules |
| `/academics/departments/bca` | `BCA Department \| Guru Nanak College Dhanbad` | 3-Year professional IT degree, syllabus, faculty, and lab infrastructure |
| `/notifications` | `Official Notifications & Circulars \| GNC Dhanbad` | Real-time circulars, examinations, holidays, and university notifications |
| `/contact` | `Contact Us \| Guru Nanak College Dhanbad` | Bhuda & Bank More campus locations, phone, email, and maps |

---

## 3. Structured Data (JSON-LD)

Implemented in `index.html` adhering to the Schema.org `CollegeOrUniversity` specification:

```json
{
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "name": "Guru Nanak College, Dhanbad",
  "alternateName": ["GNC Dhanbad", "Guru Nanak College"],
  "url": "https://gnc-college-web.web.app/",
  "logo": "https://gnc-college-web.web.app/images/logo.webp",
  "image": "https://gnc-college-web.web.app/images/gncollege-social-preview.webp",
  "description": "NAAC accredited Sikh Minority Degree College affiliated to B.B.M.K. University, Dhanbad, Jharkhand. Offering B.A., B.Com., BCA, BBA programmes.",
  "foundingDate": "1970",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Guru Nanak College, Bhuda",
    "addressLocality": "Dhanbad",
    "addressRegion": "Jharkhand",
    "postalCode": "826001",
    "addressCountry": "IN"
  },
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+91-7903340991",
    "contactType": "admissions",
    "availableLanguage": ["Hindi", "English", "Punjabi"]
  }]
}
```

---

## 4. XML Sitemap & Crawl Automation (Section 87)

- **Script:** `scripts/generateSitemap.js` runs automatically on `npm run build`.
- **Target Files:** Emits `public/sitemap.xml` and `dist/sitemap.xml`.
- **Coverage:** Generates standard XML sitemap encompassing all 106 routes with RFC-3986 canonical URLs, priority weighting (`1.0` for home, `0.9` for admissions, `0.8` for academics/notices), and change frequencies (`daily`, `weekly`, `monthly`).
- **Robots Policy (`public/robots.txt`):** Allows full public crawling while disallowing administrative and internal testing directories (`/admin`, `/_sysTest`).
