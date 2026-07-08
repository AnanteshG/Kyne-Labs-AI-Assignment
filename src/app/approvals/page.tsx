import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { approvalTone, riskTone } from "@/components/ui/Status";
import { approvals, hands } from "@/server/mock-db";

export default function ApprovalsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Approvals"
        title="Trust gates before live customer contact"
        description="Review pending message, policy, and launch decisions."
      />
      <div className="grid gap-6">
        {approvals.map((approval) => {
          const hand = hands.find((item) => item.id === approval.handId);
          return (
            <Card key={approval.id}>
              <CardHeader title={approval.title} eyebrow={hand?.name} action={<Badge tone={approvalTone(approval.status)}>{approval.status.replace(/_/g, " ")}</Badge>} />
              <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-sm leading-6 text-slate-600">{approval.reason}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge tone={riskTone(approval.risk)}>{approval.risk} risk</Badge>
                    <Badge tone="neutral">{approval.reviewerRole}</Badge>
                    <Badge tone="info">{approval.requestedAt}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary">Request changes</Button>
                  <Button>Approve</Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
