import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge, readinessTone } from "@/components/ui/Status";
import { dataSources, policyPacks, validationReport } from "@/server/mock-db";
import { formatNumber } from "@/lib/utils";

export default function DataPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Data & policies hub"
        title="One readiness gate for files, connectors, knowledge, consent, and policy packs"
        description="Screenshots show integrations, templates, knowledge base, settings, and audit as separate surfaces. This hub turns them into a clear pre-flight path."
        actions={
        <Button>Run validation</Button>
        }
      />
      <div className="mb-6 grid gap-3 md:grid-cols-4">
        {["Connect data", "Validate fields", "Apply policies", "Clear approvals"].map((step, index) => (
          <div key={step} className={`rounded-lg border p-4 ${index < 2 ? "border-emerald-200 bg-emerald-50" : index === 2 ? "border-amber-200 bg-amber-50" : "border-orange-200 bg-orange-50"}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Step {index + 1}</p>
            <p className="mt-1 font-semibold text-ink">{step}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader title="Data sources" eyebrow="Customer and outcomes data" />
          <div className="space-y-3">
            {dataSources.map((source) => (
              <div key={source.id} className="flex items-center justify-between gap-4 rounded-md border border-line p-4">
                <div>
                  <p className="font-semibold text-ink">{source.name}</p>
                  <p className="mt-1 text-sm text-muted">{source.type} · {formatNumber(source.records)} records · {source.lastSync}</p>
                </div>
                <StatusBadge label={source.status} tone={readinessTone(source.status)} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Policy packs" eyebrow="Rules and governance" />
          <div className="space-y-3">
            {policyPacks.map((pack) => (
              <div key={pack.id} className="flex items-center justify-between gap-4 rounded-md border border-line p-4">
                <div>
                  <p className="font-semibold text-ink">{pack.name}</p>
                  <p className="mt-1 text-sm text-muted">{pack.jurisdiction} · {pack.rules} rules · {pack.updatedAt}</p>
                </div>
                <StatusBadge label={pack.status} tone={readinessTone(pack.status)} />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader title="Latest validation report" eyebrow={validationReport.checkedAt} action={<Badge tone="warning">Review needed</Badge>} />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-md bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">Passed checks</p>
            <p className="mt-2 text-2xl font-semibold">{validationReport.passed}</p>
          </div>
          <div className="rounded-md bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">Warnings</p>
            <p className="mt-2 text-2xl font-semibold">{validationReport.warnings}</p>
          </div>
          <div className="rounded-md bg-orange-50 p-4">
            <p className="text-sm font-semibold text-orange-900">Blockers</p>
            <p className="mt-2 text-2xl font-semibold">{validationReport.blockers.length}</p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {validationReport.blockers.map((blocker) => (
            <div key={blocker.id} className="rounded-md border border-orange-200 bg-orange-50 p-4">
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
