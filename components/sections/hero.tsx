"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export function Hero() {
  const { status } = useSession();
  const authenticated = status === "authenticated";

  const handleSignIn = async () => {
    await signIn("github");
  };

  return (
    <section id="top" className="section-spacing">
      <div className="max-content-width grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-1 text-xs uppercase tracking-[0.3em] text-sky-600">
            CLIENT OPS WITHOUT CHAOS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-slate-900">
            The all-in-one control tower for your agency’s client operations.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            Nimbra pulls every ticket, SLA, and audit log into one beautiful dashboard. Multi-tenant, role-based access, real-time events—built the way agencies actually work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {authenticated ? (
              <Button className="h-12 px-6 text-base" asChild>
                <Link href="/dashboard">See live dashboard</Link>
              </Button>
            ) : (
              <Button className="h-12 px-6 text-base" onClick={handleSignIn}>
                Sign in with GitHub
              </Button>
            )}
            <Button variant="outline" className="h-12 px-6 text-base" asChild>
              <Link href="#features">Explore the feature stack</Link>
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-4 text-xs text-slate-500 uppercase tracking-[0.3em]">
            <span>Multi-tenant</span>
            <span>LISTEN / NOTIFY real-time</span>
            <span>Prisma · PostgreSQL</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-sky-400/40 via-indigo-300/20 to-cyan-200/30 blur-3xl" />
          <div className="glass-panel glow-edge relative rounded-[32px] border-sky-100 p-6 shadow-2xl">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <span className="uppercase tracking-[0.3em]">Org health snapshot</span>
              <span>Last updated: live</span>
            </div>
            <Image
              src="/window.svg"
              alt="Dashboard preview"
              width={640}
              height={420}
              className="h-auto w-full rounded-2xl border border-sky-100 bg-white/80 p-6"
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-3 text-sm text-slate-600">
              <div className="rounded-2xl border border-sky-100 bg-white/90 p-4">
                <p className="text-xs text-slate-500">Velocity this week</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">+18%</p>
              </div>
              <div className="rounded-2xl border border-sky-100 bg-white/90 p-4">
                <p className="text-xs text-slate-500">SLA breaches</p>
                <p className="mt-3 text-2xl font-semibold text-rose-400">2</p>
              </div>
              <div className="rounded-2xl border border-sky-100 bg-white/90 p-4">
                <p className="text-xs text-slate-500">Tickets in review</p>
                <p className="mt-3 text-2xl font-semibold text-emerald-500">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
