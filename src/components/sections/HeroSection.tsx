"use client";

import { useState, useEffect } from "react";
import { FaPlay, FaDownload, FaEnvelope } from "react-icons/fa";

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "AIRU";

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
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16 relative overflow-hidden">
      {/* Pixelated corner decorations */}
      <div className="absolute top-8 left-8 w-4 h-4 bg-primary pixelated" />
      <div className="absolute top-8 left-14 w-4 h-4 bg-primary pixelated" />
      <div className="absolute top-14 left-8 w-4 h-4 bg-primary pixelated" />

      <div className="absolute top-8 right-8 w-4 h-4 bg-secondary pixelated" />
      <div className="absolute top-8 right-14 w-4 h-4 bg-secondary pixelated" />
      <div className="absolute top-14 right-8 w-4 h-4 bg-secondary pixelated" />

      <div className="absolute bottom-8 left-8 w-4 h-4 bg-accent pixelated" />
      <div className="absolute bottom-8 left-14 w-4 h-4 bg-accent pixelated" />
      <div className="absolute bottom-14 left-8 w-4 h-4 bg-accent pixelated" />

      <div className="absolute bottom-8 right-8 w-4 h-4 bg-primary pixelated" />
      <div className="absolute bottom-8 right-14 w-4 h-4 bg-primary pixelated" />
      <div className="absolute bottom-14 right-8 w-4 h-4 bg-primary pixelated" />

      {/* Main content - Game screen style */}
      <div className="relative max-w-3xl w-full">
        {/* Retro game "window" */}
        <div className="border-8 border-ink bg-paper shadow-2xl retro-shadow pixelated">
          {/* Title bar */}
          <div className="bg-ink px-6 py-4 flex items-center justify-between border-b-4 border-ink">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-accent" />
              <div className="w-4 h-4 bg-primary" />
              <div className="w-4 h-4 bg-secondary" />
            </div>
            <span className="mono-label text-xs text-paper tracking-widest">
              PORTFOLIO.EXE
            </span>
            <div className="w-4 h-4 border-2 border-paper" />
          </div>

          {/* Content area */}
          <div className="p-8 md:p-12 space-y-6">
            {/* Player name with typing effect */}
            <div>
              <span className="mono-label text-sm text-muted mb-2 block">
                {">"} PLAYER:
              </span>
              <h1
                className="text-5xl md:text-6xl font-black text-ink tracking-tight flex items-center"
                style={{
                  fontFamily: "monospace",
                  letterSpacing: "0.1em",
                  minHeight: "3rem",
                }}
              >
                <span>{displayText}</span>
                {displayText.length === fullText.length && (
                  <span
                    className="inline-block w-3 h-12 md:h-14 bg-ink ml-2"
                    style={{
                      animation: "blink 1s step-end infinite",
                      opacity: showCursor ? 1 : 0,
                    }}
                  />
                )}
              </h1>
            </div>

            {/* Character stats - RPG style */}
            <div className="border-4 border-ink bg-paper-soft p-4">
              <div className="mono-label text-xs text-muted mb-3">
                CHARACTER STATS
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">CLASS</span>
                  <span className="font-black text-sm text-ink">
                    SOFTWARE ENGINEER
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">EXPERIENCE</span>
                  <span className="font-black text-sm text-primary">
                    3+ YEARS
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">FUEL</span>
                  <span className="font-black text-sm text-secondary">
                    1000+ COFFEES
                  </span>
                </div>
              </div>
            </div>

            {/* Character summary */}
            <div className="border-4 border-ink bg-paper p-5">
              <span className="mono-label text-xs text-primary mb-2 block">
                CHARACTER SUMMARY
              </span>
              <p className="text-sm text-muted leading-relaxed">
                Software Engineer with 3 years of experience. Experienced in
                taking projects from research phase through design, development,
                and deployment, with strong backend focus.
              </p>
            </div>

            {/* Action buttons - game style */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#about"
                className="group relative border-4 border-ink px-6 py-3 bg-primary text-paper font-black mono-label text-sm hover:bg-transparent hover:text-ink transition-all retro-shadow-strong"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaPlay className="w-3 h-3" />
                  START
                </span>
              </a>

              <a
                href="https://drive.google.com/drive/folders/19NOp4kRA3MVpH47GCEOIpFU9GO5jFj-T?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border-4 border-ink px-6 py-3 bg-secondary text-paper font-black mono-label text-sm hover:bg-transparent hover:text-ink transition-all retro-shadow-strong"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaDownload className="w-3 h-3" />
                  CV
                </span>
              </a>

              <a
                href="#contact"
                className="group relative border-4 border-ink px-6 py-3 bg-paper text-ink font-black mono-label text-sm hover:bg-ink hover:text-paper transition-all retro-shadow-strong"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaEnvelope className="w-3 h-3" />
                  CONTACT
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center mt-6">
          <span className="mono-label text-xs text-muted-light">
            © 2026 AIRU STUDIOS
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
