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
