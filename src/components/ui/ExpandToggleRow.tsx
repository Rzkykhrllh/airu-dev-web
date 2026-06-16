interface ExpandToggleRowProps {
  isExpanded: boolean;
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  hintHiddenOnMobile?: boolean;
}

export default function ExpandToggleRow({
  isExpanded,
  label,
  containerClassName = "flex items-center justify-between mt-4 text-xs text-[#94a3b8]",
  labelClassName = "mono-label",
  hintHiddenOnMobile = false,
}: ExpandToggleRowProps) {
  return (
    <div className={containerClassName}>
      <span className={labelClassName}>{label}</span>
      <div className="flex items-center gap-1 sm:gap-2">
        <span
          className={`${hintHiddenOnMobile ? "hidden sm:inline" : ""} text-[11px] uppercase tracking-wide text-[#94a3b8] hint-pulse`}
        >
          {isExpanded ? "Click to collapse" : "Click to expand"}
        </span>
        <svg
          className={`w-4 h-4 text-[#94a3b8] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
