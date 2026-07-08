"use client";

import {
  Background,
  Controls,
  MiniMap,
  Position,
  ReactFlow,
  addEdge,
  Handle,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
  type NodeTypes
} from "@xyflow/react";
import { Bot, CheckCircle2, Database, FileCheck2, Megaphone, PlayCircle, ShieldCheck, Users } from "lucide-react";
import { useCallback } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type WorkflowNodeData = {
  label: string;
  detail: string;
  status: string;
  kind: string;
};

const palette = [
  { type: "audience", label: "Audience", detail: "Segment, consent, risk, balance filters", icon: Users },
  { type: "data", label: "Data Check", detail: "Validate records and enrichment state", icon: Database },
  { type: "policy", label: "Policy Gate", detail: "Quiet hours, DNC, jurisdiction rules", icon: ShieldCheck },
  { type: "agent", label: "AI Agent", detail: "Draft message, reason, and evidence", icon: Bot },
  { type: "approval", label: "Approval", detail: "Compliance review and exception gates", icon: FileCheck2 },
  { type: "channel", label: "Channel", detail: "SMS, email, WhatsApp, or voice", icon: Megaphone },
  { type: "run", label: "Run", detail: "Launch, monitor, pause, retry", icon: PlayCircle },
  { type: "audit", label: "Audit", detail: "Immutable evidence and events", icon: CheckCircle2 }
];

const initialNodes: Node<WorkflowNodeData>[] = [
  { id: "audience", type: "bankingModule", position: { x: 20, y: 70 }, data: { label: "Audience filter", detail: "30-59 DPD, valid SMS consent, no disputes", status: "Ready", kind: "audience" } },
  { id: "policy", type: "bankingModule", position: { x: 330, y: 70 }, data: { label: "Policy gate", detail: "Quiet hours, DNC, FDCPA language", status: "Review", kind: "policy" } },
  { id: "agent", type: "bankingModule", position: { x: 640, y: 70 }, data: { label: "AI collection agent", detail: "Draft outreach and evidence memo", status: "Ready", kind: "agent" } },
  { id: "approval", type: "bankingModule", position: { x: 330, y: 275 }, data: { label: "Compliance approval", detail: "Message and voice fallback approval", status: "Blocked", kind: "approval" } },
  { id: "run", type: "bankingModule", position: { x: 640, y: 275 }, data: { label: "Execution monitor", detail: "Run batches, HITL pause, audit trail", status: "Paused", kind: "run" } }
];

const initialEdges: Edge[] = [
  { id: "e1", source: "audience", target: "policy", animated: true },
  { id: "e2", source: "policy", target: "agent", animated: true },
  { id: "e3", source: "policy", target: "approval", animated: true },
  { id: "e4", source: "agent", target: "run", animated: true },
  { id: "e5", source: "approval", target: "run", animated: true }
];

function nodeColor(node: Node<WorkflowNodeData>) {
  if (node.data.status === "Ready") return "#2563eb";
  if (node.data.status === "Review" || node.data.status === "Paused") return "#d97706";
  return "#dc2626";
}

const nodeIcons: Record<string, typeof Users> = {
  audience: Users,
  data: Database,
  policy: ShieldCheck,
  agent: Bot,
  approval: FileCheck2,
  channel: Megaphone,
  run: PlayCircle,
  audit: CheckCircle2
};

const statusStyles: Record<string, { rail: string; badge: string; glow: string }> = {
  Ready: { rail: "bg-blue-500", badge: "border-blue-200 bg-blue-50 text-blue-700", glow: "shadow-[0_18px_45px_rgba(37,99,235,0.18)]" },
  Review: { rail: "bg-amber-500", badge: "border-amber-200 bg-amber-50 text-amber-800", glow: "shadow-[0_18px_45px_rgba(217,119,6,0.18)]" },
  Blocked: { rail: "bg-red-500", badge: "border-red-200 bg-red-50 text-red-700", glow: "shadow-[0_18px_45px_rgba(220,38,38,0.16)]" },
  Paused: { rail: "bg-amber-500", badge: "border-amber-200 bg-amber-50 text-amber-800", glow: "shadow-[0_18px_45px_rgba(217,119,6,0.18)]" }
};

function BankingModuleNode({ data, selected }: NodeProps<Node<WorkflowNodeData>>) {
  const Icon = nodeIcons[data.kind] ?? Bot;
  const styles = statusStyles[data.status] ?? statusStyles.Ready;

  return (
    <div className={`relative w-[250px] overflow-hidden rounded-xl border bg-white text-left ${selected ? "border-blue-400 ring-4 ring-blue-100" : "border-slate-200"} ${styles.glow}`}>
      <Handle type="target" position={Position.Left} className="!h-3 !w-3 !border-2 !border-white !bg-blue-600" />
      <div className={`h-1.5 w-full ${styles.rail}`} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sky-300 shadow-sm">
              <Icon size={18} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">{data.label}</p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted">{data.kind}</p>
            </div>
          </div>
          <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-bold ${styles.badge}`}>{data.status}</span>
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-600">{data.detail}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-muted">
          <span className="rounded-md bg-slate-50 px-2 py-1">Policy</span>
          <span className="rounded-md bg-slate-50 px-2 py-1">Audit</span>
          <span className="rounded-md bg-slate-50 px-2 py-1">HITL</span>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!h-3 !w-3 !border-2 !border-white !bg-blue-600" />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  bankingModule: BankingModuleNode
};

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => setEdges((current) => addEdge({ ...params, animated: true }, current)), [setEdges]);

  function addNode(item: (typeof palette)[number]) {
    const id = `${item.type}-${nodes.length + 1}`;
    setNodes((current) => [
      ...current,
      {
        id,
        type: "bankingModule",
        position: { x: 80 + (current.length % 3) * 260, y: 430 + Math.floor(current.length / 3) * 120 },
        data: { label: item.label, detail: item.detail, status: item.type === "approval" ? "Review" : "Ready", kind: item.type }
      }
    ]);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
      <aside className="rounded-xl border border-line bg-white p-4 shadow-tremor">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Node library</p>
            <h2 className="mt-1 text-lg font-semibold text-ink">Workflow options</h2>
          </div>
          <Badge tone="info">{palette.length}</Badge>
        </div>
        <div className="mt-5 space-y-2">
          {palette.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.type}
                type="button"
                className="tremor-focus group flex w-full items-start gap-3 rounded-lg border border-line bg-slate-50 p-3 text-left transition hover:border-blue-300 hover:bg-blue-50"
                onClick={() => addNode(item)}
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-blue-700 shadow-sm group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">{item.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted">{item.detail}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm font-semibold text-blue-700">How it works</p>
          <p className="mt-1 text-xs leading-5 text-blue-900">Click an option to add it, drag nodes around the canvas, and connect handles to model a governed Banking Hand.</p>
        </div>
      </aside>

      <section className="min-h-[680px] overflow-hidden rounded-xl border border-blue-200 bg-slate-950 shadow-tremor" data-tour="workflow-canvas">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">Canvas</p>
            <h2 className="text-lg font-semibold text-white">Collections recovery hand</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="success">5 modules ready</Badge>
            <Badge tone="warning">2 gates open</Badge>
            <Button variant="secondary" onClick={() => setNodes(initialNodes)}>Reset canvas</Button>
          </div>
        </div>
        <div className="h-[620px] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_32%),linear-gradient(135deg,#020617,#07111f)]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            fitViewOptions={{ padding: 0.18 }}
            nodesDraggable
            minZoom={0.45}
            defaultEdgeOptions={{ animated: true, style: { stroke: "#38bdf8", strokeWidth: 2.5 }, markerEnd: { type: "arrowclosed", color: "#38bdf8" } }}
          >
            <MiniMap nodeColor={nodeColor} pannable zoomable maskColor="rgba(2, 6, 23, 0.6)" />
            <Controls />
            <Background color="#1d4ed8" gap={24} />
          </ReactFlow>
        </div>
      </section>
    </div>
  );
}
