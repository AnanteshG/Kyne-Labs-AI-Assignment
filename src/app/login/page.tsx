import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { roles } from "@/domain/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-canvas px-5 py-12 operational-grid">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_440px]">
        <section className="flex min-h-[620px] flex-col justify-between rounded-2xl border border-line bg-white p-10 shadow-raised">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-ink text-white">
              <ShieldCheck size={24} />
            </div>
            <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted">Kyne Labs AI</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight text-ink">
              Regulated banking operations, governed from portfolio to customer contact.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Operators, compliance teams, and admins share one cockpit for portfolio health, policy readiness,
              approvals, execution monitoring, and audit evidence.
            </p>
          </div>
          <div className="grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
            {["Portfolio first", "Governance visible", "Coworker driven"].map((item) => (
              <div key={item} className="rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>
        <Card className="self-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Secure entry</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">Choose your role</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Select the workspace view you want to review.</p>
          <div className="mt-6 space-y-3">
            {roles.map((role) => (
              <Link
                href={`/portfolio?role=${role.value}`}
                key={role.value}
                className="block rounded-xl border border-line bg-white p-5 transition hover:border-slate-400 hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{role.label}</p>
                    <p className="mt-1 text-sm text-muted">{role.description}</p>
                  </div>
                  <Button variant="secondary">Enter</Button>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
