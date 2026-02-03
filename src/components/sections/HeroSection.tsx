"use client";

import { useState, useEffect, useRef } from "react";

const roles = [
  "Software Engineer",
  "Photographer",
  "Backend Developer",
  "API Architect",
  "Problem Solver",
  "Coffee Enthusiast",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Morphing roles
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setExitingIndex(currentIndex);
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % roles.length);
        setExitingIndex(null);
        setIsAnimating(false);
      }, 600);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#6366f1';
        ctxRef.current = ctx;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Hide hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const getPoint = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const point = getPoint(e);
    if (!point || !ctxRef.current) return;

    setIsDrawing(true);
    setShowHint(false);
    
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.stroke();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    
    const point = getPoint(e);
    if (!point || !ctxRef.current) return;

    const ctx = ctxRef.current;
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (ctxRef.current) {
      ctxRef.current.beginPath();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const getCardIndex = (offset: number) => {
    return (currentIndex + offset) % roles.length;
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex flex-col px-6 pt-24 pb-12 relative"
    >
      {/* Full Section Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full cursor-crosshair"
        style={{ 
          zIndex: 0,
          backgroundColor: 'transparent'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Drawing Hint */}
      {showHint && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
          <div className="bg-white border-2 border-[#0f172a] px-6 py-3 rounded shadow-lg animate-pulse">
            <p className="text-sm font-bold text-[#0f172a] flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Click & drag to draw on the grid!
            </p>
          </div>
        </div>
      )}

      {/* Clear Button */}
      <button
        onClick={clearCanvas}
        className="absolute bottom-8 right-8 z-20 bg-white border-2 border-[#0f172a] px-4 py-2 text-sm font-bold mono-label hover:bg-[#0f172a] hover:text-white transition-colors"
      >
        Clear Canvas
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="max-w-6xl w-full mx-auto">
          {/* Name */}
          <div className="mb-16">
            <p className="text-lg text-[#64748b] mb-3">Hello, I&apos;m</p>
            <h1 className="text-8xl md:text-9xl font-black text-[#0f172a] leading-none tracking-tighter select-none">
              Airu
            </h1>
          </div>

          {/* Card Stack */}
          <div className="mb-16">
            <p className="text-xl text-[#64748b] mb-6 select-none">I am a</p>
            
            <div 
              className="relative h-[100px] w-full max-w-[400px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {roles.map((role, idx) => {
                const isCurrent = idx === currentIndex;
                const isNext = idx === getCardIndex(1);
                const isThird = idx === getCardIndex(2);
                const isExiting = idx === exitingIndex;
                
                if (!isCurrent && !isNext && !isThird && !isExiting) return null;

                let zIndex = 1;
                let translateY = 0;
                let translateX = 0;
                let rotate = 0;
                let opacity = 1;
                let scale = 1;

                if (isExiting) {
                  zIndex = 50;
                  translateY = -120;
                  translateX = 80;
                  rotate = 20;
                  opacity = 0;
                  scale = 0.9;
                } else if (isCurrent) {
                  zIndex = 30;
                } else if (isNext) {
                  zIndex = 20;
                  translateY = 10;
                  translateX = 5;
                  rotate = 1.5;
                  opacity = 0.6;
                } else if (isThird) {
                  zIndex = 10;
                  translateY = 20;
                  translateX = 10;
                  rotate = 3;
                  opacity = 0.3;
                }

                return (
                  <div
                    key={`${role}-${idx}`}
                    className="absolute top-0 left-0 bg-primary text-white rounded px-8 py-5 shadow-xl transition-all duration-[600ms] ease-out flex items-center select-none"
                    style={{
                      zIndex,
                      transform: `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
                      opacity,
                    }}
                  >
                    <span className="text-2xl md:text-3xl font-bold mono-label text-white">
                      {role}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4 mt-8 max-w-[400px]">
              <span className="text-sm mono-label text-[#64748b] select-none">
                {String(currentIndex + 1).padStart(2, '0')} / {String(roles.length).padStart(2, '0')}
              </span>
              <div className="flex-1 h-1 bg-[#e2e8f0] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / roles.length) * 100}%` }}
                />
              </div>
              {isPaused && <span className="text-xs text-[#64748b] italic">Paused</span>}
            </div>
          </div>

          {/* Info & Tech Stack */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4 select-none">
                <span className="w-3 h-3 bg-[#0f172a] rounded-full"></span>
                <span className="text-xl text-[#0f172a] font-medium">Tokyo, Japan</span>
              </div>
              <div className="flex items-center gap-3 mb-6 select-none">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-lg text-[#64748b]">Available for opportunities</span>
              </div>
              
              <p className="handwritten text-xl text-[#64748b] select-none">
                &quot;Turning coffee into code since 2019&quot;
              </p>
            </div>

            <div>
              <p className="mono-label text-sm text-[#64748b] mb-4 select-none">TECH STACK</p>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "Python", "FastAPI", "Docker", "Grafana", "PostgreSQL"].map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 bg-[#f1f5f9] text-[#0f172a] text-sm font-semibold mono-label border border-[#e2e8f0] hover:border-primary hover:text-primary transition-colors cursor-default select-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="mt-12 max-w-6xl w-full mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t-2 border-[#e2e8f0] pt-8">
          <div className="flex items-center gap-8">
            <a 
              href="#timeline" 
              className="group flex items-center gap-3 text-[#0f172a] hover:text-primary transition-colors"
            >
              <span className="mono-label text-sm font-bold">View Journey</span>
              <span className="w-8 h-px bg-current transition-all group-hover:w-12"></span>
              <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a 
              href="#contact" 
              className="group flex items-center gap-3 text-[#0f172a] hover:text-secondary transition-colors"
            >
              <span className="mono-label text-sm font-bold">Get in Touch</span>
              <span className="w-8 h-px bg-current transition-all group-hover:w-12"></span>
              <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#64748b] select-none">
            <span className="mono-label">Scroll to explore</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
