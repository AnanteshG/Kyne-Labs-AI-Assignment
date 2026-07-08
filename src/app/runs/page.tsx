import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { hands, runs } from "@/server/mock-db";
import { formatNumber } from "@/lib/utils";

export default function RunsPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted">Execution</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Live runs, pauses, failures, and outcomes</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Running or paused" value={String(runs.length)} helper="Active operational runs" />
        <Metric label="Customers contacted" value={formatNumber(runs.reduce((sum, run) => sum + run.contacted, 0))} helper="Across active runs" />
        <Metric label="Failures" value={formatNumber(runs.reduce((sum, run) => sum + run.failed, 0))} helper="Needs review or retry" />
      </div>
      <Card className="mt-6">
        <CardHeader title="Run queue" eyebrow="Operational monitoring" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
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
                    <td className="py-4 font-semibold text-ink">{hand?.name ?? run.id}</td>
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
