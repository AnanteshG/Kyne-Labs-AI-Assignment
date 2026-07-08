import { AppShell } from "@/components/shell/AppShell";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { approvalTone, riskTone } from "@/components/ui/Status";
import { AreaTrend, BarMeterList } from "@/components/ui/TremorPrimitives";
import { approvals, hands } from "@/server/mock-db";

export default function ApprovalsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Approvals"
        title="Trust gates before live customer contact"
        description="Review pending message, policy, and launch decisions."
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
          return (
            <Card key={approval.id}>
              <CardHeader title={approval.title} eyebrow={hand?.name} action={<Badge tone={approvalTone(approval.status)}>{approval.status.replace(/_/g, " ")}</Badge>} />
              <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div className="min-w-0">
                  <p className="text-sm leading-6 text-slate-600">{approval.reason}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge tone={riskTone(approval.risk)}>{approval.risk} risk</Badge>
                    <Badge tone="neutral">{approval.reviewerRole}</Badge>
                    <Badge tone="info">{approval.requestedAt}</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/workspace"><Button variant="secondary">Request changes</Button></Link>
                  <Link href="/runs/r1"><Button>Approve</Button></Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
