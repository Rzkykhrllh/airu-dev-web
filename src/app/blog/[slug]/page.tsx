import type { Metadata } from 'next'
import type { SerializedEditorState } from 'lexical'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAdjacentPosts } from '@/lib/posts'
import PostContent from '@/components/blog/PostContent'
import BlogPostLayout from '@/components/blog/BlogPostLayout'

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
    <BlogPostLayout>
      {/* Cover image hero */}
      {post.coverImage?.url && (
        <div className="relative w-full bg-[#0f172a]" style={{ paddingTop: '5rem' }}>
          <div className="relative w-full" style={{ height: '45vh', minHeight: '300px', maxHeight: '500px' }}>
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              sizes="100vw"
              className="object-cover opacity-80"
              priority
            />
            {/* Strong bottom gradient so title reads clearly on top */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
          </div>

          {/* Title overlay on cover */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
            <div className="max-w-3xl mx-auto">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="badge-pill-sm bg-white/15 text-white border border-white/20">
                      {TAG_LABELS[tag] || tag}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight drop-shadow-lg">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-white/70 mono-label">
                {formattedDate && <span>{formattedDate}</span>}
                <span>·</span>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content area - clean white */}
      <article className="max-w-3xl mx-auto w-full px-6 pb-28">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold mono-label text-[#64748b] hover:text-primary transition-colors pt-8 pb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* If no cover image, show title here instead */}
        {!post.coverImage?.url && (
          <div className="pt-16 pb-8 border-b-2 border-[#e2e8f0] mb-10">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="badge-pill-sm bg-primary/10 text-primary">
                    {TAG_LABELS[tag] || tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-[#94a3b8] mono-label">
              {formattedDate && <span>{formattedDate}</span>}
              <span>·</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        )}

        {/* Divider after back link when cover exists */}
        {post.coverImage?.url && (
          <div className="border-b-2 border-[#e2e8f0] mb-10" />
        )}

        {/* Rich text content */}
        <PostContent content={post.content as SerializedEditorState} />

        {/* Prev / Next Navigation */}
        {(prev || next) && (
          <div className="flex items-stretch gap-4 mt-24 pt-10 border-t-2 border-[#e2e8f0]">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="flex-1 project-card rounded-lg p-5 flex flex-col justify-between transition-all hover:-translate-y-1"
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
                className="flex-1 project-card rounded-lg p-5 flex flex-col justify-between items-end text-right transition-all hover:-translate-y-1"
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
    </BlogPostLayout>
  )
}
