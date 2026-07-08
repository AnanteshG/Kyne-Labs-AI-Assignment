import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-slate-800",
  secondary: "border border-line bg-white text-ink hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
  danger: "bg-orange-700 text-white hover:bg-orange-800"
};

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn("inline-flex min-h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-semibold transition", variants[variant], className)}
      {...props}
    />
  );
}
