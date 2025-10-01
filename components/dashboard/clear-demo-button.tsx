"use client";

import { useTransition } from "react";

async function clearDemo() {
  const res = await fetch("/api/demo/clear", { method: "POST" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ?? "Failed to clear demo data");
  }
}

export function ClearDemoButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-5 py-2 text-xs font-medium text-rose-600 shadow hover:border-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
      onClick={() =>
        startTransition(async () => {
          await clearDemo();
          window.location.reload();
        })
      }
      disabled={pending}
    >
      {pending ? "Clearing…" : "Clear demo data"}
    </button>
  );
}

