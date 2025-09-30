"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export function CTA() {
  const { status } = useSession();
  const authenticated = status === "authenticated";

  const handleSignIn = async () => {
    await signIn("github");
  };

  return (
    <section id="demo" className="section-spacing">
      <div className="max-content-width">
        <div className="glass-panel glow-edge rounded-[32px] p-12 text-center space-y-6 bg-white/85">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-600">Ready to show Nimbra?</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            Sign in with GitHub, seed the demo org, and walk interviewers through a production-grade app.
          </h2>
          <p className="max-w-2xl mx-auto text-base text-slate-600">
            Invite teammates, switch roles, and watch the dashboard update live. All the scaffolding is here—Railway deploy, tests, docs, and audit logging baked in.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {authenticated ? (
              <Button className="h-12 px-8 text-base" asChild>
                <Link href="/dashboard">See live dashboard</Link>
              </Button>
            ) : (
              <Button className="h-12 px-8 text-base" onClick={handleSignIn}>
                Sign in with GitHub
              </Button>
            )}
            <Button variant="outline" className="h-12 px-8 text-base" asChild>
              <Link href="https://github.com/SeloSlav/nimbra" target="_blank">
                View the repo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
