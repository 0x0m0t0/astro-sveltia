<script lang="ts">
	import type { Project } from '../../routes/+page.server'

	let {
		data,
		onFilter
	}: {
		data: Project[]
		onFilter: (tag: string) => void
	} = $props()

	type Option = { value: string; label: string; count: number }

	let selected = $state('selected')
	let open = $state(false)
	let wrapper: HTMLDivElement
	let focusIndex = $state(-1)

	let options: Option[] = $derived.by(() => {
		const tagMap = new Map<string, number>()
		data.forEach((item) => {
			item.tags?.forEach((tag) => {
				if (tag !== 'selected') tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
			})
		})
		const result: Option[] = [{ value: 'selected', label: 'selected work', count: data.length }]
		tagMap.forEach((count, tag) => result.push({ value: tag, label: tag, count }))
		return result
	})

	let current = $derived(options.find((o) => o.value === selected) ?? options[0])

	function pick(value: string) {
		selected = value
		open = false
		focusIndex = -1
		onFilter(value)
	}

	function toggle() {
		open = !open
		if (open) focusIndex = options.findIndex((o) => o.value === selected)
		else focusIndex = -1
	}

	function onkeydown(e: KeyboardEvent) {
		if (!open) {
			if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
				e.preventDefault()
				open = true
				focusIndex = options.findIndex((o) => o.value === selected)
			}
			return
		}
		if (e.key === 'Escape') { open = false; focusIndex = -1 }
		else if (e.key === 'ArrowDown') { e.preventDefault(); focusIndex = (focusIndex + 1) % options.length }
		else if (e.key === 'ArrowUp') { e.preventDefault(); focusIndex = (focusIndex - 1 + options.length) % options.length }
		else if ((e.key === 'Enter' || e.key === ' ') && focusIndex >= 0) { e.preventDefault(); pick(options[focusIndex].value) }
		else if (e.key === 'Tab') { open = false; focusIndex = -1 }
	}

	$effect(() => {
		if (!open) return
		function onDocClick(e: MouseEvent) {
			if (!wrapper.contains(e.target as Node)) {
				open = false
				focusIndex = -1
			}
		}
		document.addEventListener('click', onDocClick)
		return () => document.removeEventListener('click', onDocClick)
	})
</script>

<div bind:this={wrapper} class="my-10 flex justify-center">
	<div class="relative w-full max-w-80 md:w-[50vw]">
		<button
			type="button"
			aria-haspopup="listbox"
			aria-expanded={open}
			aria-label="Filter by category"
			class="bg-mauve px-6 dark:bg-dark block w-full cursor-pointer rounded border p-2 text-left transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
			onclick={toggle}
			{onkeydown}
		>
			{current.label}
		</button>

		{#if open}
			<ul
				role="listbox"
				aria-label="Filter options"
				class="bg-mauve dark:bg-dark absolute left-0 right-0 z-50 mt-1 rounded border"
			>
				{#each options as option, i (option.value)}
					<li
						role="option"
						aria-selected={option.value === selected}
						class="cursor-pointer p-2 text-left transition-colors hover:bg-black/10 dark:hover:bg-white/10
							{i === focusIndex ? 'bg-black/10 dark:bg-white/10' : ''}
							{option.value === selected ? 'font-semibold' : ''}"
						onclick={() => pick(option.value)}
						onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && pick(option.value)}
					>
						{option.label} ({option.count})
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
