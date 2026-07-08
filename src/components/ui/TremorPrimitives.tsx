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

const chartTones = {
  blue: { stroke: "#2563eb", fill: "#dbeafe", bar: "bg-blue-600", soft: "bg-blue-50 text-blue-700 border-blue-200" },
  green: { stroke: "#059669", fill: "#d1fae5", bar: "bg-emerald-600", soft: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  amber: { stroke: "#d97706", fill: "#fef3c7", bar: "bg-amber-500", soft: "bg-amber-50 text-amber-800 border-amber-200" },
  red: { stroke: "#dc2626", fill: "#fee2e2", bar: "bg-red-600", soft: "bg-red-50 text-red-700 border-red-200" }
};

export function AreaTrend({
  values,
  tone = "blue",
  label
}: {
  values: number[];
  tone?: keyof typeof chartTones;
  label: string;
}) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = Math.max(max - min, 1);
  const points = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * 100;
    const y = 54 - ((value - min) / span) * 42;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const line = points.join(" ");
  const area = `0,60 ${line} 100,60`;
  const toneValue = chartTones[tone];

  return (
    <div className="min-w-0 rounded-xl border border-line bg-white p-4 shadow-tremor">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="truncate text-sm font-semibold text-ink">{label}</p>
        <span className={cn("rounded-full border px-2 py-1 text-xs font-medium", toneValue.soft)}>Live</span>
      </div>
      <svg viewBox="0 0 100 64" className="h-32 w-full overflow-visible" role="img" aria-label={label} preserveAspectRatio="none">
        <polygon points={area} fill={toneValue.fill} opacity="0.75" />
        <polyline points={line} fill="none" stroke={toneValue.stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-kyne-draw" vectorEffect="non-scaling-stroke" />
        {points.map((point, index) => {
          const [cx, cy] = point.split(",");
          return <circle key={`${point}-${index}`} cx={cx} cy={cy} r="1.8" fill={toneValue.stroke} />;
        })}
      </svg>
    </div>
  );
}

export function BarMeterList({
  items,
  tone = "blue"
}: {
  items: Array<{ label: string; value: number; helper?: string }>;
  tone?: keyof typeof chartTones;
}) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.label} className="min-w-0">
          <div className="mb-2 flex items-center justify-between gap-3 text-sm">
            <div className="min-w-0">
              <p className="truncate font-semibold text-ink">{item.label}</p>
              {item.helper ? <p className="text-xs text-muted">{item.helper}</p> : null}
            </div>
            <p className="shrink-0 font-semibold text-ink">{item.value}%</p>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn("h-full rounded-full animate-kyne-rise", chartTones[tone].bar)}
              style={{ width: `${Math.max(5, (item.value / max) * 100)}%`, animationDelay: `${index * 90}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FlowRibbon({
  steps
}: {
  steps: Array<{ label: string; value: string; tone?: keyof typeof chartTones }>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => (
        <div key={step.label} className="relative min-w-0 rounded-xl border border-line bg-white p-4 shadow-tremor">
          <div className={cn("absolute left-0 top-0 h-1 w-full rounded-t-xl", chartTones[step.tone ?? "blue"].bar)} />
          {index < steps.length - 1 ? <div className="absolute right-[-18px] top-1/2 hidden h-px w-9 bg-line xl:block" /> : null}
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{step.label}</p>
          <p className="mt-2 truncate text-lg font-semibold text-ink">{step.value}</p>
        </div>
      ))}
    </div>
  );
}

export function PulseRail({ items }: { items: Array<{ label: string; detail: string; tone?: keyof typeof chartTones }> }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.label} className="flex gap-3">
          <div className="relative mt-1 flex w-5 justify-center">
            <span className={cn("h-3 w-3 rounded-full animate-kyne-pulse", chartTones[item.tone ?? "blue"].bar)} style={{ animationDelay: `${index * 160}ms` }} />
            {index < items.length - 1 ? <span className="absolute top-4 h-full w-px bg-line" /> : null}
          </div>
          <div className="min-w-0 pb-2">
            <p className="font-semibold text-ink">{item.label}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
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
