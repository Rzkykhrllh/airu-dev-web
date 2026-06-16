interface BadgePillProps {
  label: string;
  colorClass?: string;
  textClass?: string;
}

export default function BadgePill({
  label,
  colorClass = "bg-[#f1f5f9]",
  textClass = "text-[#64748b]",
}: BadgePillProps) {
  return (
    <span
      className={`${colorClass} ${textClass} text-xs font-bold mono-label px-3 py-1 rounded-full`}
    >
      {label}
    </span>
  );
}
