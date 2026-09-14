// playwright.config.js — GNC College Responsive & Visual QA Test Configuration
// 🧪 Automated Viewport Testing for iPhone SE (320px), Tablet (768px), and Desktop (1440px)

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Mobile Small (iPhone SE 320px)',
      use: { 
        viewport: { width: 320, height: 568 },
        userAgent: devices['iPhone SE'].userAgent
      },
    },
    {
      name: 'Mobile Standard (375px)',
      use: { 
        viewport: { width: 375, height: 667 } 
      },
    },
    {
      name: 'Tablet Portrait (768px)',
      use: { 
        viewport: { width: 768, height: 1024 } 
      },
    },
    {
      name: 'Desktop Standard (1440px)',
      use: { 
        viewport: { width: 1440, height: 900 } 
      },
    },
  ],
  /* Run local dev server before starting the tests if needed */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
