# E2E Tests – Nifty AI Meeting Analyzer

Playwright + TypeScript end-to-end tests for the [Nifty AI Meeting Analyzer](https://github.com/Chishty-NiftyIT/qa-test-nifty-it-solution) frontend.

**No app changes required.** Tests use only role-, label-, and text-based selectors (e.g. `getByRole`, `getByLabel`, `getByText`). The frontend app does not need `data-testid` or any other test-only attributes; automation lives entirely in this project.

## Test coverage (10 high-value E2E tests)

| # | Test | Objective |
|---|------|-----------|
| 1 | Home page loads with Sign In link | Landing page and primary CTA |
| 2 | Sign-in page loads with form | Sign-in UI and inputs |
| 3 | Invalid credentials show error (negative) | Error handling, stay on sign-in |
| 4 | Unauthenticated user redirected from /dashboard | Protected route redirect |
| 5 | Valid login redirects to dashboard | Happy-path auth |
| 6 | Dashboard page loads after login | Analysis flow entry |
| 7 | Tasks page loads | AI-generated tasks view |
| 8 | History page loads | Meeting history view |
| 9 | Knowledge Base page loads | Document upload / KB view |
| 10 | Settings page loads + Navigation + Sign out | Settings, full nav, sign-out and re-redirect |

## How to run the tests

### Prerequisites

- Node.js 18+
- The Nifty AI Meeting Analyzer app running (dev at http://localhost:5004 or preview at 4173)

### 1. Install dependencies

```bash
cd playwright-e2e
npm install
npx playwright install chromium
```

### 2. Start the app under test

From the **frontend repo root** (parent of `playwright-e2e`):

```bash
npm run dev
# App runs at http://localhost:5004
```

Or after building:

```bash
npm run build && npm run preview
# App runs at http://localhost:4173
```

### 3. Run E2E tests

From `playwright-e2e`:

```bash
# Default base URL is http://localhost:5004 (where the app runs in dev)
npm test

# Or set base URL and optional login credentials
BASE_URL=http://localhost:5004 E2E_USERNAME=youruser E2E_PASSWORD=yourpass npm test
```

Tests that require login (dashboard, tasks, history, knowledge-base, settings, navigation) are **skipped** if `E2E_USERNAME` and `E2E_PASSWORD` are not set.

### Other commands

- `npm run test:headed` – run with browser visible
- `npm run test:ui` – run in Playwright UI mode
- `npm run report` – open last HTML report

## Two-repo setup (optional)

This folder is self-contained and can be pushed to a **separate Playwright-only repo**:

1. Create a new repo (e.g. `nifty-analyzer-e2e`).
2. Copy the contents of `playwright-e2e/` into that repo (or make this folder the root of the new repo).
3. In the new repo, configure CI to run `npm ci && npx playwright install --with-deps chromium && npx playwright test` with `BASE_URL` set to the deployed frontend URL (e.g. from the frontend repo’s deploy step or a known staging URL).

The **frontend repo** already has a CI workflow that builds the app and runs these E2E tests from the `playwright-e2e/` folder; if any test fails, the pipeline fails.

## CI wiring (frontend repo)

- **Workflow:** `.github/workflows/ci.yml`
- **On:** push / PR to `main` or `master`
- **Steps:** install deps → lint → build → install Playwright (in `playwright-e2e`) → start `npm run preview` → run `npx playwright test` with `BASE_URL=http://localhost:4173`
- **Secrets (optional):** `E2E_USERNAME`, `E2E_PASSWORD` – if set, auth-dependent tests run; otherwise they are skipped.
- **Failure:** If build or any E2E test fails, the pipeline fails. Deployment should be configured to run only when this workflow succeeds.
