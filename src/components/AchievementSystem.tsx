"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FaTrophy, FaLock, FaCheck } from "react-icons/fa";
import { trackEvent } from "@/lib/analytics";
import { RetroWindowTitleBar, RetroProgressBar } from "@/components/ui";

// ─── Achievement definitions ──────────────────────────────────────────────────

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  /** If set, shown as the locked description instead of the default hint text.
   *  Also causes the title to be visible even when locked. */
  hint?: string;
}

// Ordered list — controls display order in the panel
const ACHIEVEMENT_LIST: Achievement[] = [
  {
    id: "player_entered",
    title: "PLAYER 1 HAS ENTERED",
    desc: "Welcome to PORTFOLIO.EXE",
  },
  {
    id: "about",
    title: "WHO IS THIS GUY?",
    desc: "Investigated the About section",
  },
  {
    id: "skills",
    title: "SKILL CHECK",
    desc: "Reviewed the skill tree",
  },
  {
    id: "timeline",
    title: "VETERAN SPOTTED",
    desc: "Checked the journey log",
  },
  {
    id: "projects",
    title: "PROJECT UNLOCKED",
    desc: "Explored the project vault",
  },
  {
    id: "contact",
    title: "READY TO CONNECT",
    desc: "Reached the contact terminal",
  },
  {
    id: "cv",
    title: "SPY MODE ACTIVATED",
    desc: "Accessed the classified CV",
  },
  {
    id: "footer",
    title: "YOU REACHED THE END",
    desc: "Completed the full run",
  },
  {
    id: "deep_reader",
    title: "DEEP READER",
    desc: "Spent 60 seconds on this page",
  },
  {
    id: "secret_combo",
    title: "SECRET COMBO",
    desc: "You clicked AIRU 9 times. True gamer instincts.",
  },
  {
    id: "photography",
    title: "PHOTOGRAPHER MODE",
    desc: "Visited the photography portfolio. Nice eye.",
  },
  {
    id: "pay_to_win",
    title: "PAY TO WIN",
    desc: "Unlocked all achievements at once. Absolute legend.",
    hint: "Wanna unlock all achievements at once? Please Hire Me :)",
  },
];

// Fast lookup by id
const ACHIEVEMENTS: Record<string, Achievement> = Object.fromEntries(
  ACHIEVEMENT_LIST.map((a) => [a.id, a])
);

const TOTAL = ACHIEVEMENT_LIST.length;

// ─── Public helper to fire achievements from anywhere ─────────────────────────

export function unlockAchievement(id: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("achievement:unlock", { detail: { id } })
    );
  }
}

// ─── Toast component ──────────────────────────────────────────────────────────

interface ToastItem {
  achievement: Achievement;
  key: number;
  exiting: boolean;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AchievementSystem() {
  // Track unlocked IDs both as a ref (for dedup) and state (for UI)
  const unlockedRef = useRef<Set<string>>(new Set());
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

  // Toast queue
  const queueRef = useRef<Achievement[]>([]);
  const counterRef = useRef(0);
  const processingRef = useRef(false);
  const [current, setCurrent] = useState<ToastItem | null>(null);

  // Panel
  const [panelOpen, setPanelOpen] = useState(false);

  const unlockedCount = unlockedIds.size;

  // ── Queue processing ────────────────────────────────────────────────────────

  const processQueue = useCallback(() => {
    if (processingRef.current || queueRef.current.length === 0) return;

    processingRef.current = true;
    const achievement = queueRef.current.shift()!;
    const key = ++counterRef.current;

    setCurrent({ achievement, key, exiting: false });

    // Begin exit animation
    setTimeout(() => {
      setCurrent((prev) =>
        prev?.key === key ? { ...prev, exiting: true } : prev
      );
    }, 3200);

    // Remove toast, then process next
    setTimeout(() => {
      setCurrent(null);
      processingRef.current = false;
      processQueue();
    }, 3700);
  }, []);

  // ── Event listener ──────────────────────────────────────────────────────────

  useEffect(() => {
    // Restore session achievements
    try {
      const stored = localStorage.getItem("airu_achievements");
      if (stored) {
        const ids = new Set<string>(JSON.parse(stored));
        unlockedRef.current = ids;
        setUnlockedIds(new Set(ids));
      }
    } catch {}

    const handler = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: string }>).detail;
      if (unlockedRef.current.has(id) || !ACHIEVEMENTS[id]) return;

      // Mark as unlocked
      unlockedRef.current.add(id);
      setUnlockedIds(new Set(unlockedRef.current));

      // Send GA4 event
      trackEvent("achievement_unlocked", {
        achievement_id: id,
        achievement_title: ACHIEVEMENTS[id].title,
      });

      try {
        localStorage.setItem(
          "airu_achievements",
          JSON.stringify([...unlockedRef.current])
        );
      } catch {}

      queueRef.current.push(ACHIEVEMENTS[id]);
      processQueue();
    };

    window.addEventListener("achievement:unlock", handler);
    return () => window.removeEventListener("achievement:unlock", handler);
  }, [processQueue]);

  // ── Keyboard: close panel on Escape ────────────────────────────────────────

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── Floating trophy button (bottom-left) ───────────────────────────── */}
      <button
        onClick={() => setPanelOpen(true)}
        aria-label="Open achievement log"
        className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 border-4 border-[#0f172a] bg-[#0f172a] text-primary px-3 py-2 flex items-center gap-2 font-black mono-label text-xs hover:bg-primary hover:text-[#0f172a] transition-all"
        style={{ boxShadow: "4px 4px 0 rgba(15, 23, 42, 0.4)" }}
      >
        <FaTrophy className="w-3 h-3" />
        <span>
          {unlockedCount}/{TOTAL}
        </span>
      </button>

      {/* ── Achievement panel (modal) ──────────────────────────────────────── */}
      {panelOpen && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0f172a]/75"
            onClick={() => setPanelOpen(false)}
          />

          {/* Modal */}
          <div
            className="relative border-4 border-[#0f172a] bg-white w-full max-w-sm flex flex-col"
            style={{
              boxShadow: "8px 8px 0 rgba(15, 23, 42, 0.4)",
              maxHeight: "80vh",
            }}
          >
            {/* Title bar */}
            <RetroWindowTitleBar
              title="ACHIEVEMENT LOG"
              leadingIcon={<FaTrophy className="w-3 h-3 text-primary" />}
              onClose={() => setPanelOpen(false)}
            />

            {/* Progress bar */}
            <div className="border-b-4 border-[#0f172a] px-4 py-3 flex-shrink-0">
              <div className="flex justify-between items-center mb-2">
                <span
                  className="text-[10px] text-slate-500 tracking-widest"
                  style={{ fontFamily: "monospace" }}
                >
                  UNLOCKED
                </span>
                <span
                  className="text-xs font-black text-[#0f172a]"
                  style={{ fontFamily: "monospace" }}
                >
                  {unlockedCount} / {TOTAL}
                </span>
              </div>
              <RetroProgressBar value={(unlockedCount / TOTAL) * 100} />
            </div>

            {/* Achievement list */}
            <div className="overflow-y-auto flex-1">
              {ACHIEVEMENT_LIST.map((achievement, index) => {
                const isUnlocked = unlockedIds.has(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`flex items-start gap-3 px-4 py-3 border-b-2 transition-colors ${
                      index === ACHIEVEMENT_LIST.length - 1
                        ? "border-transparent"
                        : "border-[#0f172a]/10"
                    } ${isUnlocked ? "bg-white" : "bg-[#f8fafc]"}`}
                  >
                    {/* Icon badge */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 ${
                        isUnlocked
                          ? "bg-primary border-[#0f172a]"
                          : "bg-slate-200 border-slate-300"
                      }`}
                    >
                      {isUnlocked ? (
                        <FaTrophy className="w-3 h-3 text-[#0f172a]" />
                      ) : (
                        <FaLock className="w-3 h-3 text-slate-400" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-black text-[11px] tracking-wide leading-tight ${
                          isUnlocked ? "text-[#0f172a]" : "text-slate-400"
                        }`}
                        style={{ fontFamily: "monospace" }}
                      >
                        {isUnlocked || achievement.hint
                          ? achievement.title
                          : "????? ???????"}
                      </div>
                      <div
                        className={`text-[10px] mt-0.5 leading-tight ${
                          isUnlocked ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        {isUnlocked
                          ? achievement.desc
                          : (achievement.hint ?? "Keep exploring to unlock...")}
                      </div>
                    </div>

                    {/* Unlocked checkmark */}
                    {isUnlocked && (
                      <div className="flex-shrink-0 pt-0.5">
                        <FaCheck className="w-3 h-3 text-primary" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer hint */}
            <div className="border-t-4 border-[#0f172a] px-4 py-2 bg-[#f8fafc] flex-shrink-0">
              <p
                className="text-[9px] text-slate-400 text-center tracking-widest"
                style={{ fontFamily: "monospace" }}
              >
                {unlockedCount === TOTAL
                  ? "ALL ACHIEVEMENTS UNLOCKED — LEGEND STATUS"
                  : "EXPLORE THE SITE TO UNLOCK ALL ACHIEVEMENTS"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast notification ─────────────────────────────────────────────── */}
      {current && (
        <div
          key={current.key}
          className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-[9999] w-64 sm:w-72"
          style={{
            animation: current.exiting
              ? "achievementOut 0.5s ease-in forwards"
              : "achievementIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
          }}
        >
          <div
            className="border-4 border-primary bg-[#0f172a] p-3 flex items-start gap-3"
            style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.6)" }}
          >
            <div className="flex-shrink-0 w-9 h-9 bg-primary flex items-center justify-center border-2 border-[#0f172a]">
              <FaTrophy className="w-4 h-4 text-[#0f172a]" />
            </div>
            <div className="min-w-0 flex-1">
              <div
                className="text-[9px] text-primary tracking-widest font-bold mb-0.5"
                style={{ fontFamily: "monospace" }}
              >
                ACHIEVEMENT UNLOCKED
              </div>
              <div
                className="text-white font-black text-xs tracking-wide leading-tight"
                style={{ fontFamily: "monospace" }}
              >
                {current.achievement.title}
              </div>
              <div className="text-slate-400 text-[10px] mt-0.5 leading-tight">
                {current.achievement.desc}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes achievementIn {
          from {
            transform: translateX(calc(100% + 2rem));
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes achievementOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(calc(100% + 2rem));
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
