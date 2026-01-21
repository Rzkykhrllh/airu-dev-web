import { techStack } from "@/data/constants";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="section-bar mb-10">
          <span className="mr-2">02.</span> Tech Stack
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-primary">{"{"}</span> Frontend <span className="text-primary">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.frontend.map((skill) => (
                <span key={skill} className="skill-tag bg-primary text-white mono-label text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-secondary">{"{"}</span> Backend <span className="text-secondary">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.backend.map((skill) => (
                <span key={skill} className="skill-tag bg-secondary text-white mono-label text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-accent">{"{"}</span> DevOps <span className="text-accent">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.devops.map((skill) => (
                <span key={skill} className="skill-tag bg-accent text-white mono-label text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-[#64748b]">{"{"}</span> Tools <span className="text-[#64748b]">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.tools.map((skill) => (
                <span key={skill} className="skill-tag bg-[#0f172a] text-white mono-label text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
