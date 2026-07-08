# Architecture

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js App Router | Pages, layouts, server route handlers |
| Language | TypeScript | Shared domain modeling and safer implementation |
| Styling | Tailwind CSS | Utility-based operational UI |
| Icons | lucide-react | Lightweight icon system |
| Workflow canvas | @xyflow/react | Drag-and-drop Banking Hand workflow modeling |
| Onboarding | react-joyride | First-run guided tour |
| Data | Mock TypeScript data | Prototype-only data source |
| Backend shape | Next.js API routes + services + repositories | Demonstrates implementable server boundaries |
| Deployment | Vercel-ready Next.js app | Simple assignment deployment path |

## System Boundaries

- `src/app` owns routes, pages, layouts, and API handlers.
- `src/components` owns reusable UI and domain-specific interface pieces.
- `src/components/workflows` owns the workflow canvas and workflow-specific client UI.
- `src/domain` owns shared types and constants.
- `src/server/mock-db.ts` owns prototype data only.
- `src/server/repositories` owns data access functions.
- `src/server/services` owns product actions and business-level response shapes.
- `src/lib` owns small formatting and utility helpers.
- `docs` owns submission-ready written system design.
- `context` owns build context, standards, and progress.

## Storage Model

- Prototype data lives in TypeScript objects.
- Production portfolio, hand, approval, run, customer, and audit records would live in a database.
- Production run events would stream over SSE and persist to immutable audit storage.
- Production files and policy uploads would use object storage plus database metadata.

## Auth And Access Model

- Prototype login is role selection only.
- Production auth should enforce role and tenant membership at every mutation boundary.
- Operators can draft hands and monitor runs.
- Compliance officers can resolve approvals and inspect audit trails.
- Admins can manage integrations, teams, and tenant settings.

## Invariants

1. Governance must be visible in the main journey, not hidden in settings.
2. Hand status, approval state, and run state must have one source of truth.
3. API handlers should delegate product logic to services.
4. Services should read data through repositories.
5. UI pages should not invent backend state that conflicts with mock/API state.
6. Customer contact cannot be represented as executable until required approvals are resolved.
