"use client";

import { useEffect, useState } from "react";

type ThemePreference = "system" | "light" | "dark";

const themeOrder: ThemePreference[] = ["system", "light", "dark"];

function resolveTheme(preference: ThemePreference) {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(preference: ThemePreference) {
  document.documentElement.dataset.theme = resolveTheme(preference);
  document.documentElement.dataset.themePreference = preference;
}

export default function ThemeControl() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    const initial: ThemePreference =
      saved === "light" || saved === "dark" || saved === "system"
        ? saved
        : "system";
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (document.documentElement.dataset.themePreference === "system") {
        applyTheme("system");
      }
    };

    setPreference(initial);
    applyTheme(initial);
    media.addEventListener("change", handleSystemChange);
    return () => media.removeEventListener("change", handleSystemChange);
  }, []);

  const currentIndex = themeOrder.indexOf(preference);
  const nextPreference = themeOrder[(currentIndex + 1) % themeOrder.length];
  const currentLabel = preference[0].toUpperCase() + preference.slice(1);
  const nextLabel = nextPreference[0].toUpperCase() + nextPreference.slice(1);

  const cycleTheme = () => {
    setPreference(nextPreference);
    localStorage.setItem("portfolio-theme", nextPreference);
    applyTheme(nextPreference);
  };

  return (
    <button
      className="theme-cycle"
      type="button"
      data-preference={preference}
      aria-label={`Theme: ${currentLabel}. Switch to ${nextLabel}.`}
      title={`${currentLabel} theme`}
      onClick={cycleTheme}
    >
      <span className="theme-cycle-mark" aria-hidden="true" />
    </button>
  );
}
