import type { RequestHandler } from './$types'
import { env } from '$env/dynamic/private'

export const POST: RequestHandler = async ({ request }) => {
	const apiKey = env.RESEND_API_KEY
	const senderEmail = env.SENDER_EMAIL
	const recipientEmail = env.RECIPIENT_EMAIL

	try {
		const { name, email, message } = await request.json()

		if (!name || !email || !message) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		if (!apiKey || !senderEmail || !recipientEmail) {
			const missing = [
				!apiKey && 'RESEND_API_KEY',
				!senderEmail && 'SENDER_EMAIL',
				!recipientEmail && 'RECIPIENT_EMAIL'
			].filter(Boolean)
			console.error('Missing env vars:', missing)
			return new Response(JSON.stringify({ error: 'Contact API not configured', missing }), {
				status: 503,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: senderEmail,
				to: recipientEmail,
				reply_to: email,
				subject: `Contact form submission from ${name}`,
				html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
			})
		})

		if (!res.ok) {
			console.error('Resend error:', await res.text())
			return new Response(JSON.stringify({ error: 'Failed to send email' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	} catch (err) {
		console.error('Contact error:', err)
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		})
	}
}

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify({ message: 'Contact API ready' }), {
		headers: { 'Content-Type': 'application/json' }
	})
}
