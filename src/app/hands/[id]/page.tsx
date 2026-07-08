import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { approvalTone, handTone, riskTone } from "@/components/ui/Status";
import { AreaTrend, FlowRibbon, PulseRail } from "@/components/ui/TremorPrimitives";
import { approvals, auditEvents, hands, runs } from "@/server/mock-db";

const lifecycle = ["draft", "validated", "approval_required", "approved", "scheduled", "running", "completed"];

export default function HandDetailPage({ params }: { params: { id: string } }) {
  const hand = hands.find((item) => item.id === params.id);
  if (!hand) notFound();
  const handApprovals = approvals.filter((approval) => approval.handId === hand.id);
  const handRuns = runs.filter((run) => run.handId === hand.id);
  const currentIndex = lifecycle.indexOf(hand.status);
  const canStartRun = hand.status === "approved" && hand.approvalsResolved === hand.approvalsRequired;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Hand detail"
        title={hand.name}
        description="Review target segment, borrower filters, templates, policy checks, approvals, run history, and audit trail."
        actions={<div className="flex flex-wrap gap-2">
          <Link href="/approvals"><Button variant="secondary">Open approvals</Button></Link>
          <Button disabled={!canStartRun} title={canStartRun ? "Start approved run" : "Approval and policy checks must pass before a run can start"}>Start run</Button>
        </div>}
      />
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader title="Lifecycle" eyebrow="Controlled publish path" action={<Badge tone={handTone(hand.status)}>{hand.status.replace(/_/g, " ")}</Badge>} />
          <FlowRibbon
            steps={lifecycle.map((step, index) => ({
              label: step.replace(/_/g, " "),
              value: index <= currentIndex ? "Reached" : "Waiting",
              tone: index <= currentIndex ? "blue" : step === "approval_required" ? "amber" : "red"
            }))}
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-line p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Audience</p>
              <p className="mt-2 font-semibold text-ink">{hand.targetSegment}</p>
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
      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader title="Borrower filters" eyebrow="Target segment controls" />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "DPD bucket: 30-59",
              "Persona: cooperative or compliant deferrer",
              "Consent: valid SMS/email permission",
              "DNC: excluded",
              "Dispute status: no active dispute",
              "Outstanding: greater than $250"
            ].map((filter) => (
              <div key={filter} className="rounded-xl border border-line bg-slate-50 p-4 text-sm font-semibold text-slate-700">{filter}</div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Outreach sequence" eyebrow="Governed channel path" />
          <PulseRail
            items={[
              { label: "Day 0 - SMS", detail: "Send compliant reminder with secure payment link and opt-out language.", tone: "green" },
              { label: "Wait 48 hours", detail: "Stop if borrower pays, opts out, disputes, or requests human help.", tone: "blue" },
              { label: "Day 2 - Email fallback", detail: "Send softer explanation with repayment options and support contact.", tone: "green" },
              { label: "Day 5 - Voice/human handoff", detail: "Disabled until voice consent and compliance approval are complete.", tone: "amber" }
            ]}
          />
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader title="Message templates" eyebrow="Borrower-facing content" />
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
      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader title="Run history" eyebrow="Execution outcomes" />
          {handRuns.length ? (
            <div className="space-y-4">
              {handRuns.map((run) => (
                <Link key={run.id} href={`/runs/${run.id}`} className="block rounded-xl border border-line p-5 transition hover:border-blue-300 hover:bg-blue-50/40">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-blue-700">Run {run.id}</p>
                    <Badge tone={run.status === "paused" ? "warning" : "info"}>{run.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{run.progress}% complete, {run.borrowerReplies} borrower replies, {run.skippedBorrowers} skipped by policy.</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-6 text-muted">No runs have started because this hand has not passed governance.</p>
          )}
        </Card>
        <Card>
          <CardHeader title="Audit timeline" eyebrow="Append-only evidence" />
          <PulseRail items={auditEvents.slice(0, 4).map((event) => ({ label: `${event.at} - ${event.action}`, detail: `${event.actor} - ${event.detail}`, tone: event.policyResult === "blocked" ? "red" : event.policyResult === "review" ? "amber" : "blue" }))} />
        </Card>
      </div>
    </AppShell>
  );
}
