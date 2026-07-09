"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useAuth } from "../lib/auth-context";
const links = [
  {href: "/dashboard", label: "Dashboard"},
  { href: "/analyze", label: "Analyze" },
  { href: "/history", label: "History" },
];
export default function Navbar() {
  const pathname = usePathname();
  const { user, initialized, logout } = useAuth();
  return (
    <header
      style={{
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="container-page"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}
      >
        <Link href="/">
          <Logo />
        </Link>
        {user && (
          <nav style={{ display: "flex", gap: 4, padding: 4, borderRadius: 12, background: "var(--color-bg-soft)" }}>
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    padding: "8px 16px",
                    borderRadius: 9,
                    color: active ? "white" : "var(--color-muted)",
                    background: active
                      ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))"
                      : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!initialized ? null : user ? (
            <>
              <Link href="/settings" style={{ fontSize: 14, fontWeight: 600, color: "var(--color-muted)" }}>
                {(user.name || user.email || "Account").split(" ")[0]}
              </Link>
              <button onClick={logout} className="btn-secondary" style={{ padding: "8px 16px", fontSize: 13 }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary" style={{ padding: "8px 16px", fontSize: 13 }}>
                Login
              </Link>
              <Link href="/signup" className="btn-primary" style={{ padding: "8px 16px", fontSize: 13 }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}