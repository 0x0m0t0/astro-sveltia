<script lang="ts">
	import '../app.css'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { onMount } from 'svelte'
	import { onNavigate } from '$app/navigation'

	let { children } = $props()

	onMount(() => {
		document.querySelectorAll('[data-track]').forEach((button) => {
			button.addEventListener('click', () => {
				if (typeof (window as any).rybbit !== 'undefined') {
					const eventName = button.getAttribute('data-track') || 'Button Click'
					;(window as any).rybbit.event(eventName, {
						buttonId: button.id || '',
						buttonText: button.textContent?.trim() || '',
						pageLocation: window.location.pathname
					})
				}
			})
		})
	})

	onNavigate((navigation) => {
		if (!document.startViewTransition) return
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<div class="bg-mauve text-darkSand dark:bg-dark dark:text-darkText flex flex-grow flex-col">
	<Header />
	{@render children()}
	<Footer />
</div>
