"use client";

import { useState } from "react";
import { navSections } from "@/data/constants";

interface FloatingSidebarProps {
  scrolled: boolean;
  activeSection: string;
}

export default function FloatingSidebar({ scrolled, activeSection }: FloatingSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block transition-all duration-500 ease-out ${
        scrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white border-2 border-[#e2e8f0] rounded-lg shadow-lg transition-all duration-300 ease-out overflow-hidden ${
          collapsed ? "w-12 p-2" : "w-44 p-3"
        }`}
      >
        {/* Header with collapse button */}
        <div className={`flex items-center justify-between mb-2 ${collapsed ? "flex-col gap-2" : ""}`}>
          {!collapsed && (
            <div className="text-xs font-bold mono-label text-[#64748b] px-1">Navigate</div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] transition-colors"
            title={collapsed ? "Expand" : "Collapse"}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="relative flex flex-col gap-0.5">
          {/* Vertical line connecting dots */}
          {!collapsed && <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-[#e2e8f0]" />}

          {navSections.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group relative flex items-center gap-2.5 py-2 rounded transition-all duration-200 ${
                collapsed ? "px-1.5 justify-center" : "px-2"
              } ${
                activeSection === item.id
                  ? "text-[#0f172a]"
                  : "text-[#94a3b8] hover:text-[#64748b]"
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              title={collapsed ? item.label : undefined}
            >
              {/* Dot */}
              <div
                className={`relative z-10 shrink-0 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary border-primary scale-125"
                    : "bg-white border-[#cbd5e1] group-hover:border-[#94a3b8]"
                }`}
              />
              {!collapsed && (
                <>
                  <span className={`text-sm ${activeSection === item.id ? "" : "opacity-70"}`}>
                    {item.icon}
                  </span>
                  <span
                    className={`text-xs font-bold mono-label whitespace-nowrap ${
                      activeSection === item.id ? "font-black" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
