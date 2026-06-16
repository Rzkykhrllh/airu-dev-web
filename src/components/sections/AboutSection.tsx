import { FaMapMarkerAlt, FaBriefcase, FaBullseye, FaCoffee } from "react-icons/fa";
import { SectionHeader, SectionHeading, InfoCard } from "@/components/ui";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="01. ABOUT ME" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading>
              WHO IS <span className="text-primary">AIRU</span>?
            </SectionHeading>
            <p className="leading-relaxed mb-4 text-[#64748b]">
              Software Engineer with 3 years of experience and a strong focus on
              backend development and data-driven systems. Experienced in API
              and system design for ML job orchestration and scheduling, with
              hands-on involvement in infrastructure and service monitoring as
              well as ML experimentation platforms supporting traffic data
              analytics.
            </p>
          </div>

          {/* Retro info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard
              bg="bg-primary"
              isDark
              rotation={-1}
              icon={<FaMapMarkerAlt className="w-6 h-6 mb-2" />}
              label="LOCATION"
              value="TOKYO, JAPAN"
            />
            <InfoCard
              rotation={1}
              icon={<FaBriefcase className="w-6 h-6 mb-2 text-[#0f172a]" />}
              label="STATUS"
              value="AVAILABLE"
              valueClassName="text-secondary"
            />
            <InfoCard
              rotation={1}
              icon={<FaBullseye className="w-6 h-6 mb-2 text-[#0f172a]" />}
              label="FOCUS"
              value="FULL-STACK"
            />
            <InfoCard
              bg="bg-secondary"
              isDark
              rotation={-1}
              icon={<FaCoffee className="w-6 h-6 mb-2" />}
              label="FUEL"
              value="COFFEE"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
