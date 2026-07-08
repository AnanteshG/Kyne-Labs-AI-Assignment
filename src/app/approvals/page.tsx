import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { approvalTone, riskTone } from "@/components/ui/Status";
import { approvals, hands } from "@/server/mock-db";

export default function ApprovalsPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted">Approvals</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Review trust gates before live customer contact</h1>
      </div>
      <div className="grid gap-4">
        {approvals.map((approval) => {
          const hand = hands.find((item) => item.id === approval.handId);
          return (
            <Card key={approval.id}>
              <CardHeader title={approval.title} eyebrow={hand?.name} action={<Badge tone={approvalTone(approval.status)}>{approval.status.replace(/_/g, " ")}</Badge>} />
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
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
