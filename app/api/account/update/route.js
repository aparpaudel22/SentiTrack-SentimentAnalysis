import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUserByEmail, updateProfile } from "../../../../lib/server/userStore";

export async function PATCH(request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const body = await request.json();
  const { name, phone, address, bio, company } = body;

  if (typeof name === "string" && !name.trim()) {
    return NextResponse.json({ error: "Name cannot be empty." }, { status: 400 });
  }

  const updated = updateProfile(user.id, { name, phone, address, bio, company });
  const { passwordHash, ...safe } = updated;
  return NextResponse.json({ user: safe });
}