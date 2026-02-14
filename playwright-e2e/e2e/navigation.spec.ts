import { test, expect } from './fixtures';

/**
 * E2E: Navigation and sign-out
 * Objective: From dashboard, navigate to Tasks, History, Knowledge Base, Settings; then sign out and verify redirect.
 */
test.describe('Navigation', () => {
  test('Can navigate to all app pages then sign out; protected routes inaccessible after sign out', async ({
    page,
    authenticated,
  }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: /meeting transcripts/i })).toBeVisible();

    await page.getByRole('link', { name: 'Tasks' }).click();
    await expect(page).toHaveURL(/\/tasks/);
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();

    await page.getByRole('link', { name: 'History' }).click();
    await expect(page).toHaveURL(/\/history/);
    await expect(page.getByRole('heading', { name: 'Meeting History' })).toBeVisible();

    await page.getByRole('link', { name: 'Knowledge Base' }).click();
    await expect(page).toHaveURL(/\/knowledge-base/);
    await expect(page.getByRole('heading', { name: 'Knowledge Base' })).toBeVisible();

    await page.getByRole('link', { name: 'Settings' }).click();
    await expect(page).toHaveURL(/\/settings/);
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

    await page.getByRole('button', { name: 'Sign Out' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Sign Out' }).click();
    await expect(page).toHaveURL(/\/signin/, { timeout: 10_000 });
    await expect(page.getByRole('heading', { name: 'Sign In', level: 3 })).toBeVisible();

    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/signin/);
    await page.goto('/tasks');
    await expect(page).toHaveURL(/\/signin/);
  });
});
