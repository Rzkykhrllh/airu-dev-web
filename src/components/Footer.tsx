export default function Footer() {
  return (
    <footer className="py-10 px-6 bg-ink">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-paper">
        <div className="font-black text-xl transform -rotate-2">
          AIRU<span className="text-primary">.</span>
        </div>
        <div className="mono-label text-xs text-muted-light">
          Built with Next.js & Tailwind CSS
        </div>
      </div>
    </footer>
  );
}
