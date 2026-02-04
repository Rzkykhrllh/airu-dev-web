import type { Metadata } from 'next'
import type { SerializedEditorState } from 'lexical'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAdjacentPosts } from '@/lib/posts'
import PostContent from '@/components/blog/PostContent'

// ISR: revalidate every 60 seconds
export const revalidate = 60

const TAG_LABELS: Record<string, string> = {
  tech: 'Tech',
  tutorial: 'Tutorial',
  personal: 'Personal',
  travel: 'Travel',
  life: 'Life',
  opinion: 'Opinion',
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const coverImageUrl = post.coverImage?.sizes?.og?.url || post.coverImage?.url

  return {
    title: `${post.title} | Airu`,
    description: post.excerpt || `Read ${post.title} on Airu's blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      images: coverImageUrl ? [{ url: coverImageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { prev, next } = await getAdjacentPosts(post.publishedAt as string)

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  // Estimate reading time (avg 200 words/min)
  const wordCount = post.excerpt?.split(' ').length || 200
  const readingTime = Math.max(1, Math.round(wordCount / 200))

  return (
    <div className="min-h-screen grid-pattern" data-theme="joints">
      {/* Back link */}
      <div className="max-w-3xl mx-auto w-full px-6 pt-24 pb-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold mono-label text-[#64748b] hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto w-full px-6 pb-24">
        {/* Cover Image */}
        {post.coverImage?.url && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 bg-[#f1f5f9]">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string) => (
              <span key={tag} className="badge-pill-sm bg-primary/10 text-primary">
                {TAG_LABELS[tag] || tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta: date + reading time */}
        <div className="flex items-center gap-3 text-sm text-[#94a3b8] mono-label mb-8 pb-8 border-b-2 border-[#e2e8f0]">
          {formattedDate && <span>{formattedDate}</span>}
          <span>·</span>
          <span>{readingTime} min read</span>
        </div>

        {/* Content */}
        <PostContent content={post.content as SerializedEditorState} />

        {/* Prev / Next Navigation */}
        {(prev || next) && (
          <div className="flex items-stretch gap-4 mt-16 pt-8 border-t-2 border-[#e2e8f0]">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="flex-1 project-card rounded-lg p-5 flex flex-col justify-between"
              >
                <span className="text-xs font-bold mono-label text-[#94a3b8] mb-2">← Previous</span>
                <span className="text-sm font-bold text-[#0f172a]">{prev.title}</span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="flex-1 project-card rounded-lg p-5 flex flex-col justify-between items-end text-right"
              >
                <span className="text-xs font-bold mono-label text-[#94a3b8] mb-2">Next →</span>
                <span className="text-sm font-bold text-[#0f172a]">{next.title}</span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        )}
      </article>
    </div>
  )
}
