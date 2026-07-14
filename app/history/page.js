"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import EmptyState from "../../components/EmptyState";
import SentimentBadge from "../../components/SentimentBadge";
import ConfirmModal from "../../components/ConfirmModal";
import { useAuth } from "../../lib/auth-context";

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <HistoryContent />
    </ProtectedRoute>
  );
}

function HistoryContent() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [clearOpen, setClearOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function storageKey() {
    return `sentitrack-history-${user.email}`;
  }

  useEffect(() => {
    const stored = JSON.parse(window.localStorage.getItem(storageKey()) || "[]");
    setHistory(stored);
  }, [user.email]);

  function save(updated) {
    window.localStorage.setItem(storageKey(), JSON.stringify(updated));
    setHistory(updated);
  }

  function deleteEntry(id) {
    save(history.filter((e) => String(e.id) !== String(id)));
    setDeleteTarget(null);
  }

  function clearAll() {
    window.localStorage.removeItem(storageKey());
    setHistory([]);
    setClearOpen(false);
  }

  return (
    <div className="container-page" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 6, flexWrap: "wrap", gap: 12,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Past Reports</h1>
        {history.length > 0 && (
          <button
            onClick={() => setClearOpen(true)}
            className="btn-secondary"
            style={{ fontSize: 13, padding: "8px 16px", borderColor: "var(--color-negative)", color: "var(--color-negative)" }}
          >
            Clear All History
          </button>
        )}
      </div>
      <p style={{ color: "var(--color-muted)", marginBottom: 32 }}>
        Your last 20 sentiment analyses on this device.
      </p>

      {history.length === 0 ? (
        <EmptyState title="No reports yet" description="Run an analysis to see it appear here." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {history.map((entry) => (
            <div key={entry.id} className="card" style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <Link
                  href={`/history/${entry.id}`}
                  style={{ flex: 1, minWidth: 0, textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: "var(--color-muted)" }}>
                      {new Date(entry.date).toLocaleString()}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--color-muted)" }}>
                      {entry.summary.total} comments
                    </span>
                  </div>
                  <p style={{ fontSize: 14, margin: "0 0 12px" }}>{entry.overview}</p>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <SentimentBadge sentiment="positive" />
                    <span style={{ fontSize: 13 }}>{entry.summary.percentages.positive}%</span>
                    <SentimentBadge sentiment="negative" />
                    <span style={{ fontSize: 13 }}>{entry.summary.percentages.negative}%</span>
                    <SentimentBadge sentiment="neutral" />
                    <span style={{ fontSize: 13 }}>{entry.summary.percentages.neutral}%</span>
                  </div>
                </Link>

                <button
                  onClick={() => setDeleteTarget(entry)}
                  title="Delete this report"
                  style={{
                    background: "none", border: "1px solid var(--color-border)", cursor: "pointer",
                    color: "var(--color-muted)", fontSize: 16, padding: "4px 10px",
                    borderRadius: 8, lineHeight: 1, flexShrink: 0,
                    transition: "color 0.15s, border-color 0.15s",
                  }}
                  onMouseEnter={(e) => { e.target.style.color = "var(--color-negative)"; e.target.style.borderColor = "var(--color-negative)"; }}
                  onMouseLeave={(e) => { e.target.style.color = "var(--color-muted)"; e.target.style.borderColor = "var(--color-border)"; }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clear all confirmation */}
      <ConfirmModal
        open={clearOpen}
        title="Clear all history?"
        message="This will permanently remove all saved reports from this browser for your account. Your account itself will not be affected. This cannot be undone."
        confirmLabel="Yes, Clear All"
        confirmDanger
        onCancel={() => setClearOpen(false)}
        onConfirm={clearAll}
      />

      {/* Delete single entry confirmation */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete this report?"
        message={
          deleteTarget
            ? `This will permanently remove the report from ${new Date(deleteTarget.date).toLocaleString()}. This cannot be undone.`
            : ""
        }
        confirmLabel="Yes, Delete"
        confirmDanger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => deleteEntry(deleteTarget?.id)}
      />
    </div>
  );
}