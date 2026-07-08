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
  Users,
  ShieldCheck,
  Search
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
    <div className="min-h-screen bg-canvas operational-grid">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-800 bg-ink px-5 py-6 text-white lg:block">
        <Link href="/portfolio" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-ink">
            <ListChecks size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">Kyne Labs AI</p>
            <p className="text-xs text-slate-300">Regulated ops cockpit</p>
          </div>
        </Link>
        <div className="mt-6 rounded-xl border border-white/10 bg-slate-950/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Tenant</p>
          <p className="mt-1 text-sm font-semibold">Debt Collections Team</p>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-xs text-slate-300">
            <Search size={14} />
            Search hands, runs, customers
          </div>
        </div>
        <nav className="mt-8 space-y-1.5">
          {navItems.map((item) => {
            const routeRoot = item.href.split("/")[1];
            const active = pathname === item.href || (routeRoot ? pathname.startsWith(`/${routeRoot}`) : false);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white",
                  active && "bg-white text-ink shadow-sm hover:bg-white hover:text-ink"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-6 left-5 right-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
          <div className="flex items-center gap-2 text-emerald-100">
            <ShieldCheck size={18} />
            <p className="text-sm font-semibold">Governance visible</p>
          </div>
          <p className="mt-2 text-xs leading-5 text-emerald-100/80">
            Policy, consent, approvals, and audit stay attached to every customer-contact decision.
          </p>
        </div>
      </aside>
      <div className="lg:pl-72">
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
              <Badge tone="danger">Voice blocked</Badge>
              <Badge tone="info">Operator: Anantesh</Badge>
            </div>
          </div>
        </header>
        <main className="px-5 py-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
