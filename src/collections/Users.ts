import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => {
      // Users can only update their own profile
      if (!user) return false
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => !!user,
  },
  fields: [],
}
