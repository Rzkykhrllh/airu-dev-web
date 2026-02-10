export default function FloatingCTA() {
  return (
    <a
      href="mailto:m.rizky.khairullah@gmail.com"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 border-4 border-ink bg-secondary text-paper px-4 py-2 md:px-6 md:py-3 flex items-center gap-2 font-black mono-label text-xs md:text-sm hover:bg-paper hover:text-ink transition-all retro-shadow-strong"
    >
      <span className="w-2 h-2 bg-paper animate-pulse"></span>
      HIRE ME
    </a>
  );
}
