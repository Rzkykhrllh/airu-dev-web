"use client";

import { useState } from "react";

interface HeaderProps {
  scrolled: boolean;
}

export default function Header({ scrolled }: HeaderProps) {
  const [othersOpen, setOthersOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="font-black text-xl transform -rotate-2 hover:rotate-0 transition-transform text-[#0f172a]"
        >
          AIRU<span className="text-primary">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-3">
          {/* Home */}
          <a
            href="#"
            className="nav-item text-sm font-bold mono-label px-4 py-2 transition-all transform hover:-rotate-2 text-[#64748b] hover:text-primary"
          >
            Home
          </a>

          {/* Blog */}
          <a
            href="/blog"
            className="nav-item text-sm font-bold mono-label px-4 py-2 transition-all transform hover:rotate-2 text-[#64748b] hover:text-primary"
          >
            Blog
          </a>

          {/* Others Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOthersOpen(true)}
            onMouseLeave={() => setOthersOpen(false)}
          >
            <button className="text-sm font-bold mono-label px-4 py-2 transition-all transform hover:-rotate-2 text-[#64748b] flex flex-row items-center gap-1.5">
              Others
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${othersOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full right-0 mt-2 bg-white border-2 border-[#e2e8f0] shadow-lg rounded-lg overflow-hidden transition-all duration-200 ${
                othersOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              <a
                href="https://byairu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 text-sm font-bold mono-label text-[#64748b] hover:bg-[#f8fafc] hover:text-primary transition-colors whitespace-nowrap"
              >
                <span>📷</span>
                Photography
                <svg className="w-3 h-3 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="https://hub.airu.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 text-sm font-bold mono-label text-[#64748b] hover:bg-[#f8fafc] hover:text-secondary transition-colors whitespace-nowrap border-t border-[#e2e8f0]"
              >
                <span>🎮</span>
                Hub
                <svg className="w-3 h-3 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-[#e2e8f0]"></div>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="nav-item bg-primary text-white text-sm font-bold mono-label px-5 py-2 transition-all transform -rotate-1 hover:rotate-0 shadow-md hover:shadow-lg"
          >
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="md:hidden bg-primary text-white px-4 py-2 text-sm font-bold mono-label transform -rotate-2"
        >
          Say Hi
        </a>
      </div>
    </header>
  );
}
