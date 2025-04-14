import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const linkSchema = z.object({
	label: z.string(),
	url: z.string(),
	handle: z.string()
})
const activitiesSchema = z.object({
	activity: z.string()
})

const projectSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.string().optional(),
	tags: z.array(z.string()).optional(),
	images: z.array(
		z.object({
			image: z.string(),
			caption: z.string().optional(),
			alt: z.string()
		})
	),
	body: z.string().optional()
})

const projectsCollection = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
	schema: projectSchema
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
	about: aboutCollection,
	now: nowCollection,
	authors: authorsCollection,
	projects: projectsCollection
}
