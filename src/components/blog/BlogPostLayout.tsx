"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"

interface BlogPostLayoutProps {
  children: React.ReactNode
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white grid-pattern" data-theme="joints">
      <Header scrolled={scrolled} />
      {children}
    </div>
  )
}
