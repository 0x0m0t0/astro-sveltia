<script lang="ts">
	let {
		isAuthenticated,
		onLogin,
		onLogout
	}: {
		isAuthenticated: boolean
		onLogin: (password: string) => Promise<void>
		onLogout: () => void
	} = $props()

	let password = $state('')
	let authError = $state('')
	let authLoading = $state(false)
	let showLoginForm = $state(false)

	async function handleLogin() {
		authError = ''
		authLoading = true
		try {
			await onLogin(password)
			showLoginForm = false
			password = ''
		} catch (e) {
			authError = e instanceof Error ? e.message : 'Authentication failed'
		} finally {
			authLoading = false
		}
	}
</script>

<div class="w-full flex items-end h-8">
	{#if isAuthenticated}
		<button
			onclick={onLogout}
			class="h-full cursor-pointer text-sm bg-darkSand/10 dark:bg-darkText/15 ml-auto px-2"
		>
			Logout
		</button>
	{:else if showLoginForm}
		<form
			onsubmit={(e) => {
				e.preventDefault()
				handleLogin()
			}}
			class="h-full flex gap-2 text-sm bg-darkSand/10 dark:bg-darkText/15 ml-auto"
		>
			<input
				type="password"
				bind:value={password}
				placeholder="Password"
				disabled={authLoading}
				class="px-2 py-1"
			/>
			<button
				type="submit"
				disabled={authLoading || !password}
				class="h-full cursor-pointer text-sm px-2 disabled:opacity-50"
			>
				{authLoading ? '...' : 'Login'}
			</button>
			<button
				type="button"
				onclick={() => (showLoginForm = false)}
				class="cursor-pointer text-sm px-2 text-gray-400"
			>
				Cancel
			</button>
			{#if authError}<span class="text-sm text-red-500">{authError}</span>{/if}
		</form>
	{:else}
		<button
			onclick={() => (showLoginForm = true)}
			class="h-full cursor-pointer text-sm bg-darkSand/10 dark:bg-darkText/15 px-2 ml-auto"
		>
			Login
		</button>
	{/if}
</div>
