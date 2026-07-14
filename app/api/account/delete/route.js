import { NextResponse } from "next/server";
import { getUsers, saveUsers } from "../../../../lib/server/userStore";

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const users = getUsers();
  const filtered = users.filter((u) => u.email.toLowerCase() !== email.toLowerCase());

  if (filtered.length === users.length) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  saveUsers(filtered);
  return NextResponse.json({ success: true });
}