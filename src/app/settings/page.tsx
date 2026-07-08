import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";

const settings = [
  { title: "Teams and roles", detail: "Operators can draft and execute. Compliance approves customer contact. Admins manage integrations.", status: "Configured" },
  { title: "Core banking connector", detail: "Syncs account, balance, delinquency, and repayment status every 15 minutes.", status: "Live" },
  { title: "Notification routing", detail: "Approval requests route to compliance queues with severity and jurisdiction context.", status: "Configured" }
];

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Admin controls that do not belong in governance flow</h1>
      </div>
      <div className="grid gap-4">
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
