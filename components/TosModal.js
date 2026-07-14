"use client";

import { useState } from "react";
import Link from "next/link";

export default function TosModal({ onAccept }) {
  const [checked, setChecked] = useState(false);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 20,
          padding: 36,
          width: "100%",
          maxWidth: 520,
          boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            width: 48, height: 48, borderRadius: 14,
            background: "var(--color-primary-soft)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, marginBottom: 18,
          }}
        >
          📋
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
          Before you continue
        </h2>
        <p style={{ fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7, marginBottom: 20 }}>
          Welcome to SentiTrack. Please read and accept our terms before using the platform.
        </p>

        <div
          style={{
            background: "var(--color-bg-soft)",
            borderRadius: 12,
            padding: 18,
            fontSize: 13,
            lineHeight: 1.8,
            color: "var(--color-muted)",
            maxHeight: 200,
            overflowY: "auto",
            marginBottom: 20,
          }}
        >
          <p style={{ fontWeight: 700, color: "var(--color-text)", marginBottom: 8 }}>Summary of key points:</p>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            <li>You must be at least 13 years old to use SentiTrack.</li>
            <li>Your email/password are stored securely with bcrypt hashing.</li>
            <li>Your report history is saved locally in your browser only — never on our servers.</li>
            <li>Sentiment results are AI-generated and may not be 100% accurate — use them as a guide, not a definitive judgment.</li>
            <li>We use session cookies to keep you logged in. No advertising or tracking cookies are used.</li>
            <li>You can delete your account and all data at any time from Settings.</li>
            <li>Google and Apple sign-in is subject to their respective privacy policies.</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            Read the full{" "}
            <Link href="/terms" target="_blank" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
              Terms of Service
            </Link>
            {" "}and{" "}
            <Link href="/privacy" target="_blank" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <label
          style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            cursor: "pointer", marginBottom: 24, fontSize: 13, lineHeight: 1.6,
          }}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{ marginTop: 2, width: 16, height: 16, cursor: "pointer", accentColor: "var(--color-primary)" }}
          />
          <span>
            I have read and agree to the{" "}
            <Link href="/terms" target="_blank" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" target="_blank" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
              Privacy Policy
            </Link>
            . I understand how my data is stored and used.
          </span>
        </label>

        <button
          onClick={onAccept}
          disabled={!checked}
          className="btn-primary"
          style={{ width: "100%", padding: "12px 0", fontSize: 14, opacity: checked ? 1 : 0.45, cursor: checked ? "pointer" : "not-allowed" }}
        >
          Accept & Continue
        </button>
      </div>
    </div>
  );
}