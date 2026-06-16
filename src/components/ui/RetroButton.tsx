type RetroButtonVariant = "primary" | "secondary" | "dark" | "outline";
type RetroButtonSize = "sm" | "md";

const variantClasses: Record<RetroButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-transparent hover:text-[#0f172a]",
  secondary:
    "bg-secondary text-white hover:bg-transparent hover:text-[#0f172a]",
  dark: "bg-[#0f172a] text-white hover:bg-white hover:text-[#0f172a]",
  outline: "bg-white text-[#0f172a] hover:bg-[#0f172a] hover:text-white",
};

const sizeClasses: Record<RetroButtonSize, string> = {
  sm: "px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm",
  md: "px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base",
};

function getRotClass(r?: -1 | 0 | 1): string {
  if (!r) return "";
  return r < 0 ? "-rotate-1" : "rotate-1";
}

function getHoverRotClass(r?: -3 | 0 | 3): string {
  if (!r) return "";
  return r < 0 ? "hover:-rotate-3" : "hover:rotate-3";
}

interface RetroButtonProps {
  as?: "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  variant: RetroButtonVariant;
  size?: RetroButtonSize;
  rotation?: -1 | 0 | 1;
  hoverRotation?: -3 | 0 | 3;
  shadowOpacity?: number;
  className?: string;
  children: React.ReactNode;
}

export default function RetroButton({
  as = "a",
  href,
  target,
  rel,
  onClick,
  variant,
  size = "md",
  rotation,
  hoverRotation,
  shadowOpacity = 0.3,
  className = "",
  children,
}: RetroButtonProps) {
  const classes = [
    "border-4 border-[#0f172a] font-black mono-label flex items-center gap-2 transition-all",
    variantClasses[variant],
    sizeClasses[size],
    getRotClass(rotation),
    getHoverRotClass(hoverRotation),
    rotation !== undefined ? "transform" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = { boxShadow: `4px 4px 0 rgba(15, 23, 42, ${shadowOpacity})` };

  if (as === "button") {
    return (
      <button onClick={onClick} className={classes} style={style}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} target={target} rel={rel} onClick={onClick} className={classes} style={style}>
      {children}
    </a>
  );
}
