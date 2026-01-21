"use client";

import { themes } from "@/data/constants";

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <div className="fixed top-24 right-6 z-50 p-3 shadow-lg border-2 border-[#e2e8f0] rounded-lg bg-white">
      <div className="text-xs font-bold mono-label mb-2 text-[#64748b]">Theme</div>
      <div className="flex flex-col gap-2">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => onThemeChange(t.id)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-bold mono-label transition-all rounded ${
              currentTheme === t.id ? "bg-[#0f172a] text-white" : "text-[#0f172a]"
            }`}
          >
            <span className="w-4 h-4 rounded-full" style={{ background: t.primary }}></span>
            <span className="w-4 h-4 rounded-full -ml-3" style={{ background: t.secondary }}></span>
            <span className="w-4 h-4 rounded-full -ml-3" style={{ background: t.accent }}></span>
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
