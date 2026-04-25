<script lang="ts">
	import MemosLog from '$lib/memos/MemosLog.svelte'
	import { PUBLIC_MEMOS_API_URL } from '$env/static/public'
</script>

<svelte:head>
	<title>Log — oxomoto</title>
</svelte:head>

<main class="flex h-full flex-col items-center gap-4 px-4">
	<section class="h-full w-full max-w-5xl">
		<MemosLog apiUrl={PUBLIC_MEMOS_API_URL} />
	</section>
</main>
