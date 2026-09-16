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
	<!-- Sized to content but floored at 20rem, so picking a shorter tag
	     ("print") doesn't shrink the control relative to "selected work" -->
	<div class="relative w-fit max-w-full min-w-80">
		<button
			type="button"
			aria-haspopup="listbox"
			aria-expanded={open}
			aria-label="Filter by category"
			class="bg-mauve dark:bg-dark hover-soft has-parens flex h-[var(--control-height)] w-full cursor-pointer items-center rounded border px-6 text-left"
			onclick={toggle}
			{onkeydown}
		>
			<span>{current.label}</span>
			<!-- ml-auto rather than justify-between: the parenthesis pseudo-elements
			     are flex items too, and space-between would fling them to the edges -->
			<span class="ml-auto pl-4 tabular-nums">({current.count})</span>
		</button>

		{#if open}
			<!-- No box of its own: each option is a standalone floating button -->
			<ul
				role="listbox"
				aria-label="Filter options"
				class="absolute right-0 left-0 z-50 mt-1 flex flex-col gap-1"
			>
				{#each options as option, i (option.value)}
					<li
						role="option"
						aria-selected={option.value === selected}
						style:--order={i}
						class="bg-mauve dark:bg-dark hover-soft option flex h-[var(--control-height)] cursor-pointer items-center rounded border px-6 text-left
							{i === focusIndex ? 'bg-[var(--color-hover)]' : ''}
							{option.value === selected ? 'font-semibold' : ''}"
						onclick={() => pick(option.value)}
						onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && pick(option.value)}
					>
						<span>{option.label}</span>
						<span class="ml-auto pl-4 tabular-nums">({option.count})</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	/* The list is absolutely positioned, so opening it costs no page reflow and
	   the whole animation stays on transform/opacity. The options carry the
	   motion themselves — there's no panel box left to fade in behind them. */
	.option {
		animation: option-in 0.34s cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: calc(var(--order) * 45ms);
	}
	@keyframes option-in {
		from {
			opacity: 0;
			transform: translateY(0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.option {
			animation: none;
		}
	}
</style>
