<script lang="ts">
	let {
		allTags,
		selectedTags,
		dateFrom,
		dateTo,
		loading,
		hasActiveFilters,
		onToggleTag,
		onRemoveTag,
		onClearFilters,
		onDateFromChange,
		onDateToChange
	}: {
		allTags: string[]
		selectedTags: string[]
		dateFrom: string
		dateTo: string
		loading: boolean
		hasActiveFilters: boolean
		onToggleTag: (tag: string) => void
		onRemoveTag: (tag: string) => void
		onClearFilters: () => void
		onDateFromChange: (value: string) => void
		onDateToChange: (value: string) => void
	} = $props()
</script>

<div class="mb-6 space-y-3 self-start mt-10">
	<div class="flex flex-wrap gap-4 items-center text-sm">
		<div class="flex flex-wrap gap-2 items-center">
			<label for="date-from" class="text-gray-500">From:</label>
			<input
				id="date-from"
				type="date"
				value={dateFrom}
				onchange={(e) => onDateFromChange(e.currentTarget.value)}
				class="border rounded px-2 py-1 text-sm dark:bg-white/5 dark:border-darkText/20 dark:text-darkText"
			/>
			<label for="date-to" class="text-gray-500">To:</label>
			<input
				id="date-to"
				type="date"
				value={dateTo}
				onchange={(e) => onDateToChange(e.currentTarget.value)}
				class="border rounded px-2 py-1 text-sm dark:bg-white/5 dark:border-darkText/20 dark:text-darkText"
			/>
		</div>
		{#if hasActiveFilters}
			<button onclick={onClearFilters} class="text-xs text-red-500 hover:text-red-700">
				Clear filters
			</button>
		{/if}
	</div>

	<!-- Tags -->
	{#if !loading && allTags.length > 0}
		<div class="flex flex-wrap gap-1.5">
			{#each allTags as tag}
				<button
					onclick={() => onToggleTag(tag)}
					class="text-xs px-2 py-0.5 rounded-full transition-colors {selectedTags.includes(tag)
						? 'bg-blue-500 text-white'
						: 'bg-darkSand/10 text-darkSand/70 hover:bg-darkSand/20 dark:bg-darkText/10 dark:text-darkText/70 dark:hover:bg-darkText/20'}"
				>
					#{tag}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Active tag filters -->
	{#if selectedTags.length > 0}
		<div class="flex flex-wrap items-center gap-2">
			<span class="text-sm text-gray-500">Filtering by:</span>
			{#each selectedTags as tag}
				<span
					class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
				>
					#{tag}
					<button
						onclick={() => onRemoveTag(tag)}
						class="hover:text-blue-900 dark:hover:text-blue-100"
						aria-label="Remove tag {tag}">&times;</button
					>
				</span>
			{/each}
		</div>
	{/if}
</div>
