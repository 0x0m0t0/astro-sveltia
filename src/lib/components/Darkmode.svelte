<script lang="ts">
	let { class: className = '', style = '' } = $props()

	type Theme = 'light' | 'dark' | 'system'

	let theme = $state<Theme>('system')

	function getCurrentTheme(): Theme {
		const stored = localStorage.getItem('theme')
		return (stored as Theme) || 'system'
	}

	function applyTheme(t: Theme) {
		const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		if (t === 'dark' || (t === 'system' && isSystemDark)) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	function toggle() {
		const current = getCurrentTheme()
		let next: Theme
		if (current === 'dark') next = 'light'
		else if (current === 'light') next = 'system'
		else next = 'dark'
		localStorage.setItem('theme', next)
		theme = next
		applyTheme(next)
	}

	$effect(() => {
		theme = getCurrentTheme()
	})
</script>

<div
	id="dark-mode-toggle"
	{style}
	class="bg-mauve dark:bg-dark w-80 flex justify-center rounded-md border p-2 px-4 hover:cursor-pointer {className}"
	role="button"
	tabindex="0"
	onclick={toggle}
	onkeydown={(e) => e.key === 'Enter' && toggle()}
>
	{#if theme === 'light'}
		<p>theme: light</p>
	{:else if theme === 'dark'}
		<p>theme: dark</p>
	{:else}
		<p>theme: system</p>
	{/if}
</div>
