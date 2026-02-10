import { techStack, techIcons } from "@/data/constants";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        {/* Retro section header */}
        <div className="retro-header mb-10">
          <span className="mono-label font-black text-sm">02. TECH STACK</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-ink">
              <span className="text-primary">{"{"}</span> Frontend <span className="text-primary">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.frontend.map((skill) => {
                const Icon = techIcons[skill];
                return (
                  <span key={skill} className="skill-tag bg-primary text-paper mono-label text-xs flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-ink">
              <span className="text-secondary">{"{"}</span> Backend <span className="text-secondary">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.backend.map((skill) => {
                const Icon = techIcons[skill];
                return (
                  <span key={skill} className="skill-tag bg-secondary text-paper mono-label text-xs flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-ink">
              <span className="text-accent">{"{"}</span> DevOps <span className="text-accent">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.devops.map((skill) => {
                const Icon = techIcons[skill];
                return (
                  <span key={skill} className="skill-tag bg-accent text-paper mono-label text-xs flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-ink">
              <span className="text-muted">{"{"}</span> Tools <span className="text-muted">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.tools.map((skill) => {
                const Icon = techIcons[skill];
                return (
                  <span key={skill} className="skill-tag bg-ink text-paper mono-label text-xs flex items-center gap-2">
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
