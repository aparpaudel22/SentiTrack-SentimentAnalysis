"use client";

import { useEffect } from "react";

export default function ThemeInit() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sentitrack-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = stored || (prefersDark ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {}
  }, []);

  return null;
}