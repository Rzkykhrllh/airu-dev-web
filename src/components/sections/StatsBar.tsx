export default function StatsBar() {
  return (
    <section className="stats-bar py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 text-paper">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-black">3+</div>
          <div className="mono-label text-xs mt-2 text-muted-light">
            Years Experience
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-black text-primary">
            1000+
          </div>
          <div className="mono-label text-xs mt-2 text-muted-light">
            Cups of Coffee
          </div>
        </div>
      </div>
    </section>
  );
}
