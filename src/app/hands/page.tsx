import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { handTone, riskTone } from "@/components/ui/Status";
import { hands } from "@/server/mock-db";

export default function HandsPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted">Banking Hands</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Lifecycle of autonomous regulated work</h1>
      </div>
      <Card>
        <CardHeader title="All hands" eyebrow="Drafts, approvals, and live operations" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
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
                  <td className="py-4">
                    <Link href={`/hands/${hand.id}`} className="font-semibold text-blue-700">{hand.name}</Link>
                    <p className="mt-1 text-xs text-muted">{hand.audience} · {hand.channels.join(", ")}</p>
                  </td>
                  <td>{hand.mode.replace(/_/g, " ")}</td>
                  <td><Badge tone={handTone(hand.status)}>{hand.status.replace(/_/g, " ")}</Badge></td>
                  <td><Badge tone={riskTone(hand.risk)}>{hand.risk}</Badge></td>
                  <td>{hand.approvalsResolved}/{hand.approvalsRequired}</td>
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
