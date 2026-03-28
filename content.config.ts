import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        tags: z.array(z.string()).optional().default([]),
        date: z.string(),
      })
    })
  }
})
