import type { PageServerLoad } from './$types'
import nowRaw from '../../content/now/now.md?raw'
import matter from 'gray-matter'
import { env } from '$env/dynamic/private'

export const load: PageServerLoad = async () => {
	const { data } = matter(nowRaw)


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
				console.log('sfds',json.response)
				movies = (json.response || []).slice(0, 6)
				console.log('movsfies',movies)
			}
		}
	} catch (e) {
		console.error('Failed to fetch movies:', e)
	}

	return {
		activities: (data.activities as { activity: string }[]) || [],
		movies,
	}
}
