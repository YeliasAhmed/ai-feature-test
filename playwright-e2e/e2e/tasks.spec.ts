import { test, expect } from './fixtures';

/**
 * E2E: Tasks page
 * Objective: Tasks page loads and shows heading (and list or empty state).
 */
test.describe('Tasks', () => {
  test('Tasks page loads with heading', async ({ page, authenticated }) => {
    await page.goto('/tasks');
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();
  });
});
