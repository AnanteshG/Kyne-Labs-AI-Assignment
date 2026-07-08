import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { PageHeader } from "@/components/ui/PageHeader";
import { AreaTrend, BarMeterList, PulseRail } from "@/components/ui/TremorPrimitives";
import { auditEvents, hands, runEvents, runs } from "@/server/mock-db";
import { formatNumber } from "@/lib/utils";
import { notFound } from "next/navigation";

export default function RunDetailPage({ params }: { params: { id: string } }) {
  const run = runs.find((item) => item.id === params.id);
  if (!run) notFound();
  const hand = hands.find((item) => item.id === run.handId);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Execution & audit"
        title={hand?.name ?? "Run detail"}
        description="Follow progress, pauses, outcomes, and audit evidence."
      />
      <div className="grid gap-5 md:grid-cols-4">
        <Metric accent="amber" label="Status" value={run.status} helper="Human review pause active" />
        <Metric accent="blue" label="Progress" value={`${run.progress}%`} helper="Messages processed" />
        <Metric accent="green" label="Contacted" value={formatNumber(run.contacted)} helper="Customer touches" />
        <Metric accent="orange" label="Failures" value={formatNumber(run.failed)} helper="Carrier or policy failures" />
      </div>
      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader title="Live event timeline" eyebrow="SSE-style stream" action={<Badge tone="warning">Paused</Badge>} />
          <PulseRail items={runEvents.map((event) => ({ label: `${event.at} - ${event.label}`, detail: event.detail, tone: event.type === "hitl_required" ? "amber" : "blue" }))} />
        </Card>
        <Card>
          <CardHeader title="Immutable audit" eyebrow="Regulated review trail" />
          <div className="space-y-4">
            {auditEvents.map((event) => (
              <div key={event.id} className="rounded-xl border border-line p-5">
                <p className="text-xs font-semibold text-muted">{event.at} - {event.actor}</p>
                <p className="mt-1 font-semibold text-ink">{event.action}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{event.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader title="Outcome movement" eyebrow="Flows back to portfolio" />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <AreaTrend label="Run throughput" tone="blue" values={[8, 14, 22, 31, 43, 52, 59, run.progress]} />
          <BarMeterList tone="green" items={run.outcomes.map((outcome) => ({ label: outcome.label, value: Math.min(100, Math.round((outcome.value / Math.max(run.contacted, 1)) * 100)), helper: formatNumber(outcome.value) }))} />
        </div>
      </Card>
    </AppShell>
  );
}
