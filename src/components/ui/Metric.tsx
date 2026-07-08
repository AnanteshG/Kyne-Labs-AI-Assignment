import { cn } from "@/lib/utils";

const accents = {
  neutral: "border-line",
  blue: "border-blue-200 bg-white",
  green: "border-emerald-200 bg-white",
  amber: "border-amber-200 bg-white",
  orange: "border-red-200 bg-white"
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
    <div className={cn("rounded-xl border bg-white p-5 shadow-tremor", accents[accent], className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">{value}</p>
      {helper ? <p className="mt-2 text-sm leading-5 text-muted">{helper}</p> : null}
    </div>
  );
}
