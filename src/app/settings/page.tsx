import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { AreaTrend, FlowRibbon } from "@/components/ui/TremorPrimitives";

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
        title="Workspace configuration"
        description="Manage teams, integrations, routing, and tenant-level configuration."
      />
      <div className="mb-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <AreaTrend label="Connector uptime" tone="green" values={[97, 98, 99, 98, 99, 99, 98, 100]} />
        <Card>
          <CardHeader title="Tenant control flow" eyebrow="Configuration map" />
          <FlowRibbon
            steps={[
              { label: "Roles", value: "Set", tone: "green" },
              { label: "Core data", value: "Live", tone: "green" },
              { label: "Queues", value: "Set", tone: "blue" },
              { label: "Audit", value: "On", tone: "green" }
            ]}
          />
        </Card>
      </div>
      <div className="grid gap-6">
        {settings.map((item) => (
          <Card key={item.title}>
            <CardHeader title={item.title} action={<Badge tone="success">{item.status}</Badge>} />
            <p className="text-sm leading-6 text-slate-600">{item.detail}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <CardHeader title="Audit log" eyebrow="Workspace events" action={<Badge tone="success">Export ready</Badge>} />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-3">Action</th>
                <th>Description</th>
                <th>Actor</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ["agent.executed", "Message draft completed", "operator@bank.com", "Completed", "1h ago"],
                ["policy.checked", "Quiet-hour policy evaluated", "system", "Completed", "2h ago"],
                ["approval.opened", "Voice fallback approval queued", "compliance@bank.com", "Pending", "3h ago"],
                ["data.synced", "Core banking records refreshed", "system", "Completed", "15m ago"]
              ].map(([action, description, actor, status, time]) => (
                <tr key={`${action}-${time}`}>
                  <td className="py-4 pr-6 font-semibold text-ink">{action}</td>
                  <td className="pr-6 text-slate-700">{description}</td>
                  <td className="pr-6 text-slate-700">{actor}</td>
                  <td className="pr-6"><Badge tone={status === "Completed" ? "success" : "warning"}>{status}</Badge></td>
                  <td className="text-muted">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
