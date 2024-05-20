export const wrapLinkIfHttp = (str: string) => {
	if (str.startsWith('http')) {
		return `<a href="${str}">${str}</a>`
	}
	return str
}
