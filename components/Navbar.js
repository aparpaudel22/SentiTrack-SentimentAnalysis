"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle } from "lucide-react";
import Logo from "./Logo";
import ConfirmModal from "./ConfirmModal";
import { useAuth } from "../lib/auth-context";

export default function Navbar() {
  const pathname = usePathname();
  const { user, initialized, logout } = useAuth();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/analyze",   label: "Analyze"   },
    { href: "/history",   label: "History"   },
    ...(isAdmin ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <>
      <header
        style={{
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          position: "sticky", top: 0, zIndex: 20,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          className="container-page"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}
        >
          <Link href="/"><Logo /></Link>

          {user && (
            <nav style={{ display: "flex", gap: 4, padding: 4, borderRadius: 12, background: "var(--color-bg-soft)" }}>
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} style={{
                    fontWeight: 600, fontSize: 14, padding: "8px 16px", borderRadius: 9,
                    color: active ? "white" : "var(--color-muted)",
                    background: active
                      ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))"
                      : "transparent",
                    transition: "background 0.15s, color 0.15s",
                  }}>
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!initialized ? null : user ? (
              <>
                <Link href="/settings" style={{
  display: "flex", alignItems: "center", gap: 7,
  padding: "7px 12px", borderRadius: 10, background: "var(--color-bg-soft)",
  color: "var(--color-text)", fontWeight: 600, fontSize: 14, textDecoration: "none",
}}>
  {user.avatarUrl ? (
    <img src={user.avatarUrl} alt="" style={{ width: 20, height: 20, borderRadius: "50%", objectFit: "cover" }} />
  ) : (
    <UserCircle size={20} color="var(--color-primary)" />
  )}
  {(user.name || user.email || "Account").split(" ")[0]}
</Link>

                <button
                  onClick={() => setLogoutOpen(true)}
                  className="btn-secondary"
                  style={{ padding: "8px 16px", fontSize: 13 }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-secondary" style={{ padding: "8px 16px", fontSize: 13 }}>Login</Link>
                <Link href="/signup" className="btn-primary" style={{ padding: "8px 16px", fontSize: 13 }}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <ConfirmModal
        open={logoutOpen}
        title="Log out?"
        message="You will be signed out of your account on this device. Your saved reports will remain stored locally in this browser."
        confirmLabel="Yes, Log Out"
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => { setLogoutOpen(false); logout(); }}
      />
    </>
  );
}