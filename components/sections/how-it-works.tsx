import { GlassCard } from "@/components/ui/glass-card";

const steps = [
  {
    title: "Invite your client",
    body: "Owners add teammates with a single email invite. Nimbra seeds demo data so your walkthrough starts with something meaningful.",
  },
  {
    title: "Stand up projects",
    body: "Managers create projects and tickets with lifecycle stages (Backlog → In Progress → Blocked → Done) plus labels, files, and due dates.",
  },
  {
    title: "Track everything",
    body: "Every state change triggers an audit log entry and a real-time event. Dashboards update instantly—no refresh required.",
  },
];

export function HowItWorks() {
  return (
    <section id="workflow" className="section-spacing">
      <div className="max-content-width space-y-10">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            How Nimbra fits into your onboarding day.
          </h2>
          <p className="text-base text-slate-600">
            In less than an hour you can demo a full client operations portal—auth, RBAC, dashboards, the works. Perfect for interviews and portfolio walkthroughs.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <GlassCard key={step.title} className="p-7 space-y-4 bg-white/90">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600 text-sm font-semibold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
