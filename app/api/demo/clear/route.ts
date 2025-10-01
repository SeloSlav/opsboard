import { NextResponse } from "next/server";
import { clearDemoData } from "@/lib/demo";
import { auth } from "@/lib/auth";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await clearDemoData(session.user.id);

  return NextResponse.json({ ok: true });
}

