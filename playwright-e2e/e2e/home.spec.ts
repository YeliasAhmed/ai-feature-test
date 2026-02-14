import { test, expect } from '@playwright/test';

/**
 * E2E: Home / landing
 * Objective: Home page loads and Sign In link is present.
 */
test.describe('Home', () => {
  test('Home page loads with Sign In link', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /turn every zoom meeting/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in with Zoom' })).toBeVisible();
  });
});
