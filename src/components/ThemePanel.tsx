"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FaPalette, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useTheme, PRESETS, ThemeColors } from "@/hooks/useTheme";
import { unlockAchievement } from "@/components/AchievementSystem";

// ─── Color utilities ──────────────────────────────────────────────────────────

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const hN = h / 360;
  const sN = s / 100;
  const lN = l / 100;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = lN;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = lN < 0.5 ? lN * (1 + sN) : lN + sN - lN * sN;
    const p = 2 * lN - q;
    r = hue2rgb(p, q, hN + 1 / 3);
    g = hue2rgb(p, q, hN);
    b = hue2rgb(p, q, hN - 1 / 3);
  }
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

// ─── ColorRow ────────────────────────────────────────────────────────────────

interface ColorRowProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

function ColorRow({ label, value, onChange }: ColorRowProps) {
  const [hexInput, setHexInput] = useState(value);
  const hslRef = useRef<[number, number, number]>(hexToHsl(value));
  const [hue, setHue] = useState(hslRef.current[0]);

  // Sync when value changes externally (preset switch)
  useEffect(() => {
    if (isValidHex(value)) {
      setHexInput(value);
      const hsl = hexToHsl(value);
      hslRef.current = hsl;
      setHue(hsl[0]);
    }
  }, [value]);

  const applyHex = useCallback(
    (raw: string) => {
      setHexInput(raw);
      if (isValidHex(raw)) {
        const hsl = hexToHsl(raw);
        hslRef.current = hsl;
        setHue(hsl[0]);
        onChange(raw);
      }
    },
    [onChange]
  );

  const handleHueSlider = useCallback(
    (h: number) => {
      setHue(h);
      const [, s, l] = hslRef.current;
      hslRef.current = [h, s, l];
      const newHex = hslToHex(h, s, l);
      setHexInput(newHex);
      onChange(newHex);
    },
    [onChange]
  );

  const displayColor = isValidHex(hexInput) ? hexInput : value;

  return (
    <div className="space-y-2">
      <div className="text-[10px] font-black mono-label text-muted tracking-widest">{label}</div>
      <div className="flex items-center gap-2">
        {/* Color swatch — clicks native color picker */}
        <div
          className="relative w-8 h-8 border-2 border-ink flex-shrink-0 cursor-pointer retro-shadow"
          style={{ background: displayColor }}
        >
          <input
            type="color"
            value={displayColor}
            onChange={(e) => applyHex(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            title="Pick color"
          />
        </div>
        {/* Hex input */}
        <input
          type="text"
          value={hexInput}
          onChange={(e) => applyHex(e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`)}
          maxLength={7}
          spellCheck={false}
          className="flex-1 border-2 border-ink px-2 py-1 text-xs font-mono bg-paper text-ink uppercase outline-none focus:border-primary transition-colors"
          placeholder="#000000"
        />
      </div>
      {/* Hue slider */}
      <input
        type="range"
        min={0}
        max={360}
        value={hue}
        onChange={(e) => handleHueSlider(Number(e.target.value))}
        className="hue-slider w-full"
        style={{
          background: `linear-gradient(to right,
            hsl(0,100%,50%), hsl(30,100%,50%), hsl(60,100%,50%),
            hsl(90,100%,50%), hsl(120,100%,50%), hsl(150,100%,50%),
            hsl(180,100%,50%), hsl(210,100%,50%), hsl(240,100%,50%),
            hsl(270,100%,50%), hsl(300,100%,50%), hsl(330,100%,50%),
            hsl(360,100%,50%))`,
        }}
      />
    </div>
  );
}

// ─── ThemePanel ───────────────────────────────────────────────────────────────

export default function ThemePanel() {
  const [open, setOpen] = useState(false);
  const { activePreset, customColors, isCustom, isDark, setPreset, setCustomColors, toggleDark, mounted } =
    useTheme();

  // Track if color_master achievement has been fired this session
  const achievementFired = useRef(false);

  const handleColorChange = useCallback(
    (key: keyof ThemeColors, hex: string) => {
      const updated = { ...customColors, [key]: hex };
      setCustomColors(updated);
      if (!achievementFired.current) {
        achievementFired.current = true;
        unlockAchievement("color_master");
      }
    },
    [customColors, setCustomColors]
  );

  const handleReset = useCallback(() => {
    setPreset(activePreset || "joints");
  }, [activePreset, setPreset]);

  // Don't render until client-side mounted (avoids SSR mismatch)
  if (!mounted) return null;

  return (
    <>
      {/* Floating button — sits above the HIRE ME button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open theme panel"
        className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-[60] border-4 border-ink bg-paper text-ink px-3 py-2 flex items-center justify-center hover:bg-ink hover:text-paper transition-all retro-shadow"
      >
        <FaPalette className="w-4 h-4" />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-36 right-4 md:bottom-40 md:right-6 z-[70] w-72 bg-paper border-4 border-ink retro-shadow-strong flex flex-col max-h-[75vh]">
          {/* Title bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-ink text-paper border-b-4 border-ink flex-shrink-0">
            <div className="flex items-center gap-2">
              <FaPalette className="w-3 h-3 text-primary" />
              <span className="text-xs font-black mono-label tracking-widest">THEME.EXE</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:text-primary transition-colors"
              aria-label="Close theme panel"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto p-4 space-y-5">

            {/* ── Dark mode toggle ── */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isDark ? <FaMoon className="w-3 h-3 text-primary" /> : <FaSun className="w-3 h-3 text-primary" />}
                <span className="text-[10px] font-black mono-label text-ink tracking-widest">
                  {isDark ? "DARK MODE" : "LIGHT MODE"}
                </span>
              </div>
              <button
                onClick={toggleDark}
                className={`relative w-10 h-5 border-2 border-ink transition-colors ${isDark ? "bg-ink" : "bg-paper-muted"}`}
                aria-label="Toggle dark mode"
              >
                <span
                  className={`absolute top-0.5 w-3 h-3 border-2 border-ink transition-all ${
                    isDark ? "bg-primary left-5" : "bg-paper-soft left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-ink" />
            <div>
              <div className="text-[10px] font-black mono-label text-ink tracking-widest mb-3">
                PRESETS
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(PRESETS).map(([key, { label, colors }]) => {
                  const active = !isCustom && activePreset === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setPreset(key)}
                      title={label}
                      className={`border-2 p-1.5 flex flex-col gap-0.5 transition-all group ${
                        active
                          ? "border-ink retro-shadow"
                          : "border-border hover:border-ink"
                      }`}
                    >
                      <div className="w-full h-2 rounded-none" style={{ background: colors.primary }} />
                      <div className="w-full h-2 rounded-none" style={{ background: colors.secondary }} />
                      <div className="w-full h-2 rounded-none" style={{ background: colors.accent }} />
                      <div className="text-[8px] font-black mono-label text-muted mt-0.5 truncate group-hover:text-ink transition-colors">
                        {label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-ink" />

            {/* ── Custom ── */}
            <div>
              <div className="text-[10px] font-black mono-label text-ink tracking-widest mb-4">
                CUSTOM
              </div>
              <div className="space-y-5">
                <ColorRow
                  label="PRIMARY"
                  value={customColors.primary}
                  onChange={(hex) => handleColorChange("primary", hex)}
                />
                <ColorRow
                  label="PRIMARY DARK"
                  value={customColors.primaryDark}
                  onChange={(hex) => handleColorChange("primaryDark", hex)}
                />
                <ColorRow
                  label="SECONDARY"
                  value={customColors.secondary}
                  onChange={(hex) => handleColorChange("secondary", hex)}
                />
                <ColorRow
                  label="ACCENT"
                  value={customColors.accent}
                  onChange={(hex) => handleColorChange("accent", hex)}
                />
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="w-full border-2 border-ink py-2 text-[10px] font-black mono-label text-ink tracking-widest hover:bg-ink hover:text-paper transition-all"
            >
              RESET TO PRESET
            </button>
          </div>
        </div>
      )}
    </>
  );
}
