"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

import Header from "@/components/Header";
import FloatingSidebar from "@/components/FloatingSidebar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import AchievementSystem, {
  unlockAchievement,
} from "@/components/AchievementSystem";
import {
  HeroSection,
  StatsBar,
  PixelDivider,
  GameTransition,
  AboutSection,
  SkillsSection,
  TimelineSection,
  ProjectsSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Fire "PLAYER 1 HAS ENTERED" on page load
  useEffect(() => {
    const t = setTimeout(() => unlockAchievement("player_entered"), 1200);
    return () => clearTimeout(t);
  }, []);

  // Fire "DEEP READER" after 60 seconds
  useEffect(() => {
    const t = setTimeout(() => unlockAchievement("deep_reader"), 60_000);
    return () => clearTimeout(t);
  }, []);

  // Use IntersectionObserver to reliably detect when sections enter the viewport.
  // Scroll-based math (scrollY + offset) breaks for sections near the bottom of
  // the page because maxScrollY can be less than section.offsetTop on some
  // viewport sizes — IntersectionObserver has none of these constraints.
  //
  // Dwell time: record timestamp when section enters, send section_dwell_time
  // event when it exits (only if user spent ≥ 2 seconds in the section).
  useEffect(() => {
    const sectionIds = ["about", "skills", "timeline", "projects", "contact"];
    const sectionStartTimes = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            unlockAchievement(id);
            sectionStartTimes.set(id, Date.now());
          } else {
            const startTime = sectionStartTimes.get(id);
            if (startTime) {
              const seconds = Math.round((Date.now() - startTime) / 1000);
              if (seconds >= 2) {
                trackEvent("section_dwell_time", {
                  section_name: id,
                  time_seconds: seconds,
                });
              }
              sectionStartTimes.delete(id);
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Observe the footer element for "YOU REACHED THE END"
    const footerEl = document.querySelector("footer");
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          unlockAchievement("footer");
          sectionStartTimes.set("footer", Date.now());
        } else {
          const startTime = sectionStartTimes.get("footer");
          if (startTime) {
            const seconds = Math.round((Date.now() - startTime) / 1000);
            if (seconds >= 2) {
              trackEvent("section_dwell_time", {
                section_name: "footer",
                time_seconds: seconds,
              });
            }
            sectionStartTimes.delete("footer");
          }
        }
      },
      { threshold: 0.1 }
    );
    if (footerEl) footerObserver.observe(footerEl);

    return () => {
      observer.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  // Scroll handler — sticky header + active section for sidebar.
  //
  // Logic: a section stays active as long as its midpoint hasn't crossed the
  // top of the viewport (i.e. the top 50% of the section is still visible).
  // Once the midpoint passes, the NEXT section becomes active immediately.
  //
  // Iterate sections top-to-bottom. Find the first section whose midpoint
  // (rect.top + rect.height/2) is still >= 0:
  //   • If that section's top is already ≤ 0  → we're inside it, it's active.
  //   • If top > 0 and i > 0                  → previous gave up, this one is next → active.
  //   • If top > 0 and i === 0                → haven't reached first section yet.
  // If every midpoint has passed → last section stays active.
  useEffect(() => {
    const sectionIds = ["about", "skills", "timeline", "projects", "contact"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (window.scrollY < 300) {
        setActiveSection("");
        return;
      }

      // Special case: contact is short, so trigger it as soon as its bottom
      // becomes visible on screen (rect.bottom <= viewport height).
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.bottom <= window.innerHeight) {
          setActiveSection("contact");
          return;
        }
      }

      // Midpoint logic for all other sections:
      // switch active when a section's top 50% has scrolled past the viewport top.
      let activeId = "";

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const { top, height } = el.getBoundingClientRect();
        const midpoint = top + height / 2;

        if (midpoint >= 0) {
          if (top <= 0) {
            activeId = sectionIds[i]; // inside section, top half visible
          } else if (i > 0) {
            activeId = sectionIds[i]; // previous gave up, switch to this one
          }
          break;
        }

        if (i === sectionIds.length - 1) {
          activeId = sectionIds[i]; // past every midpoint → last section
        }
      }

      setActiveSection(activeId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen grid-pattern">
      {/* ThemeSwitcher now lives globally in layout.tsx as <ThemePanel /> */}
      <Header scrolled={scrolled} />
      <FloatingSidebar scrolled={scrolled} activeSection={activeSection} />

      <HeroSection />

      {/* Try both dividers - comment out one */}
      <PixelDivider />
      {/* <GameTransition /> */}

      <AboutSection />
      <SkillsSection />
      <TimelineSection />
      <ProjectsSection />
      <ContactSection />

      <FloatingCTA />
      <AchievementSystem />
      <Footer />
    </div>
  );
}
