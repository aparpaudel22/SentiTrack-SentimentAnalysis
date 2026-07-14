import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import fs from "fs";
import path from "path";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getUserByEmail, updateProfile } from "../../../../lib/server/userStore";

const ALLOWED_TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const MAX_SIZE = 4 * 1024 * 1024; // 4MB

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get("avatar");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No image file provided." }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Only JPG, PNG, or WEBP images are allowed." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Image must be smaller than 4MB." }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads", "avatars");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const existingFiles = fs.readdirSync(uploadsDir).filter((f) => f.startsWith(`${user.id}.`));
  existingFiles.forEach((f) => fs.unlinkSync(path.join(uploadsDir, f)));

  const filename = `${user.id}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(uploadsDir, filename), buffer);

  const avatarUrl = `/uploads/avatars/${filename}?v=${Date.now()}`;
  const updated = updateProfile(user.id, { avatarUrl });
  const { passwordHash, ...safe } = updated;
  return NextResponse.json({ user: safe });
}