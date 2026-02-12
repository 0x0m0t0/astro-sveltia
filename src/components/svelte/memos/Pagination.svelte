<script lang="ts">
	let {
		currentPage,
		totalPages,
		totalItems,
		onPageChange
	}: {
		currentPage: number
		totalPages: number
		totalItems: number
		onPageChange: (page: number) => void
	} = $props()
</script>

{#if totalPages > 1}
	<nav class="flex items-center justify-center gap-4 pt-4">
		<button
			onclick={() => onPageChange(currentPage - 1)}
			disabled={currentPage === 1}
			class="text-sm px-3 py-1 rounded bg-darkSand/10 hover:bg-darkSand/20 dark:bg-darkText/10 dark:hover:bg-darkText/20 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			Prev
		</button>
		<span class="text-sm text-gray-500">{currentPage} / {totalPages}</span>
		<button
			onclick={() => onPageChange(currentPage + 1)}
			disabled={currentPage === totalPages}
			class="text-sm px-3 py-1 rounded bg-darkSand/10 hover:bg-darkSand/20 dark:bg-darkText/10 dark:hover:bg-darkText/20 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			Next
		</button>
	</nav>
	<p class="text-center text-xs text-gray-400">{totalItems} memos</p>
{/if}
