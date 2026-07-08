import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-xl border border-line bg-white p-6 shadow-panel", className)}>{children}</section>;
}

export function CardHeader({ title, action, eyebrow, description }: { title: string; action?: ReactNode; eyebrow?: string; description?: string }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-5">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-wide text-muted">{eyebrow}</p> : null}
        <h2 className="mt-1 text-lg font-semibold text-ink">{title}</h2>
        {description ? <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
