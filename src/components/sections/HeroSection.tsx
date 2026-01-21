export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div className="badge-pill bg-primary text-white mb-6">
        <span>{"</>"}</span>
        <span className="mono-label">Software Engineer</span>
      </div>

      <div className="mb-4">
        <span className="handwritten text-lg text-[#64748b]">Hi, I&apos;m</span>
      </div>
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-center leading-none tracking-tight transform -rotate-1 text-gradient">
        AIRU
      </h1>

      <div className="flex items-center gap-3 mt-6 mb-4">
        <span className="w-8 h-0.5 bg-primary"></span>
        <h2 className="text-xl md:text-2xl font-bold mono-label text-[#0f172a]">I BUILD DIGITAL THINGS</h2>
        <span className="w-8 h-0.5 bg-secondary"></span>
      </div>

      <p className="text-lg md:text-xl text-center mt-4 max-w-xl text-[#64748b]">
        Full-stack developer crafting <span className="font-semibold text-primary">web applications</span> with clean code and thoughtful design.
      </p>

      <p className="handwritten mt-6 text-center text-sm text-[#64748b]">
        &quot;Turning coffee into code since 2019&quot;
      </p>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-12">
        <div className="relative">
          <span className="handwritten absolute -top-6 left-0 text-sm transform -rotate-3">check my work</span>
          <a href="#projects" className="tilt-left block bg-primary text-white px-8 py-5 shadow-lg">
            <div className="mono-label text-base font-bold flex items-center gap-2">
              PROJECTS <span className="arrow-bounce">{">"}</span>
            </div>
            <div className="text-sm mt-1 opacity-80">See what I&apos;ve built</div>
          </a>
        </div>

        <div className="relative">
          <span className="handwritten absolute -top-6 right-0 text-sm transform rotate-3">let&apos;s connect</span>
          <a href="#contact" className="tilt-right block bg-secondary text-white px-8 py-5 shadow-lg">
            <div className="mono-label text-base font-bold flex items-center gap-2">
              CONTACT <span className="arrow-bounce">{">"}</span>
            </div>
            <div className="text-sm mt-1 opacity-80">Get in touch</div>
          </a>
        </div>
      </div>
    </section>
  );
}
