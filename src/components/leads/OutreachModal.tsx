"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { RootState, AppDispatch } from "@/store";
import { setSelectedLead } from "@/store/leads/leadsSlice";

export default function OutreachModal() {
  const dispatch = useDispatch<AppDispatch>();
  const lead = useSelector((state: RootState) => state.leads.selectedLead);

  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!lead) return;

    const urgencyLine = lead.description.toLowerCase().includes("urgent")
      ? "Given the urgency you mentioned, we can fast-track implementation."
      : "We can align implementation with your roadmap priorities.";

    const tone =
      lead.score > 90
        ? "We’d love to prioritize your deployment immediately."
        : "We’d love to explore whether we’re the right fit.";

    const generatedMessage = `Hi ${lead.name},

We’ve been analyzing how ${lead.companySize} organizations approach initiatives like:
${lead.description}

With a projected budget of $${lead.budget.toLocaleString()}, SmartFlow can deliver measurable ROI quickly while remaining scalable.

${urgencyLine}

${tone}

Would early next week work for a 20-minute walkthrough?

Best,
Limi AI Team`;

    setMessage(generatedMessage);
  }, [lead]);

  if (!lead) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 backdrop-blur">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-emerald-400">
              AI Outreach Draft
            </h2>
            <p className="text-xs text-slate-200">
              Generated for high-priority lead ({lead.score}/100)
            </p>
          </div>

          <button
            onClick={() => dispatch(setSelectedLead(null))}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-4 w-full h-56 resize-none rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={handleCopy}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition cursor-pointer
    ${
      copied
        ? "bg-emerald-400 text-black"
        : "bg-emerald-500 text-black hover:bg-emerald-400"
    }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            onClick={() => dispatch(setSelectedLead(null))}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
