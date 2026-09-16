<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	let { project, bodyHtml, prev, next } = $derived(data)
</script>

<svelte:head>
	<title>{project.title} — oxomoto</title>
	<meta name="description" content={project.description} />
	<meta property="og:title" content={project.title} />
	<meta property="og:description" content={project.description} />
	<meta property="og:type" content="article" />
	{#if project.images[0]}
		<meta property="og:image" content={'/assets/media' + project.images[0].image} />
	{/if}
</svelte:head>

<main class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12">
	<a href="/" class="text-sm opacity-70 hover:opacity-100">← Back to work</a>

	<header class="flex flex-col gap-4">
		<h1 class="text-3xl md:text-5xl">{project.title}</h1>
		<p class="max-w-2xl text-lg">{project.description}</p>
		{#if project.link}
			<a
				class="inline-block w-fit rounded border px-6 py-2 hover:bg-white/40"
				href={project.link}
				target="_blank"
				rel="noopener"
				data-track="case-study-{project.slug}"
			>
				Visit live site ↗
			</a>
		{/if}
	</header>

	{#if project.client || project.role || project.year || project.services?.length || project.credits || project.tags?.length}
		<dl class="grid grid-cols-2 gap-4 border-y py-6 text-sm md:grid-cols-4">
			{#if project.client}
				<div>
					<dt class="opacity-60">Client</dt>
					<dd>{project.client}</dd>
				</div>
			{/if}
			{#if project.role}
				<div>
					<dt class="opacity-60">Role</dt>
					<dd>{project.role}</dd>
				</div>
			{/if}
			{#if project.year}
				<div>
					<dt class="opacity-60">Year</dt>
					<dd>{project.year}</dd>
				</div>
			{/if}
			{#if project.services?.length}
				<div>
					<dt class="opacity-60">Services</dt>
					<dd>{project.services.join(', ')}</dd>
				</div>
			{/if}
			{#if project.credits}
				<div class="col-span-2">
					<dt class="opacity-60">Credits</dt>
					<dd>{project.credits}</dd>
				</div>
			{/if}
			{#if project.tags?.length}
				<div class="col-span-2">
					<dt class="opacity-60">Tags</dt>
					<dd>{project.tags.filter((t) => t !== 'all' && t !== 'selected').join(', ')}</dd>
				</div>
			{/if}
		</dl>
	{/if}

	<section class="flex flex-col gap-6">
		{#each project.images as media, index}
			<figure class="flex flex-col gap-2">
				<img
					src={'/assets/media' + media.image}
					alt={media.alt}
					width={1600}
					height={900}
					class="h-auto w-full rounded-md object-contain"
					loading={index === 0 ? 'eager' : 'lazy'}
					decoding={index === 0 ? 'sync' : 'async'}
				/>
				{#if media.caption}
					<figcaption class="text-center text-sm opacity-60">{media.caption}</figcaption>
				{/if}
			</figure>
		{/each}
	</section>

	{#if bodyHtml}
		<article class="prose prose-neutral dark:prose-invert mx-auto max-w-2xl">
			{@html bodyHtml}
		</article>
	{/if}

	<nav class="flex justify-between gap-4 border-t pt-6 text-sm">
		{#if prev}
			<a href="/work/{prev.slug}" class="flex flex-col opacity-70 hover:opacity-100">
				<span class="text-xs">← Previous</span>
				<span>{prev.title}</span>
			</a>
		{:else}
			<span></span>
		{/if}
		{#if next}
			<a href="/work/{next.slug}" class="flex flex-col items-end opacity-70 hover:opacity-100">
				<span class="text-xs">Next →</span>
				<span>{next.title}</span>
			</a>
		{:else}
			<span></span>
		{/if}
	</nav>
</main>
