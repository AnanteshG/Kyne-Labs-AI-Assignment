import { cn } from "@/lib/utils";

export function Metric({ label, value, helper, className }: { label: string; value: string; helper?: string; className?: string }) {
  return (
    <div className={cn("rounded-md border border-line bg-white p-4 shadow-panel", className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
      {helper ? <p className="mt-1 text-sm text-muted">{helper}</p> : null}
    </div>
  );
}
