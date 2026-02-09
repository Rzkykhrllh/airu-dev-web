export default function PixelDivider() {
  return (
    <div className="py-8 bg-[#1e293b] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-2">
        {/* Pixelated blocks pattern */}
        <div className="flex-1 flex items-center gap-1 justify-end">
          <div className="w-2 h-2 bg-primary animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-secondary animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-accent animate-pulse" style={{ animationDelay: '0.4s' }} />
          <div className="w-2 h-2 bg-primary animate-pulse" style={{ animationDelay: '0.6s' }} />
          <div className="w-2 h-2 bg-secondary animate-pulse" style={{ animationDelay: '0.8s' }} />
        </div>
        
        {/* Center text */}
        <div className="border-4 border-white bg-[#1e293b] px-6 py-2">
          <span className="mono-label text-xs text-white tracking-widest">LEARN • BUILD • REPEAT</span>
        </div>
        
        {/* Pixelated blocks pattern */}
        <div className="flex-1 flex items-center gap-1">
          <div className="w-2 h-2 bg-secondary animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="w-2 h-2 bg-primary animate-pulse" style={{ animationDelay: '0.6s' }} />
          <div className="w-2 h-2 bg-accent animate-pulse" style={{ animationDelay: '0.4s' }} />
          <div className="w-2 h-2 bg-secondary animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-primary animate-pulse" style={{ animationDelay: '0s' }} />
        </div>
      </div>
    </div>
  );
}
