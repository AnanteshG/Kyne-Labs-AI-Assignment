import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { PageHeader } from "@/components/ui/PageHeader";
import { riskTone } from "@/components/ui/Status";
import { AreaTrend, PulseRail } from "@/components/ui/TremorPrimitives";
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
          <div className="mb-5">
            <AreaTrend label="Repayment likelihood" tone={customer.risk === "high" ? "amber" : "green"} values={[34, 37, 35, 42, 48, 51, 56, customer.contactable ? 64 : 44]} />
          </div>
          <p className="text-sm leading-6 text-slate-600">{customer.nextBestAction}</p>
        </Card>
        <Card>
          <CardHeader title="Recent operational events" eyebrow="Customer audit slice" />
          <PulseRail items={runEvents.slice(0, 3).map((event) => ({ label: `${event.at} - ${event.label}`, detail: event.detail, tone: event.type === "hitl_required" ? "amber" : "blue" }))} />
        </Card>
      </div>
    </AppShell>
  );
}
