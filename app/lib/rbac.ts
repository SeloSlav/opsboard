import { prisma } from './prisma';

type MembershipResult = Awaited<ReturnType<typeof prisma.membership.findUnique>>;
type Role = MembershipResult extends { role: infer R } ? R : never;

export async function assertRole(orgId: string, roles: Role[], userId: string) {
  const membership = await prisma.membership.findUnique({
    where: { userId_organizationId: { userId, organizationId: orgId } },
  });

  if (!membership || !roles.includes(membership.role)) {
    throw new Error('FORBIDDEN');
  }

  return membership.role;
}