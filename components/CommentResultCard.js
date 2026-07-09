import SentimentBadge from "./SentimentBadge";
export default function CommentResultCard({ comment }) {
  return (
    <div className="card" style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
      <p style={{ margin: 0, fontSize: 14, flex: 1 }}>{comment.text}</p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        <SentimentBadge sentiment={comment.sentiment} />
        <span style={{ fontSize: 11, color: "var(--color-muted)" }}>
          {Math.round(comment.confidence * 100)}% confidence
        </span>
      </div>
    </div>
  );
}