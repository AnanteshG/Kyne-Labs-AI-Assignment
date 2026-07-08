import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";

const settings = [
  { title: "Teams and roles", detail: "Operators can draft and execute. Compliance approves customer contact. Admins manage integrations.", status: "Configured" },
  { title: "Core banking connector", detail: "Syncs account, balance, delinquency, and repayment status every 15 minutes.", status: "Live" },
  { title: "Notification routing", detail: "Approval requests route to compliance queues with severity and jurisdiction context.", status: "Configured" }
];

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Settings"
        title="Admin controls that do not belong in governance flow"
        description="Manage teams, integrations, routing, and tenant-level configuration."
      />
      <div className="grid gap-6">
        {settings.map((item) => (
          <Card key={item.title}>
            <CardHeader title={item.title} action={<Badge tone="success">{item.status}</Badge>} />
            <p className="text-sm leading-6 text-slate-600">{item.detail}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
