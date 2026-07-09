"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../lib/theme-context";
import { AuthProvider } from "../lib/auth-context";
export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}