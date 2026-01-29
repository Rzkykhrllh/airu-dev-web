export default function StatsBar() {
  return (
    <section className="stats-bar py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 text-white">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-black">3+</div>
          <div className="mono-label text-xs mt-2 text-slate-400">
            Years Experience
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-black text-primary">
            20+
          </div>
          <div className="mono-label text-xs mt-2 text-slate-400">
            Projects Done
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-black text-secondary">
            100%
          </div>
          <div className="mono-label text-xs mt-2 text-slate-400">
            Dedication
          </div>
        </div>
      </div>
    </section>
  );
}
