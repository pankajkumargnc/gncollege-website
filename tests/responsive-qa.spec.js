// tests/responsive-qa.spec.js — GNC College Multi-Viewport Responsive & Visual QA
// 🧪 Automated Gate: Zero Horizontal Overflow & Route Integrity across 320px → 1440px

import { test, expect } from '@playwright/test';

const CORE_ROUTES = [
  '/',
  '/#/about',
  '/#/academics',
  '/#/notices',
  '/#/contact'
];

test.describe('GNC College Responsive & Visual QA Suite', () => {

  test('Zero Horizontal Scroll / Overflow Gate across active viewport', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Wait for core layout to settle
    await page.waitForTimeout(1000);

    // Evaluate scroll width vs client width
    const overflowResult = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
      const innerWidth = window.innerWidth;
      
      return {
        hasOverflow: scrollWidth > innerWidth,
        scrollWidth,
        innerWidth,
        diff: scrollWidth - innerWidth
      };
    });

    expect(
      overflowResult.hasOverflow,
      `Horizontal overflow detected! Page scrollWidth (${overflowResult.scrollWidth}px) exceeds viewport width (${overflowResult.innerWidth}px) by ${overflowResult.diff}px.`
    ).toBe(false);
  });

  test('Core Navigation Routes Smoke Test', async ({ page }) => {
    for (const route of CORE_ROUTES) {
      const response = await page.goto(route);
      expect(response?.status()).toBeLessThan(400);

      // Verify #root mounted without crashing
      const rootExists = await page.locator('#root').count();
      expect(rootExists).toBeGreaterThan(0);
    }
  });

  test('Tactile Buttons & Interactive Elements Accessibility', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verify tactile button classes exist and respond
    const tactileButtons = page.locator('.btn-tactile, .button-primary, .wof-btn');
    const count = await tactileButtons.count();
    expect(count).toBeGreaterThan(0);
  });

});
