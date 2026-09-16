<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity'
	import { observeScrollAway } from '$lib/scrollAway'
	import Select from './Select.svelte'
	import type { Project } from '../../routes/+page.server'

	let { projects, lcpImage = null }: { projects: Project[]; lcpImage?: string | null } = $props()

	let selectedTag = $state('selected')

	let visibleProjects = $derived(
		selectedTag === 'selected'
			? projects
			: projects.filter((p) => p.tags?.includes(selectedTag))
	)

	function applyFilter(tag: string) {
		selectedTag = tag
	}

	// Elements (individual images, and cards for the info panel) that have
	// scrolled far enough past the top of the viewport to shrink away
	const shrunk = new SvelteSet<string>()

	// Delay between each image starting its scale, in ms. Only used in the
	// side-by-side (md+) layout — when images are stacked they already come
	// off the top of the viewport one after the other.
	const STAGGER = 90

	/**
	 * Tracks whether `node` has scrolled past the top of the viewport, keyed by
	 * `key` in `shrunk`. Each image gets its own watcher, so in a stacked
	 * layout the next image stays full size until it scrolls away in turn.
	 */
	function watchScrollAway(key: string) {
		return (node: HTMLElement) => {
			const disconnect = observeScrollAway(node, (isPast) => {
				if (isPast) shrunk.add(key)
				else shrunk.delete(key)
			})

			return () => {
				disconnect()
				shrunk.delete(key)
			}
		}
	}
</script>

<section class="work-section mt-10 flex w-full flex-col items-center">
	<Select data={projects} onFilter={applyFilter} />
	<ul class="flex max-w-6xl flex-col gap-20">
		{#each visibleProjects as p (p.title)}
			<li
				data-tags={p.tags ? p.tags.join(',') : ''}
				class="work-item projects flex w-full flex-col items-center justify-end pb-8"
				{@attach watchScrollAway(p.title)}
			>
				<div
					class="parent-element project-images mb-4 flex w-full max-w-full basis-auto flex-col items-end justify-center gap-4 md:flex-row"
				>
					{#each p.images as media, index (media.image)}
						<!-- Measured element: never transformed, so its box stays stable -->
						<div
							class={[
								'project-image group relative flex',
								p.images.length === 1 ? 'mx-auto w-full' : 'flex-1'
							]}
							{@attach watchScrollAway(media.image)}
						>
							<!-- Transformed element: scaling this can't affect the measurement above -->
							<div
								class={['project-scaler flex w-full', shrunk.has(media.image) && 'is-shrunk']}
								style:--stagger="{index * STAGGER}ms"
							>
								{#if p.link}
									<a href={p.link} target="_blank" rel="noopener" data-track={p.title}>
										<img
											src={'/assets/media' + media.image}
											alt="{media.alt} - image {index + 1}"
											width={1200}
											height={600}
											sizes="(max-width: 768px) 100vw, 50vw"
											class="h-auto w-full rounded-md object-contain transition-all duration-700"
											loading={index === 0 ? 'eager' : 'lazy'}
											fetchpriority={media.image === lcpImage ? 'high' : 'auto'}
											decoding={media.image === lcpImage ? 'sync' : 'async'}
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
										sizes="(max-width: 768px) 100vw, 50vw"
										class="h-auto w-full rounded-md object-contain transition-all duration-700"
										loading={index === 0 ? 'eager' : 'lazy'}
										fetchpriority={media.image === lcpImage ? 'high' : 'auto'}
										decoding={media.image === lcpImage ? 'sync' : 'async'}
									/>
								{/if}
							</div>
						</div>
					{/each}
				</div>

				<div
					class={[
						'info-panel flex w-full flex-col items-center gap-2 px-1',
						shrunk.has(p.title) && 'fade'
					]}
					style:--stagger="{p.images.length * STAGGER}ms"
				>
					<div
						class="bg-mauve dark:bg-dark info-card sticky bottom-10 z-10 w-full max-w-6xl rounded border p-2"
					>
						<h3 class="text-center">{p.title}</h3>
						<p class="pt-1 text-center leading-4">{p.description}</p>
					</div>
					{#if p.link}
						<a
							class="mobile-link hover-soft inline-block w-45 rounded border py-2 text-center md:hidden"
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
	.project-scaler {
		transform-origin: bottom center;
		transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
		will-change: transform;
	}
	.project-scaler.is-shrunk {
		transform: scale(0.6);
	}
	.info-panel {
		opacity: 1;
		transition: opacity 0.6s ease-in-out;
	}
	/* Recedes rather than disappearing: enough opacity left to stay readable
	   against the page, just clearly behind the content still in view. */
	.info-panel.fade {
		opacity: 0.45;
	}

	/* Scaled on the card and link themselves rather than on `.info-panel`, so no
	   transform sits on an ancestor of the sticky card. */
	.info-card,
	.mobile-link {
		transform-origin: bottom center;
		transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
		will-change: transform;
	}
	.info-panel.fade .info-card,
	.info-panel.fade .mobile-link {
		transform: scale(0.75);
	}

	/* Side by side: every image leaves the viewport at the same moment, so the
	   sequence has to come from a delay. Stacked, each image scales off its own
	   scroll position and a delay would only lag behind the scroll. */
	@media (min-width: 768px) {
		.project-scaler,
		.info-panel,
		.info-card,
		.mobile-link {
			transition-delay: var(--stagger, 0ms);
		}
	}
	.extlink {
		position: absolute;
		bottom: 0;
		right: 0;
	}
	@media (prefers-reduced-motion: reduce) {
		.project-scaler,
		.info-panel,
		.info-card,
		.mobile-link {
			transition: none;
			transition-delay: 0ms;
		}
		/* The opacity change stays — it's depth cueing, not motion */
		.project-scaler.is-shrunk,
		.info-panel.fade .info-card,
		.info-panel.fade .mobile-link {
			transform: none;
		}
	}
</style>
