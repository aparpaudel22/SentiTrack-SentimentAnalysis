"use client";
import { useState } from "react";

export default function PasswordField({ label, value, onChange, autoComplete, placeholder, name }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)" }}>{label}</label>
      <div style={{ position: "relative", marginTop: 6 }}>
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
          style={{
            display: "block",
            width: "100%",
            padding: "12px 44px 12px 12px",
            borderRadius: 10,
            border: "1px solid var(--color-border)",
            background: "var(--color-bg)",
            color: "var(--color-text)",
            fontSize: 14,
            boxSizing: "border-box",
          }}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            padding: 4,
            cursor: "pointer",
            color: "var(--color-muted)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a19.7 19.7 0 0 1 4.06-5.94M9.9 4.24A10.4 10.4 0 0 1 12 4c7 0 11 8 11 8a19.7 19.7 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}