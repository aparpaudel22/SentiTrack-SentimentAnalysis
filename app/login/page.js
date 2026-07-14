"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleIcon, AppleIcon } from "../../components/BrandIcons";
import PasswordField from "../../components/PasswordField";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/analyze");
  }

  return (
    <div className="container-page" style={{ maxWidth: 420, paddingTop: 80, paddingBottom: 80 }}>
      <div className="card" style={{ padding: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Welcome back</h1>
        <p style={{ color: "var(--color-muted)", fontSize: 14, marginBottom: 24 }}>
          Log in to analyze comments and view your reports.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          <button type="button" onClick={() => signIn("google", { callbackUrl: "/analyze" })} className="btn-secondary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <GoogleIcon />Continue with Google
          </button>
          <button type="button" onClick={() => signIn("apple", { callbackUrl: "/analyze" })} className="btn-secondary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <AppleIcon />Continue with Apple
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
          <span style={{ fontSize: 12, color: "var(--color-muted)" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)" }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              style={{ display: "block", width: "100%", marginTop: 6, padding: 12, borderRadius: 10, border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text)", fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <PasswordField label="Password" name="password" value={password} onChange={setPassword} autoComplete="current-password" />
          {error && <p style={{ color: "var(--color-negative)", fontSize: 13, margin: 0 }}>{error}</p>}
          <div style={{ textAlign: "right", marginTop: -6 }}>
            <Link href="/forgot-password" style={{ fontSize: 12, color: "var(--color-primary)" }}>Forgot password?</Link>
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", marginTop: 8 }}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p style={{ fontSize: 13, color: "var(--color-muted)", marginTop: 20, textAlign: "center" }}>
          Don&apos;t have an account? <Link href="/signup" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}