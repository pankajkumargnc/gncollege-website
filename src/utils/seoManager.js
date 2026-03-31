// src/utils/seoManager.js — Dynamic SEO Manager
// ✍️ @SEO_Agent — Route-based SEO meta tag management

const SITE_NAME = 'Guru Nanak College, Dhanbad';
const BASE_URL = 'https://pankajkumargnc.github.io/gncollege-website';
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
  '/academics/course-offered': {
    title: 'Courses Offered | Guru Nanak College Dhanbad',
    description: 'Explore courses at GNC Dhanbad — B.A., B.Com., BCA, BBA programmes affiliated to BBMKU.',
  },
  '/academics/departments': {
    title: 'Departments | Guru Nanak College Dhanbad',
    description: 'Academic departments at Guru Nanak College — Commerce, Humanities, BCA, BBA, and more.',
  },
  '/admission/rule': {
    title: 'Admission Rules | Guru Nanak College Dhanbad',
    description: 'Admission rules and eligibility criteria for Guru Nanak College, Dhanbad.',
  },
  '/admission/fee-structure': {
    title: 'Fee Structure | Guru Nanak College Dhanbad',
    description: 'Fee structure for all courses at Guru Nanak College, Dhanbad — B.A., B.Com., BCA, BBA.',
  },
  '/gallery': {
    title: 'Photo Gallery | Guru Nanak College Dhanbad',
    description: 'Photo gallery of campus life, events, seminars, cultural activities, and sports at GNC Dhanbad.',
  },
  '/gallery/photos': {
    title: 'Photo Gallery | Guru Nanak College Dhanbad',
    description: 'Photo gallery of campus life, events, and activities at Guru Nanak College.',
  },
  '/video-gallery': {
    title: 'Video Gallery | Guru Nanak College Dhanbad',
    description: 'Video highlights from campus events, seminars, and cultural programmes at GNC Dhanbad.',
  },
  '/gallery/videos': {
    title: 'Video Gallery | Guru Nanak College Dhanbad',
    description: 'Video highlights from campus events, seminars, and cultural programmes.',
  },
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
  '/naac/aqar': {
    title: 'AQAR Reports | NAAC | Guru Nanak College Dhanbad',
    description: 'Annual Quality Assurance Reports (AQAR) submitted to NAAC by Guru Nanak College.',
  },
  '/naac/nirf': {
    title: 'NIRF | Guru Nanak College Dhanbad',
    description: 'National Institutional Ranking Framework data for Guru Nanak College.',
  },
  '/academics/iqac': {
    title: 'IQAC | Guru Nanak College Dhanbad',
    description: 'Internal Quality Assurance Cell — ensuring quality education standards at GNC Dhanbad.',
  },
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
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1].replace(/-/g, ' ');
    const fallbackTitle = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) + ' | ' + SITE_NAME;
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
  
  // Twitter Card
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', image);

  // Dynamic BreadcrumbList JSON-LD Schema
  setJsonLd(pathname);
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

function setJsonLd(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return;

  const itemListElement = parts.map((part, index) => {
    const urlPath = '/' + parts.slice(0, index + 1).join('/');
    return {
      "@type": "ListItem",
      "position": index + 2, // 1 is reserved for Home
      "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
      "item": `${BASE_URL}/#${urlPath}`
    };
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${BASE_URL}/#/`
      },
      ...itemListElement
    ]
  };

  let el = document.getElementById('gnc-json-ld');
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'gnc-json-ld';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(schema);
}

export default updateSEO;
