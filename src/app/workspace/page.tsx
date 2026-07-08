import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
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
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">AI coworker workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">Design a governed Banking Hand with evidence</h1>
        </div>
        <Link href="/hands/h1">
          <Button>Create draft hand</Button>
        </Link>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="min-h-[640px]">
          <CardHeader title="Conversation" eyebrow="Coworker" />
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.body} className={message.speaker === "Operator" ? "ml-8 rounded-md bg-ink p-4 text-white" : "mr-8 rounded-md border border-line bg-slate-50 p-4"}>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{message.speaker}</p>
                <p className="mt-2 text-sm leading-6">{message.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md border border-line bg-white p-3">
            <p className="text-sm text-muted">Ask the coworker to adjust audience, channels, policy gates, or approval requirements.</p>
          </div>
        </Card>
        <Card>
          <CardHeader title="Generated artifacts" eyebrow="Review before publishing" action={<Badge tone="warning">2 need review</Badge>} />
          <div className="grid gap-4 md:grid-cols-2">
            {artifacts.map((artifact) => (
              <div key={artifact.id} className="rounded-md border border-line p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-ink">{artifact.title}</p>
                  <StatusBadge label={artifact.status} tone={readinessTone(artifact.status)} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{artifact.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md border border-blue-200 bg-blue-50 p-4">
            <p className="font-semibold text-blue-950">Coworker decision memo</p>
            <p className="mt-2 text-sm leading-6 text-blue-900">
              This hand is safe for SMS and email after message approval. Voice fallback remains blocked until consent mismatch is resolved.
            </p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
