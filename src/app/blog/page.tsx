"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft, FiClock } from "react-icons/fi";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

export default function BlogPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen grid-pattern flex flex-col">
      <Header scrolled={scrolled} />
      <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary">
            <FiClock size={40} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted mb-8 leading-relaxed">
          The blog section is under construction. 
          <br />
          Stay tuned for tech articles, tutorials, and more!
        </p>

        {/* Decorative Element */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-1 w-12 bg-primary rounded-full"></div>
          <div className="h-1 w-4 bg-secondary rounded-full"></div>
          <div className="h-1 w-4 bg-accent rounded-full"></div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold mono-label transition-all hover:opacity-90 -rotate-1 hover:rotate-0"
        >
          <FiArrowLeft size={18} />
          Back to Home
        </button>
      </div>
    </div>
    </div>
  );
}
