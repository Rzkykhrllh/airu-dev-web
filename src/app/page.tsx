"use client";

import { useState, useEffect } from "react";

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
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Set theme to joints in localStorage on mount
  useEffect(() => {
    localStorage.setItem("theme", "joints");
  }, []);

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
      data-theme="joints"
    >
      {/* ThemeSwitcher hidden temporarily - using "joints" theme as default */}
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
