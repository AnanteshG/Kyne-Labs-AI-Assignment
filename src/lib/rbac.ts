import type { Role } from "@/domain/types";

export const roleHome: Record<Role, string> = {
  operator: "/portfolio",
  compliance: "/approvals",
  admin: "/portfolio",
  ops_leader: "/portfolio"
};

export const roleAccess: Record<Role, string[]> = {
  operator: ["portfolio", "data", "protocol-hub", "workspace", "coworker", "workflows", "hands", "runs", "audit", "integrations", "customers"],
  compliance: ["portfolio", "data", "protocol-hub", "workflows", "hands", "approvals", "runs", "audit", "integrations", "customers"],
  admin: ["portfolio", "data", "protocol-hub", "workspace", "coworker", "workflows", "hands", "approvals", "runs", "audit", "integrations", "customers", "settings"],
  ops_leader: ["portfolio", "data", "workflows", "hands", "approvals", "runs", "audit", "integrations", "customers"]
};

export const roleNames: Record<Role, string> = {
  operator: "Operator",
  compliance: "Compliance Officer",
  admin: "Admin",
  ops_leader: "Ops Leader"
};

export const roleAccessSummary: Record<Role, string[]> = {
  operator: ["Draft Banking Hands", "Monitor runs", "Review borrowers"],
  compliance: ["Resolve approvals", "Inspect audit trails", "Review policy gates"],
  admin: ["Manage workspace", "Configure settings", "Access all modules"],
  ops_leader: ["View portfolio outcomes", "Monitor recovery performance", "Review team metrics"]
};

export function isRole(value: string | null): value is Role {
  return value === "operator" || value === "compliance" || value === "admin" || value === "ops_leader";
}

export function canAccessRoute(role: Role, root: string) {
  return roleAccess[role].includes(root);
}
