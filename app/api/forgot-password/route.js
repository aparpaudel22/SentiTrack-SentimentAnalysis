import { NextResponse } from "next/server";
import { getUserByEmail } from "../../../lib/server/userStore";
import { createResetToken } from "../../../lib/server/resetStore";

export async function POST(request) {
  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

  const user = getUserByEmail(email);
  if (!user || !user.passwordHash) {
    return NextResponse.json({ success: true, token: null });
  }

  const token = createResetToken(email);
  return NextResponse.json({ success: true, token });
}