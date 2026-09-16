// scripts/runPlaywrightQA.js — GNC College Responsive & Visual Overflow QA Suite
// Tests 320px → 1920px across core routes with real Chromium engine

import { chromium } from 'playwright';

const VIEWPORTS = [
  { name: 'Mobile Small (320px)', width: 320, height: 568 },
  { name: 'Mobile Standard (375px)', width: 375, height: 667 },
  { name: 'Tablet Portrait (768px)', width: 768, height: 1024 },
  { name: 'Tablet Landscape (1024px)', width: 1024, height: 768 },
  { name: 'Desktop Standard (1440px)', width: 1440, height: 900 },
  { name: 'Desktop Full HD (1920px)', width: 1920, height: 1080 },
];

const ROUTES = [
  { path: '/', label: 'Home Page' },
  { path: '/#/about-us/college-profile', label: 'College Profile' },
  { path: '/#/about-us/sikh-heritage', label: 'Sikh Heritage Hub' },
  { path: '/#/academics/course-offered', label: 'Courses Offered' },
  { path: '/#/admission/fee-structure', label: 'Fee Structure' },
  { path: '/#/notifications', label: 'Notifications / Notices' },
  { path: '/#/contact', label: 'Contact Us' },
];

const BASE_URL = 'http://localhost:3000';

async function runQA() {
  console.log('\n======================================================');
  console.log('🧪 GNC COLLEGE AUTOMATED RESPONSIVE & OVERFLOW QA SUITE');
  console.log(`Target: ${BASE_URL} | Viewports: 320px → 1920px`);
  console.log('======================================================\n');

  let server;
  try {
    const { preview } = await import('vite');
    server = await preview({ preview: { port: 3000, open: false } });
    console.log('⚡ Vite Preview Server booted successfully on http://localhost:3000\n');
  } catch (err) {
    console.log('ℹ️ Server notice: ' + err.message);
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    console.error('Failed to launch Chromium:', err.message);
    if (server?.httpServer) server.httpServer.close();
    process.exit(1);
  }

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const failures = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n📱 Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log('─'.repeat(55));

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      totalTests++;
      const fullUrl = `${BASE_URL}${route.path}`;

      try {
        await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
        // Allow layout and web fonts to settle
        await page.waitForTimeout(600);

        const check = await page.evaluate(() => {
          const doc = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
          const innerWidth = window.innerWidth;
          const hasRoot = Boolean(document.getElementById('root')?.children?.length);

          return {
            scrollWidth,
            innerWidth,
            diff: scrollWidth - innerWidth,
            hasOverflow: scrollWidth > innerWidth,
            hasRoot,
          };
        });

        if (check.hasOverflow) {
          failedTests++;
          const msg = `OVERFLOW: scrollWidth (${check.scrollWidth}px) exceeds innerWidth (${check.innerWidth}px) by +${check.diff}px`;
          console.log(`  ❌ [FAIL] ${route.label.padEnd(25)} -> ${msg}`);
          failures.push({ viewport: vp.name, route: route.label, error: msg });
        } else if (!check.hasRoot) {
          failedTests++;
          const msg = 'CRASH: #root element is empty or failed to mount';
          console.log(`  ❌ [FAIL] ${route.label.padEnd(25)} -> ${msg}`);
          failures.push({ viewport: vp.name, route: route.label, error: msg });
        } else {
          passedTests++;
          console.log(`  ✅ [PASS] ${route.label.padEnd(25)} -> Zero Overflow (W: ${check.innerWidth}px)`);
        }
      } catch (err) {
        failedTests++;
        console.log(`  ❌ [ERR]  ${route.label.padEnd(25)} -> Navigation Error: ${err.message}`);
        failures.push({ viewport: vp.name, route: route.label, error: err.message });
      }
    }

    await context.close();
  }

  await browser.close();

  console.log('\n======================================================');
  console.log('📊 QA TEST EXECUTION SUMMARY');
  console.log('======================================================');
  console.log(`Total Checks Run:  ${totalTests}`);
  console.log(`Checks Passed:     ${passedTests} ✅`);
  console.log(`Checks Failed:     ${failedTests} ❌`);
  console.log(`Pass Rate:         ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (failures.length > 0) {
    console.log('\nDetailed Failures:');
    failures.forEach((f, i) => {
      console.log(`  ${i + 1}. [${f.viewport}] ${f.route}: ${f.error}`);
    });
    if (server?.httpServer) server.httpServer.close();
    process.exit(1);
  } else {
    console.log('\n🎉 ALL 42 VIEWPORT-ROUTE CHECKS PASSED WITH ZERO OVERFLOW!');
    console.log('Layout is 100% stable from 320px mobile to 1920px Full HD.\n');
    if (server?.httpServer) server.httpServer.close();
    process.exit(0);
  }
}

runQA();
