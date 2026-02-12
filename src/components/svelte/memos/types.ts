export interface Attachment {
	name: string
	filename: string
	type?: string
}

export interface Location {
	placeholder?: string
	latitude?: number
	longitude?: number
}

export interface Memo {
	uid: string
	name: string
	content: string
	visibility: string
	createTime: string
	updateTime: string
	displayTime: string
	attachments?: Attachment[]
	tags?: string[]
	location?: Location
	pinned?: boolean
}

export interface Pin {
	coords: [number, number]
	title: string
	description: string
	image: string | null
	memoId: string
}
