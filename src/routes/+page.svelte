<script lang="ts">
	import Work from '$lib/components/Work.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
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
	<p class="desc prose rounded-md border p-4">
		Freelance webdeveloper & graphic designer, based in Brussels, Belgium.
	</p>
	<Work projects={data.projects} lcpImage={data.lcpImage} />
</main>
<a rel="me" class="hidden" href="https://indieweb.social/@oxomoto">Mastodon</a>

<style>
	.desc {
		margin: 20px auto;
		line-height: 1rem;
	}
</style>
