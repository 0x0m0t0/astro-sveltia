import type { PageServerLoad } from './$types'
import nowRaw from '../../content/now/now.md?raw'
import matter from 'gray-matter'
import { env } from '$env/dynamic/private'

export const load: PageServerLoad = async () => {
	const { data } = matter(nowRaw)

	let latestMemo: any = null
	try {
		const memosApiUrl = env.MEMOS_API_URL || env.PUBLIC_MEMOS_API_URL
		if (memosApiUrl) {
			const res = await fetch(
				`${memosApiUrl}/api/v1/memos?filter=${encodeURIComponent('visibility == "PUBLIC"')}&pageSize=1`
			)
			if (res.ok) {
				const json = await res.json()
				if (json.memos?.length) latestMemo = json.memos[0]
			}
		}
	} catch (e) {
		console.error('Failed to fetch latest memo:', e)
	}

	let movies: any[] = []
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
			}
		}
	} catch (e) {
		console.error('Failed to fetch movies:', e)
	}

	return {
		activities: (data.activities as { activity: string }[]) || [],
		latestMemo,
		movies,
		memosApiUrl: env.MEMOS_API_URL || env.PUBLIC_MEMOS_API_URL || ''
	}
}
