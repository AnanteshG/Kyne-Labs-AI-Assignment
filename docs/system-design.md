# Kyne Labs AI Frontend System Design

## 1. Information Architecture

The redesign compresses overlapping workflow, agent, and Banking Hand concepts into one main operational object: the **Banking Hand**. A hand is a governed AI-operated banking workflow with audience, channels, policy gates, approvals, execution, outcomes, and audit.

Reference screenshot review: the current platform separates collection overview, accounts, communication overview, payment overview, dashboard, bucket performance, approvals, teams, integrations, templates, knowledge base, observability, workflows, agents, usage, audit logs, and a side AI panel. The redesign keeps the useful operational density but removes the feeling of jumping between disconnected admin pages.

| Current area | Decision | New route |
| --- | --- | --- |
| Collections overview / dashboard | Keep and redesign as home base | `/portfolio` |
| Connectors / files / knowledge / policy | Merge into readiness hub | `/data` |
| AI / chat page | Redesign as coworker workspace | `/workspace` |
| Workflow list / detail / Banking Hands | Merge into Banking Hands | `/hands`, `/hands/[id]` |
| Customers list / detail | Keep as standalone and embedded context | `/customers`, `/customers/[id]` |
| Approvals queue | Keep and elevate | `/approvals` |
| Live runs / activity feeds / logs | Merge into execution and audit detail | `/runs/[id]` |
| Settings / teams / integrations | Keep only admin configuration | `/settings` |

Key merge decisions:

- Overview, communication, payment, dashboard, and bucket performance become `/portfolio`.
- Integrations, templates, knowledge base, policy readiness, and validation become `/data`.
- Workflows and agents become a dedicated `/workflows` canvas plus governed hand detail in `/hands` and `/hands/[id]`.
- Observability, usage, run logs, and audit logs become `/runs` and `/runs/[id]`.
- The side AI panel becomes a full coworker workspace at `/workspace`, with a floating Ask AI shortcut available throughout the authenticated app shell.

Navigation uses one persistent shell with a collapsible sidebar, first-run onboarding, and a single-line journey bar. The active mode switch supports debt collection, invoice collection, and cross-sell without creating separate apps. The same routes adapt language, metrics, policies, and recommended actions by mode.

## 2. Screen Logic Specs

### Login - `/login`

- Primary user: operator, compliance, admin
- Goal: enter the prototype as a role-specific user
- States: ready
- Actions: select role, enter app
- Guards: none for prototype
- Components: role cards, product positioning panel
- State: mock role passed through URL/session concept
- Backend: `POST /api/auth/login`
- Failure: unavailable role falls back to operator

### Portfolio - `/portfolio`

- Primary user: operator and operations leader
- Goal: understand portfolio health and next governed action
- States: loading, ready, blocked
- Actions: open data readiness, create hand, inspect active hand
- Guards: hand execution requires data readiness and approvals
- Components: app shell, metrics, bucket table, readiness strip, active hands
- State: server cache from portfolio summary
- Backend: `GET /api/portfolio/summary`
- Failure: show empty portfolio and retry message

### Data & Policies - `/data`

- Primary user: operator, compliance, admin
- Goal: prove data and policies are safe enough for automation
- States: ready, review, blocked
- Actions: run validation, inspect blockers
- Guards: blocked policy prevents publishing or execution
- Components: data source list, policy pack list, validation report
- State: server cache with local filter state if added
- Backend: `GET /api/data/readiness`, `GET /api/policies`
- Failure: show stale readiness warning

### Coworker Workspace - `/workspace`

- Primary user: operator
- Goal: collaborate with AI to create a governed Banking Hand
- States: empty, generating, ready, review
- Actions: prompt coworker, review artifacts, create draft hand
- Guards: artifacts must include audience, schedule, message, compliance
- Components: conversation panel, artifact grid, decision memo
- State: local conversation plus server-created artifacts
- Backend: `POST /api/coworker/sessions`, `POST /api/hands`
- Failure: artifact generation error keeps user in workspace

### Hand Detail - `/hands/[id]`

- Primary user: operator and compliance
- Goal: review lifecycle, approvals, customer-facing content, and readiness
- States: draft, governance review, approved, running, complete
- Actions: open approvals, monitor run
- Guards: cannot run until required approvals resolve
- Components: lifecycle tracker, approval gates, outbound preview
- State: server hand state; no duplicate hand status store
- Backend: `GET /api/hands/[id]`
- Failure: missing hand returns 404

### Approvals - `/approvals`

- Primary user: compliance
- Goal: approve or request changes before customer contact
- States: pending, approved, changes requested, rejected
- Actions: approve, request changes
- Guards: role must be compliance or admin in production
- Components: approval cards, risk badges, action buttons
- State: mutation updates server approval state
- Backend: `GET /api/approvals`, `POST /api/approvals/[id]/resolve`
- Failure: show mutation error and keep pending state

### Run Detail - `/runs/[id]`

- Primary user: operator, compliance
- Goal: monitor execution, failures, HITL pauses, outcomes, and audit
- States: queued, running, paused, failed, complete
- Actions: review HITL event, inspect audit evidence
- Guards: paused runs require human decision before continuing
- Components: run metrics, event timeline, immutable audit, outcomes
- State: fetched run plus streamed events
- Backend: `GET /api/runs/[id]`, `GET /api/runs/[id]/events`
- Failure: show last known events and stale warning

### Customers - `/customers`, `/customers/[id]`

- Primary user: operator
- Goal: inspect customer-level context behind hands and outcomes
- States: list, detail, suppressed
- Actions: open customer detail
- Guards: outbound recommendations respect consent and DNC
- Components: customer table, risk badges, event slice
- State: server cache with URL detail id
- Backend: `GET /api/customers`, `GET /api/customers/[id]`
- Failure: missing customer returns 404

### Settings - `/settings`

- Primary user: admin
- Goal: configure tenant-level team and integration settings
- States: ready
- Actions: review settings
- Guards: admin-only in production
- Components: setting cards
- State: server settings in production
- Backend: future `GET /api/settings`
- Failure: show restricted access

## 3. Frontend Architecture

The app shell owns persistent navigation, operating mode, readiness signals, and user context. Pages own only local UI state such as selected filters or draft prompt text. Server data should be cached by query keys in a production version; the prototype reads mock data directly and exposes matching API routes.

State ownership:

- URL params: selected route, hand id, run id, customer id, optional role
- App shell: current operating mode, user identity, notifications
- Server cache: portfolio summary, hand status, approvals, run state, customers
- Local state: input text, tabs, filters, temporary UI expansion

Avoid duplicated truth. Hand status, approval status, and run events must come from backend-backed state, not parallel client stores.

Real-time strategy:

| Data | Strategy |
| --- | --- |
| Portfolio summary | Fetch on page load |
| Data readiness | Fetch on load, refresh after validation |
| Coworker artifacts | Created by mutation |
| Approvals | Fetch and mutate |
| Run progress | SSE stream in production |
| Audit events | Append-only fetch/stream |

RBAC:

- Operator: portfolio, data, coworker, hands, runs, customers
- Compliance: approvals, audit, policy review, hand review
- Admin: settings, integrations, team roles, all read access

## 4. System Design Appendix

Important APIs:

- `POST /api/auth/login` - mock role login
- `GET /api/me` - current user
- `GET /api/portfolio/summary` - home metrics and active hands
- `GET /api/data/readiness` - data sources, policies, validation
- `GET /api/policies` - policy packs
- `POST /api/coworker/sessions` - generate coworker artifacts
- `POST /api/hands` - create draft Banking Hand
- `GET /api/hands/[id]` - hand detail and approval gates
- `POST /api/approvals/[id]/resolve` - resolve approval
- `GET /api/runs/[id]/events` - execution events

Key entities are `User`, `PortfolioSummary`, `Customer`, `PolicyPack`, `ValidationReport`, `BankingHand`, `Approval`, `Run`, `RunEvent`, `AuditEvent`, `CoworkerSession`, and `CoworkerArtifact`.

Execution events handled by UI include `artifact_updated`, `hitl_required`, `run.progress`, `approval.resolved`, and `run.failed`.

Audit model: audit events are immutable, append-only records tied to hands, runs, approvals, and customer-contact decisions. The UI surfaces them on run detail and customer detail so compliance can reconstruct what happened, who approved it, and why automation paused.

## 5. Rationale

This redesign makes the product simpler by turning scattered pages into a clear operating journey: portfolio, readiness, coworker, hand, approval, run, audit. The portfolio remains the home base, so outcomes always connect back to business health instead of living in isolated logs.

The AI feels like a coworker because it produces reviewable artifacts and decision memos, not hidden magic or draggable workflow nodes. Operators collaborate with it, but governance gates decide when customer contact is allowed.

The design decision I am most proud of is making governance visible in every major step. Policy readiness appears on the portfolio, data hub, coworker artifacts, hand detail, approvals, and run audit. That makes trust part of the product surface rather than a settings afterthought.

In week one as frontend engineer, I would build the production data model for Banking Hands, wire the hand lifecycle to backend APIs, and implement the run event stream with clear empty, loading, paused, failed, and audit states.
