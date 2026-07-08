# Project Overview

## Overview

Kyne Labs AI Assignment is a Next.js prototype for a regulated banking operations platform. It redesigns the frontend experience around a portfolio-first command center, visible governance, and an AI coworker that helps operators create, approve, execute, and audit Banking Hands.

## Goals

1. Make portfolio health the home base for all operational decisions.
2. Unify data readiness, policy packs, validation, and governance into a visible journey.
3. Present the AI as a compliance-aware coworker, not a generic chat assistant or node builder.
4. Show a full user flow from login through execution monitoring and audit.
5. Provide enough frontend/backend structure that a senior engineer could continue implementation.

## Core User Flow

1. User logs in as operator, compliance officer, or admin.
2. User lands on the portfolio command center.
3. User reviews portfolio risk, readiness, and recommended actions.
4. User opens Data & Policies to validate data sources and policy packs.
5. User asks the coworker to draft a regulated Banking Hand.
6. User reviews generated artifacts, compliance checks, and approval gates.
7. Compliance reviews approvals before outbound contact.
8. User monitors run progress, failures, HITL pauses, and audit events.
9. Portfolio outcomes update with run results.

## Features

- App shell with sidebar, operating mode, and readiness context.
- Role-based mock login.
- Portfolio command center.
- Data and policy readiness hub.
- Coworker workspace with generated artifacts.
- Banking Hand list and detail lifecycle.
- Approval queue.
- Run monitoring and audit trail.
- Customer list and customer detail.
- Admin settings.
- Mock API routes and service/repository backend pattern.

## In Scope

- Next.js App Router prototype.
- Mock data only.
- Mock API routes.
- Written system design documentation.
- Responsive desktop-first operational UI.
- Clean GitHub-ready project structure.

## Out of Scope

- Real authentication.
- Real database.
- Real AI calls.
- Real banking integrations.
- Real SSE infrastructure.
- Production authorization middleware.
- Pixel-perfect recreation of the current platform.

## Success Criteria

- `npm run typecheck` passes.
- `npm run build` passes.
- User can navigate the complete flow from `/login` to `/runs/r1`.
- Documentation covers IA, APIs, entities, state, RBAC, audit, and rationale.
- The repo clearly communicates frontend and backend architecture.
