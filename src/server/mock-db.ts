import type {
  Approval,
  AuditEvent,
  BankingHand,
  Customer,
  CoworkerArtifact,
  DataSource,
  PolicyPack,
  PortfolioSummary,
  Run,
  RunEvent,
  User,
  ValidationReport
} from "@/domain/types";

export const users: User[] = [
  { id: "u1", name: "Anantesh", role: "operator", team: "Collections Ops" },
  { id: "u2", name: "Mira Shah", role: "compliance", team: "Banking Compliance" },
  { id: "u3", name: "Dev Arora", role: "admin", team: "Platform Admin" }
];

export const portfolio: PortfolioSummary = {
  totalAccounts: 48210,
  totalExposure: 184200000,
  atRiskExposure: 38200000,
  promiseToPayRate: 31.8,
  contactableRate: 84.6,
  changedSinceLastRun: [
    "30-59 DPD exposure dropped by 4.2% after compliant SMS follow-up.",
    "West region voice channel paused because consent validation needs review.",
    "1,248 customers moved from high risk to monitored after promise-to-pay capture."
  ],
  delinquencyBuckets: [
    { label: "1-29 DPD", accounts: 18200, exposure: 42600000, trend: -1.4 },
    { label: "30-59 DPD", accounts: 11420, exposure: 38200000, trend: -4.2 },
    { label: "60-89 DPD", accounts: 7420, exposure: 29800000, trend: 2.1 },
    { label: "90+ DPD", accounts: 3160, exposure: 18600000, trend: 1.8 }
  ]
};

export const dataSources: DataSource[] = [
  { id: "ds1", name: "Core banking accounts", type: "connector", status: "ready", records: 48210, lastSync: "12 min ago" },
  { id: "ds2", name: "Consent registry", type: "connector", status: "review", records: 47102, lastSync: "34 min ago" },
  { id: "ds3", name: "Collections outcomes CSV", type: "file", status: "ready", records: 11940, lastSync: "Today, 09:20" }
];

export const policyPacks: PolicyPack[] = [
  { id: "pp1", name: "US consumer collections", jurisdiction: "Federal + state overlays", status: "ready", rules: 146, updatedAt: "Today" },
  { id: "pp2", name: "Do-not-contact and quiet hours", jurisdiction: "Tenant policy", status: "review", rules: 38, updatedAt: "Yesterday" },
  { id: "pp3", name: "Voice call approval pack", jurisdiction: "State-specific", status: "blocked", rules: 54, updatedAt: "3 days ago" }
];

export const validationReport: ValidationReport = {
  id: "vr1",
  status: "review",
  checkedAt: "Today, 11:46",
  passed: 42,
  warnings: 3,
  blockers: [
    {
      id: "b1",
      label: "Voice consent mismatch",
      owner: "compliance",
      detail: "713 customers are eligible for SMS but need voice consent review before call campaigns."
    },
    {
      id: "b2",
      label: "Quiet-hour override missing",
      owner: "admin",
      detail: "Two western states need local quiet-hour configuration before scheduling outreach."
    }
  ]
};

export const customers: Customer[] = [
  { id: "c1", name: "Jordan Lee", segment: "30-59 DPD", dpd: 42, balance: 1280, contactable: true, consent: "valid", risk: "medium", lastContact: "2 days ago", nextBestAction: "SMS reminder with payment plan link" },
  { id: "c2", name: "Priya Raman", segment: "60-89 DPD", dpd: 67, balance: 2860, contactable: true, consent: "valid", risk: "high", lastContact: "6 days ago", nextBestAction: "Human review before voice outreach" },
  { id: "c3", name: "Miguel Torres", segment: "1-29 DPD", dpd: 18, balance: 640, contactable: false, consent: "missing", risk: "low", lastContact: "Never", nextBestAction: "Suppress outbound contact" },
  { id: "c4", name: "Sara Williams", segment: "30-59 DPD", dpd: 51, balance: 1540, contactable: true, consent: "expired", risk: "medium", lastContact: "9 days ago", nextBestAction: "Consent refresh email" }
];

export const artifacts: CoworkerArtifact[] = [
  { id: "a1", type: "audience", title: "30-59 DPD audience", status: "ready", summary: "11,420 customers, SMS eligible, excludes active disputes and DNC matches." },
  { id: "a2", type: "schedule", title: "Compliant outreach schedule", status: "review", summary: "Two SMS touches over five days, local quiet hours enforced by jurisdiction." },
  { id: "a3", type: "message", title: "Message strategy", status: "ready", summary: "Plain-language reminder with payment link and opt-out instructions." },
  { id: "a4", type: "compliance", title: "Governance checks", status: "review", summary: "Requires compliance sign-off for voice fallback and quiet-hour policy edge cases." }
];

export const hands: BankingHand[] = [
  { id: "h1", name: "30-59 DPD payment reminder", mode: "debt_collection", status: "governance_review", owner: "Anantesh", risk: "medium", audience: "11,420 customers", channels: ["SMS", "Email"], nextAction: "Compliance review", approvalsRequired: 2, approvalsResolved: 1, createdAt: "Today" },
  { id: "h2", name: "Invoice nudge for SMB portfolio", mode: "invoice_collection", status: "approved", owner: "Mira Shah", risk: "low", audience: "2,880 invoices", channels: ["Email"], nextAction: "Schedule run", approvalsRequired: 1, approvalsResolved: 1, createdAt: "Yesterday" },
  { id: "h3", name: "Card upgrade eligibility outreach", mode: "cross_sell", status: "draft", owner: "Dev Arora", risk: "medium", audience: "8,440 eligible customers", channels: ["Email", "SMS"], nextAction: "Resolve consent policy", approvalsRequired: 2, approvalsResolved: 0, createdAt: "2 days ago" }
];

export const approvals: Approval[] = [
  { id: "ap1", handId: "h1", title: "Approve SMS copy for 30-59 DPD", status: "pending", reviewerRole: "compliance", risk: "medium", reason: "Outbound customer contact requires message and opt-out review.", requestedAt: "Today, 12:10" },
  { id: "ap2", handId: "h1", title: "Approve quiet-hour policy edge cases", status: "approved", reviewerRole: "compliance", risk: "medium", reason: "Two states require explicit schedule acknowledgement.", requestedAt: "Today, 11:58" },
  { id: "ap3", handId: "h3", title: "Resolve cross-sell consent basis", status: "changes_requested", reviewerRole: "compliance", risk: "high", reason: "Consent basis unclear for 1,204 customers.", requestedAt: "Yesterday" }
];

export const runs: Run[] = [
  {
    id: "r1",
    handId: "h1",
    status: "paused",
    progress: 62,
    contacted: 7084,
    failed: 118,
    outcomes: [
      { label: "Promises to pay", value: 2216 },
      { label: "Payment links opened", value: 3860 },
      { label: "Suppressed by policy", value: 713 }
    ]
  }
];

export const runEvents: RunEvent[] = [
  { id: "e1", type: "run.progress", at: "12:10", label: "Run started", detail: "SMS channel opened for 30-59 DPD audience." },
  { id: "e2", type: "artifact_updated", at: "12:22", label: "Audience filtered", detail: "713 customers removed for voice consent mismatch." },
  { id: "e3", type: "hitl_required", at: "12:41", label: "Human approval required", detail: "Quiet-hour rule conflict detected in western region." },
  { id: "e4", type: "run.failed", at: "12:49", label: "Delivery failures", detail: "118 SMS sends failed due to carrier errors." }
];

export const auditEvents: AuditEvent[] = [
  { id: "au1", at: "11:44", actor: "Agent OS", action: "Validation completed", detail: "Policy pack and audience rules evaluated." },
  { id: "au2", at: "11:58", actor: "Mira Shah", action: "Approval granted", detail: "Quiet-hour edge cases approved for SMS only." },
  { id: "au3", at: "12:41", actor: "Agent OS", action: "Run paused", detail: "Human review requested before voice fallback." }
];
