// @ts-nocheck
import type { PageServerLoad } from './$types'
import aboutRaw from '../../content/about/about.md?raw'
import matter from 'gray-matter'

export const load = async () => {
	const { data, content } = matter(aboutRaw)
	return {
		info: {
			links: (data.links as { label: string; url: string; handle: string }[]) || [],
			services: (data.services as string[]) || [],
			body: content.trim()
		}
	}
}
;null as any as PageServerLoad;