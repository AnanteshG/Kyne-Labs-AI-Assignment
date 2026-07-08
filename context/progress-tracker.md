# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Build foundation and core prototype flow.

## Current Goal

- Improve the Next.js prototype using the Six-File Context methodology and prepare the repo for GitHub review.

## Completed

- Created Next.js App Router project.
- Added mock domain entities and mock dataset.
- Added app shell, login, portfolio, data, coworker, hands, approvals, runs, customers, and settings screens.
- Added mock API routes.
- Added service and repository layer.
- Added system design document.
- Added Six-File Context files and agent entry point.
- Reviewed 17 current-platform screenshots and applied a redesign pass to the shell, portfolio, readiness, coworker, hand detail, execution, and docs.
- Increased UI spacing, removed product-explanation copy from screens, added mobile card layouts, and verified desktop/mobile rendering with browser screenshots.
- Rebuilt the visual system in a Tremor-inspired style with light dashboard navigation, journey stepper, progress bars, dashboard cards, and richer portfolio/readiness/coworker views.
- Added dark mode with persisted theme preference, upgraded the global font stack, converted the sidebar into a collapsible desktop rail plus mobile hamburger drawer, and tightened responsive wrapping across dashboard pages.
- Added reusable animated graph primitives and applied them across login, portfolio, readiness, coworker, hands, approvals, runs, customers, and settings pages to reduce box-heavy layouts.
- Reviewed the 17-page screenshots PDF and added a React Flow workflow/agents canvas, Joyride onboarding, floating Ask AI shortcut, clearer workflow arrows, denser operational tables, cleaner sidebar collapse/hover states, and black/electric-blue dark mode.
- Removed duplicate top journey navigation, clarified top-bar status labels, and added an explicit admin profile block with avatar initials, name, and role.
- Redesigned the React Flow canvas with custom high-contrast Banking Hand nodes, visible handles, electric-blue animated edges, dark canvas framing, and polished controls/minimap styling.

## In Progress

- Prepare the workflow canvas, onboarding, shell polish, and graph-rich UI pass for the next approved push.

## Next Up

- Add build-plan spec file.
- Run typecheck and production build.
- Create first local commit without co-author metadata.
- Ask before any GitHub push.

## Open Questions

- Deployment target assumed to be Vercel.

## Architecture Decisions

- Use mock data only.
- Use Next.js API routes to show backend contracts.
- Use services and repositories to avoid route handlers owning business logic.
- Use custom UI primitives instead of a heavy component framework.

## Session Notes

- User asked for npm/npx only, not pnpm.
- User asked to remove any Codex co-author tag from commits.
- User asked to ask before every push to GitHub.
