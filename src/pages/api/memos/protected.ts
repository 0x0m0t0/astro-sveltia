export const prerender = false
import type { APIRoute } from 'astro'

const SESSION_COOKIE = 'memos_auth'

export const GET: APIRoute = async ({ cookies, locals }) => {
	console.log('[Protected Memos] Starting request')

	const { env } = locals.runtime
	const memosApiUrl = env.MEMOS_API_URL
	const memosAccessToken = env.MEMOS_ACCESS_TOKEN

	console.log(
		'[Protected Memos] API URL:',
		memosApiUrl ? `${memosApiUrl.slice(0, 30)}...` : 'NOT SET'
	)
	console.log('[Protected Memos] Access Token:', memosAccessToken ? 'SET' : 'NOT SET')

	// Check if user is authenticated
	const session = cookies.get(SESSION_COOKIE)
	console.log('[Protected Memos] Session cookie:', session?.value ? 'PRESENT' : 'MISSING')

	if (!session?.value) {
		console.log('[Protected Memos] Unauthorized - no session')
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	if (!memosApiUrl) {
		console.error('[Protected Memos] API URL not configured')
		return new Response(JSON.stringify({ error: 'Memos API URL not configured' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	if (!memosAccessToken) {
		console.error('[Protected Memos] Access token not configured')
		return new Response(JSON.stringify({ error: 'Memos access token not configured' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	const url = `${memosApiUrl}/api/v1/memos?filter=${encodeURIComponent('visibility == "PROTECTED"')}`
	console.log('[Protected Memos] Fetching from:', url)

	try {
		// Fetch protected (PRIVATE) memos using the access token
		const headers: HeadersInit = {}
		if (memosAccessToken) {
			headers['Authorization'] = `Bearer ${memosAccessToken}`
		}
		console.log('[Protected Memos] Request headers:', {
			Authorization: memosAccessToken ? 'Bearer ***' : 'NONE'
		})

		const response = await fetch(url, { headers })

		console.log('[Protected Memos] Response status:', response.status)

		if (!response.ok) {
			const errorText = await response.text()
			console.error('[Protected Memos] Error response:', errorText)
			throw new Error(`Memos API error: ${response.status} - ${errorText}`)
		}

		const data = await response.json()
		console.log('[Protected Memos] Memos count:', data.memos?.length ?? 0)

		return new Response(JSON.stringify({ memos: data.memos || [] }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	} catch (error) {
		console.error('[Protected Memos] Fetch error:', error)
		return new Response(
			JSON.stringify({
				error: 'Failed to fetch protected memos',
				details: error instanceof Error ? error.message : String(error)
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	}
}
