import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen grid-pattern flex flex-col items-center justify-center px-4" data-theme="joints">
      <div className="text-center max-w-md">
        {/* 404 */}
        <h1 className="text-8xl font-black text-[#0f172a] mb-2">
          404
        </h1>

        {/* Decorative */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-1 w-12 bg-primary rounded-full"></div>
          <div className="h-1 w-4 bg-secondary rounded-full"></div>
          <div className="h-1 w-4 bg-accent rounded-full"></div>
        </div>

        {/* Message */}
        <p className="text-lg text-[#64748b] mb-8">
          This page doesn&apos;t exist. Looks like you wandered off the path.
        </p>

        {/* Back buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold mono-label transition-all hover:opacity-90 -rotate-1 hover:rotate-0"
          >
            Back to Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#e2e8f0] text-[#0f172a] font-bold mono-label transition-all hover:border-primary hover:text-primary rotate-1 hover:rotate-0"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
