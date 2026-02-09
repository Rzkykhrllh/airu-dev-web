export default function FloatingCTA() {
  return (
    <a
      href="mailto:m.rizky.khairullah@gmail.com"
      className="floating-cta border-4 border-[#0f172a] bg-secondary text-white px-6 py-3 flex items-center gap-2 font-black mono-label text-sm hover:bg-white hover:text-[#0f172a] transition-all"
      style={{ boxShadow: '4px 4px 0 rgba(15, 23, 42, 0.5)' }}
    >
      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
      HIRE ME
    </a>
  );
}
