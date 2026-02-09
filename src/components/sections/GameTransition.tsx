"use client";

import { useState, useEffect } from "react";

export default function GameTransition() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-12 bg-[#1e293b] relative overflow-hidden">
      {/* Scanline effect */}
      <div 
        className="absolute top-0 left-0 w-full h-1 bg-primary/50 animate-pulse"
        style={{ 
          animation: 'scanline 2s linear infinite',
        }}
      />
      
      <div className="max-w-2xl mx-auto px-6">
        {/* Loading text */}
        <div className="text-center mb-6">
          <h3 className="mono-label text-white text-sm mb-2 tracking-widest">
            LOADING NEXT SECTION
          </h3>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-white animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-2 h-2 bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="w-2 h-2 bg-white animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="border-4 border-white bg-[#0f172a] p-2">
          <div className="relative h-6 bg-[#1e293b]">
            <div 
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            {/* Pixelated effect overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="mono-label text-xs text-white font-black drop-shadow-lg">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Stage info */}
        <div className="mt-6 flex items-center justify-between text-white/60 text-xs mono-label">
          <span>STAGE: INTRO</span>
          <span>NEXT: ABOUT</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanline {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
