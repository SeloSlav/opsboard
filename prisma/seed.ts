import { prisma } from "../app/lib/prisma";
import { seedDemoData } from "../app/lib/demo";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@nimbra.dev" },
    update: {},
    create: { email: "demo@nimbra.dev", name: "Demo User" },
  });

  await seedDemoData(user.id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});