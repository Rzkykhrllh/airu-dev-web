import config from '@payload-config'
import { getPayload } from 'payload'

export async function getPosts() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
    depth: 1, // populate coverImage (media relation)
  })

  return docs
}

export async function getPostBySlug(slug: string) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    depth: 1,
    limit: 1,
  })

  return docs[0] || null
}

export async function getAdjacentPosts(publishedAt: string) {
  const payload = await getPayload({ config })

  // Previous post (older)
  const { docs: prevDocs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { publishedAt: { less_than: publishedAt } },
      ],
    },
    sort: '-publishedAt',
    limit: 1,
    depth: 0,
  })

  // Next post (newer)
  const { docs: nextDocs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { status: { equals: 'published' } },
        { publishedAt: { greater_than: publishedAt } },
      ],
    },
    sort: 'publishedAt',
    limit: 1,
    depth: 0,
  })

  return {
    prev: prevDocs[0] || null,
    next: nextDocs[0] || null,
  }
}
