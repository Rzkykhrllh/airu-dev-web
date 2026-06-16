"use client";

import { useState } from "react";
import { projectsData } from "@/data/constants";
import { sendGAEvent } from "@next/third-parties/google";
import { SectionHeader, ExpandToggleRow, TechTag } from "@/components/ui";

export default function ProjectsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="04. PROJECTS" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => {
            const colorClasses = ["bg-primary", "bg-secondary", "bg-accent"];
            const bgClass = colorClasses[index % colorClasses.length];
            const description =
              ("description" in project && typeof project.description === "string"
                ? project.description
                : project.desc) || "";
            const normalizedDescription = description.replace(/\s*\n+\s*/g, " ").trim();
            const links = [
              { label: "Live Demo", url: project.demoUrl },
              { label: "Source", url: project.sourceUrl },
            ].filter((link) => !!link.url);
            const linkTextClasses = ["text-primary", "text-secondary"];
            const isExpanded = expandedIndex === index;
            const previewLength = 130;
            const isExpandable = normalizedDescription.length > previewLength;
            const previewText = normalizedDescription.length > previewLength
              ? `${normalizedDescription.slice(0, previewLength).trimEnd()}…`
              : normalizedDescription;
            const displayText = isExpandable && !isExpanded ? previewText : description;

            return (
              <div
                key={index}
                className={`project-card group p-6 ${isExpandable ? "cursor-pointer" : ""}`}
                role={isExpandable ? "button" : undefined}
                tabIndex={isExpandable ? 0 : undefined}
                aria-expanded={isExpandable ? isExpanded : undefined}
                onClick={isExpandable ? () => setExpandedIndex((prev) => (prev === index ? null : index)) : undefined}
                onKeyDown={
                  isExpandable
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setExpandedIndex((prev) => (prev === index ? null : index));
                        }
                      }
                    : undefined
                }
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="font-bold text-xl text-[#0f172a]">{project.title}</h3>
                  <span className={`badge-pill badge-pill-sm ${bgClass} text-white`}>{project.year}</span>
                </div>
                <p className="text-sm text-[#64748b] whitespace-pre-line">{displayText}</p>

                {isExpandable && (
                  <ExpandToggleRow isExpanded={isExpanded} label="Details" />
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tech.map((t) => (
                    <TechTag key={t} label={t} variant="plain" />
                  ))}
                </div>

                {links.length > 0 && (
                  <div className="flex gap-4 pt-3 mt-4 border-t border-dashed border-[#e2e8f0]">
                    {links.map((link, linkIndex) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => {
                          event.stopPropagation();
                          sendGAEvent("event", "project_link_click", {
                            project_name: project.title,
                            link_type: link.label.toLowerCase().replace(" ", "_"),
                          });
                        }}
                        className={`mono-label text-xs hover:underline ${linkTextClasses[linkIndex % linkTextClasses.length]}`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
