"use client";
import { createContext, useContext } from "react";
import { useSession, signOut } from "next-auth/react";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const value = {
    user: session?.user || null,
    initialized: status !== "loading",
    logout: () => signOut({ callbackUrl: "/" }),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}