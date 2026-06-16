interface StatItemProps {
  value: string;
  label: string;
  valueColor?: string;
}

export default function StatItem({ value, label, valueColor }: StatItemProps) {
  return (
    <div className="text-center">
      <div className={`text-4xl md:text-5xl font-black ${valueColor ?? ""}`}>
        {value}
      </div>
      <div className="mono-label text-xs mt-2 text-slate-400">{label}</div>
    </div>
  );
}
