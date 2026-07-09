import { Lightbulb } from "lucide-react";
export default function SuggestionsPanel({ suggestions }) {
  return (
    <div className="card" style={{ padding: 28 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <Lightbulb size={18} color="var(--color-primary)" />
        Suggestions
      </h3>
      <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
        {suggestions.map((suggestion, index) => (
          <li key={index} style={{ fontSize: 14, color: "var(--color-text)" }}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}