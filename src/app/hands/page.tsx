import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { handTone, riskTone } from "@/components/ui/Status";
import { BarMeterList, FlowRibbon } from "@/components/ui/TremorPrimitives";
import { hands } from "@/server/mock-db";

export default function HandsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Banking Hands"
        title="Governed recovery playbooks"
        description="Track each hand from draft to review, approval, execution, and completion."
      />
      <div className="mb-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader title="Lifecycle distribution" eyebrow="Control path" />
          <FlowRibbon
            steps={[
              { label: "Draft", value: "1", tone: "blue" },
              { label: "Review", value: "1", tone: "amber" },
              { label: "Approved", value: "1", tone: "green" },
              { label: "Running", value: "1", tone: "blue" }
            ]}
          />
        </Card>
        <Card>
          <CardHeader title="Approval coverage" eyebrow="Open gates" />
          <BarMeterList
            tone="green"
            items={hands.map((hand) => ({
              label: hand.name,
              value: Math.round((hand.approvalsResolved / Math.max(hand.approvalsRequired, 1)) * 100),
              helper: `${hand.approvalsResolved}/${hand.approvalsRequired} approvals`
            }))}
          />
        </Card>
      </div>
      <Card>
        <CardHeader title="All hands" eyebrow="Drafts, approvals, and live operations" />
        <div className="grid gap-4 md:hidden">
          {hands.map((hand) => (
            <Link key={hand.id} href={`/hands/${hand.id}`} className="rounded-xl border border-line p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-blue-700">{hand.name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{hand.audience} - {hand.channels.join(", ")}</p>
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
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-3">Hand</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Target segment</th>
                <th>Channels</th>
                <th>Approval</th>
                <th>Last run outcome</th>
                <th>Owner</th>
                <th>Approvals</th>
                <th>Open</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {hands.map((hand) => (
                <tr key={hand.id}>
                  <td className="py-5 pr-6">
                    <Link href={`/hands/${hand.id}`} className="font-semibold text-blue-700">{hand.name}</Link>
                    <p className="mt-1 text-xs text-muted">{hand.audience} - {hand.channels.join(", ")}</p>
                  </td>
                  <td className="pr-6 capitalize">{hand.mode.replace(/_/g, " ")}</td>
                  <td className="pr-6"><Badge tone={handTone(hand.status)}>{hand.status.replace(/_/g, " ")}</Badge></td>
                  <td className="pr-6 text-slate-700">{hand.targetSegment}</td>
                  <td className="pr-6 text-slate-700">{hand.channels.join(" -> ")}</td>
                  <td className="pr-6"><Badge tone={hand.approvalState === "approved" ? "success" : hand.approvalState === "changes_requested" ? "warning" : "info"}>{hand.approvalState.replace(/_/g, " ")}</Badge></td>
                  <td className="pr-6 text-slate-700">{hand.lastRunOutcome}</td>
                  <td className="pr-6 text-slate-700">{hand.owner}</td>
                  <td className="pr-6">{hand.approvalsResolved}/{hand.approvalsRequired}</td>
                  <td className="font-semibold text-blue-700"><Link href={`/hands/${hand.id}`}>View details</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
