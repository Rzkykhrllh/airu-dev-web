"use client";

import { useState, useEffect } from "react";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import Header from "@/components/Header";
import FloatingSidebar from "@/components/FloatingSidebar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import {
  HeroSection,
  StatsBar,
  AboutSection,
  SkillsSection,
  TimelineSection,
  ProjectsSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  // Initialize theme from localStorage or default to "joints"
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "joints";
    }
    return "joints";
  });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["about", "skills", "timeline", "projects", "contact"];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
      // If at top of page
      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen grid-pattern"
      data-theme={currentTheme === "default" ? undefined : currentTheme}
    >
      {/* ThemeSwitcher hidden temporarily - using "joints" theme as default */}
      <div className="hidden">
        <ThemeSwitcher currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
      </div>
      <Header scrolled={scrolled} />
      <FloatingSidebar scrolled={scrolled} activeSection={activeSection} />

      <HeroSection />
      <StatsBar />
      <AboutSection />
      <SkillsSection />
      <TimelineSection />
      <ProjectsSection />
      <ContactSection />

      <FloatingCTA />
      <Footer />
    </div>
  );
}
