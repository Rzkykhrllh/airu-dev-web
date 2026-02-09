import { techStack, techIcons } from "@/data/constants";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Retro section header */}
        <div className="border-4 border-[#0f172a] bg-white inline-block px-6 py-2 mb-10" style={{ boxShadow: '4px 4px 0 rgba(15, 23, 42, 0.3)' }}>
          <span className="mono-label font-black text-sm">02. TECH STACK</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-primary">{"{"}</span> Frontend <span className="text-primary">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.frontend.map((skill) => {
                const Icon = techIcons[skill];
                return (
                  <span key={skill} className="skill-tag bg-primary text-white mono-label text-xs flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-secondary">{"{"}</span> Backend <span className="text-secondary">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.backend.map((skill) => {
                const Icon = techIcons[skill];
                return (
                  <span key={skill} className="skill-tag bg-secondary text-white mono-label text-xs flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-accent">{"{"}</span> DevOps <span className="text-accent">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.devops.map((skill) => {
                const Icon = techIcons[skill];
                return (
                  <span key={skill} className="skill-tag bg-accent text-white mono-label text-xs flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-[#64748b]">{"{"}</span> Tools <span className="text-[#64748b]">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.tools.map((skill) => {
                const Icon = techIcons[skill];
                return (
                  <span key={skill} className="skill-tag bg-[#0f172a] text-white mono-label text-xs flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
