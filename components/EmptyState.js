export default function EmptyState({ title, description }) {
  return (
    <div className="card" style={{ padding: 40, textAlign: "center" }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 14, color: "var(--color-muted)", margin: 0 }}>{description}</p>
    </div>
  );
}