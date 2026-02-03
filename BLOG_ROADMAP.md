# Blog Feature Roadmap - Payload CMS

## Project Timeline Overview
**Estimated Total Time:** 2-3 days (16-24 hours)
**Branch:** `blog`
**Target Completion:** TBD

---

## Milestone 1: Environment & Database Setup (2-3 hours)

### Tasks
- [ ] Install Payload CMS dependencies
  ```bash
  npm install payload @payloadcms/db-postgres @payloadcms/richtext-lexical sharp
  npm install pg
  ```
- [ ] Setup PostgreSQL on VPS
  - Create database user: `airu_blog_user`
  - Create database: `airu_blog_db`
  - Test connection
- [ ] Configure environment variables (`.env`)
  - `PAYLOAD_SECRET`
  - `DATABASE_URI`
  - `NEXT_PUBLIC_SERVER_URL`
- [ ] Create `payload.config.ts`
  - Basic config
  - Database adapter
  - Admin user setup
- [ ] Update `next.config.ts` for Payload
- [ ] Test Payload server startup

**Deliverables:**
- ✅ Payload CMS installed and running
- ✅ PostgreSQL database connected
- ✅ Admin UI accessible at `/admin`

**Blockers/Risks:**
- PostgreSQL installation on VPS
- Database connection issues

---

## Milestone 2: Collections Configuration (3-4 hours)

### Tasks
- [ ] Create Posts collection (`/src/collections/Posts.ts`)
  - Define schema (title, slug, content, excerpt, coverImage, tags, status, publishedAt)
  - Setup access control (public read published, admin full access)
  - Configure slug auto-generation hook
  - Add field validations
- [ ] Customize Media collection (optional)
  - Image size constraints
  - Allowed formats (jpg, png, webp)
  - Alt text requirement
- [ ] Customize Users collection (optional)
  - Admin role setup
  - Email validation
- [ ] Create initial admin user (seed script)
- [ ] Test collection operations in admin UI
  - Create draft post
  - Upload image
  - Publish post
  - Edit/delete post

**Deliverables:**
- ✅ Posts collection fully configured
- ✅ Media uploads working
- ✅ Admin user created and can login
- ✅ CRUD operations work in admin

**Blockers/Risks:**
- Understanding Payload collection API
- File upload permissions on VPS

---

## Milestone 3: Public Blog Listing Page (3-4 hours)

### Tasks
- [ ] Update `/blog` page (replace coming soon)
  - Fetch published posts from Payload API
  - Create `PostCard` component
  - Grid layout (2 columns mobile, 3 desktop)
  - Show: cover image, title, excerpt, tags, date
- [ ] Implement pagination
  - 9 posts per page
  - Page navigation component
- [ ] Add search functionality
  - Search bar component
  - Client-side Fuse.js integration
  - Search by: title, excerpt, tags
  - Debounced input (300ms)
- [ ] Add tag filter
  - Show all unique tags
  - Filter posts by selected tag
  - Clear filter button
- [ ] Styling with Tailwind + theme colors
  - Use "joints" theme colors
  - Responsive design
  - Loading states (skeleton)

**Deliverables:**
- ✅ Blog listing page with posts grid
- ✅ Search functionality working
- ✅ Tag filtering working
- ✅ Pagination working
- ✅ Responsive design

**Blockers/Risks:**
- Payload API data fetching patterns
- Search index generation

---

## Milestone 4: Individual Post Page (2-3 hours)

### Tasks
- [ ] Create `/blog/[slug]/page.tsx`
  - Fetch post by slug from Payload API
  - Render Lexical rich text content
  - Display cover image (optimized with Next.js Image)
  - Show metadata (author, date, tags, reading time)
- [ ] Create `PostContent` component
  - Render Lexical JSON to HTML
  - Style headings, lists, code blocks
  - Image captions
  - Link styling
- [ ] Add navigation
  - Prev/Next post links
  - Back to blog list button
- [ ] SEO optimization
  - Dynamic meta tags (title, description, OG image)
  - Structured data (JSON-LD)
  - Canonical URL
- [ ] Add share buttons (optional)
  - Twitter, LinkedIn, Facebook
  - Copy link

**Deliverables:**
- ✅ Individual post page rendering correctly
- ✅ Rich text content styled properly
- ✅ SEO meta tags working
- ✅ Navigation working

**Blockers/Risks:**
- Lexical JSON rendering complexity
- Image optimization

---

## Milestone 5: Polish & Optimization (2-3 hours)

### Tasks
- [ ] Loading states & error handling
  - Skeleton loaders for blog list
  - 404 page for invalid slugs
  - Error boundaries
- [ ] Image optimization
  - Next.js Image component
  - Lazy loading
  - Responsive images
- [ ] Performance optimization
  - ISR (Incremental Static Regeneration)
  - Revalidate every 60 seconds
  - Static generation for published posts
- [ ] Responsive design review
  - Mobile (320px - 768px)
  - Tablet (768px - 1024px)
  - Desktop (1024px+)
- [ ] Accessibility
  - Alt text for images
  - Keyboard navigation
  - ARIA labels
- [ ] Testing
  - Create test post with various content types
  - Test all interactions (search, filter, pagination)
  - Cross-browser testing

**Deliverables:**
- ✅ All loading states handled
- ✅ Error pages working
- ✅ Performance optimized
- ✅ Fully responsive
- ✅ Accessible

**Blockers/Risks:**
- ISR configuration issues
- Performance bottlenecks

---

## Milestone 6: Deployment & Final Touches (2-3 hours)

### Tasks
- [ ] VPS deployment setup
  - Pull latest code from `blog` branch
  - Install dependencies
  - Run database migrations
  - Build Next.js app
  - Restart PM2/systemd service
- [ ] Nginx configuration
  - Serve `/media` static files
  - Proxy `/admin` to Next.js
  - SSL certificate check
- [ ] Create initial blog content
  - Write 2-3 sample posts
  - Add cover images
  - Publish posts
- [ ] Test in production
  - Admin access
  - Public blog pages
  - Search & filter
  - Image uploads
  - Mobile responsiveness
- [ ] Documentation
  - Update README with blog instructions
  - Admin user guide (how to create posts)
  - Backup strategy documentation

**Deliverables:**
- ✅ Blog deployed to production
- ✅ Initial content published
- ✅ All features working in production
- ✅ Documentation complete

**Blockers/Risks:**
- VPS resource constraints
- Nginx misconfiguration
- Database backup strategy

---

## Optional Enhancements (Future)

### Phase 7: Advanced Features
- [ ] RSS feed generation
- [ ] Sitemap.xml for SEO
- [ ] Reading time estimation
- [ ] Related posts recommendation
- [ ] Comments system (Giscus)
- [ ] Newsletter subscription
- [ ] Post analytics (view counter)
- [ ] Social share metadata preview
- [ ] Table of contents (TOC) for long posts
- [ ] Code syntax highlighting themes

---

## Development Checklist

### Before Starting
- [x] Switch to `blog` branch
- [x] Update implementation plan
- [ ] Backup current production database
- [ ] Prepare PostgreSQL credentials

### During Development
- [ ] Commit frequently with descriptive messages
- [ ] Test each milestone before moving to next
- [ ] Keep track of blockers and solutions
- [ ] Document any deviations from plan

### Before Merging to Main
- [ ] Code review (self-review)
- [ ] Test all features end-to-end
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit (axe DevTools)
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Update changelog
- [ ] Create PR with detailed description

### After Deployment
- [ ] Monitor error logs
- [ ] Check database performance
- [ ] Verify backup running
- [ ] Monitor VPS resources (CPU, RAM, disk)
- [ ] Test from different networks

---

## Resources & References

### Documentation
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Payload Next.js Integration](https://payloadcms.com/docs/getting-started/installation)
- [Lexical Editor](https://lexical.dev/docs/intro)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

### Useful Commands
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Payload generate types
npx payload generate:types

# Database migrations (if needed)
# Payload auto-migrates on startup
```

### Environment Variables Template
```env
# Payload
PAYLOAD_SECRET=your-32-char-secret-here
DATABASE_URI=postgresql://airu_blog_user:password@localhost:5432/airu_blog_db

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
# Production: https://airu.dev

# Optional
NODE_ENV=development
PORT=3000
```

---

## Progress Tracking

| Milestone | Status | Start Date | End Date | Notes |
|-----------|--------|------------|----------|-------|
| 1. Setup | 🔜 Not Started | - | - | - |
| 2. Collections | 🔜 Not Started | - | - | - |
| 3. Blog List | 🔜 Not Started | - | - | - |
| 4. Post Page | 🔜 Not Started | - | - | - |
| 5. Polish | 🔜 Not Started | - | - | - |
| 6. Deploy | 🔜 Not Started | - | - | - |

**Legend:**
- 🔜 Not Started
- 🚧 In Progress
- ✅ Completed
- ⏸️ Blocked
- ⚠️ Issues Found

---

**Last Updated:** 2026-02-03
**Next Action:** Start Milestone 1 - Environment & Database Setup
