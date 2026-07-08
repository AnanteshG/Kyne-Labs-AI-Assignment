"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  Bot,
  BriefcaseBusiness,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Database,
  GitBranch,
  LayoutDashboard,
  Menu,
  Moon,
  Sparkles,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OnboardingTour } from "@/components/shell/OnboardingTour";
import { useEffect, useState, type ReactNode } from "react";

const navItems = [
  { href: "/portfolio", label: "Portfolio", icon: LayoutDashboard },
  { href: "/data", label: "Readiness", icon: Database },
  { href: "/workflows", label: "Workflows", icon: GitBranch },
  { href: "/workspace", label: "Coworker", icon: Bot },
  { href: "/hands", label: "Hands", icon: BriefcaseBusiness },
  { href: "/approvals", label: "Approvals", icon: CheckSquare },
  { href: "/runs", label: "Execution", icon: Activity },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeRoot = pathname.split("/")[1] || "portfolio";
  const activeItem = navItems.find((item) => item.href.split("/")[1] === activeRoot) ?? navItems[0];
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
            "tremor-focus nav-font flex min-w-0 items-center rounded-xl border border-line bg-slate-50 shadow-tremor transition hover:border-blue-300 hover:text-blue-700",
            compact ? "h-10 justify-center px-2 text-xs font-bold" : "flex-1 px-3 py-2.5"
          )}
          onClick={() => setSidebarOpen(false)}
          title="Kyne Labs AI"
        >
          {!compact ? (
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-ink">Kyne AI Ops</span>
              <span className="block truncate text-[11px] text-muted">Debt Collections Team</span>
            </span>
          ) : (
            <span>AI</span>
          )}
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
        <div className="mt-4 rounded-xl border border-line bg-white p-3 shadow-tremor">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">Tenant</p>
          <p className="mt-1 truncate text-sm font-semibold text-ink">Debt Collections Team</p>
          <div className="mt-4 flex min-w-0 items-center gap-2 rounded-lg border border-line bg-slate-50 px-3 py-2.5 text-xs text-muted">
            <Search size={14} className="shrink-0" />
            <span className="truncate">Search hands, runs, customers</span>
          </div>
        </div>
      ) : null}

      <nav className="kyne-nav mt-5 min-h-0 flex-1 space-y-1 overflow-y-auto pr-1" data-tour="sidebar">
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
                "tremor-focus group relative flex min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700",
                compact && "justify-center px-2",
                active && "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
              )}
            >
              <Icon size={18} className="shrink-0" />
              {!compact ? <span className="truncate">{item.label}</span> : null}
              {compact ? (
                <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-50 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink shadow-raised group-hover:block">
                  {item.label}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {!compact ? (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5">
          <div className="flex items-center justify-between gap-2 text-emerald-700">
            <div className="flex min-w-0 items-center gap-2">
              <ShieldCheck size={16} className="shrink-0" />
              <p className="truncate text-xs font-semibold">Governance visible</p>
            </div>
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
          </div>
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
        <header className="sticky top-0 z-10 border-b border-line bg-white/90 px-4 py-3 backdrop-blur lg:px-8" data-tour="topbar">
          <div className="flex min-w-0 items-center justify-between gap-4">
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
                <p className="nav-font truncate text-sm font-bold text-ink">{activeItem.label}</p>
                <p className="truncate text-xs text-muted">Debt collections workspace</p>
              </div>
            </div>

            <div className="flex min-w-0 shrink-0 items-center gap-3">
              <div className="nav-font hidden items-center gap-2 xl:flex">
                <div className="rounded-lg border border-line bg-white px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Data status</p>
                  <p className="mt-0.5 text-xs font-bold text-emerald-700">Ready</p>
                </div>
                <Link href="/approvals" className="rounded-lg border border-line bg-white px-3 py-2 transition hover:border-amber-300 hover:bg-amber-50">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Approvals</p>
                  <p className="mt-0.5 text-xs font-bold text-amber-800">2 pending reviews</p>
                </Link>
                <Link href="/data" className="rounded-lg border border-line bg-white px-3 py-2 transition hover:border-red-300 hover:bg-red-50">
                  <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                    <AlertTriangle size={11} />
                    Channel risk
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-red-700">Voice blocked</p>
                </Link>
              </div>
              <button
                type="button"
                className="tremor-focus flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-slate-700 shadow-sm"
                onClick={toggleTheme}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div className="flex shrink-0 items-center gap-3 rounded-xl border border-line bg-white px-3 py-2 shadow-tremor">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-[0_0_18px_rgba(37,99,235,0.25)]">
                  AS
                </div>
                <div className="hidden min-w-0 sm:block">
                  <p className="truncate text-sm font-bold text-ink">Anantesh S.</p>
                  <p className="truncate text-xs text-muted">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="min-w-0 px-4 py-7 sm:px-5 lg:px-10 lg:py-10">{children}</main>
      </div>
      <Link
        href="/workspace"
        className="animate-kyne-float animate-kyne-glow fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-raised transition hover:bg-blue-700"
        data-tour="ask-ai"
      >
        <Sparkles size={17} />
        Ask AI
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.9)]" />
      </Link>
      <OnboardingTour />
    </div>
  );
}
