export default function StatsOverview({ users, activity }) {
  const stats = [
    { label: "Total Users", value: users.length },
    { label: "Total Analyses", value: activity.length },
    { label: "Comments Analyzed", value: activity.reduce((sum, a) => sum + (a.commentsCount || 0), 0) },
    { label: "Errors", value: activity.filter((a) => !a.success).length },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
      {stats.map((s) => (
        <div key={s.label} className="card" style={{ padding: 20 }}>
          <p style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 6 }}>{s.label}</p>
          <p style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}