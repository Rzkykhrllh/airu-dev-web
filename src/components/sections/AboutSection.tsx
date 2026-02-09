import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaCoffee } from "react-icons/fa";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Retro section header */}
        <div className="border-4 border-[#0f172a] bg-white inline-block px-6 py-2 mb-10" style={{ boxShadow: '4px 4px 0 rgba(15, 23, 42, 0.3)' }}>
          <span className="mono-label font-black text-sm">01. ABOUT ME</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-3xl font-black mb-6 text-[#0f172a]" style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              WHO IS <span className="text-primary">AIRU</span>?
            </h3>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="border-4 border-[#0f172a] bg-primary text-white p-5 transform -rotate-1 hover:-rotate-3 transition-transform" style={{ boxShadow: '4px 4px 0 rgba(15, 23, 42, 0.3)' }}>
              <FaMapMarkerAlt className="w-6 h-6 mb-2" />
              <div className="mono-label text-xs text-white/70 mb-1">LOCATION</div>
              <div className="font-black text-sm">TOKYO, JAPAN</div>
            </div>
            
            <div className="border-4 border-[#0f172a] bg-white p-5 transform rotate-1 hover:rotate-3 transition-transform" style={{ boxShadow: '4px 4px 0 rgba(15, 23, 42, 0.3)' }}>
              <FaBriefcase className="w-6 h-6 mb-2 text-[#0f172a]" />
              <div className="mono-label text-xs text-[#64748b] mb-1">STATUS</div>
              <div className="font-black text-sm text-secondary">AVAILABLE</div>
            </div>
            
            <div className="border-4 border-[#0f172a] bg-white p-5 transform rotate-1 hover:rotate-3 transition-transform" style={{ boxShadow: '4px 4px 0 rgba(15, 23, 42, 0.3)' }}>
              <FaGraduationCap className="w-6 h-6 mb-2 text-[#0f172a]" />
              <div className="mono-label text-xs text-[#64748b] mb-1">FOCUS</div>
              <div className="font-black text-sm text-[#0f172a]">FULL-STACK</div>
            </div>
            
            <div className="border-4 border-[#0f172a] bg-secondary text-white p-5 transform -rotate-1 hover:-rotate-3 transition-transform" style={{ boxShadow: '4px 4px 0 rgba(15, 23, 42, 0.3)' }}>
              <FaCoffee className="w-6 h-6 mb-2" />
              <div className="mono-label text-xs text-white/70 mb-1">FUEL</div>
              <div className="font-black text-sm">COFFEE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
