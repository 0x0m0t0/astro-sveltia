<script lang="ts">
	import type { Memo, Pin } from './memos/types'
	import { extractTags, getFileUrl } from './memos/utils'
	import Lightbox from './memos/Lightbox.svelte'
	import MemoFilters from './memos/MemoFilters.svelte'
	import MemoCard from './memos/MemoCard.svelte'
	import PinnedMemo from './memos/PinnedMemo.svelte'
	import Pagination from './memos/Pagination.svelte'
	import AuthSection from './memos/AuthSection.svelte'

	let { apiUrl }: { apiUrl: string } = $props()

	// Core state
	let publicMemos = $state<Memo[]>([])
	let protectedMemos = $state<Memo[]>([])
	let loading = $state(true)
	let error = $state('')
	let isAuthenticated = $state(false)
	let showMap = $state(true)
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

	let mapPins = $derived(() =>
		sortedMemos
			.filter((memo) => memo.location?.latitude && memo.location?.longitude)
			.map(
				(memo): Pin => ({
					coords: [memo.location!.longitude!, memo.location!.latitude!],
					title: memo.location?.placeholder || memo.content.slice(0, 50),
					description: memo.content.slice(0, 100),
					image: memo.attachments?.[0]
						? getFileUrl(memo.attachments[0].name, memo.attachments[0].filename)
						: null,
					memoId: memo.name || memo.uid
				})
			)
	)

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

	function handleMapPinSelect(pin: { memoId: string }) {
		document.querySelectorAll('.highlight-memo').forEach((el) => {
			el.classList.remove('highlight-memo')
		})

		if (pin.memoId) {
			const memoElement = document.querySelector(`[data-memo-id="${pin.memoId}"]`)
			if (memoElement) {
				const memoRect = memoElement.getBoundingClientRect()
				const targetTop = 80
				const scrollOffset = memoRect.top + window.scrollY - targetTop

				window.scrollTo({ top: scrollOffset, behavior: 'smooth' })
				memoElement.classList.add('highlight-memo')
			}
		}
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

	async function fetchProtectedMemos() {
		try {
			const response = await fetch('/api/memos/protected')
			if (!response.ok) {
				console.log('[Protected] Response not ok:', response.status)
				return
			}
			const data = await response.json()
			console.log('[Protected] Fetched memos:', data.memos?.length ?? 0)
			protectedMemos = data.memos || []
		} catch (e) {
			console.error('[Protected] Fetch error:', e)
		}
	}

	async function handleLogin(password: string) {
		const response = await fetch('/api/memos/auth', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password })
		})
		const data = await response.json()
		console.log('[Auth] Login response:', response.ok, data)
		if (response.ok && data.success) {
			isAuthenticated = true
			console.log('[Auth] Login successful, fetching protected memos...')
			await fetchProtectedMemos()
		} else {
			throw new Error(data.message || 'Invalid password')
		}
	}

	async function handleLogout() {
		try {
			await fetch('/api/memos/auth', { method: 'DELETE' })
		} catch {}
		isAuthenticated = false
		protectedMemos = []
	}

	async function checkAuthStatus() {
		try {
			const response = await fetch('/api/memos/auth')
			const data = await response.json()
			console.log('[Auth] Status check:', data)
			if (data.authenticated) {
				isAuthenticated = true
				console.log('[Auth] Already authenticated, fetching protected memos...')
				await fetchProtectedMemos()
			}
		} catch (e) {
			console.error('[Auth] Status check error:', e)
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
				<MemoCard {memo} {selectedTags} onToggleTag={toggleTag} onOpenLightbox={openLightbox} />
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
