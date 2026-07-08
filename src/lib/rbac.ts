import type { Role } from "@/domain/types";

export const roleHome: Record<Role, string> = {
  operator: "/portfolio",
  compliance: "/approvals",
  admin: "/portfolio"
};

export const roleAccess: Record<Role, string[]> = {
  operator: ["portfolio", "data", "workflows", "workspace", "hands", "runs", "customers"],
  compliance: ["portfolio", "data", "hands", "approvals", "runs", "customers"],
  admin: ["portfolio", "data", "workflows", "workspace", "hands", "approvals", "runs", "customers", "settings"]
};

export const roleNames: Record<Role, string> = {
  operator: "Operator",
  compliance: "Compliance Officer",
  admin: "Admin"
};

export const roleAccessSummary: Record<Role, string[]> = {
  operator: ["Draft Banking Hands", "Monitor runs", "Review customers"],
  compliance: ["Resolve approvals", "Inspect audit trails", "Review policy gates"],
  admin: ["Manage workspace", "Configure settings", "Access all modules"]
};

export function isRole(value: string | null): value is Role {
  return value === "operator" || value === "compliance" || value === "admin";
}

export function canAccessRoute(role: Role, root: string) {
  return roleAccess[role].includes(root);
}
