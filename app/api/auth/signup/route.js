import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { getUserByEmail, createUser, updateProfile } from "../../../../lib/server/userStore";

const ALLOWED_TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const MAX_SIZE = 4 * 1024 * 1024; // 4MB

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const avatar = formData.get("avatar");

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!avatar || typeof avatar === "string") {
    return NextResponse.json({ error: "A profile picture is required." }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[avatar.type];
  if (!ext) {
    return NextResponse.json({ error: "Profile picture must be a JPG, PNG, or WEBP image." }, { status: 400 });
  }
  if (avatar.size > MAX_SIZE) {
    return NextResponse.json({ error: "Profile picture must be smaller than 4MB." }, { status: 400 });
  }

  if (getUserByEmail(email)) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({ name, email, passwordHash });

  const uploadsDir = path.join(process.cwd(), "public", "uploads", "avatars");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const filename = `${user.id}.${ext}`;
  const buffer = Buffer.from(await avatar.arrayBuffer());
  fs.writeFileSync(path.join(uploadsDir, filename), buffer);

  updateProfile(user.id, { avatarUrl: `/uploads/avatars/${filename}?v=${Date.now()}` });

  return NextResponse.json({ success: true });
}