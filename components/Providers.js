"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../lib/auth-context";
import { ThemeProvider } from "../lib/theme-context";
import ThemeInit from "./ThemeInit";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider>
          <ThemeInit />
          {children}
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  );
}