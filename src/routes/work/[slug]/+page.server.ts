import { error } from '@sveltejs/kit'
import { renderBody } from '$lib/markdown'
import type { EntryGenerator, PageServerLoad } from './$types'
import type { Project } from '../../+page.server'

const modules = import.meta.glob('../../../content/projects/*.json', { eager: true })

const bySlug = new Map<string, Project>()
const ordered: Project[] = []

for (const [path, m] of Object.entries(modules)) {
	const slug = path.split('/').pop()!.replace(/\.json$/, '')
	const project: Project = { ...((m as any).default ?? m), slug }
	bySlug.set(slug, project)
}

ordered.push(
	...Array.from(bySlug.values())
		.filter((p) => p.publish !== false)
		.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
)

export const entries: EntryGenerator = () => ordered.map((p) => ({ slug: p.slug }))

export const load: PageServerLoad = async ({ params }) => {
	const project = bySlug.get(params.slug)
	if (!project || project.publish === false) {
		throw error(404, 'Project not found')
	}

	const bodyHtml = renderBody(project.body ?? '')

	const idx = ordered.findIndex((p) => p.slug === project.slug)
	const prev = idx > 0 ? ordered[idx - 1] : null
	const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null

	return {
		project,
		bodyHtml,
		prev: prev ? { slug: prev.slug, title: prev.title } : null,
		next: next ? { slug: next.slug, title: next.title } : null
	}
}
