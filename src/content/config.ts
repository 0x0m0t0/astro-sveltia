import { defineCollection, z } from 'astro:content'

const linkSchema = z.object({
	label: z.string(),
	url: z.string(),
	handle: z.string()
})
const activitiesSchema = z.object({
	activity: z.string()
})

const postsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.string(),
		author: z.string(),
		summary: z.string(),
		tags: z.array(z.string()),
		image: z.string(),
		imageAltText: z.string()
		// description: z.string(),
		// isPublish: z.boolean(),
		// isDraft: z.boolean().default(false)
	})
})

const authorsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		image: z.string()
	})
})

const nowCollection = defineCollection({
	type: 'content',
	schema: z.object({
		activities: z.array(activitiesSchema)
	})
})

const aboutCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		links: z.array(linkSchema),
		url: z.string()
	})
})

export const collections = {
	posts: postsCollection,
	about: aboutCollection,
	now: nowCollection,
	authors: authorsCollection
}
