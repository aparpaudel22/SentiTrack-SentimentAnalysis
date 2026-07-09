"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import EmptyState from "../../components/EmptyState";
import SentimentBadge from "../../components/SentimentBadge";
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
  useEffect(() => {
    const key = `sentitrack-history-${user.email}`;
    const stored = JSON.parse(window.localStorage.getItem(key) || "[]");
    setHistory(stored);
  }, [user.email]);
  return (
    <div className="container-page" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Past Reports</h1>
      <p style={{ color: "var(--color-muted)", marginBottom: 32 }}>Your last 20 sentiment analyses on this device.</p>
      {history.length === 0 ? (
        <EmptyState title="No reports yet" description="Run an analysis to see it appear here." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {history.map((entry) => (
            <Link key={entry.id} href={`/history/${entry.id}`} className="card" style={{ padding: 20, display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "var(--color-muted)" }}>{new Date(entry.date).toLocaleString()}</span>
                <span style={{ fontSize: 13, color: "var(--color-muted)" }}>{entry.summary.total} comments</span>
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
          ))}
        </div>
      )}
    </div>
  );
}