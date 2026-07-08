import type { Mode, Role } from "./types";

export const modes: Array<{ value: Mode; label: string }> = [
  { value: "debt_collection", label: "Debt Collection" },
  { value: "invoice_collection", label: "Invoice Collection" },
  { value: "cross_sell", label: "Cross-sell" }
];

export const roles: Array<{ value: Role; label: string; description: string }> = [
  { value: "operator", label: "Operator", description: "Build and run governed banking hands." },
  { value: "compliance", label: "Compliance", description: "Review approvals, policy gates, and audit evidence." },
  { value: "admin", label: "Admin", description: "Manage teams, integrations, and tenant settings." }
];
