<script lang="ts">
	import type { Memo } from './types'
	import {
		extractTags,
		formatDate,
		getFileUrl,
		getAttachmentType,
		isImage,
		hasLocation,
		getMapUrl
	} from './utils'

	let {
		memo,
		selectedTags,
		onToggleTag,
		onOpenLightbox
	}: {
		memo: Memo
		selectedTags: string[]
		onToggleTag: (tag: string) => void
		onOpenLightbox: (images: { src: string; alt: string }[], index: number) => void
	} = $props()

	let copied = $state(false)

	function copyLocation() {
		if (!memo.location?.placeholder) return
		navigator.clipboard.writeText(memo.location.placeholder)
		copied = true
		setTimeout(() => (copied = false), 1500)
	}

	let tags = $derived(memo.tags || extractTags(memo.content))
	let images = $derived(
		(memo.attachments || []).filter(isImage).map((a) => ({
			src: getFileUrl(a.name, a.filename),
			alt: a.filename
		}))
	)
</script>

<article class="bg-white dark:bg-white/5 transition-colors duration-500 p-2 border-b border-darkSand/10 dark:border-darkText/10" data-memo-id={memo.name || memo.uid}>
	<p class="text-base leading-relaxed whitespace-pre-wrap">{memo.content}</p>

	{#if tags.length > 0}
		<div class="flex flex-wrap gap-2">
			{#each tags as tag}
				<button
					onclick={() => onToggleTag(tag)}
					class="text-xs px-2 py-0.5 rounded-full transition-colors {selectedTags.includes(tag)
						? 'bg-blue-500 text-white'
						: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800/50'}"
				>
					#{tag}
				</button>
			{/each}
		</div>
	{/if}

	{#if memo.attachments?.length}
		<div class="flex flex-wrap gap-4">
			{#each memo.attachments as attachment}
				{@const src = getFileUrl(attachment.name, attachment.filename)}
				{@const type = getAttachmentType(attachment)}

				{#if type === 'image'}
					{@const idx = images.findIndex((img) => img.src === src)}
					<button
						type="button"
						onclick={() => onOpenLightbox(images, idx)}
						class="block rounded overflow-hidden hover:opacity-90 transition-opacity"
					>
						<img
							{src}
							alt={attachment.filename}
							class="{images.length === 1 ? '' : 'max-h-48'} rounded object-cover"
						/>
					</button>
				{:else if type === 'video'}
					<video {src} controls class="max-h-64 rounded" preload="metadata">
						<track kind="captions" />
					</video>
				{:else}
					<a
						href={src}
						download={attachment.filename}
						class="inline-flex items-center gap-2 text-sm px-3 py-2 rounded bg-darkSand/10 hover:bg-darkSand/20 dark:bg-darkText/10 dark:hover:bg-darkText/20"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
							/>
						</svg>
						{attachment.filename}
					</a>
				{/if}
			{/each}
		</div>
	{/if}

	<div class="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
		<time class="mt-2">{formatDate(memo.displayTime || memo.createTime)}</time>

		{#if hasLocation(memo) && memo.location}
			<span class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				{#if memo.location.placeholder}
					<p>{memo.location.placeholder}</p>
					<button
						type="button"
						onclick={copyLocation}
						class="hover:text-darkSand dark:hover:text-darkText transition-colors"
						aria-label="Copy address"
					>
						{#if copied}
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M16 4h2a2 2 0 0 1 2 2v4"/><path d="M21 14H11"/><path d="m15 10-4 4 4 4"/></svg>
						{/if}
					</button>
				{/if}
			</span>
		{/if}
	</div>
</article>
