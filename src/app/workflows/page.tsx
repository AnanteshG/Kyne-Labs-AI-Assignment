import { AppShell } from "@/components/shell/AppShell";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { FlowRibbon, PulseRail } from "@/components/ui/TremorPrimitives";
import { WorkflowCanvas } from "@/components/workflows/WorkflowCanvas";

export default function WorkflowsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Workflows & agents"
        title="Build governed Banking Hands on a canvas"
        description="Drag, connect, and review workflow modules for audience targeting, AI drafting, policy gates, approvals, execution, and audit."
        actions={<Badge tone="info">React Flow canvas</Badge>}
      />

      <div className="mb-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader title="Banking Hand blueprint" eyebrow="Governed workflow" />
          <FlowRibbon
            steps={[
              { label: "Audience", value: "11.4k eligible", tone: "blue" },
              { label: "Policy", value: "2 gates", tone: "amber" },
              { label: "AI agent", value: "Drafting", tone: "green" },
              { label: "Run", value: "Paused", tone: "amber" }
            ]}
          />
        </Card>
        <Card>
          <CardHeader title="Agent roster" eyebrow="Operational coworkers" />
          <PulseRail
            items={[
              { label: "Policy analyst", detail: "Checks jurisdiction, consent, quiet hours, and suppressions.", tone: "blue" },
              { label: "Message drafter", detail: "Generates compliant SMS/email variants with rationale.", tone: "green" },
              { label: "Run monitor", detail: "Watches failures, HITL pauses, retries, and audit evidence.", tone: "amber" }
            ]}
          />
        </Card>
      </div>

      <WorkflowCanvas />
    </AppShell>
  );
}
