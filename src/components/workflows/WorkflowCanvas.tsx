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

const kindStyles: Record<string, { head: string; icon: string; border: string }> = {
  audience: { head: "from-blue-600 to-sky-500", icon: "bg-blue-100 text-blue-700", border: "border-blue-300" },
  data: { head: "from-cyan-600 to-blue-500", icon: "bg-cyan-100 text-cyan-700", border: "border-cyan-300" },
  policy: { head: "from-indigo-600 to-blue-500", icon: "bg-indigo-100 text-indigo-700", border: "border-indigo-300" },
  agent: { head: "from-violet-600 to-blue-500", icon: "bg-violet-100 text-violet-700", border: "border-violet-300" },
  approval: { head: "from-amber-500 to-orange-500", icon: "bg-amber-100 text-amber-700", border: "border-amber-300" },
  channel: { head: "from-sky-500 to-cyan-400", icon: "bg-sky-100 text-sky-700", border: "border-sky-300" },
  run: { head: "from-emerald-600 to-teal-500", icon: "bg-emerald-100 text-emerald-700", border: "border-emerald-300" },
  audit: { head: "from-slate-700 to-blue-700", icon: "bg-slate-100 text-slate-700", border: "border-slate-300" }
};

const statusStyles: Record<string, { badge: string; glow: string }> = {
  Ready: { badge: "border-blue-200 bg-blue-50 text-blue-700", glow: "shadow-[0_22px_55px_rgba(56,189,248,0.25)]" },
  Review: { badge: "border-amber-200 bg-amber-50 text-amber-800", glow: "shadow-[0_22px_55px_rgba(217,119,6,0.23)]" },
  Blocked: { badge: "border-red-200 bg-red-50 text-red-700", glow: "shadow-[0_22px_55px_rgba(220,38,38,0.22)]" },
  Paused: { badge: "border-amber-200 bg-amber-50 text-amber-800", glow: "shadow-[0_22px_55px_rgba(217,119,6,0.23)]" }
};

function BankingModuleNode({ data, selected }: NodeProps<Node<WorkflowNodeData>>) {
  const Icon = nodeIcons[data.kind] ?? Bot;
  const styles = statusStyles[data.status] ?? statusStyles.Ready;
  const kind = kindStyles[data.kind] ?? kindStyles.agent;

  return (
    <div className={`relative w-[270px] overflow-hidden rounded-2xl border-2 bg-[#f8fbff] text-left ${selected ? "border-sky-300 ring-4 ring-sky-400/25" : kind.border} ${styles.glow}`}>
      <Handle type="target" position={Position.Left} className="!h-3.5 !w-3.5 !border-2 !border-white !bg-sky-500" />
      <div className={`bg-gradient-to-r ${kind.head} px-4 py-3 text-white`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/18 text-white ring-1 ring-white/30">
              <Icon size={17} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-white">{data.label}</p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/75">{data.kind}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-white/20 px-2 py-1 text-[10px] font-black text-white ring-1 ring-white/30">{data.status}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold leading-5 text-[#172033]">{data.detail}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] font-black text-[#475569]">
          <span className="rounded-md border border-slate-200 bg-white px-2 py-1">Policy</span>
          <span className="rounded-md border border-slate-200 bg-white px-2 py-1">Audit</span>
          <span className="rounded-md border border-slate-200 bg-white px-2 py-1">HITL</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className={`rounded-full border px-2 py-1 text-[10px] font-black ${styles.badge}`}>{data.status}</span>
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#64748b]">Drag to arrange</span>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!h-3.5 !w-3.5 !border-2 !border-white !bg-sky-500" />
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

      <section className="min-h-[700px] overflow-hidden rounded-xl border border-blue-200 bg-slate-950 shadow-tremor" data-tour="workflow-canvas">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 px-5 py-4">
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
        <div className="leet-flow h-[640px] bg-[radial-gradient(circle_at_18%_16%,rgba(59,130,246,0.34),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.22),transparent_26%),linear-gradient(135deg,#020617,#07111f_48%,#082f49)]">
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
