"use client";

import Link from "next/link";
import { useTransition } from "react";

async function postJson(url: string) {
  const response = await fetch(url, { method: "POST" });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.error ?? "Request failed");
  }
  return response.json();
}

export function DemoEmptyState() {
  const [seedPending, startSeed] = useTransition();

  return (
    <section className="glass-panel glow-edge rounded-3xl p-10 text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">No organizations yet</h2>
        <p className="text-sm text-slate-600">
          Load the Nimbra demo org to explore the dashboard, or invite this user to an existing organization.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-2 text-sm font-medium text-slate-700 shadow hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() =>
            startSeed(async () => {
              await postJson("/api/demo/seed");
              window.location.reload();
            })
          }
          disabled={seedPending}
        >
          {seedPending ? "Loading…" : "Load demo data"}
        </button>
      </div>
      <Link
        href="https://github.com/SeloSlav/nimbra"
        target="_blank"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800"
      >
        View setup instructions
        <span aria-hidden>↗</span>
      </Link>
    </section>
  );
}

