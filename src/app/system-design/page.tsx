import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { apiContracts } from "@/server/mock-db";

const layers = [
  ["Layer 1: Interaction Layer", "Multichannel borrower outreach through voice, SMS, email, team handoffs, web app, conversation timeline, run monitor, SSE updates, and notifications."],
  ["Layer 2: Orchestration Layer", "Banking Hand lifecycle, workflow engine, agent coordination, HITL approvals, scheduling, escalations, and queue workers."],
  ["Layer 3: Intelligence Layer", "Borrower personas, payment intent detection, risk scoring, DPD segmentation, recommendations, LLM gateway, and vector retrieval over policies/playbooks."],
  ["Layer 4: Data Foundation Layer", "Borrower profiles, account data, repayment history, DPD buckets, consent/DNC records, transcripts, contact history, and run outcomes."],
  ["Layer 5: Integration Layer", "HubSpot, Stripe, PayPal, Gmail, Slack, core banking systems, webhooks, API connectors, retry queues, and external adapters."],
  ["Layer 6: Compliance Layer", "Protocol Hub, regional rules, company playbooks, consent, DNC, quiet hours, frequency caps, approval gates, RBAC, and immutable audit logs."]
];

const architecture = [
  ["Users", "Recovery Operator", "Compliance Officer", "Admin / Ops Leader"],
  ["Frontend", "Portfolio", "Data & Protocol Hub", "AI Coworker", "Banking Hands", "Approvals", "Runs", "Audit", "Integrations"],
  ["API Layer", "API Gateway", "Auth", "Tenant Guard", "RBAC"],
  ["Kyne Agent OS Backend", "Interaction", "Orchestration", "Intelligence", "Data Foundation", "Integration", "Compliance"],
  ["Async & Real-time", "Job Queue", "Workers", "Event Bus", "SSE Gateway"],
  ["Storage", "PostgreSQL", "Redis", "Object Storage", "Vector DB", "Immutable Audit Store"],
  ["External Systems", "Core Banking / Loan System", "HubSpot", "Stripe / PayPal", "Gmail", "Slack", "SMS / Voice / Email Providers"]
];

const lifecycle = [
  "Operator opens portfolio",
  "Frontend calls portfolio summary API",
  "Operator asks coworker to create outreach playbook",
  "Intelligence layer generates borrower strategy",
  "Compliance layer retrieves Protocol Hub rules",
  "Orchestration creates Banking Hand draft",
  "Operator submits for approval",
  "Compliance approves",
  "Operator starts run",
  "Execution layer sends messages/calls",
  "Runtime policy checks happen before each touch",
  "Audit logs every step",
  "Outcomes update portfolio"
];

const services = [
  "Portfolio Intelligence Service",
  "Borrower / Case Service",
  "Data Ingestion Service",
  "Protocol Hub / Policy Service",
  "Agent Orchestrator",
  "Banking Hand / Workflow Service",
  "Approval Service",
  "Outreach Execution Service",
  "Integration Service",
  "Audit Service",
  "Notification / SSE Service",
  "Analytics / Learning Service"
];

const entities = [
  "Tenant", "User", "Role", "Borrower", "Account", "Case", "PortfolioUpload", "PolicyPack", "ProtocolRule", "BorrowerPersona", "BankingHand", "HandVersion", "Approval", "Run", "RunEvent", "ConversationMessage", "AuditEvent", "IntegrationConnection", "Outcome"
];

const rbac = [
  ["Operator", "View portfolio, upload data, ask coworker, create draft hands, submit for approval, monitor runs"],
  ["Compliance Officer", "Review policy checks, approve/reject/request changes, view full audit logs"],
  ["Admin", "Manage users, integrations, Protocol Hub policy packs, and tenant settings"],
  ["Ops Leader", "View portfolio outcomes, monitor recovery performance, and review team-level metrics"]
];

export default function SystemDesignPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="System Design"
        title="Kyne Agent OS for regulated lenders"
        description="Frontend information architecture plus backend services, APIs, real-time events, RBAC, scaling, deployment, and compliance controls."
        actions={<Badge tone="info">Mock design artifact</Badge>}
      />

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader title="Product interpretation" eyebrow="Assignment thesis" />
        <p className="text-sm leading-6 text-blue-950">
          I understood Kyne as an Agent OS for regulated lenders, not just a collections dashboard. The system has to ingest portfolio and borrower data, reason over borrower context, create governed workflows, execute outreach across voice, SMS, and email, and record every step for compliance.
        </p>
      </Card>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {layers.map(([title, detail]) => (
          <Card key={title}>
            <CardHeader title={title} />
            <p className="text-sm leading-6 text-slate-600">{detail}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader title="Architecture diagram" eyebrow="Users to audited outcomes" />
        <div className="grid gap-4 xl:grid-cols-7">
          {architecture.map(([group, ...items], index) => (
            <div key={group} className="relative rounded-xl border border-line bg-slate-50 p-4">
              {index < architecture.length - 1 ? <span className="absolute -right-3 top-1/2 hidden h-px w-6 bg-blue-300 xl:block" /> : null}
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{group}</p>
              <div className="mt-3 space-y-2">
                {items.map((item) => (
                  <div key={item} className="rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-slate-700">{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-8">
        <CardHeader title="Borrower outreach lifecycle" eyebrow="Analyse -> Reason -> Act -> Refine" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {lifecycle.map((step, index) => (
            <div key={step} className="rounded-xl border border-line bg-white p-4">
              <Badge tone={index < 3 ? "info" : index < 8 ? "warning" : "success"}>Step {index + 1}</Badge>
              <p className="mt-3 text-sm font-semibold text-ink">{step}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader title="Backend services" />
          <div className="grid gap-2 sm:grid-cols-2">{services.map((item) => <div key={item} className="rounded-lg border border-line bg-slate-50 p-3 text-sm font-semibold text-slate-700">{item}</div>)}</div>
        </Card>
        <Card>
          <CardHeader title="Data entities" />
          <div className="flex flex-wrap gap-2">{entities.map((item) => <Badge key={item} tone="neutral">{item}</Badge>)}</div>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader title="API contracts" eyebrow="REST and SSE" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <tr><th className="py-3">Method</th><th>Path</th><th>Service</th><th>Purpose</th><th>Mode</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {apiContracts.map((api) => (
                <tr key={`${api.method}-${api.path}`}>
                  <td className="py-3 pr-5"><Badge tone={api.method === "GET" ? "info" : "warning"}>{api.method}</Badge></td>
                  <td className="pr-5 font-mono text-xs text-ink">{api.path}</td>
                  <td className="pr-5 text-slate-700">{api.owner}</td>
                  <td className="pr-5 text-slate-700">{api.purpose}</td>
                  <td><Badge tone={api.realtime === "SSE" ? "success" : "neutral"}>{api.realtime}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <Card>
          <CardHeader title="Real-time strategy" eyebrow="REST vs SSE" />
          <p className="text-sm leading-6 text-slate-600">REST handles portfolio summary, borrower list/detail, uploads, policy packs, hand detail, approvals, and audit history. SSE streams AI artifact generation, policy-check progress, run progress, message sent/failed events, borrower replies, approval notifications, and escalations. SSE is enough because most live updates are server-to-client; WebSockets are only needed for heavy bidirectional collaboration.</p>
        </Card>
        <Card>
          <CardHeader title="Security and compliance" />
          <p className="text-sm leading-6 text-slate-600">Backend enforces permissions, not only the frontend. Every request checks tenant_id. Sensitive actions create audit events. Approval gates run before borrower-facing outreach. Runtime checks run before every SMS, email, or voice touch. Audit logs are append-only, with optional hash chaining for tamper evidence.</p>
        </Card>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <Card>
          <CardHeader title="Scaling strategy" />
          <p className="text-sm leading-6 text-slate-600">Portfolio is read-heavy, so summaries are precomputed and cached in Redis. Borrower search uses indexed PostgreSQL or a search index. Large uploads go to object storage and async validation workers. AI coworker work runs as async jobs with streamed updates. Execution uses queue-based workers, channel-specific pools, event bus, append-only event store, partitioned audit logs, webhooks, retry queues, dead-letter queues, horizontally scaled SSE gateways, and tenant_id isolation with a backend tenant guard.</p>
        </Card>
        <Card>
          <CardHeader title="Deployment strategy" />
          <p className="text-sm leading-6 text-slate-600">Frontend: Next.js on Vercel, CDN static assets, typed API client. Backend: Node.js/FastAPI services, Dockerized, on GCP Cloud Run or Kubernetes with autoscaling. Async: Pub/Sub, Cloud Tasks, RabbitMQ, or Kafka. Data: managed PostgreSQL, Redis, object storage, vector DB, audit store. CI/CD: GitHub Actions for lint, typecheck, tests, Docker build, staging deploy, smoke test, production promote. Observability: logs, traces per run/case, queue lag, failed sends, AI latency, and SSE disconnect metrics.</p>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader title="RBAC" eyebrow="Role-permission table" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted"><tr><th className="py-3">Role</th><th>Permissions</th></tr></thead>
            <tbody className="divide-y divide-line">{rbac.map(([role, permissions]) => <tr key={role}><td className="py-4 pr-6 font-semibold text-ink">{role}</td><td className="text-slate-700">{permissions}</td></tr>)}</tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-8 border-emerald-200 bg-emerald-50">
        <CardHeader title="Critical design principle" />
        <p className="text-sm leading-6 text-emerald-950">
          The AI can recommend and generate actions, but the backend controls whether those actions are allowed. Policy checks, consent checks, DNC checks, approval gates, tenant isolation, and audit logging are enforced server-side before any borrower-facing step runs.
        </p>
        <p className="mt-4 text-sm font-semibold leading-6 text-emerald-950">
          The frontend is the operating surface, but the real product is the governed Agent OS underneath. Every borrower action starts from context, passes through policy, runs through orchestration, and ends with auditable outcomes.
        </p>
      </Card>
    </AppShell>
  );
}
