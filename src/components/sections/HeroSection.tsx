export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left side - Name & Info */}
        <div>
          <h1 className="text-6xl md:text-7xl font-black text-[#0f172a] leading-tight mb-4 transform -rotate-1">
            AIRU
          </h1>
          <div className="badge-pill bg-primary text-white mb-6 inline-flex">
            <span>{"</>"}</span>
            <span className="mono-label">Software Engineer</span>
          </div>

          <div className="space-y-3 mt-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <p className="text-lg text-[#64748b]">Based in <span className="font-semibold text-[#0f172a]">Japan</span></p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              <p className="text-lg text-[#64748b]">Available for <span className="font-semibold text-[#0f172a]">opportunities</span></p>
            </div>
          </div>

          <p className="handwritten mt-8 text-base text-[#64748b]">
            &quot;Turning coffee into code since 2019&quot;
          </p>
        </div>

        {/* Right side - Highlights */}
        <div className="bg-[#0f172a] text-white p-8 md:p-10 transform rotate-1 shadow-xl">
          <div className="transform -rotate-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-0.5 bg-primary"></span>
              <h2 className="mono-label text-sm font-bold text-primary">HIGHLIGHTS</h2>
            </div>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl font-bold">•</span>
                <p className="text-base leading-relaxed">
                  <span className="font-bold">2 years</span> at Net Chart Japan
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary text-xl font-bold">•</span>
                <p className="text-base leading-relaxed">
                  Backend APIs & ML platforms
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl font-bold">•</span>
                <p className="text-base leading-relaxed">
                  <span className="font-bold">95% performance</span> improvements
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl font-bold">•</span>
                <p className="text-base leading-relaxed">
                  Full-stack capabilities
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTAs below the grid */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="relative">
          <span className="handwritten absolute -top-6 left-0 text-sm transform -rotate-3 text-[#64748b]">
            my experience
          </span>
          <a href="#timeline" className="tilt-left block bg-primary text-white px-8 py-5 shadow-lg">
            <div className="mono-label text-base font-bold flex items-center gap-2">
              VIEW JOURNEY <span className="arrow-bounce">{">"}</span>
            </div>
            <div className="text-sm mt-1 opacity-80">See my experience</div>
          </a>
        </div>

        <div className="relative">
          <span className="handwritten absolute -top-6 right-0 text-sm transform rotate-3 text-[#64748b]">
            let&apos;s connect
          </span>
          <a href="#contact" className="tilt-right block bg-secondary text-white px-8 py-5 shadow-lg">
            <div className="mono-label text-base font-bold flex items-center gap-2">
              GET IN TOUCH <span className="arrow-bounce">{">"}</span>
            </div>
            <div className="text-sm mt-1 opacity-80">Start a conversation</div>
          </a>
        </div>
      </div>
    </section>
  );
}
