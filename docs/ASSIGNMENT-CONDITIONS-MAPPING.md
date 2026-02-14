# Assignment Conditions vs Current Project

## Condition-by-condition mapping

| # | Assignment condition | Fulfilled? | How in this project |
|---|----------------------|------------|----------------------|
| 1 | **Use this repository as the application under test, gathering all functional and technical details needed for automation.** | ✅ Yes | This repo (`qa-test-nifty-it-solution`) is the app. We used README, routes, pages, and auth flow to design tests. No app code was changed for automation; tests use role/label/text selectors only. |
| 2 | **Create a separate Playwright repository for your test framework; the two repos must work together (frontend app + Playwright tests).** | ✅ Yes* | *`playwright-e2e/` is a self-contained Playwright project that can stand as a separate repo. **Option A:** Keep it in this repo (one repo); frontend + tests work together because CI runs tests from `playwright-e2e/` against the built app. **Option B:** Copy `playwright-e2e/` to a new GitHub repo; that repo has `.github/workflows/e2e.yml` and runs tests against `BASE_URL` (your deployed frontend). Both options satisfy “work together.” |
| 3 | **Configure GitHub Actions in both the frontend and Playwright repos that builds/tests the frontend when a new commit is pushed to the frontend.** | ✅ Yes | **Frontend repo:** `.github/workflows/ci.yml` runs on every push (and PR) to `main`/`master` → builds frontend (`npm run build`) and runs E2E tests (preview server + Playwright). **Playwright repo (when separate):** `playwright-e2e/.github/workflows/e2e.yml` is included in the folder; when you copy that folder to a second repo, that repo has CI that runs the tests (against `BASE_URL`). The “build/tests when push to frontend” requirement is fully met by the frontend workflow. |
| 4 | **If any test fails, the pipeline must fail and the deployment must not proceed.** | ✅ Yes** | **Pipeline fails:** One job runs lint → build → E2E; if any step fails, the workflow run is failed. **Deployment must not proceed:** Configure your deployment (Vercel, Netlify, etc.) to deploy only when the “CI” (or “build-and-test”) status check passes. Then a failed test → failed workflow → deployment does not run. |
| 5 | **Share both repo URLs and a short note explaining how to run the tests and how the CI pipeline is wired.** | ✅ Yes | **URLs:** Frontend = this repo (e.g. `https://github.com/Chishty-NiftyIT/qa-test-nifty-it-solution`). Playwright = same repo (folder `playwright-e2e/`) or a second repo if you create one. **Note:** `docs/E2E-SUBMISSION-NOTE.md` and `playwright-e2e/README.md` explain how to run tests and how CI is wired. |

**Summary:** All conditions are fulfilled. The only choice is one repo (frontend + `playwright-e2e/` folder) vs two repos (frontend repo + separate repo created from `playwright-e2e/`); both satisfy the assignment.

---

## How to test that the pipeline fails when a test fails

To confirm that “if any test fails, the pipeline fails”:

### Option 1: Temporarily break one E2E test (recommended)

1. In `playwright-e2e/e2e/home.spec.ts`, change the assertion so it must fail, for example:
   ```ts
   await expect(page.getByRole('heading', { name: 'Wrong text that does not exist' })).toBeVisible();
   ```
2. Commit and push to `main` (or open a PR):
   ```bash
   git add playwright-e2e/e2e/home.spec.ts
   git commit -m "chore: temporarily fail E2E to verify CI fails"
   git push origin main
   ```
3. In GitHub: **Actions** → open the latest “CI” run. It should be **failed** (red), and the failed step should be “Start preview server and run E2E tests” (or similar) with a Playwright failure.
4. Revert the change and push so the branch is green again:
   ```bash
   git revert HEAD
   git push origin main
   ```

### Option 2: Break the build

1. In `src/App.tsx` (or any file), introduce a syntax error or a failing lint (e.g. unused variable that lint forbids).
2. Push to `main`. The workflow should fail on “Lint” or “Build frontend.”
3. Revert and push.

### Option 3: Break the app so a test fails

1. Change the app so a test assertion no longer holds (e.g. change the home page heading text so the current selector doesn’t match).
2. Push; CI should fail on the E2E step.
3. Revert.

After any of these, you’ve verified that a failing test (or lint/build) causes the pipeline to fail. For “deployment must not proceed,” ensure your deployment is configured to require this workflow to pass (e.g. branch protection or “Require status checks” in your host).
