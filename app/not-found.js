import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container-page" style={{ textAlign: "center", paddingTop: 100, paddingBottom: 100 }}>
      <h1 style={{ fontSize: 64, fontWeight: 800, margin: 0, color: "var(--color-primary)" }}>404</h1>
      <p style={{ fontSize: 16, color: "var(--color-muted)", margin: "12px 0 28px" }}>
        This page doesn&apos;t exist.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}