<script lang="ts">
	import { onMount } from 'svelte'
	import Select from './Select.svelte'
	import type { Project } from '../../routes/+page.server'

	let { projects }: { projects: Project[] } = $props()

	let selectedTag = $state('selected')

	let visibleProjects = $derived(
		selectedTag === 'selected'
			? projects
			: projects.filter((p) => p.tags?.includes(selectedTag))
	)

	function applyFilter(tag: string) {
		selectedTag = tag
	}

	let observer: IntersectionObserver | null = null

	function applyState(card: Element) {
		const rect = card.getBoundingClientRect()
		const info = card.children[1] as HTMLElement
		const isScaled = card.classList.contains('scale')
		// Hysteresis: apply and remove at different thresholds to prevent toggling
		const isPast = isScaled
			? rect.top < -(rect.height * 0.15)
			: rect.top < -(rect.height * 0.3)
		card.classList.toggle('scale', isPast)
		info?.classList.toggle('fade', isPast)
	}

	function setupObserver() {
		if (observer) observer.disconnect()

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => applyState(entry.target))
			},
			{ threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] }
		)

		document.querySelectorAll('.projects').forEach((card) => {
			applyState(card)
			observer!.observe(card)
		})
	}

	onMount(() => {
		setupObserver()
		return () => observer?.disconnect()
	})

	$effect(() => {
		visibleProjects
		Promise.resolve().then(setupObserver)
	})
</script>

<section class="work-section mt-20 flex w-full flex-col items-center">
	<Select data={projects} onFilter={applyFilter} />
	<ul class="flex max-w-6xl flex-col gap-20">
		{#each visibleProjects as p (p.title)}
			<li
				data-tags={p.tags ? p.tags.join(',') : ''}
				class="work-item projects flex w-full flex-col items-center justify-end pb-8 transition-all duration-500 ease-out"
			>
				<div
					class="parent-element project-images mb-4 flex w-full max-w-full basis-auto flex-col items-end justify-center gap-4 transition-all duration-700 ease-out md:flex-row"
				>
					{#each p.images as media, index}
						<div
							class="relative flex {p.images.length === 1
								? 'mx-auto w-full'
								: 'flex-1'} group"
						>
							{#if p.link}
								<a href={p.link} target="_blank" rel="noopener" data-track={p.title}>
									<img
										src={'/assets/media' + media.image}
										alt="{media.alt} - image {index + 1}"
										width={1200}
										height={600}
										class="h-auto w-full rounded-md object-contain transition-all duration-700"
										loading={index === 0 ? 'eager' : 'lazy'}
										decoding="async"
									/>
									<span
										class="extlink text-darkSand/70 m-1 hidden rounded bg-white/40 px-4 py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
									>
										view project ↗
									</span>
								</a>
							{:else}
								<img
									src={'/assets/media' + media.image}
									alt="{media.alt} - image {index + 1}"
									width={1200}
									height={600}
									class="h-auto w-full rounded-md object-contain transition-all duration-700"
									loading={index === 0 ? 'eager' : 'lazy'}
									decoding="async"
								/>
							{/if}
						</div>
					{/each}
				</div>

				<div class="info-panel flex w-full flex-col items-center gap-2 px-1">
					<div
						class="bg-mauve dark:bg-dark sticky bottom-10 z-10 w-full max-w-6xl rounded border p-2 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
					>
						<h3 class="text-center">{p.title}</h3>
						<p class="pt-1 text-center leading-4">{p.description}</p>
					</div>
					{#if p.link}
						<a
							class="mobile-link inline-block w-45 rounded border px-8 py-2 text-center hover:bg-white/40 md:hidden"
							href={p.link}
							target="_blank"
							rel="noopener"
							data-track={p.title}
						>
							view project ↗
						</a>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</section>

<style>
	figcaption {
		opacity: 1;
		transition: all 0.5s ease-in-out;
	}
	.project-images {
		transition: all 1.8s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.projects {
		scale: 1;
	}
	:global(.scale) {
		transform: scale(0.6);
	}
	.info-panel {
		opacity: 1;
		transition: opacity 0.5s ease-in-out;
	}
	:global(.fade) {
		opacity: 0;
	}
	.extlink {
		position: absolute;
		bottom: 0;
		right: 0;
	}
	.mobile-link:hover::before {
		content: '(';
		display: inline-block;
		width: 0.4em;
		margin-left: -0.4em;
	}
	.mobile-link:hover::after {
		content: ')';
		display: inline-block;
		width: 0.4em;
		margin-right: -0.4em;
	}
</style>
