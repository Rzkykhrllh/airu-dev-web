"use client";

import { useState } from "react";
import { timelineData } from "@/data/constants";

export default function TimelineSection() {
  const [expandedItems, setExpandedItems] = useState<number[]>([0]);

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="timeline" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-bar mb-10">
          <span className="mr-2">03.</span> Journey
        </div>

        <div className="mb-8">
          <h3 className="text-3xl font-black mb-4 text-[#0f172a]">
            MY <span className="text-primary">TIMELINE</span>
          </h3>
          <p className="leading-relaxed text-[#64748b] max-w-xl">
            A quick look at my professional journey so far. Every step taught me something valuable.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1.75 top-4 bottom-4 w-0.75 bg-[#e2e8f0] hidden md:block"></div>

          <div className="space-y-4">
            {timelineData.map((item, index, arr) => {
              const colorClasses = ["bg-primary", "bg-secondary", "bg-accent"];
              const borderClasses = ["border-primary", "border-secondary", "border-accent"];
              const textClasses = ["text-primary", "text-secondary", "text-accent"];
              const colorClass = colorClasses[index % colorClasses.length];
              const borderClass = borderClasses[index % borderClasses.length];
              const textClass = textClasses[index % textClasses.length];
              const isExpanded = expandedItems.includes(index);
              const isLast = index === arr.length - 1;

              return (
                <div key={index} className="relative flex gap-6">
                  {/* Timeline Dot */}
                  <div className="hidden md:flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${colorClass} border-4 border-white shadow-md z-10 transition-transform duration-300 ${
                        isExpanded ? "scale-125" : ""
                      }`}
                    ></div>
                    {!isLast && (
                      <div
                        className={`w-0.75 flex-1 ${isExpanded ? colorClass : "bg-transparent"} transition-colors duration-300`}
                      ></div>
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 experience-card bg-white border-2 ${
                      isExpanded ? borderClass : "border-[#e2e8f0]"
                    } p-6 transition-all duration-300 hover:border-[#cbd5e1] cursor-pointer`}
                    onClick={() => toggleExpand(index)}
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h4 className="font-black text-xl text-[#0f172a]">{item.company}</h4>
                        <p className="font-medium text-[#64748b]">{item.title}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.label === "current" && (
                          <span
                            className={`${colorClass} text-white text-xs font-bold mono-label px-3 py-1 rounded-full`}
                          >
                            Current
                          </span>
                        )}
                        {item.type && (
                          <span className="bg-[#f1f5f9] text-[#64748b] text-xs font-bold mono-label px-3 py-1 rounded-full">
                            {item.type}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Period & Location */}
                    <div className="flex items-center gap-4 text-sm text-[#64748b] mb-4">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {item.period}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {item.location}
                        </span>
                      )}
                    </div>

                    {/* Key Achievements Header - Always visible */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div
                        className={`flex items-center justify-between py-2 mb-2 ${
                          isExpanded ? `border-b border-[#e2e8f0]` : ""
                        }`}
                      >
                        <span className={`mono-label text-xs font-bold ${textClass}`}>KEY ACHIEVEMENTS</span>
                        <svg
                          className={`w-4 h-4 text-[#94a3b8] transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}

                    {/* Expandable Content - Achievements */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? "max-h-125 opacity-100 mb-4" : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="space-y-2 pt-2">
                          {item.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="flex items-start gap-2 text-sm text-[#64748b]">
                              <span className={`${textClass} mt-0.5`}>◆</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Tech Stack - Always visible */}
                    {item.tech && item.tech.length > 0 && (
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3 border-t border-dashed border-[#e2e8f0]">
                        {item.tech.map((t) => (
                          <span key={t} className="inline-flex items-center gap-1.5 text-sm text-[#64748b]">
                            <span className="text-[#94a3b8]">{"</>"}</span>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
