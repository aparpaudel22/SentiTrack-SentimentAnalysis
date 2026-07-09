"use client";
import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import CommentInputForm from "../../components/CommentInputForm";
import ReportCharts from "../../components/ReportCharts";
import SuggestionsPanel from "../../components/SuggestionsPanel";
import CommentResultCard from "../../components/CommentResultCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { useAuth } from "../../lib/auth-context";
import { exportReportAsPDF, exportReportAsCSV } from "../../lib/export";
export default function AnalyzePage() {
  return (
    <ProtectedRoute>
      <AnalyzeContent />
    </ProtectedRoute>
  );
}
function AnalyzeContent() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  async function handleSubmit(payload) {
    setLoading(true);
    setError("");
    setData(null);
    let comments = payload.comments;
    if (payload.mode === "link") {
      comments = [`[${payload.platform}] ${payload.link}`];
    }
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setData(result);
      saveToHistory(user.email, result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container-page" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Analyze Sentiment</h1>
      <p style={{ color: "var(--color-muted)", marginBottom: 32 }}>
        Paste customer comments or a social media link to get an instant sentiment breakdown.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 420px) 1fr", gap: 28, alignItems: "start" }}>
        <CommentInputForm onSubmit={handleSubmit} loading={loading} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {loading && <LoadingSpinner />}
          {!loading && error && <EmptyState title="Analysis failed" description={error} />}
          {!loading && !error && !data && (
            <EmptyState title="No results yet" description="Submit comments or a link on the left to see the sentiment breakdown here." />
          )}
          {!loading && data && (
            <>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => exportReportAsPDF(data)} className="btn-primary" style={{ fontSize: 13, padding: "9px 18px" }}>
                  Export PDF
                </button>
                <button onClick={() => exportReportAsCSV(data)} className="btn-secondary" style={{ fontSize: 13, padding: "9px 18px" }}>
                  Export CSV
                </button>
              </div>
              <ReportCharts summary={data.summary} />
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Overview</h3>
                <p style={{ fontSize: 14, color: "var(--color-muted)", margin: 0 }}>{data.overview}</p>
              </div>
              <SuggestionsPanel suggestions={data.suggestions} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data.results.map((comment) => (
                  <CommentResultCard key={comment.id} comment={comment} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
function saveToHistory(email, result) {
  const key = `sentitrack-history-${email}`;
  const existing = JSON.parse(window.localStorage.getItem(key) || "[]");
  const entry = { id: Date.now(), date: new Date().toISOString(), ...result };
  window.localStorage.setItem(key, JSON.stringify([entry, ...existing].slice(0, 20)));
}