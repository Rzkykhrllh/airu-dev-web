"use client";

import { useEffect, useState, useCallback } from "react";

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
}

export interface PresetEntry {
  label: string;
  colors: ThemeColors;
}

export const PRESETS: Record<string, PresetEntry> = {
  joints: {
    label: "Joints",
    colors: { primary: "#E9AA18", primaryDark: "#d49a10", secondary: "#6513BE", accent: "#191A26" },
  },
  default: {
    label: "Indigo",
    colors: { primary: "#6366f1", primaryDark: "#4f46e5", secondary: "#10b981", accent: "#f59e0b" },
  },
  coral: {
    label: "Coral",
    colors: { primary: "#f97316", primaryDark: "#ea580c", secondary: "#14b8a6", accent: "#fbbf24" },
  },
  violet: {
    label: "Violet",
    colors: { primary: "#8b5cf6", primaryDark: "#7c3aed", secondary: "#facc15", accent: "#ec4899" },
  },
  pink: {
    label: "Pink",
    colors: { primary: "#ec4899", primaryDark: "#db2777", secondary: "#06b6d4", accent: "#a855f7" },
  },
  teal: {
    label: "Teal",
    colors: { primary: "#14b8a6", primaryDark: "#0d9488", secondary: "#f97316", accent: "#8b5cf6" },
  },
  blue: {
    label: "Blue",
    colors: { primary: "#2D4CFF", primaryDark: "#2563eb", secondary: "#FFB703", accent: "#111827" },
  },
};

const STORAGE_PRESET_KEY = "airu_theme_preset";
const STORAGE_CUSTOM_KEY = "airu_custom_colors";
const STORAGE_DARK_KEY = "airu_dark_mode";
const DEFAULT_PRESET = "joints";

export function applyColors(colors: ThemeColors) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.style.setProperty("--primary", colors.primary);
  el.style.setProperty("--primary-dark", colors.primaryDark);
  el.style.setProperty("--secondary", colors.secondary);
  el.style.setProperty("--accent", colors.accent);
}

export function applyDark(dark: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", dark);
}

export function useTheme() {
  const [activePreset, setActivePreset] = useState<string>(DEFAULT_PRESET);
  const [customColors, setCustomColorsState] = useState<ThemeColors>(
    PRESETS[DEFAULT_PRESET].colors
  );
  const [isCustom, setIsCustom] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      // Restore dark mode
      const dark = localStorage.getItem(STORAGE_DARK_KEY) === "true";
      setIsDark(dark);
      applyDark(dark);

      // Restore color theme
      const preset = localStorage.getItem(STORAGE_PRESET_KEY) ?? DEFAULT_PRESET;
      const storedCustom = localStorage.getItem(STORAGE_CUSTOM_KEY);

      if (preset === "custom" && storedCustom) {
        const colors = JSON.parse(storedCustom) as ThemeColors;
        setIsCustom(true);
        setCustomColorsState(colors);
        applyColors(colors);
      } else {
        const p = PRESETS[preset] ? preset : DEFAULT_PRESET;
        setActivePreset(p);
        setIsCustom(false);
        setCustomColorsState(PRESETS[p].colors);
        applyColors(PRESETS[p].colors);
      }
    } catch {
      applyColors(PRESETS[DEFAULT_PRESET].colors);
    }
  }, []);

  const setPreset = useCallback((name: string) => {
    if (!PRESETS[name]) return;
    setActivePreset(name);
    setIsCustom(false);
    setCustomColorsState(PRESETS[name].colors);
    applyColors(PRESETS[name].colors);
    try {
      localStorage.setItem(STORAGE_PRESET_KEY, name);
    } catch {}
  }, []);

  const setCustomColors = useCallback((colors: ThemeColors) => {
    setIsCustom(true);
    setCustomColorsState(colors);
    applyColors(colors);
    try {
      localStorage.setItem(STORAGE_PRESET_KEY, "custom");
      localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(colors));
    } catch {}
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      applyDark(next);
      try {
        localStorage.setItem(STORAGE_DARK_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  return { activePreset, customColors, isCustom, isDark, setPreset, setCustomColors, toggleDark, mounted };
}
