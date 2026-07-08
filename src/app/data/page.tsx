import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { AreaTrend, BarMeterList, FlowRibbon, ProgressBar } from "@/components/ui/TremorPrimitives";
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
      <div className="mb-8">
        <FlowRibbon
          steps={[
            { label: "Step 1", value: "Connect data", tone: "green" },
            { label: "Step 2", value: "Validate fields", tone: "green" },
            { label: "Step 3", value: "Apply policies", tone: "amber" },
            { label: "Step 4", value: "Clear approvals", tone: "red" }
          ]}
        />
      </div>
      <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader title="Data sources" eyebrow="Customer and outcomes data" />
          <div className="space-y-3">
            {dataSources.map((source) => (
              <div key={source.id} className="rounded-xl border border-line p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{source.name}</p>
                  <p className="mt-1 text-sm text-muted">{source.type} - {formatNumber(source.records)} records - {source.lastSync}</p>
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
                <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{pack.name}</p>
                  <p className="mt-1 text-sm text-muted">{pack.jurisdiction} - {pack.rules} rules - {pack.updatedAt}</p>
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
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <AreaTrend label="Validation quality" tone="green" values={[72, 78, 81, 86, 84, 91, 93, 88]} />
          <BarMeterList
            tone="amber"
            items={[
              { label: "Passed checks", value: 92, helper: String(validationReport.passed) },
              { label: "Warnings", value: 24, helper: String(validationReport.warnings) },
              { label: "Blockers", value: 12, helper: String(validationReport.blockers.length) }
            ]}
          />
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
