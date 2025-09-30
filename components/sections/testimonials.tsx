import { GlassCard } from "@/components/ui/glass-card";
import Image from "next/image";

const testimonials = [
  {
    name: "Leah Mendez",
    title: "Director of Client Ops, Brightline",
    quote:
      "Nimbra let us sunset four spreadsheets and a Notion wiki. The audit trail is the first thing our clients mention on calls.",
    avatar: "/vercel.svg",
  },
  {
    name: "Carlos Kim",
    title: "VP Product, Horizon Interactive",
    quote:
      "The fact that it uses Postgres LISTEN/NOTIFY for live updates is brilliant. It actually scales with our agency.",
    avatar: "/globe.svg",
  },
  {
    name: "Riya Patel",
    title: "Program Manager, Axis Collective",
    quote:
      "Seeing real RBAC, seeded data, and Playwright tests in a portfolio project sealed the deal. We hired on the spot.",
    avatar: "/window.svg",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-spacing">
      <div className="max-content-width space-y-10">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            Teams that run client ops love seeing Nimbra in interviews.
          </h2>
          <p className="text-base text-slate-600">
            These quotes are fictional—yours won’t be. The goal is to make interviewers say “wow, you actually built the hard stuff.”
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <GlassCard key={testimonial.name} className="p-7 space-y-6 bg-white/95">
              <p className="text-sm text-slate-600 leading-relaxed">
                “{testimonial.quote}”
              </p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-sky-100 bg-white">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.title}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
