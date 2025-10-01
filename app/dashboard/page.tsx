import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { DemoEmptyState } from "@/components/dashboard/demo-empty-state";
import { ClearDemoButton } from "@/components/dashboard/clear-demo-button";
import { Footer } from "@/components/layout/footer";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const memberships = await prisma.membership.findMany({
    where: { userId: session.user.id },
    include: {
      organization: {
        include: {
          projects: {
            include: {
              tickets: true,
            },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
    orderBy: { role: "asc" },
  });

  const hasData = memberships.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/70">
      <Header hideNavLinks />
      <main className="flex-1 py-12">
        <div className="max-content-width space-y-12">
          {hasData ? (
            <div className="space-y-10">
              {memberships.map((membership) => {
                const { organization } = membership;
                const projects = organization.projects;
                const tickets = projects.flatMap((project) => project.tickets);

                const statusCounts = tickets.reduce(
                  (acc, ticket) => {
                    acc.total += 1;
                    acc[ticket.status] = (acc[ticket.status] ?? 0) + 1;
                    return acc;
                  },
                  { total: 0 } as Record<string, number>
                );

                return (
                  <section
                    key={organization.id}
                    className="glass-panel glow-edge rounded-3xl p-8 space-y-6"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-sky-500">Organization</p>
                        <h2 className="text-2xl font-semibold text-slate-900">{organization.name}</h2>
                      </div>
                      <div className="flex gap-3 text-sm text-slate-600">
                        <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-center">
                          <p className="text-xs uppercase tracking-wide text-slate-400">Projects</p>
                          <p className="text-lg font-semibold text-slate-900">{projects.length}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-center">
                          <p className="text-xs uppercase tracking-wide text-slate-400">Tickets</p>
                          <p className="text-lg font-semibold text-slate-900">{statusCounts.total}</p>
                        </div>
                      </div>
                    </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => {
                      const projectCounts = project.tickets.reduce(
                        (acc, ticket) => {
                          acc.total += 1;
                          acc[ticket.status] = (acc[ticket.status] ?? 0) + 1;
                          return acc;
                        },
                        { total: 0 } as Record<string, number>
                      );

                      return (
                        <div
                          key={project.id}
                          className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm"
                        >
                          <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                          {project.description ? (
                            <p className="mt-1 text-sm text-slate-600">{project.description}</p>
                          ) : null}
                          <dl className="mt-4 space-y-2 text-sm text-slate-600">
                            <div className="flex items-center justify-between">
                              <dt>Total</dt>
                              <dd className="font-medium text-slate-900">{projectCounts.total}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                              <dt>In progress</dt>
                              <dd>{projectCounts.IN_PROGRESS ?? 0}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                              <dt>Blocked</dt>
                              <dd>{projectCounts.BLOCKED ?? 0}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                              <dt>Done</dt>
                              <dd>{projectCounts.DONE ?? 0}</dd>
                            </div>
                          </dl>
                          <Link
                            href={`/projects/${project.id}`}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-500"
                          >
                            View project
                            <span aria-hidden>→</span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  {tickets.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-500">
                      No tickets yet. Load the demo data or add tickets programmatically to populate this dashboard.
                    </p>
                  ) : null}
                  <div className="flex justify-end">
                    <ClearDemoButton />
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <DemoEmptyState />
        )}
        </div>
      </main>
      <Footer hideProductLinks />
    </div>
  );
}

