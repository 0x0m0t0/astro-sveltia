import type { PageServerLoad } from './$types'
import now from '../../content/now/now.json'
import { env } from '$env/dynamic/private'

export const load: PageServerLoad = async () => {
	let movies: any[] = []
	try {
		const apiUri = env.APIURI
		const apiToken = env.APITOKEN
		if (apiUri && apiToken) {
			console.log('hello')
			const res = await fetch(apiUri, {
				headers: { Authorization: `Bearer ${apiToken}` }
			})
			console.log(res.status)
			if (res.ok) {
				const json = await res.json()
				movies = (json.response || []).slice(0, 6)
			
			}
		}
	} catch (e) {
		console.error('Failed to fetch movies:', e)
	}

	return {
		activities: now.activities,
		movies,
	}
}
