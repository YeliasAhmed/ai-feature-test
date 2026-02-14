import { test, expect } from './fixtures';

/**
 * E2E: Settings
 * Objective: Settings page loads with heading and ClickUp configuration section.
 */
test.describe('Settings', () => {
  test('Settings page loads with heading and ClickUp card', async ({ page, authenticated }) => {
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'ClickUp Configuration' })).toBeVisible();
  });
});
