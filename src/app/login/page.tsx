"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { roles } from "@/domain/constants";
import type { Role } from "@/domain/types";
import { roleHome, roleNames } from "@/lib/rbac";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("admin");

  function enterWorkspace() {
    localStorage.setItem("kyne-role", selectedRole);
    router.push(roleHome[selectedRole]);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-6 py-12">
      <section className="w-full max-w-md">
        <p className="text-sm font-black uppercase tracking-wide text-blue-700">Kyne AI Ops</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-ink">Sign in</h1>
        <p className="mt-3 text-sm leading-6 text-muted">Choose a demo role to enter the workspace.</p>

        <div className="mt-10 space-y-1">
          {roles.map((role) => {
            const selected = selectedRole === role.value;
            return (
              <button
                key={role.value}
                type="button"
                onClick={() => setSelectedRole(role.value)}
                className={cn(
                  "tremor-focus flex w-full items-center justify-between gap-4 py-4 text-left transition",
                  selected ? "text-blue-700" : "text-ink hover:text-blue-700"
                )}
              >
                <span>
                  <span className="block text-base font-bold">{roleNames[role.value]}</span>
                  <span className="mt-1 block text-sm leading-5 text-muted">{role.description}</span>
                </span>
                <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full", selected ? "bg-blue-600 text-white" : "bg-slate-200 text-transparent")}>
                  <CheckCircle2 size={15} />
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={enterWorkspace}
          className="tremor-focus mt-10 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Continue as {roleNames[selectedRole]}
          <ArrowRight size={16} />
        </button>
      </section>
    </main>
  );
}
