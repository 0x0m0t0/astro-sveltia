export function onRequest(context) {
	return new Response('Hello from Cloudflare Function', {
		headers: { 'Content-Type': 'text/plain' }
	})
}
