import { CheckCircle2, Clock3, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { PageHeader } from "@/components/ui/PageHeader";
import { approvalTone, riskTone } from "@/components/ui/Status";
import { approvals, hands, simulationReports } from "@/server/mock-db";

const money = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency"
});

function statusLabel(value: string) {
  return value.replace(/_/g, " ");
}

export default function ApprovalsPage() {
  const pending = approvals.filter((approval) => approval.status === "pending").length;
  const approved = approvals.filter((approval) => approval.status === "approved").length;
  const highRisk = approvals.filter((approval) => approval.risk === "high").length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Approvals"
        title="Review queue"
        description="Approve, reject, or request changes before borrower-facing actions run."
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Metric label="Pending" value={String(pending)} helper="Needs decision" accent="amber" />
        <Metric label="High risk" value={String(highRisk)} helper="Review first" accent="orange" />
        <Metric label="Approved" value={String(approved)} helper="Ready gates" accent="green" />
      </div>

      <div className="grid gap-4">
        {approvals.map((approval) => {
          const hand = hands.find((item) => item.id === approval.handId);
          const report = simulationReports.find((item) => item.id === approval.simulationReportId);
          const blockedCount = approval.policyChecks.filter((check) => check.result === "blocked").length;
          const reviewCount = approval.policyChecks.filter((check) => check.result === "review").length;
          const readyCount = approval.policyChecks.filter((check) => check.result === "ready").length;

          return (
            <Card key={approval.id} className="p-4 sm:p-5">
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
                <div className="min-w-0">
                  <CardHeader
                    title={approval.title}
                    eyebrow={hand?.name}
                    action={
                      <div className="flex flex-wrap gap-2">
                        <Badge tone={riskTone(approval.risk)}>{approval.risk} risk</Badge>
                        <Badge tone={approvalTone(approval.status)}>{statusLabel(approval.status)}</Badge>
                      </div>
                    }
                  />

                  <div className="grid gap-3 md:grid-cols-4">
                    <div className="rounded-md border border-line bg-slate-50 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Segment</p>
                      <p className="mt-1 text-sm font-semibold text-ink">{approval.segmentAffected}</p>
                    </div>
                    <div className="rounded-md border border-line bg-slate-50 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Requested</p>
                      <p className="mt-1 text-sm font-semibold text-ink">{approval.requestedAt}</p>
                    </div>
                    <div className="rounded-md border border-line bg-slate-50 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Policy</p>
                      <p className="mt-1 text-sm font-semibold text-ink">{readyCount} ready / {reviewCount + blockedCount} open</p>
                    </div>
                    <div className="rounded-md border border-line bg-slate-50 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Recovery</p>
                      <p className="mt-1 text-sm font-semibold text-ink">{report ? money.format(report.expectedRecoveryAmount) : "Not simulated"}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {approval.policyChecks.map((check) => (
                      <Badge key={check.label} tone={check.result === "ready" ? "success" : check.result === "blocked" ? "danger" : "warning"}>
                        {check.label}: {check.result}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px]">
                    <div className="rounded-md border border-line bg-white p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Message</p>
                      <p className="mt-1 truncate text-sm text-slate-700">{approval.messagePreview}</p>
                    </div>
                    <div className="rounded-md border border-line bg-white p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Decision note</p>
                      <p className="mt-1 text-sm text-slate-700">{approval.riskSummary}</p>
                    </div>
                  </div>
                </div>

                <aside className="rounded-md border border-line bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink">Review action</p>
                    {approval.status === "approved" ? (
                      <CheckCircle2 className="text-emerald-600" size={18} />
                    ) : approval.risk === "high" ? (
                      <ShieldAlert className="text-red-600" size={18} />
                    ) : (
                      <Clock3 className="text-amber-600" size={18} />
                    )}
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Eligible</dt>
                      <dd className="mt-1 font-semibold text-ink">{report?.eligibleBorrowers.toLocaleString() ?? "--"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Blocked</dt>
                      <dd className="mt-1 font-semibold text-ink">{report?.blockedBorrowers.toLocaleString() ?? "--"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Opt-out</dt>
                      <dd className="mt-1 font-semibold capitalize text-ink">{report?.optOutRisk ?? "--"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Complaint</dt>
                      <dd className="mt-1 font-semibold capitalize text-ink">{report?.complaintRisk ?? "--"}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 grid gap-2">
                    <Link href="/runs/r1">
                      <Button className="w-full">Approve</Button>
                    </Link>
                    <Link href="/workspace">
                      <Button variant="secondary" className="w-full">Request changes</Button>
                    </Link>
                    <Button variant="ghost" className="w-full">Reject</Button>
                  </div>
                </aside>
              </div>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
