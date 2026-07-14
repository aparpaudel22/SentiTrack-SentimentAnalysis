import { NextResponse } from "next/server";
import { requireAdminSession } from "../../../../../lib/server/adminAuth";
import { updateUser, deleteUser, getUserByEmail } from "../../../../../lib/server/userStore";

export async function PATCH(request, { params }) {
  const { isAdmin } = await requireAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const body = await request.json();
  const updated = updateUser(id, { name: body.name, remarks: body.remarks });
  if (!updated) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  const { passwordHash, ...safe } = updated;
  return NextResponse.json({ user: safe });
}

export async function DELETE(request, { params }) {
  const { isAdmin, session } = await requireAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;

  const self = getUserByEmail(session.user.email);
  if (self && self.id === id) {
    return NextResponse.json({ error: "You can't delete your own admin account." }, { status: 400 });
  }

  const deleted = deleteUser(id);
  if (!deleted) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}