import { cn } from "@/lib/utils";

const accents = {
  neutral: "border-line",
  blue: "border-blue-200 bg-blue-50/30",
  green: "border-emerald-200 bg-emerald-50/40",
  amber: "border-amber-200 bg-amber-50/40",
  orange: "border-orange-200 bg-orange-50/40"
};

export function Metric({
  label,
  value,
  helper,
  className,
  accent = "neutral"
}: {
  label: string;
  value: string;
  helper?: string;
  className?: string;
  accent?: keyof typeof accents;
}) {
  return (
    <div className={cn("rounded-lg border bg-white p-4 shadow-panel", accents[accent], className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
      {helper ? <p className="mt-1 text-sm text-muted">{helper}</p> : null}
    </div>
  );
}
