import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { PageHeader } from "@/components/ui/PageHeader";
import { hands, runs } from "@/server/mock-db";
import { formatNumber } from "@/lib/utils";

export default function RunsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Execution"
        title="Live runs, pauses, failures, and outcomes"
        description="Monitor active operations, delivery issues, and review pauses."
      />
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Running or paused" value={String(runs.length)} helper="Active operational runs" />
        <Metric label="Customers contacted" value={formatNumber(runs.reduce((sum, run) => sum + run.contacted, 0))} helper="Across active runs" />
        <Metric label="Failures" value={formatNumber(runs.reduce((sum, run) => sum + run.failed, 0))} helper="Needs review or retry" />
      </div>
      <Card className="mt-8">
        <CardHeader title="Run queue" eyebrow="Operational monitoring" />
        <div className="grid gap-4 md:hidden">
          {runs.map((run) => {
            const hand = hands.find((item) => item.id === run.handId);
            return (
              <Link key={run.id} href={`/runs/${run.id}`} className="rounded-xl border border-line p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-blue-700">{hand?.name ?? run.id}</p>
                  <Badge tone={run.status === "paused" ? "warning" : "info"}>{run.status}</Badge>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div><p className="text-muted">Progress</p><p className="mt-1 font-semibold text-ink">{run.progress}%</p></div>
                  <div><p className="text-muted">Contacted</p><p className="mt-1 font-semibold text-ink">{formatNumber(run.contacted)}</p></div>
                  <div><p className="text-muted">Failures</p><p className="mt-1 font-semibold text-ink">{formatNumber(run.failed)}</p></div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-[820px] w-full text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-3">Run</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Contacted</th>
                <th>Failures</th>
                <th>Open</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {runs.map((run) => {
                const hand = hands.find((item) => item.id === run.handId);
                return (
                  <tr key={run.id}>
                    <td className="py-5 pr-6 font-semibold text-ink">{hand?.name ?? run.id}</td>
                    <td><Badge tone={run.status === "paused" ? "warning" : "info"}>{run.status}</Badge></td>
                    <td>{run.progress}%</td>
                    <td>{formatNumber(run.contacted)}</td>
                    <td>{formatNumber(run.failed)}</td>
                    <td><Link href={`/runs/${run.id}`} className="font-semibold text-blue-700">View audit</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
