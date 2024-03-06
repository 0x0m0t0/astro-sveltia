import { defineCollection, z } from 'astro:content'

const linkSchema = z.object({
	label: z.string(),
	url: z.string(),
	handle: z.string()
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
	about: aboutCollection
}

// fields:
// - { label: 'Title', name: 'title', widget: 'string' }
// - { label: 'Publish Date', name: 'date', widget: 'datetime' }
// - {
//     label: 'Author',
//     name: 'author',
//     widget: 'relation',
//     collection: 'authors',
//     search_fields: 'name',
//     value_field: 'name'
//   }
// - { label: 'Summary', name: 'summary', widget: 'text' }
// - {
//     label: 'Tags',
//     name: 'tags',
//     widget: 'list',
//     default: ['post'],
//     hint: 'Enter tags separated by a comma'
//   }
// - label: 'Image'
//   name: 'image'
//   widget: 'image'
//   hint: 'Upload an image for this post. You can also use an image URL.'
//   # Uncomment the lines below if you want to set a max file upload size e.g. 2MB
//   #media_library:
//   #config:
//   #max_file_size: 2048000 # maximum image file size in bytes
// - { label: 'Image Alt Text', name: 'imageAltText', widget: 'string' }
// - { label: 'Body', name: 'body', widget: 'markdown' }
