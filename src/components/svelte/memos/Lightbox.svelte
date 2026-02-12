<script lang="ts">
	let lightboxOpen = $state(false)
	let lightboxImages = $state<{ src: string; alt: string }[]>([])
	let lightboxIndex = $state(0)
	let lightboxImage = $state('')
	let lightboxAlt = $state('')

	export function open(images: { src: string; alt: string }[], index: number) {
		lightboxImages = images
		lightboxIndex = index
		lightboxImage = images[index].src
		lightboxAlt = images[index].alt
		lightboxOpen = true
		document.body.style.overflow = 'hidden'
	}

	function close() {
		lightboxOpen = false
		document.body.style.overflow = ''
	}

	function next() {
		if (lightboxImages.length > 1) {
			lightboxIndex = (lightboxIndex + 1) % lightboxImages.length
			lightboxImage = lightboxImages[lightboxIndex].src
			lightboxAlt = lightboxImages[lightboxIndex].alt
		}
	}

	function prev() {
		if (lightboxImages.length > 1) {
			lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length
			lightboxImage = lightboxImages[lightboxIndex].src
			lightboxAlt = lightboxImages[lightboxIndex].alt
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!lightboxOpen) return
		if (e.key === 'Escape') close()
		if (e.key === 'ArrowRight') next()
		if (e.key === 'ArrowLeft') prev()
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if lightboxOpen}
	<div
		class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95"
		onclick={close}
		onkeydown={(e) => e.key === 'Enter' && close()}
		role="button"
		tabindex="0"
	>
		<button
			onclick={(e) => {
				e.stopPropagation()
				close()
			}}
			class="absolute top-4 right-4 z-[100000] text-white text-3xl hover:text-gray-300"
			aria-label="Close">&times;</button
		>

		{#if lightboxImages.length > 1}
			<button
				onclick={(e) => {
					e.stopPropagation()
					prev()
				}}
				class="absolute left-4 top-1/2 -translate-y-1/2 z-[100000] text-white text-3xl hover:text-gray-300"
				aria-label="Previous">&#8592;</button
			>

			<button
				onclick={(e) => {
					e.stopPropagation()
					next()
				}}
				class="absolute right-4 top-1/2 -translate-y-1/2 z-[100000] text-white text-3xl hover:text-gray-300"
				aria-label="Next">&#8594;</button
			>

			<span class="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100000] text-white text-sm">
				{lightboxIndex + 1} / {lightboxImages.length}
			</span>
		{/if}

		<div onclick={(e) => e.stopPropagation()} role="presentation">
			<img src={lightboxImage} alt={lightboxAlt} class="max-h-[90vh] max-w-[90vw] object-contain" />
		</div>
	</div>
{/if}
