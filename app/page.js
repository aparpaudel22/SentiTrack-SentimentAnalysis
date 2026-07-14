"use client";

import Link from "next/link";
import { BarChart3, MessageCircleHeart, Sparkles, ShieldCheck, Zap, TrendingUp, FileDown } from "lucide-react";
import { FaFacebook, FaTiktok, FaYoutube, FaInstagram,  FaXTwitter } from "react-icons/fa6";
import { useAuth } from "../lib/auth-context";

const PLATFORMS = [
  { id: "facebook",  label: "Facebook",    Icon: FaFacebook,  color: "#1877F2" },
  { id: "instagram", label: "Instagram",   Icon: FaInstagram, color: "#E4405F" },
  { id: "tiktok",    label: "TikTok",      Icon: FaTiktok,    color: "#010101" },
  { id: "youtube",   label: "YouTube",     Icon: FaYoutube,   color: "#FF0000" },
  { id: "twitter",   label: "X (Twitter)", Icon: FaXTwitter,  color: "#000000" },
];

const FEATURES = [
  {
    icon: MessageCircleHeart,
    title: "Comments or Links",
    description: "Paste raw comments directly, or drop a link from any supported platform.",
  },
  {
    icon: BarChart3,
    title: "Clear Sentiment Breakdown",
    description: "See positive, negative, and neutral shares at a glance, per comment and overall.",
  },
  {
    icon: Sparkles,
    title: "Actionable Suggestions",
    description: "Get a short overview and concrete suggestions based on what customers are saying.",
  },
  {
    icon: TrendingUp,
    title: "Trend Dashboard",
    description: "Track how sentiment shifts over time across all your saved reports in one place.",
  },
  {
    icon: FileDown,
    title: "PDF & CSV Export",
    description: "Export any report as a polished PDF or raw CSV to share or include in documentation.",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    description: "Your reports are tied to your account and protected behind login — nobody else can see your data.",
  },
];

const STEPS = [
  { number: "01", title: "Paste or link", description: "Drop in raw comments or a link to a social media post." },
  { number: "02", title: "Analyze", description: "Our model classifies each comment as Positive, Negative, or Neutral." },
  { number: "03", title: "Act on it", description: "Review charts, suggestions, and export your report as PDF or CSV." },
];

export default function HomePage() {
  const { user } = useAuth();
  const primaryHref = user ? "/analyze" : "/signup";

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

        <p style={{ fontSize: 17, color: "var(--color-muted)", margin: "0 0 34px", lineHeight: 1.7 }}>
          Paste comments or drop a social media link, and get an instant breakdown of positive, negative, and
          neutral sentiment — plus practical suggestions to improve your product, place, or service.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Link href={primaryHref} className="btn-primary" style={{ padding: "13px 28px", fontSize: 15 }}>
            {user ? "Go to Analyze" : "Start Analyzing Free"}
          </Link>
          <Link href={user ? "/history" : "/login"} className="btn-secondary" style={{ padding: "13px 28px", fontSize: 15 }}>
            {user ? "View Past Reports" : "Log In"}
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
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="card" style={{ padding: 26 }}>
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
                <Icon size={22} color="var(--color-primary)" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>{feature.title}</h3>
              <p style={{ fontSize: 14, color: "var(--color-muted)", margin: 0, lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* How it works */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: "center", marginBottom: 32 }}>How it works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {STEPS.map((step) => (
            <div key={step.number} className="card" style={{ padding: 28 }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "var(--color-primary)",
                  opacity: 0.45,
                  display: "block",
                  marginBottom: 10,
                }}
              >
                {step.number}
              </span>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: "var(--color-muted)", margin: 0, lineHeight: 1.6 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported platforms */}
      <section style={{ textAlign: "center", marginBottom: 72 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 28 }}>Supported Platforms</h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 28 }}>
          {PLATFORMS.map(({ id, label, Icon, color }) => (
            <div key={id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
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
                <Icon size={26} color={color} />
              </div>
              <span style={{ fontSize: 13, color: "var(--color-muted)" }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section>
        <div
          className="card hero-glow"
          style={{ maxWidth: 720, margin: "0 auto", padding: "56px 40px", textAlign: "center" }}
        >
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>
            Ready to understand your audience better?
          </h2>
          <p style={{ color: "var(--color-muted)", fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>
            Create a free account and run your first sentiment report in under a minute.
          </p>
          <Link href={primaryHref} className="btn-primary" style={{ padding: "13px 28px", fontSize: 15 }}>
            {user ? "Go to Analyze" : "Get Started Free"}
          </Link>
        </div>
      </section>
    </div>
  );
}