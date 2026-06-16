type TitleBarVariant = "window" | "modal";

interface RetroWindowTitleBarProps {
  title: string;
  variant?: TitleBarVariant;
  leadingIcon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export default function RetroWindowTitleBar({
  title,
  variant = "modal",
  leadingIcon,
  onClose,
  className = "",
}: RetroWindowTitleBarProps) {
  if (variant === "window") {
    return (
      <div
        className={`bg-[#0f172a] px-3 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b-4 border-[#0f172a] ${className}`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-accent" />
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary" />
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-secondary" />
        </div>
        <span className="mono-label text-[10px] sm:text-xs text-white tracking-widest">
          {title}
        </span>
        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white" />
      </div>
    );
  }

  return (
    <div
      className={`bg-[#0f172a] px-4 py-3 flex items-center justify-between flex-shrink-0 ${className}`}
    >
      <div className="flex items-center gap-2">
        {leadingIcon}
        <span
          className="text-xs text-white tracking-widest font-bold"
          style={{ fontFamily: "monospace" }}
        >
          {title}
        </span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="w-5 h-5 border-2 border-white text-white hover:bg-white hover:text-[#0f172a] transition-colors flex items-center justify-center"
          aria-label="Close"
        >
          <span className="text-[10px] font-black leading-none">✕</span>
        </button>
      )}
    </div>
  );
}
