import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700",
  secondary: "border border-line bg-white text-ink shadow-sm hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
  danger: "bg-red-600 text-white hover:bg-red-700"
};

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn("tremor-focus inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition", variants[variant], className)}
      {...props}
    />
  );
}
