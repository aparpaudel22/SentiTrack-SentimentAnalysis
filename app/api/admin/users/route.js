import { NextResponse } from "next/server";
import { requireAdminSession } from "../../../../lib/server/adminAuth";
import { getUsers } from "../../../../lib/server/userStore";

export async function GET() {
  const { isAdmin } = await requireAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
  const users = getUsers().map(({ passwordHash, ...safe }) => ({
    ...safe,
    accountType: safe.email.toLowerCase() === adminEmail ? "Admin" : "User",
  }));
  return NextResponse.json({ users });
}