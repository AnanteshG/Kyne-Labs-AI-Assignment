import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { approvalTone, handTone, riskTone } from "@/components/ui/Status";
import { approvals, hands } from "@/server/mock-db";

const lifecycle = ["draft", "governance_review", "approved", "running", "complete"];

export default function HandDetailPage({ params }: { params: { id: string } }) {
  const hand = hands.find((item) => item.id === params.id);
  if (!hand) notFound();
  const handApprovals = approvals.filter((approval) => approval.handId === hand.id);
  const currentIndex = lifecycle.indexOf(hand.status);

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">Hand detail</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">{hand.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/approvals"><Button variant="secondary">Open approvals</Button></Link>
          <Link href="/runs/r1"><Button>Monitor run</Button></Link>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader title="Lifecycle" eyebrow="Controlled publish path" action={<Badge tone={handTone(hand.status)}>{hand.status.replace(/_/g, " ")}</Badge>} />
          <div className="grid gap-3 md:grid-cols-5">
            {lifecycle.map((step, index) => (
              <div key={step} className={`rounded-md border p-3 ${index <= currentIndex ? "border-blue-200 bg-blue-50" : "border-line bg-white"}`}>
                <p className="text-sm font-semibold capitalize text-ink">{step.replace(/_/g, " ")}</p>
                <p className="mt-1 text-xs text-muted">{index <= currentIndex ? "Reached" : "Waiting"}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-md border border-line p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Audience</p>
              <p className="mt-2 font-semibold text-ink">{hand.audience}</p>
            </div>
            <div className="rounded-md border border-line p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Channels</p>
              <p className="mt-2 font-semibold text-ink">{hand.channels.join(", ")}</p>
            </div>
            <div className="rounded-md border border-line p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Risk</p>
              <div className="mt-2"><Badge tone={riskTone(hand.risk)}>{hand.risk}</Badge></div>
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader title="Approval gates" eyebrow="Trust before contact" />
          <div className="space-y-3">
            {handApprovals.map((approval) => (
              <div key={approval.id} className="rounded-md border border-line p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-ink">{approval.title}</p>
                  <Badge tone={approvalTone(approval.status)}>{approval.status.replace(/_/g, " ")}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{approval.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader title="Outbound preview" eyebrow="Customer-facing content" />
        <div className="rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          Hi Jordan, this is a reminder from your bank. Your account is 42 days past due. You can review payment options using your secure link. Reply STOP to opt out.
        </div>
      </Card>
    </AppShell>
  );
}
