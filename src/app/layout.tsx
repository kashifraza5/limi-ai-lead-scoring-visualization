import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SmartFlow – Lead Scoring & Workflow Orchestration",
  description:
    "SmartFlow by Limi AI: real-time lead scoring, Kanban orchestration, and AI-powered outreach in a B2B SaaS dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                    Limi AI · SmartFlow
                  </p>
                  <h1 className="text-lg font-semibold text-slate-50">
                    Lead Scoring & Visualization Board
                  </h1>
                  <p className="text-xs text-slate-400">
                    Transform raw leads into prioritized, AI-ready opportunities.
                  </p>
                </div>
              </div>
            </header>

            <main className="flex-1">
              <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#22c55e1f,_transparent_55%),radial-gradient(circle_at_bottom,_#0ea5e91a,_transparent_55%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,_#0f172a_1px,transparent_1px),linear-gradient(to_bottom,_#0f172a_1px,transparent_1px)] bg-[size:120px_120px] opacity-40" />
              </div>

              <div className=" w-full  px-4 py-8 sm:px-6 lg:px-10">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

