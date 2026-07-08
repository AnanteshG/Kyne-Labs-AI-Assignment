# AI Workflow Rules

## Overall Approach

Build incrementally and keep every change tied to the Kyne Labs challenge brief. Prioritize clarity, originality, frontend architecture, and implementability.

## Rules

1. Read the context files before making architectural changes.
2. Work on one coherent unit at a time.
3. Do not introduce a dependency unless it materially improves the assignment.
4. Keep the product portfolio-first.
5. Keep governance visible in core flows.
6. Do not turn Banking Hands into a generic drag-and-drop workflow builder.
7. Keep API routes, services, repositories, and domain types aligned.
8. Do not add real auth, database, or external AI calls unless explicitly requested.
9. Verify with `npm run typecheck` and `npm run build` before milestone completion.
10. Ask before pushing to GitHub.

## Missing Requirements

- If screenshots are unavailable, continue with the current redesign direction.
- If a design decision is ambiguous, choose the option that best supports regulated banking operations.
- If a requested change conflicts with the challenge brief, surface the tradeoff before implementing.

## Documentation Sync

- Update `progress-tracker.md` after each meaningful change.
- Update `architecture.md` if boundaries or stack choices change.
- Update `ui-context.md` if visual language changes.
