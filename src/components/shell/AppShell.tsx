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
  Search,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";
import { modes } from "@/domain/constants";
import { Badge } from "@/components/ui/Badge";
import { Stepper } from "@/components/ui/TremorPrimitives";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const navItems = [
  { href: "/portfolio", label: "Portfolio", icon: LayoutDashboard },
  { href: "/data", label: "Readiness", icon: Database },
  { href: "/workspace", label: "Coworker", icon: Bot },
  { href: "/hands", label: "Hands", icon: BriefcaseBusiness },
  { href: "/approvals", label: "Approvals", icon: CheckSquare },
  { href: "/runs", label: "Execution", icon: Activity },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings }
];

const stepByRoot: Record<string, number> = {
  portfolio: 0,
  data: 1,
  workspace: 2,
  hands: 2,
  approvals: 3,
  runs: 4,
  customers: 5,
  settings: 1
};

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeRoot = pathname.split("/")[1] || "portfolio";

  return (
    <div className="min-h-screen bg-canvas operational-grid">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-line bg-white px-5 py-6 lg:block">
        <Link href="/portfolio" className="flex items-center gap-3 rounded-xl border border-line bg-slate-50 p-4 shadow-tremor">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            <ListChecks size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-ink">Kyne Labs AI</p>
            <p className="text-xs text-muted">Regulated ops cockpit</p>
          </div>
        </Link>

        <div className="mt-6 rounded-xl border border-line bg-white p-4 shadow-tremor">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Tenant</p>
          <p className="mt-1 text-sm font-semibold text-ink">Debt Collections Team</p>
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-line bg-slate-50 px-3 py-2.5 text-xs text-muted">
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
                  "tremor-focus flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-ink",
                  active && "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-5 right-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-emerald-700">
            <ShieldCheck size={18} />
            <p className="text-sm font-semibold">Governance visible</p>
          </div>
          <p className="mt-2 text-xs leading-5 text-emerald-800">Policy, consent, approvals, and audit stay attached to each launch.</p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-line bg-white/90 px-5 py-4 backdrop-blur lg:px-10">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3">
              <div className="lg:hidden">
                <Link href="/portfolio" className="flex items-center gap-2 text-sm font-bold text-ink">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <ListChecks size={16} />
                  </span>
                  Kyne Labs AI
                </Link>
              </div>
              <Stepper current={stepByRoot[activeRoot] ?? 0} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {modes.map((mode, index) => (
                <Badge key={mode.value} tone={index === 0 ? "info" : "neutral"}>
                  {mode.label}
                </Badge>
              ))}
              <div className="mx-1 hidden h-5 w-px bg-line sm:block" />
              <Badge tone="success">Data ready</Badge>
              <Badge tone="warning">2 reviews</Badge>
              <Badge tone="danger">Voice blocked</Badge>
              <Badge tone="info">Anantesh</Badge>
            </div>

            <div className="grid grid-cols-4 gap-1 rounded-xl border border-line bg-white p-1 shadow-tremor lg:hidden">
              {navItems.map((item) => {
                const routeRoot = item.href.split("/")[1];
                const active = routeRoot ? pathname.startsWith(`/${routeRoot}`) : false;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn("flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium text-muted", active && "bg-blue-50 text-blue-700")}
                  >
                    <Icon size={15} />
                    <span className="max-w-[64px] truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        <main className="px-5 py-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
