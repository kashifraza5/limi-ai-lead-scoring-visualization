import LeadForm from "@/components/leads/LeadForm";
import KanbanBoard from "@/components/kanban/KanbanBoard";

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <div>
          <LeadForm />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
                Live Pipeline
              </h2>
              <p className="text-sm text-slate-900">
                Leads are dynamically routed into Cold, Warm, and Hot lanes.
              </p>
            </div>
            <div className="hidden gap-2 text-xs md:flex">
              <span className="rounded-full bg-slate-800 px-2 py-1 text-slate-300">
                0–40 · Cold
              </span>
              <span className="rounded-full bg-amber-500/15 px-2 py-1 text-slate-900">
                41–79 · Warm
              </span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-slate-900">
                80+ · Hot
              </span>
            </div>
          </div>

          <KanbanBoard />
        </div>
      </section>
    </div>
  );
}

