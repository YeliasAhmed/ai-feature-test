# How to test that CI fails when a test fails

## Step 1: Make one test fail on purpose

Edit `playwright-e2e/e2e/home.spec.ts`. Change line 10 from:

```ts
await expect(page.getByRole('heading', { name: /turn every zoom meeting/i })).toBeVisible();
```

to:

```ts
await expect(page.getByRole('heading', { name: 'Wrong text for CI test' })).toBeVisible();
```

Save the file.

## Step 2: (Optional) See it fail locally

From the repo root, with the app running on http://localhost:5004:

```bash
cd playwright-e2e && npm test
```

You should see the home test fail. That’s expected.

## Step 3: Push and trigger CI

```bash
git add playwright-e2e/e2e/home.spec.ts
git commit -m "chore: temporarily fail test to verify CI fails"
git push origin main
```

(Use your branch name if you’re not on `main`.)

## Step 4: Check GitHub Actions

1. Open your repo on GitHub.
2. Go to the **Actions** tab.
3. Open the latest workflow run (top of the list).
4. It should be **failed** (red).
5. Click the failed job, then the failed step **“Start preview server and run E2E tests”**.
6. In the log you should see the Playwright failure for the home test.

You’ve now verified: **test fails → pipeline fails.**

## Step 5: Revert so CI is green again

```bash
git revert HEAD
git push origin main
```

Or manually change the line in `home.spec.ts` back to:

```ts
await expect(page.getByRole('heading', { name: /turn every zoom meeting/i })).toBeVisible();
```

then commit and push.
