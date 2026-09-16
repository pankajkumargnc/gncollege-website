// src/utils/seoManager.js — Dynamic SEO Manager
// ✍️ @SEO_Agent — Route-based SEO meta tag management

const SITE_NAME = 'Guru Nanak College, Dhanbad';
const BASE_URL = 'https://gnc-college-web.web.app';
const DEFAULT_IMAGE = `${BASE_URL}/images/gncollege-social-preview.webp`;
const DEFAULT_DESC = 'Guru Nanak College Dhanbad — NAAC accredited Sikh Minority Degree College affiliated to B.B.M.K. University, Jharkhand. Offering B.A., B.Com., BCA, BBA courses.';

/**
 * Route → SEO metadata mapping
 */
const SEO_MAP = {
  '/': {
    title: 'Guru Nanak College Dhanbad | NAAC Accredited Degree College',
    description: DEFAULT_DESC,
  },
  '/contact': {
    title: 'Contact Us | Guru Nanak College Dhanbad',
    description: 'Get in touch with Guru Nanak College, Dhanbad. Phone, email, campus address, and Google Maps location for Bhuda and Bank More campuses.',
  },

  // ── About Us ──────────────────────────────────────────────
  '/about-us/college-profile': {
    title: 'College Profile | Guru Nanak College Dhanbad',
    description: 'Learn about Guru Nanak College Dhanbad — established 1970, NAAC accredited, affiliated to BBMKU. 50+ years of academic excellence.',
  },
  '/about-us/vision-mission': {
    title: 'Vision & Mission | Guru Nanak College Dhanbad',
    description: 'Vision and Mission of Guru Nanak College — committed to quality education, social responsibility, and inclusive development.',
  },
  '/about-us/principal-message': {
    title: "Principal's Message | Guru Nanak College Dhanbad",
    description: "Read the Principal's message about the college's academic vision, student welfare, and future goals.",
  },
  '/about-us/governing-body': {
    title: 'Governing Body | Guru Nanak College Dhanbad',
    description: 'Members of the Governing Body of Guru Nanak College, Dhanbad — overseeing college administration and governance.',
  },
  '/about-us/staff-council': {
    title: 'Staff Council | Guru Nanak College Dhanbad',
    description: 'Staff Council members and roles at Guru Nanak College, Dhanbad.',
  },
  '/about-us/sikh-heritage': {
    title: 'Sikh Heritage | Guru Nanak College Dhanbad',
    description: 'Learn about the Sikh heritage, Guru Nanak Dev Ji\'s teachings, and the cultural foundation of Guru Nanak College, Dhanbad.',
  },

  // ── College Management ────────────────────────────────────
  '/about-us/college-management/organogram': {
    title: 'Organogram | Guru Nanak College Dhanbad',
    description: 'Organizational chart and administrative structure of Guru Nanak College, Dhanbad.',
  },
  '/about-us/college-management/presidents': {
    title: 'Presidents | Guru Nanak College Dhanbad',
    description: 'List of Presidents who have led Guru Nanak College, Dhanbad over the years.',
  },
  '/about-us/college-management/secretaries': {
    title: 'Secretaries | Guru Nanak College Dhanbad',
    description: 'List of Secretaries who have served Guru Nanak College, Dhanbad over the years.',
  },
  '/about-us/college-management/principal': {
    title: 'Principals | Guru Nanak College Dhanbad',
    description: 'List of Principals who have led Guru Nanak College, Dhanbad over the years.',
  },

  // ── Committees ────────────────────────────────────────────
  '/about-us/various-committees/womens-cell': {
    title: "Women's Cell | Guru Nanak College Dhanbad",
    description: "Women's Cell at Guru Nanak College — promoting gender equality, women's safety, and empowerment.",
  },
  '/about-us/various-committees/anti-ragging': {
    title: 'Anti-Ragging Committee | Guru Nanak College Dhanbad',
    description: 'Anti-Ragging Committee ensuring a safe, ragging-free campus environment at GNC Dhanbad.',
  },
  '/about-us/various-committees/sc-st': {
    title: 'SC/ST Cell | Guru Nanak College Dhanbad',
    description: 'SC/ST Cell for welfare and protection of Scheduled Caste & Scheduled Tribe students at GNC Dhanbad.',
  },
  '/about-us/various-committees/obc': {
    title: 'OBC Cell | Guru Nanak College Dhanbad',
    description: 'OBC Cell for welfare and development of Other Backward Classes students at GNC Dhanbad.',
  },
  '/about-us/various-committees/grievance': {
    title: 'Grievance Redressal Cell | Guru Nanak College Dhanbad',
    description: 'Grievance Redressal Cell for addressing student and staff complaints at GNC Dhanbad.',
  },
  '/about-us/various-committees/icc': {
    title: 'Internal Complaints Committee (ICC) | Guru Nanak College Dhanbad',
    description: 'ICC for prevention and redressal of sexual harassment at workplace — Guru Nanak College, Dhanbad.',
  },
  '/about-us/various-committees/minority': {
    title: 'Minority Cell | Guru Nanak College Dhanbad',
    description: 'Minority Cell for welfare of minority community students at Guru Nanak College, Dhanbad.',
  },
  '/about-us/various-committees/placement': {
    title: 'Placement Cell | Guru Nanak College Dhanbad',
    description: 'Placement Cell for career guidance, campus recruitment, and industry connections at GNC Dhanbad.',
  },
  '/about-us/various-committees/rusa': {
    title: 'RUSA Cell | Guru Nanak College Dhanbad',
    description: 'Rashtriya Uchchatar Shiksha Abhiyan (RUSA) Cell at Guru Nanak College, Dhanbad.',
  },

  // ── College Staff ─────────────────────────────────────────
  '/about-us/college-staff/teaching-staff': {
    title: 'Teaching Staff | Guru Nanak College Dhanbad',
    description: 'Faculty members and teaching staff at Guru Nanak College, Dhanbad — experienced educators across departments.',
  },
  '/about-us/college-staff/non-teaching-staff': {
    title: 'Non-Teaching Staff | Guru Nanak College Dhanbad',
    description: 'Administrative and non-teaching staff at Guru Nanak College, Dhanbad.',
  },

  // ── Audit & Regulations ───────────────────────────────────
  '/about-us/audit-report': {
    title: 'Audit Report | Guru Nanak College Dhanbad',
    description: 'Annual audit reports and financial statements of Guru Nanak College, Dhanbad.',
  },
  '/about-us/regulations': {
    title: 'Regulations & Byelaws | Guru Nanak College Dhanbad',
    description: 'Official regulations, university guidelines, and college byelaws of Guru Nanak College, Dhanbad.',
  },
  '/about-us/regulations/bbmku-ug': {
    title: 'BBMKU UG Regulation (CBCS) | Guru Nanak College Dhanbad',
    description: 'Binod Bihari Mahto Koyalanchal University UG regulations under CBCS for affiliated colleges.',
  },
  '/about-us/regulations/bbmku-circular': {
    title: 'BBMKU Circulars | Guru Nanak College Dhanbad',
    description: 'Official circulars issued by BBMKU for affiliated colleges including Guru Nanak College.',
  },
  '/about-us/regulations/fyugp-nep': {
    title: 'FYUGP NEP-2020 | Guru Nanak College Dhanbad',
    description: 'Four Year Undergraduate Programme under National Education Policy 2020 at Guru Nanak College.',
  },
  '/about-us/regulations/vbu-ug': {
    title: 'VBU UG Regulation 2015 | Guru Nanak College Dhanbad',
    description: 'Vinoba Bhave University UG regulations (2015) applicable to Guru Nanak College programmes.',
  },
  '/about-us/regulations/vbu-bca': {
    title: 'VBU BCA Regulation | Guru Nanak College Dhanbad',
    description: 'Vinoba Bhave University regulations for BCA programme at Guru Nanak College.',
  },
  '/about-us/regulations/college-byelaws': {
    title: 'Constitution & Byelaws | Guru Nanak College Dhanbad',
    description: 'Constitution and byelaws governing Guru Nanak College, Dhanbad.',
  },
  '/about-us/regulations/college-affiliation': {
    title: 'College Affiliation | Guru Nanak College Dhanbad',
    description: 'University affiliation documents and certificates of Guru Nanak College, Dhanbad.',
  },
  '/about-us/regulations/ugc-certificate': {
    title: 'UGC 2(f) & 12(B) Certificate | Guru Nanak College Dhanbad',
    description: 'University Grants Commission recognition under Section 2(f) and 12(B) for Guru Nanak College.',
  },
  '/about-us/regulations/minority-exemption': {
    title: 'Minority Exemption & Quota | Guru Nanak College Dhanbad',
    description: 'Minority exemption certificate and reservation quota details for Guru Nanak College, Dhanbad.',
  },

  // ── Campus ────────────────────────────────────────────────
  '/campus/visuals/bhuda': {
    title: 'Bhuda Campus Gallery | Guru Nanak College Dhanbad',
    description: 'Photo gallery of the Bhuda campus of Guru Nanak College, Dhanbad.',
  },
  '/campus/visuals/bank-more': {
    title: 'Bank More Campus Gallery | Guru Nanak College Dhanbad',
    description: 'Photo gallery of the Bank More campus of Guru Nanak College, Dhanbad.',
  },
  '/campus/visuals/vocational-building': {
    title: 'Vocational Building | Guru Nanak College Dhanbad',
    description: 'Vocational training building and facilities at Guru Nanak College, Dhanbad.',
  },
  '/campus/infrastructure': {
    title: 'Infrastructure | Guru Nanak College Dhanbad',
    description: 'World-class infrastructure and facilities at Guru Nanak College — labs, library, auditorium, and more.',
  },
  '/campus/classroom': {
    title: 'Smart Classrooms | Guru Nanak College Dhanbad',
    description: 'Modern smart classrooms and teaching infrastructure at Guru Nanak College, Dhanbad.',
  },
  '/campus/ict-rooms': {
    title: 'ICT Rooms & Computer Labs | Guru Nanak College Dhanbad',
    description: 'ICT-enabled rooms and computer labs with modern equipment at Guru Nanak College.',
  },
  '/campus/green-campus': {
    title: 'Green Campus Initiative | Guru Nanak College Dhanbad',
    description: 'Eco-friendly green campus with plantation drives, solar energy, and environmental awareness at GNC.',
  },
  '/campus/virtual-tour': {
    title: 'Virtual Campus Tour | Guru Nanak College Dhanbad',
    description: 'Take a 360° virtual tour of Guru Nanak College, Dhanbad — explore both campuses from home.',
  },
  '/virtual-tour': {
    title: 'Virtual Campus Tour | Guru Nanak College Dhanbad',
    description: 'Take a 360° virtual tour of Guru Nanak College, Dhanbad — explore both campuses from home.',
  },

  // ── Academics ─────────────────────────────────────────────
  '/academics/course-offered': {
    title: 'Courses Offered | Guru Nanak College Dhanbad',
    description: 'Explore courses at GNC Dhanbad — B.A., B.Com., BCA, BBA programmes affiliated to BBMKU.',
  },
  '/academics/departments': {
    title: 'Departments | Guru Nanak College Dhanbad',
    description: 'Academic departments at Guru Nanak College — Commerce, Humanities, BCA, BBA, and more.',
  },
  '/academics/departments/bca': {
    title: 'BCA Department | Guru Nanak College Dhanbad',
    description: 'Bachelor of Computer Applications department — curriculum, faculty, and placements at GNC.',
  },
  '/academics/departments/commerce': {
    title: 'Commerce Department | Guru Nanak College Dhanbad',
    description: 'Department of Commerce — B.Com. programme, faculty, and curriculum at GNC Dhanbad.',
  },
  '/academics/departments/hindi': {
    title: 'Hindi Department | Guru Nanak College Dhanbad',
    description: 'Department of Hindi — B.A. Hindi programme and faculty at Guru Nanak College.',
  },
  '/academics/departments/english': {
    title: 'English Department | Guru Nanak College Dhanbad',
    description: 'Department of English — B.A. English programme and faculty at Guru Nanak College.',
  },
  '/academics/departments/economics': {
    title: 'Economics Department | Guru Nanak College Dhanbad',
    description: 'Department of Economics — B.A. Economics programme and faculty at GNC.',
  },
  '/academics/departments/political-science': {
    title: 'Political Science Department | Guru Nanak College Dhanbad',
    description: 'Department of Political Science — programme and faculty at Guru Nanak College.',
  },
  '/academics/departments/history': {
    title: 'History Department | Guru Nanak College Dhanbad',
    description: 'Department of History — B.A. History programme and faculty at GNC.',
  },
  '/academics/departments/geography': {
    title: 'Geography Department | Guru Nanak College Dhanbad',
    description: 'Department of Geography — programme and faculty at Guru Nanak College.',
  },
  '/academics/departments/bba': {
    title: 'BBA Department | Guru Nanak College Dhanbad',
    description: 'Bachelor of Business Administration department at Guru Nanak College, Dhanbad.',
  },
  '/academics/departments/punjabi': {
    title: 'Punjabi Department | Guru Nanak College Dhanbad',
    description: 'Department of Punjabi language and literature at Guru Nanak College.',
  },
  '/academics/departments/urdu': {
    title: 'Urdu Department | Guru Nanak College Dhanbad',
    description: 'Department of Urdu language and literature at Guru Nanak College.',
  },
  '/academics/departments/philosophy': {
    title: 'Philosophy Department | Guru Nanak College Dhanbad',
    description: 'Department of Philosophy — programme and faculty at Guru Nanak College.',
  },
  '/syllabus': {
    title: 'Syllabus | Guru Nanak College Dhanbad',
    description: 'Download syllabus for all courses — B.A., B.Com., BCA, BBA at Guru Nanak College.',
  },
  '/academics/academic-calendar': {
    title: 'Academic Calendar | Guru Nanak College Dhanbad',
    description: 'Academic calendar with important dates, exam schedules, and holidays at GNC Dhanbad.',
  },
  '/academics/placements': {
    title: 'Placements & Career | Guru Nanak College Dhanbad',
    description: 'Campus placement records, recruiter partnerships, and career guidance at GNC Dhanbad.',
  },
  '/academics/iqac': {
    title: 'IQAC | Guru Nanak College Dhanbad',
    description: 'Internal Quality Assurance Cell — ensuring quality education standards at GNC Dhanbad.',
  },

  // ── Admission ─────────────────────────────────────────────
  '/admission/rule': {
    title: 'Admission Rules | Guru Nanak College Dhanbad',
    description: 'Admission rules and eligibility criteria for Guru Nanak College, Dhanbad.',
  },
  '/admission/fee-structure': {
    title: 'Fee Structure | Guru Nanak College Dhanbad',
    description: 'Fee structure for all courses at Guru Nanak College, Dhanbad — B.A., B.Com., BCA, BBA.',
  },
  '/admission/document-required': {
    title: 'Documents Required for Admission | Guru Nanak College Dhanbad',
    description: 'List of required documents for admission at Guru Nanak College, Dhanbad.',
  },
  '/admission/notification/latest': {
    title: 'Latest Admission Notifications | Guru Nanak College Dhanbad',
    description: 'Latest admission notifications and updates for Guru Nanak College, Dhanbad.',
  },
  '/admission/notification/upcoming': {
    title: 'Upcoming Admission Notifications | Guru Nanak College Dhanbad',
    description: 'Upcoming admission schedules and notifications for GNC Dhanbad.',
  },
  '/admission/intake-capacity': {
    title: 'Intake Capacity | Guru Nanak College Dhanbad',
    description: 'Course-wise intake capacity and seat availability at Guru Nanak College, Dhanbad.',
  },
  '/scholarships': {
    title: 'Scholarships & Financial Aid | Guru Nanak College Dhanbad',
    description: 'Complete guide to scholarships for SC/ST/OBC/Minority students — NSP, Jharkhand E-Kalyan, SGPC, and college merit scholarships.',
  },

  // ── Activities ────────────────────────────────────────────
  '/activity/nss': {
    title: 'NSS (National Service Scheme) | Guru Nanak College Dhanbad',
    description: 'NSS activities, camps, and community service programmes at Guru Nanak College.',
  },
  '/activity/ncc': {
    title: 'NCC (National Cadet Corps) | Guru Nanak College Dhanbad',
    description: 'NCC unit activities, parades, and camps at Guru Nanak College, Dhanbad.',
  },
  '/activity/workshop': {
    title: 'Workshops & Seminars | Guru Nanak College Dhanbad',
    description: 'Workshops, seminars, and guest lectures conducted at Guru Nanak College.',
  },
  '/activity/games-sports': {
    title: 'Games & Sports | Guru Nanak College Dhanbad',
    description: 'Sports facilities, inter-college tournaments, and athletic achievements at GNC Dhanbad.',
  },
  '/activity/collaboration/rotaract-club': {
    title: 'Rotaract Club | Guru Nanak College Dhanbad',
    description: 'Rotaract Club activities and community engagement at Guru Nanak College.',
  },
  '/activity/collaboration/sadbhavana-diwas': {
    title: 'Sadbhavana Diwas | Guru Nanak College Dhanbad',
    description: 'Sadbhavana Diwas celebrations promoting communal harmony at GNC Dhanbad.',
  },

  // ── NAAC ──────────────────────────────────────────────────
  '/naac/aqar': {
    title: 'AQAR Reports | NAAC | Guru Nanak College Dhanbad',
    description: 'Annual Quality Assurance Reports (AQAR) submitted to NAAC by Guru Nanak College.',
  },
  '/naac/nirf': {
    title: 'NIRF | Guru Nanak College Dhanbad',
    description: 'National Institutional Ranking Framework data for Guru Nanak College.',
  },
  '/naac/ssr-1st-cycle/cycle-1-documents': {
    title: 'NAAC SSR Cycle-1 Documents | Guru Nanak College Dhanbad',
    description: 'Self-Study Report documents for NAAC 1st cycle accreditation of Guru Nanak College.',
  },
  '/naac/ssr-1st-cycle/peer-team-report': {
    title: 'NAAC Peer Team Report (Cycle 1) | Guru Nanak College Dhanbad',
    description: 'NAAC Peer Team visit report for 1st cycle assessment of Guru Nanak College.',
  },
  '/naac/ssr-2nd-cycle/cycle-2-documents': {
    title: 'NAAC SSR Cycle-2 Documents | Guru Nanak College Dhanbad',
    description: 'Self-Study Report documents for NAAC 2nd cycle re-accreditation of Guru Nanak College.',
  },
  '/naac/ssr-2nd-cycle/executive-summary': {
    title: 'NAAC Executive Summary (Cycle 2) | Guru Nanak College Dhanbad',
    description: 'Executive summary of NAAC 2nd cycle SSR for Guru Nanak College.',
  },
  '/naac/perspective-plan': {
    title: 'Perspective Plan | NAAC | Guru Nanak College Dhanbad',
    description: 'Strategic perspective plan for institutional development at Guru Nanak College.',
  },

  // ── Publications ──────────────────────────────────────────
  '/publication/college-library': {
    title: 'College Library | Guru Nanak College Dhanbad',
    description: 'Library resources, books, journals, and e-resources at Guru Nanak College, Dhanbad.',
  },
  '/publication/e-magazine': {
    title: 'E-Magazine | Guru Nanak College Dhanbad',
    description: 'Digital magazine publications from Guru Nanak College, Dhanbad.',
  },
  '/publication/examination-results/2024': {
    title: 'Examination Results 2024 | Guru Nanak College Dhanbad',
    description: 'Examination results for session 2024 at Guru Nanak College, Dhanbad.',
  },
  '/publication/examination-results/2023': {
    title: 'Examination Results 2023 | Guru Nanak College Dhanbad',
    description: 'Examination results for session 2023 at Guru Nanak College, Dhanbad.',
  },
  '/publication/sss-report/2023-24': {
    title: 'SSS Report 2023-24 | Guru Nanak College Dhanbad',
    description: 'Student Satisfaction Survey report for session 2023-24 at GNC Dhanbad.',
  },
  '/publication/sss-report/2022-23': {
    title: 'SSS Report 2022-23 | Guru Nanak College Dhanbad',
    description: 'Student Satisfaction Survey report for session 2022-23 at GNC Dhanbad.',
  },

  // ── Gallery / Media ───────────────────────────────────────
  '/gallery': {
    title: 'Photo Gallery | Guru Nanak College Dhanbad',
    description: 'Photo gallery of campus life, events, seminars, cultural activities, and sports at GNC Dhanbad.',
  },
  '/gallery/photos': {
    title: 'Photo Gallery | Guru Nanak College Dhanbad',
    description: 'Photo gallery of campus life, events, and activities at Guru Nanak College.',
  },
  '/gallery/photo-gallery': {
    title: 'Photo Gallery | Guru Nanak College Dhanbad',
    description: 'Browse photos of events, campus, and college life at GNC Dhanbad.',
  },
  '/gallery/video-gallery': {
    title: 'Video Gallery | Guru Nanak College Dhanbad',
    description: 'Watch video highlights from campus events and activities at GNC Dhanbad.',
  },
  '/video-gallery': {
    title: 'Video Gallery | Guru Nanak College Dhanbad',
    description: 'Video highlights from campus events, seminars, and cultural programmes at GNC Dhanbad.',
  },
  '/videos': {
    title: 'Videos | Guru Nanak College Dhanbad',
    description: 'Video collection from campus events, seminars, and activities at GNC Dhanbad.',
  },
  '/gallery/videos': {
    title: 'Video Gallery | Guru Nanak College Dhanbad',
    description: 'Video highlights from campus events, seminars, and cultural programmes.',
  },

  // ── Events / Notices / News ───────────────────────────────
  '/events': {
    title: 'Events | Guru Nanak College Dhanbad',
    description: 'Latest events, seminars, workshops, and cultural programmes at Guru Nanak College.',
  },
  '/news': {
    title: 'News & Updates | Guru Nanak College Dhanbad',
    description: 'Latest news, achievements, and updates from Guru Nanak College, Dhanbad.',
  },
  '/notifications': {
    title: 'Notifications | Guru Nanak College Dhanbad',
    description: 'Important notices, circulars, and announcements from Guru Nanak College.',
  },
  '/documents': {
    title: 'Documents | Guru Nanak College Dhanbad',
    description: 'Official documents, reports, and publications from Guru Nanak College.',
  },

  // ── Alumni / Legal / Others ───────────────────────────────
  '/alumni': {
    title: 'Alumni Network | Guru Nanak College Dhanbad',
    description: 'Connect with the alumni network of Guru Nanak College, Dhanbad — success stories and networking.',
  },
  '/alumni-wall': {
    title: 'Alumni Wall of Fame | Guru Nanak College Dhanbad',
    description: 'Celebrating distinguished alumni and their achievements at GNC Dhanbad.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Guru Nanak College Dhanbad',
    description: 'Privacy policy for the Guru Nanak College, Dhanbad website.',
  },
  '/terms-of-service': {
    title: 'Terms of Service | Guru Nanak College Dhanbad',
    description: 'Terms of service for using the Guru Nanak College, Dhanbad website.',
  },

  // ── Admin ─────────────────────────────────────────────────
  '/admin': {
    title: 'Admin Panel | Guru Nanak College',
    description: 'Administrative panel for managing college website content.',
  },
};

/**
 * Update page SEO meta tags based on current route
 * @param {string} pathname — current route pathname
 * @param {object} [custom] — optional custom overrides { title, description, image }
 */
export function updateSEO(pathname, custom = {}) {
  const route = SEO_MAP[pathname] || {};

  // Dynamic Title Fallback for Unmapped Routes
  if (!route.title && pathname !== '/' && pathname.length > 1) {
    const ABBREVIATIONS = new Set([
      'bbmku', 'ugc', 'bca', 'bba', 'nss', 'ncc', 'iqac', 'naac', 'nirf',
      'vbu', 'cbcs', 'nep', 'fyugp', 'ssr', 'sc', 'st', 'obc', 'icc',
      'ict', 'rusa', 'aqar', 'sss', 'ba', 'bcom', 'ug', 'pg'
    ]);
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1].replace(/-/g, ' ');
    const titleCased = lastSegment.split(' ').map(word => {
      if (ABBREVIATIONS.has(word.toLowerCase())) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
    const fallbackTitle = titleCased + ' | ' + SITE_NAME;
    custom.title = custom.title || fallbackTitle;
  }

  const title = custom.title || route.title || `${SITE_NAME}`;
  const description = custom.description || route.description || DEFAULT_DESC;
  const image = custom.image || DEFAULT_IMAGE;
  const url = `${BASE_URL}/#${pathname}`;
  
  // Title
  document.title = title;
  
  // Meta description
  setMeta('description', description);
  
  // Open Graph
  setMeta('og:title', title, 'property');
  setMeta('og:description', description, 'property');
  setMeta('og:url', url, 'property');
  setMeta('og:image', image, 'property');

  // Canonical Tag (Automated)
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
  
  // Twitter Card
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', image);

  // Dynamic Multi-Entity JSON-LD Schema (@graph: Org, Breadcrumbs, Course/Event/Dept)
  setJsonLd(pathname, title, description);
}

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setJsonLd(pathname, pageTitle = SITE_NAME, pageDesc = DEFAULT_DESC) {
  const parts = pathname.split('/').filter(Boolean);

  // 1. Core Educational Organization Schema
  const collegeSchema = {
    "@type": "CollegeOrUniversity",
    "@id": `${BASE_URL}/#organization`,
    "name": "Guru Nanak College, Dhanbad",
    "alternateName": ["GNC Dhanbad", "Guru Nanak Degree College"],
    "url": BASE_URL,
    "logo": `${BASE_URL}/images/gnc-logo.png`,
    "image": DEFAULT_IMAGE,
    "description": DEFAULT_DESC,
    "foundingDate": "1970",
    "naacAccreditation": "Accredited Grade B",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Post Box - 93, Guru Gobind Singh Marg, Bhuda",
      "addressLocality": "Dhanbad",
      "addressRegion": "Jharkhand",
      "postalCode": "826001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.7957",
      "longitude": "86.4304"
    },
    "telephone": "+91-326-2302685",
    "email": "principal@gncdhanbad.edu.in",
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "Binod Bihari Mahto Koyalanchal University (BBMKU)"
    }
  };

  // 2. BreadcrumbList Schema
  const itemListElement = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${BASE_URL}/#/`
    }
  ];

  parts.forEach((part, index) => {
    const urlPath = '/' + parts.slice(0, index + 1).join('/');
    itemListElement.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
      "item": `${BASE_URL}/#${urlPath}`
    });
  });

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/#${pathname}-breadcrumbs`,
    "itemListElement": itemListElement
  };

  const graph = [collegeSchema, breadcrumbSchema];

  // 3. Deep Course Schema (for Academics / Course Routes)
  if (pathname.includes('/academics') || pathname.includes('/course') || pathname.includes('/program')) {
    const isBCA = pathname.includes('bca') || pathname.includes('computer');
    const isBBA = pathname.includes('bba') || pathname.includes('management');
    const isBCom = pathname.includes('bcom') || pathname.includes('commerce');

    let courseName = pageTitle.split('|')[0].trim();
    let courseCode = isBCA ? 'BCA-FYUGP' : isBBA ? 'BBA-FYUGP' : isBCom ? 'BCOM-FYUGP' : 'UG-FYUGP';

    graph.push({
      "@type": "Course",
      "@id": `${BASE_URL}/#${pathname}-course`,
      "name": courseName,
      "description": pageDesc,
      "courseCode": courseCode,
      "educationalCredentialAwarded": "Bachelor's Degree (NEP 2020 FYUGP)",
      "timeToComplete": "P4Y", // 4 Years under NEP FYUGP
      "provider": {
        "@id": `${BASE_URL}/#organization`
      },
      "inLanguage": "en-IN",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Onsite",
        "location": "Guru Nanak College Campus, Dhanbad"
      }
    });
  }

  // 4. Department Schema (for /departments/* Routes)
  if (pathname.includes('/departments') && parts.length >= 2) {
    const deptSlug = parts[parts.length - 1];
    const deptName = deptSlug.charAt(0).toUpperCase() + deptSlug.slice(1).replace(/-/g, ' ');

    graph.push({
      "@type": "EducationalOrganization",
      "@id": `${BASE_URL}/#${pathname}-department`,
      "name": `Department of ${deptName}`,
      "department": {
        "@id": `${BASE_URL}/#organization`
      },
      "parentOrganization": {
        "@id": `${BASE_URL}/#organization`
      },
      "description": pageDesc,
      "url": `${BASE_URL}/#${pathname}`
    });
  }

  // 5. Event Schema (for Notice, Announcements, Campus-Life, Events)
  if (pathname.includes('/events') || pathname.includes('/campus-life') || pathname.includes('/notices')) {
    graph.push({
      "@type": "EducationEvent",
      "@id": `${BASE_URL}/#${pathname}-event`,
      "name": pageTitle.split('|')[0].trim(),
      "description": pageDesc,
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Guru Nanak College Auditorium & Campus",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Guru Gobind Singh Marg, Bhuda",
          "addressLocality": "Dhanbad",
          "addressRegion": "Jharkhand",
          "postalCode": "826001",
          "addressCountry": "IN"
        }
      },
      "organizer": {
        "@id": `${BASE_URL}/#organization`
      }
    });
  }

  const finalSchema = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  let el = document.getElementById('gnc-json-ld');
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'gnc-json-ld';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(finalSchema, null, 2);
}

export default updateSEO;
