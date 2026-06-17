interface RetroProgressBarProps {
  value: number;
  windowed?: boolean;
  showLabel?: boolean;
  gradient?: boolean;
  height?: "sm" | "md";
  trackColor?: string;
  borderColor?: string;
  borderWidth?: 2 | 4;
}

export default function RetroProgressBar({
  value,
  windowed = false,
  showLabel = false,
  gradient = false,
  height = "sm",
  trackColor = "bg-[#f8fafc]",
  borderColor = "border-[#0f172a]",
  borderWidth = 2,
}: RetroProgressBarProps) {
  const heightClass = height === "sm" ? "h-3" : "h-6";
  const borderClass = borderWidth === 4 ? "border-4" : "border-2";
  const fillClass = gradient
    ? "bg-gradient-to-r from-primary via-secondary to-tertiary transition-all duration-100"
    : "bg-primary transition-all duration-500";

  const track = (
    <div className={`relative ${heightClass} ${windowed ? trackColor : ""}`}>
      <div className={`h-full ${fillClass}`} style={{ width: `${value}%` }} />
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="mono-label text-xs text-white font-black drop-shadow-lg">
            {value}%
          </span>
        </div>
      )}
    </div>
  );

  if (windowed) {
    return (
      <div className={`${borderClass} ${borderColor} bg-[#0f172a] p-2`}>
        {track}
      </div>
    );
  }

  return (
    <div className={`${heightClass} ${borderClass} ${borderColor} ${trackColor}`}>
      <div className={`h-full ${fillClass}`} style={{ width: `${value}%` }} />
    </div>
  );
}
