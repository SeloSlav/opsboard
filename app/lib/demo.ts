import { Role } from "@prisma/client";
import { prisma } from "./prisma";

export async function seedDemoData(userId: string) {
  const existingOrg = await prisma.membership.findFirst({
    where: {
      userId,
      organization: {
        name: "Demo Org",
      },
    },
    include: {
      organization: true,
    },
  });

  if (existingOrg) {
    return existingOrg.organization;
  }

  const organization = await prisma.organization.create({
    data: {
      name: "Demo Org",
      memberships: {
        create: {
          role: Role.OWNER,
          userId,
        },
      },
      projects: {
        create: [
          {
            name: "Website Redesign",
            description: "90-day overhaul of the marketing site and client portal.",
            tickets: {
              create: [
                {
                  title: "Setup CI",
                  status: "IN_PROGRESS",
                  priority: "HIGH",
                  description: "Integrate GitHub Actions and quality gates for every PR.",
                },
                {
                  title: "Implement auth",
                  status: "BACKLOG",
                  description: "Wire GitHub OAuth through NextAuth and seed RBAC roles.",
                },
                {
                  title: "Ticket detail page",
                  status: "BACKLOG",
                  description: "Design and build the ticket drill-down with activity feed.",
                },
              ],
            },
          },
        ],
      },
    },
    include: {
      memberships: true,
      projects: {
        include: {
          tickets: true,
        },
      },
    },
  });

  return organization;
}

export async function clearDemoData(userId: string) {
  const memberships = await prisma.membership.findMany({
    where: {
      userId,
      organization: {
        name: "Demo Org",
      },
    },
    select: {
      organizationId: true,
    },
  });

  if (memberships.length === 0) {
    return;
  }

  const organizationIds = memberships.map((m) => m.organizationId);

  await prisma.comment.deleteMany({
    where: {
      ticket: {
        project: {
          organizationId: {
            in: organizationIds,
          },
        },
      },
    },
  });

  await prisma.ticket.deleteMany({
    where: {
      project: {
        organizationId: {
          in: organizationIds,
        },
      },
    },
  });

  await prisma.project.deleteMany({
    where: {
      organizationId: {
        in: organizationIds,
      },
    },
  });

  await prisma.membership.deleteMany({
    where: {
      userId,
      organizationId: {
        in: organizationIds,
      },
    },
  });

  await prisma.organization.deleteMany({
    where: {
      id: {
        in: organizationIds,
      },
    },
  });
}

