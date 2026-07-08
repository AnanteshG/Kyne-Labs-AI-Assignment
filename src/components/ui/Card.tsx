import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function Card({ children, className, ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return <section className={cn("min-w-0 rounded-xl border border-line bg-white p-5 shadow-tremor sm:p-6", className)} {...props}>{children}</section>;
}

export function CardHeader({ title, action, eyebrow, description }: { title: string; action?: ReactNode; eyebrow?: string; description?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-wide text-muted">{eyebrow}</p> : null}
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-ink">{title}</h2>
        {description ? <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
