"use client";
import { createContext, useContext } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      router.refresh();
    } catch (e) {
      router.push("/");
    }
  };

  const value = {
    user: session?.user || null,
    initialized: status !== "loading",
    logout,
    refreshSession: update,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}