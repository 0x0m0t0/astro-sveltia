<script lang="ts">
	import Contact from './Contact.svelte'
	import { afterNavigate } from '$app/navigation'


	const links = [
		{ path: '/', label: 'index' },
		{ path: '/info', label: 'info' },
		{ path: '/now', label: 'now' },
	]

	let menuOpen = $state(false)
	let nav: HTMLElement | undefined = $state()
	let navDropdown: HTMLElement | undefined = $state()

	afterNavigate(() => {
		menuOpen = false
	})

	function toggleMenu() {
		menuOpen = !menuOpen
	}

	$effect(() => {
		if (nav) {
			const navHeight = nav.getBoundingClientRect().height
			document.documentElement.style.setProperty('--nav-height', `${navHeight}px`)
		}
	})
</script>

<header class="sticky top-2 z-100 flex w-full justify-center">
	<nav
		bind:this={nav}
		class="bg-mauve dark:bg-dark relative flex w-80 flex-wrap justify-between rounded-md border px-4"
	>
		<div class="flex w-full items-center justify-between">
			<a href="/" class="w-1/3 cursor-pointer p-2 text-center">oxomoto</a>
			<!-- <a href="/info" class="w-1/3 cursor-pointer p-2 text-center">info</a> -->
			<button
				id="togglez"
				class="w-1/3 cursor-pointer p-2 items-end"
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
			bind:this={navDropdown}
			id="navz"
			class="bg-mauve dark:bg-dark fixed left-1/2 w-80 -translate-x-1/2 transform overflow-hidden rounded-b-md border border-t-0 transition-all duration-300 ease-in-out"
			style="top: calc(var(--nav-height, 48px) + 0.1rem); max-height: {menuOpen
				? '400px'
				: '0'}; opacity: {menuOpen ? '1' : '0'};"
		>
			<div class="flex flex-col gap-1 p-4">
				{#each links as l, i}
					<a
						href={l.path}
						class="btn w-full rounded-md p-3 text-center"
						style="--order: {i};"
					>
						{l.label}
					</a>
				{/each}
				<Contact marginY="my-1" />
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
	#navz {
		transition:
			max-height 0.3s ease-in-out,
			opacity 0.3s ease-in-out;
		z-index: 99;
	}
	#navz .btn {
		opacity: 0;
		animation: stagger ease-in 0.4s forwards 1;
		animation-delay: calc(var(--order) * 0.1s);
	}
	nav div a:hover::before {
		content: '(';
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
	nav div a:hover::after {
		content: ')';
		display: inline-block;
		width: 1em;
		margin-right: -1em;
	}
	@keyframes stagger {
		from {
			opacity: 0;
			transform: translateY(80px);
		}
		to {
			opacity: 1;
			transform: translateY(0px);
		}
	}
</style>
