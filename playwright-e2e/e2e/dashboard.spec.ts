import { test, expect } from './fixtures';

/**
 * E2E: Dashboard (analysis flow)
 * Objective: After login, dashboard loads with heading and workflow area.
 */
test.describe('Dashboard', () => {
  test('Dashboard page loads with heading after login', async ({ page, authenticated }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: /meeting transcripts/i })).toBeVisible();
  });
});
