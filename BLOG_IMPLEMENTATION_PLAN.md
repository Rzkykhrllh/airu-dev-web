# Blog Implementation Plan - Airu Portfolio

## Overview
Full-stack blog system dengan admin dashboard untuk personal portfolio website.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Database | SQLite + Drizzle ORM |
| Authentication | Simple password (env variable) |
| Rich Text Editor | TipTap |
| Image Storage | VPS `/public/uploads` |
| Search | Client-side Fuse.js |
| Styling | Tailwind CSS v4 |

## Database Schema

### Posts Table
```typescript
{
  id: string (uuid)
  title: string
  slug: string (unique, URL-friendly)
  excerpt: string (auto-generated or manual)
  content: string (HTML/JSON from TipTap)
  status: 'draft' | 'published'
  coverImage: string (optional, path to image)
  tags: string[] (JSON array)
  createdAt: Date
  updatedAt: Date
}
```

## Project Structure

```
/src
  /app/
    /api/
      /posts/
        - route.ts          # GET list, POST create
        /[id]/
          - route.ts        # GET, PUT, DELETE single post
      /upload/
        - route.ts          # POST image upload
    
    /blog/
      - page.tsx            # Blog listing + search
      /[slug]/
        - page.tsx          # Individual post
    
    /admin/
      - page.tsx            # Login gate
      /posts/
        - page.tsx          # Posts list
        /new/
          - page.tsx        # Create new post
        /[id]/
          /edit/
            - page.tsx      # Edit existing post
  
  /components/
    /admin/
      - LoginGate.tsx
      - AdminSidebar.tsx
      - PostsTable.tsx
    /editor/
      - TipTapEditor.tsx    # Rich text editor
      - Toolbar.tsx         # Editor toolbar
  
  /db/
    - schema.ts             # Drizzle schema definition
    - migrations/           # Database migrations
    - index.ts              # Database connection
  
  /lib/
    - posts.ts              # Database query helpers
    - search.ts             # Fuse.js search utilities
  
  /content/                 # Optional: for MDX backup
  
/public
  /uploads/                 # Image storage
```

## Implementation Phases

### Phase 1: Database Setup
- [ ] Install dependencies (drizzle-orm, better-sqlite3, drizzle-kit)
- [ ] Setup database schema
- [ ] Create migration files
- [ ] Create database connection helper
- [ ] Test database operations

### Phase 2: API Routes
- [ ] `GET /api/posts` - List posts (with filter by status)
- [ ] `POST /api/posts` - Create new post
- [ ] `GET /api/posts/[id]` - Get single post
- [ ] `PUT /api/posts/[id]` - Update post
- [ ] `DELETE /api/posts/[id]` - Delete post
- [ ] `POST /api/upload` - Handle image upload to `/public/uploads`

### Phase 3: Admin Authentication
- [ ] Create simple password gate component
- [ ] Store password in `.env.local`
- [ ] Session management (localStorage or simple cookie)
- [ ] Protect admin routes

### Phase 4: Admin Dashboard UI
- [ ] Admin layout dengan sidebar
- [ ] Posts list page (table view dengan status, actions)
- [ ] Create new post page
- [ ] Edit post page
- [ ] Delete confirmation modal

### Phase 5: Rich Text Editor
- [ ] Install TipTap + extensions
- [ ] Basic formatting (bold, italic, heading 1-3, lists)
- [ ] Code blocks dengan syntax highlighting
- [ ] Image upload integration (drag-drop & button)
- [ ] Link insertion
- [ ] Auto-save to localStorage (draft recovery)

### Phase 6: Public Blog Pages
- [ ] Blog listing page (`/blog`)
  - Grid/list view toggle
  - Search bar (Fuse.js)
  - Tag filters
  - Pagination atau infinite scroll
- [ ] Individual post page (`/blog/[slug]`)
  - Render HTML content
  - Cover image
  - Publication date
  - Tags
  - Share buttons (optional)
  - Prev/Next navigation

### Phase 7: Search Implementation
- [ ] Generate search index saat build time
- [ ] Include: title, excerpt, tags, content (optional)
- [ ] Client-side search dengan Fuse.js
- [ ] Search result highlighting
- [ ] Debounced search input

### Phase 8: Polish & Optimization
- [ ] SEO meta tags (title, description, OG image)
- [ ] Syntax highlighting untuk code blocks
- [ ] Responsive design
- [ ] Loading states
- [ ] Error handling
- [ ] Image optimization (Next.js Image component)

## Environment Variables

```env
# .env.local
ADMIN_PASSWORD=your-secure-password-here
DATABASE_URL=./sqlite.db
NEXT_PUBLIC_SITE_URL=https://airu.dev
```

## Dependencies to Install

```bash
# Database
npm install drizzle-orm better-sqlite3
npm install -D drizzle-kit @types/better-sqlite3

# Rich Text Editor
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image
npm install @tiptap/extension-link @tiptap/extension-code-block-lowlight

# Search
npm install fuse.js

# Syntax Highlighting (optional)
npm install lowlight

# Utilities
npm install uuid
npm install -D @types/uuid
```

## Key Features Summary

### Admin Dashboard
- 🔐 Simple password protection
- 📝 Rich text editor (TipTap)
- 🖼️ Drag-drop image upload
- 🏷️ Tags support
- 💾 Draft/Published status
- 🔗 Auto-generated slugs (editable)

### Public Blog
- 🔍 Client-side search
- 🏷️ Tag filtering
- 📱 Responsive layout
- ⚡ Static generation untuk performa
- 🎨 Syntax highlighting

### Technical Decisions
- **SQLite**: File-based, no separate DB server needed
- **Client-side search**: Cukup untuk <100 posts, instant results
- **VPS image storage**: Semua data di 1 tempat, simple backup
- **Static generation**: SEO-friendly, cepat, scaleable

## Future Enhancements (Optional)
- [ ] Newsletter subscription
- [ ] Post analytics (views counter)
- [ ] Comments system (Giscus atau custom)
- [ ] RSS feed
- [ ] Sitemap.xml
- [ ] Related posts
- [ ] Reading time estimation
- [ ] Dark mode untuk blog posts
- [ ] Table of contents (TOC)
- [ ] Full-text search dengan Meilisearch/Algolia (kalo posts >100)

## Notes
- Images disimpan di `/public/uploads/` dengan struktur folder by date (e.g., `/uploads/2025/02/image.jpg`)
- Slug harus unique, auto-generated dari title tapi bisa diedit manual
- Content di-save sebagai HTML string dari TipTap
- Excerpt bisa auto-generate (first 150 chars) atau manual input
- Auto-save draft ke localStorage untuk prevent data loss

## Deployment Checklist
- [ ] Setup SQLite database di VPS
- [ ] Create `/public/uploads` folder dengan proper permissions
- [ ] Setup environment variables
- [ ] Test image upload functionality
- [ ] Test all CRUD operations
- [ ] Verify search functionality
- [ ] Check responsive design
- [ ] Validate SEO meta tags

---

Created: 2026-02-03
Status: Concept/Planning
Priority: Medium
