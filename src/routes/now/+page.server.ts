import type { PageServerLoad } from './$types'
import now from '../../content/now/now.json'
import { env } from '$env/dynamic/private'

export interface Movie {
	title: string
	year?: string
	link?: string
	poster?: string
	stars?: string
	watchedOn: string
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Rendered per request, but let the edge serve a cached copy for an hour
	// so every visitor doesn't trigger an upstream fetch.
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
	})

	let movies: Movie[] = []
	try {
		const apiUri = env.APIURI
		const apiToken = env.APITOKEN
		if (apiUri && apiToken) {
			const res = await fetch(apiUri, {
				headers: { Authorization: `Bearer ${apiToken}` }
			})
			if (res.ok) {
				const json = await res.json()
				movies = (json.response || []).slice(0, 6)
			} else {
				console.error('Movies API returned', res.status)
			}
		}
	} catch (e) {
		console.error('Failed to fetch movies:', e)
	}

	return {
		activities: now.activities,
		movies
	}
}
