import Link from "next/link";
import Logo from "./Logo";
export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-surface)", marginTop: 60 }}>
      <div
        className="container-page"
        style={{
          padding: "48px 0 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 32,
        }}
      >
        <div>
          <Logo />
          <p style={{ fontSize: 13, color: "var(--color-muted)", marginTop: 12, lineHeight: 1.6, maxWidth: 280 }}>
            SentiTrack helps businesses understand what customers really think by analyzing comments from Facebook,
            TikTok, YouTube, Instagram and X in seconds.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>About Us</h4>
          <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6, maxWidth: 280 }}>
            SentiTrack was built to focus on making social media
            sentiment analysis accessible for small businesses and tourism operators in Nepal. Our goal is to turn
            scattered comments into clear, actionable insight, no data science background required.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Contact Us</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "var(--color-muted)" }}>
            <span>Email: sentitrack.support@gmail.com</span>
            <span>Phone: +977 981-2345678</span>
            <span>Kathmandu, Nepal</span>
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Quick Links</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
            <Link href="/login" style={{ color: "var(--color-muted)" }}>
              Login
            </Link>
            <Link href="/signup" style={{ color: "var(--color-muted)" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "16px 0",
          textAlign: "center",
          fontSize: 12,
          color: "var(--color-muted)",
        }}
      >
        © {new Date().getFullYear()} SentiTrack. All rights reserved.
      </div>
    </footer>
  );
}