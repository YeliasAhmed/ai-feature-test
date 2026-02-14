# E2E Test Submission Note

## Repo URLs

- **Frontend (app under test):** https://github.com/Chishty-NiftyIT/qa-test-nifty-it-solution  
- **Playwright tests:** Either the `playwright-e2e/` folder in the same repo, or a separate repo created by copying `playwright-e2e/` (see “Two-repo setup” below).

## How to run the tests

1. **Start the app** (from the frontend repo root):
   ```bash
   npm install && npm run dev
   ```
   Or: `npm run build && npm run preview` (app at http://localhost:4173).

2. **Run E2E tests** (from the `playwright-e2e/` folder):
   ```bash
   cd playwright-e2e
   npm install
   npx playwright install chromium
   BASE_URL=http://localhost:5004 npm test
   ```
   For tests that require login, set `E2E_USERNAME` and `E2E_PASSWORD`; otherwise those tests are skipped.

3. **Optional:** Use Playwright UI or headed mode:
   ```bash
   npm run test:ui
   # or
   npm run test:headed
   ```

## How the CI pipeline is wired

- **Workflow file:** `.github/workflows/ci.yml` in the frontend repo.
- **Triggers:** Push or pull request to `main` or `master`.
- **Steps:**
  1. Checkout, setup Node, install frontend dependencies.
  2. Lint (`npm run lint`).
  3. Build (`npm run build`).
  4. Install Playwright and browsers in `playwright-e2e/`.
  5. Start the built app with `npm run preview`, wait for http://localhost:4173, then run `npx playwright test` with `BASE_URL=http://localhost:4173`.
- **Secrets (optional):** `E2E_USERNAME` and `E2E_PASSWORD` in the repo secrets to run authenticated E2E tests in CI.
- **Failure behavior:** If lint, build, or any E2E test fails, the workflow fails. Deployment should be configured to run only when this workflow succeeds so that **if any test fails, the pipeline fails and deployment does not proceed**.

## Two-repo setup

The assignment asks for a separate Playwright repository. You can:

1. **Keep one repo:** Use the `playwright-e2e/` folder inside the frontend repo (current setup). CI already runs these tests on every push.

2. **Split into two repos:** Copy the contents of `playwright-e2e/` into a new repository. In that repo, add a GitHub Actions workflow that runs `npm ci`, `npx playwright install --with-deps chromium`, and `npx playwright test` with `BASE_URL` set to your deployed frontend URL (or a URL passed from the frontend repo’s deploy step). In the frontend repo, you can then run that workflow (e.g. via `workflow_run` or by triggering the other repo) and only deploy when it succeeds.

Both repos “work together” by having the Playwright tests run against the URL where the frontend app is served (local preview in the frontend CI, or deployed URL when using a separate Playwright repo).
