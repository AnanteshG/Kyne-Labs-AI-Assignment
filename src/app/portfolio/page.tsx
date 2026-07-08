import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Card, CardHeader } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { AreaTrend, BarMeterList, Delta, DonutMeter, FlowRibbon, MiniSparkline, ProgressBar } from "@/components/ui/TremorPrimitives";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { hands, portfolio } from "@/server/mock-db";

export default function PortfolioPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Portfolio command center"
        title="Collections health and governed next actions"
        description="Track risk movement, readiness blockers, active hands, and customer outcomes from one operating view."
        actions={
        <Link href="/workspace">
          <Button>Ask coworker to build a hand</Button>
        </Link>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <Metric accent="blue" label="Accounts" value={formatNumber(portfolio.totalAccounts)} helper="Active customers" />
        <Metric label="Exposure" value={formatCurrency(portfolio.totalExposure)} helper="Total outstanding" />
        <Metric accent="orange" label="At risk" value={formatCurrency(portfolio.atRiskExposure)} helper="Needs outreach" />
        <Metric accent="green" label="Promise-to-pay" value={formatPercent(portfolio.promiseToPayRate)} helper="Last 14 days" />
        <Metric accent="amber" label="Contactable" value={formatPercent(portfolio.contactableRate)} helper="Consent valid" />
      </div>

      <Card className="mt-8 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-white">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Today&apos;s brief</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">30-59 DPD is improving. Voice fallback needs consent review.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Prioritize SMS/email follow-up for contactable customers and route voice exceptions through compliance before the next run.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-blue-100 bg-white p-4">
                <p className="text-xs text-muted">Recovered exposure</p>
                <p className="mt-2 text-xl font-semibold text-ink">$1.9M</p>
              </div>
              <div className="rounded-xl border border-blue-100 bg-white p-4">
                <p className="text-xs text-muted">Policy suppressions</p>
                <p className="mt-2 text-xl font-semibold text-ink">713</p>
              </div>
              <div className="rounded-xl border border-blue-100 bg-white p-4">
                <p className="text-xs text-muted">Next queue</p>
                <p className="mt-2 text-xl font-semibold text-ink">Approvals</p>
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <AreaTrend label="Exposure recovery" tone="green" values={[42, 44, 49, 47, 55, 58, 64, 71]} />
            <Link href="/data"><Button variant="secondary" className="w-full">Resolve readiness blockers</Button></Link>
            <Link href="/runs/r1"><Button variant="ghost" className="w-full">Review paused run</Button></Link>
          </div>
        </div>
      </Card>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader title="Delinquency movement" eyebrow="Portfolio" action={<Badge tone="info">June 1 - June 30</Badge>} />
          <div className="grid gap-4">
            {portfolio.delinquencyBuckets.map((bucket, index) => (
              <Link key={bucket.label} href="/workspace" className="rounded-xl border border-line bg-white p-5 transition hover:border-blue-300 hover:bg-blue-50/40">
                <div className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,180px)_minmax(0,1fr)_auto] md:items-center">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{bucket.label}</p>
                    <p className="mt-1 text-sm text-muted">{formatNumber(bucket.accounts)} accounts - {formatCurrency(bucket.exposure)} exposure</p>
                  </div>
                  <ProgressBar value={Math.min(95, 38 + index * 16)} tone={index < 2 ? "blue" : index === 2 ? "amber" : "red"} />
                  <Delta value={bucket.trend} />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Recovery signal" eyebrow="Last run" />
          <DonutMeter value={84} label="Contactable portfolio">
            Consent coverage is high enough for SMS/email, with voice blocked until review.
          </DonutMeter>
          <div className="mt-6 rounded-xl border border-line bg-slate-50 p-4">
            <MiniSparkline />
          </div>
          <div className="mt-6 space-y-4">
            {portfolio.changedSinceLastRun.map((item) => (
              <div key={item} className="rounded-xl border border-line bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader title="Governance readiness" eyebrow="Before customer contact" />
          <BarMeterList
            tone="green"
            items={[
              { label: "Customer data", value: 100, helper: "Ready" },
              { label: "Quiet-hour policies", value: 68, helper: "Review" },
              { label: "Voice consent", value: 32, helper: "Blocked" }
            ]}
          />
          <Link href="/data" className="mt-5 block">
            <Button variant="secondary" className="w-full">Open data and policies</Button>
          </Link>
        </Card>

        <Card>
          <CardHeader title="Active Banking Hands" eyebrow="Execution pipeline" />
          <FlowRibbon
            steps={[
              { label: "Draft", value: "1 hand", tone: "blue" },
              { label: "Review", value: "1 gate", tone: "amber" },
              { label: "Approved", value: "1 hand", tone: "green" },
              { label: "Running", value: "1 run", tone: "blue" }
            ]}
          />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {hands.map((hand) => (
              <Link key={hand.id} href={`/hands/${hand.id}`} className="rounded-xl border border-line p-5 transition hover:border-slate-400 hover:bg-slate-50">
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
