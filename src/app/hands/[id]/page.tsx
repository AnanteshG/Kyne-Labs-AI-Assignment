import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { approvalTone, handTone, riskTone } from "@/components/ui/Status";
import { AreaTrend, FlowRibbon } from "@/components/ui/TremorPrimitives";
import { approvals, hands } from "@/server/mock-db";

const lifecycle = ["draft", "governance_review", "approved", "running", "complete"];

export default function HandDetailPage({ params }: { params: { id: string } }) {
  const hand = hands.find((item) => item.id === params.id);
  if (!hand) notFound();
  const handApprovals = approvals.filter((approval) => approval.handId === hand.id);
  const currentIndex = lifecycle.indexOf(hand.status);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Hand detail"
        title={hand.name}
        description="Review audience, channels, approvals, message content, and execution readiness."
        actions={<div className="flex flex-wrap gap-2">
          <Link href="/approvals"><Button variant="secondary">Open approvals</Button></Link>
          <Link href="/runs/r1"><Button>Monitor run</Button></Link>
        </div>}
      />
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader title="Lifecycle" eyebrow="Controlled publish path" action={<Badge tone={handTone(hand.status)}>{hand.status.replace(/_/g, " ")}</Badge>} />
          <FlowRibbon
            steps={lifecycle.slice(0, 4).map((step, index) => ({
              label: step.replace(/_/g, " "),
              value: index <= currentIndex ? "Reached" : "Waiting",
              tone: index <= currentIndex ? "blue" : "amber"
            }))}
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-line p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Audience</p>
              <p className="mt-2 font-semibold text-ink">{hand.audience}</p>
            </div>
            <div className="rounded-xl border border-line p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Channels</p>
              <p className="mt-2 font-semibold text-ink">{hand.channels.join(", ")}</p>
            </div>
            <div className="rounded-xl border border-line p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Risk</p>
              <div className="mt-2"><Badge tone={riskTone(hand.risk)}>{hand.risk}</Badge></div>
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader title="Approval gates" eyebrow="Trust before contact" />
          <div className="mb-5">
            <AreaTrend label="Governance confidence" tone="green" values={[46, 52, 57, 61, 69, 72, 78, hand.approvalsResolved === hand.approvalsRequired ? 88 : 74]} />
          </div>
          <div className="space-y-4">
            {handApprovals.map((approval) => (
              <div key={approval.id} className="rounded-xl border border-line p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-ink">{approval.title}</p>
                  <Badge tone={approvalTone(approval.status)}>{approval.status.replace(/_/g, " ")}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{approval.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader title="Outbound preview" eyebrow="Customer-facing content" />
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="rounded-xl bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            Hi Jordan, this is a reminder from your bank. Your account is 42 days past due. You can review payment options using your secure link. Reply STOP to opt out.
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-950">Review note</p>
            <p className="mt-2 text-sm leading-6 text-amber-900">Includes opt-out language and avoids threat language. Needs compliance sign-off before publishing.</p>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
