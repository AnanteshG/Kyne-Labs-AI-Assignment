"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  Bot,
  BriefcaseBusiness,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  LayoutDashboard,
  Menu,
  Moon,
  Plug,
  Send,
  Search,
  ShieldCheck,
  Sun,
  Workflow,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { canAccessRoute, isRole, roleAccess, roleHome, roleNames } from "@/lib/rbac";
import type { Role } from "@/domain/types";
import { OnboardingTour } from "@/components/shell/OnboardingTour";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/portfolio", label: "Portfolio", icon: LayoutDashboard },
  { href: "/data", label: "Data & Protocol Hub", icon: Database },
  { href: "/workspace", label: "AI Coworker", icon: Bot },
  { href: "/workflows", label: "Workflows", icon: Workflow },
  { href: "/hands", label: "Banking Hands", icon: BriefcaseBusiness },
  { href: "/approvals", label: "Approvals", icon: CheckSquare },
  { href: "/runs", label: "Runs", icon: Activity },
  { href: "/audit", label: "Audit", icon: FileText },
  { href: "/integrations", label: "Integrations", icon: Plug }
];

const searchableRoutes = [
  { keywords: ["portfolio", "dashboard", "home", "exposure"], href: "/portfolio" },
  { keywords: ["data", "protocol", "policy", "readiness", "hub"], href: "/data" },
  { keywords: ["ai", "coworker", "limbus", "workspace"], href: "/workspace" },
  { keywords: ["workflow", "workflows", "canvas", "agent", "agents"], href: "/workflows" },
  { keywords: ["hand", "hands", "banking hand", "banking hands"], href: "/hands" },
  { keywords: ["approval", "approvals", "review", "pending"], href: "/approvals" },
  { keywords: ["run", "runs", "execution", "monitor"], href: "/runs" },
  { keywords: ["audit", "history", "log", "logs"], href: "/audit" },
  { keywords: ["integration", "integrations", "connector", "connectors", "hubspot", "stripe", "paypal", "gmail", "slack"], href: "/integrations" },
  { keywords: ["customer", "customers", "borrower", "borrowers", "account", "accounts"], href: "/customers" },
  { keywords: ["setting", "settings", "admin"], href: "/settings" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const activeRoot = pathname.split("/")[1] || "portfolio";
  const activeItem = navItems.find((item) => item.href.split("/")[1] === activeRoot) ?? navItems[0];
  const [role, setRole] = useState<Role>("admin");
  const [mode, setMode] = useState("Debt Collection");
  const visibleNavItems = navItems.filter((item) => roleAccess[role].includes(item.href.split("/")[1]));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiMessages, setAiMessages] = useState([
    {
      id: "limbus-welcome",
      sender: "limbus",
      body: "Hi, I am Limbus. Ask me to explain approvals, policy blockers, or the next best action."
    },
    {
      id: "limbus-context",
      sender: "limbus",
      body: "I can help draft or review a Banking Hand without taking you away from this page."
    }
  ]);
  const [notifications, setNotifications] = useState([
    { id: "n1", title: "Message approval pending", detail: "SMS copy needs compliance sign-off.", tone: "warning" },
    { id: "n2", title: "Voice channel blocked", detail: "Consent mismatch found in latest validation.", tone: "danger" },
    { id: "n3", title: "Data sync complete", detail: "Core banking records refreshed 15m ago.", tone: "success" }
  ]);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
    const queryRole = new URLSearchParams(window.location.search).get("role");
    const storedRole = localStorage.getItem("kyne-role");
    const nextRole = isRole(queryRole) ? queryRole : isRole(storedRole) ? storedRole : "admin";
    localStorage.setItem("kyne-role", nextRole);
    setRole(nextRole);
  }, []);

  useEffect(() => {
    if (!canAccessRoute(role, activeRoot)) {
      router.replace(roleHome[role]);
    }
  }, [activeRoot, role, router]);

  function toggleTheme() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("kyne-theme", next ? "dark" : "light");
    localStorage.setItem("kyne-theme-explicit", "true");
  }

  const sidebarWidth = collapsed ? "lg:w-20" : "lg:w-72";
  const contentInset = collapsed ? "lg:pl-20" : "lg:pl-72";

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;
    const normalizedQuery = query.toLowerCase();
    const route = searchableRoutes.find((item) => item.keywords.some((keyword) => normalizedQuery.includes(keyword) || keyword.includes(normalizedQuery)));
    const href = route?.href ?? "/customers";
    const root = href.split("/")[1] || "portfolio";
    const accessibleHref = canAccessRoute(role, root) ? href : roleHome[role];
    const withQuery = accessibleHref === "/customers" ? `${accessibleHref}?search=${encodeURIComponent(query)}` : accessibleHref;
    router.push(withQuery);
    setSearch("");
    setSidebarOpen(false);
  }

  function submitAiMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = aiMessage.trim();
    if (!body) return;
    const timestamp = Date.now();
    setAiMessages((current) => [
      ...current,
      { id: `user-${timestamp}`, sender: "user", body },
      {
        id: `limbus-${timestamp}`,
        sender: "limbus",
        body: "I will check that against audience rules, policy gates, approval state, and audit context. For this prototype, the next action would stay inside the current workflow."
      }
    ]);
    setAiMessage("");
  }

  const SidebarContent = ({ compact = false }: { compact?: boolean }) => (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/portfolio"
          className={cn(
            "tremor-focus nav-font flex min-w-0 items-center transition",
            compact
              ? "h-10 w-10 justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-[0_0_18px_rgba(37,99,235,0.32)] hover:bg-blue-700"
              : "flex-1 rounded-xl border border-line bg-slate-50 px-3 py-2.5 shadow-tremor hover:border-blue-300 hover:text-blue-700"
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
        </div>
      ) : null}

      <nav className="kyne-nav mt-5 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1" data-tour="sidebar">
        {visibleNavItems.map((item) => {
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
                "tremor-focus group relative flex min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-sky-400/10 dark:hover:text-sky-200",
                compact && "justify-center px-2",
                active && "bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-sky-400/10 dark:text-sky-200 dark:ring-sky-400/20"
              )}
            >
              <Icon size={18} className="shrink-0" />
              {!compact ? <span className="truncate">{item.label}</span> : null}
              {compact ? (
                <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-50 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink shadow-raised group-hover:block dark:bg-slate-950 dark:text-sky-100">
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
                <p className="truncate text-xs text-muted">{roleNames[role]} workspace - {mode}</p>
              </div>
            </div>

            <div className="flex min-w-0 shrink-0 items-center gap-3">
              <form onSubmit={submitSearch} className="hidden min-w-0 items-center gap-2 rounded-lg border border-line bg-slate-50 px-3 py-2 text-xs text-muted transition focus-within:border-blue-300 focus-within:bg-white md:flex md:w-52 xl:w-64">
                <Search size={14} className="shrink-0" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-ink outline-none placeholder:text-muted"
                  placeholder="Search"
                />
              </form>
              <div className="nav-font hidden items-center rounded-lg border border-line bg-slate-50 p-1 lg:flex">
                {["Debt Collection", "Invoice Collection", "Cross-sell"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-bold transition",
                      mode === item ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-ink"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="nav-font hidden items-center gap-2 xl:flex">
                <Link href="/approvals" className="rounded-lg border border-line bg-white px-3 py-2 transition hover:border-amber-300 hover:bg-amber-50">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Approvals</p>
                  <p className="mt-0.5 text-xs font-bold text-amber-800">2 pending reviews</p>
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
              <div className="relative">
                <button
                  type="button"
                  className="tremor-focus relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
                  onClick={() => setNotificationsOpen((value) => !value)}
                  aria-label="Open notifications"
                >
                  <Bell size={17} />
                  {notifications.length > 0 ? <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">{notifications.length}</span> : null}
                </button>
                {notificationsOpen ? (
                  <div className="absolute right-0 top-11 z-40 w-80 rounded-xl border border-line bg-white p-3 shadow-raised">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-ink">Notifications</p>
                        <p className="text-xs text-muted">{notifications.length ? `${notifications.length} active alerts` : "All clear"}</p>
                      </div>
                      <button
                        type="button"
                        className="rounded-md border border-line px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                        onClick={() => setNotifications([])}
                      >
                        Clear
                      </button>
                    </div>
                    <div className="mt-3 max-h-64 space-y-2 overflow-y-auto kyne-nav pr-1">
                      {notifications.length ? notifications.map((item) => (
                        <div key={item.id} className="rounded-lg border border-line bg-slate-50 p-3">
                          <div className="flex items-start gap-2">
                            <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", item.tone === "danger" ? "bg-red-500" : item.tone === "warning" ? "bg-amber-500" : "bg-emerald-500")} />
                            <div>
                              <p className="text-xs font-bold text-ink">{item.title}</p>
                              <p className="mt-1 text-xs leading-5 text-muted">{item.detail}</p>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="rounded-lg border border-line bg-slate-50 p-4 text-center text-xs font-semibold text-muted">No notifications</div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-3 rounded-xl border border-line bg-white px-3 py-2 shadow-tremor">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-[0_0_18px_rgba(37,99,235,0.25)]">
                  {role === "admin" ? "AS" : role === "compliance" ? "CO" : role === "ops_leader" ? "OL" : "OP"}
                </div>
                <div className="hidden min-w-0 sm:block">
                  <p className="truncate text-sm font-bold text-ink">{role === "admin" ? "Anantesh S." : role === "compliance" ? "Compliance Lead" : role === "ops_leader" ? "Ops Leader" : "Ops User"}</p>
                  <p className="truncate text-xs text-muted">{roleNames[role]}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="min-w-0 px-4 py-7 sm:px-5 lg:px-10 lg:py-10">{children}</main>
      </div>
      <div className="fixed bottom-5 right-5 z-30" data-tour="ask-ai">
        {aiOpen ? (
          <div className="mb-3 w-[min(22rem,calc(100vw-2.5rem))] rounded-2xl border border-blue-200 bg-white p-4 shadow-raised">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">AI coworker</p>
                <h3 className="mt-1 text-lg font-black text-ink">
                  <span className="bg-gradient-to-r from-blue-700 via-sky-400 to-blue-700 bg-clip-text text-transparent">Limbus</span>
                </h3>
              </div>
              <button type="button" className="rounded-lg p-1 text-muted transition hover:bg-slate-100 hover:text-ink" onClick={() => setAiOpen(false)} aria-label="Close Ask AI">
                <X size={16} />
              </button>
            </div>
            <div className="kyne-nav mt-4 max-h-72 space-y-2 overflow-y-auto pr-1">
              {aiMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3 py-2 text-xs leading-5",
                    message.sender === "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "border border-blue-100 bg-blue-50 text-slate-800"
                  )}
                >
                  {message.body}
                </div>
              ))}
            </div>
            <form onSubmit={submitAiMessage} className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-slate-50 p-2 transition focus-within:border-blue-300 focus-within:bg-white">
              <input
                value={aiMessage}
                onChange={(event) => setAiMessage(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-2 text-sm font-medium text-ink outline-none placeholder:text-muted"
                placeholder="Ask Limbus..."
              />
              <button
                type="submit"
                className="tremor-focus flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={!aiMessage.trim()}
                aria-label="Send message to Limbus"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setAiOpen((value) => !value)}
          className="animate-kyne-float animate-kyne-glow relative flex items-center gap-2 rounded-full bg-blue-700 px-4 py-3 text-sm font-black !text-white shadow-raised ring-1 ring-white/25 transition hover:bg-blue-800"
        >
          <span className="relative z-10 leading-none text-white drop-shadow-sm">Ask AI</span>
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.9)]" />
        </button>
      </div>
      <OnboardingTour />
    </div>
  );
}
