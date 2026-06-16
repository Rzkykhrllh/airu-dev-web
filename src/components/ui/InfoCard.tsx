interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bg?: string;
  isDark?: boolean;
  rotation?: -1 | 1;
  valueClassName?: string;
}

export default function InfoCard({
  icon,
  label,
  value,
  bg = "bg-white",
  isDark = false,
  rotation = 1,
  valueClassName,
}: InfoCardProps) {
  const rotateClass =
    rotation === -1 ? "-rotate-1 hover:-rotate-3" : "rotate-1 hover:rotate-3";
  const labelClass = isDark ? "text-white/70" : "text-[#64748b]";
  const defaultValueClass = isDark ? "" : "text-[#0f172a]";

  return (
    <div
      className={`border-4 border-[#0f172a] ${bg} ${isDark ? "text-white" : ""} p-5 transform ${rotateClass} transition-transform`}
      style={{ boxShadow: "4px 4px 0 rgba(15, 23, 42, 0.3)" }}
    >
      {icon}
      <div className={`mono-label text-xs mb-1 ${labelClass}`}>{label}</div>
      <div className={`font-black text-sm ${valueClassName ?? defaultValueClass}`}>
        {value}
      </div>
    </div>
  );
}
