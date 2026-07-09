"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleIcon, AppleIcon } from "../../components/BrandIcons";
export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      const signInResult = await signIn("credentials", { email, password, redirect: false });
      if (signInResult?.error) throw new Error("Account created, but login failed. Please try logging in.");
      router.push("/analyze");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container-page" style={{ maxWidth: 420, paddingTop: 80, paddingBottom: 80 }}>
      <div className="card" style={{ padding: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Create your account</h1>
        <p style={{ color: "var(--color-muted)", fontSize: 14, marginBottom: 24 }}>
          Sign up to start analyzing customer sentiment.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/analyze" })}
            className="btn-secondary"
            style={{ width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", gap: 10}}
          >
            <GoogleIcon />Continue with Google
          </button>
          <button
            type="button"
            onClick={() => signIn("apple", { callbackUrl: "/analyze" })}
            className="btn-secondary"
            style={{ width: "100%" , display: "flex", alignItems: "center", justifyContent: "center", gap: 10}}
          >
            <AppleIcon />Continue with Apple
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
          <span style={{ fontSize: 12, color: "var(--color-muted)" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Full Name" type="text" value={name} onChange={setName} />
          <Field label="Email" type="email" value={email} onChange={setEmail} />
          <Field label="Password" type="password" value={password} onChange={setPassword} />
          {error && <p style={{ color: "var(--color-negative)", fontSize: 13, margin: 0 }}>{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", marginTop: 8 }}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p style={{ fontSize: 13, color: "var(--color-muted)", marginTop: 20, textAlign: "center" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
function Field({ label, type, value, onChange }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        style={{
          display: "block",
          width: "100%",
          marginTop: 6,
          padding: 12,
          borderRadius: 10,
          border: "1px solid var(--color-border)",
          background: "var(--color-bg)",
          color: "var(--color-text)",
          fontSize: 14,
        }}
      />
    </div>
  );
}