import { test, expect } from '@playwright/test';

/**
 * E2E: Sign-in and protected route
 * Objective: Verify sign-in page, successful login redirect, invalid credentials handling, and protected route redirect.
 */

test.describe('Sign-in', () => {
  test('Sign-in page loads and invalid credentials show error (negative)', async ({ page }) => {
    await page.goto('/signin');
    await expect(page.getByRole('heading', { name: 'Sign In', level: 3 })).toBeVisible();
    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    await page.getByLabel(/username/i).fill('invalid_user');
    await page.getByLabel(/password/i).fill('wrong_password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page.getByText(/invalid|wrong|failed|error/i)).toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/\/signin/);
  });

  test('Unauthenticated user visiting /dashboard is redirected to sign-in', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/signin/, { timeout: 10_000 });
    await expect(page.getByRole('heading', { name: 'Sign In', level: 3 })).toBeVisible();
  });

  test('Valid login redirects to dashboard', async ({ page }) => {
    const username = process.env.E2E_USERNAME;
    const password = process.env.E2E_PASSWORD;
    if (!username || !password) {
      test.skip(true, 'E2E_USERNAME and E2E_PASSWORD required');
    }
    await page.goto('/signin');
    await page.getByLabel(/username/i).fill(username);
    await page.getByLabel(/password/i).fill(password);
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
    await expect(page.getByRole('heading', { name: /meeting transcripts/i })).toBeVisible();
  });
});
