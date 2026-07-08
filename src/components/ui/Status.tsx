import { Badge } from "./Badge";
import type { ApprovalStatus, HandStatus, ReadinessStatus, RiskLevel } from "@/domain/types";

export function readinessTone(status: ReadinessStatus) {
  return status === "ready" ? "success" : status === "blocked" ? "danger" : "warning";
}

export function riskTone(risk: RiskLevel) {
  return risk === "low" ? "success" : risk === "high" ? "danger" : "warning";
}

export function handTone(status: HandStatus) {
  if (status === "complete" || status === "approved") return "success";
  if (status === "running") return "info";
  if (status === "governance_review") return "warning";
  return "neutral";
}

export function approvalTone(status: ApprovalStatus) {
  if (status === "approved") return "success";
  if (status === "rejected") return "danger";
  if (status === "changes_requested") return "warning";
  return "info";
}

export function StatusBadge({ label, tone }: { label: string; tone: ReturnType<typeof readinessTone> }) {
  return <Badge tone={tone}>{label.replace(/_/g, " ")}</Badge>;
}
