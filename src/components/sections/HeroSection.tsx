"use client";

import { useState, useEffect, useRef } from "react";
import { FaPlay, FaDownload, FaEnvelope } from "react-icons/fa";
import { unlockAchievement } from "@/components/AchievementSystem";
import { trackEvent } from "@/lib/analytics";
import { RetroWindowTitleBar, RetroButton } from "@/components/ui";

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "AIRU";
  const airuClickCount = useRef(0);

  const handleAiruClick = () => {
    airuClickCount.current += 1;
    if (airuClickCount.current === 9) {
      unlockAchievement("secret_combo");
    }
  };

  // Typing animation effect
  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [displayText]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16 relative overflow-hidden"
    >
      {/* Pixelated corner decorations */}
      <div className="absolute top-8 left-8 w-4 h-4 bg-primary" style={{ imageRendering: "pixelated" }} />
      <div className="absolute top-8 left-14 w-4 h-4 bg-primary" style={{ imageRendering: "pixelated" }} />
      <div className="absolute top-14 left-8 w-4 h-4 bg-primary" style={{ imageRendering: "pixelated" }} />
      <div className="absolute top-8 right-8 w-4 h-4 bg-secondary" style={{ imageRendering: "pixelated" }} />
      <div className="absolute top-8 right-14 w-4 h-4 bg-secondary" style={{ imageRendering: "pixelated" }} />
      <div className="absolute top-14 right-8 w-4 h-4 bg-secondary" style={{ imageRendering: "pixelated" }} />
      <div className="absolute bottom-8 left-8 w-4 h-4 bg-accent" style={{ imageRendering: "pixelated" }} />
      <div className="absolute bottom-8 left-14 w-4 h-4 bg-accent" style={{ imageRendering: "pixelated" }} />
      <div className="absolute bottom-14 left-8 w-4 h-4 bg-accent" style={{ imageRendering: "pixelated" }} />
      <div className="absolute bottom-8 right-8 w-4 h-4 bg-primary" style={{ imageRendering: "pixelated" }} />
      <div className="absolute bottom-8 right-14 w-4 h-4 bg-primary" style={{ imageRendering: "pixelated" }} />
      <div className="absolute bottom-14 right-8 w-4 h-4 bg-primary" style={{ imageRendering: "pixelated" }} />

      {/* Main content - Game screen style */}
      <div className="relative max-w-3xl w-full">
        {/* Retro game "window" */}
        <div
          className="border-4 sm:border-8 border-[#0f172a] bg-white shadow-2xl"
          style={{ boxShadow: "8px 8px 0 rgba(15, 23, 42, 0.3)", imageRendering: "pixelated" }}
        >
          <RetroWindowTitleBar title="PORTFOLIO.EXE" variant="window" />

          {/* Content area */}
          <div className="p-4 sm:p-8 md:p-12 space-y-4 sm:space-y-6">
            {/* Player name with typing effect */}
            <div>
              <span className="mono-label text-sm text-[#64748b] mb-2 block">
                {">"} PLAYER:
              </span>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight flex items-center"
                style={{ fontFamily: "monospace", letterSpacing: "0.1em", minHeight: "2.5rem", cursor: "default", userSelect: "none" }}
                onClick={handleAiruClick}
              >
                <span>{displayText}</span>
                {displayText.length === fullText.length && (
                  <span
                    className="inline-block w-2 h-10 sm:h-12 md:h-14 bg-ink ml-2"
                    style={{ animation: "blink 1s step-end infinite", opacity: showCursor ? 1 : 0 }}
                  />
                )}
              </h1>
            </div>

            {/* Character stats - RPG style */}
            <div className="border-4 border-[#0f172a] bg-[#f8fafc] p-3 sm:p-4">
              <div className="mono-label text-xs text-[#64748b] mb-2 sm:mb-3">CHARACTER STATS</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm text-[#64748b] whitespace-nowrap">CLASS</span>
                  <span className="font-black text-xs sm:text-sm text-[#0f172a] text-right">SOFTWARE ENGINEER</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm text-[#64748b] whitespace-nowrap">EXPERIENCE</span>
                  <span className="font-black text-xs sm:text-sm text-primary text-right">3+ YEARS</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm text-[#64748b] whitespace-nowrap">FUEL</span>
                  <span className="font-black text-xs sm:text-sm text-secondary text-right">1000+ COFFEES</span>
                </div>
              </div>
            </div>

            {/* Character summary */}
            <div className="border-4 border-[#0f172a] bg-white p-5">
              <span className="mono-label text-xs text-primary mb-2 block">CHARACTER SUMMARY</span>
              <p className="text-sm text-[#64748b] leading-relaxed">
                Software Engineer with 3 years of experience. Experienced in
                taking projects from research phase through design, development,
                and deployment, with strong backend focus.
              </p>
            </div>

            {/* Action buttons - game style */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <RetroButton href="#about" variant="primary" size="sm" shadowOpacity={0.5} className="group relative justify-center">
                <FaPlay className="w-3 h-3" />
                START
              </RetroButton>

              <RetroButton
                href="https://drive.google.com/drive/folders/19NOp4kRA3MVpH47GCEOIpFU9GO5jFj-T?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                shadowOpacity={0.5}
                className="group relative justify-center"
                onClick={() => {
                  unlockAchievement("cv");
                  trackEvent("cv_download");
                }}
              >
                <FaDownload className="w-3 h-3" />
                CV
              </RetroButton>

              <RetroButton href="#contact" variant="outline" size="sm" shadowOpacity={0.5} className="group relative justify-center">
                <FaEnvelope className="w-3 h-3" />
                CONTACT
              </RetroButton>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center mt-6">
          <span className="mono-label text-xs text-[#64748b]/60">© 2026 AIRU STUDIOS</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
