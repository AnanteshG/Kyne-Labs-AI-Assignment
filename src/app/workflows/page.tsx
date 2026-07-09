"use client";

import { CheckCircle2, History, Pause, Play, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/TremorPrimitives";
import { WorkflowCanvas } from "@/components/workflows/WorkflowCanvas";
import { cn } from "@/lib/utils";

type WorkflowStatus = "queued" | "running" | "paused" | "completed";

type WorkflowTemplate = {
  id: string;
  name: string;
  segment: string;
  channel: string;
  approval: string;
};

type WorkflowRun = {
  id: string;
  workflowId: string;
  name: string;
  segment: string;
  channel: string;
  status: WorkflowStatus;
  progress: number;
  startedAt: string;
  completedAt?: string;
  outcome?: string;
};

const workflowTemplates: WorkflowTemplate[] = [
  {
    id: "wf-30-59",
    name: "30-59 DPD cooperative recovery",
    segment: "11,420 borrowers",
    channel: "SMS -> Email",
    approval: "SMS copy pending"
  },
  {
    id: "wf-60-89",
    name: "60-89 DPD hardship review",
    segment: "7,420 borrowers",
    channel: "Email -> Human review",
    approval: "Ready"
  },
  {
    id: "wf-invoice",
    name: "SMB invoice payment nudge",
    segment: "2,880 invoices",
    channel: "Email",
    approval: "Approved"
  }
];

const initialRuns: WorkflowRun[] = [
  {
    id: "wr-101",
    workflowId: "wf-30-59",
    name: "30-59 DPD cooperative recovery",
    segment: "11,420 borrowers",
    channel: "SMS -> Email",
    status: "running",
    progress: 62,
    startedAt: "Today, 12:10"
  },
  {
    id: "wr-102",
    workflowId: "wf-invoice",
    name: "SMB invoice payment nudge",
    segment: "2,880 invoices",
    channel: "Email",
    status: "paused",
    progress: 44,
    startedAt: "Today, 11:25"
  }
];

const initialHistory: WorkflowRun[] = [
  {
    id: "wr-094",
    workflowId: "wf-invoice",
    name: "SMB invoice payment nudge",
    segment: "2,880 invoices",
    channel: "Email",
    status: "completed",
    progress: 100,
    startedAt: "Yesterday, 09:40",
    completedAt: "Yesterday, 10:16",
    outcome: "548 paid, 91 replies, 0 policy failures"
  },
  {
    id: "wr-088",
    workflowId: "wf-30-59",
    name: "30-59 DPD cooperative recovery",
    segment: "10,904 borrowers",
    channel: "SMS -> Email",
    status: "completed",
    progress: 100,
    startedAt: "Jul 8, 14:05",
    completedAt: "Jul 8, 15:32",
    outcome: "2,216 promises, 713 suppressions, 118 retries"
  }
];

const statusTone: Record<WorkflowStatus, "info" | "warning" | "success"> = {
  queued: "info",
  running: "info",
  paused: "warning",
  completed: "success"
};

export default function WorkflowsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["wf-30-59", "wf-60-89"]);
  const [activeRuns, setActiveRuns] = useState<WorkflowRun[]>(initialRuns);
  const [history, setHistory] = useState<WorkflowRun[]>(initialHistory);

  const selectedTemplates = useMemo(
    () => workflowTemplates.filter((workflow) => selectedIds.includes(workflow.id)),
    [selectedIds]
  );

  function toggleSelection(workflowId: string) {
    setSelectedIds((current) =>
      current.includes(workflowId)
        ? current.filter((id) => id !== workflowId)
        : [...current, workflowId]
    );
  }

  function queueSelectedRuns() {
    if (!selectedTemplates.length) return;
    const timestamp = Date.now();
    const nextRuns = selectedTemplates.map((workflow, index) => ({
      id: `wr-${timestamp}-${index}`,
      workflowId: workflow.id,
      name: workflow.name,
      segment: workflow.segment,
      channel: workflow.channel,
      status: "queued" as const,
      progress: 0,
      startedAt: "Just now"
    }));
    setActiveRuns((current) => [...nextRuns, ...current]);
  }

  function updateRun(runId: string, status: WorkflowStatus) {
    if (status === "completed") {
      const run = activeRuns.find((item) => item.id === runId);
      if (!run) return;
      setActiveRuns((current) => current.filter((item) => item.id !== runId));
      setHistory((current) => [
        {
          ...run,
          status: "completed",
          progress: 100,
          completedAt: "Just now",
          outcome: "Completed with runtime policy checks and audit events"
        },
        ...current
      ]);
      return;
    }

    setActiveRuns((current) =>
      current.map((run) =>
        run.id === runId
          ? {
              ...run,
              status,
              progress: status === "running" ? Math.max(run.progress, 12) : run.progress
            }
          : run
      )
    );
  }

  return (
    <AppShell>
      <PageHeader
        eyebrow="Workflows"
        title="Run governed Banking Hand workflows"
        description="Select approved workflow templates, launch several runs together, monitor active execution, and review completed history."
      />

      <div className="mb-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader
            title="Workflow launch queue"
            eyebrow="Multiple runs"
            action={
              <Button className="gap-2" onClick={queueSelectedRuns} disabled={!selectedTemplates.length}>
                <Play size={15} />
                Queue selected
              </Button>
            }
          />
          <div className="grid gap-3 lg:grid-cols-3">
            {workflowTemplates.map((workflow) => {
              const selected = selectedIds.includes(workflow.id);
              return (
                <button
                  key={workflow.id}
                  type="button"
                  onClick={() => toggleSelection(workflow.id)}
                  className={cn(
                    "tremor-focus min-w-0 rounded-md border p-4 text-left transition",
                    selected ? "border-blue-300 bg-blue-50 shadow-tremor" : "border-line bg-white hover:border-blue-200 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink">{workflow.name}</p>
                      <p className="mt-2 text-xs font-semibold text-muted">{workflow.segment}</p>
                    </div>
                    <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full border", selected ? "border-blue-600 bg-blue-600 text-white" : "border-line text-transparent")}>
                      <CheckCircle2 size={13} />
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge tone="neutral">{workflow.channel}</Badge>
                    <Badge tone={workflow.approval === "Approved" || workflow.approval === "Ready" ? "success" : "warning"}>{workflow.approval}</Badge>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardHeader title="Active workflow runs" eyebrow="Execution monitor" action={<Badge tone="warning">{activeRuns.length} active</Badge>} />
          <div className="space-y-3">
            {activeRuns.map((run) => (
              <div key={run.id} className="rounded-md border border-line bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{run.name}</p>
                    <p className="mt-1 text-xs text-muted">{run.segment} - {run.channel} - {run.startedAt}</p>
                  </div>
                  <Badge tone={statusTone[run.status]}>{run.status}</Badge>
                </div>
                <div className="mt-4">
                  <ProgressBar value={run.progress} tone={run.status === "paused" ? "amber" : "blue"} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="secondary" className="gap-2" onClick={() => updateRun(run.id, "running")}>
                    <Play size={14} />
                    Run
                  </Button>
                  <Button variant="secondary" className="gap-2" onClick={() => updateRun(run.id, "paused")}>
                    <Pause size={14} />
                    Pause
                  </Button>
                  <Button variant="ghost" className="gap-2" onClick={() => updateRun(run.id, "completed")}>
                    <CheckCircle2 size={14} />
                    Complete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mb-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader title="Run history" eyebrow="Completed workflows" action={<History size={18} className="text-blue-700" />} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="py-3 pr-4 font-semibold">Workflow</th>
                  <th className="py-3 pr-4 font-semibold">Completed</th>
                  <th className="py-3 pr-4 font-semibold">Outcome</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {history.map((run) => (
                  <tr key={run.id}>
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-ink">{run.name}</p>
                      <p className="mt-1 text-xs text-muted">{run.segment} - {run.channel}</p>
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{run.completedAt}</td>
                    <td className="py-3 pr-4 text-slate-600">{run.outcome}</td>
                    <td className="py-3"><Badge tone="success">completed</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <section className="min-w-0">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Workflow builder</p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-ink">Canvas</h2>
            </div>
            <Button variant="secondary" className="gap-2" onClick={() => setSelectedIds(workflowTemplates.map((workflow) => workflow.id))}>
              <RotateCcw size={14} />
              Select all
            </Button>
          </div>
          <WorkflowCanvas />
        </section>
      </div>
    </AppShell>
  );
}
