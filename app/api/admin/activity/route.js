import { NextResponse } from "next/server";
import { requireAdminSession } from "../../../../lib/server/adminAuth";
import { getAllActivity } from "../../../../lib/server/activityStore";

export async function GET() {
  const { isAdmin } = await requireAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const activity = getAllActivity();
  return NextResponse.json({ activity });
}