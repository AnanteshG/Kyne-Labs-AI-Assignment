# Kyne Labs AI Assignment

Next.js prototype for a regulated banking operations frontend. The product redesign keeps portfolio health first-class, makes governance visible across the journey, and treats the AI as a compliance-aware coworker rather than a workflow builder.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Mock API routes
- Mock data only

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Main Flow

1. Login as operator, compliance, or admin.
2. Review portfolio health at `/portfolio`.
3. Validate data and policies at `/data`.
4. Use the AI coworker at `/workspace`.
5. Review Banking Hands at `/hands` and `/hands/h1`.
6. Approve customer contact at `/approvals`.
7. Monitor execution and audit trail at `/runs/r1`.
8. Inspect customer context at `/customers` and `/customers/c1`.

## Architecture

The app uses a simple frontend/backend split inside one Next.js repository:

- `src/app` contains pages and API route handlers.
- `src/components` contains shell, UI, and domain-specific components.
- `src/domain` contains shared product types and constants.
- `src/server/mock-db.ts` contains prototype data used by pages and API routes.
- `docs/system-design.md` contains the Notion-ready system design writeup.

## Challenge Focus

This prototype is optimized for product structure, information architecture, frontend system design, user flows, state ownership, API contracts, permissions, and implementability.
