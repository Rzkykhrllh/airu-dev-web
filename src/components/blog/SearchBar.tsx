"use client"

import { useState, useCallback } from "react"
import { FiSearch, FiX } from "react-icons/fi"
import Fuse from "fuse.js"

interface Post {
  slug: string
  title: string
  excerpt?: string | null
  tags?: string[] | null
  publishedAt?: string | null
  coverImage?: {
    url: string
    alt?: string
    width?: number
    height?: number
  } | null
}

interface SearchBarProps {
  posts: Post[]
  onFilter: (filtered: Post[]) => void
}

const TAG_LABELS: Record<string, string> = {
  tech: "Tech",
  tutorial: "Tutorial",
  personal: "Personal",
  travel: "Travel",
  life: "Life",
  opinion: "Opinion",
}

const ALL_TAGS = Object.keys(TAG_LABELS)

export default function SearchBar({ posts, onFilter }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const applyFilter = useCallback(
    (searchQuery: string, tag: string | null) => {
      let result = posts

      // Filter by tag first
      if (tag) {
        result = result.filter((post) => post.tags?.includes(tag))
      }

      // Then search with Fuse.js
      if (searchQuery.trim()) {
        const fuse = new Fuse(result, {
          keys: ["title", "excerpt", "tags"],
          threshold: 0.4,
        })
        result = fuse.search(searchQuery).map((item) => item.item)
      }

      onFilter(result)
    },
    [posts, onFilter]
  )

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    applyFilter(val, selectedTag)
  }

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag
    setSelectedTag(newTag)
    applyFilter(query, newTag)
  }

  const handleClear = () => {
    setQuery("")
    setSelectedTag(null)
    onFilter(posts)
  }

  const hasFilter = query.trim() || selectedTag

  return (
    <div className="mb-10">
      {/* Search Input */}
      <div className="relative mb-4">
        <FiSearch
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]"
        />
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search posts..."
          className="w-full pl-11 pr-4 py-3 border-2 border-[#e2e8f0] rounded-lg bg-white text-sm font-semibold text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-primary transition-colors"
        />
        {hasFilter && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-primary transition-colors"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`badge-pill-sm transition-all ${
              selectedTag === tag
                ? "bg-primary text-white"
                : "bg-[#f1f5f9] text-[#64748b] hover:text-primary"
            }`}
          >
            {TAG_LABELS[tag]}
          </button>
        ))}
      </div>
    </div>
  )
}
