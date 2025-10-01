import { NextResponse } from "next/server";
import { seedDemoData } from "@/lib/demo";
import { auth } from "@/lib/auth";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organization = await seedDemoData(session.user.id);

  return NextResponse.json({ organization });
}

