import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUserByEmail } from "../../../../lib/server/userStore";

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const user = getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  const { passwordHash, ...safe } = user;
  return NextResponse.json({ user: safe });
}