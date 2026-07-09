"use client";
import ProtectedRoute from "../../components/ProtectedRoute";
import ThemeToggle from "../../components/ThemeToggle";
import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";
export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
function SettingsContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  function handleLogout() {
    logout();
    router.push("/login");
  }
  return (
    <div className="container-page" style={{ maxWidth: 560, paddingTop: 48, paddingBottom: 64 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Settings</h1>
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Account</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
          <div>
            <span style={{ color: "var(--color-muted)" }}>Name: </span>
            {user.name}
          </div>
          <div>
            <span style={{ color: "var(--color-muted)" }}>Email: </span>
            {user.email}
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Appearance</h3>
        <p style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 14 }}>
          Choose how SentiTrack looks on this device.
        </p>
        <ThemeToggle />
      </div>
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Session</h3>
        <button
          onClick={handleLogout}
          className="btn-secondary"
          style={{ borderColor: "var(--color-negative)", color: "var(--color-negative)" }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}