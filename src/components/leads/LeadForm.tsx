"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLead } from "@/store/leads/leadsSlice";
import { AppDispatch } from "@/store";
import { calculateLeadScore } from "@/utils/scoring/scoringEngine";
import { resolveStatus } from "@/utils/scoring/statusResolver";

export default function LeadForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    name: "",
    email: "",
    companySize: "",
    budget: 0,
    description: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    companySize?: string;
    budget?: string;
    description?: string;
  }>({});

  const filledCount = Object.entries(form).reduce((count, [key, value]) => {
    if (key === "budget") {
      return value && Number(value) > 0 ? count + 1 : count;
    }
    return value ? count + 1 : count;
  }, 0);

  let completenessMultiplier = 0.8;
  if (filledCount === 3) completenessMultiplier = 1.1;
  else if (filledCount === 4) completenessMultiplier = 1.3;
  else if (filledCount === 5) completenessMultiplier = 1.5;

  const score = calculateLeadScore({
    budget: form.budget,
    description: form.description,
    completenessMultiplier,
  });

  const status = resolveStatus(score);
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.companySize.trim()) {
      newErrors.companySize = "Company size is required";
    }

    if (!form.budget || form.budget <= 0) {
      newErrors.budget = "Budget must be greater than 0";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    dispatch(
      addLead({
        id: crypto.randomUUID(),
        ...form,
        score,
        status,
        manualOverride: false,
        createdAt: new Date().toISOString(),
      }),
    );

    setForm({
      name: "",
      email: "",
      companySize: "",
      budget: 0,
      description: "",
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/70 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.6)] backdrop-blur">
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Intelligence Engine
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-50">
            Capture Lead Signal
          </h2>
          <p className="mt-1 text-xs text-slate-200 font-bold">
            Ingest raw lead data and let SmartFlow compute an AI-ready quality
            score in real time.
          </p>
        </div>

        <div className="hidden flex-col items-end text-right md:flex">
          <span className="text-[10px] uppercase tracking-[0.16em] text-slate-200">
            Quality Score
          </span>
          <span
            className={`mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              status === "hot"
                ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/40"
                : status === "warm"
                  ? "bg-amber-500/10 text-amber-200 ring-1 ring-amber-500/40"
                  : "bg-slate-800 text-slate-200 ring-1 ring-slate-600/60"
            }`}
          >
            <span className="mr-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
              {status.toUpperCase()}
            </span>
            {score}/100
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter Name"
              className={`w-full rounded-lg px-3 py-2 text-sm outline-none transition
                
    ${
      errors.name
        ? "border border-red-500 bg-slate-900/80 text-slate-100"
        : "border border-slate-700/80 bg-slate-900/80 text-slate-100 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-500/30"
    }`}
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Work Email
            </label>
            <input
              placeholder="email@.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full rounded-lg px-3 py-2 text-sm outline-none transition
                ${
                  errors.email
                    ? "border border-red-500 bg-slate-900/80 text-slate-100"
                    : "border border-slate-700/80 bg-slate-900/80 text-slate-100 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-500/30"
                }`}
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Company Size
            </label>
            <input
              placeholder="Enterprise · 1,000+"
              value={form.companySize}
              onChange={(e) =>
                setForm({
                  ...form,
                  companySize: e.target.value,
                })
              }
              className={`w-full rounded-lg px-3 py-2 text-sm outline-none transition
                ${
                  errors.companySize
                    ? "border border-red-500 bg-slate-900/80 text-slate-100"
                    : "border border-slate-700/80 bg-slate-900/80 text-slate-100 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-500/30"
                }`}
            />
            {errors.companySize && (
              <p className="text-xs text-red-400 mt-1">{errors.companySize}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Budget (USD)
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-xs text-slate-500">
                $
              </span>
              <input
                type="number"
                min={0}
                placeholder="100,000"
                value={form.budget || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    budget: Number(e.target.value),
                  })
                }
                className={`w-full rounded-lg px-3 py-2 text-sm outline-none transition
                  ${
                    errors.budget
                      ? "border border-red-500 bg-slate-900/80 text-slate-100"
                      : "border border-slate-700/80 bg-slate-900/80 text-slate-100 focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-500/30"
                  }`}
              />
              {errors.budget && (
                <p className="text-xs text-red-400 mt-1">{errors.budget}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-200">
            Project Description :
            <span className="ml-1 text-[12px] uppercase tracking-[0.18em] text-emerald-400">
              HIGH-INTENT KEYWORDS: URGENT, ENTERPRISE, MIGRATION
            </span>
          </label>
          <textarea
            rows={4}
            placeholder="Enter your project description here..."
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-1 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-slate-200">
                Real-time Quality Score
              </p>
              <p className="text-[11px] text-slate-200">
                Completeness bonus applied when all fields are populated.
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="inline cursor-pointer flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Ingest Lead into SmartFlow
          </button>
        </div>
      </div>
    </div>
  );
}
