import { GlassCard } from "@/components/ui/glass-card";
import { FiZap, FiShield, FiActivity, FiLayers } from "react-icons/fi";

const features = [
  {
    icon: FiLayers,
    title: "Multi-tenant organizations",
    description:
      "Spin up client workspaces instantly with Owners, Admins, Managers, and Viewers. Each tenant stays isolated but manageable from your ops console.",
  },
  {
    icon: FiShield,
    title: "Role-based guardrails",
    description:
      "Use Prisma-backed RBAC helpers to enforce permissions on every API call. Audit logs show exactly who touched what, when.",
  },
  {
    icon: FiActivity,
    title: "Real-time ticket events",
    description:
      "Postgres LISTEN/NOTIFY streams into Server-Sent Events so boards stay live without expensive websocket infrastructure.",
  },
  {
    icon: FiZap,
    title: "Automation-ready",
    description:
      "Background jobs trigger SLA alerts, nightly summaries, and escalation workflows. The cron endpoint’s already sketched out.",
  },
];

export function Features() {
  return (
    <section id="features" className="section-spacing">
      <div className="max-content-width space-y-12">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 max-w-3xl">
            A production-ready toolkit for client operations teams that need signal, not noise.
          </h2>
          <p className="max-w-2xl text-base text-slate-600">
            Nimbra is real product work: authentication, RBAC, audit trails, dashboards, seeded demo data, tests, and docs. Everything a hiring manager wants to see.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="p-8 flex flex-col gap-4 bg-white/95">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600 text-2xl">
                <feature.icon />
              </span>
              <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
