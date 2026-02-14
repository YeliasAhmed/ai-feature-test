import { test as base } from '@playwright/test';

const username = process.env.E2E_USERNAME || '';
const password = process.env.E2E_PASSWORD || '';

export const test = base.extend<{ authenticated: void }>({
  authenticated: async ({ page }, use) => {
    if (!username || !password) {
      test.skip(true, 'E2E_USERNAME and E2E_PASSWORD must be set for authenticated tests');
    }
    await page.goto('/signin');
    await page.getByLabel(/username/i).fill(username);
    await page.getByLabel(/password/i).fill(password);
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 15_000 });
    await use();
  },
});

export { expect } from '@playwright/test';
