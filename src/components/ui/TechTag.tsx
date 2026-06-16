type TechTagVariant = "solid" | "code-prefix" | "plain";

interface TechTagProps {
  label: string;
  variant?: TechTagVariant;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

export default function TechTag({
  label,
  variant = "plain",
  icon: Icon,
  color = "bg-primary",
}: TechTagProps) {
  if (variant === "solid") {
    return (
      <span className={`skill-tag ${color} text-white mono-label text-xs flex items-center gap-2`}>
        {Icon && <Icon className="w-4 h-4" />}
        {label}
      </span>
    );
  }

  if (variant === "code-prefix") {
    return (
      <span className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-[#64748b]">
        <span className="text-[#94a3b8]">{"</>"}</span>
        {label}
      </span>
    );
  }

  return <span className="mono-label text-xs text-[#64748b]">{label}</span>;
}
