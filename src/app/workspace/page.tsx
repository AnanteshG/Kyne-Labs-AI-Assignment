import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge, readinessTone } from "@/components/ui/Status";
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
        eyebrow="AI coworker workspace"
        title="A regulated coworker that produces decisions, artifacts, and approval evidence"
        description="The current platform shows chat as a side panel and workflows as boards. This workspace gives AI a product role: draft the hand, expose the evidence, and stop where policy requires humans."
        actions={
        <Link href="/hands/h1">
          <Button>Create draft hand</Button>
        </Link>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <Card className="min-h-[640px] border-slate-300">
          <CardHeader title="Conversation" eyebrow="Coworker" description="Focused prompts, not a generic chat room." />
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.body} className={message.speaker === "Operator" ? "ml-8 rounded-lg bg-ink p-4 text-white" : "mr-8 rounded-lg border border-line bg-slate-50 p-4"}>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{message.speaker}</p>
                <p className="mt-2 text-sm leading-6">{message.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-line bg-white p-3">
            <p className="text-sm text-muted">Ask the coworker to adjust audience, channels, policy gates, or approval requirements.</p>
          </div>
        </Card>
        <Card>
          <CardHeader title="Generated hand package" eyebrow="Review before publishing" description="Each artifact is a reviewable object that can map to APIs, approvals, and audit events." action={<Badge tone="warning">2 need review</Badge>} />
          <div className="grid gap-4 md:grid-cols-2">
            {artifacts.map((artifact) => (
              <div key={artifact.id} className="rounded-lg border border-line p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-ink">{artifact.title}</p>
                  <StatusBadge label={artifact.status} tone={readinessTone(artifact.status)} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{artifact.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_280px]">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="font-semibold text-blue-950">Coworker decision memo</p>
            <p className="mt-2 text-sm leading-6 text-blue-900">
              This hand is safe for SMS and email after message approval. Voice fallback remains blocked until consent mismatch is resolved.
            </p>
            </div>
            <div className="rounded-lg border border-line bg-slate-50 p-4">
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
