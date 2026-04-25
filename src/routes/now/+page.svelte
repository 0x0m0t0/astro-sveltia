<script lang="ts">
	// import MemoCard from '$lib/memos/MemoCard.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

	function getOrdinalSuffix(day: number) {
		if (day > 3 && day < 21) return 'th'
		switch (day) {
			case 1:
				return 'st'
			case 2:
				return 'nd'
			case 3:
				return 'rd'
			default:
				return 'th'
		}
	}
</script>

<svelte:head>
	<title>Now — oxomoto</title>
</svelte:head>

<main class="flex h-full flex-col items-center gap-4 px-0 md:px-4">
	<section class="w-80">
		<h2 class="bg-dark/10 my-4 w-full rounded-md p-2 text-center dark:bg-white/10">Now</h2>
		<ul aria-label="now activities" class="now">
			{#each data.activities as a}
				<li>{a.activity}</li>
			{/each}
		</ul>
	</section>

	<!-- <section class="w-80">
		<h2 class="bg-dark/10 my-4 w-full rounded-md p-2 text-center dark:bg-white/10">Log</h2>
		{#if data.latestMemo}
			<MemoCard
				memo={data.latestMemo}
				selectedTags={[]}
				onToggleTag={() => {}}
				onOpenLightbox={() => {}}
				apiUrl={data.memosApiUrl}
			/>
		{/if}
		<a class="text-xs" href="/log">view more</a>
	</section> -->

	<section class="flex w-80 flex-col items-center justify-between">
		<h2 class="bg-dark/10 my-4 w-full rounded-md p-2 text-center dark:bg-white/10">Films</h2>
		<article class="flex flex-col w-full">
			<div class="flex gap-2 pb-2">
				<p class="bg-dark/10 w-full rounded-md p-2 text-center dark:bg-white/10">
					Last logged on <a
						data-track="letterboxd"
						href="https://letterboxd.com/oxomoto/"
						rel="noopener"
						class="underline">letterboxd</a
					>
				</p>
			</div>
			<ul class="flex flex-wrap gap-4">
				{#each data.movies as m}
					{@const date = new Date(m.watchedOn)}
					{@const day = date.getDate()}
					{@const suffix = getOrdinalSuffix(day)}
					{@const monthName = monthNames[date.getMonth()]}
					{@const humanReadableDate = `${day}${suffix} of ${monthName} ${date.getFullYear()}`}
					<li class="movie flex flex-col flex-wrap pb-8" title={m.title}>
						<a href={m.link}>
							{#if m.poster}
								<img
									src={m.poster}
									alt="{m.title} poster"
									width={200}
									height={300}
									class="aspect-2/3 rounded-sm object-cover"
								/>
							{:else}
								<img
									src="/assets/placeholder/pattern_checkerboard.png"
									alt="Checkerboard Pattern"
									width={200}
									height={300}
									class="aspect-2/3 rounded-sm"
								/>
							{/if}
						</a>
						{#if m.stars}
							<p class="h-6 pt-1 font-bold">{m.stars}</p>
						{:else}
							<p class="h-6 pt-1">&nbsp;</p>
						{/if}
						<a href={m.link}><h3>{m.title}</h3></a>
						<p>{m.year}</p>
						<p class="text-xs md:text-sm">{humanReadableDate}</p>
						{#if m.stars === '★' || m.stars === '½'}
							<span
								class="inline-block rounded-[0.27rem] bg-red-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-xs leading-none font-bold whitespace-nowrap"
							>
								Avoid
							</span>
						{/if}
					</li>
				{/each}
			</ul>
		</article>
	</section>
</main>

<style>
	ul.now li {
		list-style-type: circle;
		list-style-position: inside;
		padding-bottom: 0.25rem;
	}
	a {
		text-decoration: underline;
	}
	a:hover {
		text-decoration: none;
	}
	.movie {
		width: calc(50% - 0.5rem);
	}
	p {
		width: 100%;
		word-wrap: break-word;
	}
</style>
