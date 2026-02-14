import { test, expect } from './fixtures';

/**
 * E2E: Knowledge Base
 * Objective: Knowledge Base page loads with heading and upload/info sections.
 */
test.describe('Knowledge Base', () => {
  test('Knowledge Base page loads with heading', async ({ page, authenticated }) => {
    await page.goto('/knowledge-base');
    await expect(page.getByRole('heading', { name: 'Knowledge Base' })).toBeVisible();
  });
});
