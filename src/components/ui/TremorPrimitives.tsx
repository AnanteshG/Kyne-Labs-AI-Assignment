import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function ProgressBar({ value, tone = "blue" }: { value: number; tone?: "blue" | "green" | "amber" | "red" }) {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-emerald-600",
    amber: "bg-amber-500",
    red: "bg-red-600"
  };
  return (
    <div className="h-2 w-full rounded-full bg-slate-100">
      <div className={cn("h-2 rounded-full", colors[tone])} style={{ width: `${Math.max(4, Math.min(100, value))}%` }} />
    </div>
  );
}

export function Delta({ value }: { value: number }) {
  const positive = value > 0;
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-1 text-xs font-medium", positive ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700")}>
      {positive ? "+" : ""}
      {value}%
    </span>
  );
}

export function MiniSparkline({ tone = "blue" }: { tone?: "blue" | "green" | "amber" }) {
  const stroke = tone === "green" ? "#059669" : tone === "amber" ? "#d97706" : "#2563eb";
  return (
    <svg viewBox="0 0 120 36" className="h-9 w-full" role="img" aria-label="Trend">
      <path d="M2 28 C16 26, 20 20, 30 22 S48 30, 58 18 S76 8, 88 13 S105 24, 118 9" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function DonutMeter({ value, label, children }: { value: number; label: string; children?: ReactNode }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex items-center gap-5">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#2563eb" strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-ink">{value}%</div>
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        {children ? <div className="mt-2 text-sm leading-6 text-muted">{children}</div> : null}
      </div>
    </div>
  );
}

export function Stepper({ current = 1 }: { current?: number }) {
  const steps = ["Portfolio", "Readiness", "Draft", "Approve", "Run", "Audit"];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <div key={step} className={cn("flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium", index <= current ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-500")}>
          <span className={cn("h-1.5 w-1.5 rounded-full", index <= current ? "bg-blue-600" : "bg-slate-300")} />
          {step}
        </div>
      ))}
    </div>
  );
}
