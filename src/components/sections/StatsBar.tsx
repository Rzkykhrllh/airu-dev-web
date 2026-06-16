import { StatItem } from "@/components/ui";

export default function StatsBar() {
  return (
    <section className="stats-bar py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 text-white">
        <StatItem value="3+" label="Years Experience" />
        <StatItem value="1000+" label="Cups of Coffee" valueColor="text-primary" />
      </div>
    </section>
  );
}
