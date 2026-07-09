"use client";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../lib/theme-context";
const options = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        padding: 3,
        borderRadius: 10,
        border: "1px solid var(--color-border)",
        background: "var(--color-bg-soft)",
      }}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const active = theme === option.value;
        return (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            title={option.label}
            aria-label={option.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 28,
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              background: active ? "var(--color-surface)" : "transparent",
              boxShadow: active ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
              color: active ? "var(--color-primary)" : "var(--color-muted)",
            }}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}