import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-md border border-line bg-white p-5 shadow-panel", className)}>{children}</section>;
}

export function CardHeader({ title, action, eyebrow }: { title: string; action?: ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-wide text-muted">{eyebrow}</p> : null}
        <h2 className="text-base font-semibold text-ink">{title}</h2>
      </div>
      {action}
    </div>
  );
}
