"use client";
import { useState } from "react";

export default function ActivityLog({ activity }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="card" style={{ padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Analysis Activity ({activity.length})</h3>
      {activity.length === 0 ? (
        <p style={{ color: "var(--color-muted)", fontSize: 14 }}>No activity yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {activity.map((entry) => {
            const expanded = expandedId === entry.id;
            return (
              <div key={entry.id} style={{ border: "1px solid var(--color-border)", borderRadius: 10, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => setExpandedId(expanded ? null : entry.id)}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{entry.email}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "var(--color-muted)" }}>
                      {new Date(entry.date).toLocaleString()} · {entry.commentsCount} comment{entry.commentsCount === 1 ? "" : "s"}
                    </p>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 999, color: entry.success ? "#16a34a" : "var(--color-negative)", background: entry.success ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.1)" }}>
                    {entry.success ? "Success" : "Error"}
                  </span>
                </div>

                {expanded && (
                  <div style={{ marginTop: 12, borderTop: "1px solid var(--color-border)", paddingTop: 12 }}>
                    {entry.error && <p style={{ fontSize: 13, color: "var(--color-negative)", marginBottom: 8 }}>Error: {entry.error}</p>}
                    {entry.summary && (
                      <p style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 8 }}>
                        Summary — positive: {entry.summary.counts?.positive ?? 0}, negative: {entry.summary.counts?.negative ?? 0}, neutral: {entry.summary.counts?.neutral ?? 0}
                      </p>
                    )}
                    {entry.comments?.length > 0 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {entry.comments.map((text, i) => {
                          const result = entry.results?.[i];
                          return (
                            <div key={i} style={{ fontSize: 13, padding: "6px 10px", borderRadius: 8, background: "var(--color-bg-soft)" }}>
                              <span>{text}</span>
                              {result?.sentiment && <span style={{ marginLeft: 8, fontWeight: 600, color: "var(--color-muted)" }}>[{result.sentiment}]</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}