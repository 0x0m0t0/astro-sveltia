import type { PageServerLoad } from './$types'

interface ProjectImage {
	image: string
	caption?: string
	alt: string
}

export interface Project {
	publish?: boolean
	order?: number
	title: string
	description: string
	date?: string
	tags?: string[]
	images: ProjectImage[]
	link?: string
	body?: string
}

export const load: PageServerLoad = async () => {
	const modules = import.meta.glob('../content/projects/*.json', { eager: true })
	const projects: Project[] = Object.values(modules).map((m: any) => m.default ?? m)
	const sorted = projects
		.filter((p) => p.publish !== false)
		.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
	return { projects: sorted }
}
