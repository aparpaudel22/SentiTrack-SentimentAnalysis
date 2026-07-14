import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getResetByToken, clearResetToken } from "../../../lib/server/resetStore";
import { getUsers, saveUsers } from "../../../lib/server/userStore";

export async function POST(request) {
  const { token, password } = await request.json();

  if (!token || !password)
    return NextResponse.json({ error: "Token and new password are required." }, { status: 400 });

  if (password.length < 8)
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });

  const reset = getResetByToken(token);
  if (!reset)
    return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 });

  const users = getUsers();
  const idx = users.findIndex((u) => u.email.toLowerCase() === reset.email);
  if (idx === -1)
    return NextResponse.json({ error: "Account not found." }, { status: 404 });

  users[idx].passwordHash = await bcrypt.hash(password, 10);
  saveUsers(users);
  clearResetToken(token);

  return NextResponse.json({ success: true });
}