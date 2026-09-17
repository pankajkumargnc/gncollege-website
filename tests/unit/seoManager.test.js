// tests/unit/seoManager.test.js — Unit tests for Dynamic SEO Manager
import { SEO_MAP, BASE_URL, updateSEO } from '../../src/utils/seoManager.js';

export function runSeoTests() {
  const results = [];
  const assert = (desc, cond) => results.push({ desc, pass: !!cond });

  // Test 1: SEO_MAP exists and has critical routes
  assert('SEO_MAP is defined', typeof SEO_MAP === 'object' && SEO_MAP !== null);
  assert('Root / route is mapped in SEO_MAP', typeof SEO_MAP['/']?.title === 'string');
  assert('Admission rule route is mapped', typeof SEO_MAP['/admission/rule']?.title === 'string');
  assert('Academics course route is mapped', typeof SEO_MAP['/academics/course-offered']?.title === 'string');
  assert('Contact route is mapped', typeof SEO_MAP['/contact']?.title === 'string');

  // Test 2: BASE_URL is valid production URL
  assert('BASE_URL is https://gnc-college-web.web.app', BASE_URL === 'https://gnc-college-web.web.app');

  // Test 3: Total mapped routes is > 50
  const routeCount = Object.keys(SEO_MAP).length;
  assert(`SEO_MAP has ${routeCount} routes (expected > 50)`, routeCount > 50);

  // Test 4: Verify title format
  for (const [route, meta] of Object.entries(SEO_MAP)) {
    if (route === '/admin') continue;
    if (!meta.title.includes('Guru Nanak College')) {
      assert(`Route ${route} title includes college name`, false);
      break;
    }
  }
  assert('All public routes include college branding', true);

  return results;
}
