export const prerender = false
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, locals }) => {
	const { env } = locals.runtime
	const memosApiUrl = env.MEMOS_API_URL
	const memosAccessToken = env.MEMOS_ACCESS_TOKEN

	if (!memosApiUrl) {
		return new Response('Memos API URL not configured', { status: 500 })
	}

	const filePath = params.path
	if (!filePath) {
		return new Response('File path required', { status: 400 })
	}

	const url = `${memosApiUrl}/file/${filePath}`

	try {
		const headers: HeadersInit = {}
		if (memosAccessToken) {
			headers['Authorization'] = `Bearer ${memosAccessToken}`
		}

		const response = await fetch(url, { headers })

		if (!response.ok) {
			console.error(`[Memos File Proxy] Error fetching ${filePath}: ${response.status}`)
			return new Response('File not found', { status: response.status })
		}

		const contentType = response.headers.get('content-type') || 'application/octet-stream'
		const buffer = await response.arrayBuffer()

		return new Response(buffer, {
			status: 200,
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=31536000, immutable'
			}
		})
	} catch (error) {
		console.error('[Memos File Proxy] Error:', error)
		return new Response('Failed to fetch file', { status: 500 })
	}
}
