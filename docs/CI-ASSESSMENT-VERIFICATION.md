# CI Pipeline vs Assessment Conditions

## Assessment conditions (from the assignment)

1. **GitHub Actions in both the frontend and Playwright repos** that build/test the frontend **when a new commit is pushed to the frontend**.
2. **If any test fails, the pipeline must fail and deployment must not proceed.**

---

## Current setup

### Frontend repo (this repo) – `.github/workflows/ci.yml`

| Assessment condition | Met? | How |
|----------------------|------|-----|
| Runs when a new commit is pushed to the frontend | ✅ | `on: push: branches: [main, master]` (and on PRs) |
| Builds the frontend | ✅ | Step: "Build frontend" runs `npm run build` |
| Tests the frontend (E2E) | ✅ | Step: start `npm run preview`, wait for http://localhost:4173, then run `npx playwright test` from `playwright-e2e/` with `BASE_URL=http://localhost:4173` |
| Pipeline fails if any test fails | ✅ | Single job; if lint, build, or any E2E test fails, the job fails and the workflow is failed |
| Deployment must not proceed on failure | ⚠️ Your responsibility | The workflow does not deploy. You must configure your deployment (e.g. Vercel, Netlify, GitHub Pages) so that it runs **only when** the "CI" (or "build-and-test") status check passes. Then if any step fails, the workflow fails and deployment will not run. |

**Summary:** The frontend CI does build + test on every push and fails the run if anything fails. “Deployment must not proceed” is satisfied once you **require this workflow to pass** before deploy (e.g. branch protection + “Require status checks: CI” or your host’s “only deploy on green build” option).

### Playwright repo (when used as a separate repo)

When `playwright-e2e/` is copied into a **separate** repo, that repo has **`.github/workflows/e2e.yml`**, which:

- Runs on push/PR to that repo (and can be triggered manually with a `base_url` input).
- Runs only E2E tests against `BASE_URL` (no frontend build; the frontend is assumed already deployed).
- Fails the run if any test fails.

So:

- **“Build/tests run when a new commit is pushed to the **frontend**”** is done in the **frontend** repo by this workflow.
- The **Playwright** repo workflow is for running E2E against a deployed frontend (e.g. after you deploy, or on demand). The assignment’s “both repos” is satisfied: frontend repo = build + test on frontend push; Playwright repo = test on its own push or when you trigger it.

---

## One-repo vs two-repo

- **One repo (current):** A single push to the frontend repo runs lint → build → E2E. No second repo needed. ✅ Meets “build/tests when commit is pushed to the frontend” and “pipeline fails if any test fails.”
- **Two repos:** Frontend repo CI unchanged. Playwright repo has its own workflow for E2E against `BASE_URL`. You can run both; deployment should still be gated on the **frontend** workflow (and optionally on the Playwright run if you wire it that way).

---

## Quick checklist

- [x] Workflow runs on push to main/master (and PRs).
- [x] Frontend is built (`npm run build`).
- [x] E2E tests run against the built app (preview server on 4173).
- [x] Server is waited for with a curl loop; if it never responds 200, the step fails (no tests against nothing).
- [x] Any failing step (lint, build, or E2E) fails the pipeline.
- [ ] **You:** Configure deployment to run only when this workflow succeeds (so “deployment must not proceed” is enforced).

So **yes:** the current CI pipeline is aligned with the assessment conditions, provided you require this workflow to pass before deployment.
