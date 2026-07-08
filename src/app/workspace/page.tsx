import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge, readinessTone } from "@/components/ui/Status";
import { ProgressBar } from "@/components/ui/TremorPrimitives";
import { artifacts } from "@/server/mock-db";

const messages = [
  { speaker: "Operator", body: "Build a compliant 30-59 DPD outreach hand for customers eligible for SMS." },
  { speaker: "Coworker", body: "I found 11,420 eligible customers after excluding DNC, active disputes, and missing SMS consent." },
  { speaker: "Coworker", body: "The hand can run with SMS and email. Voice fallback needs separate compliance approval." }
];

export default function WorkspacePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Coworker workspace"
        title="Draft a Banking Hand with evidence"
        description="Turn an operating goal into audience, channel, schedule, message, policy, and approval decisions."
        actions={
        <Link href="/hands/h1">
          <Button>Create draft hand</Button>
        </Link>
        }
      />
      <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr]">
        <Card className="min-h-[640px] border-slate-300">
          <CardHeader title="Conversation" eyebrow="Coworker" />
          <div className="space-y-5">
            {messages.map((message) => (
              <div key={message.body} className={message.speaker === "Operator" ? "ml-8 rounded-xl bg-blue-600 p-4 text-white shadow-sm" : "mr-8 rounded-xl border border-line bg-white p-4 shadow-tremor"}>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{message.speaker}</p>
                <p className="mt-2 text-sm leading-6">{message.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-line bg-white p-4">
            <p className="text-sm text-muted">Ask the coworker to adjust audience, channels, policy gates, or approval requirements.</p>
          </div>
        </Card>
        <Card>
          <CardHeader title="Generated hand package" eyebrow="Review before publishing" action={<Badge tone="warning">2 need review</Badge>} />
          <div className="grid gap-5 md:grid-cols-2">
            {artifacts.map((artifact) => (
              <div key={artifact.id} className="rounded-xl border border-line p-5">
                <div className="flex items-center justify-between gap-2">
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
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_300px]">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <p className="font-semibold text-blue-950">Decision memo</p>
              <p className="mt-2 text-sm leading-6 text-blue-900">
                SMS and email can proceed after message approval. Voice fallback remains blocked until consent mismatch is resolved.
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
