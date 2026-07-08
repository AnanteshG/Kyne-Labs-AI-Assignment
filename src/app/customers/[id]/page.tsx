import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { PageHeader } from "@/components/ui/PageHeader";
import { riskTone } from "@/components/ui/Status";
import { customers, runEvents } from "@/server/mock-db";
import { formatCurrency } from "@/lib/utils";

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = customers.find((item) => item.id === params.id);
  if (!customer) notFound();

  return (
    <AppShell>
      <PageHeader
        eyebrow="Customer detail"
        title={customer.name}
        description="Account status, contact eligibility, risk flags, and recent operational events."
      />
      <div className="grid gap-5 md:grid-cols-4">
        <Metric label="Balance" value={formatCurrency(customer.balance)} helper={customer.segment} />
        <Metric label="Days past due" value={`${customer.dpd}`} helper="Current cycle" />
        <Metric label="Last contact" value={customer.lastContact} helper="All channels" />
        <div className="rounded-xl border border-line bg-white p-5 shadow-panel">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Risk</p>
          <div className="mt-3"><Badge tone={riskTone(customer.risk)}>{customer.risk}</Badge></div>
          <div className="mt-2"><Badge tone={customer.consent === "valid" ? "success" : "warning"}>{customer.consent} consent</Badge></div>
        </div>
      </div>
      <div className="mt-8 grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader title="Next best action" eyebrow="Policy-aware recommendation" />
          <p className="text-sm leading-6 text-slate-600">{customer.nextBestAction}</p>
        </Card>
        <Card>
          <CardHeader title="Recent operational events" eyebrow="Customer audit slice" />
          <div className="space-y-3">
            {runEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="rounded-xl border border-line p-5">
                <p className="text-xs font-semibold text-muted">{event.at} · {event.type}</p>
                <p className="mt-1 font-semibold text-ink">{event.label}</p>
                <p className="mt-1 text-sm text-slate-600">{event.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
