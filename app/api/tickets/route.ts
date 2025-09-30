import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { assertRole } from "@/lib/rbac";

const TicketBody = z.object({
  projectId: z.string().min(1),
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
});

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    const data = TicketBody.parse(await req.json());
    const project = await prisma.project.findUnique({ where: { id: data.projectId } });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await assertRole(project.organizationId, ["MANAGER", "ADMIN", "OWNER"], user.id);

    const ticket = await prisma.ticket.create({
      data: {
        projectId: data.projectId,
        title: data.title,
        description: data.description,
        priority: data.priority ?? "MEDIUM",
      },
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 422 });
    }
    if ((error as Error).message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if ((error as Error).message === "UNAUTHENTICATED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
