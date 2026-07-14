"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PasswordField from "../../../components/PasswordField";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-page" style={{ maxWidth: 420, paddingTop: 80, paddingBottom: 80 }}>
      <div className="card" style={{ padding: 32 }}>
        {done ? (
          <>
            <div style={{ fontSize: 32, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Password updated!</h2>
            <p style={{ fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7, marginBottom: 20 }}>
              Your password has been changed. You can now log in with your new password.
            </p>
            <Link href="/login" className="btn-primary" style={{ display: "block", textAlign: "center", padding: "12px 0" }}>
              Go to Login
            </Link>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Set a new password</h1>
            <p style={{ color: "var(--color-muted)", fontSize: 14, marginBottom: 24 }}>
              Choose a strong password — at least 8 characters.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <PasswordField label="New Password" value={password} onChange={setPassword} placeholder="At least 8 characters" autoComplete="new-password" />
              <PasswordField label="Confirm New Password" value={confirm} onChange={setConfirm} placeholder="Repeat your new password" autoComplete="new-password" />
              {error && <p style={{ color: "var(--color-negative)", fontSize: 13, margin: 0 }}>{error}</p>}
              <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", marginTop: 4 }}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}