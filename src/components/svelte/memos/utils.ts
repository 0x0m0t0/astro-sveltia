import type { Attachment, Location, Memo } from './types'

export function getFileUrl(name: string, filename: string): string {
	return `/api/memos/file/${name}/${filename}`
}

export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})
}

export function extractTags(content: string): string[] {
	const matches = content.match(/#([a-zA-Z0-9_\u4e00-\u9fa5]+)/g)
	return matches ? [...new Set(matches.map((t) => t.slice(1)))] : []
}

export function isImage(attachment: Attachment): boolean {
	const exts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp']
	return exts.some((ext) => attachment.filename.toLowerCase().endsWith(ext))
}

export function isVideo(attachment: Attachment): boolean {
	const exts = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
	return exts.some((ext) => attachment.filename.toLowerCase().endsWith(ext))
}

export function getAttachmentType(attachment: Attachment): 'image' | 'video' | 'other' {
	if (isImage(attachment)) return 'image'
	if (isVideo(attachment)) return 'video'
	return 'other'
}

export function hasLocation(memo: Memo): boolean {
	return !!(
		memo.location &&
		(memo.location.placeholder || (memo.location.latitude && memo.location.longitude))
	)
}

export function getMapUrl(location: Location): string {
	if (location.latitude && location.longitude) {
		return `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=15/${location.latitude}/${location.longitude}`
	}
	return ''
}
