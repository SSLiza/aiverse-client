"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  if (!mounted) {
    return (
      <button className="rounded-lg border px-4 py-2 invisible">
        🌙 Dark
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="rounded-lg border border-slate-300 bg-white/90 px-4 py-2 text-sm text-slate-900 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-100 dark:hover:bg-slate-800"
    >
      {currentTheme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}