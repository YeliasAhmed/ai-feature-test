import { defineConfig, devices } from '@playwright/test';

/**
 * E2E tests for Nifty AI Meeting Analyzer.
 * Set BASE_URL to the running app (e.g. http://localhost:5173 or deployed URL).
 * For tests that require login, set E2E_USERNAME and E2E_PASSWORD.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5004',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  timeout: 30_000,
  expect: { timeout: 10_000 },
});
