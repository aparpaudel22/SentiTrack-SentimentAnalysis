"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TosModal from "../../components/TosModal";
import { GoogleIcon, AppleIcon } from "../../components/BrandIcons";
import PasswordField from "../../components/PasswordField";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTos, setShowTos] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingPassword, setPendingPassword] = useState("");

  function handleAvatarSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!avatar) {
      setError("Please upload a profile picture to continue.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");

      setPendingEmail(email);
      setPendingPassword(password);
      setShowTos(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleTosAccept() {
    window.localStorage.setItem(`sentitrack-tos-accepted-${pendingEmail}`, "true");
    setShowTos(false);

    const signInResult = await signIn("credentials", {
      email: pendingEmail, password: pendingPassword, redirect: false,
    });
    if (signInResult?.error) {
      setError("Account created, but login failed. Please log in manually.");
      return;
    }
    router.push("/analyze");
  }

  return (
    <>
      {showTos && <TosModal onAccept={handleTosAccept} />}

      <div className="container-page" style={{ maxWidth: 420, paddingTop: 80, paddingBottom: 80 }}>
        <div className="card" style={{ padding: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Create your account</h1>
          <p style={{ color: "var(--color-muted)", fontSize: 14, marginBottom: 24 }}>
            Sign up to start analyzing customer sentiment.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            <button type="button" onClick={() => signIn("google", { callbackUrl: "/analyze" })}
              className="btn-secondary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <GoogleIcon /> Continue with Google
            </button>
            <button type="button" onClick={() => signIn("apple", { callbackUrl: "/analyze" })}
              className="btn-secondary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <AppleIcon /> Continue with Apple
            </button>
          </div>

          <p style={{ fontSize: 12, color: "var(--color-muted)", textAlign: "center", marginBottom: 4 }}>
            Signing up with Google or Apple? You'll be asked to add a profile picture afterward in Settings.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
            <span style={{ fontSize: 12, color: "var(--color-muted)" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)", display: "block", marginBottom: 8 }}>
                Profile Picture <span style={{ color: "var(--color-negative)" }}>*</span>
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 60, height: 60, borderRadius: "50%", overflow: "hidden",
                    background: "var(--color-bg-soft)", display: "flex", alignItems: "center",
                    justifyContent: "center", border: "1px solid var(--color-border)", flexShrink: 0,
                  }}
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: 10, color: "var(--color-muted)" }}>No photo</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="signup-avatar"
                    className="btn-secondary"
                    style={{ fontSize: 13, padding: "8px 16px", cursor: "pointer", display: "inline-block" }}
                  >
                    {avatar ? "Change Photo" : "Upload Photo"}
                  </label>
                  <input
                    id="signup-avatar"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarSelect}
                    style={{ display: "none" }}
                  />
                  <p style={{ fontSize: 11.5, color: "var(--color-muted)", marginTop: 5 }}>
                    Required. A real photo of yourself — JPG, PNG, or WEBP, up to 4MB.
                  </p>
                </div>
              </div>
            </div>

            <Field label="Full Name" type="text" value={name} onChange={setName} />
            <Field label="Email" type="email" value={email} onChange={setEmail} />
            <PasswordField label="Password" value={password} onChange={setPassword} autoComplete="new-password" />

            {error && <p style={{ color: "var(--color-negative)", fontSize: 13, margin: 0 }}>{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", marginTop: 8 }}>
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p style={{ fontSize: 13, color: "var(--color-muted)", marginTop: 20, textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--color-primary)", fontWeight: 600 }}>Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}

function Field({ label, type, value, onChange }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)" }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required
        style={{
          display: "block", width: "100%", marginTop: 6, padding: 12,
          borderRadius: 10, border: "1px solid var(--color-border)",
          background: "var(--color-bg)", color: "var(--color-text)", fontSize: 14,
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}