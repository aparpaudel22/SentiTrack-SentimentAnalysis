"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
      if (data.token) setResetLink(`${window.location.origin}/reset-password/${data.token}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-page" style={{ maxWidth: 420, paddingTop: 80, paddingBottom: 80 }}>
      <div className="card" style={{ padding: 32 }}>
        {!submitted ? (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Forgot your password?</h1>
            <p style={{ color: "var(--color-muted)", fontSize: 14, marginBottom: 24 }}>
              Enter your account email and we&apos;ll generate a reset link for you.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  style={{
                    display: "block", width: "100%", marginTop: 6, padding: 12,
                    borderRadius: 10, border: "1px solid var(--color-border)",
                    background: "var(--color-bg)", color: "var(--color-text)", fontSize: 14,
                  }}
                />
              </div>
              {error && (
                <p style={{ color: "var(--color-negative)", fontSize: 13, margin: 0 }}>{error}</p>
              )}
              <button type="submit" className="btn-primary" disabled={loading}
                style={{ width: "100%", marginTop: 4 }}>
                {loading ? "Generating link..." : "Send Reset Link"}
              </button>
            </form>
            <p style={{ fontSize: 13, color: "var(--color-muted)", marginTop: 20, textAlign: "center" }}>
              Remember your password?{" "}
              <Link href="/login" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                Log in
              </Link>
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize: 36, marginBottom: 16 }}>✉️</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Your reset link is ready</h2>
            {resetLink ? (
              <>
                <p style={{ fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7, marginBottom: 16 }}>
                  In production this would be sent to your email. Since this is a local demo, click the
                  link below to reset your password:
                </p>
                <div style={{
                  background: "var(--color-bg-soft)", borderRadius: 10, padding: 14,
                  wordBreak: "break-all", fontSize: 12, marginBottom: 12,
                }}>
                  <Link href={resetLink} style={{ color: "var(--color-primary)" }}>
                    {resetLink}
                  </Link>
                </div>
                <p style={{ fontSize: 12, color: "var(--color-muted)" }}>
                  This link expires in <strong>1 hour</strong>.
                </p>
              </>
            ) : (
              <p style={{ fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7 }}>
                If an account exists for <strong>{email}</strong> with email/password login, a reset link
                was generated. Note: Google/Apple accounts cannot reset passwords this way.
              </p>
            )}
            <Link href="/login" className="btn-secondary"
              style={{ display: "block", textAlign: "center", marginTop: 20, fontSize: 13, padding: "10px 0" }}>
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}