import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge, readinessTone } from "@/components/ui/Status";
import { AreaTrend, FlowRibbon, ProgressBar, PulseRail } from "@/components/ui/TremorPrimitives";
import { artifacts } from "@/server/mock-db";

const messages = [
  { speaker: "Operator", body: "Build a 30-59 DPD outreach playbook for cooperative borrowers with SMS first and email fallback." },
  { speaker: "Coworker", body: "I found 11,420 eligible borrowers after excluding DNC, active disputes, missing SMS consent, and hardship holds." },
  { speaker: "Coworker", body: "I generated a Banking Hand draft with wait times, channel hops, escalation rules, and HITL approval requirements." }
];

export default function WorkspacePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Coworker workspace"
        title="Draft a regulated Banking Hand with evidence"
        description="Turn an operating goal into target segment, outreach sequence, policy decisions, and approval-ready artifacts."
        actions={
        <Link href="/hands/h1">
          <Button>Save as Banking Hand</Button>
        </Link>
        }
      />
      <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr]">
        <Card className="border-slate-300 xl:min-h-[640px]">
          <CardHeader title="Conversation" eyebrow="Coworker" />
          <div className="space-y-5">
            {messages.map((message) => (
              <div key={message.body} className={message.speaker === "Operator" ? "ml-0 rounded-xl bg-blue-600 p-4 text-white shadow-sm sm:ml-8" : "mr-0 rounded-xl border border-line bg-white p-4 shadow-tremor sm:mr-8"}>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{message.speaker}</p>
                <p className="mt-2 text-sm leading-6">{message.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-line bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Example prompt</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">Build a 30-59 DPD outreach playbook for cooperative borrowers with SMS first and email fallback.</p>
          </div>
          <div className="mt-6">
            <PulseRail
              items={[
                { label: "Audience filtered", detail: "DNC, active disputes, and missing SMS consent removed.", tone: "green" },
                { label: "Policy matched", detail: "Quiet hours and opt-out language attached to the draft.", tone: "blue" },
                { label: "Approval queued", detail: "Voice fallback and message review remain gated.", tone: "amber" }
              ]}
            />
          </div>
        </Card>
        <Card>
          <CardHeader title="Generated hand package" eyebrow="Review before publishing" action={<Badge tone="warning">2 need review</Badge>} />
          <div className="mb-6 grid gap-5 lg:grid-cols-[1fr_280px]">
            <AreaTrend label="Eligible audience" tone="blue" values={[31, 37, 46, 52, 59, 66, 71, 76]} />
            <FlowRibbon
              steps={[
                { label: "SMS", value: "Ready", tone: "green" },
                { label: "Email", value: "Ready", tone: "green" },
                { label: "Voice", value: "Blocked", tone: "red" },
                { label: "Audit", value: "On", tone: "blue" }
              ]}
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {artifacts.map((artifact) => (
              <div key={artifact.id} className="rounded-xl border border-line p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-ink">{artifact.title}</p>
                  <StatusBadge label={artifact.status} tone={readinessTone(artifact.status)} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{artifact.summary}</p>
                <div className="mt-4">
                  <ProgressBar value={artifact.status === "ready" ? 100 : artifact.status === "review" ? 62 : 30} tone={artifact.status === "ready" ? "green" : artifact.status === "review" ? "amber" : "red"} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="rounded-xl border border-line bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Generated segment</p>
              <p className="mt-2 font-semibold text-ink">30-59 DPD cooperative borrowers</p>
              <p className="mt-2 text-sm leading-6 text-muted">Outstanding greater than $250, valid SMS consent, not DNC, no active dispute.</p>
            </div>
            <div className="rounded-xl border border-line bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Channel hops</p>
              <p className="mt-2 font-semibold text-ink">SMS to email to voice/human handoff</p>
              <p className="mt-2 text-sm leading-6 text-muted">Wait 48 hours after SMS and 72 hours after email before escalation.</p>
            </div>
            <div className="rounded-xl border border-line bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Escalation rules</p>
              <p className="mt-2 font-semibold text-ink">Agent review required</p>
              <p className="mt-2 text-sm leading-6 text-muted">Hardship replies, callback requests, and voice fallback all require HITL review.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_300px]">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <p className="font-semibold text-blue-950">Policy and decision panel</p>
              <p className="mt-2 text-sm leading-6 text-blue-900">
                SMS and email can proceed after message approval. Voice fallback remains blocked until consent mismatch is resolved. The AI can recommend the sequence, but the backend controls whether each borrower-facing touch is allowed.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Publish guard</p>
              <p className="mt-2 text-sm font-semibold text-ink">Cannot execute yet</p>
              <p className="mt-1 text-sm leading-6 text-muted">1 message approval and 1 quiet-hour exception remain open.</p>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
