import { getServerSession } from "next-auth/next";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const isAdmin = !!email && email.toLowerCase() === (process.env.ADMIN_EMAIL || "").toLowerCase();
  console.log("ADMIN AUTH CHECK:", { email, adminEnv: process.env.ADMIN_EMAIL, isAdmin });
  return { session, isAdmin };
}