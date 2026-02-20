"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Lead } from "@/types/lead";

export default function LeadCard({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: lead.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`group cursor-grab rounded-xl border border-slate-800/80 bg-slate-900/90 p-3 text-sm text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all duration-200 hover:border-emerald-500/50 hover:bg-slate-900 active:cursor-grabbing sm:p-4 ${
        isDragging ? "scale-95 rotate-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-[13px] font-semibold text-slate-50">
            {lead.name}
          </h4>
          <p className="mt-0.5 text-[11px] text-slate-200 font-semibold">
            {lead.email}
          </p>
        </div>

        <div
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            lead.status === "hot"
              ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40"
            : lead.status === "warm"
              ? "bg-amber-500/10 text-amber-200 ring-1 ring-amber-500/40"
              : "bg-slate-800 text-slate-200 ring-1 ring-slate-600/70"
          }`}
        >
          <span className="mr-1 text-[9px] uppercase tracking-[0.18em] text-slate-400">
            Score
          </span>
          {lead.score}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full ${
              lead.score >= 80
                ? "bg-emerald-400"
                : lead.score >= 41
                  ? "bg-amber-400"
                  : "bg-slate-500"
            }`}
            style={{ width: `${Math.min(lead.score, 100)}%` }}
          />
        </div>
        <span className="text-[10px] font-bold text-slate-200">
          {lead.score}/100
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <p className="text-[12px] text-slate-200">
            {lead.companySize}
          </p>
          <p className="text-[12px] font-bold text-slate-200">
            Budget:{" "}
            <span className="text-slate-200">
              ${lead.budget.toLocaleString()}
            </span>
          </p>
        </div>

        <div className="hidden flex-col items-end text-right md:flex">
          <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
            Created
          </p>
          <p className="text-[11px] text-slate-300">
            {new Date(lead.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {lead.description && (
        <p className="mt-3 line-clamp-2 text-[12px] text-slate-200">
          {lead.description}
        </p>
      )}

      {lead.status === "hot" && (
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-500/50">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Priority · Hot Lead
        </span>
      )}

      {lead.manualOverride && (
        <span className="mt-2 ml-1 inline-flex items-center gap-1 rounded-full bg-purple-500/15 px-2.5 py-1 text-[11px] font-medium text-purple-200 ring-1 ring-purple-500/40">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
          Manual Override
        </span>
      )}
    </div>
  );
}
