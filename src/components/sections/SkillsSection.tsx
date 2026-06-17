import { techStack, techIcons } from "@/data/constants";
import { SectionHeader, TechTag } from "@/components/ui";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="02. TECH STACK" />

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-primary">{"{"}</span> Frontend <span className="text-primary">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.frontend.map((skill) => (
                <TechTag key={skill} label={skill} variant="solid" icon={techIcons[skill]} color="bg-primary" />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-secondary">{"{"}</span> Backend <span className="text-secondary">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.backend.map((skill) => (
                <TechTag key={skill} label={skill} variant="solid" icon={techIcons[skill]} color="bg-secondary" />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-tertiary">{"{"}</span> DevOps <span className="text-tertiary">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.devops.map((skill) => (
                <TechTag key={skill} label={skill} variant="solid" icon={techIcons[skill]} color="bg-tertiary" />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#0f172a]">
              <span className="text-[#64748b]">{"{"}</span> Tools <span className="text-[#64748b]">{"}"}</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.tools.map((skill) => (
                <TechTag key={skill} label={skill} variant="solid" icon={techIcons[skill]} color="bg-[#0f172a]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
