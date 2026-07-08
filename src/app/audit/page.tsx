import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { PulseRail } from "@/components/ui/TremorPrimitives";
import { auditEvents } from "@/server/mock-db";

export default function AuditPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Audit"
        title="Immutable regulated event trail"
        description="Append-only evidence for policy checks, approval decisions, borrower messages, replies, run pauses, and operator actions."
        actions={<Button>Export logs</Button>}
      />

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader title="Audit model" eyebrow="Compliance invariant" action={<Badge tone="success">Append-only</Badge>} />
        <p className="text-sm leading-6 text-blue-950">
          Every sensitive action writes an immutable audit event. Production storage can add hash chaining for tamper evidence and partition logs by tenant and date for regulator exports.
        </p>
      </Card>

      <div className="mt-8 grid gap-8 xl:grid-cols-[280px_1fr]">
        <Card>
          <CardHeader title="Filters" eyebrow="Regulator review" />
          <div className="space-y-3">
            {["Hand: h1", "Run: r1", "Borrower: Jordan", "Actor: AI / user / system", "Policy result: ready / review / blocked"].map((filter) => (
              <button key={filter} type="button" className="w-full rounded-lg border border-line bg-slate-50 px-3 py-2 text-left text-sm font-semibold text-slate-700">
                {filter}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Timestamped audit events" eyebrow="Hand, run, borrower, and approval evidence" />
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="py-3">Timestamp</th>
                  <th>Actor</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>Policy check</th>
                  <th>Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {auditEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="py-4 pr-6 text-muted">{event.at}</td>
                    <td className="pr-6"><Badge tone={event.actorType === "user" ? "info" : event.actorType === "ai" ? "warning" : "neutral"}>{event.actor}</Badge></td>
                    <td className="pr-6 font-semibold text-ink">{event.action}</td>
                    <td className="pr-6 text-slate-700">{event.entity}</td>
                    <td className="pr-6"><Badge tone={event.policyResult === "ready" ? "success" : event.policyResult === "blocked" ? "danger" : "warning"}>{event.policyResult}</Badge></td>
                    <td className="text-slate-700">{event.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:hidden">
            <PulseRail items={auditEvents.map((event) => ({ label: `${event.at} - ${event.action}`, detail: `${event.actor} - ${event.entity} - ${event.detail}`, tone: event.policyResult === "blocked" ? "red" : event.policyResult === "review" ? "amber" : "blue" }))} />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
