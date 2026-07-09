import type {
  Approval,
  AuditEvent,
  BankingHand,
  BorrowerPersona,
  Customer,
  CoworkerArtifact,
  DataSource,
  Integration,
  ApiContract,
  PolicyPack,
  PortfolioSummary,
  Run,
  RunEvent,
  SimulationReport,
  SimulationVariant,
  User,
  ValidationReport
} from "@/domain/types";

export const users: User[] = [
  { id: "u1", name: "Anantesh", role: "operator", team: "Collections Ops" },
  { id: "u2", name: "Mira Shah", role: "compliance", team: "Banking Compliance" },
  { id: "u3", name: "Dev Arora", role: "admin", team: "Platform Admin" },
  { id: "u4", name: "Riya Menon", role: "ops_leader", team: "Recovery Strategy" }
];

export const portfolio: PortfolioSummary = {
  totalAccounts: 48210,
  totalExposure: 184200000,
  atRiskExposure: 38200000,
  overdueBorrowers: 22210,
  recoveryRate: 18.7,
  promiseToPayRate: 31.8,
  contactableRate: 84.6,
  changedSinceLastRun: [
    "30-59 DPD exposure dropped by 4.2% after compliant SMS follow-up.",
    "West region voice channel paused because consent validation needs review.",
    "1,248 borrowers moved from high risk to monitored after promise-to-pay capture."
  ],
  delinquencyBuckets: [
    { label: "0-29 DPD", accounts: 18200, exposure: 42600000, trend: -1.4 },
    { label: "30-59 DPD", accounts: 11420, exposure: 38200000, trend: -4.2 },
    { label: "60-89 DPD", accounts: 7420, exposure: 29800000, trend: 2.1 },
    { label: "90+ DPD", accounts: 3160, exposure: 18600000, trend: 1.8 }
  ],
  recentRunOutcomes: [
    { label: "Promises captured", value: "2,216", detail: "$1.9M expected recovery from the paused 30-59 DPD run." },
    { label: "Borrower replies", value: "684", detail: "Payment intent and hardship messages routed back into cases." },
    { label: "Policy suppressions", value: "713", detail: "DNC, consent, and quiet-hour checks stopped borrower contact." }
  ],
  recommendedAction: "Create a governed 30-59 DPD SMS-first Banking Hand for cooperative borrowers, with email fallback and voice blocked until consent review clears."
};

export const borrowerPersonas: BorrowerPersona[] = [
  {
    id: "bp1",
    borrower: "Myra",
    outstanding: 2345,
    persona: "Cooperative, non-confrontational",
    dpdBucket: "30-59 DPD",
    signals: ["Voice", "DSR 98%", "next review Mar 12"],
    nextAction: "Send warm SMS reminder with payment-plan link."
  },
  {
    id: "bp2",
    borrower: "Elena",
    outstanding: 1384,
    persona: "Financially strapped cooperative engager",
    dpdBucket: "30-59 DPD",
    signals: ["SMS opt-in", "payment intent", "callback Mar 18"],
    nextAction: "Offer hardship-friendly email fallback after SMS."
  },
  {
    id: "bp3",
    borrower: "Jordan",
    outstanding: 3120,
    persona: "Sloppy payer / deferring compliant",
    dpdBucket: "60-89 DPD",
    signals: ["Deferral pattern", "six-month ask", "commitment due Apr 02"],
    nextAction: "Escalate if no reply after compliant second touch."
  },
  {
    id: "bp4",
    borrower: "Marcus",
    outstanding: 892,
    persona: "Cooperative payer / fast resolution",
    dpdBucket: "0-29 DPD",
    signals: ["Paid in full path", "low friction", "closed loop Mar 08"],
    nextAction: "Use low-friction payment link and close loop quickly."
  }
];

export const dataSources: DataSource[] = [
  { id: "ds1", name: "Portfolio upload - borrower accounts", type: "file", status: "ready", records: 48210, lastSync: "Today, 09:20" },
  { id: "ds2", name: "Borrower data readiness", type: "connector", status: "ready", records: 48210, lastSync: "12 min ago" },
  { id: "ds3", name: "Consent registry", type: "connector", status: "review", records: 47102, lastSync: "34 min ago" },
  { id: "ds4", name: "DNC suppression list", type: "file", status: "ready", records: 2314, lastSync: "Today, 10:05" }
];

export const policyPacks: PolicyPack[] = [
  { id: "pp1", name: "Protocol Hub active policy pack", jurisdiction: "Federal + state overlays", status: "ready", rules: 146, updatedAt: "Today" },
  { id: "pp2", name: "Regional quiet-hour rules", jurisdiction: "State-specific", status: "review", rules: 38, updatedAt: "Yesterday" },
  { id: "pp3", name: "Industry standards and FDCPA checks", jurisdiction: "US collections standards", status: "ready", rules: 72, updatedAt: "Today" },
  { id: "pp4", name: "Company playbooks and voice approvals", jurisdiction: "Tenant policy", status: "blocked", rules: 54, updatedAt: "3 days ago" }
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
      detail: "713 borrowers are eligible for SMS but need voice consent review before call campaigns."
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
  { id: "a1", type: "audience", title: "Target segment", status: "ready", summary: "30-59 DPD cooperative borrowers, 11,420 accounts, excludes disputes, DNC, expired consent, and hardship holds." },
  { id: "a2", type: "schedule", title: "Outreach sequence", status: "review", summary: "Day 0 SMS, wait 48 hours, Day 2 email fallback, wait 72 hours, Day 5 voice or human handoff only if approved." },
  { id: "a3", type: "message", title: "Compliance-safe templates", status: "ready", summary: "Plain-language borrower reminder with secure payment link, opt-out language, no threat language, and quiet-hour enforcement." },
  { id: "a4", type: "compliance", title: "HITL approval requirement", status: "review", summary: "Compliance must approve SMS copy, quiet-hour exceptions, and any voice fallback before borrower-facing execution." }
];

export const hands: BankingHand[] = [
  { id: "h1", name: "30-59 DPD cooperative borrower recovery", mode: "debt_collection", status: "approval_required", owner: "Anantesh", risk: "medium", audience: "11,420 borrowers", targetSegment: "30-59 DPD cooperative borrowers", channels: ["SMS", "Email", "Voice handoff"], approvalState: "pending", lastRunOutcome: "62% processed, $1.9M expected recovery, paused for HITL", nextAction: "Compliance review", approvalsRequired: 2, approvalsResolved: 1, createdAt: "Today" },
  { id: "h2", name: "SMB invoice collection nudge", mode: "invoice_collection", status: "approved", owner: "Mira Shah", risk: "low", audience: "2,880 invoices", targetSegment: "Overdue SMB invoices under 45 days", channels: ["Email"], approvalState: "approved", lastRunOutcome: "84% delivered, 19% paid within 7 days", nextAction: "Schedule run", approvalsRequired: 1, approvalsResolved: 1, createdAt: "Yesterday" },
  { id: "h3", name: "Card upgrade eligibility outreach", mode: "cross_sell", status: "draft", owner: "Dev Arora", risk: "medium", audience: "8,440 borrowers", targetSegment: "Eligible borrowers with explicit marketing consent", channels: ["Email", "SMS"], approvalState: "changes_requested", lastRunOutcome: "Not run - consent basis incomplete", nextAction: "Resolve consent policy", approvalsRequired: 2, approvalsResolved: 0, createdAt: "2 days ago" }
];

export const simulationReports: SimulationReport[] = [
  {
    id: "sr1",
    tenantId: "t1",
    handId: "h1",
    handVersionId: "hv4",
    handVersionLabel: "v4",
    policyPackId: "pp2",
    policyPackVersion: "v12",
    status: "completed",
    targetSegment: "30–59 DPD cooperative borrowers",
    totalBorrowers: 2430,
    eligibleBorrowers: 2118,
    blockedBorrowers: 312,
    blockedBreakdown: {
      dnc: 94,
      missingConsent: 146,
      quietHours: 31,
      frequencyCap: 18,
      invalidContact: 23,
      policyBlocked: 0
    },
    expectedRecoveryAmount: 184000,
    expectedPromiseToPayRate: 18,
    optOutRisk: "low",
    complaintRisk: "medium",
    complianceRisk: "passed",
    recommendedVariantId: "sv1",
    createdAt: "Today, 12:02"
  }
];

export const simulationVariants: SimulationVariant[] = [
  {
    id: "sv1",
    name: "Variant A",
    channelOrder: "SMS → Email",
    expectedRecoveryAmount: 184000,
    riskLevel: "low",
    decision: "Recommended",
    notes: "Balanced delivery with compliant payment link scheduling."
  },
  {
    id: "sv2",
    name: "Variant B",
    channelOrder: "Voice → SMS",
    expectedRecoveryAmount: 211000,
    riskLevel: "medium",
    decision: "Needs stricter review",
    notes: "Higher recovery but higher compliance and opt-out sensitivity."
  },
  {
    id: "sv3",
    name: "Variant C",
    channelOrder: "Email only",
    expectedRecoveryAmount: 92000,
    riskLevel: "low",
    decision: "Weak recovery",
    notes: "Lowest delivery risk but modest recovery impact."
  },
  {
    id: "sv4",
    name: "Variant D",
    channelOrder: "SMS + payment plan",
    expectedRecoveryAmount: 167000,
    riskLevel: "very low",
    decision: "Safest option",
    notes: "Safest contact path with payment plan offer and minimal escalation."
  }
];

export const approvals: Approval[] = [
  {
    id: "ap1",
    handId: "h1",
    handVersionId: "hv4",
    policyPackId: "pp2",
    simulationReportId: "sr1",
    title: "Approve SMS copy for 30-59 DPD borrowers",
    status: "pending",
    reviewerRole: "compliance",
    risk: "medium",
    reason: "Borrower-facing collections message requires opt-out, tone, payment-link, and no-threat review.",
    segmentAffected: "11,420 cooperative borrowers in 30-59 DPD",
    policyChecks: [
      { label: "Consent", result: "ready", detail: "SMS consent valid for target segment." },
      { label: "DNC", result: "ready", detail: "Suppression list applied before draft generation." },
      { label: "Quiet hours", result: "review", detail: "Two western states require schedule confirmation." }
    ],
    messagePreview: "Hi {first_name}, your account is {dpd} days past due. Review payment options at {secure_link}. Reply STOP to opt out.",
    riskSummary: "Medium risk because the campaign is borrower-facing collections outreach across multiple jurisdictions.",
    aiRationale: "SMS-first is recommended because the segment has high opt-in coverage and cooperative payment intent signals.",
    requestedAt: "Today, 12:10"
  },
  {
    id: "ap2",
    handId: "h1",
    handVersionId: "hv4",
    policyPackId: "pp2",
    simulationReportId: "sr1",
    title: "Approve quiet-hour policy edge cases",
    status: "approved",
    reviewerRole: "compliance",
    risk: "medium",
    reason: "Two states require explicit schedule acknowledgement before outreach windows are published.",
    segmentAffected: "713 borrowers with regional schedule constraints",
    policyChecks: [
      { label: "Regional rules", result: "ready", detail: "State overlays loaded from Protocol Hub." },
      { label: "Runtime gate", result: "ready", detail: "Every touch will re-check local time." }
    ],
    messagePreview: "No message change. Schedule restricted to approved local windows.",
    riskSummary: "Approved for SMS/email only; voice remains blocked.",
    aiRationale: "Runtime quiet-hour checks reduce risk because eligibility can change between schedule and send time.",
    requestedAt: "Today, 11:58"
  },
  {
    id: "ap3",
    handId: "h3",
    title: "Resolve cross-sell consent basis",
    status: "changes_requested",
    reviewerRole: "compliance",
    risk: "high",
    reason: "Consent basis unclear for 1,204 borrowers and must be corrected before marketing outreach.",
    segmentAffected: "8,440 eligible borrowers",
    policyChecks: [
      { label: "Marketing consent", result: "blocked", detail: "1,204 borrowers have missing consent basis." },
      { label: "DNC", result: "ready", detail: "DNC suppression applied." }
    ],
    messagePreview: "Credit card upgrade invitation held until consent proof is attached.",
    riskSummary: "High risk because this is non-collections outreach and needs explicit consent evidence.",
    aiRationale: "The AI recommends narrowing the segment to consent-proven borrowers before resubmission.",
    requestedAt: "Yesterday"
  }
];

export const runs: Run[] = [
  {
    id: "r1",
    handId: "h1",
    status: "paused",
    progress: 62,
    borrowersProcessed: 7084,
    messagesSent: 6310,
    skippedBorrowers: 713,
    borrowerReplies: 684,
    reviewRequired: 2,
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
  { id: "e1", type: "run.started", at: "12:10", label: "run.started", detail: "SMS channel opened for 30-59 DPD cooperative borrower segment." },
  { id: "e2", type: "run.progress", at: "12:18", label: "run.progress", detail: "4,800 borrowers processed; runtime consent checks still passing." },
  { id: "e3", type: "message.sent", at: "12:22", label: "message.sent", detail: "SMS sent with opt-out language and secure payment link." },
  { id: "e4", type: "message.failed", at: "12:31", label: "message.failed", detail: "118 SMS sends failed due to carrier errors and entered retry queue." },
  { id: "e5", type: "borrower.replied", at: "12:36", label: "borrower.replied", detail: "Borrower asked for callback; case routed to human review." },
  { id: "e6", type: "agent_review_required", at: "12:41", label: "agent_review_required", detail: "Quiet-hour conflict detected before voice handoff in western region." },
  { id: "e7", type: "run.failed", at: "12:49", label: "run.failed", detail: "Voice fallback blocked until compliance resolves consent mismatch." }
];

export const auditEvents: AuditEvent[] = [
  { id: "au1", at: "2026-07-09 11:44:12", actor: "Agent OS", actorType: "ai", action: "Policy check completed", entity: "Hand h1", policyResult: "review", detail: "Protocol Hub rules, DNC, consent, and quiet-hour checks evaluated." },
  { id: "au2", at: "2026-07-09 11:58:44", actor: "Mira Shah", actorType: "user", action: "Approval decision recorded", entity: "Approval ap2", policyResult: "ready", detail: "Quiet-hour edge cases approved for SMS/email only." },
  { id: "au3", at: "2026-07-09 12:22:09", actor: "Execution worker", actorType: "system", action: "Message sent", entity: "Run r1", policyResult: "ready", detail: "SMS sent after runtime consent, DNC, and quiet-hour checks passed." },
  { id: "au4", at: "2026-07-09 12:36:37", actor: "Borrower reply parser", actorType: "ai", action: "Borrower reply classified", entity: "Conversation c1", policyResult: "ready", detail: "Payment intent detected and case note appended." },
  { id: "au5", at: "2026-07-09 12:41:18", actor: "Agent OS", actorType: "ai", action: "Run paused", entity: "Run r1", policyResult: "blocked", detail: "Human review requested before any voice fallback." }
];

export const integrations: Integration[] = [
  { id: "int1", name: "HubSpot", status: "ready", category: "CRM", dataIn: "Borrower profile, case ownership, engagement history", dataOut: "Disposition, promise-to-pay notes, hand outcomes" },
  { id: "int2", name: "Stripe", status: "ready", category: "Payments", dataIn: "Payment status, failed payment events, repayment links", dataOut: "Secure payment-link requests and outcome reconciliation" },
  { id: "int3", name: "PayPal", status: "review", category: "Payments", dataIn: "Payment confirmation and dispute status", dataOut: "Payment-link generation for approved borrowers" },
  { id: "int4", name: "Gmail", status: "ready", category: "Email", dataIn: "Borrower replies and bounce events", dataOut: "Approved email outreach templates" },
  { id: "int5", name: "Google Calendar", status: "ready", category: "Scheduling", dataIn: "Human callback availability", dataOut: "Callback tasks for operator handoff" },
  { id: "int6", name: "Slack", status: "ready", category: "Team ops", dataIn: "Approval decisions and escalation comments", dataOut: "Approval notifications and run exceptions" },
  { id: "int7", name: "Core banking systems", status: "ready", category: "Loan system", dataIn: "Borrower, account, DPD, outstanding, repayment history", dataOut: "Case outcomes and repayment commitments" },
  { id: "int8", name: "Custom APIs", status: "review", category: "Enterprise", dataIn: "Tenant-specific borrower attributes", dataOut: "Webhooks for run events, audit exports, and outcomes" }
];

export const apiContracts: ApiContract[] = [
  { method: "GET", path: "/api/portfolio/summary", owner: "Portfolio Intelligence Service", purpose: "Portfolio health, DPD buckets, recovery outcomes", realtime: "REST" },
  { method: "GET", path: "/api/borrowers", owner: "Borrower / Case Service", purpose: "Borrower search and filtered case list", realtime: "REST" },
  { method: "GET", path: "/api/borrowers/:id", owner: "Borrower / Case Service", purpose: "Borrower profile, consent, history, cases", realtime: "REST" },
  { method: "POST", path: "/api/data/uploads", owner: "Data Ingestion Service", purpose: "Create portfolio, policy, or DNC upload", realtime: "REST" },
  { method: "GET", path: "/api/data/validation-reports/:id", owner: "Data Ingestion Service", purpose: "Read validation blockers and readiness", realtime: "REST" },
  { method: "POST", path: "/api/protocol-hub/policies", owner: "Protocol Hub / Policy Service", purpose: "Upload or version policy pack", realtime: "REST" },
  { method: "GET", path: "/api/protocol-hub/active", owner: "Protocol Hub / Policy Service", purpose: "Read active rules for tenant and jurisdiction", realtime: "REST" },
  { method: "POST", path: "/api/coworker/messages", owner: "AI Coworker Service", purpose: "Ask coworker to generate governed artifacts", realtime: "REST" },
  { method: "GET", path: "/api/coworker/sessions/:id/events", owner: "Notification / SSE Service", purpose: "Stream artifact generation and policy-check progress", realtime: "SSE" },
  { method: "POST", path: "/api/hands", owner: "Banking Hand / Workflow Service", purpose: "Create a Banking Hand draft", realtime: "REST" },
  { method: "GET", path: "/api/hands/:id", owner: "Banking Hand / Workflow Service", purpose: "Read lifecycle, sequence, checks, approvals, history", realtime: "REST" },
  { method: "POST", path: "/api/hands/:id/validate", owner: "Agent Orchestrator", purpose: "Run pre-flight validation", realtime: "REST" },
  { method: "POST", path: "/api/hands/:id/submit-for-approval", owner: "Approval Service", purpose: "Open approval gates", realtime: "REST" },
  { method: "POST", path: "/api/hands/:id/simulations", owner: "Simulation Service", purpose: "Start a pre-flight simulation for a specific hand version.", realtime: "REST" },
  { method: "GET", path: "/api/simulations/:id", owner: "Simulation Service", purpose: "Fetch simulation summary, blocked borrower counts, expected recovery, and risk.", realtime: "REST" },
  { method: "GET", path: "/api/simulations/:id/events", owner: "Simulation Service", purpose: "Stream simulation progress if the simulation is long-running.", realtime: "SSE" },
  { method: "POST", path: "/api/simulations/:id/compare", owner: "Simulation Service", purpose: "Compare alternate outreach strategies.", realtime: "REST" },
  { method: "GET", path: "/api/approvals", owner: "Approval Service", purpose: "Approval queue", realtime: "REST" },
  { method: "GET", path: "/api/approvals/:id", owner: "Approval Service", purpose: "Approval detail", realtime: "REST" },
  { method: "POST", path: "/api/approvals/:id/resolve", owner: "Approval Service", purpose: "Approve, reject, or request changes", realtime: "REST" },
  { method: "POST", path: "/api/hands/:id/runs", owner: "Outreach Execution Service", purpose: "Start governed outreach run", realtime: "REST" },
  { method: "GET", path: "/api/runs/:id", owner: "Outreach Execution Service", purpose: "Run status and summary", realtime: "REST" },
  { method: "GET", path: "/api/runs/:id/events", owner: "Notification / SSE Service", purpose: "Stream run progress and borrower replies", realtime: "SSE" },
  { method: "POST", path: "/api/runs/:id/pause", owner: "Outreach Execution Service", purpose: "Pause a run", realtime: "REST" },
  { method: "POST", path: "/api/runs/:id/resume", owner: "Outreach Execution Service", purpose: "Resume a governed run", realtime: "REST" },
  { method: "GET", path: "/api/audit", owner: "Audit Service", purpose: "Immutable event history", realtime: "REST" },
  { method: "GET", path: "/api/audit/export", owner: "Audit Service", purpose: "Export regulator-ready audit logs", realtime: "REST" }
];
