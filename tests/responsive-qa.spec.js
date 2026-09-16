// tests/responsive-qa.spec.js — GNC College Multi-Viewport Responsive & Visual QA
// 🧪 Automated Gate: Zero Horizontal Overflow & Route Integrity across 320px → 1920px

import { test, expect } from '@playwright/test';

const CORE_ROUTES = [
  '/',
  '/#/about-us/college-profile',
  '/#/about-us/sikh-heritage',
  '/#/academics/course-offered',
  '/#/admission/fee-structure',
  '/#/notifications',
  '/#/contact'
];

test.describe('GNC College Responsive & Visual QA Suite', () => {

  test('Zero Horizontal Scroll / Overflow across all core routes', async ({ page }) => {
    for (const route of CORE_ROUTES) {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(600);

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
        `Horizontal overflow detected on ${route}! scrollWidth (${overflowResult.scrollWidth}px) > innerWidth (${overflowResult.innerWidth}px) by ${overflowResult.diff}px.`
      ).toBe(false);
    }
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

    // Verify root is interactive and buttons or links exist
    const buttons = page.locator('button, a[href]');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

});
