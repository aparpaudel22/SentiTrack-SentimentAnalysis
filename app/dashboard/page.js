"use client";
import { useEffect, useMemo, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import EmptyState from "../../components/EmptyState";
import { useAuth } from "../../lib/auth-context";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SENTIMENTS } from "../../lib/constants";
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
function DashboardContent() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const key = `sentitrack-history-${user.email}`;
    const stored = JSON.parse(window.localStorage.getItem(key) || "[]");
    setHistory(stored.filter((entry) => entry.summary));
  }, [user.email]);
  const chartData = useMemo(() => {
    return [...history]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((entry) => ({
        date: new Date(entry.date).toLocaleDateString(),
        Positive: entry.summary.percentages.positive,
        Negative: entry.summary.percentages.negative,
        Neutral: entry.summary.percentages.neutral,
      }));
  }, [history]);
  const stats = useMemo(() => {
    if (history.length === 0) {
      return { totalReports: 0, totalComments: 0, avgPositive: 0, avgNegative: 0 };
    }
    const totalComments = history.reduce((sum, entry) => sum + entry.summary.total, 0);
    const avgPositive = Math.round(
      history.reduce((sum, entry) => sum + entry.summary.percentages.positive, 0) / history.length
    );
    const avgNegative = Math.round(
      history.reduce((sum, entry) => sum + entry.summary.percentages.negative, 0) / history.length
    );
    return { totalReports: history.length, totalComments, avgPositive, avgNegative };
  }, [history]);
  return (
    <div className="container-page" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Dashboard</h1>
      <p style={{ color: "var(--color-muted)", marginBottom: 32 }}>
        Sentiment trends across all your saved reports.
      </p>
      {history.length === 0 ? (
        <EmptyState title="No data yet" description="Run a few analyses to see your sentiment trends here." />
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <StatCard label="Reports Analyzed" value={stats.totalReports} />
            <StatCard label="Comments Analyzed" value={stats.totalComments} />
            <StatCard label="Avg. Positive" value={`${stats.avgPositive}%`} color={SENTIMENTS.positive.color} />
            <StatCard label="Avg. Negative" value={`${stats.avgNegative}%`} color={SENTIMENTS.negative.color} />
          </div>
          <div className="card" style={{ padding: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Sentiment Over Time</h3>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} unit="%" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Positive" stroke={SENTIMENTS.positive.color} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Negative" stroke={SENTIMENTS.negative.color} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Neutral" stroke={SENTIMENTS.neutral.color} strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
function StatCard({ label, value, color }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
        {label}
      </p>
      <p style={{ fontSize: 26, fontWeight: 800, color: color || "var(--color-text)" }}>{value}</p>
    </div>
  );
}