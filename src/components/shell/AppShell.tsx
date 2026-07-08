"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bot,
  BriefcaseBusiness,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Database,
  LayoutDashboard,
  ListChecks,
  Menu,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Users
} from "lucide-react";
import { modes } from "@/domain/constants";
import { Badge } from "@/components/ui/Badge";
import { Stepper } from "@/components/ui/TremorPrimitives";
import { cn } from "@/lib/utils";
import { useEffect, useState, type ReactNode } from "react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("kyne-theme", next ? "dark" : "light");
  }

  const sidebarWidth = collapsed ? "lg:w-20" : "lg:w-72";
  const contentInset = collapsed ? "lg:pl-20" : "lg:pl-72";

  const SidebarContent = ({ compact = false }: { compact?: boolean }) => (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/portfolio"
          className={cn(
            "tremor-focus flex min-w-0 items-center gap-3 rounded-xl border border-line bg-slate-50 p-3 shadow-tremor",
            compact ? "justify-center" : "flex-1"
          )}
          onClick={() => setSidebarOpen(false)}
          title="Kyne Labs AI"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            <ListChecks size={20} />
          </span>
          {!compact ? (
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-ink">Kyne Labs AI</span>
              <span className="block truncate text-xs text-muted">Regulated ops cockpit</span>
            </span>
          ) : null}
        </Link>
        <button
          type="button"
          className="tremor-focus hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-slate-700 shadow-sm lg:flex"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {!compact ? (
        <div className="mt-5 rounded-xl border border-line bg-white p-4 shadow-tremor">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Tenant</p>
          <p className="mt-1 truncate text-sm font-semibold text-ink">Debt Collections Team</p>
          <div className="mt-4 flex min-w-0 items-center gap-2 rounded-lg border border-line bg-slate-50 px-3 py-2.5 text-xs text-muted">
            <Search size={14} className="shrink-0" />
            <span className="truncate">Search hands, runs, customers</span>
          </div>
        </div>
      ) : null}

      <nav className="mt-6 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const routeRoot = item.href.split("/")[1];
          const active = pathname === item.href || (routeRoot ? pathname.startsWith(`/${routeRoot}`) : false);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "tremor-focus flex min-w-0 items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-ink",
                compact && "justify-center px-2",
                active && "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
              )}
            >
              <Icon size={18} className="shrink-0" />
              {!compact ? <span className="truncate">{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>

      {!compact ? (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-emerald-700">
            <ShieldCheck size={18} className="shrink-0" />
            <p className="text-sm font-semibold">Governance visible</p>
          </div>
          <p className="mt-2 text-xs leading-5 text-emerald-800">Policy, consent, approvals, and audit stay attached to each launch.</p>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas operational-grid">
      <aside className={cn("fixed inset-y-0 left-0 z-30 hidden border-r border-line bg-white px-4 py-5 transition-[width] duration-200 lg:block", sidebarWidth)}>
        <SidebarContent compact={collapsed} />
      </aside>

      {sidebarOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/45"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          />
          <aside className="absolute inset-y-0 left-0 w-[min(20rem,calc(100vw-2rem))] border-r border-line bg-white px-4 py-5 shadow-raised">
            <div className="mb-4 flex items-center justify-end">
              <button
                type="button"
                className="tremor-focus flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-slate-700"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close navigation"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      ) : null}

      <div className={cn("transition-[padding] duration-200", contentInset)}>
        <header className="sticky top-0 z-10 border-b border-line bg-white/90 px-5 py-4 backdrop-blur lg:px-10">
          <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="tremor-focus flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-slate-700 shadow-sm lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation"
              >
                <Menu size={19} />
              </button>
              <div className="min-w-0">
                <Link href="/portfolio" className="mb-3 flex items-center gap-2 text-sm font-bold text-ink lg:hidden">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <ListChecks size={16} />
                  </span>
                  <span className="truncate">Kyne Labs AI</span>
                </Link>
                <Stepper current={stepByRoot[activeRoot] ?? 0} />
              </div>
            </div>

            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
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
              <button
                type="button"
                className="tremor-focus ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-slate-700 shadow-sm"
                onClick={toggleTheme}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </header>

        <main className="min-w-0 px-4 py-7 sm:px-5 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
