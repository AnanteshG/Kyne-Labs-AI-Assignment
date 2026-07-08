export type Role = "operator" | "compliance" | "admin" | "ops_leader";
export type Mode = "debt_collection" | "invoice_collection" | "cross_sell";
export type ReadinessStatus = "ready" | "review" | "blocked";
export type HandStatus = "draft" | "validated" | "approval_required" | "approved" | "scheduled" | "running" | "completed";
export type ApprovalStatus = "pending" | "approved" | "changes_requested" | "rejected";
export type RiskLevel = "low" | "medium" | "high";

export interface User {
  id: string;
  name: string;
  role: Role;
  team: string;
}

export interface PortfolioSummary {
  totalAccounts: number;
  totalExposure: number;
  atRiskExposure: number;
  overdueBorrowers: number;
  recoveryRate: number;
  promiseToPayRate: number;
  contactableRate: number;
  changedSinceLastRun: string[];
  delinquencyBuckets: Array<{ label: string; accounts: number; exposure: number; trend: number }>;
  recentRunOutcomes: Array<{ label: string; value: string; detail: string }>;
  recommendedAction: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: "file" | "connector";
  status: ReadinessStatus;
  records: number;
  lastSync: string;
}

export interface PolicyPack {
  id: string;
  name: string;
  jurisdiction: string;
  status: ReadinessStatus;
  rules: number;
  updatedAt: string;
}

export interface ValidationReport {
  id: string;
  status: ReadinessStatus;
  checkedAt: string;
  passed: number;
  warnings: number;
  blockers: Array<{ id: string; label: string; owner: Role; detail: string }>;
}

export interface Customer {
  id: string;
  name: string;
  segment: string;
  dpd: number;
  balance: number;
  contactable: boolean;
  consent: "valid" | "missing" | "expired";
  risk: RiskLevel;
  lastContact: string;
  nextBestAction: string;
}

export interface BorrowerPersona {
  id: string;
  borrower: string;
  outstanding: number;
  persona: string;
  dpdBucket: string;
  signals: string[];
  nextAction: string;
}

export interface CoworkerArtifact {
  id: string;
  type: "audience" | "schedule" | "message" | "compliance" | "approval";
  title: string;
  status: ReadinessStatus;
  summary: string;
}

export interface BankingHand {
  id: string;
  name: string;
  mode: Mode;
  status: HandStatus;
  owner: string;
  risk: RiskLevel;
  audience: string;
  targetSegment: string;
  channels: string[];
  approvalState: ApprovalStatus;
  lastRunOutcome: string;
  nextAction: string;
  approvalsRequired: number;
  approvalsResolved: number;
  createdAt: string;
}

export interface Approval {
  id: string;
  handId: string;
  title: string;
  status: ApprovalStatus;
  reviewerRole: Role;
  risk: RiskLevel;
  reason: string;
  segmentAffected: string;
  policyChecks: Array<{ label: string; result: ReadinessStatus; detail: string }>;
  messagePreview: string;
  riskSummary: string;
  aiRationale: string;
  requestedAt: string;
}

export interface Run {
  id: string;
  handId: string;
  status: "queued" | "running" | "paused" | "failed" | "complete";
  progress: number;
  borrowersProcessed: number;
  messagesSent: number;
  skippedBorrowers: number;
  borrowerReplies: number;
  reviewRequired: number;
  contacted: number;
  failed: number;
  outcomes: Array<{ label: string; value: number }>;
}

export interface AuditEvent {
  id: string;
  at: string;
  actor: string;
  actorType: "ai" | "user" | "system";
  action: string;
  entity: string;
  policyResult: ReadinessStatus;
  detail: string;
}

export interface RunEvent {
  id: string;
  type: "run.started" | "run.progress" | "message.sent" | "message.failed" | "borrower.replied" | "agent_review_required" | "run.completed" | "run.failed" | "artifact_updated" | "approval.resolved";
  at: string;
  label: string;
  detail: string;
}

export interface Integration {
  id: string;
  name: string;
  status: ReadinessStatus;
  category: string;
  dataIn: string;
  dataOut: string;
}

export interface ApiContract {
  method: "GET" | "POST";
  path: string;
  owner: string;
  purpose: string;
  realtime?: "REST" | "SSE";
}
