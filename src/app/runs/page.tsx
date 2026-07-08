import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { PageHeader } from "@/components/ui/PageHeader";
import { AreaTrend, BarMeterList } from "@/components/ui/TremorPrimitives";
import { hands, runs } from "@/server/mock-db";
import { formatNumber } from "@/lib/utils";

export default function RunsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Execution"
        title="Live outreach execution"
        description="Monitor run status, progress, borrower processing, sends, skips, failures, replies, agent reviews, and outcomes."
      />
      <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
        <Metric label="Running or paused" value={String(runs.length)} helper="Active operational runs" />
        <Metric label="Borrowers processed" value={formatNumber(runs.reduce((sum, run) => sum + run.borrowersProcessed, 0))} helper="Across active runs" />
        <Metric label="Messages sent" value={formatNumber(runs.reduce((sum, run) => sum + run.messagesSent, 0))} helper="SMS/email touches" />
        <Metric label="Skipped borrowers" value={formatNumber(runs.reduce((sum, run) => sum + run.skippedBorrowers, 0))} helper="Policy suppressed" />
        <Metric label="Failed messages" value={formatNumber(runs.reduce((sum, run) => sum + run.failed, 0))} helper="Retry or review" />
        <Metric label="Replies" value={formatNumber(runs.reduce((sum, run) => sum + run.borrowerReplies, 0))} helper="Borrower responses" />
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <AreaTrend label="Contacts processed" tone="blue" values={[18, 24, 33, 42, 49, 57, 63, 68]} />
        <Card>
          <CardHeader title="Run health" eyebrow="Progress by hand" />
          <BarMeterList
            tone="blue"
            items={runs.map((run) => {
              const hand = hands.find((item) => item.id === run.handId);
              return { label: hand?.name ?? run.id, value: run.progress, helper: `${formatNumber(run.failed)} failures` };
            })}
          />
        </Card>
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
                  <div><p className="text-muted">Processed</p><p className="mt-1 font-semibold text-ink">{formatNumber(run.borrowersProcessed)}</p></div>
                  <div><p className="text-muted">Failures</p><p className="mt-1 font-semibold text-ink">{formatNumber(run.failed)}</p></div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-3">Run</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Processed</th>
                <th>Sent</th>
                <th>Skipped</th>
                <th>Failures</th>
                <th>Review</th>
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
                    <td>{formatNumber(run.borrowersProcessed)}</td>
                    <td>{formatNumber(run.messagesSent)}</td>
                    <td>{formatNumber(run.skippedBorrowers)}</td>
                    <td>{formatNumber(run.failed)}</td>
                    <td>{formatNumber(run.reviewRequired)}</td>
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
