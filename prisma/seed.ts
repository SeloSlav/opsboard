import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@opsboard.dev' },
    update: {},
    create: { email: 'demo@opsboard.dev', name: 'Demo User' },
  });

  const org = await prisma.organization.create({
    data: { name: 'Demo Org' },
  });

  await prisma.membership.create({
    data: { userId: user.id, organizationId: org.id, role: 'OWNER' },
  });

  const project = await prisma.project.create({
    data: { organizationId: org.id, name: 'Website Redesign' },
  });

  await prisma.ticket.createMany({
    data: [
      {
        projectId: project.id,
        title: 'Setup CI',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
      },
      {
        projectId: project.id,
        title: 'Implement auth',
        status: 'BACKLOG',
      },
      {
        projectId: project.id,
        title: 'Ticket detail page',
        status: 'BACKLOG',
      },
    ],
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });