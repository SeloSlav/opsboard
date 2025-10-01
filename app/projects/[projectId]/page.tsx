import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Role } from "@prisma/client";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { assertRole } from "@/lib/rbac";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type ProjectPageProps = {
  params: { projectId: string };
};

const ALL_ROLES: Role[] = ["OWNER", "ADMIN", "MANAGER", "VIEWER"];

const statusColors: Record<string, string> = {
  BACKLOG: "bg-slate-200 text-slate-700",
  IN_PROGRESS: "bg-sky-200 text-sky-800",
  BLOCKED: "bg-rose-200 text-rose-800",
  DONE: "bg-emerald-200 text-emerald-800",
};

const priorityColors: Record<string, string> = {
  LOW: "bg-slate-200 text-slate-700",
  MEDIUM: "bg-amber-200 text-amber-800",
  HIGH: "bg-rose-200 text-rose-800",
  CRITICAL: "bg-rose-300 text-rose-900",
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const project = await prisma.project.findUnique({
    where: { id: params.projectId },
    include: {
      organization: true,
      tickets: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project) {
    notFound();
  }

  await assertRole(project.organizationId, ALL_ROLES, session.user.id);

  const ticketStatusCounts = project.tickets.reduce(
    (acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] ?? 0) + 1;
      acc.total += 1;
      return acc;
    },
    { total: 0 } as Record<string, number>
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/70">
      <Header hideNavLinks />
      <main className="flex-1 py-12">
        <div className="max-content-width space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
              >
                <span aria-hidden>←</span>
                Back to dashboard
              </Link>
              <h1 className="text-3xl font-semibold text-slate-900">{project.name}</h1>
              {project.description ? (
                <p className="max-w-2xl text-sm text-slate-600">{project.description}</p>
              ) : null}
            </div>
            <div className="flex gap-3 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-center">
                <p className="text-xs uppercase tracking-wide text-slate-400">Tickets</p>
                <p className="text-lg font-semibold text-slate-900">{ticketStatusCounts.total}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-center">
                <p className="text-xs uppercase tracking-wide text-slate-400">Organization</p>
                <p className="text-lg font-semibold text-slate-900">{project.organization.name}</p>
              </div>
            </div>
          </div>

          <section className="glass-panel glow-edge rounded-3xl p-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm text-slate-600">
              {["BACKLOG", "IN_PROGRESS", "BLOCKED", "DONE"].map((status) => (
                <div
                  key={status}
                  className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-center"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-400">{status.replace("_", " ")}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {ticketStatusCounts[status] ?? 0}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Tickets</h2>
              <span className="text-sm text-slate-500">
                Showing {project.tickets.length} ticket{project.tickets.length === 1 ? "" : "s"}
              </span>
            </div>
            {project.tickets.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-slate-200 bg-white/70 px-4 py-6 text-center text-sm text-slate-500">
                No tickets yet. Load the demo data or create tickets via the API.
              </p>
            ) : (
              <div className="space-y-4">
                {project.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Ticket</p>
                        <h3 className="text-lg font-semibold text-slate-900">{ticket.title}</h3>
                        {ticket.description ? (
                          <p className="max-w-3xl text-sm text-slate-600">{ticket.description}</p>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${
                            statusColors[ticket.status] ?? "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {ticket.status.replace("_", " ")}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${
                            priorityColors[ticket.priority] ?? "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {ticket.priority}
                        </span>
                        {ticket.dueAt ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-slate-700">
                            Due {new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(ticket.dueAt)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer hideProductLinks />
    </div>
  );
}

