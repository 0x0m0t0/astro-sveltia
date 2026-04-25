<script lang="ts">
	import type { Memo } from './types'
	import { extractTags, formatDate } from './utils'

	let {
		memo,
		selectedTags,
		onToggleTag
	}: {
		memo: Memo
		selectedTags: string[]
		onToggleTag: (tag: string) => void
	} = $props()

	let tags = $derived(memo.tags || extractTags(memo.content))
</script>

<div class="p-2 bg-darkSand/10 dark:bg-darkText/10">
	<p class="text-base leading-relaxed whitespace-pre-wrap">{memo.content}</p>
	{#if tags.length > 0}
		<div class="flex flex-wrap gap-2 mt-3">
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
	<div class="mt-3 text-xs text-gray-500 dark:text-gray-400">
		<time>{formatDate(memo.displayTime || memo.createTime)}</time>
	</div>
</div>
