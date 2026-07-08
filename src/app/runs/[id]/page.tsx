import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { PageHeader } from "@/components/ui/PageHeader";
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
        description="Run events are shown alongside immutable audit evidence so compliance can reconstruct what happened."
      />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric accent="amber" label="Status" value={run.status} helper="Human review pause active" />
        <Metric accent="blue" label="Progress" value={`${run.progress}%`} helper="Messages processed" />
        <Metric accent="green" label="Contacted" value={formatNumber(run.contacted)} helper="Customer touches" />
        <Metric accent="orange" label="Failures" value={formatNumber(run.failed)} helper="Carrier or policy failures" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader title="Live event timeline" eyebrow="SSE-style stream" action={<Badge tone="warning">Paused</Badge>} />
          <div className="space-y-4">
            {runEvents.map((event) => (
              <div key={event.id} className="border-l-2 border-blue-200 pl-4">
                <p className="text-xs font-semibold text-muted">{event.at} · {event.type}</p>
                <p className="mt-1 font-semibold text-ink">{event.label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{event.detail}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Immutable audit" eyebrow="Regulated review trail" />
          <div className="space-y-4">
            {auditEvents.map((event) => (
              <div key={event.id} className="rounded-md border border-line p-4">
                <p className="text-xs font-semibold text-muted">{event.at} · {event.actor}</p>
                <p className="mt-1 font-semibold text-ink">{event.action}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{event.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader title="Outcome movement" eyebrow="Flows back to portfolio" />
        <div className="grid gap-4 md:grid-cols-3">
          {run.outcomes.map((outcome) => (
            <div key={outcome.label} className="rounded-md bg-slate-50 p-4">
              <p className="text-sm font-semibold text-muted">{outcome.label}</p>
              <p className="mt-2 text-2xl font-semibold text-ink">{formatNumber(outcome.value)}</p>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
