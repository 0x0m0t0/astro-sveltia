export const prerender = false
import type { APIRoute } from 'astro'

// Simple session storage using a cookie
const SESSION_COOKIE = 'memos_auth'
const SESSION_MAX_AGE = 60 * 60 * 24 // 24 hours

export const POST: APIRoute = async ({ request, cookies, locals, url }) => {
	console.log('[Auth] Login attempt started')

	const { env } = locals.runtime
	const correctPassword = env.MEMOS_PASSWORD
	const isSecure = url.protocol === 'https:'

	console.log('[Auth] MEMOS_PASSWORD configured:', correctPassword ? 'YES' : 'NO')
	console.log('[Auth] Secure context:', isSecure)

	if (!correctPassword) {
		console.error('[Auth] Password not configured in environment')
		return new Response(
			JSON.stringify({ success: false, message: 'Password not configured' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		)
	}

	try {
		const body = await request.json()
		const { password } = body
		console.log('[Auth] Password received:', password ? 'YES' : 'NO')

		if (password === correctPassword) {
			console.log('[Auth] Password matches - creating session')
			const sessionToken = crypto.randomUUID()

			cookies.set(SESSION_COOKIE, sessionToken, {
				path: '/',
				httpOnly: true,
				secure: isSecure,
				sameSite: isSecure ? 'strict' : 'lax',
				maxAge: SESSION_MAX_AGE
			})

			console.log('[Auth] Session cookie set successfully')
			return new Response(
				JSON.stringify({ success: true }),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			)
		}

		console.log('[Auth] Password does not match')
		return new Response(
			JSON.stringify({ success: false, message: 'Invalid password' }),
			{ status: 401, headers: { 'Content-Type': 'application/json' } }
		)
	} catch (error) {
		console.error('[Auth] Error during authentication:', error)
		return new Response(
			JSON.stringify({ success: false, message: 'Authentication failed', details: String(error) }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		)
	}
}

// Check auth status
export const GET: APIRoute = async ({ cookies }) => {
	const session = cookies.get(SESSION_COOKIE)
	const isAuthenticated = !!session?.value
	console.log('[Auth] Status check - authenticated:', isAuthenticated)

	return new Response(
		JSON.stringify({ authenticated: isAuthenticated }),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	)
}

// Logout
export const DELETE: APIRoute = async ({ cookies }) => {
	console.log('[Auth] Logout requested')
	cookies.delete(SESSION_COOKIE, { path: '/' })
	console.log('[Auth] Session cookie deleted')

	return new Response(
		JSON.stringify({ success: true }),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	)
}
