"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bot,
  BriefcaseBusiness,
  CheckSquare,
  Database,
  LayoutDashboard,
  ListChecks,
  Settings,
  Users
} from "lucide-react";
import { modes } from "@/domain/constants";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const navItems = [
  { href: "/portfolio", label: "Portfolio", icon: LayoutDashboard },
  { href: "/data", label: "Data & Policies", icon: Database },
  { href: "/workspace", label: "Coworker", icon: Bot },
  { href: "/hands", label: "Banking Hands", icon: BriefcaseBusiness },
  { href: "/approvals", label: "Approvals", icon: CheckSquare },
  { href: "/runs/r1", label: "Execution", icon: Activity },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-canvas">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-line bg-white px-4 py-5 lg:block">
        <Link href="/portfolio" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-white">
            <ListChecks size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-ink">Kyne Labs AI</p>
            <p className="text-xs text-muted">Regulated ops cockpit</p>
          </div>
        </Link>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/portfolio" && pathname.startsWith(item.href.split("/")[1] ? `/${item.href.split("/")[1]}` : item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-slate-600",
                  active && "bg-slate-100 text-ink"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-line bg-white/95 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Operating mode</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {modes.map((mode, index) => (
                  <Badge key={mode.value} tone={index === 0 ? "info" : "neutral"}>
                    {mode.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge tone="success">Data ready</Badge>
              <Badge tone="warning">2 governance reviews</Badge>
              <Badge tone="info">Operator: Anantesh</Badge>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
