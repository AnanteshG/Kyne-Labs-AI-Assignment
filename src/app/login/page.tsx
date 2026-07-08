"use client";

import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { roles } from "@/domain/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AreaTrend, FlowRibbon } from "@/components/ui/TremorPrimitives";
import { roleAccessSummary, roleHome, roleNames } from "@/lib/rbac";
import type { Role } from "@/domain/types";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("admin");

  function enterWorkspace() {
    localStorage.setItem("kyne-role", selectedRole);
    router.push(roleHome[selectedRole]);
  }

  return (
    <main className="min-h-screen bg-canvas px-5 py-10 operational-grid">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <section className="flex min-h-[620px] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-raised sm:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.32)]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-blue-700">Kyne AI Ops</p>
                <p className="text-xs font-semibold text-muted">Regulated banking command center</p>
              </div>
            </div>
            <h1 className="mt-8 max-w-3xl text-4xl font-black leading-tight text-ink sm:text-5xl">
              Enter the workspace with the right operational permissions.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Choose a demo role to see realistic access boundaries across portfolio health, Protocol Hub readiness,
              AI coworker artifacts, Banking Hands, approvals, runs, audit, integrations, and system design.
            </p>
            <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_1.1fr]">
              <AreaTrend label="Governed recovery trend" tone="green" values={[42, 48, 51, 56, 61, 67, 72, 79]} />
              <FlowRibbon
                steps={[
                  { label: "Data", value: "Ready", tone: "green" },
                  { label: "Policy", value: "Active", tone: "blue" },
                  { label: "Review", value: "Queued", tone: "amber" },
                  { label: "Audit", value: "On", tone: "green" }
                ]}
              />
            </div>
          </div>
          <div className="grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
            {[
              ["Portfolio first", "Start from account health and exposure movement."],
              ["Governance visible", "Policy, consent, approval, and audit stay attached."],
              ["Coworker driven", "Limbus helps draft and explain Banking Hands."]
            ].map(([title, detail]) => (
              <div key={title} className="rounded-xl border border-line bg-slate-50 p-4">
                <p className="text-sm font-bold text-ink">{title}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
              </div>
            ))}
          </div>
        </section>
        <Card className="self-center border-blue-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Secure demo entry</p>
              <h2 className="mt-2 text-2xl font-black text-ink">Choose your role</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Navigation and route access update immediately after login.</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <LockKeyhole size={21} />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {roles.map((role) => (
              <button
                type="button"
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`tremor-focus block w-full rounded-xl border p-5 text-left transition ${
                  selectedRole === role.value
                    ? "border-blue-300 bg-blue-50 shadow-[0_12px_30px_rgba(37,99,235,0.12)]"
                    : "border-line bg-white hover:border-blue-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold text-ink">{roleNames[role.value]}</p>
                    <p className="mt-1 text-sm text-muted">{role.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {roleAccessSummary[role.value].map((item) => (
                        <span key={item} className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                          <CheckCircle2 size={12} />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selectedRole === role.value ? "border-blue-600 bg-blue-600 text-white" : "border-line text-transparent"}`}>
                    <CheckCircle2 size={13} />
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-line bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-ink">
              <Sparkles size={16} className="text-blue-700" />
              Selected: {roleNames[selectedRole]}
            </div>
            <p className="mt-2 text-xs leading-5 text-muted">
              This prototype stores the role locally and filters the app shell to show only the modules available to that role.
            </p>
          </div>

          <Button className="mt-6 w-full gap-2" onClick={enterWorkspace}>
            Enter workspace
            <ArrowRight size={16} />
          </Button>
        </Card>
      </div>
    </main>
  );
}
