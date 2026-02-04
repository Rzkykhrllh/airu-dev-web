"use client"

import { useState, useEffect, useCallback } from "react"
import Header from "@/components/Header"
import PostCard from "@/components/blog/PostCard"
import SearchBar from "@/components/blog/SearchBar"

interface Post {
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

const POSTS_PER_PAGE = 9

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false)
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  // Scroll handler for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fetch published posts from Payload REST API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts?where[status][equals]=published&sort=-publishedAt&depth=1&limit=100")
        const data = await res.json()
        setAllPosts(data.docs || [])
        setFilteredPosts(data.docs || [])
      } catch (err) {
        console.error("Failed to fetch posts:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleFilter = useCallback((filtered: Post[]) => {
    setFilteredPosts(filtered)
    setCurrentPage(1)
  }, [])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <div className="min-h-screen grid-pattern flex flex-col" data-theme="joints">
      <Header scrolled={scrolled} />

      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-24">
        {/* Page Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 badge-pill bg-primary/10 text-primary mb-4">
            <span>📝</span>
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#0f172a]">
            Blog
          </h1>
          <p className="text-[#64748b] mt-2">
            Thoughts, tutorials, and random stuff.
          </p>
        </div>

        {/* Search + Tag Filter */}
        <SearchBar posts={allPosts} onFilter={handleFilter} />

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border-2 border-[#e2e8f0] rounded-lg overflow-hidden animate-pulse">
                <div className="w-full aspect-video bg-[#f1f5f9]" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-1/3 bg-[#e2e8f0] rounded" />
                  <div className="h-5 w-full bg-[#e2e8f0] rounded" />
                  <div className="h-4 w-4/5 bg-[#e2e8f0] rounded" />
                  <div className="h-4 w-3/5 bg-[#e2e8f0] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#64748b] text-lg">No posts found.</p>
            <p className="text-[#94a3b8] text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-bold mono-label border-2 border-[#e2e8f0] rounded-lg disabled:opacity-40 hover:border-primary hover:text-primary transition-all"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 text-sm font-bold mono-label rounded-lg transition-all ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "border-2 border-[#e2e8f0] hover:border-primary hover:text-primary"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-bold mono-label border-2 border-[#e2e8f0] rounded-lg disabled:opacity-40 hover:border-primary hover:text-primary transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
