<script lang="ts">
	import Work from '$lib/components/Work.svelte'
	import { observeScrollAway } from '$lib/scrollAway'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const description = 'Creative webdeveloper & designer, based in Brussels, Belgium.'
	const words = description.split(' ')

	// Whether the intro has scrolled past the top of the viewport
	let descGone = $state(false)

	// Attached to the wrapper, never to the element that gets transformed
	function watchDesc(node: HTMLElement) {
		return observeScrollAway(node, (isPast) => (descGone = isPast))
	}
</script>

<svelte:head>
	<title>oxomoto</title>
	<meta
		name="description"
		content="oxomoto is a web developer and designer based in Brussels, Belgium. Graphic design, web development, typography, ux/ui design and branding."
	/>
	<meta property="og:title" content="oxomoto web developer and graphic designer" />
	<meta property="og:type" content="website" />
	<meta name="twitter:creator" content="@oxomoto" />
	{#if data.lcpImage}
		<link
			rel="preload"
			as="image"
			href="/assets/media{data.lcpImage}"
			type="image/webp"
		/>
	{/if}
</svelte:head>

<main class="flex flex-col">
	<div {@attach watchDesc}>
		<p class={['desc p-4 text-3xl', descGone && 'is-gone']}>
			<!-- Svelte strips whitespace between elements, so the space is explicit -->
			{#each words as word, i (word + i)}<span class="word" style:--i={i}>{word}</span>{' '}{/each}
		</p>
	</div>
	<Work projects={data.projects} lcpImage={data.lcpImage} />
</main>
<a rel="me" class="hidden" href="https://indieweb.social/@oxomoto">Mastodon</a>

<style>
	.desc {
		margin: 6rem auto 0 auto;
		line-height: 1.8rem;
		text-align: center;
		max-width: 32ch;
		transform-origin: center top;
		transition:
			opacity 0.6s ease,
			transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.desc.is-gone {
		opacity: 0;
		transform: scale(0.9);
	}

	/* Entrance: each word settles in just behind the one before it */
	.word {
		display: inline-block;
		animation: word-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: calc(var(--i) * 45ms);
	}
	@keyframes word-in {
		from {
			opacity: 0;
			transform: translateY(0.35em);
			filter: blur(3px);
		}
		to {
			opacity: 1;
			transform: none;
			filter: blur(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.desc {
			transition: none;
		}
		.desc.is-gone {
			transform: none;
		}
		.word {
			animation: none;
		}
	}
</style>
