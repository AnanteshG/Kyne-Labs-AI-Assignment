import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { handTone, riskTone } from "@/components/ui/Status";
import { hands } from "@/server/mock-db";

export default function HandsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Banking Hands"
        title="Lifecycle of regulated customer operations"
        description="Track each hand from draft to review, approval, execution, and completion."
      />
      <Card>
        <CardHeader title="All hands" eyebrow="Drafts, approvals, and live operations" />
        <div className="grid gap-4 md:hidden">
          {hands.map((hand) => (
            <Link key={hand.id} href={`/hands/${hand.id}`} className="rounded-xl border border-line p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-blue-700">{hand.name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{hand.audience} · {hand.channels.join(", ")}</p>
                </div>
                <Badge tone={riskTone(hand.risk)}>{hand.risk}</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone={handTone(hand.status)}>{hand.status.replace(/_/g, " ")}</Badge>
                <Badge tone="neutral">{hand.approvalsResolved}/{hand.approvalsRequired} approvals</Badge>
              </div>
              <p className="mt-4 text-sm font-semibold text-ink">{hand.nextAction}</p>
            </Link>
          ))}
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-[920px] w-full text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-3">Hand</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Risk</th>
                <th>Approvals</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {hands.map((hand) => (
                <tr key={hand.id}>
                  <td className="py-5 pr-6">
                    <Link href={`/hands/${hand.id}`} className="font-semibold text-blue-700">{hand.name}</Link>
                    <p className="mt-1 text-xs text-muted">{hand.audience} · {hand.channels.join(", ")}</p>
                  </td>
                  <td className="pr-6 capitalize">{hand.mode.replace(/_/g, " ")}</td>
                  <td className="pr-6"><Badge tone={handTone(hand.status)}>{hand.status.replace(/_/g, " ")}</Badge></td>
                  <td className="pr-6"><Badge tone={riskTone(hand.risk)}>{hand.risk}</Badge></td>
                  <td className="pr-6">{hand.approvalsResolved}/{hand.approvalsRequired}</td>
                  <td className="font-semibold text-ink">{hand.nextAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
