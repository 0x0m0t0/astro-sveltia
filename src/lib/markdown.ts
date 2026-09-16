// Tiny renderer for project bodies — supports paragraphs and markdown links
// only: [text](url). Replaces `marked` (see work/[slug]/+page.server.ts).
// Output is consumed with {@html}, so all text is HTML-escaped first.

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

function anchor(text: string, url: string): string {
	// Only allow safe schemes / relative links — blocks javascript:, data:, etc.
	const href = /^(https?:|mailto:|\/|#)/i.test(url) ? url : '#'
	const external = /^https?:\/\//i.test(href)
	const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : ''
	return `<a href="${href}"${attrs}>${text}</a>`
}

export function renderBody(md: string): string {
	if (!md?.trim()) return ''
	return md
		.trim()
		.split(/\n{2,}/)
		.map((para) => {
			const html = escapeHtml(para)
				.replace(LINK, (_, text, url) => anchor(text, url))
				.replace(/\n/g, '<br>')
			return `<p>${html}</p>`
		})
		.join('\n')
}
