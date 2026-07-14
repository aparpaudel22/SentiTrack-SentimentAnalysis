"use client";

import { useEffect } from "react";

export default function ConfirmModal({
  open, title, message, confirmLabel = "Confirm",
  confirmDanger = false, onConfirm, onCancel, children,
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 18,
          padding: "28px 28px 24px",
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          animation: "scaleIn 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>{title}</h2>
        <p style={{ fontSize: 13.5, color: "var(--color-muted)", lineHeight: 1.7, marginBottom: children ? 18 : 22 }}>
          {message}
        </p>

        {children && <div style={{ marginBottom: 22 }}>{children}</div>}

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onCancel} className="btn-secondary" style={{ padding: "9px 18px", fontSize: 13 }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-primary"
            style={{
              padding: "9px 18px", fontSize: 13,
              background: confirmDanger ? "var(--color-negative)" : undefined,
              borderColor: confirmDanger ? "var(--color-negative)" : undefined,
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}