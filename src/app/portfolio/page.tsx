import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Card, CardHeader } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { hands, portfolio } from "@/server/mock-db";

export default function PortfolioPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">Portfolio command center</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">Collections health and next governed actions</h1>
        </div>
        <Link href="/workspace">
          <Button>Ask coworker to build a hand</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Metric label="Accounts" value={formatNumber(portfolio.totalAccounts)} helper="Active customer portfolio" />
        <Metric label="Total exposure" value={formatCurrency(portfolio.totalExposure)} helper="Across all buckets" />
        <Metric label="At-risk exposure" value={formatCurrency(portfolio.atRiskExposure)} helper="Needs governed outreach" />
        <Metric label="Promise-to-pay" value={formatPercent(portfolio.promiseToPayRate)} helper="Last 14 days" />
        <Metric label="Contactable" value={formatPercent(portfolio.contactableRate)} helper="Consent valid or reviewable" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader title="Delinquency buckets" eyebrow="Portfolio" />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="py-3">Bucket</th>
                  <th>Accounts</th>
                  <th>Exposure</th>
                  <th>Trend</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {portfolio.delinquencyBuckets.map((bucket) => (
                  <tr key={bucket.label}>
                    <td className="py-4 font-semibold text-ink">{bucket.label}</td>
                    <td>{formatNumber(bucket.accounts)}</td>
                    <td>{formatCurrency(bucket.exposure)}</td>
                    <td className={bucket.trend < 0 ? "text-success" : "text-danger"}>{bucket.trend > 0 ? "+" : ""}{bucket.trend}%</td>
                    <td>
                      <Link href="/workspace" className="font-semibold text-blue-700">Create hand</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="What changed since last run" eyebrow="Coworker brief" />
          <div className="space-y-3">
            {portfolio.changedSinceLastRun.map((item) => (
              <div key={item} className="rounded-md border border-line bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader title="Governance readiness" eyebrow="Before customer contact" />
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md bg-emerald-50 p-3">
              <span className="font-semibold text-emerald-800">Customer data</span>
              <Badge tone="success">Ready</Badge>
            </div>
            <div className="flex items-center justify-between rounded-md bg-amber-50 p-3">
              <span className="font-semibold text-amber-900">Quiet-hour policies</span>
              <Badge tone="warning">Review</Badge>
            </div>
            <div className="flex items-center justify-between rounded-md bg-orange-50 p-3">
              <span className="font-semibold text-orange-900">Voice consent</span>
              <Badge tone="danger">Blocked</Badge>
            </div>
          </div>
          <Link href="/data" className="mt-5 block">
            <Button variant="secondary" className="w-full">Open data and policies</Button>
          </Link>
        </Card>

        <Card>
          <CardHeader title="Active Banking Hands" eyebrow="Execution pipeline" />
          <div className="grid gap-3 md:grid-cols-3">
            {hands.map((hand) => (
              <Link key={hand.id} href={`/hands/${hand.id}`} className="rounded-md border border-line p-4 transition hover:border-slate-400 hover:bg-slate-50">
                <Badge tone={hand.status === "approved" ? "success" : hand.status === "draft" ? "neutral" : "warning"}>
                  {hand.status.replace(/_/g, " ")}
                </Badge>
                <p className="mt-3 font-semibold text-ink">{hand.name}</p>
                <p className="mt-2 text-sm text-muted">{hand.nextAction}</p>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
