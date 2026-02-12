export const prerender = false
import type { APIRoute } from 'astro'

const SESSION_COOKIE = 'arena_auth'

export const GET: APIRoute = async ({ cookies, locals }) => {
	console.log('[Arena Protected] Starting request')

	try {
		const runtime = locals.runtime
		if (!runtime?.env) {
			console.error('[Arena Protected] Runtime env not available')
			return new Response(JSON.stringify({ error: 'Server configuration error' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		const { env } = runtime
		const arenaAccessToken = env.ARENA_ACCESS_TOKEN
		const privateChannelSlug = env.ARENA_PRIVATE_CHANNEL

		console.log('[Arena Protected] Access Token:', arenaAccessToken ? `SET (starts with ${arenaAccessToken.slice(0, 8)}...)` : 'NOT SET')
		console.log('[Arena Protected] Access Token length:', arenaAccessToken?.length)
		console.log('[Arena Protected] Private Channel:', privateChannelSlug || 'NOT SET')

		// Check if user is authenticated
		const session = cookies.get(SESSION_COOKIE)
		console.log('[Arena Protected] Session cookie:', session?.value ? 'PRESENT' : 'MISSING')

		if (!session?.value) {
			console.log('[Arena Protected] Unauthorized - no session')
			return new Response(JSON.stringify({ error: 'Unauthorized' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		if (!arenaAccessToken) {
			console.error('[Arena Protected] Access token not configured')
			return new Response(JSON.stringify({ error: 'Are.na access token not configured' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		if (!privateChannelSlug) {
			console.error('[Arena Protected] Private channel not configured')
			return new Response(JSON.stringify({ error: 'Private channel not configured' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		const url = `https://api.are.na/v2/channels/${privateChannelSlug}?per=100&access_token=${arenaAccessToken}`
		console.log('[Arena Protected] Fetching from:', url.replace(arenaAccessToken, '***'))

		const response = await fetch(url)

		console.log('[Arena Protected] Response status:', response.status)

		if (!response.ok) {
			const errorText = await response.text()
			console.error('[Arena Protected] Error response:', errorText)
			return new Response(
				JSON.stringify({
					error: 'Are.na API error',
					details: `${response.status} - ${errorText}`
				}),
				{
					status: response.status,
					headers: { 'Content-Type': 'application/json' }
				}
			)
		}

		const data = await response.json()
		// Filter out Channel blocks (nested channels) and add visibility marker
		const blocks = (data.contents || [])
			.filter((b: { class: string }) => b.class !== 'Channel')
			.map((b: object) => ({ ...b, visibility: 'private' }))

		console.log('[Arena Protected] Blocks count:', blocks.length)

		return new Response(JSON.stringify({ blocks }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	} catch (error) {
		console.error('[Arena Protected] Error:', error)
		return new Response(
			JSON.stringify({
				error: 'Failed to fetch private blocks',
				details: error instanceof Error ? error.message : String(error)
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	}
}
