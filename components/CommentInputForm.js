"use client";
import { useState } from "react";
import { PLATFORMS } from "../lib/constants";
export default function CommentInputForm({ onSubmit, loading }) {
  const [mode, setMode] = useState("comments");
  const [commentsText, setCommentsText] = useState("");
  const [link, setLink] = useState("");
  const [platform, setPlatform] = useState(PLATFORMS[0].id);
  function handleSubmit(e) {
    e.preventDefault();
    if (mode === "comments") {
      const comments = commentsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      onSubmit({ mode, comments });
    } else {
      onSubmit({ mode, link, platform });
    }
  }
  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 28 }}>
      <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--color-bg-soft)", borderRadius: 10, marginBottom: 20, width: "fit-content" }}>
        <TabButton active={mode === "comments"} onClick={() => setMode("comments")} label="Paste Comments" />
        <TabButton active={mode === "link"} onClick={() => setMode("link")} label="Social Media Link" />
      </div>
      {mode === "comments" ? (
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)" }}>
            One comment per line
          </label>
          <textarea
            value={commentsText}
            onChange={(e) => setCommentsText(e.target.value)}
            placeholder={"Great service, will come again!\nToo slow, waited 40 minutes.\nDecent food but overpriced."}
            rows={8}
            required
            style={{
              width: "100%",
              marginTop: 8,
              padding: 14,
              borderRadius: 12,
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
              color: "var(--color-text)",
              fontSize: 14,
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)" }}>Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                marginTop: 8,
                padding: 12,
                borderRadius: 12,
                border: "1px solid var(--color-border)",
                background: "var(--color-bg)",
                color: "var(--color-text)",
                fontSize: 14,
              }}
            >
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)" }}>Post or Profile Link</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://www.instagram.com/p/..."
              required
              style={{
                display: "block",
                width: "100%",
                marginTop: 8,
                padding: 12,
                borderRadius: 12,
                border: "1px solid var(--color-border)",
                background: "var(--color-bg)",
                color: "var(--color-text)",
                fontSize: 14,
              }}
            />
          </div>
          <p style={{ fontSize: 12, color: "var(--color-muted)", margin: 0 }}>
            Note: comment scraping from a link depends on the backend/model integration and platform API access.
          </p>
        </div>
      )}
      <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 20, width: "100%" }}>
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>
    </form>
  );
}
function TabButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
        background: active ? "var(--color-surface)" : "transparent",
        color: active ? "var(--color-primary)" : "var(--color-muted)",
        boxShadow: active ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
      }}
    >
      {label}
    </button>
  );
}