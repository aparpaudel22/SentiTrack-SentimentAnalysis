export default function Logo({ size = 30 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id="sentitrackGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#818cf8" />
            <stop offset="1" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#sentitrackGradient)" />
        <path
          d="M11 24c0-6 4.5-10.5 10-10.5S31 18 31 24c0 1.6-1.3 2.9-2.9 2.9h-1.4l-3 3.4a1 1 0 0 1-1.7-.7v-2.7H14c-1.7 0-3-1.3-3-2.9Z"
          fill="white"
        />
        <circle cx="16.7" cy="23.5" r="1.4" fill="#4f46e5" />
        <circle cx="21" cy="23.5" r="1.4" fill="#4f46e5" />
        <circle cx="25.3" cy="23.5" r="1.4" fill="#4f46e5" />
      </svg>
      <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-0.02em" }}>
        Senti<span style={{ color: "var(--color-primary)" }}>Track</span>
      </span>
    </div>
  );
}