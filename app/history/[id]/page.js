"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "../../../components/ProtectedRoute";
import ReportCharts from "../../../components/ReportCharts";
import SuggestionsPanel from "../../../components/SuggestionsPanel";
import CommentResultCard from "../../../components/CommentResultCard";
import EmptyState from "../../../components/EmptyState";
import { useAuth } from "../../../lib/auth-context";
import { exportReportAsPDF, exportReportAsCSV } from "../../../lib/export";
export default function HistoryDetailPage() {
  return (
    <ProtectedRoute>
      <HistoryDetailContent />
    </ProtectedRoute>
  );
}
function HistoryDetailContent() {
  const { user } = useAuth();
  const { id } = useParams();
  const router = useRouter();
  const [entry, setEntry] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const key = `sentitrack-history-${user.email}`;
    const stored = JSON.parse(window.localStorage.getItem(key) || "[]");
    const found = stored.find((item) => String(item.id) === String(id));
    setEntry(found || null);
    setLoaded(true);
  }, [user.email, id]);
  if (!loaded) return null;
  if (!entry) {
    return (
      <div className="container-page" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <EmptyState title="Report not found" description="This report may have been removed from this browser." />
      </div>
    );
  }
  return (
    <div className="container-page" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <button
        onClick={() => router.push("/history")}
        className="btn-secondary"
        style={{ marginBottom: 20, fontSize: 13, padding: "8px 16px" }}
      >
        ← Back to History
      </button>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Report Details</h1>
      <p style={{ color: "var(--color-muted)", marginBottom: 28 }}>{new Date(entry.date).toLocaleString()}</p>
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        <button onClick={() => exportReportAsPDF(entry)} className="btn-primary" style={{ fontSize: 13, padding: "9px 18px" }}>
          Export PDF
        </button>
        <button onClick={() => exportReportAsCSV(entry)} className="btn-secondary" style={{ fontSize: 13, padding: "9px 18px" }}>
          Export CSV
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <ReportCharts summary={entry.summary} />
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Overview</h3>
          <p style={{ fontSize: 14, color: "var(--color-muted)", margin: 0 }}>{entry.overview}</p>
        </div>
        <SuggestionsPanel suggestions={entry.suggestions} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {entry.results.map((comment) => (
            <CommentResultCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}