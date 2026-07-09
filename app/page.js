import Link from "next/link";
import { PLATFORMS } from "../lib/constants";
import { BarChart3, MessageCircleHeart, Sparkles } from "lucide-react";
export default function HomePage() {
  return (
    <div className="container-page" style={{ paddingTop: 72, paddingBottom: 72, position: "relative" }}>
      <div className="hero-glow" />
      {/* Hero */}
      <section className="fade-in-up" style={{ textAlign: "center", maxWidth: 740, margin: "0 auto 72px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--color-primary-soft)",
            color: "var(--color-primary)",
            padding: "7px 16px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 22,
          }}
        >
          <Sparkles size={14} />
          AI-Powered Sentiment Analysis
        </div>
        <h1 style={{ fontSize: 46, lineHeight: 1.12, fontWeight: 800, margin: "0 0 18px", letterSpacing: "-0.02em" }}>
          Know exactly how customers feel
          <br />
          about your <span style={{ color: "var(--color-primary)" }}>business</span>
        </h1>
        <p style={{ fontSize: 17, color: "var(--color-muted)", margin: "0 0 34px" }}>
          Paste comments or drop a social media link, and get an instant breakdown of
          positive, negative, and neutral sentiment plus practical suggestions to improve
          your product, place, or service.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <Link href="/analyze" className="btn-primary">
            Start Analyzing
          </Link>
          <Link href="/history" className="btn-secondary">
            View Past Reports
          </Link>
        </div>
      </section>
      {/* Feature cards */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 72,
        }}
      >
        <FeatureCard
          icon={<MessageCircleHeart size={22} color="var(--color-primary)" />}
          title="Comments or Links"
          description="Paste raw comments directly, or drop a link from any supported platform."
        />
        <FeatureCard
          icon={<BarChart3 size={22} color="var(--color-primary)" />}
          title="Clear Sentiment Breakdown"
          description="See positive, negative, and neutral shares at a glance, per comment and overall."
        />
        <FeatureCard
          icon={<Sparkles size={22} color="var(--color-primary)" />}
          title="Actionable Suggestions"
          description="Get a short overview and concrete suggestions based on what customers are saying."
        />
      </section>
      {/* Supported platforms */}
      <section style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 28 }}>Supported Platforms</h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 28 }}>
          {PLATFORMS.map((platform) => (
            <div key={platform.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div
                className="card"
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={platform.image} alt={platform.label} width={26} height={26} style={{ objectFit: "contain" }} />
              </div>
              <span style={{ fontSize: 13, color: "var(--color-muted)" }}>{platform.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
function FeatureCard({ icon, title, description }) {
  return (
    <div className="card" style={{ padding: 26 }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "var(--color-primary-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "var(--color-muted)", margin: 0 }}>{description}</p>
    </div>
  );
}