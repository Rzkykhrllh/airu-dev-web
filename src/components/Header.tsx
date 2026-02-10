"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaCamera, FaGamepad } from "react-icons/fa";

interface HeaderProps {
  scrolled: boolean;
}

export default function Header({ scrolled }: HeaderProps) {
  const [othersOpen, setOthersOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isBlogPage = pathname === "/blog";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 border-b-4 border-ink bg-paper" : "py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-black text-xl transform -rotate-2 hover:rotate-0 transition-transform text-ink"
        >
          AIRU<span className="text-primary">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-3">
          {/* Home */}
          <Link
            href="/"
            className={`nav-item text-sm font-bold mono-label px-4 py-2 transition-all transform hover:-rotate-2 ${
              isHomePage ? "text-primary" : "text-muted hover:text-primary"
            }`}
          >
            Home
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            className={`nav-item text-sm font-bold mono-label px-4 py-2 transition-all transform hover:rotate-2 ${
              isBlogPage ? "text-primary" : "text-muted hover:text-primary"
            }`}
          >
            Blog
          </Link>

          {/* Others Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOthersOpen(true)}
            onMouseLeave={() => setOthersOpen(false)}
          >
            <button className="text-sm font-bold mono-label px-4 py-2 transition-all transform hover:-rotate-2 text-muted flex flex-row items-center gap-1.5">
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
              className={`absolute top-full right-0 mt-2 bg-paper border-4 border-ink retro-shadow overflow-hidden transition-all duration-200 ${
                othersOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              <a
                href="https://byairu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 text-sm font-bold mono-label text-muted hover:bg-paper-soft hover:text-primary transition-colors whitespace-nowrap"
              >
                <FaCamera className="w-4 h-4" />
                Photography
                <svg className="w-3 h-3 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="https://hub.airu.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 text-sm font-bold mono-label text-muted hover:bg-paper-soft hover:text-secondary transition-colors whitespace-nowrap border-t-2 border-ink"
              >
                <FaGamepad className="w-4 h-4" />
                Hub
                <svg className="w-3 h-3 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-border"></div>

          {/* Contact CTA */}
          <Link
            href="/#contact"
            className="border-4 border-ink bg-primary text-paper text-sm font-black mono-label px-5 py-2 hover:bg-paper hover:text-ink transition-all retro-shadow-strong"
          >
            CONTACT
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="md:hidden border-4 border-ink bg-primary text-paper px-4 py-2 text-sm font-black mono-label hover:bg-paper hover:text-ink transition-all retro-shadow-strong"
        >
          CONTACT
        </Link>
      </div>
    </header>
  );
}
