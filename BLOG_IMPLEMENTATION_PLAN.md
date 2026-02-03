# Blog Implementation Plan - Airu Portfolio (Payload CMS)

## Overview
Full-stack blog system menggunakan **Payload CMS** - headless CMS native Next.js dengan admin dashboard built-in, authentication, dan rich text editor.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| CMS | Payload CMS 3.x |
| Database | PostgreSQL atau MongoDB |
| Authentication | Payload built-in auth |
| Rich Text Editor | Lexical (Payload default) |
| Image Storage | VPS `/public/media` (Payload local storage) |
| Search | Client-side Fuse.js |
| Styling | Tailwind CSS v4 |

## Why Payload CMS?

✅ **Native Next.js Integration** - Built on top of Next.js, bukan external service
✅ **Self-hosted** - Perfect untuk VPS, full control atas data
✅ **TypeScript-first** - Type-safe dari database sampai frontend
✅ **Admin UI built-in** - No need to build custom admin dashboard
✅ **Rich text editor** - Lexical editor (modern, extensible)
✅ **File upload & media management** - Built-in with image optimization
✅ **Authentication & access control** - Sudah ada, tinggal config
✅ **GraphQL & REST API** - Auto-generated dari schema
✅ **Extensible** - Plugin system, custom fields, hooks

## Database Schema (Collections)

### Posts Collection
```typescript
{
  id: string
  title: string
  slug: string (auto-generated, unique)
  excerpt: string (optional)
  content: RichText (Lexical JSON)
  status: 'draft' | 'published'
  coverImage: relationship to Media
  tags: string[] (select field)
  author: relationship to Users
  publishedAt: Date
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### Media Collection (built-in)
```typescript
{
  id: string
  filename: string
  mimeType: string
  filesize: number
  width: number (for images)
  height: number (for images)
  url: string
  alt: string
  createdAt: Date
  updatedAt: Date
}
```

### Users Collection (built-in)
```typescript
{
  id: string
  email: string
  password: string (hashed)
  role: 'admin' | 'editor'
  createdAt: Date
  updatedAt: Date
}
```

## Project Structure

```
/src
  /app/
    /(payload)/
      /admin/[[...segments]]/
        - page.tsx          # Payload admin UI
    
    /blog/
      - page.tsx            # Blog listing + search
      /[slug]/
        - page.tsx          # Individual post
    
    /api/
      /[...payload]/
        - route.ts          # Payload API routes
  
  /collections/
    - Posts.ts              # Posts collection config
    - Media.ts              # Media collection config (optional customization)
    - Users.ts              # Users collection config (optional customization)
  
  /components/
    /blog/
      - PostCard.tsx
      - PostContent.tsx
      - SearchBar.tsx
  
  /lib/
    - payload.ts            # Payload client utilities
    - search.ts             # Fuse.js search utilities
  
/payload.config.ts          # Main Payload config
/next.config.ts             # Next.js config (with Payload)

/public
  /media/                   # Uploaded files storage
```

## Implementation Phases

### Phase 1: Payload CMS Setup
- [ ] Install Payload CMS and dependencies
- [ ] Setup PostgreSQL/MongoDB database (PostgreSQL recommended)
- [ ] Configure `payload.config.ts`
- [ ] Setup admin user (initial seed)
- [ ] Test Payload admin access at `/admin`

### Phase 2: Collections Configuration
- [ ] Define Posts collection schema (`/collections/Posts.ts`)
- [ ] Configure Media collection (image upload settings)
- [ ] Setup Users collection with roles
- [ ] Configure access control (who can create/edit/delete)
- [ ] Add custom fields (tags, slug auto-generation)

### Phase 3: Admin Dashboard Customization
- [ ] Customize Payload admin UI branding (optional)
- [ ] Configure rich text editor (Lexical) features
- [ ] Setup media upload constraints (size, format)
- [ ] Add custom validation rules
- [ ] Configure slug auto-generation from title

### Phase 4: API Integration
- [ ] Setup Payload REST API endpoints
- [ ] Create utility functions for fetching posts
- [ ] Test API queries (get all posts, get by slug, etc.)
- [ ] Setup API authentication (if needed for protected routes)
- [ ] Configure CORS (if needed)

### Phase 5: Public Blog Pages
- [ ] Blog listing page (`/blog`)
  - Fetch published posts from Payload API
  - Grid layout with post cards
  - Search bar (Fuse.js)
  - Tag filters
  - Pagination
- [ ] Individual post page (`/blog/[slug]`)
  - Fetch post by slug
  - Render Lexical rich text content
  - Display cover image (optimized)
  - Show publication date, tags
  - SEO meta tags
  - Prev/Next navigation

### Phase 6: Search Implementation
- [ ] Generate search index from Payload API
- [ ] Client-side search with Fuse.js
- [ ] Search by title, excerpt, tags, content
- [ ] Debounced search input
- [ ] Search result highlighting

### Phase 7: Polish & Optimization
- [ ] SEO meta tags (dynamic per post)
- [ ] Open Graph images
- [ ] Image optimization (Next.js Image component)
- [ ] Responsive design
- [ ] Loading states & skeletons
- [ ] Error handling (404, etc.)
- [ ] RSS feed generation
- [ ] Sitemap.xml generation

## Environment Variables

```env
# .env

# Payload CMS
PAYLOAD_SECRET=your-super-secret-key-here
DATABASE_URI=postgresql://user:password@localhost:5432/airu_blog
# or for MongoDB: mongodb://localhost:27017/airu_blog

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
# Production: https://airu.dev

# File Upload
PAYLOAD_PUBLIC_STORAGE_PATH=/media
```

## Dependencies to Install

```bash
# Payload CMS
npm install payload @payloadcms/db-postgres @payloadcms/richtext-lexical
# or for MongoDB: @payloadcms/db-mongodb

# Additional dependencies
npm install @payloadcms/plugin-cloud-storage  # optional, for S3/Cloudinary
npm install sharp  # Image optimization (required by Payload)

# Search
npm install fuse.js

# Database client
npm install pg  # for PostgreSQL
# or: npm install mongodb  # for MongoDB
```

## Key Features Summary

### Admin Dashboard (Payload Built-in)
- 🔐 **Authentication** - Email/password login, role-based access
- 📝 **Rich text editor** - Lexical with formatting, links, images, code blocks
- 🖼️ **Media library** - Drag-drop upload, image preview, alt text
- 🏷️ **Tags & categories** - Multi-select fields
- 💾 **Draft/Published status** - Built-in workflow
- 🔗 **Auto-generated slugs** - From title with collision handling
- 📊 **Dashboard** - Overview of posts, media, users
- 🔍 **Admin search** - Built-in search across collections

### Public Blog
- 🔍 Client-side search
- 🏷️ Tag filtering
- 📱 Responsive layout
- ⚡ Static/ISR generation untuk performa
- 🎨 Syntax highlighting (via Lexical)
- 🖼️ Optimized images

### Technical Decisions
- **Payload CMS**: All-in-one solution, reduces custom code
- **PostgreSQL**: Robust, scalable, familiar SQL
- **Lexical editor**: Modern, extensible, better than TipTap for CMS use case
- **VPS storage**: `/public/media` folder, easy backup
- **REST API**: Simple, cacheable, no GraphQL complexity needed

## Payload Config Example

```typescript
// payload.config.ts
import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Posts } from './src/collections/Posts'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [Posts, Media, Users],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: './src/payload-types.ts',
  },
})
```

## Posts Collection Example

```typescript
// src/collections/Posts.ts
import { CollectionConfig } from 'payload/types'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Public can read published posts
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Tech', value: 'tech' },
        { label: 'Tutorial', value: 'tutorial' },
        { label: 'Personal', value: 'personal' },
        { label: 'Travel', value: 'travel' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
```

## Future Enhancements (Optional)
- [ ] Newsletter subscription (Payload plugin)
- [ ] Post analytics (views counter)
- [ ] Comments system (Giscus integration)
- [ ] RSS feed auto-generation
- [ ] Related posts recommendation
- [ ] Reading time estimation
- [ ] Table of contents (TOC) generation
- [ ] Full-text search with PostgreSQL FTS atau Algolia
- [ ] Multi-language support (Payload i18n)
- [ ] Scheduled publishing
- [ ] Post revisions (Payload versions plugin)
- [ ] Cloud storage (S3/Cloudinary plugin)

## Deployment Checklist (VPS)

### Database Setup
- [ ] Install PostgreSQL on VPS
- [ ] Create database user and database
- [ ] Configure connection string in `.env`
- [ ] Test database connection

### Application Setup
- [ ] Clone repository to VPS
- [ ] Install dependencies (`npm install`)
- [ ] Setup environment variables
- [ ] Build Next.js app (`npm run build`)
- [ ] Setup PM2 or systemd for process management
- [ ] Configure Nginx reverse proxy

### Payload Setup
- [ ] Run Payload migrations (auto on first start)
- [ ] Create admin user via seed script atau manual
- [ ] Test admin access at `https://airu.dev/admin`
- [ ] Test file uploads and media library

### Storage Setup
- [ ] Create `/public/media` folder
- [ ] Set proper permissions (nginx/node user)
- [ ] Configure Nginx to serve static files from `/media`
- [ ] Test image uploads

### Production Checks
- [ ] Test all CRUD operations in admin
- [ ] Verify public blog pages render correctly
- [ ] Test search functionality
- [ ] Check responsive design
- [ ] Validate SEO meta tags
- [ ] Test image optimization
- [ ] Setup SSL certificate
- [ ] Configure backup strategy (database + media files)

## Migration from Current Plan

**Current:** TipTap + manual admin + SQLite
**New:** Payload CMS + built-in admin + PostgreSQL

**Benefits:**
- ✅ No need to build admin UI from scratch
- ✅ Authentication handled by Payload
- ✅ File upload built-in with image optimization
- ✅ Type-safe API with auto-generated types
- ✅ Better rich text editor (Lexical)
- ✅ Extensible with plugins
- ✅ Better long-term maintenance

**Trade-offs:**
- Slightly larger bundle size
- More opinionated architecture
- Learning Payload-specific concepts

---

**Updated:** 2026-02-03
**Status:** Concept/Planning - Payload CMS Approach
**Priority:** High
**Estimated Time:** 2-3 days for full implementation
