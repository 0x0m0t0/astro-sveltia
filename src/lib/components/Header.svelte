<script lang="ts">
	import Contact from './Contact.svelte'
	import { afterNavigate } from '$app/navigation'
	import { page } from '$app/state'


	const links = [
		{ path: '/', label: 'index' },
		{ path: '/info', label: 'info' },
		{ path: '/now', label: 'now' },
	]

	let menuOpen = $state(false)

	afterNavigate(() => {
		menuOpen = false
	})

	function toggleMenu() {
		menuOpen = !menuOpen
	}
</script>

<header class="sticky top-2 z-100 flex w-full justify-center">
	<nav
		class={[
			'bg-mauve dark:bg-dark relative flex h-[var(--control-height)] w-80 flex-wrap justify-between rounded-md border px-4',
			// No hover tint while the menu is open — the dropdown is the active surface
			!menuOpen && 'hover-soft'
		]}
	>
		<div class="flex w-full items-center justify-between">
			<a href="/" class="w-1/3 cursor-pointer rounded-md p-2 text-center">oxomoto</a>
			<!-- <a href="/info" class="w-1/3 cursor-pointer p-2 text-center">info</a> -->
			<button
				id="togglez"
				class="w-1/3 cursor-pointer items-end rounded-md p-2"
				class:show={menuOpen}
				aria-label="Menu"
				data-track="Menu open"
				onclick={toggleMenu}
			>
				<svg
					width="15"
					height="7"
					viewBox="0 0 15 7"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="hamburger ml-auto h-6 w-6 cursor-pointer"
				>
					<path d="M0 0.5H15M0 3.5H15M0 6.5H15" />
				</svg>
			</button>
		</div>

		<div
			id="navz"
			class={[
				'bg-mauve dark:bg-dark fixed left-1/2 w-80 overflow-hidden rounded-b-md border border-t-0',
				menuOpen && 'open'
			]}
			inert={!menuOpen}
		>
			<div class="flex flex-col gap-1 p-4">
				{#each links as l, i (l.path)}
					<a
						href={l.path}
						class={[
							'btn hover-soft w-full rounded-md p-3 text-center',
							page.url.pathname === l.path && 'is-current'
						]}
						aria-current={page.url.pathname === l.path ? 'page' : undefined}
						style="--order: {i};"
					>
						{l.label}
					</a>
				{/each}
				<!-- Wrapped so it joins the stagger as the last item -->
				<div class="btn" style="--order: {links.length};">
					<Contact marginY="my-1" class="w-full" />
				</div>
			</div>
		</div>
	</nav>
</header>

<style>
	:global(.hamburger path) {
		stroke-width: 1.2px;
		stroke: var(--color-darkSand);
	}
	:global(:where(.dark, .dark *) .hamburger path) {
		stroke: var(--color-darkText);
	}
	.sticky {
		position: sticky;
		top: 0.5rem;
		z-index: 100;
	}
	#togglez.show {
		border-color: rgb(130, 130, 130) rgb(130, 130, 130) rgb(229, 229, 229) rgb(229, 229, 229);
	}
	/* The panel is fixed, so it never reflows the page and can animate on
	   transform/opacity alone — no max-height, which would lay out on every
	   frame and (with its 400px guess) finish the motion before the box did. */
	#navz {
		top: calc(var(--control-height) + 0.1rem);
		z-index: 99;
		transform: translate(-50%, -0.5rem);
		transform-origin: top center;
		opacity: 0;
		visibility: hidden;
		will-change: transform, opacity;
		transition:
			transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.22s ease,
			visibility 0s linear 0.32s;
	}
	#navz.open {
		transform: translate(-50%, 0);
		opacity: 1;
		visibility: visible;
		transition:
			transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.18s ease,
			visibility 0s;
	}

	/* Applying the animation with the class restarts it on every open. Before,
	   it was attached unconditionally and played once on page load, while the
	   panel was still hidden — so the stagger was never actually seen. */
	#navz .btn {
		opacity: 0;
	}
	#navz.open .btn {
		animation: stagger 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		animation-delay: calc(var(--order) * 60ms);
	}
	/* `.is-current` parens and link hover parens are defined globally in app.css */
	@keyframes stagger {
		from {
			opacity: 0;
			transform: translateY(0.75rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		#navz,
		#navz.open {
			transition:
				opacity 0.15s ease,
				visibility 0s;
			transform: translate(-50%, 0);
		}
		#navz.open .btn {
			animation: none;
			opacity: 1;
		}
	}
</style>
