"use client";

import { cn } from "@/lib/utils";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

export function ProgressBar({ value, tone = "blue" }: { value: number; tone?: "blue" | "green" | "amber" | "red" }) {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-emerald-600",
    amber: "bg-amber-500",
    red: "bg-red-600"
  };
  return (
    <div className="h-2 w-full rounded-full bg-slate-100">
      <div className={cn("h-2 rounded-full", colors[tone])} style={{ width: `${Math.max(4, Math.min(100, value))}%` }} />
    </div>
  );
}

export function Delta({ value }: { value: number }) {
  const positive = value > 0;
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold shadow-sm", positive ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700")}>
      {positive ? "+" : ""}
      {value}%
    </span>
  );
}

export function MiniSparkline({ tone = "blue" }: { tone?: "blue" | "green" | "amber" }) {
  const color = tone === "green" ? "#10b981" : tone === "amber" ? "#f59e0b" : "#0abef9";
  const values = [28, 26, 22, 24, 30, 18, 13, 18, 24, 9];
  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: true,
        speed: 900,
        dynamicAnimation: { enabled: true, speed: 450 }
      },
      sparkline: { enabled: true },
      toolbar: { show: false },
      type: "area"
    },
    colors: [color],
    dataLabels: { enabled: false },
    fill: {
      gradient: {
        opacityFrom: 0.45,
        opacityTo: 0
      },
      type: "gradient"
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    tooltip: { enabled: false }
  };

  return (
    <div className="h-12 w-full" role="img" aria-label="Trend">
      <Chart options={options} series={[{ name: "Trend", data: values }]} type="area" height={48} />
    </div>
  );
}

const chartTones = {
  blue: { stroke: "#2563eb", fill: "#dbeafe", bar: "bg-blue-600", soft: "bg-blue-50 text-blue-700 border-blue-200" },
  green: { stroke: "#059669", fill: "#d1fae5", bar: "bg-emerald-600", soft: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  amber: { stroke: "#d97706", fill: "#fef3c7", bar: "bg-amber-500", soft: "bg-amber-50 text-amber-800 border-amber-200" },
  red: { stroke: "#dc2626", fill: "#fee2e2", bar: "bg-red-600", soft: "bg-red-50 text-red-700 border-red-200" }
};

export function AreaTrend({
  values,
  tone = "blue",
  label
}: {
  values: number[];
  tone?: keyof typeof chartTones;
  label: string;
}) {
  const toneValue = chartTones[tone];
  const secondaryColor = tone === "blue" ? "#5750f1" : tone === "green" ? "#0abef9" : tone === "amber" ? "#f59e0b" : "#ef4444";
  const primaryColor = toneValue.stroke;
  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: true,
        speed: 1000,
        animateGradually: { enabled: true, delay: 90 },
        dynamicAnimation: { enabled: true, speed: 450 }
      },
      fontFamily: "inherit",
      toolbar: { show: false },
      type: "area",
      zoom: { enabled: false }
    },
    colors: [primaryColor, secondaryColor],
    dataLabels: { enabled: false },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0
      },
      type: "gradient"
    },
    grid: {
      borderColor: "#dbeafe",
      strokeDashArray: 5,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } }
    },
    legend: { show: false },
    markers: {
      hover: { size: 5 },
      size: 0
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    tooltip: {
      marker: { show: true },
      theme: "light"
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      categories: values.map((_, index) => `T${index + 1}`),
      labels: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  };
  const comparison = values.map((value, index) => Math.max(0, Math.round(value * (0.86 + index * 0.018))));

  return (
    <div className="min-w-0 rounded-xl border border-line bg-white p-4 shadow-tremor">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="truncate text-sm font-semibold text-ink">{label}</p>
        <span className={cn("rounded-md border px-2 py-1 text-xs font-semibold shadow-sm", toneValue.soft)}>Live</span>
      </div>
      <div className="-mx-3 -mb-3 h-40">
        <Chart
          options={options}
          series={[
            { name: label, data: values },
            { name: "Baseline", data: comparison }
          ]}
          type="area"
          height={160}
        />
      </div>
    </div>
  );
}

export function BarMeterList({
  items,
  tone = "blue"
}: {
  items: Array<{ label: string; value: number; helper?: string }>;
  tone?: keyof typeof chartTones;
}) {
  const toneValue = chartTones[tone];
  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: true,
        speed: 900,
        animateGradually: { enabled: true, delay: 100 }
      },
      fontFamily: "inherit",
      toolbar: { show: false },
      type: "bar"
    },
    colors: [toneValue.stroke === "#2563eb" ? "#5750f1" : toneValue.stroke, "#0abef9"],
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
    grid: {
      borderColor: "#dbeafe",
      strokeDashArray: 5,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } }
    },
    legend: { show: false },
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusApplication: "end",
        columnWidth: "42%",
        horizontal: false
      }
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 4
    },
    tooltip: {
      x: { show: false }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      categories: items.map((item) => item.label),
      labels: {
        rotate: -18,
        style: { fontSize: "10px" },
        trim: true
      }
    },
    yaxis: {
      max: 100,
      labels: { style: { fontSize: "10px" } }
    }
  };

  return (
    <div>
      <div className="-mx-3 -mb-4 h-56">
        <Chart options={options} series={[{ name: "Score", data: items.map((item) => item.value) }]} type="bar" height={224} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="min-w-0 rounded-lg border border-line bg-slate-50 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-xs font-semibold text-ink">{item.label}</p>
              <p className="shrink-0 text-xs font-bold text-ink">{item.value}%</p>
            </div>
            {item.helper ? <p className="mt-1 truncate text-[11px] text-muted">{item.helper}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FlowRibbon({
  steps
}: {
  steps: Array<{ label: string; value: string; tone?: keyof typeof chartTones }>;
}) {
  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(7.75rem,1fr))]">
      {steps.map((step, index) => (
        <div key={step.label} className="relative min-w-0 rounded-xl border border-line bg-white p-4 shadow-tremor">
          <div className={cn("absolute left-0 top-0 h-1 w-full rounded-t-xl", chartTones[step.tone ?? "blue"].bar)} />
          {index < steps.length - 1 ? (
            <div className="absolute right-[-20px] top-1/2 hidden w-10 items-center 2xl:flex" aria-hidden="true">
              <span className="h-px flex-1 bg-blue-200" />
              <span className="-ml-1 h-2 w-2 rotate-45 border-r-2 border-t-2 border-blue-400" />
            </div>
          ) : null}
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{step.label}</p>
          <p className="mt-2 text-lg font-semibold leading-6 text-ink">{step.value}</p>
        </div>
      ))}
    </div>
  );
}

export function PulseRail({ items }: { items: Array<{ label: string; detail: string; tone?: keyof typeof chartTones }> }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.label} className="flex gap-3">
          <div className="relative mt-1 flex w-5 justify-center">
            <span className={cn("h-3 w-3 rounded-full animate-kyne-pulse", chartTones[item.tone ?? "blue"].bar)} style={{ animationDelay: `${index * 160}ms` }} />
            {index < items.length - 1 ? <span className="absolute top-4 h-full w-px bg-line" /> : null}
          </div>
          <div className="min-w-0 pb-2">
            <p className="font-semibold text-ink">{item.label}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DonutMeter({ value, label, children }: { value: number; label: string; children?: ReactNode }) {
  const safeValue = Math.max(0, Math.min(100, value));
  const reviewValue = Math.min(100 - safeValue, 8);
  const blockedValue = Math.max(0, 100 - safeValue - reviewValue);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const contactableLength = (safeValue / 100) * circumference;
  const reviewLength = (reviewValue / 100) * circumference;
  const blockedLength = (blockedValue / 100) * circumference;
  const reviewOffset = -contactableLength;
  const blockedOffset = -(contactableLength + reviewLength);

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-32 w-32 shrink-0" role="img" aria-label={`${label}: ${safeValue}%`}>
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="14" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#2563eb"
            strokeDasharray={`${contactableLength} ${circumference - contactableLength}`}
            strokeLinecap="round"
            strokeWidth="14"
          />
          {reviewLength > 0 ? (
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#f59e0b"
              strokeDasharray={`${reviewLength} ${circumference - reviewLength}`}
              strokeDashoffset={reviewOffset}
              strokeLinecap="round"
              strokeWidth="14"
            />
          ) : null}
          {blockedLength > 0 ? (
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#94a3b8"
              strokeDasharray={`${blockedLength} ${circumference - blockedLength}`}
              strokeDashoffset={blockedOffset}
              strokeLinecap="round"
              strokeWidth="14"
            />
          ) : null}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-black tracking-tight text-ink">{safeValue}%</p>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Ready</p>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        <div className="mt-3 grid gap-2 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-blue-600" /> Contactable</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-amber-500" /> Review</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-slate-400" /> Blocked</span>
        </div>
        {children ? <div className="mt-2 text-sm leading-6 text-muted">{children}</div> : null}
      </div>
    </div>
  );
}
