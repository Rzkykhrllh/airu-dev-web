"use client";

import { useState, useEffect } from "react";

import Header from "@/components/Header";
import FloatingSidebar from "@/components/FloatingSidebar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
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

  // Set theme to joints in localStorage on mount
  useEffect(() => {
    localStorage.setItem("theme", "joints");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollY = window.scrollY;
      const viewportMiddle = scrollY + window.innerHeight / 2;

      // At top of page
      if (scrollY < 300) {
        setActiveSection("");
        return;
      }

      // Near bottom
      if (scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
        setActiveSection("contact");
        return;
      }

      // Find which section is currently in view (closest to viewport middle)
      const sections = ["about", "skills", "timeline", "projects", "contact"];
      let closestSection = "";
      let closestDistance = Infinity;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const sectionTop = el.offsetTop;
          const distance = Math.abs(sectionTop - viewportMiddle);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
          }
        }
      }

      setActiveSection(closestSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen grid-pattern" data-theme="joints">
      {/* ThemeSwitcher hidden temporarily - using "joints" theme as default */}
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
      <Footer />
    </div>
  );
}
