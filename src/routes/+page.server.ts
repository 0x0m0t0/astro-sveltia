import type { PageServerLoad } from './$types'

interface ProjectImage {
	image: string
	caption?: string
	alt: string
}

export interface Project {
	slug: string
	publish?: boolean
	order?: number
	title: string
	description: string
	date?: string
	tags?: string[]
	images: ProjectImage[]
	link?: string
	client?: string
	role?: string
	year?: string
	services?: string[]
	credits?: string
	body?: string
}

function slugFromPath(path: string): string {
	return path.split('/').pop()!.replace(/\.json$/, '')
}

export const load: PageServerLoad = async () => {
	const modules = import.meta.glob('../content/projects/*.json', { eager: true })
	const projects: Project[] = Object.entries(modules).map(([path, m]) => ({
		...((m as any).default ?? m),
		slug: slugFromPath(path)
	}))
	const sorted = projects
		.filter((p) => p.publish !== false)
		.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
	const lcpImage = sorted[0]?.images[0]?.image ?? null
	return { projects: sorted, lcpImage }
}
