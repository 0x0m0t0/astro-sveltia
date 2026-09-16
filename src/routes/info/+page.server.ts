import type { PageServerLoad } from './$types'
import about from '../../content/about/about.json'

export const load: PageServerLoad = async () => {
	return {
		info: {
			links: about.links,
			services: about.services,
			body: about.body
		}
	}
}
