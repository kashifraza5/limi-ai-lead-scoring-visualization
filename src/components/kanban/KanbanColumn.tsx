"use client";

import { useDroppable } from "@dnd-kit/core";
import LeadCard from "../leads/LeadCard";
import { Lead, LeadStatus } from "@/types/lead";

interface Props {
  id: string;
  title: string;
  status: LeadStatus;
  leads: Lead[];
}

export default function KanbanColumn({
  id,
  title,
  status,
  leads,
}: Props) {
  const { setNodeRef } = useDroppable({
    id,
  });

  const filtered = leads.filter(l => l.status === status);

  const accentClasses: Record<LeadStatus, string> = {
    cold: "border-gray-200 bg-gray-100",
    warm: "border-amber-100 bg-amber-50",
    hot: "border-green-100 bg-green-50",
  };

  const titleClasses: Record<LeadStatus, string> = {
    cold: "text-gray-700",
    warm: "text-amber-800",
    hot: "text-green-800",
  };

  const descriptionClasses: Record<LeadStatus, string> = {
    cold: "text-gray-600",
    warm: "text-amber-700",
    hot: "text-green-700",
  };

  const pillClasses: Record<LeadStatus, string> = {
    cold: "bg-gray-200 text-gray-700",
    warm: "bg-amber-100 text-amber-800 ring-1 ring-amber-300",
    hot: "bg-green-100 text-green-800 ring-1 ring-green-300",
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[320px] max-h-[600px] min-w-0 flex-col rounded-2xl border px-3 py-4 sm:min-h-[380px] sm:max-h-[700px] sm:px-4 md:min-h-[420px] md:max-h-[800px] md:px-5 ${accentClasses[status]}`}
    >
      <div className="mb-3 flex min-w-0 shrink-0 flex-col gap-2 sm:mb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h3
            className={`text-xs font-bold uppercase tracking-[0.18em] ${titleClasses[status]}`}
          >
            {title} Lane
          </h3>
          <p className={`hidden text-xs sm:block ${descriptionClasses[status]}`}>
            {status === "cold" && "New or low-intent leads awaiting nurture."}
            {status === "warm" &&
              "Qualified interest with clear problem and intent."}
            {status === "hot" &&
              "Sales-ready opportunities – prioritize immediate outreach."}
          </p>
        </div>

        <div
          className={`inline-flex shrink-0 rounded-full px-3 py-1 text-[11px] font-medium ${pillClasses[status]}`}
        >
          <span className="leading-none">
            {status.toUpperCase()} · {filtered.length}
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {filtered.map(lead => (
          <LeadCard key={lead.id} lead={lead} />
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white/70 px-4 py-10 text-center">
            <p className="text-xs text-gray-600">
              No leads in this lane yet.{" "}
              <span className="font-medium text-gray-800">
                Capture a lead or drag one here to orchestrate the pipeline.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
