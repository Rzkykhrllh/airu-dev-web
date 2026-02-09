import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaCoffee } from "react-icons/fa";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Retro section header */}
        <div className="retro-header mb-10">
          <span className="mono-label font-black text-sm">01. ABOUT ME</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-3xl font-black mb-6 text-ink" style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              WHO IS <span className="text-primary">AIRU</span>?
            </h3>
            <p className="leading-relaxed mb-4 text-muted">
              Software Engineer with 3 years of experience and a strong focus on
              backend development and data-driven systems. Experienced in API
              and system design for ML job orchestration and scheduling, with
              hands-on involvement in infrastructure and service monitoring as
              well as ML experimentation platforms supporting traffic data
              analytics.
            </p>
          </div>

          {/* Retro info cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-4 border-ink bg-primary text-paper p-5 transform -rotate-1 hover:-rotate-3 transition-transform retro-shadow">
              <FaMapMarkerAlt className="w-6 h-6 mb-2" />
              <div className="mono-label text-xs text-paper opacity-70 mb-1">LOCATION</div>
              <div className="font-black text-sm">TOKYO, JAPAN</div>
            </div>
            
            <div className="border-4 border-ink bg-paper p-5 transform rotate-1 hover:rotate-3 transition-transform retro-shadow">
              <FaBriefcase className="w-6 h-6 mb-2 text-ink" />
              <div className="mono-label text-xs text-muted mb-1">STATUS</div>
              <div className="font-black text-sm text-secondary">AVAILABLE</div>
            </div>
            
            <div className="border-4 border-ink bg-paper p-5 transform rotate-1 hover:rotate-3 transition-transform retro-shadow">
              <FaGraduationCap className="w-6 h-6 mb-2 text-ink" />
              <div className="mono-label text-xs text-muted mb-1">FOCUS</div>
              <div className="font-black text-sm text-ink">FULL-STACK</div>
            </div>
            
            <div className="border-4 border-ink bg-secondary text-paper p-5 transform -rotate-1 hover:-rotate-3 transition-transform retro-shadow">
              <FaCoffee className="w-6 h-6 mb-2" />
              <div className="mono-label text-xs text-paper opacity-70 mb-1">FUEL</div>
              <div className="font-black text-sm">COFFEE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
