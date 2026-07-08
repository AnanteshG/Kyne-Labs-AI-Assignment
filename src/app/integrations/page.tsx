import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { FlowRibbon } from "@/components/ui/TremorPrimitives";
import { readinessTone } from "@/components/ui/Status";
import { integrations } from "@/server/mock-db";

export default function IntegrationsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Integrations"
        title="Connect Kyne to the lender stack"
        description="Show how borrower, payment, outreach, team, and audit data move between Kyne Agent OS and enterprise systems."
      />

      <Card>
        <CardHeader title="Integration flow" eyebrow="Data in, governed action out" />
        <FlowRibbon
          steps={[
            { label: "Core systems", value: "Borrower context", tone: "blue" },
            { label: "Protocol Hub", value: "Policy guardrails", tone: "green" },
            { label: "Execution adapters", value: "SMS/email/voice", tone: "amber" },
            { label: "Audit/outcomes", value: "Writeback", tone: "blue" }
          ]}
        />
      </Card>

      <Card className="mt-8">
        <CardHeader title="Connections" eyebrow="Mock connectors only" />
        <div className="grid gap-4 md:grid-cols-2">
          {integrations.map((integration) => (
            <div key={integration.id} className="rounded-xl border border-line p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{integration.name}</p>
                  <p className="mt-1 text-sm text-muted">{integration.category}</p>
                </div>
                <Badge tone={readinessTone(integration.status)}>{integration.status}</Badge>
              </div>
              <div className="mt-4 grid gap-3">
                <div className="rounded-lg border border-line bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">Data in</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{integration.dataIn}</p>
                </div>
                <div className="rounded-lg border border-line bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">Data out</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{integration.dataOut}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
