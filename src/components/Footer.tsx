import { AiruLogo } from "@/components/ui";

export default function Footer() {
  return (
    <footer className="py-10 px-6 bg-ink">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-paper">
        <AiruLogo as="div" />
        <div className="mono-label text-xs text-muted">
          Built with Next.js &amp; Tailwind CSS
        </div>
      </div>
    </footer>
  );
}
