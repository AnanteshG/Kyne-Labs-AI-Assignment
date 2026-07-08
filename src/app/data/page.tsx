import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/TremorPrimitives";
import { StatusBadge, readinessTone } from "@/components/ui/Status";
import { dataSources, policyPacks, validationReport } from "@/server/mock-db";
import { formatNumber } from "@/lib/utils";

export default function DataPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Data & policies hub"
        title="Readiness for customer contact"
        description="Review connected data, policy coverage, validation results, and blockers before any hand can run."
        actions={
        <Button>Run validation</Button>
        }
      />
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        {["Connect data", "Validate fields", "Apply policies", "Clear approvals"].map((step, index) => (
          <div key={step} className={`rounded-xl border bg-white p-5 shadow-tremor ${index < 2 ? "border-emerald-200" : index === 2 ? "border-amber-200" : "border-red-200"}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Step {index + 1}</p>
            <p className="mt-2 font-semibold text-ink">{step}</p>
            <div className="mt-4">
              <ProgressBar value={index < 2 ? 100 : index === 2 ? 68 : 38} tone={index < 2 ? "green" : index === 2 ? "amber" : "red"} />
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader title="Data sources" eyebrow="Customer and outcomes data" />
          <div className="space-y-3">
            {dataSources.map((source) => (
              <div key={source.id} className="rounded-xl border border-line p-5">
                <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="font-semibold text-ink">{source.name}</p>
                  <p className="mt-1 text-sm text-muted">{source.type} · {formatNumber(source.records)} records · {source.lastSync}</p>
                </div>
                <StatusBadge label={source.status} tone={readinessTone(source.status)} />
                </div>
                <div className="mt-4">
                  <ProgressBar value={source.status === "ready" ? 100 : 72} tone={source.status === "ready" ? "green" : "amber"} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Policy packs" eyebrow="Rules and governance" />
          <div className="space-y-3">
            {policyPacks.map((pack) => (
              <div key={pack.id} className="rounded-xl border border-line p-5">
                <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="font-semibold text-ink">{pack.name}</p>
                  <p className="mt-1 text-sm text-muted">{pack.jurisdiction} · {pack.rules} rules · {pack.updatedAt}</p>
                </div>
                <StatusBadge label={pack.status} tone={readinessTone(pack.status)} />
                </div>
                <div className="mt-4">
                  <ProgressBar value={pack.status === "ready" ? 100 : pack.status === "review" ? 64 : 28} tone={pack.status === "ready" ? "green" : pack.status === "review" ? "amber" : "red"} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader title="Latest validation report" eyebrow={validationReport.checkedAt} action={<Badge tone="warning">Review needed</Badge>} />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-emerald-200 bg-white p-5">
            <p className="text-sm font-semibold text-emerald-800">Passed checks</p>
            <p className="mt-2 text-2xl font-semibold">{validationReport.passed}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-white p-5">
            <p className="text-sm font-semibold text-amber-900">Warnings</p>
            <p className="mt-2 text-2xl font-semibold">{validationReport.warnings}</p>
          </div>
          <div className="rounded-xl border border-red-200 bg-white p-5">
            <p className="text-sm font-semibold text-red-700">Blockers</p>
            <p className="mt-2 text-2xl font-semibold">{validationReport.blockers.length}</p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {validationReport.blockers.map((blocker) => (
            <div key={blocker.id} className="rounded-xl border border-orange-200 bg-orange-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-orange-950">{blocker.label}</p>
                <Badge tone="danger">{blocker.owner}</Badge>
              </div>
              <p className="mt-2 text-sm leading-6 text-orange-900">{blocker.detail}</p>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
