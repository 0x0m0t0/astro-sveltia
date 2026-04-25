<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<svelte:head>
	<title>info — oxomoto</title>
</svelte:head>

<main class="flex h-full flex-grow flex-col items-center justify-between p-4">
	<section class="flex max-w-2xl flex-col gap-2">
		<div class="flex w-80 flex-col items-center gap-4">
			<h2 class="bg-dark/10 w-80 rounded-md p-2 text-center dark:bg-white/10">info</h2>
			<div class="flex w-full flex-col gap-4">
				<p>
					{data.info.body}
					<span class="relative inline-flex h-3 w-3">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-80"
						></span>
						<span class="relative inline-flex h-3 w-3 rounded-full bg-green-300"></span>
					</span>
				</p>
				<p>
					For inquiries get in touch at ↗
					<a href="mailto:i%6efo@oxomoto%2eco" class="mail">
						info
						<span class="at"></span>
						<span class="dom"></span>
					</a>
				</p>
			</div>
		</div>

		<div class="mt-10 flex flex-col items-center gap-4">
			<h3 class="bg-dark/10 w-80 rounded-md p-2 text-center dark:bg-white/10">Links</h3>
			<ul class="links flex w-full flex-col items-center gap-2" aria-label="about links">
				{#each data.info.links as link}
					<li class="w-80 rounded-md border p-2 text-center">
						<a href={link.url} class="hover:text-darkSand hover:underline">{link.label}</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="mt-10 flex flex-col items-center gap-4">
			<h3 class="bg-dark/10 w-80 rounded-md p-2 text-center dark:bg-white/10">Services</h3>
			<ul class="services flex w-full flex-col items-center gap-2" aria-label="services">
				{#each data.info.services as service}
					<li class="w-80 p-2 text-center">{service}</li>
				{/each}
			</ul>
		</div>
	</section>
</main>

<style>
	:root {
		--mydom: 'oxomoto.co';
	}
	.at::before {
		content: '@';
	}
	.dom::after {
		content: var(--mydom);
	}
	.mail {
		text-decoration: underline;
	}
	.mail:hover {
		text-decoration: none;
	}
	.services li::before,
	.links li:hover::before {
		content: '(';
		display: inline-block;
		width: 1em;
		margin-left: -1em;
	}
	.services li::after,
	.links li:hover::after {
		content: ')';
		display: inline-block;
		width: 1em;
		margin-right: -1em;
	}
</style>
