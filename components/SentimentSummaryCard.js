"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { SENTIMENTS } from "../lib/constants";
export default function SentimentSummaryCard({ summary, overview }) {
  const data = [
    { name: "Positive", value: summary.counts.positive, color: SENTIMENTS.positive.color },
    { name: "Negative", value: summary.counts.negative, color: SENTIMENTS.negative.color },
    { name: "Neutral", value: summary.counts.neutral, color: SENTIMENTS.neutral.color },
  ];
  return (
    <div
      className="card"
      style={{ padding: 28, display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, alignItems: "center" }}
    >
      <div style={{ width: 180, height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Overview</h3>
        <p style={{ fontSize: 14, color: "var(--color-muted)", marginBottom: 16 }}>{overview}</p>
        <div style={{ display: "flex", gap: 20 }}>
          {data.map((entry) => (
            <div key={entry.name} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: entry.color }}>
                {summary.total ? Math.round((entry.value / summary.total) * 100) : 0}%
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted)" }}>{entry.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}