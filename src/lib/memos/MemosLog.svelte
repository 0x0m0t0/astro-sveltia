<script lang="ts">
	import type { Memo } from './types'
	import { extractTags } from './utils'
	import Lightbox from './Lightbox.svelte'
	import MemoFilters from './MemoFilters.svelte'
	import MemoCard from './MemoCard.svelte'
	import PinnedMemo from './PinnedMemo.svelte'
	import Pagination from './Pagination.svelte'
	import AuthSection from './AuthSection.svelte'

	let { apiUrl }: { apiUrl: string } = $props()

	// Core state
	let publicMemos = $state<Memo[]>([])
	let protectedMemos = $state<Memo[]>([])
	let loading = $state(true)
	let error = $state('')
	let isAuthenticated = $state(false)
	let currentPage = $state(1)
	const memosPerPage = 10

	// Filters
	let selectedTags = $state<string[]>([])
	let dateFrom = $state('')
	let dateTo = $state('')

	// Lightbox ref
	let lightbox: Lightbox

	// Derived state
	let sortedMemos = $derived(
		[...publicMemos, ...protectedMemos].sort((a, b) => {
			const dateA = new Date(a.displayTime || a.createTime).getTime()
			const dateB = new Date(b.displayTime || b.createTime).getTime()
			return dateB - dateA
		})
	)

	let pinnedMemo = $derived(() => sortedMemos.find((m) => m.pinned === true) || null)

	let allTags = $derived(() => {
		const tagSet = new Set<string>()
		sortedMemos.forEach((memo) => {
			const tags = memo.tags || extractTags(memo.content)
			tags.forEach((tag) => tagSet.add(tag))
		})
		return [...tagSet].sort()
	})

	let filteredMemos = $derived(() => {
		let memos = sortedMemos

		if (selectedTags.length > 0) {
			memos = memos.filter((memo) => {
				const memoTags = memo.tags || extractTags(memo.content)
				return selectedTags.every((tag) => memoTags.includes(tag))
			})
		}

		if (dateFrom) {
			const fromDate = new Date(dateFrom).getTime()
			memos = memos.filter((memo) => {
				const memoDate = new Date(memo.displayTime || memo.createTime).getTime()
				return memoDate >= fromDate
			})
		}

		if (dateTo) {
			const toDate = new Date(dateTo).getTime() + 86400000
			memos = memos.filter((memo) => {
				const memoDate = new Date(memo.displayTime || memo.createTime).getTime()
				return memoDate <= toDate
			})
		}

		return memos
	})

	let totalPages = $derived(Math.ceil(filteredMemos().length / memosPerPage))
	let paginatedMemos = $derived(
		filteredMemos().slice((currentPage - 1) * memosPerPage, currentPage * memosPerPage)
	)
	let hasActiveFilters = $derived(selectedTags.length > 0 || dateFrom !== '' || dateTo !== '')

	// Handlers
	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag)
		} else {
			selectedTags = [...selectedTags, tag]
		}
		currentPage = 1
	}

	function removeTag(tag: string) {
		selectedTags = selectedTags.filter((t) => t !== tag)
		currentPage = 1
	}

	function clearFilters() {
		selectedTags = []
		dateFrom = ''
		dateTo = ''
		currentPage = 1
	}

	function goToPage(page: number) {
		currentPage = Math.max(1, Math.min(page, totalPages))
	}

	function openLightbox(images: { src: string; alt: string }[], index: number) {
		lightbox.open(images, index)
	}

	// Data fetching
	async function fetchPublicMemos() {
		if (!apiUrl) {
			error = 'Memos API URL not configured'
			loading = false
			return
		}

		try {
			const url = `${apiUrl}/api/v1/memos?filter=${encodeURIComponent('visibility == "PUBLIC"')}`
			const response = await fetch(url)
			if (!response.ok) throw new Error(`HTTP ${response.status}`)
			const data = await response.json()
			publicMemos = data.memos || []
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to fetch memos'
		} finally {
			loading = false
		}
	}

	// Client-side auth: token stored in sessionStorage, used as Bearer directly
	async function handleLogin(token: string) {
		const url = `${apiUrl}/api/v1/memos?filter=${encodeURIComponent('visibility == "PROTECTED" || visibility == "PRIVATE"')}`
		const response = await fetch(url, {
			headers: { Authorization: `Bearer ${token}` }
		})
		if (!response.ok) throw new Error('Invalid token')
		const data = await response.json()
		sessionStorage.setItem('memos_token', token)
		isAuthenticated = true
		protectedMemos = data.memos || []
	}

	function handleLogout() {
		sessionStorage.removeItem('memos_token')
		isAuthenticated = false
		protectedMemos = []
	}

	async function checkAuthStatus() {
		const token = sessionStorage.getItem('memos_token')
		if (!token || !apiUrl) return
		try {
			const url = `${apiUrl}/api/v1/memos?filter=${encodeURIComponent('visibility == "PROTECTED" || visibility == "PRIVATE"')}`
			const response = await fetch(url, {
				headers: { Authorization: `Bearer ${token}` }
			})
			if (response.ok) {
				const data = await response.json()
				isAuthenticated = true
				protectedMemos = data.memos || []
			} else {
				sessionStorage.removeItem('memos_token')
			}
		} catch {
			sessionStorage.removeItem('memos_token')
		}
	}

	$effect(() => {
		fetchPublicMemos()
		checkAuthStatus()
	})
</script>

<Lightbox bind:this={lightbox} />

<div class="flex flex-col w-full gap-2 items-center">
	{#if loading}
		<p class="text-gray-500">Loading...</p>
	{:else if error}
		<p class="text-red-500">{error}</p>
	{:else if filteredMemos().length > 0}
		<div class="w-full max-w-3xl space-y-1">
			<MemoFilters
				allTags={allTags()}
				{selectedTags}
				{dateFrom}
				{dateTo}
				{loading}
				{hasActiveFilters}
				onToggleTag={toggleTag}
				onRemoveTag={removeTag}
				onClearFilters={clearFilters}
				onDateFromChange={(v) => {
					dateFrom = v
					currentPage = 1
				}}
				onDateToChange={(v) => {
					dateTo = v
					currentPage = 1
				}}
			/>
			<AuthSection {isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />
			{#if pinnedMemo()}
				<PinnedMemo memo={pinnedMemo()!} {selectedTags} onToggleTag={toggleTag} />
			{/if}

			{#each paginatedMemos as memo (memo.name || memo.uid)}
				<MemoCard
					{memo}
					{selectedTags}
					onToggleTag={toggleTag}
					onOpenLightbox={openLightbox}
					{apiUrl}
				/>
			{/each}
		</div>

		<Pagination
			{currentPage}
			{totalPages}
			totalItems={filteredMemos().length}
			onPageChange={goToPage}
		/>
	{:else}
		<p class="text-zinc-400">No memos found</p>
	{/if}
</div>
