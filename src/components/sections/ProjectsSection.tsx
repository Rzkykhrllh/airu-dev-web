import { projectsData } from "@/data/constants";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="section-bar mb-10">
          <span className="mr-2">04.</span> Projects
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => {
            const colorClasses = ["bg-primary", "bg-secondary", "bg-accent"];
            const textColorClasses = ["text-primary", "text-secondary", "text-accent"];
            const bgClass = colorClasses[index % colorClasses.length];
            const textClass = textColorClasses[index % textColorClasses.length];
            const description =
              "description" in project && typeof project.description === "string"
                ? project.description
                : project.desc;

            return (
              <div key={index} className="project-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{project.emoji}</span>
                  <span className={`badge-pill ${bgClass} text-white text-xs py-1 px-3`}>{project.year}</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-[#0f172a]">{project.title}</h3>
                <p className="text-sm mb-4 text-[#64748b]">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, i) => (
                    <span key={t} className={`mono-label text-xs ${i === 0 ? textClass : "text-secondary"}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4 border-t border-dashed border-[#e2e8f0]">
                  <a href="#" className={`mono-label text-xs hover:underline ${textClass}`}>
                    Live Demo
                  </a>
                  <a href="#" className="mono-label text-xs text-[#64748b] hover:text-[#0f172a]">
                    Source
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
