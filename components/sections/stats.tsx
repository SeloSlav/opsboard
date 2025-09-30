import { GlassCard } from "@/components/ui/glass-card";

const stats = [
  {
    label: "Tickets closed per week",
    value: "124",
    footnote: "+23% vs last sprint",
  },
  {
    label: "Average SLA response",
    value: "18m",
    footnote: "Down from 42m",
  },
  {
    label: "Audit events captured",
    value: "9,432",
    footnote: "Every change, traceable",
  },
  {
    label: "Active tenants",
    value: "37",
    footnote: "Owners, admins, managers",
  },
];

export function Stats() {
  return (
    <section id="metrics" className="section-spacing">
      <div className="max-content-width space-y-10">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Metrics your clients ask for the second you hop on Zoom.
          </h2>
          <p className="text-base text-slate-600">
            Every Nimbra dashboard ships with velocity, SLA, and ticket aging so you have numbers ready before clients even ask.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="p-6 bg-white/90">
              <p className="text-xs uppercase tracking-[0.25em] text-sky-600/80">
                {stat.label}
              </p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-600">{stat.footnote}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
