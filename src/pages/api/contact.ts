import { Resend } from 'resend'
export const prerender = false
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request, locals }) => {
	// Access environment variables from runtime
	const { env } = locals.runtime
	const apiKey = env.RESEND_API_KEY
	const senderEmail = env.SENDER_EMAIL
	const recipientEmail = env.RECIPIENT_EMAIL

	// Parse request data
	const formData = await request.json()
	const { name, email, message } = formData

	console.log('Form submission:', { name, email, message })

	try {
		const resend = new Resend(apiKey)
		await resend.emails.send({
			from: senderEmail,
			to: recipientEmail,
			replyTo: email,
			subject: `Contact form submission from ${name}`,
			html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
		})

		return new Response(JSON.stringify({ success: true, message: 'Form received' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	} catch (error) {
		console.error('Error:', error)
		return new Response(JSON.stringify({ success: false, error: 'Failed to process form' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		})
	}
}

// For testing - access via GET request
export const GET: APIRoute = async () => {
	return new Response(JSON.stringify({ message: 'Contact API is ready' }), {
		headers: { 'Content-Type': 'application/json' }
	})
}
