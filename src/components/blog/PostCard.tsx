import Link from 'next/link'
import Image from 'next/image'

interface PostCardProps {
  post: {
    slug: string
    title: string
    excerpt?: string | null
    coverImage?: {
      url: string
      alt?: string
      width?: number
      height?: number
    } | null
    tags?: string[] | null
    publishedAt?: string | null
  }
}

const TAG_LABELS: Record<string, string> = {
  tech: 'Tech',
  tutorial: 'Tutorial',
  personal: 'Personal',
  travel: 'Travel',
  life: 'Life',
  opinion: 'Opinion',
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="project-card rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
    >
      {/* Cover Image */}
      {post.coverImage?.url ? (
        <div className="relative w-full aspect-video bg-[#f1f5f9] overflow-hidden">
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full aspect-video bg-[#f1f5f9] flex items-center justify-center">
          <span className="text-4xl text-[#e2e8f0]">✍️</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="badge-pill-sm bg-primary/10 text-primary"
              >
                {TAG_LABELS[tag] || tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-[#0f172a] mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-[#64748b] line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        )}

        {/* Date */}
        {formattedDate && (
          <p className="text-xs text-[#94a3b8] mono-label mt-3">
            {formattedDate}
          </p>
        )}
      </div>
    </Link>
  )
}
