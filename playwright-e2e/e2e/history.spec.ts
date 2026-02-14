import { test, expect } from './fixtures';

/**
 * E2E: Meeting History
 * Objective: History page loads with heading and refresh control.
 */
test.describe('History', () => {
  test('History page loads with heading and refresh button', async ({ page, authenticated }) => {
    await page.goto('/history');
    await expect(page.getByRole('heading', { name: 'Meeting History' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
  });
});
