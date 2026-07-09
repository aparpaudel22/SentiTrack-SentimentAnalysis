import { SENTIMENTS } from "../lib/constants";
export default function SentimentBadge({ sentiment }) {
  const config = SENTIMENTS[sentiment] || SENTIMENTS.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        color: config.color,
        background: config.bg,
      }}
    >
      {config.label}
    </span>
  );
}