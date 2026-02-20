"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { updateLead, setSelectedLead } from "@/store/leads/leadsSlice";
import KanbanColumn from "./KanbanColumn";
import OutreachModal from "../leads/OutreachModal";
import LeadCard from "../leads/LeadCard";

export default function KanbanBoard() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeId, setActiveId] = useState<string | null>(null);

  const leads = useSelector(
    (state: RootState) => state.leads.leads
  );

  const total = leads.length;
  const coldCount = leads.filter(l => l.status === "cold").length;
  const warmCount = leads.filter(l => l.status === "warm").length;
  const hotCount = leads.filter(l => l.status === "hot").length;
  const avgScore =
    total > 0
      ? Math.round(
          leads.reduce((sum, l) => sum + l.score, 0) / total
        )
      : 0;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over) return;

    const leadId = active.id as string;
    const newStatus = over.id as "cold" | "warm" | "hot";

    const draggedLead = leads.find(l => l.id === leadId);
    if (!draggedLead) return;

    dispatch(
      updateLead({
        id: leadId,
        updates: {
          status: newStatus,
          manualOverride: true,
        },
      })
    );

    if (newStatus === "hot") {
      dispatch(setSelectedLead(draggedLead));
    }
  };

  const activeLead = activeId ? leads.find(l => l.id === activeId) : null;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="mt-4 flex w-full min-w-0 flex-col gap-3 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-3 py-3 text-xs text-slate-300 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[14px] uppercase font-bold text-white">
            Pipeline Overview
          </span>
          <span className="rounded-full bg-slate-900/80 px-2.5 py-1 font-medium text-slate-100">
            {total} leads in flow
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] ">
            <span className="h-1.5 w-1.5 rounded-full font-bold bg-slate-200" />
            Cold: {coldCount}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] text-amber-200 ring-1 ring-amber-500/40">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Warm: {warmCount}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] text-emerald-200 ring-1 ring-emerald-500/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Hot: {hotCount}
          </span>

          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-slate-900/90 px-2.5 py-1 text-[11px]">
            <span className="text-[13px]  text-slate-200">
              Avg Score :
            </span>
            <span className="font-semibold text-slate-100">
              {avgScore}/100
            </span>
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-3 md:gap-5 lg:gap-6">
        <KanbanColumn
          id="cold"
          title="Cold"
          status="cold"
          leads={leads}
        />
        <KanbanColumn
          id="warm"
          title="Warm"
          status="warm"
          leads={leads}
        />
        <KanbanColumn
          id="hot"
          title="Hot"
          status="hot"
          leads={leads}
        />
      </div>

      <DragOverlay>
        {activeLead ? (
          <div className="rotate-3 scale-105 opacity-95">
            <LeadCard lead={activeLead} />
          </div>
        ) : null}
      </DragOverlay>

      <OutreachModal />
    </DndContext>
  );
}
