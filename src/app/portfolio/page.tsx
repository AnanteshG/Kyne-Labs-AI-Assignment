import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Card, CardHeader } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { hands, portfolio } from "@/server/mock-db";

export default function PortfolioPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Portfolio command center"
        title="Collections health, governed actions, and AI recommendations in one operating view"
        description="The current platform spreads this across overview, communication, payment, dashboard, and bucket pages. This cockpit keeps the portfolio first and gives operators a clear next move."
        actions={
        <Link href="/workspace">
          <Button>Ask coworker to build a hand</Button>
        </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Metric accent="blue" label="Accounts" value={formatNumber(portfolio.totalAccounts)} helper="Active customer portfolio" />
        <Metric label="Total exposure" value={formatCurrency(portfolio.totalExposure)} helper="Across all buckets" />
        <Metric accent="orange" label="At-risk exposure" value={formatCurrency(portfolio.atRiskExposure)} helper="Needs governed outreach" />
        <Metric accent="green" label="Promise-to-pay" value={formatPercent(portfolio.promiseToPayRate)} helper="Last 14 days" />
        <Metric accent="amber" label="Contactable" value={formatPercent(portfolio.contactableRate)} helper="Consent valid or reviewable" />
      </div>

      <Card className="mt-6 border-blue-200 bg-blue-50/50">
        <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Today&apos;s operating brief</p>
            <h2 className="mt-2 text-xl font-semibold text-ink">30-59 DPD is improving, but voice fallback is blocked by consent policy.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Prioritize SMS/email follow-up for contactable customers and route voice exceptions through compliance before the next run.
            </p>
          </div>
          <div className="grid gap-2">
            <Link href="/data"><Button variant="secondary" className="w-full">Resolve readiness blockers</Button></Link>
            <Link href="/runs/r1"><Button variant="ghost" className="w-full">Review paused run</Button></Link>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader title="Delinquency buckets" eyebrow="Portfolio" description="Buckets are action lanes, not just reporting rows." />
          <div className="grid gap-3">
            {portfolio.delinquencyBuckets.map((bucket, index) => (
              <Link key={bucket.label} href="/workspace" className="rounded-lg border border-line bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50/40">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{bucket.label}</p>
                    <p className="mt-1 text-sm text-muted">{formatNumber(bucket.accounts)} accounts · {formatCurrency(bucket.exposure)} exposure</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-44 rounded-full bg-slate-100">
                      <div className={`h-2 rounded-full ${index === 0 ? "bg-forest" : index === 1 ? "bg-cobalt" : index === 2 ? "bg-clay" : "bg-danger"}`} style={{ width: `${Math.min(95, 38 + index * 16)}%` }} />
                    </div>
                    <span className={bucket.trend < 0 ? "text-sm font-semibold text-success" : "text-sm font-semibold text-danger"}>
                      {bucket.trend > 0 ? "+" : ""}{bucket.trend}%
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="What changed since last run" eyebrow="Coworker brief" description="Replaces disconnected dashboard widgets with an operator-ready summary." />
          <div className="space-y-3">
            {portfolio.changedSinceLastRun.map((item) => (
              <div key={item} className="rounded-lg border border-line bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader title="Governance readiness" eyebrow="Before customer contact" description="The old settings/audit areas become visible pre-flight gates." />
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
          <CardHeader title="Active Banking Hands" eyebrow="Execution pipeline" description="Workflows and agents are merged into one lifecycle object." />
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
