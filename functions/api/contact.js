/**
 * Cloudflare Pages Function: POST /api/contact
 * Set env vars in Cloudflare Pages dashboard:
 *   RESEND_API_KEY, SENDER_EMAIL, RECIPIENT_EMAIL
 */
export async function onRequestPost({ request, env }) {
	try {
		const { name, email, message } = await request.json()

		if (!name || !email || !message) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: env.SENDER_EMAIL,
				to: env.RECIPIENT_EMAIL,
				reply_to: email,
				subject: `Contact form submission from ${name}`,
				html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
			})
		})

		if (!res.ok) {
			const err = await res.text()
			console.error('Resend error:', err)
			return new Response(JSON.stringify({ error: 'Failed to send email' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		return new Response(JSON.stringify({ success: true, message: 'Message sent' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	} catch (err) {
		console.error('Contact function error:', err)
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		})
	}
}

export async function onRequestGet() {
	return new Response(JSON.stringify({ message: 'Contact API ready' }), {
		headers: { 'Content-Type': 'application/json' }
	})
}
