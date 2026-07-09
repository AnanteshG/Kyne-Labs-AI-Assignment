import { AppShell } from "@/components/shell/AppShell";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { approvalTone, riskTone } from "@/components/ui/Status";
import { AreaTrend, BarMeterList } from "@/components/ui/TremorPrimitives";
import { approvals, hands, simulationReports, simulationVariants } from "@/server/mock-db";

export default function ApprovalsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Approvals"
        title="Trust gates before borrower-facing action"
        description="Compliance reviews message copy, policy checks, affected borrower segment, AI rationale, and approval risk before execution."
      />
      <div className="mb-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <AreaTrend label="Approval pressure" tone="amber" values={[16, 18, 21, 19, 24, 28, 26, 31]} />
        <Card>
          <CardHeader title="Risk mix" eyebrow="Pending gates" />
          <BarMeterList
            tone="amber"
            items={[
              { label: "High risk", value: approvals.filter((approval) => approval.risk === "high").length * 50, helper: "Needs compliance" },
              { label: "Medium risk", value: approvals.filter((approval) => approval.risk === "medium").length * 50, helper: "Policy review" },
              { label: "Low risk", value: approvals.filter((approval) => approval.risk === "low").length * 50, helper: "Standard review" }
            ]}
          />
        </Card>
      </div>
      <div className="grid gap-6">
        {approvals.map((approval) => {
          const hand = hands.find((item) => item.id === approval.handId);
          const report = simulationReports.find((item) => item.id === approval.simulationReportId);
          const approvalVersion = approval.handVersionId ?? "v4";
          const policyVersion = approval.policyPackId === "pp2" ? "v12" : approval.policyPackId ?? "v12";
          return (
            <Card key={approval.id}>
              <CardHeader title={approval.title} eyebrow={hand?.name} action={<Badge tone={approvalTone(approval.status)}>{approval.status.replace(/_/g, " ")}</Badge>} />
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="min-w-0">
                  <p className="text-sm leading-6 text-slate-600">{approval.reason}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge tone={riskTone(approval.risk)}>{approval.risk} risk</Badge>
                    <Badge tone="neutral">{approval.reviewerRole}</Badge>
                    <Badge tone="info">{approval.requestedAt}</Badge>
                  </div>
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-line bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">Borrower segment affected</p>
                      <p className="mt-2 text-sm font-semibold text-ink">{approval.segmentAffected}</p>
                    </div>
                    <div className="rounded-xl border border-line bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">Risk summary</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{approval.riskSummary}</p>
                    </div>
                  </div>
                  <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">AI rationale</p>
                    <p className="mt-2 text-sm leading-6 text-blue-900">{approval.aiRationale}</p>
                  </div>
                  <div className="mt-5 rounded-xl border border-line bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">Pre-flight Simulation Summary</p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">Simulation attached to Hand Version {approvalVersion} and Policy Pack {policyVersion}. This approval applies only to this version.</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      <li>• {report?.totalBorrowers.toLocaleString() ?? "2,430"} borrowers targeted</li>
                      <li>• {report?.eligibleBorrowers.toLocaleString() ?? "2,118"} eligible after policy checks</li>
                      <li>• {report?.blockedBorrowers.toLocaleString() ?? "312"} blocked before execution</li>
                      <li>• {report?.blockedBreakdown.policyBlocked ?? 0} high-severity policy violations</li>
                      <li>• Expected recovery: {report ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(report.expectedRecoveryAmount) : "$184K"}</li>
                      <li>• Promise-to-pay estimate: {report?.expectedPromiseToPayRate ?? 18}%</li>
                      <li>• Opt-out risk: {report?.optOutRisk ? report.optOutRisk.charAt(0).toUpperCase() + report.optOutRisk.slice(1) : "Low"}</li>
                      <li>• Complaint risk: {report?.complaintRisk ? report.complaintRisk.charAt(0).toUpperCase() + report.complaintRisk.slice(1) : "Medium"}</li>
                      <li>• Recommendation: Approve with SMS-first payment-plan variant</li>
                    </ul>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[560px] text-left text-sm">
                        <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
                          <tr>
                            <th className="py-3">Variant</th>
                            <th>Channel order</th>
                            <th className="text-right">Recovery</th>
                            <th>Risk</th>
                            <th>Decision</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {simulationVariants.map((variant) => (
                            <tr key={variant.id}>
                              <td className="py-3 font-semibold text-ink">{variant.name}</td>
                              <td>{variant.channelOrder}</td>
                              <td className="text-right">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(variant.expectedRecoveryAmount)}</td>
                              <td><Badge tone={variant.riskLevel === "very low" ? "success" : variant.riskLevel === "low" ? "success" : variant.riskLevel === "medium" ? "warning" : "danger"}>{variant.riskLevel}</Badge></td>
                              <td>{variant.decision}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-line bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">Message preview</p>
                  <p className="mt-2 rounded-lg bg-white p-3 text-sm leading-6 text-slate-700">{approval.messagePreview}</p>
                  <div className="mt-4 space-y-2">
                    {approval.policyChecks.map((check) => (
                      <div key={check.label} className="rounded-lg border border-line bg-white p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-ink">{check.label}</p>
                          <Badge tone={check.result === "ready" ? "success" : check.result === "blocked" ? "danger" : "warning"}>{check.result}</Badge>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-muted">{check.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href="/workspace"><Button variant="secondary">Request changes</Button></Link>
                    <Button variant="danger">Reject</Button>
                    <Link href="/runs/r1"><Button>Approve</Button></Link>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
