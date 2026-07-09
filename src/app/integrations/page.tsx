import { Code2, Landmark } from "lucide-react";
import { AppShell } from "@/components/shell/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { integrations } from "@/server/mock-db";

const connectorLogos: Record<string, { src?: string; icon?: typeof Landmark; className?: string }> = {
  HubSpot: { src: "https://cdn.simpleicons.org/hubspot/FF5C35" },
  Stripe: { src: "https://cdn.simpleicons.org/stripe/635BFF" },
  PayPal: { src: "https://cdn.simpleicons.org/paypal/003087" },
  Gmail: { src: "https://cdn.simpleicons.org/gmail/EA4335" },
  "Google Calendar": { src: "https://cdn.simpleicons.org/googlecalendar/4285F4" },
  Slack: { src: "https://cdn.simpleicons.org/slack/4A154B" },
  "Core banking systems": { icon: Landmark, className: "bg-blue-600 text-white" },
  "Custom APIs": { icon: Code2, className: "bg-slate-900 text-white" }
};

export default function IntegrationsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Integrations" title="Connectors" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {integrations.map((integration) => {
          const logo = connectorLogos[integration.name];
          const Icon = logo?.icon;

          return (
            <section key={integration.id} className="min-w-0 rounded-md border border-line bg-white p-5 shadow-tremor">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-line bg-slate-50 p-3">
                  {logo?.src ? (
                    <img src={logo.src} alt={`${integration.name} logo`} className="h-8 w-8 object-contain" />
                  ) : Icon ? (
                    <span className={`flex h-9 w-9 items-center justify-center rounded-md ${logo.className ?? "bg-blue-600 text-white"}`}>
                      <Icon size={20} />
                    </span>
                  ) : null}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-base font-bold text-ink">{integration.name}</h2>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
