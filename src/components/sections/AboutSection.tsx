export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-bar mb-10">
          <span className="mr-2">01.</span> About Me
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-black mb-6 text-[#0f172a]">
              WHO IS <span className="text-gradient">AIRU</span>?
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

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary text-white p-6 tilt-left">
              <div className="text-3xl mb-2">📍</div>
              <div className="mono-label text-xs text-white/70">Location</div>
              <div className="font-bold mt-1">Tokyo, Japan</div>
            </div>
            <div className="p-6 tilt-right border-2 border-[#e2e8f0] bg-white">
              <div className="text-3xl mb-2">💼</div>
              <div className="mono-label text-xs text-[#64748b]">Status</div>
              <div className="font-bold mt-1 text-secondary">Available</div>
            </div>
            <div className="p-6 tilt-right border-2 border-[#e2e8f0] bg-white">
              <div className="text-3xl mb-2">🎓</div>
              <div className="mono-label text-xs text-[#64748b]">Focus</div>
              <div className="font-bold mt-1 text-[#0f172a]">Full-Stack</div>
            </div>
            <div className="bg-secondary text-white p-6 tilt-left">
              <div className="text-3xl mb-2">☕</div>
              <div className="mono-label text-xs text-white/70">Fuel</div>
              <div className="font-bold mt-1">Coffee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
